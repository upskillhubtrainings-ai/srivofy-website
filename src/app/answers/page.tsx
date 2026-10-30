import type { Metadata } from "next";
import Link from "next/link";
import { faqSchema, JsonLd } from "@/components/seo/JsonLd";
import { LegalDocument, type LegalSection } from "@/components/shared/LegalDocument";
import { answersUpdated, answerTopics } from "@/config/answers";
import { serviceHref, services } from "@/config/services";

/*
 * Answer page for search and AI answer engines (AEO / GEO). Deliberately not
 * linked from the menu or footer; it is reached through the sitemap,
 * /llms.txt and search results. See src/config/answers.ts.
 */
export const metadata: Metadata = {
  title: "AI Automation FAQ: Voice Agents, WhatsApp Chatbots & More",
  description:
    "Clear answers about Srivofy, an AI automation agency in Hyderabad, and about AI voice agents, WhatsApp AI chatbots, social media automation and AI document processing.",
  alternates: { canonical: "/answers/" },
};

const sections: LegalSection[] = [
  ...answerTopics.map((t) => ({
    heading: t.heading,
    body: (
      <dl className="space-y-6">
        {t.items.map((f) => (
          <div key={f.q}>
            <dt>
              <h3 className="text-[17px] font-semibold text-navy">{f.q}</h3>
            </dt>
            <dd className="mt-2">{f.a}</dd>
          </div>
        ))}
      </dl>
    ),
  })),
  {
    heading: "Service details",
    body: (
      <ul>
        {services.map((s) => (
          <li key={s.id}>
            <Link href={serviceHref(s)}>{s.name}</Link> — {s.summary}
          </li>
        ))}
      </ul>
    ),
  },
];

export default function AnswersPage() {
  return (
    <>
      <LegalDocument
        eyebrow="FAQ"
        title="AI automation, answered"
        intro="Straight answers about Srivofy and the AI automation services we build."
        updated={answersUpdated}
        sections={sections}
      />
      <JsonLd data={faqSchema("/answers/", answerTopics.flatMap((t) => t.items))} />
    </>
  );
}
