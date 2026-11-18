import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PACKAGES } from "@/lib/packages";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

interface ContactSectionProps {
  source?: string;
  showIntro?: boolean;
}

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

const ContactSection = ({ source = "sonykun.ca home form", showIntro = true }: ContactSectionProps) => {
  const [params] = useSearchParams();
  const initialPackage = PACKAGES.some((p) => p.slug === params.get("package")) ? params.get("package")! : "";
  const [focused, setFocused] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formLoadedAt] = useState(() => String(Date.now()));
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const isZh = lang === "zh";
  const ct = translations.contact;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        window.gtag?.("event", "generate_lead", { form_source: source, package: String(data.get("project_type") || "") });
        form.reset();
        navigate("/thank-you");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClasses = (field: string) =>
    `w-full bg-transparent border-0 border-b rounded-none px-0 py-3 text-base transition-colors duration-300 outline-none ${
      focused === field
        ? "border-b-secondary"
        : "border-b-border hover:border-b-secondary/50"
    }`;

  return (
    <section className="py-14 md:py-20">
      <div className="container-wide">
        <div className="max-w-[680px] mx-auto">
          {showIntro && <ScrollReveal>
            <h2 className="heading-section mb-4">
              {t(ct.title, lang).split("\n").map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </h2>
            <p className="text-body mb-8">
              {t(ct.body, lang)}
            </p>
          </ScrollReveal>}

          <ScrollReveal delay={0.15}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="source" value={source} />
              <input type="hidden" name="_t" value={formLoadedAt} />
              <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
                <label htmlFor="website_hp">Leave this field empty</label>
                <input type="text" id="website_hp" name="website_hp" tabIndex={-1} autoComplete="off" defaultValue="" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <motion.label
                    htmlFor="name"
                    className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider"
                    animate={{ color: focused === "name" ? "hsl(var(--secondary))" : undefined }}
                  >
                    {t(ct.name, lang)}
                  </motion.label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    maxLength={100}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    className={inputClasses("name")}
                  />
                </div>
                <div className="relative">
                  <motion.label
                    htmlFor="email"
                    className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider"
                    animate={{ color: focused === "email" ? "hsl(var(--secondary))" : undefined }}
                  >
                    {t(ct.email, lang)}
                  </motion.label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={255}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    className={inputClasses("email")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
                    {isZh ? "電話（選填）" : "Phone (optional)"}
                  </label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40}
                    onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} className={inputClasses("phone")} />
                </div>
                <div>
                  <label htmlFor="business" className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
                    {isZh ? "公司 / 店名" : "Business name"}
                  </label>
                  <input id="business" name="business" type="text" autoComplete="organization" maxLength={120}
                    onFocus={() => setFocused("business")} onBlur={() => setFocused(null)} className={inputClasses("business")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="projectType" className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
                    {isZh ? "想要的方案" : "Package"}
                  </label>
                  <select id="projectType" name="project_type" defaultValue={initialPackage}
                    onFocus={() => setFocused("projectType")} onBlur={() => setFocused(null)}
                    className={`${inputClasses("projectType")} appearance-none`}>
                    <option value="">{isZh ? "選擇方案（可稍後再決定）" : "Choose a package (you can decide later)"}</option>
                    {PACKAGES.map((p) => <option key={p.slug} value={p.slug}>{p[lang]}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="current_site" className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
                    {isZh ? "現有網站（選填）" : "Current website (optional)"}
                  </label>
                  <input id="current_site" name="current_site" type="text" inputMode="url" placeholder="example.com" maxLength={200}
                    onFocus={() => setFocused("current_site")} onBlur={() => setFocused(null)} className={inputClasses("current_site")} />
                </div>
              </div>

              <div>
                <motion.label
                  htmlFor="message"
                  className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider"
                  animate={{ color: focused === "message" ? "hsl(var(--secondary))" : undefined }}
                >
                  {isZh ? "您的業務 & 想要的感覺（選填）" : "About your business & the look you want (optional)"}
                </motion.label>
                <textarea
                  id="message"
                  name="message"
                  maxLength={2000}
                  placeholder={isZh ? "例如：溫哥華的咖啡店，想要乾淨、溫暖的感覺，喜歡 xxx.com 的風格。" : "e.g. Café in Vancouver, want a clean, warm look — I like the style of xxx.com."}
                  rows={3}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  className={`${inputClasses("message")} resize-none`}
                  style={{ minHeight: "120px", maxHeight: "150px" }}
                />
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-1">
                <p className="text-xs text-muted-foreground order-2 md:order-1">
                  {isZh ? "不用付款 · 沒有義務 · 1–2 個工作天內收到預覽" : "No payment · No obligation · Preview in 1–2 business days"}
                </p>
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="h-12 px-10 text-base font-medium w-full md:w-auto btn-cta order-1 md:order-2 rounded-xl"
                >
                  {submitting ? (isZh ? "送出中…" : "Sending…") : t(ct.submit, lang)}
                </Button>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
