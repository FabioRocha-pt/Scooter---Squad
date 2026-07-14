-- Scooter & Quad — tabelas de reservas e pedidos de contacto
-- Corre isto uma vez no Supabase: Dashboard → SQL Editor → New query → colar → Run.
-- Enquanto estas tabelas não existirem, a app funciona em modo demo (localStorage).

-- ── Admins (emails com acesso total via RLS; espelha NEXT_PUBLIC_ADMIN_EMAILS) ──
create table if not exists public.admins (
  email text primary key
);

insert into public.admins (email)
values ('fapi.rocha@gmail.com')
on conflict do nothing;

alter table public.admins enable row level security;

drop policy if exists "admins_self_read" on public.admins;
create policy "admins_self_read" on public.admins
  for select using (auth.jwt() ->> 'email' = email);

create or replace function public.is_admin()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins where email = auth.jwt() ->> 'email'
  );
$$;

-- ── Reservas ────────────────────────────────────────────────────────────────
create table if not exists public.reservas (
  id uuid primary key default gen_random_uuid(),
  ref text not null,
  user_id uuid not null references auth.users (id) on delete cascade,
  user_name text not null default '',
  user_email text not null default '',
  vehicle_slug text not null,
  vehicle_name text not null,
  start_date timestamptz not null,
  end_date timestamptz not null,
  start_time text not null default '',
  end_time text not null default '',
  color text,
  status text not null default 'pendente'
    check (status in ('pendente', 'confirmada', 'concluida', 'cancelada')),
  created_at timestamptz not null default now()
);

alter table public.reservas enable row level security;

drop policy if exists "reservas_select" on public.reservas;
create policy "reservas_select" on public.reservas
  for select using (auth.uid() = user_id or public.is_admin());

drop policy if exists "reservas_insert" on public.reservas;
create policy "reservas_insert" on public.reservas
  for insert with check (auth.uid() = user_id);

drop policy if exists "reservas_update_admin" on public.reservas;
create policy "reservas_update_admin" on public.reservas
  for update using (public.is_admin());

-- ── Pedidos de contacto (ligados a uma reserva) ─────────────────────────────
create table if not exists public.pedidos_contacto (
  id uuid primary key default gen_random_uuid(),
  ref text not null,
  reserva_ref text not null default '',
  user_id uuid not null references auth.users (id) on delete cascade,
  user_name text not null default '',
  user_email text not null default '',
  tel text not null default '',
  ilha text not null default '',
  tipo text not null default 'duvida',
  msg text not null default '',
  status text not null default 'novo'
    check (status in ('novo', 'em_curso', 'resolvido')),
  created_at timestamptz not null default now()
);

alter table public.pedidos_contacto enable row level security;

drop policy if exists "pedidos_select" on public.pedidos_contacto;
create policy "pedidos_select" on public.pedidos_contacto
  for select using (auth.uid() = user_id or public.is_admin());

drop policy if exists "pedidos_insert" on public.pedidos_contacto;
create policy "pedidos_insert" on public.pedidos_contacto
  for insert with check (auth.uid() = user_id);

drop policy if exists "pedidos_update_admin" on public.pedidos_contacto;
create policy "pedidos_update_admin" on public.pedidos_contacto
  for update using (public.is_admin());

-- Nota: se tiveres a tabela antiga `public.reservations` de uma versão anterior,
-- já não é usada pela app — podes apagá-la com:
--   drop table if exists public.reservations;
