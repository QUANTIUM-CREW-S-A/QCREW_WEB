import { motion } from 'framer-motion';
import { MessageSquare, Lightbulb, Code, Rocket, ShieldCheck, Headphones, CheckCircle2 } from 'lucide-react';
import { SectionWrapper } from '../ui/SectionWrapper';
import { useState } from 'react';

const steps = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'Descubrimiento',
    subtitle: 'Entendemos tu negocio',
    description: 'Nos reunimos contigo para entender a fondo tus necesidades, objetivos y desafíos. Realizamos una auditoría técnica completa de tu infraestructura actual.',
    deliverables: ['Diagnóstico técnico', 'Mapa de necesidades', 'Identificación de riesgos'],
    duration: '1-2 semanas',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Lightbulb,
    number: '02',
    title: 'Estrategia',
    subtitle: 'Diseñamos la solución',
    description: 'Creamos un plan técnico detallado con arquitectura, tecnologías y cronograma. Presentamos opciones claras con costos transparentes para tu aprobación.',
    deliverables: ['Propuesta técnica', 'Cronograma detallado', 'Presupuesto transparente'],
    duration: '1 semana',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: Code,
    number: '03',
    title: 'Implementación',
    subtitle: 'Construimos con calidad',
    description: 'Ejecutamos el proyecto con metodología ágil, entregas iterativas y comunicación constante. Cada sprint incluye revisión y aprobación del cliente.',
    deliverables: ['Sprints semanales', 'Demos del progreso', 'Documentación técnica'],
    duration: '4-12 semanas',
    color: 'from-brand-primary to-cyan-400',
  },
  {
    icon: ShieldCheck,
    number: '04',
    title: 'Testing & QA',
    subtitle: 'Garantizamos calidad',
    description: 'Pruebas exhaustivas de rendimiento, seguridad y usabilidad. Nada sale a producción sin pasar nuestros estándares de calidad.',
    deliverables: ['Pruebas automatizadas', 'Auditoría de seguridad', 'Test de rendimiento'],
    duration: '1-2 semanas',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Rocket,
    number: '05',
    title: 'Lanzamiento',
    subtitle: 'Desplegamos sin riesgos',
    description: 'Despliegue coordinado con mínimo impacto operativo. Migración de datos, configuración de ambientes y validación en producción.',
    deliverables: ['Despliegue controlado', 'Migración de datos', 'Capacitación del equipo'],
    duration: '1 semana',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Headphones,
    number: '06',
    title: 'Soporte Continuo',
    subtitle: 'Te acompañamos siempre',
    description: 'No te dejamos solo después del lanzamiento. Monitoreo proactivo, mantenimiento preventivo y soporte técnico dedicado 24/7.',
    deliverables: ['Monitoreo 24/7', 'Actualizaciones periódicas', 'Soporte prioritario'],
    duration: 'Permanente',
    color: 'from-brand-secondary to-pink-500',
  },
];

