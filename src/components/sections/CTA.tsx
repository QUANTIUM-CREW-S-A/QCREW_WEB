import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { SectionWrapper } from "../ui/SectionWrapper";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function CTA() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <SectionWrapper className="py-20">
      <div className="relative rounded-3xl overflow-hidden bg-brand-gray border border-white/10 p-12 md:p-24 text-center">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/20 rounded-full blur-[80px] -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-secondary/20 rounded-full blur-[80px] translate-y-1/2"></div>
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white">
            {t("cta.title_line1")} <br />
            <span className="text-gradient">{t("cta.title_line2")}</span>
          </h2>
          <p className="text-xl text-brand-muted leading-relaxed">
            {t("cta.subtitle")}
          </p>
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="h-16 px-10 text-lg group"
              onClick={() => navigate("/contact")}
            >
              {t("cta.button")}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}