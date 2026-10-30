import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument, type LegalSection } from "@/components/shared/LegalDocument";
import { legalConfig } from "@/config/legal";
import { mailHref, siteConfig, telHref } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Srivofy collects, uses and protects the personal information you share through srivofy.com.",
  alternates: { canonical: "/privacy-policy/" },
};

const { businessName } = legalConfig;
const email = <a href={mailHref}>{siteConfig.email}</a>;

const sections: LegalSection[] = [
  {
    heading: "Who we are",
    body: (
      <p>
        This website, srivofy.com, is operated by {businessName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
        &ldquo;our&rdquo;), an AI automation agency. This policy explains what personal information we
        collect through this website, how we use it and the choices you have. If you have any
        questions, contact us at {email} or <a href={telHref}>{siteConfig.phone}</a>.
      </p>
    ),
  },
  {
    heading: "Information we collect",
    body: (
      <>
        <p>We only collect information you choose to give us:</p>
        <ul>
          <li>
            <strong>Contact form:</strong> your name, business email, company (optional), the service
            you&apos;re interested in, your current challenge (optional) and your message.
          </li>
          <li>
            <strong>Email, phone and WhatsApp:</strong> the details you share when you contact us
            directly.
          </li>
          <li>
            <strong>Website chat assistant:</strong> the messages you type into the AI chat on this
            website. Please don&apos;t share sensitive personal information in the chat.
          </li>
        </ul>
        <p>
          Like most websites, our hosting provider automatically records basic technical information
          when pages are requested — such as your IP address, browser type and the time of the
          request — to keep the website secure and running. We do not use this to identify you.
        </p>
        <p>
          We also collect usage information through Google Analytics and the Meta Pixel, as explained
          in &ldquo;Cookies and tracking&rdquo; below.
        </p>
      </>
    ),
  },
  {
    heading: "Cookies and tracking",
    body: (
      <>
        <p>We use two third-party tools that set cookies and collect information about your visit:</p>
        <ul>
          <li>
            <strong>Google Analytics</strong> (Google) — helps us understand how visitors use the
            website, such as which pages are viewed, how long visits last, the type of device and
            browser, approximate location (city/country) and how you arrived at the site.
          </li>
          <li>
            <strong>Meta Pixel</strong> (Meta, the company behind Facebook and Instagram) — helps us
            measure the results of our advertising and show relevant ads to people who have visited
            our website.
          </li>
        </ul>
        <p>
          These tools record page views and, when you send an enquiry, that an enquiry was made and
          which service it was about. They do not receive the contents of the contact form, such as
          your name, email or message. Google and Meta process this information under their own
          privacy policies.
        </p>
        <p>
          You can block or delete cookies in your browser settings, opt out of Google Analytics with
          Google&apos;s{" "}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
            browser add-on
          </a>
          , and manage how Meta uses information for ads in your{" "}
          <a href="https://www.facebook.com/adpreferences" target="_blank" rel="noopener noreferrer">
            Meta ad preferences
          </a>
          .
        </p>
        <p>
          Some other features only load when you use them: demo videos are played from YouTube (in
          privacy-enhanced mode) when you press play, and WhatsApp links open WhatsApp. When you
          use these, those companies may collect information under their own privacy policies.
        </p>
      </>
    ),
  },
  {
    heading: "How we use your information",
    body: (
      <ul>
        <li>To reply to your enquiry and arrange a consultation or demo.</li>
        <li>To answer your questions through the website chat assistant.</li>
        <li>To prepare quotes and, if you become a client, to deliver our services.</li>
        <li>To understand how the website is used and improve it (Google Analytics).</li>
        <li>To measure and improve our advertising (Meta Pixel).</li>
        <li>To keep the website secure and prevent misuse, such as spam.</li>
        <li>To meet our legal and accounting obligations.</li>
      </ul>
    ),
  },
  {
    heading: "Legal basis and consent",
    body: (
      <p>
        We process your personal data with your consent, which you give when you submit the contact
        form or contact us directly, and as needed to respond to your request, in line with
        India&apos;s Digital Personal Data Protection Act, 2023. You can withdraw your consent at any
        time by emailing {email}.
      </p>
    ),
  },
  {
    heading: "Who we share it with",
    body: (
      <>
        <p>
          We do not sell or rent your personal information. We share it only with service providers
          that help us run our business — such as our website hosting and email provider, and the
          automation and AI services that power the chat assistant — who may process it on our
          behalf, and only as needed to provide their services.
        </p>
        <p>
          Website usage information is collected by Google (Google Analytics) and Meta (Meta Pixel)
          as described in &ldquo;Cookies and tracking&rdquo;.
        </p>
        <p>We may also disclose information where the law requires it.</p>
      </>
    ),
  },
  {
    heading: "How long we keep it",
    body: (
      <p>
        We keep enquiry details for as long as needed to respond and follow up, and client records
        for as long as required for the engagement and our legal obligations. After that, we delete
        or anonymise them. You can ask us to delete your information sooner.
      </p>
    ),
  },
  {
    heading: "How we protect it",
    body: (
      <p>
        We use reasonable security measures, including encrypted connections (HTTPS) and limited
        access to enquiries. No method of transmission or storage is completely secure, but we work
        to protect your information and will act promptly if a problem occurs.
      </p>
    ),
  },
  {
    heading: "Your rights",
    body: (
      <>
        <p>You can ask us to:</p>
        <ul>
          <li>tell you what personal information we hold about you;</li>
          <li>correct or update it;</li>
          <li>delete it; or</li>
          <li>stop using it (withdraw consent).</li>
        </ul>
        <p>
          To make a request or raise a concern, email {email}. We will respond within a reasonable
          time. If you are not satisfied, you may contact the Data Protection Board of India.
        </p>
      </>
    ),
  },
  {
    heading: "Children",
    body: (
      <p>
        Our website and services are intended for businesses and are not directed at children under
        18. We do not knowingly collect personal information from children.
      </p>
    ),
  },
  {
    heading: "Changes to this policy",
    body: (
      <p>
        We may update this policy from time to time. The &ldquo;Last updated&rdquo; date at the top
        shows when it last changed. Please also read our{" "}
        <Link href="/terms-and-conditions/">Terms &amp; Conditions</Link>.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Privacy Policy"
      intro="What we collect, why we collect it, and the choices you have."
      updated={legalConfig.lastUpdated}
      sections={sections}
    />
  );
}
