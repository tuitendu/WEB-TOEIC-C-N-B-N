import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API } from '../api';

export default function Dashboard() {
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
        <h5 className="text-muted">Đang tải tiến trình học...</h5>
      </div>
    );
  }

  const totalWords = vocab.reduce((sum, t) => sum + t.words.length, 0);
  const totalTopics = vocab.length;
  const completionRate = totalWords > 0 ? Math.round((progress.learned.length / totalWords) * 100) : 0;
  const wrongWordsCount = Object.keys(progress.wrong).length;



  // Decide Continue Study button path
  const handleContinueStudy = () => {
    if (progress.last_topic) {
      navigate(`/study/${encodeURIComponent(progress.last_topic)}`);
    } else {
      navigate('/topics');
    }
  };

  // Recommended 3 topics
  let recommendedTopics = [];
  const lastTopicIdx = vocab.findIndex(t => t.topic === progress.last_topic);
  if (lastTopicIdx !== -1) {
    recommendedTopics.push(vocab[lastTopicIdx]);
    if (vocab[lastTopicIdx + 1]) recommendedTopics.push(vocab[lastTopicIdx + 1]);
    if (vocab[lastTopicIdx + 2]) recommendedTopics.push(vocab[lastTopicIdx + 2]);
  } else {
    recommendedTopics = vocab.slice(0, 3);
  }
  // Pad up if we don't have 3
  if (recommendedTopics.length < 3 && vocab.length > 0) {
    recommendedTopics = vocab.slice(0, 3);
  }

  return (
    <div className="page-fade container py-4">
      {/* Hero Banner */}
      <section className="row mb-5">
        <div className="col-12">
          <div className="hero-banner d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-4">
            <div>
              <h1 className="fw-bold mb-2">Chinh phục 600 từ vựng TOEIC!</h1>
              <p className="mb-4 opacity-90">Phương pháp học flashcard thông minh kết hợp làm trắc nghiệm giúp ghi nhớ từ vựng hiệu quả.</p>
              <button onClick={handleContinueStudy} className="btn btn-game btn-game-primary px-4 py-2 text-white">
                {progress.last_topic ? `Tiếp tục học: ${progress.last_topic}` : 'Bắt đầu học ngay'}
              </button>
            </div>
            <div className="d-flex gap-3 align-items-center">
              <div 
                className="p-3 text-center rounded-4 border border-white border-opacity-10 d-flex flex-column align-items-center justify-content-center" 
                style={{ 
                  minWidth: '140px', 
                  backgroundColor: 'rgba(255, 255, 255, 0.15)', 
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="d-flex align-items-center justify-content-center mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="0.5" className="me-1">
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                  </svg>
                  <span className="text-white fw-medium small">Chuỗi ngày học</span>
                </div>
                <span className="fw-bold fs-3 d-block text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.15)' }}>{progress.streak} ngày</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="row g-4 mb-5">
        <div className="col-12">
          <div className="game-card">
            <h4 className="fw-bold mb-4">Tiến độ tổng quan</h4>
            <div className="row g-4 text-center align-items-center mb-4">
              <div className="col-6 col-md-3">
                <div className="fs-2 fw-bold text-primary">{progress.completed.length}/{totalTopics}</div>
                <div className="text-muted small">Chủ đề hoàn thành</div>
              </div>
              <div className="col-6 col-md-3">
                <div className="fs-2 fw-bold text-primary">{progress.learned.length}/{totalWords}</div>
                <div className="text-muted small">Từ vựng đã học</div>
              </div>
              <div className="col-6 col-md-3">
                <div className="fs-2 fw-bold text-primary">{wrongWordsCount}</div>
                <div className="text-muted small">Từ vựng cần ôn tập</div>
              </div>
              <div className="col-6 col-md-3">
                <div className="fs-2 fw-bold text-primary">{completionRate}%</div>
                <div className="text-muted small">Tỷ lệ hoàn thành</div>
              </div>
            </div>
            <div className="progress-container">
              <div className="progress-bar-animated" style={{ width: `${completionRate}%` }}></div>
            </div>
          </div>
        </div>
      </section>



      {/* Suggested Topics */}
      <section className="row mb-5">
        <div className="col-12 d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold m-0">Chủ đề đề xuất học tiếp</h4>
          <Link to="/topics" className="btn btn-sm btn-game btn-game-outline">Xem tất cả</Link>
        </div>
        <div className="col-12">
          <div className="row g-4">
            {recommendedTopics.map(t => {
              const topicWords = t.words.map(w => w.word);
              const learnedCount = topicWords.filter(w => progress.learned.includes(w)).length;
              const topicProgress = topicWords.length > 0 ? Math.round((learnedCount / topicWords.length) * 100) : 0;

              let statusBadge = <span className="badge bg-secondary rounded-pill">Chưa học</span>;
              if (topicProgress === 100) {
                statusBadge = <span className="badge bg-success rounded-pill">Hoàn thành</span>;
              } else if (topicProgress > 0) {
                statusBadge = <span className="badge bg-warning text-dark rounded-pill">Đang học</span>;
              }

              return (
                <div className="col-12 col-md-4" key={t.topic}>
                  <div className="game-card h-100 d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="fw-bold m-0 text-truncate" style={{ maxWidth: '70%' }}>
                          {t.topic} <span className="text-muted fw-normal" style={{ fontSize: '0.9rem' }}>({t.meaning})</span>
                        </h5>
                        {statusBadge}
                      </div>
                      <p className="text-muted small mb-3">{t.words.length} từ vựng</p>
                      <div className="mb-3">
                        <div className="d-flex justify-content-between mb-1 small text-muted">
                          <span>Tiến độ</span>
                          <span>{topicProgress}%</span>
                        </div>
                        <div className="progress-container" style={{ height: '10px' }}>
                          <div className="progress-bar-animated" style={{ width: `${topicProgress}%` }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex gap-2 mt-3">
                      <Link to={`/study/${encodeURIComponent(t.topic)}`} className="btn btn-sm btn-game btn-game-primary flex-fill text-center">Học từ</Link>
                      <Link to={`/quiz/${encodeURIComponent(t.topic)}`} className="btn btn-sm btn-game btn-game-outline flex-fill text-center">Làm Quiz</Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
