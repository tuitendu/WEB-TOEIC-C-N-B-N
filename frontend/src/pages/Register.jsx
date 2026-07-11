import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthAPI, saveAuth } from '../api';

export default function Register({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }
    if (form.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }
    setLoading(true);
    try {
      const data = await AuthAPI.register(form.username, form.password);
      saveAuth(data.token, data.username);
      onLogin(data.username);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page d-flex align-items-center justify-content-center min-vh-100">
      <div className="auth-card game-card" style={{ width: '100%', maxWidth: '420px' }}>
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-1" style={{ fontSize: '1.6rem' }}>Tạo tài khoản</h2>
          <p className="text-muted small">Đăng ký miễn phí để bắt đầu học TOEIC</p>
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
              placeholder="Tối thiểu 3 ký tự..."
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              required
              autoFocus
              style={{ boxShadow: 'none' }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-medium small">Mật khẩu</label>
            <input
              type="password"
              className="form-control border-2 rounded-3"
              placeholder="Tối thiểu 6 ký tự..."
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
              style={{ boxShadow: 'none' }}
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-medium small">Xác nhận mật khẩu</label>
            <input
              type="password"
              className="form-control border-2 rounded-3"
              placeholder="Nhập lại mật khẩu..."
              value={form.confirm}
              onChange={e => setForm({ ...form, confirm: e.target.value })}
              required
              style={{ boxShadow: 'none' }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-game btn-game-primary w-100 py-2 fw-semibold"
            disabled={loading}
          >
            {loading ? 'Đang tạo tài khoản...' : 'Đăng ký'}
          </button>
        </form>

        <p className="text-center text-muted small mt-4 mb-0">
          Đã có tài khoản?{' '}
          <Link to="/login" className="fw-semibold text-decoration-none">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
