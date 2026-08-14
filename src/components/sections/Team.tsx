import { motion } from "framer-motion";
import { Linkedin, Mail, Github, Crown, Code, Shield, Headphones, ArrowRight, Award, Users } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const team = [
  {
    name: "Edgar Ng",
    role: "Founder & CEO",
    badge: "Fundador",
    badgeIcon: Crown,
    bio: "Ingeniero en Sistemas con amplia experiencia en infraestructura empresarial, transformación digital y liderazgo tecnológico.",
    skills: ["Cloud Architecture", "Ciberseguridad", "Estrategia IT", "Liderazgo"],
    stats: { projects: "50+", experience: "10+", uptime: "99.9%" },
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    color: "from-brand-primary to-cyan-400",
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
    skills: ["Full Stack Dev", "IA & Machine Learning", "Microservicios", "DevOps"],
    stats: { projects: "80+", experience: "8+", uptime: "99.9%" },
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
    color: "from-brand-secondary to-purple-400",
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
    skills: ["DevOps", "Automatización", "Infra Cloud", "Monitoreo"],
    stats: { projects: "120+", experience: "12+", uptime: "99.99%" },
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    color: "from-green-400 to-emerald-500",
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
    skills: ["React & Next.js", "Node.js", "UI/UX Design", "APIs"],
    stats: { projects: "60+", experience: "7+", uptime: "99.9%" },
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400&h=400&fit=crop&crop=face",
    color: "from-orange-400 to-red-500",
    social: {
      linkedin: "#",
      github: "https://github.com/QUANTIUM-CREW-S-A",
      email: "carla@quantiumcrew.com",
    },
  },
];

function MemberCard({ member, index }: { member: typeof team[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const BadgeIcon = member.badgeIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="relative bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.15] transition-all duration-500">
        {/* Top gradient accent */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${member.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        {/* Glow effect on hover */}
        <motion.div
          animate={{ opacity: isHovered ? 0.08 : 0 }}
          className={`absolute inset-0 bg-gradient-to-br ${member.color} pointer-events-none`}
        />

        <div className="relative p-6">
          {/* Header: Photo + Info */}
          <div className="flex items-start gap-5 mb-5">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className={`w-20 h-20 rounded-2xl p-[2px] bg-gradient-to-br ${member.color}`}>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full rounded-[14px] object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              {/* Badge */}
              <div className={`absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-lg bg-gradient-to-br ${member.color} flex items-center justify-center shadow-lg`}>
                <BadgeIcon className="w-3.5 h-3.5 text-rack-ink" />
              </div>
            </div>

            {/* Name + Role */}
            <div className="flex-1 min-w-0 pt-1">
              <h3 className="text-lg font-bold text-rack-ink mb-0.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 transition-all">
                {member.name}
              </h3>
              <p className={`text-sm font-medium bg-gradient-to-r ${member.color} bg-clip-text text-transparent mb-2`}>
                {member.role}
              </p>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/[0.04] border border-white/[0.06] rounded-md text-rack-ink/30 text-[10px] uppercase tracking-wider">
                <BadgeIcon className="w-2.5 h-2.5" />
                {member.badge}
              </span>
            </div>
          </div>

          {/* Bio */}
          <p className="text-rack-ink/40 text-sm leading-relaxed mb-5">
            {member.bio}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {member.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 bg-white/[0.03] border border-white/[0.06] rounded-lg text-rack-ink/50 text-xs group-hover:border-white/[0.12] group-hover:text-rack-ink/60 transition-all duration-300"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mb-5 py-4 border-t border-b border-white/[0.04]">
            <div className="text-center">
              <div className={`text-lg font-bold bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}>
                {member.stats.projects}
              </div>
              <div className="text-rack-ink/25 text-[10px] uppercase tracking-wider">Proyectos</div>
            </div>
            <div className="text-center">
              <div className={`text-lg font-bold bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}>
                {member.stats.experience}
              </div>
              <div className="text-rack-ink/25 text-[10px] uppercase tracking-wider">Años exp.</div>
            </div>
            <div className="text-center">
              <div className={`text-lg font-bold bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}>
                {member.stats.uptime}
              </div>
              <div className="text-rack-ink/25 text-[10px] uppercase tracking-wider">Uptime</div>
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-2">
            {[
              { icon: Linkedin, href: member.social.linkedin },
              { icon: Github, href: member.social.github },
              { icon: Mail, href: `mailto:${member.social.email}` },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-rack-ink/30 hover:text-rack-ink hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Team() {
  const navigate = useNavigate();

  return (
    <SectionWrapper className="bg-rack-paper py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[radial-gradient(circle,rgba(0,212,255,0.04)_0%,transparent_60%)] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-secondary/10 border border-brand-secondary/30 mb-6">
            <Users className="w-4 h-4 text-brand-secondary" />
            <span className="text-brand-secondary text-sm font-medium">Nuestro Equipo</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-bold text-rack-ink mb-4">
            Las personas detrás de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
              tu éxito
            </span>
          </h2>
          <p className="text-rack-graph max-w-2xl mx-auto text-lg">
            Un equipo de expertos apasionados por la tecnología, comprometidos con la excelencia y dedicados a transformar tu negocio
          </p>
        </motion.div>

        {/* Aggregate stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {[
            { icon: Award, value: "310+", label: "Proyectos completados" },
            { icon: Users, value: "37+", label: "Años de experiencia combinada" },
            { icon: Shield, value: "99.9%", label: "Uptime garantizado" },
            { icon: Crown, value: "4", label: "Expertos dedicados" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 text-center group hover:border-white/[0.12] transition-colors"
            >
              <stat.icon className="w-5 h-5 text-rack-brand mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-bold text-rack-ink mb-1">{stat.value}</div>
              <div className="text-rack-ink/30 text-xs">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((member, index) => (
            <MemberCard key={member.name} member={member} index={index} />
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
          <Button
            size="lg"
            variant="outline"
            className="group"
            onClick={() => navigate("/team")}
          >
            Conoce más sobre el equipo
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
