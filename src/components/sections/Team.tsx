import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail, Github, Globe } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { useTranslation } from "react-i18next";

const team = [
  {
    name: "Edgar Ng",
    role: "Founder & CEO",
    bio: "Ingeniero en Sistemas con amplia experiencia en infraestructura empresarial, transformación digital y liderazgo tecnológico. Apasionado por crear soluciones innovadoras que impulsen el crecimiento empresarial.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    social: {
      linkedin: "https://linkedin.com/in/edgarng",
      twitter: "https://twitter.com/edgarng",
      email: "edgar@quantiumcrew.com",
      github: "https://github.com/QUANTIUM-CREW-S-A",
      website: "https://quantiumcrew.com"
    }
  },
  {
    name: "Sofía López",
    role: "CTO",
    bio: "Experta en arquitectura de software y cloud computing. Líder en soluciones escalables y seguridad empresarial con más de 10 años de experiencia en tecnologías de vanguardia.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "sofia@quantiumcrew.com",
      github: "https://github.com/QUANTIUM-CREW-S-A",
      website: "#"
    }
  },
  {
    name: "Diego Martínez",
    role: "Director de Ingeniería",
    bio: "Especialista en DevOps y automatización. Apasionado por la eficiencia operativa y la innovación tecnológica, con expertise en infraestructura empresarial y desarrollo ágil.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "diego@quantiumcrew.com",
      github: "https://github.com/QUANTIUM-CREW-S-A",
      website: "#"
    }
  },
  {
    name: "Carla González",
    role: "Lead Developer",
    bio: "Desarrolladora full-stack con expertise en React, Node.js y soluciones empresariales complejas. Especializada en crear experiencias de usuario excepcionales.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=300&h=300&fit=crop&crop=face",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "carla@quantiumcrew.com",
      github: "https://github.com/QUANTIUM-CREW-S-A",
      website: "#"
    }
  }
];

export function Team() {
  const { t } = useTranslation();

  return (
    <SectionWrapper className="bg-brand-dark py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            {t("team.title", "The Team Behind the Magic")}
          </h2>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto">
            {t("team.subtitle", "Passionate professionals who transform ideas into cutting-edge technology solutions")}
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Card */}
              <div className="bg-brand-gray/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-brand-primary/30 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-brand-primary/10">
                {/* Image */}
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-brand-primary/30 group-hover:border-brand-primary transition-colors duration-300">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 group-hover:scale-110"></div>
                </div>

                {/* Info */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-brand-primary font-medium mb-4">{member.role}</p>
                  <p className="text-brand-muted text-sm leading-relaxed mb-6">{member.bio}</p>

                  {/* Social Links */}
                  <div className="flex justify-center gap-3 flex-wrap">
                    <a
                      href={member.social.linkedin}
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-primary hover:text-black flex items-center justify-center transition-colors duration-200"
                      aria-label="LinkedIn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-primary hover:text-black flex items-center justify-center transition-colors duration-200"
                      aria-label="Twitter"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a
                      href={member.social.github}
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-primary hover:text-black flex items-center justify-center transition-colors duration-200"
                      aria-label="GitHub"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={member.social.website}
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-primary hover:text-black flex items-center justify-center transition-colors duration-200"
                      aria-label="Website"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                    <a
                      href={`mailto:${member.social.email}`}
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-primary hover:text-black flex items-center justify-center transition-colors duration-200"
                      aria-label="Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-brand-muted mb-6">
            {t("team.cta", "Want to join our team of experts?")}
          </p>
          <div className="inline-flex items-center gap-2 text-brand-primary font-medium">
            <span>{t("team.cta_subtitle", "We're hiring exceptional talent")}</span>
            <span className="animate-pulse">→</span>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}