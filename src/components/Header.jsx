import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Icons } from './Icons.jsx';

// Map page IDs to URL paths
const PAGE_PATH = {
  home:      '/',
  services:  '/services',
  portfolio: '/portfolio',
  about:     '/about',
  process:   '/process',
  pricing:   '/pricing',
  faq:       '/faq',
  contact:   '/contact',
};

export default function Header({ t, currentPage, navigate, scrolled, lang, setLang }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home',      label: t.nav.home },
    { id: 'services',  label: t.nav.services },
    { id: 'portfolio', label: t.nav.portfolio },
    { id: 'about',     label: t.nav.about },
    { id: 'pricing',   label: t.nav.pricing },
    { id: 'contact',   label: t.nav.contact },
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
          <Link className="logo" to="/">
            <span>Its</span>Veno<span>x</span>
          </Link>
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={PAGE_PATH[item.id]}
                  className={({ isActive }) => isActive ? 'active' : ''}
                  end={item.id === 'home'}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li><LangSwitch /></li>
            <li>
              <Link className="btn btn-primary btn-sm" to="/contact">
                {t.nav.getQuote}
              </Link>
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
            <NavLink
              key={item.id}
              to={PAGE_PATH[item.id]}
              end={item.id === 'home'}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <LangSwitch />
          <Link
            className="btn btn-primary"
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t.nav.getQuote}
          </Link>
        </div>
      )}
    </>
  );
}
