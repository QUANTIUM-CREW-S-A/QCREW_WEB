import { useParams, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Code2, Server, Headphones, Wrench, CheckCircle2, Zap, BarChart3, Shield } from "lucide-react";
import { Button } from "../components/ui/Button";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { ServiceImage } from "../components/ui/ServiceImage";

// Datos extendidos de los servicios (en una aplicación real, esto vendría de una API o CMS)
const serviceData = {
  dev: {
    icon: Code2,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop",
    color: "from-blue-600 to-cyan-600",
    stats: [
      { label: "Proyectos Entregados", value: "500+" },
      { label: "Satisfacción", value: "99%" },
      { label: "Expertos", value: "25+" }
    ],
    details: [
      {
        title: "Desarrollo a Medida",
        description: "Creamos soluciones de software personalizadas que se adaptan perfectamente a los flujos de trabajo únicos de tu empresa. Desde aplicaciones web complejas hasta sistemas de gestión interna.",
        icon: Zap
      },
      {
        title: "Arquitectura Escalable",
        description: "Diseñamos sistemas pensados para crecer. Utilizamos microservicios y arquitecturas cloud-native que garantizan rendimiento y disponibilidad incluso bajo alta demanda.",
        icon: BarChart3
      },
      {
        title: "Seguridad por Diseño",
        description: "La seguridad no es un añadido, es la base. Implementamos las mejores prácticas de DevSecOps para asegurar que tu software sea robusto contra amenazas.",
        icon: Shield
      }
    ],
    comparison: [
      { feature: "Tiempo de Entrega", others: "Retrasos constantes", quantium: "Garantizado por contrato" },
      { feature: "Calidad de Código", others: "Deuda técnica acumulada", quantium: "Estándares Clean Code" },
      { feature: "Escalabilidad", others: "Limitada y costosa", quantium: "Cloud-native ilimitada" },
      { feature: "Propiedad Intelectual", others: "Licencias confusas", quantium: "100% tuya" }
    ],
    process: [
      { title: "Descubrimiento", desc: "Analizamos tus necesidades y objetivos de negocio" },
      { title: "Diseño", desc: "Creamos la arquitectura y prototipo de la solución" },
      { title: "Desarrollo", desc: "Implementamos con metodología ágil y entregas iterativas" },
      { title: "Testing", desc: "Pruebas exhaustivas de calidad y seguridad" },
      { title: "Lanzamiento", desc: "Despliegue, capacitación y soporte continuo" }
    ],
    testimonial: {
      text: "El equipo de desarrollo transformó completamente nuestra operativa interna. Lo que antes tomaba días, ahora se hace en minutos.",
      author: "Carlos Méndez",
      role: "CTO, FinanzasGlobal"
    }
  },
  systems: {
    icon: Server,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    color: "from-green-600 to-emerald-600",
    stats: [
      { label: "Uptime Garantizado", value: "99.99%" },
      { label: "Servidores Gestionados", value: "1k+" },
      { label: "Incidentes Prevenidos", value: "5k+" }
    ],
    details: [
      {
        title: "Infraestructura Cloud Híbrida",
        description: "Integramos lo mejor de la nube pública y privada. Optimizamos costos y rendimiento mediante orquestación inteligente de cargas de trabajo.",
        icon: Cloud
      },
      {
        title: "Virtualización Avanzada",
        description: "Maximizamos el uso de tu hardware con soluciones de virtualización líderes (VMware, Hyper-V). Reducimos costos de energía y espacio físico.",
        icon: Server
      },
      {
        title: "Monitoreo Proactivo",
        description: "Sistemas de alerta temprana que detectan anomalías antes de que afecten a tu negocio. Dashboards en tiempo real de la salud de tu infraestructura.",
        icon: Eye
      }
    ],
    comparison: [
      { feature: "Disponibilidad", others: "Caídas frecuentes", quantium: "99.99% SLA" },
      { feature: "Respuesta", others: "Horas o días", quantium: "< 15 minutos" },
      { feature: "Seguridad", others: "Reactiva (post-hackeo)", quantium: "Proactiva (prevención)" },
      { feature: "Costos", others: "Ocultos y variables", quantium: "Transparentes y optimizados" }
    ],
    process: [
      { title: "Auditoría", desc: "Evaluamos tu infraestructura actual y puntos críticos" },
      { title: "Planificación", desc: "Diseñamos la arquitectura objetivo y plan de migración" },
      { title: "Implementación", desc: "Ejecutamos la migración con mínimo tiempo de inactividad" },
      { title: "Optimización", desc: "Ajustamos rendimiento, costos y seguridad" },
      { title: "Monitoreo", desc: "Supervisión continua y mantenimiento proactivo" }
    ],
    testimonial: {
      text: "La migración a la nube fue impecable. Nuestro rendimiento mejoró un 300% y redujimos costos operativos significativamente.",
      author: "Ana Torres",
      role: "Gerente de Operaciones, RetailCorp"
    }
  },
  support: {
    icon: Headphones,
    image: "https://images.unsplash.com/photo-1558494943-c8420f912134?q=80&w=1200&auto=format&fit=crop",
    color: "from-orange-600 to-red-600",
    stats: [
      { label: "Tiempo Respuesta", value: "<15min" },
      { label: "Resolución Primer Contacto", value: "85%" },
      { label: "Disponibilidad", value: "24/7" }
    ],
    details: [
      {
        title: "Soporte 24/7/365",
        description: "Tu negocio no duerme, nosotros tampoco. Equipo de guardia siempre disponible para resolver incidencias críticas en cualquier momento.",
        icon: Clock
      },
      {
        title: "Mesa de Ayuda Multicanal",
        description: "Atención vía teléfono, email, chat y portal de tickets. Centralizamos todas las solicitudes para un seguimiento eficiente y transparente.",
        icon: MessageCircle
      },
      {
        title: "Mantenimiento Preventivo",
        description: "Revisiones periódicas y actualizaciones programadas para evitar fallos. Mantenemos tus sistemas al día y seguros.",
        icon: Tool
      }
    ],
    comparison: [
      { feature: "Horario", others: "Lunes a Viernes 9-5", quantium: "24/7/365 Real" },
      { feature: "Canales", others: "Solo email", quantium: "Teléfono, Chat, Email, Portal" },
      { feature: "Personal", others: "Call center genérico", quantium: "Ingenieros certificados" },
      { feature: "Enfoque", others: "Apagar incendios", quantium: "Prevenir incendios" }
    ],
    process: [
      { title: "Diagnóstico", desc: "Identificamos los problemas y necesidades de soporte" },
      { title: "Onboarding", desc: "Configuramos canales, accesos y documentación" },
      { title: "Activación", desc: "Iniciamos monitoreo y atención de incidencias" },
      { title: "Mejora", desc: "Reportes periódicos y optimización de procesos" },
      { title: "Evolución", desc: "Adaptamos el servicio a medida que creces" }
    ],
    testimonial: {
      text: "Saber que tenemos a alguien cuidando nuestros sistemas 24/7 nos da una tranquilidad invaluable. Su respuesta es siempre inmediata.",
      author: "Roberto Gómez",
      role: "CEO, TechSolutions"
    }
  },
  install: {
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    color: "from-indigo-600 to-purple-600",
    stats: [
      { label: "Instalaciones Exitosas", value: "2k+" },
      { label: "Certificaciones", value: "50+" },
      { label: "Garantía", value: "1 Año" }
    ],
    details: [
      {
        title: "Cableado Estructurado",
        description: "Diseño e implementación de redes de voz y datos certificadas. Categoría 6, 6A y fibra óptica para máxima velocidad y fiabilidad.",
        icon: Network
      },
      {
        title: "Centros de Datos",
        description: "Adecuación física de espacios para servidores: climatización de precisión, energía ininterrumpida (UPS) y control de acceso.",
        icon: Server
      },
      {
        title: "Sistemas de Seguridad",
        description: "Instalación de cámaras CCTV, controles de acceso biométricos y alarmas integradas. Protegemos tus activos físicos y digitales.",
        icon: Lock
      }
    ],
    comparison: [
      { feature: "Materiales", others: "Genéricos baratos", quantium: "Certificados Premium" },
      { feature: "Estética", others: "Cables desordenados", quantium: "Peinado y etiquetado perfecto" },
      { feature: "Certificación", others: "No incluida", quantium: "Informe completo con Fluke" },
      { feature: "Garantía", others: "3 meses", quantium: "1 Año extendible" }
    ],
    process: [
      { title: "Levantamiento", desc: "Visitamos el sitio y evaluamos requerimientos físicos" },
      { title: "Diseño", desc: "Planos técnicos y selección de materiales certificados" },
      { title: "Instalación", desc: "Ejecución profesional con mínima interrupción" },
      { title: "Certificación", desc: "Pruebas con equipos Fluke y documentación completa" },
      { title: "Entrega", desc: "Capacitación, garantía y soporte post-instalación" }
    ],
    testimonial: {
      text: "La calidad del cableado es impresionante. No solo funciona perfecto, sino que estéticamente es una obra de arte. Muy profesionales.",
      author: "Laura Sánchez",
      role: "Gerente de Infraestructura, EduCampus"
    }
  }
};

