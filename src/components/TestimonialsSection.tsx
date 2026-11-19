import { Star, ExternalLink } from "lucide-react";
import Marquee from "./Marquee";
import { useLanguage } from "@/i18n/LanguageContext";

const testimonialData = {
  en: [
    { quote: "Sony Lin has managed our professional websites for years, and he’s always been punctual, dependable, and professional. Thank you, Sony, for taking such good care of our websites. I’d recommend him without hesitation to anyone looking for a web designer.", name: "Patrick Wu", company: "Friendly Dental", url: "https://friendlydental.ca/" },
    { quote: "Our old website looked outdated and Sony helped modernize it quickly. The new site looks far more professional and our patients find it much easier to use.", name: "Kevin Chen", company: "KChen Construction", url: "https://one-park-home.bluluma.com/" },
    { quote: "I appreciated the transparency about pricing. There were no hidden costs and the process was smooth from start to finish.", name: "Michael Tran", company: "Small Business Owner", url: null },
    { quote: "Sony redesigned our clinic website and it now looks clean and modern. Patients have commented that the site is easier to navigate.", name: "Dr. Sarah Kim", company: "Little Mountain Dental", url: "http://littlemountain.bluluma.com/" },
    { quote: "We needed a website that looked trustworthy for our real estate clients. Sony understood the assignment and delivered a polished result on time.", name: "Brian Nguyen", company: "BTN Real Estate Services", url: "https://btn.bluluma.com/" },
    { quote: "The free hosting option was a big plus for us. We got a professional website without worrying about ongoing monthly fees.", name: "Amy Wong", company: "Local Retail Business", url: null },
  ],
  zh: [
    { quote: "Sony Lin 多年來一直負責管理我們診所的網站，他一向準時、可靠又專業。謝謝 Sony 把我們的網站照顧得這麼好，只要有人在找網頁設計師，我都會毫不猶豫地推薦他。", name: "Patrick Wu", company: "Friendly Dental", url: "https://friendlydental.ca/" },
    { quote: "我們的舊網站看起來很過時，Sony 很快就幫我們完成了現代化。新網站看起來專業多了，病人也覺得更容易使用。", name: "Kevin Chen", company: "KChen Construction", url: "https://one-park-home.bluluma.com/" },
    { quote: "我很欣賞定價方面的透明度。沒有任何隱藏費用，整個過程從頭到尾都很順利。", name: "Michael Tran", company: "小型企業主", url: null },
    { quote: "Sony 重新設計了我們診所的網站，現在看起來乾淨又現代。病人們都說網站更容易瀏覽了。", name: "Dr. Sarah Kim", company: "Little Mountain Dental", url: "http://littlemountain.bluluma.com/" },
    { quote: "我們需要一個看起來值得信賴的房地產網站。Sony 理解了我們的需求，按時交付了出色的成果。", name: "Brian Nguyen", company: "BTN Real Estate Services", url: "https://btn.bluluma.com/" },
    { quote: "免費託管對我們來說是一大優勢。我們獲得了一個專業的網站，不用擔心每月的持續費用。", name: "Amy Wong", company: "本地零售企業", url: null },
  ],
};

const Stars = () => (
  <div className="flex gap-1 mb-4">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    ))}
  </div>
);

const TestimonialsSection = () => {
  const { lang } = useLanguage();
  const isZh = lang === "zh";
  const testimonials = testimonialData[lang];

  return (
    <section className="section-padding bg-muted">
      <div className="container-wide">
        <div className="mb-12 md:mb-16 flex items-end justify-between flex-wrap gap-6">
          <div>
            <span className="eyebrow">{isZh ? "客戶評價" : "Client Feedback"}</span>
            <h2 className="heading-section max-w-2xl">
              {isZh ? "客戶這樣說。" : "What clients say."}
            </h2>
          </div>
          <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            {isZh ? "已完成 500+ 網站" : "500+ websites built"}
          </span>
        </div>
      </div>

      <Marquee speed={60} pauseOnHover>
        <div className="flex items-stretch gap-5 pr-5">
          {testimonials.map((item, i) => (
            <article
              key={`${item.name}-${i}`}
              className="w-[320px] sm:w-[360px] md:w-[400px] flex-shrink-0 bg-background border border-border p-7 flex flex-col"
            >
              <Stars />
              <blockquote className="text-foreground leading-relaxed mb-6 flex-1 text-sm">
                "{item.quote}"
              </blockquote>
              <div className="mb-4 border-t border-border pt-4">
                <p className="font-display font-semibold text-foreground">{item.name}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-1">{item.company}</p>
              </div>
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between gap-2 border border-foreground px-4 py-3 text-[11px] uppercase tracking-[0.22em] hover:bg-foreground hover:text-background transition-colors"
                >
                  {isZh ? "查看網站" : "Visit Website"}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </article>
          ))}
        </div>
      </Marquee>
    </section>
  );
};

export default TestimonialsSection;
