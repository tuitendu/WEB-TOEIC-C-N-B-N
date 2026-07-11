// Quiz Controller logic
document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const topicName = params.get('topic');

  const db = await App.getDatabase();
  if (!db || db.length === 0) return;

  const quizController = new QuizController(db, topicName);
  quizController.init();
});

class QuizController {
  constructor(db, topicName) {
    this.db = db;
    this.topicName = topicName;
    this.questions = [];
    this.currentQuestionIdx = 0;
    this.score = 0;
    
    // Timer state
    this.timerInterval = null;
    this.elapsedSeconds = 0;

    // DOM Elements
    this.selectionSection = document.getElementById('selection-section');
    this.quizArenaSection = document.getElementById('quiz-arena-section');
    this.resultsSection = document.getElementById('results-section');
    
    this.topicSelect = document.getElementById('topic-select');
    this.startQuizBtn = document.getElementById('start-quiz-btn');
    
    this.quizTopicTitle = document.getElementById('quiz-topic-title');
    this.questionIndexLabel = document.getElementById('question-index-label');
    this.quizTimer = document.getElementById('quiz-timer');
    this.quizProgressBar = document.getElementById('quiz-progress-bar');
    
    this.questionText = document.getElementById('question-text');
    this.questionInstruction = document.getElementById('question-instruction');
    this.optionsContainer = document.getElementById('options-container');
    this.explanationContainer = document.getElementById('explanation-container');
    this.explanationText = document.getElementById('explanation-text');
    this.quizNextBtn = document.getElementById('quiz-next-btn');
    this.quizBtnSpeak = document.getElementById('quiz-btn-speak');
    
    // Results DOM
    this.gradeBadge = document.getElementById('grade-badge');
    this.resultsHeadline = document.getElementById('results-headline');
    this.resultsSubhead = document.getElementById('results-subhead');
    this.resCorrect = document.getElementById('res-correct');
    this.resIncorrect = document.getElementById('res-incorrect');
    this.resAccuracy = document.getElementById('res-accuracy');
    this.resTime = document.getElementById('res-time');
    this.resBtnRetry = document.getElementById('res-btn-retry');
  }

  init() {
    // Populate select element
    this.db.forEach(t => {
      const option = document.createElement('option');
      option.value = t.topic;
      option.textContent = `${t.topic} (${t.words.length} từ)`;
      this.topicSelect.appendChild(option);
    });

    // Check if topic is directly specified in URL
    if (this.topicName) {
      this.startQuiz(this.topicName);
    } else {
      this.selectionSection.classList.remove('d-none');
    }

    // Bindings
    this.startQuizBtn.addEventListener('click', () => {
      this.startQuiz(this.topicSelect.value);
    });

    this.quizNextBtn.addEventListener('click', () => {
      this.nextQuestion();
    });

    this.resBtnRetry.addEventListener('click', () => {
      this.startQuiz(this.activeTopicName);
    });
  }

  // Shuffle utility
  shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  // Gather distractor options from the database
  getDistractors(correctWord, count = 3) {
    const distractors = [];
    const allWords = [];
    
    this.db.forEach(t => {
      t.words.forEach(w => {
        if (w.word !== correctWord.word) {
          allWords.push(w);
        }
      });
    });

    // Pick unique choices
    const shuffled = this.shuffle([...allWords]);
    for (let i = 0; i < shuffled.length; i++) {
      if (distractors.length >= count) break;
      // Make sure we don't add duplicate meanings or word names
      const duplicateMeaning = distractors.some(d => d.meaning === shuffled[i].meaning);
      if (!duplicateMeaning) {
        distractors.push(shuffled[i]);
      }
    }

    return distractors;
  }

