import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="bg-blueprint border-b border-line bg-paper">
      <div className="container-page flex min-h-[60vh] flex-col items-start justify-center py-24">
        <p className="text-eyebrow text-blue">Error 404</p>
        <h1 className="text-display mt-5 max-w-3xl text-navy">This page could not be found.</h1>
        <p className="mt-5 max-w-xl text-lg text-muted">
          The page may have moved, or the address may be mistyped.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">Back to home</ButtonLink>
          <ButtonLink href="/services/" variant="secondary" size="lg">View services</ButtonLink>
        </div>
      </div>
    </section>
  );
}
