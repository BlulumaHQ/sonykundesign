import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContactButton from "@/components/FloatingContactButton";
import ScrollToTop from "@/components/ScrollToTop";
import FaqAccordion from "@/components/FaqAccordion";
import SplitTextReveal from "@/components/SplitTextReveal";
import LinePattern from "@/components/LinePattern";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { pricingContent, pageMeta, pageMetaZh } from "@/i18n/pageContent";
import { usePageMeta } from "@/hooks/usePageMeta";

interface RowProps {
  index: number;
  title: string;
  price: string;
  note?: string;
  description?: string;
  features?: readonly string[];
  badge?: string;
  save?: string;
}

const PriceRow = ({
  index,
  title,
  price,
  note,
  description,
  features,
  badge,
  save,
}: RowProps) => (
  <div className="py-10 md:py-14 grid grid-cols-12 gap-6 md:gap-10 items-start group hover:bg-muted/30 transition-colors -mx-6 px-6 md:-mx-12 md:px-12">
    <div className="col-span-12 md:col-span-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
      {String(index).padStart(2, "0")}
    </div>
    <div className="col-span-12 md:col-span-4">
      <h3 className="font-display text-2xl md:text-3xl leading-tight tracking-tight">
        {title}
      </h3>
      {badge && (
        <span className="inline-block mt-3 text-[10px] uppercase tracking-[0.22em] border border-foreground px-2 py-1">
          {badge}
        </span>
      )}
      {description && (
        <p className="text-sm text-muted-foreground leading-[1.7] mt-4 max-w-md">
          {description}
        </p>
      )}
    </div>
    <div className="col-span-12 md:col-span-5 space-y-2">
      {features?.map((f, j) => (
        <p key={j} className="text-sm text-muted-foreground leading-[1.7]">
          — {f}
        </p>
      ))}
    </div>
    <div className="col-span-12 md:col-span-2 md:text-right">
      <p className="font-display text-3xl md:text-4xl tracking-tight">{price}</p>
      {save && (
        <p className="text-[11px] uppercase tracking-[0.18em] text-secondary mt-1">
          {save}
        </p>
      )}
      {note && (
        <p className="text-[11px] text-muted-foreground mt-1">{note}</p>
      )}
    </div>
  </div>
);

