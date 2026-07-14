'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import {
  addContactRequest,
  addReservation,
  listContactRequests,
  listReservations,
  type ContactRequest,
  type Reservation,
} from '@/lib/reservations';

const ISLANDS = [
  'Santiago',
  'São Vicente',
  'Boa Vista',
  'Sal',
  'Santo Antão',
  'Fogo',
  'Maio',
  'São Nicolau',
  'Brava',
];

const CONTACT_TYPES = [
  ['duvida', 'Dúvida'],
  ['alteracao', 'Alterar reserva'],
  ['orcamento', 'Orçamento'],
  ['outro', 'Outro'],
] as const;

const RESERVA_BADGE: Record<Reservation['status'], string> = {
  pendente: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-300',
  confirmada: 'border-neon/40 bg-neon/10 text-neon',
  concluida: 'border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan',
  cancelada: 'border-red-500/40 bg-red-500/10 text-red-400',
};

const PEDIDO_BADGE: Record<ContactRequest['status'], string> = {
  novo: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-300',
  em_curso: 'border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan',
  resolvido: 'border-neon/40 bg-neon/10 text-neon',
};

const PEDIDO_LABEL: Record<ContactRequest['status'], string> = {
  novo: 'Novo',
  em_curso: 'Em curso',
  resolvido: 'Resolvido',
};

const fmtDay = (iso: string) =>
  new Date(iso).toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

/* ── Modal de pedido de contacto ───────────────────────────────── */

