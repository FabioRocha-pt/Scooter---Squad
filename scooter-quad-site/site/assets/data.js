/* Scooter & Quad — dados do site
   Preços extraídos das tabelas oficiais de 2025 (Pricing-scooter / Pricing-quad).
   Todos os valores incluem IVA. CVE = Escudo cabo-verdiano.
   Para atualizar preços, altera apenas este ficheiro.

   ATUALIZADO após a reunião de setembro de 2026. Ver ALTERACOES-front.md. */

const CONTACTOS = {
  email: 'info@scooter-quad.com',
  mindelo: {
    wa: '+238 9585176', link: 'https://wa.me/2389585176',
    email: 'reservas.mindelo@scooter-quad.com'
  },
  praia: {
    wa: '+238 9544473', link: 'https://wa.me/2389544473',
    email: 'reservas.praia@scooter-quad.com'
  }
};

/* Horário confirmado na reunião de setembro: segunda a domingo,
   com pausa para almoço. Feriados mediante marcação. */
const HORARIO = {
  abre: '09:00', fecha: '18:00',
  manhaAbre: '09:00', manhaFecha: '13:00',
  tardeAbre: '14:00', tardeFecha: '18:00'
};

/* ---------- ALUGUER DE SCOOTER (tarifa base, 100 km/dia incluídos) ---------- */
/* Carta de condução, confirmado pelo cliente a 27/09:
   a Taro T9 tem mesmo 124 cc no livrete, por isso fica em A1.
   As restantes, acima de 125 cc, exigem A. Os quads exigem B. */
const PRECOS_SCOOTER = {
  modelos: [
    { id: 't9',  nome: 'Taro Storm T9',    cc: '124 cc', carta: 'A1' },
    { id: 't11', nome: 'Taro Storm-B T11', cc: '300 cc', carta: 'A' },
    { id: 't12', nome: 'Taro Huracan T12', cc: '400 cc', carta: 'A' }
  ],
  // dias: [ [CVE, EUR] por modelo, na ordem t9, t11, t12 ]
  base: [
    { dias: 1, v: [[3528, 32], [4190, 38], [4741, 43]] },
    { dias: 2, v: [[7057, 64], [8380, 76], [9483, 86]] },
    { dias: 3, v: [[10255, 93], [12019, 109], [13673, 124]] },
    { dias: 4, v: [[13232, 120], [15988, 145], [18194, 165]] },
    { dias: 5, v: [[16540, 150], [19848, 180], [22604, 205]] },
    { dias: 6, v: [[19848, 180], [23817, 216], [27125, 246]] },
    { dias: 7, v: [[23156, 210], [27677, 251], [31536, 286]] }
  ],
  semLimiteKm: [[4631, 42], [5293, 48], [5844, 53]],   // 1 dia, sem limite de km
  kmAdicional: [33, 0.30],                              // por km acima de 100 km/dia
  caucao:      [[16500, 150], [22000, 200], [27500, 250]],
  seguroExtra: [[772, 7], [992, 9], [1323, 12]],        // "no risk", POR DIA
  entrega:     [[1323, 12], [1323, 12], [1323, 12]],    // por trajeto
  entregaAeroporto: 20                                   // EUR, por trajeto
};

/* ---------- ALUGUER DE QUAD (CF 520L) ---------- */
const PRECOS_QUAD = {
  modelo: 'Quad CF 520L · 500 cc · carta B',
  base: [
    { label: '9 horas',  detalhe: '09h às 18h',                v: [11500, 100] },
    { label: '24 horas', detalhe: '09h–09h ou 18h–18h',        v: [16500, 150] },
    { label: '32 horas', detalhe: '09h até às 18h do dia seguinte', v: [22000, 200] },
    { label: '48 horas', detalhe: '09h–09h ou 18h–18h',        v: [27500, 250] }
  ],
  caucao: [27500, 250]
};

