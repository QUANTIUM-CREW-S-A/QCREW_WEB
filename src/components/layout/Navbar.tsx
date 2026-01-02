import { useState, useEffect } from "react";
import { Menu, X, Rocket, Globe } from "lucide-react";
import { Button } from "../ui/Button";
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
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
    { name: "Testimonios", href: "/testimonials" },
    { name: "Equipo", href: "/team" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-brand-dark/80 backdrop-blur-lg border-b border-white/5 py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute inset-0 bg-brand-primary blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <Rocket className="w-8 h-8 text-brand-primary relative z-10" />
          </div>
          <span className="text-xl font-display font-bold tracking-tight text-white">
            Quantium<span className="text-brand-primary">Crew</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-brand-text hover:text-brand-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            {pageLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-brand-text hover:text-brand-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 text-brand-text hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
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
                  className="absolute top-full right-0 mt-2 w-40 bg-brand-gray border border-white/10 rounded-xl shadow-xl overflow-hidden py-1"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={cn(
                        "w-full px-4 py-2 text-left text-sm flex items-center gap-3 hover:bg-white/5 transition-colors",
                        i18n.language === lang.code ? "text-brand-primary" : "text-brand-text"
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

          <Button size="sm" onClick={() => navigate("/contact")}>{t("nav.getStarted")}</Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 text-brand-text hover:text-white transition-colors p-2"
            >
              <Globe className="w-5 h-5" />
          </button>
          
          <button
            className="text-white"
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
            className="md:hidden bg-brand-dark/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-brand-text hover:text-brand-primary py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              {pageLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-base font-medium text-brand-text hover:text-brand-primary py-2"
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
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:hidden"
            onClick={() => setIsLangOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-brand-gray border border-white/10 rounded-2xl w-full max-w-xs overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-white/10">
                <h3 className="text-lg font-bold text-white">Select Language</h3>
              </div>
              <div className="max-h-[60vh] overflow-y-auto">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={cn(
                      "w-full px-6 py-4 text-left text-base flex items-center gap-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0",
                      i18n.language === lang.code ? "text-brand-primary bg-brand-primary/5" : "text-brand-text"
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