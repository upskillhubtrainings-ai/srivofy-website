import {
  ArrowRight,
  CalendarDays,
  Check,
  CheckCheck,
  CircleDot,
  Clock3,
  Database,
  FileImage,
  FileText,
  Lock,
  PhoneIncoming,
  Send,
  TableProperties,
  UserRound,
} from "lucide-react";

/** Small "illustrative" tag shown on every sample visual. */
export function SampleTag({ children = "Illustrative example" }: { children?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm border border-line bg-white px-2 py-0.5 font-mono text-[10.5px] tracking-wide text-muted uppercase">
      <CircleDot aria-hidden className="size-3" />
      {children}
    </span>
  );
}

const frame = "rounded-lg border border-line bg-white shadow-[0_1px_2px_rgb(16_29_54/0.05),0_12px_32px_-20px_rgb(16_29_54/0.25)]";

/* ───────────── Social: content pipeline ───────────── */
const pipeline = [
  { label: "Draft", tone: "bg-paper text-muted" },
  { label: "Review", tone: "bg-[#fff4e5] text-warning" },
  { label: "Approved", tone: "bg-[#e7f5ee] text-success" },
  { label: "Scheduled", tone: "bg-blue-50 text-blue" },
  { label: "Published", tone: "bg-navy text-white" },
];

