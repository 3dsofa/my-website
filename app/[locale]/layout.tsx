import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import type { Locale } from '@/lib/i18n';
import { locales } from '@/lib/site-metadata';
import { SiteAnalytics, YandexMetrikaFallback } from '@/components/site-analytics';
import '../globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://3dsofa.com'),
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon-32x32.png',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export default async function LocaleRootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: candidate } = await params;
  const locale: Locale = locales.includes(candidate as Locale) ? candidate as Locale : 'en';

  return (
    <html lang={locale}>
      <head>
        <SiteAnalytics />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <YandexMetrikaFallback />
        {children}
      </body>
    </html>
  );
}
