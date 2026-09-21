import { useParams, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  Server,
  Headphones,
  Wrench,
  CheckCircle2,
  Zap,
  BarChart3,
  Shield,
  Cloud,
  Eye,
  Clock,
  MessageCircle,
  PenTool as Tool,
  Network,
  Lock,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import { DivisionIcon } from "../components/ui/DivisionIcon";
import { RackGridBackground } from "../components/ui/RackGridBackground";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { cn } from "../lib/utils";
import { whatsappHref } from "../lib/company";
import { useSeo } from "../hooks/useSeo";

/**
 * Datos extendidos por division. Los textos cortos (title, description,
 * features) vienen de i18n y se reusan en Services.tsx; esto es contenido
 * exclusivo de la pagina de detalle.
 */
const serviceData = {
  dev: {
    icon: Code2,
    seo: "Desarrollo de software a medida en Panamá: sistemas internos, APIs, integraciones y automatización de procesos. Arquitectura que escala y seguridad desde el diseño.",
    stats: [
      { label: "Proyectos entregados", value: "500+" },
      { label: "Satisfacción", value: "99%" },
      { label: "Ingenieros", value: "25+" },
    ],
    details: [
      {
        title: "Desarrollo a medida",
        description:
          "Software y automatizaciones construidas sobre tu flujo de trabajo real, no sobre una plantilla. TypeScript, Python, Go o Rust según lo que el problema pida.",
        icon: Zap,
      },
      {
        title: "Arquitectura que escala",
        description:
          "Microservicios y despliegues cloud-native sobre AWS o Google Cloud, con Docker y Kubernetes cuando la carga lo justifica — no antes.",
        icon: BarChart3,
      },
      {
        title: "Seguridad por diseño",
        description:
          "Revisión de dependencias, control de acceso y cifrado desde el primer commit, no como parche posterior al lanzamiento.",
        icon: Shield,
      },
    ],
    comparison: [
      { feature: "Tiempo de entrega", others: "Fechas que se corren", quantium: "Cronograma fijado por contrato" },
      { feature: "Calidad de código", others: "Deuda técnica acumulada", quantium: "Code review en cada PR" },
      { feature: "Escalabilidad", others: "Reescritura a los 2 años", quantium: "Arquitectura cloud-native desde el día uno" },
      { feature: "Propiedad del código", others: "Licencias poco claras", quantium: "Repositorio 100% tuyo" },
    ],
    process: [
      { title: "Descubrimiento", desc: "Levantamos requerimientos con quienes van a usar el sistema, no solo con quien lo pidió" },
      { title: "Diseño", desc: "Arquitectura y prototipo navegable antes de escribir una línea de producción" },
      { title: "Desarrollo", desc: "Sprints cortos con entregas revisables, no un único lanzamiento a ciegas" },
      { title: "Pruebas", desc: "Tests automatizados y revisión de seguridad antes de cada release" },
      { title: "Lanzamiento", desc: "Despliegue, capacitación al equipo y ventana de soporte post-entrega" },
    ],
  },
  systems: {
    icon: Server,
    seo: "Servidores, redes e infraestructura híbrida para empresas en Panamá. Virtualización con VMware o Proxmox, monitoreo proactivo y migraciones por etapas sin detener tu operación.",
    stats: [
      { label: "Uptime garantizado", value: "99.99%" },
      { label: "Servidores gestionados", value: "1k+" },
      { label: "Incidentes prevenidos", value: "5k+" },
    ],
    details: [
      {
        title: "Infraestructura híbrida",
        description:
          "Combinamos nube pública (AWS, Google Cloud) con hardware propio cuando el costo o la latencia lo piden — sin dogma de \"todo a la nube\".",
        icon: Cloud,
      },
      {
        title: "Virtualización con VMware o Proxmox",
        description:
          "Consolidamos servidores físicos en clústeres virtualizados. Menos hardware, menos consumo, mismo rendimiento.",
        icon: Server,
      },
      {
        title: "Monitoreo proactivo",
        description:
          "Alertas antes de que el problema llegue al usuario, no un ticket después de la caída.",
        icon: Eye,
      },
    ],
    comparison: [
      { feature: "Disponibilidad", others: "Caídas frecuentes sin aviso", quantium: "99.99% con SLA firmado" },
      { feature: "Tiempo de respuesta", others: "Horas o días", quantium: "Menos de 15 minutos" },
      { feature: "Seguridad", others: "Reactiva, después del incidente", quantium: "Parcheo y hardening proactivo" },
      { feature: "Costos", others: "Facturas variables sin explicación", quantium: "Presupuesto fijo y trazable" },
    ],
    process: [
      { title: "Auditoría", desc: "Relevamos tu infraestructura actual y marcamos los puntos críticos" },
      { title: "Planificación", desc: "Diseñamos la arquitectura objetivo y el plan de migración" },
      { title: "Implementación", desc: "Migramos por etapas, con ventanas de mantenimiento acordadas" },
      { title: "Optimización", desc: "Ajustamos rendimiento y costo una vez estabilizado" },
      { title: "Monitoreo", desc: "Supervisión continua y mantenimiento preventivo" },
    ],
  },
  support: {
    icon: Headphones,
    seo: "Soporte TI gestionado en Panamá con guardia 24/7/365, mesa de ayuda multicanal y mantenimiento preventivo. Planes mensuales con SLA y reportes periódicos.",
    stats: [
      { label: "Tiempo de respuesta", value: "<15 min" },
      { label: "Resolución en 1er contacto", value: "85%" },
      { label: "Disponibilidad", value: "24/7" },
    ],
    details: [
      {
        title: "Guardia 24/7/365",
        description:
          "Un ingeniero real de guardia, no un buzón de voz. Incidentes críticos atendidos a cualquier hora.",
        icon: Clock,
      },
      {
        title: "Mesa de ayuda multicanal",
        description:
          "Teléfono, correo, chat y portal de tickets centralizados — un solo lugar para hacer seguimiento, sin repetir el problema tres veces.",
        icon: MessageCircle,
      },
      {
        title: "Mantenimiento preventivo",
        description:
          "Revisiones y actualizaciones programadas para que el problema no llegue a ser incidente.",
        icon: Tool,
      },
    ],
    comparison: [
      { feature: "Horario", others: "Lunes a viernes, 9 a 5", quantium: "24/7/365 con guardia real" },
      { feature: "Canales", others: "Solo correo", quantium: "Teléfono, chat, correo y portal" },
      { feature: "Personal", others: "Call center genérico", quantium: "Ingenieros certificados por división" },
      { feature: "Enfoque", others: "Reactivo: apagar incendios", quantium: "Preventivo: evitar el incendio" },
    ],
    process: [
      { title: "Diagnóstico", desc: "Identificamos los problemas y necesidades reales de soporte" },
      { title: "Onboarding", desc: "Configuramos canales, accesos y documentación de tu entorno" },
      { title: "Activación", desc: "Arrancamos monitoreo y atención de incidencias" },
      { title: "Reportes", desc: "Informes periódicos de incidencias, tendencias y mejoras" },
      { title: "Evolución", desc: "Ajustamos el plan de soporte a medida que tu operación crece" },
    ],
  },
  install: {
    icon: Wrench,
    seo: "Cableado estructurado, salas de servidores y seguridad física en Panamá. Instalación certificada con equipo Fluke, planos técnicos y documentación completa de entrega.",
    stats: [
      { label: "Instalaciones exitosas", value: "2k+" },
      { label: "Técnicos certificados", value: "50+" },
      { label: "Garantía", value: "1 año" },
    ],
    details: [
      {
        title: "Cableado estructurado",
        description:
          "Redes de voz y datos certificadas en Categoría 6, 6A y fibra óptica, con etiquetado y planos as-built.",
        icon: Network,
      },
      {
        title: "Salas de servidores",
        description:
          "Adecuación física del espacio: climatización, energía ininterrumpida (UPS) y control de acceso.",
        icon: Server,
      },
      {
        title: "Seguridad física",
        description:
          "Cámaras CCTV, control de acceso biométrico y alarmas integradas a un mismo panel de monitoreo.",
        icon: Lock,
      },
    ],
    comparison: [
      { feature: "Materiales", others: "Genéricos, sin certificar", quantium: "Certificados de fábrica" },
      { feature: "Terminación", others: "Cableado sin orden ni etiqueta", quantium: "Peinado, etiquetado y documentado" },
      { feature: "Certificación", others: "No incluida", quantium: "Informe de pruebas con equipo Fluke" },
      { feature: "Garantía", others: "3 meses", quantium: "1 año, extendible" },
    ],
    process: [
      { title: "Levantamiento", desc: "Visitamos el sitio y relevamos los requerimientos físicos" },
      { title: "Diseño", desc: "Planos técnicos y selección de materiales certificados" },
      { title: "Instalación", desc: "Ejecución profesional con mínima interrupción a tu operación" },
      { title: "Certificación", desc: "Pruebas con equipo Fluke y entrega de documentación completa" },
      { title: "Entrega", desc: "Capacitación al equipo, garantía y soporte post-instalación" },
    ],
  },
} satisfies Record<
  string,
  {
    icon: typeof Code2;
    seo: string;
    stats: { label: string; value: string }[];
    details: { title: string; description: string; icon: typeof Code2 }[];
    comparison: { feature: string; others: string; quantium: string }[];
    process: { title: string; desc: string }[];
  }
>;

export function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  const serviceKey = id as keyof typeof serviceData;
  const data = serviceData[serviceKey];

  useSeo({
    title: data
      ? `${t(`services.${serviceKey}.title`)} | Quantium Crew Panamá`
      : "Servicio no encontrado | Quantium Crew",
    description: data
      ? data.seo
      : "El servicio solicitado no está disponible.",
    path: `/services/${id ?? ""}`,
    noindex: !data,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-rack-paper text-rack-ink">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">Servicio no encontrado</h2>
          <Button onClick={() => navigate("/")}>Volver al inicio</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rack-paper">
      {/* Encabezado: el diagrama de la division reemplaza a la foto de stock */}
      <SectionWrapper className="relative overflow-hidden border-b border-rack-rule pb-16 pt-32 md:pb-20 md:pt-40">
        <RackGridBackground />

        <div className="container relative z-10 mx-auto grid grid-cols-1 items-center gap-12 px-4 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <Button
              variant="ghost"
              className="mb-8 pl-0 text-rack-graph hover:bg-transparent hover:text-rack-ink"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a servicios
            </Button>

            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="rack-label mb-5">Divisiones &middot; Quantium Crew</p>

              <h1 className="rack-display text-4xl text-rack-ink sm:text-5xl md:text-6xl">
                {t(`services.${serviceKey}.title`)}
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-rack-graph">
                {t(`services.${serviceKey}.description`)}
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button size="lg" onClick={() => navigate("/contact")}>
                  Solicitar cotización
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => document.getElementById("details")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Ver detalle
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Glifo de la division, ampliado, como pieza de firma */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="hidden items-center justify-center lg:flex"
          >
            <div className="rack-panel flex h-72 w-72 items-center justify-center">
              <DivisionIcon id={serviceKey} className="h-32 w-32 text-rack-ink" />
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Placa de cifras, mismo lenguaje que Stats.tsx */}
      <div className="container relative z-10 mx-auto -mt-px px-4">
        <div className="rack-panel mx-auto max-w-4xl">
          <div className="flex items-center justify-between border-b border-rack-rule px-6 py-3.5 sm:px-8">
            <p className="rack-label">Placa de características</p>
            <p className="rack-label hidden sm:block">{serviceKey.toUpperCase()}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {data.stats.map((stat, idx) => (
              <div
                key={stat.label}
                className={cn(
                  "border-rack-rule px-6 py-7 sm:px-8",
                  idx > 0 && "border-t sm:border-l sm:border-t-0"
                )}
              >
                <p className="rack-display text-4xl text-rack-ink">{stat.value}</p>
                <p className="mt-2 font-sans text-sm font-medium text-rack-ink">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detalle + caracteristicas + comparativa */}
      <SectionWrapper id="details" className="py-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
          <div className="space-y-12">
            <div>
              <h2 className="rack-display text-3xl text-rack-ink sm:text-4xl">
                Cómo trabajamos esta división
              </h2>
            </div>

            <div className="space-y-8">
              {data.details.map((detail) => (
                <motion.div
                  key={detail.title}
                  initial={reduce ? undefined : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4 }}
                  className="group flex gap-5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-rack-rule bg-rack-sheet transition-colors group-hover:border-rack-edge">
                    <detail.icon className="h-5 w-5 text-rack-brand" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-rack-ink">{detail.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-rack-graph">{detail.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {/* Caracteristicas: la lista breve ya usada en Services.tsx */}
            <div className="rack-panel p-8">
              <h3 className="rack-label mb-5">Incluye</h3>
              <ul className="space-y-3.5">
                {(t(`services.${serviceKey}.features`, { returnObjects: true }) as string[]).map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-rack-graph">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-rack-link" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Comparativa: dato real de posicionamiento, no una cita inventada */}
            <div className="rack-panel overflow-hidden">
              <h3 className="rack-label border-b border-rack-rule px-6 py-3.5 sm:px-8">
                Quantium Crew vs. lo genérico
              </h3>
              <div className="divide-y divide-rack-rule">
                {data.comparison.map((row) => (
                  <div key={row.feature} className="grid grid-cols-1 gap-1 px-6 py-4 sm:grid-cols-[9rem_1fr] sm:gap-4 sm:px-8">
                    <p className="rack-label sm:pt-0.5">{row.feature}</p>
                    <div className="space-y-1 text-sm">
                      <p className="text-rack-graph/70 line-through decoration-rack-rule">{row.others}</p>
                      <p className="font-medium text-rack-ink">{row.quantium}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Proceso: mismo patron numerico que el resto del sitio, sin brillos morados */}
      <SectionWrapper className="border-y border-rack-rule bg-rack-paper py-20">
        <div className="mb-14 max-w-2xl">
          <p className="rack-label mb-4">Cómo arranca el trabajo</p>
          <h2 className="rack-display text-3xl text-rack-ink sm:text-4xl">Nuestro proceso</h2>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {data.process.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={reduce ? undefined : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
            >
              <span className="font-mono text-xs text-rack-brand">{String(idx + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 font-bold text-rack-ink">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-rack-graph">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Cierre */}
      <SectionWrapper className="py-24 text-center">
        <h2 className="rack-display mx-auto max-w-2xl text-3xl text-rack-ink sm:text-4xl">
          ¿Arrancamos con {t(`services.${serviceKey}.title`)}?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-rack-graph">
          Cuéntanos qué tienes hoy y qué te está costando dinero. Respondemos en menos de 24&nbsp;h hábiles.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" onClick={() => navigate("/contact")}>
            Solicitar el diagnóstico
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() =>
              window.open(
                whatsappHref(`Hola, me interesa ${t(`services.${serviceKey}.title`)}.`),
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            Escribir por WhatsApp
          </Button>
        </div>
      </SectionWrapper>
    </div>
  );
}
