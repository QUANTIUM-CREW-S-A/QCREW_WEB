import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowRight, Clock, Users, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";
import { SectionWrapper } from "../ui/SectionWrapper";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Contador regresivo para crear urgencia
function UrgencyCounter() {
  const [spots, setSpots] = useState(5);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSpots(prev => {
        if (prev > 2) return prev - 1;
        // Reset para demo (en producción sería real)
        return 5;
      });
    }, 30000); // Cada 30 segundos baja un cupo
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
      </span>
      <span className="text-red-400 text-sm font-medium">
        Solo <span className="text-white font-bold">{spots}</span> cupos disponibles esta semana
      </span>
    </motion.div>
  );
}

// Efecto de spotlight que sigue el mouse
function MouseSpotlight({ children }: { children: React.ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <div
      className="group relative"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 212, 255, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </div>
  );
}

export function CTA() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const benefits = [
    "Diagnóstico gratuito de infraestructura",
    "Propuesta en 48 horas",
    "Sin compromiso",
  ];

  return (
    <SectionWrapper className="py-24 md:py-32 relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-brand-dark" />
      
      {/* Animated gradient mesh */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/20 rounded-full blur-[100px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-secondary/20 rounded-full blur-[100px]"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4">
        <MouseSpotlight>
          <div className="relative bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-16 backdrop-blur-sm">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-brand-primary/30 rounded-tl-3xl" />
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-brand-secondary/30 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-brand-secondary/30 rounded-bl-3xl" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-brand-primary/30 rounded-br-3xl" />

            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                {/* Urgency badge */}
                <UrgencyCounter />

                {/* Title with animated gradient -->
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight">
                  Transforma tu{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-cyan-400 to-brand-secondary animate-gradient-x bg-[length:200%_auto]">
                    Infraestructura
                  </span>
                  <br />
                  <span className="text-3xl md:text-5xl lg:text-6xl text-white/80">
                    Empezá Hoy
                  </span>
                </h2>

                {/* Description */}
                <p className="text-lg md:text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed">
                  {t("cta.subtitle", "No dejes que la tecnología sea un obstáculo. Conviértela en tu ventaja competitiva con un equipo que entiende tu negocio.")}
                </p>

                {/* Benefits */}
                <motion.div 
                  className="flex flex-wrap justify-center gap-4 md:gap-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  {benefits.map((benefit, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2 text-white/60"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-brand-primary" />
                      <span className="text-sm">{benefit}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <Button
                    size="lg"
                    className="group bg-gradient-to-r from-brand-primary to-brand-secondary hover:opacity-90 border-none shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(139,92,246,0.5)] transition-all duration-300 px-10 py-7 text-lg"
                    onClick={() => navigate("/contact")}
                  >
                    {t("cta.button", "Agendar Consulta")}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <div className="flex items-center gap-2 text-brand-muted text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Respuesta en menos de 24h</span>
                  </div>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="pt-8 flex flex-wrap justify-center items-center gap-8 text-sm text-brand-muted"
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>150+ empresas confían en nosotros</span>
                  </div>
                  <div className="h-4 w-px bg-white/20 hidden sm:block" />
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                    <span className="ml-2">5.0 calificación promedio</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </MouseSpotlight>
      </div>
    </SectionWrapper>
  );
}
