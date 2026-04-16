import React from 'react';

export default function Footer({ t, navigate, openCookieSettings }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a className="logo" onClick={() => navigate('home')}>Veno<span>x</span></a>
            <p>{t.footer.tagline}</p>
          </div>
          <div className="footer-col">
            <h5>{t.nav.services}</h5>
            <a onClick={() => navigate('services')}>Business Websites</a>
            <a onClick={() => navigate('services')}>Landing Pages</a>
            <a onClick={() => navigate('services')}>Website Redesign</a>
            <a onClick={() => navigate('services')}>SEO</a>
          </div>
          <div className="footer-col">
            <h5>{t.footer.company}</h5>
            <a onClick={() => navigate('about')}>{t.nav.about}</a>
            <a onClick={() => navigate('portfolio')}>{t.nav.portfolio}</a>
            <a onClick={() => navigate('process')}>{t.nav.process}</a>
            <a onClick={() => navigate('pricing')}>{t.nav.pricing}</a>
            <a onClick={() => navigate('faq')}>{t.nav.faq}</a>
          </div>
          <div className="footer-col">
            <h5>{t.nav.contact}</h5>
            <a onClick={() => navigate('contact')}>{t.nav.contact}</a>
            <a href="mailto:hello@itsvenox.de">hello@itsvenox.de</a>
            <a>WhatsApp</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} {t.footer.copyright}</span>
          <div className="footer-legal">
            <a onClick={() => navigate('impressum')}>{t.nav.impressum}</a>
            <a onClick={() => navigate('privacy')}>{t.nav.privacy}</a>
            <a onClick={openCookieSettings}>{t.nav.cookieSettings}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
