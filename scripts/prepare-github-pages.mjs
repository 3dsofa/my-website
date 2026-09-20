import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const outputDirectory = join(process.cwd(), 'dist', 'client');
const locales = ['en', 'ru', 'de', 'fr'];

for (const locale of locales) {
  const source = join(outputDirectory, `${locale}.html`);
  const targetDirectory = join(outputDirectory, locale);
  const target = join(targetDirectory, 'index.html');
  await mkdir(targetDirectory, { recursive: true });
  await copyFile(source, target);

  const html = await readFile(target, 'utf8');
  const expectedLanguage = `<html lang="${locale}"`;
  const expectedCanonical = `https://3dsofa.com/${locale}/`;
  if (!html.includes(expectedLanguage) || !html.includes(expectedCanonical)) {
    throw new Error(`Static locale verification failed for ${locale}`);
  }
}

function legacyRedirectHtml(target, language = 'en') {
  const escapedTarget = JSON.stringify(target);

  return `<!doctype html>
<html lang="${language}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex,follow">
    <meta http-equiv="refresh" content="0; url=${target}">
    <link rel="canonical" href="https://3dsofa.com${target}">
    <title>3Dsofa</title>
    <script>window.location.replace(${escapedTarget} + window.location.search + window.location.hash);</script>
  </head>
  <body>
    <p>This page has moved to <a href="${target}">${target}</a>.</p>
  </body>
</html>
`;
}

const legacyRoutes = [
  ['home', '/en/', 'en'],
  ...locales.map((locale) => [`${locale}/home`, `/${locale}/`, locale]),
  ['it', '/en/', 'it'],
  ['it/home', '/en/', 'it'],
];

for (const [route, target, language] of legacyRoutes) {
  const redirectDirectory = join(outputDirectory, route);
  const redirectFile = join(redirectDirectory, 'index.html');
  await mkdir(redirectDirectory, { recursive: true });
  await writeFile(redirectFile, legacyRedirectHtml(target, language), 'utf8');

  const html = await readFile(redirectFile, 'utf8');
  if (!html.includes(`url=${target}`) || !html.includes(`https://3dsofa.com${target}`)) {
    throw new Error(`Legacy redirect verification failed for /${route}/`);
  }
}

for (const requiredFile of [
  'index.html',
  '404.html',
  'robots.txt',
  'sitemap.xml',
  'CNAME',
  '.nojekyll',
  'BingSiteAuth.xml',
  'yandex_ed85c2caf6494ec3.html',
  'unsubscribe.html',
  'favicon.png',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'apple-touch-icon.png',
]) {
  await readFile(join(outputDirectory, requiredFile));
}

console.log('GitHub Pages bundle prepared: /en/, /ru/, /de/, /fr/ with legacy /home/ redirects');
