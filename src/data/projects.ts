import oneParkHome from "@/assets/projects/one-park-home.jpg";
import btnRealEstate from "@/assets/projects/btn-real-estate.jpg";
import helenLam from "@/assets/projects/helen-lam.jpg";
import presotea from "@/assets/projects/presotea.jpg";
import littleMountainDental from "@/assets/projects/little-mountain-dental.jpg";
import friendlyDental from "@/assets/projects/friendly-dental.jpg";
import yangHealth from "@/assets/projects/yang-health.jpg";
import unityTattoo from "@/assets/projects/unity-tattoo.jpg";
import nueraNutra from "@/assets/projects/nuera-nutra.jpg";
import vitaEnvironmental from "@/assets/projects/vita-environmental.jpg";
import vancouverWineSchool from "@/assets/projects/vancouver-wine-school.jpg";
import calinClub from "@/assets/projects/calin-club.jpg";

export type ProjectCategory = "Web Design" | "Branding" | "Ecommerce" | "AI Automation";

/**
 * Redesigned portfolio categories — grouped by real industry verticals
 * SonyKun Design serves. Used for filtering on the /portfolio page.
 */
export type PortfolioCategory =
  | "Dental & Healthcare"
  | "Beauty & Wellness"
  | "Realtor"
  | "Real Estate Development"
  | "Construction & Architecture"
  | "Education"
  | "Travel"
  | "Creative & Tattoo"
  | "Restaurant & Food"
  | "Automotive"
  | "Professional Services";

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  "Dental & Healthcare",
  "Beauty & Wellness",
  "Realtor",
  "Real Estate Development",
  "Construction & Architecture",
  "Education",
  "Travel",
  "Creative & Tattoo",
  "Restaurant & Food",
  "Automotive",
  "Professional Services",
];

/** URL slug ↔ PortfolioCategory mapping for real route navigation. */
export const portfolioCategorySlug: Record<PortfolioCategory, string> = {
  "Dental & Healthcare": "dental-healthcare",
  "Beauty & Wellness": "beauty-wellness",
  Realtor: "realtor",
  "Real Estate Development": "real-estate-development",
  "Construction & Architecture": "construction-architecture",
  Education: "education",
  Travel: "travel",
  "Creative & Tattoo": "creative-tattoo",
  "Restaurant & Food": "restaurant-food",
  Automotive: "automotive",
  "Professional Services": "professional-services",
};

export const portfolioCategoryFromSlug = (slug?: string): PortfolioCategory | null => {
  if (!slug) return null;
  const entry = (Object.entries(portfolioCategorySlug) as [PortfolioCategory, string][]).find(
    ([, s]) => s === slug
  );
  return entry ? entry[0] : null;
};

export const portfolioCategoryZh: Record<PortfolioCategory | "All", string> = {
  All: "全部",
  "Dental & Healthcare": "牙科 / 醫療",
  "Beauty & Wellness": "美容 / 養生",
  Realtor: "房地產經紀",
  "Real Estate Development": "預售屋 / 建商",
  "Construction & Architecture": "建築 / 營造",
  Education: "教育",
  Travel: "旅遊",
  "Creative & Tattoo": "創意 / 刺青",
  "Restaurant & Food": "餐飲",
  Automotive: "汽車",
  "Professional Services": "專業服務",
};

export type ServiceCategory =
  | "Website Design"
  | "Corporate Website"
  | "Marketing Design"
  | "Branding Design"
  | "Logo Design"
  | "Social Media Design"
  | "E-Commerce"
  | "Landing Page"
  | "SEO Setup"
  | "AI Automation";

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  "Website Design",
  "Corporate Website",
  "Marketing Design",
  "Branding Design",
  "Logo Design",
  "Social Media Design",
  "E-Commerce",
  "Landing Page",
  "SEO Setup",
  "AI Automation",
];

export const serviceCategoryZh: Record<ServiceCategory | "All", string> = {
  All: "全部",
  "Website Design": "網站設計",
  "Corporate Website": "企業網站",
  "Marketing Design": "行銷設計",
  "Branding Design": "品牌設計",
  "Logo Design": "Logo 設計",
  "Social Media Design": "社群媒體設計",
  "E-Commerce": "電商網站",
  "Landing Page": "Landing Page",
  "SEO Setup": "SEO 設定",
  "AI Automation": "AI 自動化",
};

