import React from 'react';
import SEO from '../components/SEO.jsx';
import {
  pageMeta,
  organizationSchema,
  breadcrumb,
  serviceSchema,
  faqSchema,
} from '../seo/seoData.js';
import { Icons } from '../components/Icons.jsx';
import { SectionHeader, CTASection, ProjectCard } from '../components/Shared.jsx';

// ─── SERVICES PAGE ───
export function ServicesPage({ t, lang, navigate }) {
  const meta = pageMeta.services[lang];

  // One Service schema per offering — richer results potential
  const services = t.servicesPage.items.map((s) =>
    serviceSchema(s.title, s.desc, lang === 'de' ? 'de-DE' : 'en-US')
  );

  return (
    <>
      <SEO
        lang={lang}
        path="/services"
        title={meta.title}
        description={meta.description}
        jsonLd={[
          organizationSchema,
          breadcrumb([
            { name: lang === 'de' ? 'Startseite' : 'Home', path: '/' },
            { name: lang === 'de' ? 'Leistungen' : 'Services', path: '/services' },
          ]),
          ...services,
        ]}
      />

      <div className="page-hero"><div className="container">
        <div className="section-label" style={{ justifyContent: 'center' }}>{t.servicesPage.label}</div>
        <h1>{t.servicesPage.title} <span className="gradient-text">{t.servicesPage.titleHighlight}</span></h1>
        <p>{t.servicesPage.subtitle}</p>
      </div></div>
      <div className="container">
        <div style={{ paddingTop: 48 }}>
          {t.servicesPage.items.map((s, i) => (
            <div key={i} className="service-detail-card">
              <div>
                <div className="service-detail-num">{s.num}</div>
                <h3>{s.title}</h3>
                <p style={{ marginBottom: 16 }}>{s.desc}</p>
                <p style={{ fontSize: '0.9rem' }}><strong style={{ color: 'var(--text)' }}>{t.servicesPage.whoFor}</strong> {s.who}</p>
                <p style={{ fontSize: '0.9rem', marginTop: 8 }}><strong style={{ color: 'var(--success)' }}>{t.servicesPage.benefit}</strong> {s.benefit}</p>
              </div>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 28 }}>
                <h4 style={{ marginBottom: 16, fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t.servicesPage.deliverables}</h4>
                <ul className="deliverable-list">
                  {s.deliverables.map((d, j) => <li key={j}><Icons.Check />{d}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CTASection title={t.servicesPage.ctaTitle} titleHighlight={t.servicesPage.ctaTitleHighlight} subtitle={t.servicesPage.ctaSubtitle}>
        <button className="btn btn-primary btn-lg" onClick={() => navigate('contact')}>{t.servicesPage.ctaBtn} <Icons.Arrow /></button>
      </CTASection>
    </>
  );
}

// ─── PORTFOLIO PAGE ───
export function PortfolioPage({ t, lang, navigate }) {
  const meta = pageMeta.portfolio[lang];

  // CollectionPage schema helps Google understand this is a gallery of work
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: meta.title,
    description: meta.description,
    url: 'https://itsvenox.de/portfolio',
    inLanguage: lang === 'de' ? 'de-DE' : 'en-US',
    isPartOf: { '@id': 'https://itsvenox.de/#website' },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: t.portfolio.length,
      itemListElement: t.portfolio.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.title || p.name || `Project ${i + 1}`,
      })),
    },
  };

  return (
    <>
      <SEO
        lang={lang}
        path="/portfolio"
        title={meta.title}
        description={meta.description}
        jsonLd={[
          breadcrumb([
            { name: lang === 'de' ? 'Startseite' : 'Home', path: '/' },
            { name: 'Portfolio', path: '/portfolio' },
          ]),
          collectionSchema,
        ]}
      />

      <div className="page-hero"><div className="container">
        <div className="section-label" style={{ justifyContent: 'center' }}>{t.portfolioPage.label}</div>
        <h1>{t.portfolioPage.title} <span className="gradient-text">{t.portfolioPage.titleHighlight}</span></h1>
        <p>{t.portfolioPage.subtitle}</p>
      </div></div>
      <section className="section-sm"><div className="container">
        <div className="portfolio-grid">
          {t.portfolio.map((p, i) => <ProjectCard key={i} project={p} onClick={() => {}} />)}
        </div>
      </div></section>
      <CTASection title={t.portfolioPage.ctaTitle} titleHighlight={t.portfolioPage.ctaTitleHighlight} subtitle={t.portfolioPage.ctaSubtitle}>
        <button className="btn btn-primary btn-lg" onClick={() => navigate('contact')}>{t.cta.startProject} <Icons.Arrow /></button>
      </CTASection>
    </>
  );
}