function ContactModal({
  reserva,
  onClose,
  onCreated,
}: {
  reserva: Reservation;
  onClose: () => void;
  onCreated: (pedido: ContactRequest) => void;
}) {
  const { user } = useAuth();
  const [tipo, setTipo] = useState<string>('duvida');
  const [tel, setTel] = useState('');
  const [ilha, setIlha] = useState('');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy || !user) return;
    if (!tel.trim() || !ilha) {
      setError('Preenche o telefone e a tua ilha.');
      return;
    }
    setError(null);
    setBusy(true);
    const pedido = await addContactRequest(
      { id: user.id, name: user.name, email: user.email },
      { reservaRef: reserva.ref, tel: tel.trim(), ilha, tipo, msg: msg.trim() },
    );
    setBusy(false);
    onCreated(pedido);
  }

  const inputCls =
    'w-full rounded-xl border border-line bg-mist px-4 py-3 text-sm font-medium outline-none transition-colors placeholder:text-fog/60 focus:border-neon';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-night/85 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-lg rounded-3xl border border-line bg-carbon p-7 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-4 text-2xl leading-none text-fog transition-colors hover:text-neon"
        >
          ×
        </button>

        <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-neon">
          Reserva {reserva.ref}
        </p>
        <h2 className="mt-1 font-display text-3xl font-extrabold uppercase">
          Pedido de contacto
        </h2>
        <p className="mt-1 text-sm text-fog">
          Entra na fila de atendimento — um gestor responde-te por email ou
          WhatsApp, normalmente no próprio dia.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {CONTACT_TYPES.map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setTipo(value)}
              className={`rounded-full border px-4 py-1.5 font-display text-sm font-bold uppercase tracking-wide transition-colors ${
                tipo === value
                  ? 'border-neon bg-neon text-night neon-glow'
                  : 'border-line bg-mist text-fog hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input
            type="tel"
            placeholder="Telefone (WhatsApp) *"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            className={inputCls}
          />
          <select
            value={ilha}
            onChange={(e) => setIlha(e.target.value)}
            className={`${inputCls} ${ilha ? '' : 'text-fog/60'}`}
          >
            <option value="">A tua ilha *</option>
            {ISLANDS.map((i) => (
              <option key={i} value={i} className="bg-carbon text-white">
                {i}
              </option>
            ))}
          </select>
          <textarea
            rows={3}
            placeholder="Conta-nos o que precisas — prazo, dúvidas, alterações…"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className={`${inputCls} sm:col-span-2`}
          />
        </div>

        {error && (
          <p className="mt-3 text-sm font-medium text-red-400">{error}</p>
        )}

        <motion.button
          type="submit"
          disabled={busy}
          whileHover={{ scale: busy ? 1 : 1.02 }}
          whileTap={{ scale: busy ? 1 : 0.98 }}
          className="mt-5 w-full rounded-full bg-neon py-3.5 font-display text-lg font-bold uppercase tracking-wide text-night neon-glow disabled:opacity-60"
        >
          {busy ? 'A enviar…' : 'Enviar pedido'}
        </motion.button>
        <p className="mt-2 text-center text-[11px] text-fog">
          O pedido fica ligado à reserva {reserva.ref}. Sem spam, prometido.
        </p>
      </motion.form>
    </motion.div>
  );
}

/* ── Página ────────────────────────────────────────────────────── */

export default function ContaPage() {
  const router = useRouter();
  const { user, ready, logout } = useAuth();

  const [reservas, setReservas] = useState<Reservation[]>([]);
  const [pedidos, setPedidos] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState<string | null>(null);
  const [contactFor, setContactFor] = useState<Reservation | null>(null);
  const pendingDone = useRef(false);

  const refresh = useCallback(async (userId: string) => {
    const [r, p] = await Promise.all([
      listReservations(userId),
      listContactRequests(userId),
    ]);
    setReservas(r);
    setPedidos(p);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      router.replace('/login?next=/conta');
      return;
    }
    (async () => {
      // conclui a reserva iniciada antes do login (ProductView → sq-pending)
      if (!pendingDone.current) {
        pendingDone.current = true;
        const raw = sessionStorage.getItem('sq-pending');
        if (raw) {
          sessionStorage.removeItem('sq-pending');
          try {
            const reserva = await addReservation(
              { id: user.id, name: user.name, email: user.email },
              JSON.parse(raw),
            );
            setBanner(`Reserva ${reserva.ref} registada ✓`);
          } catch {
            /* payload inválido — ignora */
          }
        }
      }
      await refresh(user.id);
    })();
  }, [ready, user, router, refresh]);

  if (!ready || (!user && typeof window !== 'undefined')) {
    return (
      <main className="flex min-h-svh items-center justify-center bg-night pt-20 text-white">
        <p className="text-fog">A carregar…</p>
      </main>
    );
  }
  if (!user) return null;

  return (
    <main className="min-h-svh bg-night text-white">
      <div className="mx-auto max-w-4xl px-6 pb-24 pt-28">
      {/* cabeçalho da conta */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-neon to-neon-dim font-display text-xl font-bold text-night">
            {user.name
              .split(' ')
              .map((p) => p[0])
              .slice(0, 2)
              .join('')
              .toUpperCase()}
          </span>
          <div>
            <h1 className="font-display text-3xl font-extrabold uppercase leading-none">
              {user.name}
            </h1>
            <p className="text-sm text-fog">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {user.isAdmin && (
            <Link
              href="/backoffice"
              className="rounded-full border border-neon/50 px-5 py-2 font-display text-sm font-bold uppercase tracking-wide text-neon transition-colors hover:bg-neon/10"
            >
              Backoffice
            </Link>
          )}
          <button
            onClick={logout}
            className="rounded-full border border-line px-5 py-2 font-display text-sm font-bold uppercase tracking-wide text-fog transition-colors hover:border-red-500/60 hover:text-red-400"
          >
            Sair
          </button>
        </div>
      </div>

      <AnimatePresence>
        {banner && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 rounded-2xl border border-neon/40 bg-neon/10 px-5 py-3 text-sm font-semibold text-neon"
          >
            {banner}
          </motion.p>
        )}
      </AnimatePresence>

      {/* reservas */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-extrabold uppercase">
          As minhas <span className="text-neon">reservas</span>
        </h2>

        {loading ? (
          <div className="mt-4 grid gap-4">
            <div className="skeleton h-28 rounded-3xl" />
            <div className="skeleton h-28 rounded-3xl" />
          </div>
        ) : reservas.length === 0 ? (
          <div className="mt-4 rounded-3xl border border-line bg-carbon/80 p-8 text-center">
            <p className="text-fog">
              Ainda não tens reservas. Escolhe um veículo e reserva em minutos.
            </p>
            <Link
              href="/#frota"
              className="mt-4 inline-block rounded-full bg-neon px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-night neon-glow transition-transform hover:scale-105"
            >
              Ver a frota
            </Link>
          </div>
        ) : (
          <div className="mt-4 grid gap-4">
            {reservas.map((r) => (
              <motion.article
                key={r.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl border border-line bg-carbon/80 p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-neon">
                      {r.ref}
                    </p>
                    <h3 className="font-display text-2xl font-extrabold uppercase">
                      {r.vehicleName}
                    </h3>
                    <p className="mt-1 text-sm text-fog">
                      {fmtDay(r.start)} {r.startTime && `· ${r.startTime}`} →{' '}
                      {fmtDay(r.end)} {r.endTime && `· ${r.endTime}`}
                      {r.color ? ` · ${r.color}` : ''}
                    </p>
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 font-display text-xs font-bold uppercase tracking-wider ${RESERVA_BADGE[r.status]}`}
                  >
                    {r.status}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
                  <button
                    onClick={() => setContactFor(r)}
                    className="rounded-full bg-neon px-5 py-2 font-display text-sm font-bold uppercase tracking-wide text-night neon-glow transition-transform hover:scale-105"
                  >
                    Pedir contacto
                  </button>
                  <Link
                    href={`/veiculos/${r.vehicleSlug}`}
                    className="rounded-full border border-line px-5 py-2 font-display text-sm font-bold uppercase tracking-wide text-fog transition-colors hover:border-neon hover:text-neon"
                  >
                    Ver veículo
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* pedidos de contacto */}
      {pedidos.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-extrabold uppercase">
            Os meus <span className="text-neon">pedidos</span>
          </h2>
          <div className="mt-4 grid gap-3">
            {pedidos.map((p) => (
              <div
                key={p.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-carbon/80 px-5 py-4"
              >
                <div>
                  <p className="text-sm font-semibold">
                    {p.ref}{' '}
                    <span className="text-fog">· reserva {p.reservaRef}</span>
                  </p>
                  <p className="text-xs text-fog">
                    {CONTACT_TYPES.find(([v]) => v === p.tipo)?.[1] ?? p.tipo}
                    {p.msg && ` — ${p.msg.slice(0, 80)}${p.msg.length > 80 ? '…' : ''}`}
                  </p>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 font-display text-xs font-bold uppercase tracking-wider ${PEDIDO_BADGE[p.status]}`}
                >
                  {PEDIDO_LABEL[p.status]}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      <AnimatePresence>
        {contactFor && (
          <ContactModal
            reserva={contactFor}
            onClose={() => setContactFor(null)}
            onCreated={(pedido) => {
              setContactFor(null);
              setPedidos((prev) => [pedido, ...prev]);
              setBanner(
                `Pedido ${pedido.ref} enviado ✓ — respondemos por email ou WhatsApp.`,
              );
            }}
          />
        )}
      </AnimatePresence>
      </div>
    </main>
  );
}
