import React from 'react';

export default function CookieBanner({
  t, cookieConsent, setCookieConsent, cookiePrefs, setCookiePrefs,
  showCookieSettings, setShowCookieSettings, navigate
}) {
  const cats = [
    { key: 'essential', locked: true },
    { key: 'analytics' },
    { key: 'marketing' },
    { key: 'preferences' },
  ];

  if (showCookieSettings) {
    return (
      <div className="cookie-banner" style={{ maxWidth: 480 }}>
        <h4>{t.cookie.prefsTitle}</h4>
        <p>{t.cookie.prefsText}</p>
        <div style={{ marginBottom: 20 }}>
          {cats.map((c) => (
            <div key={c.key} className="cookie-toggle">
              <div>
                <div className="cookie-toggle-label">{t.cookie.categories[c.key].label}</div>
                <div className="cookie-toggle-desc">{t.cookie.categories[c.key].desc}</div>
              </div>
              <div
                className={`toggle-switch ${cookiePrefs[c.key] ? 'active' : ''} ${c.locked ? 'disabled' : ''}`}
                onClick={() => !c.locked && setCookiePrefs(p => ({ ...p, [c.key]: !p[c.key] }))}
              />
            </div>
          ))}
        </div>
        <div className="cookie-actions">
          <button className="btn btn-primary btn-sm" onClick={() => { setCookieConsent('custom'); setShowCookieSettings(false); }}>
            {t.cookie.save}
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => setShowCookieSettings(false)}>
            {t.cookie.cancel}
          </button>
        </div>
      </div>
    );
  }

  if (!cookieConsent) {
    return (
      <div className="cookie-banner">
        <h4>{t.cookie.title}</h4>
        <p>
          {t.cookie.text}{' '}
          <a onClick={() => navigate('privacy')} style={{ color: 'var(--accent-light)', cursor: 'pointer' }}>
            {t.cookie.learnMore}
          </a>
        </p>
        <div className="cookie-actions">
          <button className="btn btn-primary btn-sm" onClick={() => {
            setCookieConsent('accepted');
            setCookiePrefs({ essential: true, analytics: true, marketing: true, preferences: true });
          }}>
            {t.cookie.acceptAll}
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => {
            setCookieConsent('rejected');
            setCookiePrefs({ essential: true, analytics: false, marketing: false, preferences: false });
          }}>
            {t.cookie.rejectNonEssential}
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => setShowCookieSettings(true)}>
            {t.cookie.managePrefs}
          </button>
        </div>
      </div>
    );
  }

  return null;
}
