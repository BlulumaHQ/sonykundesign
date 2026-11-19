import { Shield, Server } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const TransparentPricing = () => {
  const { lang } = useLanguage();
  const isZh = lang === "zh";

  return (
    <section className="section-padding bg-muted">
      <div className="container-wide">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow">{isZh ? "託管方案" : "Hosting"}</span>
          <h2 className="heading-section">
            {isZh ? "透明定價，無隱藏費用。" : "Transparent Pricing. No Hidden Fees."}
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } }}
        >
          {/* Free Hosting */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
            }}
            whileHover={{ y: -4 }}
            className="bg-background rounded-2xl p-8 border border-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">
                {isZh ? "免費託管" : "FREE Hosting"}
              </h3>
            </div>
            <p className="text-3xl font-bold text-foreground mb-2">$0</p>
            <p className="text-muted-foreground">
              {isZh
                ? "網站免費放在我的平台上持續上線，不需要任何月費。檔案是您的，隨時可以拿走。每次修改 $50。"
                : "Your website stays live on my platform at no cost — no monthly fee. Your files are yours, take them anywhere, anytime. Changes are $50 each."}
            </p>
          </motion.div>

          {/* Managed Hosting */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
            }}
            whileHover={{ y: -4 }}
            className="bg-background rounded-2xl p-8 border border-secondary/20 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Server className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">
                {isZh ? "代管託管" : "Managed Hosting"}
              </h3>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">
              $20<span className="text-base font-normal text-muted-foreground">{isZh ? "/月" : "/month"}</span>
            </p>
            <p className="text-sm text-muted-foreground mb-4">{isZh ? "或 $200/年（送 2 個月）" : "or $200/year (2 months free)"}</p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-0.5">•</span> {isZh ? "我幫您管理網站" : "I manage your website for you"}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-0.5">•</span> {isZh ? "基本維護" : "Basic maintenance"}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-0.5">•</span> {isZh ? "每月最多 2 次小幅修改" : "Up to 2 small edits every month"}
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TransparentPricing;
