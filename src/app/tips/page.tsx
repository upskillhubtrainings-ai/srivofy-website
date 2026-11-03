import type { Metadata } from "next";
import { CtaBand } from "@/components/shared/CtaBand";
import { PageHero } from "@/components/shared/PageHero";
import { PlannerOffer } from "@/components/shared/PlannerOffer";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Free Automation Tips for Small Businesses",
  description:
    "Free, practical automation tips for small business owners: WhatsApp Business settings, faster replies and social media you can keep up with.",
  alternates: { canonical: "/tips/" },
};

/**
 * Free tips: one short article per Reel topic. Add the newest tip at the top
 * and give it a stable id so posts can link to /tips/#id.
 */
const tips = [
  {
    id: "quick-replies",
    date: "3 November 2026",
    title: "Stop typing the same answer 30 times a day",
    intro: "If customers keep asking the price, your timings or whether you're open on Sunday, save those answers once in WhatsApp Business.",
    steps: [
      "Open WhatsApp Business, then Business tools (or Settings → Business tools).",
      "Tap Quick replies, then the + button.",
      "Type your answer and give it a short shortcut, like /price or /timings.",
      "In any chat, type / and pick the answer to send it in one tap.",
    ],
    note: "Start with your five most common questions. Menu names can differ slightly between phones and app versions.",
  },
  {
    id: "away-message",
    date: "2 November 2026",
    title: "Customers message you at night? Turn on the Away Message",
    intro: "When an enquiry arrives after hours and gets no reply, the customer may ask someone else before morning. A free WhatsApp Business setting tells them you got their message and when you'll reply.",
    steps: [
      "Open WhatsApp Business, then Business tools → Away message.",
      "Turn on Send away message.",
      "Under Schedule, choose Outside of business hours.",
      "Write something like: \"Hi! We're closed right now. Share your name and what you need, and we'll reply by 10 AM.\"",
      "Keep the promise: replying to these messages is the first job each morning.",
    ],
    note: "Set your business hours in your WhatsApp Business profile so the schedule works correctly.",
  },
];

export default function TipsPage() {
  return (
    <>
      <PageHero
        eyebrow="Free tips"
        title="Practical automation tips for business owners."
        intro="Short, free fixes you can set up yourself today. Each tip is also a short video on our Instagram and YouTube."
      />
      {tips.map((t, i) => (
        <Section key={t.id} id={t.id} tone={i % 2 ? "paper" : "white"} labelledBy={`${t.id}-title`}>
          <article className="max-w-3xl">
            <p className="text-eyebrow text-blue">{t.date}</p>
            <h2 id={`${t.id}-title`} className="text-h2 mt-4 text-navy">{t.title}</h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ink">{t.intro}</p>
            <ol className="mt-6 list-decimal space-y-2 pl-6 text-[17px] leading-relaxed text-ink">
              {t.steps.map((s) => <li key={s}>{s}</li>)}
            </ol>
            <p className="mt-5 text-[15px] text-muted">{t.note}</p>
          </article>
        </Section>
      ))}
      <PlannerOffer />
      <CtaBand headline="Want this set up for you? Book a free 15-minute consultation." />
    </>
  );
}
