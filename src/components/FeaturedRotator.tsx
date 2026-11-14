import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { usePortfolioFeed, type FeedItem } from "@/lib/portfolioFeed";
import { categoryZhLookup, serviceLabel } from "@/lib/feedLabels";
import { useLanguage } from "@/i18n/LanguageContext";

/** Homepage "Recent work" rotation — CMS slugs, in display order. */
export const FEATURED_SLUGS = [
  "yingting-smart",
  "tsai-orthodontics",
  "shootingstar-travel",
  "oviedoproperties-a",
  "sterlingwongrealty",
  "friendly-dental",
  "presotea-a",
  "nueranutra-b",
];

const ROTATE_MS = 7000;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Full-page screenshot in a 16:10 frame. At rest the whole first screen is visible
 * (nothing cropped); on hover the page glides down to the footer, and back on leave.
 */
const ScrollFrame = ({ item, hint }: { item: FeedItem; hint: string }) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0); // px the image can move up
  const src = item.homepage_full_url || item.featured_image_url || "";

  const measure = useCallback((img: HTMLImageElement) => {
    const frame = frameRef.current;
    if (!frame || !img.naturalWidth) return;
    const rendered = (img.naturalHeight / img.naturalWidth) * frame.clientWidth;
    setTravel(Math.max(0, rendered - frame.clientHeight));
  }, []);

  // Slow, even pace: ~900px per second, between 3s and 10s.
  const duration = Math.min(10, Math.max(3, travel / 900));

  return (
    <div
      ref={frameRef}
      className="featured-scroll-frame group relative aspect-[16/10] overflow-hidden border border-border bg-muted"
      style={{ ["--travel" as string]: `-${travel}px`, ["--dur" as string]: `${duration}s` }}
    >
      <img
        src={src}
        alt={`${item.title} website`}
        onLoad={(e) => measure(e.currentTarget)}
        className="featured-scroll-img block w-full h-auto"
      />
      {travel > 0 && (
        <span className="pointer-events-none absolute bottom-4 right-4 bg-background/90 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-foreground transition-opacity duration-300 group-hover:opacity-0">
          {hint}
        </span>
      )}
    </div>
  );
};

const FeaturedRotator = () => {
  const { lang } = useLanguage();
  const zh = lang === "zh";
  const { items, loading } = usePortfolioFeed();
  const catLabel = categoryZhLookup(items);

  const projects = useMemo(
    () =>
      FEATURED_SLUGS.map((slug) => items.find((i) => i.slug === slug)).filter(
        (i): i is FeedItem => !!i && !!(i.homepage_full_url || i.featured_image_url),
      ),
    [items],
  );

  const [index, setIndex] = useState(() => Math.floor(Math.random() * FEATURED_SLUGS.length));
  const [paused, setPaused] = useState(false);
  const count = projects.length;
  const current = count ? projects[index % count] : undefined;

  const go = useCallback((step: number) => setIndex((i) => (((i + step) % count) + count) % count), [count]);

  useEffect(() => {
    if (!count || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => go(1), ROTATE_MS);
    return () => window.clearTimeout(id);
  }, [index, count, paused, go]);

  // Preload the next screenshot so the crossfade never shows an empty frame.
  useEffect(() => {
    const next = count ? projects[(index + 1) % count] : undefined;
    const url = next?.homepage_full_url || next?.featured_image_url;
    if (url) new Image().src = url;
  }, [index, count, projects]);

  if (loading || !current) {
    return (
      <div className="grid grid-cols-12 gap-6 md:gap-10" aria-busy="true">
        <div className="col-span-12 md:col-span-3 space-y-4">
          <div className="h-3 w-24 bg-muted animate-pulse" />
          <div className="h-10 w-3/4 bg-muted animate-pulse" />
          <div className="h-20 w-full bg-muted animate-pulse" />
        </div>
        <div className="col-span-12 md:col-span-9 aspect-[16/10] bg-muted animate-pulse" />
      </div>
    );
  }

  const category = current.categories?.[0] ?? current.category;
  const services = (current.services ?? []).map((sv) => serviceLabel(sv, lang)).join(" · ");
  const position = (index % count) + 1;

  return (
    <div
      className="grid grid-cols-12 gap-6 md:gap-10 items-start"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="col-span-12 md:col-span-3 md:sticky md:top-32">
        <div className="flex items-center justify-between mb-6">
          <span className="eyebrow !mb-0 tabular-nums">
            {zh ? "近期作品" : "Recent work"} / {pad(position)}
          </span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground tabular-nums">
            {pad(position)} — {pad(count)}
          </span>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight mb-6">
              {current.title.replace(/\s+-\s+[AB]$/, "")}
            </h2>
            <p className="text-sm text-muted-foreground leading-[1.7] mb-6">{current.excerpt || services}</p>
            <dl className="grid grid-cols-2 gap-y-3 text-[11px] uppercase tracking-[0.18em]">
              <dt className="text-muted-foreground">{zh ? "產業" : "Industry"}</dt>
              <dd>{category ? catLabel(category, lang) : "—"}</dd>
              <dt className="text-muted-foreground">{zh ? "年份" : "Year"}</dt>
              <dd>{current.project_year || current.publish_date?.slice(0, 4) || "—"}</dd>
            </dl>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              <Link
                to={`/portfolio/${current.slug}`}
                className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] border-b border-foreground pb-1 hover:opacity-70"
              >
                {zh ? "查看作品" : "View project"} <ArrowRight className="w-4 h-4" />
              </Link>
              {current.live_url && (
                <a
                  href={current.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] border-b border-foreground pb-1 hover:opacity-70"
                >
                  {zh ? "查看上線網站" : "View live"} <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls + progress */}
        <div className="mt-10 flex items-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={zh ? "上一個作品" : "Previous project"}
            className="w-11 h-11 inline-flex items-center justify-center border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={zh ? "下一個作品" : "Next project"}
            className="w-11 h-11 inline-flex items-center justify-center border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          <div className="ml-2 flex-1 flex gap-1" aria-hidden="true">
            {projects.map((p, i) => (
              <span key={p.id} className="relative h-px flex-1 bg-border overflow-hidden">
                {i === index % count && (
                  <span
                    key={`${p.id}-${paused}`}
                    className={`absolute inset-y-0 left-0 bg-foreground ${paused ? "w-full" : "featured-progress"}`}
                    style={{ animationDuration: `${ROTATE_MS}ms` }}
                  />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-9">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <Link to={`/portfolio/${current.slug}`} aria-label={current.title} className="block">
              <ScrollFrame item={current} hint={zh ? "滑過預覽整頁 ↓" : "Hover to scroll ↓"} />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FeaturedRotator;
