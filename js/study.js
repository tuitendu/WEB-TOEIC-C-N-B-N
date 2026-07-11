// Flashcard Study Page controller
document.addEventListener('DOMContentLoaded', async () => {
  // 1. Get topic from URL parameters
  const params = new URLSearchParams(window.location.search);
  const topicName = params.get('topic');

  // Load database
  const db = await App.getDatabase();
  if (!db || db.length === 0) return;

  // Resolve active topic
  let activeTopic = db.find(t => t.topic === topicName);
  if (!activeTopic) {
    // If no topic matched, default to the first one in the list
    activeTopic = db[0];
  }

  // Save last visited topic
  StorageManager.setLastTopic(activeTopic.topic);

  // Initialize Study View Controller
  const studyController = new StudyController(activeTopic);
  studyController.init();
});

class StudyController {
  constructor(topicData) {
    this.topic = topicData;
    this.allWords = topicData.words;
    this.filteredWords = [...this.allWords];
    this.currentIndex = 0;
    this.isFlipped = false;

    // DOM Elements
    this.flashcard = document.getElementById('main-flashcard');
    this.englishText = document.getElementById('word-english');
    this.ipaText = document.getElementById('word-ipa');
    this.vietnameseText = document.getElementById('word-vietnamese');
    this.posText = document.getElementById('word-pos');
    this.exampleEnText = document.getElementById('word-example-en');
    this.difficultyBadge = document.getElementById('word-difficulty-badge');
    this.indexIndicator = document.getElementById('word-index-indicator');
    this.topicTitle = document.getElementById('topic-title');
    this.topicProgressLabel = document.getElementById('topic-progress-label');

    // Controls
    this.prevBtn = document.getElementById('btn-prev');
    this.nextBtn = document.getElementById('btn-next');
    this.favoriteBtn = document.getElementById('btn-favorite');
    this.learnedBtn = document.getElementById('btn-learned');
    this.pronounceBtn = document.getElementById('btn-pronounce');
    this.pronounceBackBtn = document.getElementById('btn-pronounce-back');
    this.diffFilter = document.getElementById('diff-filter');
  }

