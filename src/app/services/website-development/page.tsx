import { Accessibility, Gauge, MonitorSmartphone, Search } from "lucide-react";
import {
  CapabilityGrid,
  DemoSection,
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
import { BrowserMockups } from "@/components/visuals/ServiceVisuals";
import { serviceById } from "@/config/services";

const service = serviceById.website;
export const metadata = serviceMetadata(service);

const principles = [
  { icon: Gauge, title: "Fast by default", text: "Lean pages, optimised assets and static delivery where possible." },
  { icon: MonitorSmartphone, title: "Designed per device", text: "Each breakpoint is designed intentionally, not just shrunk." },
  { icon: Accessibility, title: "Accessible", text: "Semantic structure, keyboard support and readable contrast." },
  { icon: Search, title: "Search-ready", text: "Clean headings, metadata, sitemaps and descriptive content." },
];

export default function WebsiteDevelopmentPage() {
  return (
    <>
      <ServiceHero service={service} visual={<BrowserMockups />} />

      <CapabilityGrid service={service} title="What we design and build" tone="white" />

      <Section tone="navy" labelledBy="principles-title">
        <SectionHeader
          id="principles-title"
          onNavy
          eyebrow="Build quality"
          title="Built to perform, not just to look good."
        />
        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 80} className="border-t border-navy-line pt-6">
              <p.icon aria-hidden className="size-6 text-[#8fb0ff]" />
              <h3 className="mt-5 text-lg font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-on-navy-muted">{p.text}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <WorkflowSection
        service={service}
        title="From discovery to launch"
        intro="A predictable process with review points, so you always know what comes next."
      />

      <DemoSection
        service={service}
        intro="Completed projects will be showcased here with desktop and mobile previews once they are published."
        preview={<BrowserMockups placeholder />}
      />

      <UseCaseList service={service} />
      <FaqList items={service.faqs} tone="paper" />
      <RelatedServices current={service.id} />
      <CtaBand headline={service.ctaHeadline} primary={service.ctaButton} />
    </>
  );
}
