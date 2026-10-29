import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/shared/CtaBand";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeader } from "@/components/ui/Section";
import { WorkflowDiagram } from "@/components/visuals/WorkflowDiagram";
import { serviceHref, services } from "@/config/services";

export const metadata: Metadata = {
  title: "AI Automation Services for Business",
  description:
    "AI automation services from Srivofy, Hyderabad: AI voice agents, WhatsApp AI chatbots, social media automation, website development and AI document processing.",
  alternates: { canonical: "/services/" },
};

const combined = [
  { label: "Website lead form", detail: "A visitor submits an enquiry on your site." },
  { label: "WhatsApp follow-up", detail: "The assistant confirms details and qualifies the lead." },
  { label: "Voice reminder", detail: "A voice agent handles the confirmation call." },
  { label: "Common database", detail: "Every interaction lands in one structured record." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Five capabilities for practical business automation."
        intro="Each service solves a specific operational problem. Start with one, and connect more as your workflows grow."
      />

      <Section labelledBy="list-title">
        <h2 id="list-title" className="sr-only">All services</h2>
        <ol className="border-t border-line">
          {services.map((s, i) => (
            <Reveal as="li" key={s.id} delay={i * 60}>
              <Link
                href={serviceHref(s)}
                className="group grid gap-6 border-b border-line py-10 transition-colors hover:bg-paper/60 md:grid-cols-[5rem_1.1fr_1.4fr_auto] md:items-start md:gap-8 md:px-4"
              >
                <span className="font-mono text-sm text-blue">{s.number}</span>
                <div>
                  <div className="flex items-center gap-3">
                    <s.icon aria-hidden className="size-6 text-blue" />
                    <h3 className="text-h3 text-navy group-hover:text-blue">{s.name}</h3>
                  </div>
                  <p className="mt-3 text-[16px] leading-relaxed text-muted">{s.summary}</p>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {s.capabilities.slice(0, 5).map((c) => (
                    <li key={c.title} className="rounded-sm border border-line bg-white px-2.5 py-1 text-[13px] text-ink">
                      {c.title}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-2 text-[15px] font-medium text-blue">
                  Explore
                  <ArrowRight aria-hidden className="size-4 transition-transform duration-(--dur-base) group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section tone="paper" labelledBy="combined-title">
        <SectionHeader
          id="combined-title"
          eyebrow="Working together"
          title="Services that connect into one workflow."
          intro="An illustrative example of how several capabilities can share one customer journey and one source of data."
        />
        <div className="mt-14">
          <WorkflowDiagram steps={combined} columns={4} />
        </div>
      </Section>

      <CtaBand headline="Not sure where to start? We'll help you choose." secondary="See Our Approach" secondaryHref="/#approach" />
    </>
  );
}
