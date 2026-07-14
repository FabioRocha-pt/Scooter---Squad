'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LogoMark from './LogoMark';

/*
  Preloader de arranque: o logo é "pintado" por um varrimento de farol,
  enquanto uma estrada com marcações se enche em amarelo — o ponto na
  ponta é a scooter a percorrê-la. No fim a cortina sobe e revela o site.
  Só corre em carregamentos completos (a navegação interna não remonta o layout).
*/

const EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];
const SHOW_MS = 2400;

export default function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    const t = setTimeout(() => setShow(false), SHOW_MS);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.style.overflow = '';
      }}
    >
      {show && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#111821]"
        >
          {/* brilho quente atrás do logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0.45] }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="pointer-events-none absolute h-[420px] w-[640px] rounded-full bg-[radial-gradient(closest-side,rgba(246,226,0,0.14),transparent)]"
          />

          {/* logo revelado por varrimento de farol */}
          <div className="relative w-[min(72vw,440px)]">
            <motion.div
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 1.35, ease: EASE, delay: 0.15 }}
            >
              <LogoMark className="w-full drop-shadow-[0_0_40px_rgba(246,226,0,0.15)]" />
            </motion.div>
            <motion.div
              initial={{ left: '-12%', opacity: 1 }}
              animate={{ left: '104%', opacity: [1, 1, 0] }}
              transition={{ duration: 1.35, ease: EASE, delay: 0.15 }}
              className="pointer-events-none absolute bottom-0 top-0 w-14 bg-gradient-to-r from-transparent via-[#f6e200]/50 to-transparent blur-[2px]"
            />
          </div>

          {/* estrada: marcações + progresso amarelo com a "scooter" na ponta */}
          <div className="relative mt-10 h-1.5 w-[min(72vw,440px)] overflow-visible rounded-full bg-white/10">
            <div
              className="absolute inset-0 rounded-full opacity-40"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, rgba(255,255,255,0.35) 0 14px, transparent 14px 30px)',
              }}
            />
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.05, ease: 'easeInOut', delay: 0.1 }}
              className="absolute bottom-0 left-0 top-0 rounded-full bg-[#f6e200]"
            >
              <span className="absolute -right-1.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-[#f6e200] shadow-[0_0_16px_4px_rgba(246,226,0,0.55)]" />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 font-display text-sm font-bold uppercase tracking-[0.35em] text-white/60"
          >
            Vive a ilha · Sente a estrada
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
