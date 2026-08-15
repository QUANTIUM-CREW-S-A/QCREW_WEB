/**
 * Glifos de division, en el mismo lenguaje de linea que StackDrawing y
 * RackElevation: trazo unico, sin relleno, como si vinieran del mismo
 * plotter. Cada uno es el objeto real de la division, no un icono generico
 * de stock (nube, engranaje, etc).
 */

const paths = {
  // Cloud/Dev: nube con una traza de circuito adentro — software que vive
  // arriba de la pila.
  dev: (
    <>
      <path d="M8 21a5 5 0 0 1-.6-9.97A6 6 0 0 1 19 9.5a4.5 4.5 0 0 1-.7 11.5H8Z" />
      <path d="M11 15h2.2l1-2.4 1.4 4.8 1-2.4H18" />
    </>
  ),
  // Server/Systems: dos unidades de rack en miniatura, con su fila de
  // puertos — el mismo vocabulario que StackDrawing a otra escala.
  systems: (
    <>
      <rect x="6" y="8" width="20" height="7" />
      <rect x="6" y="18" width="20" height="7" />
      <circle cx="9.5" cy="11.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="21.5" r="0.9" fill="currentColor" stroke="none" />
      <path d="M14 11.5h9M14 21.5h9" />
    </>
  ),
  // Network/Support: señal de enlace — arcos concentricos desde un punto,
  // igual que el LED de "link" del resto del sistema.
  support: (
    <>
      <circle cx="16" cy="21" r="1.3" fill="currentColor" stroke="none" />
      <path d="M11.5 16.5a6.4 6.4 0 0 1 9 0" />
      <path d="M8.3 13.3a10.8 10.8 0 0 1 15.4 0" />
    </>
  ),
  // Floor/Install: conector RJ45, el objeto fisico con el que arranca
  // cualquier instalacion.
  install: (
    <>
      <path d="M11 9v5h10V9" />
      <path d="M9.5 14h13v6a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 9.5 20v-6Z" />
      <path d="M13.5 9V6.5M16 9V6.5M18.5 9V6.5" />
    </>
  ),
} as const;

export function DivisionIcon({
  id,
  className,
}: {
  id: keyof typeof paths;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
    >
      {paths[id]}
    </svg>
  );
}
