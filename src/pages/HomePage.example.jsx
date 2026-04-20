// ═════════════════════════════════════════════════════════════════════
// EXAMPLE: How to add SEO to each page
//
// This file shows the minimal change needed. You only need to:
//   1. Import SEO + the data helpers
//   2. Drop <SEO ... /> at the top of each page's return
//
// Do this for: HomePage, ServicesPage, PortfolioPage, AboutPage,
//              ProcessPage, PricingPage, FAQPage, ContactPage,
//              ImpressumPage, PrivacyPage, NotFoundPage
// ═════════════════════════════════════════════════════════════════════

// ─── HomePage.jsx (top of file) ────────────────────────────────────────
import React from 'react';
import SEO from '../components/SEO.jsx';
import { pageMeta, organizationSchema, breadcrumb } from '../seo/seoData.js';
import { Icons } from '../components/Icons.jsx';
import { WebMockup, ProjectCard, SectionHeader, CTASection } from '../components/Shared.jsx';

export default function HomePage({ t, lang, navigate, faqOpen, setFaqOpen }) {
  const meta = pageMeta.home[lang];

  return (
    <>
      <SEO
        lang={lang}
        path="/"
        title={meta.title}
        description={meta.description}
        jsonLd={[
          organizationSchema,
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': 'https://itsvenox.de/#website',
            url: 'https://itsvenox.de',
            name: 'Venox',
            publisher: { '@id': 'https://itsvenox.de/#organization' },
            inLanguage: lang === 'de' ? 'de-DE' : 'en-US',
          },
        ]}
      />

      {/* ...existing hero + sections... */}
    </>
  );
}

// ─── ServicesPage.jsx ──────────────────────────────────────────────────
// export function ServicesPage({ t, lang, navigate }) {
//   const meta = pageMeta.services[lang];
//   const services = t.servicesPage.items.map(s =>
//     serviceSchema(s.title, s.desc, lang)
//   );
//   return (
//     <>
//       <SEO
//         lang={lang}
//         path="/services"
//         title={meta.title}
//         description={meta.description}
//         jsonLd={[
//           breadcrumb([
//             { name: lang === 'de' ? 'Startseite' : 'Home', path: '/' },
//             { name: lang === 'de' ? 'Leistungen' : 'Services', path: '/services' },
//           ]),
//           ...services,
//         ]}
//       />
//       {/* ...page content... */}
//     </>
//   );
// }

// ─── FAQPage.jsx ───────────────────────────────────────────────────────
// export function FAQPage({ t, lang }) {
//   const meta = pageMeta.faq[lang];
//   return (
//     <>
//       <SEO
//         lang={lang}
//         path="/faq"
//         title={meta.title}
//         description={meta.description}
//         jsonLd={[
//           faqSchema(t.faqPage.items), // uses your existing FAQ data
//           breadcrumb([
//             { name: lang === 'de' ? 'Startseite' : 'Home', path: '/' },
//             { name: 'FAQ', path: '/faq' },
//           ]),
//         ]}
//       />
//       {/* ...page content... */}
//     </>
//   );
// }

// ─── NotFoundPage (important!) ─────────────────────────────────────────
// export function NotFoundPage({ lang }) {
//   const meta = pageMeta.notFound[lang];
//   return (
//     <>
//       <SEO
//         lang={lang}
//         path="/404"
//         title={meta.title}
//         description={meta.description}
//         noindex={true}   // ← tells Google not to index 404 pages
//       />
//       {/* ...page content... */}
//     </>
//   );
// }

// ─── Admin/Legal pages ─────────────────────────────────────────────────
// Impressum + Privacy → use noindex={false} (you want these indexed for legal)
// Admin → noindex={true} always
