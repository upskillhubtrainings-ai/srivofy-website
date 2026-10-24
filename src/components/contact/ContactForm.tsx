"use client";

import { useRef, useState } from "react";
import { AlertCircle, CheckCircle2, ChevronDown, Info, Loader2, Send } from "lucide-react";
import { mailHref, siteConfig } from "@/config/site";
import { serviceOptions } from "@/config/services";

type Fields = {
  name: string;
  email: string;
  company: string;
  service: string;
  challenge: string;
  message: string;
  /** Honeypot — real visitors never see or fill this. */
  website: string;
};
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "sending" | "sent" | "error" | "not-configured";

const empty: Fields = { name: "", email: "", company: "", service: "", challenge: "", message: "", website: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const order: (keyof Fields)[] = ["name", "email", "company", "service", "challenge", "message"];

function validate(v: Fields): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your business email.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Enter a valid email address, like name@company.com.";
  if (!v.service) e.service = "Choose the service you're interested in.";
  if (v.message.trim().length < 10) e.message = "Please add a short message (at least 10 characters).";
  if (v.message.length > 4000) e.message = "Please keep your message under 4,000 characters.";
  return e;
}

const input =
  "w-full rounded-md border bg-white px-3.5 text-[15px] text-ink placeholder:text-muted/80 transition-[border-color,box-shadow] duration-(--dur-fast) outline-none focus:border-blue focus:shadow-[0_0_0_3px_rgb(36_85_214/0.15)]";

