import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail, Github, Globe, Crown, Sparkles, ArrowRight, Code, Server } from "lucide-react";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useTranslation } from "react-i18next";

export function TeamPage() {
  const { t } = useTranslation();

  const teamMembers = [
    {
      name: "Edgar Ng",
      role: "Founder & CEO",
      bio: "Ingeniero en Sistemas con amplia experiencia en infraestructura empresarial, transformación digital y liderazgo tecnológico. Apasionado por crear soluciones innovadoras que impulsen el crecimiento empresarial y la excelencia operativa.",
      longBio: "Como fundador de Quantium Crew, he dedicado mi carrera a ayudar a empresas a transformar su infraestructura tecnológica. Mi enfoque combina expertise técnico profundo con visión estratégica, permitiendo a las organizaciones alcanzar su máximo potencial digital.",
      expertise: [
        "Arquitectura de Infraestructura Empresarial",
        "Transformación Digital",
        "Cloud Computing & DevOps",
        "Seguridad Cibernética",
        "Liderazgo Tecnológico",
        "Estrategia IT"
      ],
      achievements: [
        "50+ Empresas Transformadas",
        "99.9% Uptime Garantizado",
        "Certificaciones en Cloud Computing",
        "Experto en Seguridad Empresarial"
      ],
      social: {
        linkedin: "https://linkedin.com/in/edgarng",
        twitter: "https://twitter.com/edgarng",
        email: "edgar@quantiumcrew.com",
        github: "https://github.com/QUANTIUM-CREW-S-A",
        website: "https://quantiumcrew.com"
      },
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      icon: Crown
    },
    {
      name: "Ellis Rodriguez",
      role: "CTO",
      bio: "Líder técnico visionario con profunda experiencia en desarrollo de software, arquitectura de sistemas y tecnologías emergentes. Encargado de dirigir la estrategia tecnológica y asegurar la excelencia técnica en cada proyecto.",
      longBio: "Como CTO de Quantium Crew, mi misión es asegurar que utilicemos las tecnologías más avanzadas y eficientes para resolver los desafíos de nuestros clientes. Me especializo en construir equipos de alto rendimiento y sistemas escalables que perduran en el tiempo.",
      expertise: [
        "Arquitectura de Software Escalable",
        "Full Stack Development",
        "Inteligencia Artificial & ML",
        "Microservicios & API Design",
        "Agile & Scrum Leadership",
        "Performance Optimization"
      ],
      achievements: [
        "Liderazgo de Equipos Técnicos",
        "Arquitecto de Soluciones Cloud",
        "Innovación Tecnológica Continua",
        "Mentoría de Desarrolladores"
      ],
      social: {
        linkedin: "https://linkedin.com/in/ellisrodriguez",
        twitter: "https://twitter.com/ellisrodriguez",
        email: "ellis@quantiumcrew.com",
        github: "https://github.com/QUANTIUM-CREW-S-A",
        website: "https://quantiumcrew.com"
      },
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
      icon: Code
    }
  ];

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Hero Section */}
      <SectionWrapper className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/20 border border-brand-primary/30 mb-6">
              <Crown className="w-4 h-4 text-brand-primary" />
              <span className="text-brand-primary text-sm font-medium">Liderazgo</span>
              <Sparkles className="w-4 h-4 text-brand-primary" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
              Conoce a nuestros <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                Líderes Visionarios
              </span>
            </h1>
            
            <p className="text-xl text-brand-muted max-w-3xl mx-auto">
              La visión y experiencia detrás de Quantium Crew, un equipo de expertos comprometidos con la excelencia tecnológica 
              y el éxito de nuestros clientes.
            </p>
          </motion.div>

          {/* Team Members */}
          <div className="space-y-20">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
                className="max-w-4xl mx-auto"
              >
                <Card className="bg-white/5 border-white/10 overflow-hidden">
                  <div className={`md:flex ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Image Section */}
                    <div className="md:w-1/3 p-8 flex flex-col items-center justify-center bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10">
                      <div className="relative mb-6">
                        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-brand-primary/30 shadow-2xl">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-brand-primary rounded-full p-3">
                          <member.icon className="w-6 h-6 text-black" />
                        </div>
                      </div>
                      
                      <h2 className="text-2xl font-bold text-white mb-2 text-center">{member.name}</h2>
                      <p className="text-brand-primary font-medium mb-6 text-center">{member.role}</p>
                      
                      {/* Social Links */}
                      <div className="flex gap-3 justify-center">
                        <a
                          href={member.social.linkedin}
                          className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-primary hover:text-black flex items-center justify-center transition-colors duration-200"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                        <a
                          href={member.social.twitter}
                          className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-primary hover:text-black flex items-center justify-center transition-colors duration-200"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Twitter className="w-4 h-4" />
                        </a>
                        <a
                          href={member.social.github}
                          className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-primary hover:text-black flex items-center justify-center transition-colors duration-200"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                        <a
                          href={`mailto:${member.social.email}`}
                          className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-primary hover:text-black flex items-center justify-center transition-colors duration-200"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="md:w-2/3 p-8">
                      <div className="mb-8">
                        <h3 className="text-2xl font-bold text-white mb-4">Sobre mí</h3>
                        <p className="text-brand-muted mb-4 leading-relaxed">{member.bio}</p>
                        <p className="text-brand-muted leading-relaxed">{member.longBio}</p>
                      </div>

                      {/* Expertise */}
                      <div className="mb-8">
                        <h4 className="text-xl font-bold text-white mb-4">Áreas de Expertise</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {member.expertise.map((skill, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                              <span className="text-brand-muted text-sm">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Achievements */}
                      <div className="mb-8">
                        <h4 className="text-xl font-bold text-white mb-4">Logros</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {member.achievements.map((achievement, idx) => (
                            <Card key={idx} className="bg-white/5 border-white/10 p-3">
                              <div className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-brand-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                                  <Sparkles className="w-3 h-3 text-brand-primary" />
                                </div>
                                <span className="text-white text-xs">{achievement}</span>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button 
                          size="lg" 
                          className="group"
                          onClick={() => window.open(member.social.linkedin, '_blank')}
                        >
                          Conectar en LinkedIn
                          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="lg" 
                          className="group"
                          onClick={() => window.location.href = `mailto:${member.social.email}`}
                        >
                          Contactar
                          <Mail className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Mission Section */}
      <SectionWrapper className="py-20 bg-brand-gray/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold text-white mb-8">
              Nuestra Misión
            </h2>
            <div className="text-xl text-brand-muted leading-relaxed space-y-4">
              <p>
                "Transformar la forma en que las empresas abordan la tecnología, 
                creando soluciones que no solo resuelvan problemas actuales, 
                sino que preparen a las organizaciones para el futuro digital."
              </p>
              <p className="text-brand-primary font-medium">
                - Quantium Crew Leadership
              </p>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Contact CTA */}
      <SectionWrapper className="py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-display font-bold text-white mb-6">
            ¿Listo para transformar tu tecnología?
          </h2>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto mb-8">
            Trabajemos juntos para llevar tu infraestructura tecnológica al siguiente nivel. 
            Con nuestra experiencia y respaldo, tu empresa estará en las mejores manos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="group"
              onClick={() => window.location.href = '/contact'}
            >
              Iniciar conversación
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="group"
              onClick={() => window.open("https://quantiumcrew.com", '_blank')}
            >
              Conocer más sobre Quantium Crew
              <Globe className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </SectionWrapper>
    </div>
  );
}