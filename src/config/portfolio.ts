import type { ServiceId } from "./services";

/**
 * Portfolio projects — shown on /portfolio when `portfolioEnabled` is true
 * in src/config/site.ts.
 *
 * Add only real, published work you have permission to show.
 * Put screenshots in /public/portfolio/ and reference them as "/portfolio/name.jpg".
 *
 * Example entry (copy, uncomment and edit):
 *
 *   {
 *     title: "Project name",
 *     client: "Client or brand name",
 *     description: "One or two sentences on what was built and why.",
 *     services: ["website", "whatsapp"],
 *     image: "/portfolio/project-name.jpg",
 *     url: "https://example.com",
 *   },
 */

export interface PortfolioProject {
  title: string;
  client?: string;
  description: string;
  services: ServiceId[];
  /** Screenshot path under /public, e.g. "/portfolio/acme.jpg". */
  image?: string;
  /** Live project URL (optional). */
  url?: string;
}

export const portfolioProjects: PortfolioProject[] = [];
