import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PortfolioScreenshotViewport from "@/components/PortfolioScreenshotViewport";
import { categorySlug, usePortfolioFeed, type FeedItem } from "@/lib/portfolioFeed";
import { serviceLabel } from "@/lib/feedLabels";
import { useLanguage } from "@/i18n/LanguageContext";

export const PortfolioProjectContent = ({ item }: { item: FeedItem }) => {
  const { lang } = useLanguage();
  const zh = lang === "zh";
  const pages = (item.gallery ?? []).filter((image) => image.type === "page_screenshot");
  const mobiles = (item.gallery ?? []).filter((image) => image.type === "mobile_screenshot");
  const category = item.categories?.[0] ?? item.category;
  const categoryName = zh ? item.categories_zh?.[0] ?? category : category;
  const year = item.project_year || item.publish_date?.slice(0, 4);

  useEffect(() => {
    // Keep in sync with scripts/prerenderPlugin.ts (portfolioPages).
    const svc = (item.services ?? []).filter(Boolean).map((sv) => serviceLabel(sv, lang));
    const title = zh ? `${item.title}｜網站設計作品｜Sonykun Design` : `${item.title} — Website Design | Sonykun Design Portfolio`;
    const description = zh
      ? `Sonykun Design 為 ${item.title} 打造的網站作品${categoryName ? `（${categoryName}）` : ""}。服務內容：${svc.join("、") || "網站設計"}。`
      : item.excerpt?.trim() || `${item.title} website designed and built by Sonykun Design${categoryName ? ` (${categoryName})` : ""}. Services: ${svc.join(", ") || "Website Design"}.`;
    document.title = title;
    const set = (attr: "name" | "property", key: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };
    set("name", "description", description);
    set("property", "og:title", title);
    set("property", "og:description", description);
    const image = item.featured_image_url || item.homepage_full_url;
    if (image) set("property", "og:image", image);
  }, [item, zh, lang, categoryName]);

  return (
    <>
      <section className="pt-10 md:pt-16 pb-16 md:pb-24">
        <div className="container-wide">
          <nav
            aria-label={zh ? "麵包屑導覽" : "Breadcrumb"}
            className="mb-10 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
          >
            <Link to="/" className="hover:text-foreground">{zh ? "首頁" : "Home"}</Link>
            <span aria-hidden="true">/</span>
            <Link to="/portfolio" className="hover:text-foreground">{zh ? "作品集" : "Portfolio"}</Link>
            {category && (
              <>
                <span aria-hidden="true">/</span>
                <Link to={`/portfolio/${categorySlug(category)}`} className="hover:text-foreground">{categoryName}</Link>
              </>
            )}
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-foreground">{item.title}</span>
          </nav>

          <h1 className="font-display font-medium text-[40px] sm:text-[56px] md:text-[80px] lg:text-[104px] leading-[0.98] tracking-[-0.035em] max-w-5xl">
            {item.title}
          </h1>

          <div className="mt-12 md:mt-16 grid grid-cols-12 gap-y-8 gap-x-4 md:gap-12 pt-8 border-t border-border">
            <dl className="col-span-12 md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-8 text-[11px] uppercase tracking-[0.18em]">
              {categoryName && (
                <div>
                  <dt className="text-muted-foreground mb-2">{zh ? "產業" : "Industry"}</dt>
                  <dd className="text-foreground">{categoryName}</dd>
                </div>
              )}
              {year && (
                <div>
                  <dt className="text-muted-foreground mb-2">{zh ? "年份" : "Year"}</dt>
                  <dd className="text-foreground">{year}</dd>
                </div>
              )}
              {(item.services ?? []).length > 0 && (
                <div className="col-span-2 sm:col-span-1">
                  <dt className="text-muted-foreground mb-2">{zh ? "服務" : "Services"}</dt>
                  <dd className="text-foreground space-y-1">
                    {(item.services ?? []).map((s) => (
                      <span key={s} className="block">{serviceLabel(s, lang)}</span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
            <div className="col-span-12 md:col-span-5 md:text-right">
              {item.excerpt && <p className="text-sm text-muted-foreground leading-[1.7] mb-6 md:ml-auto max-w-md">{item.excerpt}</p>}
              {item.live_url && (
                <a
                  href={item.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-between gap-6 bg-foreground text-background px-6 py-4 text-[12px] uppercase tracking-[0.22em] hover:bg-foreground/85 transition-colors"
                >
                  {zh ? "瀏覽網站" : "Visit website"}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
            </div>
          </div>

          {item.featured_image_url && (
            <div className="mt-14 md:mt-20 overflow-hidden border border-border bg-muted">
              <img src={item.featured_image_url} alt={`${item.title} website`} decoding="async" className="block h-auto w-full" />
            </div>
          )}
        </div>
      </section>

      {pages.length > 0 && (
        <section className="py-20 md:py-32 border-t border-border">
          <div className="container-wide">
            <div className="flex items-end justify-between mb-12">
              <h2 className="heading-section">{zh ? "頁面" : "Pages"}</h2>
              <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground tabular-nums">
                {String(pages.length).padStart(2, "0")}
              </span>
            </div>
            <div className="columns-1 gap-6 md:columns-2">
              {pages.map((image, index) => (
                <figure key={`${image.url}-${index}`} className="mb-6 break-inside-avoid">
                  <div className="overflow-hidden border border-border">
                    <img src={image.url} alt={image.caption || item.title} loading="lazy" decoding="async" className="block h-auto w-full" />
                  </div>
                  {image.caption && (
                    <figcaption className="mt-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{image.caption}</figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {mobiles.length > 0 && (
        <section className="py-20 md:py-32 bg-foreground text-background">
          <div className="container-wide">
            <span className="eyebrow !text-background/45">{zh ? "手機版" : "Mobile"}</span>
            <h2 className="font-display font-medium text-[36px] md:text-[64px] leading-[1.02] tracking-[-0.025em] mb-12">
              {zh ? "手機上一樣好用。" : "Built for the phone, too."}
            </h2>
            <div className="flex flex-wrap justify-center gap-10">
              {mobiles.map((mobile, index) => (
                <div key={`${mobile.url}-${index}`} className="w-[280px] max-w-full rounded-[2.5rem] border-[10px] border-white/90 bg-white shadow-2xl">
                  <PortfolioScreenshotViewport variant="phone" src={mobile.url} alt={`${item.title} ${zh ? "手機版" : "mobile"}`} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-20 border-t border-border">
        <div className="container-wide flex flex-wrap items-center justify-between gap-6">
          <Link to="/portfolio" className="text-[12px] uppercase tracking-[0.22em] border-b border-foreground pb-1 hover:opacity-70">
            ← {zh ? "全部作品" : "All projects"}
          </Link>
          <Link to="/contact" className="text-[12px] uppercase tracking-[0.22em] border-b border-foreground pb-1 hover:opacity-70">
            {zh ? "取得免費預覽" : "Get your free preview"} →
          </Link>
        </div>
      </section>
    </>
  );
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const { items, loading, error } = usePortfolioFeed();
  const { lang } = useLanguage();
  const item = items.find((entry) => entry.slug === slug);
  if (!loading && !error && !item) return <Navigate to="/portfolio" replace />;
  return (
    <>
      <Header />
      <main className="pt-28 md:pt-32">
        {item ? (
          <PortfolioProjectContent item={item} />
        ) : (
          <div className="container-wide section-padding" role="status">
            {error
              ? lang === "zh" ? "無法載入作品，請稍後再試。" : "Unable to load portfolio. Please try again later."
              : lang === "zh" ? "載入中…" : "Loading…"}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default ProjectDetail;
