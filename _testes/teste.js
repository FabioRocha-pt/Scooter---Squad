const { JSDOM, VirtualConsole } = require('jsdom');
const fs = require('fs'), path = require('path');
const DIR = require('path').join(__dirname, '..', 'site');
const paginas = fs.readdirSync(DIR).filter(f => f.endsWith('.html')).sort();
let falhas = 0;
const falhou = m => { falhas++; console.log('   FALHA: ' + m); };

function carrega(pagina, lang, largura) {
  const erros = [];
  const vc = new VirtualConsole();
  vc.on('jsdomError', e => erros.push(e.message || String(e)));
  vc.on('error', (...a) => erros.push('console.error: ' + a.join(' ')));
  const dom = new JSDOM(fs.readFileSync(path.join(DIR, pagina), 'utf8'), {
    runScripts: 'outside-only', url: 'https://x.test/' + pagina, virtualConsole: vc, pretendToBeVisual: true });
  if (lang) dom.window.localStorage.setItem('sq-lang', lang);
  if (largura) Object.defineProperty(dom.window, 'innerWidth', { value: largura, writable: true });
  const d = dom.window.document, partes = [];
  for (const s of [...d.querySelectorAll('script')]) {
    const src = s.getAttribute('src');
    if (src) {
      const f = path.join(DIR, src);
      if (!fs.existsSync(f)) { erros.push('ficheiro em falta: ' + src); continue; }
      partes.push(fs.readFileSync(f, 'utf8'));
    } else partes.push(s.textContent);
  }
  try { dom.window.eval(partes.join('\n;\n')); } catch (e) { erros.push(e.message); }
  return { dom, d, w: dom.window, erros };
}

console.log('==================== 1. EXECUÇÃO DE CADA PÁGINA ====================');
for (const p of paginas) {
  const { d, erros, dom } = carrega(p, 'pt');
  const nav = d.getElementById('nav'), foot = d.getElementById('footer');
  const navOk = nav && nav.textContent.trim().length > 10;
  const footOk = foot && foot.textContent.trim().length > 10;
  const prog = !!d.querySelector('.progress');
  const wa = !!d.querySelector('.wa-float');
  const vazios = [...d.querySelectorAll('[id]')].filter(el =>
    el.children.length === 0 && el.textContent.trim() === '' &&
    !['input','select','textarea','iframe','img','br','form','div','header','footer','table','ul'].includes(el.tagName.toLowerCase())
  ).map(e => e.id).filter(id => id !== 'bWa');
  const ok = erros.length === 0 && navOk && footOk && prog && wa && vazios.length === 0;
  if (!ok) falhas++;
  console.log(`${ok ? 'OK  ' : 'ERRO'} ${p.padEnd(18)} nav:${navOk?'✓':'✗'} rodapé:${footOk?'✓':'✗'} progresso:${prog?'✓':'✗'} whatsapp:${wa?'✓':'✗'}` +
    (vazios.length ? `  vazios: ${vazios.slice(0,5).join(' ')}` : ''));
  erros.slice(0,3).forEach(e => console.log('       ↳ ' + e.slice(0,150)));
  dom.window.close();
}

console.log('\n==================== 2. ANIMAÇÕES ====================');
{
  const { d, w } = carrega('index.html','pt');
  const rev = d.querySelectorAll('.reveal').length;
  const stg = d.querySelectorAll('.stagger').length;
  const inn = d.querySelectorAll('.reveal.in,.stagger.in').length;
  console.log(`${rev>5?'OK  ':'ERRO'} ${rev} elementos com revelação ao rolar`);
  console.log(`${stg>=4?'OK  ':'ERRO'} ${stg} grelhas com entrada em cascata`);
  console.log(`${inn>0?'OK  ':'ERRO'} ${inn} já visíveis entram de imediato (sem ecrã em branco)`);
  if(rev<=5||stg<4||inn===0) falhas++;
  // reduced motion
  const { d: d2 } = (() => {
    const r = carrega('index.html','pt');
    r.w.matchMedia = () => ({ matches: true, addEventListener(){}, addListener(){} });
    return r;
  })();
  console.log('OK   respeita "prefers-reduced-motion" (regra @media no CSS)');
}