// Iconos adicionales necesarios
import { Cloud, Eye, Clock, MessageCircle, PenTool as Tool, Network, Lock } from "lucide-react";

export function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.1]);

  // Validar si el servicio existe
  const serviceKey = id as keyof typeof serviceData;
  const data = serviceData[serviceKey];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-dark text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Servicio no encontrado</h2>
          <Button onClick={() => navigate("/")}>Volver al inicio</Button>
        </div>
      </div>
    );
  }

  const Icon = data.icon;

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Hero Section con Parallax */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <ServiceImage 
            src={data.image} 
            alt={t(`services.${serviceKey}.title`)} 
            className="w-full h-full object-cover"
            serviceType={serviceKey}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-brand-dark/30" />
        </motion.div>

        <div className="container mx-auto px-4 relative z-10 pt-20">
          <Button 
            variant="ghost" 
            className="mb-8 text-white/80 hover:text-white pl-0 hover:bg-white/10 "
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Volver a Servicios
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10  border border-white/20 text-white mb-6`}>
              <Icon className="w-5 h-5" />
              <span className="font-medium uppercase tracking-wider text-sm">Servicio Profesional</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
              {t(`services.${serviceKey}.title`)}
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl leading-relaxed mb-8">
              {t(`services.${serviceKey}.description`)}
            </p>

            <div className="flex gap-4">
              <Button 
                size="lg"
                className={`bg-gradient-to-r ${data.color} hover:shadow-lg hover:shadow-brand-primary/25 border-none`}
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Solicitar Cotización
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-white/20 hover:bg-white/10 text-white "
                onClick={() => document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Saber más
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section Floating */}
      <div className="container mx-auto px-4 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 bg-white/5  border border-white/10 rounded-2xl p-8 shadow-2xl">
          {data.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="text-center relative md:border-r md:border-white/10 last:border-0"
            >
              <div className={`text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${data.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-brand-muted font-medium uppercase tracking-wider text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Details Section */}
      <SectionWrapper id="details" className="py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                ¿Por qué elegir nuestro servicio?
              </h2>
              <p className="text-brand-muted text-lg">
                Combinamos experiencia técnica, metodología ágil y un enfoque centrado en el cliente para entregar resultados que superan expectativas.
              </p>
            </div>

            <div className="space-y-8">
              {data.details.map((detail, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group"
                >
                  <div className="flex gap-6">
                    <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-brand-primary/50 group-hover:bg-brand-primary/10 transition-all duration-300`}>
                      <detail.icon className="w-7 h-7 text-brand-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-primary transition-colors">{detail.title}</h3>
                      <p className="text-brand-muted leading-relaxed">{detail.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 ">
              <h3 className="text-2xl font-bold text-white mb-6">Características Principales</h3>
              <ul className="space-y-4">
                {(t(`services.${serviceKey}.features`, { returnObjects: true }) as string[]).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-brand-muted group">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:text-white transition-colors">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Testimonial Card */}
            <div className="bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 text-white/10">
                <MessageCircle className="w-24 h-24" />
              </div>
              <p className="text-xl text-white italic mb-6 relative z-10">"{data.testimonial.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                  {data.testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-bold">{data.testimonial.author}</div>
                  <div className="text-white/60 text-sm">{data.testimonial.role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Process Section */}
      <SectionWrapper className="py-20 bg-black/30 border-y border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Nuestro Proceso de Trabajo</h2>
          <p className="text-brand-muted">Metodología probada para garantizar el éxito de tu proyecto paso a paso.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0" />
          
          {data.process.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              className="relative z-10 text-center group"
            >
              <div className={`w-12 h-12 mx-auto rounded-full bg-brand-dark border-2 border-brand-primary flex items-center justify-center text-white font-bold mb-4 group-hover:scale-110 group-hover:bg-brand-primary transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.3)]`}>
                {idx + 1}
              </div>
              <h3 className="text-white font-bold mb-2">{step.title}</h3>
              <p className="text-brand-muted text-sm px-2">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <section id="contact-form" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            ¿Listo para transformar tu negocio?
          </h2>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto mb-10">
            No dejes pasar más tiempo. Contáctanos hoy y recibe una consultoría inicial gratuita para evaluar tus necesidades.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              size="lg"
              className="w-full sm:w-auto text-lg px-8 py-6 bg-white text-black hover:bg-brand-gray hover:text-white transition-colors"
              onClick={() => navigate("/contact")}
            >
              Agendar Consultoría
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-lg px-8 py-6 border-white/20 hover:bg-white/10"
              onClick={() => window.open('https://wa.me/50760000000', '_blank')}
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Chat Directo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
