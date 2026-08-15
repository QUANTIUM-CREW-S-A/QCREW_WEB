import { Hero } from "../components/sections/Hero";
import { Partners } from "../components/sections/Partners";
import { Stats } from "../components/sections/Stats";
import { Services } from "../components/sections/Services";
import { CTA } from "../components/sections/CTA";
import { ClientChat } from "../components/ui/ClientChat";
import { useSeo } from "../hooks/useSeo";

export default function Home() {
  useSeo({
    title: "Quantium Crew | Infraestructura TI en Panamá — del cableado a la nube",
    description:
      "Diseñamos, construimos y gestionamos ecosistemas tecnológicos en Panamá: redes, servidores, cableado estructurado, soporte gestionado y software a medida. Un solo contrato, respuesta en menos de 24 h.",
    path: "/",
  });
  return (
    <>
      <Hero />
      <Partners />
      <Stats />
      <Services />
      <CTA />
      <ClientChat />
    </>
  );
}
