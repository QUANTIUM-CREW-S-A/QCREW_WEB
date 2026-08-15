import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook, ArrowUp, ArrowRight, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";
import { addressLines, company, mailHref, telHref } from "../../lib/company";
import { useState } from "react";

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", href: company.social.linkedin },
  { icon: Instagram, label: "Instagram", href: company.social.instagram },
  { icon: Facebook, label: "Facebook", href: company.social.facebook },
];

export function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setEmail("");
    }
  };

  return (
    <footer className="relative bg-rack-sheet overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(circle,rgba(0,212,255,0.04)_0%,transparent_60%)] rounded-full pointer-events-none" />

      {/* CTA Banner */}
      <div className="relative border-b border-rack-rule">
        <div className="container mx-auto px-4 md:px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl border border-rack-rule bg-gradient-to-br from-white/[0.04] to-transparent p-8 md:p-12 overflow-hidden"
          >
            {/* Banner glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(0,212,255,0.08)_0%,transparent_70%)] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[radial-gradient(circle,rgba(139,92,246,0.08)_0%,transparent_70%)] rounded-full pointer-events-none" />

            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-rack-ink mb-3">
                  {t("footer.cta.title", { defaultValue: "¿Listo para transformar tu tecnología?" })}
                </h3>
                <p className="text-rack-graph max-w-lg">
                  {t("footer.cta.description", { defaultValue: "Únete a las empresas que ya confían en Quantium Crew para impulsar su infraestructura tecnológica." })}
                </p>
              </div>
              <Link to="/contact" className="flex-shrink-0">
                <Button size="lg" className="group">
                  {t("footer.cta.button", { defaultValue: "Empezar ahora" })}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative container mx-auto px-4 md:px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">

          {/* Brand - wider column */}
          <motion.div
            className="lg:col-span-4 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              aria-label="Quantium Crew — inicio"
              className="group flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rack-link focus-visible:ring-offset-2"
            >
              <Logo className="h-11 w-11" />
              <span className="flex flex-col leading-none">
                <span className="text-xl font-display font-bold tracking-tight text-rack-ink">
                  Quantium
                  <span className="text-rack-brand transition-colors duration-300 group-hover:text-rack-ink">
                    Crew
                  </span>
                </span>
                <span className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-rack-graph">
                  Infraestructura TI
                </span>
              </span>
            </Link>
            <p className="text-rack-ink/50 leading-relaxed text-sm max-w-xs">
              {t("footer.tagline")}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-rack-sheet border border-rack-rule flex items-center justify-center text-rack-graph hover:text-rack-brand hover:border-rack-edge transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-rack-ink/60 text-sm font-medium mb-3">
                {t("footer.newsletter.title", { defaultValue: "Recibe novedades" })}
              </p>
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  placeholder={t("footer.newsletter.placeholder", { defaultValue: "tu@email.com" })}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-rack-ink text-sm placeholder:text-rack-ink/20 focus:outline-none focus:border-brand-primary/40 transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-brand-primary/15 text-rack-brand rounded-xl text-sm font-medium hover:bg-brand-primary/25 transition-colors border border-brand-primary/20"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-display font-bold text-rack-ink text-sm mb-5 uppercase tracking-wider">
              {t("footer.services")}
            </h4>
            <ul className="space-y-3.5">
              {[
                { label: t("services.dev.title"), href: "/services/dev" },
                { label: t("services.systems.title"), href: "/services/systems" },
                { label: t("services.support.title"), href: "/services/support" },
                { label: t("services.install.title"), href: "/services/install" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-rack-ink/40 hover:text-rack-brand text-sm transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-brand-primary transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-display font-bold text-rack-ink text-sm mb-5 uppercase tracking-wider">
              {t("footer.company")}
            </h4>
            <ul className="space-y-3.5">
              {[
                { label: "Testimonios", href: "/testimonials" },
                { label: t("footer.links.contact"), href: "/contact" },
                { label: t("footer.links.privacy"), href: "/privacy" },
                { label: t("footer.links.terms"), href: "/terms" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-rack-ink/40 hover:text-rack-brand text-sm transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-brand-primary transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-display font-bold text-rack-ink text-sm mb-5 uppercase tracking-wider">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-4">
              <li>
                <a href={mailHref} className="flex items-start gap-3 group">
                  <div className="w-9 h-9 rounded-lg bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-primary/20 transition-colors">
                    <Mail className="w-4 h-4 text-rack-brand" />
                  </div>
                  <div>
                    <p className="text-rack-ink/30 text-xs mb-0.5">Email</p>
                    <p className="text-rack-ink/60 text-sm group-hover:text-rack-brand transition-colors">{company.email}</p>
                  </div>
                </a>
              </li>
              <li>
                <a href={telHref} className="flex items-start gap-3 group">
                  <div className="w-9 h-9 rounded-lg bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-primary/20 transition-colors">
                    <Phone className="w-4 h-4 text-rack-brand" />
                  </div>
                  <div>
                    <p className="text-rack-ink/30 text-xs mb-0.5">{t("footer.contactLabels.phone", { defaultValue: "Teléfono" })}</p>
                    <p className="text-rack-ink/60 text-sm group-hover:text-rack-brand transition-colors">{company.phone.display}</p>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-rack-brand" />
                  </div>
                  <div>
                    <p className="text-rack-ink/30 text-xs mb-0.5">{t("footer.contactLabels.address", { defaultValue: "Ubicación" })}</p>
                    <p className="text-rack-ink/60 text-sm">
                      {addressLines[0]}<br />{addressLines[1]}
                    </p>
                    <p className="text-rack-ink/40 text-xs mt-1">{company.hours.weekdays}</p>
                  </div>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="relative border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-rack-ink/30 flex items-center gap-1.5">
            © {new Date().getFullYear()} QuantiumCrew. {t("footer.rights")}
            <span className="hidden sm:inline-flex items-center gap-1 ml-1">
              — Hecho con <Heart className="w-3 h-3 text-red-400 fill-red-400 inline" /> en Panamá
            </span>
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-rack-ink/30 hover:text-rack-brand hover:bg-brand-primary/10 hover:border-brand-primary/20 transition-all duration-300 group"
            aria-label="Volver arriba"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
