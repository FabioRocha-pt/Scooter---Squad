const { JSDOM, VirtualConsole } = require('jsdom');
const fs = require('fs'), path = require('path');
const DIR = require('path').join(__dirname, '..', 'site');
const paginas = fs.readdirSync(DIR).filter(f => f.endsWith('.html')).sort();
let falhas = 0;

function carrega(pagina, lang) {
  const erros = [];
  const vc = new VirtualConsole();
  vc.on('jsdomError', e => erros.push(e.message || String(e)));
  const dom = new JSDOM(fs.readFileSync(path.join(DIR, pagina), 'utf8'), {
    runScripts: 'outside-only', url: 'https://x.test/' + pagina, virtualConsole: vc, pretendToBeVisual: true });
  if (lang) dom.window.localStorage.setItem('sq-lang', lang);
  const d = dom.window.document, partes = [];
  for (const s of [...d.querySelectorAll('script')]) {
    const src = s.getAttribute('src');
    partes.push(src ? fs.readFileSync(path.join(DIR, src), 'utf8') : s.textContent);
  }
  try { dom.window.eval(partes.join('\n;\n')); } catch (e) { erros.push(e.message); }
  return { dom, d, w: dom.window, erros };
}

console.log('===== 1. TRAVESSÕES NO TEXTO VISÍVEL (4 idiomas x 9 páginas) =====');
{
  let enc = 0;
  for (const l of ['pt','en','it','fr']) for (const p of paginas) {
    const { d, dom } = carrega(p, l);
    const txt = d.body.textContent + ' ' + (d.title || '') +
      [...d.querySelectorAll('option,[placeholder],[title],[alt]')].map(e =>
        e.textContent + ' ' + (e.getAttribute('placeholder')||'') + ' ' +
        (e.getAttribute('title')||'') + ' ' + (e.getAttribute('alt')||'')).join(' ');
    if (txt.includes('—')) {
      const ctx = txt.split('—').slice(0,2).map(x=>x.slice(-30)).join(' [—] ');
      console.log(`  ENCONTRADO ${l}/${p}: ...${ctx}...`); enc++;
    }
    dom.window.close();
  }
  console.log(enc ? `  ERRO ${enc} ocorrência(s)` : '  OK   nenhum travessão em nenhuma página, em nenhum idioma');
  falhas += enc;
}

