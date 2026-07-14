/* Catálogo de venda — segue os protótipos scooter-quad-loja/produto.html */

export interface Product {
  slug: string;
  name: string;
  type: 'Scooter' | 'Quad';
  cc: number;
  state: 'novo' | 'usado';
  licence: string;
  promo?: boolean;
  price: string;
  priceNote: string;
  img: string;
  gallery: string[];
  specs: [string, string][];
  chips: string[];
  colors: { name: string; hex: string }[];
  description: string[];
  included: string[];
}

const CDN = 'https://www.scooter-quad.com/wp-content/uploads';

export const PRODUCTS: Product[] = [
  {
    slug: 'taro-storm-t9',
    name: 'Taro Storm T9',
    type: 'Scooter',
    cc: 125,
    state: 'novo',
    licence: 'Carta A1',
    promo: true,
    price: 'desde 8.250 CVE/mês',
    priceNote: 'Financiamento a 100% · parceria Banco Interatlântico · *oferta limitada ao stock existente',
    img: `${CDN}/2025/01/novo-1024x1024.jpg`,
    gallery: [
      `${CDN}/2025/01/novo-1024x1024.jpg`,
      `${CDN}/2024/03/noleggi-300x225.jpg`,
      `${CDN}/2024/03/scooter-home.jpg`,
      `${CDN}/2024/03/scooter-santiago.jpg`,
    ],
    chips: ['125 cc', 'Km 0', 'Garantia 12 meses', 'Várias cores', 'Carta A1'],
    specs: [
      ['Modelo', 'Taro Storm T9'],
      ['Tipo', 'Scooter'],
      ['Cilindrada', '125 cc'],
      ['Carta de condução', 'Categoria A1'],
      ['Estado', 'Nova · Km 0 (zero)'],
      ['Garantia', '12 meses'],
      ['Cores', 'Várias cores disponíveis'],
      ['Lugares', '2 (condutor + passageiro)'],
      ['Entrega', 'Todas as ilhas de Cabo Verde'],
    ],
    colors: [
      { name: 'Cinzento', hex: '#D6D9DE' },
      { name: 'Preto', hex: '#12161D' },
      { name: 'Vermelho', hex: '#B3202C' },
      { name: 'Azul', hex: '#1E4B8F' },
    ],
    description: [
      'A Taro Storm T9 125cc é a scooter mais procurada da nossa loja — ágil no trânsito, económica no consumo e ideal tanto para o dia a dia na cidade como para explorar a ilha. É o mesmo modelo que usamos na nossa frota de aluguer, o que diz tudo sobre a confiança que temos nela.',
      'Entregue nova, Km 0 (zero), com garantia de 12 meses e disponível em várias cores. Todas as unidades são preparadas e verificadas na nossa oficina antes da entrega, e contas com o nosso apoio pré e pós-venda em Cabo Verde.',
    ],
    included: [
      'Scooter nova Km 0 com garantia de 12 meses',
      'Preparação e verificação completa na nossa oficina',
      'Apoio no processo de financiamento (Banco Interatlântico)',
      'Envio para todas as ilhas de Cabo Verde',
      'Assistência pós-venda e manutenção na Praia e no Mindelo',
    ],
  },
  {
    slug: 'taro-storm-b-t11',
    name: 'Taro Storm-B T11',
    type: 'Scooter',
    cc: 300,
    state: 'novo',
    licence: 'Carta A',
    price: 'Sob consulta',
    priceNote: 'orçamento + ficha técnica por email',
    img: `${CDN}/2024/03/t11-300x225.jpg`,
    gallery: [`${CDN}/2024/03/t11-300x225.jpg`, `${CDN}/2024/03/scooter-home.jpg`],
    chips: ['300 cc', 'Km 0', 'Garantia 12 meses', 'Carta A'],
    specs: [
      ['Modelo', 'Taro Storm-B T11'],
      ['Tipo', 'Scooter'],
      ['Cilindrada', '300 cc'],
      ['Carta de condução', 'Categoria A'],
      ['Estado', 'Nova · Km 0 (zero)'],
      ['Garantia', '12 meses'],
      ['Lugares', '2 (condutor + passageiro)'],
      ['Entrega', 'Todas as ilhas de Cabo Verde'],
    ],
    colors: [
      { name: 'Cinzento', hex: '#D6D9DE' },
      { name: 'Preto', hex: '#12161D' },
    ],
    description: [
      'A Storm-B T11 dá-te mais fôlego nas estradas abertas — 300 cc com estabilidade e conforto para dois, sem perder a agilidade urbana.',
      'Entregue nova, Km 0, com garantia de 12 meses. Preparada e verificada na nossa oficina antes da entrega.',
    ],
    included: [
      'Scooter nova Km 0 com garantia de 12 meses',
      'Preparação e verificação completa na nossa oficina',
      'Apoio no processo de financiamento (Banco Interatlântico)',
      'Envio para todas as ilhas de Cabo Verde',
      'Assistência pós-venda e manutenção na Praia e no Mindelo',
    ],
  },
  {
    slug: 'taro-huracan-t12',
    name: 'Taro Huracan T12',
    type: 'Scooter',
    cc: 400,
    state: 'novo',
    licence: 'Carta A',
    price: 'Sob consulta',
    priceNote: 'orçamento + ficha técnica por email',
    img: `${CDN}/2024/03/T12-300x225.jpg`,
    gallery: [`${CDN}/2024/03/T12-300x225.jpg`, `${CDN}/2025/01/rental.jpg`],
    chips: ['400 cc', 'Km 0', 'Garantia 12 meses', 'Carta A'],
    specs: [
      ['Modelo', 'Taro Huracan T12'],
      ['Tipo', 'Scooter'],
      ['Cilindrada', '400 cc'],
      ['Carta de condução', 'Categoria A'],
      ['Estado', 'Nova · Km 0 (zero)'],
      ['Garantia', '12 meses'],
      ['Lugares', '2 (condutor + passageiro)'],
      ['Entrega', 'Todas as ilhas de Cabo Verde'],
    ],
    colors: [
      { name: 'Preto', hex: '#12161D' },
      { name: 'Vermelho', hex: '#B3202C' },
    ],
    description: [
      'O topo de gama das nossas scooters: 400 cc para atravessar a ilha com potência de sobra, travagem segura e posição de condução confortável.',
      'Entregue nova, Km 0, com garantia de 12 meses. Preparada e verificada na nossa oficina antes da entrega.',
    ],
    included: [
      'Scooter nova Km 0 com garantia de 12 meses',
      'Preparação e verificação completa na nossa oficina',
      'Apoio no processo de financiamento (Banco Interatlântico)',
      'Envio para todas as ilhas de Cabo Verde',
      'Assistência pós-venda e manutenção na Praia e no Mindelo',
    ],
  },
  {
    slug: 'quad-500',
    name: 'Quad 500cc',
    type: 'Quad',
    cc: 500,
    state: 'novo',
    licence: 'Carta B',
    price: 'Sob consulta',
    priceNote: 'orçamento + ficha técnica por email',
    img: `${CDN}/2025/01/rental-2.jpg`,
    gallery: [`${CDN}/2025/01/rental-2.jpg`, `${CDN}/2025/01/exc1-1024x576.jpg`],
    chips: ['500 cc', 'Km 0', 'Garantia 12 meses', 'Carta B'],
    specs: [
      ['Modelo', 'Quad 500cc'],
      ['Tipo', 'Quad'],
      ['Cilindrada', '500 cc'],
      ['Carta de condução', 'Categoria B'],
      ['Estado', 'Novo · Km 0 (zero)'],
      ['Garantia', '12 meses'],
      ['Lugares', '2 (condutor + passageiro)'],
      ['Entrega', 'Todas as ilhas de Cabo Verde'],
    ],
    colors: [{ name: 'Laranja', hex: '#E25200' }],
    description: [
      'Quad 500 cc para sair do asfalto: trilhos, praias e montanha com tração e segurança — conduz-se com carta B.',
      'Entregue novo, Km 0, com garantia de 12 meses. Preparado e verificado na nossa oficina antes da entrega.',
    ],
    included: [
      'Quad novo Km 0 com garantia de 12 meses',
      'Preparação e verificação completa na nossa oficina',
      'Apoio no processo de financiamento (Banco Interatlântico)',
      'Envio para todas as ilhas de Cabo Verde',
      'Assistência pós-venda e manutenção na Praia e no Mindelo',
    ],
  },
  {
    slug: 'taro-t12-400-usada',
    name: 'Taro T12 400cc',
    type: 'Scooter',
    cc: 400,
    state: 'usado',
    licence: 'Carta A',
    price: 'Sob consulta',
    priceNote: 'estado e km por email',
    img: `${CDN}/2025/02/scooter-a-venda-T12-400cc.jpg`,
    gallery: [`${CDN}/2025/02/scooter-a-venda-T12-400cc.jpg`, `${CDN}/2024/03/T12-300x225.jpg`],
    chips: ['400 cc', 'Revista na nossa oficina', 'Carta A'],
    specs: [
      ['Modelo', 'Taro T12 400cc'],
      ['Tipo', 'Scooter'],
      ['Cilindrada', '400 cc'],
      ['Carta de condução', 'Categoria A'],
      ['Estado', 'Usada · revista na nossa oficina'],
      ['Entrega', 'Todas as ilhas de Cabo Verde'],
    ],
    colors: [{ name: 'Preto', hex: '#12161D' }],
    description: [
      'Taro T12 400cc usada, totalmente revista na nossa oficina. O estado, a quilometragem e as fotos detalhadas são enviados por email com o orçamento.',
    ],
    included: [
      'Revisão completa na nossa oficina',
      'Envio para todas as ilhas de Cabo Verde',
      'Assistência pós-venda na Praia e no Mindelo',
    ],
  },
];

export const getProduct = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);

/* opções do formulário de contacto */
export const MODEL_OPTIONS = [
  'Taro Storm T9 — 125cc (nova)',
  'Taro Storm-B T11 — 300cc (nova)',
  'Taro Huracan T12 — 400cc (nova)',
  'Quad 500cc (novo)',
  'Taro T12 400cc (usada)',
  'Outro / ainda não sei',
];

export const COLOR_OPTIONS = ['Sem preferência', 'Cinzento', 'Preto', 'Vermelho', 'Azul'];

export const ISLANDS = [
  'Santiago',
  'São Vicente',
  'Boa Vista',
  'Sal',
  'Santo Antão',
  'Fogo',
  'Maio',
  'São Nicolau',
  'Brava',
];

export const CONTACT_EMAIL = 'fapiyou@gmail.com';
export const WHATSAPP = [
  { label: 'Praia', number: '2389544473', display: '+238 9544473' },
  { label: 'Mindelo', number: '2389585176', display: '+238 9585176' },
];
