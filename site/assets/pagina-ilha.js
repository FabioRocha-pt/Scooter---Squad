/* Página de ilha — usada por mindelo.html e praia.html.
   Cada página define ILHA_ID antes de carregar este ficheiro. */

(function () {
  const d = ILHAS[ILHA_ID];
  bootstrap('ilha');
  document.title = `${d.cidade}, ${d.nome} | Scooter & Quad`;

  document.getElementById('phBg').style.backgroundImage = `url('${d.img}')`;
  document.getElementById('phCrumb').innerHTML = `<a href="index.html">Home</a> / ${d.nome}`;
  document.getElementById('phT').innerHTML = `${d.cidade} <em>${d.nome}</em>`;
  document.getElementById('phP').textContent = d.excursoes ? T.ilha.svIntro : T.ilha.stIntro;

  /* frota */
  document.getElementById('frotaT').textContent = T.ilha.verFrota;
  document.getElementById('frotaS').textContent = T.home.frotaS;
  document.getElementById('fleet').innerHTML = cartoesFrota(FROTA[ILHA_ID]);

  /* excursões (só São Vicente) */
  const exc = document.getElementById('excSection');
  if (d.excursoes) {
    document.getElementById('excT').textContent = T.ilha.excursaoT;
    document.getElementById('excS').textContent = T.ilha.excursaoS;
    document.getElementById('excImg').style.backgroundImage = "url('img/C1-excursao-4h.jpg')";
    document.getElementById('excRota').innerHTML =
      `<h3>${T.ilha.rotaT}</h3><p class="muted">${T.ilha.rota}</p>`;
    document.getElementById('excPrecos').innerHTML = tabelaExcursoes();
    const bloco = (t, arr) => `<div class="value-card"><h4>${t}</h4>
      <ul class="check">${arr.map(x => `<li>${x}</li>`).join('')}</ul></div>`;
    document.getElementById('excBlocos').innerHTML =
      bloco(T.ilha.incluiT, T.ilha.inclui) + bloco(T.ilha.naoIncluiT, T.ilha.naoInclui) +
      bloco(T.ilha.requisitosT, T.ilha.requisitos) + bloco(T.ilha.levarT, T.ilha.levar);
  } else {
    exc.remove();
  }

  /* preços */
  document.getElementById('precosT').textContent = T.precos ? T.home.precosT : 'Preços';
  document.getElementById('precosS').textContent = T.home.precosS;
  renderPrecos(document.getElementById('precosBox'), d.excursoes, ILHA_ID);

  /* como funciona */
  document.getElementById('comoT').textContent = T.home.comoT;
  renderComoFunciona(document.getElementById('infoGrid'));
  renderHorario(document.getElementById('hours'));

  /* contactos + mapa */
  document.getElementById('ondeT').textContent = T.ilha.ondeT;
  document.getElementById('ctIsland').textContent = `${d.cidade}, ${d.nome}`;
  document.getElementById('ctRows').innerHTML = `
    <div class="rowc">📍 <b>${T.ilha.ondeT}</b><span class="v">${d.morada}</span></div>
    <div class="rowc"><span class="rc-ic">${SVG_WA}</span> <b>WhatsApp</b><a class="v" href="${d.waLink}">${d.wa}</a></div>
    <div class="rowc">✉ <b>Email</b><a class="v" href="mailto:${CONTACTOS.email}">${CONTACTOS.email}</a></div>
    <div class="rowc">🕘 <b>${T.horario.aberturaT}</b><span class="v">${HORARIO.abre} - ${HORARIO.fecha}</span></div>`;
  const wb = document.getElementById('ctWaBtn'); wb.href = d.waLink; wb.innerHTML = SVG_WA + ' ' + T.cta.wa;
  document.getElementById('ctPedido').textContent = T.cta.pedir;
  document.getElementById('ctMap').src = d.mapa;

  /* faq */
  document.getElementById('faqT').textContent = T.home.faqT;
  renderFaq(document.getElementById('faqList'));

  finalizar();
})();
