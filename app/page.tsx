import Link from 'next/link';
import GlassSearch from '@/components/GlassSearch';
import Footer from '@/components/Footer';
import { VEHICLES } from '@/lib/vehicles';

const CDN = 'https://www.scooter-quad.com/wp-content/uploads';

const EXPERIENCES = [
  {
    tag: 'Excursão guiada · 4h',
    title: 'Volta à ilha de quad',
    meta: 'Mindelo — Salamansa — Baía das Gatas — Calhau · 2–12 pax',
    price: '85 €',
    img: `${CDN}/2025/01/exc1-1024x576.jpg`,
  },
  {
    tag: 'Excursão guiada · 2h',
    title: 'Costa & miradouros',
    meta: 'Monte Cara, Praia da Laginha e vilas piscatórias · 2–12 pax',
    price: '70 €',
    img: `${CDN}/2024/03/island-Sao_Vicente.jpg`,
  },
  {
    tag: 'Ao teu ritmo',
    title: 'Aluguer livre',
    meta: 'À hora, ao dia ou à semana · capacetes e seguro incluídos',
    price: '32 €/dia',
    img: `${CDN}/2024/03/scooter-santiago.jpg`,
  },
];

const STRIP = [
  ['100 km', 'incluídos por dia no aluguer base de scooter'],
  ['50%', 'de depósito confirma a tua reserva'],
  ['24h', 'de antecedência para alterar ou cancelar com reembolso total'],
  ['4', 'idiomas dos guias: PT, EN, FR e ES'],
];

