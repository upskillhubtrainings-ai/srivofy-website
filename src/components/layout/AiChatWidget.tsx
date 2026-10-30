"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site";

/** Exact version, so a new n8n release can't change the live site unnoticed. */
const CHAT_CDN = "https://cdn.jsdelivr.net/npm/@n8n/chat@1.42.6/dist";

const theme = `:root {
  --chat--color--primary: #e8590c;
  --chat--color--primary-shade-50: #d6510a;
  --chat--color--primary--shade-100: #c2490a;
  --chat--toggle--background: #e8590c;
  --chat--toggle--hover--background: #d6510a;
  --chat--toggle--active--background: #d6510a;
  --chat--header--background: #1f1f1f;
  --chat--header--color: #ffffff;
  --chat--toggle--size: 60px;
}`;

/**
 * Floating AI chat assistant, served by an n8n workflow (siteConfig.chatAssistant).
 * The chat library is large, so it loads shortly after the page instead of
 * slowing the first paint. Hidden when webhookUrl is empty.
 */
export function AiChatWidget() {
  useEffect(() => {
    const { webhookUrl, title, subtitle, inputPlaceholder, initialMessages } = siteConfig.chatAssistant;
    if (!webhookUrl) return;

    const timer = setTimeout(() => {
      const options = {
        webhookUrl,
        mode: "window",
        showWelcomeScreen: false,
        initialMessages,
        i18n: { en: { title, subtitle, footer: "", getStarted: "New conversation", inputPlaceholder } },
      };

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `${CHAT_CDN}/style.css`;

      const style = document.createElement("style");
      style.textContent = theme;

      // A module script, because the library is an ES module on a CDN that the bundler must not touch.
      const script = document.createElement("script");
      script.type = "module";
      script.textContent = `import { createChat } from "${CHAT_CDN}/chat.bundle.es.js"; createChat(${JSON.stringify(options).replace(/</g, "\\u003c")});`;

      document.head.append(link, style, script);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
