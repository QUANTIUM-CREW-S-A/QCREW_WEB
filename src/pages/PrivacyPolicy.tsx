import { SectionWrapper } from "../components/ui/SectionWrapper";
import { useTranslation } from "react-i18next";
import { addressLines, company } from "../lib/company";
import { useSeo } from "../hooks/useSeo";

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  useSeo({
    title: "Política de privacidad | Quantium Crew",
    description: "Cómo Quantium Crew recopila, usa y protege los datos personales de sus clientes en Panamá.",
    path: "/privacy",
  });

  return (
    <SectionWrapper className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-rack-ink mb-8">
          {t("privacy.title")}
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none text-rack-graph">
          <p className="lead text-xl text-rack-ink">
            {t("privacy.lastUpdated")} {new Date().toLocaleDateString()}
          </p>

          <p>
            {t("privacy.intro")}
          </p>

          <h3 className="text-rack-ink text-2xl font-bold mt-8 mb-4">{t("privacy.section1.title")}</h3>
          <p>
            {t("privacy.section1.content")}
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t("privacy.section1.list1")}</li>
            <li>{t("privacy.section1.list2")}</li>
          </ul>

          <h3 className="text-rack-ink text-2xl font-bold mt-8 mb-4">{t("privacy.section2.title")}</h3>
          <p>
            {t("privacy.section2.content")}
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t("privacy.section2.list1")}</li>
            <li>{t("privacy.section2.list2")}</li>
            <li>{t("privacy.section2.list3")}</li>
            <li>{t("privacy.section2.list4")}</li>
            <li>{t("privacy.section2.list5")}</li>
          </ul>

          <h3 className="text-rack-ink text-2xl font-bold mt-8 mb-4">{t("privacy.section3.title")}</h3>
          <p>
            {t("privacy.section3.content")}
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t("privacy.section3.list1")}</li>
          </ul>

          <h3 className="text-rack-ink text-2xl font-bold mt-8 mb-4">{t("privacy.section4.title")}</h3>
          <p>
            {t("privacy.section4.content")}
          </p>

          <h3 className="text-rack-ink text-2xl font-bold mt-8 mb-4">{t("privacy.section5.title")}</h3>
          <p>
            {t("privacy.section5.content")}
          </p>
          <p className="mt-4">
            <strong>{company.legalName}</strong><br />
            {addressLines[0]}<br />
            {addressLines[1]}<br />
            {company.email}
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}