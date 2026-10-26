/**
 * Details used by the Privacy Policy and Terms & Conditions pages.
 * Update `lastUpdated` whenever you change either page's content.
 */
export const legalConfig = {
  /** Business name as it appears in the legal pages. */
  businessName: "Srivofy",
  lastUpdated: "26 October 2026",
  governingLaw: "the laws of India",
  courts: "the courts at Hyderabad, Telangana, India",
};

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms & Conditions", href: "/terms-and-conditions/" },
] as const;