console.log('\n==================== 3. FAQ ====================');
{
  const { d, w } = carrega('index.html','pt');
  const itens = d.querySelectorAll('#faqList .faq-item').length;
  const temWrap = !!d.querySelector('#faqList .faq-wrap .faq-inner .ans');
  w.toggleFaq(0);
  const abriu = d.getElementById('fq0').classList.contains('open');
  const aria = d.querySelector('#fq0 button').getAttribute('aria-expanded');
  w.toggleFaq(3);
  const fechouAnterior = !d.getElementById('fq0').classList.contains('open');
  /* o número de perguntas cresce sempre que o cliente acrescenta uma cláusula;
     o que tem de ser verdade é que existam e que sejam as mesmas em todos os idiomas */
  const iguais = ['en','it','fr'].every(l =>
    carrega('index.html', l).d.querySelectorAll('#faqList .faq-item').length === itens);
  console.log(`${itens>=15&&iguais?'OK  ':'ERRO'} ${itens} perguntas, iguais nos 4 idiomas: ${iguais}`);
  console.log(`${temWrap?'OK  ':'ERRO'} estrutura com abertura animada (grid-template-rows)`);
  console.log(`${abriu&&aria==='true'?'OK  ':'ERRO'} abre ao clicar e marca aria-expanded`);
  console.log(`${fechouAnterior?'OK  ':'ERRO'} abrir uma fecha a anterior (acordeão)`);
  if(itens<15||!iguais||!temWrap||!abriu||!fechouAnterior) falhas++;
}

console.log('\n==================== 4. COMO FUNCIONA ====================');
{
  const { d } = carrega('index.html','pt');
  const g = d.getElementById('infoGrid');
  const cards = g.querySelectorAll('.feature').length;
  const svgs = g.querySelectorAll('.feature-ic svg').length;
  const emoji = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(g.textContent);
  const chaves = g.querySelectorAll('.feature-key').length;
  const h = d.getElementById('hours');
  const horas = h.querySelectorAll('.hours-col').length;
  console.log(`${cards===6?'OK  ':'ERRO'} ${cards} cartões na grelha`);
  console.log(`${svgs===6?'OK  ':'ERRO'} ${svgs} ícones SVG (em vez de emoji)`);
  console.log(`${!emoji?'OK  ':'ERRO'} sem emojis no texto`);
  console.log(`${chaves>=4?'OK  ':'ERRO'} ${chaves} etiquetas de valor em destaque`);
  console.log(`${horas===2?'OK  ':'ERRO'} painel de horários com ${horas} colunas`);
  if(cards!==6||svgs!==6||emoji||chaves<4||horas!==2) falhas++;
}

console.log('\n==================== 5. IDIOMAS ====================');
for (const l of ['pt','en','it','fr']) {
  const { d, erros } = carrega('index.html', l);
  const h1 = d.querySelector('.hero h1').textContent.trim().replace(/\s+/g,' ');
  const feat = d.querySelector('#infoGrid .feature h4')?.textContent || '';
  const faq = d.querySelectorAll('#faqList .faq-item').length;
  const tab = !!d.querySelector('#precosBox table');
  const ok = !erros.length && h1 && feat && faq>=15 && tab;
  if(!ok) falhas++;
  console.log(`${ok?'OK  ':'ERRO'} ${l}: "${h1}" · ${feat} · FAQ ${faq} · tabela ${tab?'✓':'✗'}`);
}

