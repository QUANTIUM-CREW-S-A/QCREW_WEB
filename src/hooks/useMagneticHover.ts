import { useRef } from 'react';
import { useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

/**
 * El elemento sigue un poco al cursor apenas entra en su area, como si
 * tuviera iman. Da la sensacion de que reacciona antes de tocarlo, no solo
 * al hacer click justo encima.
 */
export function useMagneticHover(strength = 0.3) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, x: springX, y: springY, onMouseMove, onMouseLeave };
}
