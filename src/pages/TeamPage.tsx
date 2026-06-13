import { motion } from "framer-motion";
import {
  Linkedin,
  Mail,
  Github,
  Crown,
  Code,
  Shield,
  Headphones,
  ArrowRight,
  Award,
  Users,
  Rocket,
  Target,
  Heart,
  Zap,
  CheckCircle2,
  Quote,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import { Button } from "../components/ui/Button";
import { useState } from "react";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "Edgar Ng",
    role: "Founder & CEO",
    badge: "Fundador",
    badgeIcon: Crown,
    bio: "Ingeniero en Sistemas con amplia experiencia en infraestructura empresarial, transformación digital y liderazgo tecnológico.",
    longBio:
      "Como fundador de Quantium Crew, he dedicado mi carrera a ayudar a empresas a transformar su infraestructura tecnológica. Mi enfoque combina expertise técnico profundo con visión estratégica, permitiendo a las organizaciones alcanzar su máximo potencial digital.",
    expertise: [
      "Arquitectura de Infraestructura Empresarial",
      "Transformación Digital",
      "Cloud Computing & DevOps",
      "Seguridad Cibernética",
      "Liderazgo Tecnológico",
      "Estrategia IT",
    ],
    achievements: [
      { value: "50+", label: "Empresas Transformadas" },
      { value: "10+", label: "Años de Experiencia" },
      { value: "99.9%", label: "Uptime Garantizado" },
      { value: "15+", label: "Certificaciones" },
    ],
    certifications: [
      "AWS Solutions Architect",
      "Azure Administrator",
      "CompTIA Security+",
      "ITIL Foundation",
    ],
    quote:
      "La tecnología debe ser un motor de crecimiento, no una barrera. Nuestro trabajo es convertir la complejidad en simplicidad.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face",
    color: "from-brand-primary to-cyan-400",
    bgColor: "brand-primary",
    social: {
      linkedin: "https://linkedin.com/in/edgarng",
      github: "https://github.com/QUANTIUM-CREW-S-A",
      email: "edgar@quantiumcrew.com",
    },
  },
  {
    name: "Ellis Rodriguez",
    role: "CTO",
    badge: "Tech Lead",
    badgeIcon: Code,
    bio: "Líder técnico visionario con profunda experiencia en desarrollo de software, arquitectura de sistemas y tecnologías emergentes.",
    longBio:
      "Como CTO de Quantium Crew, mi misión es asegurar que utilicemos las tecnologías más avanzadas y eficientes para resolver los desafíos de nuestros clientes. Me especializo en construir equipos de alto rendimiento y sistemas escalables que perduran en el tiempo.",
    expertise: [
      "Arquitectura de Software Escalable",
      "Full Stack Development",
      "Inteligencia Artificial & ML",
      "Microservicios & API Design",
      "Agile & Scrum Leadership",
      "Performance Optimization",
    ],
    achievements: [
      { value: "80+", label: "Proyectos Liderados" },
      { value: "8+", label: "Años de Experiencia" },
      { value: "99.9%", label: "Calidad de Entrega" },
      { value: "20+", label: "Tecnologías Dominadas" },
    ],
    certifications: [
      "Google Cloud Professional",
      "Kubernetes Administrator",
      "Scrum Master Certified",
      "MongoDB Developer",
    ],
    quote:
      "El código es poesía cuando se escribe con propósito. Cada línea debe aportar valor al negocio del cliente.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=600&fit=crop&crop=face",
    color: "from-brand-secondary to-purple-400",
    bgColor: "brand-secondary",
    social: {
      linkedin: "https://linkedin.com/in/ellisrodriguez",
      github: "https://github.com/QUANTIUM-CREW-S-A",
      email: "ellis@quantiumcrew.com",
    },
  },
  {
    name: "Diego Martínez",
    role: "Director de Ingeniería",
    badge: "Infraestructura",
    badgeIcon: Shield,
    bio: "Especialista en DevOps y automatización. Experto en eficiencia operativa e infraestructura empresarial de alta disponibilidad.",
    longBio:
      "Con más de 12 años de experiencia en infraestructura, mi enfoque es garantizar que cada sistema que diseñamos sea resiliente, escalable y seguro. Creo firmemente en la automatización como pilar fundamental de la excelencia operativa.",
    expertise: [
      "DevOps & CI/CD Pipelines",
      "Automatización de Infraestructura",
      "Infraestructura Cloud (AWS, Azure, GCP)",
      "Monitoreo & Observabilidad",
      "Disaster Recovery",
      "Networking Empresarial",
    ],
    achievements: [
      { value: "120+", label: "Servidores Gestionados" },
      { value: "12+", label: "Años de Experiencia" },
      { value: "99.99%", label: "Uptime Logrado" },
      { value: "500+", label: "Pipelines Creados" },
    ],
    certifications: [
      "AWS DevOps Engineer",
      "Terraform Associate",
      "Docker Certified",
      "Linux Professional",
    ],
    quote:
      "La mejor infraestructura es la que funciona tan bien que nadie se da cuenta de que existe.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop&crop=face",
    color: "from-green-400 to-emerald-500",
    bgColor: "green-500",
    social: {
      linkedin: "#",
      github: "https://github.com/QUANTIUM-CREW-S-A",
      email: "diego@quantiumcrew.com",
    },
  },
  {
    name: "Carla González",
    role: "Lead Developer",
    badge: "Desarrollo",
    badgeIcon: Headphones,
    bio: "Desarrolladora full-stack con expertise en React, Node.js y soluciones empresariales. Especializada en experiencias de usuario excepcionales.",
    longBio:
      "Mi pasión es crear interfaces que no solo se vean increíbles, sino que resuelvan problemas reales. Combino diseño centrado en el usuario con arquitectura de software robusta para entregar productos que los usuarios aman.",
    expertise: [
      "React & Next.js",
      "Node.js & Express",
      "UI/UX Design Systems",
      "API REST & GraphQL",
      "Testing & QA Automation",
      "Accesibilidad Web (WCAG)",
    ],
    achievements: [
      { value: "60+", label: "Aplicaciones Creadas" },
      { value: "7+", label: "Años de Experiencia" },
      { value: "99.9%", label: "Satisfacción Clientes" },
      { value: "10+", label: "Design Systems" },
    ],
    certifications: [
      "Meta Frontend Developer",
      "AWS Developer Associate",
      "UX Design Professional",
      "Accessibility Specialist",
    ],
    quote:
      "Una gran experiencia de usuario no es un lujo, es una necesidad. Cada pixel debe tener un propósito.",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=600&h=600&fit=crop&crop=face",
    color: "from-orange-400 to-red-500",
    bgColor: "orange-500",
    social: {
      linkedin: "#",
      github: "https://github.com/QUANTIUM-CREW-S-A",
      email: "carla@quantiumcrew.com",
    },
  },
];

