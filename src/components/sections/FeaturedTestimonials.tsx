import { motion } from "framer-motion";
import { Star, ArrowRight, Quote } from "lucide-react";
import { Button } from "../ui/Button";
import { SectionWrapper } from "../ui/SectionWrapper";
import { Card } from "../ui/Card";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// Testimonios destacados para la home
const featuredTestimonials = [
  {
    id: 1,
    name: "Carlos Rodriguez",
    role: "CEO",
    company: "TechStart Solutions",
    content: "Quantium Crew transformó completamente nuestra infraestructura tecnológica. Su enfoque proactivo y soluciones innovadoras nos han ahorrado tiempo y dinero.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Ana Martinez",
    role: "Directora de Tecnología",
    company: "Global Logistics",
    content: "El equipo de Quantium no solo resuelve problemas, los previene. Su soporte 24/7 es excepcional y su expertise en infraestructura empresarial es incomparable.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Roberto Chen",
    role: "Fundador",
    company: "FinTech Innovators",
    content: "Desde el día uno, Quantium Crew ha sido nuestro partner tecnológico confiable. Nos ayudaron a escalar nuestra plataforma fintech con seguridad empresarial.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
];

export function FeaturedTestimonials() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <SectionWrapper className="py-20 md:py-32 bg-brand-gray/30">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/20 border border-brand-primary/30 mb-6">
            <Quote className="w-4 h-4 text-brand-primary" />
            <span className="text-brand-primary text-sm font-medium">Testimonios</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto">
            Descubre cómo hemos ayudado a empresas como la tuya a transformar su tecnología y alcanzar sus objetivos.
          </p>
        </motion.div>

        {/* Featured Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white/5 border-white/10 hover:border-brand-primary/30 transition-all duration-300 group">
                <div className="p-6">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-primary text-brand-primary" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-white mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-brand-primary/30"
                    />
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-brand-muted">{testimonial.role}</div>
                      <div className="text-xs text-brand-primary">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6">
            <Button 
              size="lg" 
              className="group"
              onClick={() => navigate("/testimonials")}
            >
              Ver todos los testimonios
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="group"
              onClick={() => navigate("/testimonials")}
            >
              Compartir mi experiencia
              <Star className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="text-center p-6 bg-white/5 border-white/10">
            <div className="text-3xl font-bold text-brand-primary mb-2">50+</div>
            <div className="text-brand-muted text-sm">Clientes satisfechos</div>
          </Card>
          <Card className="text-center p-6 bg-white/5 border-white/10">
            <div className="text-3xl font-bold text-brand-primary mb-2">5.0</div>
            <div className="text-brand-muted text-sm">Calificación promedio</div>
          </Card>
          <Card className="text-center p-6 bg-white/5 border-white/10">
            <div className="text-3xl font-bold text-brand-primary mb-2">98%</div>
            <div className="text-brand-muted text-sm">Recomendaciones</div>
          </Card>
          <Card className="text-center p-6 bg-white/5 border-white/10">
            <div className="text-3xl font-bold text-brand-primary mb-2">24/7</div>
            <div className="text-brand-muted text-sm">Soporte activo</div>
          </Card>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}