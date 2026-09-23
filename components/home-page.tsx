'use client';

import type { SyntheticEvent } from 'react';

import { CinemaGallery, ImageGallery, VideoGallery } from '@/components/portfolio-galleries';
import { CatalogStories } from '@/components/catalog-stories';
import { SiteHeader } from '@/components/site-header';
import { useI18n } from '@/lib/i18n';
import { localeMetadata, siteUrl } from '@/lib/site-metadata';

const services = [
  ['01', 'Architectural & interior visualization', 'Photorealistic spaces, atmosphere, materials and light for architecture and interior concepts.'],
  ['02', 'Furniture & product CGI', 'Models and final imagery for furniture, fittings, products, catalogues and online marketplaces.'],
  ['03', 'Technical animation', 'Clear motion studies that reveal construction, operation and the functionality of a system.'],
  ['04', 'Cinema & animation production', 'Animated films, narrative cinema and music videos — made to order from your script or ours.'],
  ['05', 'Catalogue design', 'Print catalogues and digital editorial experiences — structured, visualized and built from cover to final page.'],
];

type LeadAction = 'email' | 'form' | 'phone' | 'whatsapp' | 'telegram' | 'teams';

function trackLeadAction(action: LeadAction) {
  const eventName = action === 'form' ? 'contact_form_submit' : `contact_${action}_click`;
  const analyticsWindow = window as typeof window & {
    gtag?: (...args: unknown[]) => void;
    ym?: (...args: unknown[]) => void;
  };

  analyticsWindow.gtag?.('event', eventName, { event_category: 'lead', contact_method: action });
  analyticsWindow.ym?.(36687435, 'reachGoal', eventName, { contact_method: action });
}

