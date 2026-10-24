import { Reveal } from "../ui/Reveal";

/**
 * Numbered step diagram. Horizontal with connectors on wide screens,
 * vertical timeline on small screens. Used by every service page with
 * that service's own steps.
 */
export function WorkflowDiagram({
  steps,
  onNavy = false,
  columns = 5,
}: {
  steps: { label: string; detail: string }[];
  onNavy?: boolean;
  /** Steps per row on desktop (long workflows wrap into rows). */
  columns?: 4 | 5;
}) {
  const grid = { 4: "lg:grid-cols-4", 5: "lg:grid-cols-5" }[columns];
  return (
    <ol className={`relative grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-x-8 md:gap-y-10 ${grid} lg:gap-x-0`}>
      {steps.map((step, i) => {
        const rowEnd = (i + 1) % columns === 0;
        return (
        <Reveal
          as="li"
          key={step.label}
          delay={i * 80}
          className="group relative flex gap-5 pb-8 last:pb-0 md:block md:pb-0 lg:pr-6"
        >
          {/* connector */}
          <span
            aria-hidden
            className={`absolute top-10 bottom-0 left-[19px] w-px md:hidden ${onNavy ? "bg-navy-line" : "bg-line-strong"} group-last:hidden`}
          />
          <span
            aria-hidden
            className={`absolute top-[19px] right-0 left-12 hidden h-px ${rowEnd ? "" : "lg:block"} ${onNavy ? "bg-navy-line" : "bg-line-strong"} group-last:hidden`}
          >
            <span className={`absolute -top-[3px] -right-px size-[7px] rotate-45 border-t border-r ${onNavy ? "border-on-navy-muted" : "border-line-strong"}`} />
          </span>

          <span
            className={`relative z-10 grid size-10 shrink-0 place-items-center rounded-md font-mono text-[13px] font-medium ${
              onNavy ? "bg-white/10 text-white ring-1 ring-white/20" : "bg-blue text-white"
            }`}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="md:mt-5">
            <h3 className={`text-[17px] font-semibold tracking-tight ${onNavy ? "text-white" : "text-navy"}`}>
              {step.label}
            </h3>
            <p className={`mt-1.5 text-[15px] leading-relaxed ${onNavy ? "text-on-navy-muted" : "text-muted"}`}>
              {step.detail}
            </p>
          </div>
        </Reveal>
        );
      })}
    </ol>
  );
}
