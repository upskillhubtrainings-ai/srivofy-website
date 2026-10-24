/**
 * Srivofy mark: the flowing "S" ribbon and data "pixels" from the original
 * logo, redrawn as a crisp geometric SVG in the site's navy and blue.
 * The original artwork is kept at /public/brand/srivofy-logo-original.webp.
 */
export function LogoMark({
  className = "size-8",
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="7" fill={inverted ? "#ffffff" : "#101d36"} />
      <path
        d="M20.6 10.1c-1.5-1.3-3.3-1.9-5.2-1.9-2.9 0-4.9 1.6-4.9 3.9 0 5.1 10.2 3.1 10.2 8.2 0 2.4-2.2 4-5.2 4-2.1 0-4-.7-5.5-2.1"
        fill="none"
        stroke={inverted ? "#101d36" : "#ffffff"}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <rect x="22.6" y="5.2" width="2.8" height="2.8" rx="0.6" fill="#2455d6" />
      <rect x="26.2" y="8.4" width="2.1" height="2.1" rx="0.5" fill="#5b82ea" />
      <rect x="23.4" y="9.6" width="1.7" height="1.7" rx="0.4" fill="#2455d6" />
    </svg>
  );
}

export function Logo({
  inverted = false,
  className = "",
}: {
  inverted?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark inverted={inverted} />
      <span
        className={`text-[1.3rem] leading-none font-semibold tracking-[-0.035em] ${inverted ? "text-white" : "text-navy"}`}
      >
        srivofy
      </span>
    </span>
  );
}
