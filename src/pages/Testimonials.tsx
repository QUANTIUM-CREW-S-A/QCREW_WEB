import { motion } from "framer-motion";
import { Star, Quote, Plus, Filter, ArrowRight } from "lucide-react";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Link } from "react-router-dom";

// Testimonios de ejemplo - en producción vendrían de una API
const testimonials = [
  {
    id: 1,
    name: "Carlos Rodriguez",
    role: "CEO",
    company: "TechStart Solutions",
    content: "Quantium Crew transformó completamente nuestra infraestructura tecnológica. Su enfoque proactivo y soluciones innovadoras nos han ahorrado tiempo y dinero. La atención de Edgar Ng como CEO es excepcional.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    date: "2024-01-15",
    category: "Infraestructura"
  },
  {
    id: 2,
    name: "Ana Martinez",
    role: "Directora de Tecnología",
    company: "Global Logistics",
    content: "El equipo de Quantium no solo resuelve problemas, los previene. Su soporte 24/7 es excepcional y su expertise en infraestructura empresarial es incomparable. Altamente recomendados.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    date: "2024-01-10",
    category: "Soporte Técnico"
  },
  {
    id: 3,
    name: "Roberto Chen",
    role: "Fundador",
    company: "FinTech Innovators",
    content: "Desde el día uno, Quantium Crew ha sido nuestro partner tecnológico confiable. Nos ayudaron a escalar nuestra plataforma fintech con seguridad empresarial. Excelente trabajo del equipo liderado por Edgar.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    date: "2024-01-05",
    category: "Desarrollo"
  },
  {
    id: 4,
    name: "Laura González",
    role: "Gerente de IT",
    company: "E-Commerce Plus",
    content: "La migración a la nube que realizó Quantium fue impecable. Minimizaron el downtime y maximizaron la eficiencia. Su profesionalismo y conocimiento son sobresalientes.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    date: "2023-12-28",
    category: "Cloud"
  },
  {
    id: 5,
    name: "Miguel Torres",
    role: "Director de Operaciones",
    company: "Manufactura Moderna",
    content: "Implementaron un sistema de monitoreo que ha prevenido múltiples fallas críticas. La inversión se pagó sola en los primeros 3 meses. Servicio excepcional.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    date: "2023-12-20",
    category: "Monitoreo"
  },
  {
    id: 6,
    name: "Patricia Mendoza",
    role: "CEO",
    company: "StartUp Salud",
    content: "Quantium Crew entendió perfectamente nuestras necesidades de seguridad y cumplimiento. Nos ayudaron a obtener certificaciones importantes para nuestro sector.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    date: "2023-12-15",
    category: "Seguridad"
  }
];

const categories = ["Todos", "Infraestructura", "Soporte Técnico", "Desarrollo", "Cloud", "Monitoreo", "Seguridad"];

