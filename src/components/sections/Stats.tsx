import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { RackGridBackground } from '../ui/RackGridBackground';

/**
 * Placa de caracteristicas.
 *
 * Los equipos de red llevan remachada una chapa con sus especificaciones.
 * Presentar las cifras asi les da un marco y un orden, en lugar de cuatro
 * numeros flotando cada uno con su icono.
 */

interface Spec {
  value: number;
  suffix: string;
  label: string;
  unit: string;
}

const specs: Spec[] = [
  { value: 150, suffix: '+', label: 'Clientes', unit: 'empresas' },
  { value: 300, suffix: '+', label: 'Proyectos', unit: 'entregados' },
  { value: 8, suffix: '', label: 'Trayectoria', unit: 'años' },
  { value: 99, suffix: '%', label: 'Satisfacción', unit: 'promedio' },
];

function SpecCell({ spec, index }: { spec: Spec; index: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const reduce = useReducedMotion();

  useEffect(() => {
    // Quien pide menos movimiento ve la cifra final directamente
    if (reduce) {
      setCount(spec.value);
      return;
    }
    if (!isInView) return;

    const steps = 45;
    const increment = spec.value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= spec.value) {
        setCount(spec.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 1400 / steps);

    return () => clearInterval(timer);
  }, [isInView, spec.value, reduce]);

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={cn(
        'border-rack-rule px-6 py-7 sm:px-8',
        // Hairlines internos, como las divisiones grabadas en la chapa.
        // En movil son 2 columnas; desde sm, 4 en una sola fila.
        index % 2 === 1 && 'border-l',
        index >= 2 && 'border-t',
        'sm:border-t-0',
        index > 0 && 'sm:border-l'
      )}
    >
      <div className="flex items-baseline gap-0.5">
        <span className="rack-display text-4xl tabular-nums text-rack-ink sm:text-5xl">
          {count}
        </span>
        <span className="rack-display text-2xl text-rack-brand sm:text-3xl">
          {spec.suffix}
        </span>
      </div>
      <p className="mt-3 font-sans text-sm font-medium text-rack-ink">{spec.label}</p>
      <p className="rack-label mt-0.5">{spec.unit}</p>
    </motion.div>
  );
}

export function Stats() {
  return (
    <section className="relative overflow-hidden border-t border-rack-rule bg-rack-paper py-20 md:py-24">
      <RackGridBackground />

      <div className="container relative z-10 mx-auto px-4">
        <div className="rack-panel relative">
          {/* Marcas de registro, como en una hoja de plano */}
          <span aria-hidden="true" className="absolute -left-px -top-px h-3 w-3 border-l border-t border-rack-edge" />
          <span aria-hidden="true" className="absolute -right-px -top-px h-3 w-3 border-r border-t border-rack-edge" />
          <span aria-hidden="true" className="absolute -bottom-px -left-px h-3 w-3 border-b border-l border-rack-edge" />
          <span aria-hidden="true" className="absolute -bottom-px -right-px h-3 w-3 border-b border-r border-rack-edge" />

          {/* Cabecera de la placa: como el troquelado de una chapa real */}
          <div className="flex items-center justify-between border-b border-rack-rule px-6 py-3.5 sm:px-8">
            <p className="rack-label">Placa de características</p>
            <p className="rack-label hidden sm:block">QCREW &middot; PA</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4">
            {specs.map((spec, i) => (
              <SpecCell key={spec.label} spec={spec} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
