import { motion } from "framer-motion";
import { Star, Quote, Plus, Filter, ArrowRight, Camera, X, Loader2, AlertCircle } from "lucide-react";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTestimonials, submitTestimonial } from "../hooks/useTestimonials";
import { useImageUpload } from "../hooks/useImageUpload";
import { toast } from "../components/ui/Toast";
import { TurnstileCaptcha, useCaptchaValidation } from "../components/ui/TurnstileCaptcha";

const categories = ["Todos", "Infraestructura", "Soporte Técnico", "Desarrollo", "Cloud", "Monitoreo", "Seguridad"];

function formatDate(date: Date): string {
  return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
}

export function TestimonialsPage() {
  const { testimonials, loading, error } = useTestimonials();
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [showForm, setShowForm] = useState(false);
  const [sortBy, setSortBy] = useState("date");

  const filteredTestimonials = selectedCategory === "Todos"
    ? testimonials
    : testimonials.filter(t => t.category === selectedCategory);

  const sortedTestimonials = [...filteredTestimonials].sort((a, b) => {
    if (sortBy === "date") return b.createdAt.getTime() - a.createdAt.getTime();
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const avgRating = testimonials.length > 0
    ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
    : "5.0";

  return (
    <div className="min-h-screen bg-rack-paper">
      {/* Hero Section */}
      <SectionWrapper className="pt-32 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold text-rack-ink mb-6">
            Lo que dicen nuestros clientes
          </h1>
          <p className="text-xl text-rack-graph max-w-3xl mx-auto mb-8">
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
      <SectionWrapper className="py-12 bg-rack-sheet">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
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

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-rack-graph" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-rack-paper text-rack-ink border border-rack-rule rounded-lg px-3 py-2 text-sm"
              >
                <option value="date">Más reciente</option>
                <option value="rating">Mejor calificación</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center p-6 bg-rack-sheet border-rack-rule">
              <div className="text-3xl font-bold text-rack-brand mb-2">{testimonials.length || "0"}</div>
              <div className="text-rack-graph text-sm">Testimonios</div>
            </Card>
            <Card className="text-center p-6 bg-rack-sheet border-rack-rule">
              <div className="text-3xl font-bold text-rack-brand mb-2">{avgRating}</div>
              <div className="text-rack-graph text-sm">Calificación promedio</div>
            </Card>
            <Card className="text-center p-6 bg-rack-sheet border-rack-rule">
              <div className="text-3xl font-bold text-rack-brand mb-2">98%</div>
              <div className="text-rack-graph text-sm">Clientes satisfechos</div>
            </Card>
            <Card className="text-center p-6 bg-rack-sheet border-rack-rule">
              <div className="text-3xl font-bold text-rack-brand mb-2">24/7</div>
              <div className="text-rack-graph text-sm">Soporte activo</div>
            </Card>
          </div>
        </div>
      </SectionWrapper>

      {/* Testimonials Grid */}
      <SectionWrapper className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-rack-ink/40 text-sm mt-4">Cargando testimonios...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <AlertCircle className="w-16 h-16 text-red-400/50 mx-auto mb-4" />
              <h3 className="text-red-400 text-lg mb-2">Error al cargar testimonios</h3>
              <p className="text-rack-ink/40 text-sm mb-6">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Intentar de nuevo
              </Button>
            </div>
          ) : sortedTestimonials.length === 0 ? (
            <div className="text-center py-20">
              <Quote className="w-16 h-16 text-rack-ink/10 mx-auto mb-4" />
              <h3 className="text-rack-ink/50 text-lg font-medium mb-2">
                {selectedCategory === "Todos" ? "Aún no hay testimonios" : `No hay testimonios en ${selectedCategory}`}
              </h3>
              <p className="text-rack-ink/30 text-sm mb-6">Sé el primero en compartir tu experiencia</p>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="mr-2 w-4 h-4" />
                Compartir mi experiencia
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-rack-sheet border-rack-rule hover:border-brand-primary/30 transition-all duration-300 group">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Quote className="w-8 h-8 text-rack-brand/50" />
                        <div className="flex gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-brand-primary text-rack-brand" />
                          ))}
                        </div>
                      </div>

                      <p className="text-rack-ink mb-6 leading-relaxed">
                        &ldquo;{testimonial.content}&rdquo;
                      </p>

                      <div className="flex items-center gap-4 pt-4 border-t border-rack-rule">
                        {testimonial.imageUrl ? (
                          <img
                            src={testimonial.imageUrl}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-brand-primary/30"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center border-2 border-brand-primary/30">
                            <span className="text-rack-ink font-bold text-sm">
                              {testimonial.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-rack-ink">{testimonial.name}</div>
                          <div className="text-sm text-rack-graph">{testimonial.role}</div>
                          <div className="text-xs text-rack-brand">{testimonial.company}</div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="inline-block px-3 py-1 bg-brand-primary/20 text-rack-brand text-xs rounded-full">
                          {testimonial.category}
                        </span>
                        <span className="text-rack-ink/30 text-xs">
                          {formatDate(testimonial.createdAt)}
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper className="py-20 bg-rack-sheet text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-display font-bold text-rack-ink mb-6">
            ¿Listo para tu propia historia de éxito?
          </h2>
          <p className="text-xl text-rack-graph max-w-2xl mx-auto mb-8">
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

// --- Validation helpers ---
interface FieldError {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  content?: string;
}

function validateField(field: keyof FieldError, value: string): string | undefined {
  switch (field) {
    case 'name':
      if (!value.trim()) return 'El nombre es requerido';
      if (value.trim().length < 2) return 'Mínimo 2 caracteres';
      if (value.trim().length > 100) return 'Máximo 100 caracteres';
      return undefined;
    case 'email':
      if (!value.trim()) return 'El email es requerido';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email inválido';
      return undefined;
    case 'company':
      if (!value.trim()) return 'La empresa es requerida';
      if (value.trim().length < 2) return 'Mínimo 2 caracteres';
      if (value.trim().length > 100) return 'Máximo 100 caracteres';
      return undefined;
    case 'role':
      if (!value.trim()) return 'El cargo es requerido';
      if (value.trim().length < 2) return 'Mínimo 2 caracteres';
      if (value.trim().length > 100) return 'Máximo 100 caracteres';
      return undefined;
    case 'content':
      if (!value.trim()) return 'La experiencia es requerida';
      if (value.trim().length < 20) return 'Mínimo 20 caracteres';
      if (value.trim().length > 500) return 'Máximo 500 caracteres';
      return undefined;
  }
}

function validateAll(data: { name: string; email: string; company: string; role: string; content: string }): FieldError {
  const errors: FieldError = {};
  for (const key of ['name', 'email', 'company', 'role', 'content'] as const) {
    const err = validateField(key, data[key]);
    if (err) errors[key] = err;
  }
  return errors;
}

// --- Testimonial Form ---
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
  const [errors, setErrors] = useState<FieldError>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const imageUpload = useImageUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isVerified, handleVerify, handleError } = useCaptchaValidation();

  const handleBlur = (field: keyof FieldError) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const err = validateField(field, formData[field]);
    setErrors(prev => ({ ...prev, [field]: err }));
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const err = validateField(field as keyof FieldError, String(value));
      setErrors(prev => ({ ...prev, [field]: err }));
    }
  };

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const ok = imageUpload.selectFile(file);
      if (!ok && imageUpload.error) {
        toast('error', imageUpload.error);
      }
    }
  }, [imageUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const ok = imageUpload.selectFile(file);
      if (!ok && imageUpload.error) {
        toast('error', imageUpload.error);
      }
    }
  }, [imageUpload]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allErrors = validateAll(formData);
    setErrors(allErrors);
    setTouched({ name: true, email: true, company: true, role: true, content: true });

    if (Object.keys(allErrors).length > 0) {
      toast('error', 'Por favor corrige los errores del formulario');
      return;
    }

    if (!isVerified) {
      toast('error', 'Por favor completa la verificación de seguridad (CAPTCHA)');
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = '';
      if (imageUpload.preview) {
        imageUrl = await imageUpload.upload();
      }

      await submitTestimonial({
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        role: formData.role.trim(),
        content: formData.content.trim(),
        rating: formData.rating,
        category: formData.category,
        imageUrl,
      });

      toast('success', 'Testimonio enviado. Lo revisaremos y publicaremos pronto.');
      onClose();
    } catch {
      toast('error', 'Error al enviar el testimonio. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClass = (field: keyof FieldError) => {
    const base = "w-full bg-rack-paper border rounded-lg px-4 py-3 text-rack-ink focus:outline-none transition-colors";
    if (touched[field] && errors[field]) return `${base} border-red-400/60 focus:border-red-400`;
    if (touched[field] && !errors[field]) return `${base} border-green-400/40 focus:border-green-400`;
    return `${base} border-rack-rule focus:border-brand-primary`;
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-rack-paper rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-rack-rule"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-rack-ink">Compartir mi experiencia</h3>
          <button
            onClick={onClose}
            className="text-rack-ink/60 hover:text-rack-ink transition-colors"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-rack-ink text-sm font-medium mb-2">Nombre completo *</label>
              <input
                type="text"
                placeholder="Ej: Carlos Rodriguez"
                className={getInputClass('name')}
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                disabled={isSubmitting}
              />
              {touched.name && errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-rack-ink text-sm font-medium mb-2">Email *</label>
              <input
                type="email"
                placeholder="tu@empresa.com"
                className={getInputClass('email')}
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                disabled={isSubmitting}
              />
              {touched.email && errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-rack-ink text-sm font-medium mb-2">Empresa *</label>
              <input
                type="text"
                placeholder="Ej: TechStart Solutions"
                className={getInputClass('company')}
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                onBlur={() => handleBlur('company')}
                disabled={isSubmitting}
              />
              {touched.company && errors.company && (
                <p className="text-red-400 text-xs mt-1">{errors.company}</p>
              )}
            </div>
            <div>
              <label className="block text-rack-ink text-sm font-medium mb-2">Cargo *</label>
              <input
                type="text"
                placeholder="Ej: CEO, Director de IT"
                className={getInputClass('role')}
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
                onBlur={() => handleBlur('role')}
                disabled={isSubmitting}
              />
              {touched.role && errors.role && (
                <p className="text-red-400 text-xs mt-1">{errors.role}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-rack-ink text-sm font-medium mb-2">Categoría del servicio</label>
            <select
              className="w-full bg-rack-paper border border-rack-rule rounded-lg px-4 py-3 text-rack-ink focus:border-brand-primary focus:outline-none"
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              disabled={isSubmitting}
            >
              {categories.slice(1).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-rack-ink text-sm font-medium mb-2">Calificación</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleChange('rating', star)}
                  disabled={isSubmitting}
                  className={`w-8 h-8 ${star <= formData.rating ? 'text-rack-brand' : 'text-rack-ink/30'} hover:text-rack-brand transition-colors`}
                >
                  <Star className="w-full h-full fill-current" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-rack-ink text-sm font-medium">Tu experiencia *</label>
              <span className={`text-xs ${formData.content.length > 500 ? 'text-red-400' : formData.content.length >= 20 ? 'text-green-400/70' : 'text-rack-ink/30'}`}>
                {formData.content.length}/500
              </span>
            </div>
            <textarea
              rows={4}
              placeholder="Cuéntanos cómo Quantium Crew ayudó a tu empresa. ¿Qué problema tenías? ¿Cómo te ayudamos? ¿Qué resultados obtuviste?"
              className={`${getInputClass('content')} resize-none`}
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              onBlur={() => handleBlur('content')}
              disabled={isSubmitting}
            />
            {touched.content && errors.content && (
              <p className="text-red-400 text-xs mt-1">{errors.content}</p>
            )}
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-rack-ink text-sm font-medium mb-2">Foto (opcional)</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleFileSelect}
            />

            {imageUpload.preview ? (
              <div className="flex items-center gap-4">
                <img
                  src={imageUpload.preview}
                  alt="Preview"
                  className="w-16 h-16 rounded-full object-cover border-2 border-brand-primary/30"
                />
                <div className="flex-1">
                  {imageUpload.uploading && (
                    <div className="w-full bg-rack-sheet rounded-full h-1.5 mb-2">
                      <div
                        className="bg-brand-primary h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${imageUpload.progress}%` }}
                      />
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isSubmitting || imageUpload.uploading}
                      className="text-rack-brand text-sm hover:underline"
                    >
                      Cambiar
                    </button>
                    <button
                      type="button"
                      onClick={imageUpload.clear}
                      disabled={isSubmitting || imageUpload.uploading}
                      className="text-red-400 text-sm hover:underline"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                onClick={() => !isSubmitting && fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                className="border-2 border-dashed border-rack-rule rounded-xl p-6 text-center cursor-pointer hover:border-brand-primary/40 transition-colors"
              >
                <Camera className="w-8 h-8 text-rack-ink/30 mx-auto mb-2" />
                <p className="text-rack-ink/40 text-sm">Arrastra tu foto o haz clic para seleccionar</p>
                <p className="text-rack-ink/20 text-xs mt-1">JPG, PNG, WebP o GIF. Máximo 5MB</p>
              </div>
            )}

            {imageUpload.error && (
              <p className="text-red-400 text-xs mt-1">{imageUpload.error}</p>
            )}
          </div>

          {/* CAPTCHA Verification */}
          <TurnstileCaptcha 
            onVerify={handleVerify} 
            onError={handleError}
            className="pt-4"
          />

          <div className="flex gap-4">
            <Button 
              type="submit" 
              className="flex-1" 
              isLoading={isSubmitting}
              disabled={!isVerified}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enviando...
                </span>
              ) : (
                "Enviar testimonio"
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
