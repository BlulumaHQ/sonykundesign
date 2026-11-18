import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

/**
 * Real clients with live sites — no quotes until Sony supplies verified ones.
 * To add a real testimonial later, add a `quote` (with the client's permission) to an entry.
 */
type Client = { name: string; industry: { en: string; zh: string }; url: string; quote?: { en: string; zh: string }; person?: string };

const clients: Client[] = [
  { name: "Tsai Orthodontics", industry: { en: "Orthodontics · Vancouver", zh: "矯正牙科 · 溫哥華" }, url: "https://tsaiorthodontics.ca/" },
  { name: "Friendly Dental Centre", industry: { en: "Dental clinic", zh: "牙醫診所" }, url: "https://friendlydental.ca/" },
  { name: "K. Chen Construction Management", industry: { en: "Construction", zh: "營造管理" }, url: "https://kchencm.com/" },
  { name: "TTOP Chicken", industry: { en: "Restaurant · Vancouver", zh: "餐廳 · 溫哥華" }, url: "https://ttopchicken.com/" },
  { name: "NuEra Nutra", industry: { en: "Supplement manufacturer", zh: "保健品製造" }, url: "https://nueranutra.com/" },
  { name: "Shooting Star Travel", industry: { en: "Travel agency", zh: "旅行社" }, url: "https://shootingstartravel.ca/" },
  { name: "Wild West Wags", industry: { en: "Dog training", zh: "狗狗訓練" }, url: "https://wildwestwags.ca/" },
  { name: "Architect 57", industry: { en: "Architecture", zh: "建築設計" }, url: "https://architect57.com/" },
];

const TestimonialsSection = () => {
  const { lang } = useLanguage();
  const isZh = lang === "zh";

  return (
    <section className="section-padding bg-muted">
      <div className="container-wide">
        <div className="mb-12 md:mb-16 flex items-end justify-between flex-wrap gap-6">
          <div>
            <span className="eyebrow">{isZh ? "真實客戶" : "Real clients"}</span>
            <h2 className="heading-section max-w-3xl">
              {isZh ? "自 2005 年起 500+ 間企業。這是最近幾間。" : "500+ businesses since 2005. A few recent ones."}
            </h2>
          </div>
          <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            {isZh ? "點擊查看真實上線網站" : "Tap any to visit the live site"}
          </span>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-border">
          {clients.map((c) => (
            <li key={c.name} className="border-r border-b border-border bg-background">
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col justify-between gap-6 p-6 md:p-7 hover:bg-foreground hover:text-background transition-colors"
              >
                <div>
                  <p className="font-display text-xl tracking-tight leading-snug group-hover:!text-background">{c.name}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground group-hover:text-background/60">
                    {c.industry[lang]}
                  </p>
                  {c.quote && <blockquote className="mt-5 text-sm leading-relaxed">"{c.quote[lang]}"{c.person && <span className="block mt-2 text-xs opacity-70">— {c.person}</span>}</blockquote>}
                </div>
                <span className="inline-flex items-center justify-between text-[11px] uppercase tracking-[0.22em]">
                  {c.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TestimonialsSection;
