import { Link } from "react-router-dom";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import { useSeo } from "../hooks/useSeo";

export default function NotFound() {
  useSeo({
    title: "Página no encontrada | Quantium Crew",
    description: "La página que buscas no está publicada.",
    path: "/404",
    noindex: true,
  });
  return (
    <SectionWrapper className="flex min-h-[70vh] items-center bg-rack-paper pt-32">
      <div className="container mx-auto px-4">
        <p className="rack-label">Error 404</p>
        <h1 className="rack-display mt-6 text-4xl text-rack-ink md:text-6xl">
          Esta ruta no existe
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-rack-graph">
          El enlace que seguiste apunta a una página que no está publicada.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-rack-ink px-7 py-4 font-sans text-[15px] font-medium text-rack-paper transition-colors hover:bg-rack-brand"
          >
            Volver al inicio
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center border border-rack-rule px-7 py-4 font-sans text-[15px] font-medium text-rack-ink transition-colors hover:border-rack-edge hover:bg-rack-sheet"
          >
            Hablar con nosotros
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
