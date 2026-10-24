import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import { serviceHref, services, type Service } from "@/config/services";
import { consultationHref } from "@/config/site";
import { ButtonLink } from "../ui/Button";
import { DemoLink } from "../ui/DemoLink";
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

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-muted">
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight aria-hidden className="size-3.5" />}
            {it.href ? (
              <Link href={it.href} className="hover:text-navy">{it.label}</Link>
            ) : (
              <span aria-current="page" className="text-navy">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Service page hero: text left, the service's own visual right. */
export function ServiceHero({ service, visual }: { service: Service; visual: React.ReactNode }) {
  return (
    <section aria-labelledby="service-title" className="border-b border-line bg-white">
      <div className="container-page pt-8 pb-16 sm:pb-20 lg:pb-24">
        <div className="enter" style={delay(0)}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services/" }, { label: service.name }]} />
        </div>
        <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
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
              <ButtonLink href="#demo" variant="secondary" size="lg">
                See the demo
              </ButtonLink>
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

/** Dedicated demo area: preview visual + external demo button from config. */
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
          <DemoLink demoKey={service.demo.key} label={service.demo.button} />
        </div>
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
