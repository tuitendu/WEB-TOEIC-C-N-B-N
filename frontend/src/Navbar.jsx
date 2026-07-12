import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar({ theme, toggleTheme, username, onLogout }) {
  const location = useLocation();
  const navigate  = useNavigate();

  const navItems = [
    { path: '/',        label: 'Trang chủ' },
    { path: '/topics',  label: 'Chủ đề' },
    { path: '/grammar', label: 'Ngữ pháp' },
    { path: '/quiz',    label: 'Trắc nghiệm' },
    { path: '/review',  label: 'Ôn tập' },
    { path: '/progress',label: 'Tiến độ' },
  ];

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom fixed-top py-2">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span>TOEIC Study Portal</span>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            {navItems.map((item) => (
              <li className="nav-item" key={item.path}>
                <Link
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  to={item.path}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {/* Theme toggle */}
            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
              <button
                onClick={toggleTheme}
                className="btn btn-game btn-game-outline py-1 px-3 fs-6"
                title="Đổi giao diện"
              >
                {theme === 'light' ? 'Chế độ tối' : 'Chế độ sáng'}
              </button>
            </li>

            {/* User info + logout  OR  Login/Register */}
            {username ? (
              <li className="nav-item ms-lg-3 mt-2 mt-lg-0 d-flex align-items-center gap-2">
                <span className="fw-semibold small" style={{ opacity: 0.85 }}>
                  {username}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-game btn-game-outline py-1 px-2"
                  title="Đăng xuất"
                >
                  Đăng xuất
                </button>
              </li>
            ) : (
              <li className="nav-item ms-lg-3 mt-2 mt-lg-0 d-flex align-items-center gap-2">
                <a href="/login"    className="btn btn-sm btn-game btn-game-primary py-1 px-3">Đăng nhập</a>
                <a href="/register" className="btn btn-sm btn-game btn-game-outline py-1 px-3">Đăng ký</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
