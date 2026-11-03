import { ArrowRight, Gift, Globe, Mail, Phone } from "lucide-react";
import { mailHref, plannerSectionHref, siteConfig, socialProfiles, telHref, websiteLabel } from "@/config/site";
import { socialIconFor } from "./BrandIcons";

/**
 * Slim bar above the navigation: social links left, the free planner offer in
 * the middle (scrolls to the homepage planner section), contact details right. On phones the
 * offer takes the social links' place.
 */
export function UtilityBar() {
  return (
    <div className="on-navy bg-navy text-on-navy-muted">
      <div className="container-page flex h-10 items-center justify-between gap-3 text-[13px]">
        <ul className="hidden items-center gap-1 md:flex" aria-label="Srivofy on social media">
          {socialProfiles.map(({ key, label, url }) => {
            const Icon = socialIconFor[key];
            return (
              <li key={key}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Srivofy on ${label} (opens in a new tab)`}
                  className="grid size-8 place-items-center rounded-sm transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Icon className="size-[15px]" />
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href={plannerSectionHref}
          className="group flex min-w-0 items-center gap-2 rounded-sm py-1 text-white transition-colors hover:text-[#ffd23f]"
        >
          <Gift aria-hidden className="size-[15px] shrink-0 text-[#ffd23f]" />
          <span className="truncate">
            <span className="font-semibold text-[#ffd23f]">Free:</span>{" "}
            <span className="hidden sm:inline">Weekly Content Planner for business owners</span>
            <span className="sm:hidden">Weekly Content Planner</span>
          </span>
          <span className="hidden shrink-0 items-center gap-1 font-semibold text-[#ffd23f] min-[480px]:flex">
            Get it free <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </a>

        <ul className="flex shrink-0 items-center gap-1 sm:gap-5" aria-label="Contact details">
          <li>
            <a href={mailHref} className="flex items-center gap-2 rounded-sm px-1.5 py-1 transition-colors hover:text-white" aria-label={`Email ${siteConfig.email}`}>
              <Mail aria-hidden className="size-[15px] shrink-0" />
              <span className="hidden xl:inline">{siteConfig.email}</span>
            </a>
          </li>
          <li>
            <a href={telHref} className="flex items-center gap-2 rounded-sm px-1.5 py-1 transition-colors hover:text-white" aria-label={`Call ${siteConfig.phone}`}>
              <Phone aria-hidden className="size-[15px] shrink-0" />
              <span className="hidden lg:inline">{siteConfig.phone}</span>
            </a>
          </li>
          <li className="hidden xl:block">
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
