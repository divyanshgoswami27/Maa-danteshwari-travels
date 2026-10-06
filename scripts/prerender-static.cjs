/**
 * scripts/prerender-static.cjs
 *
 * Build-time static HTML generator for Maa Danteshwari Tour & Travels.
 * Runs AFTER `vite build`. No puppeteer/Chrome needed — works on Vercel.
 *
 * For each route it:
 *  1. Reads dist/index.html (the shell built by Vite)
 *  2. Injects route-specific <title>, <meta>, <link rel="canonical">, og tags
 *  3. Writes to dist/travel/<city>/index.html
 *
 * Result: social crawlers (WhatsApp, Facebook) AND Googlebot both see
 * the correct metadata in the INITIAL HTML without requiring JS execution.
 */

const fs   = require('fs');
const path = require('path');

const BASE_URL = 'https://maadanteshwaritours.com';

const ROUTES = [
  {
    path:     '/',
    outFile:  'dist/index.html',
    title:    'Maa Danteshwari Tour & Travels | Car Rental, Bus & Transport in Chhattisgarh',
    desc:     'Enquire for car rental, bus service, transport, ambulance, tours and equipment across Chhattisgarh. Based in Tilda Newra, serving Raipur, Bilaspur, Durg, Bhilai and beyond since 2009.',
    canonical: BASE_URL + '/',
    ogImage:  BASE_URL + '/images/og-image.png',
  },
  {
    path:     '/travel/tilda-newra',
    outFile:  'dist/travel/tilda-newra/index.html',
    title:    'Car Rental & Travel Services in Tilda Newra, Chhattisgarh | Maa Danteshwari',
    desc:     'Looking for a vehicle from Tilda Newra? Enquire with Maa Danteshwari Tour & Travels — our home base. Car, bus, transport and ambulance services across Chhattisgarh.',
    canonical: BASE_URL + '/travel/tilda-newra',
    ogImage:  BASE_URL + '/images/og-image.png',
  },
  {
    path:     '/travel/raipur',
    outFile:  'dist/travel/raipur/index.html',
    title:    'Car Rental & Travel Services in Raipur, Chhattisgarh | Maa Danteshwari',
    desc:     'Looking for a vehicle from Raipur? Enquire with Maa Danteshwari Tour & Travels for car, bus and transport services across Chhattisgarh. Call or WhatsApp.',
    canonical: BASE_URL + '/travel/raipur',
    ogImage:  BASE_URL + '/images/og-image.png',
  },
  {
    path:     '/travel/bilaspur',
    outFile:  'dist/travel/bilaspur/index.html',
    title:    'Car Rental & Travel Services in Bilaspur, Chhattisgarh | Maa Danteshwari',
    desc:     'Looking for a vehicle from Bilaspur? Enquire with Maa Danteshwari Tour & Travels for car, bus and transport services across Chhattisgarh. Call or WhatsApp.',
    canonical: BASE_URL + '/travel/bilaspur',
    ogImage:  BASE_URL + '/images/og-image.png',
  },
  {
    path:     '/travel/durg',
    outFile:  'dist/travel/durg/index.html',
    title:    'Car Rental & Travel Services in Durg, Chhattisgarh | Maa Danteshwari',
    desc:     'Looking for a vehicle from Durg? Enquire with Maa Danteshwari Tour & Travels for car, bus and transport services across Chhattisgarh. Call or WhatsApp.',
    canonical: BASE_URL + '/travel/durg',
    ogImage:  BASE_URL + '/images/og-image.png',
  },
  {
    path:     '/travel/bhilai',
    outFile:  'dist/travel/bhilai/index.html',
    title:    'Car Rental & Travel Services in Bhilai, Chhattisgarh | Maa Danteshwari',
    desc:     'Looking for a vehicle from Bhilai? Enquire with Maa Danteshwari Tour & Travels for car, bus and transport services across Chhattisgarh. Call or WhatsApp.',
    canonical: BASE_URL + '/travel/bhilai',
    ogImage:  BASE_URL + '/images/og-image.png',
  },
];

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function injectMeta(html, route) {
  const tags = `
    <title>${esc(route.title)}</title>
    <meta name="description" content="${esc(route.desc)}">
    <link rel="canonical" href="${esc(route.canonical)}">
    <meta property="og:title" content="${esc(route.title)}">
    <meta property="og:description" content="${esc(route.desc)}">
    <meta property="og:url" content="${esc(route.canonical)}">
    <meta property="og:type" content="website">
    <meta property="og:image" content="${esc(route.ogImage)}">
    <meta property="og:image:width" content="1024">
    <meta property="og:image:height" content="1024">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(route.title)}">
    <meta name="twitter:description" content="${esc(route.desc)}">
    <meta name="twitter:image" content="${esc(route.ogImage)}">`;

  // Remove any existing title/meta description/canonical so we don't duplicate
  let out = html
    .replace(/<title>[^<]*<\/title>/gi, '')
    .replace(/<meta name="description"[^>]*>/gi, '')
    .replace(/<link rel="canonical"[^>]*>/gi, '')
    .replace(/<meta property="og:[^>]*>/gi, '')
    .replace(/<meta name="twitter:[^>]*>/gi, '');

  // Inject right before </head>
  out = out.replace('</head>', tags + '\n  </head>');
  return out;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const shellPath = path.join(process.cwd(), 'dist', 'index.html');

if (!fs.existsSync(shellPath)) {
  console.error('ERROR: dist/index.html not found. Run npm run build first.');
  process.exit(1);
}

const shell = fs.readFileSync(shellPath, 'utf8');

for (const route of ROUTES) {
  const html    = injectMeta(shell, route);
  const outPath = path.join(process.cwd(), route.outFile);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(`[prerender] ✓ ${route.canonical}`);
}

console.log('[prerender] Done! All routes prerendered.');
