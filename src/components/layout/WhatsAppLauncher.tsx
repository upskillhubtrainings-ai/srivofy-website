"use client";

import { useEffect, useState } from "react";
import { isConfiguredUrl, siteConfig, whatsappHref } from "@/config/site";
import { WhatsAppIcon } from "./BrandIcons";

/**
 * Floating WhatsApp button. Hidden unless siteConfig.whatsappNumber or
 * siteConfig.whatsappAssistantUrl is set. It only opens WhatsApp (or the
 * configured assistant link) — it does not send messages or collect data.
 *
 * Future embedded AI assistant: replace the <a> below with your provider's
 * widget component, loading any keys from your backend, never from here.
 */
export function WhatsAppLauncher() {
  const href = whatsappHref();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  if (!href) return null;

  const label = isConfiguredUrl(siteConfig.whatsappAssistantUrl)
    ? "Chat with our AI assistant"
    : "Chat with us on WhatsApp";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens WhatsApp in a new tab)`}
      className={`group fixed right-4 bottom-4 z-40 flex items-center gap-2.5 rounded-full bg-[#1f9d55] py-3 pr-3 pl-3 text-white shadow-[0_10px_30px_-10px_rgb(16_29_54/0.55)] transition-[opacity,transform,background-color] duration-500 ease-(--ease-out) hover:bg-[#178a4a] sm:right-6 sm:bottom-6 sm:pr-5 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <WhatsAppIcon className="size-6" />
      <span className="hidden text-sm font-medium sm:inline">{label}</span>
    </a>
  );
}
