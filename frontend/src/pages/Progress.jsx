import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../api';
import { grammarData } from '../data/grammarData';

export default function Progress() {
  const navigate = useNavigate();
  const [vocab, setVocab] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const vData = await API.getVocabulary();
        const pData = await API.getProgress();
        setVocab(vData);
        setProgress(pData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !progress) {
    return (
      <div className="text-center py-5">
        <h5 className="text-muted">Đang tải biểu đồ phân tích...</h5>
      </div>
    );
  }

  const totalWords = vocab.reduce((sum, t) => sum + t.words.length, 0);
  const totalTopics = vocab.length;
  const completedTopicsCount = progress.completed.length;
  const learnedCount = progress.learned.length;

  // Average Score
  let avgScore = 0;
  if (progress.history.length > 0) {
    const sum = progress.history.reduce((acc, h) => acc + h.percentage, 0);
    avgScore = Math.round(sum / progress.history.length);
  }

  // Active study minutes
  const studyMinutes = Math.round(progress.total_study_time / 60);

  // ─── Grammar Stats from LocalStorage ──────────────────────────────────────
  const [grammarCompleted, setGrammarCompleted] = useState([]);
  const [grammarHistory, setGrammarHistory] = useState({});
  const totalGrammarTopics = 23;

  useEffect(() => {
    const savedCompleted = localStorage.getItem('grammar_completed');
    if (savedCompleted) {
      setGrammarCompleted(JSON.parse(savedCompleted));
    }
    const savedHistory = localStorage.getItem('grammar_quiz_history');
    if (savedHistory) {
      setGrammarHistory(JSON.parse(savedHistory));
    }
  }, []);

  const grammarCompletedCount = grammarCompleted.length;
  const grammarHistoryItems = Object.keys(grammarHistory).map(key => ({
    topicId: key,
    ...grammarHistory[key]
  }));

  // Difficulty counts (Map all database words)
  let easyTotal = 0, mediumTotal = 0, hardTotal = 0;
  let easyLearned = 0, mediumLearned = 0, hardLearned = 0;

  vocab.forEach(t => {
    t.words.forEach(w => {
      const isL = progress.learned.includes(w.word);
      if (w.difficulty === 'easy') {
        easyTotal++;
        if (isL) easyLearned++;
      } else if (w.difficulty === 'medium') {
        mediumTotal++;
        if (isL) mediumLearned++;
      } else if (w.difficulty === 'hard') {
        hardTotal++;
        if (isL) hardLearned++;
      }
    });
  });

  const easyPct = easyTotal > 0 ? Math.round((easyLearned / easyTotal) * 100) : 0;
  const mediumPct = mediumTotal > 0 ? Math.round((mediumLearned / mediumTotal) * 100) : 0;
  const hardPct = hardTotal > 0 ? Math.round((hardLearned / hardTotal) * 100) : 0;

  const handleReset = async () => {
    const confirmReset = window.confirm("Bạn có chắc chắn muốn xóa toàn bộ tiến trình học tập? Tất cả từ đã học, điểm số, chuỗi ngày học sẽ bị mất vĩnh viễn và không thể khôi phục.");
    if (confirmReset) {
      try {
        await API.resetProgress();
        // Xóa thêm localStorage liên quan đến Grammar
        localStorage.removeItem('grammar_completed');
        localStorage.removeItem('grammar_quiz_history');
        localStorage.removeItem('grammar_last_active_date');
        localStorage.removeItem('grammar_last_active_topic');
        alert("Đã đặt lại toàn bộ tiến độ!");
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Recent 8 quizzes for custom HTML chart
  const recentHistory = [...progress.history].slice(0, 8).reverse();

  return (
    <div className="page-fade container py-4">
      <header className="mb-4 d-flex justify-content-between align-items-center">
        <h2 className="fw-bold m-0">Tiến độ học tập</h2>
        <button onClick={handleReset} className="btn btn-sm btn-game btn-game-outline text-danger border-danger">
          Đặt lại toàn bộ
        </button>
      </header>

      {/* Stats Grid */}
      <section className="row g-4 mb-5">
        <div className="col-6 col-md-3 col-lg-2">
          <div className="game-card text-center p-3 d-flex flex-column align-items-center justify-content-center">
            <div className="d-flex align-items-center justify-content-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="0.5" className="me-1">
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
              </svg>
              <span className="text-muted small">Chuỗi ngày</span>
            </div>
            <h4 className="fw-bold m-0 text-primary">{progress.streak} ngày</h4>
          </div>
        </div>
        <div className="col-6 col-md-3 col-lg-2">
          <div className="game-card text-center p-3">
            <span className="text-muted small d-block mb-1">Từ đã học</span>
            <h4 className="fw-bold m-0 text-primary">{learnedCount}/{totalWords}</h4>
          </div>
        </div>
        <div className="col-6 col-md-3 col-lg-2">
          <div className="game-card text-center p-3">
            <span className="text-muted small d-block mb-1">Xong Từ vựng</span>
            <h4 className="fw-bold m-0 text-primary">{completedTopicsCount}/{totalTopics} bài</h4>
          </div>
        </div>
        <div className="col-6 col-md-3 col-lg-2">
          <div className="game-card text-center p-3">
            <span className="text-muted small d-block mb-1">Xong Ngữ pháp</span>
            <h4 className="fw-bold m-0 text-success">{grammarCompletedCount}/{totalGrammarTopics} bài</h4>
          </div>
        </div>
        <div className="col-6 col-md-3 col-lg-2">
          <div className="game-card text-center p-3">
            <span className="text-muted small d-block mb-1">Đã làm Quiz</span>
            <h4 className="fw-bold m-0 text-primary">{progress.history.length + grammarHistoryItems.length} lượt</h4>
          </div>
        </div>
        <div className="col-6 col-md-3 col-lg-2">
          <div className="game-card text-center p-3">
            <span className="text-muted small d-block mb-1">Học Từ vựng</span>
            <h4 className="fw-bold m-0 text-primary">{studyMinutes} phút</h4>
          </div>
        </div>
      </section>

      {/* Charts section */}
      <section className="row g-4 mb-5">
        
        {/* Difficulty breakdown */}
        <div className="col-12 col-md-6">
          <div className="game-card h-100">
            <h5 className="fw-bold mb-4">Phân tích từ vựng theo độ khó</h5>
            
            <div className="mb-3">
              <div className="d-flex justify-content-between mb-1 small text-muted">
                <span>Dễ (Easy)</span>
                <span>{easyLearned}/{easyTotal} từ ({easyPct}%)</span>
              </div>
              <div className="progress-container" style={{ height: '10px' }}>
                <div className="progress-bar-animated bg-success" style={{ width: `${easyPct}%` }}></div>
              </div>
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between mb-1 small text-muted">
                <span>Trung bình (Medium)</span>
                <span>{mediumLearned}/{mediumTotal} từ ({mediumPct}%)</span>
              </div>
              <div className="progress-container" style={{ height: '10px' }}>
                <div className="progress-bar-animated bg-warning" style={{ width: `${mediumPct}%` }}></div>
              </div>
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between mb-1 small text-muted">
                <span>Khó (Hard)</span>
                <span>{hardLearned}/{hardTotal} từ ({hardPct}%)</span>
              </div>
              <div className="progress-container" style={{ height: '10px' }}>
                <div className="progress-bar-animated bg-danger" style={{ width: `${hardPct}%` }}></div>
              </div>
            </div>

          </div>
        </div>

        {/* Custom Visual Chart */}
        <div className="col-12 col-md-6">
          <div className="game-card h-100">
            <h5 className="fw-bold mb-4">Biểu đồ điểm số 8 lượt làm Quiz gần nhất</h5>
            {recentHistory.length > 0 ? (
              <div className="d-flex align-items-end justify-content-around h-75 pt-3" style={{ height: '200px' }}>
                {recentHistory.map((h, i) => (
                  <div key={i} className="text-center d-flex flex-column align-items-center" style={{ flex: 1 }}>
                    <span className="small text-muted" style={{ fontSize: '0.75rem' }}>{h.percentage}%</span>
                    <div 
                      className="bg-primary rounded-top mt-1" 
                      style={{ 
                        width: '20px', 
                        height: `${Math.max(h.percentage * 1.5, 4)}px`,
                        background: 'linear-gradient(to top, var(--primary), var(--secondary))' 
                      }}
                    ></div>
                    <span className="small text-muted text-truncate mt-2" style={{ maxWidth: '60px', fontSize: '0.7rem' }}>
                      {h.topic.split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5 text-muted">
                Bạn chưa thực hiện bài kiểm tra trắc nghiệm nào. Hãy làm bài để ghi nhận điểm số nhé!
              </div>
            )}
          </div>
        </div>

      </section>

      {/* History Log */}
      <section className="row mt-4">
        <div className="col-12">
          <div className="game-card">
            <h5 className="fw-bold mb-4">Lịch sử làm bài trắc nghiệm</h5>
            
            <ul className="nav nav-tabs mb-3 border-color" id="historyTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link active fw-semibold text-primary" id="vocab-tab" data-bs-toggle="tab" data-bs-target="#vocab-history" type="button" role="tab">
                  ✏️ Lịch sử Từ vựng
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link fw-semibold text-success" id="grammar-tab" data-bs-toggle="tab" data-bs-target="#grammar-history" type="button" role="tab">
                  📚 Lịch sử Ngữ pháp
                </button>
              </li>
            </ul>

            <div className="tab-content" id="historyTabContent">
              {/* Vocab History */}
              <div className="tab-pane fade show active" id="vocab-history" role="tabpanel">
                {progress.history.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Chủ đề kiểm tra</th>
                          <th>Số câu đúng</th>
                          <th>Tỷ lệ đúng</th>
                          <th>Thời gian làm bài</th>
                        </tr>
                      </thead>
                      <tbody>
                        {progress.history.map((h, idx) => (
                          <tr key={h.id}>
                            <td>{idx + 1}</td>
                            <td className="fw-bold">{h.topic}</td>
                            <td>{h.score}/{h.total}</td>
                            <td className="fw-semibold text-success">{h.percentage}%</td>
                            <td className="text-muted small">{h.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted">
                    Chưa có dữ liệu làm bài kiểm tra từ vựng.
                  </div>
                )}
              </div>

              {/* Grammar History */}
              <div className="tab-pane fade" id="grammar-history" role="tabpanel">
                {grammarHistoryItems.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Chuyên đề Ngữ pháp</th>
                          <th>Số câu đúng</th>
                          <th>Tỷ lệ đúng</th>
                          <th>Ngày kiểm tra</th>
                        </tr>
                      </thead>
                      <tbody>
                        {grammarHistoryItems.map((h, idx) => {
                          const topic = grammarData.find(t => t.id === parseInt(h.topicId));
                          return (
                            <tr key={h.topicId}>
                              <td>{idx + 1}</td>
                              <td className="fw-bold">{topic ? topic.title : `Chuyên đề ${h.topicId}`}</td>
                              <td>{h.correct}/{h.total}</td>
                              <td className="fw-semibold text-success">{h.score}%</td>
                              <td className="text-muted small">{h.date}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted">
                    Chưa có dữ liệu làm bài kiểm tra ngữ pháp.
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
