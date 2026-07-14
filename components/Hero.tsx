'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, type Variants } from 'framer-motion';
import SearchBar from './SearchBar';
import DatePickerModal, { type RentalRange } from './DatePickerModal';
import VideoBackground from './VideoBackground';

// R3F só corre no cliente — sem SSR
const BikeModel3D = dynamic(() => import('./BikeModel3D'), { ssr: false });

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.35 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 42 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

const fmt = (d: Date) =>
  d.toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' });

export default function Hero() {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [range, setRange] = useState<RentalRange | null>(null);

  const dateLabel =
    range?.start && range?.end
      ? `${fmt(range.start)} — ${fmt(range.end)}`
      : 'Levantamento e Devolução';

  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden">
      <VideoBackground />

      {/* Palco 3D — centro exato do hero, como na referência */}
      <div className="absolute left-1/2 top-1/2 z-10 hidden h-[56vh] w-[min(820px,64vw)] -translate-x-1/2 -translate-y-1/2 md:block">
        <BikeModel3D />
      </div>

      {/* Barra de pesquisa flutuante + modal de datas */}
      <div className="relative z-40 flex justify-center px-4 pt-28">
        <div className="relative w-full max-w-2xl">
          <SearchBar
            dateLabel={dateLabel}
            pickerOpen={pickerOpen}
            onToggleDates={() => setPickerOpen((v) => !v)}
          />
          <DatePickerModal
            open={pickerOpen}
            onClose={() => setPickerOpen(false)}
            onApply={(r) => setRange(r)}
          />
        </div>
      </div>

      {/* Conteúdo do hero */}
      <div className="pointer-events-none relative z-20 mx-auto flex w-full max-w-7xl flex-1 items-center px-6 pb-16">
        <div className="grid w-full items-center gap-10 md:grid-cols-2">
          {/* Headline animada */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.h1
              variants={item}
              className="max-w-xl font-display text-6xl font-extrabold uppercase leading-[0.95] md:text-8xl"
            >
              Scooters &amp; Quads
              <br />
              <span className="text-neon">para Alugar</span>
            </motion.h1>

            <motion.p variants={item} className="mt-4 max-w-md text-fog">
              Disponíveis à hora, ao dia, à semana e ao mês — Santiago, São
              Vicente e Boa Vista.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-6 h-1.5 w-20 rounded-full bg-neon neon-glow"
            />
          </motion.div>

          {/* Chip de preço (lado direito, como na referência) */}
          <motion.aside
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="justify-self-start text-left md:justify-self-end md:text-right"
          >
            <h2 className="font-display text-4xl font-extrabold uppercase md:text-5xl">
              Taro Storm T9
            </h2>
            <p className="text-sm text-fog">Scooter · 125 cc · carta A1</p>
            <p className="mt-2 font-display text-4xl font-extrabold text-neon">
              32,00&nbsp;€<span className="text-lg text-fog">/dia</span>
            </p>
            <p className="text-xs text-fog">100 km/dia incluídos</p>
          </motion.aside>
        </div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="h-9 w-5 rounded-full border border-line"
        >
          <div className="mx-auto mt-1.5 h-2 w-1 rounded-full bg-neon" />
        </motion.div>
      </motion.div>
    </section>
  );
}
