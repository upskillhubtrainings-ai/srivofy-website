import { Check } from "lucide-react";
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
import { ContentCalendar, ContentPipeline, SampleTag } from "@/components/visuals/ServiceVisuals";
import { serviceById } from "@/config/services";

const service = serviceById.social;
export const metadata = serviceMetadata(service);

const adaptations = [
  { platform: "LinkedIn", length: "Long-form", text: "Response time is often the first thing customers notice. Here are three practical ways small teams can reply faster without adding headcount…" },
  { platform: "Instagram", length: "Short + hashtags", text: "3 ways to reply faster. Swipe for the workflow → #smallbusiness #automation" },
  { platform: "Facebook", length: "Conversational", text: "Ever missed a customer message on a busy day? We put together three simple ideas to help — which one would you try first?" },
];

const controls = [
  "Every draft passes the review step you define before scheduling",
  "Reviewers can edit, approve or send back with comments",
  "Brand guidelines and banned phrases are part of the setup",
  "Publishing only through tools and accounts you connect",
];

export default function SocialMediaAutopilotPage() {
  return (
    <>
      <ServiceHero service={service} visual={<ContentPipeline />} />

      <CapabilityGrid service={service} title="AI-assisted content operations" />

      <WorkflowSection
        service={service}
        title="From brief to published post"
        intro="A draft moves through clear stages, and nothing reaches your audience without passing review."
      />

      <Section tone="paper" labelledBy="adapt-title">
        <SectionHeader
          id="adapt-title"
          eyebrow="Platform adaptation"
          title="One idea, adapted for each platform."
          intro="The same message is reshaped for each channel's format and audience — then reviewed by your team."
          aside={<SampleTag />}
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {adaptations.map((a, i) => (
            <Reveal as="li" key={a.platform} delay={i * 90} className="flex flex-col rounded-lg border border-line bg-white p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-[17px] font-semibold text-navy">{a.platform}</h3>
                <span className="font-mono text-[11px] tracking-wide text-muted uppercase">{a.length}</span>
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-ink">{a.text}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section labelledBy="control-title">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <SectionHeader
            id="control-title"
            eyebrow="Review and approval"
            title="Your team stays in control."
            intro="Automation drafts and organises. People decide what gets published."
          />
          <ul className="border-t border-line">
            {controls.map((c) => (
              <li key={c} className="flex gap-3 border-b border-line py-4 text-[16px] text-ink">
                <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-blue" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <DemoSection
        service={service}
        intro="An illustrative content calendar showing posts at each stage of the workflow."
        preview={<ContentCalendar />}
      />

      <UseCaseList service={service} />
      <PricingBox service={service} />
      <FaqList items={service.faqs} tone="paper" />
      <RelatedServices current={service.id} />
      <CtaBand headline={service.ctaHeadline} primary={service.ctaButton} />
    </>
  );
}
