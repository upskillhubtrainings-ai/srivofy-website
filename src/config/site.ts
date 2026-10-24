/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SRIVOFY WEBSITE SETTINGS — the one file to edit for public details.
 * ─────────────────────────────────────────────────────────────────────────
 *
 *  Change a value here and it updates everywhere on the site.
 *  After editing: run `npm run build` (or push to GitHub to auto-deploy).
 *
 *  ⚠ Everything in this file is PUBLIC (it ships to visitors' browsers).
 *    Never put passwords, API keys or tokens here.
 *
 *  Leave a URL as "" when you don't have it yet — the site then shows a
 *  clear "coming soon" state instead of a broken link.
 */

export const siteConfig = {
  name: "Srivofy",
  tagline: "AI Automation Agency",

  /** Website address shown to visitors (utility bar, footer, contact page). */
  website: "https://www.srivofy.com",

  /**
   * Canonical address used for SEO, the sitemap and share cards. Must match
   * the address Hostinger finally serves: Hostinger redirects www → srivofy.com,
   * so the canonical origin is the non-www domain. (If you switch Hostinger's
   * preferred domain to www later, change this to "https://www.srivofy.com".)
   */
  canonicalUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://srivofy.com",

  email: "inquiry@srivofy.com",

  /** Shown as written; the tel: link strips spaces and dashes automatically. */
  phone: "+91-7207382886",

  socialLinks: {
    // TODO: replace with Srivofy's Facebook page URL (currently the platform default).
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/srivofyaiagency/",
    // TODO: replace with Srivofy's LinkedIn company page URL (currently the platform default).
    linkedin: "https://www.linkedin.com/",
  },

  /**
   * Portfolio page (/portfolio). Built but hidden while false:
   * no menu/footer links, not in the sitemap, and the URL returns 404.
   * Set to true — and add projects in src/config/portfolio.ts — to publish it.
   */
  portfolioEnabled: false,

  /**
   * External demo links, one per service. Paste a full https:// URL
   * (e.g. a YouTube/Loom video or a live demo). Empty = "Demo coming soon".
   */
  demoLinks: {
    socialMedia: "",
    voiceAgent: "",
    whatsappAgent: "",
    websiteDevelopment: "",
    documentProcessing: "",
  },

  /**
   * Where "Request a Consultation" buttons go. Paste a booking link
   * (Calendly, Cal.com, Google Calendar booking page...) to use it;
   * while empty, the buttons open the Contact page.
   */
  consultationUrl: "",

  /**
   * Floating WhatsApp button (bottom-right).
   * - whatsappNumber: international format; leave "" to hide the button.
   * - whatsappAssistantUrl: optional. If you later connect a WhatsApp AI
   *   assistant (or any approved chat link), paste its URL here and the
   *   button will open it instead of a direct wa.me chat.
   * - whatsappMessage: pre-filled text for the direct chat.
   */
  whatsappNumber: "+91-7207382886",
  whatsappAssistantUrl: "",
  whatsappMessage: "Hi Srivofy, I'd like to know more about your AI automation services.",

  /**
   * Contact form endpoint. "/api/contact.php" is the PHP mailer included in
   * this project (public/api/contact.php) — it works once deployed to
   * Hostinger. Set to "" to show the form as "not connected yet".
   */
  contactFormEndpoint: "/api/contact.php",
} as const;

/* ───────────── helpers (no need to edit below this line) ───────────── */

export type DemoKey = keyof typeof siteConfig.demoLinks;

/** True only for a real http(s) URL — empty or malformed values count as "not set". */
export function isConfiguredUrl(url: string | undefined | null): url is string {
  return !!url && /^https?:\/\/\S+$/i.test(url.trim());
}

export const telHref = `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`;
export const mailHref = `mailto:${siteConfig.email}`;
export const websiteLabel = siteConfig.website.replace(/^https?:\/\//, "");

/** Consultation destination: booking link if set, otherwise the Contact page. */
export const consultationHref = isConfiguredUrl(siteConfig.consultationUrl)
  ? siteConfig.consultationUrl
  : "/contact/";

/** WhatsApp launcher destination, or null when nothing is configured. */
export function whatsappHref(): string | null {
  if (isConfiguredUrl(siteConfig.whatsappAssistantUrl)) return siteConfig.whatsappAssistantUrl;
  const digits = siteConfig.whatsappNumber.replace(/\D/g, "");
  if (digits.length < 8) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;
}

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "Our Approach", href: "/#approach" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
] as const;
