/* Scooter & Quad — traduções PT / EN / IT / FR
   Para corrigir um texto, altera só aqui: aparece em todas as páginas. */

const LANGS = [
  { c: 'pt', f: '🇵🇹', n: 'Português' },
  { c: 'en', f: '🇬🇧', n: 'English' },
  { c: 'it', f: '🇮🇹', n: 'Italiano' },
  { c: 'fr', f: '🇫🇷', n: 'Français' }
];

const I18N = {

/* ============================ PORTUGUÊS ============================ */
pt: {
  nav: { ilhas:'Ilhas', servicos:'Serviços', precos:'Preços', usados:'Usados', sobre:'Sobre nós', faq:'FAQ', reservar:'Reservar' },
  cta: { reservar:'Reservar', pedir:'Enviar pedido', ver:'Ver detalhes', saber:'Saber mais', wa:'Falar por WhatsApp', voltar:'Voltar ao início', orcamento:'Pedir orçamento' },
  hero: {
    kicker:'Cabo Verde · São Vicente · Santiago',
    t1:'Vive a ilha.', t2:'Sente a estrada.',
    sub:'Excursões guiadas de quad e aluguer de scooters e quads em São Vicente. Em Santiago, aluguer de scooters, quads e carros. A tua aventura em Cabo Verde começa aqui.'
  },
  busca: { ilha:'Ilha', pick:'Levantamento', drop:'Devolução', servico:'Serviço' },
  passos: { p1:'Passo 1', p2:'Passo 2', p3:'Passo 3', p4:'Passo 4', p5:'Passo 5' },
  home: {
    ilhasT:'Escolhe a tua ilha',
    ilhasS:'Cada ilha tem serviços diferentes. Escolhe onde estás e mostramos-te só o que existe aí.',
    servicosT:'Serviços em',
    servicosSv:'Excursões guiadas de quad e aluguer de scooters e quads. Guias em português, inglês, francês e espanhol.',
    servicosSt:'Aluguer de scooters e quads, à hora, ao dia, à semana ou em longa duração. Capacetes e seguro incluídos.',
    frotaT:'Frota em',
    frotaS:'Verificada todos os dias na nossa oficina. Pagamento em dinheiro (CVE/EUR) e VISA. Caução devolvida na entrega em boas condições.',
    comoT:'Como funciona', comoS:'Tudo o que precisas de saber antes de reservar.',
    precosT:'Preços', precosS:'Valores oficiais com IVA incluído, em escudos e em euros.',
    faqT:'Perguntas frequentes', faqS:'Se não encontrares a resposta, fala connosco por WhatsApp ou email.',
    usadosK:'Depois da experiência', usadosT1:'Scooters e quads', usadosT2:'usados',
    usadosP:'Veículos usados da nossa frota, revistos na nossa oficina antes da venda, com apoio pré e pós-venda. Envio para todas as ilhas de Cabo Verde.',
    usadosB:'Ver usados à venda',
    contactosT:'Contactos em', contactosS:'Falamos contigo por WhatsApp ou email, no idioma que preferires.',
    verIlha:'Ver página completa de'
  },
  svc: {
    exc4T:'Volta à ilha de quad', exc4M:'Mindelo → Salamansa → Baía das Gatas → Calhau · 2 a 12 pax', exc4Tag:'Excursão guiada · 4h',
    exc2T:'Costa e miradouros', exc2M:'Monte Cara, Laginha e vilas piscatórias · 2 a 12 pax', exc2Tag:'Excursão guiada · 2h',
    scT:'Scooter ao teu ritmo', scM:'À hora, ao dia ou à semana · capacetes e seguro incluídos', scTag:'Aluguer',
    qdT:'Quad ao teu ritmo', qdM:'Explora a ilha sem guia · carta categoria B', qdTag:'Aluguer',
    ldT:'Longa duração', ldM:'A partir de 30 dias, para empresas e particulares · seguro, manutenção e veículo de substituição', ldTag:'Frota',
    desde:'Desde', dia:'/dia', sobConsulta:'Sob consulta', proposta:'Proposta à medida'
  },
  svcDesc: {
    exc2:'Sais de Mindelo em quad, com guia à frente, e segues pela costa norte até à Baía das Gatas. Pelo caminho paras nos miradouros, nas praias e nas vilas piscatórias, com tempo para fotografias e para um banho. Parte às 15:00. Capacete e seguro incluídos.',
    exc4:'A rota completa da ilha, de Mindelo a Salamansa, Baía das Gatas, Calhau e Ribeira de Calhau. Para quem quer ver São Vicente de uma ponta à outra no mesmo dia, com paragens para banho e para conhecer as vilas piscatórias. Duas partidas por dia, às 09:00 ou às 14:00. Capacete e seguro incluídos.',
    sc:'Levantas a scooter na loja, com capacete e seguro já incluídos, e ficas livre para andar onde quiseres e parar onde te apetecer. Cem quilómetros por dia incluídos, que chegam de sobra para a ilha. Se quiseres andar sem contas à cabeça, há tarifa sem limite de quilómetros.',
    qd:'O quad é teu por blocos de horas, sem guia e sem itinerário. É a escolha certa para sair da estrada alcatroada e chegar às praias que os carros não alcançam. Carta de categoria B.',
    ld:'A partir de trinta dias, com seguro, manutenção e veículo de substituição incluídos. Pensado para empresas e para quem fica na ilha uma temporada inteira.',
    car:'Para quem viaja em família, com bagagem, ou simplesmente prefere ir a coberto. Um SUV de cinco lugares, com quilómetros ilimitados.'
  },
  carros: {
    ficha:{ lugares:'Lugares', km:'Quilómetros', kmIlim:'ilimitados', caixa:'Caixa', motor:'Motor', altura:'Altura ao solo', bagageira:'Bagageira' },
    caixaAuto:'Automática',
    equipa:{ ac:'Ar condicionado', camara:'Câmara de marcha-atrás', carplay:'Apple CarPlay e Android Auto', bluetooth:'Ecrã tátil de 10,1 polegadas', isofix:'Fixações ISOFIX para cadeirinha' },
    equipaT:'Vem equipado com',
    alturaNota:'Os 209 mm de altura ao solo contam em Cabo Verde: chega às praias e aos miradouros onde um citadino não passa.',
    semFoto:'Fotografia em breve',
    t:'Aluguer de automóveis', kicker:'Scooter & Quad Rent Cars',
    sub:'Quando são quatro ou cinco, ou quando a bagagem não cabe numa scooter.',
    legal:'Serviço de aluguer de automóveis prestado pela MSB Rent a Car, MODU Scooter Boa Soc. Unipessoal Lda, em parceria com a Scooter & Quad.',
    nota:'Quilómetros ilimitados, sem limite diário nem custo por quilómetro adicional.',
    suplemento:'Suplemento sem limite de quilómetros, por dia'
  },
  avaliacoes: {
    kicker:'Avaliações', t:'O que dizem quem já andou connosco',
    sub:'Avaliações reais deixadas por clientes no Google.',
    verGoogle:'Ver todas no Google', verGyg:'Ver todas no GetYourGuide', deixar:'Deixar a minha avaliação', em:'em'
  },
  usadosF: { ano:'Ano', km:'Quilómetros', matricula:'Matrícula', cor:'Cor', galeria:'Fotografias do próprio veículo' },
  seguroDestaque: {
    t:'Segurança em primeiro lugar',
    p:'Por poucos euros por dia, o seguro adicional cobre os danos no veículo até ao limite da caução. Sem ele, um arranhão numa parede pode custar-te a caução inteira. Vale sempre a pena.',
    cta:'Falar sobre o seguro'
  },
  info: {
    docT:'Documentos', docP:'Bilhete de identidade ou passaporte e carta de condução válida. A Taro T9, de 124 cc, exige categoria A1. As scooters acima de 125 cc exigem categoria A. Os quads exigem categoria B.',
    cauT:'Caução', cauP:'Paga em dinheiro ou cartão e devolvida na entrega do veículo em boas condições. Não existe franquia: a responsabilidade vai até ao limite da caução.',
    capT:'Capacetes e seguro', capP:'Capacete obrigatório para condutor e passageiro, ambos incluídos. Seguro de responsabilidade civil que cobre condutor e passageiro.',
    kmT:'Limite de km', kmP:'100 km por dia no aluguer base de scooter. Acima disso paga-se 0,30 € por km, ou escolhes a tarifa sem limite.',
    entT:'Entrega no hotel ou aeroporto', entP:'Levamos e recolhemos o veículo no teu hotel ou no aeroporto, por 12 € por trajeto (20 € no aeroporto). A equipa aguarda até 20 minutos após a hora combinada.',
    canT:'Alterações e cancelamento', canP:'Alterações e cancelamentos até 24 horas antes, com reembolso total. Depois disso não são permitidos.'
  },
  horario: {
    aberturaT:'Horário de funcionamento', devolucaoT:'Levantamento e devolução',
    semana:'Segunda a domingo', manha:'Manhã', tarde:'Tarde',
    almoco:'Encerrado para almoço das 13:00 às 14:00',
    domingo:'Feriados', marcacao:'mediante marcação',
    levantamento:'Levantamento', devolucao:'Devolução',
    aPartir:'a partir das', ate:'até às', fora:'Fora de horário'
  },
  precos: {
    scooterT:'Aluguer de scooter', quadT:'Aluguer de quad', excT:'Excursões de quad', extrasT:'Caução e extras',
    dias:'Dias', dia:'dia', diasP:'dias', duracao:'Duração', modelo:'Modelo', valor:'Valor',
    incluiIva:'Preços com IVA incluído. Pagamento em dinheiro (escudos ou euros) e VISA.',
    limiteKm:'Tarifa base com limite de 100 km por dia. Acima desse limite, 33 CVE (0,30 €) por km adicional.',
    semLimite:'Tarifa de 1 dia sem limite de quilómetros',
    caucao:'Caução (devolvida na entrega)', seguroExtra:'Seguro adicional, por dia (cobre danos, não cobre furto)',
    entrega:'Entrega e recolha, por trajeto', aeroporto:'Entrega e recolha no aeroporto, por trajeto',
    reserva:'Reserva', reservaV:'50% do valor, pago no momento da reserva',
    combustivel:'Combustível', combustivelV:'Preço de mercado por litro',
    quadNota:'O quad é alugado por blocos de horas, sempre com início às 09h ou às 18h.',
    excDuplo:'Duplo', excInd:'Individual', excNota:'Grupos de 2 a 12 participantes. A Volta à Ilha sai às 09:00 ou às 14:00; a Costa Norte sai às 15:00. Condutor com mais de 21 anos e carta de categoria B. Guias em português, inglês, francês e espanhol.',
    horas:'horas', partida:'partida às'
  },
  ilha: {
    verFrota:'Frota disponível', verPrecos:'Preços', ondeT:'Onde estamos',
    svIntro:'Estamos na Rua Senador Vera Cruz, no Mindelo. Nesta ilha fazemos excursões guiadas de quad de 2 e 4 horas, aluguer de scooters e quads, e aluguer de longa duração.',
    stIntro:'Estamos no Palmarejo Baixo, na cidade da Praia. Nesta ilha fazemos aluguer de scooters e quads, à hora, ao dia ou em longa duração.',
    excursaoT:'Excursões de quad', excursaoS:'Só em São Vicente. Uma aventura guiada por trilhos e estradas costeiras, com paragens para banho e para conhecer as vilas piscatórias.',
    rotaT:'Rota', rota:'Mindelo → Salamansa → Baía das Gatas → Calhau → Ribeira de Calhau → Mindelo (Laginha)',
    incluiT:'Inclui', inclui:['Serviço de guia turístico','Quad New G Force 520L (500cc)','Seguro contra terceiros','Briefing de segurança antes de partir'],
    naoIncluiT:'Não inclui', naoInclui:['Transfer de e para o hotel','Refeições e bebidas'],
    requisitosT:'Requisitos', requisitos:['Condutor com mais de 21 anos e carta de categoria B','Idade mínima do passageiro: 7 anos','Não recomendado a pessoas com mobilidade reduzida'],
    levarT:'O que levar', levar:['Carta de condução e documento de identificação','Roupa confortável, protetor solar e água','Fato de banho e toalha para a paragem na baía','Óculos de sol e chapéu']
  },
  usados: {
    t1:'Scooters e quads', t2:'usados',
    sub:'Veículos da nossa frota, revistos na oficina antes da venda. Com apoio pré e pós-venda e envio para todas as ilhas de Cabo Verde.',
    todos:'Todos', scooters:'Scooters', quads:'Quads', disponiveis:'Disponíveis',
    ordenar:'Relevância', ccAsc:'Cilindrada ↑', ccDesc:'Cilindrada ↓',
    veiculo:'veículo', veiculos:'veículos',
    notaT:'Todos os usados passam pela nossa oficina',
    notaP:'Antes de serem colocados à venda, os veículos são revistos e preparados pela nossa equipa. O estado, a quilometragem e o preço são enviados com o orçamento.',
    usada:'Usada', usado:'Usado', revista:'Revista na oficina', vendida:'Vendida',
    sobConsulta:'Sob consulta', detalhePreco:'estado, km e preço por email',
    comprar:'Comprar', avisar:'Avisar-me', vendidaP:'vê os restantes usados disponíveis',
    comoT:'Como funciona a compra',
    passos:[
      {t:'Escolhe o veículo', p:'Explora os usados disponíveis e carrega em Comprar no que te interessa.'},
      {t:'Recebe a proposta', p:'Enviamos-te o estado do veículo, a quilometragem, as fotos e o preço.'},
      {t:'Vê o veículo', p:'Podes ver e experimentar o veículo na nossa loja, em Mindelo ou na Praia.'},
      {t:'Entrega na tua ilha', p:'Enviamos para todas as ilhas de Cabo Verde, com apoio pré e pós-venda.'}
    ],
    duvidasT:'Dúvidas? Fala connosco',
    duvidasP:'A nossa equipa responde por WhatsApp em Mindelo e na Praia, ou por email. Apoio antes e depois da compra.'
  },
  produto: {
    precoT:'Preço sob consulta',
    precoS:'Enviamos o preço, a quilometragem e o relatório de estado do veículo com a proposta.',
    ondeVer:'Onde queres ver o veículo',
    envio:'Outra ilha (envio para todas as ilhas de Cabo Verde)',
    oficina:'Veículo da nossa frota, revisto e preparado na nossa oficina antes da venda.',
    comprar:'Comprar e pedir proposta', fotos:'Pedir fotos e quilometragem',
    t1:'Revisto na oficina', t2:'Histórico conhecido', t3:'Envio para todas as ilhas', t4:'Apoio pré e pós-venda',
    sobreT:'Sobre este veículo',
    sobreP1:'Uma das scooters mais completas da nossa frota, estável, potente e confortável para percursos mais longos entre cidades e praias.',
    sobreP2:'Esta unidade sai da nossa própria frota de aluguer, o que significa histórico conhecido e manutenção feita sempre pela nossa equipa. Antes da venda é revista e preparada na nossa oficina.',
    incluiT:'O que está incluído',
    inclui:['Revisão e preparação completa na nossa oficina antes da entrega','Relatório de estado do veículo e quilometragem','Histórico de manutenção conhecido','Envio para todas as ilhas de Cabo Verde','Assistência pós-venda em Mindelo e na Praia'],
    fichaT:'Ficha técnica',
    f:{modelo:'Modelo',tipo:'Tipo',cc:'Cilindrada',carta:'Carta de condução',estado:'Estado',km:'Quilometragem',prov:'Proveniência',lugares:'Lugares',entrega:'Entrega'},
    fv:{scooter:'Scooter',usada:'Usada · revista na oficina',km:'Enviada com a proposta',prov:'Frota própria Scooter & Quad',lugares:'2 (condutor + passageiro)',entrega:'Mindelo, Praia ou envio para outras ilhas'},
    fichaNota:'A ficha completa, as fotos atuais e o relatório de estado são enviados por email com a proposta.',
    outrosT:'Outros usados'
  },
  form: {
    kicker:'Sem sair da plataforma', t:'Fala connosco',
    sub:'Preenche o pedido e ele entra na nossa fila de atendimento. Um gestor da tua ilha responde-te por email ou WhatsApp, normalmente no próprio dia.',
    escolhe:'O que precisas?',
    tipos:{reserva:'Reservar aluguer',excursao:'Excursão de quad',compra:'Comprar usado',orcamento:'Pedir orçamento',ficha:'Mais informações'},
    nome:'Nome', tel:'Telefone (WhatsApp)', email:'Email', ilha:'Ilha', selecione:'Seleciona…',
    servico:'Serviço', veiculo:'Veículo', pick:'Data de levantamento', drop:'Data de devolução',
    pax:'Nº de pessoas', entrega:'Entrega e recolha', modelo:'Veículo usado', msg:'Mensagem',
    msgPh:'Conta-nos o que precisas: horários, dúvidas, pedidos especiais.',
    entregaOp:['Na loja','No hotel (12 € por trajeto)','No aeroporto (20 € por trajeto)'],
    condicoes:'Li e aceito as condições: depósito de 50% para confirmar a reserva, caução na entrega e política de cancelamento até 24 horas antes.',
    erro:'Preenche os campos obrigatórios (*) e aceita as condições antes de enviar.',
    enviar:'Enviar pedido', nota:'Ao enviar abre o teu programa de email com o pedido preenchido. Se preferires, usa o WhatsApp.',
    resumoT:'Resumo do pedido', tipo:'Tipo', datas:'Datas', deposito:'Depósito', depositoV:'50% para confirmar',
    seguirT:'O que acontece a seguir',
    seguir:[
      {t:'Pedido enviado', p:'Recebemos o teu pedido por email com uma referência.'},
      {t:'Gestor atribuído', p:'Um gestor da tua ilha verifica a disponibilidade.'},
      {t:'Confirmação e contrato', p:'Enviamos a proposta e o contrato para assinatura.'},
      {t:'Levantamento', p:'Na loja, no hotel ou no aeroporto, conforme escolheste.'}
    ],
    jaT:'Preferes falar já?',
    okT:'Pedido pronto a enviar!',
    okP:'Abrimos o teu programa de email com todos os dados preenchidos. Basta carregares em enviar. Se não abriu, usa o WhatsApp abaixo.',
    okRef:'Guarda a referência para acompanhares o pedido.',
    outro:'Fazer outro pedido'
  },
  sobre: {
    t:'Sobre nós',
    intro:'A Scooter & Quad é uma empresa cabo-verdiana especializada no aluguer de scooters e quads e em excursões turísticas, com presença em São Vicente e em Santiago.',
    p1:'Fundada em 2022, a empresa beneficia da experiência dos seus promotores, acumulada ao longo de mais de 20 anos no setor. A combinação de conhecimento técnico, uma frota moderna e serviços completos faz da Scooter & Quad uma referência no mercado.',
    servicosT:'O que fazemos',
    servicos:['Aluguer de scooters e quads, de curta e longa duração','Excursões guiadas de quad em São Vicente','Venda de scooters e quads usados da nossa frota','Apoio pré e pós-venda','Gestão de frotas para empresas'],
    segT:'Compromisso com a segurança',
    seg:['Verificações diárias na nossa oficina mecânica, para garantir que todos os veículos estão em perfeitas condições','Manutenção preventiva como prioridade','Capacetes para condutor e passageiro incluídos em todos os alugueres','Briefing de segurança antes de cada excursão'],
    qualT:'Foco na qualidade',
    qual:['Frota de veículos modernos e bem mantidos','Logística preparada para responder rapidamente','Atendimento em português, inglês, francês e espanhol'],
    valoresT:'Os nossos valores',
    valores:[
      {n:'Inovação', p:'Adaptação constante às necessidades do mercado e às expectativas dos clientes.'},
      {n:'Sustentabilidade', p:'Contributo para o turismo sustentável em Cabo Verde, promovendo a segurança e o respeito pelo ambiente local.'},
      {n:'Excelência no serviço', p:'Uma experiência completa, do primeiro contacto ao apoio pós-venda.'}
    ],
    missaoT:'A nossa missão',
    missao:'Proporcionar a quem visita Cabo Verde uma experiência segura e inesquecível, com serviços de alto nível e excursões que valorizam a beleza natural e cultural das ilhas. Operamos segundo os mais elevados padrões de sustentabilidade e promovemos um turismo responsável, que respeita o ambiente local.',
    fecho:'Escolher a Scooter & Quad é confiar em profissionais que colocam paixão, competência e foco na qualidade em tudo o que fazem.',
    stats:[{n:'2022',p:'Ano de fundação, com mais de 20 anos de experiência no setor'},{n:'2',p:'Ilhas: São Vicente e Santiago'},{n:'4',p:'Idiomas falados pela nossa equipa'},{n:'100%',p:'Frota verificada diariamente na nossa oficina'}]
  },
  faq: [
    ['O que está incluído no aluguer?','Capacete para condutor e passageiro, seguro obrigatório de responsabilidade civil, que cobre também o condutor e o passageiro, e quilometragem até 100 km por dia nas scooters.'],
    ['O que preciso para alugar uma scooter ou quad?','Bilhete de identidade ou passaporte, dinheiro ou cartão de crédito para a caução e carta de condução válida que cumpra os requisitos do Código da Estrada cabo-verdiano.'],
    ['Que categoria de carta é necessária?','Até 124cc: categoria A1. Scooters acima de 124cc: categoria A. Quads: categoria B.'],
    ['Quanto é a caução?','Depende do modelo: 150 € na T9 125cc, 200 € na T11 300cc, 250 € na T12 400cc e 250 € no quad. É paga em dinheiro ou com cartão e devolvida na entrega do veículo em boas condições. Não existe franquia: a responsabilidade do cliente vai até ao limite da caução.'],
    ['Que formas de pagamento aceitam?','Dinheiro em escudos (CVE) ou euros e cartão VISA.'],
    ['Há limite de quilómetros?','No aluguer base de scooter o limite é de 100 km por dia. Acima disso aplica-se 33 CVE (0,30 €) por quilómetro adicional. Existe também uma tarifa de 1 dia sem limite de quilómetros: 42 € na T9, 48 € na T11 e 53 € na T12.'],
    ['Entregam o veículo no hotel ou no aeroporto?','Sim. A entrega e recolha custa 12 € por trajeto, ou 20 € por trajeto no aeroporto. A equipa aguarda a chegada do cliente cerca de 20 minutos após a hora combinada.'],
    ['Qual é o horário de levantamento e devolução?','O levantamento e a devolução são feitos entre as 09h e as 18h. Fora desse horário é possível mediante marcação prévia.'],
    ['O que cobre o seguro?','O seguro cobre danos a terceiros e a responsabilidade sobre condutor e passageiro. Em caso de dano ou furto do veículo, a responsabilidade do cliente vai até ao limite da caução, conforme o contrato. Os acessórios, como capacetes e cadeados, não estão cobertos.'],
    ['É possível contratar seguro adicional?','Sim. O seguro extra custa 7 € na T9, 9 € na T11 e 12 € na T12, e cobre danos até ao limite da caução, mas não cobre furto. As condições específicas constam do contrato.'],
    ['Posso alterar ou cancelar a reserva?','Sim, até 24 horas antes da data e hora de início, através de pedido para info@scooter-quad.com. Cancelamentos com mais de 24 horas de antecedência têm reembolso total. Dentro das 24 horas não são permitidas alterações nem cancelamentos com reembolso.'],
    ['Quais são as durações e preços das excursões?','As excursões de quad existem apenas em São Vicente: 4 horas por 100 € (duplo) ou 85 € (individual) e 2 horas por 85 € (duplo) ou 70 € (individual). Grupos de 2 a 12 participantes, com guias em português, inglês, francês e espanhol.'],
    ['Que requisitos existem para participar numa excursão?','O condutor do quad deve ter mais de 21 anos e carta de condução de categoria B. A idade mínima do passageiro é 7 anos. A atividade não é recomendada a pessoas com mobilidade reduzida.'],
    ['Vendem scooters e quads?','Sim, veículos usados da nossa frota, revistos na nossa oficina antes da venda, com apoio pré e pós-venda e envio para todas as ilhas de Cabo Verde.'],
    ['Com quem falo se tiver um problema?','Diretamente pelo WhatsApp da ilha onde alugou: Mindelo +238 9585176 ou Praia +238 9544473. Ou por email para info@scooter-quad.com.'],
    ['O que acontece se eu devolver a scooter atrasado?',
     'Um atraso de mais de meia hora e até quatro horas sobre a hora combinada, sem nos avisar, custa metade da tarifa diária. Acima de quatro horas, é cobrada uma vez e meia a tarifa diária por cada dia de atraso. Um telefonema a avisar resolve quase sempre a situação, por isso liga-nos se vires que te atrasas.'],
    ['E se eu quiser ficar com o veículo mais tempo?',
     'Contacta-nos com antecedência para prolongarmos o contrato. É rápido e evita problemas. Sem esse prolongamento, o veículo passa a estar a ser usado sem a nossa autorização, com as consequências legais previstas no contrato, além do valor em dívida.'],
    ['E se chamar a assistência e a scooter estiver boa?',
     'Se nos chamares por avaria e a equipa verificar no local que o veículo está em condições normais de funcionamento, há uma penalização de 30 euros pelos custos da deslocação. Antes de ligares, confirma o combustível e o descanso lateral, que são as duas causas mais comuns.']
  ],
  footer: {
    tag:'Aluguer de scooters e quads, excursões guiadas e venda de usados em Cabo Verde desde 2022.',
    contactos:'Contactos', ilhas:'Ilhas', links:'Links',
    dir:'Todos os direitos reservados', priv:'Política de privacidade', termos:'Termos e condições',
    nota:'Depósito de 50% para confirmar · Cancelamento gratuito até 24h antes'
  },
  legal: {
    privT:'Política de privacidade',
    priv:[
      ['Quem somos','A Scooter & Quad é uma empresa sediada em Cabo Verde, com estabelecimentos no Mindelo (São Vicente) e na Praia (Santiago). Para qualquer questão sobre esta política, escreve para info@scooter-quad.com.'],
      ['Que dados recolhemos','Apenas os dados que nos envias voluntariamente através dos formulários do site: nome, email, telefone, ilha e os detalhes do pedido. Não recolhemos dados através de perfis de comportamento nem partilhamos informação com terceiros para fins publicitários.'],
      ['Para que usamos os dados','Exclusivamente para responder ao teu pedido, preparar a reserva ou a proposta de venda e cumprir as obrigações do contrato de aluguer.'],
      ['Durante quanto tempo','Mantemos os dados apenas durante o tempo necessário para responder ao pedido e cumprir as obrigações legais e contabilísticas aplicáveis.'],
      ['Cookies','Este site não usa cookies de publicidade nem de rastreio. A escolha do idioma é guardada no teu navegador para que não a tenhas de repetir.'],
      ['Os teus direitos','Podes pedir a qualquer momento o acesso, a correção ou a eliminação dos teus dados, escrevendo para info@scooter-quad.com.']
    ],
    termosT:'Termos e condições',
    termos:[
      ['Âmbito','Estas condições aplicam-se aos pedidos feitos através do site. As condições completas do aluguer constam do contrato assinado no momento do levantamento do veículo.'],
      ['Reservas','Os pedidos feitos no site não são reservas confirmadas. A reserva só fica confirmada após confirmação da nossa equipa e pagamento do depósito de 50% do valor.'],
      ['Documentos e requisitos','É necessário bilhete de identidade ou passaporte e carta de condução válida e adequada à categoria do veículo: A1 até 124cc, A acima de 124cc e B para quads. Nas excursões, o condutor deve ter mais de 21 anos.'],
      ['Caução e responsabilidade','É exigida caução no momento do levantamento, devolvida na entrega do veículo em boas condições. Não existe franquia: a responsabilidade do cliente por danos ou furto vai até ao limite da caução, nos termos do contrato.'],
      ['Alterações e cancelamentos','Alterações e cancelamentos são possíveis até 24 horas antes do início, com reembolso total. Dentro das 24 horas não são permitidos e não há lugar a reembolso. A devolução antecipada não dá direito a reembolso.'],
      ['Utilização do veículo','O uso de capacete é obrigatório para condutor e passageiro. O cliente compromete-se a respeitar o Código da Estrada em vigor em Cabo Verde e a devolver o veículo com o combustível ao mesmo nível do levantamento.'],
      ['Preços','Os preços apresentados incluem IVA e podem ser atualizados. Aplica-se o preço confirmado no momento da reserva.']
    ]
  }
},

/* ============================ ENGLISH ============================ */
en: {
  nav: { ilhas:'Islands', servicos:'Services', precos:'Prices', usados:'Used', sobre:'About us', faq:'FAQ', reservar:'Book now' },
  cta: { reservar:'Book now', pedir:'Send request', ver:'View details', saber:'Learn more', wa:'Chat on WhatsApp', voltar:'Back to home', orcamento:'Request a quote' },
  hero: { kicker:'Cape Verde · São Vicente · Santiago', t1:'Live the island.', t2:'Feel the road.',
    sub:'Guided quad excursions and scooter and quad rental in São Vicente. In Santiago, scooter, quad and car rental. Your Cape Verde adventure starts here.' },
  busca: { ilha:'Island', pick:'Pick-up', drop:'Return', servico:'Service' },
  passos: { p1:'Step 1', p2:'Step 2', p3:'Step 3', p4:'Step 4', p5:'Step 5' },
  home: {
    ilhasT:'Choose your island', ilhasS:'Each island offers different services. Tell us where you are and we will show you only what is available there.',
    servicosT:'Services in', servicosSv:'Guided quad excursions and scooter and quad rental. Guides in Portuguese, English, French and Spanish.',
    servicosSt:'Scooter and quad rental by the hour, by the day, by the week or long term. Helmets and insurance included.',
    frotaT:'Fleet in', frotaS:'Checked every day in our own workshop. Payment in cash (CVE/EUR) and VISA. Deposit returned when the vehicle comes back in good condition.',
    comoT:'How it works', comoS:'Everything you need to know before booking.',
    precosT:'Prices', precosS:'Official rates, VAT included, in escudos and euros.',
    faqT:'Frequently asked questions', faqS:'If you cannot find your answer, reach us on WhatsApp or by email.',
    usadosK:'After the experience', usadosT1:'Used scooters', usadosT2:'and quads',
    usadosP:'Used vehicles from our own fleet, serviced in our workshop before sale, with pre and after-sales support. We ship to every island in Cape Verde.',
    usadosB:'See vehicles for sale',
    contactosT:'Contacts in', contactosS:'We answer on WhatsApp or by email, in the language you prefer.',
    verIlha:'See the full page for'
  },
  svc: {
    exc4T:'Island loop by quad', exc4M:'Mindelo → Salamansa → Baía das Gatas → Calhau · 2 to 12 pax', exc4Tag:'Guided tour · 4h',
    exc2T:'Coast and viewpoints', exc2M:'Monte Cara, Laginha and fishing villages · 2 to 12 pax', exc2Tag:'Guided tour · 2h',
    scT:'Scooter at your own pace', scM:'By the hour, day or week · helmets and insurance included', scTag:'Rental',
    qdT:'Quad at your own pace', qdM:'Explore the island without a guide · category B licence', qdTag:'Rental',
    ldT:'Long term', ldM:'From 30 days, for companies and individuals · insurance, maintenance and replacement vehicle', ldTag:'Fleet',
    desde:'From', dia:'/day', sobConsulta:'On request', proposta:'Tailored quote'
  },
  svcDesc: {
    exc2:'You leave Mindelo on a quad, with a guide ahead of you, and follow the north coast up to Baía das Gatas. Along the way you stop at the viewpoints, the beaches and the fishing villages, with time for photos and a swim. Departs at 15:00. Helmet and insurance included.',
    exc4:'The full island route, from Mindelo to Salamansa, Baía das Gatas, Calhau and Ribeira de Calhau. For those who want to see São Vicente end to end in one day, with stops for a swim and for the fishing villages. Two departures a day, at 09:00 or 14:00. Helmet and insurance included.',
    sc:'You pick the scooter up at the shop, helmet and insurance already included, and you are free to ride wherever you like and stop wherever you feel like it. A hundred kilometres a day included, which is plenty for the island. If you would rather not count, there is an unlimited mileage rate.',
    qd:'The quad is yours in blocks of hours, with no guide and no itinerary. It is the right choice for leaving the tarmac and reaching the beaches cars cannot get to. Category B licence.',
    ld:'From thirty days up, with insurance, servicing and a replacement vehicle included. Built for companies and for anyone staying on the island for a whole season.',
    car:'For those travelling as a family, with luggage, or who simply prefer to stay under cover. A five-seat SUV with unlimited mileage.'
  },
  carros: {
    ficha:{ lugares:'Seats', km:'Mileage', kmIlim:'unlimited', caixa:'Gearbox', motor:'Engine', altura:'Ground clearance', bagageira:'Boot' },
    caixaAuto:'Automatic',
    equipa:{ ac:'Air conditioning', camara:'Reversing camera', carplay:'Apple CarPlay and Android Auto', bluetooth:'10.1 inch touchscreen', isofix:'ISOFIX child seat anchors' },
    equipaT:'Comes with',
    alturaNota:'Those 209 mm of ground clearance matter in Cape Verde: it reaches the beaches and viewpoints a city car cannot.',
    semFoto:'Photo coming soon',
    t:'Car rental', kicker:'Scooter & Quad Rent Cars',
    sub:'When there are four or five of you, or the luggage will not fit on a scooter.',
    legal:'Car rental service provided by MSB Rent a Car, MODU Scooter Boa Soc. Unipessoal Lda, in partnership with Scooter & Quad.',
    nota:'Unlimited mileage, with no daily cap and no charge per extra kilometre.',
    suplemento:'Unlimited mileage supplement, per day'
  },
  avaliacoes: {
    kicker:'Reviews', t:'What people who rode with us say',
    sub:'Real reviews left by customers on Google.',
    verGoogle:'See them all on Google', verGyg:'See them all on GetYourGuide', deixar:'Leave my review', em:'on'
  },
  usadosF: { ano:'Year', km:'Mileage', matricula:'Registration', cor:'Colour', galeria:'Photos of this actual vehicle',
    cores:{ 'Vermelha':'Red', 'Vermelho':'Red', 'Preto':'Black', 'Preta':'Black', 'Branco':'White', 'Branca':'White', 'Azul':'Blue', 'Cinzento':'Grey', 'Cinzenta':'Grey' } },
  seguroDestaque: {
    t:'Safety first',
    p:'For a few euros a day, the extra insurance covers damage to the vehicle up to the deposit amount. Without it, one scrape against a wall can cost you the whole deposit. It is always worth it.',
    cta:'Ask about the insurance'
  },
  info: {
    docT:'Documents', docP:'ID card or passport and a valid driving licence. The 124 cc Taro T9 requires category A1. Scooters above 125 cc require category A. Quads require category B.',
    cauT:'Deposit', cauP:'Paid in cash or by card and returned when the vehicle comes back in good condition. There is no excess: liability is capped at the deposit amount.',
    capT:'Helmets and insurance', capP:'Helmets are mandatory for rider and passenger and both are included. Third-party liability insurance also covers rider and passenger.',
    kmT:'Mileage limit', kmP:'100 km per day on the basic scooter rate. Above that, 0.30 € per km, or choose the unlimited mileage rate.',
    entT:'Hotel or airport delivery', entP:'We deliver and collect the vehicle at your hotel or at the airport for 12 € each way (20 € at the airport). Our team waits up to 20 minutes after the agreed time.',
    canT:'Changes and cancellation', canP:'Changes and cancellations up to 24 hours before, with a full refund. After that they are not allowed.'
  },
  horario: { aberturaT:'Opening hours', devolucaoT:'Pick-up and return', semana:'Monday to Sunday', domingo:'Public holidays',
    manha:'Morning', tarde:'Afternoon', almoco:'Closed for lunch from 13:00 to 14:00',
    marcacao:'by appointment', levantamento:'Pick-up', devolucao:'Return', aPartir:'from', ate:'until', fora:'Outside opening hours' },
  precos: {
    scooterT:'Scooter rental', quadT:'Quad rental', excT:'Quad excursions', extrasT:'Deposit and extras',
    dias:'Days', dia:'day', diasP:'days', duracao:'Duration', modelo:'Model', valor:'Price',
    incluiIva:'Prices include VAT. Payment in cash (escudos or euros) and VISA.',
    limiteKm:'Basic rate with a 100 km per day limit. Above that, 33 CVE (0.30 €) per additional km.',
    semLimite:'One-day rate with unlimited mileage',
    caucao:'Deposit (returned on delivery)', seguroExtra:'Extra insurance, per day (covers damage, not theft)',
    entrega:'Delivery and collection, each way', aeroporto:'Airport delivery and collection, each way',
    reserva:'Booking', reservaV:'50% of the total, paid at the time of booking',
    combustivel:'Fuel', combustivelV:'Market price per litre',
    quadNota:'Quads are rented in blocks of hours, always starting at 09:00 or 18:00.',
    excDuplo:'Two riders', excInd:'Single', excNota:'Groups of 2 to 12. Volta à Ilha departs at 09:00 or 14:00; Costa Norte departs at 15:00. Driver over 21 with a category B licence. Guides in Portuguese, English, French and Spanish.',
    horas:'hours', partida:'departs at'
  },
  ilha: {
    verFrota:'Available fleet', verPrecos:'Prices', ondeT:'Where we are',
    svIntro:'We are at Rua Senador Vera Cruz, in Mindelo. On this island we run guided quad excursions of 2 and 4 hours, scooter and quad rental, and long-term rental.',
    stIntro:'We are in Palmarejo Baixo, in the city of Praia. On this island we offer scooter and quad rental, by the hour, by the day or long term.',
    excursaoT:'Quad excursions', excursaoS:'Only in São Vicente. A guided adventure along trails and coastal roads, with stops for a swim and to visit the fishing villages.',
    rotaT:'Route', rota:'Mindelo → Salamansa → Baía das Gatas → Calhau → Ribeira de Calhau → Mindelo (Laginha)',
    incluiT:'Includes', inclui:['Tour guide service','New G Force 520L quad (500cc)','Third-party insurance','Safety briefing before departure'],
    naoIncluiT:'Does not include', naoInclui:['Hotel transfer','Meals and drinks'],
    requisitosT:'Requirements', requisitos:['Rider over 21 with a category B licence','Minimum passenger age: 7 years','Not recommended for people with reduced mobility'],
    levarT:'What to bring', levar:['Driving licence and ID document','Comfortable clothes, sunscreen and water','Swimsuit and towel for the stop at the bay','Sunglasses and a hat']
  },
  usados: {
    t1:'Used scooters', t2:'and quads',
    sub:'Vehicles from our own fleet, serviced in our workshop before sale. With pre and after-sales support and shipping to every island in Cape Verde.',
    todos:'All', scooters:'Scooters', quads:'Quads', disponiveis:'Available',
    ordenar:'Relevance', ccAsc:'Engine size ↑', ccDesc:'Engine size ↓',
    veiculo:'vehicle', veiculos:'vehicles',
    notaT:'Every used vehicle goes through our workshop',
    notaP:'Before going on sale, vehicles are serviced and prepared by our team. Condition, mileage and price are sent with the quote.',
    usada:'Used', usado:'Used', revista:'Serviced in our workshop', vendida:'Sold',
    sobConsulta:'On request', detalhePreco:'condition, mileage and price by email',
    comprar:'Buy', avisar:'Notify me', vendidaP:'see the other vehicles available',
    comoT:'How buying works',
    passos:[
      {t:'Choose the vehicle', p:'Browse the vehicles available and click Buy on the one you like.'},
      {t:'Get the quote', p:'We send you the condition, mileage, photos and price.'},
      {t:'See the vehicle', p:'You can see and try the vehicle at our shop, in Mindelo or in Praia.'},
      {t:'Delivery to your island', p:'We ship to every island in Cape Verde, with pre and after-sales support.'}
    ],
    duvidasT:'Questions? Talk to us',
    duvidasP:'Our team answers on WhatsApp in Mindelo and Praia, or by email. Support before and after the purchase.'
  },
  produto: {
    precoT:'Price on request', precoS:'We send the price, mileage and condition report with the quote.',
    ondeVer:'Where would you like to see the vehicle', envio:'Another island (we ship across Cape Verde)',
    oficina:'Vehicle from our own fleet, serviced and prepared in our workshop before sale.',
    comprar:'Buy and request a quote', fotos:'Request photos and mileage',
    t1:'Serviced in our workshop', t2:'Known history', t3:'Shipping to every island', t4:'Pre and after-sales support',
    sobreT:'About this vehicle',
    sobreP1:'One of the most complete scooters in our fleet, stable, powerful and comfortable for longer rides between towns and beaches.',
    sobreP2:'This unit comes from our own rental fleet, which means a known history and maintenance always carried out by our team. It is serviced and prepared in our workshop before sale.',
    incluiT:'What is included',
    inclui:['Full service and preparation in our workshop before delivery','Vehicle condition report and mileage','Known maintenance history','Shipping to every island in Cape Verde','After-sales support in Mindelo and Praia'],
    fichaT:'Specifications',
    f:{modelo:'Model',tipo:'Type',cc:'Engine size',carta:'Licence',estado:'Condition',km:'Mileage',prov:'Origin',lugares:'Seats',entrega:'Delivery'},
    fv:{scooter:'Scooter',usada:'Used · serviced in our workshop',km:'Sent with the quote',prov:'Scooter & Quad own fleet',lugares:'2 (rider + passenger)',entrega:'Mindelo, Praia or shipping to other islands'},
    fichaNota:'Full specifications, current photos and the condition report are sent by email with the quote.',
    outrosT:'Other used vehicles'
  },
  form: {
    kicker:'Without leaving the site', t:'Talk to us',
    sub:'Fill in the request and it goes straight into our queue. A manager from your island will reply by email or WhatsApp, usually the same day.',
    escolhe:'What do you need?',
    tipos:{reserva:'Book a rental',excursao:'Quad excursion',compra:'Buy a used vehicle',orcamento:'Request a quote',ficha:'More information'},
    nome:'Name', tel:'Phone (WhatsApp)', email:'Email', ilha:'Island', selecione:'Select…',
    servico:'Service', veiculo:'Vehicle', pick:'Pick-up date', drop:'Return date',
    pax:'Number of people', entrega:'Delivery and collection', modelo:'Used vehicle', msg:'Message',
    msgPh:'Tell us what you need: times, questions, special requests.',
    entregaOp:['At the shop','At the hotel (12 € each way)','At the airport (20 € each way)'],
    condicoes:'I have read and accept the conditions: 50% deposit to confirm the booking, security deposit on collection and cancellation policy up to 24 hours before.',
    erro:'Please fill in the required fields (*) and accept the conditions before sending.',
    enviar:'Send request', nota:'Sending opens your email app with the request filled in. If you prefer, use WhatsApp.',
    resumoT:'Request summary', tipo:'Type', datas:'Dates', deposito:'Deposit', depositoV:'50% to confirm',
    seguirT:'What happens next',
    seguir:[
      {t:'Request sent', p:'We receive your request by email with a reference.'},
      {t:'Manager assigned', p:'A manager from your island checks availability.'},
      {t:'Confirmation and contract', p:'We send the quote and the contract for signature.'},
      {t:'Pick-up', p:'At the shop, hotel or airport, as you chose.'}
    ],
    jaT:'Prefer to talk now?',
    okT:'Your request is ready to send!',
    okP:'We opened your email app with all the details filled in. Just press send. If it did not open, use WhatsApp below.',
    okRef:'Keep the reference to follow up on your request.',
    outro:'Make another request'
  },
  sobre: {
    t:'About us',
    intro:'Scooter & Quad is a Cape Verdean company specialising in scooter and quad rental and tourist excursions, present in São Vicente and Santiago.',
    p1:'Founded in 2022, the company draws on the experience of its founders, built over more than 20 years in the sector. Technical know-how, a modern fleet and complete services make Scooter & Quad a benchmark in the market.',
    servicosT:'What we do',
    servicos:['Short and long-term scooter and quad rental','Guided quad excursions in São Vicente','Sale of used scooters and quads from our fleet','Pre and after-sales support','Fleet management for companies'],
    segT:'Commitment to safety',
    seg:['Daily checks in our own mechanical workshop, so every vehicle is in perfect condition','Preventive maintenance as a priority','Helmets for rider and passenger included in every rental','Safety briefing before every excursion'],
    qualT:'Focus on quality',
    qual:['A fleet of modern, well-maintained vehicles','Logistics ready to respond quickly','Service in Portuguese, English, French and Spanish'],
    valoresT:'Our values',
    valores:[
      {n:'Innovation', p:'Constantly adapting to market needs and customer expectations.'},
      {n:'Sustainability', p:'Contributing to sustainable tourism in Cape Verde, promoting safety and respect for the local environment.'},
      {n:'Service excellence', p:'A complete experience, from first contact to after-sales support.'}
    ],
    missaoT:'Our mission',
    missao:'To give visitors to Cape Verde a safe and unforgettable experience, with high-quality services and excursions that showcase the natural and cultural beauty of the islands. We work to the highest standards of sustainability and promote responsible tourism that respects the local environment.',
    fecho:'Choosing Scooter & Quad means trusting professionals who bring passion, expertise and a focus on quality to everything they do.',
    stats:[{n:'2022',p:'Founded, with over 20 years of industry experience'},{n:'2',p:'Islands: São Vicente and Santiago'},{n:'4',p:'Languages spoken by our team'},{n:'100%',p:'Fleet checked daily in our workshop'}]
  },
  faq: [
    ['What is included in the rental?','A helmet for rider and passenger, compulsory third-party liability insurance, which also covers rider and passenger, and up to 100 km per day on scooters.'],
    ['What do I need to rent a scooter or quad?','ID card or passport, cash or a credit card for the deposit, and a valid driving licence meeting the requirements of the Cape Verdean Highway Code.'],
    ['Which licence category do I need?','Up to 124cc: category A1. Scooters above 124cc: category A. Quads: category B.'],
    ['How much is the deposit?','It depends on the model: 150 € for the T9 125cc, 200 € for the T11 300cc, 250 € for the T12 400cc and 250 € for the quad. It is paid in cash or by card and returned when the vehicle comes back in good condition. There is no excess: the customer\'s liability is capped at the deposit amount.'],
    ['Which payment methods do you accept?','Cash in escudos (CVE) or euros, and VISA.'],
    ['Is there a mileage limit?','The basic scooter rate includes 100 km per day. Above that, 33 CVE (0.30 €) per additional kilometre applies. There is also a one-day unlimited mileage rate: 42 € for the T9, 48 € for the T11 and 53 € for the T12.'],
    ['Do you deliver to the hotel or the airport?','Yes. Delivery and collection costs 12 € each way, or 20 € each way at the airport. Our team waits about 20 minutes after the agreed time.'],
    ['What are the pick-up and return hours?','Pick-up and return take place between 09:00 and 18:00. Outside those hours it is possible by prior arrangement.'],
    ['What does the insurance cover?','The insurance covers third-party damage and liability for rider and passenger. In case of damage or theft of the vehicle, the customer\'s liability is capped at the deposit amount, as set out in the contract. Accessories such as helmets and locks are not covered.'],
    ['Can I take out extra insurance?','Yes. Extra insurance costs 7 € for the T9, 9 € for the T11 and 12 € for the T12, and covers damage up to the deposit amount, but not theft. The specific conditions are set out in the contract.'],
    ['Can I change or cancel my booking?','Yes, up to 24 hours before the start date and time, by writing to info@scooter-quad.com. Cancellations more than 24 hours in advance are fully refunded. Within 24 hours, changes and refunded cancellations are not possible.'],
    ['How long are the excursions and how much do they cost?','Quad excursions run only in São Vicente: 4 hours for 100 € (two riders) or 85 € (single), and 2 hours for 85 € (two riders) or 70 € (single). Groups of 2 to 12, with guides in Portuguese, English, French and Spanish.'],
    ['What are the requirements to join an excursion?','The quad rider must be over 21 and hold a category B licence. The minimum passenger age is 7. The activity is not recommended for people with reduced mobility.'],
    ['Do you sell scooters and quads?','Yes, used vehicles from our own fleet, serviced in our workshop before sale, with pre and after-sales support and shipping to every island in Cape Verde.'],
    ['Who do I contact if I have a problem?','Directly on the WhatsApp number of the island where you rented: Mindelo +238 9585176 or Praia +238 9544473. Or by email to info@scooter-quad.com.'],
    ['What happens if I return the scooter late?',
     'Being more than half an hour and up to four hours late without telling us costs half the daily rate. Beyond four hours, one and a half times the daily rate is charged for each day of delay. A phone call almost always sorts it out, so call us if you see you are running late.'],
    ['What if I want to keep the vehicle longer?',
     'Contact us in advance so we can extend the contract. It is quick and it avoids trouble. Without that extension the vehicle is being used without our authorisation, with the legal consequences set out in the contract, on top of the amount owed.'],
    ['What if I call for assistance and the scooter is fine?',
     'If you call us out for a breakdown and the team finds on site that the vehicle is working normally, there is a 30 euro charge for the call-out. Before you call, check the fuel and the side stand, which are the two most common causes.']
  ],
  footer: { tag:'Scooter and quad rental, guided excursions and used vehicle sales in Cape Verde since 2022.',
    contactos:'Contacts', ilhas:'Islands', links:'Links', dir:'All rights reserved',
    priv:'Privacy policy', termos:'Terms and conditions', nota:'50% deposit to confirm · Free cancellation up to 24h before' },
  legal: {
    privT:'Privacy policy',
    priv:[
      ['Who we are','Scooter & Quad is a company based in Cape Verde, with premises in Mindelo (São Vicente) and Praia (Santiago). For any question about this policy, write to info@scooter-quad.com.'],
      ['What data we collect','Only the data you send us voluntarily through the forms on this site: name, email, phone, island and the details of your request. We do not build behavioural profiles and we do not share information with third parties for advertising.'],
      ['How we use it','Solely to answer your request, prepare the booking or the sales quote, and meet the obligations of the rental contract.'],
      ['How long we keep it','Only for as long as needed to answer the request and to meet applicable legal and accounting obligations.'],
      ['Cookies','This site uses no advertising or tracking cookies. Your language choice is stored in your browser so you do not have to set it again.'],
      ['Your rights','You may request access to, correction of, or deletion of your data at any time by writing to info@scooter-quad.com.']
    ],
    termosT:'Terms and conditions',
    termos:[
      ['Scope','These conditions apply to requests made through this website. The full rental conditions are set out in the contract signed when the vehicle is collected.'],
      ['Bookings','Requests made on the site are not confirmed bookings. A booking is confirmed only after our team confirms it and the 50% deposit is paid.'],
      ['Documents and requirements','An ID card or passport and a valid driving licence for the vehicle category are required: A1 up to 124cc, A above 124cc and B for quads. On excursions, the rider must be over 21.'],
      ['Deposit and liability','A security deposit is required at collection and returned when the vehicle comes back in good condition. There is no excess: the customer\'s liability for damage or theft is capped at the deposit amount, as set out in the contract.'],
      ['Changes and cancellations','Changes and cancellations are possible up to 24 hours before the start, with a full refund. Within 24 hours they are not allowed and no refund is due. Early return does not give rise to a refund.'],
      ['Use of the vehicle','Helmets are mandatory for rider and passenger. The customer undertakes to respect the Highway Code in force in Cape Verde and to return the vehicle with fuel at the same level as at collection.'],
      ['Prices','Prices shown include VAT and may be updated. The price confirmed at the time of booking applies.']
    ]
  }
},

/* ============================ ITALIANO ============================ */
it: {
  nav: { ilhas:'Isole', servicos:'Servizi', precos:'Prezzi', usados:'Usato', sobre:'Chi siamo', faq:'FAQ', reservar:'Prenota' },
  cta: { reservar:'Prenota', pedir:'Invia richiesta', ver:'Vedi dettagli', saber:'Scopri di più', wa:'Scrivici su WhatsApp', voltar:'Torna alla home', orcamento:'Richiedi preventivo' },
  hero: { kicker:'Capo Verde · São Vicente · Santiago', t1:'Vivi l’isola.', t2:'Senti la strada.',
    sub:'Escursioni guidate in quad e noleggio di scooter e quad a São Vicente. A Santiago, noleggio di scooter, quad e auto. La tua avventura a Capo Verde comincia qui.' },
  busca: { ilha:'Isola', pick:'Ritiro', drop:'Riconsegna', servico:'Servizio' },
  passos: { p1:'Passo 1', p2:'Passo 2', p3:'Passo 3', p4:'Passo 4', p5:'Passo 5' },
  home: {
    ilhasT:'Scegli la tua isola', ilhasS:'Ogni isola offre servizi diversi. Dicci dove sei e ti mostriamo solo ciò che è disponibile lì.',
    servicosT:'Servizi a', servicosSv:'Escursioni guidate in quad e noleggio di scooter e quad. Guide in portoghese, inglese, francese e spagnolo.',
    servicosSt:'Noleggio di scooter e quad, a ore, al giorno, alla settimana o a lungo termine. Caschi e assicurazione inclusi.',
    frotaT:'Flotta a', frotaS:'Controllata ogni giorno nella nostra officina. Pagamento in contanti (CVE/EUR) e VISA. Cauzione restituita alla riconsegna in buone condizioni.',
    comoT:'Come funziona', comoS:'Tutto quello che serve sapere prima di prenotare.',
    precosT:'Prezzi', precosS:'Tariffe ufficiali, IVA inclusa, in escudos e in euro.',
    faqT:'Domande frequenti', faqS:'Se non trovi la risposta, scrivici su WhatsApp o via email.',
    usadosK:'Dopo l’esperienza', usadosT1:'Scooter e quad', usadosT2:'usati',
    usadosP:'Veicoli usati della nostra flotta, revisionati nella nostra officina prima della vendita, con assistenza pre e post-vendita. Spediamo in tutte le isole di Capo Verde.',
    usadosB:'Vedi i veicoli in vendita',
    contactosT:'Contatti a', contactosS:'Ti rispondiamo su WhatsApp o via email, nella lingua che preferisci.',
    verIlha:'Vedi la pagina completa di'
  },
  svc: {
    exc4T:'Giro dell’isola in quad', exc4M:'Mindelo → Salamansa → Baía das Gatas → Calhau · da 2 a 12 pax', exc4Tag:'Escursione guidata · 4h',
    exc2T:'Costa e panorami', exc2M:'Monte Cara, Laginha e villaggi di pescatori · da 2 a 12 pax', exc2Tag:'Escursione guidata · 2h',
    scT:'Scooter al tuo ritmo', scM:'A ore, al giorno o alla settimana · caschi e assicurazione inclusi', scTag:'Noleggio',
    qdT:'Quad al tuo ritmo', qdM:'Esplora l’isola senza guida · patente categoria B', qdTag:'Noleggio',
    ldT:'Lungo termine', ldM:'Da 30 giorni, per aziende e privati · assicurazione, manutenzione e veicolo sostitutivo', ldTag:'Flotta',
    desde:'Da', dia:'/giorno', sobConsulta:'Su richiesta', proposta:'Proposta su misura'
  },
  svcDesc: {
    exc2:'Parti da Mindelo in quad, con una guida davanti a te, e segui la costa nord fino a Baía das Gatas. Lungo il percorso ti fermi ai punti panoramici, alle spiagge e ai villaggi di pescatori, con tempo per le foto e per un bagno. Parte alle 15:00. Casco e assicurazione inclusi.',
    exc4:'Il percorso completo dell’isola, da Mindelo a Salamansa, Baía das Gatas, Calhau e Ribeira de Calhau. Per chi vuole vedere São Vicente da un capo all’altro in un giorno solo, con soste per un bagno e per i villaggi di pescatori. Due partenze al giorno, alle 09:00 o alle 14:00. Casco e assicurazione inclusi.',
    sc:'Ritiri lo scooter in negozio, con casco e assicurazione già inclusi, e sei libero di andare dove vuoi e fermarti dove ti pare. Cento chilometri al giorno inclusi, più che sufficienti per l’isola. Se preferisci non fare conti, c’è la tariffa senza limite di chilometri.',
    qd:'Il quad è tuo a blocchi di ore, senza guida e senza itinerario. È la scelta giusta per lasciare l’asfalto e raggiungere le spiagge dove le auto non arrivano. Patente di categoria B.',
    ld:'Da trenta giorni in su, con assicurazione, manutenzione e veicolo sostitutivo inclusi. Pensato per le aziende e per chi resta sull’isola un’intera stagione.',
    car:'Per chi viaggia in famiglia, con i bagagli, o semplicemente preferisce stare al riparo. Un SUV a cinque posti con chilometri illimitati.'
  },
  carros: {
    ficha:{ lugares:'Posti', km:'Chilometri', kmIlim:'illimitati', caixa:'Cambio', motor:'Motore', altura:'Altezza da terra', bagageira:'Bagagliaio' },
    caixaAuto:'Automatico',
    equipa:{ ac:'Aria condizionata', camara:'Telecamera posteriore', carplay:'Apple CarPlay e Android Auto', bluetooth:'Schermo tattile da 10,1 pollici', isofix:'Attacchi ISOFIX per seggiolino' },
    equipaT:'In dotazione',
    alturaNota:'I 209 mm di altezza da terra contano a Capo Verde: arriva alle spiagge e ai punti panoramici dove un’auto da città non passa.',
    semFoto:'Foto in arrivo',
    t:'Noleggio auto', kicker:'Scooter & Quad Rent Cars',
    sub:'Quando siete in quattro o cinque, o quando i bagagli non stanno su uno scooter.',
    legal:'Servizio di noleggio auto fornito da MSB Rent a Car, MODU Scooter Boa Soc. Unipessoal Lda, in collaborazione con Scooter & Quad.',
    nota:'Chilometri illimitati, senza limite giornaliero né costo per chilometro aggiuntivo.',
    suplemento:'Supplemento senza limite di chilometri, al giorno'
  },
  avaliacoes: {
    kicker:'Recensioni', t:'Cosa dice chi è già stato con noi',
    sub:'Recensioni reali lasciate dai clienti su Google.',
    verGoogle:'Vedi tutte su Google', verGyg:'Vedi tutte su GetYourGuide', deixar:'Lascia la mia recensione', em:'su'
  },
  usadosF: { ano:'Anno', km:'Chilometri', matricula:'Targa', cor:'Colore', galeria:'Foto del veicolo in vendita',
    cores:{ 'Vermelha':'Rosso', 'Vermelho':'Rosso', 'Preto':'Nero', 'Preta':'Nero', 'Branco':'Bianco', 'Branca':'Bianco', 'Azul':'Blu', 'Cinzento':'Grigio', 'Cinzenta':'Grigio' } },
  seguroDestaque: {
    t:'La sicurezza prima di tutto',
    p:'Per pochi euro al giorno, l’assicurazione extra copre i danni al veicolo fino all’importo della cauzione. Senza, una graffiata contro un muro può costarti l’intera cauzione. Ne vale sempre la pena.',
    cta:'Chiedi informazioni sull’assicurazione'
  },
  info: {
    docT:'Documenti', docP:'Carta d’identità o passaporto e patente di guida valida. La Taro T9, da 124 cc, richiede la categoria A1. Gli scooter sopra i 125 cc richiedono la categoria A. I quad richiedono la categoria B.',
    cauT:'Cauzione', cauP:'Pagata in contanti o con carta e restituita alla riconsegna del veicolo in buone condizioni. Non esiste franchigia: la responsabilità arriva fino all’importo della cauzione.',
    capT:'Caschi e assicurazione', capP:'Casco obbligatorio per conducente e passeggero, entrambi inclusi. Assicurazione di responsabilità civile che copre anche conducente e passeggero.',
    kmT:'Limite di km', kmP:'100 km al giorno con la tariffa base per scooter. Oltre, 0,30 € per km, oppure scegli la tariffa senza limiti.',
    entT:'Consegna in hotel o aeroporto', entP:'Consegniamo e ritiriamo il veicolo in hotel o in aeroporto per 12 € a tratta (20 € in aeroporto). Il team attende fino a 20 minuti dopo l’orario concordato.',
    canT:'Modifiche e cancellazione', canP:'Modifiche e cancellazioni fino a 24 ore prima, con rimborso totale. Dopo non sono ammesse.'
  },
  horario: { aberturaT:'Orario di apertura', devolucaoT:'Ritiro e riconsegna', semana:'Da lunedì a domenica', domingo:'Giorni festivi',
    manha:'Mattina', tarde:'Pomeriggio', almoco:'Chiuso per pranzo dalle 13:00 alle 14:00',
    marcacao:'su appuntamento', levantamento:'Ritiro', devolucao:'Riconsegna', aPartir:'dalle', ate:'entro le', fora:'Fuori orario' },
  precos: {
    scooterT:'Noleggio scooter', quadT:'Noleggio quad', excT:'Escursioni in quad', extrasT:'Cauzione ed extra',
    dias:'Giorni', dia:'giorno', diasP:'giorni', duracao:'Durata', modelo:'Modello', valor:'Prezzo',
    incluiIva:'Prezzi IVA inclusa. Pagamento in contanti (escudos o euro) e VISA.',
    limiteKm:'Tariffa base con limite di 100 km al giorno. Oltre, 33 CVE (0,30 €) per km aggiuntivo.',
    semLimite:'Tariffa di 1 giorno senza limite di chilometri',
    caucao:'Cauzione (restituita alla riconsegna)', seguroExtra:'Assicurazione extra, al giorno (copre i danni, non il furto)',
    entrega:'Consegna e ritiro, a tratta', aeroporto:'Consegna e ritiro in aeroporto, a tratta',
    reserva:'Prenotazione', reservaV:'50% del totale, al momento della prenotazione',
    combustivel:'Carburante', combustivelV:'Prezzo di mercato al litro',
    quadNota:'Il quad si noleggia a blocchi di ore, sempre con inizio alle 09:00 o alle 18:00.',
    excDuplo:'In due', excInd:'Singolo', excNota:'Gruppi da 2 a 12 partecipanti. Volta à Ilha parte alle 09:00 o alle 14:00; Costa Norte parte alle 15:00. Conducente over 21 con patente di categoria B. Guide in portoghese, inglese, francese e spagnolo.',
    horas:'ore', partida:'partenza alle'
  },
  ilha: {
    verFrota:'Flotta disponibile', verPrecos:'Prezzi', ondeT:'Dove siamo',
    svIntro:'Siamo in Rua Senador Vera Cruz, a Mindelo. Su quest’isola organizziamo escursioni guidate in quad di 2 e 4 ore, noleggio di scooter e quad e noleggio a lungo termine.',
    stIntro:'Siamo a Palmarejo Baixo, nella città di Praia. Su quest’isola offriamo noleggio di scooter e quad, a ore, al giorno o a lungo termine.',
    excursaoT:'Escursioni in quad', excursaoS:'Solo a São Vicente. Un’avventura guidata tra sentieri e strade costiere, con soste per un bagno e per visitare i villaggi di pescatori.',
    rotaT:'Percorso', rota:'Mindelo → Salamansa → Baía das Gatas → Calhau → Ribeira de Calhau → Mindelo (Laginha)',
    incluiT:'Include', inclui:['Servizio di guida','Quad New G Force 520L (500cc)','Assicurazione contro terzi','Briefing di sicurezza prima della partenza'],
    naoIncluiT:'Non include', naoInclui:['Transfer da e per l’hotel','Pasti e bevande'],
    requisitosT:'Requisiti', requisitos:['Conducente maggiore di 21 anni con patente B','Età minima del passeggero: 7 anni','Non consigliato a persone con mobilità ridotta'],
    levarT:'Cosa portare', levar:['Patente e documento d’identità','Abbigliamento comodo, crema solare e acqua','Costume e telo per la sosta in baia','Occhiali da sole e cappello']
  },
  usados: {
    t1:'Scooter e quad', t2:'usati',
    sub:'Veicoli della nostra flotta, revisionati in officina prima della vendita. Con assistenza pre e post-vendita e spedizione in tutte le isole di Capo Verde.',
    todos:'Tutti', scooters:'Scooter', quads:'Quad', disponiveis:'Disponibili',
    ordenar:'Rilevanza', ccAsc:'Cilindrata ↑', ccDesc:'Cilindrata ↓',
    veiculo:'veicolo', veiculos:'veicoli',
    notaT:'Ogni usato passa dalla nostra officina',
    notaP:'Prima di essere messi in vendita, i veicoli vengono revisionati e preparati dal nostro team. Stato, chilometraggio e prezzo vengono inviati con il preventivo.',
    usada:'Usata', usado:'Usato', revista:'Revisionata in officina', vendida:'Venduta',
    sobConsulta:'Su richiesta', detalhePreco:'stato, km e prezzo via email',
    comprar:'Acquista', avisar:'Avvisami', vendidaP:'guarda gli altri veicoli disponibili',
    comoT:'Come funziona l’acquisto',
    passos:[
      {t:'Scegli il veicolo', p:'Sfoglia gli usati disponibili e clicca su Acquista su quello che ti interessa.'},
      {t:'Ricevi il preventivo', p:'Ti inviamo stato del veicolo, chilometraggio, foto e prezzo.'},
      {t:'Vedi il veicolo', p:'Puoi vedere e provare il veicolo nel nostro negozio, a Mindelo o a Praia.'},
      {t:'Consegna sulla tua isola', p:'Spediamo in tutte le isole di Capo Verde, con assistenza pre e post-vendita.'}
    ],
    duvidasT:'Domande? Parliamone',
    duvidasP:'Il nostro team risponde su WhatsApp a Mindelo e a Praia, oppure via email. Assistenza prima e dopo l’acquisto.'
  },
  produto: {
    precoT:'Prezzo su richiesta', precoS:'Inviamo prezzo, chilometraggio e rapporto sullo stato del veicolo insieme al preventivo.',
    ondeVer:'Dove vuoi vedere il veicolo', envio:'Altra isola (spediamo in tutte le isole di Capo Verde)',
    oficina:'Veicolo della nostra flotta, revisionato e preparato nella nostra officina prima della vendita.',
    comprar:'Acquista e richiedi preventivo', fotos:'Richiedi foto e chilometraggio',
    t1:'Revisionato in officina', t2:'Storia conosciuta', t3:'Spedizione in tutte le isole', t4:'Assistenza pre e post-vendita',
    sobreT:'Su questo veicolo',
    sobreP1:'Uno degli scooter più completi della nostra flotta, stabile, potente e comodo per percorsi più lunghi tra città e spiagge.',
    sobreP2:'Questa unità proviene dalla nostra flotta di noleggio: storia conosciuta e manutenzione sempre eseguita dal nostro team. Prima della vendita viene revisionata e preparata nella nostra officina.',
    incluiT:'Cosa è incluso',
    inclui:['Revisione e preparazione completa nella nostra officina prima della consegna','Rapporto sullo stato del veicolo e chilometraggio','Storico di manutenzione conosciuto','Spedizione in tutte le isole di Capo Verde','Assistenza post-vendita a Mindelo e a Praia'],
    fichaT:'Scheda tecnica',
    f:{modelo:'Modello',tipo:'Tipo',cc:'Cilindrata',carta:'Patente',estado:'Stato',km:'Chilometraggio',prov:'Provenienza',lugares:'Posti',entrega:'Consegna'},
    fv:{scooter:'Scooter',usada:'Usata · revisionata in officina',km:'Inviato con il preventivo',prov:'Flotta Scooter & Quad',lugares:'2 (conducente + passeggero)',entrega:'Mindelo, Praia o spedizione ad altre isole'},
    fichaNota:'La scheda completa, le foto attuali e il rapporto sullo stato vengono inviati via email con il preventivo.',
    outrosT:'Altri veicoli usati'
  },
  form: {
    kicker:'Senza uscire dal sito', t:'Parliamone',
    sub:'Compila la richiesta ed entra subito nella nostra coda. Un responsabile della tua isola ti risponde via email o WhatsApp, di solito in giornata.',
    escolhe:'Di cosa hai bisogno?',
    tipos:{reserva:'Prenota noleggio',excursao:'Escursione in quad',compra:'Acquista usato',orcamento:'Richiedi preventivo',ficha:'Altre informazioni'},
    nome:'Nome', tel:'Telefono (WhatsApp)', email:'Email', ilha:'Isola', selecione:'Seleziona…',
    servico:'Servizio', veiculo:'Veicolo', pick:'Data di ritiro', drop:'Data di riconsegna',
    pax:'Numero di persone', entrega:'Consegna e ritiro', modelo:'Veicolo usato', msg:'Messaggio',
    msgPh:'Dicci di cosa hai bisogno: orari, dubbi, richieste particolari.',
    entregaOp:['In negozio','In hotel (12 € a tratta)','In aeroporto (20 € a tratta)'],
    condicoes:'Ho letto e accetto le condizioni: acconto del 50% per confermare la prenotazione, cauzione al ritiro e politica di cancellazione fino a 24 ore prima.',
    erro:'Compila i campi obbligatori (*) e accetta le condizioni prima di inviare.',
    enviar:'Invia richiesta', nota:'L’invio apre il tuo programma di posta con la richiesta già compilata. Se preferisci, usa WhatsApp.',
    resumoT:'Riepilogo della richiesta', tipo:'Tipo', datas:'Date', deposito:'Acconto', depositoV:'50% per confermare',
    seguirT:'Cosa succede dopo',
    seguir:[
      {t:'Richiesta inviata', p:'Riceviamo la tua richiesta via email con un riferimento.'},
      {t:'Responsabile assegnato', p:'Un responsabile della tua isola verifica la disponibilità.'},
      {t:'Conferma e contratto', p:'Inviamo il preventivo e il contratto da firmare.'},
      {t:'Ritiro', p:'In negozio, in hotel o in aeroporto, come hai scelto.'}
    ],
    jaT:'Preferisci parlarne subito?',
    okT:'Richiesta pronta da inviare!',
    okP:'Abbiamo aperto il tuo programma di posta con tutti i dati compilati. Basta premere invia. Se non si è aperto, usa WhatsApp qui sotto.',
    okRef:'Conserva il riferimento per seguire la tua richiesta.',
    outro:'Fai un’altra richiesta'
  },
  sobre: {
    t:'Chi siamo',
    intro:'Scooter & Quad è un’azienda capoverdiana specializzata nel noleggio di scooter e quad e in escursioni turistiche, presente a São Vicente e a Santiago.',
    p1:'Fondata nel 2022, l’azienda si avvale dell’esperienza dei suoi promotori, maturata in oltre 20 anni nel settore. Competenza tecnica, flotta moderna e servizi completi fanno di Scooter & Quad un punto di riferimento sul mercato.',
    servicosT:'Cosa facciamo',
    servicos:['Noleggio di scooter e quad, a breve e lungo termine','Escursioni guidate in quad a São Vicente','Vendita di scooter e quad usati della nostra flotta','Assistenza pre e post-vendita','Gestione flotte per aziende'],
    segT:'Impegno per la sicurezza',
    seg:['Controlli quotidiani nella nostra officina, perché ogni veicolo sia in perfette condizioni','Manutenzione preventiva come priorità','Caschi per conducente e passeggero inclusi in ogni noleggio','Briefing di sicurezza prima di ogni escursione'],
    qualT:'Attenzione alla qualità',
    qual:['Flotta di veicoli moderni e ben mantenuti','Logistica pronta a rispondere rapidamente','Assistenza in portoghese, inglese, francese e spagnolo'],
    valoresT:'I nostri valori',
    valores:[
      {n:'Innovazione', p:'Adattamento costante alle esigenze del mercato e alle aspettative dei clienti.'},
      {n:'Sostenibilità', p:'Contributo al turismo sostenibile a Capo Verde, promuovendo sicurezza e rispetto per l’ambiente locale.'},
      {n:'Eccellenza nel servizio', p:'Un’esperienza completa, dal primo contatto all’assistenza post-vendita.'}
    ],
    missaoT:'La nostra missione',
    missao:'Offrire a chi visita Capo Verde un’esperienza sicura e indimenticabile, con servizi di alto livello ed escursioni che valorizzano la bellezza naturale e culturale delle isole. Operiamo secondo i più alti standard di sostenibilità e promuoviamo un turismo responsabile, rispettoso dell’ambiente locale.',
    fecho:'Scegliere Scooter & Quad significa affidarsi a professionisti che mettono passione, competenza e attenzione alla qualità in tutto ciò che fanno.',
    stats:[{n:'2022',p:'Anno di fondazione, con oltre 20 anni di esperienza nel settore'},{n:'2',p:'Isole: São Vicente e Santiago'},{n:'4',p:'Lingue parlate dal nostro team'},{n:'100%',p:'Flotta controllata ogni giorno in officina'}]
  },
  faq: [
    ['Cosa è incluso nel noleggio?','Casco per conducente e passeggero, assicurazione obbligatoria di responsabilità civile, che copre anche conducente e passeggero, e fino a 100 km al giorno sugli scooter.'],
    ['Cosa serve per noleggiare uno scooter o un quad?','Carta d’identità o passaporto, contanti o carta di credito per la cauzione e una patente valida conforme al Codice della Strada capoverdiano.'],
    ['Quale categoria di patente serve?','Fino a 124cc: categoria A1. Scooter oltre 124cc: categoria A. Quad: categoria B.'],
    ['Quanto è la cauzione?','Dipende dal modello: 150 € per la T9 125cc, 200 € per la T11 300cc, 250 € per la T12 400cc e 250 € per il quad. Si paga in contanti o con carta e viene restituita alla riconsegna del veicolo in buone condizioni. Non esiste franchigia: la responsabilità del cliente arriva fino all’importo della cauzione.'],
    ['Quali metodi di pagamento accettate?','Contanti in escudos (CVE) o euro e carta VISA.'],
    ['C’è un limite di chilometri?','La tariffa base per scooter include 100 km al giorno. Oltre, si applicano 33 CVE (0,30 €) per chilometro aggiuntivo. Esiste anche una tariffa di 1 giorno senza limiti: 42 € per la T9, 48 € per la T11 e 53 € per la T12.'],
    ['Consegnate in hotel o in aeroporto?','Sì. Consegna e ritiro costano 12 € a tratta, o 20 € a tratta in aeroporto. Il team attende circa 20 minuti dopo l’orario concordato.'],
    ['Qual è l’orario di ritiro e riconsegna?','Ritiro e riconsegna avvengono tra le 09:00 e le 18:00. Fuori orario è possibile su appuntamento.'],
    ['Cosa copre l’assicurazione?','L’assicurazione copre i danni a terzi e la responsabilità su conducente e passeggero. In caso di danno o furto del veicolo, la responsabilità del cliente arriva fino all’importo della cauzione, secondo contratto. Gli accessori, come caschi e lucchetti, non sono coperti.'],
    ['È possibile aggiungere un’assicurazione extra?','Sì. L’assicurazione extra costa 7 € per la T9, 9 € per la T11 e 12 € per la T12, e copre i danni fino all’importo della cauzione, ma non il furto. Le condizioni specifiche sono nel contratto.'],
    ['Posso modificare o cancellare la prenotazione?','Sì, fino a 24 ore prima della data e ora di inizio, scrivendo a info@scooter-quad.com. Le cancellazioni con più di 24 ore di anticipo sono rimborsate al 100%. Entro le 24 ore non sono ammesse modifiche né cancellazioni con rimborso.'],
    ['Quali sono durate e prezzi delle escursioni?','Le escursioni in quad si svolgono solo a São Vicente: 4 ore a 100 € (in due) o 85 € (singolo) e 2 ore a 85 € (in due) o 70 € (singolo). Gruppi da 2 a 12 partecipanti, con guide in portoghese, inglese, francese e spagnolo.'],
    ['Quali requisiti servono per l’escursione?','Il conducente del quad deve avere più di 21 anni e patente di categoria B. L’età minima del passeggero è 7 anni. L’attività non è consigliata a persone con mobilità ridotta.'],
    ['Vendete scooter e quad?','Sì, veicoli usati della nostra flotta, revisionati nella nostra officina prima della vendita, con assistenza pre e post-vendita e spedizione in tutte le isole di Capo Verde.'],
    ['Con chi parlo se ho un problema?','Direttamente sul WhatsApp dell’isola dove hai noleggiato: Mindelo +238 9585176 o Praia +238 9544473. Oppure via email a info@scooter-quad.com.'],
    ['Cosa succede se riconsegno lo scooter in ritardo?',
     'Un ritardo di oltre mezz’ora e fino a quattro ore sull’orario concordato, senza avvisarci, costa metà della tariffa giornaliera. Oltre le quattro ore viene addebitata una volta e mezza la tariffa giornaliera per ogni giorno di ritardo. Una telefonata risolve quasi sempre la situazione, quindi chiamaci se vedi che fai tardi.'],
    ['E se volessi tenere il veicolo più a lungo?',
     'Contattaci in anticipo per prolungare il contratto. È rapido ed evita problemi. Senza quel prolungamento il veicolo risulta utilizzato senza la nostra autorizzazione, con le conseguenze legali previste dal contratto, oltre all’importo dovuto.'],
    ['E se chiamo l’assistenza e lo scooter è a posto?',
     'Se ci chiami per un guasto e la squadra verifica sul posto che il veicolo funziona normalmente, viene applicata una penale di 30 euro per i costi dell’intervento. Prima di chiamare, controlla il carburante e il cavalletto laterale, le due cause più comuni.']
  ],
  footer: { tag:'Noleggio di scooter e quad, escursioni guidate e vendita di usato a Capo Verde dal 2022.',
    contactos:'Contatti', ilhas:'Isole', links:'Link', dir:'Tutti i diritti riservati',
    priv:'Informativa sulla privacy', termos:'Termini e condizioni', nota:'Acconto del 50% per confermare · Cancellazione gratuita fino a 24h prima' },
  legal: {
    privT:'Informativa sulla privacy',
    priv:[
      ['Chi siamo','Scooter & Quad è un’azienda con sede a Capo Verde, con punti vendita a Mindelo (São Vicente) e a Praia (Santiago). Per qualsiasi domanda su questa informativa, scrivi a info@scooter-quad.com.'],
      ['Quali dati raccogliamo','Solo i dati che ci invii volontariamente tramite i moduli del sito: nome, email, telefono, isola e i dettagli della richiesta. Non creiamo profili comportamentali e non condividiamo informazioni con terzi a fini pubblicitari.'],
      ['Come li usiamo','Esclusivamente per rispondere alla tua richiesta, preparare la prenotazione o il preventivo di vendita e adempiere agli obblighi del contratto di noleggio.'],
      ['Per quanto tempo','Solo per il tempo necessario a rispondere alla richiesta e ad adempiere agli obblighi legali e contabili applicabili.'],
      ['Cookie','Questo sito non utilizza cookie pubblicitari o di tracciamento. La scelta della lingua viene salvata nel tuo browser per non doverla ripetere.'],
      ['I tuoi diritti','Puoi richiedere in qualsiasi momento l’accesso, la correzione o la cancellazione dei tuoi dati scrivendo a info@scooter-quad.com.']
    ],
    termosT:'Termini e condizioni',
    termos:[
      ['Ambito','Queste condizioni si applicano alle richieste effettuate tramite il sito. Le condizioni complete del noleggio sono nel contratto firmato al momento del ritiro del veicolo.'],
      ['Prenotazioni','Le richieste inviate dal sito non sono prenotazioni confermate. La prenotazione è confermata solo dopo la conferma del nostro team e il pagamento dell’acconto del 50%.'],
      ['Documenti e requisiti','Servono carta d’identità o passaporto e patente valida per la categoria del veicolo: A1 fino a 124cc, A oltre 124cc e B per i quad. Nelle escursioni il conducente deve avere più di 21 anni.'],
      ['Cauzione e responsabilità','Al ritiro è richiesta una cauzione, restituita alla riconsegna del veicolo in buone condizioni. Non esiste franchigia: la responsabilità del cliente per danni o furto arriva fino all’importo della cauzione, secondo contratto.'],
      ['Modifiche e cancellazioni','Modifiche e cancellazioni sono possibili fino a 24 ore prima dell’inizio, con rimborso totale. Entro le 24 ore non sono ammesse e non spetta alcun rimborso. La riconsegna anticipata non dà diritto a rimborso.'],
      ['Uso del veicolo','Il casco è obbligatorio per conducente e passeggero. Il cliente si impegna a rispettare il Codice della Strada in vigore a Capo Verde e a riconsegnare il veicolo con il carburante allo stesso livello del ritiro.'],
      ['Prezzi','I prezzi indicati includono l’IVA e possono essere aggiornati. Si applica il prezzo confermato al momento della prenotazione.']
    ]
  }
},

/* ============================ FRANÇAIS ============================ */
fr: {
  nav: { ilhas:'Îles', servicos:'Services', precos:'Tarifs', usados:'Occasion', sobre:'À propos', faq:'FAQ', reservar:'Réserver' },
  cta: { reservar:'Réserver', pedir:'Envoyer la demande', ver:'Voir les détails', saber:'En savoir plus', wa:'Écrire sur WhatsApp', voltar:'Retour à l’accueil', orcamento:'Demander un devis' },
  hero: { kicker:'Cap-Vert · São Vicente · Santiago', t1:'Vis l’île.', t2:'Ressens la route.',
    sub:'Excursions guidées en quad et location de scooters et de quads à São Vicente. À Santiago, location de scooters, de quads et de voitures. Ton aventure au Cap-Vert commence ici.' },
  busca: { ilha:'Île', pick:'Prise en charge', drop:'Restitution', servico:'Service' },
  passos: { p1:'Étape 1', p2:'Étape 2', p3:'Étape 3', p4:'Étape 4', p5:'Étape 5' },
  home: {
    ilhasT:'Choisissez votre île', ilhasS:'Chaque île propose des services différents. Dites-nous où vous êtes et nous n’affichons que ce qui existe sur place.',
    servicosT:'Services à', servicosSv:'Excursions guidées en quad et location de scooters et de quads. Guides en portugais, anglais, français et espagnol.',
    servicosSt:'Location de scooters et de quads, à l’heure, à la journée, à la semaine ou en longue durée. Casques et assurance inclus.',
    frotaT:'Flotte à', frotaS:'Vérifiée chaque jour dans notre atelier. Paiement en espèces (CVE/EUR) et VISA. Caution restituée au retour du véhicule en bon état.',
    comoT:'Comment ça marche', comoS:'Tout ce qu’il faut savoir avant de réserver.',
    precosT:'Tarifs', precosS:'Tarifs officiels, TVA incluse, en escudos et en euros.',
    faqT:'Questions fréquentes', faqS:'Si vous ne trouvez pas la réponse, écrivez-nous sur WhatsApp ou par email.',
    usadosK:'Après l’expérience', usadosT1:'Scooters et quads', usadosT2:'d’occasion',
    usadosP:'Véhicules d’occasion de notre flotte, révisés dans notre atelier avant la vente, avec assistance avant et après-vente. Nous livrons dans toutes les îles du Cap-Vert.',
    usadosB:'Voir les véhicules à vendre',
    contactosT:'Contacts à', contactosS:'Nous répondons sur WhatsApp ou par email, dans la langue de votre choix.',
    verIlha:'Voir la page complète de'
  },
  svc: {
    exc4T:'Tour de l’île en quad', exc4M:'Mindelo → Salamansa → Baía das Gatas → Calhau · 2 à 12 pers.', exc4Tag:'Excursion guidée · 4h',
    exc2T:'Côte et points de vue', exc2M:'Monte Cara, Laginha et villages de pêcheurs · 2 à 12 pers.', exc2Tag:'Excursion guidée · 2h',
    scT:'Scooter à votre rythme', scM:'À l’heure, à la journée ou à la semaine · casques et assurance inclus', scTag:'Location',
    qdT:'Quad à votre rythme', qdM:'Explorez l’île sans guide · permis catégorie B', qdTag:'Location',
    ldT:'Longue durée', ldM:'À partir de 30 jours, pour entreprises et particuliers · assurance, entretien et véhicule de remplacement', ldTag:'Flotte',
    desde:'À partir de', dia:'/jour', sobConsulta:'Sur demande', proposta:'Devis sur mesure'
  },
  svcDesc: {
    exc2:'Vous partez de Mindelo en quad, guide en tête, et suivez la côte nord jusqu’à Baía das Gatas. En chemin, vous vous arrêtez aux points de vue, sur les plages et dans les villages de pêcheurs, avec le temps pour les photos et pour une baignade. Départ à 15:00. Casque et assurance inclus.',
    exc4:'L’itinéraire complet de l’île, de Mindelo à Salamansa, Baía das Gatas, Calhau et Ribeira de Calhau. Pour qui veut voir São Vicente d’un bout à l’autre dans la même journée, avec des arrêts pour une baignade et pour les villages de pêcheurs. Deux départs par jour, à 09:00 ou à 14:00. Casque et assurance inclus.',
    sc:'Vous récupérez le scooter à la boutique, casque et assurance déjà inclus, et vous êtes libre de rouler où vous voulez et de vous arrêter où bon vous semble. Cent kilomètres par jour inclus, largement de quoi faire le tour de l’île. Si vous préférez ne pas compter, il existe un tarif sans limite de kilomètres.',
    qd:'Le quad est à vous par blocs d’heures, sans guide et sans itinéraire. C’est le bon choix pour quitter le bitume et atteindre les plages où les voitures ne vont pas. Permis de catégorie B.',
    ld:'À partir de trente jours, avec assurance, entretien et véhicule de remplacement inclus. Pensé pour les entreprises et pour ceux qui restent sur l’île toute une saison.',
    car:'Pour ceux qui voyagent en famille, avec des bagages, ou qui préfèrent simplement être à l’abri. Un SUV cinq places, kilométrage illimité.'
  },
  carros: {
    ficha:{ lugares:'Places', km:'Kilométrage', kmIlim:'illimité', caixa:'Boîte', motor:'Moteur', altura:'Garde au sol', bagageira:'Coffre' },
    caixaAuto:'Automatique',
    equipa:{ ac:'Climatisation', camara:'Caméra de recul', carplay:'Apple CarPlay et Android Auto', bluetooth:'Écran tactile de 10,1 pouces', isofix:'Fixations ISOFIX pour siège enfant' },
    equipaT:'Équipé de',
    alturaNota:'Les 209 mm de garde au sol comptent au Cap-Vert : il atteint les plages et les points de vue où une citadine ne passe pas.',
    semFoto:'Photo à venir',
    t:'Location de voitures', kicker:'Scooter & Quad Rent Cars',
    sub:'Quand vous êtes quatre ou cinq, ou que les bagages ne tiennent pas sur un scooter.',
    legal:'Service de location de voitures assuré par MSB Rent a Car, MODU Scooter Boa Soc. Unipessoal Lda, en partenariat avec Scooter & Quad.',
    nota:'Kilométrage illimité, sans plafond journalier ni coût par kilomètre supplémentaire.',
    suplemento:'Supplément sans limite de kilomètres, par jour'
  },
  avaliacoes: {
    kicker:'Avis', t:'Ce que disent ceux qui sont venus',
    sub:'Avis réels laissés par des clients sur Google.',
    verGoogle:'Voir tous les avis sur Google', verGyg:'Voir tous les avis sur GetYourGuide', deixar:'Laisser mon avis', em:'sur'
  },
  usadosF: { ano:'Année', km:'Kilométrage', matricula:'Immatriculation', cor:'Couleur', galeria:'Photos du véhicule mis en vente',
    cores:{ 'Vermelha':'Rouge', 'Vermelho':'Rouge', 'Preto':'Noir', 'Preta':'Noir', 'Branco':'Blanc', 'Branca':'Blanc', 'Azul':'Bleu', 'Cinzento':'Gris', 'Cinzenta':'Gris' } },
  seguroDestaque: {
    t:'La sécurité d’abord',
    p:'Pour quelques euros par jour, l’assurance complémentaire couvre les dommages au véhicule jusqu’au montant de la caution. Sans elle, une éraflure contre un mur peut vous coûter la caution entière. Cela en vaut toujours la peine.',
    cta:'Poser une question sur l’assurance'
  },
  info: {
    docT:'Documents', docP:'Carte d’identité ou passeport et permis de conduire valide. La Taro T9, de 124 cc, exige la catégorie A1. Les scooters de plus de 125 cc exigent la catégorie A. Les quads exigent la catégorie B.',
    cauT:'Caution', cauP:'Payée en espèces ou par carte et restituée au retour du véhicule en bon état. Il n’y a pas de franchise : la responsabilité est plafonnée au montant de la caution.',
    capT:'Casques et assurance', capP:'Le casque est obligatoire pour le conducteur et le passager, les deux sont inclus. L’assurance responsabilité civile couvre aussi le conducteur et le passager.',
    kmT:'Limite de km', kmP:'100 km par jour avec le tarif de base scooter. Au-delà, 0,30 € par km, ou choisissez le tarif sans limite.',
    entT:'Livraison à l’hôtel ou à l’aéroport', entP:'Nous livrons et récupérons le véhicule à votre hôtel ou à l’aéroport pour 12 € par trajet (20 € à l’aéroport). L’équipe attend jusqu’à 20 minutes après l’heure convenue.',
    canT:'Modifications et annulation', canP:'Modifications et annulations jusqu’à 24 heures avant, avec remboursement intégral. Passé ce délai, elles ne sont pas possibles.'
  },
  horario: { aberturaT:'Horaires d’ouverture', devolucaoT:'Prise en charge et restitution', semana:'Du lundi au dimanche', domingo:'Jours fériés',
    manha:'Matin', tarde:'Après-midi', almoco:'Fermé pour le déjeuner de 13:00 à 14:00',
    marcacao:'sur rendez-vous', levantamento:'Prise en charge', devolucao:'Restitution', aPartir:'à partir de', ate:'jusqu’à', fora:'En dehors des horaires' },
  precos: {
    scooterT:'Location de scooter', quadT:'Location de quad', excT:'Excursions en quad', extrasT:'Caution et suppléments',
    dias:'Jours', dia:'jour', diasP:'jours', duracao:'Durée', modelo:'Modèle', valor:'Tarif',
    incluiIva:'Tarifs TVA incluse. Paiement en espèces (escudos ou euros) et VISA.',
    limiteKm:'Tarif de base limité à 100 km par jour. Au-delà, 33 CVE (0,30 €) par km supplémentaire.',
    semLimite:'Tarif 1 jour sans limite de kilométrage',
    caucao:'Caution (restituée au retour)', seguroExtra:'Assurance complémentaire, par jour (couvre les dommages, pas le vol)',
    entrega:'Livraison et récupération, par trajet', aeroporto:'Livraison et récupération à l’aéroport, par trajet',
    reserva:'Réservation', reservaV:'50 % du total, au moment de la réservation',
    combustivel:'Carburant', combustivelV:'Prix du marché au litre',
    quadNota:'Le quad se loue par blocs d’heures, toujours à partir de 09h ou 18h.',
    excDuplo:'À deux', excInd:'Individuel', excNota:'Groupes de 2 à 12 personnes. Volta à Ilha part à 09:00 ou à 14:00 ; Costa Norte part à 15:00. Conducteur de plus de 21 ans avec permis de catégorie B. Guides en portugais, anglais, français et espagnol.',
    horas:'heures', partida:'départ à'
  },
  ilha: {
    verFrota:'Flotte disponible', verPrecos:'Tarifs', ondeT:'Où nous trouver',
    svIntro:'Nous sommes Rua Senador Vera Cruz, à Mindelo. Sur cette île, nous proposons des excursions guidées en quad de 2 et 4 heures, la location de scooters et de quads, et la location longue durée.',
    stIntro:'Nous sommes à Palmarejo Baixo, dans la ville de Praia. Sur cette île, nous proposons la location de scooters et de quads, à l’heure, à la journée ou en longue durée.',
    excursaoT:'Excursions en quad', excursaoS:'Uniquement à São Vicente. Une aventure guidée sur les pistes et les routes côtières, avec des arrêts baignade et la visite des villages de pêcheurs.',
    rotaT:'Itinéraire', rota:'Mindelo → Salamansa → Baía das Gatas → Calhau → Ribeira de Calhau → Mindelo (Laginha)',
    incluiT:'Comprend', inclui:['Service de guide','Quad New G Force 520L (500cc)','Assurance au tiers','Briefing de sécurité avant le départ'],
    naoIncluiT:'Ne comprend pas', naoInclui:['Transfert depuis et vers l’hôtel','Repas et boissons'],
    requisitosT:'Conditions', requisitos:['Conducteur de plus de 21 ans avec permis B','Âge minimum du passager : 7 ans','Déconseillé aux personnes à mobilité réduite'],
    levarT:'À emporter', levar:['Permis de conduire et pièce d’identité','Vêtements confortables, crème solaire et eau','Maillot de bain et serviette pour l’arrêt à la baie','Lunettes de soleil et chapeau']
  },
  usados: {
    t1:'Scooters et quads', t2:'d’occasion',
    sub:'Véhicules de notre flotte, révisés en atelier avant la vente. Avec assistance avant et après-vente et livraison dans toutes les îles du Cap-Vert.',
    todos:'Tous', scooters:'Scooters', quads:'Quads', disponiveis:'Disponibles',
    ordenar:'Pertinence', ccAsc:'Cylindrée ↑', ccDesc:'Cylindrée ↓',
    veiculo:'véhicule', veiculos:'véhicules',
    notaT:'Chaque véhicule d’occasion passe par notre atelier',
    notaP:'Avant la mise en vente, les véhicules sont révisés et préparés par notre équipe. L’état, le kilométrage et le prix sont envoyés avec le devis.',
    usada:'Occasion', usado:'Occasion', revista:'Révisé en atelier', vendida:'Vendu',
    sobConsulta:'Sur demande', detalhePreco:'état, km et prix par email',
    comprar:'Acheter', avisar:'Me prévenir', vendidaP:'voir les autres véhicules disponibles',
    comoT:'Comment se passe l’achat',
    passos:[
      {t:'Choisissez le véhicule', p:'Parcourez les véhicules disponibles et cliquez sur Acheter.'},
      {t:'Recevez le devis', p:'Nous envoyons l’état du véhicule, le kilométrage, les photos et le prix.'},
      {t:'Voyez le véhicule', p:'Vous pouvez voir et essayer le véhicule dans notre boutique, à Mindelo ou à Praia.'},
      {t:'Livraison sur votre île', p:'Nous livrons dans toutes les îles du Cap-Vert, avec assistance avant et après-vente.'}
    ],
    duvidasT:'Des questions ? Parlons-en',
    duvidasP:'Notre équipe répond sur WhatsApp à Mindelo et à Praia, ou par email. Assistance avant et après l’achat.'
  },
  produto: {
    precoT:'Prix sur demande', precoS:'Nous envoyons le prix, le kilométrage et le rapport d’état du véhicule avec le devis.',
    ondeVer:'Où souhaitez-vous voir le véhicule', envio:'Autre île (nous livrons dans tout le Cap-Vert)',
    oficina:'Véhicule de notre flotte, révisé et préparé dans notre atelier avant la vente.',
    comprar:'Acheter et demander un devis', fotos:'Demander photos et kilométrage',
    t1:'Révisé en atelier', t2:'Historique connu', t3:'Livraison dans toutes les îles', t4:'Assistance avant et après-vente',
    sobreT:'À propos de ce véhicule',
    sobreP1:'L’un des scooters les plus complets de notre flotte, stable, puissant et confortable pour les trajets plus longs entre villes et plages.',
    sobreP2:'Ce véhicule provient de notre propre flotte de location : historique connu et entretien toujours réalisé par notre équipe. Il est révisé et préparé dans notre atelier avant la vente.',
    incluiT:'Ce qui est inclus',
    inclui:['Révision et préparation complètes dans notre atelier avant la livraison','Rapport d’état du véhicule et kilométrage','Historique d’entretien connu','Livraison dans toutes les îles du Cap-Vert','Assistance après-vente à Mindelo et à Praia'],
    fichaT:'Fiche technique',
    f:{modelo:'Modèle',tipo:'Type',cc:'Cylindrée',carta:'Permis',estado:'État',km:'Kilométrage',prov:'Provenance',lugares:'Places',entrega:'Livraison'},
    fv:{scooter:'Scooter',usada:'Occasion · révisé en atelier',km:'Envoyé avec le devis',prov:'Flotte Scooter & Quad',lugares:'2 (conducteur + passager)',entrega:'Mindelo, Praia ou livraison vers d’autres îles'},
    fichaNota:'La fiche complète, les photos actuelles et le rapport d’état sont envoyés par email avec le devis.',
    outrosT:'Autres véhicules d’occasion'
  },
  form: {
    kicker:'Sans quitter le site', t:'Parlons-en',
    sub:'Remplissez la demande et elle entre directement dans notre file. Un responsable de votre île vous répond par email ou WhatsApp, en général le jour même.',
    escolhe:'De quoi avez-vous besoin ?',
    tipos:{reserva:'Réserver une location',excursao:'Excursion en quad',compra:'Acheter une occasion',orcamento:'Demander un devis',ficha:'Plus d’informations'},
    nome:'Nom', tel:'Téléphone (WhatsApp)', email:'Email', ilha:'Île', selecione:'Sélectionnez…',
    servico:'Service', veiculo:'Véhicule', pick:'Date de prise en charge', drop:'Date de restitution',
    pax:'Nombre de personnes', entrega:'Livraison et récupération', modelo:'Véhicule d’occasion', msg:'Message',
    msgPh:'Dites-nous ce dont vous avez besoin : horaires, questions, demandes particulières.',
    entregaOp:['À la boutique','À l’hôtel (12 € par trajet)','À l’aéroport (20 € par trajet)'],
    condicoes:'J’ai lu et j’accepte les conditions : acompte de 50 % pour confirmer la réservation, caution à la prise en charge et politique d’annulation jusqu’à 24 heures avant.',
    erro:'Remplissez les champs obligatoires (*) et acceptez les conditions avant d’envoyer.',
    enviar:'Envoyer la demande', nota:'L’envoi ouvre votre messagerie avec la demande déjà remplie. Si vous préférez, utilisez WhatsApp.',
    resumoT:'Résumé de la demande', tipo:'Type', datas:'Dates', deposito:'Acompte', depositoV:'50 % pour confirmer',
    seguirT:'Ce qui se passe ensuite',
    seguir:[
      {t:'Demande envoyée', p:'Nous recevons votre demande par email avec une référence.'},
      {t:'Responsable assigné', p:'Un responsable de votre île vérifie la disponibilité.'},
      {t:'Confirmation et contrat', p:'Nous envoyons le devis et le contrat à signer.'},
      {t:'Prise en charge', p:'À la boutique, à l’hôtel ou à l’aéroport, selon votre choix.'}
    ],
    jaT:'Vous préférez en parler tout de suite ?',
    okT:'Votre demande est prête à partir !',
    okP:'Nous avons ouvert votre messagerie avec toutes les informations. Il ne reste qu’à envoyer. Si elle ne s’est pas ouverte, utilisez WhatsApp ci-dessous.',
    okRef:'Conservez la référence pour suivre votre demande.',
    outro:'Faire une autre demande'
  },
  sobre: {
    t:'À propos',
    intro:'Scooter & Quad est une entreprise capverdienne spécialisée dans la location de scooters et de quads et dans les excursions touristiques, présente à São Vicente et à Santiago.',
    p1:'Fondée en 2022, l’entreprise s’appuie sur l’expérience de ses fondateurs, acquise en plus de 20 ans dans le secteur. Savoir-faire technique, flotte moderne et services complets font de Scooter & Quad une référence sur le marché.',
    servicosT:'Ce que nous faisons',
    servicos:['Location de scooters et de quads, courte et longue durée','Excursions guidées en quad à São Vicente','Vente de scooters et de quads d’occasion de notre flotte','Assistance avant et après-vente','Gestion de flotte pour les entreprises'],
    segT:'Engagement pour la sécurité',
    seg:['Contrôles quotidiens dans notre atelier, pour que chaque véhicule soit en parfait état','L’entretien préventif comme priorité','Casques pour conducteur et passager inclus dans chaque location','Briefing de sécurité avant chaque excursion'],
    qualT:'Exigence de qualité',
    qual:['Une flotte de véhicules modernes et bien entretenus','Une logistique prête à répondre rapidement','Un accueil en portugais, anglais, français et espagnol'],
    valoresT:'Nos valeurs',
    valores:[
      {n:'Innovation', p:'Adaptation constante aux besoins du marché et aux attentes des clients.'},
      {n:'Durabilité', p:'Contribution au tourisme durable au Cap-Vert, en promouvant la sécurité et le respect de l’environnement local.'},
      {n:'Excellence du service', p:'Une expérience complète, du premier contact à l’assistance après-vente.'}
    ],
    missaoT:'Notre mission',
    missao:'Offrir à ceux qui visitent le Cap-Vert une expérience sûre et inoubliable, avec des services de haut niveau et des excursions qui mettent en valeur la beauté naturelle et culturelle des îles. Nous travaillons selon les plus hauts standards de durabilité et promouvons un tourisme responsable, respectueux de l’environnement local.',
    fecho:'Choisir Scooter & Quad, c’est faire confiance à des professionnels qui mettent passion, compétence et exigence de qualité dans tout ce qu’ils font.',
    stats:[{n:'2022',p:'Année de création, avec plus de 20 ans d’expérience dans le secteur'},{n:'2',p:'Îles : São Vicente et Santiago'},{n:'4',p:'Langues parlées par notre équipe'},{n:'100%',p:'Flotte vérifiée chaque jour dans notre atelier'}]
  },
  faq: [
    ['Qu’est-ce qui est inclus dans la location ?','Un casque pour le conducteur et le passager, l’assurance responsabilité civile obligatoire, qui couvre aussi le conducteur et le passager, et jusqu’à 100 km par jour sur les scooters.'],
    ['De quoi ai-je besoin pour louer un scooter ou un quad ?','Carte d’identité ou passeport, espèces ou carte de crédit pour la caution, et un permis de conduire valide conforme au Code de la route capverdien.'],
    ['Quelle catégorie de permis faut-il ?','Jusqu’à 124cc : catégorie A1. Scooters au-delà de 124cc : catégorie A. Quads : catégorie B.'],
    ['À combien s’élève la caution ?','Cela dépend du modèle : 150 € pour la T9 125cc, 200 € pour la T11 300cc, 250 € pour la T12 400cc et 250 € pour le quad. Elle se paie en espèces ou par carte et est restituée au retour du véhicule en bon état. Il n’y a pas de franchise : la responsabilité du client est plafonnée au montant de la caution.'],
    ['Quels moyens de paiement acceptez-vous ?','Espèces en escudos (CVE) ou en euros, et carte VISA.'],
    ['Y a-t-il une limite de kilomètres ?','Le tarif de base scooter comprend 100 km par jour. Au-delà, 33 CVE (0,30 €) par kilomètre supplémentaire s’appliquent. Il existe aussi un tarif 1 jour sans limite : 42 € pour la T9, 48 € pour la T11 et 53 € pour la T12.'],
    ['Livrez-vous à l’hôtel ou à l’aéroport ?','Oui. La livraison et la récupération coûtent 12 € par trajet, ou 20 € par trajet à l’aéroport. L’équipe attend environ 20 minutes après l’heure convenue.'],
    ['Quels sont les horaires de prise en charge et de restitution ?','La prise en charge et la restitution se font entre 09h et 18h. En dehors de ces horaires, c’est possible sur rendez-vous.'],
    ['Que couvre l’assurance ?','L’assurance couvre les dommages aux tiers et la responsabilité pour le conducteur et le passager. En cas de dommage ou de vol du véhicule, la responsabilité du client est plafonnée au montant de la caution, selon le contrat. Les accessoires, casques et antivols, ne sont pas couverts.'],
    ['Peut-on souscrire une assurance complémentaire ?','Oui. L’assurance complémentaire coûte 7 € pour la T9, 9 € pour la T11 et 12 € pour la T12, et couvre les dommages jusqu’au montant de la caution, mais pas le vol. Les conditions figurent dans le contrat.'],
    ['Puis-je modifier ou annuler ma réservation ?','Oui, jusqu’à 24 heures avant la date et l’heure de début, en écrivant à info@scooter-quad.com. Les annulations à plus de 24 heures sont intégralement remboursées. Dans les 24 heures, les modifications et les annulations remboursées ne sont pas possibles.'],
    ['Quelles sont les durées et les tarifs des excursions ?','Les excursions en quad n’ont lieu qu’à São Vicente : 4 heures à 100 € (à deux) ou 85 € (individuel), et 2 heures à 85 € (à deux) ou 70 € (individuel). Groupes de 2 à 12, avec des guides en portugais, anglais, français et espagnol.'],
    ['Quelles sont les conditions pour participer à une excursion ?','Le conducteur du quad doit avoir plus de 21 ans et un permis de catégorie B. L’âge minimum du passager est de 7 ans. L’activité est déconseillée aux personnes à mobilité réduite.'],
    ['Vendez-vous des scooters et des quads ?','Oui, des véhicules d’occasion de notre flotte, révisés dans notre atelier avant la vente, avec assistance avant et après-vente et livraison dans toutes les îles du Cap-Vert.'],
    ['Qui contacter en cas de problème ?','Directement sur le WhatsApp de l’île où vous avez loué : Mindelo +238 9585176 ou Praia +238 9544473. Ou par email à info@scooter-quad.com.'],
    ['Que se passe-t-il si je rends le scooter en retard ?',
     'Un retard de plus d’une demi-heure et jusqu’à quatre heures sur l’horaire convenu, sans nous prévenir, coûte la moitié du tarif journalier. Au-delà de quatre heures, une fois et demie le tarif journalier est facturée pour chaque jour de retard. Un appel règle presque toujours la situation, alors appelle-nous si tu vois que tu es en retard.'],
    ['Et si je veux garder le véhicule plus longtemps ?',
     'Contacte-nous à l’avance pour prolonger le contrat. C’est rapide et cela évite les ennuis. Sans cette prolongation, le véhicule est utilisé sans notre autorisation, avec les conséquences légales prévues au contrat, en plus du montant dû.'],
    ['Et si j’appelle l’assistance et que le scooter va bien ?',
     'Si tu nous appelles pour une panne et que l’équipe constate sur place que le véhicule fonctionne normalement, une pénalité de 30 euros s’applique pour les frais de déplacement. Avant d’appeler, vérifie le carburant et la béquille latérale, les deux causes les plus fréquentes.']
  ],
  footer: { tag:'Location de scooters et de quads, excursions guidées et vente d’occasions au Cap-Vert depuis 2022.',
    contactos:'Contacts', ilhas:'Îles', links:'Liens', dir:'Tous droits réservés',
    priv:'Politique de confidentialité', termos:'Conditions générales', nota:'Acompte de 50 % pour confirmer · Annulation gratuite jusqu’à 24h avant' },
  legal: {
    privT:'Politique de confidentialité',
    priv:[
      ['Qui nous sommes','Scooter & Quad est une entreprise basée au Cap-Vert, avec des établissements à Mindelo (São Vicente) et à Praia (Santiago). Pour toute question sur cette politique, écrivez à info@scooter-quad.com.'],
      ['Quelles données nous collectons','Uniquement les données que vous nous transmettez volontairement via les formulaires du site : nom, email, téléphone, île et détails de la demande. Nous ne créons pas de profils comportementaux et ne partageons pas d’informations avec des tiers à des fins publicitaires.'],
      ['Comment nous les utilisons','Exclusivement pour répondre à votre demande, préparer la réservation ou le devis de vente et respecter les obligations du contrat de location.'],
      ['Durée de conservation','Uniquement le temps nécessaire pour répondre à la demande et respecter les obligations légales et comptables applicables.'],
      ['Cookies','Ce site n’utilise ni cookies publicitaires ni cookies de suivi. Le choix de la langue est enregistré dans votre navigateur pour ne pas avoir à le refaire.'],
      ['Vos droits','Vous pouvez à tout moment demander l’accès, la rectification ou la suppression de vos données en écrivant à info@scooter-quad.com.']
    ],
    termosT:'Conditions générales',
    termos:[
      ['Champ d’application','Ces conditions s’appliquent aux demandes effectuées via le site. Les conditions complètes de location figurent dans le contrat signé lors de la prise en charge du véhicule.'],
      ['Réservations','Les demandes faites sur le site ne sont pas des réservations confirmées. La réservation n’est confirmée qu’après confirmation de notre équipe et paiement de l’acompte de 50 %.'],
      ['Documents et conditions','Une carte d’identité ou un passeport et un permis de conduire valide pour la catégorie du véhicule sont requis : A1 jusqu’à 124cc, A au-delà de 124cc et B pour les quads. Pour les excursions, le conducteur doit avoir plus de 21 ans.'],
      ['Caution et responsabilité','Une caution est demandée à la prise en charge et restituée au retour du véhicule en bon état. Il n’y a pas de franchise : la responsabilité du client en cas de dommage ou de vol est plafonnée au montant de la caution, selon le contrat.'],
      ['Modifications et annulations','Les modifications et annulations sont possibles jusqu’à 24 heures avant le début, avec remboursement intégral. Dans les 24 heures, elles ne sont pas autorisées et aucun remboursement n’est dû. Une restitution anticipée ne donne pas droit à un remboursement.'],
      ['Utilisation du véhicule','Le casque est obligatoire pour le conducteur et le passager. Le client s’engage à respecter le Code de la route en vigueur au Cap-Vert et à restituer le véhicule avec le carburant au même niveau qu’à la prise en charge.'],
      ['Tarifs','Les tarifs indiqués incluent la TVA et peuvent être mis à jour. Le tarif confirmé au moment de la réservation s’applique.']
    ]
  }
}

};
