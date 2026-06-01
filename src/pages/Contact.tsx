import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";
import ContactSection from "@/components/ContactSection";
import SplitTextReveal from "@/components/SplitTextReveal";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const Contact = () => {
  const { lang } = useLanguage();
  const isZh = lang === "zh";

  const details = [
    {
      label: isZh ? "電話" : "Phone",
      value: "(604) 262-1168",
      href: "tel:6042621168",
    },
    {
      label: isZh ? "電子郵件" : "Email",
      value: "support@sonykundesign.com",
      href: "mailto:support@sonykundesign.com",
    },
    {
      label: isZh ? "地點" : "Location",
      value: "Vancouver, BC, Canada",
    },
    {
      label: isZh ? "回覆時間" : "Response Time",
      value: isZh ? "1–2 個工作天" : "1–2 business days",
    },
  ];

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
                {isZh ? "聯絡我們" : "Get in touch"}
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
            <p
              data-reveal
              className="text-subtitle max-w-2xl mt-10 text-foreground/70"
            >
              {isZh
                ? "告訴我們您的業務與需求。我們會在 1–2 個工作天內回覆。"
                : "Tell us about your business and what you're looking for. We'll respond within 1–2 business days."}
            </p>
          </div>
        </section>

        {/* ASYMMETRIC FORM + DETAILS */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="container-wide">
            <div className="grid grid-cols-12 gap-8 md:gap-16">
              <aside className="col-span-12 md:col-span-4 md:sticky md:top-32 md:self-start space-y-10">
                {details.map((d) => (
                  <div key={d.label} className="border-t border-border pt-4">
                    <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground mb-2">
                      {d.label}
                    </p>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="font-display text-xl md:text-2xl tracking-tight hover:opacity-60 transition-opacity inline-flex items-center gap-2 group"
                      >
                        {d.value}
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <p className="font-display text-xl md:text-2xl tracking-tight">
                        {d.value}
                      </p>
                    )}
                  </div>
                ))}
                <p className="text-sm text-muted-foreground leading-[1.7] max-w-xs pt-6 border-t border-border">
                  {isZh
                    ? "自 2005 年起，我們為小型企業打造網站。每個專案都從免費預覽開始 — 您在付款前就能看到網站。"
                    : "Building websites for small businesses since 2005. Every project starts with a free preview — you see your website before you pay."}
                </p>
              </aside>

              <div id="contact-form" className="col-span-12 md:col-span-8">
                <ContactSection source="sonykun.ca contact page form" />
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="bg-foreground text-background py-32 md:py-48">
          <div className="container-wide">
            <h2 className="font-display text-[40px] sm:text-[64px] md:text-[96px] lg:text-[120px] leading-[0.95] tracking-[-0.035em] mb-12">
              {isZh ? "準備好看到您的網站了嗎？" : "Ready to see your website?"}
            </h2>
            <div className="grid md:grid-cols-[1fr_auto] gap-10 items-end max-w-5xl">
              <p className="text-lg md:text-xl text-background/65 max-w-xl leading-[1.6]">
                {isZh
                  ? "填寫上方表單，我們會為您打造免費預覽。"
                  : "Fill out the form above and we'll build you a free preview."}
              </p>
              <button
                onClick={() =>
                  document
                    .getElementById("contact-form")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="group inline-flex items-center gap-4 bg-background text-foreground px-8 py-5 rounded-full text-[12px] uppercase tracking-[0.22em] hover:bg-background/90"
              >
                {isZh ? "獲取免費預覽" : "Get Your Free Preview"}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
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
