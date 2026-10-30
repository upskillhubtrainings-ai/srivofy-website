import { serviceHref, services, type Service } from "@/config/services";
import { siteConfig, socialProfiles } from "@/config/site";

/**
 * Structured data (schema.org JSON-LD) that tells search engines who Srivofy
 * is, where it works and what it offers. Not visible on the page.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // "<" is escaped so the JSON can never close the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const origin = siteConfig.canonicalUrl;
const businessId = `${origin}/#business`;
const absolute = (path: string) => `${origin}${path}`;

const serviceId = (s: Service) => `${absolute(serviceHref(s))}#service`;

/** Site-wide: the business (an Organization and LocalBusiness in Hyderabad), its services and the website. */
export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": businessId,
        name: siteConfig.name,
        alternateName: "Srivofy AI Agency",
        description:
          "AI automation agency in Hyderabad, India, building AI voice agents, WhatsApp AI chatbots, social media automation, websites and AI document processing.",
        url: `${origin}/`,
        logo: absolute("/brand/srivofy-logo-original.webp"),
        image: absolute("/opengraph-image"),
        email: siteConfig.email,
        telephone: siteConfig.phone,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: siteConfig.email,
          telephone: siteConfig.phone,
          areaServed: "IN",
          availableLanguage: ["English"],
          url: absolute("/contact/"),
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Hyderabad" },
          { "@type": "Country", name: "India" },
        ],
        sameAs: socialProfiles.map((p) => p.url),
        knowsAbout: [
          "AI automation",
          "AI voice agents",
          "WhatsApp chatbots",
          "Social media automation",
          "Website development",
          "Document processing and OCR",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "AI automation services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@id": serviceId(s) },
          })),
        },
      },
      ...services.map((s) => ({
        "@type": "Service",
        "@id": serviceId(s),
        name: s.name,
        serviceType: s.metaTitle,
        description: s.summary,
        url: absolute(serviceHref(s)),
        provider: { "@id": businessId },
        areaServed: { "@type": "Country", name: "India" },
      })),
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        name: siteConfig.name,
        url: `${origin}/`,
        inLanguage: "en-IN",
        publisher: { "@id": businessId },
      },
    ],
  };
}

type Faq = { q: string; a: string };

function faqPage(url: string, faqs: Faq[]) {
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    about: { "@id": businessId },
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** A standalone FAQ page, such as /answers/. */
export function faqSchema(path: string, faqs: Faq[]) {
  return { "@context": "https://schema.org", ...faqPage(absolute(path), faqs) };
}

/** Per service page: the service, its FAQs and the breadcrumb trail. */
export function serviceSchema(s: Service) {
  const url = absolute(serviceHref(s));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": serviceId(s),
        name: s.name,
        serviceType: s.metaTitle,
        description: s.metaDescription,
        url,
        provider: { "@id": businessId },
        areaServed: { "@type": "Country", name: "India" },
      },
      faqPage(url, s.faqs),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${origin}/` },
          { "@type": "ListItem", position: 2, name: "Services", item: absolute("/services/") },
          { "@type": "ListItem", position: 3, name: s.name, item: url },
        ],
      },
    ],
  };
}
