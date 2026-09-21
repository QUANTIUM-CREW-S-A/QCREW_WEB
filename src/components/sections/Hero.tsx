import type { Ref } from "react";
import { lazy, Suspense, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { SectionWrapper } from "../ui/SectionWrapper";
import { StackDrawing } from "../ui/StackDrawing";
import { TrustBar } from "../ui/TrustBar";
import { RackGridBackground } from "../ui/RackGridBackground";
import { useMagneticHover } from "../../hooks/useMagneticHover";
import { supportsWebGL } from "../../lib/webgl";

/**
 * Modelo 3D real del rack (Three.js), cargado solo cuando el navegador
 * soporta WebGL — asi el chunk (three + fiber) ni se pide en el caso
 * contrario. Mientras el chunk baja, o si no hay WebGL, se ve el plano
 * StackDrawing: nunca queda un hueco vacio en la pieza de firma de la home.
 */
const Rack3D = lazy(() => import("../ui/Rack3D").then((m) => ({ default: m.Rack3D })));

/**
 * Portada.
 *
 * Abre con el plano de la instalacion completa, del piso a la nube: es el
 * entregable real del oficio y dice la tesis de la empresa sin adjetivos.
 */
export function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const primaryCta = useMagneticHover();
  const secondaryCta = useMagneticHover();
  const [webglOk] = useState(supportsWebGL);

  const rise = (delay: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: reduce ? 0 : delay },
  });

  return (
    <div className="relative flex flex-col bg-rack-paper">
      <SectionWrapper className="relative flex flex-grow items-center overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
        <RackGridBackground />

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
              <motion.button
                ref={primaryCta.ref as Ref<HTMLButtonElement>}
                style={{ x: primaryCta.x, y: primaryCta.y }}
                onMouseMove={primaryCta.onMouseMove}
                onMouseLeave={primaryCta.onMouseLeave}
                onClick={() => navigate("/contact")}
                className="group inline-flex items-center justify-center gap-3 bg-rack-ink px-7 py-4 font-sans text-[15px] font-medium text-rack-paper transition-colors hover:bg-rack-brand"
              >
                {t("hero.cta_primary")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                ref={secondaryCta.ref as Ref<HTMLButtonElement>}
                style={{ x: secondaryCta.x, y: secondaryCta.y }}
                onMouseMove={secondaryCta.onMouseMove}
                onMouseLeave={secondaryCta.onMouseLeave}
                onClick={() =>
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center justify-center border border-rack-rule px-7 py-4 font-sans text-[15px] font-medium text-rack-ink transition-colors hover:border-rack-edge hover:bg-rack-sheet"
              >
                {t("hero.cta_secondary")}
              </motion.button>
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

          {/* El rack: modelo 3D si el navegador soporta WebGL, plano SVG si no */}
          <motion.div
            className="hidden lg:block"
            initial={reduce ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {webglOk ? (
              <Suspense
                fallback={
                  <StackDrawing className="mx-auto h-auto max-h-[440px] w-full text-rack-ink" />
                }
              >
                <Rack3D className="mx-auto h-[440px] w-full" />
              </Suspense>
            ) : (
              <StackDrawing className="mx-auto h-auto max-h-[440px] w-full text-rack-ink" />
            )}
          </motion.div>
        </div>
      </SectionWrapper>

      <TrustBar />
    </div>
  );
}
