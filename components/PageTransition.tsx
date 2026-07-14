'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

/*
  Véu que desvanece a cada mudança de rota — combinado com a entrada do
  template.tsx (fade + subida) faz o crossfade suave em cada link clicado.
  Mudanças só de hash (/#frota) não alteram o pathname, logo não o disparam.
*/
export default function PageTransition() {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="pointer-events-none fixed inset-0 z-[90] bg-paper"
    />
  );
}
