// Review Wrong Words Controller
document.addEventListener('DOMContentLoaded', async () => {
  const db = await App.getDatabase();
  if (!db || db.length === 0) return;

  const reviewController = new ReviewController(db);
  reviewController.init();
});

class ReviewController {
  constructor(db) {
    this.db = db;
    this.wrongWords = [];
    this.wrongWordDetails = [];
    this.quizQuestions = [];
    this.currentQIdx = 0;

    // DOM Elements
    this.dashboardSection = document.getElementById('review-dashboard');
    this.quizSection = document.getElementById('review-quiz-section');
    this.emptySection = document.getElementById('review-empty-state');
    
    this.countLabel = document.getElementById('review-words-count-label');
    this.tbody = document.getElementById('wrong-words-tbody');
    this.startQuizBtn = document.getElementById('btn-start-review-quiz');
    
    // Quiz DOM
    this.rqIndexLabel = document.getElementById('rq-index-label');
    this.rqProgressBar = document.getElementById('rq-progress-bar');
    this.rqQuestionText = document.getElementById('rq-question-text');
    this.rqOptionsContainer = document.getElementById('rq-options-container');
    this.rqExplanationContainer = document.getElementById('rq-explanation-container');
    this.rqExplanationText = document.getElementById('rq-explanation-text');
    this.rqNextBtn = document.getElementById('rq-next-btn');
    this.rqBtnSpeak = document.getElementById('rq-btn-speak');
    this.rqBtnQuit = document.getElementById('rq-btn-quit');
  }

  init() {
    this.loadWrongWords();
    
    this.startQuizBtn.addEventListener('click', () => {
      this.startReviewQuiz();
    });

    this.rqNextBtn.addEventListener('click', () => {
      this.nextQuestion();
    });

    this.rqBtnQuit.addEventListener('click', () => {
      this.quitQuiz();
    });
  }

  // Load and map details for wrong words
  loadWrongWords() {
    this.wrongWords = StorageManager.getWrongWords();
    this.wrongWordDetails = [];

    // Map word strings to complete details from JSON database
    this.wrongWords.forEach(wordStr => {
      let found = null;
      for (let i = 0; i < this.db.length; i++) {
        const match = this.db[i].words.find(w => w.word.toLowerCase() === wordStr.toLowerCase());
        if (match) {
          found = match;
          break;
        }
      }
      if (found) {
        this.wrongWordDetails.push(found);
      }
    });

    this.countLabel.textContent = `Bạn có ${this.wrongWords.length} từ vựng cần ôn tập.`;

    if (this.wrongWords.length === 0) {
      this.dashboardSection.classList.add('d-none');
      this.quizSection.classList.add('d-none');
      this.emptySection.classList.remove('d-none');
    } else {
      this.emptySection.classList.add('d-none');
      this.quizSection.classList.add('d-none');
      this.dashboardSection.classList.remove('d-none');
      this.renderTable();
    }
  }

