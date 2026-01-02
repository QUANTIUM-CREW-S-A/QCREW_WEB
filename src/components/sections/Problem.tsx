import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
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
    <SectionWrapper className="bg-brand-gray/50 relative overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000" 
          alt="Technology Background" 
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-brand-dark/80 mix-blend-multiply"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
            {t("problem.title")}
          </h2>
          <p className="text-brand-muted text-lg leading-relaxed">
            {t("problem.description1")}
          </p>
          <p className="text-brand-muted text-lg leading-relaxed">
            {t("problem.description2")}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {problems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-brand-muted/80">
                <AlertTriangle className="w-5 h-5 text-red-500/80" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-brand-primary/20 blur-3xl rounded-full opacity-20 animate-pulse"></div>
          <Card className="relative z-10 border-brand-primary/20 bg-brand-dark/80 backdrop-blur-md shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-6">
                <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{t("problem.card.title")}</h3>
                  <p className="text-brand-muted text-sm">{t("problem.card.subtitle")}</p>
                </div>
              </div>
              
              <ul className="space-y-4">
                {solutions.map((item, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 text-brand-text"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_10px_rgba(0,212,255,0.5)]"></div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </SectionWrapper>
  );
}