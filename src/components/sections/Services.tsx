import { motion } from "framer-motion";
import { Code2, Server, Headphones, Wrench } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { Card } from "../ui/Card";
import { useTranslation } from "react-i18next";

export function Services() {
  const { t } = useTranslation();

  const services = [
    {
      title: t("services.dev.title"),
      icon: Code2,
      description: t("services.dev.description"),
      features: t("services.dev.features", { returnObjects: true }) as string[]
    },
    {
      title: t("services.systems.title"),
      icon: Server,
      description: t("services.systems.description"),
      features: t("services.systems.features", { returnObjects: true }) as string[]
    },
    {
      title: t("services.support.title"),
      icon: Headphones,
      description: t("services.support.description"),
      features: t("services.support.features", { returnObjects: true }) as string[]
    },
    {
      title: t("services.install.title"),
      icon: Wrench,
      description: t("services.install.description"),
      features: t("services.install.features", { returnObjects: true }) as string[]
    }
  ];

  return (
    <SectionWrapper id="services" className="relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px] pointer-events-none"></div>
      
      <div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
          {t("services.title_line1")} <span className="text-gradient">{t("services.title_line2")}</span>
        </h2>
        <p className="text-brand-muted text-lg">
          {t("services.subtitle")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 relative z-10">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="h-full flex flex-col hover:bg-white/5 hover:border-brand-primary/30 hover:shadow-[0_0_30px_rgba(0,212,255,0.1)] transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-brand-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-6 h-6 text-brand-primary" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-primary transition-colors">{service.title}</h3>
              <p className="text-brand-muted text-sm mb-6">{service.description}</p>
              
              <ul className="space-y-3 mt-auto">
                {service.features.map((feature, fIdx) => (
                  <li key={fIdx} className="text-sm text-brand-muted/80 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary mt-1.5 shrink-0 group-hover:bg-brand-primary transition-colors"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}