  renderTable() {
    this.tbody.innerHTML = '';
    this.wrongWordDetails.forEach(w => {
      const tr = document.createElement('tr');
      
      const tdWord = document.createElement('td');
      tdWord.innerHTML = `<strong class="text-primary">${w.word}</strong> <span class="badge bg-secondary rounded-pill small ms-1" style="font-size:0.65rem;">${w.partOfSpeech}</span>`;
      
      const tdIpa = document.createElement('td');
      tdIpa.className = 'text-muted small';
      tdIpa.textContent = w.pronunciation;
      
      const tdMeaning = document.createElement('td');
      tdMeaning.className = 'fw-medium text-success';
      tdMeaning.textContent = w.meaning;
      
      const tdAction = document.createElement('td');
      tdAction.innerHTML = `
        <button class="btn btn-sm btn-outline-primary border-0 rounded-circle" title="Nghe phát âm">
          <i class="bi bi-volume-up-fill"></i>
        </button>
      `;
      tdAction.querySelector('button').addEventListener('click', () => {
        Speech.speak(w.word);
      });

      tr.appendChild(tdWord);
      tr.appendChild(tdIpa);
      tr.appendChild(tdMeaning);
      tr.appendChild(tdAction);
      this.tbody.appendChild(tr);
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

  // Distractors gatherer (same as quiz.js, but fetches generic distractors from general DB)
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

    const shuffled = this.shuffle([...allWords]);
    for (let i = 0; i < shuffled.length; i++) {
      if (distractors.length >= count) break;
      const duplicateMeaning = distractors.some(d => d.meaning === shuffled[i].meaning);
      if (!duplicateMeaning) {
        distractors.push(shuffled[i]);
      }
    }
    return distractors;
  }

  startReviewQuiz() {
    this.dashboardSection.classList.add('d-none');
    this.quizSection.classList.remove('d-none');

    // Create question bank from wrong details
    const shuffledWords = this.shuffle([...this.wrongWordDetails]);

    this.quizQuestions = shuffledWords.map(word => {
      // Pick English -> Vietnamese or Vietnamese -> English type
      const qType = Math.floor(Math.random() * 2);
      const options = [word, ...this.getDistractors(word, 3)];
      this.shuffle(options);

      return {
        word,
        type: qType,
        options
      };
    });

    this.currentQIdx = 0;
    this.renderQuestion();
  }

  renderQuestion() {
    const q = this.quizQuestions[this.currentQIdx];
    const total = this.quizQuestions.length;
    
    // Progress
    const progressPercent = Math.round((this.currentQIdx / total) * 100);
    this.rqProgressBar.style.width = `${progressPercent}%`;
    this.rqIndexLabel.textContent = `Câu hỏi ${this.currentQIdx + 1} / ${total}`;

    // Reset Elements
    this.rqOptionsContainer.innerHTML = '';
    this.rqExplanationContainer.classList.add('d-none');
    this.rqNextBtn.classList.add('d-none');

    if (q.type === 0) {
      // English -> Vietnamese
      this.rqQuestionText.textContent = q.word.word;
      this.rqBtnSpeak.classList.remove('d-none');
      
      Speech.speak(q.word.word);
      this.rqBtnSpeak.onclick = () => Speech.speak(q.word.word);
    } else {
      // Vietnamese -> English
      this.rqQuestionText.textContent = q.word.meaning;
      this.rqBtnSpeak.classList.add('d-none');
    }

    // Build options
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      
      const keyLabel = String.fromCharCode(65 + idx);
      const optionText = q.type === 0 ? opt.meaning : `${opt.word} ${opt.pronunciation}`;

      btn.innerHTML = `
        <div class="d-flex align-items-center">
          <span class="option-badge">${keyLabel}</span>
          <span>${optionText}</span>
        </div>
      `;

      btn.addEventListener('click', () => this.handleOptionClick(btn, opt));
      this.rqOptionsContainer.appendChild(btn);
    });
  }

  handleOptionClick(selectedBtn, chosenOption) {
    const q = this.quizQuestions[this.currentQIdx];
    
    // Disable all options
    const allButtons = this.rqOptionsContainer.querySelectorAll('.option-btn');
    allButtons.forEach(btn => {
      btn.disabled = true;
      btn.style.cursor = 'default';
    });

    const isCorrect = (chosenOption.word === q.word.word);

    if (isCorrect) {
      selectedBtn.classList.add('selected-correct');
      // Correct! Delete from wrong word storage list
      StorageManager.removeWrongWord(q.word.word);
      App.showToast(`Đã thuộc từ "${q.word.word}" và xóa khỏi ôn tập!`, "success");
    } else {
      selectedBtn.classList.add('selected-incorrect');
      App.showToast("Lần sau cố gắng hơn nhé!", "danger");

      // Highlight correct answer
      allButtons.forEach((btn, idx) => {
        const optionData = q.options[idx];
        if (optionData.word === q.word.word) {
          btn.classList.add('selected-correct');
        }
      });
    }

    // Explanation details
    this.rqExplanationText.innerHTML = `
      <strong>${q.word.word}</strong> (${q.word.partOfSpeech}) ${q.word.pronunciation} : ${q.word.meaning}<br>
      <i class="bi bi-chat-left-quote-fill me-1 text-muted"></i> Ví dụ: <em>${q.word.example}</em>
    `;
    this.rqExplanationContainer.classList.remove('d-none');

    // Reveal Next Button
    this.rqNextBtn.classList.remove('d-none');
    if (this.currentQIdx === this.quizQuestions.length - 1) {
      this.rqNextBtn.innerHTML = `Hoàn tất ôn tập <i class="bi bi-flag-fill ms-1"></i>`;
    } else {
      this.rqNextBtn.innerHTML = `Câu tiếp theo <i class="bi bi-arrow-right-short"></i>`;
    }
  }

  nextQuestion() {
    this.currentQIdx++;
    if (this.currentQIdx < this.quizQuestions.length) {
      this.renderQuestion();
    } else {
      this.finishReviewQuiz();
    }
  }

  finishReviewQuiz() {
    App.showToast("🎉 Đã hoàn tất bài ôn tập từ sai!", "success");
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 120,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
    // Reload state (table dashboard)
    setTimeout(() => {
      this.loadWrongWords();
    }, 1500);
  }

  quitQuiz() {
    this.loadWrongWords();
  }
}
