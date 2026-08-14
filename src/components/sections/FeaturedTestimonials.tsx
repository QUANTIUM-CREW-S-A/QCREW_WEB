import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowRight, Quote, ChevronLeft, ChevronRight, BadgeCheck, AlertCircle } from "lucide-react";
import { Button } from "../ui/Button";
import { SectionWrapper } from "../ui/SectionWrapper";
import { useNavigate } from "react-router-dom";
import { useTestimonials } from "../../hooks/useTestimonials";

// Carrusel de testimonios infinito
function TestimonialCarousel() {
  const { testimonials, loading, error } = useTestimonials();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Debug info
  useEffect(() => {
    console.log('[TestimonialCarousel] Estado:', { 
      loading, 
      error, 
      count: testimonials.length,
      testimonials: testimonials.map(t => ({ id: t.id, name: t.name, status: t.status }))
    });
  }, [testimonials, loading, error]);

  // Auto-play cada 6 segundos
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length <= 1) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      if (newDirection === 1) {
        return (prev + 1) % testimonials.length;
      } else {
        return prev === 0 ? testimonials.length - 1 : prev - 1;
      }
    });
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, [testimonials.length]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 px-4">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <p className="text-red-400 mb-2">Error al cargar testimonios</p>
        <p className="text-rack-ink/40 text-sm">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 text-rack-brand hover:underline text-sm"
        >
          Recargar página
        </button>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <Quote className="w-16 h-16 text-rack-ink/10 mx-auto mb-4" />
        <p className="text-rack-graph text-lg mb-2">Aún no hay testimonios de clientes</p>
        <p className="text-rack-ink/40 text-sm mb-6">Sé el primero en compartir tu experiencia con nosotros</p>
        <Button 
          variant="outline" 
          onClick={() => window.location.href = '/testimonials'}
        >
          Compartir mi experiencia
        </Button>
      </div>
    );
  }

  const current = testimonials[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Debug info - visible solo en desarrollo */}
      {process.env.NODE_ENV === 'development' && (
        <div className="text-center mb-4">
          <span className="text-rack-ink/30 text-xs">
            Debug: {testimonials.length} testimonios cargados
          </span>
        </div>
      )}

      {/* Main Carousel */}
      <div 
        className="relative h-[400px] md:h-[350px] overflow-hidden"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 flex items-center justify-center px-4"
          >
            <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-rack-rule rounded-3xl p-8 md:p-12 w-full backdrop-blur-sm relative overflow-hidden">
              {/* Decorative quote */}
              <Quote className="absolute top-6 right-6 w-16 h-16 text-rack-brand/10" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-brand-primary text-rack-brand" />
                ))}
              </div>

              {/* Content */}
              <p className="text-xl md:text-2xl text-rack-ink leading-relaxed mb-8 font-light">
                &ldquo;{current.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                {current.imageUrl ? (
                  <img
                    src={current.imageUrl}
                    alt={current.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-brand-primary/30"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center border-2 border-brand-primary/30">
                    <span className="text-rack-ink font-bold text-lg">
                      {current.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-rack-ink text-lg">{current.name}</span>
                    <BadgeCheck className="w-5 h-5 text-rack-brand" />
                  </div>
                  <div className="text-rack-graph">{current.role}</div>
                  <div className="text-rack-brand text-sm">{current.company}</div>
                </div>
                
                {/* Category Badge */}
                <div className="ml-auto hidden md:block">
                  <span className="px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 rounded-full text-rack-brand text-xs">
                    {current.category}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {testimonials.length > 1 && (
          <>
            <button
              onClick={() => paginate(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:translate-x-0 w-12 h-12 bg-rack-sheet border border-rack-rule rounded-full flex items-center justify-center text-rack-ink/60 hover:text-rack-ink hover:bg-rack-sheet hover:border-brand-primary/30 transition-all z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-0 w-12 h-12 bg-rack-sheet border border-rack-rule rounded-full flex items-center justify-center text-rack-ink/60 hover:text-rack-ink hover:bg-rack-sheet hover:border-brand-primary/30 transition-all z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {testimonials.length > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 10000);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 bg-brand-primary' 
                  : 'w-2 bg-rack-sheet hover:bg-rack-sheet'
              }`}
            />
          ))}
        </div>
      )}

      {/* Counter */}
      <div className="text-center mt-4">
        <span className="text-rack-ink/40 text-sm">
          {currentIndex + 1} / {testimonials.length} testimonios
        </span>
      </div>
    </div>
  );
}

export function FeaturedTestimonials() {
  const navigate = useNavigate();

  return (
    <SectionWrapper className="py-20 md:py-32 bg-rack-paper relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-secondary/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/30 mb-6"
          >
            <Quote className="w-4 h-4 text-rack-brand" />
            <span className="text-rack-brand text-sm font-medium">Testimonios Verificados</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-display font-bold text-rack-ink mb-6">
            Lo que dicen nuestros{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
              clientes reales
            </span>
          </h2>
          <p className="text-xl text-rack-graph max-w-2xl mx-auto">
            Historias de empresas que confiaron en nosotros para transformar su tecnología
          </p>
        </motion.div>

        {/* Carrusel de Testimonios */}
        <TestimonialCarousel />

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-brand-primary to-brand-secondary border-none"
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
              <Star className="mr-2 w-5 h-5 text-yellow-400 fill-yellow-400" />
              Compartir mi experiencia
            </Button>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
