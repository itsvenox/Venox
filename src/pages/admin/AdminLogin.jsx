import React, { useState } from 'react';
import { Icons } from '../../components/Icons.jsx';
import { adminApi, setToken } from '../../lib/adminApi.js';

export default function AdminLogin({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await adminApi.login(email, password);
      setToken(res.token);
      onSuccess(res.user);
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-root admin-center">
      <div className="admin-login-card card">
        <div className="admin-login-header">
          <a className="logo" href="#" onClick={(e) => { e.preventDefault(); window.location.hash = ''; window.location.reload(); }}>
            <span>Its</span>Veno<span>x</span>
          </a>
          <div className="section-label" style={{ justifyContent: 'center', marginTop: 16 }}>Admin Access</div>
          <h2 style={{ marginTop: 8 }}>
            Sign in to the <span className="gradient-text">Dashboard</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: 28 }}>
          <div className="form-group">
            <label className="form-label" htmlFor="admin-email">Email</label>
            <input
              id="admin-email"
              className="form-input"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@itsvenox.de"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="admin-pw">Password</label>
            <input
              id="admin-pw"
              className="form-input"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="admin-error">{error}</div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ width: '100%', justifyContent: 'center' }}
            disabled={loading}
          >
            {loading ? 'Signing in…' : 'Sign in'} <Icons.Arrow />
          </button>
        </form>
      </div>
    </div>
  );
}