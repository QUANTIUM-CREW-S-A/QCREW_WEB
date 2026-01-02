import { motion } from "framer-motion";
import { 
  SiUbiquiti, 
  SiCisco, 
  SiProxmox, 
  SiLenovo, 
  SiDell, 
  SiHp, 
  SiVmware
} from "react-icons/si";
import { useTranslation } from "react-i18next";

const partners = [
  { name: "Ubiquiti", icon: SiUbiquiti },
  { name: "Cisco", icon: SiCisco },
  { name: "Proxmox", icon: SiProxmox },
  { name: "Lenovo", icon: SiLenovo },
  { name: "Dell", icon: SiDell },
  { name: "HP", icon: SiHp },
  { name: "VMware", icon: SiVmware },
];

export function Partners() {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-black border-y border-white/5 overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      
      <div className="container mx-auto px-4 mb-8">
        <motion.p 
          className="text-center text-brand-muted uppercase tracking-widest text-sm font-medium"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t("partners.title", "Strategic Technology Partners")}
        </motion.p>
      </div>
      
      <div className="flex relative">
        <motion.div
          className="flex gap-12 md:gap-24 px-4"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          style={{ width: "fit-content", willChange: "transform" }}
        >
          {/* Duplicate the list to create seamless loop */}
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <div 
              key={`${partner.name}-${index}`} 
              className="flex items-center justify-center min-w-[120px] group relative"
            >
              <div className="relative transition-transform duration-300 group-hover:scale-110">
                <partner.icon className="w-12 h-12 md:w-16 md:h-16 text-white/60 group-hover:text-white transition-all duration-300" />
                
                {/* Glow effect on hover - Simplified */}
                <div className="absolute inset-0 bg-brand-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* Partner name tooltip */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded text-xs text-white whitespace-nowrap border border-white/20">
                  {partner.name}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10"></div>
    </section>
  );
}