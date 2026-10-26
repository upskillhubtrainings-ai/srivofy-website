import Link from "next/link";
import { Clock3, ExternalLink, PlayCircle } from "lucide-react";
import { isConfiguredUrl, siteConfig, youtubeId, type DemoKey } from "@/config/site";
import { buttonClasses } from "./Button";
import { VideoModalButton } from "./VideoModalButton";

/**
 * The demo button for a service. Reads its URL from siteConfig.demoLinks —
 * never hard-coded. YouTube links play in a popup on the page; other links
 * open in a new tab. When the URL is empty it renders a disabled
 * "Demo coming soon" state (no href="#", no broken link).
 */
export function DemoLink({
  demoKey,
  label,
  title,
  onNavy = false,
}: {
  demoKey: DemoKey;
  label: string;
  /** Heading shown above the video in the popup. */
  title?: string;
  onNavy?: boolean;
}) {
  const url = siteConfig.demoLinks[demoKey];
  const videoId = youtubeId(url);

  if (isConfiguredUrl(url) && videoId) {
    return (
      <VideoModalButton url={url} videoId={videoId} title={title ?? label} className={buttonClasses(onNavy ? "light" : "primary", "md")}>
        <PlayCircle aria-hidden className="size-4" />
        {label}
      </VideoModalButton>
    );
  }

  if (isConfiguredUrl(url)) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses(onNavy ? "light" : "primary", "md")}
      >
        <PlayCircle aria-hidden className="size-4" />
        {label}
        <ExternalLink aria-hidden className="size-3.5 opacity-70" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <button
        type="button"
        disabled
        aria-describedby={`${demoKey}-demo-status`}
        className={buttonClasses(
          "secondary",
          "md",
          `cursor-not-allowed border-dashed opacity-75 hover:border-line-strong ${onNavy ? "bg-transparent text-white border-white/30 hover:border-white/30" : ""}`,
        )}
      >
        <PlayCircle aria-hidden className="size-4" />
        {label}
      </button>
      <p
        id={`${demoKey}-demo-status`}
        className={`flex items-center gap-1.5 text-sm ${onNavy ? "text-on-navy-muted" : "text-muted"}`}
      >
        <Clock3 aria-hidden className="size-4" />
        Demo coming soon —{" "}
        <Link
          href="/contact/"
          className={`underline underline-offset-4 ${onNavy ? "text-white hover:text-[#8fb0ff]" : "text-blue hover:text-blue-700"}`}
        >
          request a walkthrough
        </Link>
      </p>
    </div>
  );
}
