'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Locale = 'en' | 'ru' | 'de' | 'fr';

export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  ru: 'RU',
  de: 'DE',
  fr: 'FR',
};

const supportedLocales = Object.keys(localeLabels) as Locale[];

const translations: Record<Exclude<Locale, 'en'>, Record<string, string>> = {
  ru: {
    Work: 'Работы', Motion: 'Анимация', Cinema: 'Кино', Catalogues: 'Каталоги', Services: 'Услуги', Contact: 'Контакты',
    'Primary navigation': 'Основная навигация', 'Mobile navigation': 'Мобильная навигация', Language: 'Язык', 'Filter image portfolio': 'Фильтр портфолио', 'Open menu': 'Открыть меню', 'Close menu': 'Закрыть меню',
    '3D visualization studio': 'Студия 3D-визуализации',
    'Architecture, interiors and products — made visible.': 'Архитектура, интерьеры и продукты — становятся видимыми.',
    'Photorealistic imagery, technical animation and cinematic production.': 'Фотореалистичная графика, техническая анимация и кинопроизводство.',
    'View selected work': 'Смотреть избранные работы', 'Selected work': 'Избранные работы', 'Still imagery.': 'Статичная графика.',
    'We make': 'Мы делаем', interiors: 'интерьеры', furniture: 'мебель', products: 'продукты', 'visible.': 'видимыми.',
    'We make interiors, furniture and products visible.': 'Мы делаем интерьеры, мебель и продукты видимыми.',
    'Interior and furniture design, precise 3D modeling and photorealistic visualization — from first concept to final image.': 'Дизайн интерьеров и мебели, точное 3D-моделирование и фотореалистичная визуализация — от первой идеи до финального изображения.',
    'Technical animation.': 'Техническая анимация.', 'We animate': 'Мы анимируем', 'systems.': 'системы.', 'mechanisms.': 'механизмы.', 'assemblies.': 'сборки.', 'installations.': 'монтаж.',
    'systems, mechanisms, assemblies and installations.': 'системы, механизмы, сборки и монтаж.',
    'Furniture configurations, assembly logic and installation sequences — visualized clearly from every angle.': 'Конфигурации мебели, логика сборки и последовательность монтажа — наглядно с любого ракурса.',
    Film: 'Кино', 'Cinema.': 'Кино.', 'We create': 'Мы создаём', 'films.': 'фильмы.', 'animation.': 'анимацию.', 'music videos.': 'клипы.',
    'films, animation and music videos.': 'фильмы, анимацию и музыкальные клипы.',
    'Made to order from your script or ours — from original concept to final cut.': 'Создаём на заказ по вашему или нашему сценарию — от идеи до финального монтажа.',
    Editorial: 'Редакционный дизайн', 'Catalogues.': 'Каталоги.', 'We design catalogues that': 'Мы создаём каталоги, которые', 'organise.': 'упорядочивают.', 'explain.': 'объясняют.', 'sell.': 'продают.',
    'organise, explain and sell.': 'упорядочивают, объясняют и продают.',
    'Product catalogues and digital editorial experiences — designed, visualized and built from cover to final page.': 'Продуктовые каталоги и цифровые журналы — проектируем, визуализируем и собираем от обложки до последней страницы.',
    Capabilities: 'Возможности', 'From model to final frame.': 'От модели до финального кадра.', 'Start a project': 'Начать проект', "Let's make it visible.": 'Давайте сделаем это видимым.',
    'Architectural & interior visualization': 'Архитектурная и интерьерная визуализация',
    'Photorealistic spaces, atmosphere, materials and light for architecture and interior concepts.': 'Фотореалистичные пространства, атмосфера, материалы и свет для архитектурных и интерьерных проектов.',
    'Furniture & product CGI': 'CGI мебели и продуктов', 'Models and final imagery for furniture, fittings, products, catalogues and online marketplaces.': 'Модели и финальные изображения мебели, фурнитуры и продуктов для каталогов и маркетплейсов.',
    'Technical animation': 'Техническая анимация', 'Clear motion studies that reveal construction, operation and the functionality of a system.': 'Наглядная анимация, раскрывающая конструкцию, работу и функциональность системы.',
    'Cinema & animation production': 'Производство кино и анимации', 'Animated films, narrative cinema and music videos — made to order from your script or ours.': 'Анимационные фильмы, игровое кино и музыкальные клипы — на заказ по вашему или нашему сценарию.',
    'Catalogue design': 'Дизайн каталогов', 'Print catalogues and digital editorial experiences — structured, visualized and built from cover to final page.': 'Печатные каталоги и цифровые издания — структура, визуализация и сборка от обложки до последней страницы.',
    'All images': 'Все работы', Furniture: 'Мебель', Product: 'Продукты', Systems: 'Системы', Fireplaces: 'Камины', 'Show selected works ↑': 'Показать избранное ↑', 'View all {count} works ↓': 'Смотреть все работы ({count}) ↓',
    'Selected client 01 / Product catalogue': 'Избранный клиент 01 / Продуктовый каталог', 'Product systems translated into a clear 34-page sales catalogue.': 'Продуктовые системы, превращённые в понятный 34-страничный каталог продаж.', 'View catalogue ↗': 'Открыть каталог ↗',
    'Selected client 02 / Digital editorial': 'Избранный клиент 02 / Цифровое издание', 'The History of Things — an interactive issue about furniture, design and people.': '«История вещей» — интерактивный выпуск о мебели, дизайне и людях.', 'Explore journal ↗': 'Открыть журнал ↗',
  },
  de: {
    Work: 'Arbeiten', Motion: 'Animation', Cinema: 'Film', Catalogues: 'Kataloge', Services: 'Leistungen', Contact: 'Kontakt',
    'Primary navigation': 'Hauptnavigation', 'Mobile navigation': 'Mobile Navigation', Language: 'Sprache', 'Filter image portfolio': 'Portfolio filtern', 'Open menu': 'Menü öffnen', 'Close menu': 'Menü schließen',
    '3D visualization studio': 'Studio für 3D-Visualisierung',
    'Architecture, interiors and products — made visible.': 'Architektur, Interieurs und Produkte — sichtbar gemacht.',
    'Photorealistic imagery, technical animation and cinematic production.': 'Fotorealistische Bilder, technische Animation und Filmproduktion.',
    'View selected work': 'Ausgewählte Arbeiten ansehen', 'Selected work': 'Ausgewählte Arbeiten', 'Still imagery.': 'Standbilder.',
    'We make': 'Wir machen', interiors: 'Interieurs', furniture: 'Möbel', products: 'Produkte', 'visible.': 'sichtbar.',
    'We make interiors, furniture and products visible.': 'Wir machen Interieurs, Möbel und Produkte sichtbar.',
    'Interior and furniture design, precise 3D modeling and photorealistic visualization — from first concept to final image.': 'Interieur- und Möbeldesign, präzise 3D-Modellierung und fotorealistische Visualisierung — vom ersten Konzept bis zum finalen Bild.',
    'Technical animation.': 'Technische Animation.', 'We animate': 'Wir animieren', 'systems.': 'Systeme.', 'mechanisms.': 'Mechanismen.', 'assemblies.': 'Baugruppen.', 'installations.': 'Montagen.',
    'systems, mechanisms, assemblies and installations.': 'Systeme, Mechanismen, Baugruppen und Montagen.',
    'Furniture configurations, assembly logic and installation sequences — visualized clearly from every angle.': 'Möbelkonfigurationen, Montagelogik und Installationsabläufe — aus jedem Blickwinkel verständlich visualisiert.',
    Film: 'Film', 'Cinema.': 'Film.', 'We create': 'Wir produzieren', 'films.': 'Filme.', 'animation.': 'Animationen.', 'music videos.': 'Musikvideos.',
    'films, animation and music videos.': 'Filme, Animationen und Musikvideos.',
    'Made to order from your script or ours — from original concept to final cut.': 'Nach Ihrem oder unserem Drehbuch — von der ursprünglichen Idee bis zum finalen Schnitt.',
    Editorial: 'Editorial', 'Catalogues.': 'Kataloge.', 'We design catalogues that': 'Wir gestalten Kataloge, die', 'organise.': 'ordnen.', 'explain.': 'erklären.', 'sell.': 'verkaufen.',
    'organise, explain and sell.': 'ordnen, erklären und verkaufen.',
    'Product catalogues and digital editorial experiences — designed, visualized and built from cover to final page.': 'Produktkataloge und digitale Editorial-Erlebnisse — gestaltet, visualisiert und aufgebaut vom Cover bis zur letzten Seite.',
    Capabilities: 'Kompetenzen', 'From model to final frame.': 'Vom Modell bis zum finalen Bild.', 'Start a project': 'Projekt starten', "Let's make it visible.": 'Machen wir es sichtbar.',
    'Architectural & interior visualization': 'Architektur- und Interieurvisualisierung', 'Photorealistic spaces, atmosphere, materials and light for architecture and interior concepts.': 'Fotorealistische Räume, Atmosphäre, Materialien und Licht für Architektur- und Interieurkonzepte.',
    'Furniture & product CGI': 'Möbel- und Produkt-CGI', 'Models and final imagery for furniture, fittings, products, catalogues and online marketplaces.': 'Modelle und finale Bilder für Möbel, Beschläge, Produkte, Kataloge und Online-Marktplätze.',
    'Technical animation': 'Technische Animation', 'Clear motion studies that reveal construction, operation and the functionality of a system.': 'Klare Bewegungsstudien, die Konstruktion, Bedienung und Funktion eines Systems zeigen.',
    'Cinema & animation production': 'Film- und Animationsproduktion', 'Animated films, narrative cinema and music videos — made to order from your script or ours.': 'Animationsfilme, narratives Kino und Musikvideos — nach Ihrem oder unserem Drehbuch.',
    'Catalogue design': 'Katalogdesign', 'Print catalogues and digital editorial experiences — structured, visualized and built from cover to final page.': 'Printkataloge und digitale Editorial-Erlebnisse — strukturiert, visualisiert und vom Cover bis zur letzten Seite aufgebaut.',
    'All images': 'Alle Bilder', Furniture: 'Möbel', Product: 'Produkt', Systems: 'Systeme', Fireplaces: 'Kamine', 'Show selected works ↑': 'Auswahl zeigen ↑', 'View all {count} works ↓': 'Alle {count} Arbeiten ansehen ↓',
    'Selected client 01 / Product catalogue': 'Ausgewählter Kunde 01 / Produktkatalog', 'Product systems translated into a clear 34-page sales catalogue.': 'Produktsysteme, übersetzt in einen klaren 34-seitigen Verkaufskatalog.', 'View catalogue ↗': 'Katalog ansehen ↗',
    'Selected client 02 / Digital editorial': 'Ausgewählter Kunde 02 / Digitales Editorial', 'The History of Things — an interactive issue about furniture, design and people.': 'Die Geschichte der Dinge — eine interaktive Ausgabe über Möbel, Design und Menschen.', 'Explore journal ↗': 'Journal entdecken ↗',
  },
  fr: {
    Work: 'Projets', Motion: 'Animation', Cinema: 'Cinéma', Catalogues: 'Catalogues', Services: 'Services', Contact: 'Contact',
    'Primary navigation': 'Navigation principale', 'Mobile navigation': 'Navigation mobile', Language: 'Langue', 'Filter image portfolio': 'Filtrer le portfolio', 'Open menu': 'Ouvrir le menu', 'Close menu': 'Fermer le menu',
    '3D visualization studio': 'Studio de visualisation 3D',
    'Architecture, interiors and products — made visible.': 'Architecture, intérieurs et produits — rendus visibles.',
    'Photorealistic imagery, technical animation and cinematic production.': 'Images photoréalistes, animation technique et production cinématographique.',
    'View selected work': 'Voir les projets sélectionnés', 'Selected work': 'Projets sélectionnés', 'Still imagery.': 'Images fixes.',
    'We make': 'Nous rendons', interiors: 'intérieurs', furniture: 'mobilier', products: 'produits', 'visible.': 'visibles.',
    'We make interiors, furniture and products visible.': 'Nous rendons les intérieurs, le mobilier et les produits visibles.',
    'Interior and furniture design, precise 3D modeling and photorealistic visualization — from first concept to final image.': 'Design d’intérieur et de mobilier, modélisation 3D précise et visualisation photoréaliste — du premier concept à l’image finale.',
    'Technical animation.': 'Animation technique.', 'We animate': 'Nous animons', 'systems.': 'systèmes.', 'mechanisms.': 'mécanismes.', 'assemblies.': 'assemblages.', 'installations.': 'installations.',
    'systems, mechanisms, assemblies and installations.': 'systèmes, mécanismes, assemblages et installations.',
    'Furniture configurations, assembly logic and installation sequences — visualized clearly from every angle.': 'Configurations de mobilier, logique d’assemblage et séquences d’installation — clairement visualisées sous tous les angles.',
    Film: 'Film', 'Cinema.': 'Cinéma.', 'We create': 'Nous créons', 'films.': 'films.', 'animation.': 'animations.', 'music videos.': 'clips.',
    'films, animation and music videos.': 'films, animations et clips musicaux.',
    'Made to order from your script or ours — from original concept to final cut.': 'Réalisés sur commande à partir de votre scénario ou du nôtre — du concept original au montage final.',
    Editorial: 'Éditorial', 'Catalogues.': 'Catalogues.', 'We design catalogues that': 'Nous concevons des catalogues qui', 'organise.': 'organisent.', 'explain.': 'expliquent.', 'sell.': 'vendent.',
    'organise, explain and sell.': 'organisent, expliquent et vendent.',
    'Product catalogues and digital editorial experiences — designed, visualized and built from cover to final page.': 'Catalogues de produits et expériences éditoriales numériques — conçus, visualisés et réalisés de la couverture à la dernière page.',
    Capabilities: 'Savoir-faire', 'From model to final frame.': 'Du modèle à l’image finale.', 'Start a project': 'Démarrer un projet', "Let's make it visible.": 'Rendons-le visible.',
    'Architectural & interior visualization': 'Visualisation architecturale et intérieure', 'Photorealistic spaces, atmosphere, materials and light for architecture and interior concepts.': 'Espaces, atmosphères, matériaux et lumières photoréalistes pour les concepts architecturaux et intérieurs.',
    'Furniture & product CGI': 'CGI mobilier et produit', 'Models and final imagery for furniture, fittings, products, catalogues and online marketplaces.': 'Modèles et images finales pour mobilier, accessoires, produits, catalogues et places de marché.',
    'Technical animation': 'Animation technique', 'Clear motion studies that reveal construction, operation and the functionality of a system.': 'Animations claires révélant la construction, le fonctionnement et la fonctionnalité d’un système.',
    'Cinema & animation production': 'Production cinéma et animation', 'Animated films, narrative cinema and music videos — made to order from your script or ours.': 'Films d’animation, cinéma narratif et clips musicaux — réalisés à partir de votre scénario ou du nôtre.',
    'Catalogue design': 'Design de catalogues', 'Print catalogues and digital editorial experiences — structured, visualized and built from cover to final page.': 'Catalogues imprimés et expériences éditoriales numériques — structurés, visualisés et réalisés de la couverture à la dernière page.',
    'All images': 'Toutes les images', Furniture: 'Mobilier', Product: 'Produit', Systems: 'Systèmes', Fireplaces: 'Cheminées', 'Show selected works ↑': 'Afficher la sélection ↑', 'View all {count} works ↓': 'Voir les {count} projets ↓',
    'Selected client 01 / Product catalogue': 'Client sélectionné 01 / Catalogue produit', 'Product systems translated into a clear 34-page sales catalogue.': 'Des systèmes produits transformés en un catalogue commercial clair de 34 pages.', 'View catalogue ↗': 'Voir le catalogue ↗',
    'Selected client 02 / Digital editorial': 'Client sélectionné 02 / Édition numérique', 'The History of Things — an interactive issue about furniture, design and people.': 'L’Histoire des objets — un numéro interactif sur le mobilier, le design et les personnes.', 'Explore journal ↗': 'Explorer le journal ↗',
  },
};

