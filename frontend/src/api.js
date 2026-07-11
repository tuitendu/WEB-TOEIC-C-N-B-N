const API_BASE_URL = 'http://localhost:8000';

// ─── Token helpers ─────────────────────────────────────────────────────────
export function getToken()    { return localStorage.getItem('toeic_token'); }
export function getUsername() { return localStorage.getItem('toeic_username'); }

export function saveAuth(token, username) {
  localStorage.setItem('toeic_token', token);
  localStorage.setItem('toeic_username', username);
}

export function clearAuth() {
  localStorage.removeItem('toeic_token');
  localStorage.removeItem('toeic_username');
}

export function isLoggedIn() { return !!getToken(); }

// ─── Base request ──────────────────────────────────────────────────────────
async function request(url, method = 'GET', body = null, requireAuth = true) {
  const headers = { 'Content-Type': 'application/json' };

  if (requireAuth) {
    const token = getToken();
    if (!token) {
      // Chưa đăng nhập → bỏ qua request, trả về null im lặng
      return null;
    }
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(`${API_BASE_URL}${url}`, options);

  if (response.status === 401) {
    clearAuth();
    return null; // Token hết hạn → bỏ qua, không redirect cứng
  }

  if (!response.ok) {
    const err = await response.json().catch(() => ({ detail: 'Lỗi không xác định' }));
    throw new Error(err.detail || `HTTP ${response.status}`);
  }

  return response.json();
}

// ─── Auth API ─────────────────────────────────────────────────────────────
export const AuthAPI = {
  register: (username, password) =>
    request('/api/auth/register', 'POST', { username, password }, false),
  login: (username, password) =>
    request('/api/auth/login', 'POST', { username, password }, false),
};

// Default progress for guests (not logged in) — keeps UI working without crashing
const GUEST_PROGRESS = {
  learned: [], completed: [], wrong: {}, favorites: [],
  history: [], streak: 0, last_active_date: '', last_topic: '',
  total_study_time: 0, topic_activity: {}
};

// ─── App API ──────────────────────────────────────────────────────────────
export const API = {
  getVocabulary:       ()                           => request('/api/vocabulary', 'GET', null, false),
  getProgress:         ()                           => isLoggedIn()
                                                        ? request('/api/progress')
                                                        : Promise.resolve(GUEST_PROGRESS),
  addLearnedWord:      (word)                       => request('/api/progress/learned', 'POST', { word }),
  deleteLearnedWord:   (word)                       => request(`/api/progress/learned/${encodeURIComponent(word)}`, 'DELETE'),
  updateCompletedTopic:(topic, completed)           => request('/api/progress/completed', 'POST', { topic, completed }),
  addQuizHistory:      (topic,score,total,pct,date) => request('/api/progress/quiz', 'POST', { topic, score, total, percentage: pct, date }),
  addWrongWord:        (word)                       => request('/api/progress/wrong', 'POST', { word }),
  deleteWrongWord:     (word)                       => request(`/api/progress/wrong/${encodeURIComponent(word)}`, 'DELETE'),
  updateFavorite:      (word, favorite)             => request('/api/progress/favorite', 'POST', { word, favorite }),
  updateStats:         (key, value)                 => request('/api/progress/stats', 'POST', { key, value }),
  updateTopicActivity: (topic, date)                => request('/api/progress/topic_activity', 'POST', { topic, date }),
  resetProgress:       ()                           => request('/api/progress/reset', 'POST'),
};
