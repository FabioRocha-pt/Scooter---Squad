'use client';

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import type { Vehicle } from '@/lib/vehicles';
import DatePickerModal, { type RentalRange } from './DatePickerModal';

// o visualizador 3D só é descarregado quando esta página o precisa
const BikeModel3D = dynamic(() => import('./BikeModel3D'), {
  ssr: false,
  loading: () => <div className="skeleton h-full w-full rounded-3xl" />,
});

const TRUST = [
  'Capacete e seguro incluídos',
  'Verificada todos os dias na oficina',
  'Depósito de 50% confirma a reserva',
  'Cancelamento gratuito até 24h antes',
];

export default function ProductView({ vehicle }: { vehicle: Vehicle }) {
  const router = useRouter();
  const { user, addReservation } = useAuth();

  const [mainImg, setMainImg] = useState(vehicle.gallery[0]);
  const [color, setColor] = useState(vehicle.colors[0]?.name);
  const [pickerOpen, setPickerOpen] = useState(false);

  async function reservar(range: RentalRange) {
    if (!range.start || !range.end) return;
    const payload = {
      vehicleSlug: vehicle.slug,
      vehicleName: vehicle.name,
      start: range.start.toISOString(),
      end: range.end.toISOString(),
      startTime: range.startTime,
      endTime: range.endTime,
      color,
    };
    if (!user) {
      // guarda a intenção; a página /conta conclui a reserva depois do login
      sessionStorage.setItem('sq-pending', JSON.stringify(payload));
      router.push('/login?next=/conta');
      return;
    }
    await addReservation(payload);
    router.push('/conta');
  }

  return (
    <main className="min-h-svh bg-night text-white">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-28">
      <nav className="mb-6 text-sm text-fog">
        <Link href="/" className="transition-colors hover:text-neon">
          Início
        </Link>
        {' / '}
        <Link href="/#frota" className="transition-colors hover:text-neon">
          Frota
        </Link>
        {' / '}
        <span className="text-white">{vehicle.name}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-[1.1fr_.9fr]">
        {/* Galeria com crossfade */}
        <div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-mist">
            <span className="absolute left-4 top-4 z-10 rounded-full bg-neon px-4 py-1 font-display text-xs font-bold uppercase tracking-wider text-night">
              {vehicle.type}
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={mainImg}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="h-full w-full"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mainImg}
                  alt={vehicle.name}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-3 grid grid-cols-4 gap-3">
            {vehicle.gallery.map((src) => (
              <button
                key={src}
                type="button"
                onClick={() => setMainImg(src)}
                className={`h-20 overflow-hidden rounded-xl border-2 transition-all ${
                  mainImg === src
                    ? 'border-neon neon-glow'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>

          {/* Visualizador 3D — carregado on-demand */}
          {vehicle.has3d && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-8 rounded-3xl border border-line bg-carbon/80 p-6"
            >
              <h2 className="font-display text-xl font-extrabold uppercase">
                Vê em <span className="text-neon">3D</span>
              </h2>
              <p className="mb-3 text-xs text-fog">
                Arrasta para rodar o modelo.
              </p>
              <div className="h-[380px]">
                <BikeModel3D />
              </div>
            </motion.div>
          )}
        </div>

        {/* Cartão de reserva */}
        <motion.aside
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="h-fit rounded-3xl border border-line bg-carbon/80 p-7 backdrop-blur-xl md:sticky md:top-24"
        >
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-neon">
            {vehicle.type} · {vehicle.islands}
          </p>
          <h1 className="mt-1 font-display text-4xl font-extrabold uppercase">
            {vehicle.name}
          </h1>
          <p className="text-sm text-fog">
            {vehicle.cc} · {vehicle.licence}
          </p>

          <div className="my-5 rounded-2xl border border-neon/30 bg-neon/10 px-5 py-4">
            <p className="font-display text-3xl font-extrabold text-neon">
              {vehicle.pricePerDay}
            </p>
            <p className="text-xs text-fog">{vehicle.priceNote}</p>
          </div>

          {vehicle.colors.length > 1 && (
            <div className="mb-5">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-fog">
                Cor · {color}
              </p>
              <div className="flex gap-2">
                {vehicle.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    title={c.name}
                    onClick={() => setColor(c.name)}
                    style={{ background: c.hex }}
                    className={`h-8 w-8 rounded-full border-2 transition-transform ${
                      color === c.name
                        ? 'scale-110 border-neon neon-glow'
                        : 'border-white/20 hover:scale-105'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="relative">
            <motion.button
              type="button"
              onClick={() => setPickerOpen((v) => !v)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-full bg-neon py-3.5 font-display text-lg font-bold uppercase tracking-wide text-night neon-glow"
            >
              Reservar agora
            </motion.button>
            <DatePickerModal
              open={pickerOpen}
              onClose={() => setPickerOpen(false)}
              onApply={reservar}
            />
          </div>
          <p className="mt-2 text-center text-[11px] text-fog">
            Escolhe as datas — confirmas o resumo na tua conta.
          </p>

          <ul className="mt-5 grid gap-2 border-t border-line pt-5">
            {TRUST.map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm text-fog">
                <span className="font-bold text-neon">✓</span> {t}
              </li>
            ))}
          </ul>
        </motion.aside>
      </div>

      {/* Descrição + ficha técnica */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-line bg-carbon/80 p-7"
        >
          <h2 className="mb-4 font-display text-2xl font-extrabold uppercase">
            Sobre este veículo
          </h2>
          {vehicle.description.map((p) => (
            <p key={p} className="mb-3 text-sm leading-relaxed text-fog">
              {p}
            </p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-3xl border border-line bg-carbon/80 p-7"
        >
          <h2 className="mb-4 font-display text-2xl font-extrabold uppercase">
            Ficha técnica
          </h2>
          <table className="w-full text-sm">
            <tbody>
              {vehicle.specs.map(([k, v]) => (
                <tr key={k} className="border-b border-line/60 last:border-0">
                  <td className="py-2.5 text-fog">{k}</td>
                  <td className="py-2.5 text-right font-semibold">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
      </div>
    </main>
  );
}
