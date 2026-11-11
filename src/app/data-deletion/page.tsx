import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument, type LegalSection } from "@/components/shared/LegalDocument";
import { legalConfig } from "@/config/legal";
import { mailHref, siteConfig, telHref } from "@/config/site";

/*
 * Data deletion instructions. Linked in the footer beside the Privacy Policy,
 * and given to Meta and Google as the app's "data deletion instructions URL".
 */
export const metadata: Metadata = {
  title: "Data Deletion",
  description: "How to ask Srivofy to delete your personal data, including data from our WhatsApp and social media portals and Facebook or Google sign-in.",
  alternates: { canonical: "/data-deletion/" },
};

const { businessName } = legalConfig;
const email = <a href={`${mailHref}?subject=${encodeURIComponent("Data deletion request")}`}>{siteConfig.email}</a>;

const sections: LegalSection[] = [
  {
    heading: "How to request deletion",
    body: (
      <>
        <p>
          You can ask {businessName} to delete the personal data we hold about you at any time. Send an
          email to {email} with the subject <strong>&ldquo;Data deletion request&rdquo;</strong> and include:
        </p>
        <ul>
          <li>your name;</li>
          <li>the email address or WhatsApp number you used with us; and</li>
          <li>
            what you would like deleted, for example everything, or only your account on one of our portals.
          </li>
        </ul>
        <p>
          You can also call or WhatsApp us on <a href={telHref}>{siteConfig.phone}</a>. To protect your data, we
          may ask you to confirm the request from the email address or number linked to your account.
        </p>
      </>
    ),
  },
  {
    heading: "What we delete",
    body: (
      <>
        <p>When we receive a confirmed request, we delete:</p>
        <ul>
          <li>enquiries you sent through this website, by email, by phone or on WhatsApp;</li>
          <li>
            your account on our client portals, such as <strong>wa.srivofy.com</strong> and{" "}
            <strong>app.srivofy.com</strong>, including your login, team members and profile details;
          </li>
          <li>
            data stored in those portals: your contact lists, message templates, campaigns, message logs and
            social media content;
          </li>
          <li>
            the connection details you gave us, such as WhatsApp Business or Meta access tokens and account IDs;
            and
          </li>
          <li>the name and email address we received when you signed in with Google or Facebook.</li>
        </ul>
      </>
    ),
  },
  {
    heading: "What we may need to keep",
    body: (
      <p>
        We may keep a limited record where the law requires it, such as invoices and payment records for tax and
        accounting purposes, for as long as those laws require. We keep these records only for that purpose and
        delete them once the retention period ends.
      </p>
    ),
  },
  {
    heading: "How long it takes",
    body: (
      <p>
        We confirm that we have received your request within 7 days and complete the deletion within 30 days.
        We will email you when it is done. Deleting your portal account also removes your access to it, and
        deleted data cannot be recovered.
      </p>
    ),
  },
  {
    heading: "If you signed in with Facebook or Google",
    body: (
      <>
        <p>
          You can also remove {businessName}&apos;s access from your own account at any time. This stops us
          receiving any further information; to delete the data we already hold, send us a request as described
          above.
        </p>
        <ul>
          <li>
            <strong>Facebook:</strong> go to Settings &amp; privacy → Settings → Apps and websites, find{" "}
            {businessName} and select Remove.
          </li>
          <li>
            <strong>Google:</strong> go to your Google Account → Security → Your connections to third-party apps
            &amp; services, find {businessName} and select Delete all connections.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "Data held by WhatsApp and Meta",
    body: (
      <p>
        Messages sent through the WhatsApp Business Platform are also processed by Meta under its own policies.
        Data held in your own WhatsApp Business account or Meta Business account is controlled by you and Meta;
        you can manage or delete it in Meta Business Suite. For more about how we handle your information, see
        our <Link href="/privacy-policy/">Privacy Policy</Link>.
      </p>
    ),
  },
];

export default function DataDeletionPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Data Deletion"
      intro="How to ask us to delete your personal data, and what happens next."
      updated="11 November 2026"
      sections={sections}
    />
  );
}
