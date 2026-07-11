import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../api';

export default function Topics() {
  const [vocab, setVocab] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

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
        <h5 className="text-muted">Đang tải danh sách chủ đề...</h5>
      </div>
    );
  }

  // Filter & Search Logic
  const filteredTopics = vocab.filter(t => {
    const topicWords = t.words.map(w => w.word);
    const learnedCount = topicWords.filter(w => progress.learned.includes(w)).length;
    const progressPct = topicWords.length > 0 ? Math.round((learnedCount / topicWords.length) * 100) : 0;

    let status = 'unstarted';
    if (progressPct === 100) {
      status = 'completed';
    } else if (progressPct > 0) {
      status = 'studying';
    }

    // Apply status filter
    if (filterStatus === 'review') {
      const lastActiveStr = progress.topic_activity?.[t.topic];
      if (!lastActiveStr) return false;
      const lastActive = new Date(lastActiveStr);
      const today = new Date();
      const d1 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const d2 = new Date(lastActive.getFullYear(), lastActive.getMonth(), lastActive.getDate());
      const diffDays = Math.round((d1 - d2) / (1000 * 60 * 60 * 24));
      if (diffDays < 3) return false;
    } else if (filterStatus !== 'all' && filterStatus !== status) {
      return false;
    }

    // Apply search filter (topic name, meaning, or words inside)
    const query = searchQuery.toLowerCase().trim();
    if (query) {
      const matchTopic = t.topic.toLowerCase().includes(query) || t.meaning.toLowerCase().includes(query);
      const matchWords = t.words.some(w => 
        w.word.toLowerCase().includes(query) || 
        w.meaning.toLowerCase().includes(query)
      );
      return matchTopic || matchWords;
    }

    return true;
  });

  return (
    <div className="page-fade container py-4">
      {/* Header controls */}
      <header className="row mb-4 align-items-center g-3">
        <div className="col-12 col-md-4">
          <h2 className="fw-bold m-0">Danh sách chủ đề</h2>
        </div>
        
        {/* Search */}
        <div className="col-12 col-sm-6 col-md-4">
          <input 
            type="text" 
            className="form-control border-2 rounded-4 p-2 fs-6" 
            placeholder="Tìm chủ đề hoặc từ vựng..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ boxShadow: 'none' }}
          />
        </div>
        
        {/* Filter */}
        <div className="col-12 col-sm-6 col-md-4">
          <div className="d-flex justify-content-sm-end">
            <select 
              className="form-select border-2 rounded-4 p-2" 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ width: 'auto', boxShadow: 'none' }}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="completed">Đã hoàn thành</option>
              <option value="studying">Đang học</option>
              <option value="unstarted">Chưa học</option>
              <option value="review">Cần ôn tập (Sau 3 ngày)</option>
            </select>
          </div>
        </div>
      </header>

      {/* Grid list */}
      <section className="row g-4">
        {filteredTopics.map(t => {
          const topicWords = t.words.map(w => w.word);
          const learnedCount = topicWords.filter(w => progress.learned.includes(w)).length;
          const progressPct = topicWords.length > 0 ? Math.round((learnedCount / topicWords.length) * 100) : 0;

          // Check if it requires review (studied >= 3 days ago)
          const lastActiveStr = progress.topic_activity?.[t.topic];
          let needsReview = false;
          let diffDays = 0;
          if (lastActiveStr) {
            const lastActive = new Date(lastActiveStr);
            const today = new Date();
            const d1 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const d2 = new Date(lastActive.getFullYear(), lastActive.getMonth(), lastActive.getDate());
            diffDays = Math.round((d1 - d2) / (1000 * 60 * 60 * 24));
            needsReview = diffDays >= 3;
          }

          let badge = <span className="text-muted small fw-medium">Chưa bắt đầu</span>;
          if (needsReview) {
            badge = <span className="badge bg-danger bg-opacity-10 text-danger border border-danger rounded-pill px-2 py-1 small fw-semibold">Ôn tập ({diffDays} ngày trước)</span>;
          } else if (progressPct === 100) {
            badge = <span className="badge bg-success bg-opacity-10 text-success border border-success rounded-pill px-2 py-1 small fw-semibold">Hoàn thành</span>;
          } else if (progressPct > 0) {
            badge = <span className="badge bg-warning bg-opacity-10 text-warning border border-warning rounded-pill px-2 py-1 small fw-semibold">Đang học</span>;
          }

          return (
            <div className="col-12 col-md-6 col-lg-4" key={t.topic}>
              <div className={`game-card h-100 d-flex flex-column justify-content-between ${needsReview ? 'border-warning' : ''}`}>
                <div>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="fw-bold m-0 text-truncate" style={{ maxWidth: '60%' }}>
                      {t.topic} <span className="text-muted fw-normal" style={{ fontSize: '0.85rem' }}><br />({t.meaning})</span>
                    </h5>
                    {badge}
                  </div>
                  <div className="text-muted small mb-3">
                    <span>{t.words.length} từ vựng</span>
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1 small text-muted">
                      <span>Đã thuộc: {learnedCount}/{t.words.length}</span>
                      <span>{progressPct}%</span>
                    </div>
                    <div className="progress-container" style={{ height: '12px' }}>
                      <div className="progress-bar-animated" style={{ width: `${progressPct}%` }}></div>
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-2 mt-4">
                  <Link to={`/study/${encodeURIComponent(t.topic)}`} className="btn btn-sm btn-game btn-game-primary flex-fill text-center">Học từ</Link>
                  <Link to={`/quiz/${encodeURIComponent(t.topic)}`} className="btn btn-sm btn-game btn-game-outline flex-fill text-center">Quiz</Link>
                </div>
              </div>
            </div>
          );
        })}

        {filteredTopics.length === 0 && (
          <div className="col-12 text-center py-5">
            <h5 className="fw-bold text-muted mb-1">Không tìm thấy kết quả nào</h5>
            <p className="text-muted small">Hãy thử tìm với các từ khóa khác xem sao nhé!</p>
          </div>
        )}
      </section>
    </div>
  );
}
