"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "../ui/Reveal";

const stages = [
  {
    title: "Discover",
    summary: "Understand the business problem, process, and existing tools.",
    details: ["Map the current process and where time is lost", "List the tools and data already in use", "Agree what a good outcome looks like"],
  },
  {
    title: "Design",
    summary: "Define the workflow, AI capabilities, integrations, and human checkpoints.",
    details: ["Draw the target workflow step by step", "Choose AI capabilities and integrations", "Place human review where judgement matters"],
  },
  {
    title: "Build",
    summary: "Implement and test the agreed solution.",
    details: ["Configure AI, rules and connections", "Test with realistic examples and edge cases", "Prepare your team for go-live"],
  },
  {
    title: "Optimize",
    summary: "Review exceptions, evaluate results, and improve the workflow.",
    details: ["Review exceptions and handoffs", "Compare results with the agreed outcome", "Refine prompts, rules and routing"],
  },
];

export function ApproachStages() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <ol className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
      {/* progress rail (desktop) */}
      <span aria-hidden className="absolute top-[27px] right-[calc(25%-28px)] left-[28px] hidden h-px bg-line-strong lg:block" />
      {stages.map((s, i) => {
        const expanded = open === i;
        const id = `stage-${i}`;
        return (
          <Reveal as="li" key={s.title} delay={i * 100} className="relative lg:pr-8">
            <span
              aria-hidden
              className={`relative z-10 grid size-14 place-items-center rounded-md border font-mono text-sm font-medium transition-colors duration-(--dur-base) ${
                expanded ? "border-blue bg-blue text-white" : "border-line-strong bg-white text-navy"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="mt-6 border-t border-line pt-5 lg:border-t-0 lg:pt-0">
              <h3 className="text-h3 text-navy">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.summary}</p>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={id}
                onClick={() => setOpen(expanded ? null : i)}
                className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-medium text-blue hover:text-blue-700"
              >
                <Plus aria-hidden className={`size-4 transition-transform duration-(--dur-base) ${expanded ? "rotate-45" : ""}`} />
                {expanded ? "Hide details" : "What happens"}
              </button>
              <div
                id={id}
                className={`grid transition-[grid-template-rows,opacity] duration-(--dur-base) ease-(--ease-out) ${expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                inert={!expanded}
              >
                <ul className="overflow-hidden">
                  {s.details.map((d) => (
                    <li key={d} className="flex gap-2.5 pt-2 text-[14px] text-ink first:pt-3">
                      <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-blue" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