const localizedPhrases: Record<string, Partial<Record<Locale, string>>> = {
  'MROOM language code': { en: 'en', ru: 'ru', de: 'de', fr: 'en' },
  Open: { ru: 'Открыть', de: 'Öffnen', fr: 'Ouvrir' },
  Play: { ru: 'Воспроизвести', de: 'Abspielen', fr: 'Lire' },
  'Open project image: {title}': { ru: 'Открыть изображение проекта: {title}', de: 'Projektbild öffnen: {title}', fr: 'Ouvrir l’image du projet : {title}' },
  'Play technical animation: {title}': { ru: 'Воспроизвести техническую анимацию: {title}', de: 'Technische Animation abspielen: {title}', fr: 'Lire l’animation technique : {title}' },
  'Play fireplace animation: {title}': { ru: 'Воспроизвести анимацию камина: {title}', de: 'Kaminanimation abspielen: {title}', fr: 'Lire l’animation de cheminée : {title}' },
  'Play {format}: {title}': { ru: 'Воспроизвести {format}: {title}', de: '{format} abspielen: {title}', fr: 'Lire {format} : {title}' },
  '3D visualization services': { ru: 'Услуги 3D-визуализации', de: 'Dienstleistungen für 3D-Visualisierung', fr: 'Services de visualisation 3D' },
  'Rendered product composition with coordinated materials and lighting.': { ru: 'Продуктовая композиция с согласованными материалами и освещением.', de: 'Gerenderte Produktkomposition mit abgestimmten Materialien und Licht.', fr: 'Composition produit rendue avec matériaux et éclairage coordonnés.' },
  'Furniture arranged within a softly lit contemporary interior.': { ru: 'Мебель в современном интерьере с мягким освещением.', de: 'Möbel in einem sanft beleuchteten zeitgenössischen Interieur.', fr: 'Mobilier disposé dans un intérieur contemporain à la lumière douce.' },
  'Close view of a furniture construction detail and material finish.': { ru: 'Крупный план конструкции мебели и отделки материала.', de: 'Nahansicht eines Möbelkonstruktionsdetails und der Materialoberfläche.', fr: 'Vue rapprochée d’un détail constructif du meuble et de sa finition.' },
  'Isolated product rendering prepared for a clear catalogue view.': { ru: 'Изолированная визуализация продукта для наглядного каталожного вида.', de: 'Freigestellte Produktvisualisierung für eine klare Katalogansicht.', fr: 'Rendu produit isolé préparé pour une vue claire de catalogue.' },
  'Coordinated furniture pieces presented in the first collection setting.': { ru: 'Согласованный комплект мебели в первой интерьерной композиции.', de: 'Abgestimmte Möbelstücke in der ersten Kollektionseinrichtung.', fr: 'Pièces de mobilier coordonnées dans la première mise en scène de collection.' },
  'Second furniture collection arranged as a complete interior composition.': { ru: 'Вторая коллекция мебели, собранная в цельную интерьерную композицию.', de: 'Zweite Möbelkollektion als vollständige Interieurkomposition.', fr: 'Seconde collection de mobilier agencée en composition intérieure complète.' },
  'Gaming desk setup with integrated storage and equipment space.': { ru: 'Игровой стол со встроенным хранением и местом для оборудования.', de: 'Gaming-Schreibtisch mit integriertem Stauraum und Gerätefläche.', fr: 'Bureau gaming avec rangements intégrés et espace pour les équipements.' },
  'Office desk and storage arranged as a compact workspace.': { ru: 'Офисный стол и хранение в компактной рабочей зоне.', de: 'Bürotisch und Stauraum als kompakter Arbeitsplatz angeordnet.', fr: 'Bureau et rangements organisés en espace de travail compact.' },
  'Modular workstation shown with desk, shelving and storage.': { ru: 'Модульное рабочее место со столом, полками и хранением.', de: 'Modularer Arbeitsplatz mit Tisch, Regalen und Stauraum.', fr: 'Poste de travail modulaire avec bureau, étagères et rangements.' },
  'Executive desk composition in a refined office setting.': { ru: 'Композиция кабинета руководителя в сдержанном офисном интерьере.', de: 'Chefschreibtisch-Komposition in einem eleganten Büroumfeld.', fr: 'Composition de bureau de direction dans un cadre raffiné.' },
  'Wall storage system with open shelves and closed compartments.': { ru: 'Настенная система хранения с открытыми полками и закрытыми секциями.', de: 'Wandstauraumsystem mit offenen Regalen und geschlossenen Fächern.', fr: 'Système de rangement mural avec étagères ouvertes et compartiments fermés.' },
  'Upholstered armchair shown from the first product angle.': { ru: 'Мягкое кресло, показанное с первого продуктового ракурса.', de: 'Gepolsterter Sessel aus dem ersten Produktblickwinkel.', fr: 'Fauteuil rembourré présenté sous le premier angle produit.' },
  'Upholstered armchair shown from a second product angle.': { ru: 'Мягкое кресло, показанное со второго продуктового ракурса.', de: 'Gepolsterter Sessel aus einem zweiten Produktblickwinkel.', fr: 'Fauteuil rembourré présenté sous un second angle produit.' },
  'Built-in fireplace system integrated into a contemporary interior.': { ru: 'Встроенная каминная система в современном интерьере.', de: 'Integriertes Kaminsystem in einem zeitgenössischen Interieur.', fr: 'Système de cheminée encastré dans un intérieur contemporain.' },
  'Alternative fireplace installation with surrounding wall finish.': { ru: 'Альтернативная установка камина с отделкой окружающей стены.', de: 'Alternative Kamininstallation mit umlaufender Wandverkleidung.', fr: 'Installation de cheminée alternative avec finition murale environnante.' },
  'Eyewear display wall with illuminated shelving and storage.': { ru: 'Стена для демонстрации очков с подсвеченными полками и хранением.', de: 'Brillenpräsentationswand mit beleuchteten Regalen und Stauraum.', fr: 'Mur de présentation de lunettes avec étagères éclairées et rangements.' },
  'Optical showroom interior with product displays and consultation area.': { ru: 'Интерьер салона оптики с витринами и зоной консультаций.', de: 'Optik-Showroom mit Produktdisplays und Beratungsbereich.', fr: 'Intérieur de showroom optique avec présentoirs et espace de consultation.' },
  'Optical retail interior viewed across display and customer zones.': { ru: 'Интерьер оптики с видом на торговую и клиентскую зоны.', de: 'Optikgeschäft mit Blick über Präsentations- und Kundenbereiche.', fr: 'Intérieur d’opticien vu à travers les zones d’exposition et d’accueil.' },
  'Freestanding eyewear display designed for a retail floor.': { ru: 'Отдельно стоящая витрина для очков в торговом пространстве.', de: 'Freistehendes Brillendisplay für eine Verkaufsfläche.', fr: 'Présentoir à lunettes autoportant conçu pour l’espace de vente.' },
  'Sculptural staircase connecting two levels of a modern interior.': { ru: 'Скульптурная лестница, соединяющая два уровня современного интерьера.', de: 'Skulpturale Treppe zwischen zwei Ebenen eines modernen Interieurs.', fr: 'Escalier sculptural reliant deux niveaux d’un intérieur moderne.' },
  'Close architectural view of stair treads, railing and junctions.': { ru: 'Архитектурный крупный план ступеней, ограждения и узлов лестницы.', de: 'Architektonische Nahansicht von Stufen, Geländer und Anschlüssen.', fr: 'Vue architecturale rapprochée des marches, du garde-corps et des jonctions.' },
  'Staircase shown as a central feature within the interior.': { ru: 'Лестница как центральный архитектурный элемент интерьера.', de: 'Treppe als zentrales Gestaltungselement des Interieurs.', fr: 'Escalier présenté comme élément central de l’intérieur.' },
  'Detailed view of the staircase structure and balustrade.': { ru: 'Детальный вид конструкции лестницы и балюстрады.', de: 'Detailansicht der Treppenkonstruktion und Balustrade.', fr: 'Vue détaillée de la structure de l’escalier et de la balustrade.' },
  'Suspended glass partitions dividing a contemporary gym interior.': { ru: 'Подвесные стеклянные перегородки, разделяющие современный спортзал.', de: 'Abgehängte Glastrennwände gliedern ein modernes Fitnessstudio.', fr: 'Cloisons vitrées suspendues divisant un intérieur de salle de sport.' },
  'Sliding glass partition system separating two interior zones.': { ru: 'Раздвижная стеклянная перегородка между двумя зонами интерьера.', de: 'Schiebe-Glastrennwandsystem zwischen zwei Innenbereichen.', fr: 'Cloison vitrée coulissante séparant deux zones intérieures.' },
  'Illuminated garden room viewed from outside at night.': { ru: 'Освещённая садовая комната, вид снаружи ночью.', de: 'Beleuchtetes Gartenzimmer bei Nacht von außen gesehen.', fr: 'Salon de jardin éclairé vu de l’extérieur la nuit.' },
  'Second night view of the glazed garden room and terrace.': { ru: 'Второй ночной вид остеклённой садовой комнаты и террасы.', de: 'Zweite Nachtansicht des verglasten Gartenzimmers und der Terrasse.', fr: 'Seconde vue nocturne du salon de jardin vitré et de la terrasse.' },
  'Glazed garden room in daylight with the interior visible.': { ru: 'Остеклённая садовая комната днём с видимым интерьером.', de: 'Verglastes Gartenzimmer bei Tageslicht mit sichtbarem Innenraum.', fr: 'Salon de jardin vitré de jour avec intérieur visible.' },
  'Exterior perspective of a contemporary garden room extension.': { ru: 'Экстерьерный ракурс современной пристройки садовой комнаты.', de: 'Außenperspektive einer modernen Gartenzimmer-Erweiterung.', fr: 'Perspective extérieure d’une extension contemporaine de salon de jardin.' },
  'Garden room facade with a dark structural frame and glazing.': { ru: 'Фасад садовой комнаты с тёмным каркасом и остеклением.', de: 'Fassade des Gartenzimmers mit dunklem Tragwerk und Verglasung.', fr: 'Façade du salon de jardin avec structure sombre et vitrage.' },
  'Second daylight perspective of the garden room and landscape.': { ru: 'Второй дневной ракурс садовой комнаты и окружающего ландшафта.', de: 'Zweite Tageslichtperspektive von Gartenzimmer und Landschaft.', fr: 'Seconde perspective diurne du salon de jardin et du paysage.' },
  'Product visualization': { ru: 'Визуализация продукта', de: 'Produktvisualisierung', fr: 'Visualisation produit' },
  'Interior furniture': { ru: 'Мебель в интерьере', de: 'Möbel im Interieur', fr: 'Mobilier intérieur' },
  'Furniture detail CGI': { ru: 'CGI деталей мебели', de: 'CGI-Möbeldetail', fr: 'Détail de mobilier CGI' },
  'E-commerce product CGI': { ru: 'CGI продукта для e-commerce', de: 'E-Commerce-Produkt-CGI', fr: 'Produit CGI pour e-commerce' },
  'Furniture collection 01': { ru: 'Коллекция мебели 01', de: 'Möbelkollektion 01', fr: 'Collection de mobilier 01' },
  'Furniture collection 02': { ru: 'Коллекция мебели 02', de: 'Möbelkollektion 02', fr: 'Collection de mobilier 02' },
  'Gaming desk visualization': { ru: 'Визуализация игрового стола', de: 'Visualisierung Gaming-Tisch', fr: 'Visualisation bureau gaming' },
  'Office desk visualization': { ru: 'Визуализация офисного стола', de: 'Visualisierung Bürotisch', fr: 'Visualisation bureau professionnel' },
  'Workstation visualization': { ru: 'Визуализация рабочего места', de: 'Arbeitsplatzvisualisierung', fr: 'Visualisation poste de travail' },
  'Executive desk visualization': { ru: 'Визуализация кабинета руководителя', de: 'Visualisierung Chefschreibtisch', fr: 'Visualisation bureau de direction' },
  'Storage system': { ru: 'Система хранения', de: 'Aufbewahrungssystem', fr: 'Système de rangement' },
  'Armchair study 01': { ru: 'Исследование кресла 01', de: 'Sesselstudie 01', fr: 'Étude de fauteuil 01' },
  'Armchair study 02': { ru: 'Исследование кресла 02', de: 'Sesselstudie 02', fr: 'Étude de fauteuil 02' },
  'Fireplace system 01': { ru: 'Каминная система 01', de: 'Kaminsystem 01', fr: 'Système de cheminée 01' },
  'Fireplace system 02': { ru: 'Каминная система 02', de: 'Kaminsystem 02', fr: 'Système de cheminée 02' },
  'Optical retail display 01': { ru: 'Оптическая витрина 01', de: 'Optik-Verkaufsdisplay 01', fr: 'Présentoir optique 01' },
  'Optical showroom 01': { ru: 'Оптический шоурум 01', de: 'Optik-Showroom 01', fr: 'Showroom optique 01' },
  'Optical showroom 03': { ru: 'Оптический шоурум 03', de: 'Optik-Showroom 03', fr: 'Showroom optique 03' },
  'Optical retail display 03': { ru: 'Оптическая витрина 03', de: 'Optik-Verkaufsdisplay 03', fr: 'Présentoir optique 03' },
  'Architectural staircase 01': { ru: 'Архитектурная лестница 01', de: 'Architekturtreppe 01', fr: 'Escalier architectural 01' },
  'Staircase detail 01': { ru: 'Деталь лестницы 01', de: 'Treppendetail 01', fr: 'Détail d’escalier 01' },
  'Architectural staircase 02': { ru: 'Архитектурная лестница 02', de: 'Architekturtreppe 02', fr: 'Escalier architectural 02' },
  'Staircase detail 02': { ru: 'Деталь лестницы 02', de: 'Treppendetail 02', fr: 'Détail d’escalier 02' },
  'Suspended glass partition system': { ru: 'Подвесная стеклянная перегородка', de: 'Abgehängtes Glastrennwandsystem', fr: 'Système de cloison vitrée suspendue' },
  'Sliding partition interior': { ru: 'Раздвижная перегородка в интерьере', de: 'Schiebetrennwand im Interieur', fr: 'Cloison coulissante intérieure' },
  'Garden room — night study 01': { ru: 'Садовая комната — ночь 01', de: 'Gartenzimmer — Nachtstudie 01', fr: 'Salon de jardin — nuit 01' },
  'Garden room — night study 02': { ru: 'Садовая комната — ночь 02', de: 'Gartenzimmer — Nachtstudie 02', fr: 'Salon de jardin — nuit 02' },
  'Garden room — daylight study 01': { ru: 'Садовая комната — дневной свет 01', de: 'Gartenzimmer — Tageslichtstudie 01', fr: 'Salon de jardin — lumière du jour 01' },
  'Garden room — exterior study 01': { ru: 'Садовая комната — экстерьер 01', de: 'Gartenzimmer — Außenstudie 01', fr: 'Salon de jardin — extérieur 01' },
  'Garden room — dark frame': { ru: 'Садовая комната — тёмная рама', de: 'Gartenzimmer — dunkler Rahmen', fr: 'Salon de jardin — cadre sombre' },
  'Garden room — daylight study 02': { ru: 'Садовая комната — дневной свет 02', de: 'Gartenzimmer — Tageslichtstudie 02', fr: 'Salon de jardin — lumière du jour 02' },
  'Door mechanism': { ru: 'Механизм двери', de: 'Türmechanismus', fr: 'Mécanisme de porte' },
  'Furniture modelling': { ru: 'Моделирование мебели', de: 'Möbelmodellierung', fr: 'Modélisation de mobilier' },
  'Manual system animation': { ru: 'Анимация ручной системы', de: 'Animation eines manuellen Systems', fr: 'Animation d’un système manuel' },
  Nurigami: { ru: 'Nurigami', de: 'Nurigami', fr: 'Nurigami' },
  'TOPLED Shelf Panel': { ru: 'Панель TOPLED Shelf', de: 'TOPLED-Regalpanel', fr: 'Panneau d’étagère TOPLED' },
  'Mokko +2Color': { ru: 'Mokko +2Color', de: 'Mokko +2Color', fr: 'Mokko +2Color' },
  'Garage storage configurations': { ru: 'Конфигурации хранения для гаража', de: 'Garagen-Aufbewahrungskonfigurationen', fr: 'Configurations de rangement pour garage' },
  'Fireplace motion 01': { ru: 'Анимация камина 01', de: 'Kaminanimation 01', fr: 'Animation de cheminée 01' },
  'Fireplace motion 02': { ru: 'Анимация камина 02', de: 'Kaminanimation 02', fr: 'Animation de cheminée 02' },
  'Fireplace study': { ru: 'Исследование камина', de: 'Kaminstudie', fr: 'Étude de cheminée' },
  'Fireplace composition 02': { ru: 'Каминная композиция 02', de: 'Kaminkomposition 02', fr: 'Composition cheminée 02' },
  'Fireplace product animation': { ru: 'Продуктовая анимация камина', de: 'Produktanimation Kamin', fr: 'Animation produit cheminée' },
  'Product animation': { ru: 'Анимация продукта', de: 'Produktanimation', fr: 'Animation produit' },
  'Short film': { ru: 'Короткометражный фильм', de: 'Kurzfilm', fr: 'Court métrage' },
  'Music video': { ru: 'Музыкальный клип', de: 'Musikvideo', fr: 'Clip musical' },
  'Animated film': { ru: 'Анимационный фильм', de: 'Animationsfilm', fr: 'Film d’animation' },
  'Character film': { ru: 'Персонажный фильм', de: 'Charakterfilm', fr: 'Film de personnage' },
  'CGI film': { ru: 'CGI-фильм', de: 'CGI-Film', fr: 'Film CGI' },
  'Product film': { ru: 'Продуктовый фильм', de: 'Produktfilm', fr: 'Film produit' },
  'Из руин': { en: 'From the Ruins', de: 'Aus den Ruinen', fr: 'Des ruines' },
  'Скажи мне': { en: 'Tell Me', de: 'Sag es mir', fr: 'Dis-moi' },
  'Союзмультфильм — 90 лет': { en: 'Soyuzmultfilm — 90 Years', de: 'Sojusmultfilm — 90 Jahre', fr: 'Soyuzmultfilm — 90 ans' },

  'На чём сидел': { en: 'What was he sitting on?', de: 'Worauf saß er?', fr: 'Sur quoi était-il assis ?', ru: 'На чём сидел' },
  'Стив Джобс?': { en: 'Steve Jobs?', de: 'Steve Jobs?', fr: 'Steve Jobs ?', ru: 'Стив Джобс?' },
  'Ответ на обложку': { en: 'Cover reply', de: 'Antwort auf dem Cover', fr: 'Réponse en couverture', ru: 'Ответ на обложку' },
  'На полу': { en: 'On the floor', de: 'Auf dem Boden', fr: 'Sur le sol', ru: 'На полу' },
  'В 1982 году Стив Джобс уже мог позволить себе практически любую мебель. Но на фотографии Дианы Уокер он сидит прямо на деревянном полу. Рядом — чай и пластинки. Сзади — стереосистема. Над ним — лампа Tiffany. Дивана нет. Кресла нет. Стола практически тоже нет.': {
    en: "In 1982, Steve Jobs could already afford almost any furniture. But in Diana Walker's photograph he is sitting directly on the wooden floor. Nearby are tea and records. In the back is a stereo system. Above it is a Tiffany lamp. There is no sofa. There is no chair. There is practically no table either.",
    de: 'Steve Jobs konnte sich bereits 1982 fast alle Möbel leisten. Aber auf dem Foto von Diana Walker sitzt er direkt auf dem Holzboden. In der Nähe gibt es Tee und Schallplatten. Hinten ist eine Stereoanlage. Darüber befindet sich eine Tiffany-Lampe. Es gibt kein Sofa, keinen Stuhl und praktisch auch keinen Tisch.',
    fr: 'En 1982, Steve Jobs pouvait déjà s’offrir presque tous les meubles. Pourtant, sur la photographie de Diana Walker, il est assis directement sur le parquet. À côté de lui : du thé et des disques. Derrière : une chaîne hi-fi. Au-dessus : une lampe Tiffany. Pas de canapé, pas de fauteuil et pratiquement pas de table.',
  },
  'Если бы MROOM существовал тогда: «Объекты для замены не обнаружены».': { en: 'If MROOM had existed then: “No objects found to replace.”', de: 'Wenn es MROOM damals gegeben hätte: „Keine zu ersetzenden Objekte gefunden.“', fr: 'Si MROOM avait existé à l’époque : « Aucun objet à remplacer détecté. »' },
  'Вудсайд, Калифорния · 1982': { en: 'Woodside, California · 1982', de: 'Woodside, Kalifornien · 1982', fr: 'Woodside, Californie · 1982' },
  'Миллионер без дивана': { en: 'Millionaire without a sofa', de: 'Millionär ohne Sofa', fr: 'Millionnaire sans canapé' },
  'Apple уже вышла на биржу, а её молодой сооснователь мог позволить себе практически любую мебель. Пустая комната была не экономией, а результатом очень строгого отбора вещей.': { en: 'Apple had already gone public, and its young co-founder could afford almost any furniture. The empty room was not an economy, but the result of a very strict selection of things.', de: 'Apple war bereits an die Börse gegangen und sein junger Mitbegründer konnte sich fast jedes Möbelstück leisten. Der leere Raum war keine Sparmaßnahme, sondern das Ergebnis einer sehr strengen Auswahl.', fr: 'Apple était déjà cotée en bourse et son jeune cofondateur pouvait s’offrir presque tous les meubles. La pièce vide n’était pas une économie, mais le résultat d’une sélection extrêmement rigoureuse.' },
  'Джобс не соглашался жить рядом с предметом только потому, что пустой угол принято чем-то заполнять. Каждая вещь должна была оправдать своё присутствие.': { en: 'Jobs did not agree to live next to an object just because it is customary to fill an empty corner with something. Each thing had to justify its presence.', de: 'Jobs wollte nicht mit einem Gegenstand leben, nur weil man eine leere Ecke üblicherweise füllt. Jedes Ding musste seine Anwesenheit rechtfertigen.', fr: 'Jobs refusait de vivre avec un objet simplement parce qu’il est d’usage de remplir un coin vide. Chaque chose devait justifier sa présence.' },
  'Поэтому знаменитый интерьер рассказывает не о недостатке, а о паузе между потребностью и осознанным выбором.': { en: 'Therefore, the famous interior is not about a lack, but about a pause between need and conscious choice.', de: 'Daher erzählt das berühmte Interieur nicht von Mangel, sondern von der Pause zwischen Bedürfnis und bewusster Entscheidung.', fr: 'Ainsi, ce célèbre intérieur ne parle pas de manque, mais d’une pause entre le besoin et le choix conscient.' },
  'На снимке нет ощущения временного жилья: пластинки разложены рядом, техника подключена, свет настроен.': { en: 'The photograph does not feel like temporary housing: the records are laid out, the equipment is connected and the light is set.', de: 'Das Foto wirkt nicht wie eine vorübergehende Unterkunft: Die Platten liegen bereit, die Geräte sind angeschlossen und das Licht ist eingestellt.', fr: 'La photo ne donne pas l’impression d’un logement provisoire : les disques sont disposés, le matériel est branché et la lumière réglée.' },
  'Пустота тоже может быть решением.': { en: 'Emptiness can also be a solution.', de: 'Leere kann auch eine Lösung sein.', fr: 'Le vide peut aussi être une solution.' },
  'год снимка Дианы Уокер': { en: "year of Diana Walker's photograph", de: 'Jahr des Fotos von Diana Walker', fr: 'année de la photo de Diana Walker' },
  'Стартовый набор': { en: 'Starter kit', de: 'Starter-Kit', fr: 'Kit de départ' },
  'Кровать + лампа + Эйнштейн': { en: 'Bed + lamp + Einstein', de: 'Bett + Lampe + Einstein', fr: 'Lit + lampe + Einstein' },
  'Джон Скалли вспоминал, что в доме Джобса почти ничего не было. Среди немногочисленных предметов — изображение Эйнштейна, лампа Tiffany, кресло и кровать.': { en: "John Sculley recalled that there was almost nothing in Jobs's house. A few items included an image of Einstein, a Tiffany lamp, an armchair and a bed.", de: 'John Sculley erinnerte sich, dass es in Jobs’ Haus fast nichts gab. Zu den wenigen Dingen gehörten ein Bild von Einstein, eine Tiffany-Lampe, ein Sessel und ein Bett.', fr: 'John Sculley se souvenait qu’il n’y avait presque rien chez Jobs. Parmi les rares objets : une image d’Einstein, une lampe Tiffany, un fauteuil et un lit.' },
  'Это уже звучит не как интерьер, а как стартовый набор персонажа в очень странной компьютерной игре.': { en: 'This no longer sounds like an interior, but like a starting character set in a very strange computer game.', de: 'Das klingt nicht mehr wie ein Interieur, sondern wie die Startausstattung einer Figur in einem sehr seltsamen Computerspiel.', fr: 'Cela ne ressemble plus à un intérieur, mais au kit de départ d’un personnage dans un jeu vidéo très étrange.' },
  'Но за странностью скрывался принцип: если вещь находится рядом каждый день, она должна заслужить это место.': { en: 'But behind the strangeness there was a principle: if a thing is nearby every day, it must earn its place.', de: 'Doch hinter der Seltsamkeit stand ein Prinzip: Wenn ein Gegenstand jeden Tag in der Nähe ist, muss er sich seinen Platz verdienen.', fr: 'Mais derrière cette étrangeté se cachait un principe : si un objet est là chaque jour, il doit mériter sa place.' },
  'Самое знаменитое кресло Стива Джобса — пол.': { en: "Steve Jobs' most famous chair is the floor.", de: 'Der berühmteste Stuhl von Steve Jobs ist der Boden.', fr: 'Le fauteuil le plus célèbre de Steve Jobs, c’est le sol.' },
  'кровать · лампа · Эйнштейн': { en: 'bed · lamp · Einstein', de: 'Bett · Lampe · Einstein', fr: 'lit · lampe · Einstein' },
  'Но одну вещь он выбрал': { en: 'But he chose one thing', de: 'Aber eine Sache wählte er aus', fr: 'Mais il avait choisi un objet' },
  'Чертовски хорошая лампа': { en: 'A damn good lamp', de: 'Eine verdammt gute Lampe', fr: 'Une sacrément belle lampe' },
  'Декоративное стекло, сложный орнамент и тёплый свет — совсем не тот образ, который позднее станет ассоциироваться с Apple.': { en: 'Decorative glass, complex patterns and warm light are not at all the image that would later become associated with Apple.', de: 'Dekoratives Glas, komplexe Ornamente und warmes Licht entsprechen keineswegs dem Bild, das später mit Apple verbunden wurde.', fr: 'Verre décoratif, ornement complexe et lumière chaude : rien à voir avec l’image qui sera plus tard associée à Apple.' },
  'Джобса интересовал не минимализм ради пустоты. Его интересовал отбор: одна вещь вместо десяти, но с характером и качеством исполнения.': { en: 'Jobs was not interested in minimalism for the sake of emptiness. He was interested in selection: one thing instead of ten, but with character and quality of execution.', de: 'Jobs interessierte sich nicht für Minimalismus um der Leere willen. Ihn interessierte die Auswahl: eine Sache statt zehn, aber mit Charakter und Ausführungsqualität.', fr: 'Jobs ne s’intéressait pas au minimalisme pour le vide. Il s’intéressait au choix : un objet au lieu de dix, mais avec du caractère et une vraie qualité d’exécution.' },
  'Лампа показывает важную разницу между стерильностью и осознанностью. Строгий интерьер не обязан быть безличным.': { en: 'The lamp reveals an important difference between sterility and conscious restraint. A rigorous interior does not have to be impersonal.', de: 'Die Lampe zeigt den wichtigen Unterschied zwischen Sterilität und bewusster Reduktion. Ein strenges Interieur muss nicht unpersönlich sein.', fr: 'La lampe montre une différence essentielle entre stérilité et sobriété consciente. Un intérieur rigoureux n’a pas besoin d’être impersonnel.' },
  'На фоне пустых стен её цветное стекло работает почти как самостоятельный объект искусства.': { en: 'Against the empty walls, its coloured glass works almost like an independent work of art.', de: 'Vor den leeren Wänden wirkt ihr farbiges Glas fast wie ein eigenständiges Kunstwerk.', fr: 'Sur le fond des murs vides, son verre coloré agit presque comme une œuvre d’art autonome.' },
  'Тепло создаёт не количество предметов, а один точно выбранный источник света.': { en: 'Warmth comes not from the number of objects, but from one precisely chosen light source.', de: 'Wärme entsteht nicht durch die Anzahl der Dinge, sondern durch eine präzise gewählte Lichtquelle.', fr: 'La chaleur ne vient pas du nombre d’objets, mais d’une source lumineuse choisie avec précision.' },
  'Выразительный акцент лучше добавлять после того, как понятна основа комнаты.': { en: 'An expressive accent is best added after the foundation of the room is clear.', de: 'Einen ausdrucksstarken Akzent setzt man am besten, wenn die Grundlage des Raums klar ist.', fr: 'Un accent expressif s’ajoute mieux une fois la base de la pièce clairement définie.' },
  'Одна выразительная вещь сильнее десяти случайных.': { en: 'One expressive thing is stronger than ten random ones.', de: 'Eine ausdrucksstarke Sache ist stärker als zehn zufällige.', fr: 'Un objet expressif est plus fort que dix objets choisis au hasard.' },
  '1 акцент': { en: '1 accent', de: '1 Akzent', fr: '1 accent' }, 'вместо визуального шума': { en: 'instead of visual noise', de: 'statt visuellem Rauschen', fr: 'au lieu du bruit visuel' },
  '3 вещи': { en: '3 things', de: '3 Dinge', fr: '3 objets' },
  'Аудиосистема вместо мебели': { en: 'Audio system instead of furniture', de: 'Audiosystem statt Möbel', fr: 'Un système audio plutôt que des meubles' },
  'Диван — необязательно. Хороший звук — обязательно': { en: 'Sofa — optional. Good sound — essential', de: 'Sofa – optional. Guter Klang – unverzichtbar', fr: 'Canapé facultatif. Bon son indispensable' },
  'WIRED изучил знаменитую фотографию и попытался определить компоненты системы. Среди техники была серьёзная аудиофильская аппаратура и проигрыватель Michell GyroDec.': { en: 'WIRED studied the famous photograph and tried to identify the components of the system. Among the equipment was serious audiophile gear and a Michell GyroDec turntable.', de: 'WIRED untersuchte das berühmte Foto und versuchte, die Komponenten der Anlage zu identifizieren. Dazu gehörten ernsthafte audiophile Geräte und ein Michell-GyroDec-Plattenspieler.', fr: 'WIRED a étudié la célèbre photographie et tenté d’identifier les composants du système. Parmi les équipements figuraient du matériel audiophile sérieux et une platine Michell GyroDec.' },
  'Джобс окружал себя не большим количеством вещей, а предметами, в которых видел идею.': { en: 'Jobs surrounded himself not with a lot of things, but with objects in which he saw an idea.', de: 'Jobs umgab sich nicht mit vielen Dingen, sondern mit Objekten, in denen er eine Idee sah.', fr: 'Jobs ne s’entourait pas de beaucoup de choses, mais d’objets dans lesquels il voyait une idée.' },
  'Музыка получила место раньше дивана. Функция и качество переживания были важнее привычного набора мебели.': { en: 'Music found its place before the sofa did. Function and the quality of the experience mattered more than a conventional furniture set.', de: 'Die Musik bekam ihren Platz vor dem Sofa. Funktion und Erlebnisqualität waren wichtiger als eine konventionelle Möblierung.', fr: 'La musique a trouvé sa place avant le canapé. La fonction et la qualité de l’expérience comptaient davantage qu’un ensemble de meubles conventionnel.' },
  'Аудиосистема занимает визуально скромное место, но определяет назначение всей комнаты.': { en: 'The audio system takes up little visual space, but defines the purpose of the entire room.', de: 'Die Audioanlage nimmt optisch wenig Raum ein, bestimmt aber die Funktion des ganzen Zimmers.', fr: 'Le système audio occupe peu d’espace visuel, mais définit la fonction de toute la pièce.' },
  'Сначала выбирается важное действие, затем свет и техника, и только после этого — мебель.': { en: 'First comes the important activity, then light and technology, and only after that — furniture.', de: 'Zuerst kommt die wichtige Tätigkeit, dann Licht und Technik und erst danach die Möbel.', fr: 'On choisit d’abord l’activité essentielle, puis la lumière et la technologie, et seulement ensuite le mobilier.' },
  'Пустая гостиная оказывается не незаконченной, а предельно честной.': { en: 'The empty living room turns out not to be unfinished, but radically honest.', de: 'Das leere Wohnzimmer erweist sich nicht als unfertig, sondern als radikal ehrlich.', fr: 'Le salon vide n’est pas inachevé : il est radicalement honnête.' },
  'Сначала — то, что меняет ощущение от жизни.': { en: 'First — what changes the feeling of life.', de: 'Zuerst das, was das Lebensgefühl verändert.', fr: 'D’abord, ce qui change la sensation de vivre.' },
  'проигрыватель, найденный WIRED': { en: 'turntable identified by WIRED', de: 'von WIRED identifizierter Plattenspieler', fr: 'platine identifiée par WIRED' },
  'Сентябрь 1985 · дома после Apple': { en: 'September 1985 · at home after Apple', de: 'September 1985 · zu Hause nach Apple', fr: 'Septembre 1985 · chez lui après Apple' },
  'Спойлер: диван всё-таки появился': { en: 'Spoiler: the sofa finally appeared', de: 'Spoiler: Das Sofa kam schließlich doch', fr: 'Spoiler : le canapé a fini par apparaître' },
  'Через несколько дней после ухода из Apple фотограф Steve Ringman снял Джобса дома на большом диване.': { en: 'A few days after leaving Apple, photographer Steve Ringman photographed Jobs at home on a large sofa.', de: 'Wenige Tage nach seinem Ausscheiden bei Apple fotografierte Steve Ringman Jobs zu Hause auf einem großen Sofa.', fr: 'Quelques jours après son départ d’Apple, le photographe Steve Ringman a photographié Jobs chez lui sur un grand canapé.' },
  'Мебель у него была, но выбор вещей по-прежнему оставался отдельным проектом.': { en: 'He did own furniture, but choosing things still remained a project in its own right.', de: 'Er besaß Möbel, doch die Auswahl der Dinge blieb weiterhin ein eigenes Projekt.', fr: 'Il avait bien des meubles, mais le choix des objets restait un projet à part entière.' },
  'Семейная теория мебели': { en: 'Family theory of furniture', de: 'Familientheorie der Möbel', fr: 'Théorie familiale du mobilier' },
  'В чём назначение дивана?': { en: 'What is the purpose of a sofa?', de: 'Wozu dient ein Sofa?', fr: 'À quoi sert un canapé ?' },
  '— Стив, нам нужен диван. — Зачем? — Чтобы сидеть. — Но что значит сидеть? — Стив…': { en: '— Steve, we need a sofa. — Why? — To sit. — But what does sitting mean? — Steve…', de: '— Steve, wir brauchen ein Sofa. — Warum? — Zum Sitzen. — Aber was bedeutet Sitzen? — Steve …', fr: '— Steve, il nous faut un canapé. — Pourquoi ? — Pour s’asseoir. — Mais que signifie s’asseoir ? — Steve…' },
  'Где-то в этот момент обычный человек уже нажал «Оформить доставку». Стив Джобс продолжал исследование.': { en: 'Somewhere at this point, the average person has already clicked “Order delivery.” Steve Jobs continued his research.', de: 'Irgendwann hätte ein normaler Mensch bereits auf „Lieferung bestellen“ geklickt. Steve Jobs setzte seine Untersuchung fort.', fr: 'À ce stade, une personne ordinaire aurait déjà cliqué sur « Commander la livraison ». Steve Jobs poursuivait son exploration.' },
  'Для большинства: понравилось → подходит → цена нормальная → берём. Для Джобса бытовое решение превращалось в вопрос о том, как мы вообще хотим жить.': { en: 'For most people: like it → it fits → the price is fine → buy it. For Jobs, an everyday decision became a question of how we want to live at all.', de: 'Für die meisten: gefällt → passt → Preis okay → kaufen. Für Jobs wurde eine Alltagsentscheidung zur Frage, wie wir überhaupt leben wollen.', fr: 'Pour la plupart : ça plaît → ça convient → le prix est correct → on achète. Pour Jobs, une décision ordinaire devenait une question sur la manière dont nous voulons vivre.' },
  'Восемь. Лет. Обсуждений.': { en: 'Eight. Years. Of discussion.', de: 'Acht. Jahre. Diskussionen.', fr: 'Huit. Années. De discussions.' },
  '8 лет': { en: '8 years', de: '8 Jahre', fr: '8 ans' }, 'теоретического выбора мебели': { en: 'of theoretical furniture selection', de: 'theoretischer Möbelauswahl', fr: 'de choix théorique du mobilier' },
};

