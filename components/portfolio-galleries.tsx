'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useI18n } from '@/lib/i18n';

type ImageWork = {
  src: string;
  title: string;
  alt: string;
  category: 'Furniture' | 'Product' | 'Systems';
};

const imageWorks: ImageWork[] = [
  { src: '/media/images/t-3.png', title: 'Product visualization', alt: 'Rendered product composition with coordinated materials and lighting.', category: 'Product' },
  { src: '/media/images/int-6-2.jpg', title: 'Interior furniture', alt: 'Furniture arranged within a softly lit contemporary interior.', category: 'Furniture' },
  { src: '/media/images/b1.png', title: 'Furniture detail CGI', alt: 'Close view of a furniture construction detail and material finish.', category: 'Product' },
  { src: '/media/images/a1.png', title: 'E-commerce product CGI', alt: 'Isolated product rendering prepared for a clear catalogue view.', category: 'Product' },
  { src: '/media/images/01.jpg', title: 'Furniture collection 01', alt: 'Coordinated furniture pieces presented in the first collection setting.', category: 'Furniture' },
  { src: '/media/images/03.jpg', title: 'Furniture collection 02', alt: 'Second furniture collection arranged as a complete interior composition.', category: 'Furniture' },
  { src: '/media/images/int2-3.jpg', title: 'Gaming desk visualization', alt: 'Gaming desk setup with integrated storage and equipment space.', category: 'Furniture' },
  { src: '/media/images/int1-2.jpg', title: 'Office desk visualization', alt: 'Office desk and storage arranged as a compact workspace.', category: 'Furniture' },
  { src: '/media/images/r40001.jpg', title: 'Workstation visualization', alt: 'Modular workstation shown with desk, shelving and storage.', category: 'Furniture' },
  { src: '/media/images/3-1.jpg', title: 'Executive desk visualization', alt: 'Executive desk composition in a refined office setting.', category: 'Furniture' },
  { src: '/media/images/i2.jpg', title: 'Storage system', alt: 'Wall storage system with open shelves and closed compartments.', category: 'Furniture' },
  { src: '/media/images/armchair-008-1.jpg', title: 'Armchair study 01', alt: 'Upholstered armchair shown from the first product angle.', category: 'Furniture' },
  { src: '/media/images/armchair-007-1.jpg', title: 'Armchair study 02', alt: 'Upholstered armchair shown from a second product angle.', category: 'Furniture' },
  { src: '/media/images/fireplace-2-1200x675.jpg', title: 'Fireplace system 01', alt: 'Built-in fireplace system integrated into a contemporary interior.', category: 'Systems' },
  { src: '/media/images/81-1200x675.jpg', title: 'Fireplace system 02', alt: 'Alternative fireplace installation with surrounding wall finish.', category: 'Systems' },
  { src: '/media/images/portfolio-2/optical-retail-01.webp', title: 'Optical retail display 01', alt: 'Eyewear display wall with illuminated shelving and storage.', category: 'Furniture' },
  { src: '/media/images/portfolio-2/optical-retail-02.webp', title: 'Optical showroom 01', alt: 'Optical showroom interior with product displays and consultation area.', category: 'Furniture' },
  { src: '/media/images/portfolio-2/optical-retail-05.webp', title: 'Optical showroom 03', alt: 'Optical retail interior viewed across display and customer zones.', category: 'Furniture' },
  { src: '/media/images/portfolio-2/optical-retail-06.webp', title: 'Optical retail display 03', alt: 'Freestanding eyewear display designed for a retail floor.', category: 'Furniture' },
  { src: '/media/images/portfolio-2/staircase-01.webp', title: 'Architectural staircase 01', alt: 'Sculptural staircase connecting two levels of a modern interior.', category: 'Systems' },
  { src: '/media/images/portfolio-2/staircase-02.webp', title: 'Staircase detail 01', alt: 'Close architectural view of stair treads, railing and junctions.', category: 'Systems' },
  { src: '/media/images/portfolio-2/staircase-03.webp', title: 'Architectural staircase 02', alt: 'Staircase shown as a central feature within the interior.', category: 'Systems' },
  { src: '/media/images/portfolio-2/staircase-04.webp', title: 'Staircase detail 02', alt: 'Detailed view of the staircase structure and balustrade.', category: 'Systems' },
  { src: '/media/images/portfolio-2/glass-partition-gym.webp', title: 'Suspended glass partition system', alt: 'Suspended glass partitions dividing a contemporary gym interior.', category: 'Systems' },
  { src: '/media/images/portfolio-2/sliding-partition-interior.webp', title: 'Sliding partition interior', alt: 'Sliding glass partition system separating two interior zones.', category: 'Systems' },
  { src: '/media/images/portfolio-2/garden-room-01.webp', title: 'Garden room — night study 01', alt: 'Illuminated garden room viewed from outside at night.', category: 'Systems' },
  { src: '/media/images/portfolio-2/garden-room-02.webp', title: 'Garden room — night study 02', alt: 'Second night view of the glazed garden room and terrace.', category: 'Systems' },
  { src: '/media/images/portfolio-2/garden-room-03.webp', title: 'Garden room — daylight study 01', alt: 'Glazed garden room in daylight with the interior visible.', category: 'Systems' },
  { src: '/media/images/portfolio-2/garden-room-04.webp', title: 'Garden room — exterior study 01', alt: 'Exterior perspective of a contemporary garden room extension.', category: 'Systems' },
  { src: '/media/images/portfolio-2/garden-room-05.webp', title: 'Garden room — dark frame', alt: 'Garden room facade with a dark structural frame and glazing.', category: 'Systems' },
  { src: '/media/images/portfolio-2/garden-room-07.webp', title: 'Garden room — daylight study 02', alt: 'Second daylight perspective of the garden room and landscape.', category: 'Systems' },
];