export function TestimonialsPage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [showForm, setShowForm] = useState(false);
  const [sortBy, setSortBy] = useState("date");

  const filteredTestimonials = selectedCategory === "Todos" 
    ? testimonials 
    : testimonials.filter(t => t.category === selectedCategory);

  const sortedTestimonials = [...filteredTestimonials].sort((a, b) => {
    if (sortBy === "date") return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Hero Section */}
      <SectionWrapper className="pt-32 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
            Lo que dicen nuestros clientes
          </h1>
          <p className="text-xl text-brand-muted max-w-3xl mx-auto mb-8">
            Descubre cómo Quantium Crew ha transformado la tecnología de empresas como la tuya. 
            Lee experiencias reales de clientes satisfechos con nuestros servicios.
          </p>
          <Button 
            size="lg" 
            className="group"
            onClick={() => setShowForm(true)}
          >
            <Plus className="mr-2 w-5 h-5" />
            Compartir mi experiencia
          </Button>
        </motion.div>
      </SectionWrapper>

      {/* Filters and Stats */}
      <SectionWrapper className="py-12 bg-brand-gray/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-brand-muted" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-brand-dark text-white border border-white/20 rounded-lg px-3 py-2 text-sm"
              >
                <option value="date">Más reciente</option>
                <option value="rating">Mejor calificación</option>
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center p-6 bg-white/5 border-white/10">
              <div className="text-3xl font-bold text-brand-primary mb-2">{testimonials.length}+</div>
              <div className="text-brand-muted text-sm">Testimonios</div>
            </Card>
            <Card className="text-center p-6 bg-white/5 border-white/10">
              <div className="text-3xl font-bold text-brand-primary mb-2">5.0</div>
              <div className="text-brand-muted text-sm">Calificación promedio</div>
            </Card>
            <Card className="text-center p-6 bg-white/5 border-white/10">
              <div className="text-3xl font-bold text-brand-primary mb-2">98%</div>
              <div className="text-brand-muted text-sm">Clientes satisfechos</div>
            </Card>
            <Card className="text-center p-6 bg-white/5 border-white/10">
              <div className="text-3xl font-bold text-brand-primary mb-2">24/7</div>
              <div className="text-brand-muted text-sm">Soporte activo</div>
            </Card>
          </div>
        </div>
      </SectionWrapper>

      {/* Testimonials Grid */}
      <SectionWrapper className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/5 border-white/10 hover:border-brand-primary/30 transition-all duration-300 group">
                  <div className="p-6">
                    {/* Quote icon */}
                    <div className="flex items-center justify-between mb-4">
                      <Quote className="w-8 h-8 text-brand-primary/50" />
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-brand-primary text-brand-primary" />
                        ))}
                      </div>
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

                    {/* Category badge */}
                    <div className="mt-4">
                      <span className="inline-block px-3 py-1 bg-brand-primary/20 text-brand-primary text-xs rounded-full">
                        {testimonial.category}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper className="py-20 bg-brand-gray/30 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-display font-bold text-white mb-6">
            ¿Listo para tu propia historia de éxito?
          </h2>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto mb-8">
            Únete a nuestros clientes satisfechos y descubre cómo podemos transformar tu tecnología.
          </p>
          <Link to="/contact">
            <Button 
              size="lg" 
              className="group"
            >
              Comenzar ahora
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </SectionWrapper>

      {/* Testimonial Form Modal */}
      {showForm && <TestimonialForm onClose={() => setShowForm(false)} />}
    </div>
  );
}

// Formulario para nuevos testimonios
function TestimonialForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    content: "",
    rating: 5,
    category: "Infraestructura"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el testimonio
    alert("¡Gracias por compartir tu experiencia! La revisaremos y publicaremos pronto.");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-brand-dark rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Compartir mi experiencia</h3>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Nombre completo *</label>
              <input
                type="text"
                required
                className="w-full bg-brand-dark border border-white/20 rounded-lg px-4 py-3 text-white focus:border-brand-primary focus:outline-none"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Email *</label>
              <input
                type="email"
                required
                className="w-full bg-brand-dark border border-white/20 rounded-lg px-4 py-3 text-white focus:border-brand-primary focus:outline-none"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Empresa *</label>
              <input
                type="text"
                required
                className="w-full bg-brand-dark border border-white/20 rounded-lg px-4 py-3 text-white focus:border-brand-primary focus:outline-none"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Cargo *</label>
              <input
                type="text"
                required
                className="w-full bg-brand-dark border border-white/20 rounded-lg px-4 py-3 text-white focus:border-brand-primary focus:outline-none"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Categoría del servicio</label>
            <select
              className="w-full bg-brand-dark border border-white/20 rounded-lg px-4 py-3 text-white focus:border-brand-primary focus:outline-none"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              {categories.slice(1).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Calificación</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({...formData, rating: star})}
                  className={`w-8 h-8 ${star <= formData.rating ? 'text-brand-primary' : 'text-white/30'} hover:text-brand-primary transition-colors`}
                >
                  <Star className="w-full h-full fill-current" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Tu experiencia *</label>
            <textarea
              required
              rows={4}
              className="w-full bg-brand-dark border border-white/20 rounded-lg px-4 py-3 text-white focus:border-brand-primary focus:outline-none resize-none"
              placeholder="Cuéntanos cómo Quantium Crew ayudó a tu empresa..."
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="flex-1">
              Enviar testimonio
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}