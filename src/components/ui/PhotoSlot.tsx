import { cn } from "../../lib/utils";

/**
 * Espacio para foto real, dibujado como una marca de registro de plano
 * (crop marks + rotulo), no como un rectangulo gris roto.
 *
 * Hoy no tenemos fotografia propia, asi que esto deja el lugar reservado
 * con la proporcion y el marco correctos. El dia que haya una foto, pasa
 * `src` y el mismo componente la muestra — nada mas cambia.
 */
export function PhotoSlot({
  src,
  alt,
  refCode,
  caption,
  className,
}: {
  src?: string;
  alt?: string;
  refCode: string;
  caption: string;
  className?: string;
}) {
  if (src) {
    return (
      <figure className={cn("relative border border-rack-rule bg-rack-sheet", className)}>
        <img src={src} alt={alt ?? caption} className="h-full w-full object-cover" />
        <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-rack-rule bg-rack-sheet/90 px-3 py-2 backdrop-blur-sm">
          <span className="rack-label">{caption}</span>
          <span className="font-mono text-[10px] text-rack-graph/70">{refCode}</span>
        </figcaption>
      </figure>
    );
  }

  return (
    <div
      className={cn(
        "rack-grid relative flex flex-col items-center justify-center gap-3 border border-dashed border-rack-rule bg-rack-paper px-6 text-center",
        className
      )}
    >
      {/* Marcas de registro, como en una hoja de plano a la espera del recorte */}
      <span aria-hidden="true" className="absolute left-2 top-2 h-3 w-3 border-l border-t border-rack-edge" />
      <span aria-hidden="true" className="absolute right-2 top-2 h-3 w-3 border-r border-t border-rack-edge" />
      <span aria-hidden="true" className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-rack-edge" />
      <span aria-hidden="true" className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-rack-edge" />

      <svg
        viewBox="0 0 24 24"
        className="h-8 w-8 text-rack-graph/40"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      >
        <rect x="3" y="5.5" width="18" height="13" rx="0.5" />
        <circle cx="9" cy="11" r="2" />
        <path d="M3 16.5l4.5-4 3 2.5L15 10l6 6.5" />
      </svg>

      <p className="rack-label text-rack-graph/60">{caption}</p>
      <p className="font-mono text-[10px] text-rack-graph/40">{refCode}</p>
    </div>
  );
}
