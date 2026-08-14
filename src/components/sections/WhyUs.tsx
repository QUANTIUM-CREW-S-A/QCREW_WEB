import { ShieldCheck, Code, Globe, Cpu, Server, Wrench, Headphones, Zap, ArrowUpRight } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent, useState } from "react";

// Tarjeta con efecto spotlight que sigue el mouse
function SpotlightCard({ 
  children, 
  className = "",
  spotlightColor = "rgba(0, 212, 255, 0.15)"
}: { 
  children: React.ReactNode; 
  className?: string;
  spotlightColor?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className={`group relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </motion.div>
  );
}

// Tarjeta con efecto de brillo en los bordes
function GlowCard({ 
  children, 
  className = "",
  glowColor = "#00D4FF"
}: { 
  children: React.ReactNode; 
  className?: string;
  glowColor?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-[1px] rounded-3xl opacity-0 blur-sm transition-opacity duration-500"
        style={{ 
          background: `linear-gradient(135deg, ${glowColor}40, transparent, ${glowColor}20)`,
          opacity: isHovered ? 0.5 : 0 
        }}
      />
      <div className="relative h-full rounded-3xl bg-rack-paper border border-rack-rule group-hover:border-rack-rule transition-colors duration-300">
        {children}
      </div>
    </motion.div>
  );
}

export function WhyUs() {
  return (
    <SectionWrapper id="why-us" className="bg-rack-paper relative overflow-hidden py-24 border-t border-rack-rule">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-rack-brand text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Zap className="w-4 h-4" />
            Tu Ventaja Competitiva
          </motion.span>
          
          <h2 className="text-3xl md:text-5xl font-display font-bold text-rack-ink mb-6">
            Por qué elegir{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
              Quantium Crew
            </span>
          </h2>
          <p className="text-rack-graph text-lg">
            Somos el puente entre el mundo físico y digital. Una sola empresa para resolver todas tus necesidades tecnológicas, desde el cableado hasta la nube.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(180px,auto)]">
          
          {/* Card 1: Main Value Prop (Large) - Integralidad */}
          <SpotlightCard 
            className="md:col-span-2 lg:col-span-2 lg:row-span-2"
            spotlightColor="rgba(0, 212, 255, 0.2)"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="h-full bg-gradient-to-br from-brand-primary/20 via-brand-dark to-brand-dark border border-rack-rule rounded-3xl p-8 flex flex-col justify-between group overflow-hidden relative"
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Floating particles effect */}
              <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-brand-primary/30 rounded-full"
                    style={{
                      top: `${20 + i * 30}%`,
                      right: `${10 + i * 20}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <motion.div 
                  className="w-14 h-14 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-brand-primary/20"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Globe className="w-7 h-7 text-rack-ink" />
                </motion.div>
                <h3 className="text-3xl font-bold text-rack-ink mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-primary transition-all duration-300">
                  Ecosistema Tecnológico Total
                </h3>
                <p className="text-rack-ink/70 text-lg leading-relaxed">
                  No necesitas 5 proveedores diferentes. Integramos desarrollo de software, infraestructura física, servidores y soporte técnico en una solución coherente.
                </p>
              </div>

              <div className="relative z-10 mt-8 flex flex-wrap gap-2">
                {[
                  { icon: Code, label: "Software" },
                  { icon: Server, label: "Infraestructura" },
                  { icon: Wrench, label: "Instalación" },
                  { icon: Headphones, label: "Soporte" },
                ].map((item, i) => (
                  <motion.span 
                    key={i}
                    className="px-3 py-1.5 bg-rack-sheet border border-rack-rule rounded-full text-xs text-rack-ink/60 flex items-center gap-1.5 hover:bg-rack-sheet hover:border-brand-primary/30 hover:text-rack-ink transition-all duration-300 cursor-default"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <item.icon className="w-3 h-3" /> {item.label}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </SpotlightCard>

          {/* Card 2: Support Speed (Small) */}
          <GlowCard glowColor="#8B5CF6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="h-full p-6 flex flex-col justify-center items-center text-center group"
            >
              <motion.div 
                className="w-14 h-14 bg-gradient-to-br from-brand-secondary/20 to-brand-secondary/5 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-brand-secondary/10"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Headphones className="w-7 h-7 text-brand-secondary" />
              </motion.div>
              <motion.h3 
                className="text-5xl font-bold text-rack-ink mb-1"
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                &lt;15m
              </motion.h3>
              <p className="text-rack-graph text-sm">Respuesta Soporte</p>
              
              {/* Animated line */}
              <motion.div 
                className="mt-4 h-1 bg-gradient-to-r from-brand-secondary to-transparent rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "60%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </motion.div>
          </GlowCard>

          {/* Card 3: Quality/Uptime (Small) */}
          <GlowCard glowColor="#22C55E">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="h-full p-6 flex flex-col justify-center items-center text-center group"
            >
              <motion.div 
                className="w-14 h-14 bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-green-500/10"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ShieldCheck className="w-7 h-7 text-green-500" />
              </motion.div>
              <motion.h3 
                className="text-5xl font-bold text-rack-ink mb-1"
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                100%
              </motion.h3>
              <p className="text-rack-graph text-sm">Garantía de Calidad</p>
              
              {/* Animated line */}
              <motion.div 
                className="mt-4 h-1 bg-gradient-to-r from-green-500 to-transparent rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "60%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </motion.div>
          </GlowCard>

          {/* Card 4: Physical Infrastructure (Medium) */}
          <SpotlightCard 
            className="md:col-span-1 lg:col-span-2"
            spotlightColor="rgba(139, 92, 246, 0.15)"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="h-full min-h-[180px] bg-white/[0.03] border border-rack-rule rounded-3xl p-6 relative overflow-hidden group flex flex-col"
            >
              {/* Grid pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
              
              {/* Animated corner accent */}
              <motion.div 
                className="absolute -top-10 -right-10 w-32 h-32 bg-brand-primary/10 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="relative z-10 flex flex-col h-full">
                <motion.h3 
                  className="text-xl font-bold text-rack-ink mb-2 flex items-center gap-2"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Wrench className="w-5 h-5 text-rack-brand" />
                  Expertos en Campo
                  <ArrowUpRight className="w-4 h-4 text-rack-brand opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.h3>
                <p className="text-rack-graph text-sm mb-4">No solo vivimos en la nube. Instalamos y certificamos tu infraestructura física.</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {['Cableado Estructurado', 'CCTV', 'Data Centers', 'Control de Acceso', 'Fibra Óptica', 'Redes WiFi'].map((tech, i) => (
                    <motion.span 
                      key={i} 
                      className="px-3 py-1.5 bg-black/40 border border-rack-rule rounded-lg text-xs font-mono text-rack-brand/80 hover:text-rack-brand hover:border-brand-primary/30 hover:bg-black/60 transition-all cursor-default"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </SpotlightCard>

          {/* Card 5: Hardware + Software (Medium) */}
          <SpotlightCard 
            className="md:col-span-1 lg:col-span-2"
            spotlightColor="rgba(139, 92, 246, 0.2)"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="h-full min-h-[180px] bg-gradient-to-tr from-brand-secondary/20 via-brand-dark to-brand-dark border border-rack-rule rounded-3xl p-6 relative overflow-hidden group flex flex-col"
            >
              {/* Animated orb */}
              <motion.div 
                className="absolute -bottom-20 -right-20 w-60 h-60 bg-brand-secondary/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  x: [0, -20, 0],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="inline-block"
                  >
                    <Cpu className="w-10 h-10 text-rack-ink mb-4" />
                  </motion.div>
                </div>
                <h3 className="text-xl font-bold text-rack-ink mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-secondary transition-all duration-300">
                  Hardware + Software
                </h3>
                <p className="text-rack-ink/70 text-sm leading-relaxed mb-4">
                  Optimizamos tus servidores y redes para que tu software vuele. La sinergia perfecta entre ambos mundos.
                </p>
                
                {/* Connection lines visualization - pushed to bottom */}
                <div className="mt-auto flex items-center gap-2">
                  <motion.div 
                    className="h-1 bg-brand-secondary rounded-full"
                    animate={{ width: [8, 32, 8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-xs text-brand-secondary/60">Sinergia perfecta</span>
                </div>
              </div>
            </motion.div>
          </SpotlightCard>

        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-rack-graph text-sm mb-4">
            ¿Listo para transformar tu infraestructura tecnológica?
          </p>
          <motion.a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full text-rack-ink font-medium hover:shadow-lg hover:shadow-brand-primary/25 transition-all duration-300 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Agenda una consulta gratuita
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