export function Process() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <SectionWrapper className="py-20 md:py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_50%,transparent_100%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(circle,rgba(139,92,246,0.05)_0%,transparent_60%)] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-secondary/10 border border-brand-secondary/30 text-brand-secondary text-sm font-medium mb-4">
            Metodología
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-rack-ink mb-4">
            Cómo{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
              Trabajamos
            </span>
          </h2>
          <p className="text-rack-graph max-w-2xl mx-auto text-lg">
            Un proceso de 6 fases diseñado para garantizar resultados excepcionales, comunicación transparente y cero sorpresas
          </p>
        </motion.div>

        {/* Desktop: Interactive timeline */}
        <div className="hidden lg:block">
          {/* Step selector - horizontal */}
          <div className="relative mb-12">
            {/* Progress bar background */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/[0.06]" />
            {/* Progress bar active */}
            <motion.div
              className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary"
              initial={false}
              animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />

            <div className="relative flex justify-between">
              {steps.map((step, index) => (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(index)}
                  className="flex flex-col items-center group"
                >
                  {/* Circle */}
                  <motion.div
                    animate={{
                      scale: activeStep === index ? 1.15 : 1,
                      borderColor: index <= activeStep ? 'rgba(0,212,255,0.6)' : 'rgba(255,255,255,0.1)',
                    }}
                    transition={{ duration: 0.3 }}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mb-3 transition-colors duration-300 ${
                      index <= activeStep
                        ? 'bg-gradient-to-br from-brand-primary to-brand-secondary text-rack-ink shadow-[0_0_20px_rgba(0,212,255,0.3)]'
                        : 'bg-rack-paper text-rack-ink/30'
                    }`}
                  >
                    {index < activeStep ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-bold">{step.number}</span>
                    )}
                  </motion.div>
                  {/* Label */}
                  <span
                    className={`text-xs font-medium transition-colors duration-300 ${
                      activeStep === index ? 'text-rack-brand' : 'text-rack-ink/30 group-hover:text-rack-ink/50'
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Active step detail */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-12 gap-8"
          >
            {/* Left: Info */}
            <div className="col-span-7">
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${steps[activeStep].color} flex items-center justify-center shadow-lg`}>
                    {(() => {
                      const Icon = steps[activeStep].icon;
                      return <Icon className="w-7 h-7 text-rack-ink" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-rack-ink">{steps[activeStep].title}</h3>
                    <p className="text-rack-ink/40 text-sm">{steps[activeStep].subtitle}</p>
                  </div>
                </div>

                <p className="text-rack-ink/60 leading-relaxed text-base mb-8">
                  {steps[activeStep].description}
                </p>

                <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] rounded-xl border border-white/[0.06] inline-flex">
                  <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                  <span className="text-rack-ink/40 text-sm">Duración estimada:</span>
                  <span className="text-rack-brand text-sm font-medium">{steps[activeStep].duration}</span>
                </div>
              </div>
            </div>

            {/* Right: Deliverables */}
            <div className="col-span-5">
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 h-full">
                <h4 className="text-rack-ink font-semibold mb-6 text-sm uppercase tracking-wider">
                  Entregables de esta fase
                </h4>
                <div className="space-y-4">
                  {steps[activeStep].deliverables.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 group"
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${steps[activeStep].color} flex items-center justify-center flex-shrink-0 opacity-80`}>
                        <CheckCircle2 className="w-4 h-4 text-rack-ink" />
                      </div>
                      <span className="text-rack-ink/70 text-sm group-hover:text-rack-ink transition-colors">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex gap-3 mt-8 pt-6 border-t border-white/[0.06]">
                  <button
                    onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                    disabled={activeStep === 0}
                    className="flex-1 px-4 py-2.5 bg-white/[0.04] border border-white/[0.06] rounded-xl text-rack-ink/40 text-sm hover:bg-white/[0.08] hover:text-rack-ink/60 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                    disabled={activeStep === steps.length - 1}
                    className="flex-1 px-4 py-2.5 bg-brand-primary/15 border border-brand-primary/20 rounded-xl text-rack-brand text-sm hover:bg-brand-primary/25 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile: Card stack */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative"
            >
              {/* Vertical connector */}
              {index < steps.length - 1 && (
                <div className="absolute top-full left-7 w-0.5 h-6 bg-gradient-to-b from-white/10 to-transparent" />
              )}

              <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] transition-colors">
                <div className="flex items-start gap-4">
                  {/* Step icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <step.icon className="w-7 h-7 text-rack-ink" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-rack-ink/20 text-xs font-mono">{step.number}</span>
                      <h3 className="text-lg font-bold text-rack-ink">{step.title}</h3>
                    </div>
                    <p className="text-rack-ink/40 text-xs mb-3">{step.subtitle}</p>
                    <p className="text-rack-ink/50 text-sm leading-relaxed mb-4">{step.description}</p>

                    {/* Deliverables */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {step.deliverables.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/[0.04] border border-white/[0.06] rounded-lg text-rack-ink/50 text-xs"
                        >
                          <CheckCircle2 className="w-3 h-3 text-rack-brand" />
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-1.5 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                      <span className="text-rack-ink/30">Duración:</span>
                      <span className="text-rack-brand font-medium">{step.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
