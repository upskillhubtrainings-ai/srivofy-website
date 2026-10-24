# Srivofy website

Marketing website for **Srivofy — AI Automation Agency** (https://www.srivofy.com).

- **Stack:** Next.js 16 (static export) · TypeScript · Tailwind CSS 4 · Motion · Lucide icons
- **Output:** plain HTML/CSS/JS in `out/` — runs on any Hostinger web-hosting plan (no Node.js server needed)
- **Contact form:** `public/api/contact.php` (PHP mail on Hostinger)
- **Deployment:** GitHub → GitHub Actions builds → `deploy` branch → Hostinger Git deployment.
  Step-by-step instructions: **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**

## Run locally

```bash
npm install        # first time only
npm run dev        # http://localhost:3000 (live reload)
npm run build      # production build into out/
npm start          # preview the built site from out/ at http://localhost:3000
npm run lint
npm run typecheck
```

> The contact form's PHP mailer only runs on the Hostinger server. In `npm run dev` the form
> validates but sending shows an error (with a `[dev]` note) — that is expected.

## Pages

| Page | Route |
| --- | --- |
| Home | `/` |
| Services overview | `/services/` |
| Social Media Autopilot | `/services/social-media-autopilot/` |
| AI Voice Agents | `/services/ai-voice-agents/` |
| AI + WhatsApp Agent | `/services/whatsapp-ai-agent/` |
| Website Development | `/services/website-development/` |
| Document Processing | `/services/document-processing/` |
| About | `/about/` |
| Contact | `/contact/` |
| Portfolio (disabled) | `/portfolio/` → 404 until enabled |

## Edit the site — one file

**`src/config/site.ts`** holds every public detail: email, phone, website URL, social links,
consultation link, WhatsApp settings, demo URLs, contact-form endpoint and the Portfolio switch.
Change a value, rebuild (or push to GitHub) and it updates everywhere.

### Add demo links

In `src/config/site.ts`, fill in `demoLinks` with full `https://` URLs (YouTube, Loom, a live demo…):

```ts
demoLinks: {
  socialMedia: "https://…",        // Social Media Autopilot page
  voiceAgent: "https://…",         // AI Voice Agents page
  whatsappAgent: "https://…",      // AI + WhatsApp Agent page
  websiteDevelopment: "https://…", // Website Development page
  documentProcessing: "https://…", // Document Processing page
},
```

Empty values show **"Demo coming soon"** with a disabled button — never a broken link.

### Social links

`socialLinks.facebook` and `socialLinks.linkedin` are platform defaults (placeholders). Replace
them with Srivofy's real page URLs. Instagram is already set to `srivofyaiagency`.

### Consultation booking

Set `consultationUrl` to a booking page (Calendly, Cal.com…). While empty, every
"Request a Consultation" button opens the Contact page.

### WhatsApp button

- `whatsappNumber` — the floating button opens a WhatsApp chat with this number. Set to `""` to hide it.
- `whatsappAssistantUrl` — if you later connect a WhatsApp AI assistant or another approved chat link,
  paste its URL here; the button will open it and read "Chat with our AI assistant".
- For an embedded AI chat widget, replace the link in `src/components/layout/WhatsAppLauncher.tsx`
  with the provider's component. Keep any API keys on a server — never in this repository.

### Enable the Portfolio page

1. Add projects to `src/config/portfolio.ts` (screenshots go in `public/portfolio/`).
2. Set `portfolioEnabled: true` in `src/config/site.ts`.
3. Rebuild/push. The page, footer link and sitemap entry appear automatically.

### Content

- Service text, capabilities, workflows, FAQs and SEO: `src/config/services.ts`
- Service page layouts: `src/app/services/<service>/page.tsx`
- Design tokens (colours, type, motion): `src/app/globals.css`
- Logo (SVG): `src/components/ui/Logo.tsx` — original artwork kept at `public/brand/srivofy-logo-original.webp`

## Contact form

`public/api/contact.php` validates the submission, blocks simple spam (honeypot + per-IP rate
limit) and sends it with PHP `mail()`. Recipient and sender are set server-side in
`public/api/contact-config.php` (default: `inquiry@srivofy.com`). The sender must be a real mailbox
on your domain in Hostinger. To use a form service instead, set `contactFormEndpoint` in
`src/config/site.ts` to that service's JSON endpoint.

## What is illustrative (not live)

The voice console, WhatsApp chat, content calendar, website mockups and the invoice demo are
**frontend demonstrations** using sample data. No voice line, WhatsApp Business API, AI model,
OCR service or database is connected. Each needs its own integration before going live.
