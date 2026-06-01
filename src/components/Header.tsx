import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import logo from "@/assets/logo.svg";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { lang, toggle } = useLanguage();

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  const navLinks = [
    { label: t(translations.nav.home, lang), href: "/" },
    { label: t(translations.nav.work, lang), href: "/portfolio" },
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
          {navLinks.map((link) => (
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
          ))}
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
            {lang === "zh" ? "索取報價" : "Start a project"}
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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 font-display text-2xl tracking-tight"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-4 inline-block self-start text-[11px] uppercase tracking-[0.22em] border border-foreground px-5 py-3"
              >
                {lang === "zh" ? "索取報價" : "Start a project"}
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