export default function Home() {
  return (
    <main className="overflow-x-clip">
      {/* HERO + pesquisa */}
      <section id="reservar" className="relative flex min-h-[94vh] items-center overflow-hidden rounded-b-[34px]">
        <div
          className="absolute inset-0 scale-[1.04] bg-cover bg-center"
          style={{ backgroundImage: `url('${CDN}/2025/01/exc1-1024x576.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/15 to-ink/60" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-44 pt-32">
          <div className="grid items-end gap-8 md:grid-cols-[1.35fr_0.65fr]">
            <div>
              <span className="font-display text-xs font-bold uppercase tracking-[0.22em] text-sun">
                Cabo Verde · Santiago · São Vicente · Boa Vista
              </span>
              <h1 className="mt-2 font-display text-[clamp(3rem,7.5vw,5.6rem)] font-extrabold uppercase leading-[1.02] text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.35)]">
                Vive a ilha.
                <br />
                <span className="text-sun">Sente a estrada.</span>
              </h1>
              <p className="mt-4 max-w-xl text-lg text-[#EDF0F4] [text-shadow:0_1px_12px_rgba(0,0,0,0.4)]">
                Excursões guiadas de quad e scooters prontas a partir — à hora,
                ao dia ou à semana. A tua aventura em Cabo Verde começa aqui.
              </p>
              <div className="mt-5 h-1.5 w-[74px] rounded bg-sun" />
            </div>

            <div className="glass-dark min-w-[230px] rounded-[18px] px-5 py-4 text-white md:justify-self-end md:text-right">
              <div className="font-display text-2xl font-bold">Taro Storm T9</div>
              <div className="text-xs text-[#D8DEE6]">Scooter · 125 cc</div>
              <div className="mt-2 font-display text-4xl font-extrabold leading-none text-sun">
                32,00 €<span className="text-base">/dia</span>
              </div>
              <div className="text-[0.72rem] text-[#C4CBD4]">100 km/dia incluídos</div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-14 z-10">
          <div className="mx-auto max-w-7xl px-6">
            <GlassSearch />
          </div>
        </div>
      </section>

      {/* EXPERIÊNCIAS */}
      <section id="experiencias" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="font-display text-xs font-bold uppercase tracking-[0.22em] text-brand">
              Primeiro, a experiência
            </span>
            <h2 className="font-display text-[clamp(1.9rem,4vw,2.9rem)] font-extrabold uppercase">
              Escolhe a tua aventura
            </h2>
          </div>
          <p className="max-w-lg text-muted">
            Guias em 4 idiomas, grupos pequenos e a natureza intocada de São
            Vicente — ou a liberdade de explorar ao teu ritmo.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {EXPERIENCES.map((e) => (
            <article
              key={e.title}
              className="group relative flex min-h-[400px] items-end overflow-hidden rounded-[18px] shadow-[0_14px_40px_rgba(18,22,29,0.14)] transition-transform hover:-translate-y-1.5"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${e.img}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/55" />
              <div className="glass relative z-10 m-3.5 flex-1 rounded-[14px] px-5 py-4">
                <span className="mb-2 inline-block rounded-full bg-brand/15 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-widest text-brand-deep">
                  {e.tag}
                </span>
                <h3 className="font-display text-2xl font-extrabold uppercase">{e.title}</h3>
                <p className="mt-1 text-sm text-muted">{e.meta}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="text-[0.72rem] uppercase tracking-wider text-muted">Desde</div>
                    <div className="font-display text-2xl font-extrabold leading-none text-brand-deep">
                      {e.price}
                    </div>
                  </div>
                  <Link
                    href="/#reservar"
                    className="font-display text-sm font-bold uppercase tracking-wider text-ink"
                  >
                    Reservar <span className="text-brand">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FROTA */}
      <section id="frota" className="mx-3.5 rounded-[34px] bg-gradient-to-b from-white to-paper py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="font-display text-xs font-bold uppercase tracking-[0.22em] text-brand">
                Os favoritos dos clientes
              </span>
              <h2 className="font-display text-[clamp(1.9rem,4vw,2.9rem)] font-extrabold uppercase">
                A nossa frota
              </h2>
            </div>
            <p className="max-w-lg text-muted">
              Verificada todos os dias na nossa oficina. Pagamento em cash
              (CVE/EUR) e VISA, caução devolvida na entrega.
            </p>
          </div>

          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5">
            {VEHICLES.map((v) => (
              <article
                key={v.slug}
                className="glass-strong w-[250px] shrink-0 snap-start overflow-hidden rounded-[18px] shadow-[0_12px_32px_rgba(18,22,29,0.10)] transition-transform hover:-translate-y-1"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.img} alt={v.name} className="h-[150px] w-full object-cover" />
                <div className="px-4 py-3.5">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[0.64rem] font-bold uppercase tracking-widest ${
                      v.type === 'Scooter'
                        ? 'bg-brand/15 text-brand-deep'
                        : 'bg-sun/30 text-[#7A5A00]'
                    }`}
                  >
                    {v.type}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-extrabold uppercase">{v.name}</h3>
                  <div className="text-sm text-muted">
                    {v.cc} · {v.licence}
                  </div>
                  <div className="mt-2.5 flex items-end justify-between">
                    <div className="font-display text-xl font-extrabold">
                      {v.pricePerDay === 'Sob consulta' ? 'sob consulta' : v.pricePerDay}
                    </div>
                    <div className="text-[0.7rem] text-muted">{v.islands}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STRIP.map(([n, txt]) => (
              <div
                key={n}
                className="glass-strong rounded-[14px] px-5 py-4 shadow-[0_8px_24px_rgba(18,22,29,0.07)]"
              >
                <div className="font-display text-3xl font-extrabold text-brand">{n}</div>
                <p className="text-sm leading-snug text-muted">{txt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPRAR */}
      <section id="comprar" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="font-display text-xs font-bold uppercase tracking-[0.22em] text-brand">
              E quando quiseres a tua
            </span>
            <h2 className="font-display text-[clamp(1.9rem,4vw,2.9rem)] font-extrabold uppercase">
              Compra a tua scooter
            </h2>
          </div>
          <p className="max-w-lg text-muted">
            Novas Km 0 com garantia de 12 meses, várias cores e envio para todas
            as ilhas. Usados publicados regularmente.
          </p>
        </div>

        <div className="relative flex min-h-[360px] items-center overflow-hidden rounded-[26px] shadow-[0_18px_50px_rgba(18,22,29,0.16)]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${CDN}/2025/01/novo-1024x1024.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/55 to-ink/15" />
          <div className="glass relative z-10 m-8 max-w-xl rounded-[20px] px-8 py-7">
            <span className="font-display text-xs font-bold uppercase tracking-[0.22em] text-brand">
              Promoção · Banco Interatlântico
            </span>
            <h3 className="mt-1 font-display text-3xl font-extrabold uppercase">
              Taro T9 125cc <span className="text-brand-deep">nova</span>
            </h3>
            <div className="mt-2 font-display text-3xl font-extrabold text-brand-deep">
              desde 8.250 CVE/mês{' '}
              <small className="font-body text-xs font-medium text-muted">
                *financiamento a 100%
              </small>
            </div>
            <p className="mt-2 text-sm text-[#2A3340]">
              Pede o orçamento e recebes a ficha técnica e toda a informação do
              financiamento por email.
            </p>
            <div className="text-[0.7rem] text-muted">*Oferta limitada ao stock existente</div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/produto/taro-storm-t9"
                className="rounded-[14px] bg-brand px-6 py-3 font-display font-bold uppercase tracking-wider text-white shadow-[0_10px_26px_rgba(255,107,26,0.38)] transition-all hover:-translate-y-0.5 hover:bg-brand-deep"
              >
                Ver a T9
              </Link>
              <Link
                href="/loja"
                className="rounded-[14px] border-2 border-ink px-6 py-3 font-display font-bold uppercase tracking-wider text-ink transition-colors hover:border-brand hover:text-brand"
              >
                Toda a loja
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
