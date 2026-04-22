import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = resolve(__dirname, '..');
const distDir = resolve(root, 'dist');

const ROUTES = [
  '/',
  '/services',
  '/portfolio',
  '/about',
  '/process',
  '/pricing',
  '/faq',
  '/contact',
  '/impressum',
  '/privacy',
];

async function prerender() {
  console.log('\n🏗  Prerendering routes…\n');

  const vite = await createServer({
    root: resolve(root, 'src'),
    server: { middlewareMode: true },
    appType: 'custom',
  });

  // Load AppShell (router-less, helmet-less) and HelmetProvider through Vite's SSR module graph.
  // Loading HelmetProvider via ssrLoadModule guarantees we get the same module instance React sees
  // when AppShell's children call useHelmet, so context propagation is correct.
  const { AppShell } = await vite.ssrLoadModule('/App.jsx');
  const { HelmetProvider } = await vite.ssrLoadModule('@dr.pogodin/react-helmet');

  const templateHtml = readFileSync(resolve(distDir, 'index.html'), 'utf-8');

  for (const route of ROUTES) {
    const helmetContext = {};

    const appHtml = renderToString(
      React.createElement(
        HelmetProvider,
        { context: helmetContext },
        React.createElement(
          StaticRouter,
          { location: route },
          React.createElement(AppShell)
        )
      )
    );

    const { helmet } = helmetContext;
    const headTags = helmet
      ? [
          helmet.title?.toString() || '',
          helmet.meta?.toString() || '',
          helmet.link?.toString() || '',
          helmet.script?.toString() || '',
        ].filter(Boolean).join('\n    ')
      : '';

    let finalHtml = templateHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );

    if (headTags) {
      finalHtml = finalHtml
        .replace(/<title>.*?<\/title>/s, '')
        .replace('</head>', `    ${headTags}\n  </head>`);
    }

    const outPath =
      route === '/'
        ? resolve(distDir, 'index.html')
        : resolve(distDir, route.slice(1), 'index.html');

    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, finalHtml);

    console.log(`  ✓ ${route.padEnd(15)} → ${outPath.replace(root, '')}`);
  }

  await vite.close();
  console.log(`\n✅ Prerendered ${ROUTES.length} routes\n`);
}

prerender().catch((err) => {
  console.error('❌ Prerender failed:', err);
  process.exit(1);
});
