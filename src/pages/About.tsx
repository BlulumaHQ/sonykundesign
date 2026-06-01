import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const About = () => {
  const { lang } = useLanguage();
  const isZh = lang === "zh";
  const a = translations.about;

  return (
    <>
      <Header />
      <main className="pt-28">
        <section className="section-padding">
          <div className="container-wide">
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24">
              <div data-reveal>
                <span className="eyebrow">{isZh ? "關於" : "About"}</span>
                <h1 className="heading-hero">{t(a.title, lang)}</h1>
              </div>

              <div className="space-y-10 max-w-2xl lg:pt-6">
                <p data-reveal className="text-subtitle">
                  {t(a.subtitle, lang)}
                </p>
                <p data-reveal className="text-body">{t(a.p1, lang)}</p>
                <p data-reveal className="text-body">{t(a.p2, lang)}</p>
                <p data-reveal className="text-body">{t(a.p3, lang)}</p>

                <div data-reveal className="pt-10 border-t border-border">
                  <p className="eyebrow !mb-5">{t(a.highlightsTitle, lang)}</p>
                  <ul className="space-y-3">
                    {a.highlights[lang].map((h, i) => (
                      <li key={i} className="flex items-baseline gap-4 text-foreground">
                        <span className="text-xs tabular-nums text-muted-foreground">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default About;
