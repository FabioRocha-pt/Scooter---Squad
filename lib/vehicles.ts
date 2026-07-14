export interface Vehicle {
  slug: string;
  name: string;
  type: 'Scooter' | 'Quad';
  cc: string;
  licence: string;
  pricePerDay: string;
  priceNote: string;
  islands: string;
  img: string;
  gallery: string[];
  description: string[];
  specs: [string, string][];
  colors: { name: string; hex: string }[];
  has3d?: boolean;
}

const CDN = 'https://www.scooter-quad.com/wp-content/uploads';

export const VEHICLES: Vehicle[] = [
  {
    slug: 'taro-storm-t9',
    name: 'Taro Storm T9',
    type: 'Scooter',
    cc: '125 cc',
    licence: 'Carta A1',
    pricePerDay: '32 € / dia',
    priceNote: '100 km/dia incluídos',
    islands: 'Santiago · São Vicente',
    img: `${CDN}/2024/03/noleggi-300x225.jpg`,
    gallery: [
      `${CDN}/2025/01/novo-1024x1024.jpg`,
      `${CDN}/2024/03/noleggi-300x225.jpg`,
      `${CDN}/2024/03/scooter-home.jpg`,
      `${CDN}/2024/03/scooter-santiago.jpg`,
    ],
    description: [
      'A Taro Storm T9 125cc é a scooter mais procurada da nossa frota — ágil no trânsito, económica no consumo e ideal tanto para o dia a dia na cidade como para explorar a ilha.',
      'Todas as unidades são verificadas diariamente na nossa oficina. Capacete e seguro incluídos, caução devolvida na entrega.',
    ],
    specs: [
      ['Modelo', 'Taro Storm T9'],
      ['Tipo', 'Scooter'],
      ['Cilindrada', '125 cc'],
      ['Carta de condução', 'Categoria A1'],
      ['Lugares', '2 (condutor + passageiro)'],
      ['Km incluídos', '100 km/dia'],
      ['Depósito', '50% para confirmar'],
      ['Cancelamento', 'Gratuito até 24h antes'],
    ],
    colors: [
      { name: 'Cinzento', hex: '#D6D9DE' },
      { name: 'Preto', hex: '#12161D' },
      { name: 'Vermelho', hex: '#B3202C' },
      { name: 'Azul', hex: '#1E4B8F' },
    ],
    has3d: true,
  },
  {
    slug: 'taro-storm-b-t11',
    name: 'Taro Storm-B T11',
    type: 'Scooter',
    cc: '300 cc',
    licence: 'Carta A',
    pricePerDay: 'Sob consulta',
    priceNote: 'orçamento por email ou WhatsApp',
    islands: 'Santiago · São Vicente',
    img: `${CDN}/2024/03/t11-300x225.jpg`,
    gallery: [`${CDN}/2024/03/t11-300x225.jpg`, `${CDN}/2024/03/scooter-home.jpg`],
    description: [
      'A Storm-B T11 dá-te mais fôlego para as estradas abertas da ilha — 300 cc com estabilidade e conforto para dois, sem perder a agilidade urbana.',
      'Verificada diariamente na nossa oficina. Capacete e seguro incluídos.',
    ],
    specs: [
      ['Modelo', 'Taro Storm-B T11'],
      ['Tipo', 'Scooter'],
      ['Cilindrada', '300 cc'],
      ['Carta de condução', 'Categoria A'],
      ['Lugares', '2 (condutor + passageiro)'],
      ['Depósito', '50% para confirmar'],
      ['Cancelamento', 'Gratuito até 24h antes'],
    ],
    colors: [
      { name: 'Cinzento', hex: '#D6D9DE' },
      { name: 'Preto', hex: '#12161D' },
    ],
  },
  {
    slug: 'taro-huracan-t12',
    name: 'Taro Huracan T12',
    type: 'Scooter',
    cc: '400 cc',
    licence: 'Carta A',
    pricePerDay: 'Sob consulta',
    priceNote: 'orçamento por email ou WhatsApp',
    islands: 'Santiago · São Vicente',
    img: `${CDN}/2025/01/rental.jpg`,
    gallery: [`${CDN}/2025/01/rental.jpg`, `${CDN}/2024/03/T12-300x225.jpg`],
    description: [
      'O topo de gama das nossas scooters: 400 cc para atravessar a ilha com potência de sobra, travagem segura e posição de condução confortável.',
      'Verificada diariamente na nossa oficina. Capacete e seguro incluídos.',
    ],
    specs: [
      ['Modelo', 'Taro Huracan T12'],
      ['Tipo', 'Scooter'],
      ['Cilindrada', '400 cc'],
      ['Carta de condução', 'Categoria A'],
      ['Lugares', '2 (condutor + passageiro)'],
      ['Depósito', '50% para confirmar'],
      ['Cancelamento', 'Gratuito até 24h antes'],
    ],
    colors: [
      { name: 'Preto', hex: '#12161D' },
      { name: 'Vermelho', hex: '#B3202C' },
    ],
  },
  {
    slug: 'cf-moto-500',
    name: 'CF Moto 500',
    type: 'Quad',
    cc: '500 cc',
    licence: 'Carta B',
    pricePerDay: 'Sob consulta',
    priceNote: 'orçamento por email ou WhatsApp',
    islands: 'Santiago',
    img: `${CDN}/2025/01/rental-2.jpg`,
    gallery: [`${CDN}/2025/01/rental-2.jpg`, `${CDN}/2025/01/exc1-1024x576.jpg`],
    description: [
      'Quad 500 cc para sair do asfalto: trilhos, praias e montanha com tração e segurança — conduz-se com carta B.',
      'Verificado diariamente na nossa oficina. Capacetes e seguro incluídos.',
    ],
    specs: [
      ['Modelo', 'CF Moto 500'],
      ['Tipo', 'Quad'],
      ['Cilindrada', '500 cc'],
      ['Carta de condução', 'Categoria B'],
      ['Lugares', '2 (condutor + passageiro)'],
      ['Depósito', '50% para confirmar'],
      ['Cancelamento', 'Gratuito até 24h antes'],
    ],
    colors: [{ name: 'Laranja', hex: '#E25200' }],
  },
  {
    slug: 'g-force-520l',
    name: 'G Force 520L',
    type: 'Quad',
    cc: '500 cc',
    licence: 'Excursões guiadas',
    pricePerDay: '70–100 €',
    priceNote: 'excursão guiada · 2h a 4h',
    islands: 'São Vicente',
    img: `${CDN}/2025/01/exc1-1024x576.jpg`,
    gallery: [`${CDN}/2025/01/exc1-1024x576.jpg`, `${CDN}/2024/03/island-Sao_Vicente.jpg`],
    description: [
      'O quad das nossas excursões guiadas em São Vicente — Mindelo, Salamansa, Baía das Gatas e Calhau com guias em 4 idiomas (PT, EN, FR, ES).',
      'Grupos de 2 a 12 pessoas. Capacetes, seguro e briefing incluídos.',
    ],
    specs: [
      ['Modelo', 'G Force 520L'],
      ['Tipo', 'Quad · excursões'],
      ['Cilindrada', '500 cc'],
      ['Duração', '2h ou 4h'],
      ['Grupo', '2–12 pax'],
      ['Idiomas dos guias', 'PT · EN · FR · ES'],
      ['Depósito', '50% para confirmar'],
    ],
    colors: [{ name: 'Vermelho', hex: '#B3202C' }],
  },
];

export const getVehicle = (slug: string) =>
  VEHICLES.find((v) => v.slug === slug);
