import { Globe, Mail, Phone } from "lucide-react";
import { mailHref, siteConfig, telHref, websiteLabel } from "@/config/site";
import { socialIconFor } from "./BrandIcons";

const socialLabels = { facebook: "Facebook", instagram: "Instagram", linkedin: "LinkedIn" } as const;

/** Slim bar above the navigation: social links left, contact details right. */
export function UtilityBar() {
  const socials = Object.entries(siteConfig.socialLinks) as [keyof typeof socialLabels, string][];
  return (
    <div className="on-navy bg-navy text-on-navy-muted">
      <div className="container-page flex h-10 items-center justify-between gap-4 text-[13px]">
        <ul className="flex items-center gap-1" aria-label="Srivofy on social media">
          {socials.map(([key, url]) => {
            const Icon = socialIconFor[key];
            return (
              <li key={key}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Srivofy on ${socialLabels[key]} (opens in a new tab)`}
                  className="grid size-8 place-items-center rounded-sm transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Icon className="size-[15px]" />
                </a>
              </li>
            );
          })}
        </ul>

        <ul className="flex min-w-0 items-center gap-1 sm:gap-5" aria-label="Contact details">
          <li>
            <a href={mailHref} className="flex items-center gap-2 rounded-sm px-1.5 py-1 transition-colors hover:text-white" aria-label={`Email ${siteConfig.email}`}>
              <Mail aria-hidden className="size-[15px] shrink-0" />
              <span className="hidden md:inline">{siteConfig.email}</span>
            </a>
          </li>
          <li>
            <a href={telHref} className="flex items-center gap-2 rounded-sm px-1.5 py-1 transition-colors hover:text-white" aria-label={`Call ${siteConfig.phone}`}>
              <Phone aria-hidden className="size-[15px] shrink-0" />
              <span className="hidden min-[400px]:inline">{siteConfig.phone}</span>
            </a>
          </li>
          <li className="hidden lg:block">
            <a href={siteConfig.website} className="flex items-center gap-2 rounded-sm px-1.5 py-1 transition-colors hover:text-white">
              <Globe aria-hidden className="size-[15px] shrink-0" />
              {websiteLabel}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
