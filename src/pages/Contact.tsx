import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";
import ContactSection from "@/components/ContactSection";
import SplitTextReveal from "@/components/SplitTextReveal";
import LinePattern from "@/components/LinePattern";
import { ArrowUpRight, Mail, Phone, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const Contact = () => {
  const { lang } = useLanguage();
  const isZh = lang === "zh";

  const details = [
    {
      icon: Phone,
      label: isZh ? "電話" : "Phone",
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
      label: isZh ? "地點" : "Location",
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
        <section className="pt-28 md:pt-40 pb-8 md:pb-12">
          <div className="container-wide">
            <div className="flex items-end justify-between mb-8">
              <span className="eyebrow !mb-0">
                <span className="inline-block w-8 h-px bg-[#5B7189] align-middle mr-3" />
                {isZh ? "聯絡我們" : "Get in touch"}
              </span>
              <span className="hidden md:inline text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {isZh ? "免費預覽 · 不收訂金" : "Free preview · no deposit"}
              </span>
            </div>
            <SplitTextReveal
              as="h1"
              text={isZh ? "取得免費\n網站預覽。" : "Get your free\nwebsite preview."}
              className="heading-hero"
            />
            <div className="mt-6 md:mt-10 grid grid-cols-12 gap-6 md:gap-12 items-end">
              <p className="col-span-12 md:col-span-7 text-subtitle text-foreground/70 max-w-2xl">
                {isZh
                  ? "填下面的表單（約 3 分鐘）。1–2 個工作天內您會收到一個可瀏覽的網站預覽 — 滿意了才付款。"
                  : "Fill in the form below (about 3 minutes). Within 1–2 business days you'll get a working preview of your site — you only pay if you love it."}
              </p>
              <div className="hidden md:block col-span-12 md:col-span-5 md:text-right">
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

        {/* ───────── FORM + ASIDE ───────── */}
        <section className="pb-20 md:pb-28 border-t border-border">
          <div className="container-wide">
            <div className="grid grid-cols-12 gap-y-10 gap-x-4 md:gap-16">
              <aside className="order-2 md:order-1 col-span-12 md:col-span-4 md:sticky md:top-32 md:self-start md:pt-14">
                <span className="eyebrow">
                  <span className="inline-block w-8 h-px bg-[#5B7189] align-middle mr-3" />
                  {isZh ? "接下來會怎樣" : "What happens next"}
                </span>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight mb-8">
                  {isZh ? "先看，\n再決定。" : "See it first.\nDecide after."}
                </h2>
                <p className="text-sm text-muted-foreground leading-[1.8] mb-10 max-w-sm">
                  {isZh
                    ? "Sony 親自看每一份表單，1–2 個工作天內寄給您預覽連結。喜歡就付款，我們 3 天內上線；不喜歡也不用付任何費用。"
                    : "Sony reads every request personally and emails you a preview link within 1–2 business days. Love it? Pay and we launch in 3 days. Not for you? You owe nothing."}
                </p>
                <div className="border-t border-border pt-6 space-y-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <div className="flex items-center justify-between"><span>{isZh ? "起價" : "Starting at"}</span><span className="text-foreground">$375 CAD</span></div>
                  <div className="flex items-center justify-between"><span>{isZh ? "交付時間" : "Turnaround"}</span><span className="text-foreground">3 {isZh ? "天" : "days"}</span></div>
                  <div className="flex items-center justify-between"><span>{isZh ? "經驗" : "Experience"}</span><span className="text-foreground">20+ {isZh ? "年" : "yrs"}</span></div>
                </div>
              </aside>

              <div id="contact-form" className="order-1 md:order-2 col-span-12 md:col-span-8 -mx-6 sm:-mx-8 md:mx-0">
                <ContactSection source="sonykun.ca contact page form" showIntro={false} />
              </div>
            </div>
          </div>
        </section>

        {/* ───────── DETAILS STRIP ───────── */}
        <section className="relative border-b border-border bg-muted overflow-hidden">
          <LinePattern variant="light" />
          <div className="container-wide grid grid-cols-2 md:grid-cols-4 divide-x divide-foreground/10 relative z-10">
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
                      className="font-display text-base md:text-lg tracking-tight text-foreground hover:text-[#5B7189] transition-colors inline-flex items-center gap-2 group break-all"
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

      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Contact;
