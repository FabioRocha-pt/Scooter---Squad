'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import {
  getDataSource,
  listContactRequests,
  listReservations,
  updateContactStatus,
  updateReservationStatus,
  type ContactRequest,
  type ContactStatus,
  type Reservation,
  type ReservationStatus,
} from '@/lib/reservations';

const RESERVA_STATUS: [ReservationStatus, string][] = [
  ['pendente', 'Pendente'],
  ['confirmada', 'Confirmada'],
  ['concluida', 'Concluída'],
  ['cancelada', 'Cancelada'],
];

const PEDIDO_STATUS: [ContactStatus, string][] = [
  ['novo', 'Novo'],
  ['em_curso', 'Em curso'],
  ['resolvido', 'Resolvido'],
];

const TIPO_LABEL: Record<string, string> = {
  duvida: 'Dúvida',
  alteracao: 'Alterar reserva',
  orcamento: 'Orçamento',
  outro: 'Outro',
};

const STATUS_TONE: Record<string, string> = {
  pendente: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-300',
  confirmada: 'border-neon/40 bg-neon/10 text-neon',
  concluida: 'border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan',
  cancelada: 'border-red-500/40 bg-red-500/10 text-red-400',
  novo: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-300',
  em_curso: 'border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan',
  resolvido: 'border-neon/40 bg-neon/10 text-neon',
};

const fmtDay = (iso: string) =>
  new Date(iso).toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

const fmtWhen = (iso: string) =>
  new Date(iso).toLocaleString('pt-PT', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

function StatusSelect<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: [T, string][];
  onChange: (v: T) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className={`cursor-pointer rounded-full border px-3 py-1.5 font-display text-xs font-bold uppercase tracking-wider outline-none transition-colors ${STATUS_TONE[value]}`}
    >
      {options.map(([v, label]) => (
        <option key={v} value={v} className="bg-carbon text-white">
          {label}
        </option>
      ))}
    </select>
  );
}

