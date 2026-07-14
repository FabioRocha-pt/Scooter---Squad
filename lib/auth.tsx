'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from './supabase';
import {
  addReservation as saveReservation,
  type Reservation,
  type ReservationInput,
} from './reservations';

export { supabase };

/*
  Sessão Supabase normalizada para o resto da app: nome legível,
  email e flag de admin (emails em NEXT_PUBLIC_ADMIN_EMAILS).
*/

export interface SQUser {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

type AuthResult = { error?: string; info?: string };

interface AuthContextType {
  user: SQUser | null;
  ready: boolean;
  login: (email: string, pass: string) => Promise<AuthResult>;
  register: (nome: string, email: string, pass: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  addReservation: (input: ReservationInput) => Promise<Reservation | null>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  ready: false,
  login: async () => ({ error: 'Auth por inicializar.' }),
  register: async () => ({ error: 'Auth por inicializar.' }),
  logout: async () => {},
  addReservation: async () => null,
});

export const useAuth = () => useContext(AuthContext);

const ADMIN_EMAILS = (
  process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? 'fapi.rocha@gmail.com'
)
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

function toSQUser(u: SupabaseUser | null): SQUser | null {
  if (!u) return null;
  const email = u.email ?? '';
  const name =
    (u.user_metadata?.nome as string | undefined) ||
    (u.user_metadata?.name as string | undefined) ||
    (u.user_metadata?.full_name as string | undefined) ||
    email.split('@')[0] ||
    'Cliente';
  return {
    id: u.id,
    name,
    email,
    isAdmin: ADMIN_EMAILS.includes(email.toLowerCase()),
  };
}

const NO_CONFIG =
  'Supabase por configurar — preenche o .env e reinicia o servidor.';

function translateAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes('invalid login credentials')) return 'Email ou password errados.';
  if (m.includes('email not confirmed'))
    return 'Confirma primeiro o teu email — vê a caixa de entrada.';
  if (m.includes('already registered'))
    return 'Já existe uma conta com este email. Entra em vez de registar.';
  if (m.includes('at least 6 characters'))
    return 'A password precisa de pelo menos 6 caracteres.';
  if (m.includes('rate limit') || m.includes('too many'))
    return 'Demasiadas tentativas — espera um pouco e tenta outra vez.';
  return message;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SQUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setReady(true);
      return;
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(toSQUser(session?.user ?? null));
      setReady(true);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(toSQUser(session?.user ?? null));
      setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback(
    async (email: string, pass: string): Promise<AuthResult> => {
      if (!supabase) return { error: NO_CONFIG };
      if (!email.trim() || !pass) return { error: 'Preenche email e password.' };
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: pass,
      });
      if (error) return { error: translateAuthError(error.message) };
      return {};
    },
    [],
  );

  const register = useCallback(
    async (nome: string, email: string, pass: string): Promise<AuthResult> => {
      if (!supabase) return { error: NO_CONFIG };
      if (!nome.trim()) return { error: 'Diz-nos o teu nome.' };
      if (!email.trim() || !pass) return { error: 'Preenche email e password.' };
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: pass,
        options: {
          data: { nome: nome.trim() },
          emailRedirectTo:
            typeof window !== 'undefined'
              ? `${window.location.origin}/conta`
              : undefined,
        },
      });
      if (error) return { error: translateAuthError(error.message) };
      // email já registado: o Supabase devolve um user "fantasma" sem identities
      if (data.user && data.user.identities?.length === 0)
        return { error: 'Já existe uma conta com este email. Entra em vez de registar.' };
      if (!data.session)
        return {
          info: 'Conta criada! Confirma o email que te enviámos para ativares a sessão.',
        };
      return {};
    },
    [],
  );

  const logout = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  }, []);

  const addReservation = useCallback(
    async (input: ReservationInput): Promise<Reservation | null> => {
      if (!user) return null;
      return saveReservation(
        { id: user.id, name: user.name, email: user.email },
        input,
      );
    },
    [user],
  );

  const value = useMemo(
    () => ({ user, ready, login, register, logout, addReservation }),
    [user, ready, login, register, logout, addReservation],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
