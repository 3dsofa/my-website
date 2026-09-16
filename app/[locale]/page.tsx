import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Home from '@/components/home-page';
import { I18nProvider, type Locale } from '@/lib/i18n';
import { languageAlternates, localeMetadata, locales } from '@/lib/site-metadata';

type LocalePageProps = { params: Promise<{ locale: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale: candidate } = await params;
  if (!locales.includes(candidate as Locale)) return {};
  const locale = candidate as Locale;
  const content = localeMetadata[locale];

  return {
    title: content.title,
    description: content.description,
    alternates: { canonical: `/${locale}/`, languages: languageAlternates },
    openGraph: {
      title: content.title,
      description: content.description,
      url: `/${locale}/`,
      siteName: '3Dsofa',
      type: 'website',
      locale: content.ogLocale,
      images: [{ url: '/email-assets/hero.jpg', width: 1200, height: 676, alt: content.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.description,
      images: ['/email-assets/hero.jpg'],
    },
  };
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale: candidate } = await params;
  if (!locales.includes(candidate as Locale)) notFound();
  const locale = candidate as Locale;

  return (
    <I18nProvider initialLocale={locale}>
      <Home />
    </I18nProvider>
  );
}