export default function HomePage() {
  const { locale, t } = useI18n();
  const pageUrl = `${siteUrl}/${locale}/`;

  function handleProjectInquiry(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (name: string) => {
      const value = data.get(name);
      return typeof value === 'string' && value.trim() ? value.trim() : '—';
    };
    const lines = [
      `${t('Name')}: ${field('name')}`,
      `${t('Work email')}: ${field('email')}`,
      `${t('Company')}: ${field('company')}`,
      `${t('Project brief')}: ${field('brief')}`,
      `${t('Budget / deadline')}: ${field('budget')}`,
    ];

    trackLeadAction('form');
    window.location.href = `mailto:3dsofa@gmail.com?subject=${encodeURIComponent('Project inquiry from 3dsofa.com')}&body=${encodeURIComponent(lines.join('\n\n'))}`;
  }
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: pageUrl,
        name: '3Dsofa',
        inLanguage: locale,
        publisher: { '@id': `${siteUrl}/#studio` },
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${siteUrl}/#studio`,
        name: '3Dsofa',
        url: pageUrl,
        description: localeMetadata[locale].description,
        email: '3dsofa@gmail.com',
        telephone: '+79888887566',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: t('3D visualization services'),
          itemListElement: services.map(([, name]) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: t(name) },
          })),
        },
      },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteHeader />

      <section className="hero" id="top">
        <video className="hero-media" src="/media/videos/3dsofa-hero.mp4" autoPlay muted loop playsInline preload="metadata" poster="/media/images/armchair-007-1.jpg" aria-hidden="true" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">{t('3D visualization studio')}</p>
          <h1>{t('Architecture, interiors and products — made visible.')}</h1>
          <p className="hero-intro">{t('Photorealistic imagery, technical animation and cinematic production.')}</p>
          <a className="text-link" href="#images">{t('View selected work')} <span>↓</span></a>
        </div>
      </section>

      <section className="portfolio-section" id="images">
        <div className="section-heading portfolio-heading">
          <p className="eyebrow">{t('Selected work')}</p>
          <div className="portfolio-title-block">
            <h2>{t('Still imagery.')}</h2>
            <p className="portfolio-cycle" aria-hidden="true">
              <span>{t('We make')}</span>
              <span className="portfolio-words">
                <span className="portfolio-word-track">
                  <span>{t('interiors')}</span>
                  <span>{t('furniture')}</span>
                  <span>{t('products')}</span>
                </span>
              </span>
              <span>{t('visible.')}</span>
            </p>
            <p className="sr-only">{t('We make interiors, furniture and products visible.')}</p>
            <p className="portfolio-intro">{t('Interior and furniture design, precise 3D modeling and photorealistic visualization — from first concept to final image.')}</p>
          </div>
        </div>
        <ImageGallery />
      </section>

      <section className="motion-section" id="motion">
        <div className="motion-heading">
          <p className="eyebrow">{t('Motion')}</p>
          <div className="motion-title-block">
            <h2>{t('Technical animation.')}</h2>
            <p className="motion-cycle">
              <span>{t('We animate')}</span>
              <span className="motion-words" aria-hidden="true">
                <span className="motion-word-track">
                  <span>{t('systems.')}</span>
                  <span>{t('mechanisms.')}</span>
                  <span>{t('assemblies.')}</span>
                  <span>{t('installations.')}</span>
                </span>
              </span>
              <span className="sr-only">{t('systems, mechanisms, assemblies and installations.')}</span>
            </p>
            <p className="motion-intro">{t('Furniture configurations, assembly logic and installation sequences — visualized clearly from every angle.')}</p>
          </div>
        </div>
        <VideoGallery />
      </section>

      <section className="cinema-section" id="cinema">
        <div className="section-heading cinema-heading">
          <p className="eyebrow">{t('Film')}</p>
          <div className="cinema-title-block">
            <h2>{t('Cinema.')}</h2>
            <p className="cinema-cycle">
              <span>{t('We create')}</span>
              <span className="cinema-words" aria-hidden="true">
                <span className="cinema-word-track">
                  <span>{t('films.')}</span>
                  <span>{t('animation.')}</span>
                  <span>{t('music videos.')}</span>
                </span>
              </span>
              <span className="sr-only">{t('films, animation and music videos.')}</span>
            </p>
            <p className="cinema-intro">{t('Made to order from your script or ours — from original concept to final cut.')}</p>
          </div>
        </div>
        <CinemaGallery />
      </section>

      <section className="catalogues-section" id="catalogues">
        <div className="section-heading catalogues-heading">
          <p className="eyebrow">{t('Editorial')}</p>
          <div className="catalogues-title-block">
            <h2>{t('Catalogues.')}</h2>
            <p className="catalogues-cycle">
              <span>{t('We design catalogues that')}</span>
              <span className="catalogues-words" aria-hidden="true">
                <span className="catalogues-word-track">
                  <span>{t('organise.')}</span>
                  <span>{t('explain.')}</span>
                  <span>{t('sell.')}</span>
                </span>
              </span>
              <span className="sr-only">{t('organise, explain and sell.')}</span>
            </p>
            <p className="catalogues-intro">{t('Product catalogues and digital editorial experiences — designed, visualized and built from cover to final page.')}</p>
          </div>
        </div>
        <CatalogStories />
      </section>

      <section className="services-section" id="services">
        <div className="services-intro">
          <p className="eyebrow">{t('Capabilities')}</p>
          <h2>{t('From model to final frame.')}</h2>
        </div>
        <div className="services-list">
          {services.map(([number, title, description]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{t(title)}</h3>
              <p>{t(description)}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="contact-section" id="contact">
        <video src="/media/videos/3dsofa-contact.mp4" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
        <div className="contact-shade" />
        <div className="contact-main">
          <p className="eyebrow">{t('Start a project')}</p>
          <h2>{t('Tell us what you need.')}</h2>
          <p className="contact-intro">{t('Share a few details. We reply within one business day.')}</p>
          <div className="contact-direct">
            <a data-lead-action="email" href="mailto:3dsofa@gmail.com?subject=Project%20inquiry%20from%203dsofa.com" onClick={() => trackLeadAction('email')}>
              3dsofa@gmail.com <span>↗</span>
            </a>
            <a data-lead-action="phone" href="tel:+79888887566" onClick={() => trackLeadAction('phone')}>+7 988 888-75-66</a>
          </div>
          <div className="contact-socials">
            <a data-lead-action="whatsapp" href="https://wa.me/79888887566" onClick={() => trackLeadAction('whatsapp')}>WhatsApp ↗</a>
            <a data-lead-action="telegram" href="https://t.me/+79888887566" onClick={() => trackLeadAction('telegram')}>Telegram ↗</a>
            <a data-lead-action="teams" href="https://teams.microsoft.com/l/chat/0/0?users=al.chechin@gmail.com" onClick={() => trackLeadAction('teams')}>Microsoft Teams ↗</a>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleProjectInquiry}>
          <div className="contact-form-row">
            <label><span>{t('Name')}</span><input name="name" type="text" autoComplete="name" required placeholder={t('Your name')} /></label>
            <label><span>{t('Work email')}</span><input name="email" type="email" autoComplete="email" required placeholder="name@company.com" /></label>
          </div>
          <label><span>{t('Company')}</span><input name="company" type="text" autoComplete="organization" placeholder={t('Company name (optional)')} /></label>
          <label><span>{t('Project brief')}</span><textarea name="brief" rows={4} required placeholder={t('What would you like us to create?')} /></label>
          <label><span>{t('Budget / deadline')}</span><input name="budget" type="text" placeholder={t('Optional')} /></label>
          <button type="submit">{t('Send project brief')} <span>↗</span></button>
          <p>{t('Submitting opens your email app with the project details ready to send.')}</p>
        </form>
        <p className="copyright">© 3Dsofa · Archi &amp; Design</p>
      </footer>
    </main>
  );
}
