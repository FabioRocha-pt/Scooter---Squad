'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const iso = (d: Date) => d.toISOString().slice(0, 10);

const SERVICES = [
  'Aluguer scooter/quad',
  'Excursão de quad',
  'Aluguer longa duração',
];

const PLACES = ['Santiago — Praia', 'São Vicente — Mindelo'];

/* pesquisa do hero: encaminha a reserva para /contacto com a info escolhida */
export default function GlassSearch() {
  const router = useRouter();
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [ilha, setIlha] = useState(PLACES[0]);
  const [pick, setPick] = useState(iso(today));
  const [drop, setDrop] = useState(iso(tomorrow));
  const [servico, setServico] = useState(SERVICES[0]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({
      tipo: 'reserva',
      ilha: ilha.split(' — ')[0],
      pick,
      drop,
      servico,
    });
    router.push(`/contacto?${params.toString()}`);
  }

  const fieldCls = 'flex flex-col justify-center gap-0.5 px-4 py-2';
  const labelCls =
    'text-[0.68rem] font-bold uppercase tracking-widest text-muted';
  const inputCls =
    'bg-transparent text-[0.95rem] font-semibold text-ink outline-none';

  return (
    <form
      onSubmit={submit}
      className="glass grid items-stretch gap-1 rounded-[22px] p-2.5 shadow-[0_18px_50px_rgba(18,22,29,0.28)] md:grid-cols-[1.1fr_1fr_1fr_1.1fr_auto] md:gap-0"
    >
      <div className={`${fieldCls} md:border-r md:border-ink/10`}>
        <label className={labelCls}>Ilha</label>
        <select value={ilha} onChange={(e) => setIlha(e.target.value)} className={inputCls}>
          {PLACES.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>
      <div className={`${fieldCls} md:border-r md:border-ink/10`}>
        <label className={labelCls}>Levantamento</label>
        <input
          type="date"
          min={iso(today)}
          value={pick}
          onChange={(e) => setPick(e.target.value)}
          className={inputCls}
        />
      </div>
      <div className={`${fieldCls} md:border-r md:border-ink/10`}>
        <label className={labelCls}>Devolução</label>
        <input
          type="date"
          min={pick}
          value={drop}
          onChange={(e) => setDrop(e.target.value)}
          className={inputCls}
        />
      </div>
      <div className={fieldCls}>
        <label className={labelCls}>Experiência</label>
        <select
          value={servico}
          onChange={(e) => setServico(e.target.value)}
          className={inputCls}
        >
          {SERVICES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        aria-label="Pedir reserva"
        className="m-1 grid h-14 place-items-center rounded-2xl bg-brand text-xl text-white shadow-[0_10px_24px_rgba(255,107,26,0.45)] transition-all hover:-translate-y-0.5 hover:bg-brand-deep md:w-14 md:self-center"
      >
        →
      </button>
    </form>
  );
}
