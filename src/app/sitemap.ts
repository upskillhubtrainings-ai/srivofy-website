import type { MetadataRoute } from "next";
import { serviceHref, services } from "@/config/services";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.canonicalUrl.replace(/\/$/, "");
  const paths = [
    "/",
    "/services/",
    ...services.map(serviceHref),
    "/about/",
    "/contact/",
    "/privacy-policy/",
    "/terms-and-conditions/",
    // Portfolio is listed only when enabled.
    ...(siteConfig.portfolioEnabled ? ["/portfolio/"] : []),
  ];
  return paths.map((p) => ({
    url: `${base}${p}`,
    changeFrequency: "monthly",
    priority: p === "/" ? 1 : p.startsWith("/services") ? 0.8 : 0.6,
  }));
}
