import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Briefcase, Clock, Award } from 'lucide-react';

interface StatItemProps {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

function StatItem({ icon: Icon, value, suffix, label, delay }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className="relative group"
    >
      <div className="flex flex-col items-center text-center p-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 border border-brand-primary/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-8 h-8 text-brand-primary" />
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl md:text-5xl font-display font-bold text-white">
            {count}
          </span>
          <span className="text-2xl md:text-3xl font-display font-bold text-brand-secondary">
            {suffix}
          </span>
        </div>
        <p className="text-brand-muted mt-2 text-sm uppercase tracking-wider">{label}</p>
      </div>
    </motion.div>
  );
}

export function Stats() {
  const stats = [
    { icon: Users, value: 150, suffix: '+', label: 'Clientes Satisfechos' },
    { icon: Briefcase, value: 300, suffix: '+', label: 'Proyectos Completados' },
    { icon: Clock, value: 8, suffix: '', label: 'Años de Experiencia' },
    { icon: Award, value: 99, suffix: '%', label: 'Satisfacción Cliente' },
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-brand-dark">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.1)_0%,_transparent_70%)]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-sm font-medium mb-4">
            Resultados que Hablan
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
            Nuestro Impacto en <span className="text-brand-primary">Números</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              {...stat}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
