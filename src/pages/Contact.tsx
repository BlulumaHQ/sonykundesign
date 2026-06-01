import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";
import ContactSection from "@/components/ContactSection";
import SplitTextReveal from "@/components/SplitTextReveal";
import { ArrowUpRight, Mail, Phone, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const Contact = () => {
  const { lang } = useLanguage();
  const isZh = lang === "zh";

  const details = [
    {
      icon: Phone,
      label: isZh ? "電話 / 簡訊" : "Phone / Text",
      value: "(604) 262-1168",
      href: "tel:6042621168",
    },
    {
      icon: Mail,
      label: isZh ? "電子郵件" : "Email",
      value: "support@sonykundesign.com",
      href: "mailto:support@sonykundesign.com",
    },
    {
      icon: MapPin,
      label: isZh ? "工作室地點" : "Studio Location",
      value: "Vancouver, BC, Canada",
    },
    {
      icon: Clock,
      label: isZh ? "回覆時間" : "Response Time",
      value: isZh ? "1–2 個工作天" : "1–2 business days",
    },
  ];

  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        {/* ───────── HERO (shorter, editorial) ───────── */}
        <section className="pt-32 md:pt-40 pb-10 md:pb-16 border-b border-border">
          <div className="container-wide">
            <div className="flex items-end justify-between mb-8">
              <span className="eyebrow !mb-0">
                <span className="inline-block w-8 h-px bg-[#5B7189] align-middle mr-3" />
                {isZh ? "聯絡我們 · 2026" : "Contact · 2026"}
              </span>
              <span className="hidden md:inline text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {isZh ? "免費預覽 · 不收訂金" : "Free preview · no deposit"}
              </span>
            </div>
            <SplitTextReveal
              as="h1"
              text={isZh ? "開始一個\n專案。" : "Start a\nproject."}
              className="heading-hero"
            />
            <div className="mt-10 grid grid-cols-12 gap-6 md:gap-12 items-end">
              <p className="col-span-12 md:col-span-7 text-subtitle text-foreground/70 max-w-2xl">
                {isZh
                  ? "告訴我們您的業務與需求 — 我們會在 1–2 個工作天內回覆，並為您打造一個完全免費、可即時瀏覽的網站預覽。付款前先看到成果。"
                  : "Tell us about your business and what you're looking for. We'll respond within 1–2 business days with a free, browseable preview of your website — you see the result before you pay."}
              </p>
              <div className="col-span-12 md:col-span-5 md:text-right">
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
                  {isZh ? "或直接聯繫" : "Or reach us directly"}
                </p>
                <a href="tel:6042621168" className="font-display text-2xl md:text-3xl tracking-tight hover:text-[#5B7189] transition-colors">
                  (604) 262-1168
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── DETAILS STRIP ───────── */}
        <section className="border-b border-border bg-muted">
          <div className="container-wide grid grid-cols-2 md:grid-cols-4 divide-x divide-foreground/10">
            {details.map((d) => {
              const Icon = d.icon;
              return (
                <div key={d.label} className="p-6 md:p-10 first:pl-0 md:first:pl-0">
                  <Icon className="w-4 h-4 text-[#5B7189] mb-4" strokeWidth={1.5} />
                  <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground mb-3">
                    {d.label}
                  </p>
                  {d.href ? (
                    <a
                      href={d.href}
                      className="font-display text-base md:text-lg tracking-tight text-foreground hover:text-[#5B7189] transition-colors inline-flex items-center gap-2 group"
                    >
                      {d.value}
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ) : (
                    <p className="font-display text-base md:text-lg tracking-tight">
                      {d.value}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ───────── FORM + ASIDE ───────── */}
        <section className="py-20 md:py-28">
          <div className="container-wide">
            <div className="grid grid-cols-12 gap-10 md:gap-16">
              <aside className="col-span-12 md:col-span-4 md:sticky md:top-32 md:self-start">
                <span className="eyebrow">
                  <span className="inline-block w-8 h-px bg-[#5B7189] align-middle mr-3" />
                  {isZh ? "簡報" : "The brief"}
                </span>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight mb-8">
                  {isZh ? "告訴我們關於\n您的專案。" : "Tell us about\nyour project."}
                </h2>
                <p className="text-sm text-muted-foreground leading-[1.8] mb-10 max-w-sm">
                  {isZh
                    ? "越多細節越好 — 不過幾句話也沒關係。我們會親自閱讀每一封訊息，並準備一份個人化的回覆。"
                    : "The more detail the better — but a few sentences is fine too. We personally read every message and reply with a tailored response."}
                </p>
                <div className="border-t border-border pt-6 space-y-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <div className="flex items-center justify-between"><span>{isZh ? "起價" : "Starting at"}</span><span className="text-foreground">$349 CAD</span></div>
                  <div className="flex items-center justify-between"><span>{isZh ? "交付時間" : "Turnaround"}</span><span className="text-foreground">3 {isZh ? "天" : "days"}</span></div>
                  <div className="flex items-center justify-between"><span>{isZh ? "經驗" : "Experience"}</span><span className="text-foreground">20+ {isZh ? "年" : "yrs"}</span></div>
                </div>
              </aside>

              <div id="contact-form" className="col-span-12 md:col-span-8">
                <ContactSection source="sonykun.ca contact page form" />
              </div>
            </div>
          </div>
        </section>

        {/* ───────── BOTTOM CTA (light, high contrast) ───────── */}
        <section className="bg-muted border-t border-border py-24 md:py-36">
          <div className="container-wide">
            <span className="eyebrow !mb-6">
              <span className="inline-block w-8 h-px bg-[#5B7189] align-middle mr-3" />
              {isZh ? "下一步" : "Next step"}
            </span>
            <h2 className="font-display font-medium text-foreground text-[40px] sm:text-[64px] md:text-[88px] lg:text-[112px] leading-[0.95] tracking-[-0.035em] mb-14">
              {isZh ? "準備好看到您的網站了嗎？" : "Ready to see your website?"}
            </h2>
            <div className="grid grid-cols-12 gap-8 pt-10 border-t border-foreground/15 items-end">
              <p className="col-span-12 md:col-span-6 text-base md:text-lg text-foreground/75 leading-[1.6] max-w-xl">
                {isZh
                  ? "填寫上方表單，我們會為您打造一個免費預覽 — 不收訂金，看到成品再決定。"
                  : "Fill out the form above and we'll build you a free preview — no deposit, decide once you see the result."}
              </p>
              <div className="col-span-12 md:col-span-6 md:justify-self-end">
                <button
                  onClick={() =>
                    document
                      .getElementById("contact-form")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  className="group inline-flex items-center justify-between gap-6 bg-foreground text-background px-7 py-5 text-[12px] uppercase tracking-[0.22em] hover:bg-[#5B7189] transition-colors"
                >
                  {isZh ? "獲取免費預覽" : "Get Your Free Preview"}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
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

export default Contact;
