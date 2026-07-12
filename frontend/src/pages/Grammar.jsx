import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { grammarData } from '../data/grammarData';

export default function Grammar() {
  const [completedTopics, setCompletedTopics] = useState([]);
  const [quizHistory, setQuizHistory] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPart, setFilterPart] = useState('all');

  useEffect(() => {
    const savedCompleted = localStorage.getItem('grammar_completed');
    if (savedCompleted) {
      setCompletedTopics(JSON.parse(savedCompleted));
    }
    const savedHistory = localStorage.getItem('grammar_quiz_history');
    if (savedHistory) {
      setQuizHistory(JSON.parse(savedHistory));
    }
  }, []);

  const totalTopics = grammarData.length;
  const progressPercent = totalTopics > 0 ? Math.round((completedTopics.length / totalTopics) * 100) : 0;

  // Helper to map topic ID to all 7 TOEIC Parts (Direct grammar or Indirect Listening support)
  const getToeicParts = (id) => {
    const parts = [];
    
    // Direct Reading mapping
    if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 16].includes(id)) parts.push(5);
    if ([12, 13, 14, 15, 17].includes(id)) parts.push(6);
    if ([18, 19, 20, 21, 22, 23].includes(id)) parts.push(7);

    // Indirect Listening support mapping
    if ([5, 7, 10].includes(id)) parts.push(1); // Part 1 uses Tenses, Passives & Prepositions (locations)
    if ([3, 4, 11].includes(id)) parts.push(2); // Part 2 uses Pronouns, Verbs/Auxiliary & Conjunctions
    if ([5, 11, 13].includes(id)) parts.push(3); // Part 3 uses Tenses, Conjunctions & Verb forms
    if ([5, 11, 13].includes(id)) parts.push(4); // Part 4 uses Tenses, Conjunctions & Verb forms

    return parts.sort((a, b) => a - b);
  };

  // Filter & Search logic
  const filteredTopics = grammarData.filter(t => {
    const isCompleted = completedTopics.includes(t.id);
    const hasHistory = !!quizHistory[t.id];
    let status = 'unstarted';

    if (isCompleted) {
      status = 'completed';
    } else if (hasHistory) {
      status = 'studying';
    }

    if (filterStatus !== 'all' && filterStatus !== status) {
      return false;
    }

    if (filterPart !== 'all') {
      const parts = getToeicParts(t.id);
      if (!parts.includes(parseInt(filterPart))) {
        return false;
      }
    }

    const query = searchQuery.toLowerCase().trim();
    if (query) {
      return t.title.toLowerCase().includes(query) || t.description.toLowerCase().includes(query);
    }

    return true;
  });

  return (
    <div className="page-fade container py-4">
      {/* Top Banner */}
      <header className="row mb-4 align-items-center g-3">
        <div className="col-12 col-md-3">
          <h2 className="fw-bold m-0">Ngữ pháp TOEIC</h2>
          <p className="text-muted small mb-0">Học toàn bộ {totalTopics} chuyên đề ngữ pháp trọng tâm</p>
        </div>

        {/* Search */}
        <div className="col-12 col-sm-4 col-md-3">
          <input 
            type="text" 
            className="form-control border-2 rounded-4 p-2 fs-6" 
            placeholder="Tìm chuyên đề..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ boxShadow: 'none' }}
          />
        </div>

        {/* Status Filter */}
        <div className="col-6 col-sm-4 col-md-3">
          <select 
            className="form-select border-2 rounded-4 p-2" 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ boxShadow: 'none' }}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="completed">Đã hoàn thành</option>
            <option value="studying">Đang học</option>
            <option value="unstarted">Chưa học</option>
          </select>
        </div>

        {/* Part Filter */}
        <div className="col-6 col-sm-4 col-md-3">
          <select 
            className="form-select border-2 rounded-4 p-2" 
            value={filterPart}
            onChange={(e) => setFilterPart(e.target.value)}
            style={{ boxShadow: 'none' }}
          >
            <option value="all">Tất cả các Part</option>
            <option value="1">TOEIC Part 1</option>
            <option value="2">TOEIC Part 2</option>
            <option value="3">TOEIC Part 3</option>
            <option value="4">TOEIC Part 4</option>
            <option value="5">TOEIC Part 5</option>
            <option value="6">TOEIC Part 6</option>
            <option value="7">TOEIC Part 7</option>
          </select>
        </div>
      </header>

      {/* Global Progress Card */}
      <section className="row mb-5">
        <div className="col-12">
          <div className="game-card p-4">
            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-3">
              <div>
                <h5 className="fw-bold m-0">Tiến độ nắm vững ngữ pháp</h5>
                <p className="text-muted small m-0">Hoàn thành 100% quiz của chuyên đề để đánh dấu hoàn thành</p>
              </div>
              <h3 className="fw-bold text-primary m-0">{completedTopics.length}/{totalTopics} chuyên đề ({progressPercent}%)</h3>
            </div>
            <div className="progress-container" style={{ height: '14px' }}>
              <div className="progress-bar-animated" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Chuyên đề */}
      <section className="row g-4">
        {filteredTopics.map(t => {
          const isCompleted = completedTopics.includes(t.id);
          const history = quizHistory[t.id];
          const parts = getToeicParts(t.id);
          
          let badge = <span className="text-muted small fw-medium">Chưa bắt đầu</span>;
          if (isCompleted) {
            badge = <span className="badge bg-success bg-opacity-10 text-success border border-success rounded-pill px-2 py-1 small fw-semibold">Hoàn thành</span>;
          } else if (history) {
            badge = <span className="badge bg-warning bg-opacity-10 text-warning border border-warning rounded-pill px-2 py-1 small fw-semibold">Đang học ({history.score}%)</span>;
          }

          return (
            <div className="col-12 col-md-6 col-lg-4" key={t.id}>
              <div className="game-card h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div className="d-flex gap-1">
                      <span className="badge bg-primary text-white px-2 py-1 small fw-bold" style={{ fontSize: '0.65rem' }}>
                        Chuyên đề {t.id}
                      </span>
                      {parts.map(p => (
                        <span key={p} className="badge bg-secondary text-primary px-2 py-1 small fw-bold" style={{ fontSize: '0.65rem', backgroundColor: 'rgba(37, 99, 235, 0.08)' }}>
                          Part {p}
                        </span>
                      ))}
                    </div>
                    {badge}
                  </div>
                  <h5 className="fw-bold text-main mt-2 mb-2">{t.title}</h5>
                  <p className="text-muted small mb-3" style={{ 
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: '1.5'
                  }}>
                    {t.description}
                  </p>
                  <div className="small text-muted mb-3" style={{ fontSize: '0.8rem' }}>
                    <strong>Đo quan trọng:</strong> {t.importance}
                  </div>
                </div>

                <div className="d-flex gap-2 mt-3">
                  <Link to={`/grammar/study/${t.id}`} className="btn btn-sm btn-game btn-game-primary flex-fill text-center">Học bài</Link>
                  <Link to={`/grammar/quiz/${t.id}`} className="btn btn-sm btn-game btn-game-outline flex-fill text-center">Quiz</Link>
                </div>
              </div>
            </div>
          );
        })}

        {filteredTopics.length === 0 && (
          <div className="col-12 text-center py-5">
            <h5 className="fw-bold text-muted mb-1">Không tìm thấy chuyên đề nào</h5>
            <p className="text-muted small">Hãy thử tìm với các bộ lọc hoặc từ khóa khác nhé!</p>
          </div>
        )}
      </section>
    </div>
  );
}
