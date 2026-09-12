/**
 * Jedno miejsce na całą treść strony.
 * Podmień telefon, e-mail i liczby — reszta strony zaktualizuje się sama.
 */

export const site = {
  name: 'FAZA',
  tagline: 'Usługi elektryczne',
  phoneLabel: '+48 500 600 700',
  phoneHref: 'tel:+48500600700',
  email: 'kontakt@faza-elektryk.pl',
  area: 'Warszawa i okolice — do 60 km',
} as const

export type NavItem = { label: string; href: string }

export const navItems: NavItem[] = [
  { label: 'O nas', href: '#o-nas' },
  { label: 'Usługi', href: '#uslugi' },
  { label: 'Pomiary', href: '#pomiary' },
  { label: 'Kontakt', href: '#kontakt' },
]

/** Nagłówek hero — każdy element to osobna linia odsłaniana zza maski. */
export const heroHeadline = ['Usługi', 'elektryczne', 'dla domów i firm.'] as const

export const heroSubline =
  'Instalacje, modernizacje, usuwanie awarii i pomiary elektryczne. Dla mieszkań, domów jednorodzinnych i obiektów firmowych.'

/**
 * Zdjęcia sekcji — pliki w public/images. Brakujący plik zastępuje
 * wektorowa ilustracja, więc podmieniać można je pojedynczo.
 */
export const photos = {
  hero: { src: '/images/hero.jpg', alt: 'Nowoczesna rozdzielnica elektryczna z uporządkowanymi zabezpieczeniami' },
  measurements: { src: '/images/pomiary.jpg', alt: 'Miernik instalacji elektrycznych obok protokołu pomiarowego' },
} as const

export const heroTrust = [
  'Profesjonalna obsługa',
  'Bezpieczne instalacje',
  'Precyzyjne pomiary',
] as const

export const marqueeItems = [
  'Instalacje elektryczne',
  'Pomiary',
  'Modernizacje',
  'Usuwanie awarii',
  'Instalacje dla firm',
] as const

export type Service = { index: string; title: string; description: string }

export const services: Service[] = [
  {
    index: '01',
    title: 'Instalacje elektryczne',
    description:
      'Projekt, trasowanie, montaż i uruchomienie. Instalacja prowadzona tak, by służyła przez dekady.',
  },
  {
    index: '02',
    title: 'Pomiary elektryczne',
    description:
      'Pomiary odbiorcze i okresowe zakończone czytelnym protokołem z jednoznaczną oceną.',
  },
  {
    index: '03',
    title: 'Modernizacja instalacji',
    description:
      'Wymiana rozdzielnicy, przewodów i zabezpieczeń — z minimalną ingerencją w wykończone wnętrza.',
  },
  {
    index: '04',
    title: 'Usuwanie awarii',
    description:
      'Diagnostyka zwarć, przepięć i zaników napięcia. Naprawa źródła problemu, nie prowizorka.',
  },
  {
    index: '05',
    title: 'Instalacje w domach i mieszkaniach',
    description:
      'Gniazda, oświetlenie, sterowanie i punkty ładowania — rozplanowane pod realne życie.',
  },
  {
    index: '06',
    title: 'Obsługa firm',
    description:
      'Stała opieka nad instalacją w biurach, lokalach i halach. Przeglądy w ustalonym rytmie.',
  },
]

export const aboutParagraphs = [
  'FAZA to zespół, dla którego instalacja nie kończy się na tym, że światło się zapala. Pracujemy metodycznie: planujemy, prowadzimy, opisujemy i mierzymy.',
  'Efekt naszej pracy zostaje schowany w ścianie i w rozdzielnicy. To właśnie on decyduje o bezpieczeństwie budynku przez kolejne dwadzieścia lat.',
] as const

export const measurementItems = [
  'Pomiary instalacji elektrycznych',
  'Pomiary odbiorcze',
  'Okresowe kontrole',
  'Pomiary ochronne',
  'Protokoły pomiarowe',
] as const

export const reasons = [
  {
    index: '01',
    title: 'Doświadczenie',
    description:
      'Wiedza i praktyka zdobywana przy realnych realizacjach — od mieszkań po instalacje firmowe.',
  },
  {
    index: '02',
    title: 'Precyzja',
    description:
      'Dbamy o każdy detal: opisaną rozdzielnicę, równe trasy i uporządkowane przewody.',
  },
  {
    index: '03',
    title: 'Bezpieczeństwo',
    description:
      'Pracujemy zgodnie z obowiązującymi normami i standardami. Każdy obwód zostaje sprawdzony.',
  },
  {
    index: '04',
    title: 'Terminowość',
    description:
      'Szanujemy czas naszych klientów. Ustalony termin traktujemy jak zobowiązanie.',
  },
] as const

export const processSteps = [
  { index: '01', title: 'Kontakt', description: 'Opisujesz nam swoje potrzeby.' },
  { index: '02', title: 'Wycena', description: 'Analizujemy zakres prac.' },
  { index: '03', title: 'Realizacja', description: 'Wykonujemy usługę.' },
  { index: '04', title: 'Odbiór', description: 'Sprawdzamy efekty i kończymy realizację.' },
] as const

/** Sekcja końcowa. */
export const ctaHeadline = ['Potrzebujesz', 'elektryka?'] as const

export const ctaText =
  'Zajmiemy się instalacją od A do Z — od drobnych napraw i dodatkowych gniazdek, po nowe instalacje, rozdzielnice i pomiary.'
