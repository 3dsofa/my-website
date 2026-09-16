'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';

type StoryElement = HTMLElement & {
  style: CSSStyleDeclaration;
};

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const smoothstep = (value: number) => {
  const progress = clamp(value);
  return progress * progress * (3 - 2 * progress);
};

function useScrollStories() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const stories = Array.from(root.querySelectorAll<StoryElement>('.catalog-story'));
    const catStory = root.querySelector<StoryElement>('.catalog-story-left');
    const catMagazine = catStory?.querySelector<HTMLElement>('.cat-magazine');
    const catSheets = Array.from(catMagazine?.querySelectorAll<HTMLElement>('.catalog-sheet') ?? []);
    const mroomStory = root.querySelector<StoryElement>('.catalog-story-right');
    const mroomMagazine = mroomStory?.querySelector<HTMLElement>('.mroom-magazine');
    const mroomSheets = Array.from(mroomMagazine?.querySelectorAll<HTMLElement>('.catalog-sheet') ?? []);
    let frame = 0;

    const update = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      stories.forEach((story) => {
        const rect = story.getBoundingClientRect();
        const distance = Math.max(1, rect.height - viewportHeight);
        const progress = clamp(-rect.top / distance);
        const enter = clamp((viewportHeight - rect.top) / (viewportHeight * 0.45));
        const open = clamp((progress - 0.14) / 0.18);
        const flipOne = clamp((progress - 0.38) / 0.16);
        const flipTwo = clamp((progress - 0.6) / 0.16);
        const settle = clamp((progress - 0.82) / 0.18);
        const coverCurl = Math.sin(open * Math.PI);
        const flipOneCurl = Math.sin(flipOne * Math.PI);
        const flipTwoCurl = Math.sin(flipTwo * Math.PI);

        if (story === catStory) {
          const coverShift = smoothstep(clamp((progress - 0.06) / 0.09));
          // Match MROOM's long, scroll-scrubbed timing so a wheel gesture cannot
          // skip across a leaf and briefly expose the following spread.
          const sequence = clamp((progress - 0.18) / 0.74) * 3;
          const firstTurn = clamp(sequence);
          catMagazine?.style.setProperty('--cat-cover-left', `${25 + coverShift * 25}%`);
          catMagazine?.classList.toggle('is-cover', firstTurn === 0);
          catMagazine?.classList.toggle('is-opening', firstTurn > 0 && firstTurn < 1);
          catSheets.forEach((sheet, index) => {
            const boundedTurn = index < 3 ? clamp(sequence - index) : 0;
            const rawTurn = boundedTurn < 0.002 ? 0 : boundedTurn > 0.998 ? 1 : boundedTurn;
            const turn = smoothstep(rawTurn);
            const turning = rawTurn > 0 && rawTurn < 1;
            sheet.classList.toggle('is-turning', turning);
            sheet.classList.toggle('is-turned', rawTurn === 1);
            sheet.style.setProperty('--cat-sheet-angle', `${(-180 * turn).toFixed(3)}deg`);
            sheet.style.zIndex = turning
              ? '100'
              : rawTurn === 1
                ? String(index + 1)
                : String(catSheets.length * 2 - index);
          });
        }
        if (story === mroomStory) {
          const coverShift = smoothstep(clamp((progress - 0.06) / 0.09));
          const sequence = clamp((progress - 0.18) / 0.74) * 3;
          const firstTurn = clamp(sequence);
          mroomMagazine?.style.setProperty('--mroom-cover-left', `${25 + coverShift * 25}%`);
          mroomMagazine?.classList.toggle('is-cover', firstTurn === 0);
          mroomMagazine?.classList.toggle('is-opening', firstTurn > 0 && firstTurn < 1);
          mroomSheets.forEach((sheet, index) => {
            const boundedTurn = index < 3 ? clamp(sequence - index) : 0;
            const rawTurn = boundedTurn < 0.002 ? 0 : boundedTurn > 0.998 ? 1 : boundedTurn;
            const turn = smoothstep(rawTurn);
            const turning = rawTurn > 0 && rawTurn < 1;
            sheet.classList.toggle('is-turning', turning);
            sheet.classList.toggle('is-turned', rawTurn === 1);
            sheet.style.setProperty('--sheet-angle', `${(-180 * turn).toFixed(3)}deg`);
            const fold = Math.sin(turn * Math.PI);
            sheet.style.setProperty('--sheet-fold', fold.toFixed(4));
            sheet.style.zIndex = turning
              ? '100'
              : rawTurn === 1
                ? String(index + 1)
                : String(mroomSheets.length * 2 - index);
          });
        }

        story.style.setProperty('--catalog-progress', progress.toFixed(4));
        story.style.setProperty('--catalog-enter', enter.toFixed(4));
        story.style.setProperty('--catalog-open', open.toFixed(4));
        story.style.setProperty('--catalog-flip-1', flipOne.toFixed(4));
        story.style.setProperty('--catalog-flip-2', flipTwo.toFixed(4));
        story.style.setProperty('--catalog-settle', settle.toFixed(4));
        story.style.setProperty('--catalog-cover-curl', coverCurl.toFixed(4));
        story.style.setProperty('--catalog-curl-1', flipOneCurl.toFixed(4));
        story.style.setProperty('--catalog-curl-2', flipTwoCurl.toFixed(4));
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return rootRef;
}

function PaperLeaf({
  back,
  className,
  front,
}: {
  back: string;
  className: string;
  front: string;
}) {
  const frontImage = { backgroundImage: `url(/media/catalogues/cat/page-${front}.webp)` };
  const backImage = { backgroundImage: `url(/media/catalogues/cat/page-${back}.webp)` };

  return (
    <div className={`catalog-sheet ${className}`}>
      <span className="catalog-leaf-face catalog-leaf-front" style={frontImage} />
      <span className="catalog-leaf-face catalog-leaf-back" style={backImage} />
    </div>
  );
}

function CatBook() {
  return (
    <div className="catalog-object catalog-book" aria-hidden="true">
      <div className="cat-magazine cat-product-magazine is-cover">
        <PaperLeaf back="02" className="catalog-sheet-cover" front="01" />
        <PaperLeaf back="04" className="catalog-sheet-one" front="03" />
        <PaperLeaf back="06" className="catalog-sheet-two" front="05" />
        <PaperLeaf back="08" className="catalog-sheet-three" front="07" />
      </div>
    </div>
  );
}

function MroomJournal() {
  const { t } = useI18n();
  return (
    <div className="catalog-object catalog-book mroom-book" aria-hidden="true">
      <div className="cat-magazine mroom-magazine is-cover">
        <div className="catalog-sheet mroom-sheet-cover">
          <div className="catalog-leaf-face catalog-leaf-front mroom-page mroom-cover-page">
            <Image alt="" fill sizes="(max-width: 768px) 50vw, 34vw" src="/media/catalogues/mroom/steve-jobs-home-1982.jpg" />
            <span className="mroom-cover-shade" />
            <div className="mroom-cover-copy">
              <small>MROOM</small>
              <span>JOURNAL</span>
              <strong>{t('На чём сидел')} <em>{t('Стив Джобс?')}</em></strong>
            </div>
            <b className="mroom-page-number mroom-page-number-light">01</b>
          </div>
          <div className="catalog-leaf-face catalog-leaf-back mroom-page mroom-editorial-page">
            <b className="mroom-page-number">02</b>
            <p className="mroom-page-kicker">{t('Ответ на обложку')}</p>
            <h4>{t('На полу')}</h4>
            <p className="mroom-dropcap">{t('В 1982 году Стив Джобс уже мог позволить себе практически любую мебель. Но на фотографии Дианы Уокер он сидит прямо на деревянном полу. Рядом — чай и пластинки. Сзади — стереосистема. Над ним — лампа Tiffany. Дивана нет. Кресла нет. Стола практически тоже нет.')}</p>
            <blockquote>{t('Если бы MROOM существовал тогда: «Объекты для замены не обнаружены».')}</blockquote>
          </div>
        </div>
        <div className="catalog-sheet mroom-sheet-one">
          <MroomStoryPage
            category="Вудсайд, Калифорния · 1982"
            number="03"
            paragraphs={[
              'Apple уже вышла на биржу, а её молодой сооснователь мог позволить себе практически любую мебель. Пустая комната была не экономией, а результатом очень строгого отбора вещей.',
              'Джобс не соглашался жить рядом с предметом только потому, что пустой угол принято чем-то заполнять. Каждая вещь должна была оправдать своё присутствие.',
              'Поэтому знаменитый интерьер рассказывает не о недостатке, а о паузе между потребностью и осознанным выбором.',
              'На снимке нет ощущения временного жилья: пластинки разложены рядом, техника подключена, свет настроен.',
            ]}
            quote="Пустота тоже может быть решением."
            stat="1982"
            statLabel="год снимка Дианы Уокер"
            title="Миллионер без дивана"
          />
          <MroomStoryPage
            back
            category="Стартовый набор"
            number="04"
            paragraphs={[
              'Джон Скалли вспоминал, что в доме Джобса почти ничего не было. Среди немногочисленных предметов — изображение Эйнштейна, лампа Tiffany, кресло и кровать.',
              'Это уже звучит не как интерьер, а как стартовый набор персонажа в очень странной компьютерной игре.',
              'Но за странностью скрывался принцип: если вещь находится рядом каждый день, она должна заслужить это место.',
            ]}
            quote="Самое знаменитое кресло Стива Джобса — пол."
            stat="3 вещи"
            statLabel="кровать · лампа · Эйнштейн"
            title="Кровать + лампа + Эйнштейн"
          />
        </div>
        <div className="catalog-sheet mroom-sheet-two">
          <MroomStoryPage
            category="Но одну вещь он выбрал"
            number="05"
            paragraphs={[
              'Декоративное стекло, сложный орнамент и тёплый свет — совсем не тот образ, который позднее станет ассоциироваться с Apple.',
              'Джобса интересовал не минимализм ради пустоты. Его интересовал отбор: одна вещь вместо десяти, но с характером и качеством исполнения.',
              'Лампа показывает важную разницу между стерильностью и осознанностью. Строгий интерьер не обязан быть безличным.',
              'На фоне пустых стен её цветное стекло работает почти как самостоятельный объект искусства.',
              'Тепло создаёт не количество предметов, а один точно выбранный источник света.',
              'Выразительный акцент лучше добавлять после того, как понятна основа комнаты.',
            ]}
            quote="Одна выразительная вещь сильнее десяти случайных."
            stat="1 акцент"
            statLabel="вместо визуального шума"
            title="Чертовски хорошая лампа"
          />
          <MroomStoryPage
            back
            category="Аудиосистема вместо мебели"
            number="06"
            paragraphs={[
              'WIRED изучил знаменитую фотографию и попытался определить компоненты системы. Среди техники была серьёзная аудиофильская аппаратура и проигрыватель Michell GyroDec.',
              'Джобс окружал себя не большим количеством вещей, а предметами, в которых видел идею.',
              'Музыка получила место раньше дивана. Функция и качество переживания были важнее привычного набора мебели.',
              'Аудиосистема занимает визуально скромное место, но определяет назначение всей комнаты.',
              'Сначала выбирается важное действие, затем свет и техника, и только после этого — мебель.',
              'Пустая гостиная оказывается не незаконченной, а предельно честной.',
            ]}
            quote="Сначала — то, что меняет ощущение от жизни."
            stat="GyroDec"
            statLabel="проигрыватель, найденный WIRED"
            title="Диван — необязательно. Хороший звук — обязательно"
          />
        </div>
        <div className="catalog-sheet mroom-sheet-three">
          <MroomPhotoStoryPage />
          <MroomStoryPage
            back
            category="Семейная теория мебели"
            number="08"
            paragraphs={[
              '— Стив, нам нужен диван. — Зачем? — Чтобы сидеть. — Но что значит сидеть? — Стив…',
              'Где-то в этот момент обычный человек уже нажал «Оформить доставку». Стив Джобс продолжал исследование.',
              'Для большинства: понравилось → подходит → цена нормальная → берём. Для Джобса бытовое решение превращалось в вопрос о том, как мы вообще хотим жить.',
            ]}
            quote="Восемь. Лет. Обсуждений."
            stat="8 лет"
            statLabel="теоретического выбора мебели"
            title="В чём назначение дивана?"
          />
        </div>
      </div>
    </div>
  );
}

function MroomPhotoStoryPage() {
  const { t } = useI18n();
  return (
    <div className="catalog-leaf-face catalog-leaf-front mroom-page mroom-photo-story-page">
      <div className="mroom-photo-story-image">
        <Image alt="" fill sizes="(max-width: 768px) 50vw, 34vw" src="/media/catalogues/mroom/steve-jobs-sofa.webp" />
      </div>
      <div className="mroom-photo-story-copy">
        <p className="mroom-page-kicker">{t('Сентябрь 1985 · дома после Apple')}</p>
        <h4>{t('Спойлер: диван всё-таки появился')}</h4>
        <p>{t('Через несколько дней после ухода из Apple фотограф Steve Ringman снял Джобса дома на большом диване.')}</p>
        <p>{t('Мебель у него была, но выбор вещей по-прежнему оставался отдельным проектом.')}</p>
      </div>
      <b className="mroom-page-number mroom-page-number-light">07</b>
    </div>
  );
}

function MroomStoryPage({
  back = false,
  category,
  number,
  paragraphs,
  quote,
  stat,
  statLabel,
  title,
}: {
  back?: boolean;
  category: string;
  number: string;
  paragraphs: string[];
  quote: string;
  stat: string;
  statLabel: string;
  title: string;
}) {
  const { t } = useI18n();
  return (
    <div className={`catalog-leaf-face ${back ? 'catalog-leaf-back' : 'catalog-leaf-front'} mroom-page mroom-story-page`}>
      <b className="mroom-page-number">{number}</b>
      <p className="mroom-page-kicker">{t(category)}</p>
      <h4>{t(title)}</h4>
      <div className="mroom-story-columns">{paragraphs.map((paragraph) => <p key={paragraph}>{t(paragraph)}</p>)}</div>
      <blockquote>{t(quote)}</blockquote>
      <div className="mroom-story-stat"><strong>{t(stat)}</strong><span>{t(statLabel)}</span></div>
    </div>
  );
}

export function CatalogStories() {
  const rootRef = useScrollStories();
  const { t } = useI18n();

  return (
    <div className="catalog-stories" ref={rootRef}>
      <article className="catalog-story catalog-story-left">
        <div className="catalog-sticky">
          <div className="catalog-visual"><CatBook /></div>
          <div className="catalog-project-copy">
            <span>{t('Selected client 01 / Product catalogue')}</span>
            <h3>CAT Garage Storage</h3>
            <p>{t('Product systems translated into a clear 34-page sales catalogue.')}</p>
            <a href="/media/catalogues/cat-garage-storage-2026.pdf" rel="noreferrer" target="_blank">{t('View catalogue ↗')}</a>
          </div>
        </div>
      </article>

      <article className="catalog-story catalog-story-right">
        <div className="catalog-sticky">
          <div className="catalog-visual"><MroomJournal /></div>
          <div className="catalog-project-copy">
            <span>{t('Selected client 02 / Digital editorial')}</span>
            <h3>MROOM Journal</h3>
            <p>{t('The History of Things — an interactive issue about furniture, design and people.')}</p>
            <a href={`https://mroom.pro/blog/?lang=${t('MROOM language code')}`} rel="noreferrer" target="_blank">{t('Explore journal ↗')}</a>
          </div>
        </div>
      </article>
    </div>
  );
}
