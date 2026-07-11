// Global configuration and common front-end behaviors
document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme initialization
  App.initTheme();

  // 2. Navigation rendering & highlighting
  App.initNavigation();

  // 3. Loading animation removal
  App.hideLoader();

  // 4. Study duration tracker
  App.startStudyTracker();
});

const App = {
  db: null,
  studyInterval: null,
  activeSeconds: 0,

  // Loader handler
  hideLoader() {
    const loader = document.getElementById('loading-overlay');
    if (loader) {
      setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
      }, 300);
    }
  },

  showLoader() {
    const loader = document.getElementById('loading-overlay');
    if (loader) {
      loader.style.opacity = '1';
      loader.style.visibility = 'visible';
    }
  },

  // Database fetcher
  async getDatabase() {
    if (this.db) return this.db;
    try {
      const response = await fetch('data/toeic600.json');
      if (!response.ok) throw new Error("Could not load toeic600.json");
      this.db = await response.json();
      return this.db;
    } catch (e) {
      console.error("Database fetch error:", e);
      this.showToast("Không thể tải cơ sở dữ liệu từ vựng!", "danger");
      return [];
    }
  },

  // Navigation Setup
  initNavigation() {
    // Generate navigation dynamically or configure existing navbar elements
    const navbar = document.querySelector('.navbar-custom');
    if (!navbar) return;

    // Detect current page file
    const path = window.location.pathname;
    const pageName = path.split("/").pop() || 'index.html';

    // Update active class on links
    const navLinks = navbar.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === pageName) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
      }
    });

    // Theme toggle binding
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      this.updateThemeButtonIcon(StorageManager.getTheme());
      themeBtn.addEventListener('click', () => {
        const currentTheme = StorageManager.getTheme();
        const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
        StorageManager.setTheme(nextTheme);
        document.body.classList.toggle('dark-theme', nextTheme === 'dark');
        this.updateThemeButtonIcon(nextTheme);
        this.showToast(`Đã chuyển sang chế độ ${nextTheme === 'dark' ? 'Tối' : 'Sáng'}`, "info");
      });
    }
  },

  // Theme preference handler
  initTheme() {
    const preferredTheme = StorageManager.getTheme();
    if (preferredTheme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  },

  updateThemeButtonIcon(theme) {
    const icon = document.querySelector('#theme-toggle-btn i');
    if (!icon) return;
    if (theme === 'dark') {
      icon.className = 'bi bi-sun-fill';
    } else {
      icon.className = 'bi bi-moon-stars-fill';
    }
  },

  // Toast Notification System
  showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container-custom');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container-custom';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-custom toast-${type}`;
    
    // Choose icon
    let iconClass = 'bi-info-circle-fill';
    if (type === 'success') iconClass = 'bi-check-circle-fill';
    if (type === 'warning') iconClass = 'bi-exclamation-triangle-fill';
    if (type === 'danger') iconClass = 'bi-exclamation-circle-fill';

    toast.innerHTML = `
      <i class="bi ${iconClass} text-${type === 'info' ? 'primary' : type === 'danger' ? 'danger' : type}"></i>
      <div style="font-size: 0.9rem; font-weight: 500;">${message}</div>
    `;

    container.appendChild(toast);
    
    // Slide in
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    // Slide out and remove
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  },

  // Active time tracking for study statistics
  startStudyTracker() {
    // Record study time every 10 seconds if user is active (window focused)
    let isWindowFocused = true;

    window.addEventListener('focus', () => { isWindowFocused = true; });
    window.addEventListener('blur', () => { isWindowFocused = false; });

    this.studyInterval = setInterval(() => {
      if (isWindowFocused) {
        this.activeSeconds += 10;
        StorageManager.addStudyTime(10);
      }
    }, 10000);

    // Also update on tab close
    window.addEventListener('beforeunload', () => {
      StorageManager.updateStreak();
    });
  }
};
