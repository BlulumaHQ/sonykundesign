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
    { label: t(translations.nav.work, lang), href: "/portfolio" },
    { label: t(translations.nav.services, lang), href: "/services" },
    { label: t(translations.nav.pricing, lang), href: "/pricing" },
    { label: t(translations.nav.contact, lang), href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/60">
      {/* Announcement bar */}
      <div className="border-b border-border/40 text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
        <div className="container-wide flex items-center justify-between py-2">
          <span className="hidden sm:inline">
            {lang === "zh"
              ? "$349 加幣起 · 3 天交付 · 自 2005 年"
              : "From $349 CAD · 3-day delivery · Since 2005"}
          </span>
          <span className="sm:hidden">{lang === "zh" ? "$349 起 · 3 天交付" : "From $349 · 3-day delivery"}</span>
          <button onClick={toggle} className="hover:text-foreground transition-colors">
            {lang === "en" ? "中文" : "EN"}
          </button>
        </div>
      </div>

      <div className="container-wide flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Sonykun Design" className="h-10 md:h-12 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `text-[11px] uppercase tracking-[0.22em] transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="text-[11px] uppercase tracking-[0.22em] border border-foreground px-4 py-2.5 rounded-full hover:bg-foreground hover:text-background transition-colors"
          >
            {lang === "zh" ? "索取報價" : "Start a project"}
          </Link>
        </nav>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
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
                className="mt-4 inline-block self-start text-[11px] uppercase tracking-[0.22em] border border-foreground px-5 py-3 rounded-full"
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
