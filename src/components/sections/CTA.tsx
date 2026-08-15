import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SectionWrapper } from "../ui/SectionWrapper";

/**
 * Cierre como orden de trabajo.
 *
 * Es el documento con el que arranca cualquier instalacion, asi que pedir el
 * primer paso con esa forma encaja con el oficio. Sustituye al contador de
 * "cupos disponibles", que bajaba solo y se reiniciaba: cualquiera que se
 * quedara en la pagina veia el truco, y eso costaba mas confianza de la
 * urgencia que generaba.
 */

const lineItems = [
  { label: "Alcance", value: "Diagnóstico de tu infraestructura actual" },
  { label: "Entrega", value: "Propuesta escrita en 48 horas" },
  { label: "Costo", value: "Sin costo y sin compromiso" },
];

export function CTA() {
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  return (
    <SectionWrapper className="border-t border-rack-rule bg-rack-paper py-24 md:py-28">
      <div aria-hidden="true" className="rack-grid absolute inset-0" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="rack-panel relative mx-auto max-w-3xl"
        >
          {/* Sello de conformidad, como el que lleva un trabajo terminado */}
          <svg
            viewBox="0 0 40 40"
            aria-hidden="true"
            className="absolute -right-3 -top-3 hidden h-16 w-16 -rotate-6 text-rack-link sm:block"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          >
            <circle cx="20" cy="20" r="17" strokeDasharray="2 2.4" />
            <circle cx="20" cy="20" r="12.5" />
            <path d="M14.5 20.5l3.6 3.6 7.4-8.2" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          {/* Cabecera del formulario */}
          <div className="flex items-center justify-between border-b border-rack-rule px-6 py-3.5 sm:px-8">
            <p className="rack-label">Orden de trabajo</p>
            <p className="rack-label">Paso 1 de 3</p>
          </div>

          <div className="px-6 py-9 sm:px-8 sm:py-11">
            <h2 className="rack-display text-3xl text-rack-ink sm:text-4xl md:text-[42px]">
              Deja de parchar.
              <br />
              <span className="text-rack-graph">Empieza a diseñar.</span>
            </h2>

            <p className="mt-5 max-w-lg text-lg leading-relaxed text-rack-graph">
              Miramos lo que ya tienes montado y te decimos qué conviene
              cambiar, qué conviene dejar y qué te está costando dinero.
            </p>

            {/* Partidas: en lugar de una urgencia inventada, los tres
                compromisos concretos que el cliente puede verificar. */}
            <dl className="mt-9 divide-y divide-rack-rule border-y border-rack-rule">
              {lineItems.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-baseline sm:gap-6"
                >
                  <dt className="rack-label sm:w-28 sm:shrink-0">{item.label}</dt>
                  <dd className="text-[15px] text-rack-ink">{item.value}</dd>
                </div>
              ))}
            </dl>

            <button
              onClick={() => navigate("/contact")}
              className="group mt-9 inline-flex items-center gap-3 bg-rack-ink px-7 py-4 font-sans text-[15px] font-medium text-rack-paper transition-colors hover:bg-rack-brand"
            >
              Solicitar el diagnóstico
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <p className="rack-label mt-4">Respondemos en menos de 24 h hábiles</p>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
