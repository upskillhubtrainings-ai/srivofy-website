import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import type { Metadata } from "next";
import { serviceHref, services, type Service } from "@/config/services";
import { consultationHref, isConfiguredUrl, isSitePath, siteConfig, youtubeId } from "@/config/site";
import { buttonClasses, ButtonLink } from "../ui/Button";
import { DemoLink } from "../ui/DemoLink";
import { VideoModalButton } from "../ui/VideoModalButton";
import { PauseOffscreen, Reveal } from "../ui/Reveal";
import { Eyebrow, Section, SectionHeader } from "../ui/Section";
import { WorkflowDiagram } from "../visuals/WorkflowDiagram";

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as React.CSSProperties;

export function serviceMetadata(s: Service): Metadata {
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: serviceHref(s) },
    openGraph: { title: `${s.metaTitle} | Srivofy`, description: s.metaDescription, url: serviceHref(s) },
  };
}

/** Service page hero: text left, the service's own visual right. */
export function ServiceHero({ service, visual }: { service: Service; visual: React.ReactNode }) {
  // A YouTube demo plays in a popup; another demo link opens in a new tab;
  // with no link the button scrolls to the demo section.
  const demoUrl = siteConfig.demoLinks[service.demo.key];
  const hasDemo = isConfiguredUrl(demoUrl);
  const onSite = isSitePath(demoUrl); // e.g. the Contact form
  const videoId = youtubeId(demoUrl);
  return (
    <section aria-labelledby="service-title" className="border-b border-line bg-white">
      <div className="container-page pt-14 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <div className="enter flex items-center gap-3" style={delay(60)}>
              <span className="grid size-11 place-items-center rounded-md bg-blue-50 text-blue">
                <service.icon aria-hidden className="size-5" />
              </span>
              <Eyebrow>Service {service.number} · {service.name}</Eyebrow>
            </div>
            <h1 id="service-title" className="text-display enter mt-7 text-navy" style={delay(120)}>
              {service.headline}
            </h1>
            <p className="enter mt-6 max-w-xl text-lg leading-relaxed text-muted" style={delay(220)}>
              {service.intro}
            </p>
            <div className="enter mt-9 flex flex-col gap-3 sm:flex-row" style={delay(300)}>
              <ButtonLink href={consultationHref} size="lg" arrow>
                Request a Consultation
              </ButtonLink>
              {videoId ? (
                <VideoModalButton url={demoUrl} videoId={videoId} title={service.demo.label} className={buttonClasses("secondary", "lg")}>
                  <PlayCircle aria-hidden className="size-[18px]" />
                  Watch Demo
                </VideoModalButton>
              ) : (
                <ButtonLink
                  href={hasDemo || onSite ? demoUrl : "#demo"}
                  variant="secondary"
                  size="lg"
                  arrow={hasDemo || onSite}
                >
                  {onSite ? "Request a Demo" : hasDemo ? "Watch Demo" : "See the demo"}
                </ButtonLink>
              )}
            </div>
          </div>
          <PauseOffscreen>
            <div style={delay(200)} className="enter">{visual}</div>
          </PauseOffscreen>
        </div>
      </div>
    </section>
  );
}

