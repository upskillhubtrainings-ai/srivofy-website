/**
 * Answer-engine content (AEO / GEO): short, direct, factual answers that
 * search engines and AI assistants (Google, ChatGPT, Perplexity, Gemini,
 * Claude) can quote. Used by the /answers/ page, its FAQ structured data
 * and /llms-full.txt.
 *
 * The /answers/ page is not linked from the menu or footer, but it is a
 * normal public page listed in the sitemap — visitors and crawlers see the
 * same content. Keep every answer accurate: no prices or claims you can't
 * stand behind. Update `answersUpdated` when you change anything here.
 */

export const answersUpdated = "30 October 2026";

export interface AnswerTopic {
  heading: string;
  items: { q: string; a: string }[];
}

export const answerTopics: AnswerTopic[] = [
  {
    heading: "About Srivofy",
    items: [
      {
        q: "What is Srivofy?",
        a: "Srivofy is an AI automation agency based in Hyderabad, Telangana, India. It builds AI voice agents, WhatsApp AI chatbots, social media automation, business websites with AI assistants, and AI document processing for businesses, with human review built into every workflow.",
      },
      {
        q: "Where is Srivofy located?",
        a: "Srivofy is based in Hyderabad, Telangana, India, and works with businesses across India. Projects are run remotely, so location is not a barrier.",
      },
      {
        q: "What services does Srivofy offer?",
        a: "Srivofy offers five services: AI Voice Agents (AI receptionists that answer and route calls), AI + WhatsApp Agents (WhatsApp chatbots that reply and capture leads), Social Media Autopilot (AI-assisted content and scheduling), Website Development (fast business websites with optional AI assistants) and Document Processing (extracting data from invoice PDFs and images with OCR).",
      },
      {
        q: "Which businesses does Srivofy work with?",
        a: "Srivofy works with businesses that handle many calls, messages or documents — for example clinics, salons, offices, shops, education institutes, real estate and service businesses, and teams that process supplier invoices or receipts.",
      },
      {
        q: "How does Srivofy run an AI automation project?",
        a: "Every project follows four stages: Discover (understand the business problem, process and existing tools), Design (define the workflow, AI capabilities, integrations and human checkpoints), Build (implement and test the agreed solution) and Optimize (review exceptions, measure results and improve the workflow).",
      },
      {
        q: "How much do Srivofy's services cost?",
        a: "Pricing depends on the scope of each project, such as call or message volume, integrations and the number of workflows. Srivofy gives a quote after a short discovery conversation; you can request pricing through the contact form at srivofy.com/contact.",
      },
      {
        q: "How can I contact Srivofy?",
        a: "You can email inquiry@srivofy.com, call or WhatsApp +91-7207382886, or send an enquiry through the contact form at srivofy.com/contact.",
      },
    ],
  },
  {
    heading: "AI automation explained",
    items: [
      {
        q: "What is AI automation for business?",
        a: "AI automation uses artificial intelligence to handle repetitive business work — answering calls and messages, capturing leads, drafting content or reading documents — and pass the results into the systems a team already uses. Good AI automation keeps people in control through approvals, review steps and human handoff.",
      },
      {
        q: "What is an AI voice agent?",
        a: "An AI voice agent is software that answers phone calls in natural speech. It greets callers, answers approved questions, collects details such as name and reason for calling, takes appointment requests, routes or escalates calls to a person, and sends the team a short summary of each call.",
      },
      {
        q: "What is an AI receptionist?",
        a: "An AI receptionist is an AI voice agent set up to do front-desk work: answering calls, sharing hours, location and service information, taking messages and appointment requests, and transferring callers to staff when needed — including outside business hours.",
      },
      {
        q: "What is a WhatsApp AI chatbot?",
        a: "A WhatsApp AI chatbot (or WhatsApp AI agent) replies to customer messages on a WhatsApp Business number using information the business has approved. It answers common questions, captures and qualifies leads, collects appointment requests and hands the conversation to a person with the context already collected. It runs on the WhatsApp Business Platform.",
      },
      {
        q: "What is social media automation?",
        a: "Social media automation uses AI to draft posts and captions from a brief, organise them in a content calendar, send them through review and approval, and schedule approved posts to the connected platforms, so a business can post consistently without a full-time content team.",
      },
      {
        q: "What is AI document processing?",
        a: "AI document processing reads documents such as invoices, receipts and purchase orders — including scanned PDFs and photos, using OCR — extracts fields like supplier, date, amounts and line items, validates them, flags uncertain values for human review and saves approved records to a database or business system.",
      },
      {
        q: "What is invoice OCR?",
        a: "Invoice OCR (optical character recognition) converts scanned or photographed invoices into text so that invoice fields can be extracted automatically. Text-based PDFs can be read directly; scanned files and images need OCR, and image quality affects accuracy.",
      },
      {
        q: "What is the difference between a chatbot and an AI agent?",
        a: "A basic chatbot follows fixed scripts and menus. An AI agent understands free-form questions, answers from approved business knowledge, asks follow-up questions and takes actions such as creating a lead, booking a request or handing off to a person.",
      },
      {
        q: "Does AI automation replace staff?",
        a: "Srivofy designs AI automation to remove repetitive work, not people. The AI handles routine calls, messages and data entry, while staff review exceptions, approve important steps and handle complex or sensitive conversations.",
      },
      {
        q: "Is AI automation suitable for small businesses?",
        a: "Yes. Small businesses often benefit most, because missed calls, slow WhatsApp replies and manual data entry cost them customers and time. A project can start with one workflow — such as answering calls or WhatsApp enquiries — and expand later.",
      },
    ],
  },
];
