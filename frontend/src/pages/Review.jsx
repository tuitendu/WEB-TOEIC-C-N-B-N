import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../api';

export default function Review() {
  const [vocab, setVocab] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  // Active state
  const [wrongWordsList, setWrongWordsList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [speakSupported, setSpeakSupported] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const vData = await API.getVocabulary();
        const pData = await API.getProgress();
        setVocab(vData);
        setProgress(pData);

        // Web Speech API check
        if ('speechSynthesis' in window) {
          setSpeakSupported(true);
        }

        // Map wrong words object to array of actual word objects
        const allWordsMap = {};
        vData.forEach(t => {
          t.words.forEach(w => {
            allWordsMap[w.word] = w;
          });
        });

        const list = Object.keys(pData.wrong).map(wordName => {
          return {
            ...allWordsMap[wordName],
            wrongCount: pData.wrong[wordName]
          };
        }).filter(w => w.word !== undefined); // Remove discrepancies

        setWrongWordsList(list);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <h5 className="text-muted">Đang chuẩn bị học phần ôn tập...</h5>
      </div>
    );
  }

  // Handle empty state
  if (wrongWordsList.length === 0) {
    return (
      <div className="page-fade container py-5 text-center">
        <div className="game-card max-width-md mx-auto p-5" style={{ maxWidth: '550px' }}>
          <h3 className="fw-bold mb-3 text-success">Tuyệt vời!</h3>
          <p className="text-muted mb-4">Bạn không có từ vựng nào trả lời sai cần ôn tập. Hãy tiếp tục duy trì phong độ nhé!</p>
          <Link to="/topics" className="btn btn-game btn-game-primary text-white px-4">
            Học chủ đề mới
          </Link>
        </div>
      </div>
    );
  }

  const word = wrongWordsList[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < wrongWordsList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
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

  const handleMarkAsLearned = async (e) => {
    e.stopPropagation();
    try {
      // Remove word from SQLite wrong list
      await API.deleteWrongWord(word.word);
      
      // Update local state
      const nextList = wrongWordsList.filter(item => item.word !== word.word);
      setWrongWordsList(nextList);
      
      // Adjust currentIndex if necessary
      if (currentIndex >= nextList.length && nextList.length > 0) {
        setCurrentIndex(nextList.length - 1);
      }
      setIsFlipped(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page-fade container py-4">
      <header className="text-center mb-4">
        <h2 className="fw-bold m-0 text-danger">Ôn tập từ sai</h2>
        <p className="text-muted small mt-1">Ôn lại các từ bạn đã trả lời sai trong các bài trắc nghiệm</p>
      </header>

      {/* Progress */}
      <div className="row justify-content-center mb-4">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="d-flex justify-content-between mb-1 small text-muted">
            <span>Cần ôn: {currentIndex + 1}/{wrongWordsList.length} từ</span>
            <span>Số lần sai: {word.wrongCount}</span>
          </div>
          <div className="progress-container" style={{ height: '8px' }}>
            <div className="progress-bar-animated" style={{ width: `${((currentIndex + 1) / wrongWordsList.length) * 100}%` }}></div>
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="row justify-content-center mb-5">
        <div className="col-12 col-md-8 col-lg-6">
          <div className={`flashcard-wrapper ${isFlipped ? 'is-flipped' : ''}`} onClick={handleFlip}>
            <div className="flashcard-inner">
              
              {/* Front */}
              <div className="card-front">
                <div className="position-absolute top-0 start-0 m-3">
                  <span className="badge bg-danger bg-opacity-10 text-danger border border-danger px-2 py-1 small text-uppercase fw-semibold">
                    Sai {word.wrongCount} lần
                  </span>
                </div>
                <h1 className="fw-bold text-primary mb-2 mt-4" style={{ fontSize: '3rem' }}>{word.word}</h1>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <span className="ipa-symbol">{word.pronunciation}</span>
                  {speakSupported && (
                    <button onClick={playSpeech} className="btn btn-sm btn-game btn-game-outline py-1 px-2">
                      Nghe
                    </button>
                  )}
                </div>
                <span className="badge bg-secondary px-3 py-1 text-uppercase fw-semibold mb-4" style={{ fontSize: '0.75rem' }}>
                  {word.partOfSpeech}
                </span>
                <p className="hint-text">Bấm để xem nghĩa Tiếng Việt</p>
              </div>

              {/* Back */}
              <div className="card-back">
                <h3 className="fw-bold text-success mb-3">{word.meaning}</h3>
                <div className="explain-card w-100 text-start">
                  <div className="fw-semibold text-primary mb-1 small">Ví dụ:</div>
                  <p className="m-0 font-monospace text-main" style={{ fontSize: '0.9rem' }}>{word.example}</p>
                </div>
                <p className="hint-text mt-4">Bấm để quay lại mặt trước</p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="d-flex justify-content-center align-items-center gap-3">
        <button 
          onClick={handlePrev} 
          disabled={currentIndex === 0} 
          className="btn btn-game btn-game-outline px-4"
        >
          Trước
        </button>

        <button 
          onClick={handleMarkAsLearned} 
          className="btn btn-game btn-game-primary text-white px-4"
          title="Xóa từ khỏi danh sách ôn tập"
        >
          Đã thuộc (Xóa)
        </button>

        <button 
          onClick={handleNext} 
          disabled={currentIndex === wrongWordsList.length - 1} 
          className="btn btn-game btn-game-outline px-4"
        >
          Tiếp
        </button>
      </div>
    </div>
  );
}