/* ---------- EXCURSÕES (só São Vicente) ----------
   Confirmado pelo cliente a 27/09: as duas mantêm-se, com horários diferentes.
   A de 4 horas sai às 09:00 ou às 14:00. A de 2 horas sai só à tarde, às 15:00. */
const EXCURSOES = [
  { horas: 4, nome: 'Volta à Ilha', duplo: 100, individual: 85,
    partidas: ['09:00', '14:00'], ativa: true },
  { horas: 2, nome: 'Costa Norte',  duplo: 85,  individual: 70,
    partidas: ['15:00'], ativa: true }
];
const EXCURSOES_ATIVAS = EXCURSOES.filter(e => e.ativa);

/* ---------- ALUGUER DE AUTOMÓVEIS ----------
   Serviço separado. A viatura pertence à MODU Scooter Boa Soc. Unipessoal Lda,
   detentora do alvará, explorada em parceria comercial pela Scooter & Quad. */
const AUTOMOVEIS = {
  marca: 'Scooter & Quad Rent Cars',
  operador: 'MSB Rent a Car · MODU Scooter Boa, Soc. Unipessoal Lda',
  ilha: 'st',                       // só existe em Santiago, cidade da Praia
  fundo: 'img/D0-carros-fundo.jpg', // imagem de fundo da secção
  /* Viatura real: Renault Duster da segunda geração (2018 a 2024), branco,
     jantes de aço, barras de tejadilho. Fotografias enviadas a 05/10.
     A ficha anterior era da geração nova e foi retirada por não corresponder.
     Só se publica o que está confirmado. Para completar, pedir ao cliente:
     ano, motor (gasolina ou gasóleo), caixa (manual ou automática) e se tem
     ar condicionado. Depois acrescentar em ficha e equipaKeys. */
  modelos: [
    { nome: 'Renault Duster', detalhe: 'SUV · 5 lugares · carta B',
      imgs: ['img/D1-renault-duster-1.jpg', 'img/D1-renault-duster-2.jpg',
             'img/D1-renault-duster-3.jpg', 'img/D1-renault-duster-4.jpg'],
      fichaKeys: ['lugares', 'km'],
      ficha: { lugares: '5', km: 'ilimitados' },
      equipaKeys: [],
      nota: false
    }
  ],
  base: [
    { dias: 1, v: [6616, 60] },
    { dias: 2, v: [13232, 120] },
    { dias: 3, v: [19296, 175] },
    { dias: 4, v: [25361, 230] },
    { dias: 5, v: [31426, 285] },
    { dias: 6, v: [38041, 345] },
    { dias: 7, v: [44106, 400] }
  ],
  /* Confirmado a 27/09: o carro NÃO tem limite de quilómetros.
     Os 10 euros e o limite de 100 km eram erro de transcrição do preçário. */
  semLimiteKm: null,
  kmAdicional: null,
  caucao:      [33080, 300],
  seguroExtra: [1654, 15],      // por dia
  entrega:     [1323, 12],      // por trajeto
  entregaAeroporto: 20
};

/* ---------- FROTA POR ILHA ----------
   imgs[] é a galeria de cada veículo. A primeira é a de capa.
   Fotografias reais da pasta do cliente, tratadas em setembro de 2026.
   Já não dependem do servidor WordPress antigo. */