function detectLocale(): Locale {
  const query = new URLSearchParams(window.location.search).get('lang')?.toLowerCase();
  if (query && supportedLocales.includes(query as Locale)) return query as Locale;
  const stored = window.localStorage.getItem('3dsofa_locale')?.toLowerCase();
  if (stored && supportedLocales.includes(stored as Locale)) return stored as Locale;
  const candidates = [...(navigator.languages ?? []), navigator.language].filter(Boolean);
  const regionLocales: Record<string, Locale> = {
    RU: 'ru', BY: 'ru', KZ: 'ru', KG: 'ru',
    DE: 'de', AT: 'de', CH: 'de', LI: 'de',
    FR: 'fr', BE: 'fr', LU: 'fr', MC: 'fr',
  };
  for (const candidate of candidates) {
    const region = candidate.split('-')[1]?.toUpperCase();
    if (region && regionLocales[region]) return regionLocales[region];
  }
  for (const candidate of candidates) {
    const language = candidate.toLowerCase().split('-')[0];
    if (language !== 'en' && supportedLocales.includes(language as Locale)) return language as Locale;
  }
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (/Moscow|Kaliningrad|Samara|Yekaterinburg|Omsk|Krasnoyarsk|Irkutsk|Yakutsk|Vladivostok|Magadan|Kamchatka|Minsk/i.test(timezone)) return 'ru';
  if (/Berlin|Vienna|Zurich|Busingen|Vaduz/i.test(timezone)) return 'de';
  if (/Paris|Brussels|Luxembourg|Monaco/i.test(timezone)) return 'fr';
  return 'en';
}

