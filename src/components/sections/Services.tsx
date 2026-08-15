import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionWrapper } from "../ui/SectionWrapper";
import { RackElevation, rackLayers, type RackUnit } from "../ui/RackElevation";
import { PhotoSlot } from "../ui/PhotoSlot";

/**
 * Servicios como elevacion de rack.
 *
 * Las cuatro divisiones no son cuatro tarjetas intercambiables: son las
 * cuatro capas de una misma pila, del piso a la nube. Presentarlas apiladas
 * dice el argumento de venta sin tener que escribirlo.
 */
export function Services() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  const units: RackUnit[] = rackLayers.map(({ id, layer, led }) => ({
    id,
    layer,
    led,
    href: `/services/${id}`,
    name: t(`services.${id}.title`),
    summary: t(`services.${id}.description`),
    items: t(`services.${id}.features`, { returnObjects: true }) as string[],
  }));

  return (
    <SectionWrapper
      id="services"
      className="relative border-y border-rack-rule bg-rack-paper py-24 md:py-28"
    >
      {/* Papel milimetrado: textura de fondo, nunca protagonista */}
      <div aria-hidden="true" className="rack-grid absolute inset-0" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_18rem] lg:gap-16">
          <div>
            {/* Encabezado alineado a la izquierda: rompe el eje centrado que
                repetian todas las secciones y deja respirar a la elevacion. */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="mb-14 max-w-3xl md:mb-16"
            >
              <p className="rack-label mb-5">
                Divisiones &middot; 4U
              </p>
              <h2 className="rack-display text-4xl text-rack-ink sm:text-5xl md:text-6xl">
                {t("services.title_line1")}
                <br />
                <span className="text-rack-graph">{t("services.title_line2")}</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-rack-graph">
                {t("services.subtitle")}
              </p>
            </motion.div>

            <RackElevation units={units} />
          </div>

          {/* Espacio para foto real de una instalacion. Hoy queda reservado
              con el marco correcto; el dia que haya una foto, un solo prop. */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden lg:block"
          >
            <PhotoSlot
              refCode="REF · 04"
              caption="Foto de instalación"
              className="sticky top-28 aspect-[3/4] w-full"
            />
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
