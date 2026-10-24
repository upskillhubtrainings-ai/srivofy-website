"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Braces, Check, Database, FileText, Loader2, Play, RotateCcw, Table2 } from "lucide-react";

/** Fictional sample invoice — local data only, nothing is uploaded or stored. */
const invoice = {
  supplier: "Northwind Office Supplies",
  supplierId: "GSTIN 36ABCDE1234F1Z5",
  invoiceNumber: "INV-2026-0142",
  invoiceDate: "2026-03-12",
  dueDate: "2026-04-11",
  poNumber: "PO-7781",
  currency: "INR",
  lines: [
    { description: "A4 copier paper (box of 5)", qty: 12, unit: 845.0 },
    { description: "Toner cartridge, black", qty: 2, unit: 2748.0 },
  ],
  subtotal: 15636.0,
  tax: 2814.48,
  total: 18450.48,
};

const steps = [
  "File received",
  "Text extracted",
  "Fields identified",
  "Validation complete",
  "Record ready for database insertion",
] as const;

const money = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const fields: { key: string; label: string; value: string; confidence: number }[] = [
  { key: "invoice_number", label: "Invoice number", value: invoice.invoiceNumber, confidence: 0.99 },
  { key: "supplier_name", label: "Supplier", value: invoice.supplier, confidence: 0.98 },
  { key: "invoice_date", label: "Invoice date", value: invoice.invoiceDate, confidence: 0.97 },
  { key: "subtotal", label: "Subtotal", value: money(invoice.subtotal), confidence: 0.96 },
  { key: "tax_amount", label: "Tax", value: money(invoice.tax), confidence: 0.95 },
  { key: "total_amount", label: "Total", value: money(invoice.total), confidence: 0.99 },
];

const checks = [
  "Required fields present",
  "Date formats valid",
  "Subtotal + tax = total",
  "No duplicate invoice number",
];

const record = {
  supplier_name: invoice.supplier,
  supplier_identifier: invoice.supplierId.replace("GSTIN ", ""),
  invoice_number: invoice.invoiceNumber,
  invoice_date: invoice.invoiceDate,
  due_date: invoice.dueDate,
  purchase_order: invoice.poNumber,
  subtotal: invoice.subtotal,
  tax_amount: invoice.tax,
  total_amount: invoice.total,
  currency: invoice.currency,
  line_items: invoice.lines.length,
  processing_status: "validated",
  source_document: "sample_invoice_0142.pdf",
};

