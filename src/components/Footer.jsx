import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ t, navigate, openCookieSettings }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="logo" to="/"><span>Its</span>Veno<span>x</span></Link>
            <p>{t.footer.tagline}</p>
          </div>
          <div className="footer-col">
            <h5>{t.nav.services}</h5>
            <Link to="/services">Business Websites</Link>
            <Link to="/services">Landing Pages</Link>
            <Link to="/services">Website Redesign</Link>
            <Link to="/services">SEO</Link>
          </div>
          <div className="footer-col">
            <h5>{t.footer.company}</h5>
            <Link to="/about">{t.nav.about}</Link>
            <Link to="/portfolio">{t.nav.portfolio}</Link>
            <Link to="/process">{t.nav.process}</Link>
            <Link to="/pricing">{t.nav.pricing}</Link>
            <Link to="/faq">{t.nav.faq}</Link>
          </div>
          <div className="footer-col">
            <h5>{t.nav.contact}</h5>
            <Link to="/contact">{t.nav.contact}</Link>
            <a href="mailto:hello@itsvenox.de">hello@itsvenox.de</a>
            <a>WhatsApp</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} {t.footer.copyright}</span>
          <div className="footer-legal">
            <Link to="/impressum">{t.nav.impressum}</Link>
            <Link to="/privacy">{t.nav.privacy}</Link>
            <a onClick={openCookieSettings} style={{ cursor: 'pointer' }}>{t.nav.cookieSettings}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
