'use client';

import Link from 'next/link';

export function LoginButton() {
  return (
    <Link
      href="/login"
      className="rounded-full bg-neon px-5 py-2.5 font-display text-sm font-bold uppercase tracking-wide text-night neon-glow transition-transform hover:scale-105"
    >
      Entrar
    </Link>
  );
}
