import os
import json
import hashlib
import secrets
from datetime import datetime, timedelta
import mysql.connector
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from jose import JWTError, jwt

app = FastAPI(title="TOEIC 600 Vocabulary API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Config ───────────────────────────────────────────────────────────────────
DB_CONFIG = {
    "host":       "localhost",
    "user":       "root",
    "password":   "",           # ← đổi nếu cần
    "database":   "600toeic",
    "charset":    "utf8mb4",
    "autocommit": True,
}

SECRET_KEY  = "TOEIC600_SECRET_CHANGE_ME_IN_PROD"
ALGORITHM   = "HS256"
TOKEN_HOURS = 72   # token sống 3 ngày

VOCAB_PATH = "c:/Users/ACER/Desktop/TOIEC/data/toeic600.json"

# ─── Auth helpers ─────────────────────────────────────────────────────────────
bearer = HTTPBearer()

def hash_password(pw: str) -> str:
    """PBKDF2-SHA256 with random salt. Format: salt$hash"""
    salt = secrets.token_hex(16)
    hashed = hashlib.pbkdf2_hmac('sha256', pw.encode(), salt.encode(), 260000).hex()
    return f"{salt}${hashed}"

def verify_password(plain: str, stored: str) -> bool:
    try:
        salt, hashed = stored.split('$', 1)
        check = hashlib.pbkdf2_hmac('sha256', plain.encode(), salt.encode(), 260000).hex()
        return secrets.compare_digest(check, hashed)
    except Exception:
        return False

def create_token(user_id: int, username: str) -> str:
    expire = datetime.utcnow() + timedelta(hours=TOKEN_HOURS)
    return jwt.encode({"sub": str(user_id), "username": username, "exp": expire}, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(bearer)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id  = int(payload["sub"])
        username = payload["username"]
        return {"id": user_id, "username": username}
    except JWTError:
        raise HTTPException(status_code=401, detail="Token không hợp lệ hoặc đã hết hạn")

# ─── DB helpers ───────────────────────────────────────────────────────────────
def get_conn():
    return mysql.connector.connect(**DB_CONFIG)

def q(sql, params=(), fetchone=False, fetchall=False):
    conn = get_conn()
    cur  = conn.cursor(dictionary=True)
    try:
        cur.execute(sql, params)
        if fetchone:  return cur.fetchone()
        if fetchall:  return cur.fetchall()
        return cur.lastrowid
    finally:
        cur.close(); conn.close()

# ─── DB init ──────────────────────────────────────────────────────────────────
def ensure_db():
    cfg = {k: v for k, v in DB_CONFIG.items() if k != "database"}
    conn = mysql.connector.connect(**cfg)
    cur  = conn.cursor()
    cur.execute("CREATE DATABASE IF NOT EXISTS `600toeic` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
    conn.commit(); cur.close(); conn.close()

def init_db():
    ensure_db()
    tables = [
        """CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4""",

        """CREATE TABLE IF NOT EXISTS learned_words (
            user_id INT NOT NULL,
            word VARCHAR(200) NOT NULL,
            PRIMARY KEY (user_id, word),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4""",

        """CREATE TABLE IF NOT EXISTS completed_topics (
            user_id INT NOT NULL,
            topic VARCHAR(200) NOT NULL,
            PRIMARY KEY (user_id, topic),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4""",

        """CREATE TABLE IF NOT EXISTS wrong_words (
            user_id INT NOT NULL,
            word VARCHAR(200) NOT NULL,
            wrong_count INT DEFAULT 1,
            PRIMARY KEY (user_id, word),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4""",

        """CREATE TABLE IF NOT EXISTS quiz_history (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            topic VARCHAR(200),
            score INT,
            total INT,
            percentage INT,
            date VARCHAR(100),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4""",

        """CREATE TABLE IF NOT EXISTS favorites (
            user_id INT NOT NULL,
            word VARCHAR(200) NOT NULL,
            PRIMARY KEY (user_id, word),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4""",

        """CREATE TABLE IF NOT EXISTS stats (
            user_id INT NOT NULL,
            `key` VARCHAR(100) NOT NULL,
            value TEXT,
            PRIMARY KEY (user_id, `key`),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4""",

        """CREATE TABLE IF NOT EXISTS topic_activity (
            user_id INT NOT NULL,
            topic VARCHAR(200) NOT NULL,
            last_active_date DATE,
            PRIMARY KEY (user_id, topic),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4""",
    ]
    for t in tables:
        q(t)

init_db()

# ─── Schemas ──────────────────────────────────────────────────────────────────
class RegisterPayload(BaseModel):
    username: str
    password: str

class LoginPayload(BaseModel):
    username: str
    password: str

class WordPayload(BaseModel):
    word: str

class TopicPayload(BaseModel):
    topic: str
    completed: bool

class QuizPayload(BaseModel):
    topic: str
    score: int
    total: int
    percentage: int
    date: str

class FavoritePayload(BaseModel):
    word: str
    favorite: bool

class StatPayload(BaseModel):
    key: str
    value: str

class TopicActivityPayload(BaseModel):
    topic: str
    date: str

# ─── Auth endpoints ───────────────────────────────────────────────────────────
@app.post("/api/auth/register")
def register(payload: RegisterPayload):
    if len(payload.username.strip()) < 3:
        raise HTTPException(400, "Tên đăng nhập phải có ít nhất 3 ký tự")
    if len(payload.password) < 6:
        raise HTTPException(400, "Mật khẩu phải có ít nhất 6 ký tự")

    existing = q("SELECT id FROM users WHERE username=%s",
                 (payload.username,), fetchone=True)
    if existing:
        raise HTTPException(400, "Tên đăng nhập đã tồn tại")

    pw_hash = hash_password(payload.password)
    user_id = q("INSERT INTO users (username, password_hash) VALUES (%s,%s)",
                (payload.username, pw_hash))

    # Init default stats for new user
    for key, val in [("streak","0"), ("last_active_date",""), ("last_topic",""), ("total_study_time","0")]:
        q("INSERT IGNORE INTO stats (user_id,`key`,value) VALUES (%s,%s,%s)", (user_id, key, val))

    token = create_token(user_id, payload.username)
    return {"token": token, "username": payload.username, "user_id": user_id}

@app.post("/api/auth/login")
def login(payload: LoginPayload):
    user = q("SELECT id, username, password_hash FROM users WHERE username=%s",
             (payload.username,), fetchone=True)
    if not user or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(401, "Tên đăng nhập hoặc mật khẩu không đúng")

    token = create_token(user["id"], user["username"])
    return {"token": token, "username": user["username"], "user_id": user["id"]}

# ─── Vocabulary (public) ──────────────────────────────────────────────────────
@app.get("/api/vocabulary")
def get_vocabulary():
    if not os.path.exists(VOCAB_PATH):
        raise HTTPException(404, "Vocabulary database not found")
    with open(VOCAB_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

# ─── Progress endpoints (require auth) ───────────────────────────────────────
@app.get("/api/progress")
def get_progress(user=Depends(get_current_user)):
    uid = user["id"]
    learned   = [r["word"]  for r in q("SELECT word FROM learned_words WHERE user_id=%s",  (uid,), fetchall=True)]
    completed = [r["topic"] for r in q("SELECT topic FROM completed_topics WHERE user_id=%s", (uid,), fetchall=True)]
    wrong     = q("SELECT word, wrong_count FROM wrong_words WHERE user_id=%s", (uid,), fetchall=True)
    favorites = [r["word"]  for r in q("SELECT word FROM favorites WHERE user_id=%s", (uid,), fetchall=True)]
    history   = q("SELECT id,topic,score,total,percentage,date FROM quiz_history WHERE user_id=%s ORDER BY id DESC", (uid,), fetchall=True)
    stats_rows = q("SELECT `key`,value FROM stats WHERE user_id=%s", (uid,), fetchall=True)
    stats_dict = {r["key"]: r["value"] for r in stats_rows}
    activity_rows = q("SELECT topic,last_active_date FROM topic_activity WHERE user_id=%s", (uid,), fetchall=True)
    topic_activity = {
        r["topic"]: r["last_active_date"].isoformat() if hasattr(r["last_active_date"], "isoformat") else str(r["last_active_date"])
        for r in activity_rows
    }
    return {
        "learned": learned, "completed": completed,
        "wrong": {w["word"]: w["wrong_count"] for w in wrong},
        "favorites": favorites, "history": history,
        "streak": int(stats_dict.get("streak", 0)),
        "last_active_date": stats_dict.get("last_active_date", ""),
        "last_topic": stats_dict.get("last_topic", ""),
        "total_study_time": int(stats_dict.get("total_study_time", 0)),
        "topic_activity": topic_activity,
    }

@app.post("/api/progress/learned")
def add_learned(payload: WordPayload, user=Depends(get_current_user)):
    q("INSERT IGNORE INTO learned_words (user_id,word) VALUES (%s,%s)", (user["id"], payload.word))
    return {"status": "success"}

@app.delete("/api/progress/learned/{word}")
def del_learned(word: str, user=Depends(get_current_user)):
    q("DELETE FROM learned_words WHERE user_id=%s AND word=%s", (user["id"], word))
    return {"status": "success"}

@app.post("/api/progress/completed")
def update_completed(payload: TopicPayload, user=Depends(get_current_user)):
    if payload.completed:
        q("INSERT IGNORE INTO completed_topics (user_id,topic) VALUES (%s,%s)", (user["id"], payload.topic))
    else:
        q("DELETE FROM completed_topics WHERE user_id=%s AND topic=%s", (user["id"], payload.topic))
    return {"status": "success"}

@app.post("/api/progress/quiz")
def add_quiz(payload: QuizPayload, user=Depends(get_current_user)):
    q("INSERT INTO quiz_history (user_id,topic,score,total,percentage,date) VALUES (%s,%s,%s,%s,%s,%s)",
      (user["id"], payload.topic, payload.score, payload.total, payload.percentage, payload.date))
    return {"status": "success"}

@app.post("/api/progress/wrong")
def add_wrong(payload: WordPayload, user=Depends(get_current_user)):
    exists = q("SELECT word FROM wrong_words WHERE user_id=%s AND word=%s", (user["id"], payload.word), fetchone=True)
    if exists:
        q("UPDATE wrong_words SET wrong_count=wrong_count+1 WHERE user_id=%s AND word=%s", (user["id"], payload.word))
    else:
        q("INSERT INTO wrong_words (user_id,word,wrong_count) VALUES (%s,%s,1)", (user["id"], payload.word))
    return {"status": "success"}

@app.delete("/api/progress/wrong/{word}")
def del_wrong(word: str, user=Depends(get_current_user)):
    q("DELETE FROM wrong_words WHERE user_id=%s AND word=%s", (user["id"], word))
    return {"status": "success"}

@app.post("/api/progress/favorite")
def update_fav(payload: FavoritePayload, user=Depends(get_current_user)):
    if payload.favorite:
        q("INSERT IGNORE INTO favorites (user_id,word) VALUES (%s,%s)", (user["id"], payload.word))
    else:
        q("DELETE FROM favorites WHERE user_id=%s AND word=%s", (user["id"], payload.word))
    return {"status": "success"}

@app.post("/api/progress/stats")
def update_stats(payload: StatPayload, user=Depends(get_current_user)):
    q("INSERT INTO stats (user_id,`key`,value) VALUES (%s,%s,%s) ON DUPLICATE KEY UPDATE value=%s",
      (user["id"], payload.key, payload.value, payload.value))
    return {"status": "success"}

@app.post("/api/progress/topic_activity")
def update_activity(payload: TopicActivityPayload, user=Depends(get_current_user)):
    q("INSERT INTO topic_activity (user_id,topic,last_active_date) VALUES (%s,%s,%s) ON DUPLICATE KEY UPDATE last_active_date=%s",
      (user["id"], payload.topic, payload.date, payload.date))
    return {"status": "success"}

@app.post("/api/progress/reset")
def reset_progress(user=Depends(get_current_user)):
    uid = user["id"]
    for table in ["learned_words","completed_topics","wrong_words","quiz_history","favorites","topic_activity"]:
        q(f"DELETE FROM {table} WHERE user_id=%s", (uid,))
    for key, val in [("streak","0"),("last_active_date",""),("last_topic",""),("total_study_time","0")]:
        q("UPDATE stats SET value=%s WHERE user_id=%s AND `key`=%s", (val, uid, key))
    return {"status": "success"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
