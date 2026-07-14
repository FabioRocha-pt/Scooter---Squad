import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/*
  Preenche .env.local com as chaves do teu projeto (vê .env.local.example).
  Sem elas o cliente fica null e a UI mostra o aviso de configuração
  em vez de rebentar.
*/
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;
