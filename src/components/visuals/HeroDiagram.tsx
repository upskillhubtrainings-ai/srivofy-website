import { Database, LayoutGrid } from "lucide-react";
import { services } from "@/config/services";
import { LogoMark } from "../ui/Logo";

/** viewBox 600 × 480. Node positions are percentages of that box. */
const LEFT_X = 33; // right edge of service nodes (%)
const HUB = { x: 56, y: 50 };
const RIGHT_X = 77; // left edge of system nodes (%)
const serviceY = [12, 31, 50, 69, 88];
const systems = [
  { label: "Business Applications", short: "Business apps", icon: LayoutGrid, y: 36 },
  { label: "Databases", short: "Databases", icon: Database, y: 64 },
];

const px = (x: number) => (x / 100) * 600;
const py = (y: number) => (y / 100) * 480;

/**
 * Original enterprise diagram: five Srivofy capabilities feed one
 * automation layer that connects to business applications and databases.
 * Decorative — the same information is in the page text.
 */
export function HeroDiagram() {
  const hubL = px(HUB.x) - 46;
  const hubR = px(HUB.x) + 46;
  return (
    <figure className="relative" aria-label="Diagram: Srivofy services connected through one automation layer to business applications and databases">
      <div className="bg-blueprint relative aspect-[5/4] w-full overflow-hidden rounded-lg border border-line bg-white" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/40 to-white" />
        <svg viewBox="0 0 600 480" preserveAspectRatio="none" className="absolute inset-0 size-full">
          {serviceY.map((y, i) => {
            const d = `M${px(LEFT_X)} ${py(y)} C ${px(LEFT_X) + 50} ${py(y)}, ${hubL - 50} ${py(HUB.y)}, ${hubL} ${py(HUB.y)}`;
            return (
              <g key={i}>
                <path d={d} fill="none" stroke="#c5cbd5" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
                <path d={d} fill="none" stroke="#2455d6" strokeWidth="1.5" className="flow" style={{ animationDelay: `${-i * 0.4}s` }} vectorEffect="non-scaling-stroke" />
              </g>
            );
          })}
          {systems.map((s, i) => {
            const d = `M${hubR} ${py(HUB.y)} C ${hubR + 40} ${py(HUB.y)}, ${px(RIGHT_X) - 40} ${py(s.y)}, ${px(RIGHT_X)} ${py(s.y)}`;
            return (
              <g key={s.label}>
                <path d={d} fill="none" stroke="#c5cbd5" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
                <path d={d} fill="none" stroke="#2455d6" strokeWidth="1.5" className="flow" style={{ animationDelay: `${-i * 0.9 - 0.3}s` }} vectorEffect="non-scaling-stroke" />
              </g>
            );
          })}
        </svg>

        {/* Service nodes */}
        {services.map((s, i) => (
          <div
            key={s.id}
            className="absolute left-[3%] flex w-[30%] -translate-y-1/2 items-center gap-2 rounded-md border border-line bg-white px-2 py-2 shadow-[0_1px_2px_rgb(16_29_54/0.06)] sm:px-3"
            style={{ top: `${serviceY[i]}%` }}
          >
            <span className="hidden size-7 shrink-0 place-items-center rounded-sm bg-blue-50 text-blue min-[420px]:grid">
              <s.icon className="size-3.5 sm:size-4" />
            </span>
            <span className="truncate text-[10.5px] font-medium text-navy sm:text-[13px]">
              {s.shortName}
            </span>
          </div>
        ))}

        {/* Hub */}
        <div
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}
        >
          <div className="relative grid size-16 place-items-center rounded-lg bg-navy shadow-[0_12px_30px_-12px_rgb(16_29_54/0.6)] sm:size-[84px]">
            <span className="pulse-dot absolute inset-0 rounded-lg border border-blue/40" />
            <LogoMark inverted className="size-8 sm:size-10" />
          </div>
          <p className="mt-2 text-center font-mono text-[9.5px] leading-tight tracking-wider text-navy uppercase sm:text-[11px]">
            Automation
            <br />
            layer
          </p>
        </div>

        {/* System nodes */}
        {systems.map((s) => (
          <div
            key={s.label}
            className="absolute right-[3%] flex w-[21%] -translate-y-1/2 flex-col items-start gap-1.5 rounded-md border border-navy bg-navy px-2 py-2 text-white sm:px-3 sm:py-2.5"
            style={{ top: `${s.y}%` }}
          >
            <s.icon className="size-4 text-[#8fb0ff]" />
            <span className="text-[10.5px] leading-tight font-medium sm:text-[13px]">
              <span className="sm:hidden">{s.short}</span>
              <span className="hidden sm:inline">{s.label}</span>
            </span>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-[13px] text-muted">
        Illustrative architecture: each capability can run on its own or share one automation layer.
      </figcaption>
    </figure>
  );
}