export function InvoiceDemo() {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(-1); // -1 idle, 0..4 completed step index
  const [running, setRunning] = useState(false);
  const [view, setView] = useState<"table" | "json">("table");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const run = () => {
    timers.current.forEach(clearTimeout);
    setRunning(true);
    setStage(-1);
    const gap = reduce ? 120 : 850;
    steps.forEach((_, i) => {
      timers.current.push(
        setTimeout(() => {
          setStage(i);
          if (i === steps.length - 1) setRunning(false);
        }, gap * (i + 1)),
      );
    });
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    setRunning(false);
    setStage(-1);
  };

  const done = (i: number) => stage >= i;
  const fade = { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: 0.3 } };

  return (
    <div className="rounded-lg border border-line bg-white">
      {/* Controls + status */}
      <div className="flex flex-col gap-5 border-b border-line p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={run}
            disabled={running}
            className="inline-flex h-11 items-center gap-2 rounded-md bg-blue px-5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-70"
          >
            {running ? <Loader2 aria-hidden className="size-4 animate-spin" /> : <Play aria-hidden className="size-4" />}
            {running ? "Processing…" : stage >= 0 ? "Run Again" : "Run Sample Processing"}
          </button>
          {stage >= 0 && !running && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex h-11 items-center gap-2 rounded-md border border-line-strong px-4 text-sm font-medium text-navy hover:border-navy"
            >
              <RotateCcw aria-hidden className="size-4" /> Reset
            </button>
          )}
        </div>
        <ol className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Processing status">
          {steps.map((s, i) => (
            <li key={s} className={`flex items-center gap-2 text-[13px] ${done(i) ? "text-navy" : "text-muted"}`}>
              <span
                className={`grid size-5 place-items-center rounded-full text-[10px] font-semibold transition-colors duration-(--dur-base) ${
                  done(i) ? "bg-success text-white" : stage === i - 1 && running ? "bg-blue-100 text-blue" : "bg-paper text-muted ring-1 ring-line"
                }`}
              >
                {done(i) ? <Check aria-hidden className="size-3" /> : i + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>
      </div>
      <p className="sr-only" aria-live="polite">
        {stage >= 0 ? `Step ${stage + 1} of ${steps.length}: ${steps[stage]}` : ""}
      </p>

      <div className="grid gap-px bg-line lg:grid-cols-3">
        {/* LEFT — source document */}
        <section aria-label="Source document" className="bg-white p-5 sm:p-6">
          <PanelTitle icon={<FileText className="size-4" />} title="Source document" badge={done(0) ? "Received" : "Sample file"} />
          <div className={`relative mt-4 overflow-hidden rounded-md border border-line bg-[#fbfaf7] p-4 font-mono text-[11px] leading-relaxed text-ink transition-shadow duration-500 ${done(0) && !done(1) ? "ring-2 ring-blue/40" : ""}`}>
            {running && stage < 1 && (
              <motion.div
                aria-hidden
                className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-blue/15 to-transparent"
                initial={{ top: "-10%" }}
                animate={{ top: "100%" }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
              />
            )}
            <div className="flex justify-between">
              <div>
                <p className="text-[12px] font-semibold">{invoice.supplier}</p>
                <p className="text-muted">{invoice.supplierId}</p>
              </div>
              <p className="text-[12px] font-semibold tracking-widest">INVOICE</p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-x-3">
              <p><span className="text-muted">No.</span> {invoice.invoiceNumber}</p>
              <p><span className="text-muted">PO</span> {invoice.poNumber}</p>
              <p><span className="text-muted">Date</span> 12/03/2026</p>
              <p><span className="text-muted">Due</span> 11/04/2026</p>
            </div>
            <table className="mt-3 w-full">
              <tbody>
                {invoice.lines.map((l) => (
                  <tr key={l.description} className="border-t border-dashed border-line-strong">
                    <td className="py-1 pr-2">{l.description}</td>
                    <td className="py-1 text-right">{l.qty} × {money(l.unit)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-2 space-y-0.5 border-t border-line-strong pt-2 text-right">
              <p><span className="text-muted">Subtotal</span> {money(invoice.subtotal)}</p>
              <p><span className="text-muted">GST 18%</span> {money(invoice.tax)}</p>
              <p className="text-[12px] font-semibold">Total INR {money(invoice.total)}</p>
            </div>
          </div>
        </section>

        {/* CENTER — extracted fields */}
        <section aria-label="Extracted fields" className="bg-white p-5 sm:p-6">
          <PanelTitle icon={<Table2 className="size-4" />} title="Extracted fields" badge={done(3) ? "Validated" : done(2) ? "Identified" : "Waiting"} />
          <dl className="mt-4 divide-y divide-line rounded-md border border-line">
            {fields.map((f, i) => (
              <div key={f.key} className="flex items-center justify-between gap-3 px-3 py-2.5 text-[13px]">
                <dt className="text-muted">{f.label}</dt>
                <dd className="text-right font-medium text-navy">
                  <AnimatePresence mode="wait">
                    {done(2) ? (
                      <motion.span key="v" {...fade} transition={{ duration: 0.3, delay: reduce ? 0 : i * 0.06 }} className="inline-flex items-center gap-2">
                        {f.value}
                        <span className="font-mono text-[10px] font-normal text-muted">{f.confidence.toFixed(2)}</span>
                      </motion.span>
                    ) : (
                      <motion.span key="e" {...fade} className="inline-block h-2 w-16 rounded-full bg-paper-2" />
                    )}
                  </AnimatePresence>
                </dd>
              </div>
            ))}
          </dl>
          <ul className="mt-4 space-y-1.5" aria-label="Validation checks">
            {checks.map((c) => (
              <li key={c} className={`flex items-center gap-2 text-[13px] transition-colors duration-(--dur-base) ${done(3) ? "text-success" : "text-muted"}`}>
                <Check aria-hidden className={`size-4 ${done(3) ? "" : "opacity-30"}`} />
                {c}
              </li>
            ))}
          </ul>
        </section>

        {/* RIGHT — database record */}
        <section aria-label="Database record" className="bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <PanelTitle icon={<Database className="size-4" />} title="Database record" badge={done(4) ? "Ready to insert" : "Not created"} />
          </div>
          <div role="group" aria-label="Record view" className="mt-4 inline-flex rounded-md border border-line p-0.5">
            {(["table", "json"] as const).map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                onClick={() => setView(v)}
                className={`inline-flex h-8 items-center gap-1.5 rounded-sm px-3 text-[12.5px] font-medium ${view === v ? "bg-navy text-white" : "text-muted hover:text-navy"}`}
              >
                {v === "table" ? <Table2 aria-hidden className="size-3.5" /> : <Braces aria-hidden className="size-3.5" />}
                {v === "table" ? "Table" : "JSON"}
              </button>
            ))}
          </div>
          <div className="mt-3 min-h-[300px] rounded-md border border-line bg-paper">
            <AnimatePresence mode="wait">
              {!done(4) ? (
                <motion.p key="empty" {...fade} className="grid min-h-[300px] place-items-center px-6 text-center text-[13px] text-muted">
                  The normalized record appears here after validation.
                </motion.p>
              ) : view === "table" ? (
                <motion.table key="table" {...fade} className="w-full text-left text-[12.5px]">
                  <tbody className="divide-y divide-line">
                    {Object.entries(record).map(([k, v]) => (
                      <tr key={k}>
                        <th scope="row" className="px-3 py-1.5 font-mono text-[11px] font-normal text-muted">{k}</th>
                        <td className="px-3 py-1.5 text-right font-medium text-navy">{String(v)}</td>
                      </tr>
                    ))}
                  </tbody>
                </motion.table>
              ) : (
                <motion.pre key="json" {...fade} className="overflow-x-auto p-3 font-mono text-[11.5px] leading-relaxed text-navy">
                  {JSON.stringify(record, null, 2)}
                </motion.pre>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>

      <p className="border-t border-line bg-paper px-5 py-3 text-[13px] text-muted sm:px-6">
        Frontend-only demonstration using built-in sample data. No files are uploaded, no documents are
        processed and nothing is written to a database.
      </p>
    </div>
  );
}

function PanelTitle({ icon, title, badge }: { icon: React.ReactNode; title: string; badge: string }) {
  return (
    <div className="flex w-full items-center justify-between gap-3">
      <h3 className="flex items-center gap-2 text-[15px] font-semibold text-navy">
        <span aria-hidden className="text-blue">{icon}</span>
        {title}
      </h3>
      <span className="rounded-sm bg-paper px-2 py-0.5 font-mono text-[10.5px] tracking-wide text-muted uppercase">{badge}</span>
    </div>
  );
}
