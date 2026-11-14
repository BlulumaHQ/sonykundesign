import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/logo.svg";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [mobileWorkOpen, setMobileWorkOpen] = useState(false);
  const workRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { lang, toggle } = useLanguage();

  useEffect(() => {
    setMenuOpen(false);
    setWorkOpen(false);
    setMobileWorkOpen(false);
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  // Close the Work dropdown on outside click / Escape
  useEffect(() => {
    if (!workOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (workRef.current && !workRef.current.contains(e.target as Node)) setWorkOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setWorkOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [workOpen]);

  const workChildren = [
    { label: t(translations.nav.workCaseStudy, lang), href: "/case-study" },
    { label: t(translations.nav.workPortfolio, lang), href: "/portfolio" },
  ];
  const isWorkActive =
    location.pathname.startsWith("/portfolio") || location.pathname.startsWith("/case-study");

  const navLinks = [
    { label: t(translations.nav.home, lang), href: "/" },
    { label: t(translations.nav.work, lang), href: "/portfolio", children: workChildren },
    { label: t(translations.nav.services, lang), href: "/services" },
    { label: t(translations.nav.pricing, lang), href: "/pricing" },
    { label: t(translations.nav.contact, lang), href: "/contact" },
  ];

  // 中文字級略放大以匹配英文視覺重量
  const navTextSize = lang === "zh" ? "text-[13px]" : "text-[11px]";
  const navTracking = lang === "zh" ? "tracking-[0.18em]" : "tracking-[0.22em]";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAFA]/85 backdrop-blur-md border-b border-border/60">
      <div className="container-wide flex items-center justify-between h-20 md:h-24">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Sonykun Design" className="h-14 md:h-16 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.href}
                ref={workRef}
                className="relative"
                onMouseEnter={() => setWorkOpen(true)}
                onMouseLeave={() => setWorkOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setWorkOpen((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={workOpen}
                  className={`${navTextSize} uppercase ${navTracking} inline-flex items-center gap-1.5 transition-colors ${
                    isWorkActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${workOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {workOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-52 z-50"
                      role="menu"
                    >
                      <div className="border border-border bg-background">
                        {link.children.map((c) => (
                          <Link
                            key={c.href}
                            to={c.href}
                            role="menuitem"
                            onClick={() => setWorkOpen(false)}
                            className={`block px-5 py-3.5 ${navTextSize} uppercase ${navTracking} border-b border-border last:border-b-0 transition-colors ${
                              location.pathname.startsWith(c.href)
                                ? "text-foreground bg-muted/60"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                            }`}
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === "/"}
              className={({ isActive }) =>
                `${navTextSize} uppercase ${navTracking} transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {link.label}
            </NavLink>
            ),
          )}
          <button
            onClick={toggle}
            className={`${navTextSize} uppercase ${navTracking} text-muted-foreground hover:text-foreground transition-colors`}
            aria-label="Toggle language"
          >
            {lang === "en" ? "中文" : "EN"}
          </button>
          <Link
            to="/contact"
            className="text-[11px] uppercase tracking-[0.22em] border border-foreground px-4 py-2.5 hover:bg-foreground hover:text-background transition-colors"
          >
            {lang === "zh" ? "取得免費預覽" : "Free preview"}
          </Link>
        </nav>

        {/* Mobile: language switcher + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggle}
            className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
            aria-label="Toggle language"
          >
            {lang === "en" ? "中文" : "EN"}
          </button>
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-foreground transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="container-wide py-8 flex flex-col gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.href}>
                    <button
                      type="button"
                      onClick={() => setMobileWorkOpen((v) => !v)}
                      aria-expanded={mobileWorkOpen}
                      className="w-full flex items-center justify-between py-3 font-display text-2xl tracking-tight"
                    >
                      {link.label}
                      <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileWorkOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileWorkOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pb-2 flex flex-col border-l border-border ml-1">
                            {link.children.map((c) => (
                              <Link
                                key={c.href}
                                to={c.href}
                                onClick={() => setMenuOpen(false)}
                                className="block py-2 text-lg text-foreground/80 hover:text-foreground"
                              >
                                {c.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 font-display text-2xl tracking-tight"
                  >
                    {link.label}
                  </Link>
                ),
              )}
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-4 inline-block self-start text-[11px] uppercase tracking-[0.22em] border border-foreground px-5 py-3"
              >
                {lang === "zh" ? "取得免費預覽" : "Free preview"}
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
