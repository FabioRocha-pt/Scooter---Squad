'use client';

import { Suspense, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Footer from '@/components/Footer';
import { useAuth } from '@/lib/auth';
import { addContactRequest } from '@/lib/reservations';
import {
  COLOR_OPTIONS,
  CONTACT_EMAIL,
  ISLANDS,
  MODEL_OPTIONS,
  WHATSAPP,
} from '@/lib/catalog';

const TIPOS: Record<string, string> = {
  compra: 'Pedido de compra',
  orcamento: 'Pedido de orçamento',
  ficha: 'Pedido de ficha técnica',
  financiamento: 'Pedido de financiamento',
  reserva: 'Pedido de reserva',
};

const fmtDay = (iso: string) => {
  const d = new Date(`${iso}T00:00:00`);
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString('pt-PT', { day: 'numeric', month: 'short', year: 'numeric' });
};

function matchModelo(q: string | null): string {
  if (!q) return MODEL_OPTIONS[0];
  const needle = q.toLowerCase().slice(0, 12);
  return MODEL_OPTIONS.find((o) => o.toLowerCase().includes(needle)) ?? MODEL_OPTIONS[MODEL_OPTIONS.length - 1];
}

function ContactoInner() {
  const q = useSearchParams();
  const { user } = useAuth();

  /* info de reserva vinda da pesquisa do hero */
  const reserva = useMemo(
    () =>
      q.get('tipo') === 'reserva'
        ? {
            ilha: q.get('ilha') ?? '',
            pick: q.get('pick') ?? '',
            drop: q.get('drop') ?? '',
            servico: q.get('servico') ?? 'Aluguer scooter/quad',
          }
        : null,
    [q],
  );

  const [tipo, setTipo] = useState(() => (TIPOS[q.get('tipo') ?? ''] ? q.get('tipo')! : 'orcamento'));
  const [nome, setNome] = useState(user?.name ?? '');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState(user?.email ?? '');
  const [ilha, setIlha] = useState(() => (ISLANDS.includes(q.get('ilha') ?? '') ? q.get('ilha')! : ''));
  const [modelo, setModelo] = useState(() =>
    reserva ? MODEL_OPTIONS[MODEL_OPTIONS.length - 1] : matchModelo(q.get('modelo')),
  );
  const [cor, setCor] = useState(() =>
    COLOR_OPTIONS.includes(q.get('cor') ?? '') ? q.get('cor')! : COLOR_OPTIONS[0],
  );
  const [fin, setFin] = useState(q.get('fin') === '1');
  const [msg, setMsg] = useState(q.get('msg') ?? '');
  const [error, setError] = useState(false);
  const [done, setDone] = useState<{ ref: string; mailto: string } | null>(null);

  const tiposVisiveis = reserva
    ? (['reserva', 'orcamento'] as const)
    : (['compra', 'orcamento', 'ficha', 'financiamento'] as const);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim() || !tel.trim() || !email.trim() || !ilha) {
      setError(true);
      return;
    }
    setError(false);

    const linhasReserva = reserva
      ? [
          `Serviço: ${reserva.servico}`,
          `Levantamento: ${fmtDay(reserva.pick)}`,
          `Devolução: ${fmtDay(reserva.drop)}`,
          reserva.ilha ? `Local: ${reserva.ilha}` : '',
        ].filter(Boolean)
      : [];

    const detalhes = [
      `Modelo: ${modelo}`,
      `Cor preferida: ${cor}`,
      `Financiamento Banco Interatlântico: ${fin ? 'Sim' : 'Não'}`,
      ...linhasReserva,
    ];

    /* regista na fila de atendimento (aparece no backoffice) */
    const pedido = await addContactRequest(
      user ?? { id: 'anon', name: nome.trim(), email: email.trim() },
      {
        reservaRef: '',
        tel: tel.trim(),
        ilha,
        tipo,
        msg: [`${detalhes.join(' · ')}`, msg.trim()].filter(Boolean).join('\n\n'),
      },
    );

    /* email para a Scooter & Quad com toda a informação */
    const subject = `${TIPOS[tipo]} — ${reserva ? reserva.servico : modelo} (${pedido.ref})`;
    const body = [
      `${TIPOS[tipo]} · referência ${pedido.ref}`,
      '',
      `Nome: ${nome.trim()}`,
      `Telefone (WhatsApp): ${tel.trim()}`,
      `Email: ${email.trim()}`,
      `Ilha: ${ilha}`,
      ...detalhes,
      '',
      ...(msg.trim() ? ['Mensagem:', msg.trim()] : []),
    ].join('\n');

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setDone({ ref: pedido.ref, mailto });
    window.location.href = mailto;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const inputCls =
    'w-full rounded-xl border border-ink/15 bg-white/75 px-3.5 py-3 text-sm font-medium text-ink outline-none transition-all placeholder:text-muted/60 focus:border-brand focus:ring-[3px] focus:ring-brand/15';
  const labelCls = 'mb-1.5 block text-[0.7rem] font-bold uppercase tracking-widest text-muted';

  const gestor =
    ilha === 'Santiago' ? 'Praia' : ilha === 'São Vicente' ? 'Mindelo' : 'a tua zona';

  if (done) {
    return (
      <main>
        <div className="mx-auto max-w-3xl px-6 pt-[126px]">
        <div className="glass-strong rounded-[20px] p-10 text-center shadow-[0_18px_50px_rgba(18,22,29,0.14)]">
          <div className="mx-auto mb-4 grid h-[74px] w-[74px] place-items-center rounded-full border-2 border-[#3B9E6B] bg-[#48B478]/15 text-3xl text-[#2E7D54]">
            ✓
          </div>
          <h2 className="font-display text-4xl font-extrabold uppercase">Pedido enviado!</h2>
          <div className="my-3.5 inline-block rounded-xl border border-sun/60 bg-sun/20 px-5 py-2 font-display text-2xl font-extrabold tracking-wide text-brand-deep">
            {done.ref}
          </div>
          <p className="mx-auto max-w-lg text-sm text-muted">
            Obrigado, {nome.split(' ')[0]}! O teu {TIPOS[tipo].toLowerCase()} foi
            registado e o teu email abriu-se já preenchido para{' '}
            <b className="text-ink">{CONTACT_EMAIL}</b> — basta carregares em
            enviar. Um gestor de {gestor} responde-te por email ou WhatsApp.
          </p>
          <p className="mt-2 text-xs text-muted">
            Guarda a referência para acompanhares o pedido. Se o email não
            abriu,{' '}
            <a href={done.mailto} className="font-semibold text-brand-deep underline">
              carrega aqui
            </a>
            .
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2.5">
            <Link
              href="/loja"
              className="rounded-[14px] bg-brand px-6 py-3 font-display font-bold uppercase tracking-wider text-white shadow-[0_10px_26px_rgba(255,107,26,0.38)] transition-colors hover:bg-brand-deep"
            >
              Voltar à loja
            </Link>
            <button
              onClick={() => setDone(null)}
              className="rounded-[14px] border-[1.5px] border-ink/25 px-6 py-3 font-display font-bold uppercase tracking-wider text-ink transition-colors hover:border-brand hover:text-brand"
            >
              Fazer outro pedido
            </button>
          </div>
        </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <div className="mx-auto max-w-6xl px-6 pt-[126px]">
        <div className="mb-3.5 text-xs text-muted">
          <Link href="/" className="font-semibold text-brand-deep">Início</Link>
          {' / '}
          <Link href="/loja" className="font-semibold text-brand-deep">Comprar</Link>
          {' / '}Pedido
        </div>
        <span className="font-display text-xs font-bold uppercase tracking-[0.22em] text-brand">
          Sem sair da plataforma
        </span>
        <h1 className="font-display text-[clamp(2rem,5vw,3.2rem)] font-extrabold uppercase">
          Fala connosco
        </h1>
        <p className="mt-2 max-w-xl text-muted">
          Preenche o pedido — ao enviares, o teu email abre-se já preenchido com
          toda a informação para a nossa equipa. Um gestor da tua ilha
          responde-te por email ou WhatsApp, normalmente no próprio dia.
        </p>

        <div className="mt-7 grid items-start gap-6 md:grid-cols-[1.15fr_0.85fr]">
          {/* formulário */}
          <form
            onSubmit={enviar}
            noValidate
            className="glass-strong rounded-[20px] p-7 shadow-[0_18px_50px_rgba(18,22,29,0.14)]"
          >
            <div className="mb-5 flex flex-wrap gap-2">
              {tiposVisiveis.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTipo(t)}
                  className={`rounded-xl border px-4 py-2.5 font-display text-sm font-bold uppercase tracking-wider transition-colors ${
                    tipo === t
                      ? 'border-brand bg-brand text-white shadow-[0_8px_20px_rgba(255,107,26,0.32)]'
                      : 'border-ink/15 bg-white/60 text-muted hover:text-brand-deep'
                  }`}
                >
                  {t === 'compra' ? 'Quero comprar' : TIPOS[t].replace('Pedido de ', 'Pedir ').replace('Pedir reserva', 'Reserva')}
                </button>
              ))}
            </div>

            <div className="grid gap-3.5 sm:grid-cols-2">
              <div>
                <label htmlFor="nome" className={labelCls}>Nome *</label>
                <input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="O teu nome completo" className={inputCls} />
              </div>
              <div>
                <label htmlFor="tel" className={labelCls}>Telefone (WhatsApp) *</label>
                <input id="tel" type="tel" value={tel} onChange={(e) => setTel(e.target.value)} placeholder="+238 ..." className={inputCls} />
              </div>
              <div>
                <label htmlFor="email" className={labelCls}>Email *</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nome@email.com" className={inputCls} />
              </div>
              <div>
                <label htmlFor="ilha" className={labelCls}>A tua ilha *</label>
                <select id="ilha" value={ilha} onChange={(e) => setIlha(e.target.value)} className={inputCls}>
                  <option value="">Seleciona…</option>
                  {ISLANDS.map((i) => (
                    <option key={i}>{i}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="modelo" className={labelCls}>Modelo</label>
                <select id="modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} className={inputCls}>
                  {MODEL_OPTIONS.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="cor" className={labelCls}>Cor preferida</label>
                <select id="cor" value={cor} onChange={(e) => setCor(e.target.value)} className={inputCls}>
                  {COLOR_OPTIONS.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="msg" className={labelCls}>Mensagem</label>
                <textarea
                  id="msg"
                  rows={4}
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Conta-nos o que precisas — prazo, dúvidas, troca, etc."
                  className={inputCls}
                />
              </div>
              <label className="flex items-start gap-2.5 text-xs text-muted sm:col-span-2">
                <input
                  type="checkbox"
                  checked={fin}
                  onChange={(e) => setFin(e.target.checked)}
                  className="mt-0.5 accent-brand"
                />
                Tenho interesse no financiamento a 100% em parceria com o Banco
                Interatlântico (Taro T9: desde 8.250 CVE/mês*)
              </label>
              <div className="sm:col-span-2">
                {error && (
                  <p className="mb-2 text-xs font-semibold text-[#B3202C]">
                    Preenche os campos obrigatórios (*) antes de enviar.
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full rounded-[14px] bg-brand py-3.5 font-display text-lg font-bold uppercase tracking-wider text-white shadow-[0_10px_26px_rgba(255,107,26,0.38)] transition-all hover:-translate-y-0.5 hover:bg-brand-deep"
                >
                  Enviar pedido
                </button>
                <p className="mt-2 text-center text-[0.72rem] text-muted">
                  Ao enviar, o pedido é registado e o teu email abre-se
                  preenchido para {CONTACT_EMAIL}. Sem spam, prometido.
                </p>
              </div>
            </div>
          </form>

          {/* resumo */}
          <div className="grid gap-4">
            <div className="glass rounded-[20px] px-6 py-5 shadow-[0_12px_32px_rgba(18,22,29,0.10)]">
              <h3 className="mb-3 font-display text-xl font-extrabold uppercase">
                Resumo do pedido
              </h3>
              {(
                [
                  ['Tipo', TIPOS[tipo]],
                  ...(reserva
                    ? ([
                        ['Serviço', reserva.servico],
                        ['Levantamento', fmtDay(reserva.pick)],
                        ['Devolução', fmtDay(reserva.drop)],
                      ] as [string, string][])
                    : []),
                  ['Modelo', modelo],
                  ['Cor', cor],
                  ['Financiamento', fin ? 'Sim — Banco Interatlântico' : 'Não'],
                  ['Garantia', '12 meses · Km 0'],
                  ['Entrega', 'Todas as ilhas de CV'],
                ] as [string, string][]
              ).map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between gap-3 border-b border-ink/5 py-2 text-sm last:border-0"
                >
                  <span className="text-muted">{k}</span>
                  <span className="text-right font-semibold">{v}</span>
                </div>
              ))}
            </div>

            <div className="glass rounded-[20px] px-6 py-5 shadow-[0_12px_32px_rgba(18,22,29,0.10)]">
              <h3 className="mb-3.5 font-display text-xl font-extrabold uppercase">
                O que acontece a seguir
              </h3>
              <ul>
                {(
                  [
                    ['Pedido registado', 'Recebes uma referência e o email segue já preenchido.'],
                    ['Gestor atribuído', 'Um gestor da tua ilha analisa o pedido.'],
                    ['Proposta enviada', 'Orçamento, ficha técnica e condições de financiamento.'],
                    ['Entrega', 'Levantamento na Praia/Mindelo ou envio para a tua ilha.'],
                  ] as [string, string][]
                ).map(([t, d], i, arr) => (
                  <li key={t} className="relative pb-4 pl-8 text-sm text-muted last:pb-0">
                    <span className="absolute left-2 top-1.5 h-2.5 w-2.5 rounded-full bg-brand" />
                    {i < arr.length - 1 && (
                      <span className="absolute bottom-0 left-3 top-5 w-0.5 bg-brand/25" />
                    )}
                    <b className="block text-ink">{t}</b>
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-[20px] px-6 py-5 shadow-[0_12px_32px_rgba(18,22,29,0.10)]">
              <h3 className="mb-3 font-display text-xl font-extrabold uppercase">
                Preferes falar já?
              </h3>
              <div className="flex gap-2.5">
                {WHATSAPP.map((w) => (
                  <a
                    key={w.number}
                    href={`https://wa.me/${w.number}`}
                    className="flex-1 rounded-xl border-[1.5px] border-ink/15 py-2.5 text-center font-display text-sm font-bold uppercase tracking-wider transition-colors hover:border-brand hover:text-brand"
                  >
                    ✆ {w.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default function ContactoPage() {
  return (
    <Suspense fallback={null}>
      <ContactoInner />
    </Suspense>
  );
}
