import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Code2, Server, Headphones, Wrench, ArrowUpRight, ArrowRight } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { useTranslation } from "react-i18next";
import { ServiceImage } from "../ui/ServiceImage";
import { useNavigate } from "react-router-dom";
import { MouseEvent } from "react";

export function Services() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const serviceImages = {
    dev: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop",
    systems: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    support: "https://images.unsplash.com/photo-1558494943-c8420f912134?q=80&w=1200&auto=format&fit=crop",
    install: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
  };

  const services = [
    {
      id: "dev",
      title: t("services.dev.title"),
      icon: Code2,
      description: t("services.dev.description"),
      features: t("services.dev.features", { returnObjects: true }) as string[]
    },
    {
      id: "systems",
      title: t("services.systems.title"),
      icon: Server,
      description: t("services.systems.description"),
      features: t("services.systems.features", { returnObjects: true }) as string[]
    },
    {
      id: "support",
      title: t("services.support.title"),
      icon: Headphones,
      description: t("services.support.description"),
      features: t("services.support.features", { returnObjects: true }) as string[]
    },
    {
      id: "install",
      title: t("services.install.title"),
      icon: Wrench,
      description: t("services.install.description"),
      features: t("services.install.features", { returnObjects: true }) as string[]
    }
  ];

  return (
    <SectionWrapper id="services" className="relative overflow-hidden bg-brand-dark border-t border-brand-primary/10 py-24 md:py-32">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

      {/* Gradient orb (radial gradient instead of blur) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(0,212,255,0.06)_0%,transparent_60%)] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-sm font-medium mb-4">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            {t("services.title_line1")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">{t("services.title_line2")}</span>
          </h2>
          <p className="text-brand-muted text-lg">
            {t("services.subtitle")}
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 group/cards">
          {services.map((service, idx) => (
            <ServiceCard 
              key={idx} 
              service={service} 
              index={idx} 
              image={serviceImages[['dev', 'systems', 'support', 'install'][idx] as keyof typeof serviceImages]} 
              navigate={navigate}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
}

function ServiceCard({ service, index, image, navigate }: { service: Service, index: number, image: string, navigate: (path: string) => void }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onClick={() => navigate(`/services/${service.id}`)}
      className="group relative border border-white/10 bg-gray-900/50 overflow-hidden rounded-xl hover:border-white/20 transition-colors cursor-pointer"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(139, 92, 246, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="relative h-full flex flex-col p-6">
        {/* Image Header with enhanced visibility */}
        <div className="absolute top-0 left-0 w-full h-48 overflow-hidden z-0 opacity-40 group-hover:opacity-60 transition-all duration-500 group-hover:scale-105">
           <ServiceImage
              src={image} 
              alt={service.title} 
              className="w-full h-full object-cover"
              serviceType={['dev', 'systems', 'support', 'install'][index] as 'dev' | 'systems' | 'support' | 'install'}
            />
           <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        </div>

        {/* Icon */}
        <div className="relative z-10 mb-4 mt-24">
          <div className="w-12 h-12 rounded-lg bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
            <service.icon className="w-6 h-6 text-brand-primary group-hover:text-white transition-colors" />
          </div>
        </div>

        {/* Content */}
        <h3 className="relative z-10 text-xl font-bold text-white mb-2 group-hover:text-brand-primary transition-colors flex items-center gap-2">
          {service.title}
          <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-brand-primary" />
        </h3>
        
        <p className="relative z-10 text-brand-muted text-sm mb-6 line-clamp-2 group-hover:text-white/80 transition-colors">
          {service.description}
        </p>

        {/* Features list */}
        <ul className="relative z-10 space-y-2 mb-6 flex-grow">
          {service.features.slice(0, 3).map((feature: string, fIdx: number) => (
            <li key={fIdx} className="text-xs text-brand-muted/70 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-brand-primary shadow-[0_0_5px_#8B5CF6]" />
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="relative z-10 mt-auto pt-4 border-t border-white/5">
          <div className="flex items-center text-sm font-medium text-brand-primary group-hover:text-white transition-colors">
            Ver detalles
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
