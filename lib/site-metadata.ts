import type { Locale } from '@/lib/i18n';

export const siteUrl = 'https://3dsofa.com';
export const locales: Locale[] = ['en', 'ru', 'de', 'fr'];

export const localeMetadata: Record<Locale, { title: string; description: string; ogLocale: string }> = {
  en: {
    title: 'Architectural & Product 3D Visualization | 3Dsofa',
    description: '3Dsofa creates architectural and interior visualizations, product CGI, technical animation, cinematic work and catalogue design.',
    ogLocale: 'en_GB',
  },
  ru: {
    title: 'Архитектурная и продуктовая 3D-визуализация | 3Dsofa',
    description: '3Dsofa создаёт архитектурные и интерьерные визуализации, CGI продуктов, техническую анимацию, кино и дизайн каталогов.',
    ogLocale: 'ru_RU',
  },
  de: {
    title: 'Architektur- & Produktvisualisierung | 3Dsofa',
    description: '3Dsofa erstellt Architektur- und Interieurvisualisierungen, Produkt-CGI, technische Animationen, Film und Katalogdesign.',
    ogLocale: 'de_DE',
  },
  fr: {
    title: 'Visualisation 3D architecturale & produit | 3Dsofa',
    description: '3Dsofa crée des visualisations architecturales et intérieures, des CGI produits, des animations techniques, des films et des catalogues.',
    ogLocale: 'fr_FR',
  },
};

export const languageAlternates = {
  en: '/en/',
  ru: '/ru/',
  de: '/de/',
  fr: '/fr/',
  'x-default': '/en/',
};
