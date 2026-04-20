/**
 * Per-page SEO data for all routes, in both languages.
 * Titles should be 50-60 characters, descriptions 140-160.
 * Keep primary keyword near the start of the title.
 */

const SITE_URL = 'https://itsvenox.de';

// ─── Reusable organisation schema — used on every page ──────────────────
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#organization`,
  name: 'Venox',
  alternateName: 'ItsVenox',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og-default.png`,
  description:
    'Modern web design and development agency building clean, high-converting websites for businesses.',
  priceRange: '€€',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Metzingen',
    addressRegion: 'Baden-Württemberg',
    addressCountry: 'DE',
    // Add full street + postal code here once you finalise the Impressum
  },
  areaServed: [
    { '@type': 'Country', name: 'Germany' },
    { '@type': 'Country', name: 'Austria' },
    { '@type': 'Country', name: 'Switzerland' },
    { '@type': 'Place', name: 'Europe' },
  ],
  serviceType: [
    'Web Design',
    'Web Development',
    'Landing Page Design',
    'Website Redesign',
    'SEO',
    'Website Maintenance',
  ],
  sameAs: [
    // Fill these in once you have them — hugely helpful for Google's Knowledge Graph
    // 'https://www.linkedin.com/company/venox',
    // 'https://www.instagram.com/itsvenox',
    // 'https://www.facebook.com/itsvenox',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'hello@itsvenox.de', // replace with real one
    availableLanguage: ['English', 'German'],
  },
};

// ─── Breadcrumb helper ──────────────────────────────────────────────────
export function breadcrumb(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

// ─── Service schema helper ──────────────────────────────────────────────
export function serviceSchema(name, description, lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    provider: { '@id': `${SITE_URL}/#organization` },
    serviceType: name,
    name,
    description,
    areaServed: { '@type': 'Country', name: 'Germany' },
    inLanguage: lang,
  };
}

// ─── FAQ schema helper ──────────────────────────────────────────────────
export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

// ─── Per-page metadata ──────────────────────────────────────────────────
// Each key is a route; each route has `en` and `de` variants.
export const pageMeta = {
  home: {
    en: {
      title: 'Modern Web Design & Development Agency',
      description:
        'Venox builds clean, high-converting websites for small businesses, startups, and service providers. Modern design, fast delivery, real results.',
    },
    de: {
      title: 'Webdesign-Agentur für moderne Unternehmenswebsites',
      description:
        'Venox gestaltet und entwickelt professionelle, konversionsstarke Websites für kleine Unternehmen und Startups. Modernes Design, schnelle Lieferung.',
    },
  },
  services: {
    en: {
      title: 'Web Design Services — Websites, Landing Pages, SEO',
      description:
        'Custom business websites, landing pages, redesigns, mobile optimisation, SEO foundations, and maintenance. Everything your business needs online.',
    },
    de: {
      title: 'Webdesign Leistungen — Websites, Landing Pages, SEO',
      description:
        'Maßgeschneiderte Business-Websites, Landing Pages, Redesigns, Mobile-Optimierung, SEO-Grundlagen und Wartung. Alles für Ihren Online-Auftritt.',
    },
  },
  portfolio: {
    en: {
      title: 'Portfolio — Recent Web Design Projects',
      description:
        'See recent websites and landing pages designed and built by Venox for businesses across industries. Modern, conversion-focused work.',
    },
    de: {
      title: 'Portfolio — Aktuelle Webdesign-Projekte',
      description:
        'Entdecken Sie aktuelle Websites und Landing Pages von Venox für Unternehmen unterschiedlichster Branchen. Modern, konversionsorientiert.',
    },
  },
  about: {
    en: {
      title: 'About Venox — Web Design Agency from Germany',
      description:
        'Learn how Venox helps businesses look serious online through modern web design, clear communication, and results-driven work.',
    },
    de: {
      title: 'Über Venox — Webdesign-Agentur aus Deutschland',
      description:
        'Erfahren Sie, wie Venox Unternehmen zu einem professionellen Online-Auftritt verhilft — mit modernem Webdesign und klarer Kommunikation.',
    },
  },
  process: {
    en: {
      title: 'Our Process — How We Build Your Website',
      description:
        'A clear 7-step process from discovery to launch and ongoing support. Structured, transparent, and designed to deliver results.',
    },
    de: {
      title: 'Unser Ablauf — So entsteht Ihre Website',
      description:
        'Ein klarer 7-stufiger Prozess vom Kennenlernen bis Launch und laufendem Support. Strukturiert, transparent, ergebnisorientiert.',
    },
  },
  pricing: {
    en: {
      title: 'Web Design Pricing — Clear, Honest Packages',
      description:
        'Transparent web design pricing for businesses. Starter, Business, and custom packages. No hidden fees, no surprises.',
    },
    de: {
      title: 'Webdesign Preise — Klare, ehrliche Pakete',
      description:
        'Transparente Webdesign-Preise für Unternehmen. Starter-, Business- und individuelle Pakete. Keine versteckten Kosten.',
    },
  },
  faq: {
    en: {
      title: 'FAQ — Common Questions About Our Web Design Services',
      description:
        'Answers to common questions about pricing, timelines, process, maintenance, SEO, and working with Venox.',
    },
    de: {
      title: 'FAQ — Häufige Fragen zu unseren Webdesign-Leistungen',
      description:
        'Antworten auf häufige Fragen zu Preisen, Ablauf, Wartung, SEO und der Zusammenarbeit mit Venox.',
    },
  },
  contact: {
    en: {
      title: 'Contact Venox — Get a Web Design Quote',
      description:
        'Tell us about your project and get a quote within 24 hours. Serving businesses in Germany, Austria, Switzerland and across Europe.',
    },
    de: {
      title: 'Kontakt Venox — Webdesign-Angebot anfragen',
      description:
        'Erzählen Sie uns von Ihrem Projekt — wir melden uns innerhalb von 24 Stunden. Für Unternehmen in Deutschland, Österreich und der Schweiz.',
    },
  },
  impressum: {
    en: {
      title: 'Legal Notice (Impressum)',
      description: 'Legal information and imprint for Venox as required by German law.',
    },
    de: {
      title: 'Impressum',
      description: 'Rechtliche Angaben und Impressum von Venox gemäß § 5 TMG.',
    },
  },
  privacy: {
    en: {
      title: 'Privacy Policy',
      description: 'How Venox collects, uses, and protects personal data in line with the GDPR.',
    },
    de: {
      title: 'Datenschutzerklärung',
      description: 'Wie Venox personenbezogene Daten gemäß DSGVO erhebt, verwendet und schützt.',
    },
  },
  notFound: {
    en: {
      title: 'Page Not Found (404)',
      description: 'The page you are looking for could not be found.',
    },
    de: {
      title: 'Seite nicht gefunden (404)',
      description: 'Die gesuchte Seite konnte nicht gefunden werden.',
    },
  },
};

export { SITE_URL };