  startQuiz(topicSelection) {
    this.activeTopicName = topicSelection;
    this.selectionSection.classList.add('d-none');
    this.resultsSection.classList.add('d-none');
    this.quizArenaSection.classList.remove('d-none');

    // Load words
    let wordList = [];
    if (topicSelection === 'all-random') {
      this.quizTopicTitle.textContent = "Kiểm tra Tổng hợp";
      this.db.forEach(t => {
        wordList.push(...t.words);
      });
      wordList = this.shuffle(wordList).slice(0, 20); // 20 random words
    } else {
      const topicObj = this.db.find(t => t.topic === topicSelection);
      if (topicObj) {
        this.quizTopicTitle.textContent = topicObj.topic;
        wordList = this.shuffle([...topicObj.words]);
      }
    }

    // Build question set
    this.questions = wordList.map((word, index) => {
      // 3 types of questions: 
      // 0: English -> Vietnamese, 
      // 1: Vietnamese -> English, 
      // 2: Listening -> English
      const qType = Math.floor(Math.random() * 3);
      const options = [word, ...this.getDistractors(word, 3)];
      this.shuffle(options);

      return {
        word,
        type: qType,
        options
      };
    });

    // Reset Quiz State
    this.currentQuestionIdx = 0;
    this.score = 0;
    this.elapsedSeconds = 0;
    this.resetTimer();
    this.startTimer();

    // Render first question
    this.renderQuestion();
  }

  startTimer() {
    this.quizTimer.textContent = "Thời gian: 00:00";
    this.timerInterval = setInterval(() => {
      this.elapsedSeconds++;
      const mins = Math.floor(this.elapsedSeconds / 60).toString().padStart(2, '0');
      const secs = (this.elapsedSeconds % 60).toString().padStart(2, '0');
      this.quizTimer.textContent = `Thời gian: ${mins}:${secs}`;
    }, 1000);
  }

  resetTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  renderQuestion() {
    const q = this.questions[this.currentQuestionIdx];
    
    // Progress
    const total = this.questions.length;
    const progressPercent = Math.round((this.currentQuestionIdx / total) * 100);
    this.quizProgressBar.style.width = `${progressPercent}%`;
    this.questionIndexLabel.textContent = `Câu hỏi ${this.currentQuestionIdx + 1} / ${total}`;

    // Clean options & description
    this.optionsContainer.innerHTML = '';
    this.explanationContainer.classList.add('d-none');
    this.quizNextBtn.classList.add('d-none');

    // Question structure based on type
    if (q.type === 0) {
      // English -> Vietnamese
      this.questionText.textContent = q.word.word;
      this.questionInstruction.textContent = "Từ này có nghĩa Tiếng Việt là gì?";
      this.questionText.classList.remove('d-none');
      this.quizBtnSpeak.classList.remove('d-none');
      
      // Auto voice trigger
      Speech.speak(q.word.word);
      this.quizBtnSpeak.onclick = () => Speech.speak(q.word.word);

    } else if (q.type === 1) {
      // Vietnamese -> English
      this.questionText.textContent = q.word.meaning;
      this.questionInstruction.textContent = "Chọn từ Tiếng Anh tương ứng:";
      this.questionText.classList.remove('d-none');
      this.quizBtnSpeak.classList.add('d-none');

    } else {
      // Listening audio question
      this.questionText.textContent = "Nghe âm thanh phát âm";
      this.questionInstruction.textContent = "Nhấn loa để nghe lại và chọn từ đúng:";
      this.questionText.classList.remove('d-none');
      this.quizBtnSpeak.classList.remove('d-none');
      
      // Auto voice
      Speech.speak(q.word.word);
      this.quizBtnSpeak.onclick = () => Speech.speak(q.word.word);
    }

    // Render options buttons
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      
      const keyLabel = String.fromCharCode(65 + idx); // A, B, C, D
      
      let optionText = '';
      if (q.type === 0) {
        // Options are Vietnamese meanings
        optionText = opt.meaning;
      } else {
        // Options are English words
        optionText = `${opt.word} ${opt.pronunciation}`;
      }

      btn.innerHTML = `
        <div class="d-flex align-items-center">
          <span class="option-badge">${keyLabel}</span>
          <span>${optionText}</span>
        </div>
      `;

      btn.addEventListener('click', () => this.handleOptionClick(btn, opt));
      this.optionsContainer.appendChild(btn);
    });
  }

  handleOptionClick(selectedBtn, chosenOption) {
    const q = this.questions[this.currentQuestionIdx];
    
    // Disable all options buttons to prevent multiple selections
    const allButtons = this.optionsContainer.querySelectorAll('.option-btn');
    allButtons.forEach(btn => {
      btn.disabled = true;
      btn.style.cursor = 'default';
    });

    const isCorrect = (chosenOption.word === q.word.word);

    if (isCorrect) {
      selectedBtn.classList.add('selected-correct');
      this.score++;
      App.showToast("Đúng rồi! Cố lên nhé!", "success");
    } else {
      selectedBtn.classList.add('selected-incorrect');
      App.showToast("Sai rồi! Đừng nản chí!", "danger");
      // Store in wrong words list for review section
      StorageManager.addWrongWord(q.word.word);

      // Find and highlight correct option
      allButtons.forEach((btn, idx) => {
        const optionData = q.options[idx];
        if (optionData.word === q.word.word) {
          btn.classList.add('selected-correct');
        }
      });
    }

    // Show explanation details
    this.explanationText.innerHTML = `
      <strong>${q.word.word}</strong> (${q.word.partOfSpeech}) ${q.word.pronunciation} : ${q.word.meaning}<br>
      <i class="bi bi-chat-left-quote-fill me-1 text-muted"></i> Ví dụ: <em>${q.word.example}</em>
    `;
    this.explanationContainer.classList.remove('d-none');

    // Reveal next button
    this.quizNextBtn.classList.remove('d-none');
    if (this.currentQuestionIdx === this.questions.length - 1) {
      this.quizNextBtn.innerHTML = `Hoàn tất kiểm tra <i class="bi bi-flag-fill ms-1"></i>`;
    } else {
      this.quizNextBtn.innerHTML = `Câu tiếp theo <i class="bi bi-arrow-right-short"></i>`;
    }
  }

  nextQuestion() {
    this.currentQuestionIdx++;
    if (this.currentQuestionIdx < this.questions.length) {
      this.renderQuestion();
    } else {
      this.finishQuiz();
    }
  }

  finishQuiz() {
    this.resetTimer();
    this.quizArenaSection.classList.add('d-none');
    this.resultsSection.classList.remove('d-none');

    const total = this.questions.length;
    const incorrect = total - this.score;
    const accuracy = total > 0 ? Math.round((this.score / total) * 100) : 0;

    // Log attempt in Storage
    StorageManager.addQuizRecord(this.quizTopicTitle.textContent, this.score, total, this.elapsedSeconds);

    // Calculate Grade Letter
    let grade = 'D';
    let headline = 'Cần cố gắng nhiều hơn!';
    let subhead = 'Hãy học lại các từ và thử sức lại nhé.';

    if (accuracy >= 90) {
      grade = 'A';
      headline = 'Xuất sắc! Quá tuyệt vời!';
      subhead = 'Bạn có một trí nhớ siêu đẳng đấy!';
    } else if (accuracy >= 80) {
      grade = 'B';
      headline = 'Làm rất tốt!';
      subhead = 'Bạn nắm vững kiến thức rất chắc chắn.';
    } else if (accuracy >= 60) {
      grade = 'C';
      headline = 'Khá ổn!';
      subhead = 'Bạn đã đạt yêu cầu cơ bản rồi.';
    }

    // Render results view
    this.gradeBadge.textContent = grade;
    
    // Color grade badge
    this.gradeBadge.className = 'display-1 fw-bold';
    if (grade === 'A' || grade === 'B') this.gradeBadge.classList.add('text-success');
    else if (grade === 'C') this.gradeBadge.classList.add('text-warning');
    else this.gradeBadge.classList.add('text-danger');

    this.resultsHeadline.textContent = headline;
    this.resultsSubhead.textContent = subhead;

    this.resCorrect.textContent = this.score;
    this.resIncorrect.textContent = incorrect;
    this.resAccuracy.textContent = `${accuracy}%`;

    // Time taken formatted
    const mins = Math.floor(this.elapsedSeconds / 60).toString().padStart(2, '0');
    const secs = (this.elapsedSeconds % 60).toString().padStart(2, '0');
    this.resTime.textContent = `${mins}:${secs}`;

    // Celebrate with confetti if Grade A or B
    if (accuracy >= 80) {
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 180,
          spread: 90,
          origin: { y: 0.6 }
        });
      }
    }
  }
}
