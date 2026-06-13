import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Clock, 
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Calendar
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import { useState } from "react";
import { toast } from "../components/ui/Toast";
import { TurnstileCaptcha, useCaptchaValidation } from "../components/ui/TurnstileCaptcha";

const contactMethods = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+506 8888-8888",
    description: "Respuesta inmediata",
    color: "from-green-500 to-emerald-500",
    href: "https://wa.me/50688888888",
    available: "Siempre disponible"
  },
  {
    icon: Mail,
    title: "Email",
    value: "hola@quantiumcrew.com",
    description: "Respuesta en 24h",
    color: "from-brand-primary to-cyan-400",
    href: "mailto:hola@quantiumcrew.com",
    available: "24/7"
  },
  {
    icon: Phone,
    title: "Teléfono",
    value: "+506 8888-8888",
    description: "Lun-Vie 8am-6pm",
    color: "from-brand-secondary to-purple-500",
    href: "tel:+50688888888",
    available: "Horario laboral"
  },
  {
    icon: MapPin,
    title: "Oficina",
    value: "San José, Costa Rica",
    description: "Atención con cita previa",
    color: "from-orange-500 to-red-500",
    href: "#",
    available: "Con cita"
  }
];

const serviceOptions = [
  { value: "", label: "Selecciona un servicio" },
  { value: "assessment", label: "Evaluación gratuita de infraestructura" },
  { value: "development", label: "Desarrollo de software a medida" },
  { value: "infrastructure", label: "Infraestructura y servidores" },
  { value: "support", label: "Soporte técnico 24/7" },
  { value: "installation", label: "Instalación de redes y cableado" },
  { value: "consulting", label: "Consultoría tecnológica" },
  { value: "other", label: "Otro proyecto" },
];

// Hook para manejar el estado de foco
function useFocusAnimation() {
  const [isFocused, setIsFocused] = useState(false);
  return { isFocused, setIsFocused };
}

// Input text animado
function AnimatedTextInput({ 
  label, 
  icon: Icon, 
  ...props 
}: { label: string; icon?: React.ElementType } & React.InputHTMLAttributes<HTMLInputElement>) {
  const { isFocused, setIsFocused } = useFocusAnimation();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white/80">{label}</label>
      <div className="relative">
        {Icon && (
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isFocused ? 'text-brand-primary' : 'text-white/30'}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          {...props}
          className={`w-full px-4 py-4 rounded-xl bg-white/[0.03] border transition-all duration-300 text-white placeholder:text-white/30 focus:outline-none ${
            isFocused 
              ? 'border-brand-primary/50 shadow-[0_0_20px_rgba(0,212,255,0.1)] bg-white/[0.05]' 
              : 'border-white/10 hover:border-white/20'
          } ${Icon ? 'pl-12' : ''}`}
          onFocus={(e) => { setIsFocused(true); props.onFocus?.(e); }}
          onBlur={(e) => { setIsFocused(false); props.onBlur?.(e); }}
        />
      </div>
    </div>
  );
}

