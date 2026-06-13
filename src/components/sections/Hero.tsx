import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Zap, Sparkles, Play, ShieldCheck, Rocket } from "lucide-react";
import { Button } from "../ui/Button";
import { SectionWrapper } from "../ui/SectionWrapper";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from "react";
import { TrustBar } from "../ui/TrustBar";

const Hero3D = lazy(() => import("../ui/Hero3D").then(m => ({ default: m.Hero3D })));

export function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    // Delay 3D scene load so it doesn't block initial paint
    const timer = setTimeout(() => setShow3D(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      <SectionWrapper className="pt-24 pb-12 md:pt-32 md:pb-20 flex-grow flex items-center relative overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)]" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/95 to-brand-dark/80 z-0" />

        {/* Static gradient orbs (no blur, no animation = no GPU cost) */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(0,212,255,0.12)_0%,transparent_70%)] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-[radial-gradient(circle,rgba(139,92,246,0.12)_0%,transparent_70%)] rounded-full pointer-events-none" />

        {show3D && (
          <div className="hidden md:block absolute inset-0 z-0 pointer-events-none">
            <Suspense fallback={null}>
              <Hero3D />
            </Suspense>
          </div>
        )}

        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

          {/* Left Column: Text Content */}
          <motion.div
            className="text-left space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge de Impacto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/30 font-medium text-xs md:text-sm text-brand-primary hover:bg-brand-primary/20 transition-colors cursor-default"
            >
              <Rocket className="w-4 h-4 animate-pulse" />
              <span>LLEVAMOS TU EMPRESA AL SIGUIENTE NIVEL</span>
            </motion.div>

            {/* Enhanced title with animated gradient */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t("hero.title_line1")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-cyan-400 to-brand-secondary animate-gradient-x bg-[length:200%_auto]">
                {t("hero.title_line2")}
              </span>
            </motion.h1>

            {/* Enhanced subtitle */}
            <motion.p
              className="text-lg md:text-xl text-brand-muted max-w-xl leading-relaxed border-l-2 border-brand-primary/30 pl-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {t("hero.subtitle")}
            </motion.p>

            {/* Enhanced CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button
                size="lg"
                className="group text-base px-8 py-6 w-full sm:w-auto bg-gradient-to-r from-brand-primary to-brand-secondary hover:opacity-90 shadow-[0_0_30px_rgba(139,92,246,0.4)] border-none transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => navigate("/contact")}
              >
                <Zap className="mr-2 w-5 h-5 fill-current" />
                {t("hero.cta_primary")}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="group text-base px-8 py-6 w-full sm:w-auto border-white/20 hover:bg-white/10 hover:border-brand-primary/50 transition-all duration-300"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="mr-2 w-5 h-5" />
                {t("hero.cta_secondary")}
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="pt-6 flex flex-wrap items-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-gray to-brand-dark border-2 border-brand-dark flex items-center justify-center overflow-hidden"
                    >
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover opacity-80" loading="lazy" decoding="async" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Sparkles key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xs text-brand-muted font-medium">
                    <span className="text-white font-bold">150+</span> clientes satisfechos
                  </p>
                </div>
              </div>
              
              <div className="h-8 w-px bg-white/10 hidden sm:block"></div>

              <div className="flex items-center gap-2 text-brand-muted">
                <ShieldCheck className="w-5 h-5 text-brand-primary" />
                <span className="text-sm">Garantía de calidad</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Scene Focus (Empty div just for spacing in grid) */}
          <div className="hidden lg:block h-full min-h-[500px]">
          </div>

        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 cursor-pointer hover:text-white transition-colors animate-bounce"
          onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ChevronRight className="w-8 h-8 rotate-90" />
        </div>
      </SectionWrapper>
      
      {/* Trust Bar integrada al final del Hero */}
      <TrustBar />
    </div>
  );
}