const values = [
  {
    icon: Target,
    title: "Excelencia",
    description:
      "No nos conformamos con lo bueno. Cada proyecto es una oportunidad de superar las expectativas.",
    color: "from-brand-primary to-cyan-400",
  },
  {
    icon: Heart,
    title: "Compromiso",
    description:
      "Tu éxito es nuestro éxito. Nos involucramos profundamente con cada cliente y proyecto.",
    color: "from-brand-secondary to-purple-400",
  },
  {
    icon: Zap,
    title: "Innovación",
    description:
      "Adoptamos las tecnologías más avanzadas para ofrecer soluciones que marquen la diferencia.",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: Users,
    title: "Colaboración",
    description:
      "Trabajamos como extensión de tu equipo, con comunicación transparente y constante.",
    color: "from-orange-400 to-red-500",
  },
];

function MemberProfile({
  member,
  index,
}: {
  member: (typeof teamMembers)[0];
  index: number;
}) {
  const [activeTab, setActiveTab] = useState<
    "about" | "expertise" | "achievements"
  >("about");
  const BadgeIcon = member.badgeIcon;
  const isReversed = index % 2 === 1;

  return (
    <div>
      <div
        className={`relative grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 items-start`}
      >
        {/* Photo side */}
        <div
          className={`lg:col-span-5 ${isReversed ? "lg:order-2" : "lg:order-1"}`}
        >
          <div className="relative group">
            {/* Background glow (no blur) */}
            <div
              className={`absolute -inset-4 bg-gradient-to-br ${member.color} opacity-[0.06] rounded-3xl pointer-events-none`}
            />

            <div className="relative">
              {/* Main photo */}
              <div
                className={`relative rounded-2xl overflow-hidden border border-white/[0.08] aspect-[4/5]`}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />

                {/* Info overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${member.color} flex items-center justify-center`}
                    >
                      <BadgeIcon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/50 text-xs uppercase tracking-wider font-medium">
                      {member.badge}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <p
                    className={`text-sm font-semibold bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}
                  >
                    {member.role}
                  </p>
                </div>
              </div>

              {/* Social links floating */}
              <div
                className={`absolute top-4 ${isReversed ? "left-4" : "right-4"} flex flex-col gap-2`}
              >
                {[
                  { icon: Linkedin, href: member.social.linkedin },
                  { icon: Github, href: member.social.github },
                  {
                    icon: Mail,
                    href: `mailto:${member.social.email}`,
                  },
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: isReversed ? -10 : 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="w-10 h-10 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20 hover:border-white/20 transition-all duration-300"
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quote card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-4 bg-white/[0.02] border border-white/[0.06] rounded-xl p-5"
            >
              <Quote
                className={`w-5 h-5 mb-2 bg-gradient-to-r ${member.color} bg-clip-text`}
                style={{ color: "transparent", fill: "currentColor" }}
              />
              <p className="text-white/40 text-sm italic leading-relaxed">
                "{member.quote}"
              </p>
            </motion.div>
          </div>
        </div>

        {/* Content side */}
        <div
          className={`lg:col-span-7 ${isReversed ? "lg:order-1" : "lg:order-2"} mt-8 lg:mt-0`}
        >
          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {member.achievements.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + idx * 0.08 }}
                className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 text-center group hover:border-white/[0.12] transition-all duration-300"
              >
                <div
                  className={`text-xl md:text-2xl font-bold bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}
                >
                  {stat.value}
                </div>
                <div className="text-white/30 text-[10px] md:text-xs mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tab navigation */}
          <div className="flex gap-1 mb-6 bg-white/[0.02] border border-white/[0.06] rounded-xl p-1">
            {(
              [
                { key: "about", label: "Sobre mí", icon: Briefcase },
                {
                  key: "expertise",
                  label: "Expertise",
                  icon: GraduationCap,
                },
                { key: "achievements", label: "Certificaciones", icon: Award },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.key
                    ? "bg-white/[0.08] text-white border border-white/[0.1]"
                    : "text-white/30 hover:text-white/50"
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-8"
          >
            {activeTab === "about" && (
              <div className="space-y-4">
                <p className="text-white/60 leading-relaxed">{member.bio}</p>
                <p className="text-white/50 leading-relaxed">
                  {member.longBio}
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="md" className="group w-full sm:w-auto">
                      Conectar en LinkedIn
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                  <a href={`mailto:${member.social.email}`}>
                    <Button
                      variant="outline"
                      size="md"
                      className="group w-full sm:w-auto"
                    >
                      Contactar
                      <Mail className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </div>
            )}

            {activeTab === "expertise" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {member.expertise.map((skill, idx) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    className="flex items-center gap-3 group"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${member.color} flex items-center justify-center flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/60 text-sm group-hover:text-white/80 transition-colors">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "achievements" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {member.certifications.map((cert, idx) => (
                  <motion.div
                    key={cert}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.08 }}
                    className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl p-3.5 group hover:border-white/[0.12] transition-all"
                  >
                    <div
                      className={`w-9 h-9 rounded-lg bg-gradient-to-br ${member.color} flex items-center justify-center flex-shrink-0 opacity-80`}
                    >
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/60 text-sm font-medium group-hover:text-white/80 transition-colors">
                      {cert}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function TeamPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_30%,transparent_100%)]" />

        {/* Glows (radial gradient instead of blur) */}
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(0,212,255,0.07)_0%,transparent_60%)] rounded-full pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(139,92,246,0.07)_0%,transparent_60%)] rounded-full pointer-events-none" />

        <SectionWrapper className="pt-32 md:pt-40 pb-20 relative z-10">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-8"
            >
              <Users className="w-4 h-4 text-brand-primary" />
              <span className="text-brand-primary text-sm font-medium">
                Nuestro Equipo
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight"
            >
              Los expertos detrás de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                tu transformación digital
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-white/40 max-w-3xl mx-auto mb-12"
            >
              Un equipo multidisciplinario de profesionales apasionados por la
              tecnología, comprometidos con la excelencia y dedicados a impulsar
              el éxito de cada cliente.
            </motion.p>

            {/* Team avatars preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center justify-center gap-6 flex-wrap"
            >
              {teamMembers.map((member, idx) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl p-[2px] bg-gradient-to-br ${member.color} group-hover:shadow-lg group-hover:shadow-white/5 transition-shadow duration-300`}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full rounded-[14px] md:rounded-[18px] object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-white/60 text-xs font-medium">
                      {member.name.split(" ")[0]}
                    </p>
                    <p className="text-white/25 text-[10px]">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Aggregate stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto"
            >
              {[
                {
                  icon: Rocket,
                  value: "310+",
                  label: "Proyectos completados",
                },
                {
                  icon: Users,
                  value: "37+",
                  label: "Años combinados",
                },
                {
                  icon: Shield,
                  value: "99.9%",
                  label: "Uptime garantizado",
                },
                {
                  icon: Award,
                  value: "60+",
                  label: "Certificaciones",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-center group hover:border-white/[0.12] transition-colors"
                >
                  <stat.icon className="w-4 h-4 text-brand-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-xl md:text-2xl font-bold text-white mb-0.5">
                    {stat.value}
                  </div>
                  <div className="text-white/25 text-[10px] md:text-xs">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </SectionWrapper>
      </div>

      {/* Team Profiles */}
      <SectionWrapper className="py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 space-y-24 md:space-y-32">
          {teamMembers.map((member, index) => (
            <MemberProfile key={member.name} member={member} index={index} />
          ))}
        </div>
      </SectionWrapper>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </div>

      {/* Values Section */}
      <SectionWrapper className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle,rgba(139,92,246,0.04)_0%,transparent_60%)] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary text-sm font-medium mb-4">
              Cultura
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Lo que nos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                define
              </span>
            </h2>
            <p className="text-white/40 max-w-2xl mx-auto text-lg">
              Nuestros valores son la base de todo lo que hacemos y cómo lo
              hacemos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative"
              >
                <div className="relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.15] transition-all duration-500 h-full">
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${value.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl`}
                  />
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`}
                  >
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Mission Quote */}
      <SectionWrapper className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 md:p-12 text-center overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(0,212,255,0.06)_0%,transparent_70%)] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[radial-gradient(circle,rgba(139,92,246,0.06)_0%,transparent_70%)] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <Quote className="w-10 h-10 text-brand-primary/30 mx-auto mb-6" />
              <p className="text-xl md:text-2xl text-white/70 leading-relaxed mb-6 font-light italic">
                "Transformar la forma en que las empresas abordan la tecnología,
                creando soluciones que no solo resuelvan problemas actuales, sino
                que preparen a las organizaciones para el futuro digital."
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-brand-primary/40" />
                <span className="text-brand-primary text-sm font-medium">
                  Nuestra Misión — Quantium Crew
                </span>
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-brand-primary/40" />
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/[0.03] to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
              ¿Listo para trabajar con{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                nosotros
              </span>
              ?
            </h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto mb-10">
              Con nuestro equipo de expertos, tu empresa estará en las mejores
              manos. Conversemos sobre cómo podemos impulsar tu negocio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="group w-full sm:w-auto">
                  Iniciar conversación
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/testimonials">
                <Button
                  variant="outline"
                  size="lg"
                  className="group w-full sm:w-auto"
                >
                  Ver testimonios
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
}