// ─── ABOUT PAGE ───
export function AboutPage({ t, lang, navigate }) {
  const meta = pageMeta.about[lang];

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: meta.title,
    description: meta.description,
    url: 'https://itsvenox.de/about',
    inLanguage: lang === 'de' ? 'de-DE' : 'en-US',
    mainEntity: { '@id': 'https://itsvenox.de/#organization' },
  };

  return (
    <>
      <SEO
        lang={lang}
        path="/about"
        title={meta.title}
        description={meta.description}
        jsonLd={[
          organizationSchema,
          breadcrumb([
            { name: lang === 'de' ? 'Startseite' : 'Home', path: '/' },
            { name: lang === 'de' ? 'Über uns' : 'About', path: '/about' },
          ]),
          aboutPageSchema,
        ]}
      />

      <div className="page-hero"><div className="container">
        <div className="section-label" style={{ justifyContent: 'center' }}>{t.aboutPage.label}</div>
        <h1>{t.aboutPage.title} <span className="gradient-text">{t.aboutPage.titleHighlight}</span></h1>
        <p>{t.aboutPage.subtitle}</p>
      </div></div>
      <section className="section-sm"><div className="container">
        <div className="about-grid">
          <div>
            <h2 style={{ marginBottom: 20 }}>{t.aboutPage.storyTitle}</h2>
            <p style={{ marginBottom: 16 }}>{t.aboutPage.storyP1}</p>
            <p style={{ marginBottom: 16 }}>{t.aboutPage.storyP2}</p>
            <p style={{ marginBottom: 16 }}>{t.aboutPage.storyP3}</p>
            <h3 style={{ marginTop: 32, marginBottom: 16 }}>{t.aboutPage.missionTitle}</h3>
            <p>{t.aboutPage.missionText}</p>
          </div>
          <div className="about-visual">
            {t.aboutPage.stats.map((s, i) => (
              <div key={i} className="about-stat">
                <div className="num gradient-text">{s.num}</div>
                <div className="label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div></section>
      <section className="section" style={{ background: 'var(--bg-elevated)' }}><div className="container">
        <SectionHeader label={t.aboutPage.valuesLabel} title={t.aboutPage.valuesTitle} titleHighlight={t.aboutPage.valuesTitleHighlight} />
        <div className="about-values" style={{ maxWidth: 800, margin: '40px auto 0' }}>
          {t.aboutPage.values.map((v, i) => (
            <div key={i} className="card value-card"><h4>{v.title}</h4><p>{v.desc}</p></div>
          ))}
        </div>
      </div></section>
      <CTASection title={t.aboutPage.ctaTitle} titleHighlight={t.aboutPage.ctaTitleHighlight} subtitle={t.aboutPage.ctaSubtitle}>
        <button className="btn btn-primary btn-lg" onClick={() => navigate('contact')}>{t.aboutPage.ctaBtn} <Icons.Arrow /></button>
      </CTASection>
    </>
  );
}

// ─── PROCESS PAGE ───
export function ProcessPage({ t, lang, navigate }) {
  const meta = pageMeta.process[lang];

  // HowTo schema — your process is a perfect fit for this
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: meta.title,
    description: meta.description,
    inLanguage: lang === 'de' ? 'de-DE' : 'en-US',
    step: t.processPage.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.desc,
    })),
  };

  return (
    <>
      <SEO
        lang={lang}
        path="/process"
        title={meta.title}
        description={meta.description}
        jsonLd={[
          breadcrumb([
            { name: lang === 'de' ? 'Startseite' : 'Home', path: '/' },
            { name: lang === 'de' ? 'Ablauf' : 'Process', path: '/process' },
          ]),
          howToSchema,
        ]}
      />

      <div className="page-hero"><div className="container">
        <div className="section-label" style={{ justifyContent: 'center' }}>{t.processPage.label}</div>
        <h1>{t.processPage.title} <span className="gradient-text">{t.processPage.titleHighlight}</span></h1>
        <p>{t.processPage.subtitle}</p>
      </div></div>
      <section className="section-sm"><div className="container">
        <div className="process-detail-grid">
          {t.processPage.steps.map((s, i) => (
            <div key={i} className="process-detail-step">
              <div className="process-detail-num">{s.num}</div>
              <div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="process-detail-tags">
                  {s.tags.map((tag, j) => <span key={j} className="process-tag">{tag}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div></section>
      <CTASection title={t.processPage.ctaTitle} titleHighlight={t.processPage.ctaTitleHighlight} subtitle={t.processPage.ctaSubtitle}>
        <button className="btn btn-primary btn-lg" onClick={() => navigate('contact')}>{t.cta.bookConsultation} <Icons.Arrow /></button>
      </CTASection>
    </>
  );
}

// ─── PRICING PAGE ───
export function PricingPage({ t, lang, navigate }) {
  const meta = pageMeta.pricing[lang];

  // Each package as a Product with an Offer — can get price shown in search
  const offerSchemas = t.pricingPage.packages.map((p) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Venox ${p.name}`,
    description: p.desc,
    brand: { '@type': 'Brand', name: 'Venox' },
    offers: {
      '@type': 'Offer',
      url: 'https://itsvenox.de/pricing',
      priceCurrency: 'EUR',
      price: String(p.price).replace(/[^\d]/g, '') || '0',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: String(p.price).replace(/[^\d]/g, '') || '0',
        priceCurrency: 'EUR',
      },
      availability: 'https://schema.org/InStock',
      seller: { '@id': 'https://itsvenox.de/#organization' },
    },
  }));

  return (
    <>
      <SEO
        lang={lang}
        path="/pricing"
        title={meta.title}
        description={meta.description}
        jsonLd={[
          breadcrumb([
            { name: lang === 'de' ? 'Startseite' : 'Home', path: '/' },
            { name: lang === 'de' ? 'Preise' : 'Pricing', path: '/pricing' },
          ]),
          ...offerSchemas,
        ]}
      />

      <div className="page-hero"><div className="container">
        <div className="section-label" style={{ justifyContent: 'center' }}>{t.pricingPage.label}</div>
        <h1>{t.pricingPage.title} <span className="gradient-text">{t.pricingPage.titleHighlight}</span></h1>
        <p>{t.pricingPage.subtitle}</p>
      </div></div>
      <section className="section-sm"><div className="container">
        <div className="pricing-grid">
          {t.pricingPage.packages.map((p, i) => (
            <div key={i} className={`card pricing-card ${i === 1 ? 'featured' : ''}`}>
              {p.badge && <div className="pricing-badge">{p.badge}</div>}
              <div className="pricing-name">{p.name}</div>
              <div className="pricing-price"><span>{t.pricingSection.from} </span>{p.price}</div>
              <div className="pricing-desc">{p.desc}</div>
              <ul className="pricing-features">
                {p.features.map((f, j) => <li key={j}><Icons.Check />{f}</li>)}
              </ul>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('contact')}>{t.pricingSection.getStarted} <Icons.Arrow /></button>
            </div>
          ))}
        </div>
        {/* Maintenance */}
        <div style={{ marginTop: 60, textAlign: 'center' }}>
          <h3 style={{ marginBottom: 8 }}>{t.pricingSection.maintenance.title}</h3>
          <p style={{ marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>{t.pricingSection.maintenance.subtitle}</p>
          <div className="card" style={{ maxWidth: 500, margin: '0 auto', textAlign: 'left' }}>
            <div className="pricing-name">{t.pricingSection.maintenance.name}</div>
            <div className="pricing-price" style={{ fontSize: '2rem' }}><span>{t.pricingSection.from} </span>€49<span>{t.pricingSection.perMonth}</span></div>
            <div className="pricing-desc">{t.pricingSection.maintenance.desc}</div>
            <ul className="pricing-features">
              {t.pricingSection.maintenance.features.map((f, j) => <li key={j}><Icons.Check />{f}</li>)}
            </ul>
            <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('contact')}>{t.pricingSection.maintenance.cta} <Icons.Arrow /></button>
          </div>
        </div>
      </div></section>
      <CTASection title={t.pricingPage.ctaTitle} titleHighlight={t.pricingPage.ctaTitleHighlight} subtitle={t.pricingPage.ctaSubtitle}>
        <button className="btn btn-primary btn-lg" onClick={() => navigate('contact')}>{t.cta.customQuote} <Icons.Arrow /></button>
      </CTASection>
    </>
  );
}

// ─── FAQ PAGE ───
export function FAQPage({ t, lang, navigate, faqOpen, setFaqOpen }) {
  const meta = pageMeta.faq[lang];

  return (
    <>
      <SEO
        lang={lang}
        path="/faq"
        title={meta.title}
        description={meta.description}
        jsonLd={[
          breadcrumb([
            { name: lang === 'de' ? 'Startseite' : 'Home', path: '/' },
            { name: 'FAQ', path: '/faq' },
          ]),
          // Full FAQ markup — can get rich results on Google
          faqSchema(t.faqPage.faqs),
        ]}
      />

      <div className="page-hero"><div className="container">
        <div className="section-label" style={{ justifyContent: 'center' }}>{t.faqPage.label}</div>
        <h1>{t.faqPage.title} <span className="gradient-text">{t.faqPage.titleHighlight}</span></h1>
        <p>{t.faqPage.subtitle}</p>
      </div></div>
      <section className="section-sm"><div className="container">
        <div className="faq-list">
          {t.faqPage.faqs.map((f, i) => (
            <div key={i} className={`faq-item ${faqOpen === `faq-${i}` ? 'open' : ''}`}>
              <button className="faq-question" onClick={() => setFaqOpen(faqOpen === `faq-${i}` ? null : `faq-${i}`)}>
                {f.q} <Icons.ChevDown />
              </button>
              {faqOpen === `faq-${i}` && <div className="faq-answer">{f.a}</div>}
            </div>
          ))}
        </div>
      </div></section>
      <CTASection title={t.faqPage.ctaTitle} titleHighlight={t.faqPage.ctaTitleHighlight} subtitle={t.faqPage.ctaSubtitle}>
        <button className="btn btn-primary btn-lg" onClick={() => navigate('contact')}>{t.cta.contactUs} <Icons.Arrow /></button>
      </CTASection>
    </>
  );
}
