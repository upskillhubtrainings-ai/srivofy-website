import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument, type LegalSection } from "@/components/shared/LegalDocument";
import { legalConfig } from "@/config/legal";
import { mailHref, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms that apply when you use srivofy.com and enquire about Srivofy's AI automation services.",
  alternates: { canonical: "/terms-and-conditions/" },
};

const { businessName } = legalConfig;
const email = <a href={mailHref}>{siteConfig.email}</a>;

const sections: LegalSection[] = [
  {
    heading: "About these terms",
    body: (
      <p>
        These terms apply to your use of srivofy.com, operated by {businessName} (&ldquo;we&rdquo;,
        &ldquo;us&rdquo;, &ldquo;our&rdquo;). By using this website you agree to them. If you do not
        agree, please do not use the website.
      </p>
    ),
  },
  {
    heading: "Information on this website",
    body: (
      <>
        <p>
          The content on this website is for general information about our services. We try to keep
          it accurate and up to date, but it does not form a contract or a binding offer, and we may
          change it at any time.
        </p>
        <p>
          Demonstrations, sample conversations, diagrams and other visuals are illustrative. They
          show how our solutions can work and do not guarantee specific results for your business.
        </p>
      </>
    ),
  },
  {
    heading: "Our services, quotes and pricing",
    body: (
      <p>
        Pricing is provided on request and depends on the scope of each project. Any services we
        provide are governed by a separate written proposal or agreement, which sets out the scope,
        fees, timelines and responsibilities. If that agreement conflicts with these terms, the
        agreement applies.
      </p>
    ),
  },
  {
    heading: "Using this website",
    body: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>use the website for anything unlawful, misleading or harmful;</li>
          <li>send spam or false information through the contact form;</li>
          <li>try to interfere with, damage or gain unauthorised access to the website; or</li>
          <li>copy or scrape content from the website for commercial use without our permission.</li>
        </ul>
      </>
    ),
  },
  {
    heading: "Intellectual property",
    body: (
      <p>
        The website&apos;s content — including text, graphics, the Srivofy name and logo, and its
        design — belongs to {businessName} or is used with permission. You may view and share pages
        for personal or internal business reference, but you may not reproduce or reuse them
        commercially without our written consent.
      </p>
    ),
  },
  {
    heading: "Third-party links and services",
    body: (
      <p>
        The website links to, or lets you use, services run by others — such as YouTube, WhatsApp
        and social media platforms. We are not responsible for their content, availability or
        privacy practices, and their own terms apply when you use them.
      </p>
    ),
  },
  {
    heading: "Disclaimer",
    body: (
      <p>
        The website is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;. To the extent the
        law allows, we make no warranties that it will always be available, uninterrupted or
        error-free.
      </p>
    ),
  },
  {
    heading: "Limitation of liability",
    body: (
      <p>
        To the extent the law allows, {businessName} is not liable for any indirect or consequential
        loss, or loss of profit, data or business, arising from your use of this website or reliance
        on its content. Nothing in these terms limits any liability that cannot be limited by law.
      </p>
    ),
  },
  {
    heading: "Privacy",
    body: (
      <p>
        How we handle personal information is explained in our{" "}
        <Link href="/privacy-policy/">Privacy Policy</Link>.
      </p>
    ),
  },
  {
    heading: "Governing law",
    body: (
      <p>
        These terms are governed by {legalConfig.governingLaw}. Any dispute relating to them or to
        this website is subject to the exclusive jurisdiction of {legalConfig.courts}.
      </p>
    ),
  },
  {
    heading: "Changes and contact",
    body: (
      <p>
        We may update these terms from time to time; the &ldquo;Last updated&rdquo; date shows when
        they last changed. Questions about these terms? Email us at {email}.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Terms & Conditions"
      intro="The terms that apply when you use this website and enquire about our services."
      updated={legalConfig.lastUpdated}
      sections={sections}
    />
  );
}
