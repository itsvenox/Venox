import React from 'react';
import { Icons } from '../components/Icons.jsx';
import { WebMockup, ProjectCard, SectionHeader, CTASection } from '../components/Shared.jsx';

export default function HomePage({ t, navigate, faqOpen, setFaqOpen }) {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text fade-up">
              <div className="section-label">{t.hero.label}</div>
              <h1>{t.hero.title} <span className="gradient-text">{t.hero.titleHighlight}</span></h1>
              <p>{t.hero.subtitle}</p>
              <div className="hero-ctas">
                <button className="btn btn-primary btn-lg" onClick={() => navigate('contact')}>{t.hero.ctaPrimary} <Icons.Arrow /></button>
                <button className="btn btn-secondary btn-lg" onClick={() => navigate('portfolio')}>{t.hero.ctaSecondary}</button>
              </div>
              <div className="hero-trust">
                {t.hero.trust.map((item, i) => (
                  <div key={i} className="hero-trust-item"><div className="dot" /> {item}</div>
                ))}
              </div>
            </div>
            <div className="hero-visual fade-up stagger-2">
              <WebMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Why Venox */}
      <section className="section">
        <div className="container">
          <SectionHeader label={t.why.label} title={t.why.title} titleHighlight={t.why.titleHighlight} subtitle={t.why.subtitle} />
          <div className="why-grid">
            {t.why.cards.map((card, i) => {
              const icons = [<Icons.Layout />, <Icons.Mobile />, <Icons.Zap />, <Icons.Search />, <Icons.Users />, <Icons.Target />];
              return (
                <div key={i} className="card why-card fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="icon-wrap">{icons[i]}</div>
                  <h4>{card.title}</h4>
                  <p>{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Snapshot */}
      <section className="section" style={{ background: 'var(--bg-elevated)' }}>
        <div className="container">
          <SectionHeader label={t.servicesSnapshot.label} title={t.servicesSnapshot.title} titleHighlight={t.servicesSnapshot.titleHighlight} subtitle={t.servicesSnapshot.subtitle} />
          <div className="services-grid">
            {t.servicesSnapshot.items.map((s, i) => (
              <div key={i} className="card service-card">
                <div className="num">{s.num}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
                <button className="btn btn-ghost btn-sm" onClick={() => navigate('services')}>{t.servicesSnapshot.learnMore} <Icons.Arrow /></button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20, marginBottom: 48 }}>
            <SectionHeader label={t.portfolioPreview.label} title={t.portfolioPreview.title} titleHighlight={t.portfolioPreview.titleHighlight} subtitle={t.portfolioPreview.subtitle} center={false} />
            <button className="btn btn-secondary" onClick={() => navigate('portfolio')}>{t.portfolioPreview.viewAll} <Icons.Arrow /></button>
          </div>
          <div className="portfolio-grid">
            {t.portfolio.slice(0, 4).map((p, i) => (
              <ProjectCard key={i} project={p} onClick={() => navigate('portfolio')} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section" style={{ background: 'var(--bg-elevated)' }}>
        <div className="container">
          <SectionHeader label={t.processHome.label} title={t.processHome.title} titleHighlight={t.processHome.titleHighlight} subtitle={t.processHome.subtitle} />
          <div className="process-steps">
            {t.processHome.steps.map((s, i) => (
              <div key={i} className="process-step">
                <div className="step-num">{s.num}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <button className="btn btn-secondary" onClick={() => navigate('process')}>{t.processHome.seeProcess} <Icons.Arrow /></button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <SectionHeader label={t.testimonials.label} title={t.testimonials.title} titleHighlight={t.testimonials.titleHighlight} subtitle={t.testimonials.subtitle} />
          <div className="testimonials-grid">
            {t.testimonialsData.map((review, i) => (
              <div key={i} className="card testimonial-card">
                <div className="testimonial-stars">{[...Array(5)].map((_, j) => <Icons.Star key={j} />)}</div>
                <div className="testimonial-text">"{review.text}"</div>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{review.initials}</div>
                  <div className="testimonial-meta">
                    <div className="name">{review.name}</div>
                    <div className="role">{review.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="section" style={{ background: 'var(--bg-elevated)' }}>
        <div className="container">
          <SectionHeader label={t.pricingSection.label} title={t.pricingSection.title} titleHighlight={t.pricingSection.titleHighlight} subtitle={t.pricingSection.subtitle} />
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
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <p style={{ fontSize: '0.9rem' }}>
              {t.pricingSection.customNote}{' '}
              <a onClick={() => navigate('contact')} style={{ color: 'var(--accent-light)', cursor: 'pointer', textDecoration: 'none' }}>{t.pricingSection.customLink}</a>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="section">
        <div className="container">
          <SectionHeader label={t.faqSection.label} title={t.faqSection.title} titleHighlight={t.faqSection.titleHighlight} />
          <div className="faq-list">
            {t.faqPage.faqs.slice(0, 5).map((f, i) => (
              <div key={i} className={`faq-item ${faqOpen === `home-${i}` ? 'open' : ''}`}>
                <button className="faq-question" onClick={() => setFaqOpen(faqOpen === `home-${i}` ? null : `home-${i}`)}>
                  {f.q} <Icons.ChevDown />
                </button>
                {faqOpen === `home-${i}` && <div className="faq-answer">{f.a}</div>}
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <button className="btn btn-secondary" onClick={() => navigate('faq')}>{t.faqSection.viewAll} <Icons.Arrow /></button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection title={t.cta.homeTitle} titleHighlight={t.cta.homeTitleHighlight} subtitle={t.cta.homeSubtitle}>
        <button className="btn btn-primary btn-lg" onClick={() => navigate('contact')}>{t.cta.startProject} <Icons.Arrow /></button>
        <button className="btn btn-secondary btn-lg" onClick={() => navigate('pricing')}>{t.cta.seePricing}</button>
      </CTASection>
    </>
  );
}
