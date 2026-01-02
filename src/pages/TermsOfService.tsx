import { SectionWrapper } from "../components/ui/SectionWrapper";
import { useTranslation } from "react-i18next";

export default function TermsOfService() {
  const { t } = useTranslation();

  return (
    <SectionWrapper className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">
          {t("terms.title")}
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none text-brand-muted">
          <p className="lead text-xl text-white">
            {t("terms.lastUpdated")} {new Date().toLocaleDateString()}
          </p>

          <p>
            {t("terms.intro")}
          </p>

          <h3 className="text-white text-2xl font-bold mt-8 mb-4">{t("terms.section1.title")}</h3>
          <p>
            {t("terms.section1.content")}
          </p>

          <h3 className="text-white text-2xl font-bold mt-8 mb-4">{t("terms.section2.title")}</h3>
          <p>
            {t("terms.section2.content")}
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t("terms.section2.list1")}</li>
            <li>{t("terms.section2.list2")}</li>
            <li>{t("terms.section2.list3")}</li>
            <li>{t("terms.section2.list4")}</li>
            <li>{t("terms.section2.list5")}</li>
          </ul>

          <h3 className="text-white text-2xl font-bold mt-8 mb-4">{t("terms.section3.title")}</h3>
          <p>
            {t("terms.section3.content")}
          </p>

          <h3 className="text-white text-2xl font-bold mt-8 mb-4">{t("terms.section4.title")}</h3>
          <p>
            {t("terms.section4.content")}
          </p>

          <h3 className="text-white text-2xl font-bold mt-8 mb-4">{t("terms.section5.title")}</h3>
          <p>
            {t("terms.section5.content")}
          </p>

          <h3 className="text-white text-2xl font-bold mt-8 mb-4">{t("terms.section6.title")}</h3>
          <p>
            {t("terms.section6.content")}
          </p>

          <h3 className="text-white text-2xl font-bold mt-8 mb-4">{t("terms.section7.title")}</h3>
          <p>
            {t("terms.section7.content")}
          </p>

          <h3 className="text-white text-2xl font-bold mt-8 mb-4">{t("terms.section8.title")}</h3>
          <p>
            {t("terms.section8.content")}
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}