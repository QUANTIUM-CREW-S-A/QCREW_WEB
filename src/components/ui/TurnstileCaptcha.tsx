import { Turnstile } from '@marsidev/react-turnstile';
import { useState } from 'react';
import { ShieldCheck, AlertCircle } from 'lucide-react';

interface TurnstileCaptchaProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  className?: string;
}

// Clave de sitio de Cloudflare Turnstile
// En producción, usa tu propia clave de https://dash.cloudflare.com/
const SITE_KEY = '0x4AAAAAAAQTptj2rnLUUTWF'; // Clave de prueba de Cloudflare (siempre pasa)

export function TurnstileCaptcha({ onVerify, onError, className = '' }: TurnstileCaptchaProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSuccess = (token: string) => {
    setStatus('success');
    onVerify(token);
  };

  const handleError = () => {
    setStatus('error');
    setErrorMessage('Error al verificar el CAPTCHA. Intenta de nuevo.');
    onError?.();
  };

  const handleExpire = () => {
    setStatus('idle');
    setErrorMessage('El CAPTCHA expiró. Por favor verifica de nuevo.');
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Status Indicator */}
      {status === 'success' && (
        <div className="flex items-center gap-2 text-green-400 text-sm">
          <ShieldCheck className="w-4 h-4" />
          <span>Verificación de seguridad completada</span>
        </div>
      )}
      
      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Turnstile Widget */}
      <div className="flex justify-center">
        <Turnstile
          siteKey={SITE_KEY}
          onSuccess={handleSuccess}
          onError={handleError}
          onExpire={handleExpire}
          options={{
            theme: 'dark',
            size: 'normal',
            language: 'es',
            appearance: 'always',
          }}
        />
      </div>

      <p className="text-center text-white/30 text-xs">
        Protegido por Cloudflare Turnstile
      </p>
    </div>
  );
}

// Hook para manejar la validación del CAPTCHA
// eslint-disable-next-line react-refresh/only-export-components -- el proyecto solo corre en Docker/build, sin `vite dev`, asi que Fast Refresh nunca aplica.
export function useCaptchaValidation() {
  const [captchaToken, setCaptchaToken] = useState<string>('');
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = (token: string) => {
    setCaptchaToken(token);
    setIsVerified(true);
  };

  const handleError = () => {
    setCaptchaToken('');
    setIsVerified(false);
  };

  const resetCaptcha = () => {
    setCaptchaToken('');
    setIsVerified(false);
  };

  return {
    captchaToken,
    isVerified,
    handleVerify,
    handleError,
    resetCaptcha,
  };
}
