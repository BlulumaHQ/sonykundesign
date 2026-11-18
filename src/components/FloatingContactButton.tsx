import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

/**
 * Mobile/tablet back-to-top button (call + preview live in the sticky bottom bar).
 * Sits just above the bottom sticky CTA bar.
 * Hidden on desktop (md+) where the standard header CTAs are sufficient.
 */
const FloatingContactButton = () => {
  const { lang } = useLanguage();
  const isZh = lang === "zh";
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const baseBtn =
    "w-12 h-12 rounded-full bg-background/95 backdrop-blur border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all active:scale-95";

  return (
    <div
      className="md:hidden fixed right-3 z-40 flex flex-col items-center gap-2.5"
      style={{ bottom: "calc(80px + env(safe-area-inset-bottom, 0px))" }}
    >
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={isZh ? "回到頂部" : "Back to top"}
        className={`${baseBtn} transition-opacity ${
          showTop ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <ArrowUp className="w-5 h-5" strokeWidth={2} />
      </button>
    </div>
  );
};

export default FloatingContactButton;