const Pricing = () => {
  const { lang } = useLanguage();
  const isZh = lang === "zh";
  const c = pricingContent;
  usePageMeta({
    title: (isZh ? pageMetaZh : pageMeta).pricing.title,
    description: (isZh ? pageMetaZh : pageMeta).pricing.description,
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
              <span className="eyebrow !mb-0">{c.header.eyebrow[lang]}</span>
              <span className="hidden md:inline text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {isZh ? "先看預覽 · 再付款" : "Preview first · pay after"}
              </span>
            </div>
            <SplitTextReveal
              as="h1"
              text={c.header.title[lang]}
              className="heading-hero"
            />
            <p
              data-reveal
              className="text-subtitle max-w-2xl mt-10 text-foreground/70"
            >
              {c.header.subtext[lang]}
            </p>
          </div>
          </div>
        </section>

        {/* WEBSITES */}
        <section className="py-20 md:py-32 border-t border-border">
          <div className="container-wide">
            <div className="grid grid-cols-12 gap-6 md:gap-12 mb-12">
              <div className="col-span-12 md:col-span-3">
                <span className="eyebrow">{isZh ? "01" : "01"}</span>
              </div>
              <div className="col-span-12 md:col-span-9">
                <h2 className="heading-section">{c.website.title[lang]}</h2>
              </div>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {c.website.cards.map((rawCard, i) => {
                const card = rawCard as typeof rawCard & {
                  badge?: { en: string; zh: string };
                  note?: { en: string; zh: string };
                  description?: { en: string; zh: string };
                };
                return (
                  <PriceRow
                    key={i}
                    index={i + 1}
                    title={card.title[lang]}
                    price={card.price}
                    note={card.note?.[lang]}
                    description={card.description?.[lang]}
                    features={card.features[lang]}
                    badge={card.badge?.[lang]}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* BUNDLES */}
        <section className="py-20 md:py-32 bg-muted border-t border-border">
          <div className="container-wide">
            <div className="grid grid-cols-12 gap-6 md:gap-12 mb-12">
              <div className="col-span-12 md:col-span-3">
                <span className="eyebrow">{isZh ? "02" : "02"}</span>
              </div>
              <div className="col-span-12 md:col-span-9">
                <h2 className="heading-section mb-4">
                  {c.bundles.title[lang]}
                </h2>
                <p className="text-body max-w-2xl">{c.bundles.body[lang]}</p>
              </div>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {c.bundles.cards.map((rawCard, i) => {
                const card = rawCard as typeof rawCard & {
                  badge?: { en: string; zh: string };
                };
                return (
                  <PriceRow
                    key={i}
                    index={i + 1}
                    title={card.title[lang]}
                    price={card.price}
                    description={card.subtitle[lang]}
                    features={card.items[lang]}
                    badge={card.badge?.[lang]}
                    save={card.tagline[lang]}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* BRANDING — narrative + addons row */}
        <section className="py-24 md:py-40 border-t border-border">
          <div className="container-wide">
            <div className="grid grid-cols-12 gap-6 md:gap-12 mb-12">
              <div className="col-span-12 md:col-span-3">
                <span className="eyebrow">{isZh ? "03" : "03"}</span>
              </div>
              <div className="col-span-12 md:col-span-9">
                <h2 className="heading-section mb-6">
                  {c.branding.title[lang]}
                </h2>
                <p className="text-body max-w-2xl mb-4">
                  {c.branding.body[lang]}
                </p>
              </div>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {c.branding.cards.map((rawCard, i) => {
                const card = rawCard as typeof rawCard & {
                  badge?: { en: string; zh: string };
                };
                return (
                  <PriceRow
                    key={i}
                    index={i + 1}
                    title={card.title[lang]}
                    price={card.price}
                    note="CAD"
                    description={card.subtitle[lang]}
                    features={card.features[lang]}
                    badge={card.badge?.[lang]}
                  />
                );
              })}
            </div>
            <p className="text-base md:text-xl text-foreground/55 italic max-w-3xl mt-16 leading-[1.55]">
              "{c.branding.closingLine[lang]}"
            </p>
          </div>
        </section>

        {/* HOSTING */}
        <section className="py-20 md:py-32 bg-muted border-t border-border">
          <div className="container-wide">
            <div className="grid grid-cols-12 gap-6 md:gap-12 mb-12">
              <div className="col-span-12 md:col-span-3">
                <span className="eyebrow">{isZh ? "04" : "04"}</span>
              </div>
              <div className="col-span-12 md:col-span-9">
                <h2 className="heading-section">{c.hosting.title[lang]}</h2>
              </div>
            </div>
            <div className="divide-y divide-border border-y border-border">
              <PriceRow
                index={1}
                title={c.hosting.free.title[lang]}
                price={c.hosting.free.price}
                description={c.hosting.free.body[lang]}
              />
              <PriceRow
                index={2}
                title={c.hosting.managed.title[lang]}
                price={c.hosting.managed.price[lang]}
                features={c.hosting.managed.features[lang]}
                save={c.hosting.managed.note[lang]}
              />
            </div>
            <p className="text-sm text-muted-foreground leading-[1.7] max-w-3xl mt-10">
              {c.hosting.managed.ownership[lang]}
            </p>
          </div>
        </section>

        {/* ADD-ONS */}
        <section className="py-20 md:py-32 border-t border-border">
          <div className="container-wide">
            <div className="grid grid-cols-12 gap-6 md:gap-12 mb-12">
              <div className="col-span-12 md:col-span-3">
                <span className="eyebrow">{isZh ? "05" : "05"}</span>
              </div>
              <div className="col-span-12 md:col-span-9">
                <h2 className="heading-section">{c.addons.title[lang]}</h2>
              </div>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {c.addons.cards.map((card, i) => (
                <PriceRow
                  key={i}
                  index={i + 1}
                  title={card.title[lang]}
                  price={
                    typeof card.price === "string"
                      ? card.price
                      : card.price[lang]
                  }
                  description={card.body[lang]}
                />
              ))}
            </div>
          </div>
        </section>

        {/* GRAPHIC DESIGN */}
        <section className="py-20 md:py-32 bg-muted border-t border-border">
          <div className="container-wide">
            <div className="grid grid-cols-12 gap-6 md:gap-12 mb-12">
              <div className="col-span-12 md:col-span-3">
                <span className="eyebrow">06</span>
              </div>
              <div className="col-span-12 md:col-span-9">
                <h2 className="heading-section">{c.graphic.title[lang]}</h2>
              </div>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {c.graphic.cards.map((card, i) => (
                <PriceRow
                  key={i}
                  index={i + 1}
                  title={card.title[lang]}
                  price={
                    typeof card.price === "string"
                      ? card.price
                      : card.price[lang]
                  }
                  description={card.body[lang]}
                />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 md:py-32 border-t border-border">
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

export default Pricing;
