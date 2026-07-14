'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { VEHICLES } from '@/lib/vehicles';

export default function CustomerFavourites() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) =>
    trackRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' });

  return (
    <section id="favoritos" className="relative z-20 mx-auto max-w-7xl px-6 py-16">
      <div className="rounded-3xl border border-line bg-carbon/80 p-6 backdrop-blur-xl md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <motion.h2
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border-b-2 border-dashed border-fog/40 pb-1 font-display text-2xl font-extrabold uppercase italic tracking-[0.25em] md:text-3xl"
          >
            Favoritos dos Clientes
          </motion.h2>

          <div className="flex gap-2">
            {([-1, 1] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => scroll(dir)}
                aria-label={dir === -1 ? 'Anterior' : 'Seguinte'}
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-fog transition-colors hover:border-neon hover:text-neon"
              >
                {dir === -1 ? '‹' : '›'}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        >
          {VEHICLES.map((v, i) => (
            <motion.div
              key={v.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: 'easeOut' }}
              whileHover={{ y: -6 }}
              className="shrink-0 snap-start"
            >
              <Link
                href={`/veiculos/${v.slug}`}
                className="group block w-64 overflow-hidden rounded-2xl border border-line bg-mist"
              >
                <div className="h-36 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={v.img}
                    alt={v.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-lg font-bold uppercase">
                    {v.name}
                  </h3>
                  <p className="text-xs text-fog">
                    {v.cc} · {v.licence}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-display text-lg font-extrabold text-neon">
                      {v.pricePerDay}
                    </span>
                    <span className="rounded-full border border-neon/40 px-4 py-1.5 text-xs font-bold uppercase text-neon transition-colors group-hover:bg-neon group-hover:text-night">
                      Reservar
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
