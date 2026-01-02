import { Rocket, Zap, Scaling, Users } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { useTranslation } from "react-i18next";

export function WhyUs() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Rocket,
      title: t("whyUs.cards.startup.title"),
      description: t("whyUs.cards.startup.description")
    },
    {
      icon: Zap,
      title: t("whyUs.cards.execution.title"),
      description: t("whyUs.cards.execution.description")
    },
    {
      icon: Scaling,
      title: t("whyUs.cards.scalable.title"),
      description: t("whyUs.cards.scalable.description")
    },
    {
      icon: Users,
      title: t("whyUs.cards.crew.title"),
      description: t("whyUs.cards.crew.description")
    }
  ];

  return (
    <SectionWrapper id="why-us" className="bg-brand-gray/30">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-brand-dark border border-white/5 p-6 rounded-xl hover:border-brand-primary/20 transition-colors">
                <feature.icon className="w-8 h-8 text-brand-secondary mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-brand-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="order-1 md:order-2 space-y-6">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
            {t("whyUs.title_line1")} <br />
            <span className="text-gradient">{t("whyUs.title_line2")}</span>
          </h2>
          <p className="text-brand-muted text-lg leading-relaxed">
            {t("whyUs.description1")}
          </p>
          <p className="text-brand-muted text-lg leading-relaxed">
            {t("whyUs.description2")}
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}