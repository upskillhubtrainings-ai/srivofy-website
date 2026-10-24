import { consultationHref } from "@/config/site";
import { ButtonLink } from "../ui/Button";
import { Reveal } from "../ui/Reveal";

/** Navy closing call-to-action band used across pages. */
export function CtaBand({
  headline,
  primary = "Request a Consultation",
  primaryHref = consultationHref,
  secondary = "Explore Services",
  secondaryHref = "/services/",
}: {
  headline: string;
  primary?: string;
  primaryHref?: string;
  secondary?: string | null;
  secondaryHref?: string;
}) {
  return (
    <section className="on-navy relative overflow-hidden bg-navy text-white">
      <div aria-hidden className="bg-blueprint-navy absolute inset-0 [mask-image:linear-gradient(90deg,transparent,#000_60%)]" />
      <div className="container-page relative grid gap-10 py-20 sm:py-24 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <Reveal>
          <h2 className="text-h2 max-w-2xl text-white">{headline}</h2>
        </Reveal>
        <Reveal delay={120} className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <ButtonLink href={primaryHref} variant="light" size="lg" arrow>
            {primary}
          </ButtonLink>
          {secondary && (
            <ButtonLink href={secondaryHref} variant="outline-light" size="lg">
              {secondary}
            </ButtonLink>
          )}
        </Reveal>
      </div>
    </section>
  );
}
