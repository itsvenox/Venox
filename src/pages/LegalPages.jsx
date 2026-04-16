import React from 'react';
import { Icons } from '../components/Icons.jsx';

// ─── IMPRESSUM PAGE ───
export function ImpressumPage({ t }) {
  return (
    <>
      <div className="page-hero"><div className="container">
        <h1>Impressum</h1>
        <p>{t.nav.impressum}</p>
      </div></div>
      <section className="section-sm"><div className="container">
        <div className="legal-content">
          <h2>Information According to § 5 TMG</h2>
          {/* <div className="legal-placeholder">⚠️ The following details must be completed with actual business information before publishing this website.</div> */}
          <h3>Business Name</h3>
          <p>ItsVenox — Web Design & Development</p>
          <h3>Legal Representative</h3>
          <p>Omar Alizzi</p>
          <h3>Address</h3>
          <p>[NO ADDRESS YET]<br />44141, Dortmund]<br />Germany</p>
          <h3>Contact</h3>
          <p>Email: hello@itsvenox.de</p>
          <h3>VAT Identification Number</h3>
          <p>VAT ID according to § 27a UStG: PRIVATE</p>
          <h3>Responsible for Content According to § 18 Abs. 2 MStV</h3>
          <p>Omar Alizzi</p>
          <h3>Dispute Resolution</h3>
          <p>The European Commission provides a platform for online dispute resolution (ODR): <em>https://ec.europa.eu/consumers/odr</em>.</p>
          <p>We are not willing or obligated to participate in dispute resolution proceedings before a consumer arbitration board.</p>
          {/* <div className="legal-placeholder">⚠️ This legal notice should be reviewed with a qualified legal professional before the website goes live.</div> */}
        </div>
      </div></section>
    </>
  );
}

// ─── PRIVACY PAGE ───
export function PrivacyPage({ t }) {
  return (
    <>
      <div className="page-hero"><div className="container">
        <h1>{t.nav.privacy}</h1>
        <p>Datenschutzerklärung</p>
      </div></div>
      <section className="section-sm"><div className="container">
        <div className="legal-content">
          {/* <div className="legal-placeholder">⚠️ This privacy policy provides a comprehensive structure. It must be reviewed and adapted by a qualified legal professional based on the actual tools and data processing activities used by ItsVenox before going live.</div> */}
          <h2>1. Controller</h2>
          <p>ItsVenox — Web Design & Development<br />Omar Alizzi<br />Email: hello@itsvenox.de</p>
          <h2>2. Overview of Data Processing</h2>
          <p>We process personal data in compliance with the GDPR, BDSG, and other applicable data protection regulations.</p>
          <h2>3. Hosting</h2>
          <p>This website is hosted by Strato. Server log files are processed on the basis of Art. 6(1)(f) GDPR.</p>
          <h2>4. Contact Inquiries</h2>
          <p>Data provided via contact forms is processed under Art. 6(1)(b) GDPR (pre-contractual measures) or Art. 6(1)(f) GDPR (legitimate interest).</p>
          <h2>5. Cookies and Consent Management</h2>
          <p>Essential cookies are processed under Art. 6(1)(f) GDPR. Non-essential cookies are only activated after explicit consent under Art. 6(1)(a) GDPR.</p>
          <h2>6. Your Rights as a Data Subject</h2>
          <ul>
            <li>Right of access (Art. 15 GDPR)</li>
            <li>Right to rectification (Art. 16 GDPR)</li>
            <li>Right to erasure (Art. 17 GDPR)</li>
            <li>Right to restriction of processing (Art. 18 GDPR)</li>
            <li>Right to data portability (Art. 20 GDPR)</li>
            <li>Right to object (Art. 21 GDPR)</li>
            <li>Right to withdraw consent (Art. 7(3) GDPR)</li>
          </ul>
          <p>Contact: hello@itsvenox.de</p>
          <h2>7. Right to Lodge a Complaint</h2>
          <p>You have the right to lodge a complaint with a supervisory authority.</p>
          {/* <div className="legal-placeholder">⚠️ Insert the appropriate state data protection authority based on the business's registered location.</div> */}
          <h2>8. Data Retention</h2>
          <p>Personal data is retained only as long as necessary for the stated purposes or as required by statutory retention obligations.</p>
          <h2>9. Changes to This Privacy Policy</h2>
          <p>This privacy policy may be updated from time to time. The current version is always available on this website.</p>
          <p style={{ marginTop: 40, fontStyle: 'italic', color: 'var(--text-muted)' }}>Last updated: 15 April 2026</p>
        </div>
      </div></section>
    </>
  );
}

// ─── 404 PAGE ───
export function NotFoundPage({ t, navigate }) {
  return (
    <div className="not-found">
      <div>
        <h1 className="gradient-text">{t.notFound.title}</h1>
        <h3>{t.notFound.heading}</h3>
        <p>{t.notFound.text}</p>
        <button className="btn btn-primary btn-lg" onClick={() => navigate('home')}>{t.notFound.btn} <Icons.Arrow /></button>
      </div>
    </div>
  );
}
