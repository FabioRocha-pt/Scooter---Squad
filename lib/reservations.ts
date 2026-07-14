import { supabase } from './supabase';

/*
  Camada de dados das reservas e pedidos de contacto.

  Tenta sempre o Supabase primeiro (tabelas `reservas` e `pedidos_contacto`
  — vê supabase/schema.sql). Se as tabelas ainda não existirem ou o cliente
  não estiver configurado, cai para localStorage: tudo funciona na mesma,
  mas os dados ficam limitados a este browser.
*/

export type ReservationStatus =
  | 'pendente'
  | 'confirmada'
  | 'concluida'
  | 'cancelada';

export interface Reservation {
  id: string;
  ref: string;
  userId: string;
  userName: string;
  userEmail: string;
  vehicleSlug: string;
  vehicleName: string;
  start: string;
  end: string;
  startTime: string;
  endTime: string;
  color: string | null;
  status: ReservationStatus;
  createdAt: string;
}

export type ContactStatus = 'novo' | 'em_curso' | 'resolvido';

export interface ContactRequest {
  id: string;
  ref: string;
  reservaRef: string;
  userId: string;
  userName: string;
  userEmail: string;
  tel: string;
  ilha: string;
  tipo: string;
  msg: string;
  status: ContactStatus;
  createdAt: string;
}

export interface ReservationInput {
  vehicleSlug: string;
  vehicleName: string;
  start: string;
  end: string;
  startTime: string;
  endTime: string;
  color?: string | null;
}

export interface ContactInput {
  reservaRef: string;
  tel: string;
  ilha: string;
  tipo: string;
  msg: string;
}

export interface Requester {
  id: string;
  name: string;
  email: string;
}

/* onde ficou guardada a última operação — mostrado no backoffice */
let source: 'supabase' | 'local' = 'local';
export const getDataSource = () => source;

const LS_RESERVAS = 'sq-reservas';
const LS_PEDIDOS = 'sq-pedidos-contacto';

