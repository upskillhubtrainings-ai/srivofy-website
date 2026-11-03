"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, CalendarCheck, CheckCircle2, ChevronDown, Loader2, X } from "lucide-react";
import { bookHash, bookingDaysAhead, bookingEndpoint, bookingSlots, bookingTopics } from "@/config/booking";
import { siteConfig, whatsappHref } from "@/config/site";
import { trackLead } from "./Analytics";

type Fields = {
  name: string;
  phone: string;
  email: string;
  business: string;
  topic: string;
  date: string;
  time: string;
  note: string;
  /** Honeypot — real visitors never see or fill this. */
  website: string;
};
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const empty: Fields = { name: "", phone: "", email: "", business: "", topic: "", date: "", time: "", note: "", website: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9 ()-]{7,20}$/;
const order: (keyof Fields)[] = ["name", "phone", "email", "topic", "date", "time"];

/** "YYYY-MM-DD" for a date in India time, `offset` days from today. */
function istDay(offset: number): string {
  const now = new Date(Date.now() + 5.5 * 3600_000);
  now.setUTCDate(now.getUTCDate() + offset);
  return now.toISOString().slice(0, 10);
}

const isSunday = (ymd: string) => new Date(`${ymd}T00:00:00Z`).getUTCDay() === 0;

function validate(v: Fields, min: string, max: string): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!PHONE_RE.test(v.phone.trim())) e.phone = "Enter your phone number with country code, like +91 98765 43210.";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Enter a valid email address, like name@company.com.";
  if (!v.topic) e.topic = "Choose what you'd like to talk about.";
  if (!v.date) e.date = "Choose a date.";
  else if (v.date < min || v.date > max) e.date = `Choose a date in the next ${bookingDaysAhead} days.`;
  else if (isSunday(v.date)) e.date = "We're closed on Sundays. Please choose Monday to Saturday.";
  if (!v.time) e.time = "Choose a time.";
  return e;
}

/** The visitor's local time for an IST slot, shown only when they aren't in India time. */
function localHint(date: string, time: string): string | null {
  if (!date || !time) return null;
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (tz === "Asia/Kolkata" || tz === "Asia/Calcutta") return null;
  const at = new Date(`${date}T${time}:00+05:30`);
  return `That's ${at.toLocaleString(undefined, { weekday: "short", hour: "numeric", minute: "2-digit" })} your time.`;
}

const input =
  "w-full rounded-md border bg-white px-3.5 text-[15px] text-ink placeholder:text-muted/80 transition-[border-color,box-shadow] duration-(--dur-fast) outline-none focus:border-blue focus:shadow-[0_0_0_3px_rgb(36_85_214/0.15)]";

/**
 * Booking popup for the free 15-minute automation check. Opens for any link to
 * "#book" (every "Book Free Consultation" button) and emails the request to
 * the Srivofy inbox through public/api/book.php.
 */