const FROTA = {
  sv: [
    { id:'sv-t9',  n: 'Taro Storm T9',     cc: '124 cc', carta: 'A1', t: 'scooter', p: 32,
      imgs: ['img/F-t9-1.jpg', 'img/F-t9-2.jpg', 'img/F-t9-3.jpg'] },
    { id:'sv-t11', n: 'Taro Storm-B T11',  cc: '300 cc', carta: 'A', t: 'scooter', p: 38,
      imgs: ['img/F-t11-1.jpg', 'img/F-t11-2.jpg', 'img/F-t11-3.jpg'] },
    { id:'sv-t12', n: 'Taro Huracan T12',  cc: '400 cc', carta: 'A', t: 'scooter', p: 43,
      imgs: ['img/F-t12-1.jpg', 'img/F-t12-2.jpg', 'img/F-t12-3.jpg'] },
    { id:'sv-qd',  n: 'Quad G Force 520L', cc: '500 cc', carta: 'B', t: 'quad', p: 100, hora: true,
      imgs: ['img/F-quad-1.jpg', 'img/F-quad-2.jpg', 'img/F-quad-3.jpg'] }
  ],
  st: [
    { id:'st-t9',  n: 'Taro Storm T9',     cc: '124 cc', carta: 'A1', t: 'scooter', p: 32,
      imgs: ['img/F-t9-1.jpg', 'img/F-t9-2.jpg', 'img/F-t9-3.jpg'] },
    { id:'st-t11', n: 'Taro Storm-B T11',  cc: '300 cc', carta: 'A', t: 'scooter', p: 38,
      imgs: ['img/F-t11-1.jpg', 'img/F-t11-2.jpg', 'img/F-t11-3.jpg'] },
    { id:'st-t12', n: 'Taro Huracan T12',  cc: '400 cc', carta: 'A', t: 'scooter', p: 43,
      imgs: ['img/F-t12-1.jpg', 'img/F-t12-2.jpg', 'img/F-t12-3.jpg'] },
    { id:'st-qd',  n: 'Quad CF 520L',      cc: '500 cc', carta: 'B', t: 'quad', p: 100, hora: true,
      imgs: ['img/F-quad-1.jpg', 'img/F-quad-2.jpg', 'img/F-quad-3.jpg'] },
    { id:'st-mitt', n: 'MITT GT-MAX 330',  cc: '300 cc', carta: 'A', t: 'scooter', p: 38,
      imgs: ['img/E1-mitt-gtmax-330-1.jpg', 'img/E1-mitt-gtmax-330-2.jpg'] }
  ]
};

/* ---------- ILHAS ---------- */
const ILHAS = {
  sv: {
    nome: 'São Vicente', cidade: 'Mindelo', pagina: 'mindelo.html',
    morada: 'Rua Senador Vera Cruz, Mindelo',
    wa: CONTACTOS.mindelo.wa, waLink: CONTACTOS.mindelo.link,
    email: CONTACTOS.mindelo.email,
    img: 'img/B1-sao-vicente.jpg',
    excursoes: true,
    mapa: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.345983012379!2d-24.9865915!3d16.8910001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94f1f003682e777%3A0x6ce8a84422e8fc76!2sScooter%20%26%20Quad%20-%20S%C3%A3o%20Vicente!5e1!3m2!1sit!2sit!4v1737909776688!5m2!1sit!2sit'
  },
  st: {
    nome: 'Santiago', cidade: 'Praia', pagina: 'praia.html',
    morada: 'Palmarejo Baixo, cidade da Praia',
    wa: CONTACTOS.praia.wa, waLink: CONTACTOS.praia.link,
    email: CONTACTOS.praia.email,
    img: 'img/B2-santiago.jpg',
    excursoes: false,
    mapa: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1927.7930483200876!2d-23.5297741!3d14.9044052!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9359906806f94c5%3A0x83b1cac61d159ffc!2sScooter%20%26%20Quad!5e0!3m2!1sit!2sit!4v1709311552927!5m2!1sit!2sit'
  }
};

/* ---------- USADOS À VENDA ----------
   O cliente pediu fotografias reais do próprio veículo, incluindo marcas de uso.
   imgs é uma galeria: a primeira é a de capa. preco: null mostra "sob consulta".
   A matrícula não deve aparecer no site, por decisão do cliente a 27/09. */
