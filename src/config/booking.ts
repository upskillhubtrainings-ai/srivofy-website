/**
 * Free 15-minute automation check: the booking popup's options.
 * Keep the topic and slot lists in step with public/api/book.php,
 * which rejects anything not listed here.
 */

/** Any link to this hash opens the booking popup, e.g. <a href="#book">. */
export const bookHash = "#book";

/** PHP mailer included in this project; it works once deployed to Hostinger. */
export const bookingEndpoint = "/api/book.php";

export const bookingTopics = [
  "Social Media Autopilot",
  "AI + WhatsApp Agent",
  "Website Development",
  "AI Voice Agents",
  "Document Processing",
  "Not sure yet: general automation check",
];

/** Start times in India time (IST), Monday to Saturday. */
export const bookingSlots = ["10:00", "11:00", "12:00", "15:00", "16:00", "17:00", "18:00"];

/** How far ahead a visitor can book. */
export const bookingDaysAhead = 30;
