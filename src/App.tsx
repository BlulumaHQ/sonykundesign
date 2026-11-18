import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { ZH_PREFIX, langFromPath } from "@/lib/locale";

const basename = typeof window !== "undefined" && langFromPath(window.location.pathname) === "zh" ? ZH_PREFIX : undefined;
import AnimatedRoutes from "@/components/AnimatedRoutes";
import MobileBottomCTA from "@/components/MobileBottomCTA";

const queryClient = new QueryClient();

// GA4: count phone and email taps as leads (form submits fire generate_lead in ContactSection).
if (typeof window !== "undefined") {
  document.addEventListener("click", (e) => {
    const a = (e.target as HTMLElement | null)?.closest?.("a[href^='tel:'], a[href^='mailto:']") as HTMLAnchorElement | null;
    if (!a) return;
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    gtag?.("event", a.href.startsWith("tel:") ? "phone_click" : "email_click", { link_url: a.href, page_path: location.pathname });
  }, { capture: true });
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={basename}>
          <AnimatedRoutes />
          <MobileBottomCTA />
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
