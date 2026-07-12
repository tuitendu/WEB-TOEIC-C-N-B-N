import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { grammarData } from '../data/grammarData';

export default function GrammarStudy() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [completedTopics, setCompletedTopics] = useState([]);
  const [activeTab, setActiveTab] = useState('theory'); // 'theory', 'examples', 'tips'

  const currentId = parseInt(topicId) || 1;
  const activeTopic = grammarData.find(t => t.id === currentId) || grammarData[0];

  useEffect(() => {
    const savedCompleted = localStorage.getItem('grammar_completed');
    if (savedCompleted) {
      setCompletedTopics(JSON.parse(savedCompleted));
    }
  }, [topicId]);

  const isCompleted = completedTopics.includes(currentId);

  const saveCompleted = (newCompleted) => {
    setCompletedTopics(newCompleted);
    localStorage.setItem('grammar_completed', JSON.stringify(newCompleted));
    localStorage.setItem('grammar_last_active_date', new Date().toISOString().split('T')[0]);
  };

  const toggleCompleted = () => {
    let updated;
    if (isCompleted) {
      updated = completedTopics.filter(id => id !== currentId);
    } else {
      updated = [...completedTopics, currentId];
    }
    saveCompleted(updated);
  };

  const handleNext = () => {
    if (currentId < grammarData.length) {
      setActiveTab('theory');
      navigate(`/grammar/study/${currentId + 1}`);
    }
  };

  const handlePrev = () => {
    if (currentId > 1) {
      setActiveTab('theory');
      navigate(`/grammar/study/${currentId - 1}`);
    }
  };

  return (
    <div className="page-fade container py-4">
      {/* Breadcrumb */}
      <div className="mb-4">
        <Link to="/grammar" className="text-decoration-none text-muted small">Ngữ pháp</Link>
        <span className="text-muted small mx-2">/</span>
        <span className="fw-semibold small">{activeTopic.title}</span>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-lg-9">
          <div className="game-card p-4">
            
            {/* Header Area */}
            <div className="border-bottom border-color pb-3 mb-4 d-flex flex-wrap align-items-start justify-content-between gap-3">
              <div>
                <div className="d-flex align-items-center gap-2">
                  <span className="badge bg-primary text-uppercase px-2 py-1 fw-bold" style={{ fontSize: '0.65rem' }}>
                    Chuyên đề {activeTopic.id}
                  </span>
                  {isCompleted && (
                    <span className="badge bg-success bg-opacity-10 text-success border border-success px-2 py-1 fw-semibold" style={{ fontSize: '0.65rem' }}>
                      Đã hoàn thành
                    </span>
                  )}
                </div>
                <h2 className="fw-bold text-main mt-2 mb-1">{activeTopic.title}</h2>
                <p className="text-muted small mb-0">{activeTopic.description}</p>
              </div>

              {/* Toggle complete button */}
              <button
                onClick={toggleCompleted}
                className={`btn btn-sm ${isCompleted ? 'btn-success text-white' : 'btn-game btn-game-outline'} py-2 px-3 fw-semibold`}
              >
                {isCompleted ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="nav nav-tabs nav-fill mb-4 border-color">
              <button 
                className={`nav-link py-3 ${activeTab === 'theory' ? 'active fw-bold text-primary border-bottom border-2 border-primary' : 'text-muted'}`}
                onClick={() => setActiveTab('theory')}
              >
                Lý thuyết &amp; Công thức
              </button>
              <button 
                className={`nav-link py-3 ${activeTab === 'examples' ? 'active fw-bold text-primary border-bottom border-2 border-primary' : 'text-muted'}`}
                onClick={() => setActiveTab('examples')}
              >
                Ví dụ &amp; Cách dùng
              </button>
              <button 
                className={`nav-link py-3 ${activeTab === 'tips' ? 'active fw-bold text-primary border-bottom border-2 border-primary' : 'text-muted'}`}
                onClick={() => setActiveTab('tips')}
              >
                Mẹo &amp; Lỗi thường gặp
              </button>
            </div>

            {/* Tab Body Content */}
            <div className="tab-content min-vh-40 mb-5">
              
              {/* Theory Tab */}
              {activeTab === 'theory' && (
                <div className="page-fade">
                  <div className="alert bg-primary bg-opacity-5 border border-primary border-opacity-20 rounded-4 p-3 mb-4">
                    <h6 className="fw-bold text-primary mb-1">Độ quan trọng trong TOEIC:</h6>
                    <p className="small text-main mb-0">{activeTopic.importance}</p>
                  </div>

                  <h5 className="fw-bold text-primary mb-3">Công thức cốt lõi:</h5>
                  <div className="row g-3 mb-4">
                    {activeTopic.formula && activeTopic.formula.map((f, i) => (
                      <div className="col-12" key={i}>
                        <div className="p-3 rounded-3 font-monospace bg-white border border-color text-primary fw-semibold" style={{ fontSize: '0.95rem' }}>
                          {f}
                        </div>
                      </div>
                    ))}
                  </div>

                  <h5 className="fw-bold text-primary mb-3">Tổng quan ngữ pháp:</h5>
                  <div className="p-3 rounded-4 bg-white border border-color">
                    <p className="text-main mb-0" style={{ lineHeight: 1.7 }}>
                      {activeTopic.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Examples Tab */}
              {activeTab === 'examples' && (
                <div className="page-fade">
                  <h5 className="fw-bold text-primary mb-3">Phân loại cách sử dụng:</h5>
                  <div className="row g-3 mb-4">
                    {activeTopic.usage && activeTopic.usage.map((u, i) => (
                      <div className="col-12 col-md-6" key={i}>
                        <div className="p-3 rounded-3 border border-color bg-white h-100">
                          <h6 className="fw-bold text-primary">{u.title}</h6>
                          <p className="small text-muted mb-2">{u.description}</p>
                          {u.signalWords && u.signalWords.length > 0 && (
                            <div className="d-flex flex-wrap gap-1 align-items-center">
                              <span className="small text-muted me-1">Dấu hiệu:</span>
                              {u.signalWords.map((sw, idx) => (
                                <span key={idx} className="badge bg-secondary bg-opacity-25 text-primary rounded-pill small" style={{ fontSize: '0.7rem' }}>
                                  {sw}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <h5 className="fw-bold text-primary mb-3">Ví dụ chi tiết (Bối cảnh TOEIC Business):</h5>
                  <div className="d-flex flex-column gap-3">
                    {activeTopic.examples && activeTopic.examples.map((ex, i) => (
                      <div className="p-3 rounded-3 border border-color bg-white" key={i}>
                        <div className="fw-bold text-primary fs-5 mb-1">{ex.english}</div>
                        <div className="text-muted small mb-2 font-monospace">{ex.vietnamese}</div>
                        <div className="small text-main" style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '6px' }}>
                          <strong>Phân tích:</strong> <span className="font-monospace text-muted">{ex.explanation}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tips Tab */}
              {activeTab === 'tips' && (
                <div className="page-fade">
                  <h5 className="fw-bold text-danger mb-3">Lỗi thường gặp cần tránh:</h5>
                  <div className="row g-3 mb-4">
                    {activeTopic.commonMistakes && activeTopic.commonMistakes.map((m, i) => (
                      <div className="col-12" key={i}>
                        <div className="p-3 rounded-3 border border-danger border-opacity-20 bg-danger bg-opacity-5 text-main small" style={{ lineHeight: 1.6 }}>
                          {m}
                        </div>
                      </div>
                    ))}
                  </div>

                  <h5 className="fw-bold text-success mb-3">Mẹo làm bài nhanh trong phòng thi:</h5>
                  <div className="d-flex flex-column gap-2">
                    {activeTopic.tips && activeTopic.tips.map((t, i) => (
                      <div className="d-flex align-items-start gap-2 p-3 rounded-3 border border-success border-opacity-20 bg-success bg-opacity-5" key={i}>
                        <p className="small text-main m-0" style={{ lineHeight: 1.6 }}>{t}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Quick Actions Footer */}
            <div className="d-flex justify-content-center mb-4">
              <Link to={`/grammar/quiz/${currentId}`} className="btn btn-game btn-game-primary px-5 py-3 text-white fw-bold shadow-sm">
                Làm bài test luyện tập (Quiz)
              </Link>
            </div>

            {/* Bottom Navigation Control buttons */}
            <div className="d-flex align-items-center justify-content-between pt-3 border-top border-color">
              <button
                onClick={handlePrev}
                disabled={currentId === 1}
                className="btn btn-game btn-game-outline px-4"
              >
                Chuyên đề trước
              </button>

              <div className="text-muted small">
                Chuyên đề {currentId} / {grammarData.length}
              </div>

              <button
                onClick={handleNext}
                disabled={currentId === grammarData.length}
                className="btn btn-game btn-game-outline px-4"
              >
                Chuyên đề sau
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
