/* Scooter & Quad — comportamento partilhado
   Idioma, navegação, rodapé, FAQ, tabelas de preços e WhatsApp flutuante. */

let LANG = localStorage.getItem('sq-lang') || (navigator.language || 'pt').slice(0, 2);
if (!I18N[LANG]) LANG = 'pt';
let T = I18N[LANG];

function setLang(c) {
  if (!I18N[c]) return;
  LANG = c; T = I18N[c];
  localStorage.setItem('sq-lang', c);
  document.documentElement.lang = c;
  location.reload();
}

/* ---------- NAV ---------- */
function renderNav(pagina) {
  const it = [
    { k: 'ilhas',    href: 'index.html#ilhas' },
    { k: 'servicos', href: 'index.html#servicos' },
    { k: 'precos',   href: 'index.html#precos' },
    { k: 'usados',   href: 'usados.html', p: 'usados' },
    { k: 'sobre',    href: 'sobre.html',  p: 'sobre' },
    { k: 'faq',      href: 'index.html#faq' }
  ];
  const links = it.map(i =>
    `<li><a href="${i.href}" class="${i.p && i.p === pagina ? 'on' : ''}">${T.nav[i.k]}</a></li>`).join('');

  document.getElementById('nav').innerHTML = `
    <div class="container">
      <div class="nav-inner">
        <a class="nav-logo" href="index.html" aria-label="Scooter &amp; Quad">
          <img src="${IMGS.logo}" alt="Scooter &amp; Quad">
        </a>
        <nav>
          <ul id="navList">
            ${links}
            <li><a class="cta" href="pedido.html">${T.nav.reservar}</a></li>
          </ul>
        </nav>
        <div class="nav-right">
          <div class="lang" id="langBox">
            <button class="lang-btn" onclick="document.getElementById('langBox').classList.toggle('open')"
                    aria-haspopup="listbox">${LANGS.find(l => l.c === LANG).f} ${LANG.toUpperCase()} ▾</button>
            <div class="lang-menu" role="listbox">
              ${LANGS.map(l => `<button class="${l.c === LANG ? 'cur' : ''}" onclick="setLang('${l.c}')">${l.f} ${l.n}</button>`).join('')}
            </div>
          </div>
          <button class="burger" aria-label="Menu"
                  onclick="document.getElementById('navList').classList.toggle('open')">☰</button>
        </div>
      </div>
    </div>`;

  document.addEventListener('click', e => {
    const b = document.getElementById('langBox');
    if (b && !b.contains(e.target)) b.classList.remove('open');
  });
}

/* ---------- RODAPÉ ---------- */
function renderFooter() {
  const ano = new Date().getFullYear();
  document.getElementById('footer').innerHTML = `
    <div class="container">
      <div class="fgrid">
        <div>
          <img class="logo" src="${IMGS.logoEscuro}" alt="Scooter &amp; Quad">
          <p>${T.footer.tag}</p>
        </div>
        <div>
          <h4>${T.footer.contactos}</h4>
          <ul>
            <li><a class="lk-wa" href="${CONTACTOS.mindelo.link}">${SVG_WA} WhatsApp Mindelo ${CONTACTOS.mindelo.wa}</a></li>
            <li><a class="lk-wa" href="${CONTACTOS.praia.link}">${SVG_WA} WhatsApp Praia ${CONTACTOS.praia.wa}</a></li>
            <li><a href="mailto:${CONTACTOS.mindelo.email}">${CONTACTOS.mindelo.email}</a></li>
            <li><a href="mailto:${CONTACTOS.praia.email}">${CONTACTOS.praia.email}</a></li>
          </ul>
        </div>
        <div>
          <h4>${T.footer.ilhas}</h4>
          <ul>
            <li><a href="mindelo.html">São Vicente · Mindelo</a></li>
            <li><a href="praia.html">Santiago · Praia</a></li>
          </ul>
        </div>
        <div>
          <h4>${T.footer.links}</h4>
          <ul>
            <li><a href="index.html#precos">${T.nav.precos}</a></li>
            <li><a href="usados.html">${T.nav.usados}</a></li>
            <li><a href="sobre.html">${T.nav.sobre}</a></li>
            <li><a href="pedido.html">${T.nav.reservar}</a></li>
          </ul>
        </div>
      </div>
      <div class="bottom">
        <span>© ${ano} Scooter &amp; Quad · ${T.footer.dir}</span>
        <span>
          <a href="privacidade.html">${T.footer.priv}</a> ·
          <a href="termos.html">${T.footer.termos}</a>
        </span>
      </div>
    </div>`;
}

/* ---------- BARRA DE PROGRESSO DE LEITURA ---------- */
function renderProgresso() {
  if (semMovimento()) return;
  const b = document.createElement('div');
  b.className = 'progress';
  document.body.appendChild(b);
  const atualiza = () => {
    const alcance = document.documentElement.scrollHeight - window.innerHeight;
    b.style.transform = 'scaleX(' + (alcance > 60 ? Math.min(window.scrollY / alcance, 1) : 0) + ')';
  };
  atualiza();
  window.addEventListener('scroll', atualiza, { passive: true });
  window.addEventListener('resize', atualiza);
}

