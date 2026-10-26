import { PageHero } from "./PageHero";

export interface LegalSection {
  heading: string;
  body: React.ReactNode;
}

/** Shared layout for the Privacy Policy and Terms pages: numbered sections with a contents list. */
export function LegalDocument({
  eyebrow,
  title,
  intro,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}) {
  const id = (i: number) => `section-${i + 1}`;
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={intro} />
      <section className="bg-white py-16 sm:py-20">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[14px] text-muted">Last updated: {updated}</p>
            <nav aria-label="On this page" className="mt-6 hidden lg:block">
              <ol className="space-y-2 border-l border-line pl-4 text-[14px]">
                {sections.map((s, i) => (
                  <li key={s.heading}>
                    <a href={`#${id(i)}`} className="text-muted hover:text-blue">
                      {i + 1}. {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
          <div className="max-w-3xl space-y-12 text-[16px] leading-relaxed text-ink [&_a]:text-blue [&_a]:underline [&_a]:underline-offset-4 [&_li]:mt-2 [&_p+p]:mt-4 [&_ul+p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
            {sections.map((s, i) => (
              <section key={s.heading} id={id(i)} aria-labelledby={`${id(i)}-title`} className="scroll-mt-28">
                <h2 id={`${id(i)}-title`} className="text-h3 text-navy">
                  {i + 1}. {s.heading}
                </h2>
                <div className="mt-4">{s.body}</div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