console.log('\n===== 2. ETIQUETA PEQUENA ACIMA DO TÍTULO =====');
{
  const { d, w } = carrega('index.html','pt');
  const css = fs.readFileSync(path.join(DIR,'assets/style.css'),'utf8');
  const kickerBloco = /\.kicker\{display:block/.test(css);
  console.log(`${kickerBloco?'OK  ':'ERRO'} .kicker é display:block (fica em linha própria)`);
  if(!kickerBloco) falhas++;
  /* em cada sec-head, o kicker precede o h2 e são irmãos diretos */
  const heads = [...d.querySelectorAll('.sec-head')];
  let bons = 0;
  heads.forEach(h => {
    const k = h.querySelector('.kicker'), t = h.querySelector('h2');
    if (k && t && k.parentElement === t.parentElement &&
        [...k.parentElement.children].indexOf(k) < [...t.parentElement.children].indexOf(t)) bons++;
  });
  console.log(`${bons===heads.length?'OK  ':'ERRO'} ${bons}/${heads.length} cabeçalhos com etiqueta antes do título`);
  if(bons!==heads.length) falhas++;
}

console.log('\n===== 3. FORMULÁRIO: CAIXA DE OPÇÕES, DROPDOWN, CHECKBOX =====');
{
  const { d, w, erros } = carrega('pedido.html','pt');
  const caixa = d.querySelector('.seg-box');
  const rotulo = d.querySelector('.seg-box .seg-label');
  const dentro = !!d.querySelector('.seg-box .seg button');
  const foraDoForm = caixa && !caixa.closest('form');
  const nBotoes = d.querySelectorAll('.seg button').length;
  console.log(`${caixa?'OK  ':'ERRO'} seletor de tipo numa caixa própria (.seg-box)`);
  console.log(`${rotulo&&rotulo.textContent.trim()?'OK  ':'ERRO'} caixa com rótulo: "${rotulo?rotulo.textContent:''}"`);
  console.log(`${foraDoForm?'OK  ':'ERRO'} caixa separada do formulário`);
  console.log(`${dentro&&nBotoes===5?'OK  ':'ERRO'} ${nBotoes} opções dentro da caixa`);
  if(!caixa||!rotulo||!foraDoForm||nBotoes!==5) falhas++;

  /* o seletor continua a funcionar depois de sair do form */
  const vis = id => d.getElementById(id).style.display !== 'none';
  w.setTipo('excursao');
  const ok1 = vis('fPax') && !vis('fDrop');
  w.setTipo('compra');
  const ok2 = vis('fModelo') && !vis('fPick');
  const ativo = d.querySelectorAll('.seg button.on').length;
  console.log(`${ok1&&ok2&&ativo===1?'OK  ':'ERRO'} opções continuam a controlar os campos (1 ativa de cada vez)`);
  if(!(ok1&&ok2&&ativo===1)) falhas++;

  /* submissão ainda funciona dentro da nova estrutura */
  w.setTipo('reserva');
  w.enviar({preventDefault(){}});
  const bloqueou = d.getElementById('err').style.display === 'block';
  console.log(`${bloqueou?'OK  ':'ERRO'} validação continua a bloquear envio incompleto`);
  if(!bloqueou) falhas++;
  if(erros.length){ console.log('  ERRO js: '+erros[0].slice(0,120)); falhas++; }

  const css = fs.readFileSync(path.join(DIR,'assets/style.css'),'utf8');
  const seta = /\.field select,\.search select\{appearance:none/.test(css) &&
               /background-position:right 15px center/.test(css);
  const chkBranco = /\.chk input\[type=checkbox\]\{[^}]*background:#fff/.test(css);
  const chkVisto = /\.chk input\[type=checkbox\]:checked::after\{transform:rotate\(45deg\) scale\(1\)/.test(css);
  const semAccent = !/\.chk input\{[^}]*accent-color/.test(css);
  console.log(`${seta?'OK  ':'ERRO'} seta do dropdown desenhada e recuada da borda (15px)`);
  console.log(`${chkBranco?'OK  ':'ERRO'} checkbox com fundo branco`);
  console.log(`${chkVisto?'OK  ':'ERRO'} visto laranja quando marcado`);
  console.log(`${semAccent?'OK  ':'ERRO'} sem accent-color cinzento do browser`);
  if(!seta||!chkBranco||!chkVisto||!semAccent) falhas++;
}

console.log('\n===== 4. NADA QUEBROU =====');
for (const p of paginas) {
  const { d, erros, dom } = carrega(p, 'pt');
  const nav = d.getElementById('nav'), foot = d.getElementById('footer');
  const vazios = [...d.querySelectorAll('[id]')].filter(el =>
    el.children.length === 0 && el.textContent.trim() === '' &&
    !['input','select','textarea','iframe','img','br','form','div','header','footer','table','ul'].includes(el.tagName.toLowerCase())
  ).map(e => e.id).filter(id => id !== 'bWa');
  const ok = !erros.length && nav.textContent.trim() && foot.textContent.trim() && !vazios.length;
  if(!ok) falhas++;
  console.log(`${ok?'OK  ':'ERRO'} ${p.padEnd(18)}${vazios.length?' vazios: '+vazios.join(' '):''}${erros.length?' '+erros[0].slice(0,90):''}`);
  dom.window.close();
}

console.log('\n===== 5. IDIOMAS =====');
for (const l of ['pt','en','it','fr']) {
  const { d, erros } = carrega('pedido.html', l);
  const rot = d.querySelector('.seg-label').textContent;
  const bts = [...d.querySelectorAll('.seg button')].map(b=>b.textContent.trim())[0];
  const ok = !erros.length && rot && bts;
  if(!ok) falhas++;
  console.log(`${ok?'OK  ':'ERRO'} ${l}: "${rot}" · 1ª opção "${bts}"`);
}

console.log('\n' + (falhas ? '>>> ' + falhas + ' problema(s)' : '>>> TUDO VALIDADO'));
