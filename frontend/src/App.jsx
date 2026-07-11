import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Dashboard from './pages/Dashboard';
import Topics from './pages/Topics';
import Study from './pages/Study';
import Quiz from './pages/Quiz';
import Review from './pages/Review';
import Progress from './pages/Progress';
import Login from './pages/Login';
import Register from './pages/Register';
import { API, getUsername, clearAuth, isLoggedIn } from './api';

// ─── Toast context ────────────────────────────────────────────────────────────
export const ToastContext = React.createContext(null);

// ─── Auth banner (soft, dismissible) ─────────────────────────────────────────
function AuthBanner() {
  const location = useLocation();
  const hide = ['/login', '/register'].includes(location.pathname);
  if (hide || isLoggedIn()) return null;

  return (
    <div
      className="d-flex align-items-center justify-content-center gap-3 py-2 px-3 text-center small"
      style={{
        background: 'linear-gradient(90deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))',
        borderBottom: '1px solid rgba(99,102,241,0.25)',
        color: 'var(--text-main)',
        marginTop: '64px',       /* push below fixed navbar */
      }}
    >
      <span>🔐 Đăng nhập để lưu tiến trình học của bạn vào hệ thống</span>
      <a href="/login" className="btn btn-game btn-game-primary py-0 px-3" style={{ fontSize: '0.8rem', height: '28px', lineHeight: '28px' }}>
        Đăng nhập
      </a>
      <a href="/register" className="btn btn-game btn-game-outline py-0 px-3" style={{ fontSize: '0.8rem', height: '28px', lineHeight: '28px' }}>
        Đăng ký
      </a>
    </div>
  );
}

// ─── Global Toast ─────────────────────────────────────────────────────────────
function GlobalToast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      className="custom-toast"
      style={{ cursor: 'pointer', maxWidth: '340px' }}
      onClick={onClose}
    >
      <div className="small fw-medium">{message}</div>
    </div>
  );
}

// ─── Inner App (has Router context) ──────────────────────────────────────────
function AppInner() {
  const [theme,    setTheme]    = useState('light');
  const [username, setUsername] = useState(getUsername() || '');
  const [toast,    setToast]    = useState('');

  const showToast = useCallback((msg) => setToast(msg), []);
  const hideToast = useCallback(()    => setToast(''),  []);

  // Theme sync
  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    setTheme(saved);
    document.body.classList.toggle('dark-theme', saved === 'dark');
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.body.classList.toggle('dark-theme', next === 'dark');
  };

  const handleLogin  = (uname) => setUsername(uname);
  const handleLogout = () => { clearAuth(); setUsername(''); };

  // Study time tracker — only when logged in
  useEffect(() => {
    if (!isLoggedIn()) return;
    let localSeconds = 0;
    const interval = setInterval(() => {
      localSeconds += 5;
      API.getProgress().then(p => {
        if (!p) return;
        API.updateStats('total_study_time', String(p.total_study_time + localSeconds));
        localSeconds = 0;
      }).catch(() => {});
    }, 5000);
    return () => clearInterval(interval);
  }, [username]);

  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <ToastContext.Provider value={showToast}>
      {/* Navbar — hidden on login/register */}
      {!isAuthPage && (
        <Navbar theme={theme} toggleTheme={toggleTheme} username={username} onLogout={handleLogout} />
      )}

      {/* Soft banner when not logged in */}
      <AuthBanner />

      {/* Main content */}
      <main className={isAuthPage ? '' : (isLoggedIn() ? 'container py-4' : 'container py-4')}>
        <Routes>
          {/* Auth pages */}
          <Route path="/login"    element={<Login    onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onLogin={handleLogin} />} />

          {/* App pages — accessible without login */}
          <Route path="/"                 element={<Dashboard />} />
          <Route path="/topics"           element={<Topics />} />
          <Route path="/study/:topicName" element={<Study />} />
          <Route path="/quiz"             element={<Quiz />} />
          <Route path="/quiz/:topicName"  element={<Quiz />} />
          <Route path="/review"           element={<Review />} />
          <Route path="/progress"         element={<Progress />} />
        </Routes>
      </main>

      {/* Global toast */}
      <GlobalToast message={toast} onClose={hideToast} />
    </ToastContext.Provider>
  );
}

export default function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}
