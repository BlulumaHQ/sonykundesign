# sonykundesign.com — project notes

- Deploy: Netlify (auto-builds from `main`, `bun run build`). `/api/contact` → `netlify/functions/contact.mts` → n8n lead webhook (fallback: Resend). `worker/index.ts` is the Cloudflare mirror.
- Brand: Inter, near-black/near-white, accent #5B7189. No serif headings, no cream backgrounds.
- Primary CTA wording everywhere: "Get My Free Preview" / mobile bar "Free Preview". Don't introduce "quote" wording.
- Package slugs live in `src/lib/packages.ts`; pricing CTAs link to `/contact?package=<slug>` which pre-selects the form.
- Bundle prices (Nov 2026): Starter $650 (save $100), Business $1,200 (save $200), Premium $2,150 (save $375). Keep `src/lib/packages.ts` and both bundle blocks in `src/i18n/pageContent.ts` in sync.
- Testimonials: only real, permission-granted quotes. `TestimonialsSection` currently lists real client sites with no quotes; add `quote` per client when Sony supplies one. Google rating badge stays hidden until real numbers are set in `GoogleRating.tsx`.
- Portfolio titles from the CMS are cleaned by `displayTitle()` (strips " - A"/" - B" concept suffixes).
- On mobile, avoid `grid-cols-12` with gap ≥ 8 (11 gaps overflow 390px) — use `gap-x-4` on mobile.
- GA4 G-6GBC0P5Y05: `generate_lead` on form success, `phone_click` / `email_click` on tel:/mailto: taps.
