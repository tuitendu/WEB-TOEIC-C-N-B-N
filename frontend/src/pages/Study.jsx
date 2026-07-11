import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API, isLoggedIn } from '../api';
import { ToastContext } from '../App';

export default function Study() {
  const { topicName } = useParams();
  const [topic, setTopic] = useState(null);
  const [progress, setProgress] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [speakSupported, setSpeakSupported] = useState(false);
  const [exampleVi, setExampleVi] = useState('');
  const [translating, setTranslating] = useState(false);
  const showToast = useContext(ToastContext);

  // Nhắc nhở guest một lần khi mở trang
  useEffect(() => {
    if (!isLoggedIn() && showToast) {
      showToast('🔐 Chưa đăng nhập — tiến trình học sẽ không được lưu lại');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const vocab = await API.getVocabulary();
        const found = vocab.find(t => t.topic === decodeURIComponent(topicName));
        setTopic(found);

        const pData = await API.getProgress();
        setProgress(pData);

        // Web Speech API check
        if ('speechSynthesis' in window) {
          setSpeakSupported(true);
        }

        // Record last active topic
        await API.updateStats('last_topic', decodeURIComponent(topicName));
        const todayStr = new Date().toISOString().split('T')[0];
        await API.updateTopicActivity(decodeURIComponent(topicName), todayStr);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [topicName]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <h5 className="text-muted">Đang tải học phần từ vựng...</h5>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="container py-5 text-center">
        <h4 className="text-danger">Không tìm thấy chủ đề {decodeURIComponent(topicName)}</h4>
        <Link to="/topics" className="btn btn-game btn-game-outline mt-3">Quay lại danh sách</Link>
      </div>
    );
  }

  const word = topic.words[currentIndex];
  const isLearned = progress?.learned.includes(word.word);
  const isFavorite = progress?.favorites.includes(word.word);

  // Dịch câu ví dụ sang Tiếng Việt
  const translateExample = async (text) => {
    if (!text) return;
    setExampleVi('');
    setTranslating(true);
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(text)}`;
      const res  = await fetch(url);
      const data = await res.json();
      setExampleVi(data[0]?.map(s => s[0]).join('') || '');
    } catch {
      setExampleVi('');
    } finally {
      setTranslating(false);
    }
  };

  const handleFlip = () => {
    const next = !isFlipped;
    setIsFlipped(next);
    // Dịch khi lật sang mặt sau
    if (next && word?.example) {
      translateExample(word.example);
    }
  };

  // Reset bản dịch khi chuyển từ
  const goToWord = (idx) => {
    setCurrentIndex(idx);
    setIsFlipped(false);
    setExampleVi('');
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (currentIndex < topic.words.length - 1) goToWord(currentIndex + 1);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (currentIndex > 0) goToWord(currentIndex - 1);
  };

  const toggleLearned = async (e) => {
    e.stopPropagation();
    if (!progress) return;
    try {
      if (isLearned) {
        await API.deleteLearnedWord(word.word);
        setProgress(prev => ({
          ...prev,
          learned: prev.learned.filter(w => w !== word.word)
        }));
      } else {
        await API.addLearnedWord(word.word);
        setProgress(prev => {
          const nextLearned = [...prev.learned, word.word];
          // Check if topic is newly completed
          const allWordNames = topic.words.map(w => w.word);
          const isTopicComplete = allWordNames.every(wName => nextLearned.includes(wName));
          if (isTopicComplete) {
            API.updateCompletedTopic(topic.topic, true);
          }
          return {
            ...prev,
            learned: nextLearned,
            completed: isTopicComplete ? [...prev.completed, topic.topic] : prev.completed
          };
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFavorite = async (e) => {
    e.stopPropagation();
    if (!progress) return;
    try {
      const nextFav = !isFavorite;
      await API.updateFavorite(word.word, nextFav);
      setProgress(prev => ({
        ...prev,
        favorites: nextFav ? [...prev.favorites, word.word] : prev.favorites.filter(w => w !== word.word)
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const playSpeech = (e) => {
    e.stopPropagation();
    if (!speakSupported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word.word);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="page-fade container py-4">
      {/* Header breadcrumb */}
      <div className="mb-4">
        <Link to="/topics" className="text-decoration-none text-muted small">Chủ đề</Link>
        <span className="text-muted small mx-2">/</span>
        <span className="fw-semibold small">{topic.topic}</span>
      </div>

      <header className="text-center mb-4">
        <h2 className="fw-bold m-0">
          {topic.topic} <span className="text-muted fw-normal" style={{ fontSize: '1.2rem' }}>({topic.meaning})</span>
        </h2>
        <p className="text-muted small mt-1">Học từ vựng bằng thẻ ghi nhớ (Flashcard)</p>
      </header>

      {/* Progress indicators */}
      <div className="row justify-content-center mb-4">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="d-flex justify-content-between mb-1 small text-muted">
            <span>Đang học: {currentIndex + 1}/{topic.words.length} từ</span>
            <span>{Math.round(((currentIndex + 1) / topic.words.length) * 100)}%</span>
          </div>
          <div className="progress-container" style={{ height: '8px' }}>
            <div className="progress-bar-animated" style={{ width: `${((currentIndex + 1) / topic.words.length) * 100}%` }}></div>
          </div>
        </div>
      </div>

      {/* Card Arena */}
      <div className="row justify-content-center mb-5">
        <div className="col-12 col-md-8 col-lg-6">
          <div className={`flashcard-wrapper ${isFlipped ? 'is-flipped' : ''}`} onClick={handleFlip}>
            <div className="flashcard-inner">
              
              {/* Front side (English word details) */}
              <div className="card-front">
                <div className="position-absolute top-0 start-0 m-3">
                  <span className="badge bg-danger bg-opacity-10 text-danger border border-danger px-2 py-1 small text-uppercase fw-semibold" style={{ letterSpacing: '0.5px' }}>
                    {word.difficulty}
                  </span>
                </div>
                <div className="position-absolute top-0 end-0 m-3">
                  <span className="text-muted small fw-medium">English</span>
                </div>
                
                <h1 className="fw-bold text-primary mb-2 mt-4" style={{ fontSize: '3rem', letterSpacing: '-1px' }}>{word.word}</h1>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <span className="ipa-symbol">{word.pronunciation}</span>
                  {speakSupported && (
                    <button 
                      onClick={playSpeech} 
                      className="btn btn-game btn-game-outline p-2 d-inline-flex align-items-center justify-content-center"
                      style={{ borderRadius: '50%', width: '40px', height: '40px' }}
                      title="Nghe phát âm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                      </svg>
                    </button>
                  )}
                </div>
                <span className="badge bg-secondary px-3 py-1 text-uppercase fw-semibold mb-4" style={{ fontSize: '0.75rem' }}>
                  {word.partOfSpeech}
                </span>
                
                <p className="hint-text">Bấm vào thẻ để xem nghĩa Tiếng Việt</p>
              </div>

              {/* Back side (Vietnamese translation & Example) */}
              <div className="card-back">
                <div className="position-absolute top-0 end-0 m-3">
                  <span className="text-muted small fw-medium">Tiếng Việt</span>
                </div>
                
                <h3 className="fw-bold text-success mb-3">{word.meaning}</h3>
                
                <div className="explain-card w-100 text-start">
                  <div className="fw-semibold text-primary mb-1 small">Ví dụ minh họa:</div>
                  <p className="m-0 font-monospace text-main" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>{word.example}</p>
                  {translating && (
                    <p className="m-0 mt-1 small text-muted" style={{ fontStyle: 'italic' }}>Đang dịch...</p>
                  )}
                  {exampleVi && !translating && (
                    <p className="m-0 mt-1 small" style={{
                      color: 'var(--text-muted)',
                      fontStyle: 'italic',
                      borderTop: '1px dashed var(--border-color)',
                      paddingTop: '5px'
                    }}>
                      ➤ {exampleVi}
                    </p>
                  )}
                </div>
                
                <p className="hint-text mt-4">Bấm vào thẻ để quay lại mặt trước</p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="d-flex justify-content-center align-items-center gap-3">
        <button 
          onClick={handlePrev} 
          disabled={currentIndex === 0} 
          className="btn btn-game btn-game-outline px-4"
        >
          Trước
        </button>

        <button 
          onClick={toggleFavorite} 
          className={`btn btn-game ${isFavorite ? 'btn-game-primary' : 'btn-game-outline'} px-3`}
          title="Đánh dấu yêu thích"
        >
          {isFavorite ? 'Đã yêu thích' : 'Yêu thích'}
        </button>

        <button 
          onClick={toggleLearned} 
          className={`btn btn-game ${isLearned ? 'btn-game-primary' : 'btn-game-outline'} px-3`}
          title="Đánh dấu đã thuộc"
        >
          {isLearned ? 'Đã thuộc từ' : 'Chưa thuộc'}
        </button>

        <button 
          onClick={handleNext} 
          disabled={currentIndex === topic.words.length - 1} 
          className="btn btn-game btn-game-outline px-4"
        >
          Tiếp
        </button>
      </div>
    </div>
  );
}