export default function BackofficePage() {
  const router = useRouter();
  const { user, ready } = useAuth();

  const [tab, setTab] = useState<'reservas' | 'pedidos'>('reservas');
  const [reservas, setReservas] = useState<Reservation[]>([]);
  const [pedidos, setPedidos] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'supabase' | 'local'>('local');

  const refresh = useCallback(async () => {
    const [r, p] = await Promise.all([
      listReservations(),
      listContactRequests(),
    ]);
    setReservas(r);
    setPedidos(p);
    setSource(getDataSource());
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      router.replace('/login?next=/backoffice');
      return;
    }
    if (user.isAdmin) refresh();
  }, [ready, user, router, refresh]);

  async function setReservaStatus(id: string, status: ReservationStatus) {
    setReservas((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r)),
    );
    await updateReservationStatus(id, status);
  }

  async function setPedidoStatus(id: string, status: ContactStatus) {
    setPedidos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p)),
    );
    await updateContactStatus(id, status);
  }

  if (!ready || !user) {
    return (
      <main className="flex min-h-svh items-center justify-center bg-night pt-20 text-white">
        <p className="text-fog">A carregar…</p>
      </main>
    );
  }

  if (!user.isAdmin) {
    return (
      <main className="flex min-h-svh items-center justify-center bg-night px-4 pt-20 text-white">
        <div className="max-w-md rounded-3xl border border-line bg-carbon/80 p-8 text-center">
          <h1 className="font-display text-3xl font-extrabold uppercase">
            Acesso <span className="text-red-400">restrito</span>
          </h1>
          <p className="mt-2 text-sm text-fog">
            O backoffice é só para gestores. Se devias ter acesso, pede para
            adicionarem o teu email a{' '}
            <code className="text-neon">NEXT_PUBLIC_ADMIN_EMAILS</code>.
          </p>
          <Link
            href="/conta"
            className="mt-5 inline-block rounded-full bg-neon px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-night neon-glow"
          >
            Ir para a minha conta
          </Link>
        </div>
      </main>
    );
  }

  const novos = pedidos.filter((p) => p.status === 'novo').length;
  const pendentes = reservas.filter((r) => r.status === 'pendente').length;

  return (
    <main className="min-h-svh bg-night text-white">
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-neon">
            Backoffice
          </p>
          <h1 className="font-display text-4xl font-extrabold uppercase">
            Gestor de <span className="text-neon">reservas</span>
          </h1>
          <p className="mt-1 text-sm text-fog">
            {pendentes > 0
              ? `${pendentes} reserva${pendentes === 1 ? '' : 's'} por confirmar`
              : 'Sem reservas por confirmar'}
            {' · '}
            {novos > 0
              ? `${novos} pedido${novos === 1 ? '' : 's'} de contacto novo${novos === 1 ? '' : 's'}`
              : 'sem pedidos novos'}
          </p>
        </div>
        <span
          className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
            source === 'supabase'
              ? 'border-neon/40 bg-neon/10 text-neon'
              : 'border-yellow-500/40 bg-yellow-500/10 text-yellow-300'
          }`}
          title={
            source === 'supabase'
              ? 'Ligado às tabelas do Supabase'
              : 'As tabelas do Supabase ainda não existem — corre supabase/schema.sql para veres reservas de todos os clientes'
          }
        >
          {source === 'supabase' ? '● Supabase' : '● Demo local (só este browser)'}
        </span>
      </div>

      {/* tabs */}
      <div className="mt-8 flex gap-2">
        {(
          [
            ['reservas', `Reservas (${reservas.length})`],
            ['pedidos', `Pedidos de contacto (${pedidos.length})`],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            onClick={() => setTab(value)}
            className={`relative rounded-full px-5 py-2.5 font-display text-sm font-bold uppercase tracking-wide transition-colors ${
              tab === value ? 'text-night' : 'text-fog hover:text-white'
            }`}
          >
            {tab === value && (
              <motion.span
                layoutId="bo-tab"
                className="absolute inset-0 rounded-full bg-neon neon-glow"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{label}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="mt-6 grid gap-3">
          <div className="skeleton h-24 rounded-3xl" />
          <div className="skeleton h-24 rounded-3xl" />
          <div className="skeleton h-24 rounded-3xl" />
        </div>
      ) : tab === 'reservas' ? (
        <div className="mt-6 grid gap-3">
          {reservas.length === 0 && (
            <p className="rounded-3xl border border-line bg-carbon/80 p-8 text-center text-fog">
              Ainda não há reservas.
            </p>
          )}
          {reservas.map((r) => (
            <article
              key={r.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-line bg-carbon/80 px-6 py-5"
            >
              <div className="min-w-52">
                <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-neon">
                  {r.ref}
                </p>
                <h3 className="font-display text-xl font-extrabold uppercase">
                  {r.vehicleName}
                </h3>
                <p className="text-xs text-fog">
                  {fmtDay(r.start)} {r.startTime && `· ${r.startTime}`} →{' '}
                  {fmtDay(r.end)} {r.endTime && `· ${r.endTime}`}
                  {r.color ? ` · ${r.color}` : ''}
                </p>
              </div>
              <div className="min-w-44 text-sm">
                <p className="font-semibold">{r.userName}</p>
                <p className="text-xs text-fog">{r.userEmail}</p>
                <p className="text-xs text-fog">criada {fmtWhen(r.createdAt)}</p>
              </div>
              <StatusSelect
                value={r.status}
                options={RESERVA_STATUS}
                onChange={(s) => setReservaStatus(r.id, s)}
              />
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-6 grid gap-3">
          {pedidos.length === 0 && (
            <p className="rounded-3xl border border-line bg-carbon/80 p-8 text-center text-fog">
              Ainda não há pedidos de contacto. Os clientes podem pedir contacto
              a partir de cada reserva na página “Conta”.
            </p>
          )}
          {pedidos.map((p) => (
            <article
              key={p.id}
              className="rounded-3xl border border-line bg-carbon/80 px-6 py-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="min-w-52">
                  <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-neon">
                    {p.ref} · reserva {p.reservaRef}
                  </p>
                  <h3 className="font-display text-xl font-extrabold uppercase">
                    {TIPO_LABEL[p.tipo] ?? p.tipo}
                  </h3>
                  <p className="text-xs text-fog">recebido {fmtWhen(p.createdAt)}</p>
                </div>
                <div className="min-w-44 text-sm">
                  <p className="font-semibold">{p.userName}</p>
                  <p className="text-xs text-fog">{p.userEmail}</p>
                  <p className="text-xs text-fog">
                    {p.tel} · {p.ilha}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${p.tel.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-line px-4 py-1.5 font-display text-xs font-bold uppercase tracking-wide text-fog transition-colors hover:border-neon hover:text-neon"
                  >
                    WhatsApp
                  </a>
                  <StatusSelect
                    value={p.status}
                    options={PEDIDO_STATUS}
                    onChange={(s) => setPedidoStatus(p.id, s)}
                  />
                </div>
              </div>
              {p.msg && (
                <p className="mt-3 border-t border-line pt-3 text-sm text-fog">
                  “{p.msg}”
                </p>
              )}
            </article>
          ))}
        </div>
      )}
      </div>
    </main>
  );
}
