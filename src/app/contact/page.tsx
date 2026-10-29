import type { Metadata } from "next";
import { Globe, Mail, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { socialIconFor } from "@/components/layout/BrandIcons";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/ui/Section";
import { mailHref, siteConfig, socialProfiles, telHref, websiteLabel, whatsappHref } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Us: AI Automation Agency in Hyderabad",
  description: "Contact Srivofy, an AI automation agency in Hyderabad, to discuss AI voice agents, WhatsApp chatbots, document processing, social media automation and websites.",
  alternates: { canonical: "/contact/" },
};

const steps = [
  { title: "We read your message", text: "We review your challenge and the service you selected." },
  { title: "Discovery conversation", text: "A short call to understand your process, tools and goals." },
  { title: "Clear recommendation", text: "Where automation helps, what it involves and what to do first." },
];

export default function ContactPage() {
  const wa = whatsappHref();
  const row = "flex min-h-12 items-center gap-3 text-[16px] text-navy hover:text-blue";
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your workflows."
        intro="Request a consultation or ask a question. Tell us what slows your team down and we'll help you find the right place to start."
      />

      <Section tone="paper">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="flex flex-col gap-12">
            <div>
              <h2 className="text-eyebrow text-blue">Contact details</h2>
              <ul className="mt-4 border-t border-line">
                <li className="border-b border-line">
                  <a href={mailHref} className={row}><Mail aria-hidden className="size-5 text-blue" />{siteConfig.email}</a>
                </li>
                <li className="border-b border-line">
                  <a href={telHref} className={row}><Phone aria-hidden className="size-5 text-blue" />{siteConfig.phone}</a>
                </li>
                {wa && (
                  <li className="border-b border-line">
                    <a href={wa} target="_blank" rel="noopener noreferrer" className={row}>
                      <MessageCircle aria-hidden className="size-5 text-blue" />Chat on WhatsApp
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                )}
                <li className="border-b border-line">
                  <a href={siteConfig.website} className={row}><Globe aria-hidden className="size-5 text-blue" />{websiteLabel}</a>
                </li>
              </ul>
              <ul className="mt-6 flex gap-2" aria-label="Srivofy on social media">
                {socialProfiles.map(({ key, label, url }) => {
                  const Icon = socialIconFor[key];
                  return (
                    <li key={key}>
                      <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`Srivofy on ${label} (opens in a new tab)`}
                        className="grid size-11 place-items-center rounded-md border border-line bg-white text-navy hover:border-navy">
                        <Icon className="size-4" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <h2 className="text-eyebrow text-blue">What happens next</h2>
              <ol className="mt-5 space-y-6">
                {steps.map((s, i) => (
                  <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-3">
                    <span className="grid size-9 place-items-center rounded-md bg-navy font-mono text-[12px] text-white">0{i + 1}</span>
                    <div>
                      <p className="font-semibold text-navy">{s.title}</p>
                      <p className="mt-1 text-[15px] text-muted">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <ContactForm />
        </div>
      </Section>
    </>
  );
}
