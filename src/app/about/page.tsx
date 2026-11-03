import type { Metadata } from "next";
import Image from "next/image";
import { Compass, Link2, PenTool, UserCheck } from "lucide-react";
import { ApproachStages } from "@/components/home/ApproachStages";
import { CtaBand } from "@/components/shared/CtaBand";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeader } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "About Us: AI Automation Agency in Hyderabad",
  description:
    "Srivofy is an AI automation agency in Hyderabad, India, building practical AI for businesses: voice agents, WhatsApp chatbots, workflows and websites.",
  alternates: { canonical: "/about/" },
};

const principles = [
  { icon: Compass, title: "Start with the problem", text: "We begin with the process that costs you time or customers — not with a tool looking for a use." },
  { icon: PenTool, title: "Design the workflow", text: "Every automation is drawn step by step, with clear inputs, decisions and outcomes, before it is built." },
  { icon: Link2, title: "Connect your systems", text: "Automation is most useful when it works with the tools and data you already rely on." },
  { icon: UserCheck, title: "Keep people in control", text: "Human review, escalation and clear rules are part of the design, not an afterthought." },
];

const commitments = [
  "We explain what AI will and will not do in your workflow.",
  "We label demonstrations as demonstrations.",
  "We agree data handling before anything goes live.",
  "We measure results against goals agreed at the start.",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Srivofy"
        title="Practical AI. Thoughtful automation. Better workflows."
        intro="Srivofy is an AI automation agency. We help businesses identify where automation genuinely helps, design workflows around their people and systems, and build solutions that stay understandable and controllable."
      />

      <Section labelledBy="founder-title">
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal className="mx-auto w-full max-w-sm">
            <div className="relative rounded-lg border border-line bg-paper px-8 pt-10">
              <Image
                src="/brand/founder-cartoon.webp"
                alt="Illustration of Srikanth, founder of Srivofy"
                width={520}
                height={780}
                className="mx-auto h-auto w-full max-w-[300px]"
              />
            </div>
          </Reveal>
          <div>
            <SectionHeader id="founder-title" eyebrow="Meet the founder" title="Srikanth, Founder of Srivofy" />
            <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-ink">
              <p>
                For 18 years I worked in IT as a Business Analyst and Project Manager. My job was understanding how a
                business really works, finding where things break, and making sure the right system got built.
              </p>
              <p>
                With AI, there is now real scope to automate the repetitive work that slows small and medium businesses
                down: missed enquiries, slow replies, the same questions every day, no time for content.
              </p>
              <p>
                I started Srivofy in 2025 to help business owners, in India and worldwide, put that automation in place
                the practical way: start with the real problem, map the workflow before building, and keep a person in
                charge of the steps that matter.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="paper" labelledBy="principles-title">
        <SectionHeader id="principles-title" eyebrow="How we work" title="Four principles behind every project." />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 2) * 90} className="bg-white p-7 sm:p-9">
              <div className="flex items-center justify-between">
                <p.icon aria-hidden className="size-6 text-blue" />
                <span className="font-mono text-sm text-muted">0{i + 1}</span>
              </div>
              <h3 className="text-h3 mt-8 text-navy">{p.title}</h3>
              <p className="mt-2 text-[16px] leading-relaxed text-muted">{p.text}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section labelledBy="method-title">
        <SectionHeader id="method-title" eyebrow="Our approach" title="From discovery to continuous improvement." />
        <div className="mt-14">
          <ApproachStages />
        </div>
      </Section>

      <Section tone="navy" labelledBy="commit-title">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeader id="commit-title" onNavy eyebrow="Our commitments" title="Honest about AI, from the first conversation." />
          <ul className="border-t border-navy-line">
            {commitments.map((c) => (
              <li key={c} className="border-b border-navy-line py-5 text-[17px] text-white">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand headline="Let's talk about the workflows that slow your team down." />
    </>
  );
}