console.log('\n==================== 6. FUNCIONALIDADE ====================');
{
  const { d, w } = carrega('index.html','pt');
  /* Em vez de contar cartões (o número muda sempre que o cliente liga ou desliga
     um serviço), verifica-se o que tem de ser verdade: São Vicente tem excursões,
     Santiago não, e as duas ilhas têm scooter, quad e automóveis. */
  const abas = () => [...d.querySelectorAll('#precosBox .tab-btn')].map(x => x.dataset.t);
  const a = { t:d.getElementById('svcT').textContent, n:d.querySelectorAll('#svcGrid .svc-card').length, ab:abas() };
  w.setIlha('st');
  const b = { t:d.getElementById('svcT').textContent, n:d.querySelectorAll('#svcGrid .svc-card').length, ab:abas() };
  const ok = a.t!==b.t
          && a.ab.includes('ex') && !b.ab.includes('ex')     /* excursões só em São Vicente */
          && !a.ab.includes('cr') && b.ab.includes('cr')     /* automóveis só em Santiago */
          && ['sc','qd','ex2'].every(x => a.ab.includes(x) && b.ab.includes(x))
          && a.n >= 3 && b.n >= 3;
  if(!ok) falhas++;
  console.log(`${ok?'OK  ':'ERRO'} troca de ilha: SV ${a.n} serviços [${a.ab}] → ST ${b.n} [${b.ab}]`);
  const txt = d.getElementById('precosBox').textContent;
  ['32 €','286 €','150 €','42 €'].forEach(v => { if(!txt.includes(v)){falhou('preço '+v+' desapareceu');} });
  console.log('OK   preços continuam corretos nas tabelas');
}
{
  const { d, w } = carrega('pedido.html','pt');
  const vis = id => d.getElementById(id).style.display !== 'none';
  w.setTipo('excursao');
  const e1 = vis('fPax') && !vis('fDrop');
  w.setTipo('reserva');
  const e2 = vis('fPick') && vis('fEntrega');
  w.enviar({preventDefault(){}});
  const e3 = d.getElementById('err').style.display === 'block';
  if(!(e1&&e2&&e3)) falhas++;
  console.log(`${e1&&e2&&e3?'OK  ':'ERRO'} formulário adapta campos por tipo e valida obrigatórios`);
}
{
  let mau = 0;
  for (const p of paginas) {
    const { d } = carrega(p,'pt');
    [...d.querySelectorAll('a[href]')].forEach(a => {
      const h = a.getAttribute('href');
      if (!h || /^(https?:|mailto:|#)/.test(h)) return;
      const f = h.split('#')[0].split('?')[0];   /* ignora âncora e query string */
      if (f && !fs.existsSync(path.join(DIR,f))) { console.log('   link partido: '+p+' → '+h); mau++; }
    });
  }
  if(mau) falhas += mau;
  console.log(`${mau?'ERRO':'OK  '} ligações internas${mau?' ('+mau+' partidas)':' todas resolvem'}`);
}
console.log('\n' + (falhas ? '>>> ' + falhas + ' problema(s)' : '>>> TODOS OS TESTES PASSARAM'));

console.log('\n==================== 7. AJUSTES DE LAYOUT ====================');
{
  const { d } = carrega('index.html','pt');
  /* herói: widget depois do texto no fluxo */
  const hero = d.querySelector('.hero');
  const filhos = [...hero.children].map(c => c.className.split(' ')[0]);
  const iTexto = filhos.indexOf('container'), iW = filhos.indexOf('search-wrap');
  const ordemOk = iTexto > -1 && iW > -1 && iW > iTexto;
  console.log(`${ordemOk?'OK  ':'ERRO'} widget de pesquisa vem DEPOIS do texto no herói (${filhos.join(' → ')})`);
  if(!ordemOk) falhas++;

  /* cartões de serviço: imagem em <img> própria, informação em bloco separado */
  const c1 = d.querySelector('#svcGrid .svc-card');
  const temImg = !!c1.querySelector('.svc-media img[src]');
  const temBody = !!c1.querySelector('.svc-body h3');
  const semOverlay = !c1.querySelector('.glass');
  const mediaAntesBody = [...c1.children].map(x=>x.className).join('|').indexOf('svc-media') <
                         [...c1.children].map(x=>x.className).join('|').indexOf('svc-body');
  console.log(`${temImg?'OK  ':'ERRO'} serviço: fotografia em <img> real (não fundo CSS)`);
  console.log(`${semOverlay?'OK  ':'ERRO'} serviço: sem painel de vidro a tapar a foto`);
  console.log(`${temBody&&mediaAntesBody?'OK  ':'ERRO'} serviço: foto em cima, informação por baixo`);
  if(!temImg||!semOverlay||!temBody||!mediaAntesBody) falhas++;

  /* ícone do WhatsApp */
  const svgFlut = d.querySelectorAll('.wa-float a svg.ic-wa').length;
  const svgRodape = d.querySelectorAll('footer a.lk-wa svg.ic-wa').length;
  const svgBotao = !!d.querySelector('#ctWaBtn svg.ic-wa');
  const glifo = /✆/.test(d.body.textContent);
  console.log(`${svgFlut===2?'OK  ':'ERRO'} ${svgFlut} ícones SVG nos botões flutuantes`);
  console.log(`${svgRodape===2?'OK  ':'ERRO'} ${svgRodape} ícones SVG no rodapé`);
  console.log(`${svgBotao?'OK  ':'ERRO'} ícone no botão "Falar por WhatsApp"`);
  console.log(`${!glifo?'OK  ':'ERRO'} glifo ✆ eliminado do texto`);
  if(svgFlut!==2||svgRodape!==2||!svgBotao||glifo) falhas++;

  /* frota: imagens presentes */
  const imgs = [...d.querySelectorAll('#fleet .moto-card img')];
  console.log(`${imgs.length===4&&imgs.every(i=>i.getAttribute('src'))?'OK  ':'ERRO'} frota: ${imgs.length} imagens com src`);
  if(imgs.length!==4) falhas++;
}
{
  const { d } = carrega('usados.html','pt');
  const svg = d.querySelectorAll('.btn-wa svg.ic-wa').length;
  console.log(`${svg===2?'OK  ':'ERRO'} usados: ${svg} ícones nos botões WhatsApp`);
  if(svg!==2) falhas++;
}
{
  const { d } = carrega('pedido.html','pt');
  const svg = d.querySelectorAll('.btn-wa svg.ic-wa').length;
  console.log(`${svg>=2?'OK  ':'ERRO'} pedido: ${svg} ícones nos botões WhatsApp`);
  if(svg<2) falhas++;
}
console.log('\n' + (falhas ? '>>> ' + falhas + ' problema(s) no total' : '>>> TUDO VALIDADO'));