const selectedImageSources = new Set([
  '/media/images/t-3.png',
  '/media/images/int-6-2.jpg',
  '/media/images/b1.png',
  '/media/images/01.jpg',
  '/media/images/03.jpg',
  '/media/images/fireplace-2-1200x675.jpg',
  '/media/images/81-1200x675.jpg',
  '/media/images/portfolio-2/optical-retail-02.webp',
  '/media/images/portfolio-2/staircase-03.webp',
  '/media/images/portfolio-2/glass-partition-gym.webp',
  '/media/images/portfolio-2/sliding-partition-interior.webp',
  '/media/images/portfolio-2/garden-room-03.webp',
]);

const selectedImageWorks = imageWorks.filter((work) => selectedImageSources.has(work.src));

type VideoWork = {
  src: string;
  title: string;
  poster?: string;
};

const videoWorks: VideoWork[] = [
  { src: '/media/videos/door-1.mp4', title: 'Door mechanism' },
  { src: '/media/videos/modeling-of-furnite.mp4', title: 'Furniture modelling' },
  { src: '/media/videos/manual-1280.mp4', title: 'Manual system animation' },
  {
    src: '/media/videos/nurigami.mp4',
    poster: '/media/posters/nurigami.jpg',
    title: 'Nurigami',
  },
  {
    src: '/media/videos/topled-shelf-panel-01.mp4',
    poster: '/media/posters/topled-shelf-panel-01.jpg',
    title: 'TOPLED Shelf Panel',
  },
  {
    src: '/media/videos/garage-storage-configurations.mp4',
    poster: '/media/posters/garage-storage-configurations.jpg',
    title: 'Garage storage configurations',
  },
  { src: '/media/videos/ilite-future.mp4', title: 'Ilite Future' },
  { src: '/media/videos/fintech.mp4', title: 'FinTech' },
  { src: '/media/videos/perfect.mp4', title: 'Perfect' },
  { src: '/media/videos/complex-simply.mp4', title: 'Complex Simply' },
  {
    src: '/media/videos/mokko-2color.mp4',
    poster: '/media/posters/mokko-2color.jpg',
    title: 'Mokko +2Color',
  },
  {
    src: '/media/videos/furniture-composition-02.mp4',
    poster: '/media/posters/furniture-composition-02.jpg',
    title: 'Fireplace composition 02',
  },
];

