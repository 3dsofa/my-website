import { copyFile, mkdir, readFile } from 'node:fs/promises';
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

console.log('GitHub Pages bundle prepared: /en/, /ru/, /de/, /fr/');
