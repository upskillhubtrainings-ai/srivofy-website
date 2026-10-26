import { CalendarClock, ClipboardList, Headphones, UserRoundCheck } from "lucide-react";
import {
  CapabilityGrid,
  DemoSection,
  PricingBox,
  RelatedServices,
  ServiceHero,
  serviceMetadata,
  UseCaseList,
  WorkflowSection,
} from "@/components/service/ServiceBlocks";
import { CtaBand } from "@/components/shared/CtaBand";
import { FaqList } from "@/components/shared/FaqList";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeader } from "@/components/ui/Section";
import { CallSummaryCard, VoiceConsole } from "@/components/visuals/ServiceVisuals";
import { serviceById } from "@/config/services";

const service = serviceById.voice;
export const metadata = serviceMetadata(service);

const offerings = [
  {
    icon: Headphones,
    title: "Virtual Receptionist",
    points: ["Greetings and initial call handling", "Approved business FAQs", "Caller information capture", "Call routing", "Human escalation"],
  },
  {
    icon: CalendarClock,
    title: "Appointment Intake",
    points: ["Collection of caller details", "Appointment preferences", "Request categorization", "Calendar integration when configured"],
  },
  {
    icon: ClipboardList,
    title: "Back-Office Support",
    points: ["Routine information collection", "Structured call summaries", "Request routing", "Follow-up workflow triggers"],
  },
];

const handoff = [
  { when: "The caller asks for a person", then: "Transfer to the configured number or team." },
  { when: "The request is urgent or sensitive", then: "Escalate immediately with the details collected so far." },
  { when: "The agent is unsure of an answer", then: "Say so honestly, capture the question and arrange a callback." },
  { when: "Outside business hours", then: "Take a message and create a follow-up for the next working day." },
];

export default function AiVoiceAgentsPage() {
  return (
    <>
      <ServiceHero service={service} visual={<CallSummaryCard />} />

      <Section labelledBy="offerings-title">
        <SectionHeader
          id="offerings-title"
          eyebrow="Offerings"
          title="Three ways to put a voice agent to work."
          intro="Start with the role that relieves the most pressure on your team, then extend."
        />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-3">
          {offerings.map((o, i) => (
            <Reveal as="li" key={o.title} delay={i * 100} className="flex flex-col bg-white p-7 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-md bg-blue-50 text-blue">
                  <o.icon aria-hidden className="size-6" />
                </span>
                <span className="font-mono text-sm text-muted">0{i + 1}</span>
              </div>
              <h3 className="text-h3 mt-8 text-navy">{o.title}</h3>
              <ul className="mt-5 space-y-2.5">
                {o.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-[15px] text-ink">
                    <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-blue" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </Section>

      <WorkflowSection
        service={service}
        tone="navy"
        title="What happens during a call"
        intro="Each call follows a defined path, ending with an action and a summary your team can use."
      />

      <CapabilityGrid service={service} title="Capabilities across every agent" tone="white" />

      <Section tone="paper" labelledBy="handoff-title">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeader
            id="handoff-title"
            eyebrow="Human handoff"
            title="People are always one step away."
            intro="You decide when a call should reach a person. These are typical rules we configure."
          />
          <div className="overflow-hidden rounded-lg border border-line bg-white">
            <div className="grid grid-cols-2 border-b border-line bg-paper px-5 py-3 font-mono text-[11px] tracking-wide text-muted uppercase">
              <span>When</span>
              <span>Then</span>
            </div>
            <ul>
              {handoff.map((h) => (
                <li key={h.when} className="grid grid-cols-1 gap-1 border-b border-line px-5 py-4 last:border-b-0 sm:grid-cols-2 sm:gap-6">
                  <span className="flex gap-2 text-[15px] font-medium text-navy">
                    <UserRoundCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-blue" />
                    {h.when}
                  </span>
                  <span className="text-[15px] text-muted">{h.then}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <DemoSection
        service={service}
        intro="A demonstration interface with an illustrative waveform, call status and sample transcript. It is not connected to a live phone line."
        preview={<VoiceConsole />}
      />

      <UseCaseList service={service} />
      <PricingBox service={service} />
      <FaqList items={service.faqs} tone="paper" />
      <RelatedServices current={service.id} />
      <CtaBand headline={service.ctaHeadline} primary={service.ctaButton} />
    </>
  );
}
