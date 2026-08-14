import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { useTranslation } from "react-i18next";

const testimonials = [
  {
    name: "Carlos Rodriguez",
    role: "CEO",
    company: "TechStart Solutions",
    content: "Quantium Crew transformó completamente nuestra infraestructura tecnológica. Su enfoque proactivo y soluciones innovadoras nos han ahorrado tiempo y dinero.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Ana Martinez",
    role: "Directora de Tecnología",
    company: "Global Logistics",
    content: "El equipo de Quantium no solo resuelve problemas, los previene. Su soporte 24/7 es excepcional y su expertise en infraestructura empresarial es incomparable.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Roberto Chen",
    role: "Fundador",
    company: "FinTech Innovators",
    content: "Desde el día uno, Quantium Crew ha sido nuestro partner tecnológico confiable. Nos ayudaron a escalar nuestra plataforma fintech con seguridad empresarial.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  }
];

export function Testimonials() {
  const { t } = useTranslation();

  return (
    <SectionWrapper className="bg-rack-sheet py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-rack-ink mb-6">
            {t("testimonials.title", "What Our Clients Say")}
          </h2>
          <p className="text-xl text-rack-graph max-w-2xl mx-auto">
            {t("testimonials.subtitle", "Companies that trust Quantium Crew to transform their technology")}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="relative bg-rack-paper/90 backdrop-blur-sm rounded-2xl p-8 border border-rack-rule hover:border-brand-primary/30 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Quote icon */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center">
                <Quote className="w-4 h-4 text-black" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-primary text-rack-brand" />
                ))}
              </div>

              {/* Content */}
              <p className="text-rack-ink mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-primary/30"
                />
                <div>
                  <div className="font-semibold text-rack-ink">{testimonial.name}</div>
                  <div className="text-sm text-rack-graph">
                    {testimonial.role} en {testimonial.company}
                  </div>
                </div>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-rack-graph mb-6">
            {t("testimonials.cta", "Ready to join our satisfied clients?")}
          </p>
          <div className="inline-flex items-center gap-2 text-rack-brand font-medium">
            <span>{t("testimonials.cta_subtitle", "Start your technology transformation today")}</span>
            <span className="animate-pulse">→</span>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}