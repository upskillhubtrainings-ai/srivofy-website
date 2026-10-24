"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, Info } from "lucide-react";
import { serviceById, services, type ServiceId } from "@/config/services";

type ColumnId = "inputs" | "ai" | "process" | "systems";

interface ArchNode {
  id: string;
  label: string;
  detail: string;
}

const columns: { id: ColumnId; title: string; nodes: ArchNode[] }[] = [
  {
    id: "inputs",
    title: "Inputs",
    nodes: [
      { id: "call", label: "Incoming calls", detail: "Phone calls answered by a voice agent instead of ringing out or going to voicemail." },
      { id: "whatsapp", label: "WhatsApp messages", detail: "Customer messages arriving on a WhatsApp Business number." },
      { id: "brief", label: "Content briefs", detail: "Topics, offers and campaign ideas that start a social media workflow." },
      { id: "web", label: "Website forms", detail: "Enquiries and lead forms submitted on your website." },
      { id: "docs", label: "PDF & image invoices", detail: "Invoices, receipts and forms received as PDFs, scans or photos." },
    ],
  },
  {
    id: "ai",
    title: "AI Understanding",
    nodes: [
      { id: "speech", label: "Speech recognition", detail: "Converts a caller's speech into text the system can work with." },
      { id: "intent", label: "Intent & language", detail: "Identifies what the customer wants and extracts key details from their words." },
      { id: "generate", label: "Content generation", detail: "Drafts posts, captions and variations from a brief and brand guidelines." },
      { id: "ocr", label: "OCR & field extraction", detail: "Reads text from documents and locates fields such as invoice number, dates and totals." },
    ],
  },
  {
    id: "process",
    title: "Workflow Processing",
    nodes: [
      { id: "route", label: "Routing & escalation", detail: "Sends each request to the right person or team, and escalates to a human when rules require it." },
      { id: "qualify", label: "Lead qualification", detail: "Asks qualifying questions and tags leads before your team follows up." },
      { id: "review", label: "Human review", detail: "A person approves content or checks uncertain values before anything is final." },
      { id: "validate", label: "Validation & duplicates", detail: "Checks required fields, formats, totals and repeated records against your rules." },
      { id: "schedule", label: "Scheduling", detail: "Places approved items into calendars and publishing queues." },
    ],
  },
  {
    id: "systems",
    title: "Business Systems",
    nodes: [
      { id: "crm", label: "CRM", detail: "Leads and contact records stored in your customer relationship system." },
      { id: "calendar", label: "Calendar", detail: "Appointment requests or bookings in a connected scheduling system." },
      { id: "social", label: "Social platforms", detail: "Approved posts published through connected scheduling tools." },
      { id: "db", label: "Common database", detail: "Structured records — for example invoices — in one shared database." },
      { id: "notify", label: "Team notifications", detail: "Email, chat or dashboard alerts so your team knows what needs attention." },
    ],
  },
];

/** The route each service takes through the architecture. */
const routes: Record<ServiceId, Record<ColumnId, string[]>> = {
  social: { inputs: ["brief"], ai: ["generate"], process: ["review", "schedule"], systems: ["social", "notify"] },
  voice: { inputs: ["call"], ai: ["speech", "intent"], process: ["route"], systems: ["calendar", "crm", "notify"] },
  whatsapp: { inputs: ["whatsapp"], ai: ["intent"], process: ["qualify", "route"], systems: ["crm", "notify"] },
  website: { inputs: ["web"], ai: ["intent"], process: ["qualify"], systems: ["crm", "notify"] },
  documents: { inputs: ["docs"], ai: ["ocr"], process: ["validate", "review"], systems: ["db", "notify"] },
};

const allNodes = columns.flatMap((c) => c.nodes);
const servicesUsing = (nodeId: string) =>
  services.filter((s) => Object.values(routes[s.id]).some((ids) => ids.includes(nodeId)));

type Line = { d: string; key: string };

