import React from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';

/**
 * SEO component — injects per-page meta, canonical, hreflang, Open Graph,
 * Twitter Card, and optional JSON-LD structured data.
 *
 * Uses @dr.pogodin/react-helmet (React 19 compatible, actively maintained fork
 * of react-helmet-async). Same API as react-helmet-async, just a different
 * import path.
 *
 * Usage:
 *   <SEO
 *     lang="en"
 *     path="/services"
 *     title="Web Design Services"
 *     description="..."
 *     jsonLd={[serviceSchema, breadcrumbSchema]}
 *   />
 */

const SITE_URL = 'https://itsvenox.de';
const SITE_NAME = 'Venox';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`; // 1200x630 — create one & drop in /public

export default function SEO({
  lang = 'en',
  path = '/',
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  noindex = false,
  jsonLd = [],
}) {
  const canonical = `${SITE_URL}${path === '/' ? '' : path}`;
  const alternateEn = `${SITE_URL}${path === '/' ? '' : path}`;
  const alternateDe = `${SITE_URL}${path === '/' ? '' : path}`;
  // Note: both languages share the same URL (client-side language switcher).
  // If you later split by URL (/en/, /de/), update alternates here.

  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const ogLocale = lang === 'de' ? 'de_DE' : 'en_US';
  const ogLocaleAlternate = lang === 'de' ? 'en_US' : 'de_DE';

  return (
    <Helmet prioritizeSeoTags>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {noindex
        ? <meta name="robots" content="noindex, nofollow" />
        : <meta name="robots" content="index, follow, max-image-preview:large" />}

      {/* hreflang — tell Google which language version to serve */}
      <link rel="alternate" hrefLang="en" href={alternateEn} />
      <link rel="alternate" hrefLang="de" href={alternateDe} />
      <link rel="alternate" hrefLang="x-default" href={alternateEn} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={ogLocaleAlternate} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD structured data */}
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
