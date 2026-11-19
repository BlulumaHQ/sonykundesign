import { motion, type Variants } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContactButton from "@/components/FloatingContactButton";
import ScrollToTop from "@/components/ScrollToTop";
import { useLanguage } from "@/i18n/LanguageContext";

type L = { en: string; zh: string };
export type LegalSection = { title: L; body?: L[]; list?: L[] };

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

/** Shared bilingual layout for /terms and /privacy. */
const LegalDoc = ({ title, updated, intro, sections }: { title: L; updated: L; intro: L; sections: LegalSection[] }) => {
  const { lang } = useLanguage();
  const t = (x: L) => (lang === "zh" ? x.zh : x.en);
  return (
    <>
      <Header />
      <main className="pt-28 md:pt-32">
        <section className="section-padding">
          <div className="container-wide max-w-3xl mx-auto">
            <h1 className="heading-section mb-2">{t(title)}</h1>
            <p className="text-sm text-muted-foreground mb-10">{t(updated)}</p>
            <p className="text-muted-foreground leading-relaxed mb-8">{t(intro)}</p>
            <motion.div
              className="space-y-8"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            >
              {sections.map((s, i) => (
                <motion.section key={s.title.en} variants={fadeUp}>
                  <h2 className="font-display text-xl font-bold text-foreground mb-3">{i + 1}. {t(s.title)}</h2>
                  {s.body?.map((p) => <p key={p.en} className="text-muted-foreground leading-relaxed mt-2">{t(p)}</p>)}
                  {s.list && (
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
                      {s.list.map((li) => <li key={li.en}>{t(li)}</li>)}
                    </ul>
                  )}
                </motion.section>
              ))}
              <motion.section variants={fadeUp}>
                <h2 className="font-display text-xl font-bold text-foreground mb-3">{lang === "zh" ? "聯絡我們" : "Contact us"}</h2>
                <ul className="list-none pl-0 space-y-1 text-muted-foreground">
                  <li>
                    Email:{" "}
                    <a href="mailto:support@sonykundesign.com" className="text-foreground hover:text-primary transition-colors">support@sonykundesign.com</a>
                  </li>
                  <li>
                    {lang === "zh" ? "電話" : "Phone"}:{" "}
                    <a href="tel:6042621168" className="text-foreground hover:text-primary transition-colors">(604) 262-1168</a>
                  </li>
                </ul>
              </motion.section>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContactButton />
      <ScrollToTop />
    </>
  );
};

export default LegalDoc;