export function BookingDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");
  const [range, setRange] = useState({ min: "", max: "" });

  const open = useCallback(() => {
    setRange({ min: istDay(1), max: istDay(bookingDaysAhead) });
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
  }, []);

  useEffect(() => {
    // Any "#book" link opens the popup instead of jumping.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      if (href === bookHash || href.endsWith(`/${bookHash}`)) {
        e.preventDefault();
        open();
      }
    };
    document.addEventListener("click", onClick);
    if (window.location.hash === bookHash) open();
    const onHash = () => window.location.hash === bookHash && open();
    window.addEventListener("hashchange", onHash);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHash);
    };
  }, [open]);

  const close = () => {
    dialogRef.current?.close();
    if (window.location.hash === bookHash) history.replaceState(null, "", window.location.pathname + window.location.search);
    if (status === "sent") {
      setStatus("idle");
      setValues(empty);
    }
  };

  const set =
    (k: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const next = { ...values, [k]: e.target.value };
      setValues(next);
      if (status === "error") setStatus("idle");
      if (errors[k]) setErrors((er) => ({ ...er, [k]: validate(next, range.min, range.max)[k] }));
    };

  const hint = useMemo(() => localHint(values.date, values.time), [values.date, values.time]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values, range.min, range.max);
    setErrors(found);
    const first = order.find((k) => found[k]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(bookingEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...values, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !data?.ok) {
        setServerMsg(data?.error ?? "");
        throw new Error("send failed");
      }
      trackLead(`Free consultation: ${values.topic}`);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p id={`bk-${k}-error`} className="mt-1.5 flex items-center gap-1.5 text-[13px] text-danger">
        <AlertCircle aria-hidden className="size-4 shrink-0" />
        {errors[k]}
      </p>
    ) : null;
  const border = (k: keyof Fields) => (errors[k] ? "border-danger" : "border-line-strong hover:border-muted");
  const aria = (k: keyof Fields) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `bk-${k}-error` : undefined });
  const label = (k: keyof Fields, text: string, required = true) => (
    <label htmlFor={`bk-${k}`} className="mb-1.5 block text-[14px] font-medium text-navy">
      {text} {required ? <span className="text-danger" aria-hidden>*</span> : <span className="font-normal text-muted">(optional)</span>}
    </label>
  );
  const wa = whatsappHref();

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="bk-title"
      onClose={close}
      onClick={(e) => e.target === dialogRef.current && close()}
      className="m-auto w-[min(640px,calc(100%-2rem))] max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-lg border border-line bg-white p-0 text-ink shadow-[0_24px_64px_rgb(16_29_54/0.28)] backdrop:bg-navy/60"
    >
      <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-white px-6 py-5 sm:px-8">
        <div className="flex items-start gap-3">
          <CalendarCheck aria-hidden className="mt-1 size-6 shrink-0 text-blue" />
          <div>
            <h2 id="bk-title" className="text-h3 text-navy">Book a free 15-minute consultation</h2>
            <p className="mt-1 text-[14px] text-muted">Tell us when suits you. We&apos;ll confirm by email or WhatsApp.</p>
          </div>
        </div>
        <button type="button" onClick={close} aria-label="Close" className="grid size-10 shrink-0 place-items-center rounded-md text-muted hover:bg-paper hover:text-navy">
          <X aria-hidden className="size-5" />
        </button>
      </div>

      {status === "sent" ? (
        <div role="status" className="px-6 py-10 sm:px-8">
          <CheckCircle2 aria-hidden className="size-10 text-success" />
          <h3 className="text-h3 mt-5 text-navy">Request received. Thank you!</h3>
          <p className="mt-2 text-[16px] text-muted">
            We&apos;ll confirm your slot on{" "}
            {new Date(`${values.date}T00:00:00Z`).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" })} at{" "}
            {values.time} IST by email or WhatsApp, usually within one working day.
          </p>
          <button type="button" onClick={close} className="mt-6 text-sm font-medium text-blue hover:text-blue-700">Close</button>
        </div>
      ) : (
        <form ref={formRef} noValidate onSubmit={onSubmit} className="grid gap-5 px-6 py-6 sm:grid-cols-2 sm:px-8">
          <div>
            {label("name", "Name")}
            <input id="bk-name" name="name" autoComplete="name" value={values.name} onChange={set("name")} {...aria("name")} className={`${input} h-12 ${border("name")}`} />
            {err("name")}
          </div>
          <div>
            {label("phone", "Phone / WhatsApp")}
            <input id="bk-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98765 43210" value={values.phone} onChange={set("phone")} {...aria("phone")} className={`${input} h-12 ${border("phone")}`} />
            {err("phone")}
          </div>
          <div>
            {label("email", "Email")}
            <input id="bk-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="name@company.com" value={values.email} onChange={set("email")} {...aria("email")} className={`${input} h-12 ${border("email")}`} />
            {err("email")}
          </div>
          <div>
            {label("business", "Business name", false)}
            <input id="bk-business" name="business" autoComplete="organization" value={values.business} onChange={set("business")} className={`${input} h-12 ${border("business")}`} />
          </div>
          <div className="sm:col-span-2">
            {label("topic", "What would you like to talk about?")}
            <div className="relative">
              <select id="bk-topic" name="topic" value={values.topic} onChange={set("topic")} {...aria("topic")} className={`${input} h-12 appearance-none pr-10 ${border("topic")} ${values.topic ? "" : "text-muted"}`}>
                <option value="" disabled>Select a topic</option>
                {bookingTopics.map((t) => <option key={t} value={t} className="text-ink">{t}</option>)}
              </select>
              <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted" />
            </div>
            {err("topic")}
          </div>
          <div>
            {label("date", "Date (Mon–Sat)")}
            <input id="bk-date" name="date" type="date" min={range.min} max={range.max} value={values.date} onChange={set("date")} {...aria("date")} className={`${input} h-12 ${border("date")}`} />
            {err("date")}
          </div>
          <div>
            {label("time", "Time (India time, IST)")}
            <div className="relative">
              <select id="bk-time" name="time" value={values.time} onChange={set("time")} {...aria("time")} className={`${input} h-12 appearance-none pr-10 ${border("time")} ${values.time ? "" : "text-muted"}`}>
                <option value="" disabled>Select a time</option>
                {bookingSlots.map((s) => {
                  const [h, m] = s.split(":").map(Number);
                  const lbl = `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
                  return <option key={s} value={s} className="text-ink">{lbl}</option>;
                })}
              </select>
              <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted" />
            </div>
            {err("time")}
            {hint && <p className="mt-1.5 text-[13px] text-muted">{hint}</p>}
          </div>
          <div className="sm:col-span-2">
            {label("note", "Anything we should know?", false)}
            <textarea id="bk-note" name="note" rows={3} value={values.note} onChange={set("note")} placeholder="e.g. We miss WhatsApp enquiries after 8 PM" className={`${input} resize-y py-3 ${border("note")}`} />
          </div>
          {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>Website <input tabIndex={-1} autoComplete="off" name="website" value={values.website} onChange={set("website")} /></label>
          </div>

          {status === "error" && (
            <p role="alert" className="flex gap-2 rounded-md border border-danger/30 bg-[#fff4f4] px-3.5 py-3 text-[14px] text-danger sm:col-span-2">
              <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
              <span>
                {serverMsg || "Your request couldn't be sent."} You can also email {siteConfig.email}
                {wa ? <> or <a href={wa} className="underline" target="_blank" rel="noopener noreferrer">message us on WhatsApp</a></> : null}.
              </span>
            </p>
          )}

          <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] text-muted">Free, no obligation. We only use your details to arrange this call.</p>
            <button type="submit" disabled={status === "sending"} className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-blue px-6 text-[15px] font-medium text-white hover:bg-blue-700 disabled:opacity-70">
              {status === "sending" ? <Loader2 aria-hidden className="size-4 animate-spin" /> : <CalendarCheck aria-hidden className="size-4" />}
              {status === "sending" ? "Booking…" : "Book my free consultation"}
            </button>
          </div>
        </form>
      )}
    </dialog>
  );
}