/* ---------- WHATSAPP FLUTUANTE ---------- */
/* logótipo do WhatsApp em SVG — o glifo ✆ não existe em muitas fontes e sai como quadrado */
const SVG_WA = '<svg class="ic-wa" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.52 3.45A11.86 11.86 0 0 0 12.05 0C5.46 0 .1 5.34.1 11.9c0 2.09.55 4.13 1.6 5.94L0 24l6.35-1.65a11.9 11.9 0 0 0 5.7 1.44h.01c6.58 0 11.94-5.34 11.94-11.9 0-3.17-1.24-6.16-3.48-8.44zm-8.47 18.3h-.01a9.9 9.9 0 0 1-5.03-1.37l-.36-.22-3.73.98 1-3.64-.24-.37a9.8 9.8 0 0 1-1.5-5.24c0-5.45 4.45-9.88 9.93-9.88a9.85 9.85 0 0 1 9.92 9.89c0 5.45-4.45 9.85-9.98 9.85zm5.45-7.4c-.3-.15-1.76-.86-2.03-.96-.28-.1-.48-.15-.67.15-.2.3-.77.96-.94 1.16-.18.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.13.3-.34.45-.52.15-.17.2-.3.3-.5.1-.19.05-.36-.05-.51-.1-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.51.07-.78.37-.28.3-1.05 1.02-1.05 2.48s1.07 2.87 1.22 3.07c.15.2 2.09 3.2 5.07 4.48.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.11.57-.08 1.76-.71 2-1.41.25-.7.25-1.29.18-1.42-.08-.12-.28-.2-.58-.35z"/></svg>';

function renderWa() {
  const d = document.createElement('div');
  d.className = 'wa-float';
  d.innerHTML = `
    <a href="${CONTACTOS.mindelo.link}" title="WhatsApp Mindelo" aria-label="WhatsApp Mindelo">${SVG_WA}<span>Mindelo</span></a>
    <a href="${CONTACTOS.praia.link}" title="WhatsApp Praia" aria-label="WhatsApp Praia">${SVG_WA}<span>Praia</span></a>`;
  document.body.appendChild(d);
}

