"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { Section, SectionHeader } from "../ui/Section";

/** Accessible FAQ accordion (one open at a time). */
export function FaqList({
  items,
  title = "Frequently asked questions",
  tone = "white",
}: {
  items: { q: string; a: string }[];
  title?: string;
  tone?: "white" | "paper";
}) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <Section tone={tone} labelledBy={`${base}-title`}>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeader id={`${base}-title`} eyebrow="FAQ" title={title} />
        <ul className="border-t border-line">
          {items.map((f, i) => {
            const expanded = open === i;
            const btn = `${base}-q${i}`;
            const panel = `${base}-a${i}`;
            return (
              <li key={f.q} className="border-b border-line">
                <h3>
                  <button
                    id={btn}
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={panel}
                    onClick={() => setOpen(expanded ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left text-[17px] font-medium text-navy transition-colors hover:text-blue"
                  >
                    {f.q}
                    <Plus aria-hidden className={`size-5 shrink-0 text-blue transition-transform duration-(--dur-base) ${expanded ? "rotate-45" : ""}`} />
                  </button>
                </h3>
                <div
                  id={panel}
                  role="region"
                  aria-labelledby={btn}
                  className={`grid transition-[grid-template-rows,opacity] duration-(--dur-base) ease-(--ease-out) ${expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  inert={!expanded}
                >
                  <p className="overflow-hidden pr-10 text-[15px] leading-relaxed text-muted">
                    <span className="block pb-5">{f.a}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
