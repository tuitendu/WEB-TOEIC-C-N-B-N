import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API, isLoggedIn } from '../api';
import { ToastContext } from '../App';

export default function Quiz() {
  const { topicName } = useParams();
  const [vocab, setVocab] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  // Quiz state
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const [speakSupported, setSpeakSupported] = useState(false);
  const [exampleVi, setExampleVi] = useState('');
  const [translating, setTranslating] = useState(false);
  const showToast = useContext(ToastContext);

  // Nhắc nhở guest một lần
  useEffect(() => {
    if (!isLoggedIn() && showToast) {
      showToast('🔐 Chưa đăng nhập — kết quả trắc nghiệm sẽ không được lưu lại');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const vData = await API.getVocabulary();
        const pData = await API.getProgress();
        setVocab(vData);
        setProgress(pData);
        if ('speechSynthesis' in window) {
          setSpeakSupported(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [topicName]);

  const playSpeech = (text) => {
    if (!speakSupported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  // Dịch câu ví dụ sang tiếng Việt qua Google Translate free endpoint
  const translateExample = async (text) => {
    if (!text) return;
    setExampleVi('');
    setTranslating(true);
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(text)}`;
      const res  = await fetch(url);
      const data = await res.json();
      const translated = data[0]?.map(seg => seg[0]).join('') || '';
      setExampleVi(translated);
    } catch {
      setExampleVi(''); // dịch thất bại thì bỏ qua
    } finally {
      setTranslating(false);
    }
  };

  const playSoundEffect = (type) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      if (type === 'correct') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'incorrect') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.35);
        
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch (err) {
      console.error("Audio Context playback failed", err);
    }
  };

  // Auto-pronounce when index changes
  useEffect(() => {
    if (quizStarted && questions[currentIndex]) {
      const t = setTimeout(() => {
        playSpeech(questions[currentIndex].word);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [currentIndex, quizStarted, questions]);

  // Generate quiz questions
  const startQuiz = () => {
    let quizWords = [];
    let questionCount = 10;
    
    if (topicName) {
      const decodedTopic = decodeURIComponent(topicName);
      const foundTopic = vocab.find(t => t.topic === decodedTopic);
      if (foundTopic) {
        quizWords = [...foundTopic.words];
        questionCount = quizWords.length; // Test all words (12 or 13)
      }
    } else {
      // General quiz: gather all words from the database
      vocab.forEach(t => {
        quizWords.push(...t.words);
      });
      questionCount = 20; // Test 20 random words for general practice
    }

    if (quizWords.length === 0) return;

    // Shuffle and pick words
    quizWords.sort(() => 0.5 - Math.random());
    const selectedWords = quizWords.slice(0, questionCount);

    // Build questions
    const allMeanings = [];
    vocab.forEach(t => {
      t.words.forEach(w => {
        if (!allMeanings.includes(w.meaning)) {
          allMeanings.push(w.meaning);
        }
      });
    });

    const quizQuestions = selectedWords.map(word => {
      // Pick 3 random distractors
      const distractors = allMeanings
        .filter(m => m !== word.meaning)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      const options = [word.meaning, ...distractors].sort(() => 0.5 - Math.random());

      return {
        word: word.word,
        pronunciation: word.pronunciation,
        partOfSpeech: word.partOfSpeech,
        correctMeaning: word.meaning,
        example: word.example,
        options
      };
    });

    setQuestions(quizQuestions);
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setWrongAnswers([]);
    setQuizFinished(false);
    setQuizStarted(true);
  };

  const handleOptionClick = async (option) => {
    if (selectedOption !== null) return;
    setSelectedOption(option);
    setExampleVi('');

    const currentQuestion = questions[currentIndex];
    const isCorrect = (option === currentQuestion.correctMeaning);

    if (isCorrect) {
      setScore(prev => prev + 1);
      playSoundEffect('correct');
    } else {
      setWrongAnswers(prev => [...prev, currentQuestion]);
      playSoundEffect('incorrect');
      try {
        await API.addWrongWord(currentQuestion.word);
      } catch (err) {
        console.error(err);
      }
    }

    // Dịch câu ví dụ ngay khi chọn đáp án
    if (currentQuestion.example) {
      translateExample(currentQuestion.example);
    }
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setExampleVi('');       // reset bản dịch cho câu tiếp theo
    } else {
      // Quiz finished
      setQuizFinished(true);
      
      // Save quiz result to backend history
      const pct = Math.round((score / questions.length) * 100);
      const dateStr = new Date().toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      try {
        const topicLabel = topicName ? decodeURIComponent(topicName) : "Luyện tập tổng hợp";
        const finalScore = score; // capture before async
        const isPerfect  = finalScore === questions.length && topicName;

        await API.addQuizHistory(topicLabel, finalScore, questions.length, pct, dateStr);

        if (topicName) {
          const todayStr = new Date().toISOString().split('T')[0];
          await API.updateTopicActivity(decodeURIComponent(topicName), todayStr);
        }

        // ── Mastery logic: 100% trên quiz chủ đề → đánh dấu tất cả từ đã thuộc ──
        if (isPerfect) {
          const decodedTopic = decodeURIComponent(topicName);
          const foundTopic   = vocab.find(t => t.topic === decodedTopic);
          if (foundTopic) {
            await Promise.all(
              foundTopic.words.map(w => API.addLearnedWord(w.word))
            );
            // Mark topic completed
            await API.updateCompletedTopic(decodedTopic, true);
          }
        }

        // Streak update
        const today = new Date().toDateString();
        if (progress && progress.last_active_date !== today) {
          const nextStreak = progress.streak + 1;
          await API.updateStats('streak', nextStreak.toString());
          await API.updateStats('last_active_date', today);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <h5 className="text-muted">Đang chuẩn bị bài trắc nghiệm...</h5>
      </div>
    );
  }

  // Render Start Page
  if (!quizStarted) {
    return (
      <div className="page-fade container py-5 text-center">
        <div className="game-card max-width-md mx-auto p-5" style={{ maxWidth: '550px' }}>
          <h2 className="fw-bold mb-3">Bài trắc nghiệm từ vựng</h2>
          <p className="text-muted mb-4">
            {topicName 
              ? `Học phần sẽ kiểm tra ngẫu nhiên 10 từ vựng thuộc chủ đề "${decodeURIComponent(topicName)}".`
              : "Luyện tập tổng hợp ngẫu nhiên 10 từ vựng trong tất cả các bài học."
            }
          </p>
          <button onClick={startQuiz} className="btn btn-game btn-game-primary px-5 py-2 text-white">
            Bắt đầu làm bài
          </button>
          <div className="mt-3">
            <Link to="/topics" className="text-decoration-none text-muted small">Quay lại danh sách chủ đề</Link>
          </div>
        </div>
      </div>
    );
  }

  // Render Finished Summary Page
  if (quizFinished) {
    const percentage  = Math.round((score / questions.length) * 100);
    const isPerfect   = score === questions.length && !!topicName;

    return (
      <div className="page-fade container py-4">
        <div className="game-card max-width-md mx-auto p-5 text-center" style={{ maxWidth: '650px' }}>
          <h2 className="fw-bold text-primary mb-2">Kết quả làm bài</h2>
          <p className="text-muted mb-4">{topicName ? decodeURIComponent(topicName) : "Luyện tập tổng hợp"}</p>

          {/* Mastery badge */}
          {isPerfect && (
            <div className="alert mb-4 py-3" style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.1))',
              border: '2px solid rgba(16,185,129,0.4)',
              borderRadius: '12px',
              color: 'var(--success)'
            }}>
              <div className="fw-bold fs-5 mb-1">🏆 Xuất sắc! Đã thuộc chủ đề này!</div>
              <div className="small">Tất cả {questions.length} từ vựng đã được đánh dấu là <strong>Đã thuộc</strong>.</div>
            </div>
          )}

          <div className="row g-4 mb-4">
            <div className="col-6">
              <div className="fs-1 fw-bold" style={{ color: isPerfect ? 'var(--success)' : 'inherit' }}>{score}/{questions.length}</div>
              <div className="text-muted small">Số câu trả lời đúng</div>
            </div>
            <div className="col-6">
              <div className="fs-1 fw-bold" style={{ color: isPerfect ? 'var(--success)' : 'inherit' }}>{percentage}%</div>
              <div className="text-muted small">Điểm số đạt được</div>
            </div>
          </div>

          <div className="progress-container mb-4" style={{ height: '14px' }}>
            <div className="progress-bar-animated" style={{ width: `${percentage}%` }}></div>
          </div>

          {!isPerfect && topicName && (
            <div className="small text-muted mb-4" style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '0.6rem 1rem' }}>
              💡 Làm đúng <strong>100% ({questions.length}/{questions.length})</strong> để đánh dấu tất cả từ là <em>Đã thuộc</em>.
            </div>
          )}

          {wrongAnswers.length > 0 && (
            <div className="text-start mb-4">
              <h5 className="fw-bold text-danger mb-3">Các từ trả lời sai:</h5>
              <div className="list-group">
                {wrongAnswers.map((item, idx) => (
                  <div className="list-group-item bg-transparent border-color py-2 px-3 text-main" key={idx}>
                    <strong className="text-primary">{item.word}</strong> <span className="text-muted">({item.partOfSpeech})</span>
                    <span className="mx-2">-</span>
                    <span className="text-success">{item.correctMeaning}</span>
                    {item.example && (
                      <div className="small text-muted font-monospace mt-1">
                        {highlightWord(item.example, item.word)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="d-flex gap-3 justify-content-center">
            <button onClick={startQuiz} className="btn btn-game btn-game-primary text-white">Làm lại bài</button>
            <Link to="/topics" className="btn btn-game btn-game-outline">Xem chủ đề khác</Link>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const optionLetters   = ['A', 'B', 'C', 'D'];

  // Highlight the quiz word inside the example sentence
  const highlightWord = (sentence, word) => {
    if (!sentence || !word) return sentence;
    const regex = new RegExp(`(${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts  = sentence.split(regex);
    return parts.map((part, i) =>
      regex.test(part)
        ? <strong key={i} className="text-primary">{part}</strong>
        : part
    );
  };

  return (
    <div className="page-fade container py-4">
      {/* Quiz Progress header */}
      <div className="row justify-content-center mb-4">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="d-flex justify-content-between mb-1 small text-muted">
            <span>Câu hỏi: {currentIndex + 1}/{questions.length}</span>
            <span>Đúng: {score} câu</span>
          </div>
          <div className="progress-container" style={{ height: '8px' }}>
            <div className="progress-bar-animated" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}></div>
          </div>
        </div>
      </div>

      {/* Question panel */}
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="game-card mb-4 p-4 text-center">
            <span className="badge bg-secondary text-uppercase fw-semibold mb-2" style={{ fontSize: '0.75rem' }}>
              {currentQuestion.partOfSpeech}
            </span>
            <h2 className="fw-bold text-primary mb-1 d-flex align-items-center justify-content-center gap-3" style={{ fontSize: '2.5rem' }}>
              <span>{currentQuestion.word}</span>
              {speakSupported && (
                <button 
                  onClick={() => playSpeech(currentQuestion.word)} 
                  className="btn btn-game btn-game-outline p-2 d-inline-flex align-items-center justify-content-center"
                  style={{ borderRadius: '50%', width: '36px', height: '36px', minWidth: '36px' }}
                  title="Nghe phát âm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                  </svg>
                </button>
              )}
            </h2>
            <span className="ipa-symbol mb-3 d-block">{currentQuestion.pronunciation}</span>
            <div className="text-muted small border-top border-color pt-3 mt-2">
              Từ này có nghĩa Tiếng Việt là gì?
            </div>
          </div>

          {/* Options */}
          <div className="mb-4">
            {currentQuestion.options.map((option, idx) => {
              let btnClass = 'quiz-option-btn';
              if (selectedOption !== null) {
                if (option === currentQuestion.correctMeaning) {
                  btnClass += ' correct';
                } else if (selectedOption === option) {
                  btnClass += ' incorrect';
                }
              }

              return (
                <button 
                  key={idx}
                  onClick={() => handleOptionClick(option)}
                  className={btnClass}
                  disabled={selectedOption !== null}
                >
                  <span className="fw-bold me-3 text-primary">{optionLetters[idx]}</span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          {/* Details Explanation card */}
          {selectedOption !== null && (
            <div className="explain-card page-fade text-start mb-4">
              <div className="fw-semibold text-primary mb-1 small">Giải thích & Ngữ cảnh:</div>
              <div className="text-main mb-2 font-monospace" style={{ fontSize: '0.9rem' }}>
                <strong>{currentQuestion.word}</strong> ({currentQuestion.partOfSpeech}) : {currentQuestion.correctMeaning}
              </div>
              {currentQuestion.example && (
                <div>
                  <div className="small font-monospace" style={{ color: 'var(--text-main)', lineHeight: 1.7 }}>
                    {highlightWord(currentQuestion.example, currentQuestion.word)}
                  </div>
                  {translating && (
                    <div className="small text-muted mt-1" style={{ fontStyle: 'italic' }}>Đang dịch...</div>
                  )}
                  {exampleVi && !translating && (
                    <div className="small mt-1" style={{
                      color: 'var(--text-muted)',
                      fontStyle: 'italic',
                      borderTop: '1px dashed var(--border-color)',
                      paddingTop: '4px',
                      marginTop: '4px'
                    }}>
                      ➤ {exampleVi}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Next Button */}
          {selectedOption !== null && (
            <div className="text-center">
              <button onClick={handleNext} className="btn btn-game btn-game-primary px-5 py-2 text-white">
                {currentIndex < questions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