// Textarea animado
function AnimatedTextarea({ 
  label, 
  icon: Icon, 
  ...props 
}: { label: string; icon?: React.ElementType } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { isFocused, setIsFocused } = useFocusAnimation();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white/80">{label}</label>
      <div className="relative">
        {Icon && (
          <div className={`absolute left-4 top-4 transition-colors duration-300 ${isFocused ? 'text-brand-primary' : 'text-white/30'}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
        <textarea
          {...props}
          className={`w-full px-4 py-4 rounded-xl bg-white/[0.03] border transition-all duration-300 text-white placeholder:text-white/30 focus:outline-none resize-none ${
            isFocused 
              ? 'border-brand-primary/50 shadow-[0_0_20px_rgba(0,212,255,0.1)] bg-white/[0.05]' 
              : 'border-white/10 hover:border-white/20'
          } ${Icon ? 'pl-12' : ''}`}
          onFocus={(e) => { setIsFocused(true); props.onFocus?.(e); }}
          onBlur={(e) => { setIsFocused(false); props.onBlur?.(e); }}
        />
      </div>
    </div>
  );
}

// Select animado
function AnimatedSelect({ 
  label, 
  icon: Icon, 
  children,
  ...props 
}: { label: string; icon?: React.ElementType; children: React.ReactNode } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const { isFocused, setIsFocused } = useFocusAnimation();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white/80">{label}</label>
      <div className="relative">
        {Icon && (
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isFocused ? 'text-brand-primary' : 'text-white/30'}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
        <select
          {...props}
          className={`w-full px-4 py-4 rounded-xl bg-white/[0.03] border transition-all duration-300 text-white focus:outline-none appearance-none cursor-pointer ${
            isFocused 
              ? 'border-brand-primary/50 shadow-[0_0_20px_rgba(0,212,255,0.1)] bg-white/[0.05]' 
              : 'border-white/10 hover:border-white/20'
          } ${Icon ? 'pl-12' : ''}`}
          onFocus={(e) => { setIsFocused(true); props.onFocus?.(e); }}
          onBlur={(e) => { setIsFocused(false); props.onBlur?.(e); }}
        >
          {children}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isVerified, handleVerify, handleError } = useCaptchaValidation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isVerified) {
      toast("error", "Por favor completa la verificación de seguridad (CAPTCHA)");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast("success", "¡Mensaje enviado! Te contactaremos en menos de 24 horas.");
    setIsSubmitting(false);
    setFormData({ name: "", email: "", company: "", service: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-secondary/10 rounded-full blur-[120px]" />
        </div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/30 mb-6"
            >
              <Sparkles className="w-4 h-4 text-brand-primary" />
              <span className="text-brand-primary text-sm font-medium">Estamos aquí para ayudarte</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
              Hablemos de tu{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-cyan-400 to-brand-secondary animate-gradient-x bg-[length:200%_auto]">
                Proyecto
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed">
              Cuéntanos qué necesitas. Te responderemos en menos de 24 horas con una propuesta personalizada.
            </p>

            {/* Quick benefits */}
            <motion.div 
              className="flex flex-wrap justify-center gap-6 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {[
                { icon: Clock, text: "Respuesta < 24h" },
                { icon: CheckCircle2, text: "Presupuesto sin compromiso" },
                { icon: Zap, text: "Inicio inmediato" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-white/60">
                  <item.icon className="w-4 h-4 text-brand-primary" />
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods Grid */}
      <SectionWrapper className="py-12 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.title}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <method.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-1">{method.title}</h3>
                <p className="text-white font-medium mb-1 group-hover:text-brand-primary transition-colors">{method.value}</p>
                <p className="text-sm text-brand-muted mb-3">{method.description}</p>
                
                {/* Availability badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 rounded-full text-xs text-white/50">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  {method.available}
                </div>

                {/* Arrow indicator */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="w-5 h-5 text-white/30" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Main Content - Split Layout */}
      <SectionWrapper className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            
            {/* Left Column - Info */}
            <motion.div 
              className="lg:col-span-2 space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <h2 className="text-3xl font-display font-bold text-white mb-4">
                  ¿Qué sigue después de contactarnos?
                </h2>
                <p className="text-brand-muted leading-relaxed">
                  Nuestro proceso está diseñado para que empieces a ver resultados rápidamente:
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-6">
                {[
                  { 
                    step: "01", 
                    title: "Análisis inicial", 
                    desc: "Revisamos tu mensaje y entendemos tus necesidades específicas.",
                    time: "0-4 horas"
                  },
                  { 
                    step: "02", 
                    title: "Propuesta personalizada", 
                    desc: "Te enviamos un plan detallado con alcance, tiempos y presupuesto.",
                    time: "24-48 horas"
                  },
                  { 
                    step: "03", 
                    title: "Reunión de kickoff", 
                    desc: "Agendamos una llamada para alinear detalles y empezar el proyecto.",
                    time: "48-72 horas"
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    className="flex gap-4 group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 border border-brand-primary/20 flex items-center justify-center">
                        <span className="text-sm font-bold text-brand-primary">{item.step}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-white group-hover:text-brand-primary transition-colors">{item.title}</h4>
                        <span className="text-xs text-brand-muted flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {item.time}
                        </span>
                      </div>
                      <p className="text-sm text-brand-muted">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Trust note */}
              <div className="p-6 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/5 border border-brand-primary/20 rounded-2xl">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Sin compromiso</h4>
                    <p className="text-sm text-brand-muted">
                      La consulta inicial es completamente gratuita. Solo pagas si decides trabajar con nosotros.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div 
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-sm relative overflow-hidden">
                {/* Decorative gradient */}
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="mb-8">
                    <h3 className="text-2xl font-display font-bold text-white mb-2">
                      Envíanos un mensaje
                    </h3>
                    <p className="text-brand-muted">
                      Completa el formulario y te responderemos pronto.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <AnimatedTextInput
                        label="Nombre completo *"
                        type="text"
                        placeholder="Tu nombre"
                        value={formData.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                      <AnimatedTextInput
                        label="Email *"
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <AnimatedTextInput
                        label="Empresa"
                        type="text"
                        placeholder="Nombre de tu empresa"
                        value={formData.company}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, company: e.target.value})}
                      />
                      <AnimatedSelect
                        label="Servicio de interés *"
                        value={formData.service}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({...formData, service: e.target.value})}
                        required
                      >
                        {serviceOptions.map(option => (
                          <option key={option.value} value={option.value} className="bg-brand-dark">
                            {option.label}
                          </option>
                        ))}
                      </AnimatedSelect>
                    </div>

                    <AnimatedTextarea
                      label="Cuéntanos sobre tu proyecto *"
                      rows={5}
                      placeholder="Describe lo que necesitas: objetivos, plazos, presupuesto aproximado..."
                      value={formData.message}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, message: e.target.value})}
                      required
                    />

                    {/* CAPTCHA Verification */}
                    <TurnstileCaptcha 
                      onVerify={handleVerify} 
                      onError={handleError}
                      className="pt-4"
                    />

                    <div className="pt-4">
                      <Button 
                        size="lg"
                        disabled={!isVerified || isSubmitting} 
                        className="w-full gap-2 bg-gradient-to-r from-brand-primary to-brand-secondary hover:opacity-90 border-none shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(139,92,246,0.5)] transition-all duration-300 py-6"
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                            Enviando...
                          </>
                        ) : (
                          <>
                            Enviar mensaje
                            <Send className="w-5 h-5" />
                          </>
                        )}
                      </Button>
                      
                      <p className="text-center text-sm text-brand-muted mt-4">
                        Al enviar, aceptas nuestra{" "}
                        <a href="/privacy" className="text-brand-primary hover:underline">política de privacidad</a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
