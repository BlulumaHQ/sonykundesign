import { useMemo } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PortfolioCard from "@/components/PortfolioCard";
import SplitTextReveal from "@/components/SplitTextReveal";
import LinePattern from "@/components/LinePattern";
import {
  projects,
  PORTFOLIO_CATEGORIES,
  portfolioCategoryZh,
  portfolioCategorySlug,
  portfolioCategoryFromSlug,
  type PortfolioCategory,
} from "@/data/projects";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";
import { useLanguage } from "@/i18n/LanguageContext";

const Work = () => {
  const { lang } = useLanguage();
  const isZh = lang === "zh";
  const { industry: industrySlug } = useParams<{ industry?: string }>();
  const navigate = useNavigate();

  const activeIndustry: PortfolioCategory | null = useMemo(
    () => portfolioCategoryFromSlug(industrySlug),
    [industrySlug]
  );

  const allProjects = useMemo(
    () => [...projects].sort((a, b) => b.year - a.year),
    []
  );

  const filtered = activeIndustry
    ? allProjects.filter((p) => p.portfolioCategory === activeIndustry)
    : allProjects;

  const labelI = (k: PortfolioCategory | "All") =>
    isZh ? portfolioCategoryZh[k] : k;

  const heroTitle = activeIndustry
    ? labelI(activeIndustry)
    : isZh
    ? "作品集。"
    : "Portfolio.";

  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        {/* CINEMATIC HERO */}
        <section className="pt-40 md:pt-52 pb-12 md:pb-20">
          <div className="container-wide">
            <div className="flex items-end justify-between mb-10">
              <span className="eyebrow !mb-0">
                {isZh ? "精選作品" : "Selected work"}
              </span>
              <span className="hidden md:inline text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {allProjects.length} {isZh ? "個專案" : "projects"}
              </span>
            </div>
            <SplitTextReveal
              as="h1"
              text={heroTitle}
              className="heading-hero"
            />
            <p
              data-reveal
              className="text-subtitle max-w-2xl mt-10 text-foreground/70"
            >
              {isZh
                ? "依產業瀏覽過去的客戶網站作品。每張卡片皆可在預覽窗內手動捲動完整網站。"
                : "Browse client work by industry. Scroll the full live website inside each preview window — the interaction is intentional."}
            </p>
          </div>
        </section>

        <section className="pb-32 md:pb-48 border-t border-border pt-12 md:pt-16">
          <div className="container-wide">
            {/* Mobile industry selector */}
            <div className="lg:hidden mb-10">
              <label className="block">
                <span className="block text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground mb-3">
                  {isZh ? "產業分類" : "Industry"}
                </span>
                <select
                  value={industrySlug ?? ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    navigate(v ? `/portfolio/${v}` : "/portfolio");
                  }}
                  className="w-full h-12 px-4 border border-border bg-background text-sm rounded-none"
                >
                  <option value="">{isZh ? "全部" : "All"}</option>
                  {PORTFOLIO_CATEGORIES.map((c) => (
                    <option key={c} value={portfolioCategorySlug[c]}>
                      {labelI(c)}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="lg:flex lg:gap-16 xl:gap-24">
              <aside
                className="hidden lg:block lg:w-[200px] lg:shrink-0"
                aria-label={isZh ? "產業分類" : "Industries"}
              >
                <div className="sticky top-32">
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground mb-6">
                    {isZh ? "產業" : "Industries"}
                  </p>
                  <nav className="flex flex-col">
                    <NavLink
                      to="/portfolio"
                      end
                      className={({ isActive }) =>
                        `text-left text-sm py-2.5 border-t border-border transition-colors ${
                          isActive
                            ? "text-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        }`
                      }
                    >
                      {labelI("All")}
                    </NavLink>
                    {PORTFOLIO_CATEGORIES.map((c) => (
                      <NavLink
                        key={c}
                        to={`/portfolio/${portfolioCategorySlug[c]}`}
                        className={({ isActive }) =>
                          `text-left text-sm py-2.5 border-t border-border transition-colors ${
                            isActive
                              ? "text-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground"
                          }`
                        }
                      >
                        {labelI(c)}
                      </NavLink>
                    ))}
                  </nav>
                </div>
              </aside>

              <div className="flex-1 min-w-0">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
                  {filtered.map((p) => (
                    <PortfolioCard
                      key={p.slug}
                      name={p.name}
                      services={p.services}
                      liveUrl={p.liveUrl}
                      fallbackImage={p.image}
                    />
                  ))}
                </div>

                {filtered.length === 0 && (
                  <p className="text-muted-foreground text-sm py-12 text-center">
                    {isZh
                      ? "此分類目前沒有作品。"
                      : "No projects in this category yet."}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Work;