const fireplaceWorks: VideoWork[] = [
  { src: '/media/videos/fire-movie3.mp4', title: 'Fireplace motion 01' },
  { src: '/media/videos/fire-movie-4-2.mp4', title: 'Fireplace motion 02' },
  { src: '/media/videos/video-10.mp4', title: 'Fireplace product animation' },
  { src: '/media/videos/firegif-1-1.mp4', title: 'Fireplace study' },
];

const cinemaWorks = [
  { src: '/media/cinema/from-the-ruins.mp4', poster: '/media/cinema-posters/from-the-ruins.jpg', title: 'Из руин', format: 'Short film', previewStart: 93.5 },
  { src: '/media/cinema/tell-me.mp4', poster: '/media/cinema-posters/tell-me.jpg', title: 'Скажи мне', format: 'Music video', previewStart: 144 },
  { src: '/media/cinema/soyuzmultfilm-90.mp4', poster: '/media/cinema-posters/soyuzmultfilm-90.jpg', title: 'Союзмультфильм — 90 лет', format: 'Animated film', previewStart: 48 },
  { src: '/media/cinema/gucci.mp4', poster: '/media/cinema-posters/gucci.jpg', title: 'Gucci', format: 'Character film', previewStart: 5.8 },
  { src: '/media/cinema/maximum.mp4', poster: '/media/cinema-posters/maximum.jpg', title: 'Maximum', format: 'CGI film', previewStart: 15.5 },
  { src: '/media/cinema/garage.mp4', poster: '/media/cinema-posters/garage.jpg', title: 'Garage', format: 'Product film', previewStart: 17.8 },
];

function AutoplayPreview({ src, poster, previewStart = 0 }: { src: string; poster?: string; previewStart?: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current!;
    if (!video) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let startPrepared = previewStart <= 0;

    function syncPlayback() {
      if (!visible || reducedMotion.matches) {
        video.pause();
        return;
      }
      if (!startPrepared) {
        if (video.readyState >= 1) prepareStart();
        else video.load();
        return;
      }
      void video.play().catch(() => undefined);
    }

    function prepareStart() {
      if (!visible || startPrepared || previewStart <= 0) return;
      startPrepared = true;
      const latestSafeStart = Number.isFinite(video.duration) ? Math.max(0, video.duration - 0.25) : previewStart;
      video.addEventListener('seeked', syncPlayback, { once: true });
      video.currentTime = Math.min(previewStart, latestSafeStart);
    }

    const onMotionPreferenceChange = () => {
      if (visible && !reducedMotion.matches) {
        syncPlayback();
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.35 },
    );

    observer.observe(video);
    video.addEventListener('loadedmetadata', prepareStart);
    reducedMotion.addEventListener('change', onMotionPreferenceChange);
    return () => {
      observer.disconnect();
      video.removeEventListener('loadedmetadata', prepareStart);
      reducedMotion.removeEventListener('change', onMotionPreferenceChange);
    };
  }, [previewStart]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster ?? src.replace('/videos/', '/posters/').replace('.mp4', '.jpg')}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    />
  );
}

