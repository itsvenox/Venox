import React from "react";
import { Icons } from "../components/Icons.jsx";

// ─── IMPRESSUM PAGE ───
export function ImpressumPage({ t }) {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Impressum</h1>
          <p>{t.nav.impressum}</p>
        </div>
      </div>
      <section className="section-sm">
        <div className="container">
          <div className="legal-content">
            <h2>Information According to § 5 TMG</h2>
            <h3>Business Name</h3>
            <p>ItsVenox — Web Design & Development</p>

            <h3>Legal Representative</h3>
            <p>Omar Alizzi</p>

            <h3>Address</h3>
            <p>
              [NO ADDRESS YET]
              <br />
              44141 Dortmund
              <br />
              Germany
            </p>

            <h3>Contact</h3>
            <p>
              Email: hello@itsvenox.de
              <br />
              Web: www.itsvenox.de
            </p>

            <h3>VAT Identification Number</h3>
            <p>
              VAT ID according to § 27a UStG: not applicable (Kleinunternehmer
              pursuant to § 19 UStG).
            </p>

            <h3>Commercial Register / Trade Register</h3>
            <p>
              This business is operated as a sole proprietorship
              (Einzelunternehmen) and is not entered in the commercial register.
            </p>

            <h3>Responsible for Content According to § 18 Abs. 2 MStV</h3>
            <p>
              Omar Alizzi
              <br />
              [NO ADDRESS YET]
              <br />
              44141 Dortmund
              <br />
              Germany
            </p>

            <h3>Professional Liability Insurance</h3>
            <p>
              Provider: [TO BE COMPLETED]
              <br />
              Scope of coverage: Germany / European Union
              <br />
              <em>
                This information will be added once a professional liability
                policy is in place. Until then, no representation is made
                regarding insured coverage.
              </em>
            </p>

            <h2>Online Dispute Resolution (ODR)</h2>
            <p>
              The European Commission provides a platform for online dispute
              resolution (ODR), available at:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://ec.europa.eu/consumers/odr
              </a>
              . Our email address can be found above in this Impressum.
            </p>
            <p>
              We are neither willing nor obligated to participate in dispute
              resolution proceedings before a consumer arbitration board
              (Verbraucherschlichtungsstelle) within the meaning of the
              Verbraucherstreitbeilegungsgesetz (VSBG).
            </p>

            <h2>Liability for Content</h2>
            <p>
              As a service provider, we are responsible for our own content on
              these pages in accordance with § 7 (1) TMG and general laws.
              However, pursuant to §§ 8 to 10 TMG, we are not obligated to
              monitor transmitted or stored third-party information, nor to
              investigate circumstances that indicate illegal activity.
            </p>
            <p>
              Obligations to remove or block the use of information under
              general laws remain unaffected. Liability in this regard is,
              however, only possible from the point in time at which a concrete
              legal violation becomes known. Upon becoming aware of any such
              legal violations, we will remove the content in question
              immediately.
            </p>

            <h2>Liability for Links</h2>
            <p>
              Our website contains links to external websites of third parties,
              over whose contents we have no influence. For this reason, we
              cannot accept any liability for these external contents. The
              respective provider or operator of the linked pages is always
              responsible for their content.
            </p>
            <p>
              The linked pages were checked for possible legal violations at the
              time of linking. Illegal contents were not recognisable at that
              point in time. A permanent control of the contents of the linked
              pages is, however, not reasonable without concrete evidence of a
              violation. Upon notification of legal violations, we will remove
              such links immediately.
            </p>

            <h2>Copyright</h2>
            <p>
              The content and works on these pages created by the site operator
              are subject to German copyright law. Duplication, processing,
              distribution, or any form of commercialisation of such material
              beyond the scope of copyright law requires the prior written
              consent of the respective author or creator.
            </p>
            <p>
              Downloads and copies of this site are only permitted for private,
              non-commercial use. Insofar as the content on this site was not
              created by the operator, the copyrights of third parties are
              respected. Should you nevertheless become aware of a copyright
              infringement, please notify us accordingly. Upon notification of
              violations, we will remove such content immediately.
            </p>

            <h2>Image Credits</h2>
            <p>
              Unless otherwise indicated, all images, illustrations, and
              graphics on this website were created by ItsVenox or licensed for
              use. Stock imagery, where used, is licensed under the respective
              platform's standard licence (e.g. Unsplash, Pexels). Specific
              attributions, where required, are listed alongside the relevant
              content.
            </p>

            <p
              style={{
                marginTop: 40,
                fontStyle: "italic",
                color: "var(--text-muted)",
              }}
            >
              Last updated: 22 April 2026
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── PRIVACY PAGE ───
export function PrivacyPage({ t }) {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>{t.nav.privacy}</h1>
          <p>Datenschutzerklärung</p>
        </div>
      </div>
      <section className="section-sm">
        <div className="container">
          <div className="legal-content">
            <h2>1. Controller</h2>
            <p>
              The controller responsible for data processing on this website
              within the meaning of the General Data Protection Regulation
              (GDPR) is:
            </p>
            <p>
              ItsVenox — Web Design & Development
              <br />
              Omar Alizzi
              <br />
              [NO ADDRESS YET]
              <br />
              44141 Dortmund, Germany
              <br />
              Email: hello@itsvenox.de
            </p>
            <p>
              We have not appointed a Data Protection Officer, as we are not
              legally required to do so under Art. 37 GDPR or § 38 BDSG.
            </p>

            <h2>2. General Information on Data Processing</h2>
            <p>
              We process personal data of our users only to the extent necessary
              to provide a functional website and our content and services. The
              processing of personal data takes place regularly only with the
              user's consent or where the processing is permitted by law.
            </p>
            <p>
              "Personal data" means any information relating to an identified or
              identifiable natural person (Art. 4 No. 1 GDPR). The legal bases
              for our processing activities are primarily Art. 6 (1)(a), (b),
              (c), and (f) GDPR, as set out in the relevant sections below.
            </p>

            <h2>3. Hosting and Content Delivery</h2>
            <h3>3.1 Website Hosting — Vercel</h3>
            <p>
              This website is hosted by Vercel Inc., 340 S Lemon Ave #4133,
              Walnut, CA 91789, USA ("Vercel"). When you visit this website,
              Vercel automatically collects and stores information in server log
              files, which your browser transmits to us. This includes:
            </p>
            <ul>
              <li>
                IP address (truncated/anonymised where technically feasible)
              </li>
              <li>Date and time of access</li>
              <li>Requested URL and HTTP status code</li>
              <li>Referring URL</li>
              <li>Browser type, version, and operating system</li>
              <li>Volume of data transferred</li>
            </ul>
            <p>
              Legal basis: Art. 6 (1)(f) GDPR. Our legitimate interest lies in
              the secure, stable, and efficient operation of this website. Log
              data is generally retained for a short period and then
              automatically deleted or anonymised.
            </p>
            <p>
              <strong>Data transfer to third countries:</strong> Vercel may
              process data in the United States. We rely on the EU-US Data
              Privacy Framework (DPF), to which Vercel is certified, as the
              legal basis for such transfers under Art. 45 GDPR. Where DPF
              certification does not apply, transfers are based on Standard
              Contractual Clauses (Art. 46 (2)(c) GDPR).
            </p>
            <p>
              For further information, see Vercel's privacy policy at:{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://vercel.com/legal/privacy-policy
              </a>
              .
            </p>

            <h3>3.2 Email Hosting — Strato</h3>
            <p>
              Email correspondence sent to our addresses (e.g.
              hello@itsvenox.de) is processed via the email infrastructure of
              Strato AG, Pascalstraße 10, 10587 Berlin, Germany. Strato
              processes the content and metadata of email communication on our
              behalf as a processor under Art. 28 GDPR.
            </p>
            <p>
              Strato's privacy policy:{" "}
              <a
                href="https://www.strato.de/datenschutz/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.strato.de/datenschutz/
              </a>
              .
            </p>

            <h2>4. SSL/TLS Encryption</h2>
            <p>
              For security reasons and to protect the transmission of
              confidential content, this site uses SSL/TLS encryption. You can
              recognise an encrypted connection by the "https://" prefix in your
              browser's address bar and the lock icon. When SSL/TLS encryption
              is active, the data you transmit to us cannot be read by third
              parties.
            </p>

            <h2>5. Contact Inquiries</h2>
            <p>
              If you contact us via email, the contact form, or WhatsApp, the
              personal data you provide (e.g. name, email address, phone number,
              message content) will be processed for the purpose of handling
              your inquiry and any follow-up communication.
            </p>
            <p>Legal basis:</p>
            <ul>
              <li>
                Art. 6 (1)(b) GDPR if your inquiry relates to the conclusion or
                performance of a contract;
              </li>
              <li>
                Art. 6 (1)(f) GDPR for our legitimate interest in responding to
                general inquiries.
              </li>
            </ul>
            <p>
              Your data will be deleted as soon as it is no longer required for
              the purpose of its collection, unless statutory retention
              obligations (e.g. under tax or commercial law) require longer
              storage. Inquiries that do not lead to a contract are typically
              deleted within six months, unless you object earlier.
            </p>

            <h2>6. Cookies and Consent Management</h2>
            <p>
              Our website uses cookies and similar technologies. Cookies are
              small text files stored in your browser that allow us to operate
              the site and analyse user behaviour where consented to.
            </p>
            <p>
              <strong>Essential cookies</strong> are required for the basic
              functioning of the website (e.g. storing your cookie preferences,
              session continuity). Their use is based on Art. 6 (1)(f) GDPR and
              § 25 (2) TTDSG, as they are strictly necessary to provide the
              service you have requested.
            </p>
            <p>
              <strong>Non-essential cookies</strong> (e.g. analytics, marketing)
              are only set after you have given explicit consent via our consent
              banner. The legal basis is Art. 6 (1)(a) GDPR and § 25 (1) TTDSG.
              You may withdraw your consent at any time via the "Cookie
              Settings" link in the footer, with effect for the future.
            </p>
            <p>
              At the time of this policy, no analytics, marketing, or
              third-party tracking cookies are active on this website. Should
              such tools be introduced in future, this policy will be updated
              and your consent will be requested before any data is processed.
            </p>

            <h2>7. Fonts</h2>
            <p>
              This website uses fonts that are loaded locally from our own
              server. No connection to external font providers (such as Google
              Fonts) is established when you visit our site, and no personal
              data (including your IP address) is transmitted to third-party
              font services.
            </p>

            <h2>8. Analytics and Tracking</h2>
            <p>
              We currently do not use any web analytics, tracking, or
              remarketing tools (such as Google Analytics, Meta Pixel, or
              similar). No usage profiles are created.
            </p>
            <p>
              If we introduce such tools in the future, we will (i) update this
              privacy policy with the relevant details (provider, processing
              purposes, legal basis, retention periods, third-country
              transfers), and (ii) where required, only activate them after
              obtaining your explicit consent under Art. 6 (1)(a) GDPR and § 25
              (1) TTDSG.
            </p>

            <h2>9. Social Media and External Links</h2>
            <p>
              Our website may contain links to external social media platforms
              or third-party websites. We have no influence over the data
              processing carried out by the operators of these external sites.
              Please refer to the respective privacy policies of those providers
              for information on how your data is handled.
            </p>

            <h2>10. Data Security</h2>
            <p>
              We employ appropriate technical and organisational measures (TOMs)
              under Art. 32 GDPR to protect your personal data against
              accidental or unlawful destruction, loss, alteration, unauthorised
              disclosure, or access. These measures are continuously reviewed
              and updated to reflect technological developments.
            </p>

            <h2>11. Data Retention</h2>
            <p>
              We store personal data only for as long as is necessary to fulfil
              the purposes for which it was collected, or for as long as
              required by statutory retention obligations (e.g. six or ten years
              under § 257 HGB and § 147 AO). Once the retention period expires,
              the relevant data is routinely deleted or anonymised.
            </p>

            <h2>12. Your Rights as a Data Subject</h2>
            <p>
              You have the following rights with regard to your personal data:
            </p>
            <ul>
              <li>
                <strong>Right of access (Art. 15 GDPR):</strong> to obtain
                confirmation as to whether we process your data and, if so, to
                receive a copy.
              </li>
              <li>
                <strong>Right to rectification (Art. 16 GDPR):</strong> to have
                inaccurate data corrected without undue delay.
              </li>
              <li>
                <strong>Right to erasure (Art. 17 GDPR):</strong> to have your
                data deleted where one of the grounds in Art. 17 (1) GDPR
                applies.
              </li>
              <li>
                <strong>
                  Right to restriction of processing (Art. 18 GDPR):
                </strong>{" "}
                to require the limitation of processing in certain cases.
              </li>
              <li>
                <strong>Right to data portability (Art. 20 GDPR):</strong> to
                receive your data in a structured, commonly used,
                machine-readable format.
              </li>
              <li>
                <strong>Right to object (Art. 21 GDPR):</strong> to object, on
                grounds relating to your particular situation, to processing
                based on Art. 6 (1)(e) or (f) GDPR.
              </li>
              <li>
                <strong>Right to withdraw consent (Art. 7 (3) GDPR):</strong> to
                withdraw consent at any time, without affecting the lawfulness
                of processing carried out before withdrawal.
              </li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at:
              hello@itsvenox.de. We will respond within the statutory time
              limits (typically one month under Art. 12 (3) GDPR).
            </p>

            <h2>13. Right to Lodge a Complaint with a Supervisory Authority</h2>
            <p>
              Without prejudice to any other administrative or judicial remedy,
              you have the right to lodge a complaint with a supervisory
              authority, in particular in the Member State of your habitual
              residence, place of work, or the place of the alleged infringement
              (Art. 77 GDPR).
            </p>
            <p>The supervisory authority responsible for our business is:</p>
            <p>
              Landesbeauftragte für Datenschutz und Informationsfreiheit
              Nordrhein-Westfalen (LDI NRW)
              <br />
              Kavalleriestraße 2–4
              <br />
              40213 Düsseldorf, Germany
              <br />
              Phone: +49 (0)211 38424-0
              <br />
              Email: poststelle@ldi.nrw.de
              <br />
              Web:{" "}
              <a
                href="https://www.ldi.nrw.de"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.ldi.nrw.de
              </a>
            </p>

            <h2>14. No Automated Decision-Making</h2>
            <p>
              We do not use automated decision-making, including profiling,
              within the meaning of Art. 22 GDPR.
            </p>

            <h2>15. Children and Minors</h2>
            <p>
              Our services are directed at businesses and adults. We do not
              knowingly collect personal data from individuals under the age of
              16. If we become aware that we have collected such data without
              verifiable parental consent, we will delete it promptly.
            </p>

            <h2>16. Obligation to Provide Data</h2>
            <p>
              You are not under a contractual or statutory obligation to provide
              personal data. However, certain data (e.g. contact details) may be
              required to enter into a contract or to respond to inquiries.
              Without this data, we may be unable to process your request or
              perform a contract.
            </p>

            <h2>17. Changes to This Privacy Policy</h2>
            <p>
              We reserve the right to update this privacy policy to reflect
              changes in our processing activities or legal requirements. The
              current version is always available on this website. We recommend
              reviewing this policy periodically.
            </p>

            <p
              style={{
                marginTop: 40,
                fontStyle: "italic",
                color: "var(--text-muted)",
              }}
            >
              Last updated: 22 April 2026
            </p>
          </div>
        </div>
      </section>
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
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate("home")}
        >
          {t.notFound.btn} <Icons.Arrow />
        </button>
      </div>
    </div>
  );
}
