import { Mail, MessageSquare, Send } from "lucide-react";
import { Button } from "../ui/Button";
import { SectionWrapper } from "../ui/SectionWrapper";
import { Card } from "../ui/Card";
import { useTranslation } from "react-i18next";

export function Contact() {
  const { t } = useTranslation();

  return (
    <SectionWrapper id="contact" className="bg-rack-sheet">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-rack-ink mb-6">
          {t("contact.title")} <span className="text-gradient">{t("contact.title_gradient")}</span>
        </h2>
        <p className="text-rack-graph text-lg">
          {t("contact.subtitle")}
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="p-8 md:p-12 backdrop-blur-sm bg-rack-paper/90 border-brand-primary/10">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-rack-ink">{t("contact.form.name")}</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg bg-rack-sheet border border-rack-rule text-rack-ink focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all"
                  placeholder={t("contact.form.namePlaceholder")}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-rack-ink">{t("contact.form.email")}</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg bg-rack-sheet border border-rack-rule text-rack-ink focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all"
                  placeholder={t("contact.form.emailPlaceholder")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium text-rack-ink">{t("contact.form.subject")}</label>
              <div className="relative">
                <select
                  id="subject"
                  className="w-full px-4 py-3 rounded-lg bg-rack-sheet border border-rack-rule text-rack-ink focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all appearance-none"
                >
                  <option value="">{t("contact.form.subjectPlaceholder")}</option>
                  <option value="assessment">{t("contact.form.subjects.assessment")}</option>
                  <option value="development">{t("contact.form.subjects.development")}</option>
                  <option value="infrastructure">{t("contact.form.subjects.infrastructure")}</option>
                  <option value="support">{t("contact.form.subjects.support")}</option>
                  <option value="other">{t("contact.form.subjects.other")}</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-rack-graph">
                  <MessageSquare className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-rack-ink">{t("contact.form.message")}</label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-rack-sheet border border-rack-rule text-rack-ink focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all resize-none"
                placeholder={t("contact.form.messagePlaceholder")}
              ></textarea>
            </div>

            <div className="pt-4 flex justify-end">
              <Button size="lg" className="w-full md:w-auto gap-2">
                {t("contact.form.submit")}
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </Card>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <a href={`mailto:${t("contact.info.email")}`} className="p-6 rounded-xl bg-rack-sheet border border-rack-rule hover:bg-rack-sheet transition-colors group">
            <div className="w-10 h-10 mx-auto bg-brand-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-brand-primary group-hover:text-black transition-all">
              <Mail className="w-5 h-5 text-rack-brand group-hover:text-black" />
            </div>
            <p className="text-rack-ink font-medium">{t("contact.info.email")}</p>
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}