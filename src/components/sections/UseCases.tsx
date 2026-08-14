import { ArrowRight, LineChart } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { Card } from "../ui/Card";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export function UseCases() {
  const { t } = useTranslation();

  const cases = [
    {
      image: "https://images.unsplash.com/photo-1559136555-930d72f1d300?auto=format&fit=crop&q=80&w=800",
      title: t("useCases.cases.startup.title"),
      description: t("useCases.cases.startup.description"),
      result: t("useCases.cases.startup.result")
    },
    {
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
      title: t("useCases.cases.automation.title"),
      description: t("useCases.cases.automation.description"),
      result: t("useCases.cases.automation.result")
    },
    {
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
      title: t("useCases.cases.modernization.title"),
      description: t("useCases.cases.modernization.description"),
      result: t("useCases.cases.modernization.result")
    }
  ];

  return (
    <SectionWrapper id="use-cases" className="bg-rack-sheet">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-rack-ink mb-6">
          {t("useCases.title")}
        </h2>
        <p className="text-rack-graph text-lg">
          {t("useCases.subtitle")}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {cases.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
          >
            <Card className="group cursor-pointer overflow-hidden p-0 h-full flex flex-col border-0 bg-rack-paper ring-1 ring-white/10 hover:ring-brand-primary/50 transition-all duration-500">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent z-10"></div>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              <div className="p-8 flex flex-col flex-grow relative z-20 -mt-10">
                <h3 className="text-xl font-bold text-rack-ink mb-3 group-hover:text-rack-brand transition-colors">{item.title}</h3>
                <p className="text-rack-graph mb-6 leading-relaxed flex-grow text-sm">{item.description}</p>
                
                <div className="pt-6 border-t border-rack-rule">
                  <p className="text-sm font-bold text-rack-brand flex items-center gap-2 mb-4">
                    <LineChart className="w-4 h-4" />
                    {item.result}
                  </p>
                  
                  <div className="flex items-center text-sm font-medium text-rack-ink group-hover:translate-x-2 transition-transform duration-300">
                    {t("useCases.readCaseStudy")} <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}