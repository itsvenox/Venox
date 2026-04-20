import React, { useState } from 'react';
import SEO from '../components/SEO.jsx';
import {
  pageMeta,
  organizationSchema,
  breadcrumb,
  contactPageSchema,
} from '../seo/seoData.js';
import { Icons } from '../components/Icons.jsx';

const API_URL = 'https://api.itsvenox.de/api';

export default function ContactPage({ t, lang, navigate }) {
  const meta = pageMeta.contact[lang];

  const [formData, setFormData] = useState({
    name: '', email: '', company: '', phone: '',
    budget: '', type: '', message: '', consent: false,
  });
  const [formState, setFormState] = useState('idle'); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.consent) return;

    setFormState('loading');
    setErrorMsg('');

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, consent: formData.consent ? 'true' : 'false' }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setFormState('success');
      } else {
        setFormState('error');
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setFormState('error');
      setErrorMsg('Network error. Please check your connection and try again.');
    }
  };

  const f = t.contactPage.form;
  const info = t.contactPage.info;

  return (
    <>
      <SEO
        lang={lang}
        path="/contact"
        title={meta.title}
        description={meta.description}
        jsonLd={[
          organizationSchema,
          breadcrumb([
            { name: lang === 'de' ? 'Startseite' : 'Home', path: '/' },
            { name: lang === 'de' ? 'Kontakt' : 'Contact', path: '/contact' },
          ]),
          contactPageSchema(lang),
        ]}
      />

      <div className="page-hero"><div className="container">
        <div className="section-label" style={{ justifyContent: 'center' }}>{t.contactPage.label}</div>
        <h1>{t.contactPage.title} <span className="gradient-text">{t.contactPage.titleHighlight}</span></h1>
        <p>{t.contactPage.subtitle}</p>
      </div></div>
      <section className="section-sm"><div className="container">
        <div className="contact-grid">
          <div>
            {formState === 'success' ? (
              <div className="card" style={{ textAlign: 'center', padding: 48 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--success)' }}>
                  <Icons.Check />
                </div>
                <h3 style={{ marginBottom: 12 }}>{f.successTitle}</h3>
                <p>{f.successText}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">{f.name} *</label>
                    <input id="name" className="form-input" type="text" placeholder={f.namePlaceholder} required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">{f.email} *</label>
                    <input id="email" className="form-input" type="email" placeholder={f.emailPlaceholder} required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="company">{f.company}</label>
                    <input id="company" className="form-input" type="text" placeholder={f.companyPlaceholder} value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">{f.phone}</label>
                    <input id="phone" className="form-input" type="tel" placeholder={f.phonePlaceholder} value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="type">{f.type}</label>
                    <select id="type" className="form-select" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                      <option value="">{f.typePlaceholder}</option>
                      {f.typeOptions.map((o, i) => <option key={i}>{o}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="budget">{f.budget}</label>
                    <select id="budget" className="form-select" value={formData.budget} onChange={e => setFormData({ ...formData, budget: e.target.value })}>
                      <option value="">{f.budgetPlaceholder}</option>
                      {f.budgetOptions.map((o, i) => <option key={i}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="message">{f.message} *</label>
                  <textarea id="message" className="form-textarea" placeholder={f.messagePlaceholder} required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-checkbox">
                    <input type="checkbox" checked={formData.consent} onChange={e => setFormData({ ...formData, consent: e.target.checked })} required />
                    {f.consent}{' '}
                    <a onClick={() => navigate('privacy')} style={{ color: 'var(--accent-light)', cursor: 'pointer' }}>{f.consentLink}</a>. *
                  </label>
                </div>
                {formState === 'error' && (
                  <div style={{ background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)', borderRadius: 'var(--radius)', padding: '12px 16px', marginBottom: 16, color: '#ff5050', fontSize: '0.9rem' }}>
                    {errorMsg}
                  </div>
                )}
                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} disabled={formState === 'loading'}>
                  {formState === 'loading' ? 'Sending...' : f.submit} <Icons.Send />
                </button>
              </form>
            )}
          </div>
          <div>
            <div className="contact-info-card" style={{ marginBottom: 24 }}>
              <h4 style={{ marginBottom: 24 }}>{info.title}</h4>
              <div className="contact-info-item">
                <div className="contact-info-icon"><Icons.Mail /></div>
                <div><div className="contact-info-label">{info.email}</div><div className="contact-info-value">hello@itsvenox.de</div></div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon"><Icons.Phone /></div>
                <div><div className="contact-info-label">{info.whatsapp}</div><div className="contact-info-value">+49 176 64302435</div></div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon"><Icons.MapPin /></div>
                <div><div className="contact-info-label">{info.area}</div><div className="contact-info-value">{info.areaValue}</div></div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon"><Icons.Clock /></div>
                <div><div className="contact-info-label">{info.response}</div><div className="contact-info-value">{info.responseValue}</div></div>
              </div>
            </div>
            <div className="card" style={{ background: 'var(--gradient-subtle)' }}>
              <h4 style={{ marginBottom: 8 }}>{t.contactPage.consultation.title}</h4>
              <p style={{ fontSize: '0.9rem' }}>{t.contactPage.consultation.text}</p>
            </div>
          </div>
        </div>
      </div></section>
    </>
  );
}
