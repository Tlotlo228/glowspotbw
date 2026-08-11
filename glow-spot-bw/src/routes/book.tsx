import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import {
  CheckCircle2,
  Copy,
  ExternalLink,
  MessageCircle,
  Clock,
  Plus,
  X,
  CalendarDays,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

import {
  ALL_SERVICES,
  PAYMENT_DETAILS,
  WHATSAPP_NUMBER,
  DEPOSIT_AMOUNT,
  AFTER_HOURS_FEE,
  CALENDAR_URL,
  formatMinutes,
} from "@/lib/site-data";

const search = z.object({
  service: z.string().optional(),
});

export const Route = createFileRoute("/book")({
  validateSearch: search,

  head: () => ({
    meta: [
      { title: "Book Now — Glow Spot BW" },
      {
        name: "description",
        content:
          "Book your nails, pedicure, makeup or wig appointment at Glow Spot BW Gaborone. A BWP 100 deposit secures your slot.",
      },
      {
        property: "og:title",
        content: "Book Now — Glow Spot BW",
      },
      {
        property: "og:url",
        content: "/book",
      },
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

const HOURS_TEXT =
  "Tue–Sat 09:00–18:00 · Sun 11:00–17:00 · Mon closed";

function Book() {
  const { service } = Route.useSearch();

  const initialId = useMemo(
    () =>
      (ALL_SERVICES.find((s) => s.id === service) ?? ALL_SERVICES[0]).id,
    [service],
  );

  const [selectedIds, setSelectedIds] = useState<string[]>([initialId]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [calendarLive, setCalendarLive] = useState(false);

  // NEW FLOW:
  // 1 = Calendar
  // 2 = Services
  // 3 = Deposit
  // 4 = Details
  // 5 = WhatsApp
  const [currentStep, setCurrentStep] = useState(1);

  const selectedServices = useMemo(
    () =>
      selectedIds
        .map((id) => ALL_SERVICES.find((s) => s.id === id)!)
        .filter(Boolean),
    [selectedIds],
  );

  const totalMinutes = selectedServices.reduce(
    (n, s) => n + s.minutes,
    0,
  );

  const totalPrice = selectedServices.reduce(
    (n, s) => n + s.price,
    0,
  );

  function toggleService(id: string) {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.length === 1
          ? prev
          : prev.filter((x) => x !== id);
      }

      return [...prev, id];
    });
  }

  const deposit = DEPOSIT_AMOUNT;

  const summary = useMemo(() => {
    const lines: string[] = [];

    lines.push(
      "Hello Glow Spot BW! I'd like to book:",
      "",
    );

    lines.push("Services:");

    for (const s of selectedServices) {
      lines.push(
        `• ${s.name} — ${
          s.priceLabel ?? `BWP ${s.price}`
        } (${s.duration ?? formatMinutes(s.minutes)})`,
      );
    }

    lines.push(
      `Total: BWP ${totalPrice} · ${formatMinutes(totalMinutes)}`,
    );

    lines.push("");

    lines.push(`Name: ${name || "—"}`);
    lines.push(`Phone: ${phone || "—"}`);
    lines.push(`Notes: ${notes || "—"}`);
    lines.push(`Deposit paid: BWP ${deposit}`);

    lines.push("");

    lines.push(
      `Hours: ${HOURS_TEXT}. Bookings outside these hours add BWP ${AFTER_HOURS_FEE}.`,
    );

    lines.push(
      "I have selected my appointment slot on the booking calendar.",
    );

    lines.push(
      "I will attach my proof of payment as a screenshot in this chat.",
    );

    return lines.join("\n");
  }, [
    selectedServices,
    totalMinutes,
    totalPrice,
    name,
    phone,
    notes,
    deposit,
  ]);

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    summary,
  )}`;

  function goNext() {
    setCurrentStep((step) => Math.min(step + 1, 5));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function goBack() {
    setCurrentStep((step) => Math.max(step - 1, 1));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      {/* HEADER */}
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Reserve
        </p>

        <h1 className="mt-2 font-display text-4xl text-primary sm:text-5xl">
          Book your glow
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Choose your appointment slot first, then select your services,
          pay your deposit, provide your details and confirm through
          WhatsApp.
        </p>

        <p className="mx-auto mt-3 inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-secondary/60 px-4 py-1.5 text-xs text-primary/80">
          <Clock className="h-3.5 w-3.5" />
          {HOURS_TEXT}
        </p>
      </header>

      {/* PROGRESS */}
      <div className="mt-8 grid grid-cols-5 gap-1 sm:gap-2">
        {[
          { number: 1, label: "Slot" },
          { number: 2, label: "Services" },
          { number: 3, label: "Deposit" },
          { number: 4, label: "Details" },
          { number: 5, label: "WhatsApp" },
        ].map((step) => (
          <button
            key={step.number}
            type="button"
            onClick={() => {
              if (step.number <= currentStep) {
                setCurrentStep(step.number);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }
            }}
            disabled={step.number > currentStep}
            className={`rounded-xl px-1 py-2 text-center transition ${
              currentStep === step.number
                ? "bg-primary text-primary-foreground"
                : step.number < currentStep
                  ? "bg-primary/10 text-primary"
                  : "bg-secondary/60 text-muted-foreground"
            }`}
          >
            <span className="block text-xs font-bold">
              {step.number}
            </span>
            <span className="mt-0.5 block text-[10px] sm:text-xs">
              {step.label}
            </span>
          </button>
        ))}
      </div>

      {/* STEP 1 — CALENDAR */}
      {currentStep === 1 && (
        <section className="mt-10">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />

            <h2 className="font-display text-xl text-primary">
              Step 1 — Pick your booking slot
            </h2>
          </div>

          <p className="mt-1 text-xs text-muted-foreground">
            Choose your preferred date and time first. Mondays are
            closed and unavailable slots are hidden automatically.
          </p>

          <div className="mt-4 rounded-2xl border border-border bg-background shadow-soft">
            <div className="relative">
              <iframe
                title="Glow Spot BW booking calendar"
                src={CALENDAR_URL}
                style={{ border: 0 }}
                width="100%"
                height="600"
                loading="lazy"
                className={`block h-[520px] w-full rounded-t-2xl sm:h-[700px] ${
                  calendarLive
                    ? ""
                    : "pointer-events-none select-none"
                }`}
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
                    We disable the calendar by default so the page
                    scrolls smoothly. Tap once to book.
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
                  Lock calendar
                </button>
              ) : (
                <span className="text-muted-foreground">
                  Calendar locked — page scrolls freely.
                </span>
              )}

              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary underline-offset-2 hover:underline"
              >
                Open calendar in new tab
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm text-primary">
            <p className="font-medium">
              Already selected your date and time?
            </p>

            <p className="mt-1 text-primary/80">
              Continue below to choose every service you need for
              your appointment.
            </p>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-base font-medium text-primary-foreground shadow-soft"
            >
              Continue to services
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      )}

      {/* STEP 2 — SERVICES */}
      {currentStep === 2 && (
        <section className="mt-10">
          <h2 className="font-display text-xl text-primary">
            Step 2 — Choose your service(s)
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Pick every service you need for this appointment so we
            can reserve enough time.
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
                    chosen
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground">
                      {s.name}
                    </p>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {formatMinutes(s.minutes)} · {s.description}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="font-display text-base text-primary">
                      {s.priceLabel ?? `P${s.price}`}
                    </p>

                    <span
                      className={`mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full ${
                        chosen
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-primary"
                      }`}
                    >
                      {chosen ? (
                        <X className="h-3.5 w-3.5" />
                      ) : (
                        <Plus className="h-3.5 w-3.5" />
                      )}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between rounded-xl bg-secondary/60 px-4 py-3 text-sm text-primary">
            <span>
              {selectedServices.length} selected ·{" "}
              {formatMinutes(totalMinutes)}
            </span>

            <span className="font-display text-lg">
              BWP {totalPrice}
            </span>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 px-6 py-3 text-sm text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-base font-medium text-primary-foreground shadow-soft"
            >
              Continue to deposit
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      )}

      {/* STEP 3 — DEPOSIT */}
      {currentStep === 3 && (
        <section className="mt-10">
          <h2 className="font-display text-xl text-primary">
            Step 3 — Pay your BWP {DEPOSIT_AMOUNT} deposit
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            A flat BWP {DEPOSIT_AMOUNT} deposit is required before
            your booking can be confirmed. The balance is paid at
            the studio.
          </p>

          <div className="mt-3 rounded-2xl p-5 glass shadow-soft">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Deposit
              </p>

              <p className="font-display text-2xl text-primary">
                BWP {deposit}
              </p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <PayCard
                title="Orange Money"
                lines={[
                  `Name: ${PAYMENT_DETAILS.orangeMoney.name}`,
                  `Number: ${PAYMENT_DETAILS.orangeMoney.number}`,
                ]}
                copyText={
                  PAYMENT_DETAILS.orangeMoney.number
                }
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
              Use your full name as reference. The balance is paid at
              the studio on the day.
            </p>
          </div>

          <div className="mt-4 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm text-primary">
            <p className="font-medium">
              Important payment instruction
            </p>

            <p className="mt-1 text-primary/80">
              Send your payment screenshot or receipt directly on
              WhatsApp during the final confirmation step.
            </p>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 px-6 py-3 text-sm text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-base font-medium text-primary-foreground shadow-soft"
            >
              Continue to details
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      )}

      {/* STEP 4 — DETAILS */}
      {currentStep === 4 && (
        <section className="mt-10">
          <h2 className="font-display text-xl text-primary">
            Step 4 — Your details
          </h2>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Field
              label="Full name"
              id="n"
              value={name}
              onChange={setName}
              placeholder="Lesego Mokoena"
            />

            <Field
              label="WhatsApp number"
              id="p"
              value={phone}
              onChange={setPhone}
              placeholder="+267 71 234 567"
              type="tel"
            />
          </div>

          <div className="mt-4 rounded-xl border border-border bg-secondary/50 p-3 text-xs text-muted-foreground">
            Your appointment date and time were selected in Step 1.
            Slots outside {HOURS_TEXT} add BWP{" "}
            {AFTER_HOURS_FEE}.
          </div>

          <div className="mt-3">
            <label
              htmlFor="notes"
              className="text-sm font-medium text-foreground"
            >
              Inspiration / notes (optional)
            </label>

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
            <p className="font-display text-base text-primary">
              📎 Send your proof of payment on WhatsApp
            </p>

            <p className="mt-1 text-muted-foreground">
              Do <strong>not</strong> upload proof here — send your
              payment screenshot or receipt directly in the WhatsApp
              chat in the next step. Bookings without proof of
              deposit will not be confirmed.
            </p>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 px-6 py-3 text-sm text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-base font-medium text-primary-foreground shadow-soft"
            >
              Review WhatsApp message
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      )}

      {/* STEP 5 — WHATSAPP */}
      {currentStep === 5 && (
        <section className="mt-10">
          <h2 className="font-display text-xl text-primary">
            Step 5 — Send on WhatsApp
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Your booking summary is ready. Tap the button below to
            open WhatsApp, then attach your payment screenshot before
            sending the message.
          </p>

          <div className="mt-4 rounded-2xl border border-border bg-secondary/50 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
              Booking summary
            </p>

            <pre className="whitespace-pre-wrap text-xs text-foreground/80">
              {summary}
            </pre>
          </div>

          <div className="mt-5 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm text-primary">
            <p className="font-medium">
              Before you send:
            </p>

            <ol className="mt-2 list-inside list-decimal space-y-1 text-primary/80">
              <li>Tap Send on WhatsApp.</li>
              <li>Attach your payment screenshot.</li>
              <li>Send the message.</li>
              <li>Wait for Glow Spot BW to confirm your booking.</li>
            </ol>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-base font-medium text-primary-foreground shadow-soft"
            >
              <MessageCircle className="h-5 w-5" />
              Send on WhatsApp
            </a>

            <button
              type="button"
              onClick={() => doCopy(summary)}
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-3 text-sm text-primary"
            >
              <Copy className="h-4 w-4" />
              Copy summary
            </button>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 px-6 py-3 text-sm text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-base font-medium text-primary-foreground shadow-soft"
            >
              <CheckCircle2 className="h-4 w-4" />
              Confirm booking on WhatsApp
            </a>
          </div>
        </section>
      )}

      {/* BOOKING SUMMARY */}
      <section className="mt-10 rounded-2xl border border-border bg-card p-5 shadow-soft">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-lg text-primary">
            Booking summary
          </h2>

          <span className="rounded-full bg-secondary px-3 py-1 text-xs text-primary">
            Step {currentStep} of 5
          </span>
        </div>

        <div className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">
              Services
            </span>

            <span className="text-right font-medium text-foreground">
              {selectedServices.length}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">
              Total duration
            </span>

            <span className="font-medium text-foreground">
              {formatMinutes(totalMinutes)}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">
              Total
            </span>

            <span className="font-display text-lg text-primary">
              BWP {totalPrice}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">
              Deposit
            </span>

            <span className="font-medium text-foreground">
              BWP {deposit}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">
              Balance at studio
            </span>

            <span className="font-medium text-foreground">
              BWP {Math.max(totalPrice - deposit, 0)}
            </span>
          </div>
        </div>
      </section>

      {/* CANCELLATION */}
      <section className="mt-12 rounded-2xl border border-border bg-secondary/30 p-5 text-sm text-muted-foreground">
        <h3 className="font-display text-lg text-primary">
          Cancellation & reminders
        </h3>

        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>Deposits are non-refundable.</li>
          <li>
            Rescheduling is allowed with sufficient notice (24h+).
          </li>
          <li>Late cancellations may forfeit the deposit.</li>
          <li>
            We send a friendly WhatsApp reminder 24 hours before
            your appointment.
          </li>
          <li>
            Appointments outside operating hours add BWP{" "}
            {AFTER_HOURS_FEE}.
          </li>
        </ul>
      </section>
    </div>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-sm font-medium text-foreground"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-border bg-card p-3 text-base"
      />
    </div>
  );
}

function PayCard({
  title,
  lines,
  copyText,
}: {
  title: string;
  lines: string[];
  copyText: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-background/60 p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-base text-primary">
          {title}
        </h3>

        <button
          type="button"
          onClick={() => {
            doCopy(copyText);
            setCopied(true);

            setTimeout(() => {
              setCopied(false);
            }, 1500);
          }}
          className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
        >
          <Copy className="h-3 w-3" />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <ul className="mt-2 space-y-1 text-sm text-foreground/80">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </div>
  );
}
