import Link from "next/link";
import {
  ArrowRight,
  Database,
  FileImage,
  Gauge,
  Globe2,
  MessageSquareText,
  Network,
  PhoneIncoming,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ApproachStages } from "@/components/home/ApproachStages";
import { ArchitectureExplorer } from "@/components/home/ArchitectureExplorer";
import { ServicesEditorial } from "@/components/home/ServicesEditorial";
import { CtaBand } from "@/components/shared/CtaBand";
import { ButtonLink } from "@/components/ui/Button";
import { PauseOffscreen, Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Section, SectionHeader } from "@/components/ui/Section";
import { HeroDiagram } from "@/components/visuals/HeroDiagram";
import { serviceById, serviceHref } from "@/config/services";
import { consultationHref } from "@/config/site";

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as React.CSSProperties;

const pillars = [
  { icon: Gauge, title: "Efficiency", text: "Reduce repetitive manual steps so your team spends time on work that needs people." },
  { icon: Network, title: "Connectivity", text: "Link customer interactions with the business workflows and systems behind them." },
  { icon: ShieldCheck, title: "Control", text: "Build in validation, clear rules and human review, so automation stays accountable." },
];

const useCases = [
  { icon: PhoneIncoming, title: "Incoming customer calls", text: "Answer, capture details and route calls that would otherwise be missed.", service: "voice" },
  { icon: MessageSquareText, title: "WhatsApp enquiries", text: "Reply to common questions and turn conversations into qualified leads.", service: "whatsapp" },
  { icon: Sparkles, title: "Social media content workflows", text: "Move posts from idea to approved and scheduled on one clear track.", service: "social" },
  { icon: FileImage, title: "PDF and image invoice processing", text: "Extract invoice fields from files and photos, then validate them.", service: "documents" },
  { icon: Database, title: "Database record creation", text: "Create structured records automatically instead of retyping them.", service: "documents" },
  { icon: Globe2, title: "Website lead capture", text: "Capture enquiries on your site and route them to the right person.", service: "website" },
] as const;

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-line bg-white">
        <div className="container-page grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:py-24">
          <div>
            <div className="enter" style={delay(0)}>
              <Eyebrow>AI automation for business</Eyebrow>
            </div>
            <h1 id="hero-title" className="text-display enter mt-6 text-navy" style={delay(80)}>
              Move from manual work to intelligent workflows.
            </h1>
            <p className="enter mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl" style={delay(180)}>
              Srivofy helps businesses automate customer conversations, streamline operations,
              process documents, and build better digital experiences.
            </p>
            <div className="enter mt-9 flex flex-col gap-3 sm:flex-row" style={delay(280)}>
              <ButtonLink href="/services/" size="lg" arrow>
                Explore Our Solutions
              </ButtonLink>
              <ButtonLink href={consultationHref} variant="secondary" size="lg">
                Request a Consultation
              </ButtonLink>
            </div>
          </div>
          <PauseOffscreen>
            <div style={delay(200)} className="enter">
              <HeroDiagram />
            </div>
          </PauseOffscreen>
        </div>
      </section>

      {/* Business value */}
      <Section labelledBy="value-title">
        <SectionHeader
          id="value-title"
          eyebrow="Why automation"
          title="Practical AI. Measurable business value."
          intro="We focus on automation you can explain, measure and control — not technology for its own sake."
        />
        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {pillars.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 100} className="border-t-2 border-navy pt-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-muted">0{i + 1}</span>
                <p.icon aria-hidden className="size-6 text-blue" />
              </div>
              <h3 className="text-h3 mt-8 text-navy">{p.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-muted">{p.text}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Services */}
      <Section tone="paper" id="services" labelledBy="services-title">
        <SectionHeader
          id="services-title"
          eyebrow="Capabilities"
          title="Five capabilities. One connected approach."
          intro="Each capability solves a specific problem on its own — and they share one automation approach when you need them to work together."
          aside={
            <Link href="/services/" className="group inline-flex min-h-11 shrink-0 items-center gap-2 text-[15px] font-medium text-blue hover:text-blue-700">
              View all services
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          }
        />
        <div className="mt-14">
          <ServicesEditorial />
        </div>
      </Section>

      {/* Approach */}
      <Section id="approach" labelledBy="approach-title">
        <SectionHeader
          id="approach-title"
          eyebrow="Our approach"
          title="A clear method, from problem to working workflow."
          intro="Every engagement follows four stages, with decisions and human checkpoints agreed before anything is built."
        />
        <div className="mt-16">
          <ApproachStages />
        </div>
      </Section>

      {/* Interactive architecture */}
      <Section tone="navy" labelledBy="arch-title">
        <SectionHeader
          id="arch-title"
          onNavy
          eyebrow="Automation architecture"
          title="How inputs become business outcomes."
          intro="Choose a service to see its route from input, through AI understanding and workflow processing, to your business systems."
        />
        <div className="mt-12">
          <ArchitectureExplorer />
        </div>
      </Section>

      {/* Use cases */}
      <Section labelledBy="usecases-title">
        <SectionHeader
          id="usecases-title"
          eyebrow="Use cases"
          title="Where automation typically helps."
          intro="Illustrative examples of common workflows — not completed client projects."
        />
        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((u, i) => {
            const s = serviceById[u.service];
            return (
              <Reveal as="li" key={u.title} delay={(i % 3) * 80} className="bg-white">
                <Link href={serviceHref(s)} className="group flex h-full flex-col p-7 transition-colors hover:bg-paper">
                  <u.icon aria-hidden className="size-6 text-blue" />
                  <h3 className="mt-6 text-lg font-semibold tracking-tight text-navy">{u.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{u.text}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-blue">
                    {s.name}
                    <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      <CtaBand headline="Let's find the right automation opportunities for your business." />
    </>
  );
}
