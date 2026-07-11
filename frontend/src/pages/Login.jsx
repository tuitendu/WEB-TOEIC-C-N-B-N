import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthAPI, saveAuth } from '../api';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await AuthAPI.login(form.username, form.password);
      saveAuth(data.token, data.username);
      onLogin(data.username);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page d-flex align-items-center justify-content-center min-vh-100">
      <div className="auth-card game-card" style={{ width: '100%', maxWidth: '420px' }}>
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-1" style={{ fontSize: '1.6rem' }}>TOEIC 600 Vocabulary</h2>
          <p className="text-muted small">Đăng nhập để bắt đầu học</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 small rounded-3 mb-3" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-medium small">Tên đăng nhập</label>
            <input
              type="text"
              className="form-control border-2 rounded-3"
              placeholder="Nhập tên đăng nhập..."
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              required
              autoFocus
              style={{ boxShadow: 'none' }}
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-medium small">Mật khẩu</label>
            <input
              type="password"
              className="form-control border-2 rounded-3"
              placeholder="Nhập mật khẩu..."
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
              style={{ boxShadow: 'none' }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-game btn-game-primary w-100 py-2 fw-semibold"
            disabled={loading}
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <p className="text-center text-muted small mt-4 mb-0">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="fw-semibold text-decoration-none">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
}
