/**
 * Decorative background pattern overlay.
 * Place inside a relatively-positioned section as the first child.
 * variant="dark" → horizontal lines on dark sections.
 * variant="light" → vertical lines on light sections.
 */
type Props = {
  variant?: "dark" | "light";
  opacity?: number;
  className?: string;
};

const LinePattern = ({ variant = "light", opacity, className = "" }: Props) => {
  const src = variant === "dark" ? "/linebg-dark.webp" : "/linebg-light.png";
  const defaultOpacity = variant === "dark" ? 0.35 : 0.9;
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      style={{
        backgroundImage: `url(${src})`,
        backgroundRepeat: "repeat",
        backgroundSize: variant === "dark" ? "420px auto" : "640px auto",
        opacity: opacity ?? defaultOpacity,
        mixBlendMode: variant === "dark" ? "screen" : "multiply",
      }}
    />
  );
};

export default LinePattern;
