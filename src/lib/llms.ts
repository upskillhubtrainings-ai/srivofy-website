import { answerTopics } from "@/config/answers";
import { serviceHref, services } from "@/config/services";
import { siteConfig } from "@/config/site";

/*
 * /llms.txt and /llms-full.txt (https://llmstxt.org): plain Markdown that
 * tells AI assistants what Srivofy is and where the key pages are. Built
 * from the same config as the website, so they never drift apart.
 */

const origin = siteConfig.canonicalUrl;
const url = (path: string) => `${origin}${path}`;

const intro = `# ${siteConfig.name}

> ${siteConfig.name} is an AI automation agency in Hyderabad, Telangana, India. It builds AI voice agents, WhatsApp AI chatbots, social media automation, business websites with AI assistants, and AI document processing for businesses across India, with human review built into every workflow.

- Website: ${url("/")}
- Email: ${siteConfig.email}
- Phone / WhatsApp: ${siteConfig.phone}
- Location: Hyderabad, Telangana, India (serves businesses across India)`;

export function llmsTxt() {
  return `${intro}

## Services

${services.map((s) => `- [${s.name}](${url(serviceHref(s))}): ${s.summary}`).join("\n")}

## Company

- [About Srivofy](${url("/about/")}): Who we are and how we approach AI automation.
- [AI automation FAQ](${url("/answers/")}): Direct answers about Srivofy and AI automation.
- [Contact](${url("/contact/")}): Request a consultation, demo or pricing.

## Optional

- [Full text for AI assistants](${url("/llms-full.txt")}): All services, capabilities and FAQs in one file.
- [Privacy Policy](${url("/privacy-policy/")})
- [Terms & Conditions](${url("/terms-and-conditions/")})
`;
}

export function llmsFullTxt() {
  const qa = (items: { q: string; a: string }[]) =>
    items.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n");

  const serviceBlocks = services.map(
    (s) => `## ${s.name}

URL: ${url(serviceHref(s))}

${s.intro}

### What it includes

${s.capabilities.map((c) => `- **${c.title}:** ${c.description}`).join("\n")}

### How it works

${s.workflow.map((w, i) => `${i + 1}. **${w.label}:** ${w.detail}`).join("\n")}

### Typical use cases

${s.useCases.map((u) => `- **${u.title}:** ${u.description}`).join("\n")}

${qa(s.faqs)}`,
  );

  return `${intro}

${answerTopics.map((t) => `## ${t.heading}\n\n${qa(t.items)}`).join("\n\n")}

${serviceBlocks.join("\n\n")}

## Contact

To discuss a project, request a demo or get pricing, email ${siteConfig.email}, call or WhatsApp ${siteConfig.phone}, or use the contact form at ${url("/contact/")}.
`;
}
