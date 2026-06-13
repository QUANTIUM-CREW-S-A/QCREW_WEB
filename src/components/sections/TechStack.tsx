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
  { name: "TypeScript", icon: SiTypescript },
  { name: "Python", icon: SiPython },
  { name: "Go", icon: SiGo },
  { name: "Rust", icon: SiRust },
  { name: "React", icon: SiReact },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "AWS", icon: SiAmazon },
  { name: "Docker", icon: SiDocker },
  { name: "Kubernetes", icon: SiKubernetes },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Terraform", icon: SiTerraform },
];

export function TechStack() {
  const { t } = useTranslation();

  return (
    <SectionWrapper className="py-20 bg-brand-dark border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-4 mb-12 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
          {t("techStack.title", "Technologies We Master")}
        </h2>
        <p className="text-brand-muted max-w-2xl mx-auto">
          {t("techStack.subtitle", "Our engineering team uses the most modern and robust tools to build your solutions.")}
        </p>
      </div>

      <div className="flex relative overflow-hidden py-8">
        <div
          className="flex gap-12 md:gap-16 px-4 animate-scroll-slow"
          style={{ width: "fit-content" }}
        >
          {[...technologies, ...technologies].map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex flex-col items-center justify-center gap-3 min-w-[100px] group relative"
            >
              <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-brand-primary/10 group-hover:border-brand-primary/50 group-hover:scale-110 relative z-10">
                <tech.icon className="w-8 h-8 transition-colors duration-300 text-brand-muted group-hover:text-white" />
              </div>
              <span className="text-sm font-medium text-brand-muted group-hover:text-white transition-colors relative z-10">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
