import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global editorial scroll animations driver.
 *
 * Mounted once at the app root. On every route change it scans the DOM and
 * attaches GSAP ScrollTriggers to:
 *   • [data-reveal]       — fades + slight rise on enter
 *   • [data-parallax]     — gentle vertical parallax while in view
 *   • [data-mask]         — image mask reveal (white panel slides up)
 *   • .heading-hero,
 *     .heading-section    — automatic editorial entrance
 *
 * Respects prefers-reduced-motion. Idempotent — kills previous triggers on
 * route change. Mobile-safe (no horizontal scroll triggers here).
 */
const GlobalScrollAnimations = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      return;
    }

    // Give the route's tree a frame to render before we measure.
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        ScrollTrigger.getAll().forEach((t) => t.kill());

        const ctx = gsap.context(() => {
          // Auto-reveal: headings + opt-in data attribute
          const revealEls = gsap.utils.toArray<HTMLElement>(
            "[data-reveal], .heading-hero, .heading-section"
          );
          revealEls.forEach((el) => {
            // Skip if already animated (e.g. inside hero above the fold and already visible).
            gsap.fromTo(
              el,
              { opacity: 0, y: 36 },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 88%",
                  once: true,
                },
              }
            );
          });

          // Parallax
          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
            const amount = Number(el.dataset.parallax) || 12;
            gsap.fromTo(
              el,
              { yPercent: amount },
              {
                yPercent: -amount,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          });

          // Mask reveal — requires a child wrapper with .mask-cover
          gsap.utils.toArray<HTMLElement>("[data-mask]").forEach((el) => {
            const cover = el.querySelector<HTMLElement>(".mask-cover");
            if (!cover) return;
            gsap.to(cover, {
              scaleY: 0,
              transformOrigin: "top center",
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: el,
                start: "top 82%",
                end: "top 30%",
                scrub: true,
              },
            });
          });

          // Refresh once everything is wired up
          ScrollTrigger.refresh();
        });

        // Cleanup when pathname changes / unmount
        return () => ctx.revert();
      });
      return () => cancelAnimationFrame(raf2);
    });
    return () => cancelAnimationFrame(raf1);
  }, [pathname]);

  return null;
};

export default GlobalScrollAnimations;
