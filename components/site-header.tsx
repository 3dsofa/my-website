'use client';

import { useEffect, useRef, useState } from 'react';
import { localeLabels, useI18n, type Locale } from '@/lib/i18n';

const links = [
  ['#images', 'Work'],
  ['#motion', 'Motion'],
  ['#cinema', 'Cinema'],
  ['#catalogues', 'Catalogues'],
  ['#services', 'Services'],
  ['#contact', 'Contact'],
] as const;

export function SiteHeader() {
  const { locale, setLocale, t } = useI18n();
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const lastScrollTop = useRef(0);
  const frame = useRef<number | null>(null);
  const toggleButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateActiveSection = () => {
      const marker = window.innerHeight * 0.34;
      const current = links.findLast(([href]) => {
        const section = document.querySelector<HTMLElement>(href);
        if (!section) return false;
        const bounds = section.getBoundingClientRect();
        return bounds.top <= marker && bounds.bottom > marker;
      });
      setActiveSection(current?.[0] ?? '');
    };

    const onScroll = () => {
      if (frame.current !== null) return;
      frame.current = window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop.current && scrollTop > 60) {
          setHidden(true);
          setMenuOpen(false);
        } else if (scrollTop < lastScrollTop.current) {
          setHidden(false);
        }
        lastScrollTop.current = Math.max(0, scrollTop);
        updateActiveSection();
        frame.current = null;
      });
    };
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen((open) => {
          if (open) toggleButton.current?.focus();
          return false;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeyDown);
    updateActiveSection();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKeyDown);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  const followLink = () => {
    setHidden(false);
    setMenuOpen(false);
  };

  return (
    <>
      <header className={`site-header${hidden ? ' is-hidden' : ''}`}>
        <a className="brand" href="#top" aria-label="3Dsofa — home" onClick={followLink}>
          <span>3D</span>sofa
        </a>
        <div className="desktop-actions">
          <nav className="desktop-nav" aria-label={t('Primary navigation')}>
            {links.map(([href, label]) => (
              <a href={href} onClick={followLink} aria-current={activeSection === href ? 'location' : undefined} key={href}>{t(label)}</a>
            ))}
          </nav>
          <LanguagePicker label={t('Language')} locale={locale} setLocale={setLocale} />
        </div>
        <button
          className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
          type="button"
          aria-label={menuOpen ? t('Close menu') : t('Open menu')}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          ref={toggleButton}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span /><span />
        </button>
      </header>
      <nav
        className={`mobile-menu${menuOpen ? ' is-open' : ''}${hidden ? ' is-hidden' : ''}`}
        id="mobile-menu"
        aria-label={t('Mobile navigation')}
        aria-hidden={!menuOpen}
      >
        {links.map(([href, label]) => (
          <a href={href} onClick={followLink} tabIndex={menuOpen ? 0 : -1} aria-current={activeSection === href ? 'location' : undefined} key={href}>{t(label)}</a>
        ))}
        <LanguagePicker label={t('Language')} locale={locale} setLocale={setLocale} mobile />
      </nav>
    </>
  );
}

function LanguagePicker({ label, locale, setLocale, mobile = false }: { label: string; locale: Locale; setLocale: (locale: Locale) => void; mobile?: boolean }) {
  return (
    <div className={`language-picker${mobile ? ' language-picker-mobile' : ''}`} aria-label={label}>
      {(Object.keys(localeLabels) as Locale[]).map((item) => (
        <button
          aria-pressed={locale === item}
          key={item}
          onClick={() => setLocale(item)}
          tabIndex={mobile ? 0 : undefined}
          type="button"
        >
          {localeLabels[item]}
        </button>
      ))}
    </div>
  );
}
