'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';
import { PRODUCTS, type Product } from '@/lib/catalog';

const ENTREGAS = [
  { label: 'Santiago — levantamento na Praia', ilha: 'Santiago' },
  { label: 'São Vicente — levantamento no Mindelo', ilha: 'São Vicente' },
  { label: 'Outra ilha — envio (todas as ilhas de Cabo Verde)', ilha: '' },
];

const TRUST = [
  'Garantia de 12 meses',
  'Km 0 (zero)',
  'Envio para todas as ilhas',
  'Apoio pré e pós-venda',
];

export default function ProductBuyView({ product }: { product: Product }) {
  const router = useRouter();
  const [mainImg, setMainImg] = useState(product.gallery[0]);
  const [cor, setCor] = useState(product.colors[0]?.name ?? '');
  const [entrega, setEntrega] = useState(ENTREGAS[0]);

  const stateLabel =
    product.state === 'novo'
      ? product.type === 'Quad'
        ? 'Novo'
        : 'Nova'
      : product.type === 'Quad'
        ? 'Usado'
        : 'Usada';

  function goContacto(tipo: 'compra' | 'ficha') {
    const params = new URLSearchParams({ tipo, modelo: product.name });
    if (tipo === 'compra') {
      if (cor) params.set('cor', cor);
      if (entrega.ilha) params.set('ilha', entrega.ilha);
      if (product.promo) params.set('fin', '1');
    }
    router.push(`/contacto?${params.toString()}`);
  }

  const similares = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <main>
      <div className="mx-auto max-w-7xl px-6 pb-0 pt-[118px]">
        <div className="mb-4 text-xs text-muted">
          <Link href="/" className="font-semibold text-brand-deep">Início</Link>
          {' / '}
          <Link href="/loja" className="font-semibold text-brand-deep">Comprar</Link>
          {' / '}
          {product.name}
        </div>

        <div className="grid items-start gap-6 md:grid-cols-[1.15fr_0.85fr]">
          {/* galeria */}
          <div>
            <div className="relative overflow-hidden rounded-[18px] shadow-[0_14px_40px_rgba(18,22,29,0.14)]">
              {product.promo && (
                <span className="absolute left-3.5 top-3.5 z-10 rounded-full bg-sun px-3.5 py-1 text-[0.68rem] font-bold uppercase tracking-widest text-[#5A4200]">
                  Promoção
                </span>
              )}
              <span className="glass absolute right-3.5 top-3.5 z-10 rounded-full px-3.5 py-1 text-[0.68rem] font-bold uppercase tracking-widest">
                {product.state === 'novo' ? `Km 0 · ${stateLabel}` : stateLabel}
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mainImg}
                alt={product.name}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="mt-2.5 grid grid-cols-4 gap-2.5">
              {product.gallery.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setMainImg(src)}
                  className={`h-24 overflow-hidden rounded-xl border-2 shadow-[0_6px_18px_rgba(18,22,29,0.10)] transition-all hover:-translate-y-0.5 ${
                    mainImg === src ? 'border-brand' : 'border-transparent'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          {/* cartão de compra */}
          <aside className="glass-strong rounded-[20px] p-6 shadow-[0_18px_50px_rgba(18,22,29,0.16)] md:sticky md:top-24">
            <span className="text-[0.7rem] font-bold uppercase tracking-widest text-brand-deep">
              {product.type} · {stateLabel} {product.state === 'novo' && '· Km 0'}
            </span>
            <h1 className="mt-1 font-display text-4xl font-extrabold uppercase">
              {product.name}
            </h1>
            <div className="text-sm text-muted">
              {product.cc} cc · {product.licence.toLowerCase().replace('carta', 'carta de condução categoria')}
            </div>

            <div className="my-4 rounded-[14px] border border-sun/60 bg-sun/20 px-[18px] py-3.5">
              <div className="font-display text-3xl font-extrabold leading-tight text-brand-deep">
                {product.price}
              </div>
              <small className="mt-1 block text-xs text-[#6B5B2A]">{product.priceNote}</small>
            </div>

            {product.colors.length > 1 && (
              <div className="mb-3.5">
                <label className="mb-2 block text-[0.7rem] font-bold uppercase tracking-widest text-muted">
                  Cor · {cor}
                </label>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      title={c.name}
                      onClick={() => setCor(c.name)}
                      style={{ background: c.hex }}
                      className={`h-[30px] w-[30px] rounded-full border-2 transition-transform ${
                        cor === c.name
                          ? 'scale-110 border-brand shadow-[0_4px_12px_rgba(18,22,29,0.2)]'
                          : 'border-ink/10 hover:scale-105'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mb-3.5">
              <label className="mb-2 block text-[0.7rem] font-bold uppercase tracking-widest text-muted">
                Entrega
              </label>
              <select
                value={entrega.label}
                onChange={(e) =>
                  setEntrega(ENTREGAS.find((x) => x.label === e.target.value) ?? ENTREGAS[0])
                }
                className="w-full rounded-xl border border-ink/15 bg-white/70 px-3.5 py-2.5 text-sm font-semibold text-ink outline-none"
              >
                {ENTREGAS.map((e) => (
                  <option key={e.label}>{e.label}</option>
                ))}
              </select>
            </div>

            <div className="glass mb-4 flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs text-muted">
              <b>💳</b> Pagamento a pronto ou financiamento bancário a 100% — tratamos do processo contigo.
            </div>

            <button
              onClick={() => goContacto('compra')}
              className="w-full rounded-[14px] bg-brand py-3.5 font-display text-lg font-bold uppercase tracking-wider text-white shadow-[0_10px_26px_rgba(255,107,26,0.38)] transition-all hover:-translate-y-0.5 hover:bg-brand-deep"
            >
              Comprar — pedir proposta
            </button>
            <button
              onClick={() => goContacto('ficha')}
              className="mt-2 w-full rounded-[14px] border-[1.5px] border-ink/25 py-3.5 font-display text-lg font-bold uppercase tracking-wider text-ink transition-colors hover:border-brand hover:text-brand"
            >
              Receber ficha técnica
            </button>

            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-ink/10 pt-4">
              {TRUST.map((t) => (
                <div key={t} className="flex items-center gap-2 text-xs text-muted">
                  <span className="font-bold text-brand">✓</span> {t}
                </div>
              ))}
            </div>
          </aside>
        </div>

        {/* sobre + ficha técnica */}
        <div className="mt-14 grid gap-5 md:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-strong rounded-[20px] px-8 py-7 shadow-[0_12px_32px_rgba(18,22,29,0.08)]">
            <h2 className="mb-3.5 font-display text-2xl font-extrabold uppercase">
              Sobre est{product.type === 'Quad' ? 'e' : 'a'} {product.type.toLowerCase()}
            </h2>
            {product.description.map((p) => (
              <p key={p} className="mb-2.5 text-sm leading-relaxed text-[#2A3340]">
                {p}
              </p>
            ))}
            <h2 className="mb-3.5 mt-6 font-display text-2xl font-extrabold uppercase">
              O que está incluído
            </h2>
            <ul className="grid gap-2.5">
              {product.included.map((i) => (
                <li key={i} className="relative pl-7 text-sm text-[#2A3340]">
                  <span className="absolute left-0 font-extrabold text-brand">✓</span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-strong rounded-[20px] px-8 py-7 shadow-[0_12px_32px_rgba(18,22,29,0.08)]">
            <h2 className="mb-3.5 font-display text-2xl font-extrabold uppercase">
              Ficha técnica
            </h2>
            <table className="w-full text-sm">
              <tbody>
                {product.specs.map(([k, v]) => (
                  <tr key={k} className="border-b border-ink/5 last:border-0">
                    <td className="w-[46%] py-2.5 text-muted">{k}</td>
                    <td className="py-2.5 font-semibold">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-xs text-muted">
              A ficha técnica completa (motor, consumo, dimensões e equipamento)
              é enviada por email com o orçamento — usa o botão &quot;Receber
              ficha técnica&quot;.
            </p>
          </div>
        </div>

        {/* semelhantes */}
        <div className="mt-14">
          <span className="font-display text-xs font-bold uppercase tracking-[0.22em] text-brand">
            Também na loja
          </span>
          <h2 className="mb-5 font-display text-3xl font-extrabold uppercase">
            Modelos semelhantes
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {similares.map((p) => (
              <Link
                key={p.slug}
                href={`/produto/${p.slug}`}
                className="glass-strong overflow-hidden rounded-[18px] shadow-[0_10px_28px_rgba(18,22,29,0.10)] transition-transform hover:-translate-y-1"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={p.name} className="h-36 w-full object-cover" />
                <div className="px-4 py-3.5">
                  <h3 className="font-display text-lg font-extrabold uppercase">{p.name}</h3>
                  <div className="text-xs text-muted">
                    {p.type} · {p.cc} cc · {p.licence.toLowerCase()}
                  </div>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="font-display font-extrabold">
                      {p.promo ? '8.250 CVE/mês' : p.price}
                    </span>
                    <span className="font-display text-sm font-bold uppercase tracking-wider text-brand-deep">
                      Ver →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
