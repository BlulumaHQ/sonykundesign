import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContactButton from "@/components/FloatingContactButton";
import ScrollToTop from "@/components/ScrollToTop";
import FaqAccordion from "@/components/FaqAccordion";
import SplitTextReveal from "@/components/SplitTextReveal";
import LinePattern from "@/components/LinePattern";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { servicesContent, pageMeta } from "@/i18n/pageContent";
import { usePageMeta } from "@/hooks/usePageMeta";

interface ServiceBlockProps {
  index: number;
  block: typeof servicesContent.website | typeof servicesContent.logo;
  lang: "en" | "zh";
}

const ServiceChapter = ({ index, block, lang }: ServiceBlockProps) => (
  <section className="py-24 md:py-40 border-t border-border">
    <div className="container-wide">
      <div className="grid grid-cols-12 gap-6 md:gap-12">
        <div className="col-span-12 md:col-span-3 md:sticky md:top-32 md:self-start">
          <span className="eyebrow">
            {lang === "zh" ? `章節` : `Chapter`} / {String(index).padStart(2, "0")}
          </span>
          <div
            data-reveal
            className="font-display text-[80px] md:text-[120px] leading-none tracking-[-0.05em] text-foreground/15 select-none"
          >
            {String(index).padStart(2, "0")}
          </div>
        </div>
        <div className="col-span-12 md:col-span-9">
          <h2
            data-reveal
            className="font-display text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] leading-[1.02] tracking-[-0.03em] mb-8 max-w-3xl"
          >
            {block.title[lang]}
          </h2>
          <p
            data-reveal
            className="text-subtitle max-w-2xl mb-16 text-foreground/70"
          >
            {block.body[lang]}
          </p>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-6">
                {lang === "zh" ? "服務內容" : "What's included"}
              </p>
              <ul className="divide-y divide-border border-y border-border">
                {block.features[lang].map((f, i) => (
                  <li
                    key={i}
                    className="py-4 flex items-baseline gap-5 text-foreground"
                  >
                    <span className="text-[11px] tabular-nums text-muted-foreground w-6">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="leading-[1.6]">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-6">
                {lang === "zh" ? "交付項目" : "Deliverables"}
              </p>
              <ul className="divide-y divide-border border-y border-border mb-10">
                {block.deliverables[lang].map((d, i) => (
                  <li
                    key={i}
                    className="py-4 flex items-baseline gap-5 text-foreground"
                  >
                    <span className="text-muted-foreground">→</span>
                    <span className="leading-[1.6]">{d}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-end justify-between gap-6 pt-6">
                <p className="font-display text-2xl md:text-3xl tracking-tight">
                  {block.price[lang]}
                </p>
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] border-b border-foreground pb-1 hover:opacity-70"
                >
                  {block.link[lang]}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Services = () => {
  const { lang } = useLanguage();
  const isZh = lang === "zh";
  const c = servicesContent;
  usePageMeta({
    title: pageMeta.services.title,
    description: pageMeta.services.description,
    canonical: "https://sonykundesign.com/services",
  });

  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className="relative pt-40 md:pt-52 pb-16 md:pb-28 overflow-hidden">
          <LinePattern variant="light" />
          <div className="relative z-10">
          <div className="container-wide">
            <div className="flex items-end justify-between mb-10">
              <span className="eyebrow !mb-0">{c.hero.eyebrow[lang]}</span>
              <span className="hidden md:inline text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {isZh ? "四個章節" : "Four chapters"}
              </span>
            </div>
            <SplitTextReveal
              as="h1"
              text={c.hero.title[lang]}
              className="heading-hero"
            />
            <p
              data-reveal
              className="text-subtitle max-w-2xl mt-10 text-foreground/70"
            >
              {c.hero.subtext[lang]}
            </p>
          </div>
        </section>

        <ServiceChapter index={1} block={c.website} lang={lang} />
        <ServiceChapter index={2} block={c.logo} lang={lang} />

        {/* MID CTA — full-bleed editorial */}
        <section className="py-24 md:py-32 bg-muted border-t border-border">
          <div className="container-wide grid md:grid-cols-[1fr_auto] gap-10 items-end">
            <div>
              <span className="eyebrow">{isZh ? "下一步" : "Next"}</span>
              <h2 className="font-display text-[32px] md:text-[56px] leading-[1.05] tracking-[-0.025em] max-w-2xl">
                {c.midCta.title[lang]}
              </h2>
              <p className="text-body mt-6 max-w-xl">{c.midCta.body[lang]}</p>
            </div>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-4 bg-foreground text-background px-6 py-4 rounded-full text-[12px] uppercase tracking-[0.22em] hover:bg-foreground/85 self-end"
            >
              {c.midCta.cta[lang]}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </section>

        {/* BUNDLES — editorial numbered row */}
        <section className="py-24 md:py-40 border-t border-border">
          <div className="container-wide">
            <div className="grid grid-cols-12 gap-6 md:gap-12 mb-16">
              <div className="col-span-12 md:col-span-3">
                <span className="eyebrow">
                  {isZh ? "章節 / 03" : "Chapter / 03"}
                </span>
              </div>
              <div className="col-span-12 md:col-span-9">
                <h2 className="heading-section mb-6">{c.bundles.title[lang]}</h2>
                <p className="text-body max-w-2xl">{c.bundles.body[lang]}</p>
              </div>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {c.bundles.cards.map((rawCard, i) => {
                const card = rawCard as typeof rawCard & {
                  badge?: { en: string; zh: string };
                };
                return (
                  <div
                    key={i}
                    className="py-10 md:py-14 grid grid-cols-12 gap-6 md:gap-10 items-start group hover:bg-muted/30 transition-colors -mx-6 px-6 md:-mx-12 md:px-12"
                  >
                    <div className="col-span-12 md:col-span-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="col-span-12 md:col-span-4">
                      <h3 className="font-display text-2xl md:text-4xl leading-tight tracking-tight">
                        {card.title[lang]}
                      </h3>
                      {card.badge && (
                        <span className="inline-block mt-3 text-[10px] uppercase tracking-[0.22em] border border-foreground px-2 py-1">
                          {card.badge[lang]}
                        </span>
                      )}
                    </div>
                    <div className="col-span-12 md:col-span-5 space-y-2">
                      {card.items[lang].map((it, j) => (
                        <p
                          key={j}
                          className="text-sm text-muted-foreground leading-[1.7]"
                        >
                          — {it}
                        </p>
                      ))}
                    </div>
                    <div className="col-span-12 md:col-span-2 md:text-right">
                      <p className="font-display text-2xl md:text-3xl tracking-tight">
                        {card.price}
                      </p>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-secondary mt-1">
                        {card.save[lang]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* HOSTING — asymmetric two-column */}
        <section className="py-24 md:py-40 bg-foreground text-background border-t border-border">
          <div className="container-wide">
            <div className="grid grid-cols-12 gap-6 md:gap-12 mb-16">
              <div className="col-span-12 md:col-span-3">
                <span className="eyebrow !text-background/45">
                  {isZh ? "章節 / 04" : "Chapter / 04"}
                </span>
              </div>
              <div className="col-span-12 md:col-span-9">
                <h2 className="font-display text-[36px] md:text-[64px] leading-[1.02] tracking-[-0.025em] mb-6">
                  {c.hosting.title[lang]}
                </h2>
                <p className="text-base md:text-lg text-background/70 max-w-2xl leading-[1.7]">
                  {c.hosting.body[lang]}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 md:gap-20">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-background/45 mb-6">
                  {c.hosting.handle.title[lang]}
                </p>
                <ul className="divide-y divide-background/15 border-y border-background/15">
                  {c.hosting.handle.items[lang].map((item, i) => (
                    <li
                      key={i}
                      className="py-4 flex items-baseline gap-5 text-background/90"
                    >
                      <span className="text-[11px] text-background/45 tabular-nums w-6">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-[1.6]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-8">
                <p className="text-[11px] uppercase tracking-[0.22em] text-background/45">
                  {c.hosting.options.title[lang]}
                </p>
                <div className="border-t border-background/20 pt-6">
                  <h4 className="font-display text-2xl mb-3">
                    {c.hosting.options.free.title[lang]}
                  </h4>
                  <p className="text-sm text-background/65 leading-[1.7]">
                    {c.hosting.options.free.body[lang]}
                  </p>
                </div>
                <div className="border-t border-background/20 pt-6">
                  <h4 className="font-display text-2xl mb-3">
                    {c.hosting.options.managed.title[lang]}
                  </h4>
                  <p className="text-sm text-background/65 leading-[1.7]">
                    {c.hosting.options.managed.body[lang]}
                  </p>
                </div>
                <p className="text-sm text-background/55 italic leading-[1.7] border-t border-background/20 pt-6">
                  {c.hosting.note[lang]}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 md:py-32">
          <div className="container-wide grid grid-cols-12 gap-8 md:gap-16">
            <div className="col-span-12 md:col-span-4 md:sticky md:top-32 md:self-start">
              <span className="eyebrow">{isZh ? "常見問題" : "FAQ"}</span>
              <h2 className="heading-section">{c.faq.title[lang]}</h2>
            </div>
            <div className="col-span-12 md:col-span-8">
              <FaqAccordion
                items={c.faq.items.map((item) => ({
                  q: item.q[lang],
                  a: item.a[lang],
                }))}
              />
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="bg-foreground text-background py-32 md:py-48">
          <div className="container-wide">
            <h2 className="font-display text-[40px] sm:text-[64px] md:text-[96px] lg:text-[120px] leading-[0.95] tracking-[-0.035em] mb-12">
              {c.bottomCta.title[lang]}
            </h2>
            <div className="grid md:grid-cols-[1fr_auto] gap-10 items-end max-w-5xl">
              <p className="text-lg md:text-xl text-background/65 max-w-xl leading-[1.6]">
                {c.bottomCta.body[lang]}
              </p>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-4 bg-background text-foreground px-8 py-5 rounded-full text-[12px] uppercase tracking-[0.22em] hover:bg-background/90"
              >
                {c.bottomCta.cta[lang]}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContactButton />
      <ScrollToTop />
    </>
  );
};

export default Services;
