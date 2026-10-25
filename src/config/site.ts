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

  /** Social profiles. An empty value hides that icon everywhere on the site. */
  socialLinks: {
    facebook: "https://www.facebook.com/Srivofyaiagency",
    instagram: "https://www.instagram.com/srivofyaiagency/",
    youtube: "https://www.youtube.com/@SrivofyAIAgency",
    // TODO: paste Srivofy's LinkedIn company page URL here to show the LinkedIn icon.
    linkedin: "",
  },

  /**
   * Portfolio page (/portfolio). Built but hidden while false:
   * no menu/footer links, not in the sitemap, and the URL returns 404.
   * Set to true — and add projects in src/config/portfolio.ts — to publish it.
   */
  portfolioEnabled: false,

  /**
   * Demo links, one per service. Paste a full https:// URL.
   * YouTube links play right on the service page; other links open in a new tab.
   * Empty = "Demo coming soon".
   */
  demoLinks: {
    socialMedia: "https://youtu.be/QvM_oxRVT5A",
    voiceAgent: "https://youtu.be/uxDK6EV_fRk",
    whatsappAgent: "",
    /** Website AI assistant demo, shown on the Website Development page. */
    websiteDevelopment: "https://youtu.be/21rXNgy77xg",
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

export type SocialKey = keyof typeof siteConfig.socialLinks;

const socialLabels: Record<SocialKey, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
  linkedin: "LinkedIn",
};

/** Social profiles that have a real URL, in display order. */
export const socialProfiles = (Object.keys(siteConfig.socialLinks) as SocialKey[])
  .filter((key) => isConfiguredUrl(siteConfig.socialLinks[key]))
  .map((key) => ({ key, label: socialLabels[key], url: siteConfig.socialLinks[key] as string }));

/** YouTube video id from a youtu.be / watch / shorts / embed URL, or null. */
export function youtubeId(url: string | undefined | null): string | null {
  if (!isConfiguredUrl(url)) return null;
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/))([\w-]{11})/i);
  return m ? m[1] : null;
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