export function ContactForm() {
  const endpoint = siteConfig.contactFormEndpoint.trim();
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const set =
    (k: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const next = { ...values, [k]: e.target.value };
      setValues(next);
      if (status === "error" || status === "not-configured") setStatus("idle");
      if (touched[k]) setErrors((er) => ({ ...er, [k]: validate(next)[k] }));
    };
  const blur = (k: keyof Fields) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors((er) => ({ ...er, [k]: validate(values)[k] }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched(Object.fromEntries(order.map((k) => [k, true])));
    const first = order.find((k) => found[k]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (!endpoint) {
      setStatus("not-configured");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !data?.ok) {
        setServerMsg(data?.error ?? "");
        throw new Error("send failed");
      }
      setStatus("sent");
      setValues(empty);
      setTouched({});
    } catch {
      setStatus("error");
    }
  }

  const describedBy = (k: keyof Fields, extra?: string) =>
    [errors[k] ? `${k}-error` : "", extra ?? ""].filter(Boolean).join(" ") || undefined;
  const border = (k: keyof Fields) => (errors[k] ? "border-danger" : "border-line-strong hover:border-muted");
  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-1.5 flex items-center gap-1.5 text-[13px] text-danger">
        <AlertCircle aria-hidden className="size-4 shrink-0" />
        {errors[k]}
      </p>
    ) : null;
  const label = (k: keyof Fields, text: string, required = true) => (
    <label htmlFor={k} className="mb-1.5 block text-[14px] font-medium text-navy">
      {text} {required ? <span className="text-danger" aria-hidden>*</span> : <span className="font-normal text-muted">(optional)</span>}
    </label>
  );

  if (status === "sent") {
    return (
      <div role="status" className="rounded-lg border border-line bg-white p-8 sm:p-10">
        <CheckCircle2 aria-hidden className="size-10 text-success" />
        <h2 className="text-h3 mt-5 text-navy">Thank you — your message was sent.</h2>
        <p className="mt-2 text-[16px] text-muted">We&apos;ll reply to the email address you provided.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-sm font-medium text-blue hover:text-blue-700">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-labelledby="form-title" className="rounded-lg border border-line bg-white p-6 sm:p-8">
      <h2 id="form-title" className="text-h3 text-navy">Request a consultation</h2>
      <p className="mt-1.5 text-[15px] text-muted">Tell us about your business and what you&apos;d like to improve.</p>

      {!endpoint && (
        <p className="mt-5 flex gap-2 rounded-md border border-[#f6dfbd] bg-[#fff8ee] px-3.5 py-3 text-[14px] text-warning">
          <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
          This form is not connected to a mail service yet, so messages cannot be sent. Please email{" "}
          <a href={mailHref} className="underline">{siteConfig.email}</a>.
        </p>
      )}

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          {label("name", "Name")}
          <input id="name" name="name" autoComplete="name" value={values.name} onChange={set("name")} onBlur={blur("name")}
            aria-invalid={!!errors.name} aria-describedby={describedBy("name")} className={`${input} h-12 ${border("name")}`} />
          {err("name")}
        </div>
        <div>
          {label("email", "Business email")}
          <input id="email" name="email" type="email" inputMode="email" autoComplete="email" value={values.email} onChange={set("email")} onBlur={blur("email")}
            aria-invalid={!!errors.email} aria-describedby={describedBy("email")} className={`${input} h-12 ${border("email")}`} placeholder="name@company.com" />
          {err("email")}
        </div>
        <div>
          {label("company", "Company", false)}
          <input id="company" name="company" autoComplete="organization" value={values.company} onChange={set("company")} className={`${input} h-12 ${border("company")}`} />
        </div>
        <div>
          {label("service", "Service of interest")}
          <div className="relative">
            <select id="service" name="service" value={values.service} onChange={set("service")} onBlur={blur("service")}
              aria-invalid={!!errors.service} aria-describedby={describedBy("service")}
              className={`${input} h-12 appearance-none pr-10 ${border("service")} ${values.service ? "" : "text-muted"}`}>
              <option value="" disabled>Select a service</option>
              {serviceOptions.map((o) => (
                <option key={o} value={o} className="text-ink">{o}</option>
              ))}
            </select>
            <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted" />
          </div>
          {err("service")}
        </div>
        <div className="sm:col-span-2">
          {label("challenge", "Current challenge", false)}
          <input id="challenge" name="challenge" value={values.challenge} onChange={set("challenge")}
            className={`${input} h-12 ${border("challenge")}`} placeholder="e.g. We miss calls during busy hours" />
        </div>
        <div className="sm:col-span-2">
          {label("message", "Message")}
          <textarea id="message" name="message" rows={5} value={values.message} onChange={set("message")} onBlur={blur("message")}
            aria-invalid={!!errors.message} aria-describedby={describedBy("message")} className={`${input} resize-y py-3 ${border("message")}`} />
          {err("message")}
        </div>
        {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} />
        </div>
      </div>

      <div className="mt-7 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-muted">
          <span className="text-danger" aria-hidden>*</span> Required. Your details are used only to reply to your enquiry.
        </p>
        <button type="submit" disabled={status === "sending"}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-blue px-6 text-[15px] font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-70">
          {status === "sending" ? <Loader2 aria-hidden className="size-4 animate-spin" /> : <Send aria-hidden className="size-4" />}
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
      </div>

      <div role="status" aria-live="polite">
        {status === "error" && (
          <p className="mt-5 flex gap-2 rounded-md border border-[#f2c9c5] bg-[#fdf1f0] px-3.5 py-3 text-[14px] text-danger">
            <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
            <span>
              Your message was not sent{serverMsg ? `: ${serverMsg}` : "."} Please try again, or email{" "}
              <a href={mailHref} className="underline">{siteConfig.email}</a>.
              {process.env.NODE_ENV === "development" && (
                <span className="mt-1 block font-mono text-[12px]">
                  [dev] The PHP mailer only runs on the deployed Hostinger site, not in `npm run dev`.
                </span>
              )}
            </span>
          </p>
        )}
        {status === "not-configured" && (
          <p className="mt-5 flex gap-2 rounded-md border border-[#f6dfbd] bg-[#fff8ee] px-3.5 py-3 text-[14px] text-warning">
            <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
            Your details look good, but the form isn&apos;t connected yet, so nothing was sent.
          </p>
        )}
      </div>
    </form>
  );
}
