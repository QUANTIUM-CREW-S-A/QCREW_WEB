import { Rocket, Mail, Phone, MapPin, Linkedin, Twitter, Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-brand-gray border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <Rocket className="w-8 h-8 text-brand-primary" />
              <span className="text-xl font-display font-bold text-white">
                Quantium<span className="text-brand-primary">Crew</span>
              </span>
            </Link>
            <p className="text-brand-muted leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-brand-muted hover:text-brand-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-brand-muted hover:text-brand-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-brand-muted hover:text-brand-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-white mb-6">{t("footer.services")}</h4>
            <ul className="space-y-4">
              <li><a href="/#services" className="text-brand-muted hover:text-brand-primary transition-colors">{t("services.dev.title")}</a></li>
              <li><a href="/#services" className="text-brand-muted hover:text-brand-primary transition-colors">{t("services.systems.title")}</a></li>
              <li><a href="/#services" className="text-brand-muted hover:text-brand-primary transition-colors">{t("services.support.title")}</a></li>
              <li><a href="/#services" className="text-brand-muted hover:text-brand-primary transition-colors">{t("services.install.title")}</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-bold text-white mb-6">{t("footer.company")}</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-brand-muted hover:text-brand-primary transition-colors">{t("footer.links.about")}</a></li>
              <li><a href="/#use-cases" className="text-brand-muted hover:text-brand-primary transition-colors">{t("footer.links.caseStudies")}</a></li>
              <li><a href="#" className="text-brand-muted hover:text-brand-primary transition-colors">{t("footer.links.careers")}</a></li>
              <li><Link to="/contact" className="text-brand-muted hover:text-brand-primary transition-colors">{t("footer.links.contact")}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-white mb-6">{t("footer.contact")}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                <span className="text-brand-muted">{t("contact.info.email")}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                <span className="text-brand-muted">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                <span className="text-brand-muted">123 Tech Boulevard,<br />Innovation District, CA 94043</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-brand-muted">
            © {new Date().getFullYear()} {t("footer.rights")}
          </p>
          <div className="flex items-center gap-6 text-sm text-brand-muted">
            <Link to="/privacy" className="hover:text-white transition-colors">{t("footer.links.privacy")}</Link>
            <Link to="/terms" className="hover:text-white transition-colors">{t("footer.links.terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}