export function ContentPipeline({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`${frame} p-4 sm:p-5`} aria-hidden>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-navy">Content workflow</p>
        <SampleTag />
      </div>
      <ol className="mt-4 grid grid-cols-5 gap-1.5">
        {pipeline.map((p, i) => (
          <li key={p.label} className="flex flex-col items-center gap-2">
            <span className={`grid h-8 w-full place-items-center rounded-sm text-[10px] font-medium sm:text-[11px] ${p.tone}`}>
              {p.label}
            </span>
            <span className={`h-1 w-full rounded-full ${i <= 3 ? "bg-blue" : "bg-line"}`} />
          </li>
        ))}
      </ol>
      {!compact && (
        <div className="mt-5 grid gap-3 sm:grid-cols-[1.2fr_1fr]">
          <div className="rounded-md border border-line p-3">
            <p className="font-mono text-[10.5px] tracking-wide text-muted uppercase">Draft · Instagram</p>
            <p className="mt-2 text-[13px] leading-snug text-ink">
              Three ways to cut response time without adding headcount. Swipe to see the workflow →
            </p>
            <p className="mt-2 text-[12px] text-blue">#automation #smallbusiness</p>
          </div>
          <div className="flex flex-col justify-between gap-3 rounded-md bg-paper p-3">
            <div className="flex items-center gap-2 text-[12.5px] text-ink">
              <span className="grid size-6 place-items-center rounded-full bg-white text-[10px] font-semibold text-navy ring-1 ring-line">AK</span>
              Reviewer approved
              <Check className="ml-auto size-4 text-success" />
            </div>
            <div className="flex items-center gap-2 text-[12.5px] text-ink">
              <Clock3 className="size-4 text-blue" /> Scheduled · Thu 10:00
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ───────────── Social: calendar demo ───────────── */
const week = [
  { day: "Mon", posts: [{ t: "Product tip", s: "Published" }] },
  { day: "Tue", posts: [{ t: "Case explainer", s: "Scheduled" }, { t: "Story poll", s: "Scheduled" }] },
  { day: "Wed", posts: [{ t: "Team update", s: "In review" }] },
  { day: "Thu", posts: [{ t: "FAQ carousel", s: "Approved" }] },
  { day: "Fri", posts: [{ t: "Offer reminder", s: "Draft" }, { t: "Weekend hours", s: "Draft" }] },
  { day: "Sat", posts: [] },
  { day: "Sun", posts: [{ t: "Week recap", s: "Draft" }] },
];
const statusTone: Record<string, string> = {
  Published: "border-navy bg-navy text-white",
  Scheduled: "border-blue-100 bg-blue-50 text-blue",
  Approved: "border-[#cfe9db] bg-[#e7f5ee] text-success",
  "In review": "border-[#f6dfbd] bg-[#fff4e5] text-warning",
  Draft: "border-line bg-paper text-muted",
};

export function ContentCalendar() {
  return (
    <div className={`${frame} overflow-hidden`} aria-hidden>
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <p className="flex items-center gap-2 text-sm font-medium text-navy">
          <CalendarDays className="size-4 text-blue" /> Content calendar · Week 14
        </p>
        <SampleTag />
      </div>
      <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4 lg:grid-cols-7">
        {week.map((d) => (
          <div key={d.day} className="min-h-28 bg-white p-2.5">
            <p className="font-mono text-[11px] tracking-wide text-muted uppercase">{d.day}</p>
            <ul className="mt-2 space-y-1.5">
              {d.posts.map((p) => (
                <li key={p.t} className={`rounded-sm border px-2 py-1.5 ${statusTone[p.s]}`}>
                  <p className="text-[11.5px] leading-tight font-medium">{p.t}</p>
                  <p className="mt-0.5 text-[10px] opacity-80">{p.s}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────── Voice: console + call summary ───────────── */
export function Waveform({ bars = 44, className = "h-12" }: { bars?: number; className?: string }) {
  return (
    <div className={`flex min-w-0 items-center gap-[2px] overflow-hidden sm:gap-[3px] ${className}`} aria-hidden>
      {Array.from({ length: bars }, (_, i) => {
        const t = i / (bars - 1);
        const env = 0.3 + 0.7 * Math.sin(Math.PI * t);
        const jitter = 0.65 + 0.35 * Math.abs(Math.sin(i * 12.9898));
        return (
          <span
            key={i}
            className="wave-bar w-[3px] shrink rounded-full bg-blue"
            style={{
              height: `${Math.round(env * jitter * 100)}%`,
              animationDelay: `${-((i * 137) % 1400)}ms`,
              opacity: 0.45 + 0.55 * env,
            }}
          />
        );
      })}
    </div>
  );
}

const transcript = [
  { who: "Agent", text: "Thank you for calling [Your Business]. How can I help you today?" },
  { who: "Caller", text: "Hi, I'd like to book a consultation for next week." },
  { who: "Agent", text: "Of course. May I have your name and the best number to reach you?" },
  { who: "Caller", text: "It's Priya, on this number is fine." },
];

export function VoiceConsole() {
  return (
    <div className={`${frame} @container overflow-hidden`} aria-hidden>
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <p className="flex items-center gap-2 text-sm font-medium text-navy">
          <PhoneIncoming className="size-4 text-blue" /> Virtual Receptionist
        </p>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-success">
          <span className="relative flex size-2">
            <span className="pulse-dot absolute inline-flex size-full rounded-full bg-success" />
            <span className="relative inline-flex size-2 rounded-full bg-success" />
          </span>
          IN CALL · 00:42
        </span>
      </div>
      <div className="grid grid-cols-1 @xl:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col justify-between gap-6 border-b border-line bg-paper p-5 @xl:border-r @xl:border-b-0">
          <div>
            <p className="font-mono text-[11px] tracking-wide text-muted uppercase">Live audio</p>
            <Waveform className="mt-4 h-14" />
          </div>
          <dl className="grid grid-cols-2 gap-3 text-[12.5px]">
            <div><dt className="text-muted">Intent</dt><dd className="font-medium text-navy">Book consultation</dd></div>
            <div><dt className="text-muted">Language</dt><dd className="font-medium text-navy">English</dd></div>
            <div><dt className="text-muted">Escalation</dt><dd className="font-medium text-navy">Not needed</dd></div>
            <div><dt className="text-muted">Next step</dt><dd className="font-medium text-navy">Create request</dd></div>
          </dl>
        </div>
        <ol className="space-y-3 p-5">
          <li className="font-mono text-[11px] tracking-wide text-muted uppercase">Sample transcript</li>
          {transcript.map((l, i) => (
            <li key={i} className="flex gap-3 text-[13px] leading-snug">
              <span className={`w-12 shrink-0 font-mono text-[11px] uppercase ${l.who === "Agent" ? "text-blue" : "text-muted"}`}>{l.who}</span>
              <span className={l.who === "Agent" ? "text-ink" : "text-muted"}>{l.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function CallSummaryCard() {
  return (
    <div className={`${frame} p-5`} aria-hidden>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-navy">Call summary</p>
        <SampleTag />
      </div>
      <dl className="mt-4 divide-y divide-line border-y border-line text-[13px]">
        {[
          ["Caller", "Priya S."],
          ["Reason", "New consultation request"],
          ["Preferred time", "Next week, mornings"],
          ["Routed to", "Front desk team"],
          ["Status", "Request created"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 py-2.5">
            <dt className="text-muted">{k}</dt>
            <dd className="text-right font-medium text-navy">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 flex items-center gap-3 rounded-md bg-paper p-3">
        <Waveform bars={24} className="h-6 flex-1" />
        <span className="font-mono text-[11px] text-muted">02:18</span>
      </div>
    </div>
  );
}

/* ───────────── WhatsApp: conversation + lead panel ───────────── */
const chat = [
  { from: "c", text: "Hi, do you offer weekend appointments?", time: "10:02" },
  { from: "a", text: "Hello! Yes — Saturday mornings are available. What service are you interested in?", time: "10:02" },
  { from: "c", text: "Skin consultation, for 2 people.", time: "10:03" },
  { from: "a", text: "Thanks. May I have your name? I'll pass your request to the team to confirm a slot.", time: "10:03" },
  { from: "c", text: "Ravi Kumar.", time: "10:04" },
];

export function ChatConversation({ showLead = true }: { showLead?: boolean }) {
  return (
    <div className={`grid gap-4 ${showLead ? "lg:grid-cols-[1.25fr_1fr]" : ""}`} aria-hidden>
      <div className={`${frame} overflow-hidden`}>
        <div className="flex items-center gap-3 border-b border-line bg-[#f0f2f5] px-4 py-3">
          <span className="grid size-9 place-items-center rounded-full bg-[#1f9d55] text-xs font-semibold text-white">AI</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink">[Your Business] Assistant</p>
            <p className="text-[11px] text-[#1f9d55]">online</p>
          </div>
          <SampleTag>Example chat</SampleTag>
        </div>
        <div className="flex flex-col gap-2 bg-[#efeae2] p-4">
          {chat.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] rounded-md px-3 py-2 text-[13px] leading-snug shadow-[0_1px_0_rgb(0_0_0/0.06)] ${
                m.from === "c" ? "self-end bg-[#d9fdd3] text-ink" : "self-start bg-white text-ink"
              }`}
            >
              {m.text}
              <span className="ml-2 inline-flex translate-y-0.5 items-center gap-0.5 text-[10px] text-muted">
                {m.time}
                {m.from === "c" && <CheckCheck className="size-3 text-[#3497f9]" />}
              </span>
            </div>
          ))}
          <div className="typing flex w-fit gap-1 self-start rounded-md bg-white px-3 py-2.5">
            <span className="size-1.5 rounded-full bg-muted" />
            <span className="size-1.5 rounded-full bg-muted" />
            <span className="size-1.5 rounded-full bg-muted" />
          </div>
        </div>
      </div>
      {showLead && <LeadSummary />}
    </div>
  );
}

export function LeadSummary() {
  return (
    <div className={`${frame} flex flex-col p-5`} aria-hidden>
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm font-medium text-navy">
          <UserRound className="size-4 text-blue" /> Lead summary
        </p>
        <span className="rounded-sm bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue">Qualified</span>
      </div>
      <dl className="mt-4 divide-y divide-line border-y border-line text-[13px]">
        {[
          ["Name", "Ravi Kumar"],
          ["Channel", "WhatsApp"],
          ["Interest", "Skin consultation"],
          ["Group size", "2 people"],
          ["Preferred time", "Saturday morning"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 py-2.5">
            <dt className="text-muted">{k}</dt>
            <dd className="text-right font-medium text-navy">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-auto pt-4">
        <p className="font-mono text-[11px] tracking-wide text-muted uppercase">Next action</p>
        <p className="mt-1.5 flex items-center gap-2 text-[13px] font-medium text-navy">
          <Send className="size-4 text-blue" /> Notify front desk to confirm slot
        </p>
      </div>
    </div>
  );
}

/* ───────────── Website: browser + phone mockups ───────────── */
function MockSite({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex h-full flex-col ${compact ? "gap-2 p-3" : "gap-3 p-5"}`}>
      <div className="flex items-center justify-between">
        <span className="h-2.5 w-14 rounded-sm bg-navy" />
        {!compact && (
          <span className="flex gap-3">
            {[0, 1, 2, 3].map((i) => <span key={i} className="h-1.5 w-8 rounded-full bg-line-strong" />)}
          </span>
        )}
      </div>
      <div className={`grid ${compact ? "mt-3 gap-2" : "mt-6 grid-cols-[1.2fr_1fr] items-center gap-5"}`}>
        <div className="flex flex-col gap-2">
          <span className={`h-3.5 rounded-sm bg-navy ${compact ? "w-11/12" : "w-11/12"}`} />
          <span className={`h-3.5 rounded-sm bg-navy ${compact ? "w-3/4" : "w-2/3"}`} />
          <span className="mt-1 h-1.5 w-full rounded-full bg-line-strong" />
          <span className="h-1.5 w-4/5 rounded-full bg-line-strong" />
          <span className="mt-2 flex gap-2">
            <span className="h-6 w-20 rounded-sm bg-blue" />
            <span className="h-6 w-16 rounded-sm border border-line-strong" />
          </span>
        </div>
        {!compact && <div className="bg-blueprint aspect-[4/3] rounded-md border border-line bg-paper" />}
      </div>
      <div className={`mt-auto grid gap-2 ${compact ? "grid-cols-1" : "grid-cols-3"}`}>
        {Array.from({ length: compact ? 2 : 3 }, (_, i) => (
          <div key={i} className="rounded-sm border border-line p-2">
            <span className="block size-3 rounded-sm bg-blue-100" />
            <span className="mt-2 block h-1.5 w-4/5 rounded-full bg-line-strong" />
            <span className="mt-1 block h-1.5 w-3/5 rounded-full bg-line" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function BrowserMockups({ placeholder = false }: { placeholder?: boolean }) {
  return (
    <div className="relative pr-0 pb-0 sm:pr-16 sm:pb-8" aria-hidden>
      <div className={`${frame} overflow-hidden`}>
        <div className="flex items-center gap-2 border-b border-line bg-paper px-3 py-2.5">
          <span className="flex gap-1.5">
            {[0, 1, 2].map((i) => <span key={i} className="size-2.5 rounded-full bg-line-strong" />)}
          </span>
          <span className="mx-auto flex items-center gap-1.5 rounded-sm bg-white px-3 py-1 font-mono text-[11px] text-muted ring-1 ring-line">
            <Lock className="size-3" /> {placeholder ? "your-project.com" : "www.example-business.com"}
          </span>
        </div>
        <div className="relative aspect-[16/10]">
          <MockSite />
          {placeholder && (
            <div className="absolute inset-0 grid place-items-center bg-white/75 backdrop-blur-[2px]">
              <p className="rounded-md border border-line bg-white px-4 py-2 text-sm font-medium text-navy">Project showcase coming soon</p>
            </div>
          )}
        </div>
      </div>
      <div className="absolute right-0 bottom-0 hidden w-[130px] overflow-hidden rounded-[18px] border-[5px] border-navy bg-white shadow-[0_20px_40px_-16px_rgb(16_29_54/0.5)] sm:block">
        <div className="mx-auto my-1.5 h-1 w-10 rounded-full bg-line-strong" />
        <div className="aspect-[9/17]">
          <MockSite compact />
        </div>
      </div>
    </div>
  );
}

/* ───────────── Documents: PDF/image → fields → database ───────────── */
export function InvoicePipelineMini({ onNavy = false }: { onNavy?: boolean }) {
  const card = onNavy ? "border-navy-line bg-white/5 text-white" : "border-line bg-white text-navy";
  const sub = onNavy ? "text-on-navy-muted" : "text-muted";
  const icon = onNavy ? "text-[#8fb0ff]" : "text-blue";
  return (
    <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1.2fr_auto_1.3fr]" aria-hidden>
      <div className={`rounded-lg border p-4 ${card}`}>
        <p className={`font-mono text-[11px] tracking-wide uppercase ${sub}`}>Source files</p>
        <ul className="mt-3 space-y-2 text-[13px]">
          <li className="flex items-center gap-2"><FileText className={`size-4 ${icon}`} /> invoice_1042.pdf</li>
          <li className="flex items-center gap-2"><FileImage className={`size-4 ${icon}`} /> receipt_photo.jpg</li>
          <li className="flex items-center gap-2"><FileText className={`size-4 ${icon}`} /> scan_0311.pdf</li>
        </ul>
      </div>
      <ArrowRight className={`hidden size-5 self-center md:block ${sub}`} />
      <div className={`rounded-lg border p-4 ${card}`}>
        <p className={`font-mono text-[11px] tracking-wide uppercase ${sub}`}>Extracted & validated</p>
        <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[12.5px]">
          <dt className={sub}>Invoice no.</dt><dd className="text-right font-medium">INV-1042</dd>
          <dt className={sub}>Supplier</dt><dd className="text-right font-medium">Acme Supplies</dd>
          <dt className={sub}>Total</dt><dd className="text-right font-medium">₹ 18,450.00</dd>
          <dt className={sub}>Status</dt><dd className={`text-right font-medium ${onNavy ? "text-[#6fd39a]" : "text-success"}`}>Valid</dd>
        </dl>
      </div>
      <ArrowRight className={`hidden size-5 self-center md:block ${sub}`} />
      <div className={`rounded-lg border p-4 ${card}`}>
        <p className={`flex items-center gap-2 font-mono text-[11px] tracking-wide uppercase ${sub}`}>
          <Database className="size-3.5" /> Common database
        </p>
        <table className="mt-3 w-full text-left text-[12px]">
          <thead className={sub}>
            <tr><th className="pb-1.5 font-normal">No.</th><th className="pb-1.5 font-normal">Supplier</th><th className="pb-1.5 text-right font-normal">Total</th></tr>
          </thead>
          <tbody className={`divide-y ${onNavy ? "divide-white/10" : "divide-line"}`}>
            <tr><td className="py-1.5">1040</td><td>Nova Traders</td><td className="text-right">7,200</td></tr>
            <tr><td className="py-1.5">1041</td><td>Delta Office</td><td className="text-right">3,150</td></tr>
            <tr className={onNavy ? "bg-white/10" : "bg-blue-50"}><td className="py-1.5 font-medium">1042</td><td className="font-medium">Acme Supplies</td><td className="text-right font-medium">18,450</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DatabaseArchitecture() {
  const node = "rounded-md border border-line bg-white p-4 text-center";
  return (
    <div className="bg-blueprint rounded-lg border border-line bg-paper p-5 sm:p-8" aria-label="Diagram: invoice PDFs and images flow through a processing pipeline and validation into a common database used by reporting or business applications">
      <div className="grid items-center gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr]">
        <div className={node}>
          <div className="flex justify-center gap-1.5 text-blue"><FileText className="size-5" /><FileImage className="size-5" /></div>
          <p className="mt-2 text-sm font-semibold text-navy">Invoice PDFs / Images</p>
          <p className="mt-1 text-[12px] text-muted">Many files, many layouts</p>
        </div>
        <Arrow />
        <div className={node}>
          <TableProperties className="mx-auto size-5 text-blue" />
          <p className="mt-2 text-sm font-semibold text-navy">Processing pipeline</p>
          <p className="mt-1 text-[12px] text-muted">OCR · extraction · normalization</p>
        </div>
        <Arrow />
        <div className={node}>
          <Check className="mx-auto size-5 text-blue" />
          <p className="mt-2 text-sm font-semibold text-navy">Validation</p>
          <p className="mt-1 text-[12px] text-muted">Rules · duplicates · review</p>
        </div>
        <Arrow />
        <div className="rounded-md border border-navy bg-navy p-4 text-center text-white">
          <Database className="mx-auto size-5 text-[#8fb0ff]" />
          <p className="mt-2 text-sm font-semibold">Common database</p>
          <p className="mt-1 text-[12px] text-on-navy-muted">One structured table</p>
        </div>
        <Arrow />
        <div className={node}>
          <ArrowRight className="mx-auto size-5 -rotate-45 text-blue" />
          <p className="mt-2 text-sm font-semibold text-navy">Reporting / apps</p>
          <p className="mt-1 text-[12px] text-muted">Dashboards, ERP, CRM</p>
        </div>
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <span aria-hidden className="flex justify-center text-line-strong">
      <ArrowRight className="size-5 rotate-90 lg:rotate-0" />
    </span>
  );
}
