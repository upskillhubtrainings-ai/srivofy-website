"use client";

import { useEffect } from "react";
import { answerTopics } from "@/config/answers";
import { serviceHref, services } from "@/config/services";
import { siteConfig } from "@/config/site";

/*
 * WebMCP (https://webmachinelearning.github.io/webmcp/): read-only tools that
 * AI agents running in the visitor's browser can call to learn about Srivofy.
 * Renders nothing, and does nothing in browsers without WebMCP support.
 * Enquiries go through the contact form, which is annotated as a tool too.
 */

interface WebMcpTool {
  name: string;
  description: string;
  inputSchema: object;
  annotations?: { readOnlyHint?: boolean };
  execute: (input: Record<string, unknown>) => Promise<unknown>;
}

interface ModelContext {
  registerTool: (tool: WebMcpTool) => void;
  unregisterTool?: (name: string) => void;
}

const origin = siteConfig.canonicalUrl;
const text = (value: string) => ({ content: [{ type: "text", text: value }] });
const json = (value: unknown) => text(JSON.stringify(value, null, 2));

const contact = {
  email: siteConfig.email,
  phone: siteConfig.phone,
  whatsapp: siteConfig.phone,
  contactForm: `${origin}/contact/`,
  location: "Hyderabad, Telangana, India",
};

const tools: WebMcpTool[] = [
  {
    name: "get_srivofy_overview",
    description: "What Srivofy is, where it is based, the services it offers and how to contact it.",
    inputSchema: { type: "object", properties: {} },
    annotations: { readOnlyHint: true },
    execute: async () =>
      json({
        name: siteConfig.name,
        summary: answerTopics[0].items[0].a,
        services: services.map((s) => ({ id: s.slug, name: s.name, summary: s.summary, url: `${origin}${serviceHref(s)}` })),
        contact,
      }),
  },
  {
    name: "get_service_details",
    description: "Full details of one Srivofy service: what it includes, how it works, use cases and FAQs.",
    inputSchema: {
      type: "object",
      properties: {
        service: { type: "string", enum: services.map((s) => s.slug), description: "The service id." },
      },
      required: ["service"],
    },
    annotations: { readOnlyHint: true },
    execute: async ({ service }) => {
      const s = services.find((x) => x.slug === service);
      if (!s) return text(`Unknown service. Choose one of: ${services.map((x) => x.slug).join(", ")}.`);
      return json({
        name: s.name,
        url: `${origin}${serviceHref(s)}`,
        description: s.intro,
        includes: s.capabilities,
        howItWorks: s.workflow,
        useCases: s.useCases,
        faqs: s.faqs,
        pricing: "Quoted per project after a short discovery conversation. Request pricing via the contact form.",
      });
    },
  },
  {
    name: "get_srivofy_contact",
    description: "How to contact Srivofy to request a consultation, demo or pricing.",
    inputSchema: { type: "object", properties: {} },
    annotations: { readOnlyHint: true },
    execute: async () => json(contact),
  },
];

export function WebMcpTools() {
  useEffect(() => {
    const mc = (navigator as Navigator & { modelContext?: ModelContext }).modelContext;
    if (!mc?.registerTool) return;
    for (const t of tools) {
      try {
        mc.registerTool(t);
      } catch {
        // Already registered (e.g. after a fast refresh) — ignore.
      }
    }
    return () => tools.forEach((t) => mc.unregisterTool?.(t.name));
  }, []);
  return null;
}
