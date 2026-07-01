import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { CheckCircle2, Copy, ExternalLink, MessageCircle, Clock, Plus, X } from "lucide-react";
import {
  ALL_SERVICES,
  PAYMENT_DETAILS,
  WHATSAPP_NUMBER,
  DEPOSIT_AMOUNT,
  AFTER_HOURS_FEE,
  CALENDAR_URL,
  formatMinutes,
} from "@/lib/site-data";

const search = z.object({ service: z.string().optional() });

export const Route = createFileRoute("/book")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Book Now — Glow Spot BW" },
      { name: "description", content: "Book your nails, pedicure, makeup or wig appointment at Glow Spot BW Gaborone. A BWP 100 deposit secures your slot." },
      { property: "og:title", content: "Book Now — Glow Spot BW" },
      { property: "og:url", content: "/book" },
    ],
    links: [{ rel: "canonical", href: "/book" }],
  }),
  component: Book,
});

function doCopy(text: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    navigator.clipboard.writeText(text).catch(() => {});
  }
}

const HOURS_TEXT = "Tue–Sat 09:00–18:00 · Sun 11:00–17:00 · Mon closed";

function Book() {
  const { service } = Route.useSearch();
  const initialId = useMemo(
    () => (ALL_SERVICES.find((s) => s.id === service) ?? ALL_SERVICES[0]).id,
    [service],
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([initialId]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [calendarLive, setCalendarLive] = useState(false);

  const selectedServices = useMemo(
    () => selectedIds.map((id) => ALL_SERVICES.find((s) => s.id === id)!).filter(Boolean),
    [selectedIds],
  );
  const totalMinutes = selectedServices.reduce((n, s) => n + s.minutes, 0);
  const totalPrice = selectedServices.reduce((n, s) => n + s.price, 0);

  function toggleService(id: string) {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.length === 1 ? prev : prev.filter((x) => x !== id);
      }
      return [...prev, id];
    });
  }

  const deposit = DEPOSIT_AMOUNT;

  const summary = useMemo(() => {
    const lines: string[] = [];
    lines.push("Hello Glow Spot BW! I'd like to book:", "");
    lines.push("Services:");
    for (const s of selectedServices) {
      lines.push(`• ${s.name} — ${s.priceLabel ?? `BWP ${s.price}`} (${s.duration ?? formatMinutes(s.minutes)})`);
    }
    lines.push(`Total: BWP ${totalPrice} · ${formatMinutes(totalMinutes)}`);
    lines.push("");
    lines.push(`Name: ${name || "—"}`);
    lines.push(`Phone: ${phone || "—"}`);
    lines.push(`Notes: ${notes || "—"}`);
    lines.push(`Deposit paid: BWP ${deposit}`);
    lines.push("");
    lines.push(`Hours: ${HOURS_TEXT}. Bookings outside these hours add BWP ${AFTER_HOURS_FEE}.`);
    lines.push("I will attach my proof of payment as a screenshot in this chat.");
    lines.push("I will pick my slot on the booking calendar next.");
    return lines.join("\n");
  }, [selectedServices, totalMinutes, totalPrice, name, phone, notes, deposit]);

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(summary)}`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Reserve</p>
        <h1 className="mt-2 font-display text-4xl text-primary sm:text-5xl">Book your glow</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          1) Choose your service(s) · 2) Pay P{DEPOSIT_AMOUNT} deposit · 3) Send details on WhatsApp with proof of payment · 4) Pick your slot on the calendar.
        </p>
        <p className="mx-auto mt-3 inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-secondary/60 px-4 py-1.5 text-xs text-primary/80">
          <Clock className="h-3.5 w-3.5" /> {HOURS_TEXT}
        </p>
      </header>

      <section className="mt-10">
        <h2 className="font-display text-xl text-primary">Step 1 — Choose your service(s)</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Pick as many services as you'd like — we'll confirm the full time on WhatsApp.
        </p>
        <div className="mt-3 space-y-2">
          {ALL_SERVICES.map((s) => {
            const chosen = selectedIds.includes(s.id);
            return (
              <button
                type="button"
                key={s.id}
                onClick={() => toggleService(s.id)}
                aria-pressed={chosen}
                className={`flex w-full items-start justify-between gap-3 rounded-xl border p-3 text-left transition ${
                  chosen ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-foreground">{s.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{formatMinutes(s.minutes)} · {s.description}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-display text-base text-primary">{s.priceLabel ?? `P${s.price}`}</p>
                  <span className={`mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full ${chosen ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"}`}>
                    {chosen ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        <div className="mt-3 flex items-center justify-between rounded-xl bg-secondary/60 px-4 py-3 text-sm text-primary">
          <span>{selectedServices.length} selected · {formatMinutes(totalMinutes)}</span>
          <span className="font-display text-lg">BWP {totalPrice}</span>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl text-primary">Step 2 — Pay your BWP {DEPOSIT_AMOUNT} deposit</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          A flat BWP {DEPOSIT_AMOUNT} deposit is required <strong>before</strong> booking your slot. The balance is paid at the studio.
        </p>
        <div className="mt-3 glass shadow-soft rounded-2xl p-5">
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-sm text-muted-foreground">Deposit</p>
            <p className="font-display text-2xl text-primary">BWP {deposit}</p>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <PayCard
              title="Orange Money"
              lines={[`Name: ${PAYMENT_DETAILS.orangeMoney.name}`, `Number: ${PAYMENT_DETAILS.orangeMoney.number}`]}
              copyText={PAYMENT_DETAILS.orangeMoney.number}
            />
            <PayCard
              title="Bank Transfer (FNB Botswana)"
              lines={[
                `Account name: ${PAYMENT_DETAILS.bank.name}`,
                `Account no.: ${PAYMENT_DETAILS.bank.account}`,
                `Branch: ${PAYMENT_DETAILS.bank.branch}`,
              ]}
              copyText={PAYMENT_DETAILS.bank.account}
            />
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Use your full name as reference. The balance is paid at the studio on the day.
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl text-primary">Step 3 — Your details</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Field label="Full name" id="n" value={name} onChange={setName} placeholder="Lesego Mokoena" />
          <Field label="WhatsApp number" id="p" value={phone} onChange={setPhone} placeholder="+267 71 234 567" type="tel" />
        </div>
        <p className="mt-3 rounded-xl border border-border bg-secondary/50 p-3 text-xs text-muted-foreground">
          Pick your exact date & time on the booking calendar in Step 5. Slots outside {HOURS_TEXT} add BWP {AFTER_HOURS_FEE}.
        </p>
        <div className="mt-3">
          <label htmlFor="notes" className="text-sm font-medium text-foreground">Inspiration / notes (optional)</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Tell us the vibe — colours, length, references…"
            className="mt-1 w-full rounded-xl border border-border bg-card p-3 text-base"
          />
        </div>
        <div className="mt-4 rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 p-4 text-sm">
          <p className="font-display text-base text-primary">📎 Send your proof of payment on WhatsApp</p>
          <p className="mt-1 text-muted-foreground">
            Do <strong>not</strong> upload proof here — send your payment screenshot or receipt directly in the WhatsApp chat in Step 4. Bookings without proof of deposit will not be confirmed.
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl text-primary">Step 4 — Send on WhatsApp (with proof of payment)</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Tap the button below — WhatsApp opens with your booking summary already typed. Before sending, <strong>attach your payment screenshot</strong> from your gallery. Then continue to Step 5 to pick your slot.
        </p>
        <pre className="mt-3 whitespace-pre-wrap rounded-2xl bg-secondary/50 p-4 text-xs text-foreground/80">{summary}</pre>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-base font-medium text-primary-foreground shadow-soft"
          >
            <MessageCircle className="h-5 w-5" /> Send on WhatsApp
          </a>
          <button
            type="button"
            onClick={() => doCopy(summary)}
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-3 text-sm text-primary"
          >
            <Copy className="h-4 w-4" /> Copy summary
          </button>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl text-primary">Step 5 — Pick your slot on the calendar</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          After you've sent your WhatsApp message with proof of payment, choose your appointment slot below. Mondays are closed and booked slots are hidden automatically.
        </p>
        <div className="mt-4 rounded-2xl border border-border shadow-soft bg-background">
          <div className="relative">
            <iframe
              title="Glow Spot BW booking calendar"
              src={CALENDAR_URL}
              style={{ border: 0 }}
              width="100%"
              height="600"
              loading="lazy"
              className={`block h-[520px] w-full rounded-t-2xl sm:h-[700px] ${calendarLive ? "" : "pointer-events-none select-none"}`}
            />
            {!calendarLive && (
              <button
                type="button"
                onClick={() => setCalendarLive(true)}
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-t-2xl bg-background/70 text-center backdrop-blur-sm transition hover:bg-background/50"
                aria-label="Activate booking calendar"
              >
                <span className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft">
                  Tap to activate calendar
                </span>
                <span className="max-w-xs text-xs text-muted-foreground">
                  We disable the calendar by default so the page scrolls smoothly. Tap once to book.
                </span>
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-3 text-xs">
            {calendarLive ? (
              <button
                type="button"
                onClick={() => setCalendarLive(false)}
                className="rounded-full bg-secondary px-4 py-1.5 text-primary"
              >
                Lock calendar (resume scrolling)
              </button>
            ) : (
              <span className="text-muted-foreground">Calendar locked — page scrolls freely.</span>
            )}
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary underline-offset-2 hover:underline"
            >
              Open calendar in new tab <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
        <div className="mt-4 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm text-primary">
          <p className="font-medium">After picking your slot:</p>
          <p className="mt-1 text-primary/80">
            Come back and send the WhatsApp summary again (or just reply in the chat) so we can match your booking to your deposit. Appointments outside opening hours add BWP {AFTER_HOURS_FEE}.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-soft"
          >
            <CheckCircle2 className="h-4 w-4" /> Confirm booking on WhatsApp
          </a>
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-border bg-secondary/30 p-5 text-sm text-muted-foreground">
        <h3 className="font-display text-lg text-primary">Cancellation & reminders</h3>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>Deposits are non-refundable.</li>
          <li>Rescheduling is allowed with sufficient notice (24h+).</li>
          <li>Late cancellations may forfeit the deposit.</li>
          <li>We send a friendly WhatsApp reminder 24 hours before your appointment.</li>
          <li>Appointments outside operating hours add BWP {AFTER_HOURS_FEE}.</li>
        </ul>
      </section>
    </div>
  );
}

function Field({ label, id, value, onChange, placeholder, type = "text" }: { label: string; id: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-foreground">{label}</label>
      <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="mt-1 w-full rounded-xl border border-border bg-card p-3 text-base" />
    </div>
  );
}

function PayCard({ title, lines, copyText }: { title: string; lines: string[]; copyText: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-xl border border-border bg-background/60 p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base text-primary">{title}</h3>
        <button
          type="button"
          onClick={() => { doCopy(copyText); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
          className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
        >
          <Copy className="h-3 w-3" /> {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <ul className="mt-2 space-y-1 text-sm text-foreground/80">
        {lines.map((l) => <li key={l}>{l}</li>)}
      </ul>
    </div>
  );
}