const newRef = (count: number) =>
  `SQ-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;

const localList = <T>(key: string): T[] => {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(key) || '[]') as T[];
  } catch {
    return [];
  }
};

const localSave = <T>(key: string, rows: T[]) =>
  localStorage.setItem(key, JSON.stringify(rows));

/* ── Reservas ──────────────────────────────────────────────────── */

interface ReservaRow {
  id: string;
  ref: string;
  user_id: string;
  user_name: string;
  user_email: string;
  vehicle_slug: string;
  vehicle_name: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  color: string | null;
  status: ReservationStatus;
  created_at: string;
}

const fromRow = (r: ReservaRow): Reservation => ({
  id: r.id,
  ref: r.ref,
  userId: r.user_id,
  userName: r.user_name,
  userEmail: r.user_email,
  vehicleSlug: r.vehicle_slug,
  vehicleName: r.vehicle_name,
  start: r.start_date,
  end: r.end_date,
  startTime: r.start_time,
  endTime: r.end_time,
  color: r.color,
  status: r.status,
  createdAt: r.created_at,
});

export async function addReservation(
  user: Requester,
  input: ReservationInput,
): Promise<Reservation> {
  if (supabase) {
    const { count } = await supabase
      .from('reservas')
      .select('id', { count: 'exact', head: true });
    const { data, error } = await supabase
      .from('reservas')
      .insert({
        ref: newRef(count ?? 0),
        user_id: user.id,
        user_name: user.name,
        user_email: user.email,
        vehicle_slug: input.vehicleSlug,
        vehicle_name: input.vehicleName,
        start_date: input.start,
        end_date: input.end,
        start_time: input.startTime,
        end_time: input.endTime,
        color: input.color ?? null,
      })
      .select()
      .single();
    if (!error && data) {
      source = 'supabase';
      return fromRow(data as ReservaRow);
    }
    console.warn('[reservas] Supabase indisponível, a usar localStorage:', error?.message);
  }

  const rows = localList<Reservation>(LS_RESERVAS);
  const reserva: Reservation = {
    id: crypto.randomUUID(),
    ref: newRef(rows.length),
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    vehicleSlug: input.vehicleSlug,
    vehicleName: input.vehicleName,
    start: input.start,
    end: input.end,
    startTime: input.startTime,
    endTime: input.endTime,
    color: input.color ?? null,
    status: 'pendente',
    createdAt: new Date().toISOString(),
  };
  rows.push(reserva);
  localSave(LS_RESERVAS, rows);
  source = 'local';
  return reserva;
}

export async function listReservations(userId?: string): Promise<Reservation[]> {
  if (supabase) {
    let query = supabase
      .from('reservas')
      .select('*')
      .order('created_at', { ascending: false });
    if (userId) query = query.eq('user_id', userId);
    const { data, error } = await query;
    if (!error && data) {
      source = 'supabase';
      return (data as ReservaRow[]).map(fromRow);
    }
    console.warn('[reservas] Supabase indisponível, a usar localStorage:', error?.message);
  }
  source = 'local';
  return localList<Reservation>(LS_RESERVAS)
    .filter((r) => !userId || r.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function updateReservationStatus(
  id: string,
  status: ReservationStatus,
): Promise<void> {
  if (supabase) {
    const { error } = await supabase
      .from('reservas')
      .update({ status })
      .eq('id', id);
    if (!error) {
      source = 'supabase';
      return;
    }
    console.warn('[reservas] Supabase indisponível, a usar localStorage:', error.message);
  }
  const rows = localList<Reservation>(LS_RESERVAS);
  const row = rows.find((r) => r.id === id);
  if (row) {
    row.status = status;
    localSave(LS_RESERVAS, rows);
  }
  source = 'local';
}

/* ── Pedidos de contacto ───────────────────────────────────────── */

interface PedidoRow {
  id: string;
  ref: string;
  reserva_ref: string;
  user_id: string;
  user_name: string;
  user_email: string;
  tel: string;
  ilha: string;
  tipo: string;
  msg: string;
  status: ContactStatus;
  created_at: string;
}

const fromPedidoRow = (p: PedidoRow): ContactRequest => ({
  id: p.id,
  ref: p.ref,
  reservaRef: p.reserva_ref,
  userId: p.user_id,
  userName: p.user_name,
  userEmail: p.user_email,
  tel: p.tel,
  ilha: p.ilha,
  tipo: p.tipo,
  msg: p.msg,
  status: p.status,
  createdAt: p.created_at,
});

export async function addContactRequest(
  user: Requester,
  input: ContactInput,
): Promise<ContactRequest> {
  if (supabase) {
    const { count } = await supabase
      .from('pedidos_contacto')
      .select('id', { count: 'exact', head: true });
    const { data, error } = await supabase
      .from('pedidos_contacto')
      .insert({
        ref: `CT-${new Date().getFullYear()}-${String((count ?? 0) + 1).padStart(4, '0')}`,
        reserva_ref: input.reservaRef,
        user_id: user.id,
        user_name: user.name,
        user_email: user.email,
        tel: input.tel,
        ilha: input.ilha,
        tipo: input.tipo,
        msg: input.msg,
      })
      .select()
      .single();
    if (!error && data) {
      source = 'supabase';
      return fromPedidoRow(data as PedidoRow);
    }
    console.warn('[pedidos] Supabase indisponível, a usar localStorage:', error?.message);
  }

  const rows = localList<ContactRequest>(LS_PEDIDOS);
  const pedido: ContactRequest = {
    id: crypto.randomUUID(),
    ref: `CT-${new Date().getFullYear()}-${String(rows.length + 1).padStart(4, '0')}`,
    reservaRef: input.reservaRef,
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    tel: input.tel,
    ilha: input.ilha,
    tipo: input.tipo,
    msg: input.msg,
    status: 'novo',
    createdAt: new Date().toISOString(),
  };
  rows.push(pedido);
  localSave(LS_PEDIDOS, rows);
  source = 'local';
  return pedido;
}

export async function listContactRequests(
  userId?: string,
): Promise<ContactRequest[]> {
  if (supabase) {
    let query = supabase
      .from('pedidos_contacto')
      .select('*')
      .order('created_at', { ascending: false });
    if (userId) query = query.eq('user_id', userId);
    const { data, error } = await query;
    if (!error && data) {
      source = 'supabase';
      return (data as PedidoRow[]).map(fromPedidoRow);
    }
    console.warn('[pedidos] Supabase indisponível, a usar localStorage:', error?.message);
  }
  source = 'local';
  return localList<ContactRequest>(LS_PEDIDOS)
    .filter((p) => !userId || p.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function updateContactStatus(
  id: string,
  status: ContactStatus,
): Promise<void> {
  if (supabase) {
    const { error } = await supabase
      .from('pedidos_contacto')
      .update({ status })
      .eq('id', id);
    if (!error) {
      source = 'supabase';
      return;
    }
    console.warn('[pedidos] Supabase indisponível, a usar localStorage:', error.message);
  }
  const rows = localList<ContactRequest>(LS_PEDIDOS);
  const row = rows.find((p) => p.id === id);
  if (row) {
    row.status = status;
    localSave(LS_PEDIDOS, rows);
  }
  source = 'local';
}