const USADOS = [
  { id: 'u1', modelo: 'Taro Huracan T12', cc: '400 cc', carta: 'A', tipo: 'scooter',
    estado: 'disponivel', ano: null, km: null, ilha: 'st', preco: null,
    destaque: true,
    imgs: ['img/U-t12-venda-1.jpg'] },

  { id: 'u2', modelo: 'Taro Storm-B T11', cc: '276 cc', carta: 'A', tipo: 'scooter',
    estado: 'disponivel', ano: 2022, km: 36192, cor: 'Vermelha',
    ilha: 'st', preco: [250000, 2267],
    imgs: ['img/U-t11-st69xr-1.jpg', 'img/U-t11-st69xr-2.jpg', 'img/U-t11-st69xr-3.jpg'] },

  { id: 'u3', modelo: 'Taro Storm T9', cc: '124 cc', carta: 'A1', tipo: 'scooter',
    estado: 'disponivel', ano: 2022, km: 19026,
    ilha: 'st', preco: [165000, 1496],
    imgs: ['img/U-t9-st72xr-1.jpg', 'img/U-t9-st72xr-2.jpg', 'img/U-t9-st72xr-3.jpg'] },

  { id: 'u4', modelo: 'Kawasaki Brute Force 300', cc: '271 cc', carta: 'B', tipo: 'quad',
    estado: 'disponivel', ano: 2019, km: null, cor: 'Preto',
    ilha: 'st', preco: [300000, 2721],
    imgs: ['img/U-kawasaki-bv96ao-1.jpg', 'img/U-kawasaki-bv96ao-2.jpg'] },

  { id: 'u5', modelo: 'Scooter 124 cc', cc: '124 cc', carta: 'A1', tipo: 'scooter',
    estado: 'vendido', ano: null, km: null, ilha: 'st', preco: null,
    imgs: ['img/U-scooter-vendido.jpg'] }
];

/* ---------- AVALIAÇÕES DE CLIENTES ----------
   A PREENCHER PELO CLIENTE. Duas ou três avaliações reais, escolhidas pela
   Scooter & Quad, no idioma original em que foram escritas. Nunca traduzir,
   nunca reescrever, nunca inventar.

   O cliente tem avaliações no Google (aluguer) e no GetYourGuide (excursões).
   Decidido a 27/09: misto, uma de cada, para quem chega perceber que as duas
   coisas funcionam. A origem tem de aparecer sempre, é o que as torna
   verificáveis e é exigido pelas duas plataformas.

   Formato:
   { nome, pais, estrelas, texto, data, idioma, fonte }
   fonte: 'google' ou 'gyg'

   Enquanto a lista estiver vazia, a secção não aparece no site. */
const AVALIACOES = [];

/* Perfis públicos, a fornecer pelo cliente */
const PERFIS = {
  google: '',   // URL do perfil no Google Maps
  gyg:    ''    // URL da página no GetYourGuide
};
const FONTES = {
  google: { nome: 'Google',        chave: 'verGoogle' },
  gyg:    { nome: 'GetYourGuide',  chave: 'verGyg' }
};

/* ---------- IMAGENS SOLTAS ----------
   O logótipo mantém-se exatamente o mesmo. Só muda onde o ficheiro está alojado.
   ATENÇÃO: estas quatro ainda apontam para o servidor WordPress antigo.
   Antes de o desligar, descarregar para site/img/ e corrigir estes caminhos. */
const IMGS = {
  logo:       'img/logo-scooter-quad.png',         /* o mesmo logótipo, agora alojado connosco */
  logoEscuro: 'img/logo-scooter-quad-branco.png',  /* versão a branco, para o rodapé escuro */
  about1:  'img/S1-sobre-1.jpg',
  about2:  'img/S2-sobre-2.jpg',
  oficina: 'img/S3-oficina.jpg'
};

/* ---------- FORMATAÇÃO ----------
   O separador de milhares tem de aparecer sempre: 1000 escreve-se 1.000.
   O toLocaleString não era fiável entre browsers, por isso é feito à mão. */
const fmtCVE = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const fmtEUR = n => (Number.isInteger(n) ? n : n.toFixed(2).replace('.', ',')) + ' €';
const fmtKM  = n => fmtCVE(n) + ' km';