export interface Project {
  slug: string;
  name: string;
  industry: string;
  services: string[];
  /** Standardised filterable service tags (every project must have ≥1). */
  serviceCategories: ServiceCategory[];
  /** Optional poster image. If omitted, the card falls back to a live screenshot via thum.io. */
  image?: string;
  alt?: string;
  type: "client" | "wordpress";
  description?: string;
  category: ProjectCategory[];
  portfolioCategory: PortfolioCategory;
  year: number;
  featured?: boolean;
  caseStudy?: boolean;
  liveUrl?: string;
}

// Default service tag set applied to most portfolio entries.
const BL_CW = ["Brand Logo", "Corporate Website"];
const BL_CW_CATS: ServiceCategory[] = ["Logo Design", "Corporate Website", "Branding Design"];

export const projects: Project[] = [
  // ── Featured Case Studies ──
  {
    slug: "one-park-home",
    portfolioCategory: "Real Estate Development",
    name: "One Park Home",
    industry: "Real Estate Development",
    services: ["Corporate Website", "Marketing Design"],
    serviceCategories: ["Corporate Website", "Marketing Design"],
    image: oneParkHome,
    alt: "Corporate website design for One Park Home real estate development",
    type: "client",
    description:
      "A digital presence that communicates trust, elegance, and architectural sophistication for a modern residential development brand.",
    category: ["Web Design"],
    year: 2026,
    featured: true,
    caseStudy: true,
    liveUrl: "https://one-park-home.bluluma.com/",
  },
  {
    slug: "presotea",
    portfolioCategory: "Restaurant & Food",
    name: "Presotea",
    industry: "Food & Beverage",
    services: ["Corporate Website", "Marketing Design"],
    serviceCategories: ["Corporate Website", "Marketing Design"],
    image: presotea,
    alt: "Corporate website and marketing design for Presotea bubble tea brand",
    type: "client",
    description:
      "A vibrant digital platform reflecting the brand's youthful energy with strong visual consistency across marketing materials.",
    category: ["Web Design"],
    year: 2026,
    featured: true,
    caseStudy: true,
    liveUrl: "https://presotea.bluluma.com/",
  },
  {
    slug: "btn-group",
    portfolioCategory: "Construction & Architecture",
    name: "BTN Group",
    industry: "Construction & Architecture",
    services: ["Brand Logo", "Corporate Website", "Marketing Design"],
    serviceCategories: ["Logo Design", "Corporate Website", "Marketing Design", "Branding Design"],
    image: btnRealEstate,
    alt: "Brand identity and corporate website design for BTN Group",
    type: "client",
    description:
      "Complete brand identity system with a corporate website reflecting professionalism, expertise, and industry credibility.",
    category: ["Web Design", "Branding"],
    year: 2026,
    featured: true,
    caseStudy: true,
    liveUrl: "https://btn-b.netlify.app/",
  },

  // ── Dental & Healthcare ──
  {
    slug: "friendly-dental",
    portfolioCategory: "Dental & Healthcare",
    name: "Friendly Dental",
    industry: "Dental Clinic",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    image: friendlyDental,
    alt: "Brand identity and website design for Friendly Dental clinic",
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://friendlydental.ca/",
  },
  {
    slug: "u-dental",
    portfolioCategory: "Dental & Healthcare",
    name: "U Dental",
    industry: "Dental Clinic",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://u-dental.netlify.app/",
  },
  {
    slug: "westside-medical-associates",
    portfolioCategory: "Dental & Healthcare",
    name: "Westside Medical Associates",
    industry: "Medical Clinic",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://westsidemedicalassociates-a.netlify.app/",
  },
  {
    slug: "little-mountain-dental",
    portfolioCategory: "Dental & Healthcare",
    name: "Little Mountain Dental",
    industry: "Dental Clinic",
    services: ["Brand Logo", "Corporate Website", "Marketing Design"],
    serviceCategories: ["Logo Design", "Corporate Website", "Marketing Design", "Branding Design"],
    image: littleMountainDental,
    alt: "Brand logo and website design for Little Mountain Dental clinic",
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "http://littlemountain.bluluma.com/",
  },

  // ── Beauty & Wellness ──
  {
    slug: "initial-salon",
    portfolioCategory: "Beauty & Wellness",
    name: "Initial Salon",
    industry: "Hair Salon",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://initialsalon.com/",
  },
  {
    slug: "studio-21-salon-spa",
    portfolioCategory: "Beauty & Wellness",
    name: "Studio 21 Salon & Spa",
    industry: "Salon & Spa",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://studio21salonspa-a.netlify.app/",
  },
  {
    slug: "styles-hair-salon",
    portfolioCategory: "Beauty & Wellness",
    name: "Styles Hair Salon",
    industry: "Hair Salon",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://styleshairsalon-a.netlify.app/",
  },
  {
    slug: "yang-health",
    portfolioCategory: "Beauty & Wellness",
    name: "Yang Health Therapeutic",
    industry: "Therapeutic Clinic",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    image: yangHealth,
    alt: "Brand logo and corporate website for Yang Health Therapeutic Clinic",
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://yang-health-therapeutic.bluluma.com/",
  },

  // ── Realtor ──
  {
    slug: "eric-kim-realty",
    portfolioCategory: "Realtor",
    name: "Eric Kim Realty",
    industry: "Real Estate Agent",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://erickimrealty.com/",
  },
  {
    slug: "sterling-wong-realty",
    portfolioCategory: "Realtor",
    name: "Sterling Wong Realty",
    industry: "Real Estate Agent",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://sterlingwongrealty.netlify.app/",
  },
  {
    slug: "tiffany-tseng-realty",
    portfolioCategory: "Realtor",
    name: "Tiffany Tseng Realty",
    industry: "Real Estate Agent",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://tiffanytsengrealty.netlify.app/",
  },
  {
    slug: "shella-tony-realty",
    portfolioCategory: "Realtor",
    name: "Shella & Tony Realty",
    industry: "Real Estate Agent",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://shellatonychenrealty.netlify.app/",
  },
  {
    slug: "helen-lam-realty",
    portfolioCategory: "Realtor",
    name: "Helen Lam Realty",
    industry: "Real Estate Agent",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    image: helenLam,
    alt: "Corporate website and marketing design for Helen Lam Realty",
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://helenlamrealty.netlify.app/",
  },
  {
    slug: "vicky-chai-realty",
    portfolioCategory: "Realtor",
    name: "Vicky Chai Realty",
    industry: "Real Estate Agent",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://vickychairealty.netlify.app/",
  },

  // ── Real Estate Development / Pre-Sale ──
  {
    slug: "oviedo-properties",
    portfolioCategory: "Real Estate Development",
    name: "Oviedo Properties",
    industry: "Real Estate Development",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://oviedoproperties-a.netlify.app/",
  },

  // ── Construction / Architecture / Development ──
  {
    slug: "k-chen-construction",
    portfolioCategory: "Construction & Architecture",
    name: "K Chen Construction",
    industry: "Construction",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://kchenconstruction-b.netlify.app/",
  },
  {
    slug: "architect57",
    portfolioCategory: "Construction & Architecture",
    name: "Architect57",
    industry: "Architecture",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://architect57-b.netlify.app/",
  },
  {
    slug: "vita-construction",
    portfolioCategory: "Construction & Architecture",
    name: "Vita Construction",
    industry: "Construction",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    image: vitaEnvironmental,
    alt: "Brand logo and corporate website for Vita Construction",
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://vitaenv-b.netlify.app/",
  },
  {
    slug: "phoenix-remodel",
    portfolioCategory: "Construction & Architecture",
    name: "Phoenix Remodel",
    industry: "Remodeling",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://phoenixremodel-b.netlify.app/",
  },

  // ── Education ──
  {
    slug: "education-bc",
    portfolioCategory: "Education",
    name: "Education BC",
    industry: "Education Consulting",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://educationbc.ca/",
  },
  {
    slug: "elevate-educational",
    portfolioCategory: "Education",
    name: "Elevate Educational",
    industry: "Education",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://elevate-educational-b.sony-40b.workers.dev/",
  },

  // ── Travel ──
  {
    slug: "shooting-star-travel",
    portfolioCategory: "Travel",
    name: "Shooting Star Travel",
    industry: "Travel Agency",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://shootingstartravel.ca/",
  },

  // ── Creative & Tattoo ──
  {
    slug: "unity-tattoo",
    portfolioCategory: "Creative & Tattoo",
    name: "Unity Tattoo",
    industry: "Tattoo Studio",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    image: unityTattoo,
    alt: "Brand logo and corporate website for Unity Tattoo studio",
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2024,
    liveUrl: "https://unity-tattoo.com/",
  },
  {
    slug: "first-third-designs",
    portfolioCategory: "Creative & Tattoo",
    name: "First Third Designs",
    industry: "Creative Studio",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://firstthirddesigns-b.netlify.app/",
  },
  {
    slug: "bluluma-design",
    portfolioCategory: "Creative & Tattoo",
    name: "Bluluma Design",
    industry: "Design Studio",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://bluluma.com/",
  },
  {
    slug: "swiftlift-design",
    portfolioCategory: "Creative & Tattoo",
    name: "SwiftLift Design",
    industry: "Design Studio",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://swiftlift.app/",
  },

  // ── Restaurant & Food ──
  {
    slug: "yui-living",
    portfolioCategory: "Restaurant & Food",
    name: "Yui Living",
    industry: "Restaurant",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://yuiliving.ca/",
  },
  {
    slug: "genes-sausage",
    portfolioCategory: "Restaurant & Food",
    name: "Gene's Sausage",
    industry: "Food Retail",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://genessausage-b.netlify.app/",
  },
  {
    slug: "spearfish-brewing",
    portfolioCategory: "Restaurant & Food",
    name: "Spearfish Brewing",
    industry: "Brewery",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://spearfishbrewing-b.netlify.app/",
  },
  {
    slug: "la-petite-elli-boutique",
    portfolioCategory: "Restaurant & Food",
    name: "La Petite Elli Boutique",
    industry: "Food Boutique",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://lapetiteelli.com/",
  },

  // ── Automotive ──
  {
    slug: "arts-automotive",
    portfolioCategory: "Automotive",
    name: "Art's Automotive",
    industry: "Auto Repair",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://artsautomotive-b.netlify.app/",
  },
  {
    slug: "wash-world-car-wash",
    portfolioCategory: "Automotive",
    name: "Wash World Car Wash",
    industry: "Car Wash",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://washworldcarwash.netlify.app/",
  },

  // ── Professional Services / Corporate ──
  {
    slug: "asian-pacific-farm",
    portfolioCategory: "Professional Services",
    name: "Asian Pacific Farm",
    industry: "Agriculture",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://asianpacificfarm.netlify.app/",
  },
  {
    slug: "cesc",
    portfolioCategory: "Professional Services",
    name: "CESC",
    industry: "Corporate",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://cesc-concept-a.sony-40b.workers.dev/",
  },
  {
    slug: "ying-ting-smart-learning",
    portfolioCategory: "Professional Services",
    name: "Ying Ting Smart Learning",
    industry: "Corporate Training",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://yingting-smart.sony-40b.workers.dev/",
  },
  {
    slug: "nuera-nutra",
    portfolioCategory: "Professional Services",
    name: "NuEra Nutra",
    industry: "Biotechnology",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    image: nueraNutra,
    alt: "Corporate website design for NuEra Nutra biotechnology company",
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2024,
    liveUrl: "https://nueranutra-b.netlify.app/",
  },
  {
    slug: "hh-nexus-capital",
    portfolioCategory: "Professional Services",
    name: "HH Nexus Capital",
    industry: "Finance",
    services: BL_CW,
    serviceCategories: BL_CW_CATS,
    type: "client",
    category: ["Web Design", "Branding"],
    year: 2025,
    liveUrl: "https://hhnexuscapital-a.netlify.app/",
  },

  // ── WordPress legacy projects ──
  {
    slug: "vancouver-wine-school",
    portfolioCategory: "Education",
    name: "Vancouver Wine School",
    industry: "Education",
    services: ["Website Design"],
    serviceCategories: ["Website Design"],
    image: vancouverWineSchool,
    alt: "WordPress website design for Vancouver Wine School",
    type: "wordpress",
    category: ["Web Design"],
    year: 2023,
    liveUrl: "https://vancouverwineschool.ca/",
  },
  {
    slug: "calin-club",
    portfolioCategory: "Restaurant & Food",
    name: "Calin Club",
    industry: "Lifestyle",
    services: ["Website Design"],
    serviceCategories: ["Website Design"],
    image: calinClub,
    alt: "WordPress website design for Calin Club",
    type: "wordpress",
    category: ["Web Design"],
    year: 2023,
    liveUrl: "http://calinclub.ca/",
  },
];

export const projectCategories: ProjectCategory[] = ["Web Design", "Branding", "Ecommerce", "AI Automation"];
