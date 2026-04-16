import React, { useState, useEffect } from 'react';
import { Icons } from '../../components/Icons.jsx';
import { adminApi } from '../../lib/adminApi.js';
import StatusBadge from './StatusBadge.jsx';

const STATUSES = ['new', 'read', 'replied', 'archived'];

export default function AdminContactDetail({ id, onClose, onUpdated, onDeleted }) {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('new');
  const [confirmDelete, setConfirmDelete] = useState(false);

  // ─── Load the contact; auto-mark as "read" if it was "new" ───
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');

    adminApi.getContact(id)
      .then((r) => {
        if (cancelled) return;
        setContact(r.contact);
        setNotes(r.contact.notes || '');
        setStatus(r.contact.status);

        if (r.contact.status === 'new') {
          adminApi.updateContact(id, { status: 'read' })
            .then((u) => {
              if (cancelled) return;
              setStatus('read');
              setContact(u.contact);
              onUpdated(u.contact);
            })
            .catch(() => { /* non-fatal */ });
        }
      })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // ─── Esc to close ───
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const res = await adminApi.updateContact(id, { status, notes });
      setContact(res.contact);
      onUpdated(res.contact);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    setError('');
    try {
      await adminApi.deleteContact(id);
      onDeleted(id);
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <>
      <div className="admin-drawer-backdrop" onClick={onClose} />
      <aside className="admin-drawer" role="dialog" aria-modal="true">
        <header className="admin-drawer-head">
          <button className="admin-drawer-close" onClick={onClose} aria-label="Close">
            <Icons.X />
          </button>
          <div className="admin-drawer-title">
            {loading ? 'Loading…' : contact?.name}
          </div>
          {contact && <StatusBadge status={contact.status} />}
        </header>

        {error && <div className="admin-error" style={{ margin: 24 }}>{error}</div>}

        {contact && !loading && (
          <div className="admin-drawer-body">
            <section>
              <h4 className="admin-section-heading">Contact</h4>
              <dl className="admin-dl">
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${contact.email}`} style={{ color: 'var(--accent-light)' }}>
                    {contact.email}
                  </a>
                </dd>
                {contact.company && (<><dt>Company</dt><dd>{contact.company}</dd></>)}
                {contact.phone && (<><dt>Phone</dt><dd>{contact.phone}</dd></>)}
                {contact.type && (<><dt>Project Type</dt><dd>{contact.type}</dd></>)}
                {contact.budget && (<><dt>Budget</dt><dd>{contact.budget}</dd></>)}
                <dt>Received</dt>
                <dd>{new Date(contact.created_at).toLocaleString('de-DE')}</dd>
              </dl>
            </section>

            <section>
              <h4 className="admin-section-heading">Message</h4>
              <div className="admin-message-box">{contact.message}</div>
            </section>

            <section>
              <h4 className="admin-section-heading">Manage</h4>
              <div className="form-group">
                <label className="form-label" htmlFor="admin-status">Status</label>
                <select
                  id="admin-status"
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="admin-notes">Internal notes</label>
                <textarea
                  id="admin-notes"
                  className="form-textarea"
                  placeholder="Private notes for the team…"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>
            </section>

            <section className="admin-drawer-meta">
              <details>
                <summary>Technical details</summary>
                <dl className="admin-dl admin-dl-small">
                  <dt>ID</dt><dd><code>{contact.id}</code></dd>
                  {contact.ip && (<><dt>IP</dt><dd><code>{contact.ip}</code></dd></>)}
                  {contact.user_agent && (
                    <><dt>User Agent</dt><dd><code>{contact.user_agent}</code></dd></>
                  )}
                </dl>
              </details>
            </section>
          </div>
        )}

        {contact && (
          <footer className="admin-drawer-foot">
            <a
              className="btn btn-secondary"
              href={`mailto:${contact.email}?subject=Re: Your Venox Project Inquiry`}
            >
              <Icons.Mail /> Reply
            </a>
            <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
              {saving ? 'Saving…' : 'Save changes'}
            </button>
            {confirmDelete ? (
              <>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => setConfirmDelete(false)}
                >
                  Cancel
                </button>
                <button
                  className="admin-btn-danger"
                  disabled={saving}
                  onClick={handleDelete}
                >
                  Confirm delete
                </button>
              </>
            ) : (
              <button
                className="admin-btn-danger-ghost"
                onClick={() => setConfirmDelete(true)}
              >
                Delete
              </button>
            )}
          </footer>
        )}
      </aside>
    </>
  );
}