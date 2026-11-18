// Single source of truth for package slugs used by pricing CTAs (?package=) and the contact form select.
export const PACKAGES = [
  { slug: "basic-website", en: "Basic Website — $375", zh: "基本網站 — $375" },
  { slug: "business-website", en: "Business Website — $750", zh: "商業網站 — $750" },
  { slug: "premium-website", en: "Premium Website — $1,250", zh: "進階網站 — $1,250" },
  { slug: "starter-bundle", en: "Starter Bundle (website + logo) — $650", zh: "入門套裝（網站 + Logo）— $650" },
  { slug: "business-bundle", en: "Business Bundle (website + logo) — $1,200", zh: "商業套裝（網站 + Logo）— $1,200" },
  { slug: "premium-bundle", en: "Premium Brand Launch — $2,150", zh: "進階品牌啟動 — $2,150" },
  { slug: "basic-logo", en: "Basic Logo — $375", zh: "Basic Logo — $375" },
  { slug: "growth-logo", en: "Growth Logo — $650", zh: "Growth Logo — $650" },
  { slug: "premium-logo", en: "Premium Logo — $1,275", zh: "Premium Logo — $1,275" },
  { slug: "hosting", en: "Hosting / move my existing site", zh: "主機 / 搬移現有網站" },
  { slug: "not-sure", en: "Not sure yet — help me choose", zh: "還不確定 — 幫我選" },
] as const;

export const packageSlugFromTitle = (enTitle: string) =>
  enTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
