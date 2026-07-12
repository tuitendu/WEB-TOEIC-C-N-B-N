import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { grammarData } from '../data/grammarData';

export default function GrammarQuiz() {
  const { topicId } = useParams();
  const currentId = parseInt(topicId) || 1;
  const activeTopic = grammarData.find(t => t.id === currentId) || grammarData[0];

  // State
  const [completedTopics, setCompletedTopics] = useState([]);
  const [quizHistory, setQuizHistory] = useState({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [quizDuration, setQuizDuration] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState([]);
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewList, setReviewList] = useState([]);
  const [reviewIndex, setReviewIndex] = useState(0);

  // Translation
  const [translatedQuestion, setTranslatedQuestion] = useState('');
  const [translating, setTranslating] = useState(false);

  useEffect(() => {
    const savedCompleted = localStorage.getItem('grammar_completed');
    if (savedCompleted) {
      setCompletedTopics(JSON.parse(savedCompleted));
    }
    const savedHistory = localStorage.getItem('grammar_quiz_history');
    if (savedHistory) {
      setQuizHistory(JSON.parse(savedHistory));
    }
  }, [topicId]);

  const saveCompleted = (newCompleted) => {
    setCompletedTopics(newCompleted);
    localStorage.setItem('grammar_completed', JSON.stringify(newCompleted));
  };

  // Play Sound Effects
  const playSound = (type) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      if (type === 'correct') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
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
    } catch (e) {
      console.warn(e);
    }
  };

  // Google Translate
  const translateQuestion = async (text) => {
    if (!text) return;
    setTranslatedQuestion('');
    setTranslating(true);
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(text)}`;
      const res = await fetch(url);
      const data = await res.json();
      const translation = data[0]?.map(s => s[0]).join('') || '';
      setTranslatedQuestion(translation);
    } catch {
      setTranslatedQuestion('');
    } finally {
      setTranslating(false);
    }
  };

  // Start Quiz & Randomize
  const startQuiz = () => {
    if (!activeTopic.quiz || activeTopic.quiz.length === 0) return;

    const questionsCopy = activeTopic.quiz.map((q) => {
      const shuffledOptions = [...q.choices].sort(() => 0.5 - Math.random());
      return {
        ...q,
        shuffledChoices: shuffledOptions,
        correctAnswerString: q.answer
      };
    });

    const finalShuffled = questionsCopy.sort(() => 0.5 - Math.random());

    setShuffledQuestions(finalShuffled);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setCorrectCount(0);
    setWrongQuestions([]);
    setQuizStartTime(Date.now());
    setQuizFinished(false);
    setQuizStarted(true);
    setReviewMode(false);
    setTranslatedQuestion('');
  };

  const handleSelectAnswer = (choice) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(choice);
    const currentQ = shuffledQuestions[currentIndex];
    const isCorrect = (choice === currentQ.correctAnswerString);

    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      playSound('correct');
    } else {
      setWrongQuestions(prev => [...prev, currentQ]);
      playSound('incorrect');
    }

    translateQuestion(currentQ.question);
  };

  const handleNext = () => {
    setTranslatedQuestion('');
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      // Quiz completed
      const duration = Math.round((Date.now() - quizStartTime) / 1000);
      setQuizDuration(duration);
      setQuizFinished(true);

      const score = Math.round((correctCount / shuffledQuestions.length) * 100);
      const newHistory = {
        ...quizHistory,
        [currentId]: {
          score,
          correct: correctCount,
          total: shuffledQuestions.length,
          date: new Date().toLocaleDateString('vi-VN')
        }
      };
      setQuizHistory(newHistory);
      localStorage.setItem('grammar_quiz_history', JSON.stringify(newHistory));

      // Auto mark completed if 100% score
      if (score === 100 && !completedTopics.includes(currentId)) {
        const updated = [...completedTopics, currentId];
        saveCompleted(updated);
      }
    }
  };

  // Review incorrect questions
  const startReview = () => {
    if (wrongQuestions.length === 0) return;
    const reviewCopy = wrongQuestions.map(q => ({
      ...q,
      shuffledChoices: [...q.choices].sort(() => 0.5 - Math.random())
    }));
    setReviewList(reviewCopy);
    setReviewIndex(0);
    setSelectedAnswer(null);
    setReviewMode(true);
    setQuizFinished(false);
    setTranslatedQuestion('');
    translateQuestion(reviewCopy[0].question);
  };

  const handleReviewAnswer = (choice) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(choice);
    const currentQ = reviewList[reviewIndex];
    const isCorrect = (choice === currentQ.correctAnswerString);
    if (isCorrect) {
      playSound('correct');
    } else {
      playSound('incorrect');
    }
  };

  const nextReviewQuestion = () => {
    setTranslatedQuestion('');
    if (reviewIndex < reviewList.length - 1) {
      setReviewIndex(prev => prev + 1);
      setSelectedAnswer(null);
      translateQuestion(reviewList[reviewIndex + 1].question);
    } else {
      setReviewMode(false);
      setQuizFinished(true);
    }
  };

  return (
    <div className="page-fade container py-4">
      {/* Breadcrumb */}
      <div className="mb-4">
        <Link to="/grammar" className="text-decoration-none text-muted small">Ngữ pháp</Link>
        <span className="text-muted small mx-2">/</span>
        <Link to={`/grammar/study/${currentId}`} className="text-decoration-none text-muted small">{activeTopic.title}</Link>
        <span className="text-muted small mx-2">/</span>
        <span className="fw-semibold small">Luyện tập</span>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="game-card p-4">
            
            {/* 1. START PAGE */}
            {!quizStarted && !quizFinished && (
              <div className="text-center py-4">
                <h3 className="fw-bold mb-3">Bài test chuyên đề</h3>
                <h5 className="text-primary fw-semibold mb-3">{activeTopic.title}</h5>
                <p className="text-muted small mb-4">
                  Bài trắc nghiệm gồm <strong>{activeTopic.quiz ? activeTopic.quiz.length : 0} câu hỏi</strong> định dạng ETS TOEIC để kiểm tra và củng cố kiến thức của bạn.
                </p>

                {quizHistory[currentId] && (
                  <div className="mb-4 p-3 rounded-3 border border-color d-flex justify-content-around" style={{ backgroundColor: 'var(--bg-card)' }}>
                    <div>
                      <div className="small text-muted">Điểm cao nhất</div>
                      <div className="fw-bold text-primary fs-4">{quizHistory[currentId].score}%</div>
                    </div>
                    <div>
                      <div className="small text-muted">Số câu đúng</div>
                      <div className="fw-bold text-success fs-4">{quizHistory[currentId].correct}/{quizHistory[currentId].total}</div>
                    </div>
                  </div>
                )}

                <button onClick={startQuiz} className="btn btn-game btn-game-primary px-5 py-2 text-white">
                  Bắt đầu làm bài
                </button>
              </div>
            )}

            {/* 2. ACTIVE QUIZ ARENA */}
            {quizStarted && !quizFinished && (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-2 small text-muted">
                  <span>Câu hỏi: {currentIndex + 1}/{shuffledQuestions.length}</span>
                  <span>Đúng: {correctCount} câu</span>
                </div>
                <div className="progress-container mb-4" style={{ height: '8px' }}>
                  <div className="progress-bar-animated" style={{ width: `${((currentIndex + 1) / shuffledQuestions.length) * 100}%` }}></div>
                </div>

                {/* Question Box */}
                <div className="game-card p-4 text-center mb-4">
                  <span className="badge bg-secondary text-uppercase fw-semibold mb-2" style={{ fontSize: '0.65rem' }}>
                    TOEIC Part 5 • {shuffledQuestions[currentIndex].difficulty}
                  </span>
                  <h4 className="fw-bold text-main mb-0" style={{ lineHeight: 1.6, fontSize: '1.25rem' }}>
                    {shuffledQuestions[currentIndex].question}
                  </h4>
                </div>

                {/* Choices */}
                <div className="d-flex flex-column gap-2 mb-4">
                  {shuffledQuestions[currentIndex].shuffledChoices.map((choice, idx) => {
                    const optionLetters = ['A', 'B', 'C', 'D'];
                    let btnClass = 'quiz-option-btn';
                    if (selectedAnswer !== null) {
                      if (choice === shuffledQuestions[currentIndex].correctAnswerString) {
                        btnClass += ' correct';
                      } else if (selectedAnswer === choice) {
                        btnClass += ' incorrect';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectAnswer(choice)}
                        disabled={selectedAnswer !== null}
                        className={btnClass}
                      >
                        <span className="fw-bold me-3 text-primary">{optionLetters[idx]}</span>
                        <span>{choice}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Card */}
                {selectedAnswer !== null && (
                  <div className="explain-card page-fade text-start mb-4">
                    <div className="fw-semibold text-primary mb-1 small">Giải thích đáp án:</div>
                    <div className="text-main mb-2 small" style={{ lineHeight: 1.6 }}>
                      {shuffledQuestions[currentIndex].explanation}
                    </div>
                    {shuffledQuestions[currentIndex].question && (
                      <div className="mt-2" style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '6px' }}>
                        <span className="fw-semibold text-success small">Dịch nghĩa câu hỏi:</span>
                        {translating && (
                          <div className="small text-muted font-italic">Đang dịch...</div>
                        )}
                        {translatedQuestion && !translating && (
                          <div className="small text-muted font-monospace mt-1">
                            ➤ {translatedQuestion}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Next Control */}
                {selectedAnswer !== null && (
                  <div className="text-center">
                    <button onClick={handleNext} className="btn btn-game btn-game-primary px-5 py-2 text-white">
                      {currentIndex < shuffledQuestions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 3. REVIEW INCORRECT QUESTIONS */}
            {reviewMode && !quizFinished && (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-2 small text-muted">
                  <span>Ôn tập câu sai: {reviewIndex + 1}/{reviewList.length}</span>
                </div>
                <div className="progress-container mb-4" style={{ height: '8px' }}>
                  <div className="progress-bar-animated" style={{ width: `${((reviewIndex + 1) / reviewList.length) * 100}%` }}></div>
                </div>

                {/* Question Box */}
                <div className="game-card p-4 text-center mb-4">
                  <span className="badge bg-danger text-white text-uppercase fw-semibold mb-2" style={{ fontSize: '0.65rem' }}>
                    ÔN TẬP CÂU SAI
                  </span>
                  <h4 className="fw-bold text-main mb-0" style={{ lineHeight: 1.6, fontSize: '1.25rem' }}>
                    {reviewList[reviewIndex].question}
                  </h4>
                </div>

                {/* Choices */}
                <div className="d-flex flex-column gap-2 mb-4">
                  {reviewList[reviewIndex].shuffledChoices.map((choice, idx) => {
                    const optionLetters = ['A', 'B', 'C', 'D'];
                    let btnClass = 'quiz-option-btn';
                    if (selectedAnswer !== null) {
                      if (choice === reviewList[reviewIndex].correctAnswerString) {
                        btnClass += ' correct';
                      } else if (selectedAnswer === choice) {
                        btnClass += ' incorrect';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleReviewAnswer(choice)}
                        disabled={selectedAnswer !== null}
                        className={btnClass}
                      >
                        <span className="fw-bold me-3 text-primary">{optionLetters[idx]}</span>
                        <span>{choice}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Card */}
                {selectedAnswer !== null && (
                  <div className="explain-card page-fade text-start mb-4">
                    <div className="fw-semibold text-primary mb-1 small">Giải thích đáp án:</div>
                    <div className="text-main mb-2 small">
                      {reviewList[reviewIndex].explanation}
                    </div>
                    {translatedQuestion && (
                      <div className="mt-2" style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '6px' }}>
                        <span className="fw-semibold text-success small">Dịch nghĩa:</span>
                        <div className="small text-muted font-monospace mt-1">➤ {translatedQuestion}</div>
                      </div>
                    )}
                  </div>
                )}

                {/* Next Button */}
                {selectedAnswer !== null && (
                  <div className="text-center">
                    <button onClick={nextReviewQuestion} className="btn btn-game btn-game-primary px-5 py-2 text-white">
                      {reviewIndex < reviewList.length - 1 ? 'Câu tiếp theo' : 'Xem lại tổng kết'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 4. SUMMARY RESULT */}
            {quizFinished && (
              <div className="text-center py-4">
                <h2 className="fw-bold text-primary mb-2">Kết quả làm bài</h2>
                <p className="text-muted mb-4">{activeTopic.title}</p>

                {correctCount === shuffledQuestions.length ? (
                  <div className="alert bg-success bg-opacity-10 border border-success border-opacity-25 rounded-4 p-3 mb-4 text-success text-center">
                    <div className="fw-bold fs-5 mb-1">Xuất sắc! Làm đúng 100%!</div>
                    <div className="small">Bạn đã hoàn thành và nắm vững chuyên đề này!</div>
                  </div>
                ) : (
                  <div className="alert bg-primary bg-opacity-5 border border-primary border-opacity-25 rounded-4 p-3 mb-4 text-center">
                    <div className="fw-bold fs-6 text-primary">Mẹo hoàn thành:</div>
                    <div className="small text-main">Đạt điểm tuyệt đối 100% để chính thức hoàn thành bài học.</div>
                  </div>
                )}

                <div className="row g-3 mb-4 justify-content-center">
                  <div className="col-4">
                    <div className="fs-3 fw-bold text-primary">{correctCount}/{shuffledQuestions.length}</div>
                    <div className="text-muted small" style={{ fontSize: '0.75rem' }}>Số câu đúng</div>
                  </div>
                  <div className="col-4">
                    <div className="fs-3 fw-bold text-success">{Math.round((correctCount / shuffledQuestions.length) * 100)}%</div>
                    <div className="text-muted small" style={{ fontSize: '0.75rem' }}>Chính xác</div>
                  </div>
                  <div className="col-4">
                    <div className="fs-3 fw-bold text-warning">{quizDuration}s</div>
                    <div className="text-muted small" style={{ fontSize: '0.75rem' }}>Thời gian</div>
                  </div>
                </div>

                {wrongQuestions.length > 0 && (
                  <div className="text-start mb-4">
                    <h6 className="fw-bold text-danger mb-3">Xem lại {wrongQuestions.length} câu đã trả lời sai:</h6>
                    <div className="d-flex flex-column gap-3">
                      {wrongQuestions.map((q, idx) => (
                        <div key={idx} className="p-3 rounded-3 border border-danger border-opacity-20 bg-danger bg-opacity-5">
                          <div className="fw-bold text-main small mb-2">{q.question}</div>
                          <div className="small text-success mb-2">
                            Đáp án đúng: <strong>{q.correctAnswerString}</strong>
                          </div>
                          <div className="small p-2 bg-white rounded border border-color font-monospace" style={{ fontSize: '0.8rem' }}>
                            <strong>Giải thích:</strong> {q.explanation}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="d-flex gap-2 justify-content-center flex-wrap mt-4">
                  <button onClick={startQuiz} className="btn btn-game btn-game-primary text-white px-4">
                    Làm lại bài Test
                  </button>
                  {wrongQuestions.length > 0 && (
                    <button onClick={startReview} className="btn btn-game btn-game-outline px-4 text-danger border-danger">
                      Ôn tập câu sai
                    </button>
                  )}
                  <Link to={`/grammar/study/${currentId}`} className="btn btn-game btn-game-outline px-4">
                    Quay lại bài học
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
