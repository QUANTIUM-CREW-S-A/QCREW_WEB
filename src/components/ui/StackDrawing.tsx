import { motion, useReducedMotion } from 'framer-motion';

/**
 * Plano de elevacion que se dibuja solo.
 *
 * Sustituye a la escena 3D de esferas flotantes: aquella no decia nada del
 * oficio y podia estar en la web de cualquier sector. Esto es el entregable
 * real de Quantium Crew — el dibujo de la instalacion, del piso a la nube —
 * trazandose como lo haria un plotter. Va en SVG, asi que no arrastra three,
 * fiber ni drei.
 */

/** Capas de la instalacion, de arriba (nube) abajo (piso). */
const layers = [
  { y: 34, label: 'CLOUD', detail: 'Apps · APIs' },
  { y: 96, label: 'SERVER', detail: 'Virtualización' },
  { y: 158, label: 'NETWORK', detail: 'Switching · WiFi' },
  { y: 220, label: 'FLOOR', detail: 'Cableado · Fibra' },
];

export function StackDrawing({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  // El trazo se dibuja en orden: primero el bastidor, luego cada equipo.
  // Despues de trazarse, el plotter lo sostiene un rato y lo vuelve a
  // recorrer — sin esto, la pieza de firma de la home se queda quieta como
  // una foto en cuanto termina la entrada.
  const draw = (delay: number) =>
    reduce
      ? { pathLength: 1, opacity: 1 }
      : {
          pathLength: [0, 1],
          opacity: [0, 1],
          transition: {
            duration: 1.1,
            delay,
            ease: 'easeInOut' as const,
            repeat: Infinity,
            repeatType: 'reverse' as const,
            repeatDelay: 7,
          },
        };

  const fade = (delay: number) =>
    reduce
      ? { opacity: 1 }
      : {
          opacity: [0, 1],
          transition: {
            duration: 0.5,
            delay,
            repeat: Infinity,
            repeatType: 'reverse' as const,
            repeatDelay: 7.6,
          },
        };

  return (
    <svg
      viewBox="0 0 340 300"
      className={className}
      role="img"
      aria-label="Plano de elevación: la instalación completa, del cableado del piso hasta la nube"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      >
        {/* Rieles del bastidor */}
        <motion.path
          d="M60 20 V 282"
          animate={draw(0.1)}
          initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
        />
        <motion.path
          d="M300 20 V 282"
          animate={draw(0.1)}
          initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
        />

        {layers.map((layer, i) => (
          <g key={layer.label}>
            {/* Equipo montado: un rectangulo por unidad */}
            <motion.rect
              x="60"
              y={layer.y}
              width="240"
              height="44"
              animate={draw(0.45 + i * 0.22)}
              initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
            />

            {/* Puertos: la fila de conectores del panel frontal */}
            {Array.from({ length: 8 }).map((_, p) => (
              <motion.rect
                key={p}
                x={78 + p * 15}
                y={layer.y + 28}
                width="9"
                height="7"
                animate={fade(0.9 + i * 0.22 + p * 0.02)}
                initial={reduce ? undefined : { opacity: 0 }}
              />
            ))}

            {/* Tornillos de montaje */}
            <motion.circle
              cx="53"
              cy={layer.y + 22}
              r="2.5"
              animate={fade(0.7 + i * 0.22)}
              initial={reduce ? undefined : { opacity: 0 }}
            />
            <motion.circle
              cx="307"
              cy={layer.y + 22}
              r="2.5"
              animate={fade(0.7 + i * 0.22)}
              initial={reduce ? undefined : { opacity: 0 }}
            />
          </g>
        ))}
      </g>

      {/* Etiquetas del plano */}
      {layers.map((layer, i) => (
        <motion.g
          key={`${layer.label}-txt`}
          animate={fade(1 + i * 0.22)}
          initial={reduce ? undefined : { opacity: 0 }}
        >
          <text
            x="70"
            y={layer.y + 20}
            className="fill-current font-mono text-[9px] uppercase tracking-[0.18em]"
          >
            {layer.label}
          </text>
          <text
            x="290"
            y={layer.y + 20}
            textAnchor="end"
            className="fill-current font-mono text-[8px] opacity-50"
          >
            {layer.detail}
          </text>
        </motion.g>
      ))}

      {/* Cota vertical: la altura total de la instalacion, 4U */}
      <motion.g
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        animate={fade(1.9)}
        initial={reduce ? undefined : { opacity: 0 }}
        className="opacity-45"
      >
        <path d="M24 34 V 264" />
        <path d="M19 34 H 29" />
        <path d="M19 264 H 29" />
      </motion.g>
      <motion.text
        x="14"
        y="155"
        textAnchor="middle"
        transform="rotate(-90 14 155)"
        className="fill-current font-mono text-[9px] tracking-[0.18em] opacity-60"
        animate={fade(2)}
        initial={reduce ? undefined : { opacity: 0 }}
      >
        4U
      </motion.text>
    </svg>
  );
}
