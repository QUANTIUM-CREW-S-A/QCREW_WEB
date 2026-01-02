import { motion } from "framer-motion";
import { 
  SiTypescript, 
  SiPython, 
  SiGo, 
  SiRust, 
  SiReact, 
  SiNodedotjs, 
  SiNextdotjs, 
  SiAmazon, 
  SiDocker, 
  SiKubernetes,
  SiPostgresql,
  SiMongodb,
  SiTerraform
} from "react-icons/si";
import { useTranslation } from "react-i18next";
import { SectionWrapper } from "../ui/SectionWrapper";

const technologies = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Go", icon: SiGo, color: "#00ADD8" },
  { name: "Rust", icon: SiRust, color: "#000000" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "AWS", icon: SiAmazon, color: "#FF9900" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Terraform", icon: SiTerraform, color: "#7B42BC" },
];

export function TechStack() {
  const { t } = useTranslation();

  return (
    <SectionWrapper className="py-20 bg-brand-dark border-t border-white/5">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
          {t("techStack.title", "Technologies We Master")}
        </h2>
        <p className="text-brand-muted max-w-2xl mx-auto">
          {t("techStack.subtitle", "Our engineering team uses the most modern and robust tools to build your solutions.")}
        </p>
      </div>
      
      <div className="flex relative overflow-hidden mask-linear-fade">
        <motion.div
          className="flex gap-12 md:gap-16 px-4"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
          style={{ width: "fit-content" }}
        >
          {/* Duplicate list for infinite loop */}
          {[...technologies, ...technologies].map((tech, index) => (
            <div 
              key={`${tech.name}-${index}`} 
              className="flex flex-col items-center justify-center gap-3 min-w-[100px] group"
            >
              <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <tech.icon 
                  className="w-8 h-8 transition-colors duration-300 text-brand-muted group-hover:text-white" 
                  // style={{ color: tech.color }} // Optional: Use brand colors on hover? 
                  // For luxury feel, keeping it white/monochrome is often better, 
                  // but user wanted "llamativo". Maybe I'll stick to white on hover for clean look, 
                  // or use the brand color. I'll stick to white for consistency with luxury theme.
                />
              </div>
              <span className="text-sm font-medium text-brand-muted group-hover:text-white transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
