import { CalendarDays } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { Section, SectionHeader } from "../ui/Section";
import { PlannerButton } from "./PlannerForm";

const inside = [
  "A Monday-to-Sunday planner: 3 posts a week is enough",
  "The weekly mix: one tip, one behind-the-scenes, one offer",
  "20 post ideas for clinics, salons, shops and service businesses",
  "The 1-hour planning routine we use ourselves",
];

/** Free Weekly Content Planner (lead magnet): a short form collects name and WhatsApp, then the PDF downloads. */
export function PlannerOffer({ tone = "paper" }: { tone?: "white" | "paper" }) {
  return (
    <Section id="free-planner" tone={tone} labelledBy="planner-title">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
        <div>
          <SectionHeader
            id="planner-title"
            eyebrow="Free download"
            title="Plan a week of posts in one hour."
            intro="Our free Weekly Content Planner: a simple 2-page PDF for business owners who want to post consistently without spending all week on it."
          />
          <div className="mt-8">
            <PlannerButton />
          </div>
        </div>
        <Reveal><ul className="rounded-lg border border-line bg-white p-7 sm:p-8">
          <li className="mb-4 flex items-center gap-3 text-[17px] font-semibold text-navy">
            <CalendarDays aria-hidden className="size-6 text-blue" /> What&apos;s inside
          </li>
          {inside.map((t) => (
            <li key={t} className="border-t border-line py-3.5 text-[16px] text-ink">{t}</li>
          ))}
        </ul></Reveal>
      </div>
    </Section>
  );
}
