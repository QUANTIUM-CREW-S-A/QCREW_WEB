import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase, isAdmin } from '../lib/supabase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      // Una sesion anonima (widget de chat) no cuenta como usuario logueado
      const current = data.session?.user ?? null;
      setUser(current?.is_anonymous ? null : current);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const current = session?.user ?? null;
      setUser(current?.is_anonymous ? null : current);
      setLoading(false);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return { user, loading, login, logout, isAdmin: isAdmin(user) };
}
