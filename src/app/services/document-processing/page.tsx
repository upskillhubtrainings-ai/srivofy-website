import { AlertTriangle, ArrowRight, FileImage, FileText, KeyRound, ListChecks, Receipt, RefreshCcw, ScanLine, ShieldCheck, Trash2, UserCheck } from "lucide-react";
import { InvoiceDemo } from "@/components/documents/InvoiceDemo";
import {
  CapabilityGrid,
  RelatedServices,
  ServiceHero,
  serviceMetadata,
  UseCaseList,
  WorkflowSection,
} from "@/components/service/ServiceBlocks";
import { CtaBand } from "@/components/shared/CtaBand";
import { FaqList } from "@/components/shared/FaqList";
import { DemoLink } from "@/components/ui/DemoLink";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeader } from "@/components/ui/Section";
import { DatabaseArchitecture, InvoicePipelineMini } from "@/components/visuals/ServiceVisuals";
import { serviceById } from "@/config/services";

const service = serviceById.documents;
export const metadata = serviceMetadata(service);

const outcome = ["PDFs and images", "Extracted invoice data", "Validation", "Common database"];

const docTypes = [
  { icon: FileText, title: "PDF invoices", note: "Text is read directly when the PDF contains it." },
  { icon: ScanLine, title: "Scanned invoice PDFs", note: "OCR converts the scanned image into text." },
  { icon: FileImage, title: "Invoice images and photographs", note: "OCR for photos; quality affects results." },
  { icon: Receipt, title: "Receipts", note: "Merchant, date, totals and tax where present." },
  { icon: ListChecks, title: "Purchase orders", note: "Order numbers, items and quantities." },
  { icon: FileText, title: "Business forms", note: "Fields mapped to your own structure." },
];

/** Example invoice schema. Fields are configurable per project. */
const schema = [
  { field: "supplier_name", label: "Supplier name", example: "Northwind Office Supplies", req: "Required" },
  { field: "supplier_identifier", label: "Supplier identifier", example: "36ABCDE1234F1Z5", req: "Where available" },
  { field: "invoice_number", label: "Invoice number", example: "INV-2026-0142", req: "Required" },
  { field: "invoice_date", label: "Invoice date", example: "2026-03-12", req: "Required" },
  { field: "due_date", label: "Due date", example: "2026-04-11", req: "Where available" },
  { field: "purchase_order", label: "Purchase order number", example: "PO-7781", req: "Where available" },
  { field: "subtotal", label: "Subtotal", example: "15,636.00", req: "Required" },
  { field: "tax_amount", label: "Tax amount", example: "2,814.48", req: "Where available" },
  { field: "total_amount", label: "Total amount", example: "18,450.48", req: "Required" },
  { field: "currency", label: "Currency", example: "INR", req: "Required" },
  { field: "line_items", label: "Line items", example: "2 items", req: "If required" },
  { field: "processing_status", label: "Processing status", example: "validated", req: "System" },
  { field: "source_document", label: "Source document reference", example: "invoice_0142.pdf", req: "System" },
];

const destinations = ["PostgreSQL", "MySQL", "Supabase", "Airtable", "Google Sheets", "CRM or ERP systems", "REST APIs"];

const safety = [
  { icon: ListChecks, title: "Configurable validation rules", text: "Required fields, formats, totals and your own business rules." },
  { icon: RefreshCcw, title: "Duplicate checks", text: "Repeated invoice numbers or supplier/amount pairs are flagged." },
  { icon: UserCheck, title: "Human review", text: "Uncertain or missing values go to a reviewer before they are stored." },
  { icon: AlertTriangle, title: "Error handling", text: "Failed files are tracked with a reason, not silently dropped." },
  { icon: KeyRound, title: "Access controls", text: "Who can view, review and export records is defined for the deployed system." },
  { icon: Trash2, title: "Retention and deletion", text: "How long files and records are kept is set by your agreed policy." },
];