function ImageGrid({ works }: { works: ImageWork[] }) {
  const { t } = useI18n();
  return (
    <div className="image-gallery">
      {works.map((work, index) => (
        <Dialog key={work.src}>
          <DialogTrigger className={`gallery-image gallery-image-${index % 7}`} aria-label={t('Open project image: {title}', { title: t(work.title) })}>
            <Image src={work.src} alt={t(work.alt)} width={1920} height={1080} loading="lazy" unoptimized />
            <span><b>{t(work.title)}</b></span>
          </DialogTrigger>
          <DialogContent className="media-dialog" showCloseButton>
            <DialogTitle className="sr-only">{t(work.title)}</DialogTitle>
            <DialogDescription className="sr-only">{t(work.category)}</DialogDescription>
            <Image src={work.src} alt={t(work.alt)} width={1920} height={1080} unoptimized />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}

function FireplaceGrid() {
  const { t } = useI18n();
  return (
    <div className="fireplace-gallery">
      {fireplaceWorks.map((work) => (
        <Dialog key={work.src}>
          <DialogTrigger className="fireplace-card" aria-label={t('Play fireplace animation: {title}', { title: t(work.title) })}>
            <AutoplayPreview src={work.src} poster={work.poster} />
            <span><b>{t(work.title)}</b></span>
          </DialogTrigger>
          <DialogContent className="media-dialog video-dialog" showCloseButton>
            <DialogTitle className="sr-only">{t(work.title)}</DialogTitle>
            <DialogDescription className="sr-only">{t('Fireplaces')}</DialogDescription>
            {/* Caption files were not included with the source films. */}
            {/* oxlint-disable-next-line jsx-a11y/media-has-caption */}
            <video src={work.src} controls autoPlay playsInline preload="metadata" />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}

export function ImageGallery() {
  const [showAllImages, setShowAllImages] = useState(false);
  const { t } = useI18n();

  return (
    <Tabs defaultValue="all" className="portfolio-tabs">
      <TabsList variant="line" aria-label={t('Filter image portfolio')}>
        <TabsTrigger value="all">{t('All images')}</TabsTrigger>
        <TabsTrigger value="furniture">{t('Furniture')}</TabsTrigger>
        <TabsTrigger value="product">{t('Product')}</TabsTrigger>
        <TabsTrigger value="systems">{t('Systems')}</TabsTrigger>
        <TabsTrigger value="fireplaces">{t('Fireplaces')}</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <ImageGrid works={showAllImages ? imageWorks : selectedImageWorks} />
        <div className="portfolio-all-footer">
          <button
            aria-expanded={showAllImages}
            onClick={() => setShowAllImages((current) => !current)}
            type="button"
          >
            {showAllImages ? t('Show selected works ↑') : t('View all {count} works ↓', { count: imageWorks.length })}
          </button>
        </div>
      </TabsContent>
      <TabsContent value="furniture"><ImageGrid works={imageWorks.filter((work) => work.category === 'Furniture')} /></TabsContent>
      <TabsContent value="product"><ImageGrid works={imageWorks.filter((work) => work.category === 'Product')} /></TabsContent>
      <TabsContent value="systems"><ImageGrid works={imageWorks.filter((work) => work.category === 'Systems')} /></TabsContent>
      <TabsContent value="fireplaces"><FireplaceGrid /></TabsContent>
    </Tabs>
  );
}

export function VideoGallery() {
  const { t } = useI18n();
  return (
    <div className="video-gallery">
      {videoWorks.map((work) => (
        <Dialog key={work.src}>
          <DialogTrigger className="video-card" aria-label={t('Play technical animation: {title}', { title: t(work.title) })}>
            <AutoplayPreview src={work.src} poster={work.poster} />
            <span className="video-meta"><b>{t(work.title)}</b></span>
          </DialogTrigger>
          <DialogContent className="media-dialog video-dialog" showCloseButton>
            <DialogTitle className="sr-only">{t(work.title)}</DialogTitle>
            <DialogDescription className="sr-only">{t('Motion')}</DialogDescription>
            {/* These source films are silent visual studies. */}
            {/* oxlint-disable-next-line jsx-a11y/media-has-caption */}
            <video src={work.src} controls autoPlay playsInline preload="metadata" />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}

export function CinemaGallery() {
  const { t } = useI18n();
  return (
    <div className="cinema-gallery">
      {cinemaWorks.map((work) => (
        <Dialog key={work.src}>
          <DialogTrigger className="cinema-card" aria-label={t('Play {format}: {title}', { format: t(work.format), title: t(work.title) })}>
            <AutoplayPreview src={work.src} poster={work.poster} previewStart={work.previewStart} />
            <span className="cinema-meta"><b>{t(work.title)}</b><small>{t(work.format)}</small></span>
          </DialogTrigger>
          <DialogContent className="media-dialog video-dialog" showCloseButton>
            <DialogTitle className="sr-only">{t(work.title)}</DialogTitle>
            <DialogDescription className="sr-only">{t('Cinema')}</DialogDescription>
            {/* Caption files were not included with the source films. */}
            {/* oxlint-disable-next-line jsx-a11y/media-has-caption */}
            <video src={work.src} controls autoPlay playsInline preload="metadata" />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
