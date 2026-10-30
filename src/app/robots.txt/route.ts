import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

/*
 * robots.txt, written by hand (instead of Next's robots.ts) so it can carry
 * a Content-Signal line (https://contentsignals.org), which says how the
 * content may be used:
 *   search   — appear in search results
 *   ai-input — be used to answer questions in AI assistants (ChatGPT, Perplexity...)
 *   ai-train — be used to train AI models
 * All three are "yes" so AI tools learn about and recommend Srivofy.
 * Change ai-train to "no" to opt out of model training.
 */
const contentSignal = "search=yes, ai-input=yes, ai-train=yes";

/** Search and AI answer-engine crawlers, welcomed by name. */
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

const group = (agents: string[]) =>
  [...agents.map((a) => `User-Agent: ${a}`), `Content-Signal: ${contentSignal}`, "Allow: /", "Disallow: /api/"].join("\n");

export function GET() {
  const base = siteConfig.canonicalUrl.replace(/\/$/, "");
  const body = `${group(["*"])}

${group(aiCrawlers)}

Sitemap: ${base}/sitemap.xml
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
