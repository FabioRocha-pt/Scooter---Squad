const fs = require('fs');
const postcss = require('postcss');
const CSS = fs.readFileSync(require('path').join(__dirname,'..','site','assets','style.css'),'utf8');
const raiz = postcss.parse(CSS);

/* regras por ordem do documento, com as condições @media do antepassado */
const regras = [];
raiz.walkRules(regra => {
  if (regra.parent && regra.parent.type === 'atrule' && /keyframes/.test(regra.parent.name)) return;
  let media = null;
  let p = regra.parent;
  while (p) {
    if (p.type === 'atrule' && p.name === 'media') {
      const c = p.params;
      media = {
        maxW: (/max-width:\s*(\d+)px/.exec(c) || [])[1],
        minW: (/min-width:\s*(\d+)px/.exec(c) || [])[1],
        maxH: /max-height/.test(c), red: /prefers-reduced-motion/.test(c)
      };
    }
    p = p.parent;
  }
  const decls = {};
  regra.walkDecls(d => { decls[d.prop] = d.value; });
  regra.selectors.forEach(s => regras.push({ media, selector: s.trim(), decls }));
});

function aplica(sel, prop, largura) {
  let valor = null;
  for (const r of regras) {            /* ordem do documento: o último a aplicar-se ganha */
    if (r.selector !== sel || !(prop in r.decls)) continue;
    if (r.media) {
      if (r.media.red || r.media.maxH) continue;
      if (r.media.maxW && largura > +r.media.maxW) continue;
      if (r.media.minW && largura < +r.media.minW) continue;
    }
    valor = r.decls[prop];
  }
  return valor;
}
const colunas = v => {
  if (!v) return null;
  const t = v.trim();
  if (t === '1fr') return 1;
  const rep = /repeat\(\s*(\d+)/.exec(t); if (rep) return +rep[1];
  if (/auto-fit|auto-fill/.test(t)) return 'auto';
  return t.split(/\s+(?![^(]*\))/).length;
};

const L = [1440, 1080, 960, 768, 600, 414, 390, 360];
const COMP = [
  ['.features',     {1440:3,1080:2,960:2,768:2,600:1,414:1,390:1,360:1}],
  ['.hours-panel',  {1440:2,1080:2,960:1,768:1,600:1,414:1,390:1,360:1}],
  ['.islands',      {1440:2,1080:2,960:1,768:1,600:1,414:1,390:1,360:1}],
  ['.two',          {1440:2,1080:2,960:1,768:1,600:1,414:1,390:1,360:1}],
  ['.two-prod',     {1440:2,1080:2,960:1,768:1,600:1,414:1,390:1,360:1}],
  ['.contact-grid', {1440:2,1080:2,960:1,768:1,600:1,414:1,390:1,360:1}],
  ['.grid3',        {1440:3,1080:3,960:2,768:2,600:1,414:1,390:1,360:1}],
  ['.fgrid',        {1440:2,1080:2,960:1,768:1,600:1,414:1,390:1,360:1}],
  ['.search',       {1440:5,1080:5,960:2,768:2,600:1,414:1,390:1,360:1}],
  ['footer .fgrid', {1440:4,1080:4,960:2,768:2,600:1,414:1,390:1,360:1}],
  ['.trust',        {1440:2,1080:2,960:2,768:2,600:1,414:1,390:1,360:1}],
  ['.gallery',      {1440:4,1080:4,960:4,768:4,600:4,414:4,390:4,360:4}]
];
let falhas = 0;
console.log('=== COLUNAS EFETIVAS POR LARGURA (! = demasiadas colunas) ===\n');
console.log('componente'.padEnd(15) + L.map(x => String(x).padStart(6)).join(''));
console.log('-'.repeat(15 + L.length * 6));
for (const [sel, lim] of COMP) {
  const linha = L.map(l => {
    const n = colunas(aplica(sel, 'grid-template-columns', l));
    const mal = typeof n === 'number' && n > lim[l];
    if (mal) falhas++;
    return ((mal ? '!' : '') + (n === null ? '·' : n)).padStart(6);
  });
  console.log(sel.padEnd(15) + linha.join(''));
}

console.log('\n=== COMPORTAMENTOS-CHAVE ===');
const checks = [
  ['menu hamburguer aparece no telemóvel',      aplica('.burger','display',600) === 'block'],
  ['menu hamburguer escondido no desktop',      aplica('.burger','display',1440) === 'none'],
  ['menu em lista escondido no telemóvel',      aplica('.nav ul','display',600) === 'none'],
  ['menu em linha no desktop',                  aplica('.nav ul','display',1440) === 'flex'],
  ['widget de pesquisa no fluxo (nunca tapa o texto)', aplica('.search-wrap','position',1440) === 'relative'],
  ['widget mantém-se no fluxo no telemóvel',     ['relative','static'].includes(aplica('.search-wrap','position',600))],
  ['herói perde altura fixa no telemóvel',      aplica('.hero','min-height',600) === 'auto'],
  ['herói mantém 92vh no desktop',              aplica('.hero','min-height',1440) === '92vh'],
  ['cartão de compra deixa de ser sticky',      aplica('.buy-card','position',600) === 'static'],
  ['cartão de compra sticky no desktop',        aplica('.buy-card','position',1440) === 'sticky'],
  ['FAQ com largura de leitura e centrada',     /920px/.test(aplica('.faq-list','max-width',1440)||'') && /auto/.test(aplica('.faq-list','margin-inline',1440)||'')],
  ['tabelas de preços com scroll horizontal',   aplica('.tbl-wrap','overflow-x',360) === 'auto'],
  ['WhatsApp circular no telemóvel',            /50%/.test(aplica('.wa-float a','border-radius',600)||'')],
  ['container reduz margens no telemóvel',      /0 1[58]px/.test(aplica('.container','padding',390)||'')],
  ['botões de sucesso empilham no telemóvel',   aplica('.acts','flex-direction',390) === 'column'],
  ['título do herói reduz no telemóvel',        !!aplica('.hero h1','font-size',390)],
  ['cabeçalhos de secção empilham',             aplica('.sec-head','flex-direction',700) === 'column'],
  ['barra de progresso existe',                 !!aplica('.progress','background',1440)],
  ['animações desligadas se o sistema pedir',   regras.some(r => r.media && r.media.red && /opacity/.test(Object.keys(r.decls).join()))]
];
checks.forEach(([n,ok]) => { console.log(`${ok?'OK  ':'ERRO'} ${n}`); if(!ok) falhas++; });

console.log('\n=== LARGURAS FIXAS (ecrã 360px, área útil 330px) ===');
let t = 0;
regras.forEach(r => {
  ['width','min-width'].forEach(p => {
    const m = /^(\d+)px$/.exec((r.decls[p]||'').trim());
    if (!m || +m[1] <= 330) return;
    const scroll = /table\.price|\.tbl-wrap|\.lang-menu/.test(r.selector);
    console.log(`${scroll?'ok  ':'VER '} ${r.selector} → ${p}:${r.decls[p]}${scroll?'  (em contentor com scroll / menu flutuante)':''}`);
    if (!scroll) t++;
  });
});
if (!t) console.log('ok   nada transborda');
falhas += t;
console.log('\n' + (falhas ? '>>> ' + falhas + ' problema(s)' : '>>> RESPONSIVIDADE VALIDADA'));
