import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  trigger?: "load" | "scroll";
  stagger?: number;
}

/**
 * Per-letter editorial reveal. Splits text into spans and animates them
 * with GSAP. Respects prefers-reduced-motion. Mounted in hero / chapter
 * openings only — do not overuse.
 */
const SplitTextReveal = ({
  text,
  className = "",
  as: Tag = "h1",
  delay = 0,
  trigger = "load",
  stagger = 0.025,
}: Props) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const letters = el.querySelectorAll<HTMLElement>("[data-char]");
    if (reduce || letters.length === 0) {
      gsap.set(letters, { yPercent: 0, opacity: 1 });
      return;
    }

    gsap.set(letters, { yPercent: 110, opacity: 0 });

    const animate = () =>
      gsap.to(letters, {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: "expo.out",
        stagger,
        delay,
      });

    let st: ScrollTrigger | undefined;
    if (trigger === "scroll") {
      st = ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: animate,
      });
    } else {
      animate();
    }

    return () => {
      st?.kill();
    };
  }, [text, delay, trigger, stagger]);

  const lines = text.split("\n");

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={className}
      aria-label={text}
    >
      {lines.map((line, li) => (
        <span key={li} className="block overflow-hidden" aria-hidden="true">
          {/* Letters are grouped per word so lines only wrap between words. */}
          {line.split(" ").map((word, wi) => (
            <span key={`${li}-${wi}`}>
              {wi > 0 && " "}
              <span className="inline-block whitespace-nowrap">
                {Array.from(word).map((ch, i) => (
                  <span key={i} data-char className="inline-block will-change-transform">
                    {ch}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
};

export default SplitTextReveal;
