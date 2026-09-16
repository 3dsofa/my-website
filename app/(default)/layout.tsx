import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { I18nProvider } from '@/lib/i18n';
import { languageAlternates, localeMetadata } from '@/lib/site-metadata';
import { SiteAnalytics, YandexMetrikaFallback } from '@/components/site-analytics';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://3dsofa.com'),
  title: localeMetadata.en.title,
  description: localeMetadata.en.description,
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon-32x32.png',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  alternates: { canonical: '/en/', languages: languageAlternates },
  robots: { index: true, follow: true },
  openGraph: {
    title: localeMetadata.en.title,
    description: localeMetadata.en.description,
    url: '/en/',
    siteName: '3Dsofa',
    type: 'website',
    locale: 'en_GB',
    images: [{ url: '/email-assets/hero.jpg', width: 1200, height: 676, alt: '3Dsofa architectural and product visualization studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: localeMetadata.en.title,
    description: localeMetadata.en.description,
    images: ['/email-assets/hero.jpg'],
  },
};

export default function DefaultRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <SiteAnalytics />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <YandexMetrikaFallback />
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
