import { Eyebrow } from "../ui/Section";

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as React.CSSProperties;

/** Simple page header for top-level pages (Services, About, Contact...). */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <section aria-labelledby="page-title" className="relative overflow-hidden border-b border-line bg-white">
      <div aria-hidden className="bg-blueprint absolute inset-y-0 right-0 hidden w-1/3 opacity-60 [mask-image:linear-gradient(90deg,transparent,#000)] lg:block" />
      <div className="container-page relative pt-14 pb-16 sm:pt-16 sm:pb-20 lg:pt-20">
        <div className="max-w-4xl">
          <div className="enter" style={delay(0)}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h1 id="page-title" className="text-display enter mt-6 text-navy" style={delay(80)}>
            {title}
          </h1>
          {intro && (
            <p className="enter mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl" style={delay(180)}>
              {intro}
            </p>
          )}
          {children && <div className="enter mt-9" style={delay(260)}>{children}</div>}
        </div>
      </div>
    </section>
  );
}