  init() {
    this.topicTitle.textContent = this.topic.topic;
    this.updateTopicProgress();

    // Bind Event Listeners
    this.flashcard.addEventListener('click', () => this.toggleFlip());
    this.prevBtn.addEventListener('click', () => this.prevCard());
    this.nextBtn.addEventListener('click', () => this.nextCard());
    this.favoriteBtn.addEventListener('click', (e) => this.toggleFavorite(e));
    this.learnedBtn.addEventListener('click', (e) => this.toggleLearned(e));
    
    // Web Speech binding
    this.pronounceBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.playPronunciation();
    });
    this.pronounceBackBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.playPronunciation();
    });

    // Difficulty filter listener
    this.diffFilter.addEventListener('change', (e) => {
      this.applyDifficultyFilter(e.target.value);
    });

    // Keyboard navigation binds
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));

    // Render first card
    this.renderCard();
  }

  updateTopicProgress() {
    const learnedList = StorageManager.getLearnedWords();
    const topicWords = this.allWords.map(w => w.word);
    const learnedCount = topicWords.filter(w => learnedList.includes(w)).length;
    const progressPercent = Math.round((learnedCount / this.allWords.length) * 100);
    this.topicProgressLabel.textContent = `Đã nhớ ${learnedCount}/${this.allWords.length} từ (${progressPercent}%)`;
    
    // Save completion state if 100%
    if (progressPercent === 100) {
      StorageManager.setTopicCompleted(this.topic.topic, true);
    } else {
      StorageManager.setTopicCompleted(this.topic.topic, false);
    }
  }

  applyDifficultyFilter(difficulty) {
    if (difficulty === 'all') {
      this.filteredWords = [...this.allWords];
    } else {
      this.filteredWords = this.allWords.filter(w => w.difficulty === difficulty);
    }
    
    this.currentIndex = 0;
    this.isFlipped = false;
    this.flashcard.classList.remove('flipped');
    this.renderCard();
  }

  getCurrentWord() {
    return this.filteredWords[this.currentIndex];
  }

  renderCard() {
    if (this.filteredWords.length === 0) {
      // Empty state styling if no words match difficulty
      this.englishText.textContent = "Không có từ nào";
      this.ipaText.textContent = "";
      this.vietnameseText.textContent = "Vui lòng chọn mức độ khác";
      this.posText.textContent = "";
      this.exampleEnText.textContent = "";
      this.difficultyBadge.className = "d-none";
      this.indexIndicator.textContent = "0 / 0";
      
      // Disable buttons
      this.prevBtn.disabled = true;
      this.nextBtn.disabled = true;
      this.favoriteBtn.disabled = true;
      this.learnedBtn.disabled = true;
      this.pronounceBtn.style.display = 'none';
      return;
    }

    // Enable buttons
    this.prevBtn.disabled = false;
    this.nextBtn.disabled = false;
    this.favoriteBtn.disabled = false;
    this.learnedBtn.disabled = false;
    this.pronounceBtn.style.display = 'block';

    const word = this.getCurrentWord();
    
    // Front side
    this.englishText.textContent = word.word;
    this.ipaText.textContent = word.pronunciation;
    this.posText.textContent = word.partOfSpeech;
    
    // Difficulty badge
    this.difficultyBadge.className = `badge-diff badge-${word.difficulty}`;
    this.difficultyBadge.textContent = word.difficulty;

    // Back side
    this.vietnameseText.textContent = word.meaning;
    this.exampleEnText.textContent = word.example;

    // Update indicator
    this.indexIndicator.textContent = `Thẻ ${this.currentIndex + 1} / ${this.filteredWords.length}`;

    // Update actions UI
    this.updateActionButtonsState(word.word);
  }

  updateActionButtonsState(wordString) {
    // Check favorites
    const isFav = StorageManager.isWordFavorite(wordString);
    const favIcon = this.favoriteBtn.querySelector('i');
    if (isFav) {
      this.favoriteBtn.classList.remove('btn-game-outline');
      this.favoriteBtn.classList.add('btn-game-danger');
      favIcon.className = 'bi bi-heart-fill';
    } else {
      this.favoriteBtn.classList.remove('btn-game-danger');
      this.favoriteBtn.classList.add('btn-game-outline');
      favIcon.className = 'bi bi-heart';
    }

    // Check learned
    const isLearned = StorageManager.isWordLearned(wordString);
    if (isLearned) {
      this.learnedBtn.classList.remove('btn-game-outline');
      this.learnedBtn.classList.add('btn-game-success');
    } else {
      this.learnedBtn.classList.remove('btn-game-success');
      this.learnedBtn.classList.add('btn-game-outline');
    }
  }

  toggleFlip() {
    if (this.filteredWords.length === 0) return;
    this.isFlipped = !this.isFlipped;
    this.flashcard.classList.toggle('flipped', this.isFlipped);
  }

  prevCard() {
    if (this.filteredWords.length <= 1) return;
    this.currentIndex = (this.currentIndex - 1 + this.filteredWords.length) % this.filteredWords.length;
    this.resetFlip();
  }

  nextCard() {
    if (this.filteredWords.length <= 1) return;
    this.currentIndex = (this.currentIndex + 1) % this.filteredWords.length;
    this.resetFlip();
  }

  resetFlip() {
    this.isFlipped = false;
    this.flashcard.classList.remove('flipped');
    // Slight timeout before rendering to let flip animation finish
    setTimeout(() => {
      this.renderCard();
    }, 150);
  }

  playPronunciation() {
    const word = this.getCurrentWord();
    if (word) {
      Speech.speak(word.word);
    }
  }

  toggleFavorite(event) {
    event.stopPropagation();
    const word = this.getCurrentWord();
    if (!word) return;

    const added = StorageManager.toggleFavoriteWord(word.word);
    this.updateActionButtonsState(word.word);

    if (added) {
      App.showToast(`Đã thêm "${word.word}" vào Yêu thích`, "success");
    } else {
      App.showToast(`Đã bỏ "${word.word}" khỏi Yêu thích`, "info");
    }
  }

  toggleLearned(event) {
    event.stopPropagation();
    const word = this.getCurrentWord();
    if (!word) return;

    const added = StorageManager.toggleLearnedWord(word.word);
    this.updateActionButtonsState(word.word);
    this.updateTopicProgress();

    if (added) {
      App.showToast(`Đã đánh dấu thuộc từ "${word.word}"`, "success");
      
      // If completed all in topic, trigger confetti
      const learnedList = StorageManager.getLearnedWords();
      const topicWords = this.allWords.map(w => w.word);
      const learnedCount = topicWords.filter(w => learnedList.includes(w)).length;
      
      if (learnedCount === this.allWords.length) {
        this.triggerCelebration();
      }
    } else {
      App.showToast(`Đã bỏ đánh dấu thuộc từ "${word.word}"`, "info");
    }
  }

  triggerCelebration() {
    App.showToast(`🎉 Xuất sắc! Bạn đã học hết từ vựng chủ đề này!`, "success");
    // Fire confetti particles
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  }

  handleKeyboard(event) {
    if (this.filteredWords.length === 0) return;
    
    switch (event.code) {
      case 'Space':
        event.preventDefault();
        this.toggleFlip();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.prevCard();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.nextCard();
        break;
      case 'KeyL':
        event.preventDefault();
        this.toggleLearned(event);
        break;
      case 'KeyF':
        event.preventDefault();
        this.toggleFavorite(event);
        break;
    }
  }
}
