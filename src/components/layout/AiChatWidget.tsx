"use client";

import { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { siteConfig } from "@/config/site";

/** Exact version, so a new n8n release can't change the live site unnoticed. */
const CHAT_CDN = "https://cdn.jsdelivr.net/npm/@n8n/chat@1.42.6/dist";
const READY_EVENT = "srivo-chat-ready";
const DISMISSED_KEY = "srivo-popup-dismissed";

/* The library's own toggle stays in place (it positions the chat window) but is
   hidden: Srivo's button below presses it. */
const theme = `:root {
  --chat--color--primary: #e8590c;
  --chat--color--primary-shade-50: #d6510a;
  --chat--color--primary--shade-100: #c2490a;
  --chat--header--background: #1f1f1f;
  --chat--header--color: #ffffff;
  --chat--toggle--size: 64px;
}
.chat-window-toggle { visibility: hidden; }`;

function popupDismissed() {
  try {
    return sessionStorage.getItem(DISMISSED_KEY) === "1";
  } catch {
    return false;
  }
}

function rememberDismissed() {
  try {
    sessionStorage.setItem(DISMISSED_KEY, "1");
  } catch {
    // Storage blocked: the popup simply shows again on the next page load.
  }
}

/** Srivo, the assistant's robot mascot. Animated by the .srivo-* rules in globals.css. */
function SrivoRobot() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className="srivo-robot size-full overflow-visible">
      <defs>
        <linearGradient id="srivo-head" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dbe5f7" />
        </linearGradient>
      </defs>
      {/* Antenna */}
      <path d="M32 15V9" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      <circle className="srivo-antenna" cx="32" cy="7" r="3.5" fill="#ff8a3d" />
      {/* Waving arm */}
      <g className="srivo-arm">
        <path d="M50 37c3.5-1.5 5-4.5 5.5-8" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <circle cx="55.8" cy="26.5" r="3.2" fill="#ff8a3d" />
      </g>
      {/* Resting arm */}
      <path d="M14 37c-3 1.5-4.5 3.5-5 6.5" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      {/* Ears */}
      <rect x="9.5" y="24" width="4.5" height="10" rx="2.2" fill="#ff8a3d" />
      <rect x="50" y="24" width="4.5" height="10" rx="2.2" fill="#ff8a3d" />
      {/* Head */}
      <rect x="13" y="14" width="38" height="30" rx="11" fill="url(#srivo-head)" />
      {/* Face screen */}
      <rect x="18" y="20" width="28" height="18" rx="7.5" fill="#101d36" />
      <g className="srivo-eyes">
        <circle cx="26" cy="28" r="3" fill="#5ee7ff" />
        <circle cx="38" cy="28" r="3" fill="#5ee7ff" />
      </g>
      <path d="M27 33c2.8 2.4 7.2 2.4 10 0" stroke="#5ee7ff" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Body */}
      <path d="M22 46h20a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4v-4a4 4 0 0 1 4-4Z" fill="url(#srivo-head)" />
      <circle cx="32" cy="52" r="2.6" fill="#ff8a3d" />
    </svg>
  );
}

/**
 * Srivo: a floating robot that opens the AI chat assistant, served by an n8n
 * workflow (siteConfig.chatAssistant), with a popup inviting visitors to talk.
 * The chat library is large, so it loads shortly after the page instead of
 * slowing the first paint. Hidden when webhookUrl is empty.
 */
export function AiChatWidget() {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const { webhookUrl, title, subtitle, inputPlaceholder, initialMessages } = siteConfig.chatAssistant;
    if (!webhookUrl) return;

    let popupTimer: ReturnType<typeof setTimeout>;
    const onReady = () => {
      setReady(true);
      popupTimer = setTimeout(() => {
        if (!popupDismissed()) setPopup(true);
      }, 2500);
    };
    window.addEventListener(READY_EVENT, onReady);

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
      script.textContent = `import { createChat } from "${CHAT_CDN}/chat.bundle.es.js"; createChat(${JSON.stringify(options).replace(/</g, "\\u003c")}); window.dispatchEvent(new Event("${READY_EVENT}"));`;

      document.head.append(link, style, script);
    }, 1200);

    return () => {
      clearTimeout(timer);
      clearTimeout(popupTimer);
      window.removeEventListener(READY_EVENT, onReady);
    };
  }, []);

  if (!ready) return null;

  const dismissPopup = () => {
    setPopup(false);
    rememberDismissed();
  };

  const toggleChat = () => {
    document.querySelector<HTMLElement>(".chat-window-toggle")?.click();
    setOpen((o) => !o);
    dismissPopup();
  };

  return (
    <div className="fixed right-4 bottom-4 z-[10000]">
      {popup && !open && (
        <div className="srivo-popup absolute right-[76px] bottom-1 w-[232px] rounded-2xl border border-line bg-white p-4 shadow-[0_16px_40px_-12px_rgb(16_29_54/0.45)]">
          <button type="button" onClick={toggleChat} className="block w-full cursor-pointer pr-3 text-left">
            <span className="block text-[16px] font-semibold text-navy">Hi, I&apos;m Srivo! 👋</span>
            <span className="mt-1 block text-[14px] leading-snug text-muted">
              Curious what AI could do for your business? Ask me anything.
            </span>
            <span className="mt-2.5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#c2490a]">
              Talk to me <ArrowRight aria-hidden className="size-4" />
            </span>
          </button>
          <button
            type="button"
            onClick={dismissPopup}
            aria-label="Close message"
            className="absolute top-2 right-2 grid size-6 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:bg-paper hover:text-navy"
          >
            <X aria-hidden className="size-3.5" />
          </button>
          {/* Speech-bubble tail, pointing at the robot. */}
          <span aria-hidden className="absolute right-[-7px] bottom-6 size-3.5 rotate-45 border-t border-r border-line bg-white" />
        </div>
      )}
      <button
        type="button"
        onClick={toggleChat}
        aria-expanded={open}
        aria-label={open ? "Close chat with Srivo" : "Chat with Srivo, our AI assistant"}
        className={`relative grid size-16 cursor-pointer place-items-center rounded-full bg-gradient-to-br from-blue to-navy shadow-[0_12px_30px_-8px_rgb(16_29_54/0.65)] ring-2 ring-white transition-transform duration-200 hover:scale-105 ${open ? "" : "srivo-float"}`}
      >
        {open ? (
          <X aria-hidden className="size-7 text-white" />
        ) : (
          <>
            <span className="block size-12">
              <SrivoRobot />
            </span>
            <span aria-hidden className="absolute top-0.5 right-0.5 size-3.5 rounded-full bg-[#22c55e] ring-2 ring-white" />
          </>
        )}
      </button>
    </div>
  );
}
