// Storage manager for TOEIC 600 Vocabulary Application
const StorageManager = {
  // KEYS
  KEYS: {
    LEARNED_WORDS: 'toeic_learned_words',
    FAVORITE_WORDS: 'toeic_favorite_words',
    WRONG_WORDS: 'toeic_wrong_words',
    COMPLETED_TOPICS: 'toeic_completed_topics',
    QUIZ_HISTORY: 'toeic_quiz_history',
    THEME: 'toeic_theme',
    TOTAL_STUDY_TIME: 'toeic_total_study_time',
    STREAK: 'toeic_streak',
    LAST_ACTIVE_DATE: 'toeic_last_active_date',
    LAST_TOPIC: 'toeic_last_topic'
  },

  // Helper: Get item parsed from JSON
  _get(key, defaultValue = []) {
    const val = localStorage.getItem(key);
    if (!val) return defaultValue;
    try {
      return JSON.parse(val);
    } catch (e) {
      console.error(`Error parsing key ${key}`, e);
      return defaultValue;
    }
  },

  // Helper: Save item stringified as JSON
  _set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  // Learned Words (Trạng thái đã học/nhớ từ)
  getLearnedWords() {
    return this._get(this.KEYS.LEARNED_WORDS, []);
  },

  isWordLearned(word) {
    return this.getLearnedWords().includes(word);
  },

  toggleLearnedWord(word) {
    const list = this.getLearnedWords();
    const idx = list.indexOf(word);
    if (idx > -1) {
      list.splice(idx, 1);
    } else {
      list.push(word);
      this.updateStreak(); // Activity counts towards streak
    }
    this._set(this.KEYS.LEARNED_WORDS, list);
    return idx === -1; // returns true if added, false if removed
  },

  // Favorite Words (Từ vựng yêu thích)
  getFavoriteWords() {
    return this._get(this.KEYS.FAVORITE_WORDS, []);
  },

  isWordFavorite(word) {
    return this.getFavoriteWords().includes(word);
  },

  toggleFavoriteWord(word) {
    const list = this.getFavoriteWords();
    const idx = list.indexOf(word);
    if (idx > -1) {
      list.splice(idx, 1);
    } else {
      list.push(word);
    }
    this._set(this.KEYS.FAVORITE_WORDS, list);
    return idx === -1;
  },

  // Wrong Words (Từ trả lời sai trong Quiz - dùng để Ôn tập)
  getWrongWords() {
    return this._get(this.KEYS.WRONG_WORDS, []);
  },

  addWrongWord(word) {
    const list = this.getWrongWords();
    if (!list.includes(word)) {
      list.push(word);
      this._set(this.KEYS.WRONG_WORDS, list);
    }
  },

  removeWrongWord(word) {
    const list = this.getWrongWords();
    const idx = list.indexOf(word);
    if (idx > -1) {
      list.splice(idx, 1);
      this._set(this.KEYS.WRONG_WORDS, list);
    }
  },

  // Completed Topics (Chủ đề đã hoàn thành)
  getCompletedTopics() {
    return this._get(this.KEYS.COMPLETED_TOPICS, []);
  },

  isTopicCompleted(topic) {
    return this.getCompletedTopics().includes(topic);
  },

  setTopicCompleted(topic, completed = true) {
    const list = this.getCompletedTopics();
    const idx = list.indexOf(topic);
    if (completed && idx === -1) {
      list.push(topic);
    } else if (!completed && idx > -1) {
      list.splice(idx, 1);
    }
    this._set(this.KEYS.COMPLETED_TOPICS, list);
  },

  // Quiz History (Lịch sử làm trắc nghiệm)
  getQuizHistory() {
    return this._get(this.KEYS.QUIZ_HISTORY, []);
  },

  addQuizRecord(topic, score, total, timeTakenSeconds) {
    const history = this.getQuizHistory();
    const record = {
      topic,
      score,
      total,
      percentage: Math.round((score / total) * 100),
      timeTaken: timeTakenSeconds,
      date: new Date().toISOString()
    };
    history.push(record);
    this._set(this.KEYS.QUIZ_HISTORY, history);
    this.updateStreak(); // Completing quiz counts towards streak
    return record;
  },

  // Last Studied Topic (Để tiếp tục học)
  getLastTopic() {
    return localStorage.getItem(this.KEYS.LAST_TOPIC) || '';
  },

  setLastTopic(topic) {
    localStorage.setItem(this.KEYS.LAST_TOPIC, topic);
  },

  // Theme preference
  getTheme() {
    return localStorage.getItem(this.KEYS.THEME) || 'light';
  },

  setTheme(theme) {
    localStorage.setItem(this.KEYS.THEME, theme);
  },

  // Study Time Tracker (Giây)
  getTotalStudyTime() {
    return parseInt(localStorage.getItem(this.KEYS.TOTAL_STUDY_TIME) || '0', 10);
  },

  addStudyTime(seconds) {
    const total = this.getTotalStudyTime() + seconds;
    localStorage.setItem(this.KEYS.TOTAL_STUDY_TIME, total);
  },

  // Streak Tracking (Chuỗi ngày học liên tục)
  getStreak() {
    return parseInt(localStorage.getItem(this.KEYS.STREAK) || '0', 10);
  },

  getLastActiveDate() {
    return localStorage.getItem(this.KEYS.LAST_ACTIVE_DATE) || '';
  },

  updateStreak() {
    const todayStr = new Date().toISOString().split('T')[0];
    const lastActive = this.getLastActiveDate();

    if (!lastActive) {
      // First activity ever
      localStorage.setItem(this.KEYS.STREAK, '1');
      localStorage.setItem(this.KEYS.LAST_ACTIVE_DATE, todayStr);
      return;
    }

    if (lastActive === todayStr) {
      // Already active today, streak remains same
      return;
    }

    const lastActiveDate = new Date(lastActive);
    const todayDate = new Date(todayStr);
    const diffTime = Math.abs(todayDate - lastActiveDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let newStreak = this.getStreak();
    if (diffDays === 1) {
      // Active yesterday, increment streak
      newStreak += 1;
    } else if (diffDays > 1) {
      // Missed a day, reset streak to 1
      newStreak = 1;
    }

    localStorage.setItem(this.KEYS.STREAK, newStreak.toString());
    localStorage.setItem(this.KEYS.LAST_ACTIVE_DATE, todayStr);
  },

  // Reset all data
  clearAllData() {
    localStorage.clear();
    console.log('Local storage cleared successfully.');
  }
};