export default function DocumentProcessingPage() {
  return (
    <>
      <ServiceHero service={service} visual={<InvoicePipelineMini />} />

      {/* Core outcome */}
      <section aria-label="Core outcome" className="on-navy bg-navy text-white">
        <div className="container-page py-12 sm:py-14">
          <p className="text-eyebrow text-[#8fb0ff]">The outcome</p>
          <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {outcome.map((o, i) => (
              <li key={o} className="flex items-center gap-3">
                <span className="flex flex-1 items-center gap-3 rounded-md border border-navy-line bg-white/5 px-4 py-4">
                  <span className="font-mono text-sm text-[#8fb0ff]">0{i + 1}</span>
                  <span className="text-[17px] font-semibold">{o}</span>
                </span>
                {i < outcome.length - 1 && <ArrowRight aria-hidden className="hidden size-5 shrink-0 text-on-navy-muted lg:block" />}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Document types */}
      <Section labelledBy="types-title">
        <SectionHeader
          id="types-title"
          eyebrow="Document types"
          title="Invoices first — and the documents around them."
          intro="Invoice processing is the primary use case. The same pipeline can be extended to other supported business documents."
        />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {docTypes.map((d, i) => (
            <Reveal as="li" key={d.title} delay={(i % 3) * 70} className="flex gap-4 bg-white p-6">
              <d.icon aria-hidden className="mt-0.5 size-5 shrink-0 text-blue" />
              <div>
                <h3 className="text-[16px] font-semibold text-navy">{d.title}</h3>
                <p className="mt-1 text-[14px] text-muted">{d.note}</p>
              </div>
            </Reveal>
          ))}
        </ul>
        <p className="mt-5 max-w-3xl text-[14px] text-muted">
          OCR may be required for scanned PDFs and images. Actual format support depends on the
          implementation and on document quality — low-resolution, skewed or handwritten files may
          need human review.
        </p>
      </Section>

      <CapabilityGrid service={service} title="Nine capabilities, one pipeline" />

      {/* Schema */}
      <Section labelledBy="schema-title">
        <SectionHeader
          id="schema-title"
          eyebrow="Invoice data fields"
          title="An example invoice schema"
          intro="Fields are configured for each project. Not every invoice contains every field — optional fields are stored only when found."
        />
        <div className="mt-12 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[640px] text-left text-[14px]">
            <thead className="bg-paper font-mono text-[11px] tracking-wide text-muted uppercase">
              <tr>
                <th scope="col" className="px-5 py-3 font-medium">Field</th>
                <th scope="col" className="px-5 py-3 font-medium">Column</th>
                <th scope="col" className="px-5 py-3 font-medium">Example</th>
                <th scope="col" className="px-5 py-3 font-medium">Presence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {schema.map((r) => (
                <tr key={r.field} className="hover:bg-paper/60">
                  <th scope="row" className="px-5 py-3 font-medium text-navy">{r.label}</th>
                  <td className="px-5 py-3 font-mono text-[12.5px] text-muted">{r.field}</td>
                  <td className="px-5 py-3 text-ink">{r.example}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-sm px-2 py-0.5 text-[12px] font-medium ${r.req === "Required" ? "bg-blue-50 text-blue" : "bg-paper text-muted"}`}>
                      {r.req}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <WorkflowSection
        service={service}
        tone="paper"
        columns={4}
        title="The processing workflow"
        intro="Seven steps from incoming file to a tracked, validated record."
      />

      {/* Database architecture */}
      <Section labelledBy="db-title">
        <SectionHeader
          id="db-title"
          eyebrow="Database architecture"
          title="Many files in. One structured database out."
          intro="Instead of data staying locked inside individual PDFs and photos, every processed invoice becomes a row in a common database your reporting and business applications can use."
        />
        <div className="mt-12">
          <DatabaseArchitecture />
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <h3 className="text-h3 text-navy">Possible integration destinations</h3>
          <div>
            <ul className="flex flex-wrap gap-2">
              {destinations.map((d) => (
                <li key={d} className="rounded-md border border-line bg-white px-3.5 py-2 text-[14px] text-ink">{d}</li>
              ))}
            </ul>
            <p className="mt-4 text-[14px] text-muted">
              These are possible targets chosen per project — not existing connections. The architecture
              is designed so a production integration can be added without changing the workflow.
            </p>
          </div>
        </div>
      </Section>

      {/* Interactive demo */}
      <section id="demo" aria-labelledby="demo-title" className="scroll-mt-24 border-y border-line bg-paper py-20 sm:py-24">
        <div className="container-page">
          <SectionHeader
            id="demo-title"
            eyebrow="Interactive demo"
            title="See Invoice Data Processing in Action"
            intro="Run the sample to watch a fictional invoice move from source file to extracted fields to a database-ready record."
          />
          <div className="mt-12">
            <InvoiceDemo />
          </div>
          <div className="mt-8 flex flex-col gap-4 border-t border-line pt-8 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-xl text-[14px] text-muted">
              Want to see a full walkthrough? An external demo will be linked here.
            </p>
            <DemoLink demoKey={service.demo.key} label={service.demo.button} />
          </div>
        </div>
      </section>

      {/* Safety */}
      <Section labelledBy="safety-title">
        <SectionHeader
          id="safety-title"
          eyebrow="Data safety and accuracy"
          title="Built to catch problems, not hide them."
          intro="No extraction system is perfect. Ours is designed so uncertain data is checked before it is used. We do not claim certifications or compliance without evidence."
        />
        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
          {safety.map((s, i) => (
            <Reveal as="li" key={s.title} delay={(i % 3) * 80} className="border-t border-line pt-6">
              <s.icon aria-hidden className="size-5 text-blue" />
              <h3 className="mt-4 text-[17px] font-semibold text-navy">{s.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{s.text}</p>
            </Reveal>
          ))}
        </ul>
        <p className="mt-10 flex items-center gap-2 text-[14px] text-muted">
          <ShieldCheck aria-hidden className="size-4 text-blue" />
          Security and data-handling requirements are agreed before any production deployment.
        </p>
      </Section>

      <UseCaseList service={service} />
      <FaqList items={service.faqs} tone="paper" />
      <RelatedServices current={service.id} />
      <CtaBand headline={service.ctaHeadline} primary={service.ctaButton} />
    </>
  );
}
