import { useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeedPortfolioCard from "@/components/FeedPortfolioCard";
import SplitTextReveal from "@/components/SplitTextReveal";
import LinePattern from "@/components/LinePattern";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";
import { Skeleton } from "@/components/ui/skeleton";
import { PortfolioProjectContent } from "@/pages/ProjectDetail";
import { feedCategories, feedItemCategories, paginatePortfolio, resolvePortfolioPath, usePortfolioFeed } from "@/lib/portfolioFeed";
import { categoryZhLookup } from "@/lib/feedLabels";
import { useLanguage } from "@/i18n/LanguageContext";

const Work = () => {
  const { category: segment, page: pageParam } = useParams();
  const navigate = useNavigate();
  const { items, loading, error } = usePortfolioFeed();
  const { lang } = useLanguage();
  const zh = lang === "zh";
  const resolved = resolvePortfolioPath(items, segment);
  const categories = feedCategories(items);
  const catLabel = categoryZhLookup(items);
  const category = resolved.kind === "list" ? resolved.category : null;
  const filtered = category ? items.filter((item) => feedItemCategories(item).includes(category.name)) : items;
  const pagination = paginatePortfolio(filtered, pageParam);
  const base = category ? `/portfolio/${category.slug}` : "/portfolio";
  const pageUrl = (page: number) => (page === 1 ? base : `${base}/page/${page}`);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [segment, pageParam]);

  const listTitle = resolved.kind === "list" ? (category ? catLabel(category.name, lang) : "") : null;
  useEffect(() => {
    if (listTitle === null || loading) return;
    const pageSuffix = pagination.page > 1 ? (zh ? `（第 ${pagination.page} 頁）` : ` — Page ${pagination.page}`) : "";
    // Keep in sync with scripts/prerenderPlugin.ts (portfolioPages).
    const title = zh
      ? listTitle
        ? `${listTitle}網站設計作品${pageSuffix}｜Sonykun Design`
        : `網站設計作品集${pageSuffix}｜Sonykun Design 溫哥華`
      : listTitle
        ? `${listTitle} Website Design Portfolio${pageSuffix} | Sonykun Design`
        : `Website Design Portfolio${pageSuffix} | Sonykun Design Vancouver`;
    const description = zh
      ? listTitle
        ? `瀏覽 Sonykun Design 為${listTitle}產業打造的 ${filtered.length} 個網站作品。`
        : `瀏覽 Sonykun Design 在溫哥華為中小企業打造的 ${items.length}+ 個網站作品。`
      : listTitle
        ? `Browse ${filtered.length} ${listTitle} websites designed and built by Sonykun Design in Vancouver.`
        : `Browse ${items.length}+ small business websites designed and built by Sonykun Design in Vancouver, BC.`;
    document.title = title;
    document.head.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.head.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document.head.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
  }, [listTitle, loading, pagination.page, filtered.length, items.length, zh]);

  const invalid =
    !loading &&
    !error &&
    (resolved.kind === "not-found" || (resolved.kind === "detail" && pageParam !== undefined) || !pagination.valid);

  // Project detail lives at /portfolio/:slug (same segment as categories).
  if (!loading && !error && resolved.kind === "detail" && !invalid) {
    return (
      <>
        <ScrollProgress />
        <Header />
        <main className="pt-28 md:pt-32">
          <PortfolioProjectContent item={resolved.item} />
        </main>
        <Footer />
        <ScrollToTop />
      </>
    );
  }

  const heroTitle = category ? `${catLabel(category.name, lang)}${zh ? "" : "."}` : zh ? "作品集。" : "Portfolio.";
  const sideLink = (active: boolean) =>
    `flex items-baseline justify-between gap-3 text-left text-sm py-2.5 border-t border-border transition-colors ${
      active ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
    }`;
  const pageBtn = (active: boolean) =>
    `min-w-11 h-11 px-3 inline-flex items-center justify-center text-[11px] uppercase tracking-[0.22em] border transition-colors ${
      active ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground"
    }`;

  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        {/* CINEMATIC HERO */}
        <section className="relative pt-40 md:pt-52 pb-12 md:pb-20 overflow-hidden">
          <LinePattern variant="light" />
          <div className="container-wide relative z-10">
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
                  <span aria-current="page" className="text-foreground">{catLabel(category.name, lang)}</span>
                </>
              )}
              {!loading && (
                <span className="ml-auto hidden md:inline">
                  {filtered.length} {zh ? "個專案" : "projects"}
                </span>
              )}
            </nav>
            {invalid ? (
              <h1 className="heading-hero">{zh ? "找不到此作品。" : "Not found."}</h1>
            ) : (
              <SplitTextReveal key={heroTitle} as="h1" text={heroTitle} className="heading-hero" />
            )}
            <p data-reveal className="text-subtitle max-w-2xl mt-10 text-foreground/70">
              {invalid
                ? zh
                  ? "這個作品或分類不存在，請瀏覽全部作品。"
                  : "This project or category doesn't exist. Browse all projects instead."
                : zh
                  ? "依產業瀏覽 Sonykun Design 的所有客戶網站。每張卡片都可以在預覽窗內捲動完整首頁。"
                  : "Browse every Sonykun Design client website by industry. Scroll the full homepage inside each preview window."}
            </p>
            {invalid && (
              <Link
                to="/portfolio"
                className="mt-10 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] border-b border-foreground pb-1 hover:opacity-70"
              >
                {zh ? "全部作品" : "All projects"} →
              </Link>
            )}
          </div>
        </section>

        {!invalid && (
          <section className="pb-32 md:pb-48 border-t border-border pt-12 md:pt-16">
            <div className="container-wide">
              {error ? (
                <p role="status" className="py-12 text-muted-foreground">
                  {zh ? "無法載入作品，請稍後再試。" : "Unable to load portfolio. Please try again later."}
                </p>
              ) : (
                <>
                  {/* Mobile category selector */}
                  <div className="lg:hidden mb-10">
                    <label className="block">
                      <span className="block text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground mb-3">
                        {zh ? "產業分類" : "Industry"}
                      </span>
                      <select
                        value={category?.slug ?? ""}
                        onChange={(e) => navigate(e.target.value ? `/portfolio/${e.target.value}` : "/portfolio")}
                        className="w-full h-12 px-4 border border-border bg-background text-sm rounded-none"
                      >
                        <option value="">{zh ? `全部作品（${items.length}）` : `All projects (${items.length})`}</option>
                        {categories.map((c) => (
                          <option key={c.slug} value={c.slug}>
                            {catLabel(c.name, lang)} ({c.count})
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="lg:flex lg:gap-16 xl:gap-20">
                    <aside className="hidden lg:block lg:w-[220px] lg:shrink-0" aria-label={zh ? "作品分類" : "Portfolio categories"}>
                      <div className="sticky top-32">
                        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground mb-6">
                          {zh ? "產業" : "Industries"}
                        </p>
                        <nav className="flex flex-col border-b border-border">
                          <Link to="/portfolio" aria-current={!category ? "page" : undefined} className={sideLink(!category)}>
                            <span>{zh ? "全部作品" : "All projects"}</span>
                            <span className="text-[11px] tabular-nums">{items.length}</span>
                          </Link>
                          {categories.map((c) => (
                            <Link
                              key={c.slug}
                              to={`/portfolio/${c.slug}`}
                              aria-current={category?.slug === c.slug ? "page" : undefined}
                              className={sideLink(category?.slug === c.slug)}
                            >
                              <span>{catLabel(c.name, lang)}</span>
                              <span className="text-[11px] tabular-nums">{c.count}</span>
                            </Link>
                          ))}
                        </nav>
                      </div>
                    </aside>

                    <div className="flex-1 min-w-0">
                      {loading ? (
                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3" aria-busy="true">
                          {Array.from({ length: 9 }, (_, i) => (
                            <Skeleton key={i} className="aspect-[4/5] rounded-xl" />
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
                          {pagination.items.map((item) => (
                            <FeedPortfolioCard key={item.id} item={item} />
                          ))}
                        </div>
                      )}
                      {!loading && filtered.length === 0 && (
                        <p className="text-muted-foreground text-sm py-12 text-center">
                          {zh ? "此分類目前沒有作品。" : "No projects in this category yet."}
                        </p>
                      )}

                      {pagination.totalPages > 1 && (
                        <nav aria-label={zh ? "分頁" : "Pagination"} className="mt-16 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
                          {pagination.page > 1 ? (
                            <Link to={pageUrl(pagination.page - 1)} className="text-[11px] uppercase tracking-[0.22em] border-b border-foreground pb-1 hover:opacity-70">
                              ← {zh ? "上一頁" : "Previous"}
                            </Link>
                          ) : (
                            <span aria-disabled="true" className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground/50">← {zh ? "上一頁" : "Previous"}</span>
                          )}
                          <div className="flex flex-wrap gap-2">
                            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((n) => (
                              <Link key={n} to={pageUrl(n)} aria-current={pagination.page === n ? "page" : undefined} className={pageBtn(pagination.page === n)}>
                                {String(n).padStart(2, "0")}
                              </Link>
                            ))}
                          </div>
                          {pagination.page < pagination.totalPages ? (
                            <Link to={pageUrl(pagination.page + 1)} className="text-[11px] uppercase tracking-[0.22em] border-b border-foreground pb-1 hover:opacity-70">
                              {zh ? "下一頁" : "Next"} →
                            </Link>
                          ) : (
                            <span aria-disabled="true" className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground/50">{zh ? "下一頁" : "Next"} →</span>
                          )}
                        </nav>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>
        )}
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export const LegacyPortfolioRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={slug ? `/portfolio/${slug}` : "/portfolio"} replace />;
};

export default Work;
