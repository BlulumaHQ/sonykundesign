import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const Footer = () => {
  const { lang } = useLanguage();
  const isZh = lang === "zh";
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white relative overflow-hidden">
      {/* Top: Oversized contact CTA */}
      <div className="container-wide pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="grid grid-cols-12 gap-8 md:gap-12 items-end">
          <div className="col-span-12 md:col-span-8">
            <p className="eyebrow !text-white/50 !mb-6">
              <span className="inline-block w-8 h-px bg-[#5B7189] align-middle mr-3" />
              {isZh ? "下一步 · 開始合作" : "Next · Let's collaborate"}
            </p>
            <h2 className="font-display font-medium leading-[0.92] tracking-[-0.035em] text-[clamp(2.5rem,9vw,8rem)]">
              {isZh ? (
                <>有想法嗎？<br /><span className="text-white/55">我們來實現它。</span></>
              ) : (
                <>Have an idea?<br /><span className="text-white/55">Let's build it.</span></>
              )}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 flex md:justify-end">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-5 border border-white/30 px-7 py-5 text-[11px] uppercase tracking-[0.24em] hover:bg-white hover:text-charcoal transition-colors"
            >
              {isZh ? "索取免費預覽" : "Get a free preview"}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Middle: directory grid */}
      <div className="border-t border-white/10">
        <div className="container-wide py-16 md:py-20">
          <div className="grid grid-cols-12 gap-10 md:gap-12">
            {/* Brand column */}
            <div className="col-span-12 md:col-span-5">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/40 mb-6">
                {isZh ? "Sonykun Design 工作室" : "Sonykun Design Studio"}
              </p>
              <p className="text-white/75 text-base md:text-lg leading-[1.7] max-w-md mb-8">
                {isZh
                  ? "自 2005 年起，於溫哥華為小型企業打造平價、誠實、值得信賴的網站。$349 加幣起，3 個工作天內交付。"
                  : "Building affordable, honest, trustworthy websites for small businesses out of Vancouver since 2005. From $349 CAD, delivered in 3 business days."}
              </p>
              <div className="flex flex-col gap-2 text-sm">
                <a href="mailto:support@sonykundesign.com" className="group inline-flex items-center gap-3 text-white/85 hover:text-white">
                  <span className="w-1.5 h-1.5 bg-[#5B7189] rounded-full" />
                  support@sonykundesign.com
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                </a>
                <a href="tel:6042621168" className="group inline-flex items-center gap-3 text-white/85 hover:text-white">
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
              <ul className="space-y-3 text-sm">
                <li><Link to="/portfolio" className="text-white/80 hover:text-white transition">{t(translations.nav.work, lang)}</Link></li>
                <li><Link to="/services" className="text-white/80 hover:text-white transition">{t(translations.nav.services, lang)}</Link></li>
                <li><Link to="/pricing" className="text-white/80 hover:text-white transition">{t(translations.nav.pricing, lang)}</Link></li>
                <li><Link to="/contact" className="text-white/80 hover:text-white transition">{t(translations.nav.contact, lang)}</Link></li>
              </ul>
            </div>

            <div className="col-span-6 md:col-span-2">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/40 mb-5">
                {isZh ? "服務" : "Services"}
              </p>
              <ul className="space-y-3 text-sm">
                <li><Link to="/services" className="text-white/80 hover:text-white transition">{isZh ? "網站設計" : "Web Design"}</Link></li>
                <li><Link to="/services" className="text-white/80 hover:text-white transition">{isZh ? "品牌與標誌" : "Brand & Logo"}</Link></li>
                <li><Link to="/services" className="text-white/80 hover:text-white transition">{isZh ? "電商" : "E-commerce"}</Link></li>
                <li><Link to="/pricing" className="text-white/80 hover:text-white transition">{isZh ? "定價方案" : "Pricing"}</Link></li>
              </ul>
            </div>

            <div className="col-span-12 md:col-span-3">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/40 mb-5">
                {isZh ? "工作室時間" : "Studio Hours"}
              </p>
              <ul className="space-y-2 text-sm text-white/75">
                <li className="flex justify-between"><span>{isZh ? "週一–週五" : "Mon – Fri"}</span><span>9 – 18</span></li>
                <li className="flex justify-between"><span>{isZh ? "週六" : "Saturday"}</span><span>{isZh ? "預約制" : "By appt."}</span></li>
                <li className="flex justify-between text-white/45"><span>{isZh ? "週日" : "Sunday"}</span><span>{isZh ? "休息" : "Closed"}</span></li>
              </ul>
              <p className="mt-6 text-[11px] uppercase tracking-[0.22em] text-white/40">
                PST · Vancouver
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
                className="w-full h-auto select-none pointer-events-none"
                draggable={false}
              />
            </Link>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.24em] text-white/45">
            <span>© {year} Sonykun Design — {isZh ? "版權所有" : "All rights reserved"}</span>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="hover:text-white transition">{t(translations.nav.privacy, lang)}</Link>
              <span className="text-white/20">/</span>
              <Link to="/terms" className="hover:text-white transition">{t(translations.nav.terms, lang)}</Link>
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
