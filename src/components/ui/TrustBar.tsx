import { motion } from "framer-motion";

const partners = [
  { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { name: "Google Cloud", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" },
  { name: "React", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
  { name: "Node.js", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" },
  { name: "Docker", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg" }
];

export function TrustBar() {
  return (
    <div className="w-full py-8 border-t border-white/5 bg-brand-dark/80">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-brand-muted mb-6 font-medium tracking-wider uppercase">
          Tecnologías que impulsan nuestras soluciones
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          {partners.map((partner, index) => (
            <motion.img
              key={index}
              src={partner.logo}
              alt={partner.name}
              className="h-8 md:h-10 w-auto object-contain"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.1, filter: "brightness(1.2)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
