import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
];

export function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsLangOpen(false);
  };

  const navLinks = [
    { name: t("nav.services"), href: "/#services" },
    { name: t("nav.whyUs"), href: "/#why-us" },
  ];

  const pageLinks = [
    { name: "Tienda", href: "/tienda" },
    { name: "Testimonios", href: "/testimonials" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        // Sin scroll la barra flota sobre el papel; al bajar se apoya con
        // una hairline, sin cambiar de tono.
        scrolled
          ? "bg-rack-paper/90 backdrop-blur-lg border-b border-rack-rule py-4"
          : "bg-rack-paper py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link
          to="/"
          aria-label="Quantium Crew — inicio"
          className="group flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rack-link focus-visible:ring-offset-2 focus-visible:ring-offset-rack-paper"
        >
          <Logo className="h-11 w-11" />
          <span className="flex flex-col leading-none">
            <span className="text-xl font-display font-bold tracking-tight text-rack-ink">
              Quantium
              <span className="text-rack-brand transition-colors duration-300 group-hover:text-rack-ink">
                Crew
              </span>
            </span>
            <span className="mt-1.5 hidden font-mono text-[10px] uppercase tracking-[0.22em] text-rack-graph sm:block">
              Infraestructura TI
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-rack-ink transition-colors hover:text-rack-brand"
              >
                {link.name}
              </a>
            ))}
            {pageLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-rack-ink transition-colors hover:text-rack-brand"
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-rack-graph transition-colors hover:bg-rack-ink/5 hover:text-rack-ink"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{i18n.language?.toUpperCase().substring(0, 2)}</span>
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-2 w-40 bg-rack-sheet border border-rack-rule rounded-xl shadow-xl overflow-hidden py-1"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={cn(
                        "w-full px-4 py-2 text-left text-sm flex items-center gap-3 hover:bg-rack-sheet transition-colors",
                        i18n.language === lang.code ? "text-rack-brand" : "text-rack-ink"
                      )}
                    >
                      <span>{lang.flag}</span>
                      {lang.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* El componente Button lo comparte el panel admin, que sigue en
              oscuro, asi que aqui se sobreescribe en vez de tocarlo. */}
          <Button
            size="sm"
            className="rounded-none border-none bg-rack-ink px-5 text-rack-paper shadow-none hover:bg-rack-brand"
            onClick={() => navigate("/contact")}
          >
            {t("nav.getStarted")}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 p-2 text-rack-graph transition-colors hover:text-rack-ink"
              aria-label="Cambiar idioma"
            >
              <Globe className="w-5 h-5" />
          </button>

          <button
            className="text-rack-ink"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-rack-paper border-b border-rack-rule overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-rack-ink hover:text-rack-brand py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              {pageLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-base font-medium text-rack-ink hover:text-rack-brand py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Button className="w-full" onClick={() => { setIsOpen(false); navigate("/contact"); }}>{t("nav.getStarted")}</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Language Menu Overlay */}
      <AnimatePresence>
        {isLangOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4 md:hidden"
            onClick={() => setIsLangOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-rack-sheet border border-rack-rule rounded-2xl w-full max-w-xs overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-rack-rule">
                <h3 className="text-lg font-bold text-rack-ink">Select Language</h3>
              </div>
              <div className="max-h-[60vh] overflow-y-auto">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={cn(
                      "w-full px-6 py-4 text-left text-base flex items-center gap-4 hover:bg-rack-sheet transition-colors border-b border-rack-rule last:border-0",
                      i18n.language === lang.code ? "text-rack-brand bg-brand-primary/5" : "text-rack-ink"
                    )}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    {lang.name}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}