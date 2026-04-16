import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { translations } from './i18n/index.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import CookieBanner from './components/CookieBanner.jsx';
import HomePage from './pages/HomePage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import { ServicesPage, PortfolioPage, AboutPage, ProcessPage, PricingPage, FAQPage } from './pages/ContentPages.jsx';
import { ImpressumPage, PrivacyPage, NotFoundPage } from './pages/LegalPages.jsx';

// ─── Lazy-loaded admin bundle (separate chunk, not shipped to regular visitors) ───
const AdminApp = lazy(() => import('./pages/admin/AdminApp.jsx'));

function isAdminHash(hash) {
  return hash === '#admin' || hash.startsWith('#admin/');
}

export default function App() {
  const [lang, setLang] = useState('en');
  const [currentPage, setCurrentPage] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [cookieConsent, setCookieConsent] = useState(null);
  const [cookiePrefs, setCookiePrefs] = useState({ essential: true, analytics: false, marketing: false, preferences: false });
  const [showCookieSettings, setShowCookieSettings] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const [isAdmin, setIsAdmin] = useState(() => isAdminHash(window.location.hash));

  const t = translations[lang];

  // ─── Watch hash changes to toggle admin mode ───
  useEffect(() => {
    const onHashChange = () => setIsAdmin(isAdminHash(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const navigate = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);


  // ─── Admin mode: render dashboard, skip public layout entirely ───
  if (isAdmin) {
    return (
      <AdminErrorBoundary>
        <Suspense fallback={<AdminLoadingScreen />}>
          <AdminApp />
        </Suspense>
      </AdminErrorBoundary>
    );
  }

  const renderPage = () => {
    const props = { t, navigate, faqOpen, setFaqOpen };
    switch (currentPage) {
      case 'home': return <HomePage {...props} />;
      case 'services': return <ServicesPage {...props} />;
      case 'portfolio': return <PortfolioPage {...props} />;
      case 'about': return <AboutPage {...props} />;
      case 'process': return <ProcessPage {...props} />;
      case 'pricing': return <PricingPage {...props} />;
      case 'faq': return <FAQPage {...props} />;
      case 'contact': return <ContactPage {...props} />;
      case 'impressum': return <ImpressumPage {...props} />;
      case 'privacy': return <PrivacyPage {...props} />;
      default: return <NotFoundPage {...props} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header t={t} currentPage={currentPage} navigate={navigate} scrolled={scrolled} lang={lang} setLang={setLang} />
      {renderPage()}
      <Footer t={t} navigate={navigate} openCookieSettings={() => setShowCookieSettings(true)} />
      <CookieBanner
        t={t} cookieConsent={cookieConsent} setCookieConsent={setCookieConsent}
        cookiePrefs={cookiePrefs} setCookiePrefs={setCookiePrefs}
        showCookieSettings={showCookieSettings} setShowCookieSettings={setShowCookieSettings}
        navigate={navigate}
      />
    </div>
  );
}

function AdminLoadingScreen() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg, #0a0a0f)',
      color: 'var(--text-muted, #8b8ba0)',
      fontSize: '0.9rem',
    }}>
      Loading dashboard…
    </div>
  );
}

class AdminErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error('[Admin] Failed to load:', error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', alignItems: 'center',
          justifyContent: 'center', padding: 40, background: '#0a0a0f',
          color: '#f0f0f5', fontFamily: 'system-ui, sans-serif',
        }}>
          <div style={{ maxWidth: 500 }}>
            <h2 style={{ marginBottom: 12 }}>Dashboard failed to load</h2>
            <pre style={{
              background: '#111118', padding: 16, borderRadius: 8,
              color: '#ff7070', fontSize: 13, overflow: 'auto',
              border: '1px solid #1e1e2e',
            }}>
              {String(this.state.error?.stack || this.state.error)}
            </pre>
            <button
              onClick={() => { window.location.hash = ''; window.location.reload(); }}
              style={{
                marginTop: 16, padding: '10px 20px', borderRadius: 999,
                background: '#6c5ce7', color: 'white', border: 'none', cursor: 'pointer',
              }}
            >
              Back to site
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}