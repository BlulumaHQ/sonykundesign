import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import { homeContent } from "@/i18n/pageContent";

const Footer = () => {
  const { lang } = useLanguage();
  const isZh = lang === "zh";
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white relative overflow-hidden">
      {/* Middle: directory grid */}
      <div>
        <div className="container-wide py-16 md:py-20">
          <div className="grid grid-cols-12 gap-y-10 gap-x-4 md:gap-12">
            {/* Brand column */}
            <div className="col-span-12 md:col-span-5">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/40 mb-6">
                {isZh ? "Sonykun Design 工作室" : "Sonykun Design Studio"}
              </p>
              <p className="text-white/75 text-base md:text-lg leading-[1.7] max-w-md mb-8">
                {isZh
                  ? "自 2005 年起，於溫哥華為小型企業打造平價、誠實、值得信賴的網站。$375 加幣起，3 個工作天內交付。"
                  : "Building affordable, honest, trustworthy websites for small businesses out of Vancouver since 2005. From $375 CAD, delivered in 3 business days."}
              </p>
              <div className="flex flex-col gap-2 text-sm">
                <a href="mailto:support@sonykundesign.com" className="group inline-flex items-center gap-3 py-1.5 text-white/85 hover:text-white">
                  <span className="w-1.5 h-1.5 bg-[#5B7189] rounded-full" />
                  support@sonykundesign.com
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                </a>
                <a href="tel:6042621168" className="group inline-flex items-center gap-3 py-1.5 text-white/85 hover:text-white">
                  <span className="w-1.5 h-1.5 bg-[#5B7189] rounded-full" />
                  (604) 262-1168
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                </a>
                <span className="inline-flex items-center gap-3 text-white/55">
                  <span className="w-1.5 h-1.5 bg-white/25 rounded-full" />
                  Vancouver, BC · Canada
                </span>
              </div>
            </div>

            <div className="col-span-6 md:col-span-2">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/40 mb-5">
                {isZh ? "工作室" : "Studio"}
              </p>
              <ul className="space-y-1 text-sm">
                <li><Link to="/portfolio" className="inline-block py-1.5 text-white/80 hover:text-white transition">{t(translations.nav.workPortfolio, lang)}</Link></li>
                <li><Link to="/case-study" className="inline-block py-1.5 text-white/80 hover:text-white transition">{t(translations.nav.workCaseStudy, lang)}</Link></li>
                <li><Link to="/services" className="inline-block py-1.5 text-white/80 hover:text-white transition">{t(translations.nav.services, lang)}</Link></li>
                <li><Link to="/pricing" className="inline-block py-1.5 text-white/80 hover:text-white transition">{t(translations.nav.pricing, lang)}</Link></li>
                <li><Link to="/contact" className="inline-block py-1.5 text-white/80 hover:text-white transition">{t(translations.nav.contact, lang)}</Link></li>
              </ul>
            </div>

            <div className="col-span-6 md:col-span-2">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/40 mb-5">
                {isZh ? "服務" : "Services"}
              </p>
              <ul className="space-y-1 text-sm">
                <li><Link to="/services" className="inline-block py-1.5 text-white/80 hover:text-white transition">{isZh ? "網站設計" : "Web Design"}</Link></li>
                <li><Link to="/services" className="inline-block py-1.5 text-white/80 hover:text-white transition">{isZh ? "Logo 與品牌" : "Logo & Branding"}</Link></li>
                <li><Link to="/services" className="inline-block py-1.5 text-white/80 hover:text-white transition">{isZh ? "網站 + 品牌套裝" : "Website + Brand Bundles"}</Link></li>
                <li><Link to="/pricing" className="inline-block py-1.5 text-white/80 hover:text-white transition">{isZh ? "主機代管" : "Hosting"}</Link></li>
              </ul>
            </div>

            <div className="col-span-12 md:col-span-3">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/40 mb-5">
                {isZh ? "如何合作" : "How it works"}
              </p>
              <ul className="space-y-2 text-sm text-white/75">
                {homeContent.process.steps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-white/40 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    {step.title[lang]}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[11px] uppercase tracking-[0.22em] text-white/40">
                {isZh ? "溫哥華 · 自 2005" : "Vancouver · Since 2005"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: oversized wordmark + legal */}
      <div className="border-t border-white/10">
        <div className="container-wide pt-10 pb-8">
          <div className="overflow-hidden">
            <Link to="/" aria-label="Sonykun Design" className="block">
              <img
                src={logoWhite}
                alt="Sonykun Design"
                className="w-full max-w-[360px] h-auto select-none pointer-events-none opacity-70"
                style={{ filter: "brightness(0.92) contrast(0.95)" }}
                draggable={false}
              />
            </Link>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.24em] text-white/45">
            <span>© {year} Sonykun Design — {isZh ? "版權所有" : "All rights reserved"}</span>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="inline-block py-3 hover:text-white transition">{t(translations.nav.privacy, lang)}</Link>
              <span className="text-white/20">/</span>
              <Link to="/terms" className="inline-block py-3 hover:text-white transition">{t(translations.nav.terms, lang)}</Link>
              <span className="text-white/20">/</span>
              <span>v2026</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
