import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { Card } from "../ui/Card";
import { useTranslation } from "react-i18next";

export function Problem() {
  const { t } = useTranslation();

  const problems = [
    t("problem.list.fragmented"),
    t("problem.list.reactive"),
    t("problem.list.infrastructure"),
    t("problem.list.security")
  ];

  const solutions = [
    t("problem.card.items.unified"),
    t("problem.card.items.proactive"),
    t("problem.card.items.scalable"),
    t("problem.card.items.security")
  ];

  return (
    <SectionWrapper className="bg-brand-dark relative overflow-hidden py-24">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-primary/20 via-transparent to-transparent opacity-40" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Del Caos Tecnológico al <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Control Total</span>
          </h2>
          <p className="text-brand-muted text-lg">
            Muchas empresas luchan con infraestructuras obsoletas y procesos desconectados. Nosotros transformamos esa fricción en tu ventaja competitiva.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-stretch relative">
          {/* Connector Arrow for Desktop */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-brand-dark border border-white/10 rounded-full p-2 text-white/50 shadow-xl">
            <ArrowRight className="w-6 h-6" />
          </div>

          {/* Problem Side (Pain) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <Card className="h-full bg-red-950/5 border-red-500/10 hover:border-red-500/20 transition-all p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <AlertTriangle className="w-24 h-24 text-red-500" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-500 text-sm">1</span>
                La Realidad Actual
              </h3>
              <p className="text-red-200/60 mb-8 text-sm">Frustraciones comunes que frenan tu crecimiento</p>

              <div className="space-y-6">
                {problems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="mt-1 min-w-[20px]">
                      <AlertTriangle className="w-5 h-5 text-red-500/60" />
                    </div>
                    <p className="text-brand-muted group-hover:text-red-100/80 transition-colors">{item}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Solution Side (Gain) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <Card className="h-full bg-brand-primary/5 border-brand-primary/20 hover:border-brand-primary/40 transition-all p-8 relative overflow-hidden group shadow-[0_0_50px_rgba(0,212,255,0.05)]">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20 text-brand-primary text-sm">2</span>
                  La Experiencia Quantium
                </h3>
                <p className="text-brand-primary/60 mb-8 text-sm">Soluciones diseñadas para escalar sin límites</p>

                <div className="space-y-6">
                  {solutions.map((item, idx) => (
                    <motion.div 
                      key={idx}
                      className="flex gap-4 items-start"
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                    >
                      <div className="mt-1 min-w-[20px]">
                        <CheckCircle2 className="w-5 h-5 text-brand-primary drop-shadow-[0_0_8px_rgba(0,212,255,0.5)]" />
                      </div>
                      <p className="text-white group-hover:text-white transition-colors font-medium">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
