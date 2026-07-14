'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { PRODUCTS, WHATSAPP } from '@/lib/catalog';

const CDN = 'https://www.scooter-quad.com/wp-content/uploads';

const STEPS = [
  ['Escolhe o modelo', 'Explora o catálogo e abre o modelo que te interessa.'],
  ['Recebe o orçamento', 'Enviamos-te por email o preço, a ficha técnica e as cores disponíveis.'],
  ['Financiamento opcional', 'Tratamos contigo o financiamento a 100% em parceria com o Banco Interatlântico.'],
  ['Entrega na tua ilha', 'Enviamos para todas as ilhas de Cabo Verde, com apoio pré e pós-venda da nossa oficina.'],
];

type TypeFilter = 'all' | 'Scooter' | 'Quad';
type StateFilter = 'all' | 'novo' | 'usado';
type Sort = 'rel' | 'cc-asc' | 'cc-desc';

export default function LojaPage() {
  const [fType, setFType] = useState<TypeFilter>('all');
  const [fState, setFState] = useState<StateFilter>('all');
  const [sort, setSort] = useState<Sort>('rel');

  const products = useMemo(() => {
    const list = PRODUCTS.filter(
      (p) =>
        (fType === 'all' || p.type === fType) &&
        (fState === 'all' || p.state === fState),
    );
    if (sort === 'cc-asc') list.sort((a, b) => a.cc - b.cc);
    if (sort === 'cc-desc') list.sort((a, b) => b.cc - a.cc);
    return list;
  }, [fType, fState, sort]);

  const chipCls = (on: boolean) =>
    `rounded-xl border px-5 py-2 font-display text-sm font-bold uppercase tracking-wider transition-colors ${
      on
        ? 'border-brand bg-brand text-white shadow-[0_8px_20px_rgba(255,107,26,0.35)]'
        : 'border-ink/10 bg-white/65 text-muted hover:text-brand-deep'
    }`;

  return (
    <main>
      {/* hero da página */}
      <section className="relative flex min-h-[46vh] items-end overflow-hidden rounded-b-[34px]">
        <div
          className="absolute inset-0 bg-cover bg-[center_35%]"
          style={{ backgroundImage: `url('${CDN}/2025/01/novo-1024x1024.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/35 to-ink/60" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-36">
          <div className="mb-2 text-xs text-[#D8DEE6]">
            <Link href="/" className="text-sun">Início</Link> / Comprar
          </div>
          <h1 className="font-display text-[clamp(2.6rem,6vw,4.4rem)] font-extrabold uppercase text-white [text-shadow:0_2px_26px_rgba(0,0,0,0.35)]">
            A tua próxima moto <span className="text-sun">está aqui</span>
          </h1>
          <p className="mt-3 max-w-xl text-lg text-[#EDF0F4]">
            Scooters e quads Km 0 com garantia de 12 meses, várias cores e envio
            para todas as ilhas de Cabo Verde. Financiamento a 100% disponível.
          </p>
        </div>
      </section>

      {/* filtros */}
      <div className="relative z-10 mx-auto -mt-11 max-w-7xl px-6">
        <div className="glass flex flex-wrap items-center gap-2 rounded-[20px] p-3 shadow-[0_18px_50px_rgba(18,22,29,0.20)]">
          <button className={chipCls(fType === 'all' && fState === 'all')} onClick={() => { setFType('all'); setFState('all'); }}>
            Todos
          </button>
          <button className={chipCls(fType === 'Scooter')} onClick={() => setFType(fType === 'Scooter' ? 'all' : 'Scooter')}>
            Scooters
          </button>
          <button className={chipCls(fType === 'Quad')} onClick={() => setFType(fType === 'Quad' ? 'all' : 'Quad')}>
            Quads
          </button>
          <span className="mx-1 hidden h-6 w-px bg-ink/10 sm:block" />
          <button className={chipCls(fState === 'novo')} onClick={() => setFState(fState === 'novo' ? 'all' : 'novo')}>
            Novos
          </button>
          <button className={chipCls(fState === 'usado')} onClick={() => setFState(fState === 'usado' ? 'all' : 'usado')}>
            Usados
          </button>
          <span className="mx-1 hidden h-6 w-px bg-ink/10 sm:block" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-xl border border-ink/10 bg-white/65 px-3.5 py-2 text-sm font-semibold text-ink outline-none"
          >
            <option value="rel">Relevância</option>
            <option value="cc-asc">Cilindrada ↑</option>
            <option value="cc-desc">Cilindrada ↓</option>
          </select>
          <span className="ml-auto text-sm text-muted">
            {products.length} veículo{products.length === 1 ? '' : 's'}
          </span>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-14">
        {/* banda de promoção */}
        <div className="mb-7 grid items-center gap-4 rounded-[20px] border border-brand/35 bg-gradient-to-r from-sun/30 to-brand/15 px-6 py-4 backdrop-blur md:grid-cols-[auto_1fr_auto]">
          <div className="grid h-[52px] w-[52px] place-items-center rounded-[14px] bg-sun text-2xl">%</div>
          <div>
            <b className="font-display text-lg uppercase tracking-wide">
              Promoção Banco Interatlântico — financiamento a 100%
            </b>
            <p className="text-sm text-[#4A4436]">
              Taro T9 125cc nova desde 8.250 CVE/mês. Oferta limitada ao stock existente.
            </p>
          </div>
          <Link
            href="/produto/taro-storm-t9"
            className="rounded-[14px] bg-brand px-6 py-3 text-center font-display font-bold uppercase tracking-wider text-white shadow-[0_10px_26px_rgba(255,107,26,0.38)] transition-all hover:-translate-y-0.5 hover:bg-brand-deep"
          >
            Aproveitar
          </Link>
        </div>

        {/* grelha de produtos */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <article
              key={p.slug}
              className="glass-strong flex flex-col overflow-hidden rounded-[18px] shadow-[0_12px_32px_rgba(18,22,29,0.10)] transition-transform hover:-translate-y-1"
            >
              <Link href={`/produto/${p.slug}`} className="relative block h-[190px] overflow-hidden">
                <span
                  className={`absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-[0.66rem] font-bold uppercase tracking-widest ${
                    p.promo ? 'bg-sun text-[#5A4200]' : 'glass text-ink'
                  }`}
                >
                  {p.promo ? 'Promoção' : p.state === 'novo' ? 'Novo' : 'Usado'}
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.img}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </Link>
              <div className="flex flex-1 flex-col px-5 py-4">
                <span className="text-[0.68rem] font-bold uppercase tracking-widest text-brand-deep">
                  {p.type} · {p.state === 'novo' ? (p.type === 'Quad' ? 'Novo' : 'Nova') : (p.type === 'Quad' ? 'Usado' : 'Usada')}
                </span>
                <h3 className="mt-1 font-display text-2xl font-extrabold uppercase">{p.name}</h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {p.chips.map((c) => (
                    <span key={c} className="rounded-lg bg-ink/5 px-2.5 py-0.5 text-[0.7rem] text-muted">
                      {c}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-end justify-between border-t border-ink/10 pt-3.5">
                  <div>
                    <div className={`font-display text-xl font-extrabold leading-tight ${p.promo ? 'text-brand-deep' : 'text-ink'}`}>
                      {p.promo ? '8.250 CVE/mês' : p.price}
                    </div>
                    <small className="text-[0.68rem] text-muted">
                      {p.promo ? 'financiamento 100% · Banco Interatlântico' : p.priceNote}
                    </small>
                  </div>
                  <Link
                    href={`/produto/${p.slug}`}
                    className="rounded-[11px] bg-brand px-4 py-2.5 font-display text-sm font-bold uppercase tracking-wider text-white shadow-[0_8px_20px_rgba(255,107,26,0.3)] transition-colors hover:bg-brand-deep"
                  >
                    Comprar
                  </Link>
                </div>
              </div>
            </article>
          ))}

          {/* usados em breve */}
          {(fState === 'all' || fState === 'usado') && fType !== 'Quad' && (
            <article className="glass-strong flex flex-col overflow-hidden rounded-[18px] shadow-[0_12px_32px_rgba(18,22,29,0.10)]">
              <div className="relative h-[190px] overflow-hidden grayscale-[0.5]">
                <span className="absolute left-3 top-3 z-10 rounded-full bg-ink/70 px-3 py-1 text-[0.66rem] font-bold uppercase tracking-widest text-white">
                  Vendida
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${CDN}/2025/02/scooter-vendido-300x239.jpg`}
                  alt="Scooter vendida"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col px-5 py-4">
                <span className="text-[0.68rem] font-bold uppercase tracking-widest text-brand-deep">
                  Scooter · Usada
                </span>
                <h3 className="mt-1 font-display text-2xl font-extrabold uppercase">
                  Mais usados em breve
                </h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="rounded-lg bg-ink/5 px-2.5 py-0.5 text-[0.7rem] text-muted">
                    As ofertas de usados são publicadas aqui
                  </span>
                </div>
                <div className="mt-auto flex items-end justify-between border-t border-ink/10 pt-3.5">
                  <div>
                    <div className="font-display text-xl font-extrabold leading-tight">Fica atento</div>
                    <small className="text-[0.68rem] text-muted">novidades regulares</small>
                  </div>
                  <Link
                    href="/contacto?tipo=orcamento&modelo=Outro / ainda não sei&msg=Avisem-me quando houver usados disponíveis"
                    className="rounded-[11px] border-[1.5px] border-ink/25 px-4 py-2.5 font-display text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:border-brand hover:text-brand"
                  >
                    Avisar-me
                  </Link>
                </div>
              </div>
            </article>
          )}
        </div>
      </section>

      {/* como funciona */}
      <section className="mx-auto max-w-7xl px-6 pb-6">
        <span className="font-display text-xs font-bold uppercase tracking-[0.22em] text-brand">
          Simples e acompanhado
        </span>
        <h2 className="mb-9 font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-extrabold uppercase">
          Como funciona a compra
        </h2>
        <div className="grid gap-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(([t, d], i) => (
            <div
              key={t}
              className="glass-strong relative rounded-2xl px-5 pb-5 pt-6 shadow-[0_8px_24px_rgba(18,22,29,0.07)]"
            >
              <span className="absolute -top-3.5 left-4 grid h-[34px] w-[34px] place-items-center rounded-[11px] bg-brand font-display text-lg font-extrabold text-white shadow-[0_8px_18px_rgba(255,107,26,0.4)]">
                {i + 1}
              </span>
              <h3 className="mb-1.5 mt-1 font-display text-lg font-extrabold uppercase">{t}</h3>
              <p className="text-sm leading-relaxed text-muted">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pt-10">
        <div className="relative overflow-hidden rounded-[26px] shadow-[0_18px_50px_rgba(18,22,29,0.16)]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${CDN}/2024/03/scooter-home.jpg')` }}
          />
          <div className="absolute inset-0 bg-ink/55" />
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-6 p-10 md:p-13">
            <div>
              <h2 className="font-display text-3xl font-extrabold uppercase text-white">
                Dúvidas? Fala connosco
              </h2>
              <p className="mt-1 max-w-lg text-sm text-[#D8DEE6]">
                A nossa equipa responde por WhatsApp na Praia e no Mindelo, ou
                por email. Apoio antes e depois da compra.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {WHATSAPP.map((w) => (
                <a
                  key={w.number}
                  href={`https://wa.me/${w.number}`}
                  className={`rounded-[14px] px-6 py-3 font-display font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5 ${
                    w.label === 'Praia'
                      ? 'bg-brand text-white shadow-[0_10px_26px_rgba(255,107,26,0.38)] hover:bg-brand-deep'
                      : 'glass text-white'
                  }`}
                >
                  WhatsApp {w.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
