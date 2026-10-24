import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light";
type Size = "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-[background-color,border-color,color,box-shadow] duration-(--dur-base) ease-(--ease-out) select-none";

const variants: Record<Variant, string> = {
  primary: "bg-blue text-white hover:bg-blue-700 shadow-[0_1px_0_rgb(16_29_54/0.08)]",
  secondary: "border border-line-strong bg-white text-navy hover:border-navy",
  ghost: "text-blue hover:text-blue-700 px-0",
  light: "bg-white text-navy hover:bg-blue-50",
  "outline-light": "border border-white/35 text-white hover:border-white hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${variant === "ghost" ? "h-11 text-sm" : sizes[size]} ${extra}`;
}

const isExternal = (href: string) => /^https?:\/\//.test(href);

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  arrow?: boolean;
}

/** Internal links use next/link; external links open safely in a new tab. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  arrow = false,
}: ButtonLinkProps) {
  const cls = buttonClasses(variant, size, className);
  const icon = arrow ? (
    isExternal(href) ? (
      <ArrowUpRight aria-hidden className="size-4 transition-transform duration-(--dur-base) group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
    ) : (
      <ArrowRight aria-hidden className="size-4 transition-transform duration-(--dur-base) group-hover/btn:translate-x-0.5" />
    )
  ) : null;

  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        {icon}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      {icon}
    </Link>
  );
}
