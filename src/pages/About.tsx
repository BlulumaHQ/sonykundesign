import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SplitTextReveal from "@/components/SplitTextReveal";
import LinePattern from "@/components/LinePattern";
import portrait from "@/assets/about-portrait.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { lang } = useLanguage();
  const isZh = lang === "zh";
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      // Generic reveal
      gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      // Portrait parallax
      const img = root.current?.querySelector<HTMLElement>(".js-portrait-img");
      if (img) {
        gsap.to(img, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: img.parentElement!, start: "top bottom", end: "bottom top", scrub: 0.6 },
        });
      }

      // Timeline progress bar + items
      const timeline = root.current?.querySelector<HTMLElement>(".js-timeline");
      if (timeline) {
        const bar = timeline.querySelector<HTMLElement>(".js-timeline-bar");
        if (bar) {
          gsap.to(bar, {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top",
            scrollTrigger: { trigger: timeline, start: "top 60%", end: "bottom 70%", scrub: 0.4 },
          });
        }
        timeline.querySelectorAll<HTMLElement>(".js-tl-item").forEach((it) => {
          gsap.from(it, {
            x: 40,
            opacity: 0,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: { trigger: it, start: "top 80%", once: true },
          });
        });
      }

      // Philosophy pinned lines
      const phil = root.current?.querySelector<HTMLElement>(".js-philosophy");
      if (phil && window.innerWidth >= 768) {
        const lines = phil.querySelectorAll<HTMLElement>(".js-phil-line");
        gsap.set(lines, { opacity: 0.15 });
        ScrollTrigger.create({
          trigger: phil,
          start: "top top",
          end: () => `+=${lines.length * 400}`,
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => {
            const idx = Math.min(lines.length - 1, Math.floor(self.progress * lines.length));
            lines.forEach((l, i) => {
              gsap.to(l, { opacity: i <= idx ? 1 : 0.15, duration: 0.4, overwrite: "auto" });
            });
          },
        });
      }

      // Service marquee words
      const words = root.current?.querySelectorAll<HTMLElement>(".js-service-word");
      words?.forEach((w, i) => {
        gsap.from(w, {
          xPercent: i % 2 === 0 ? -8 : 8,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: w, start: "top 85%", once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [lang]);

  // -------- Content --------
  const hero = {
    eyebrow: isZh ? "關於 / 工作室" : "About / Studio",
    headline: isZh
      ? "設計品牌。\n建立系統。\n解決商業問題。"
      : "Designing Brands.\nBuilding Systems.\nSolving Business Problems.",
    sub: isZh
      ? "嗨，我是 Sony Lin — Emily Carr University of Art + Design 畢業，從事設計、品牌、網站與數位行銷超過 15 年。"
      : "Hi, I'm Sony Lin — graduate of Emily Carr University of Art + Design, working in design, branding, websites and digital marketing for over 15 years.",
  };

  const story = isZh
    ? [
        "多年下來我學到一件事：成功的企業不是因為擁有漂亮的 Logo 或好看的網站才成長。",
        "他們成長，是因為品牌的每一個環節都在協同運作 — 網站帶來潛在客戶、品牌建立信任、行銷系統創造機會、技術消除阻力。",
        "因此 SonyKun Design 建立於一個簡單的理念：設計不只是要好看，它必須幫助企業成長。",
        "今天我們服務的對象遍及加拿大及海外 — 創業家、房地產經紀、牙醫、建設公司、服務型產業，以及成長中的品牌。",
        "我們的工作遠遠超越平面設計：協助企業打造完整的數位生態系，整合品牌、網站、自動化、AI 工具、客戶開發系統與長期成長策略。",
      ]
    : [
        "Over the years I've learned that successful businesses don't grow because they have a beautiful logo or a nice website.",
        "They grow because every part of their brand works together — a website generates leads, a brand builds trust, a marketing system creates opportunities, technology removes friction.",
        "That's why SonyKun Design was built around a simple philosophy: design should not only look good — it should help businesses grow.",
        "Today we work with entrepreneurs, realtors, dentists, construction companies, service businesses and growing brands across Canada and beyond.",
        "Our work goes far beyond graphic design. We help businesses create complete digital ecosystems — branding, websites, automation, AI tools, customer acquisition systems and long-term growth strategies.",
      ];

  const timeline = isZh
    ? [
        { year: "2005", title: "起點 · 平面設計", body: "於溫哥華開始接案，專注於品牌識別、印刷與視覺設計。" },
        { year: "2010", title: "Emily Carr 畢業", body: "Emily Carr University of Art + Design 畢業，奠定創意與系統思考基礎。" },
        { year: "2014", title: "拓展至網站", body: "從視覺設計延伸至網站設計與開發，協助企業建立線上形象。" },
        { year: "2018", title: "數位行銷與 SEO", body: "整合 SEO、本地搜尋、Google Business 與行銷漏斗系統。" },
        { year: "2022", title: "自動化與 CRM", body: "導入 CRM、表單與工作流程自動化，為客戶打造可規模化系統。" },
        { year: "2025", title: "AI 整合工作流", body: "結合 AI 工具與客製化系統，為小型企業創造更高效率與槓桿。" },
      ]
    : [
        { year: "2005", title: "Start · Graphic Design", body: "Started freelancing in Vancouver, focused on brand identity, print and visual design." },
        { year: "2010", title: "Emily Carr Graduate", body: "Graduated from Emily Carr University of Art + Design, building a foundation in creative + systems thinking." },
        { year: "2014", title: "Expanded to Web", body: "Moved from visual design into website design + development to help businesses build an online presence." },
        { year: "2018", title: "Marketing & SEO", body: "Integrated SEO, local search, Google Business and full marketing funnels into client engagements." },
        { year: "2022", title: "Automation & CRM", body: "Brought CRM, forms and workflow automation in-house to design scalable client systems." },
        { year: "2025", title: "AI-Powered Workflows", body: "Combined AI tools with custom systems to give small businesses outsized leverage." },
      ];

  const services = isZh
    ? ["品牌識別設計", "網站設計與開發", "電商解決方案", "SEO 與本地搜尋", "CRM 與商業自動化", "AI 整合與工作流", "數位行銷策略", "客製商業解決方案"]
    : ["Brand Identity", "Website Design & Development", "E-Commerce Solutions", "SEO & Local Search", "CRM & Business Automation", "AI Integration & Workflows", "Digital Marketing Strategy", "Custom Business Solutions"];

  const philosophy = isZh
    ? [
        "許多代理商專注於設計。",
        "許多開發者專注於程式。",
        "許多顧問專注於策略。",
        "我們把這三者結合在一起。",
        "我們相信，好設計必須創造可衡量的商業價值。",
      ]
    : [
        "Many agencies focus on design.",
        "Many developers focus on code.",
        "Many consultants focus on strategy.",
        "We combine all three.",
        "Great design should create measurable business value.",
      ];

  const compareRows = isZh
    ? [
        { topic: "服務範圍", trad: "只負責單一專業 — 設計、或開發、或行銷", us: "品牌、網站、自動化、AI 與成長 — 一個夥伴整合" },
        { topic: "決策方式", trad: "依模板或流程交付", us: "依您的客戶、產業與目標客製" },
        { topic: "衡量標準", trad: "以「看起來漂亮」為成功", us: "以「帶來客戶與營收」為成功" },
        { topic: "長期合作", trad: "交付後即結束", us: "持續優化、自動化與成長策略" },
      ]
    : [
        { topic: "Scope", trad: "Single discipline — design, dev or marketing", us: "Brand, web, automation, AI & growth in one partner" },
        { topic: "Approach", trad: "Template-led delivery", us: "Tailored to your customers, industry and goals" },
        { topic: "Definition of done", trad: "It looks nice", us: "It brings customers and revenue" },
        { topic: "Engagement", trad: "Ends at launch", us: "Ongoing optimisation, automation, growth" },
      ];

  const industries = isZh
    ? ["房地產經紀", "牙醫診所", "建設公司", "服務型企業", "專業服務", "小型企業主"]
    : ["Realtors", "Dentists", "Construction Companies", "Service Businesses", "Professional Services", "Small Business Owners"];

  return (
    <>
      <Header />
      <main ref={root}>
        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative min-h-[100svh] flex flex-col justify-end pt-40 md:pt-48 pb-16 md:pb-20 overflow-hidden">
          <LinePattern variant="light" />
          <div className="container-wide relative z-10">
            <div className="flex items-end justify-between mb-10 md:mb-16">
              <span className="eyebrow !mb-0">
                <span className="inline-block w-8 h-px bg-[#5B7189] align-middle mr-3" />
                {hero.eyebrow}
              </span>
              <span className="hidden md:inline text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {isZh ? "自 2005 · 溫哥華" : "Since 2005 · Vancouver"}
              </span>
            </div>
            <SplitTextReveal
              as="h1"
              text={hero.headline}
              className="font-display font-medium leading-[0.92] tracking-[-0.035em] text-[clamp(2.6rem,8.4vw,8.5rem)]"
            />
            <div className="mt-12 md:mt-20 grid grid-cols-12 gap-8">
              <p
                data-rise
                className="col-span-12 md:col-start-7 md:col-span-6 text-lg md:text-xl text-muted-foreground leading-[1.6] max-w-xl"
              >
                {hero.sub}
              </p>
            </div>
          </div>
        </section>

        {/* ── FOUNDER STORY · sticky portrait + scrolling copy ─ */}
        <section className="border-t border-border bg-muted/40">
          <div className="container-wide py-24 md:py-40 grid grid-cols-12 gap-8 md:gap-16">
            {/* Sticky portrait */}
            <div className="col-span-12 md:col-span-5">
              <div className="md:sticky md:top-32">
                <div className="relative aspect-[4/5] overflow-hidden bg-foreground/5">
                  <img
                    src={portrait}
                    alt="Sonykun Design studio"
                    loading="lazy"
                    className="js-portrait-img absolute inset-0 w-full h-[115%] object-cover"
                  />
                </div>
                <div className="mt-5 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  <span>Sony Lin</span>
                  <span>{isZh ? "創辦人 / 設計總監" : "Founder / Design Director"}</span>
                </div>
              </div>
            </div>

            {/* Scrolling copy */}
            <div className="col-span-12 md:col-span-7 md:pl-8">
              <span data-rise className="eyebrow">
                {isZh ? "01 · 創辦人故事" : "01 · Founder story"}
              </span>
              <h2
                data-rise
                className="font-display font-medium leading-[1.02] tracking-[-0.03em] text-[clamp(2rem,4.5vw,4rem)] mt-6 mb-12 md:mb-16 max-w-2xl"
              >
                {isZh
                  ? "設計不只是視覺。它是企業背後運作的系統。"
                  : "Design isn't decoration. It's the system behind the business."}
              </h2>
              <div className="space-y-7 md:space-y-9 max-w-2xl">
                {story.map((p, i) => (
                  <p key={i} data-rise className="text-body text-foreground/80 leading-[1.75] text-base md:text-[17px]">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE TIMELINE ───────────────────────────── */}
        <section className="js-timeline border-t border-border py-24 md:py-40">
          <div className="container-wide">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24 gap-6">
              <div>
                <span className="eyebrow">{isZh ? "02 · 經驗時間軸" : "02 · Experience"}</span>
                <h2 className="font-display font-medium leading-[0.98] tracking-[-0.035em] text-[clamp(2.4rem,6vw,5.5rem)] mt-4">
                  {isZh ? "15 年以上 — \n一路演進。" : "15+ years —\nan evolving practice."}
                </h2>
              </div>
              <p className="max-w-sm text-muted-foreground text-[15px] leading-[1.65]">
                {isZh
                  ? "從平面設計到品牌、網站、行銷、自動化與 AI 系統 — 每一個階段都讓我們更貼近企業真正需要的東西。"
                  : "From graphic design to branding, websites, marketing, automation and AI systems — each chapter brought us closer to what businesses actually need."}
              </p>
            </div>

            <div className="relative grid grid-cols-12 gap-8">
              {/* progress rail */}
              <div className="hidden md:block col-span-1 relative">
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border" />
                <div className="js-timeline-bar absolute left-1/2 -translate-x-1/2 top-0 w-px bg-[#5B7189] origin-top h-full" style={{ transform: "scaleY(0)" }} />
              </div>

              <ol className="col-span-12 md:col-span-11 divide-y divide-border border-y border-border">
                {timeline.map((t) => (
                  <li key={t.year} className="js-tl-item grid grid-cols-12 gap-6 py-8 md:py-10 items-baseline">
                    <span className="col-span-3 md:col-span-2 font-display text-2xl md:text-4xl tabular-nums tracking-tight">
                      {t.year}
                    </span>
                    <h3 className="col-span-9 md:col-span-4 font-display text-xl md:text-2xl tracking-tight">
                      {t.title}
                    </h3>
                    <p className="col-span-12 md:col-span-6 text-muted-foreground leading-[1.7] text-[15px]">
                      {t.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── WHAT WE DO — oversized word list ──────────────── */}
        <section className="bg-foreground text-background py-28 md:py-44 overflow-hidden">
          <div className="container-wide">
            <div className="flex items-end justify-between mb-16 md:mb-24">
              <span className="eyebrow !text-background/50">
                <span className="inline-block w-8 h-px bg-[#5B7189] align-middle mr-3" />
                {isZh ? "03 · 我們做什麼" : "03 · What we do"}
              </span>
              <span className="hidden md:inline text-[11px] uppercase tracking-[0.22em] text-background/45">
                {isZh ? "八項實踐" : "Eight practices"}
              </span>
            </div>

            <ul>
              {services.map((s, i) => (
                <li
                  key={s}
                  className="js-service-word group border-t border-background/15 last:border-b py-6 md:py-8 flex items-baseline gap-6 md:gap-10 cursor-default"
                >
                  <span className="text-[11px] tabular-nums tracking-[0.22em] text-background/40 w-10 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display font-medium leading-[1] tracking-[-0.03em] text-[clamp(2rem,6.5vw,6rem)] transition-transform duration-500 group-hover:translate-x-2">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── PHILOSOPHY · pinned scroll lines ─────────────── */}
        <section className="js-philosophy relative h-[100svh] md:h-[100svh] flex items-center overflow-hidden">
          <LinePattern variant="light" />
          <div className="container-wide relative z-10">
            <span className="eyebrow mb-10 block">
              {isZh ? "04 · 我們的理念" : "04 · Philosophy"}
            </span>
            <div className="space-y-3 md:space-y-5 max-w-5xl">
              {philosophy.map((line, i) => (
                <p
                  key={i}
                  className="js-phil-line font-display font-medium leading-[1.05] tracking-[-0.03em] text-[clamp(1.8rem,5.5vw,4.6rem)]"
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMPARISON · Why clients work with us ─────────── */}
        <section className="border-t border-border py-24 md:py-40 bg-muted">
          <div className="container-wide">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20 gap-6">
              <div>
                <span className="eyebrow">{isZh ? "05 · 為何選擇我們" : "05 · Why work with us"}</span>
                <h2 className="font-display font-medium leading-[0.98] tracking-[-0.035em] text-[clamp(2.4rem,6vw,5rem)] mt-4">
                  {isZh ? "傳統代理商 \n— 與 — \nSonyKun Design" : "Traditional agency \n— vs — \nSonyKun Design"}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-px bg-border border border-border">
              <div className="col-span-12 md:col-span-3 bg-muted p-6 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {isZh ? "面向" : "Topic"}
              </div>
              <div className="col-span-6 md:col-span-4 bg-muted p-6 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {isZh ? "傳統代理商" : "Traditional agency"}
              </div>
              <div className="col-span-6 md:col-span-5 bg-muted p-6 text-[11px] uppercase tracking-[0.22em]" style={{ color: "#5B7189" }}>
                SonyKun Design
              </div>

              {compareRows.map((row, i) => (
                <div key={i} className="contents" data-rise>
                  <div className="col-span-12 md:col-span-3 bg-background p-6 md:p-8 font-display text-lg tracking-tight">
                    {row.topic}
                  </div>
                  <div className="col-span-6 md:col-span-4 bg-background p-6 md:p-8 text-muted-foreground leading-[1.65] text-[15px]">
                    {row.trad}
                  </div>
                  <div className="col-span-6 md:col-span-5 bg-background p-6 md:p-8 text-foreground leading-[1.65] text-[15px] border-l-2" style={{ borderColor: "#5B7189" }}>
                    {row.us}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INDUSTRIES ────────────────────────────────────── */}
        <section className="border-t border-border py-24 md:py-40">
          <div className="container-wide grid grid-cols-12 gap-8 md:gap-16">
            <div className="col-span-12 md:col-span-4">
              <span className="eyebrow">{isZh ? "06 · 服務產業" : "06 · Industries"}</span>
              <h2 data-rise className="font-display font-medium leading-[0.98] tracking-[-0.035em] text-[clamp(2.2rem,5vw,4.4rem)] mt-4">
                {isZh ? "我們最常 \n合作的領域。" : "Who we \nwork with."}
              </h2>
              <p data-rise className="mt-8 text-muted-foreground leading-[1.7] max-w-sm text-[15px]">
                {isZh
                  ? "我們專注於需要可靠網站、清晰品牌與穩定客戶開發系統的小型企業與專業服務。"
                  : "We focus on small businesses and professional services that need a reliable website, a clear brand and a steady customer-acquisition system."}
              </p>
            </div>
            <div className="col-span-12 md:col-span-8">
              <ul className="grid grid-cols-1 sm:grid-cols-2 border-t border-border">
                {industries.map((ind, i) => (
                  <li
                    key={ind}
                    data-rise
                    className="group flex items-baseline justify-between gap-4 py-7 md:py-9 border-b border-border sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(odd)]:pr-8 sm:[&:nth-child(even)]:pl-8"
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="text-[11px] tabular-nums text-muted-foreground tracking-[0.22em]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-2xl md:text-3xl tracking-tight">
                        {ind}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────── */}
        <section className="bg-foreground text-background py-32 md:py-52 relative overflow-hidden">
          <div className="container-wide relative z-10">
            <span className="eyebrow !text-background/55">
              <span className="inline-block w-8 h-px bg-[#5B7189] align-middle mr-3" />
              {isZh ? "下一步" : "Next"}
            </span>
            <SplitTextReveal
              as="h2"
              trigger="scroll"
              text={isZh ? "一起打造\n有意義的東西。" : "Let's build\nsomething meaningful."}
              className="font-display font-medium leading-[0.92] tracking-[-0.035em] text-[clamp(2.6rem,9vw,9rem)] mt-8"
            />
            <div className="grid md:grid-cols-[1fr_auto] gap-10 items-end max-w-5xl mt-16">
              <p className="text-lg md:text-xl text-background/65 max-w-xl leading-[1.65]">
                {isZh
                  ? "無論你正在創業、品牌升級，或想要現代化線上形象 — 我們都樂意幫忙。"
                  : "Whether you're launching, refreshing a brand, or modernising your online presence — we'd love to help."}
              </p>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-4 bg-background text-foreground px-8 py-5 text-[12px] uppercase tracking-[0.22em] hover:bg-background/90"
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
