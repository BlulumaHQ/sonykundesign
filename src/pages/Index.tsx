import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContactButton from "@/components/FloatingContactButton";
import ScrollToTop from "@/components/ScrollToTop";
import PortfolioGrid from "@/components/PortfolioGrid";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqAccordion from "@/components/FaqAccordion";
import ImageMarquee from "@/components/ImageMarquee";
import SplitTextReveal from "@/components/SplitTextReveal";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { homeContent, pageMeta, localBusinessJsonLd } from "@/i18n/pageContent";
import { usePageMeta } from "@/hooks/usePageMeta";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const featured = [...projects].filter((p) => p.featured).slice(0, 1)[0];

const Index = () => {
  const { lang } = useLanguage();
  const isZh = lang === "zh";
  usePageMeta({
    title: pageMeta.home.title,
    description: pageMeta.home.description,
    canonical: "https://sonykundesign.com/",
    jsonLd: localBusinessJsonLd,
  });

  const c = homeContent;
  const root = useRef<HTMLDivElement>(null);

  // GSAP scroll choreography: pinned philosophy, parallax featured image,
  // and horizontal capabilities ribbon.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      // Featured image parallax
      gsap.utils.toArray<HTMLElement>(".js-feature-img").forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.15, yPercent: -6 },
          {
            scale: 1,
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // Pinned philosophy chapter — large text grows in
      const phil = document.querySelector<HTMLElement>(".js-philosophy");
      if (phil) {
        const lines = phil.querySelectorAll<HTMLElement>(".js-philosophy-line");
        gsap.fromTo(
          lines,
          { opacity: 0.15 },
          {
            opacity: 1,
            stagger: 0.5,
            ease: "none",
            scrollTrigger: {
              trigger: phil,
              start: "top top",
              end: "+=120%",
              pin: true,
              scrub: 0.5,
            },
          }
        );
      }

      // Horizontal capability ribbon (desktop only)
      if (window.innerWidth >= 1024) {
        const ribbon = document.querySelector<HTMLElement>(".js-ribbon");
        const track = ribbon?.querySelector<HTMLElement>(".js-ribbon-track");
        if (ribbon && track) {
          const distance = track.scrollWidth - window.innerWidth + 96;
          gsap.to(track, {
            x: -distance,
            ease: "none",
            scrollTrigger: {
              trigger: ribbon,
              start: "top top",
              end: () => `+=${distance}`,
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });
        }
      }
    }, root);

    return () => ctx.revert();
  }, [lang]);

  const heroLine1 = isZh ? "為小型企業" : "Websites that";
  const heroLine2 = isZh ? "打造的網站。" : "earn trust —";
  const heroLine3 = isZh ? "3 天交付。" : "in 3 days.";

  return (
    <div ref={root}>
      <Header />
      <main>
        {/* ─────────── CINEMATIC HERO (shorter) ─────────── */}
        <section className="relative pt-28 md:pt-36 pb-12 md:pb-16 min-h-[88vh] md:min-h-[92vh] flex flex-col justify-center">
          <div className="container-wide w-full">
            <div className="flex items-end justify-between mb-8 md:mb-12">
              <span className="eyebrow !mb-0">{c.hero.eyebrow[lang]}</span>
              <span className="hidden md:inline text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {isZh ? "溫哥華 · 自 2005" : "Vancouver · Est. 2005"}
              </span>
            </div>

            <SplitTextReveal
              as="h1"
              text={heroLine1}
              className="heading-hero block"
            />
            <SplitTextReveal
              as="h1"
              text={heroLine2}
              className="heading-hero block text-muted-foreground"
              delay={0.15}
            />
            <SplitTextReveal
              as="h1"
              text={heroLine3}
              className="heading-hero block"
              delay={0.3}
            />

            <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-end">
              <p
                data-reveal
                className="text-subtitle max-w-xl text-foreground/70"
              >
                {c.hero.subhead[lang]}
              </p>
              <div data-reveal className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/pricing"
                  className="group inline-flex items-center justify-between gap-6 bg-foreground text-background px-6 py-4 text-[12px] uppercase tracking-[0.22em] hover:bg-foreground/85 transition-colors"
                >
                  {c.hero.ctaPrimary[lang]}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  to="/portfolio"
                  className="group inline-flex items-center justify-between gap-6 border border-foreground/25 px-6 py-4 text-[12px] uppercase tracking-[0.22em] hover:border-foreground hover:bg-foreground hover:text-background transition-colors"
                >
                  {c.hero.ctaSecondary[lang]}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Mouse scroll cue (bottom-centered) */}
          <div className="container-wide w-full mt-12 md:mt-16">
            <div className="pt-6 border-t border-border flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              <span>{c.hero.trust[lang]}</span>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline">{isZh ? "向下捲動" : "Scroll"}</span>
                <span className="scroll-cue-mouse text-foreground/60" aria-hidden />
              </div>
            </div>
          </div>
        </section>

        {/* ─────────── MARQUEE STRIP (kept) ─────────── */}
        <ImageMarquee />

        {/* ─────────── FEATURED PROJECT (parallax + asymmetric) ─────────── */}
        {featured && (
          <section className="py-20 md:py-32 border-t border-border">
            <div className="container-wide">
              <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
                <div className="col-span-12 md:col-span-3 md:sticky md:top-32">
                  <span className="eyebrow">
                    {isZh ? "近期作品 / 01" : "Recent work / 01"}
                  </span>
                  <h2
                    data-reveal
                    className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight mb-6"
                  >
                    {featured.name}
                  </h2>
                  <p
                    data-reveal
                    className="text-sm text-muted-foreground leading-[1.7] mb-6"
                  >
                    {featured.description}
                  </p>
                  <dl className="grid grid-cols-2 gap-y-3 text-[11px] uppercase tracking-[0.18em]">
                    <dt className="text-muted-foreground">
                      {isZh ? "產業" : "Industry"}
                    </dt>
                    <dd>{featured.industry}</dd>
                    <dt className="text-muted-foreground">
                      {isZh ? "年份" : "Year"}
                    </dt>
                    <dd>{featured.year}</dd>
                  </dl>
                  {featured.liveUrl && (
                    <a
                      href={featured.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] border-b border-foreground pb-1 hover:opacity-70"
                    >
                      {isZh ? "查看上線網站" : "View live"}{" "}
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <div className="col-span-12 md:col-span-9">
                  <div className="relative overflow-hidden aspect-[4/3] md:aspect-[16/10] bg-muted">
                    <img
                      src={featured.image}
                      alt={featured.alt}
                      className="js-feature-img absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─────────── PINNED PHILOSOPHY (richer scroll choreography) ─────────── */}
        <section className="js-philosophy bg-foreground text-background min-h-screen flex items-center relative overflow-hidden">
          {/* Faint scroll progress bar — animated by GSAP */}
          <div className="absolute top-0 left-0 right-0 h-px bg-white/10">
            <div className="js-phil-progress h-full bg-[#5B7189] w-0" />
          </div>

          <div className="container-wide py-24 relative">
            <div className="flex items-end justify-between mb-10">
              <span className="eyebrow !text-background/45 !mb-0">
                {c.process.eyebrow[lang]}
              </span>
              <span className="js-phil-counter text-[11px] uppercase tracking-[0.22em] text-background/45 tabular-nums">
                01 / 03
              </span>
            </div>

            <p className="font-display text-[36px] sm:text-[56px] md:text-[80px] lg:text-[112px] leading-[1.05] tracking-[-0.025em]">
              {c.process.steps.map((step, i) => (
                <span key={i} className="js-philosophy-line block relative">
                  <span className="inline-block align-baseline text-[#5B7189]/70 text-[0.35em] tracking-[0.22em] mr-4 md:mr-6 tabular-nums">
                    0{i + 1}
                  </span>
                  {step.title[lang]}.
                </span>
              ))}
            </p>

            <div className="mt-16 grid md:grid-cols-3 gap-10 text-background/65">
              {c.process.steps.map((step, i) => (
                <div key={i} className="js-phil-card border-t border-white/15 pt-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-background/45">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.22em] text-[#5B7189]">
                      {isZh ? "步驟" : "Step"}
                    </span>
                  </div>
                  <h3 className="font-display text-lg md:text-xl text-white mb-3 tracking-tight">
                    {step.title[lang]}
                  </h3>
                  <p className="text-sm leading-[1.7]">
                    {step.body[lang]}
                  </p>
                </div>
              ))}
            </div>

            {/* Mouse scroll cue */}
            <div className="mt-16 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-background/55">
              <span className="scroll-cue-mouse text-white/70" aria-hidden />
              <span>{isZh ? "繼續向下捲動" : "Keep scrolling"}</span>
            </div>
          </div>
        </section>

        {/* ─────────── HORIZONTAL CAPABILITIES RIBBON ─────────── */}
        <section className="js-ribbon py-24 md:py-32 overflow-hidden">
          <div className="container-wide mb-12">
            <span className="eyebrow">{c.services.eyebrow[lang]}</span>
            <h2 className="heading-section max-w-3xl">
              {c.services.title[lang]}
            </h2>
          </div>
          <div className="js-ribbon-track flex gap-6 lg:gap-10 pl-6 sm:pl-8 md:pl-12 lg:pl-16">
            {c.services.cards.map((rawCard, i) => {
              const card = rawCard as typeof rawCard & {
                badge?: { en: string; zh: string };
              };
              return (
                <Link
                  key={i}
                  to={card.href}
                  className="group shrink-0 w-[82vw] sm:w-[60vw] md:w-[48vw] lg:w-[36vw] xl:w-[30vw] border-t border-foreground pt-6 hover:bg-muted/40 transition-colors px-1"
                >
                  <div className="flex items-baseline justify-between mb-8">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                      {card.badge ? ` · ${card.badge[lang]}` : ""}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl leading-[1.05] tracking-tight mb-8 min-h-[2.2em]">
                    {card.title[lang]}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-[1.7] mb-10 max-w-md">
                    {card.body[lang]}
                  </p>
                  <span className="text-[12px] uppercase tracking-[0.22em] border-b border-foreground pb-1">
                    {card.price[lang]}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ─────────── PORTFOLIO PREVIEW SYSTEM (protected) ─────────── */}
        <section className="relative py-20 md:py-32 border-t border-border">
          <div className="container-wide mb-12 md:mb-16 flex items-end justify-between flex-wrap gap-6">
            <div>
              <span className="eyebrow">{c.portfolio.eyebrow[lang]}</span>
              <h2 className="heading-section max-w-2xl">
                {c.portfolio.title[lang]}
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] border-b border-foreground pb-1 hover:opacity-70"
            >
              {c.portfolio.cta[lang]} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {/* Protected component — scrollable preview interaction preserved */}
          <PortfolioGrid />
        </section>

        {/* ─────────── BUNDLE (dark editorial) ─────────── */}
        <section className="bg-foreground text-background py-24 md:py-40">
          <div className="container-wide">
            <div className="grid grid-cols-12 gap-8 md:gap-16">
              <div className="col-span-12 md:col-span-5">
                <span className="eyebrow !text-background/45">
                  {c.bundle.eyebrow[lang]}
                </span>
                <h2
                  data-reveal
                  className="font-display text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] leading-[1.02] tracking-[-0.025em]"
                >
                  {c.bundle.title[lang]}
                </h2>
              </div>
              <div className="col-span-12 md:col-span-7 md:pt-8">
                <p
                  data-reveal
                  className="text-base md:text-lg text-background/70 leading-[1.7] mb-10 max-w-xl"
                >
                  {c.bundle.body[lang]}
                </p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-4 mb-12 max-w-xl">
                  {c.bundle.checklist[lang].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-baseline gap-3 text-background/85 text-sm"
                    >
                      <span className="text-background/40 tabular-nums text-[11px]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/pricing"
                  className="group inline-flex items-center gap-4 bg-background text-foreground px-6 py-4 rounded-full text-[12px] uppercase tracking-[0.22em] hover:bg-background/90"
                >
                  {c.bundle.cta[lang]}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────── TESTIMONIALS (kept) ─────────── */}
        <TestimonialsSection />

        {/* ─────────── FAQ ─────────── */}
        <section className="py-24 md:py-32 border-t border-border">
          <div className="container-wide grid grid-cols-12 gap-8 md:gap-16">
            <div className="col-span-12 md:col-span-4 md:sticky md:top-32 md:self-start">
              <span className="eyebrow">{c.faq.eyebrow[lang]}</span>
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

        {/* ─────────── FINAL OVERSIZED CTA ─────────── */}
        <section className="bg-foreground text-background py-32 md:py-48">
          <div className="container-wide">
            <span className="eyebrow !text-background/45">
              {isZh ? "下一步" : "Next step"}
            </span>
            <h2 className="font-display text-[40px] sm:text-[64px] md:text-[96px] lg:text-[140px] leading-[0.95] tracking-[-0.035em] mb-12">
              {c.finalCta.title[lang]}
            </h2>
            <div className="grid md:grid-cols-[1fr_auto] gap-10 items-end max-w-5xl">
              <p className="text-lg md:text-xl text-background/65 max-w-xl leading-[1.6]">
                {c.finalCta.body[lang]}
              </p>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-4 bg-background text-foreground px-8 py-5 rounded-full text-[12px] uppercase tracking-[0.22em] hover:bg-background/90"
              >
                {c.finalCta.cta[lang]}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContactButton />
      <ScrollToTop />
    </div>
  );
};

export default Index;
