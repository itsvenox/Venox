import React, { useState, useEffect, useCallback } from 'react';
import { Icons } from '../../components/Icons.jsx';
import { adminApi } from '../../lib/adminApi.js';
import AdminContactDetail from './AdminContactDetail.jsx';

const STATUSES = ['new', 'read', 'replied', 'archived'];
const PAGE_SIZE = 25;

export default function AdminDashboard({ user, onLogout }) {
  const [stats, setStats] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [searchDebounced, setSearchDebounced] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchDebounced(search);
      setOffset(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const loadStats = useCallback(() => {
    adminApi.stats()
      .then((r) => setStats(r.stats))
      .catch(() => {});
  }, []);

  const loadContacts = useCallback(() => {
    setLoading(true);
    setError('');
    adminApi.listContacts({
      status: statusFilter,
      search: searchDebounced,
      limit: PAGE_SIZE,
      offset,
    })
      .then((r) => {
        setContacts(r.contacts);
        setTotal(r.total);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [statusFilter, searchDebounced, offset]);

  useEffect(() => { loadStats(); }, [loadStats]);
  useEffect(() => { loadContacts(); }, [loadContacts]);

  const handleContactUpdated = (updated) => {
    setContacts((list) => list.map((c) => (c.id === updated.id ? { ...c, ...updated } : c)));
    loadStats();
  };

  const handleContactDeleted = (id) => {
    setContacts((list) => list.filter((c) => c.id !== id));
    setSelectedId(null);
    setTotal((n) => Math.max(0, n - 1));
    loadStats();
  };

  const page = Math.floor(offset / PAGE_SIZE) + 1;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="admin-root">
      <header className="admin-header">
        <div className="admin-header-inner">
          <a className="logo" href="#" onClick={(e) => { e.preventDefault(); window.location.hash = ''; window.location.reload(); }}>
            <span>Its</span>Veno<span>x</span>
          </a>
          <div className="admin-header-right">
            <span className="admin-user">{user?.name || user?.email}</span>
            <button className="btn btn-ghost btn-sm" onClick={onLogout}>Sign out</button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        <div className="admin-page-head">
          <div className="section-label">Dashboard</div>
          <h1>Contact <span className="gradient-text">Submissions</span></h1>
          <p>Manage and respond to inquiries from your contact form.</p>
        </div>

        {/* Stats */}
        <div className="admin-stats">
          <StatCard label="Total" value={stats?.total ?? '—'} />
          <StatCard label="New" value={stats?.new_count ?? '—'} highlight />
          <StatCard label="Last 7 days" value={stats?.last_7_days ?? '—'} />
          <StatCard label="Last 30 days" value={stats?.last_30_days ?? '—'} />
        </div>

        {/* Filters */}
        <div className="admin-filters">
          <div className="admin-search">
            <Icons.Search />
            <input
              className="form-input"
              type="text"
              placeholder="Search by name, email, or company…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setOffset(0); }}
          >
            <option value="">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{capitalize(s)}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        {error && <div className="admin-error">{error}</div>}

        <div className="admin-table-wrap card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Received</th>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Type</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading && contacts.length === 0 ? (
                <tr><td colSpan="7" className="admin-empty">Loading…</td></tr>
              ) : contacts.length === 0 ? (
                <tr><td colSpan="7" className="admin-empty">No submissions match your filters.</td></tr>
              ) : (
                contacts.map((c) => (
                  <tr key={c.id} onClick={() => setSelectedId(c.id)} className="admin-row">
                    <td className="admin-cell-muted">{formatDate(c.created_at)}</td>
                    <td><strong>{c.name}</strong></td>
                    <td>{c.email}</td>
                    <td>{c.company || <span className="admin-cell-muted">—</span>}</td>
                    <td>{c.type || <span className="admin-cell-muted">—</span>}</td>
                    <td><StatusBadge status={c.status} /></td>
                    <td><span className="admin-row-arrow"><Icons.Arrow /></span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="admin-pagination">
            <button
              className="btn btn-ghost btn-sm"
              disabled={offset === 0}
              onClick={() => setOffset(Math.max(0, offset - PAGE_SIZE))}
            >
              ← Previous
            </button>
            <span className="admin-page-info">Page {page} of {totalPages} · {total} total</span>
            <button
              className="btn btn-ghost btn-sm"
              disabled={page >= totalPages}
              onClick={() => setOffset(offset + PAGE_SIZE)}
            >
              Next →
            </button>
          </div>
        )}
      </main>

      {selectedId && (
        <AdminContactDetail
          id={selectedId}
          onClose={() => setSelectedId(null)}
          onUpdated={handleContactUpdated}
          onDeleted={handleContactDeleted}
        />
      )}
    </div>
  );
}

function StatCard({ label, value, highlight }) {
  return (
    <div className={`card admin-stat-card ${highlight ? 'highlight' : ''}`}>
      <div className="admin-stat-label">{label}</div>
      <div className={`admin-stat-value ${highlight ? 'gradient-text' : ''}`}>{value}</div>
    </div>
  );
}

export function StatusBadge({ status }) {
  return <span className={`admin-badge admin-badge-${status}`}>{capitalize(status)}</span>;
}

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function formatDate(iso) {
  return new Date(iso).toLocaleString('de-DE', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}