import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";
import { homeContent } from "@/i18n/pageContent";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const testimonials = {
  en: [
    { quote: "Working with Sony was very straightforward. We needed a simple professional website and he delivered exactly what we were looking for.", name: "Dr. Lee", company: "Friendly Dental" },
    { quote: "Our old website looked outdated and Sony helped modernize it quickly. The new site looks far more professional.", name: "Kevin Chen", company: "KChen Construction" },
    { quote: "I appreciated the transparency about pricing. There were no hidden costs and the process was smooth from start to finish.", name: "Michael Tran", company: "Small Business Owner" },
  ],
  zh: [
    { quote: "與 Sony 合作非常順利。我們需要一個簡單專業的網站，他完全做到了我們期望的效果。", name: "Dr. Lee", company: "Friendly Dental" },
    { quote: "我們的舊網站看起來很過時，Sony 很快就幫我們完成了現代化。新網站看起來專業多了。", name: "Kevin Chen", company: "KChen Construction" },
    { quote: "我很欣賞定價方面的透明度。沒有任何隱藏費用，整個過程從頭到尾都很順利。", name: "Michael Tran", company: "小型企業主" },
  ],
};

const capabilities = {
  en: [
    { k: "01", t: "Website Design", d: "Professional, mobile-friendly websites built for small businesses. From single-page sites to full multi-page builds." },
    { k: "02", t: "Logo & Brand Identity", d: "Logos, colour palettes, typography systems, and brand guidelines that make your business look established." },
    { k: "03", t: "Website + Brand Bundle", d: "Website and logo designed together. Our most popular option for businesses launching from scratch." },
    { k: "04", t: "Hosting & Maintenance", d: "We handle all the technical side — hosting, domain setup, transfers, and ongoing maintenance." },
  ],
  zh: [
    { k: "01", t: "網站設計", d: "為小型企業打造的專業、手機友善網站。從單頁網站到完整多頁建置。" },
    { k: "02", t: "Logo 與品牌識別", d: "Logo、配色、字體系統與品牌規範，讓您的業務看起來專業且值得信賴。" },
    { k: "03", t: "網站 + 品牌套裝", d: "網站與 Logo 一起設計。從零開始的客戶最常選擇的方案。" },
    { k: "04", t: "主機與維護", d: "主機、網域、轉移與維護所有技術細節由我們處理，您完全不需要動手。" },
  ],
};

