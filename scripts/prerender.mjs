/**
 * Post-build prerender — generates static HTML for each route.
 *
 * Uses @dr.pogodin/react-helmet (React 19 compatible).
 */

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from '@dr.pogodin/react-helmet';

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

  const { default: App } = await vite.ssrLoadModule('/App.jsx');
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
          React.createElement(App)
        )
      )
    );

    const { helmet } = helmetContext;
    const headTags = [
      helmet?.title?.toString() || '',
      helmet?.meta?.toString() || '',
      helmet?.link?.toString() || '',
      helmet?.script?.toString() || '',
    ].join('\n    ');

    const finalHtml = templateHtml
      .replace(/<title>.*?<\/title>/s, '')
      .replace('</head>', `    ${headTags}\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

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
