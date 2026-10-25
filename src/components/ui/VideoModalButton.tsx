"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

/**
 * A link that plays a YouTube video in a popup on the page.
 * - Native <dialog>: focus is trapped, Esc closes it, focus returns to the button.
 * - The player loads only when opened and is removed on close (stops playback).
 * - Without JavaScript it is a plain link that opens the video on YouTube.
 */
export function VideoModalButton({
  url,
  videoId,
  title,
  className,
  children,
}: {
  url: string;
  videoId: string;
  title: string;
  className: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      triggerRef.current?.focus(); // return focus to the button that opened it
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
          // Clicking the dimmed area around the video closes the popup.
          if (e.target === e.currentTarget) setOpen(false);
        }}
        className="m-auto w-[min(1100px,calc(100vw-2rem))] max-w-none overflow-visible bg-transparent p-0 backdrop:bg-navy/85 backdrop:backdrop-blur-sm open:animate-[enter_0.3s_var(--ease-out)_both]"
      >
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="truncate text-[15px] font-medium text-white sm:text-base">{title}</p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close video"
          >
            <X aria-hidden className="size-5" />
          </button>
        </div>
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black shadow-[0_30px_80px_-20px_rgb(0_0_0/0.7)]">
          {open && (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 size-full"
            />
          )}
        </div>
      </dialog>
    </>
  );
}
