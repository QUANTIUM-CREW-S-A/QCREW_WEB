import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { isSupabaseConfigured } from '../lib/supabase';

/** Traduce el error de Supabase; antes se comparaba con códigos de Firebase. */
function describeAuthError(err: unknown): string {
  const { code, status, message } = err as { code?: string; status?: number; message?: string };

  if (code === 'invalid_credentials' || status === 400) {
    return 'Email o contraseña incorrectos';
  }
  if (code === 'email_not_confirmed') {
    return 'Debes confirmar tu email antes de entrar';
  }
  if (code === 'over_request_rate_limit' || status === 429) {
    return 'Demasiados intentos. Espera unos minutos';
  }
  if (message?.includes('Failed to fetch') || message?.includes('NetworkError')) {
    return 'No se pudo contactar al servidor de autenticación. Revisa la configuración de Supabase';
  }
  return message ?? 'Error al iniciar sesión. Intenta de nuevo';
}

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isSupabaseConfigured) {
      setError('Supabase no está configurado o la clave publishable es inválida. Actualiza .env y reconstruye la imagen.');
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/admin', { replace: true });
    } catch (err: unknown) {
      setError(describeAuthError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Panel de Admin</h1>
          <p className="text-white/60 mt-2">Inicia sesión para gestionar conversaciones</p>
        </div>

        <div className="bg-brand-gray border border-white/10 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isSupabaseConfigured && (
              <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-amber-300 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  Supabase no está configurado o la clave es inválida: define <code>VITE_SUPABASE_URL</code> y{' '}
                  <code>VITE_SUPABASE_PUBLISHABLE_KEY</code> en el archivo <code>.env</code> y
                  reconstruye la imagen. Ninguna credencial funcionará hasta entonces.
                </span>
              </div>
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <div>
              <label className="block text-white/80 text-sm mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@quantiumcrew.com"
                  required
                  className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-12 py-3 text-white placeholder-white/30 focus:outline-none focus:border-brand-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !isSupabaseConfigured}
              className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-brand-primary/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Ingresando...
                </div>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