const Studio = () => {
  const { lang, setLang } = useLanguage();
  const c = homeContent;
  const isZh = lang === "zh";

  // Real Sonykun projects
  const featured = projects.find((p) => p.slug === "one-park-home")!;
  const grid = ["presotea", "btn-real-estate", "helen-lam-real-estate", "little-mountain-dental", "friendly-dental"]
    .map((s) => projects.find((p) => p.slug === s)!)
    .filter(Boolean);

  const root = useRef<HTMLDivElement>(null);
  const heroHeadline = useRef<HTMLHeadingElement>(null);
  const featuredImg = useRef<HTMLDivElement>(null);
  const featuredMask = useRef<HTMLDivElement>(null);
  const featuredText = useRef<HTMLDivElement>(null);
  const philosophy = useRef<HTMLElement>(null);
  const philosophyWords = useRef<HTMLSpanElement[]>([]);
  const horizontal = useRef<HTMLDivElement>(null);
  const horizontalTrack = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const chars = heroHeadline.current?.querySelectorAll<HTMLSpanElement>("[data-char]");
      if (chars && chars.length) {
        gsap.from(chars, {
          yPercent: 110,
          opacity: 0,
          ease: "power3.out",
          stagger: { each: 0.012 },
          scrollTrigger: {
            trigger: heroHeadline.current!,
            start: "top 85%",
            end: "bottom 40%",
            scrub: 0.6,
          },
        });
      }

      if (featuredMask.current && featuredImg.current) {
        gsap.to(featuredMask.current, {
          scaleY: 0,
          transformOrigin: "top center",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: featuredImg.current,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        });
        gsap.to(featuredImg.current.querySelector("img"), {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: featuredImg.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
      if (featuredText.current) {
        gsap.from(featuredText.current.querySelectorAll("[data-rise]"), {
          yPercent: 100,
          opacity: 0,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: featuredText.current, start: "top 80%" },
        });
      }

      gridRef.current?.querySelectorAll<HTMLElement>("[data-card]").forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          scale: 0.96,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
      });

      if (philosophy.current && philosophyWords.current.length) {
        gsap.fromTo(
          philosophy.current,
          { backgroundColor: "#ffffff", color: "#0a0a0a" },
          {
            backgroundColor: "#192943",
            color: "#fafafa",
            ease: "none",
            scrollTrigger: {
              trigger: philosophy.current,
              start: "top top",
              end: "+=1200",
              scrub: true,
              pin: true,
            },
          }
        );
        gsap.from(philosophyWords.current, {
          opacity: 0.1,
          ease: "none",
          stagger: 0.5,
          scrollTrigger: {
            trigger: philosophy.current,
            start: "top top",
            end: "+=1200",
            scrub: true,
          },
        });
      }

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        if (!horizontal.current || !horizontalTrack.current) return;
        const distance = horizontalTrack.current.scrollWidth - window.innerWidth;
        gsap.to(horizontalTrack.current, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: horizontal.current,
            start: "top top",
            end: () => `+=${distance}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [lang]);

  const splitChars = (text: string) =>
    text.split("").map((ch, i) => (
      <span key={i} className="inline-block overflow-hidden align-bottom">
        <span data-char className="inline-block will-change-transform">
          {ch === " " ? "\u00A0" : ch}
        </span>
      </span>
    ));

  // Bilingual headline
  const headline = isZh
    ? { l1: "3 個工作天內", l2: "獲得專業網站", italic: "獲得專業網站" }
    : { l1: "Get a professional", l2: "website in 3 days.", italic: "professional" };

  const philosophyText = isZh
    ? "付款前先看到網站預覽。確認方向後，3 個工作天內讓您的網站乾淨、清晰、可信地上線。"
    : "You see your website preview before you pay. Then we ship — clean, clear, and credible — in three business days.";
  const philosophyTokens = isZh ? Array.from(philosophyText) : philosophyText.split(" ");

  return (
    <div ref={root} className="bg-neutral-50 text-neutral-950 font-body antialiased">
      {/* Announcement */}
      <div className="w-full border-b border-neutral-200 bg-neutral-50 text-[11px] tracking-[0.18em] uppercase">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-2.5">
          <span className="text-neutral-500">{c.hero.trust[lang]}</span>
          <button
            onClick={() => setLang(isZh ? "en" : "zh")}
            className="text-neutral-500 hover:text-neutral-950 transition"
            aria-label="Toggle language"
          >
            {isZh ? "EN" : "中文"}
          </button>
        </div>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-neutral-50/80 border-b border-neutral-200/60">
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5">
          <Link to="/" className="font-display text-sm font-semibold tracking-tight">Sonykun Design</Link>
          <ul className="hidden md:flex items-center gap-10 text-sm text-neutral-600">
            <li><Link to="/work" className="hover:text-neutral-950 transition">{isZh ? "作品" : "Work"}</Link></li>
            <li><Link to="/services" className="hover:text-neutral-950 transition">{isZh ? "服務內容" : "Services"}</Link></li>
            <li><Link to="/pricing" className="hover:text-neutral-950 transition">{isZh ? "價格" : "Pricing"}</Link></li>
            <li><Link to="/contact" className="hover:text-neutral-950 transition">{isZh ? "聯絡我" : "Contact"}</Link></li>
          </ul>
          <Link
            to="/contact"
            className="text-sm border border-neutral-950 px-4 py-2 rounded-full hover:bg-neutral-950 hover:text-neutral-50 transition"
          >
            {c.finalCta.cta[lang]}
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="min-h-[100svh] flex flex-col justify-between px-6 pt-16 pb-10 mx-auto max-w-[1600px]">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-neutral-500"
        >
          <span>{c.hero.eyebrow[lang]}</span>
          <span>{isZh ? "自 2005 年" : "Est. 2005"}</span>
        </motion.div>

        <h1
          ref={heroHeadline}
          className="font-display text-[clamp(2.75rem,11vw,12rem)] leading-[0.95] tracking-[-0.03em] mt-12 font-medium"
        >
          <span className="block">{splitChars(headline.l1)}</span>
          <span className="block italic text-neutral-500">{splitChars(headline.l2)}</span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-end"
        >
          <p className="md:col-span-2 max-w-xl text-neutral-600 text-base leading-relaxed">
            {c.hero.subhead[lang]}
          </p>
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 md:text-right">
            {isZh ? "向下捲動 ↓" : "Scroll to begin ↓"}
          </div>
        </motion.div>
      </section>

      {/* Featured Project — One Park Home */}
      <section className="px-6 py-32 mx-auto max-w-[1600px]">
        <div className="flex items-end justify-between mb-10">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            {isZh ? "精選作品 · 2026" : "Featured · 2026"}
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Case 001</span>
        </div>

        <div ref={featuredImg} className="relative w-full aspect-[16/9] overflow-hidden bg-neutral-200">
          <img
            src={featured.image}
            alt={featured.alt}
            className="w-full h-[115%] object-cover"
            loading="lazy"
          />
          <div ref={featuredMask} className="absolute inset-0 bg-neutral-50" style={{ transformOrigin: "top center" }} />
        </div>

        <div ref={featuredText} className="grid md:grid-cols-2 gap-10 mt-12">
          <div className="overflow-hidden">
            <h2 data-rise className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05] font-medium">
              {featured.name} — {featured.industry}
            </h2>
          </div>
          <div className="space-y-6 text-neutral-600 max-w-md">
            <div className="overflow-hidden"><p data-rise>{featured.description}</p></div>
            <div className="overflow-hidden">
              <Link
                to={`/work/${featured.slug}`}
                data-rise
                className="inline-block text-xs uppercase tracking-[0.2em] text-neutral-950 border-b border-neutral-950 pb-1 hover:opacity-60 transition"
              >
                {isZh ? "查看案例 →" : "View case study →"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Work Grid — real projects */}
      <section id="work" className="px-6 py-32 mx-auto max-w-[1600px]">
        <div className="flex items-end justify-between mb-16">
          <h2 className="font-display text-3xl md:text-5xl tracking-tight font-medium">
            {c.portfolio.title[lang]}
          </h2>
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">2024 — 2026</span>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24">
          {grid.map((p, i) => (
            <Link
              key={p.slug}
              data-card
              to={`/work/${p.slug}`}
              className={`group block ${i % 2 === 1 ? "md:mt-24" : ""}`}
            >
              <div className="overflow-hidden bg-neutral-200 aspect-[4/3]">
                <img
                  src={p.image}
                  alt={p.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl tracking-tight font-medium">{p.name}</h3>
                <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 text-right">
                  {p.industry} · {p.year}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link
            to="/work"
            className="inline-block text-xs uppercase tracking-[0.2em] border border-neutral-950 px-7 py-4 hover:bg-neutral-950 hover:text-neutral-50 transition"
          >
            {c.portfolio.cta[lang]}
          </Link>
        </div>
      </section>

      {/* Philosophy — pinned, word by word, bg morph */}
      <section
        id="philosophy"
        ref={philosophy}
        className="min-h-[100svh] flex items-center px-6"
      >
        <div className="mx-auto max-w-[1400px]">
          <span className="block text-xs uppercase tracking-[0.2em] mb-10 opacity-60">
            {isZh ? "我們的理念" : "Philosophy"}
          </span>
          <p className="font-display text-3xl md:text-6xl lg:text-7xl leading-[1.15] tracking-tight font-medium">
            {philosophyTokens.map((w, i) => (
              <span
                key={i}
                ref={(el) => { if (el) philosophyWords.current[i] = el; }}
                className={`inline-block ${isZh ? "" : "mr-[0.25em]"}`}
              >
                {w}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* Horizontal capabilities */}
      <section id="capabilities" ref={horizontal} className="relative bg-neutral-50 overflow-hidden">
        <div className="lg:h-screen lg:flex lg:items-center">
          <div ref={horizontalTrack} className="hidden lg:flex items-stretch gap-8 pl-[8vw] pr-[20vw]">
            <div className="shrink-0 w-[40vw] flex flex-col justify-center pr-12">
              <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6">
                {c.services.eyebrow[lang]}
              </span>
              <h2 className="font-display text-5xl xl:text-7xl tracking-tight leading-[1.02] font-medium">
                {c.services.title[lang]}
              </h2>
            </div>
            {capabilities[lang].map((cap) => (
              <article
                key={cap.k}
                className="shrink-0 w-[28vw] h-[60vh] bg-white border border-neutral-200 p-10 flex flex-col justify-between"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">{cap.k}</span>
                <div>
                  <h3 className="font-display text-3xl mb-4 font-medium">{cap.t}</h3>
                  <p className="text-neutral-600 leading-relaxed">{cap.d}</p>
                </div>
              </article>
            ))}
          </div>

          {/* mobile stack */}
          <div className="lg:hidden px-6 py-24">
            <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6 block">
              {c.services.eyebrow[lang]}
            </span>
            <h2 className="font-display text-4xl tracking-tight mb-12 font-medium">
              {c.services.title[lang]}
            </h2>
            <div className="space-y-4">
              {capabilities[lang].map((cap) => (
                <article key={cap.k} className="border border-neutral-200 bg-white p-8">
                  <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">{cap.k}</span>
                  <h3 className="font-display text-2xl mt-3 mb-2 font-medium">{cap.t}</h3>
                  <p className="text-neutral-600">{cap.d}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials — minimal editorial */}
      <section className="px-6 py-32 mx-auto max-w-[1600px]">
        <div className="flex items-end justify-between mb-16">
          <h2 className="font-display text-3xl md:text-5xl tracking-tight font-medium">
            {c.reviews.title[lang]}
          </h2>
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">{c.reviews.eyebrow[lang]}</span>
        </div>
        <div className="grid md:grid-cols-3 gap-10 border-t border-neutral-200 pt-12">
          {testimonials[lang].map((t, i) => (
            <figure key={i} className="space-y-6">
              <blockquote className="font-display text-xl leading-snug">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                {t.name} · {t.company}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-neutral-950 text-neutral-50 px-6 py-32">
        <div className="mx-auto max-w-[1600px]">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            {isZh ? "聯絡 · 2026" : "Contact · 2026"}
          </span>
          <h2 className="font-display mt-8 text-[clamp(2.5rem,9vw,9rem)] leading-[0.95] tracking-[-0.02em] font-medium">
            {c.finalCta.title[lang]}
          </h2>
          <p className="mt-8 text-lg text-neutral-400 max-w-xl">{c.finalCta.body[lang]}</p>
          <div className="mt-12">
            <Link
              to="/contact"
              className="inline-block bg-neutral-50 text-neutral-950 px-8 py-4 rounded-full text-sm hover:bg-neutral-200 transition"
            >
              {c.finalCta.cta[lang]}
            </Link>
          </div>
          <div className="mt-20 grid md:grid-cols-3 gap-10 border-t border-neutral-800 pt-10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">
                {isZh ? "電子郵件" : "Email"}
              </p>
              <a href="mailto:hello@sonykundesign.com" className="text-lg hover:text-neutral-400 transition">
                hello@sonykundesign.com
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">
                {isZh ? "電話 / 簡訊" : "Call / Text"}
              </p>
              <a href="tel:+17786535353" className="text-lg hover:text-neutral-400 transition">
                (778) 653-5353
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">
                {isZh ? "工作室" : "Studio"}
              </p>
              <p className="text-lg">Vancouver, BC</p>
            </div>
          </div>
        </div>
        <footer className="mx-auto max-w-[1600px] mt-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs uppercase tracking-[0.2em] text-neutral-500">
          <span>Sonykun Design © 2026</span>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-neutral-50 transition">{isZh ? "隱私政策" : "Privacy"}</Link>
            <Link to="/terms" className="hover:text-neutral-50 transition">{isZh ? "服務條款" : "Terms"}</Link>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default Studio;
