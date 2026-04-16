import React, { useState, useEffect } from 'react';
import { adminApi, getToken, clearToken } from '../../lib/adminApi.js';
import AdminLogin from './AdminLogin.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import '../../styles/admin.css';

export default function AdminApp() {
  const [authState, setAuthState] = useState('checking'); // checking | unauth | auth
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setAuthState('unauth');
      return;
    }
    adminApi.me()
      .then((r) => { setUser(r.user); setAuthState('auth'); })
      .catch(() => { clearToken(); setAuthState('unauth'); });
  }, []);

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    setAuthState('auth');
  };

  const handleLogout = () => {
    clearToken();
    setUser(null);
    setAuthState('unauth');
  };

  if (authState === 'checking') {
    return (
      <div className="admin-root admin-center">
        <div className="admin-loading">Checking session…</div>
      </div>
    );
  }

  if (authState === 'unauth') {
    return <AdminLogin onSuccess={handleLoginSuccess} />;
  }

  return <AdminDashboard user={user} onLogout={handleLogout} />;
}