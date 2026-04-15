import React, { useState } from 'react';
import { Icons } from './Icons.jsx';

export default function Header({ t, currentPage, navigate, scrolled, lang, setLang }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'services', label: t.nav.services },
    { id: 'portfolio', label: t.nav.portfolio },
    { id: 'about', label: t.nav.about },
    { id: 'pricing', label: t.nav.pricing },
    { id: 'contact', label: t.nav.contact },
  ];

  const LangSwitch = () => (
    <div className="lang-switch">
      <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>
        {t.langSwitch.en}
      </button>
      <button className={`lang-btn ${lang === 'de' ? 'active' : ''}`} onClick={() => setLang('de')}>
        {t.langSwitch.de}
      </button>
    </div>
  );

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-inner">
          <a className="logo" onClick={() => navigate('home')}>
            Veno<span>x</span>
          </a>
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  className={currentPage === item.id ? 'active' : ''}
                  onClick={() => navigate(item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li><LangSwitch /></li>
            <li>
              <button className="btn btn-primary btn-sm" onClick={() => navigate('contact')}>
                {t.nav.getQuote}
              </button>
            </li>
          </ul>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="mobile-menu-btn" style={{ display: 'none' }}><LangSwitch /></div>
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)}>
              <Icons.Menu />
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="mobile-nav">
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(false)}
            style={{ position: 'absolute', top: 20, right: 24, display: 'block' }}
          >
            <Icons.X />
          </button>
          {navItems.map((item) => (
            <a key={item.id} onClick={() => { navigate(item.id); setMobileMenuOpen(false); }}>
              {item.label}
            </a>
          ))}
          <LangSwitch />
          <button className="btn btn-primary" onClick={() => { navigate('contact'); setMobileMenuOpen(false); }}>
            {t.nav.getQuote}
          </button>
        </div>
      )}
    </>
  );
}
