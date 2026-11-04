import { Check, MessageSquareText, Sparkles, Workflow } from "lucide-react";
import { consultationHref } from "@/config/site";
import { ButtonLink } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { Section, SectionHeader } from "../ui/Section";

/**
 * "How to start": three fixed-scope starting points, without prices.
 * Prices are quoted after the free check; keep this list honest about scope.
 */
const packages = [
  {
    icon: MessageSquareText,
    name: "Starter",
    title: "One workflow",
    text: "Automate the one task that costs you the most time, such as WhatsApp enquiries or missed calls.",
    includes: ["One channel and one workflow", "Answers written with you and approved by you", "Hand-over to your team for anything unusual", "Two weeks of tuning after go-live"],
    featured: false,
  },
  {
    icon: Sparkles,
    name: "Growth",
    title: "Posts + WhatsApp agent",
    text: "Your posts bring the enquiries and the WhatsApp agent answers them, run by one team.",
    includes: ["Monthly content calendar with your approval on every post", "WhatsApp AI agent for the enquiries those posts bring", "Leads saved in one sheet or CRM", "Monthly review of what brought customers"],
    featured: true,
  },
  {
    icon: Workflow,
    name: "Custom",
    title: "Connected automation",
    text: "Several workflows working together: calls, messages, documents and your existing systems.",
    includes: ["Discovery workshop and written workflow plan", "Integrations with your CRM, sheets or database", "Human checkpoints agreed before the build", "Ongoing support and improvements"],
    featured: false,
  },
];

const steps = ["Free 15-minute check", "Fixed scope and quote", "Build and test together", "Go live, then improve"];

export function StartPackages() {
  return (
    <Section id="how-to-start" tone="paper" labelledBy="start-title">
      <SectionHeader
        id="start-title"
        eyebrow="How to start"
        title="Start with one workflow. Add more when it works."
        intro="Three clear starting points. Every project gets a fixed scope and a written quote before any work begins."
      />

      <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal as="li" key={s} delay={i * 60} className="flex items-center gap-3 rounded-md border border-line bg-white px-4 py-3">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-blue text-[13px] font-semibold text-white">{i + 1}</span>
            <span className="text-[15px] font-medium text-navy">{s}</span>
          </Reveal>
        ))}
      </ol>

      <ul className="mt-8 grid gap-6 lg:grid-cols-3">
        {packages.map((p, i) => (
          <Reveal
            as="li"
            key={p.name}
            delay={i * 90}
            className={`flex flex-col rounded-lg border bg-white p-7 sm:p-8 ${p.featured ? "border-blue shadow-[0_18px_40px_-24px_rgb(36_85_214/0.45)]" : "border-line"}`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="grid size-11 place-items-center rounded-md bg-blue-50 text-blue">
                <p.icon aria-hidden className="size-5" />
              </span>
              {p.featured && (
                <span className="rounded-full bg-blue-50 px-3 py-1 text-[13px] font-semibold text-blue">Most businesses start here</span>
              )}
            </div>
            <p className="mt-6 font-mono text-[13px] uppercase tracking-wider text-muted">{p.name}</p>
            <h3 className="text-h3 mt-1 text-navy">{p.title}</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-muted">{p.text}</p>
            <ul className="mt-6 space-y-3 border-t border-line pt-6">
              {p.includes.map((t) => (
                <li key={t} className="flex gap-2.5 text-[15px] text-ink">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-blue" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <ButtonLink href={consultationHref} variant={p.featured ? "primary" : "secondary"} size="lg" className="w-full">
                Book Free Consultation
              </ButtonLink>
            </div>
          </Reveal>
        ))}
      </ul>

      <Reveal>
        <p className="mt-8 text-[15px] text-muted">
          Prices depend on your channels, message volume and integrations. You get a clear, itemised quote after the free check.
        </p>
      </Reveal>
    </Section>
  );
}
