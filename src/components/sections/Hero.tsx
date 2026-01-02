import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Code, Zap, Shield, Crown, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";
import { SectionWrapper } from "../ui/SectionWrapper";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <SectionWrapper className="pt-32 pb-40 md:pt-40 md:pb-60 min-h-[110vh] flex items-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient orbs - Optimized with CSS transforms instead of blur filters */}
        <div className="absolute inset-0 bg-brand-dark">
          <motion.div 
            className="absolute -top-[30%] left-[50%] -translate-x-1/2 w-[140vw] h-[140vh] bg-gradient-radial from-brand-primary/20 to-transparent opacity-30"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ willChange: "transform, opacity" }}
          />
          
          <motion.div 
            className="absolute -bottom-[30%] left-[50%] -translate-x-1/2 w-[140vw] h-[140vh] bg-gradient-radial from-brand-secondary/20 to-transparent opacity-30"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.3, 0.2, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ willChange: "transform, opacity" }}
          />
        </div>

        {/* Floating particles - Reduced count for performance */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              willChange: "transform, opacity"
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Central glow - Simplified */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1000px] max-h-[1000px] bg-brand-primary/5 rounded-full blur-[100px]"></div>
      </div>

      <motion.div 
        className="max-w-6xl mx-auto text-center space-y-12 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          
          {/* Enhanced title with gradient animation */}
          <motion.h1 
            className="text-6xl md:text-8xl font-display font-bold text-white leading-tight mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("hero.title_line1")} <br />
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              {t("hero.title_line2")}
            </motion.span>
          </motion.h1>
          
          {/* Enhanced subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-brand-muted max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t("hero.subtitle")}
          </motion.p>
          
          {/* Enhanced CTA buttons with icons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button 
              size="lg" 
              className="group text-lg px-8 py-4"
              onClick={() => navigate("/contact")}
            >
              <Zap className="mr-2 w-5 h-5" />
              {t("hero.cta_primary")}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="group text-lg px-8 py-4"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Code className="mr-2 w-5 h-5" />
              {t("hero.cta_secondary")}
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronRight className="w-6 h-6 rotate-90" />
      </motion.div>
    </SectionWrapper>
  );
}