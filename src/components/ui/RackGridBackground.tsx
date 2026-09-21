import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "../../lib/utils";

/**
 * Papel milimetrado de fondo, con un parallax casi imperceptible al hacer
 * scroll — la reticula se mueve mas lento que el contenido, como si la hoja
 * de plano estuviera un poco mas atras. Reemplaza al `<div className="rack-grid
 * absolute inset-0" />` estatico que se repetia en cada seccion.
 */
export function RackGridBackground({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-28, 28]);

  return (
    <div ref={ref} aria-hidden="true" className={cn("absolute inset-0 overflow-hidden", className)}>
      <motion.div className="rack-grid absolute -inset-y-[8%] inset-x-0" style={{ y }} />
    </div>
  );
}
