import { createClient } from '@supabase/supabase-js';
import type { User } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Faltan VITE_SUPABASE_URL o VITE_SUPABASE_PUBLISHABLE_KEY en el archivo .env'
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

/**
 * El widget de chat publico necesita una sesion para pasar las policies de RLS.
 * Solo firmamos anonimamente si no hay sesion activa, para no desloguear a un
 * admin que este navegando el sitio publico.
 */
export async function ensureAnonSession() {
  const { data } = await supabase.auth.getSession();
  if (data.session) return data.session;

  const { data: signedIn, error } = await supabase.auth.signInAnonymously();
  if (error) throw error;
  return signedIn.session;
}

/**
 * app_metadata solo lo puede escribir el service_role, por eso es seguro
 * usarlo para autorizacion (a diferencia de user_metadata).
 */
export function isAdmin(user: User | null) {
  return user?.app_metadata?.role === 'admin';
}
