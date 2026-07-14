'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/conta';
  const { user, ready, login, register } = useAuth();

  const [mode, setMode] = useState<'login' | 'registo'>('login');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    if (ready && user) router.replace(next);
  }, [ready, user, next, router]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError(null);
    setInfo(null);
    setBusy(true);
    const result =
      mode === 'login'
        ? await login(email, pass)
        : await register(nome, email, pass);
    setBusy(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    if (result.info) {
      setInfo(result.info);
      return;
    }
    router.push(next);
  }

  const inputCls =
    'w-full rounded-xl border border-line bg-mist px-4 py-3 text-sm font-medium outline-none transition-colors placeholder:text-fog/60 focus:border-neon';

  return (
    <main className="flex min-h-svh items-center justify-center bg-night px-4 pt-20 text-white">
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md rounded-3xl border border-line bg-carbon/90 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl"
      >
        <h1 className="font-display text-4xl font-extrabold uppercase">
          {mode === 'login' ? 'Bem-vindo' : 'Cria a tua'}
          <br />
          <span className="text-neon">
            {mode === 'login' ? 'de volta' : 'conta'}
          </span>
        </h1>
        <p className="mt-2 text-sm text-fog">
          {mode === 'login'
            ? 'Entra para veres e geriras as tuas reservas.'
            : 'Regista-te para reservares em segundos.'}
        </p>

        {!supabase && (
          <p className="mt-4 rounded-xl border border-yellow-500/40 bg-yellow-500/10 px-4 py-3 text-xs text-yellow-300">
            Supabase por configurar: copia <b>.env.local.example</b> para{' '}
            <b>.env.local</b>, preenche as chaves e reinicia o servidor.
          </p>
        )}

        {/* alternador Entrar / Registar */}
        <div className="mt-6 grid grid-cols-2 gap-1 rounded-full border border-line bg-mist p-1">
          {(['login', 'registo'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m);
                setError(null);
                setInfo(null);
              }}
              className={`relative rounded-full py-2 font-display text-sm font-bold uppercase tracking-wide transition-colors ${
                mode === m ? 'text-night' : 'text-fog hover:text-white'
              }`}
            >
              {mode === m && (
                <motion.span
                  layoutId="mode-pill"
                  className="absolute inset-0 rounded-full bg-neon neon-glow"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">
                {m === 'login' ? 'Entrar' : 'Criar conta'}
              </span>
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="mt-6 grid gap-3">
          <AnimatePresence initial={false}>
            {mode === 'registo' && (
              <motion.input
                key="nome"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                placeholder="O teu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={inputCls}
              />
            )}
          </AnimatePresence>
          <input
            type="email"
            placeholder="nome@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
          />
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className={inputCls}
          />

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-medium text-red-400"
            >
              {error}
            </motion.p>
          )}
          {info && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-medium text-neon"
            >
              {info}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={busy}
            whileHover={{ scale: busy ? 1 : 1.02 }}
            whileTap={{ scale: busy ? 1 : 0.98 }}
            className="mt-2 rounded-full bg-neon py-3.5 font-display text-lg font-bold uppercase tracking-wide text-night neon-glow disabled:opacity-60"
          >
            {busy ? 'Aguarda…' : mode === 'login' ? 'Entrar' : 'Criar conta'}
          </motion.button>
        </form>

        <p className="mt-4 text-center text-[11px] text-fog">
          Conta protegida por Supabase Auth · as reservas ficam na tua conta.
        </p>
      </motion.div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
