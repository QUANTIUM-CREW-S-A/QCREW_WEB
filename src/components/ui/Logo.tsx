import { useId } from "react";
import { cn } from "../../lib/utils";

type LogoProps = {
  className?: string;
};

/**
 * Marca QCREW: la "Q" de Quantium resuelta como nodo hexagonal con uplink.
 * Placa en tinta para que contraste contra el papel; los estados de hover
 * dependen de un `group` en el contenedor.
 */
export function Logo({ className }: LogoProps) {
  // useId devuelve ":r1:"; los dos puntos rompen la referencia url(#id) en SVG.
  const id = useId().replace(/:/g, "");
  const stroke = `${id}-stroke`;
  const plate = `${id}-plate`;

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn(
        "h-10 w-10 shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-0.5",
        className
      )}
    >
      <defs>
        <linearGradient id={stroke} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2FA8D8" />
          <stop offset="100%" stopColor="#1FC79A" />
        </linearGradient>
        <linearGradient id={plate} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1B3145" />
          <stop offset="100%" stopColor="#0B1621" />
        </linearGradient>
      </defs>

      {/* Placa */}
      <rect width="40" height="40" rx="11" fill={`url(#${plate})`} />
      <rect
        x="0.6"
        y="0.6"
        width="38.8"
        height="38.8"
        rx="10.4"
        stroke="#FFFFFF"
        strokeOpacity="0.12"
        strokeWidth="1.2"
      />

      {/* Anillo hexagonal: cuerpo de la Q */}
      <path
        d="M19.5 8.5 28.5 13.75V24.25L19.5 29.5 10.5 24.25V13.75Z"
        stroke={`url(#${stroke})`}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      {/* Uplink: cola de la Q saliendo del núcleo */}
      <path
        d="M22.6 22.1 31 30.5"
        stroke={`url(#${stroke})`}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* Núcleo */}
      <circle cx="19.5" cy="19" r="3.3" fill={`url(#${stroke})`} />

      {/* LED de enlace activo */}
      <circle cx="19.5" cy="8.5" r="4.4" fill="#22D39F" fillOpacity="0.22" />
      <circle
        cx="19.5"
        cy="8.5"
        r="2.2"
        fill="#22D39F"
        className="transition-[fill] duration-300 group-hover:fill-[#F0A431]"
      />
    </svg>
  );
}
