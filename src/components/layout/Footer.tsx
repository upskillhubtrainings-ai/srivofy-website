import Link from "next/link";
import { Globe, Mail, Phone } from "lucide-react";
import { mailHref, siteConfig, socialProfiles, telHref, websiteLabel } from "@/config/site";
import { serviceHref, services } from "@/config/services";
import { CurrentYear } from "../ui/CurrentYear";
import { Logo } from "../ui/Logo";
import { socialIconFor } from "./BrandIcons";

const companyLinks = [
  { label: "Our Approach", href: "/#approach" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
  // Portfolio is added here automatically when siteConfig.portfolioEnabled is true.
  ...(siteConfig.portfolioEnabled ? [{ label: "Portfolio", href: "/portfolio/" }] : []),
];

const linkCls = "inline-flex min-h-9 items-center text-[15px] text-on-navy-muted transition-colors hover:text-white";

export function Footer() {
  return (
    <footer className="on-navy bg-navy text-on-navy">
      <div className="container-page grid grid-cols-2 gap-x-6 gap-y-12 py-16 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:py-20">
        <div className="col-span-2 max-w-sm lg:col-span-1">
          <Logo inverted />
          <p className="mt-5 text-[15px] leading-relaxed text-on-navy-muted">
            Srivofy is an AI automation agency helping businesses automate customer conversations,
            streamline operations, process documents and build better digital experiences.
          </p>
          <ul className="mt-6 flex gap-2" aria-label="Srivofy on social media">
            {socialProfiles.map(({ key, label, url }) => {
              const Icon = socialIconFor[key];
              return (
                <li key={key}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Srivofy on ${label} (opens in a new tab)`}
                    className="grid size-10 place-items-center rounded-md border border-navy-line text-on-navy-muted transition-colors hover:border-white/40 hover:text-white"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <nav aria-label="Services">
          <h2 className="text-eyebrow text-[#8fb0ff]">Services</h2>
          <ul className="mt-5">
            {services.map((s) => (
              <li key={s.id}>
                <Link href={serviceHref(s)} className={linkCls}>{s.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="text-eyebrow text-[#8fb0ff]">Company</h2>
          <ul className="mt-5">
            {companyLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className={linkCls}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-2 lg:col-span-1">
          <h2 className="text-eyebrow text-[#8fb0ff]">Contact</h2>
          <ul className="mt-5 space-y-1">
            <li>
              <a href={mailHref} className={`${linkCls} gap-3`}>
                <Mail aria-hidden className="size-4" /> {siteConfig.email}
              </a>
            </li>
            <li>
              <a href={telHref} className={`${linkCls} gap-3`}>
                <Phone aria-hidden className="size-4" /> {siteConfig.phone}
              </a>
            </li>
            <li>
              <a href={siteConfig.website} className={`${linkCls} gap-3`}>
                <Globe aria-hidden className="size-4" /> {websiteLabel}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-line">
        <div className="container-page flex flex-col gap-2 py-6 text-[13px] text-on-navy-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {siteConfig.name}. All rights reserved.
          </p>
          <p>AI features shown on this site are illustrative unless stated otherwise.</p>
        </div>
      </div>
    </footer>
  );
}
