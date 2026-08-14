import { SectionWrapper } from "../ui/SectionWrapper";
import { useTranslation } from "react-i18next";

export function HowWeWork() {
  const { t } = useTranslation();

  const steps = [
    { number: "01", title: t("howWeWork.steps.analyze.title"), description: t("howWeWork.steps.analyze.description") },
    { number: "02", title: t("howWeWork.steps.design.title"), description: t("howWeWork.steps.design.description") },
    { number: "03", title: t("howWeWork.steps.build.title"), description: t("howWeWork.steps.build.description") },
    { number: "04", title: t("howWeWork.steps.optimize.title"), description: t("howWeWork.steps.optimize.description") },
    { number: "05", title: t("howWeWork.steps.support.title"), description: t("howWeWork.steps.support.description") }
  ];

  return (
    <SectionWrapper id="process">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-rack-ink mb-6">
          {t("howWeWork.title")}
        </h2>
        <p className="text-rack-graph text-lg">
          {t("howWeWork.subtitle")}
        </p>
      </div>

      <div className="relative">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-rack-sheet -translate-y-1/2 z-0"></div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-rack-paper md:bg-transparent p-6 md:p-0 rounded-xl border border-rack-rule md:border-none relative group">
              <div className="w-12 h-12 rounded-full bg-rack-sheet border border-brand-primary/20 text-rack-brand font-bold flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-primary group-hover:text-black transition-colors duration-300 relative z-10">
                {step.number}
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-rack-ink mb-2">{step.title}</h3>
                <p className="text-sm text-rack-graph">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}