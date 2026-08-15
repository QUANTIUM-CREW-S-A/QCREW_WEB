/**
 * Datos NAP (nombre, dirección, teléfono) de la empresa: fuente única de verdad.
 * Los consumen el footer, la página de contacto, el botón de WhatsApp y el
 * JSON-LD de index.html. Google penaliza el NAP inconsistente en SEO local, así
 * que estos valores no deben duplicarse a mano en ningún componente.
 *
 * TODO: reemplazar los marcadores por los datos reales antes de publicar.
 */
export const company = {
  name: "Quantium Crew",
  legalName: "Quantium Crew, S.A.",
  url: "https://quantiumcrew.com",
  email: "info@quantiumcrew.com",

  /** Formato E.164 sin signos para los enlaces; el display es lo que se lee. */
  phone: {
    e164: "+50700000000",
    display: "+507 0000-0000",
  },
  whatsapp: {
    e164: "50700000000",
    display: "+507 0000-0000",
  },

  address: {
    street: "Calle pendiente de confirmar",
    locality: "Ciudad de Panamá",
    region: "Provincia de Panamá",
    country: "PA",
    countryName: "Panamá",
  },

  hours: {
    weekdays: "Lunes a viernes, 8:00 a. m. – 5:00 p. m.",
    saturday: "Sábados, 9:00 a. m. – 1:00 p. m.",
  },

  social: {
    linkedin: "https://www.linkedin.com/company/quantium-crew",
    instagram: "https://www.instagram.com/quantiumcrew",
    facebook: "https://www.facebook.com/quantiumcrew",
  },
} as const;

export const telHref = `tel:${company.phone.e164}`;
export const mailHref = `mailto:${company.email}`;

/** Enlace de WhatsApp con mensaje precargado para no arrancar en frío. */
export function whatsappHref(message = "Hola, quisiera cotizar un proyecto de TI.") {
  return `https://wa.me/${company.whatsapp.e164}?text=${encodeURIComponent(message)}`;
}

export const addressLines = [
  company.address.street,
  `${company.address.locality}, ${company.address.countryName}`,
];
