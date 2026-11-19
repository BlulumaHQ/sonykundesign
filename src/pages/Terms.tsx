import LegalDoc, { type LegalSection } from "@/components/LegalDoc";

const sections: LegalSection[] = [
  {
    title: { en: "Our services", zh: "服務內容" },
    body: [{ en: "Sonykun Design provides website design, ecommerce websites, brand identity and logo design, website hosting and related digital services for small businesses.", zh: "Sonykun Design 為小型企業提供網站設計、電商網站、品牌識別與 Logo 設計、網站主機代管及相關數位服務。" }],
  },
  {
    title: { en: "Quotes, previews and revisions", zh: "報價、預覽與修改" },
    list: [
      { en: "Every project starts with a confirmed scope and a written quote. Prices on our website are a guide; your emailed quote is final.", zh: "每個專案開始前都會確認範圍並提供書面報價。網站上的價格僅供參考，以電子郵件寄出的正式報價為準。" },
      { en: "You see a live preview of your website before you pay.", zh: "付款前，您可以先看到網站的即時預覽。" },
      { en: "Revision rounds are set by your package. Extra rounds and work outside the agreed scope are quoted separately.", zh: "修改輪數依您選擇的方案而定。額外修改輪數及超出約定範圍的工作將另行報價。" },
      { en: "You are responsible for supplying your text, photos and other content on time. Timelines depend on scope and how quickly we receive feedback.", zh: "您需按時提供文字、照片等內容。專案時間取決於範圍及回覆速度。" },
    ],
  },
  {
    title: { en: "Payment and refunds", zh: "付款與退款" },
    list: [
      { en: "Payment is due once you have previewed and approved your design. Payments are processed securely by Stripe. Prices are in Canadian dollars unless stated otherwise.", zh: "您預覽並確認設計後即需付款。付款由 Stripe 安全處理。除非另有註明，價格以加幣計價。" },
      { en: "Because you approve your website before paying, payments are final and non-refundable once made. Please raise any concerns before you pay.", zh: "由於您是在確認網站後才付款，款項一經支付概不退還。如有任何疑慮，請在付款前提出。" },
    ],
  },
  {
    title: { en: "Hosting and care", zh: "主機與維護" },
    list: [
      { en: "Your website is hosted on our platform. Free hosting is included; if you choose free hosting, changes after launch are quoted per request.", zh: "您的網站架設在我們的平台上，並包含免費主機。選擇免費主機的客戶，上線後的修改將按次報價。" },
      { en: "Managed hosting is $20/month or $200/year and includes maintenance and up to 2 small edits per month (text, photos, small layout tweaks). New pages, new features and larger changes are quoted separately. Unused edits don't roll over.", zh: "代管主機為每月 $20 或每年 $200，包含維護及每月最多 2 次小修改（文字、照片、小幅版面調整）。新頁面、新功能及較大的修改另行報價。未使用的修改次數不累積。" },
      { en: "Plans renew automatically until cancelled. You can cancel anytime; your plan runs to the end of the period you've paid for, with no partial refunds. If a plan is left unpaid, we may pause the website.", zh: "方案會自動續約直到取消。您可隨時取消，方案將持續至已付期間結束，不按比例退款。若方案逾期未付，我們可能暫停網站。" },
      { en: "You can take your website files and host them elsewhere at any time.", zh: "您可隨時取得網站檔案，轉往其他地方架設。" },
      { en: "Third-party fees, such as Shopify subscriptions or AI receptionist phone and usage costs, are paid by you directly to those providers.", zh: "第三方費用（例如 Shopify 月費、AI 電話接待的電話與使用費）由您直接支付給該供應商。" },
    ],
  },
  {
    title: { en: "Your domain, email and content", zh: "網域、電子郵件與內容" },
    body: [{ en: "Your domain name, email and content always belong to you. You confirm you have the right to use any text, photos and logos you give us.", zh: "您的網域、電子郵件與內容永遠屬於您。您確認有權使用您提供給我們的文字、照片與標誌。" }],
  },
  {
    title: { en: "Ownership of the design", zh: "設計所有權" },
    body: [{ en: "Once paid in full, you own the final website and design work, excluding third-party fonts, images or software licensed separately. Until then, the work remains ours. We may show finished work in our portfolio.", zh: "全額付款後，最終網站與設計作品歸您所有，但不包括另行授權的第三方字型、圖片或軟體；付清前作品仍屬我們所有。我們可能會將完成的作品放入作品集。" }],
  },
  {
    title: { en: "Limitation of liability", zh: "責任限制" },
    body: [{ en: "Our total liability for any claim is limited to the amount you paid for the service in question. We are not liable for indirect or consequential losses, such as lost profits or business interruption.", zh: "我們對任何索賠的總責任以您為該項服務支付的金額為上限，對於間接或衍生性損失（例如利潤損失或營業中斷）不負責任。" }],
  },
  {
    title: { en: "Changes and governing law", zh: "條款變更與準據法" },
    body: [{ en: "We may update these terms from time to time; the version posted here applies. Changes that affect a plan you pay for will be emailed to you first. These terms are governed by the laws of British Columbia, Canada.", zh: "我們可能不時更新本條款，以本頁公布的版本為準。若變更影響您付費的方案，我們會先以電子郵件通知。本條款受加拿大卑詩省法律管轄。" }],
  },
];

const Terms = () => (
  <LegalDoc
    title={{ en: "Terms of Service", zh: "服務條款" }}
    updated={{ en: "Last updated: November 19, 2026", zh: "最後更新：2026年11月19日" }}
    intro={{ en: "These terms apply when you use the Sonykun Design website or hire us for a project. By engaging our services, you agree to them.", zh: "當您使用 Sonykun Design 網站或委託我們進行專案時，適用本條款。委託我們的服務即表示您同意本條款。" }}
    sections={sections}
  />
);

export default Terms;
