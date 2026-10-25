"use client";

import { useState } from "react";
import { Play } from "lucide-react";

/**
 * Lightweight YouTube player: shows the video thumbnail and only loads the
 * real player (from youtube-nocookie.com) when the visitor clicks play,
 * so service pages stay fast.
 */
export function YouTubeEmbed({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-line bg-navy shadow-[0_24px_60px_-30px_rgb(16_29_54/0.45)]">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 size-full"
          aria-label={`Play video: ${title}`}
        >
          {/* Static export: plain <img> keeps the build host-agnostic. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt=""
            loading="lazy"
            onError={() => setThumb(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)}
            className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-(--ease-out) group-hover:scale-[1.02]"
          />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
          <span
            aria-hidden
            className="absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-blue text-white shadow-[0_10px_30px_-8px_rgb(36_85_214/0.8)] transition-transform duration-(--dur-base) group-hover:scale-110 sm:size-20"
          >
            <Play className="ml-1 size-7 fill-white sm:size-8" />
          </span>
          <span className="absolute bottom-4 left-4 right-4 text-left text-[15px] font-medium text-white sm:bottom-6 sm:left-6 sm:text-lg">
            {title}
          </span>
        </button>
      )}
    </div>
  );
}
