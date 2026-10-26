import { BookOpenCheck, Database, FileSpreadsheet, Workflow } from "lucide-react";
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
import { ChatConversation, LeadSummary } from "@/components/visuals/ServiceVisuals";
import { serviceById } from "@/config/services";

const service = serviceById.whatsapp;
export const metadata = serviceMetadata(service);

const knowledge = [
  { title: "Services and pricing rules", text: "What you offer, how it is priced and what is included." },
  { title: "Policies", text: "Hours, locations, cancellations, delivery and payment terms." },
  { title: "Approved FAQs", text: "Answers your team has written or reviewed." },
  { title: "Escalation topics", text: "Subjects that always go straight to a person." },
];

const destinations = [
  { icon: Database, title: "CRM", text: "Create or update a contact and log the conversation." },
  { icon: FileSpreadsheet, title: "Spreadsheet or database", text: "Append a structured lead row for your team." },
  { icon: Workflow, title: "Team workflow", text: "Notify the right person and assign the next step." },
];

export default function WhatsAppAiAgentPage() {
  return (
    <>
      <ServiceHero service={service} visual={<LeadSummary />} />

      <WorkflowSection
        service={service}
        title="From incoming message to next action"
        intro="Every conversation follows a defined path that ends with a clear next step for your team."
      />

      <CapabilityGrid service={service} title="Everything a front-line chat assistant needs" />

      <Section labelledBy="knowledge-title">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeader
            id="knowledge-title"
            eyebrow="Approved knowledge"
            title="It answers from what you approve — nothing else."
            intro="The assistant is configured with your business information. When a question falls outside it, the conversation goes to your team."
          />
          <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {knowledge.map((k, i) => (
              <Reveal as="li" key={k.title} delay={i * 70} className="bg-white p-6">
                <BookOpenCheck aria-hidden className="size-5 text-blue" />
                <h3 className="mt-4 text-[16px] font-semibold text-navy">{k.title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{k.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <DemoSection
        service={service}
        intro="An example conversation and the lead summary it produces. This is a simulated conversation — no live WhatsApp account is connected."
        preview={<ChatConversation />}
      />

      <Section labelledBy="dest-title">
        <SectionHeader
          id="dest-title"
          eyebrow="Integrations"
          title="Where captured leads can go"
          intro="Possible destinations, configured and tested for each project — not pre-connected systems."
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {destinations.map((d, i) => (
            <Reveal as="li" key={d.title} delay={i * 90} className="border-t-2 border-navy pt-6">
              <d.icon aria-hidden className="size-6 text-blue" />
              <h3 className="text-h3 mt-5 text-navy">{d.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{d.text}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <UseCaseList service={service} />
      <PricingBox service={service} />
      <FaqList items={service.faqs} tone="paper" />
      <RelatedServices current={service.id} />
      <CtaBand headline={service.ctaHeadline} primary={service.ctaButton} />
    </>
  );
}
