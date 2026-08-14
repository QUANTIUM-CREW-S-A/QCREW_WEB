import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

/**
 * Elevacion de rack: la pieza de firma de la home.
 *
 * Los racks se miden en unidades (U) y las instalaciones se dibujan como
 * elevaciones. Aqui cada division de Quantium Crew ocupa una posicion en la
 * pila, de la nube al piso. La forma dice el argumento de venta: cubren el
 * stack entero, del cable al software.
 */

export interface RackUnit {
  /**
   * Posicion en la elevacion, de la nube al piso. Va en ingles a proposito:
   * los paneles y switches reales vienen serigrafiados en ingles en todos
   * los mercados, asi que traducirlo restaria autenticidad y crearia deuda
   * de traduccion en los cinco idiomas del sitio.
   */
  layer: 'Cloud' | 'Server' | 'Network' | 'Floor';
  name: string;
  summary: string;
  items: string[];
  href: string;
  /** LED de estado: verde = enlace, ambar = actividad */
  led: 'link' | 'act';
}

/** Orden y metadatos fijos de la pila. El texto lo inyecta i18n. */
export const rackLayers = [
  { id: 'dev', layer: 'Cloud', led: 'act' },
  { id: 'systems', layer: 'Server', led: 'act' },
  { id: 'support', layer: 'Network', led: 'link' },
  { id: 'install', layer: 'Floor', led: 'link' },
] as const;

export function RackElevation({
  units,
  className,
}: {
  units: RackUnit[];
  className?: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <div className={cn('relative', className)}>
      <ol>
        {units.map((unit, i) => {
          const isActive = active === i;

          return (
            <motion.li
              key={unit.name}
              initial={reduce ? false : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: reduce ? 0 : i * 0.08 }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="relative"
            >
              <Link
                to={unit.href}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className={cn(
                  'group grid grid-cols-1 items-start gap-x-6 gap-y-3 border-t border-rack-rule',
                  'py-7 transition-colors duration-300',
                  'md:grid-cols-[3rem_9rem_1fr_auto] md:gap-x-8',
                  isActive && 'border-rack-edge'
                )}
              >
                {/* Marca de unidad. Los racks se numeran desde abajo, asi que
                    la capa del piso es 1U y la nube es la mas alta. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'hidden font-mono text-xs tabular-nums transition-colors md:block',
                    isActive ? 'text-rack-link' : 'text-rack-graph/50'
                  )}
                >
                  {units.length - i}U
                </span>

                {/* Etiqueta de capa: serigrafia */}
                <div className="flex items-center gap-2.5">
                  {/* Sobre papel un glow no se lee, asi que el LED se dibuja
                      como un punto con halo solido, igual que en un plano. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'h-[7px] w-[7px] shrink-0 rounded-full ring-4 transition-colors duration-300',
                      unit.led === 'link'
                        ? 'bg-rack-link ring-rack-link/15'
                        : 'bg-rack-act ring-rack-act/15 animate-blink'
                    )}
                  />
                  <span className="rack-label">{unit.layer}</span>
                </div>

                {/* Nombre y resumen */}
                <div>
                  <h3
                    className={cn(
                      'rack-display text-2xl transition-colors sm:text-[28px]',
                      isActive ? 'text-rack-brand' : 'text-rack-ink'
                    )}
                  >
                    {unit.name}
                  </h3>
                  <p className="mt-1.5 max-w-md text-[15px] leading-relaxed text-rack-graph">
                    {unit.summary}
                  </p>

                  {/* Lista de puertos, como la serigrafia de un patch panel.
                      Sin separadores: al envolver dejaban una barra colgando
                      al inicio de la linea siguiente. El espaciado basta. */}
                  <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1.5">
                    {unit.items.map((item) => (
                      <li key={item} className="font-mono text-xs text-rack-graph/80">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Indicador de accion, alineado con el titulo y no al centro
                    del bloque, para que no quede flotando. */}
                <span
                  className={cn(
                    'font-mono text-xs transition-all duration-300 md:mt-1.5',
                    isActive
                      ? 'translate-x-1 text-rack-brand'
                      : 'text-rack-graph/70'
                  )}
                >
                  Ver &rarr;
                </span>
              </Link>
            </motion.li>
          );
        })}
      </ol>

      <div className="border-t border-rack-rule" />
    </div>
  );
}
