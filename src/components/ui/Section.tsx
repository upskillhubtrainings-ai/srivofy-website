import { Reveal } from "./Reveal";

type Tone = "white" | "paper" | "navy";

const tones: Record<Tone, string> = {
  white: "bg-white",
  paper: "bg-paper",
  navy: "on-navy bg-navy text-on-navy",
};

/** Full-width section band with consistent vertical rhythm. */
export function Section({
  children,
  tone = "white",
  id,
  className = "",
  labelledBy,
}: {
  children: React.ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative py-20 sm:py-24 lg:py-28 ${tones[tone]} ${className}`}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function Eyebrow({
  children,
  onNavy = false,
}: {
  children: React.ReactNode;
  onNavy?: boolean;
}) {
  return (
    <p className={`text-eyebrow flex items-center gap-2.5 ${onNavy ? "text-[#8fb0ff]" : "text-blue"}`}>
      <span aria-hidden className={`h-px w-6 ${onNavy ? "bg-[#8fb0ff]" : "bg-blue"}`} />
      {children}
    </p>
  );
}

/** Section heading: eyebrow, title and optional intro, left-aligned by default. */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  id,
  onNavy = false,
  align = "left",
  aside,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  id?: string;
  onNavy?: boolean;
  align?: "left" | "center";
  aside?: React.ReactNode;
}) {
  const centered = align === "center";
  return (
    <Reveal
      className={`flex flex-col gap-5 ${centered ? "mx-auto max-w-3xl items-center text-center" : ""} ${
        aside ? "lg:flex-row lg:items-end lg:justify-between lg:gap-12" : ""
      }`}
    >
      <div className={`flex flex-col gap-5 ${centered ? "items-center" : ""} ${aside ? "lg:max-w-2xl" : "max-w-3xl"}`}>
        <Eyebrow onNavy={onNavy}>{eyebrow}</Eyebrow>
        <h2 id={id} className={`text-h2 ${onNavy ? "text-white" : "text-navy"}`}>
          {title}
        </h2>
        {intro && (
          <p className={`text-lg leading-relaxed ${onNavy ? "text-on-navy-muted" : "text-muted"}`}>
            {intro}
          </p>
        )}
      </div>
      {aside}
    </Reveal>
  );
}
