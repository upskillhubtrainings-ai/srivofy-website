"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AlertCircle, CheckCircle2, Download, Loader2, X } from "lucide-react";
import { plannerHash, siteConfig } from "@/config/site";
import { trackLead } from "../layout/Analytics";

type Fields = { name: string; phone: string; email: string; website: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "sending" | "sent";

const empty: Fields = { name: "", phone: "", email: "", website: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9 ()-]{7,20}$/;

/** PHP mailer included in this project; it works once deployed to Hostinger. */
const endpoint = "/api/planner.php";

function validate(v: Fields): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!PHONE_RE.test(v.phone.trim())) e.phone = "Enter your WhatsApp number with country code, like +91 98765 43210.";
  if (v.email.trim() && !EMAIL_RE.test(v.email.trim())) e.email = "Enter a valid email address, or leave it empty.";
  return e;
}

function startDownload() {
  const a = document.createElement("a");
  a.href = siteConfig.plannerPdf;
  a.download = "Srivofy-Weekly-Content-Planner.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

const input =
  "w-full rounded-md border bg-white px-3.5 text-[15px] text-ink placeholder:text-muted/80 transition-[border-color,box-shadow] duration-(--dur-fast) outline-none focus:border-blue focus:shadow-[0_0_0_3px_rgb(36_85_214/0.15)]";

/** Button that opens the planner form (mounted once, in the layout). */
export function PlannerButton() {
  const digits = siteConfig.whatsappNumber.replace(/\D/g, "");
  const wa = digits.length >= 8 ? `https://wa.me/${digits}?text=${encodeURIComponent("WEEK: please send me the free weekly content planner")}` : null;
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <a href={plannerHash} className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-blue px-6 text-[15px] font-medium text-white hover:bg-blue-700">
        <Download aria-hidden className="size-4" /> Get the free planner
      </a>
      {wa && (
        <a href={wa} target="_blank" rel="noopener noreferrer" className="text-[15px] font-medium text-blue hover:text-blue-700">
          Or get it on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}

/**
 * Planner popup, opened by any "#planner" link (top bar, planner sections, shared links). Asks for a name and WhatsApp number,
 * emails the lead to the Srivofy inbox (public/api/planner.php), then starts
 * the PDF download. If the email can't be sent, the visitor still gets the PDF.
 */
export function PlannerDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const open = useCallback(() => {
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      const href = a?.getAttribute("href") ?? "";
      if (href === plannerHash || href.endsWith(`/${plannerHash}`)) {
        e.preventDefault();
        open();
      }
      // Top bar link while already on the homepage: just scroll to the section.
      const section = document.getElementById("free-planner");
      if (href === "/#free-planner" && section && window.location.pathname === "/") {
        e.preventDefault();
        history.replaceState(null, "", "/#free-planner");
        section.scrollIntoView({ block: "start", behavior: "instant" });
      }
    };
    document.addEventListener("click", onClick);
    if (window.location.hash === plannerHash) open();
    const onHash = () => window.location.hash === plannerHash && open();
    window.addEventListener("hashchange", onHash);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHash);
    };
  }, [open]);

  // Arriving at /#free-planner from another page (top bar link): the router
  // doesn't scroll to the hash reliably, so bring the planner section into view.
  const pathname = usePathname();
  useEffect(() => {
    // The hash and the new page can land a moment after the route change, and
    // the router may reset the scroll, so retry briefly until the section is in view.
    let tries = 0;
    const t = window.setInterval(() => {
      tries += 1;
      const el = document.getElementById("free-planner");
      if (window.location.hash === "#free-planner" && el) {
        const top = el.getBoundingClientRect().top;
        if (Math.abs(top) > 120) el.scrollIntoView({ block: "start", behavior: "instant" });
        else window.clearInterval(t);
      }
      if (tries > 12) window.clearInterval(t);
    }, 150);
    return () => window.clearInterval(t);
  }, [pathname]);

  const close = () => {
    dialogRef.current?.close();
    if (window.location.hash === plannerHash) history.replaceState(null, "", window.location.pathname + window.location.search);
    if (status === "sent") {
      setStatus("idle");
      setValues(empty);
    }
  };
  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (errors[k]) setErrors((er) => ({ ...er, [k]: validate(next)[k] }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = (["name", "phone", "email"] as const).find((k) => found[k]);
    if (first) {
      dialogRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...values, page: window.location.pathname }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (res.ok && data?.ok) trackLead("Weekly Content Planner");
    } catch {
      // The visitor still gets the planner if the lead email fails.
    }
    startDownload();
    setStatus("sent");
  }

  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p id={`pl-${k}-error`} className="mt-1.5 flex items-center gap-1.5 text-[13px] text-danger">
        <AlertCircle aria-hidden className="size-4 shrink-0" />
        {errors[k]}
      </p>
    ) : null;
  const field = (k: keyof Fields) => ({
    id: `pl-${k}`,
    name: k,
    value: values[k],
    onChange: set(k),
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `pl-${k}-error` : undefined,
    className: `${input} h-12 ${errors[k] ? "border-danger" : "border-line-strong hover:border-muted"}`,
  });

  return (
    <>
      <dialog
        ref={dialogRef}
        aria-labelledby="pl-title"
        onClose={close}
        onClick={(e) => e.target === dialogRef.current && close()}
        className="m-auto w-[min(520px,calc(100%-2rem))] max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-lg border border-line bg-white p-0 text-ink shadow-[0_24px_64px_rgb(16_29_54/0.28)] backdrop:bg-navy/60"
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
          <div>
            <h2 id="pl-title" className="text-h3 text-navy">Get the free Weekly Content Planner</h2>
            <p className="mt-1 text-[14px] text-muted">Tell us where to send tips. The PDF downloads straight away.</p>
          </div>
          <button type="button" onClick={close} aria-label="Close" className="grid size-10 shrink-0 place-items-center rounded-md text-muted hover:bg-paper hover:text-navy">
            <X aria-hidden className="size-5" />
          </button>
        </div>

        {status === "sent" ? (
          <div role="status" className="px-6 py-8">
            <CheckCircle2 aria-hidden className="size-10 text-success" />
            <h3 className="text-h3 mt-4 text-navy">Your planner is downloading.</h3>
            <p className="mt-2 text-[15px] text-muted">
              If it didn&apos;t start,{" "}
              <a href={siteConfig.plannerPdf} download className="font-medium text-blue underline">download it here</a>.
              We may send you a short WhatsApp message to see how it&apos;s going.
            </p>
            <button type="button" onClick={close} className="mt-6 text-sm font-medium text-blue hover:text-blue-700">Close</button>
          </div>
        ) : (
          <form noValidate onSubmit={onSubmit} className="grid gap-5 px-6 py-6">
            <div>
              <label htmlFor="pl-name" className="mb-1.5 block text-[14px] font-medium text-navy">Name <span className="text-danger" aria-hidden>*</span></label>
              <input {...field("name")} autoComplete="name" />
              {err("name")}
            </div>
            <div>
              <label htmlFor="pl-phone" className="mb-1.5 block text-[14px] font-medium text-navy">WhatsApp number <span className="text-danger" aria-hidden>*</span></label>
              <input {...field("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98765 43210" />
              {err("phone")}
            </div>
            <div>
              <label htmlFor="pl-email" className="mb-1.5 block text-[14px] font-medium text-navy">Email <span className="font-normal text-muted">(optional)</span></label>
              <input {...field("email")} type="email" inputMode="email" autoComplete="email" placeholder="name@company.com" />
              {err("email")}
            </div>
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>Website <input tabIndex={-1} autoComplete="off" name="website" value={values.website} onChange={set("website")} /></label>
            </div>
            <button type="submit" disabled={status === "sending"} className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-blue px-6 text-[15px] font-medium text-white hover:bg-blue-700 disabled:opacity-70">
              {status === "sending" ? <Loader2 aria-hidden className="size-4 animate-spin" /> : <Download aria-hidden className="size-4" />}
              {status === "sending" ? "Preparing…" : "Get my free planner"}
            </button>
            <p className="text-[13px] text-muted">Free. We only use your details to send the planner and an occasional tip.</p>
          </form>
        )}
      </dialog>
    </>
  );
}
