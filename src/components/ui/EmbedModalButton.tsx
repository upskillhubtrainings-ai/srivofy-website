"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, X } from "lucide-react";

type Kind = "video" | "agent";

const frame: Record<Kind, { dialog: string; box: string; allow: string }> = {
  // 16:9 YouTube player
  video: {
    dialog: "w-[min(1100px,calc(100vw-2rem))]",
    box: "aspect-video bg-black",
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
  },
  // Tall live voice-agent widget; needs the visitor's microphone
  agent: {
    dialog: "w-[min(480px,calc(100vw-2rem))]",
    box: "h-[min(640px,calc(100dvh-11rem))] bg-white",
    allow: "microphone; autoplay; clipboard-write",
  },
};

/**
 * A link that opens embedded content in a popup on the page — a YouTube
 * video ("video") or a live AI voice agent ("agent").
 * - Native <dialog>: focus is trapped, Esc closes it, focus returns to the button.
 * - The iframe loads only when opened and is removed on close, which stops
 *   playback and ends any voice-agent call.
 * - Without JavaScript it is a plain link that opens `url` in a new tab.
 */
export function EmbedModalButton({
  url,
  src,
  title,
  kind = "video",
  className,
  children,
}: {
  /** Fallback link (no JavaScript). */
  url: string;
  /** Address loaded inside the popup. */
  src: string;
  title: string;
  kind?: Kind;
  className: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const f = frame[kind];

  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      trigger?.focus(); // return focus to the button that opened it
    };
  }, [open]);

  return (
    <>
      <a
        ref={triggerRef}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-haspopup="dialog"
        className={className}
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        {children}
      </a>

      <dialog
        ref={dialogRef}
        aria-label={title}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          // Clicking the dimmed area around the popup closes it.
          if (e.target === e.currentTarget) setOpen(false);
        }}
        className={`m-auto max-w-none overflow-visible bg-transparent p-0 backdrop:bg-navy/85 backdrop:backdrop-blur-sm open:animate-[enter_0.3s_var(--ease-out)_both] ${f.dialog}`}
      >
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="truncate text-[15px] font-medium text-white sm:text-base">{title}</p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label={kind === "agent" ? "End demo and close" : "Close video"}
          >
            <X aria-hidden className="size-5" />
          </button>
        </div>
        <div className={`relative w-full overflow-hidden rounded-lg shadow-[0_30px_80px_-20px_rgb(0_0_0/0.7)] ${f.box}`}>
          {open && (
            <iframe
              src={src}
              title={title}
              allow={f.allow}
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen={kind === "video"}
              className="absolute inset-0 size-full border-0"
            />
          )}
        </div>
        {kind === "agent" && (
          <p className="mt-3 flex items-start gap-2 text-[13px] leading-snug text-white/80">
            <Mic aria-hidden className="mt-0.5 size-4 shrink-0" />
            Your browser will ask to use your microphone. This is a live AI demo — please don&apos;t
            share personal or sensitive information. Closing this window ends the call.
          </p>
        )}
      </dialog>
    </>
  );
}
