import LegalDoc, { type LegalSection } from "@/components/LegalDoc";

const sections: LegalSection[] = [
  {
    title: { en: "What we collect", zh: "我們收集的資訊" },
    list: [
      { en: "Contact details and project information you send through our forms or by email, such as your name, email, phone number and business details.", zh: "您透過表單或電子郵件提供的聯絡資料與專案資訊，例如姓名、電子郵件、電話與業務資料。" },
      { en: "Phone calls: our phone line is answered by an AI receptionist. Calls may be recorded and transcribed so we can follow up on your request.", zh: "電話：我們的電話由 AI 接待員接聽。通話可能會被錄音並轉為文字，以便我們跟進您的需求。" },
      { en: "Payment details: payments are processed by Stripe. We never see or store your full card number.", zh: "付款資料：付款由 Stripe 處理，我們不會看到或儲存您的完整卡號。" },
      { en: "Usage data such as pages visited, browser type and approximate location, collected through cookies and Google Analytics.", zh: "透過 Cookie 與 Google Analytics 收集的使用資料，例如瀏覽頁面、瀏覽器類型與大略位置。" },
    ],
  },
  {
    title: { en: "How we use it", zh: "我們如何使用" },
    list: [
      { en: "To reply to your enquiries and prepare quotes.", zh: "回覆您的詢問並準備報價。" },
      { en: "To design, build, host and maintain your website.", zh: "設計、建置、代管並維護您的網站。" },
      { en: "To bill you and send project updates.", zh: "向您收費並寄送專案進度。" },
      { en: "To improve our website and services.", zh: "改善我們的網站與服務。" },
    ],
    body: [{ en: "We do not sell or rent your personal information.", zh: "我們不會出售或出租您的個人資料。" }],
  },
  {
    title: { en: "Who we share it with", zh: "與誰分享" },
    body: [{ en: "Only the service providers we need to run our business: Stripe (payments), Cloudflare (hosting), Resend (form emails), Vapi and Twilio (phone receptionist), Google (analytics and email) and Supabase (secure data storage). They may only use your information to provide their service to us.", zh: "僅限營運所需的服務供應商：Stripe（付款）、Cloudflare（主機）、Resend（表單郵件）、Vapi 與 Twilio（電話接待）、Google（分析與電子郵件）及 Supabase（資料安全儲存）。他們只能為了向我們提供服務而使用您的資料。" }],
  },
  {
    title: { en: "Cookies", zh: "Cookie" },
    body: [{ en: "We use cookies for analytics and to remember your language. You can block or delete cookies in your browser settings; some parts of the site may then work differently.", zh: "我們使用 Cookie 進行分析並記住您的語言設定。您可以在瀏覽器設定中封鎖或刪除 Cookie，部分網站功能可能因此有所不同。" }],
  },
  {
    title: { en: "Security and retention", zh: "安全與保存期限" },
    body: [{ en: "We take reasonable steps to protect your information. We keep it while you are a client and afterwards only as long as needed for our records and legal obligations.", zh: "我們採取合理措施保護您的資料。您是客戶期間我們會保存資料，之後只在記錄與法律義務所需期間內保存。" }],
  },
  {
    title: { en: "Your choices", zh: "您的權利" },
    body: [{ en: "You can ask to see, correct or delete the personal information we hold about you, and unsubscribe from our emails at any time.", zh: "您可以要求查看、更正或刪除我們持有的個人資料，也可以隨時取消訂閱我們的電子郵件。" }],
  },
];

const Privacy = () => (
  <LegalDoc
    title={{ en: "Privacy Policy", zh: "隱私權政策" }}
    updated={{ en: "Last updated: November 19, 2026", zh: "最後更新：2026年11月19日" }}
    intro={{ en: "Sonykun Design (\"we\", \"us\") respects your privacy. This policy explains what we collect, why, and how we look after it.", zh: "Sonykun Design（以下稱「我們」）重視您的隱私。本政策說明我們收集哪些資訊、為何收集，以及如何保護這些資訊。" }}
    sections={sections}
  />
);

export default Privacy;
