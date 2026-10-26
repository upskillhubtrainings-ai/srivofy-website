import {
  FileStack,
  Globe2,
  type LucideIcon,
  MessageSquareText,
  Megaphone,
  PhoneCall,
} from "lucide-react";
import type { DemoKey } from "./site";

export type ServiceId = "social" | "voice" | "whatsapp" | "website" | "documents";

export interface Capability {
  title: string;
  description: string;
}

export interface Service {
  id: ServiceId;
  slug: string;
  number: string;
  name: string;
  shortName: string;
  icon: LucideIcon;
  /** One line for menus and cards. */
  summary: string;
  /** Page H1 headline. */
  headline: string;
  intro: string;
  capabilities: Capability[];
  /** Labels for the service's workflow diagram. */
  workflow: { label: string; detail: string }[];
  demo: { key: DemoKey; label: string; button: string; note: string };
  useCases: Capability[];
  faqs: { q: string; a: string }[];
  ctaHeadline: string;
  ctaButton: string;
  metaTitle: string;
  metaDescription: string;
}

export const services: Service[] = [
  {
    id: "social",
    slug: "social-media-autopilot",
    number: "01",
    name: "Social Media Autopilot",
    shortName: "Social Media",
    icon: Megaphone,
    summary: "AI-assisted content creation, review and scheduling as one structured workflow.",
    headline: "Turn social media into a structured business workflow.",
    intro:
      "Srivofy sets up AI-assisted content operations: ideas become on-brand drafts, drafts move through review and approval, and approved posts are scheduled for the right platforms — with your team in control at every step.",
    capabilities: [
      { title: "AI-assisted content creation", description: "Turn briefs, offers and brand guidelines into first drafts your team refines." },
      { title: "Caption generation", description: "Caption options and variations written in your brand's tone of voice." },
      { title: "Content calendars", description: "Plan themes, campaigns and posting slots in one visible calendar." },
      { title: "Platform-specific adaptation", description: "Adapt length, format and hashtags for each platform you publish to." },
      { title: "Scheduling and publishing", description: "Connect approved posts to the scheduling tools your accounts support." },
      { title: "Review and approval", description: "Nothing is published without passing the approval step you define." },
      { title: "Workflow notifications", description: "Reviewers are notified when drafts are ready or changes are requested." },
    ],
    workflow: [
      { label: "Content Brief", detail: "Topic, audience, offer and platform." },
      { label: "AI-Assisted Draft", detail: "Draft posts and captions in your brand voice." },
      { label: "Review", detail: "Your team edits, approves or requests changes." },
      { label: "Scheduling", detail: "Approved posts are placed in the calendar." },
      { label: "Publishing", detail: "Posts go live through connected tools." },
    ],
    demo: {
      key: "socialMedia",
      label: "Social Media Autopilot Demo",
      button: "Watch Demo",
      note: "Illustrative content calendar. Your workflow, platforms and approval steps are configured during setup.",
    },
    useCases: [
      { title: "Consistent weekly posting", description: "Small teams keeping a steady rhythm without a dedicated content hire." },
      { title: "Multi-brand content", description: "Agencies producing distinct content for several brands." },
      { title: "Campaign launches", description: "Coordinated post series around an offer, event or product launch." },
    ],
    faqs: [
      { q: "Will posts be published without our approval?", a: "No, unless you choose that. We normally configure a review step so a person approves every post before it is scheduled." },
      { q: "Will the content sound like our brand?", a: "We configure the workflow with your tone, vocabulary and examples, and refine it based on your team's edits." },
      { q: "Which platforms can it publish to?", a: "That depends on the scheduling tools and platform APIs available for your accounts. We confirm what is possible before building anything." },
      { q: "Can we keep using our current scheduling tool?", a: "Often yes. Where your tool supports integrations, the workflow can hand approved posts to it." },
    ],
    ctaHeadline: "Make your content calendar run on a clear workflow.",
    ctaButton: "Discuss Social Media Automation",
    metaTitle: "Social Media Autopilot",
    metaDescription: "AI-assisted social media workflows from Srivofy: content creation, captions, calendars, approval steps and scheduling, with your team in control.",
  },
  {
    id: "voice",
    slug: "ai-voice-agents",
    number: "02",
    name: "AI Voice Agents",
    shortName: "Voice Agents",
    icon: PhoneCall,
    summary: "Answer calls, capture caller details and route requests with voice AI.",
    headline: "Make every business call more useful.",
    intro:
      "AI voice agents answer calls with a consistent greeting, handle approved questions, capture the details your team needs and route or escalate calls — so fewer calls are missed and every call leaves a useful record.",
    capabilities: [
      { title: "Natural conversation", description: "Callers speak normally; the agent responds from approved business information." },
      { title: "Caller information capture", description: "Names, numbers and request details collected in a consistent format." },
      { title: "Call routing", description: "Calls and requests directed to the right person or team by your rules." },
      { title: "Human escalation", description: "Callers reach a person when a request is urgent, complex or sensitive." },
      { title: "Structured call summaries", description: "Each call produces a short summary your team can act on." },
      { title: "Follow-up triggers", description: "Start follow-up workflows, such as notifications or ticket creation, when configured." },
    ],
    workflow: [
      { label: "Incoming Call", detail: "The agent answers with your greeting." },
      { label: "Speech Recognition", detail: "The caller's speech is transcribed." },
      { label: "AI Conversation", detail: "The agent answers and asks the right questions." },
      { label: "Action or Routing", detail: "Book, route, escalate or create a request." },
      { label: "Call Summary", detail: "A structured summary is sent to your team." },
    ],
    demo: {
      key: "voiceAgent",
      label: "AI Voice Agent Demo",
      button: "Request a Demo",
      note: "Illustrative call interface with a sample transcript. Request a demo and we'll walk you through an AI voice agent built for your business.",
    },
    useCases: [
      { title: "Busy front desks", description: "Clinics, salons and offices where staff cannot always answer the phone." },
      { title: "After-hours calls", description: "Capture caller details outside business hours for next-day follow-up." },
      { title: "Repeated questions", description: "Hours, location, pricing and service questions handled consistently." },
    ],
    faqs: [
      { q: "Will callers know they are speaking with AI?", a: "We recommend transparency: the agent can introduce itself as a virtual assistant. Requirements can vary by region and use case." },
      { q: "How does human handoff work?", a: "You define when a call should go to a person — for example urgent requests, complaints or specific keywords — and the agent transfers or escalates accordingly." },
      { q: "Can it book appointments directly?", a: "It can collect appointment requests on its own, and book directly when connected to a scheduling system that supports it." },
      { q: "Which languages are supported?", a: "Language and accent support depends on the voice platform used. We confirm your required languages during discovery." },
    ],
    ctaHeadline: "Find out where a voice agent fits your call flow.",
    ctaButton: "Discuss AI Voice Agents",
    metaTitle: "AI Voice Agents",
    metaDescription: "Srivofy AI voice agents: virtual receptionist, appointment intake and back-office support with call routing, summaries and human escalation.",
  },
  {
    id: "whatsapp",
    slug: "whatsapp-ai-agent",
    number: "03",
    name: "AI + WhatsApp Agent",
    shortName: "WhatsApp AI",
    icon: MessageSquareText,
    summary: "Respond, qualify leads and hand off to your team on WhatsApp.",
    headline: "Make customer conversations easier to manage.",
    intro:
      "A WhatsApp AI agent replies to common questions from your approved knowledge, captures and qualifies leads, takes service enquiries and appointment requests, and hands complex conversations to your team with the context already collected.",
    capabilities: [
      { title: "Automated responses", description: "Timely replies to incoming messages, including outside business hours." },
      { title: "Approved knowledge FAQs", description: "Answers drawn only from the information you approve." },
      { title: "Lead capture", description: "Name, need, budget or other fields you define, collected naturally." },
      { title: "Lead qualification", description: "Ask qualifying questions and tag enquiries before your team steps in." },
      { title: "Service enquiries", description: "Guide customers to the right service, package or next step." },
      { title: "Follow-ups", description: "Configured reminders and follow-up messages within platform rules." },
      { title: "Appointment intake", description: "Collect preferred dates and details for booking requests." },
      { title: "Human handoff", description: "Pass conversations to a person when needed, with full context." },
      { title: "Database and CRM integrations", description: "Send captured leads to your CRM, sheet or database when configured." },
    ],
    workflow: [
      { label: "Incoming Message", detail: "A customer messages your WhatsApp Business number." },
      { label: "AI Understanding", detail: "Intent and key details are identified." },
      { label: "Response", detail: "Reply from approved knowledge or ask a question." },
      { label: "Lead Capture", detail: "Details are structured into a lead record." },
      { label: "Next Action", detail: "Notify the team, book, follow up or hand off." },
    ],
    demo: {
      key: "whatsappAgent",
      label: "WhatsApp AI Agent Demo",
      button: "Try Demo",
      note: "Example conversation only. No live WhatsApp Business API is connected on this website.",
    },
    useCases: [
      { title: "Daily product and price questions", description: "Shops and service providers answering the same questions every day." },
      { title: "Admissions and course enquiries", description: "Institutes sharing course details and collecting applications." },
      { title: "Click-to-WhatsApp campaigns", description: "Turning ad traffic into qualified, organised conversations." },
    ],
    faqs: [
      { q: "Do we need a WhatsApp Business account?", a: "Yes. Automated assistants run on the WhatsApp Business Platform, which has its own approval process and messaging policies. We guide you through setup." },
      { q: "Can our team still reply manually?", a: "Yes. Conversations can be handed to your team, who continue with the context the assistant collected." },
      { q: "Where do captured leads go?", a: "Wherever you need them — a CRM, spreadsheet or database — once that integration is configured and tested." },
      { q: "Is the chat on this website a live agent?", a: "No. The conversation shown on this site is an example, not a connected WhatsApp agent." },
    ],
    ctaHeadline: "Organise your WhatsApp enquiries into a clear workflow.",
    ctaButton: "Discuss WhatsApp Automation",
    metaTitle: "AI + WhatsApp Agent",
    metaDescription: "Srivofy WhatsApp AI agents: automated replies, approved FAQs, lead capture and qualification, appointment intake and human handoff.",
  },
  {
    id: "website",
    slug: "website-development",
    number: "04",
    name: "Website Development",
    shortName: "Websites",
    icon: Globe2,
    summary: "Fast, responsive websites built to explain your value and capture leads.",
    headline: "Digital experiences designed to move business forward.",
    intro:
      "Srivofy designs and builds business websites and landing pages that explain what you do clearly, work well on every device, load quickly and route enquiries to your team — with room to add AI features as you grow.",
    capabilities: [
      { title: "Business websites", description: "Multi-page sites that present your services, approach and story." },
      { title: "Landing pages", description: "Focused pages for campaigns, launches and lead generation." },
      { title: "Website redesign", description: "Modernise slow, dated or hard-to-update websites." },
      { title: "UI/UX design", description: "Clear structure and visual design built around your visitors." },
      { title: "Responsive development", description: "Layouts designed intentionally for phones, tablets and desktops." },
      { title: "Performance optimization", description: "Fast loading, accessible markup and solid technical SEO." },
      { title: "Lead capture", description: "Forms and calls to action that deliver enquiries where you need them." },
      { title: "AI integration", description: "Add assistants, WhatsApp entry points and automated lead routing." },
    ],
    workflow: [
      { label: "Discovery", detail: "Audience, offer, pages and goals." },
      { label: "Design", detail: "Structure and visual direction for every screen size." },
      { label: "Development", detail: "Build pages, forms and integrations." },
      { label: "Testing", detail: "Devices, browsers, speed and accessibility." },
      { label: "Launch", detail: "Deploy, verify and hand over." },
    ],
    demo: {
      key: "websiteDevelopment",
      label: "Website AI Assistant Demo",
      button: "Watch Demo",
      note: "A demo of an AI assistant built into a business website.",
    },
    useCases: [
      { title: "New businesses", description: "A credible online presence from day one." },
      { title: "Outdated websites", description: "Redesigns that are faster and easier to maintain." },
      { title: "Lead-generation campaigns", description: "Landing pages built to capture and route enquiries." },
    ],
    faqs: [
      { q: "Can we update the content ourselves?", a: "Yes. We structure content so it is easy to edit, or connect a content management system if you need frequent updates." },
      { q: "Will the website work on mobile?", a: "Every layout is designed and tested for phones, tablets and desktops — not simply shrunk down." },
      { q: "Do you handle hosting and domains?", a: "We can deploy to your existing hosting and domain, and document how updates are published." },
      { q: "Can AI features be added later?", a: "Yes. A site can launch simply and add assistants, chat entry points or automated lead routing later." },
    ],
    ctaHeadline: "Plan a website that works as hard as your team.",
    ctaButton: "Discuss Your Website",
    metaTitle: "Website Development",
    metaDescription: "Srivofy builds responsive business websites and landing pages with strong performance, lead capture and optional AI integrations.",
  },
  {
    id: "documents",
    slug: "document-processing",
    number: "05",
    name: "Document Processing",
    shortName: "Documents",
    icon: FileStack,
    summary: "Turn invoice PDFs and images into validated records in a common database.",
    headline: "Turn invoices and documents into structured business data.",
    intro:
      "Srivofy helps businesses process invoices received as PDFs or images, extract the required information, validate the data, and store approved records in a common database.",
    capabilities: [
      { title: "Document intake", description: "Receive files by upload, email, shared folder, API or connected application." },
      { title: "Text extraction and OCR", description: "Read embedded PDF text, or use OCR for scanned PDFs and images." },
      { title: "Classification", description: "Identify invoices, receipts, purchase orders and other document types." },
      { title: "AI-assisted field extraction", description: "Locate supplier details, dates, amounts and line items." },
      { title: "Data normalization", description: "Standardise dates, currencies, number formats and supplier names." },
      { title: "Validation and duplicate checks", description: "Check required fields, totals and repeated invoice numbers." },
      { title: "Human review", description: "Route missing, ambiguous or low-confidence values to a reviewer." },
      { title: "Structured database entry", description: "Write approved records to your configured database or system." },
      { title: "Status and exception handling", description: "Track processed, review-required, duplicate and failed documents." },
    ],
    workflow: [
      { label: "Receive PDF or Image", detail: "Accept files through a configured upload, email, folder, API, or connected application." },
      { label: "Extract Text", detail: "Read embedded PDF text or use OCR for supported scanned files and images." },
      { label: "Identify Invoice Fields", detail: "Extract supplier information, dates, totals, and other configured fields." },
      { label: "Validate", detail: "Check required fields, data formats, totals, duplicate invoice numbers, and configured business rules." },
      { label: "Review Exceptions", detail: "Flag missing, ambiguous, or low-confidence fields for human review." },
      { label: "Store in a Common Database", detail: "Write validated records to the configured database or business system." },
      { label: "Track Results", detail: "Display success, failure, review-required, and duplicate statuses." },
    ],
    demo: {
      key: "documentProcessing",
      label: "Document Processing Demo",
      button: "Watch External Demo",
      note: "The interactive sample above runs entirely in your browser using built-in sample data.",
    },
    useCases: [
      { title: "Accounts payable", description: "Supplier invoices captured into one table instead of scattered PDFs." },
      { title: "Expense receipts", description: "Photographed receipts turned into categorised expense records." },
      { title: "Purchase orders and forms", description: "Order and form details entered into business systems without retyping." },
    ],
    faqs: [
      { q: "How accurate is the extraction?", a: "Accuracy depends on document quality, layout and the fields required. We test with your real samples, apply validation rules and route uncertain values to human review rather than claiming perfect accuracy." },
      { q: "Can it read scanned invoices and photos?", a: "Yes, using OCR, for supported image quality. Blurred, skewed or handwritten documents may need review." },
      { q: "Which database can records go to?", a: "Possible targets include PostgreSQL, MySQL, Supabase, Airtable, Google Sheets, CRM/ERP systems or a REST API. The destination is chosen and configured for your project." },
      { q: "What happens to duplicates?", a: "Configured duplicate checks — for example supplier plus invoice number — flag repeated invoices before they are stored." },
      { q: "How is sensitive data handled?", a: "Access controls, storage location, and retention and deletion policies are defined for the deployed system and agreed with you before go-live." },
    ],
    ctaHeadline: "Turn invoice processing into a structured workflow.",
    ctaButton: "Discuss Document Automation",
    metaTitle: "Document Processing",
    metaDescription: "Srivofy document processing: extract data from invoice PDFs and images with OCR, validate it, review exceptions and store records in a common database.",
  },
];

export const serviceById = Object.fromEntries(services.map((s) => [s.id, s])) as Record<
  ServiceId,
  Service
>;

export const serviceHref = (s: Pick<Service, "slug">) => `/services/${s.slug}/`;

/** Contact form "Service of interest" options. */
export const serviceOptions = [
  ...services.map((s) => s.name),
  "Multiple Services",
  "Not Sure Yet",
];
