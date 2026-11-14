// Cloudflare Worker for sonykundesign.com
// - POST /api/contact: emails the contact form to Sony via Resend (spam-filtered)
// - Everything else: static assets from dist/ (pre-rendered pages + SPA fallback)
// Secrets: RESEND_API_KEY (Resend, sending domain send.sonykundesign.com)

interface Env {
  ASSETS: { fetch: (req: Request | string) => Promise<Response> };
  RESEND_API_KEY?: string;
}

const TO = "sony@bluluma.com";
const FROM = "Sonykun Design Website <noreply@send.sonykundesign.com>";
const SITE = "Sonykun Design";
const PLATFORM_HOST = /(^|\.)(lovable\.app|workers\.dev|pages\.dev|netlify\.app)$/i;

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const MIN_FILL_MS = 3000;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;

// Random-string names like "rlqSkDcAEwXpMUSoImD"
function looksLikeGibberish(name: string): boolean {
  const n = name.trim();
  if (!n || /\s/.test(n) || n.length < 10) return false;
  const innerCaps = (n.slice(1).match(/[A-Z]/g) || []).length;
  const vowels = (n.match(/[aeiouAEIOU]/g) || []).length;
  return innerCaps >= 2 || vowels / n.length < 0.2;
}

function spamReason(f: Record<string, string>): string | null {
  if (f._gotcha || f["bot-field"] || f.website_hp) return "honeypot";
  const t = Number(f._t);
  if (!t) return "no_timestamp";
  const age = Date.now() - t;
  if (age < MIN_FILL_MS) return "too_fast";
  if (age > MAX_FORM_AGE_MS) return "stale_form";
  const name = f.name || [f.firstName, f.lastName].filter(Boolean).join(" ");
  if (looksLikeGibberish(name)) return "gibberish_name";
  return null;
}

async function handleContact(req: Request, env: Env): Promise<Response> {
  if (req.method !== "POST") return json(405, { ok: false });
  if (!env.RESEND_API_KEY) return json(500, { ok: false, error: "not_configured" });

  const fields: Record<string, string> = {};
  try {
    if ((req.headers.get("content-type") || "").includes("application/json")) {
      for (const [k, v] of Object.entries((await req.json()) as Record<string, unknown>)) fields[k] = String(v ?? "");
    } else {
      for (const [k, v] of (await req.formData()).entries()) if (typeof v === "string") fields[k] = fields[k] ? `${fields[k]}, ${v}` : v;
    }
  } catch {
    return json(400, { ok: false, error: "invalid_body" });
  }

  const reason = spamReason(fields);
  if (reason) {
    console.log("Blocked spam submission:", reason, (fields.name || "").slice(0, 40), (fields.email || "").slice(0, 60));
    return json(200, { ok: true });
  }

  const email = (fields.email || "").trim();
  const name = (fields.name || [fields.firstName, fields.lastName].filter(Boolean).join(" ") || "Website visitor").trim();
  const rows = Object.entries(fields)
    .filter(([k, v]) => v && !k.startsWith("_") && k !== "website_hp")
    .map(([k, v]) => `<tr><td style="padding:6px 14px 6px 0;font-weight:bold;vertical-align:top">${esc(k)}</td><td style="padding:6px 0;white-space:pre-wrap">${esc(v.slice(0, 5000))}</td></tr>`)
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      ...(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? { reply_to: email } : {}),
      subject: `New inquiry from ${name.slice(0, 80)} — ${SITE}`,
      html: `<div style="font-family:Arial,sans-serif;color:#222"><h2>New website inquiry — ${SITE}</h2><table>${rows}</table></div>`,
    }),
  });
  if (!res.ok) {
    console.error("Resend failed", res.status, await res.text());
    return json(502, { ok: false, error: "delivery_failed" });
  }
  return json(200, { ok: true });
}

/** Temporary *.workers.dev host: keep it out of Google. Custom domain stays indexable. */
function withNoindex(req: Request, res: Response): Response {
  const host = new URL(req.url).hostname.replace(/\.$/, "");
  if (!PLATFORM_HOST.test(host)) return res;
  const headers = new Headers(res.headers);
  headers.set("X-Robots-Tag", "noindex, nofollow");
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);

    if (url.pathname === "/api/contact" || url.pathname === "/.netlify/functions/contact") {
      return handleContact(req, env);
    }

    // Static files and pre-rendered pages (/pricing -> pricing.html, /zh/pricing -> zh/pricing.html).
    let res = await env.ASSETS.fetch(req);

    // SPA fallback for client-side routes (e.g. /portfolio/<slug>, /portfolio/<cat>/page/2).
    if (res.status === 404 && (req.method === "GET" || req.method === "HEAD") && !/\.[a-z0-9]+$/i.test(url.pathname)) {
      const zh = url.pathname === "/zh" || url.pathname.startsWith("/zh/");
      const shell = await env.ASSETS.fetch(new Request(new URL(zh ? "/zh" : "/", url), req));
      res = new Response(shell.body, { status: 200, headers: shell.headers });
    }

    return withNoindex(req, res);
  },
};