/* ---------- ÍCONES ---------- */
const ICO = {
  doc:'<rect x="2.6" y="4.5" width="18.8" height="15" rx="2.6"/><circle cx="8.4" cy="10.9" r="2.2"/><path d="M5.1 16.5c.5-1.7 1.8-2.5 3.3-2.5s2.8.8 3.3 2.5"/><path d="M15 10h4.2M15 13.6h4.2"/>',
  lock:'<rect x="4" y="10" width="16" height="10" rx="2.6"/><path d="M8 10V7.6a4 4 0 0 1 8 0V10"/><circle cx="12" cy="14.6" r="1.35"/><path d="M12 16v1.6"/>',
  shield:'<path d="M12 3l7.5 3v5.6c0 4.4-3.1 7.6-7.5 8.9-4.4-1.3-7.5-4.5-7.5-8.9V6z"/><path d="M8.9 12.2l2.2 2.2 4-4.3"/>',
  gauge:'<path d="M3.8 17.3a8.4 8.4 0 1 1 16.4 0"/><path d="M12 17.3l4.4-4.9"/><circle cx="12" cy="17.5" r="1.35"/>',
  van:'<path d="M2.6 6.6h10.6v9.2H2.6z"/><path d="M13.2 9.7h3.7l3.3 3.3v2.8h-7z"/><circle cx="7" cy="17.7" r="1.9"/><circle cx="16.7" cy="17.7" r="1.9"/>',
  refresh:'<path d="M20.2 12a8.2 8.2 0 1 1-2.6-6"/><path d="M20.2 4.2V9h-4.8"/>',
  clock:'<circle cx="12" cy="12" r="8.6"/><path d="M12 7.1V12l3.3 2"/>',
  key:'<circle cx="8.2" cy="15.8" r="3.6"/><path d="M10.8 13.2l7.4-7.4"/><path d="M16 8l2.2 2.2M18.6 5.4l2 2"/>'
};
const svg = k => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICO[k]}</svg>`;

/* ---------- COMO FUNCIONA ---------- */
function renderComoFunciona(el) {
  const I = T.info;
  const cards = [
    { ic:'doc',     t:I.docT, p:I.docP, key:'A1 · A · B' },
    { ic:'lock',    t:I.cauT, p:I.cauP, key:'150 – 250 €' },
    { ic:'shield',  t:I.capT, p:I.capP, key:null },
    { ic:'gauge',   t:I.kmT,  p:I.kmP,  key:'100 km/' + T.precos.dia },
    { ic:'van',     t:I.entT, p:I.entP, key:'12 – 20 €' },
    { ic:'refresh', t:I.canT, p:I.canP, key:'24 h' }
  ];
  el.className = 'features stagger';
  el.innerHTML = cards.map(c => `
    <article class="feature">
      <div class="feature-ic">${svg(c.ic)}</div>
      <h4>${c.t}</h4>
      <p>${c.p}</p>
      ${c.key ? `<span class="feature-key">${c.key}</span>` : ''}
    </article>`).join('');
}

function renderHorario(el) {
  const H = T.horario;
  el.className = 'hours-panel reveal';
  el.innerHTML = `
    <div class="hours-col">
      <div class="hh"><div class="ic">${svg('clock')}</div><h4>${H.aberturaT}</h4></div>
      <div class="hrow"><span>${H.semana} · ${H.manha}</span><b>${HORARIO.manhaAbre} - ${HORARIO.manhaFecha}</b></div>
      <div class="hrow"><span>${H.semana} · ${H.tarde}</span><b>${HORARIO.tardeAbre} - ${HORARIO.tardeFecha}</b></div>
      <div class="hrow"><span>${H.domingo}</span><b>${H.marcacao}</b></div>
      <p class="hours-note">${H.almoco}</p>
    </div>
    <div class="hours-col">
      <div class="hh"><div class="ic">${svg('key')}</div><h4>${H.devolucaoT}</h4></div>
      <div class="hrow"><span>${H.levantamento}</span><b>${H.aPartir} ${HORARIO.abre}</b></div>
      <div class="hrow"><span>${H.devolucao}</span><b>${H.ate} ${HORARIO.fecha}</b></div>
      <div class="hrow"><span>${H.fora}</span><b>${H.marcacao}</b></div>
    </div>`;
}

/* ---------- FAQ ---------- */
function renderFaq(el, max) {
  const lista = max ? T.faq.slice(0, max) : T.faq;
  el.innerHTML = lista.map(([q, a], i) => `
    <div class="faq-item" id="fq${i}">
      <button onclick="toggleFaq(${i})" aria-expanded="false" aria-controls="fa${i}">
        <span>${q}</span><span class="chev">›</span>
      </button>
      <div class="faq-wrap"><div class="faq-inner"><div class="ans" id="fa${i}">${a}</div></div></div>
    </div>`).join('');
}
function toggleFaq(i) {
  const el = document.getElementById('fq' + i), aberto = el.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(x => {
    x.classList.remove('open');
    x.querySelector('button').setAttribute('aria-expanded', 'false');
  });
  if (!aberto) { el.classList.add('open'); el.querySelector('button').setAttribute('aria-expanded', 'true'); }
}

/* ---------- TABELAS DE PREÇOS ---------- */
function tabelaScooter() {
  const P = PRECOS_SCOOTER, m = P.modelos;
  const linhas = P.base.map(r => `
    <tr>
      <td class="d">${r.dias} ${r.dias === 1 ? T.precos.dia : T.precos.diasP}</td>
      ${r.v.map(([c, e]) => `<td class="eur">${fmtEUR(e)}</td><td class="cve">${fmtCVE(c)} CVE</td>`).join('')}
    </tr>`).join('');
  return `
  <div class="tbl-wrap">
    <table class="price">
      <thead>
        <tr><th rowspan="2">${T.precos.dias}</th>${m.map(x => `<th colspan="2">${x.nome}<br><span style="font-weight:400;font-size:.8rem;text-transform:none;letter-spacing:0">${x.cc} · ${x.carta}</span></th>`).join('')}</tr>
        <tr class="sub">${m.map(() => '<th>Euro</th><th>CVE</th>').join('')}</tr>
      </thead>
      <tbody>
        ${linhas}
        <tr><td class="d">${T.precos.semLimite}</td>
          ${P.semLimiteKm.map(([c, e]) => `<td class="eur">${fmtEUR(e)}</td><td class="cve">${fmtCVE(c)} CVE</td>`).join('')}</tr>
      </tbody>
    </table>
  </div>
  <p class="tbl-note">${T.precos.limiteKm} ${T.precos.incluiIva}</p>`;
}

function tabelaQuad() {
  const Q = PRECOS_QUAD;
  return `
  <div class="tbl-wrap">
    <table class="price" style="min-width:420px">
      <thead><tr><th>${T.precos.duracao}</th><th>Euro</th><th>CVE</th></tr></thead>
      <tbody>
        ${Q.base.map(b => `<tr>
          <td class="d">${b.label}<br><span style="font-weight:400;color:var(--slate);font-size:.8rem">${b.detalhe}</span></td>
          <td class="eur">${fmtEUR(b.v[1])}</td><td class="cve">${fmtCVE(b.v[0])} CVE</td></tr>`).join('')}
        <tr><td class="d">${T.precos.caucao}</td>
          <td class="eur">${fmtEUR(Q.caucao[1])}</td><td class="cve">${fmtCVE(Q.caucao[0])} CVE</td></tr>
      </tbody>
    </table>
  </div>
  <p class="tbl-note">${Q.modelo}. ${T.precos.quadNota} ${T.precos.incluiIva}</p>`;
}

function tabelaExcursoes() {
  return `
  <div class="tbl-wrap">
    <table class="price" style="min-width:420px">
      <thead><tr><th>${T.precos.duracao}</th><th>${T.precos.excDuplo}</th><th>${T.precos.excInd}</th></tr></thead>
      <tbody>
        ${EXCURSOES_ATIVAS.map(e => `<tr>
          <td class="d">${e.nome}<br><span style="font-weight:400;color:var(--slate);font-size:.8rem">${e.horas} ${T.precos.horas} · ${T.precos.partida} ${e.partidas.join(' / ')}</span></td>
          <td class="eur">${fmtEUR(e.duplo)}</td><td class="eur">${fmtEUR(e.individual)}</td></tr>`).join('')}
      </tbody>
    </table>
  </div>
  <p class="tbl-note">${T.precos.excNota}</p>`;
}

/* ---------- ALUGUER DE AUTOMÓVEIS ---------- */
function tabelaCarros() {
  const A = AUTOMOVEIS, C = T.carros;
  const linha = (rot, v) => `<tr><td class="d">${rot}</td>
    <td class="eur">${fmtEUR(v[1])}</td><td class="cve">${fmtCVE(v[0])} CVE</td></tr>`;
  return `
  <div class="tbl-wrap">
    <table class="price" style="min-width:420px">
      <thead><tr><th>${T.precos.dias}</th><th>Euro</th><th>CVE</th></tr></thead>
      <tbody>
        ${A.base.map(b => `<tr><td class="d">${b.dias} ${b.dias === 1 ? T.precos.dia : T.precos.diasP}</td>
          <td class="eur">${fmtEUR(b.v[1])}</td><td class="cve">${fmtCVE(b.v[0])} CVE</td></tr>`).join('')}
      </tbody>
    </table>
  </div>
  <div class="tbl-wrap" style="margin-top:14px">
    <table class="price" style="min-width:420px">
      <tbody>
        ${A.semLimiteKm ? linha(C.suplemento, A.semLimiteKm) : ''}
        ${linha(T.precos.caucao, A.caucao)}
        ${linha(T.precos.seguroExtra, A.seguroExtra)}
        ${linha(T.precos.entrega, A.entrega)}
      </tbody>
    </table>
  </div>
  <p class="tbl-note">${C.nota} ${T.precos.incluiIva}</p>
  <p class="tbl-note legal-note">${C.legal}</p>`;
}

/* Cartão do automóvel: fotografia grande em cima, ficha técnica por baixo.
   Só mostra características que a viatura tenha mesmo, ver aviso em data.js. */
function cartaoCarro(m, k) {
  const A = AUTOMOVEIS, C = T.carros;
  const ilhaNome = ILHAS[A.ilha] ? ILHAS[A.ilha].nome : '';

  const ficha = (m.fichaKeys || []).map(key => {
    let v = (m.ficha || {})[key];
    if (v == null) return '';
    if (key === 'caixa' && v === 'auto') v = C.caixaAuto;
    if (key === 'km' && v === 'ilimitados') v = C.ficha.kmIlim;
    return `<div class="fx"><dt>${C.ficha[key]}</dt><dd>${v}</dd></div>`;
  }).join('');

  const equipa = (m.equipaKeys || []).map(key =>
    `<li>${C.equipa[key]}</li>`).join('');

  return `
    <article class="car-card">
      ${galeria('car-' + k, m.imgs, m.nome, 'gal-car', 'carro')}
      <div class="body">
        <h3>${m.nome}</h3>
        <div class="cc">${m.detalhe}</div>
        <p>${T.svcDesc.car}</p>
        ${ficha ? `<dl class="car-ficha">${ficha}</dl>` : ''}
        ${equipa ? `<div class="car-equipa"><h4>${C.equipaT}</h4><ul>${equipa}</ul></div>` : ''}
        ${m.nota !== false && C.alturaNota ? `<p class="car-nota">${C.alturaNota}</p>` : ''}
        <div class="car-foot">
          <div class="p">${T.svc.desde} ${fmtEUR(A.base[0].v[1])} <small>${T.svc.dia}</small></div>
          <a class="btn btn-o" href="pedido.html?tipo=carro&amp;ilha=${encodeURIComponent(ilhaNome)}&amp;modelo=${encodeURIComponent(m.nome)}">${T.cta.reservar}</a>
        </div>
      </div>
    </article>`;
}

/* Secção dos automóveis. Só aparece na ilha onde o serviço existe, hoje Santiago.
   Tratamento visual diferente do resto do site, com fotografia de fundo e a
   informação por cima, para se destacar como serviço à parte. */
function renderCarros(el, ilha) {
  const A = AUTOMOVEIS, C = T.carros;
  const secao = el.closest('section') || el;

  if (ilha && A.ilha && ilha !== A.ilha) {   /* serviço não existe nesta ilha */
    secao.hidden = true; el.innerHTML = ''; return;
  }
  secao.hidden = false;
  secao.classList.add('car-section');

  const soPraia = ILHAS[A.ilha] ? `<span class="car-ilha">${ILHAS[A.ilha].cidade}, ${ILHAS[A.ilha].nome}</span>` : '';

  el.innerHTML = `
    <div class="car-bg" style="background-image:url('${A.fundo}')"></div>
    <div class="car-veil"></div>
    <div class="container car-in">
      <div class="sec-head car-head">
        <div><span class="kicker">${C.kicker}</span><h2>${C.t}</h2></div>
        <p>${C.sub} ${soPraia}</p>
      </div>
      <div class="car-grid">
        ${A.modelos.map((m, k) => cartaoCarro(m, k)).join('')}
        <div class="car-info">${tabelaCarros()}</div>
      </div>
    </div>`;
}

/* ---------- SEGURO ADICIONAL, EM DESTAQUE ---------- */
function renderSeguroDestaque(el) {
  const S = T.seguroDestaque;
  el.className = 'insurance-band reveal';
  el.innerHTML = `
    <div class="ic">${svg('shield')}</div>
    <div class="tx"><h3>${S.t}</h3><p>${S.p}</p></div>
    <a class="btn btn-o" href="${CONTACTOS.mindelo.link}">${S.cta}</a>`;
}

/* ---------- AVALIAÇÕES DE CLIENTES ----------
   Só aparece quando o cliente fornecer avaliações reais. Nunca inventar. */
function estrelas(n) {
  let s = '';
  for (let i = 1; i <= 5; i++) s += `<span class="${i <= n ? 'on' : ''}">★</span>`;
  return `<div class="stars" aria-label="${n}/5">${s}</div>`;
}

function renderAvaliacoes(el) {
  if (!Array.isArray(AVALIACOES) || !AVALIACOES.length) { el.hidden = true; return; }
  const A = T.avaliacoes;

  /* a origem aparece sempre: é o que torna a avaliação verificável e é
     condição de utilização das duas plataformas */
  const cartao = r => {
    const f = FONTES[r.fonte] || null;
    const url = f && PERFIS[r.fonte] ? PERFIS[r.fonte] : null;
    const selo = f
      ? (url
          ? `<a class="rev-fonte" href="${url}" target="_blank" rel="noopener">${A.em} ${f.nome}</a>`
          : `<span class="rev-fonte">${A.em} ${f.nome}</span>`)
      : '';
    return `
      <figure class="rev-card" ${r.idioma ? `lang="${r.idioma}"` : ''}>
        ${estrelas(r.estrelas)}
        <blockquote>${r.texto}</blockquote>
        <figcaption>${r.nome}${r.pais ? ` · ${r.pais}` : ''}${r.data ? ` · ${r.data}` : ''} ${selo}</figcaption>
      </figure>`;
  };

  /* um botão por plataforma, só para as que tenham perfil preenchido
     e pelo menos uma avaliação publicada */
  const usadas = [...new Set(AVALIACOES.map(r => r.fonte))].filter(k => FONTES[k] && PERFIS[k]);
  const botoes = usadas.map((k, i) =>
    `<a class="btn ${i ? 'btn-g' : 'btn-o'}" href="${PERFIS[k]}" target="_blank" rel="noopener">${A[FONTES[k].chave]}</a>`).join('');

  el.innerHTML = `
    <div class="sec-head"><div><span class="kicker">${A.kicker}</span><h2>${A.t}</h2></div><p>${A.sub}</p></div>
    <div class="rev-grid stagger">${AVALIACOES.map(cartao).join('')}</div>
    ${botoes ? `<div class="rev-cta">${botoes}</div>` : ''}`;
}

function tabelaExtras() {
  const P = PRECOS_SCOOTER, m = P.modelos;
  const linha = (rot, arr) => `<tr><td class="d">${rot}</td>${arr.map(([c, e]) =>
    `<td class="eur">${fmtEUR(e)}</td><td class="cve">${fmtCVE(c)} CVE</td>`).join('')}</tr>`;
  return `
  <div class="tbl-wrap">
    <table class="price">
      <thead>
        <tr><th rowspan="2">${T.precos.modelo}</th>${m.map(x => `<th colspan="2">${x.nome}</th>`).join('')}</tr>
        <tr class="sub">${m.map(() => '<th>Euro</th><th>CVE</th>').join('')}</tr>
      </thead>
      <tbody>
        ${linha(T.precos.caucao, P.caucao)}
        ${linha(T.precos.seguroExtra, P.seguroExtra)}
        ${linha(T.precos.entrega, P.entrega)}
      </tbody>
    </table>
  </div>
  <div class="tbl-wrap" style="margin-top:14px">
    <table class="price" style="min-width:420px">
      <tbody>
        <tr><td class="d">${T.precos.aeroporto}</td><td class="eur">${fmtEUR(PRECOS_SCOOTER.entregaAeroporto)}</td></tr>
        <tr><td class="d">${T.precos.reserva}</td><td>${T.precos.reservaV}</td></tr>
        <tr><td class="d">${T.precos.combustivel}</td><td>${T.precos.combustivelV}</td></tr>
      </tbody>
    </table>
  </div>`;
}

/* temCarros: o aluguer de automóveis só existe na ilha indicada em AUTOMOVEIS.ilha */
function temCarros(ilha) { return !AUTOMOVEIS.ilha || !ilha || ilha === AUTOMOVEIS.ilha; }

function renderPrecos(el, comExcursoes, ilha) {
  const abas = [
    { id: 'sc', t: T.precos.scooterT, html: tabelaScooter },
    { id: 'qd', t: T.precos.quadT, html: tabelaQuad }
  ];
  if (comExcursoes) abas.push({ id: 'ex', t: T.precos.excT, html: tabelaExcursoes });
  if (temCarros(ilha)) abas.push({ id: 'cr', t: T.carros.t, html: tabelaCarros });
  abas.push({ id: 'ex2', t: T.precos.extrasT, html: tabelaExtras });

  el.innerHTML = `
    <div class="tabs">${abas.map((a, i) =>
      `<button class="tab-btn ${i === 0 ? 'on' : ''}" data-t="${a.id}" onclick="abrirAba('${a.id}',this)">${a.t}</button>`).join('')}</div>
    ${abas.map((a, i) => `<div id="pane-${a.id}" class="pane" ${i ? 'hidden' : ''}>${a.html()}</div>`).join('')}`;
}
function abrirAba(id, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('on', b === btn));
  document.querySelectorAll('.pane').forEach(p => {
    const mostrar = p.id === 'pane-' + id;
    p.hidden = !mostrar;
    if (mostrar) {                       /* reinicia a animação de entrada */
      p.style.animation = 'none';
      void p.offsetWidth;
      p.style.animation = '';
    }
  });
}

/* ---------- FROTA ---------- */
function cartoesFrota(lista) {
  return lista.map(f => `
    <div class="moto-card">
      ${galeria('f-' + f.id, f.imgs, f.n, 'gal-moto', f.t)}
      <div class="body">
        <span class="pill ${f.t === 'quad' ? 'pill-qd' : 'pill-sc'}">${f.t}</span>
        <h3>${f.n}</h3>
        <div class="cc">${f.cc} · ${T.produto.f.carta} ${f.carta}</div>
        <div class="p">${f.p == null
          ? `<span class="sob">${T.svc.sobConsulta}</span>`
          : `${T.svc.desde} ${fmtEUR(f.p)} <small>${f.hora ? '/9h' : T.svc.dia}</small>`}</div>
      </div>
    </div>`).join('');
}

/* ============================================================
   GALERIA DE VEÍCULOS
   Mini carrossel dentro do cartão, com abertura em ecrã inteiro.
   Serve a frota, os usados e os automóveis: é sempre o mesmo componente.
   As fotografias que não existirem no servidor são descartadas ao carregar,
   por isso podem ser acrescentadas aos poucos sem partir o site.
   ============================================================ */
const GAL = {};

/* silhuetas para quando ainda não há fotografia */
const SILHUETA = {
  carro:'<path d="M3 15.4h18M4.6 15.4l1.6-5.1c.3-.9 1.1-1.5 2-1.5h7.6c.9 0 1.7.6 2 1.5l1.6 5.1"/><path d="M3 15.4v2.4h3.2M21 15.4v2.4h-3.2"/><circle cx="7.4" cy="17.8" r="1.7"/><circle cx="16.6" cy="17.8" r="1.7"/>',
  scooter:'<circle cx="5.6" cy="16.6" r="3"/><circle cx="18.4" cy="16.6" r="3"/><path d="M8.6 16.6h6.2l1.6-6.4h-3"/><path d="M14.8 10.2 12 14.2H7.4l-1.8 2.4"/><path d="M7 8.6h3"/>',
  quad:'<circle cx="5.4" cy="16.4" r="3.2"/><circle cx="18.6" cy="16.4" r="3.2"/><path d="M8.6 16.4h6.8M7 12.6h10l1.4 3.8M7 12.6 5.4 16.4M9 9.6h5l1 3"/>'
};

function galeria(id, imgs, alt, classe, tipo) {
  const lista = (imgs || []).filter(Boolean);
  GAL[id] = { imgs: lista.slice(), i: 0, alt: alt || '', tipo: tipo || 'carro' };
  if (!lista.length) return galVaziaHTML(id, alt, classe, tipo);
  return `
    <div class="gal ${classe || ''}" id="gal-${id}">
      <button type="button" class="gal-ph" onclick="galAbrir('${id}')"
              aria-label="${alt} — ${T.usadosF.galeria}">
        <img id="gal-img-${id}" src="${lista[0]}" alt="${alt}" loading="lazy"
             onerror="galFalhou('${id}',this.getAttribute('src'))">
        <span class="gal-zoom" aria-hidden="true">
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.4"/><path d="M15.6 15.6 20 20"/><path d="M11 8.6v4.8M8.6 11h4.8"/></svg>
        </span>
      </button>
      <div class="gal-nav" id="gal-nav-${id}">${galNavHTML(id)}</div>
    </div>`;
}

/* Sem fotografia o cartão não pode desaparecer, senão fica um buraco no desenho.
   Mostra a silhueta do veículo e a nota de que a fotografia está para vir. */
function galVaziaHTML(id, alt, classe, tipo) {
  const sil = SILHUETA[tipo] || SILHUETA.carro;
  return `
    <div class="gal gal-vazia ${classe || ''}" id="gal-${id}" role="img" aria-label="${alt}">
      <div class="gal-ph">
        <svg class="gal-sil" viewBox="0 0 24 24" aria-hidden="true">${sil}</svg>
        <span class="gal-sem">${T.carros.semFoto}</span>
      </div>
    </div>`;
}

function galNavHTML(id) {
  const g = GAL[id];
  if (!g || g.imgs.length < 2) return '';
  return `
    <button type="button" class="gal-b" onclick="galMove('${id}',-1)" aria-label="Anterior">‹</button>
    <div class="gal-dots">${g.imgs.map((_, k) =>
      `<button type="button" class="${k === g.i ? 'on' : ''}" onclick="galIr('${id}',${k})"
               aria-label="${k + 1}"></button>`).join('')}</div>
    <button type="button" class="gal-b" onclick="galMove('${id}',1)" aria-label="Seguinte">›</button>`;
}

function galPinta(id) {
  const g = GAL[id];
  if (!g) return;
  const img = document.getElementById('gal-img-' + id);
  if (img) img.src = g.imgs[g.i];
  const nav = document.getElementById('gal-nav-' + id);
  if (nav) nav.innerHTML = galNavHTML(id);
  if (LB.id === id) lbPinta();
}

function galIr(id, k) { const g = GAL[id]; if (!g) return; g.i = k; galPinta(id); }
function galMove(id, d) {
  const g = GAL[id];
  if (!g || g.imgs.length < 2) return;
  g.i = (g.i + d + g.imgs.length) % g.imgs.length;
  galPinta(id);
}

/* fotografia que ainda não foi carregada para o servidor: sai da galeria */
function galFalhou(id, src) {
  const g = GAL[id];
  if (!g) return;
  const k = g.imgs.indexOf(src);
  if (k === -1) return;
  g.imgs.splice(k, 1);
  const cx = document.getElementById('gal-' + id);
  if (!g.imgs.length) {                       /* ficou sem nenhuma: passa a marcador */
    if (cx) cx.outerHTML = galVaziaHTML(id, g.alt, cx.className.replace(/\bgal\b/, '').trim(), g.tipo);
    if (LB.id === id) galFechar();
    return;
  }
  if (g.i >= g.imgs.length) g.i = 0;
  galPinta(id);
}

/* ---------- ECRÃ INTEIRO ---------- */
const LB = { id: null, el: null };

function galAbrir(id) {
  const g = GAL[id];
  if (!g || !g.imgs.length) return;
  LB.id = id;
  if (!LB.el) {
    LB.el = document.createElement('div');
    LB.el.className = 'lb';
    LB.el.innerHTML = `
      <button type="button" class="lb-x" onclick="galFechar()" aria-label="Fechar">×</button>
      <button type="button" class="lb-b lb-prev" onclick="galMove(LB.id,-1)" aria-label="Anterior">‹</button>
      <figure class="lb-fig">
        <img id="lb-img" alt="">
        <figcaption><span id="lb-cap"></span> <b id="lb-n"></b></figcaption>
      </figure>
      <button type="button" class="lb-b lb-next" onclick="galMove(LB.id,1)" aria-label="Seguinte">›</button>`;
    LB.el.addEventListener('click', e => { if (e.target === LB.el) galFechar(); });
    document.body.appendChild(LB.el);

    /* teclado */
    document.addEventListener('keydown', e => {
      if (!LB.el || !LB.el.classList.contains('on')) return;
      if (e.key === 'Escape') galFechar();
      if (e.key === 'ArrowLeft') galMove(LB.id, -1);
      if (e.key === 'ArrowRight') galMove(LB.id, 1);
    });

    /* gesto no telemóvel */
    let x0 = null;
    LB.el.addEventListener('touchstart', e => { x0 = e.changedTouches[0].clientX; }, { passive: true });
    LB.el.addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) galMove(LB.id, dx < 0 ? 1 : -1);
      x0 = null;
    }, { passive: true });
  }
  lbPinta();
  LB.el.classList.add('on');
  document.body.classList.add('lb-aberto');
}

function lbPinta() {
  const g = GAL[LB.id];
  if (!g || !LB.el) return;
  const img = LB.el.querySelector('#lb-img');
  img.src = g.imgs[g.i];
  img.alt = g.alt;
  LB.el.querySelector('#lb-cap').textContent = g.alt;
  LB.el.querySelector('#lb-n').textContent = g.imgs.length > 1 ? (g.i + 1) + '/' + g.imgs.length : '';
  LB.el.querySelectorAll('.lb-b').forEach(b => { b.hidden = g.imgs.length < 2; });
}

function galFechar() {
  LB.el?.classList.remove('on');
  document.body.classList.remove('lb-aberto');
  LB.id = null;
}

/* ---------- USADOS ----------
   O cliente exigiu fotografias reais do próprio veículo, defeitos incluídos. */
function especificacoesUsado(u) {
  const F = T.usadosF, s = [`<span class="spec">${u.cc}</span>`,
                            `<span class="spec">${T.produto.f.carta} ${u.carta}</span>`];
  if (u.ano) s.push(`<span class="spec">${F.ano} ${u.ano}</span>`);
  if (u.km != null) s.push(`<span class="spec">${fmtKM(u.km)}</span>`);
  if (u.cor) s.push(`<span class="spec">${u.cor}</span>`);
  return s.join('');   /* a matrícula não aparece, por decisão do cliente */
}

function cartaoUsado(u) {
  const U = T.usados, vendido = u.estado === 'vendido';
  const tipoTxt = u.tipo === 'quad' ? U.usado : U.usada;
  const link = u.destaque ? 'produto.html' : null;
  return `<div class="prod ${vendido ? 'sold' : ''}" data-type="${u.tipo}" data-state="${u.estado}" data-cc="${parseInt(u.cc)}">
    <div class="ph-wrap">
      <span class="badge ${vendido ? 'sold' : 'rev'}">${vendido ? U.vendida : U.revista}</span>
      ${galeria('u-' + u.id, u.imgs, u.modelo, 'gal-prod', u.tipo)}
    </div>
    <div class="body">
      <span class="type">${u.tipo === 'quad' ? 'Quad' : 'Scooter'} · ${tipoTxt}</span>
      ${link ? `<a href="${link}"><h3>${u.modelo}</h3></a>` : `<h3>${u.modelo}</h3>`}
      <div class="specs">${especificacoesUsado(u)}</div>
      ${link ? `<a href="${link}" style="font-size:.78rem;font-weight:600;color:var(--orange-d);margin-top:8px;display:inline-block">${T.cta.ver} →</a>` : ''}
      <div class="price-row">
        <div class="p">${vendido ? U.vendida
          : (u.preco ? `${fmtEUR(u.preco[1])} <span class="p-cve">${fmtCVE(u.preco[0])} CVE</span>` : U.sobConsulta)}<small>${vendido ? U.vendidaP : U.detalhePreco}</small></div>
        <button class="buy ${vendido ? 'ghost' : ''}" onclick="pedir('${u.modelo} ${u.cc}')">${vendido ? U.avisar : U.comprar}</button>
      </div>
    </div>
  </div>`;
}

/* ---------- ANIMAÇÕES ---------- */
/* true se o utilizador pediu menos movimento no sistema.
   Protegido: em ambientes sem matchMedia não deve travar o resto do script. */
const semMovimento = () => {
  try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }
  catch (e) { return false; }
};

/* marca automaticamente os blocos a revelar e observa-os */
function ativarAnimacoes() {
  if (semMovimento()) {
    document.querySelectorAll('.reveal,.stagger,.sec-head').forEach(e => e.classList.add('in'));
    document.querySelector('.wa-float')?.classList.add('in');
    return;
  }

  /* candidatos automáticos: cabeçalhos de secção, painéis e grelhas */
  const auto = [
    '.sec-head', '.panel', '.band', '.tbl-wrap', '.contact-card', '.map-frame',
    '.legal h2', '.legal p', '.img-stack', '.form-card', '.sum-card', '.note-box'
  ];
  auto.forEach(sel => document.querySelectorAll(sel).forEach(e => {
    if (!e.closest('.hero,.page-hero,.nav')) e.classList.add('reveal');
  }));
  const grelhas = ['.islands', '.svc-grid', '.features', '.info-grid', '.value-grid', '.stats', '.grid3', '.faq-list'];
  grelhas.forEach(sel => document.querySelectorAll(sel).forEach(e => e.classList.add('stagger')));

  const alvos = document.querySelectorAll('.reveal,.stagger');
  if (!('IntersectionObserver' in window)) {
    alvos.forEach(e => e.classList.add('in'));
  } else {
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    alvos.forEach(e => obs.observe(e));
    /* o que já está visível entra de imediato */
    requestAnimationFrame(() => alvos.forEach(e => {
      if (e.getBoundingClientRect().top < window.innerHeight * 0.9) e.classList.add('in');
    }));
  }

  setTimeout(() => document.querySelector('.wa-float')?.classList.add('in'), 100);
}

/* nav encolhe ao rolar */
function ativarNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const atualiza = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  atualiza();
  window.addEventListener('scroll', atualiza, { passive: true });
}

/* contadores da página Sobre.
   Sem IntersectionObserver (browsers antigos) os números ficam estáticos — nada quebra. */
function animarNumeros(sel) {
  if (semMovimento() || !('IntersectionObserver' in window) || typeof performance === 'undefined') return;
  document.querySelectorAll(sel).forEach(el => {
    const txt = el.textContent.trim();
    const m = txt.match(/^(\d+)(.*)$/);
    if (!m) return;
    const fim = parseInt(m[1]), sufixo = m[2] || '';
    if (fim > 200) return;                        /* anos ficam estáticos */
    let arrancou = false;
    const obs = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting || arrancou) return;
      arrancou = true; obs.disconnect();
      const dur = 1100, t0 = performance.now();
      const passo = t => {
        const p = Math.min((t - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(fim * eased) + sufixo;
        if (p < 1) requestAnimationFrame(passo);
      };
      el.textContent = '0' + sufixo;
      requestAnimationFrame(passo);
    }), { threshold: 0.5 });
    obs.observe(el);
  });
}

/* ---------- UTIL ---------- */
function hoje() { return new Date().toISOString().slice(0, 10); }
function amanha() { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().slice(0, 10); }

function bootstrap(pagina) {
  document.documentElement.lang = LANG;
  renderNav(pagina);
  renderFooter();
  renderWa();
  renderProgresso();
  ativarNavScroll();
}

/* chamar no fim de cada página, depois de todo o conteúdo estar montado */
function finalizar() {
  ativarAnimacoes();
}
