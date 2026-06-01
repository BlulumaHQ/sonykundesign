import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Atelier Nord",
    tag: "Brand Identity · 2025",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Maison Verre",
    tag: "Digital Experience · 2025",
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Form & Field",
    tag: "Art Direction · 2024",
    img: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Onda Studio",
    tag: "E-commerce · 2024",
    img: "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "North & Co.",
    tag: "Editorial · 2024",
    img: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?auto=format&fit=crop&w=1600&q=80",
  },
];

const capabilities = [
  { k: "01", t: "Brand Identity", d: "Names, marks, systems, and the language between them." },
  { k: "02", t: "Digital Product", d: "Editorial websites, commerce, and considered interfaces." },
  { k: "03", t: "Art Direction", d: "Photography, motion, and visual systems with intent." },
  { k: "04", t: "Strategy", d: "Positioning that gives the work somewhere to stand." },
  { k: "05", t: "Motion", d: "Restrained, purposeful movement across surfaces." },
  { k: "06", t: "Print", d: "Books, lookbooks, packaging — built to be held." },
];

const Studio = () => {
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
      // Hero per-letter reveal on scroll
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

      // Featured: mask reveal + parallax + text rise
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

      // Project grid: fade + scale + rise
      const cards = gridRef.current?.querySelectorAll<HTMLElement>("[data-card]");
      cards?.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          scale: 0.96,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
      });

      // Philosophy: pinned, word-by-word + bg transition
      if (philosophy.current && philosophyWords.current.length) {
        gsap.fromTo(
          philosophy.current,
          { backgroundColor: "#ffffff", color: "#0a0a0a" },
          {
            backgroundColor: "#0a0a0a",
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

      // Horizontal scroll on desktop only
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
  }, []);

  const splitChars = (text: string) =>
    text.split("").map((ch, i) => (
      <span key={i} className="inline-block overflow-hidden align-bottom">
        <span data-char className="inline-block will-change-transform">
          {ch === " " ? "\u00A0" : ch}
        </span>
      </span>
    ));

  const philosophyText =
    "We believe restraint is a feature. We design slow, deliberate work that earns attention and keeps it.";
  const philosophyTokens = philosophyText.split(" ");

  return (
    <div ref={root} className="bg-neutral-50 text-neutral-950 font-[Inter,system-ui,sans-serif] antialiased">
      {/* Announcement */}
      <div className="w-full border-b border-neutral-200 bg-neutral-50 text-[11px] tracking-[0.18em] uppercase">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-2.5">
          <span className="text-neutral-500">New — Studio Index, Vol. 04 now shipping</span>
          <span className="hidden sm:inline text-neutral-400">Vancouver · Available Q3 2026</span>
        </div>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-neutral-50/80 border-b border-neutral-200/60">
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5">
          <a href="#" className="text-sm font-medium tracking-tight">Studio Index</a>
          <ul className="hidden md:flex items-center gap-10 text-sm text-neutral-600">
            <li><a href="#work" className="hover:text-neutral-950 transition">Work</a></li>
            <li><a href="#philosophy" className="hover:text-neutral-950 transition">Studio</a></li>
            <li><a href="#capabilities" className="hover:text-neutral-950 transition">Capabilities</a></li>
            <li><a href="#contact" className="hover:text-neutral-950 transition">Contact</a></li>
          </ul>
          <a href="#contact" className="text-sm border border-neutral-950 px-4 py-2 rounded-full hover:bg-neutral-950 hover:text-neutral-50 transition">Start a project</a>
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
          <span>Index · 001</span>
          <span>Est. 2014</span>
        </motion.div>

        <h1
          ref={heroHeadline}
          className="font-serif text-[clamp(2.75rem,11vw,12rem)] leading-[0.95] tracking-[-0.03em] mt-12"
          style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}
        >
          <span className="block">{splitChars("We create")}</span>
          <span className="block italic text-neutral-500">{splitChars("memorable")}</span>
          <span className="block">{splitChars("digital experiences.")}</span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-end"
        >
          <p className="md:col-span-2 max-w-xl text-neutral-600 text-base leading-relaxed">
            An independent design studio working with ambitious brands on identity, digital product, and art direction.
          </p>
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 md:text-right">
            Scroll to begin ↓
          </div>
        </motion.div>
      </section>

      {/* Featured Project */}
      <section className="px-6 py-32 mx-auto max-w-[1600px]">
        <div className="flex items-end justify-between mb-10">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Featured · 2025</span>
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Case 001</span>
        </div>

        <div ref={featuredImg} className="relative w-full aspect-[16/9] overflow-hidden bg-neutral-200">
          <img
            src="https://images.unsplash.com/photo-1542744095-291d1f67b221?auto=format&fit=crop&w=2000&q=80"
            alt="Featured project — Maison Verre"
            className="w-full h-[115%] object-cover"
            loading="lazy"
          />
          <div
            ref={featuredMask}
            className="absolute inset-0 bg-neutral-50"
            style={{ transformOrigin: "top center" }}
          />
        </div>

        <div ref={featuredText} className="grid md:grid-cols-2 gap-10 mt-12">
          <div className="overflow-hidden">
            <h2
              data-rise
              className="text-4xl md:text-6xl tracking-tight leading-[1.05]"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Maison Verre — a quiet new chapter for a 40-year-old atelier.
            </h2>
          </div>
          <div className="space-y-6 text-neutral-600 max-w-md">
            <div className="overflow-hidden"><p data-rise>Identity system, editorial site, and seasonal campaign for the Paris-based glassware house.</p></div>
            <div className="overflow-hidden"><p data-rise className="text-sm uppercase tracking-[0.2em] text-neutral-500">View case study →</p></div>
          </div>
        </div>
      </section>

      {/* Work Grid */}
      <section id="work" className="px-6 py-32 mx-auto max-w-[1600px]">
        <div className="flex items-end justify-between mb-16">
          <h2
            className="text-3xl md:text-5xl tracking-tight"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            Selected work
          </h2>
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">2024 — 2025</span>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24">
          {projects.map((p, i) => (
            <a
              key={p.title}
              data-card
              href="#"
              className={`group block cursor-pointer ${i % 2 === 1 ? "md:mt-24" : ""}`}
            >
              <div className="overflow-hidden bg-neutral-200 aspect-[4/5]">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-5 flex items-baseline justify-between">
                <h3 className="text-xl tracking-tight" style={{ fontFamily: '"Cormorant Garamond", serif' }}>{p.title}</h3>
                <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">{p.tag}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Philosophy — pinned, word by word, bg morph */}
      <section
        id="philosophy"
        ref={philosophy}
        className="min-h-[100svh] flex items-center px-6"
      >
        <div className="mx-auto max-w-[1400px]">
          <span className="block text-xs uppercase tracking-[0.2em] text-current/60 mb-10">
            Philosophy
          </span>
          <p
            className="text-3xl md:text-6xl lg:text-7xl leading-[1.15] tracking-tight"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            {philosophyTokens.map((w, i) => (
              <span
                key={i}
                ref={(el) => {
                  if (el) philosophyWords.current[i] = el;
                }}
                className="inline-block mr-[0.25em]"
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
          {/* desktop horizontal track */}
          <div ref={horizontalTrack} className="hidden lg:flex items-stretch gap-8 pl-[8vw] pr-[20vw]">
            <div className="shrink-0 w-[40vw] flex flex-col justify-center pr-12">
              <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6">Capabilities</span>
              <h2
                className="text-5xl xl:text-7xl tracking-tight leading-[1.02]"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                Six disciplines, one studio.
              </h2>
            </div>
            {capabilities.map((c) => (
              <article
                key={c.k}
                className="shrink-0 w-[28vw] h-[60vh] bg-white border border-neutral-200 p-10 flex flex-col justify-between"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">{c.k}</span>
                <div>
                  <h3 className="text-3xl mb-4" style={{ fontFamily: '"Cormorant Garamond", serif' }}>{c.t}</h3>
                  <p className="text-neutral-600 leading-relaxed">{c.d}</p>
                </div>
              </article>
            ))}
          </div>

          {/* mobile stack */}
          <div className="lg:hidden px-6 py-24">
            <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-6 block">Capabilities</span>
            <h2 className="text-4xl tracking-tight mb-12" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              Six disciplines, one studio.
            </h2>
            <div className="space-y-4">
              {capabilities.map((c) => (
                <article key={c.k} className="border border-neutral-200 bg-white p-8">
                  <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">{c.k}</span>
                  <h3 className="text-2xl mt-3 mb-2" style={{ fontFamily: '"Cormorant Garamond", serif' }}>{c.t}</h3>
                  <p className="text-neutral-600">{c.d}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-neutral-950 text-neutral-50 px-6 py-32">
        <div className="mx-auto max-w-[1600px]">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Contact · 2026</span>
          <h2
            className="mt-8 text-[clamp(2.5rem,9vw,9rem)] leading-[0.95] tracking-[-0.02em]"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            Let's build <span className="italic text-neutral-400">something</span> worth remembering.
          </h2>
          <div className="mt-16 grid md:grid-cols-3 gap-10 border-t border-neutral-800 pt-10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">New business</p>
              <a href="mailto:hello@studioindex.co" className="text-lg hover:text-neutral-400 transition">hello@studioindex.co</a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">Studio</p>
              <p className="text-lg">Vancouver, BC</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">Index</p>
              <p className="text-lg">Instagram · Are.na · Read.cv</p>
            </div>
          </div>
        </div>
        <footer className="mx-auto max-w-[1600px] mt-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs uppercase tracking-[0.2em] text-neutral-500">
          <span>© 2026 Studio Index</span>
          <span>All rights reserved</span>
        </footer>
      </section>
    </div>
  );
};

export default Studio;
