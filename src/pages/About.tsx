import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SplitTextReveal from "@/components/SplitTextReveal";
import LinePattern from "@/components/LinePattern";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const About = () => {
  const { lang } = useLanguage();
  const isZh = lang === "zh";
  const a = translations.about;

  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className="pt-40 md:pt-52 pb-16 md:pb-28">
          <div className="container-wide">
            <div className="flex items-end justify-between mb-10">
              <span className="eyebrow !mb-0">
                {isZh ? "關於" : "About"}
              </span>
              <span className="hidden md:inline text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {isZh ? "自 2005" : "Since 2005"}
              </span>
            </div>
            <SplitTextReveal
              as="h1"
              text={t(a.title, lang)}
              className="heading-hero"
            />
          </div>
        </section>

        {/* EDITORIAL NARRATIVE */}
        <section className="pb-24 md:pb-40 border-t border-border pt-16 md:pt-24">
          <div className="container-wide grid grid-cols-12 gap-8 md:gap-16">
            <div className="col-span-12 md:col-span-4 md:sticky md:top-32 md:self-start">
              <p
                data-reveal
                className="font-display text-xl md:text-2xl leading-[1.4] tracking-tight text-foreground/70"
              >
                {t(a.subtitle, lang)}
              </p>
            </div>
            <div className="col-span-12 md:col-span-8 space-y-10 max-w-2xl">
              <p data-reveal className="text-subtitle">
                {t(a.p1, lang)}
              </p>
              <p data-reveal className="text-body">
                {t(a.p2, lang)}
              </p>
              <p data-reveal className="text-body">
                {t(a.p3, lang)}
              </p>
            </div>
          </div>
        </section>

        {/* HIGHLIGHTS — editorial numbered list */}
        <section className="py-24 md:py-32 bg-muted border-t border-border">
          <div className="container-wide grid grid-cols-12 gap-8 md:gap-16">
            <div className="col-span-12 md:col-span-4">
              <span className="eyebrow">
                {t(a.highlightsTitle, lang)}
              </span>
            </div>
            <div className="col-span-12 md:col-span-8">
              <ul className="divide-y divide-border border-y border-border">
                {a.highlights[lang].map((h, i) => (
                  <li
                    key={i}
                    className="py-6 flex items-baseline gap-6 text-foreground"
                  >
                    <span className="text-[11px] tabular-nums text-muted-foreground tracking-[0.22em] w-8">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-lg md:text-2xl leading-[1.35] tracking-tight">
                      {h}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="bg-foreground text-background py-32 md:py-48">
          <div className="container-wide">
            <h2 className="font-display text-[40px] sm:text-[64px] md:text-[96px] lg:text-[120px] leading-[0.95] tracking-[-0.035em] mb-12">
              {isZh ? "一起合作吧。" : "Let's work together."}
            </h2>
            <div className="grid md:grid-cols-[1fr_auto] gap-10 items-end max-w-5xl">
              <p className="text-lg md:text-xl text-background/65 max-w-xl leading-[1.6]">
                {isZh
                  ? "告訴我們您的業務，我們會為您打造免費預覽。"
                  : "Tell us about your business and we'll build you a free preview."}
              </p>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-4 bg-background text-foreground px-8 py-5 rounded-full text-[12px] uppercase tracking-[0.22em] hover:bg-background/90"
              >
                {isZh ? "聯絡我們" : "Get in touch"}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
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
