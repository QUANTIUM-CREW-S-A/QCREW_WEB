import {
  SiUbiquiti,
  SiCisco,
  SiProxmox,
  SiLenovo,
  SiDell,
  SiHp,
  SiVmware,
  SiAmazon,
  SiGooglecloud,
  SiFortinet,
  SiIntel,
  SiNvidia
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
  { name: "AWS", icon: SiAmazon },
  { name: "Google Cloud", icon: SiGooglecloud },
  { name: "Fortinet", icon: SiFortinet },
  { name: "Intel", icon: SiIntel },
  { name: "NVIDIA", icon: SiNvidia },
];

export function Partners() {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-black border-y border-white/5 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="container mx-auto px-4 mb-8">
        <p className="text-center text-brand-muted uppercase tracking-widest text-sm font-medium">
          {t("partners.title", "Strategic Technology Partners")}
        </p>
      </div>

      <div className="flex relative overflow-hidden">
        <div
          className="flex gap-12 md:gap-24 px-4 animate-scroll"
          style={{ width: "fit-content" }}
        >
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex items-center justify-center min-w-[120px] group relative"
            >
              <div className="relative transition-transform duration-300 group-hover:scale-110">
                <partner.icon className="w-12 h-12 md:w-16 md:h-16 text-white/60 group-hover:text-white transition-all duration-300" />
              </div>

              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-brand-gray/90 px-3 py-1 rounded text-xs text-white whitespace-nowrap border border-white/20">
                  {partner.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
    </section>
  );
}
