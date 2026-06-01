import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const Footer = () => {
  const { lang } = useLanguage();
  const isZh = lang === "zh";

  return (
    <footer className="bg-charcoal text-white">
      <div className="container-wide pt-24 pb-12">
        {/* Big editorial closer */}
        <div className="border-b border-white/15 pb-16 mb-16">
          <p className="eyebrow !text-white/55 !mb-6">{isZh ? "聯絡 · 2026" : "Contact · 2026"}</p>
          <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-[-0.02em] font-medium mb-10">
            {isZh ? "讓我們開始合作。" : "Let's start a project."}
          </h2>
          <Link
            to="/contact"
            className="inline-block bg-white text-foreground px-7 py-4 rounded-full text-[11px] uppercase tracking-[0.22em] hover:bg-white/80 transition-colors"
          >
            {isZh ? "索取免費預覽" : "Get a free preview"}
          </Link>
        </div>

        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-5">
              <img src={logo} alt="Sonykun Design" className="h-12 w-auto invert brightness-0" style={{ filter: "invert(1) brightness(2)" }} />
            </Link>
            <p className="text-sm text-white/55 leading-relaxed">
              {isZh
                ? "自 2005 年起，為小型企業提供平價且專業的網站設計。"
                : "Affordable, professional website design for small businesses since 2005."}
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/45 mb-4">
              {isZh ? "瀏覽" : "Navigate"}
            </p>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/portfolio" className="text-white/80 hover:text-white transition">{t(translations.nav.work, lang)}</Link></li>
              <li><Link to="/services" className="text-white/80 hover:text-white transition">{t(translations.nav.services, lang)}</Link></li>
              <li><Link to="/pricing" className="text-white/80 hover:text-white transition">{t(translations.nav.pricing, lang)}</Link></li>
              <li><Link to="/contact" className="text-white/80 hover:text-white transition">{t(translations.nav.contact, lang)}</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/45 mb-4">
              {isZh ? "聯絡" : "Contact"}
            </p>
            <ul className="space-y-2.5 text-sm">
              <li><a href="mailto:support@sonykundesign.com" className="text-white/80 hover:text-white transition">support@sonykundesign.com</a></li>
              <li><a href="tel:6042621168" className="text-white/80 hover:text-white transition">(604) 262-1168</a></li>
              <li className="text-white/55">Vancouver, BC, Canada</li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/45 mb-4">
              {isZh ? "法律" : "Legal"}
            </p>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/privacy" className="text-white/80 hover:text-white transition">{t(translations.nav.privacy, lang)}</Link></li>
              <li><Link to="/terms" className="text-white/80 hover:text-white transition">{t(translations.nav.terms, lang)}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-[10px] uppercase tracking-[0.22em] text-white/45">
          <span>Sonykun Design © {new Date().getFullYear()}</span>
          <span>{isZh ? "版權所有" : "All Rights Reserved"}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