export function ArchitectureExplorer() {
  const [active, setActive] = useState<ServiceId>("documents");
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const route = routes[active];
  const onRoute = (id: string) => Object.values(route).some((ids) => ids.includes(id));

  // Draw connectors between highlighted nodes in adjacent columns (desktop layout only).
  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap || !window.matchMedia("(min-width: 1024px)").matches) {
      setLines([]);
      return;
    }
    const box = wrap.getBoundingClientRect();
    const next: Line[] = [];
    for (let c = 0; c < columns.length - 1; c++) {
      for (const a of route[columns[c].id]) {
        for (const b of route[columns[c + 1].id]) {
          const ra = nodeRefs.current[a]?.getBoundingClientRect();
          const rb = nodeRefs.current[b]?.getBoundingClientRect();
          if (!ra || !rb) continue;
          const x1 = ra.right - box.left;
          const y1 = ra.top + ra.height / 2 - box.top;
          const x2 = rb.left - box.left;
          const y2 = rb.top + rb.height / 2 - box.top;
          const mid = (x1 + x2) / 2;
          next.push({ key: `${a}-${b}`, d: `M${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}` });
        }
      }
    }
    setLines(next);
  }, [route]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [measure]);

  const node = selectedNode ? allNodes.find((n) => n.id === selectedNode) : null;
  const service = serviceById[active];

  return (
    <div>
      {/* Service selector */}
      <div role="group" aria-label="Choose a service to highlight its route" className="flex flex-wrap gap-2">
        {services.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={active === s.id}
            onClick={() => {
              setActive(s.id);
              setSelectedNode(null);
            }}
            className={`inline-flex min-h-11 items-center gap-2 rounded-md border px-4 text-sm font-medium transition-colors duration-(--dur-fast) ${
              active === s.id
                ? "border-white bg-white text-navy"
                : "border-white/25 text-on-navy-muted hover:border-white/60 hover:text-white"
            }`}
          >
            <s.icon aria-hidden className="size-4" />
            {s.shortName}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_300px] lg:gap-8">
        <div ref={wrapRef} className="bg-blueprint-navy relative rounded-lg border border-navy-line p-4 sm:p-6">
          <svg aria-hidden className="pointer-events-none absolute inset-0 size-full overflow-visible">
            {lines.map((l) => (
              <g key={l.key}>
                <path d={l.d} fill="none" stroke="rgb(143 176 255 / 0.35)" strokeWidth="1.5" />
                <path d={l.d} fill="none" stroke="#8fb0ff" strokeWidth="1.75" className="flow" />
              </g>
            ))}
          </svg>
          <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {columns.map((col, ci) => (
              <div key={col.id}>
                <p className="text-eyebrow mb-3 flex items-center gap-2 text-on-navy-muted">
                  <span className="font-mono text-[#8fb0ff]">0{ci + 1}</span> {col.title}
                </p>
                <ul className="flex flex-col gap-2">
                  {col.nodes.map((n) => {
                    const lit = onRoute(n.id);
                    const sel = selectedNode === n.id;
                    return (
                      <li key={n.id}>
                        <button
                          ref={(el) => {
                            nodeRefs.current[n.id] = el;
                          }}
                          type="button"
                          aria-pressed={sel}
                          onClick={() => setSelectedNode(sel ? null : n.id)}
                          className={`flex min-h-11 w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-[13.5px] transition-[background-color,border-color,color,opacity] duration-(--dur-base) ${
                            sel
                              ? "border-[#8fb0ff] bg-[#8fb0ff] font-medium text-navy"
                              : lit
                                ? "border-white/70 bg-white font-medium text-navy"
                                : "border-white/12 bg-white/[0.03] text-on-navy-muted opacity-70 hover:opacity-100"
                          }`}
                        >
                          <span aria-hidden className={`size-1.5 shrink-0 rounded-full ${lit || sel ? "bg-blue" : "bg-white/30"}`} />
                          {n.label}
                          {lit && <span className="sr-only"> (part of the {service.name} route)</span>}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <aside aria-live="polite" className="rounded-lg border border-navy-line bg-white/[0.04] p-5 sm:p-6">
          {node ? (
            <>
              <p className="text-eyebrow text-[#8fb0ff]">Selected step</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{node.label}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-on-navy-muted">{node.detail}</p>
              <p className="mt-5 text-[13px] text-on-navy-muted">Used by</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {servicesUsing(node.id).map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setActive(s.id);
                        setSelectedNode(null);
                      }}
                      className="min-h-9 rounded-sm border border-white/25 px-2.5 text-[13px] text-white hover:border-white"
                    >
                      {s.shortName}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <p className="text-eyebrow text-[#8fb0ff]">Route</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{service.name}</h3>
              <ol className="mt-4 space-y-2">
                {columns.map((col) => (
                  <li key={col.id} className="flex items-start gap-2 text-[14px] text-on-navy-muted">
                    <ArrowRight aria-hidden className="mt-0.5 size-4 shrink-0 text-[#8fb0ff]" />
                    <span>
                      <span className="text-white">{col.title}:</span>{" "}
                      {route[col.id].map((id) => allNodes.find((n) => n.id === id)?.label).join(", ")}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-[13px] text-on-navy-muted">Select any step in the diagram for details.</p>
            </>
          )}
        </aside>
      </div>

      <p className="mt-5 flex items-start gap-2 text-[13px] text-on-navy-muted">
        <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
        Illustrative representation of possible automation architectures. Actual components and
        integrations are defined for each project.
      </p>
    </div>
  );
}
