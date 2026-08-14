import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { SectionWrapper } from "../ui/SectionWrapper";
import { StackDrawing } from "../ui/StackDrawing";
import { TrustBar } from "../ui/TrustBar";

/**
 * Portada.
 *
 * Abre con el plano de la instalacion completa, del piso a la nube: es el
 * entregable real del oficio y dice la tesis de la empresa sin adjetivos.
 * Sustituye a la escena 3D de esferas, que no describia nada.
 */
export function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: reduce ? 0 : delay },
  });

  return (
    <div className="relative flex flex-col bg-rack-paper">
      <SectionWrapper className="relative flex flex-grow items-center overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
        <div aria-hidden="true" className="rack-grid absolute inset-0" />

        <div className="container relative z-10 mx-auto grid grid-cols-1 items-center gap-16 px-4 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          {/* Columna de texto */}
          <div>
            <motion.p className="rack-label" {...rise(0)}>
              Del cableado a la nube &middot; Panamá
            </motion.p>

            <motion.h1
              className="rack-display mt-6 text-5xl text-rack-ink md:text-6xl lg:text-7xl"
              {...rise(0.08)}
            >
              {t("hero.title_line1")}
              <br />
              <span className="text-rack-graph">{t("hero.title_line2")}</span>
            </motion.h1>

            <motion.p
              className="mt-7 max-w-lg text-lg leading-relaxed text-rack-graph"
              {...rise(0.16)}
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
              {...rise(0.24)}
            >
              <button
                onClick={() => navigate("/contact")}
                className="group inline-flex items-center justify-center gap-3 bg-rack-ink px-7 py-4 font-sans text-[15px] font-medium text-rack-paper transition-colors hover:bg-rack-brand"
              >
                {t("hero.cta_primary")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() =>
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center justify-center border border-rack-rule px-7 py-4 font-sans text-[15px] font-medium text-rack-ink transition-colors hover:border-rack-edge hover:bg-rack-sheet"
              >
                {t("hero.cta_secondary")}
              </button>
            </motion.div>

            {/* Señales de confianza verificables. Antes habia cuatro fotos de
                pravatar.cc — desconocidos aleatorios presentados como
                clientes — que restaban credibilidad en vez de sumarla. */}
            <motion.dl
              className="mt-12 flex flex-wrap gap-x-12 gap-y-5 border-t border-rack-rule pt-7"
              {...rise(0.32)}
            >
              {[
                { k: "Operando desde", v: "2018" },
                { k: "Divisiones", v: "4, un solo contrato" },
                { k: "Respuesta", v: "Menos de 24 h" },
              ].map((item) => (
                <div key={item.k}>
                  <dt className="rack-label">{item.k}</dt>
                  <dd className="mt-1 font-sans text-sm font-medium text-rack-ink">
                    {item.v}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* El plano */}
          <motion.div
            className="hidden lg:block"
            initial={reduce ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <StackDrawing className="mx-auto h-auto max-h-[440px] w-full text-rack-ink" />
          </motion.div>
        </div>
      </SectionWrapper>

      <TrustBar />
    </div>
  );
}