type I18nValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (source: string, values?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nValue>({ locale: 'en', setLocale: () => undefined, t: (source) => source });

export function I18nProvider({ children, initialLocale }: { children: React.ReactNode; initialLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale ?? 'en');

  useEffect(() => {
    if (initialLocale) return;
    const frame = window.requestAnimationFrame(() => {
      const detectedLocale = detectLocale();
      setLocaleState(detectedLocale);
      if (!/^\/(en|ru|de|fr)(?:\/|$)/.test(window.location.pathname)) {
        window.location.replace(`/${detectedLocale}/${window.location.hash}`);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [initialLocale]);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem('3dsofa_locale', locale);
    const metadata = {
      en: ['Architectural & Product 3D Visualization | 3Dsofa', '3Dsofa creates architectural and interior visualizations, product CGI, technical animation, cinematic work and catalogue design.'],
      ru: ['Архитектурная и продуктовая 3D-визуализация | 3Dsofa', '3Dsofa создаёт архитектурные и интерьерные визуализации, CGI продуктов, техническую анимацию, кино и дизайн каталогов.'],
      de: ['Architektur- & Produktvisualisierung | 3Dsofa', '3Dsofa erstellt Architektur- und Interieurvisualisierungen, Produkt-CGI, technische Animationen, Film und Katalogdesign.'],
      fr: ['Visualisation 3D architecturale & produit | 3Dsofa', '3Dsofa crée des visualisations architecturales et intérieures, des CGI produits, des animations techniques, des films et des catalogues.'],
    } as const;
    document.title = metadata[locale][0];
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', metadata[locale][1]);
  }, [locale]);

  const value = useMemo<I18nValue>(() => ({
    locale,
    setLocale(nextLocale) {
      setLocaleState(nextLocale);
      window.localStorage.setItem('3dsofa_locale', nextLocale);
      window.location.assign(`/${nextLocale}/${window.location.hash}`);
    },
    t(source, values) {
      let result = localizedPhrases[source]?.[locale] ?? (locale === 'en' ? source : (translations[locale]?.[source] ?? source));
      Object.entries(values ?? {}).forEach(([key, replacement]) => {
        result = result.replace(`{${key}}`, String(replacement));
      });
      return result;
    },
  }), [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