/** Numbered capability list in a ruled editorial grid. */
export function CapabilityGrid({
  service,
  title = "What it can do",
  intro,
  tone = "paper",
}: {
  service: Service;
  title?: string;
  intro?: string;
  tone?: "white" | "paper";
}) {
  return (
    <Section tone={tone} labelledBy="capabilities-title">
      <SectionHeader id="capabilities-title" eyebrow="Capabilities" title={title} intro={intro} />
      <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {service.capabilities.map((c, i) => (
          <Reveal as="li" key={c.title} delay={(i % 3) * 70} className="bg-white p-6 sm:p-7">
            <p className="font-mono text-[13px] text-blue">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-4 text-[17px] font-semibold tracking-tight text-navy">{c.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{c.description}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

export function WorkflowSection({
  service,
  title,
  intro,
  columns = 5,
  tone = "white",
}: {
  service: Service;
  title: string;
  intro?: string;
  columns?: 4 | 5;
  tone?: "white" | "paper" | "navy";
}) {
  return (
    <Section tone={tone} labelledBy="workflow-title">
      <SectionHeader id="workflow-title" eyebrow="Workflow" title={title} intro={intro} onNavy={tone === "navy"} />
      <div className="mt-14">
        <WorkflowDiagram steps={service.workflow} columns={columns} onNavy={tone === "navy"} />
      </div>
    </Section>
  );
}

/**
 * Dedicated demo area: illustrative preview + the demo button. The button
 * opens the service's link from siteConfig.demoLinks in a new tab, or shows
 * "Demo coming soon" when no link is set.
 */
export function DemoSection({
  service,
  preview,
  title,
  intro,
  extra,
}: {
  service: Service;
  preview: React.ReactNode;
  title?: string;
  intro?: string;
  extra?: React.ReactNode;
}) {
  return (
    <section id="demo" aria-labelledby="demo-title" className="scroll-mt-24 border-y border-line bg-paper py-20 sm:py-24">
      <div className="container-page">
        <SectionHeader
          id="demo-title"
          eyebrow="Demo"
          title={title ?? service.demo.label}
          intro={intro}
        />
        <PauseOffscreen className="mt-12">{preview}</PauseOffscreen>
        {extra}
        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-xl text-[14px] text-muted">{service.demo.note}</p>
          <DemoLink demoKey={service.demo.key} label={service.demo.button} title={service.demo.label} />
        </div>
      </div>
    </section>
  );
}

/** Contact page with this service pre-selected in the form. */
export const contactForService = (s: Service) => `/contact/?service=${encodeURIComponent(s.name)}`;

/**
 * Pricing box. Pricing is quoted per project, so the whole card links to the
 * Contact form with this service already selected.
 */
export function PricingBox({ service }: { service: Service }) {
  return (
    <section aria-labelledby="pricing-title" className="bg-white py-16 sm:py-20">
      <div className="container-page">
        <Reveal>
          <Link
            href={contactForService(service)}
            className="group grid gap-8 rounded-lg border border-line bg-paper p-7 transition-[border-color,box-shadow] duration-(--dur-base) hover:border-blue hover:shadow-[0_18px_40px_-24px_rgb(36_85_214/0.45)] sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-14"
          >
            <div>
              <Eyebrow>Pricing</Eyebrow>
              <h2 id="pricing-title" className="text-h2 mt-5 text-navy">
                Pricing tailored to your business
              </h2>
              <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-muted">
                {service.name} is scoped to your needs — volume, integrations and the level of support
                you want. Tell us what you need and we&apos;ll send you a clear, no-obligation quote.
              </p>
            </div>
            <div className="flex flex-col gap-4 lg:items-end">
              <ul className="space-y-2 text-[15px] text-ink">
                {["Clear, itemised quote", "No hidden charges", "Plans that grow with you"].map((t) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <span aria-hidden className="size-1.5 rounded-full bg-blue" />
                    {t}
                  </li>
                ))}
              </ul>
              <span className={buttonClasses("primary", "lg", "w-full sm:w-auto")}>
                Get Pricing
                <ArrowRight aria-hidden className="size-4 transition-transform duration-(--dur-base) group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function UseCaseList({ service }: { service: Service }) {
  return (
    <Section labelledBy="usecases-title">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <SectionHeader
          id="usecases-title"
          eyebrow="Use cases"
          title="Where it fits"
          intro="Illustrative situations where this service is commonly useful. We confirm the fit for your business during discovery."
        />
        <ol className="border-t border-line">
          {service.useCases.map((u, i) => (
            <Reveal as="li" key={u.title} delay={i * 80} className="grid grid-cols-[3rem_1fr] gap-2 border-b border-line py-6">
              <span className="font-mono text-sm text-blue">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-navy">{u.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{u.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}

export function RelatedServices({ current }: { current: Service["id"] }) {
  return (
    <Section tone="paper" labelledBy="related-title">
      <SectionHeader id="related-title" eyebrow="Related" title="Other Srivofy services" />
      <ul className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {services
          .filter((s) => s.id !== current)
          .map((s) => (
            <li key={s.id} className="bg-white">
              <Link href={serviceHref(s)} className="group flex h-full flex-col p-6 transition-colors hover:bg-blue-50/50">
                <s.icon aria-hidden className="size-5 text-blue" />
                <h3 className="mt-5 text-[16px] font-semibold text-navy">{s.name}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{s.summary}</p>
                <ArrowRight aria-hidden className="mt-5 size-4 text-blue transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
      </ul>
    </Section>
  );
}
