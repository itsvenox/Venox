import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { translations } from './i18n/index.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import CookieBanner from './components/CookieBanner.jsx';
import HomePage from './pages/HomePage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import { ServicesPage, PortfolioPage, AboutPage, ProcessPage, PricingPage, FAQPage } from './pages/ContentPages.jsx';
import { ImpressumPage, PrivacyPage, NotFoundPage } from './pages/LegalPages.jsx';

const AdminApp = lazy(() => import('./pages/admin/AdminApp.jsx'));

function isAdminHash(hash) {
  return hash === '#admin' || hash.startsWith('#admin/');
}

// ─── Detect initial language from browser / URL / storage ───
function detectInitialLang() {
  if (typeof window === 'undefined') return 'en'; // SSR safety
  const stored = window.localStorage?.getItem('venox-lang');
  if (stored === 'en' || stored === 'de') return stored;
  const browser = (navigator.language || 'en').toLowerCase();
  return browser.startsWith('de') ? 'de' : 'en';
}

function SiteApp() {
  const [lang, setLang] = useState(detectInitialLang);
  const [scrolled, setScrolled] = useState(false);
  const [cookieConsent, setCookieConsent] = useState(null);
  const [cookiePrefs, setCookiePrefs] = useState({ essential: true, analytics: false, marketing: false, preferences: false });
  const [showCookieSettings, setShowCookieSettings] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const [isAdmin, setIsAdmin] = useState(() =>
    typeof window !== 'undefined' ? isAdminHash(window.location.hash) : false
  );

  const navigate = useNavigate();
  const location = useLocation();
  const t = translations[lang];

  // Persist language choice
  useEffect(() => {
    try { window.localStorage?.setItem('venox-lang', lang); } catch {}
  }, [lang]);

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
    if (typeof document !== 'undefined') document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const navigateTo = useCallback((page) => {
    const path = page === 'home' ? '/' : `/${page}`;
    navigate(path);
  }, [navigate]);

  if (isAdmin) {
    return (
      <AdminErrorBoundary>
        <Suspense fallback={<AdminLoadingScreen />}>
          <AdminApp />
        </Suspense>
      </AdminErrorBoundary>
    );
  }

  const currentPage = location.pathname === '/' ? 'home' : location.pathname.replace(/^\//, '');

  // Pass `lang` to every page so they can render per-language SEO meta
  const pageProps = { t, lang, navigate: navigateTo, faqOpen, setFaqOpen };

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header t={t} currentPage={currentPage} navigate={navigateTo} scrolled={scrolled} lang={lang} setLang={setLang} />

      <Routes>
        <Route path="/"           element={<HomePage     {...pageProps} />} />
        <Route path="/services"   element={<ServicesPage  {...pageProps} />} />
        <Route path="/portfolio"  element={<PortfolioPage {...pageProps} />} />
        <Route path="/about"      element={<AboutPage     {...pageProps} />} />
        <Route path="/process"    element={<ProcessPage   {...pageProps} />} />
        <Route path="/pricing"    element={<PricingPage   {...pageProps} />} />
        <Route path="/faq"        element={<FAQPage       {...pageProps} />} />
        <Route path="/contact"    element={<ContactPage   {...pageProps} />} />
        <Route path="/impressum"  element={<ImpressumPage {...pageProps} />} />
        <Route path="/privacy"    element={<PrivacyPage   {...pageProps} />} />
        <Route path="*"           element={<NotFoundPage  {...pageProps} />} />
      </Routes>

      <Footer t={t} navigate={navigateTo} openCookieSettings={() => setShowCookieSettings(true)} />
      <CookieBanner
        t={t} cookieConsent={cookieConsent} setCookieConsent={setCookieConsent}
        cookiePrefs={cookiePrefs} setCookiePrefs={setCookiePrefs}
        showCookieSettings={showCookieSettings} setShowCookieSettings={setShowCookieSettings}
        navigate={navigateTo}
      />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <SiteApp />
      </BrowserRouter>
    </HelmetProvider>
  );
}

function AdminLoadingScreen() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg, #0a0a0f)', color: 'var(--text-muted, #8b8ba0)', fontSize: '0.9rem',
    }}>
      Loading dashboard…
    </div>
  );
}

class AdminErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { console.error('[Admin] Failed to load:', error, info); }
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
            }}>{String(this.state.error?.stack || this.state.error)}</pre>
            <button
              onClick={() => { window.location.hash = ''; window.location.reload(); }}
              style={{
                marginTop: 16, padding: '10px 20px', borderRadius: 999,
                background: '#6c5ce7', color: 'white', border: 'none', cursor: 'pointer',
              }}
            >Back to site</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
