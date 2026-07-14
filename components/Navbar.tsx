'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import LogoMark from './LogoMark';

const LINKS = [
  { label: 'Experiências', href: '/#experiencias' },
  { label: 'Frota', href: '/#frota' },
  { label: 'Comprar', href: '/loja' },
  { label: 'Contactos', href: '/#contactos' },
];

export default function Navbar() {
  const { user, ready, logout } = useAuth();

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed inset-x-0 top-3.5 z-50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav className="glass flex items-center justify-between gap-3 rounded-[20px] px-4 py-2.5 shadow-[0_8px_32px_rgba(18,22,29,0.10)]">
          <Link href="/" className="shrink-0">
            <LogoMark className="h-10 w-auto" />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="rounded-[10px] px-3.5 py-2 font-display text-[0.95rem] font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-brand/10 hover:text-brand"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#reservar"
                className="rounded-[10px] bg-brand px-4 py-2 font-display text-[0.95rem] font-semibold uppercase tracking-wider text-white shadow-[0_6px_18px_rgba(255,107,26,0.35)] transition-colors hover:bg-brand-deep"
              >
                Reservar
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-2">
            {ready &&
              (user ? (
                <div className="flex items-center gap-1">
                  <Link
                    href={user.isAdmin ? '/backoffice' : '/conta'}
                    title={user.email}
                    className="grid h-8 w-8 place-items-center rounded-full bg-brand font-display text-sm font-bold text-white"
                  >
                    {user.name
                      .split(' ')
                      .map((p) => p[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()}
                  </Link>
                  <button
                    onClick={logout}
                    className="hidden rounded-full px-2 py-1 text-xs font-semibold text-muted transition-colors hover:text-brand md:block"
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden text-xs font-semibold text-muted transition-colors hover:text-brand md:block"
                >
                  Entrar
                </Link>
              ))}
            <span className="rounded-[10px] border border-white/75 bg-white/70 px-3 py-1.5 text-xs font-semibold text-muted">
              PT ⌄
            </span>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
