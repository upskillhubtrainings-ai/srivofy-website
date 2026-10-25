import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, FolderOpen } from "lucide-react";
import { CtaBand } from "@/components/shared/CtaBand";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { portfolioProjects } from "@/config/portfolio";
import { serviceById } from "@/config/services";
import { siteConfig } from "@/config/site";

/**
 * Portfolio page — implemented but DISABLED by default.
 * Enable it by setting `portfolioEnabled: true` in src/config/site.ts.
 * While disabled this route renders the 404 page, is excluded from the
 * sitemap, and is not linked anywhere on the site.
 */
export const metadata: Metadata = siteConfig.portfolioEnabled
  ? {
      title: "Portfolio",
      description: "Selected Srivofy projects across AI automation and website development.",
      alternates: { canonical: "/portfolio/" },
    }
  : { title: "Page not found", robots: { index: false, follow: false } };

export default function PortfolioPage() {
  if (!siteConfig.portfolioEnabled) notFound();

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Selected work."
        intro="Projects we have designed and delivered, grouped by the services involved."
      />
      <Section>
        {portfolioProjects.length === 0 ? (
          <div className="grid place-items-center rounded-lg border border-dashed border-line-strong bg-paper px-6 py-20 text-center">
            <FolderOpen aria-hidden className="size-8 text-muted" />
            <p className="mt-4 text-lg font-semibold text-navy">Projects coming soon</p>
            <p className="mt-1 text-muted">Add projects in src/config/portfolio.ts to show them here.</p>
          </div>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2">
            {portfolioProjects.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 2) * 90} className="flex flex-col overflow-hidden rounded-lg border border-line bg-white">
                <div className="aspect-[16/10] border-b border-line bg-paper">
                  {p.image ? (
                    // Static export: plain <img> keeps the build host-agnostic.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image} alt={`Screenshot of ${p.title}`} loading="lazy" className="size-full object-cover" />
                  ) : (
                    <div className="bg-blueprint size-full" />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <ul className="flex flex-wrap gap-2">
                    {p.services.map((id) => (
                      <li key={id} className="rounded-sm bg-blue-50 px-2 py-0.5 text-[12px] font-medium text-blue">{serviceById[id].name}</li>
                    ))}
                  </ul>
                  <h2 className="text-h3 mt-4 text-navy">{p.title}</h2>
                  {p.client && <p className="mt-1 text-[14px] text-muted">{p.client}</p>}
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.description}</p>
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[15px] font-medium text-blue hover:text-blue-700">
                      Visit project <ArrowUpRight aria-hidden className="size-4" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </ul>
        )}
      </Section>
      <CtaBand headline="Have a project in mind?" />
    </>
  );
}
