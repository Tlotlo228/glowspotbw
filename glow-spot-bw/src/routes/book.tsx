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
  CalendarDays,
  ArrowRight,
  ArrowLeft,
  CalendarClock,
  XCircle,
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
          "Book your appointment at Glow Spot BW Gaborone. Select multiple services, choose your appointment slot, pay your deposit and confirm through WhatsApp.",
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

    links: [
      {
        rel: "canonical",
        href: "/book",
      },
    ],
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
      (
        ALL_SERVICES.find((s) => s.id === service) ??
        ALL_SERVICES[0]
      ).id,
    [service],
  );

  const [selectedIds, setSelectedIds] = useState<string[]>([
    initialId,
  ]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [calendarLive, setCalendarLive] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);

  const selectedServices = useMemo(
    () =>
      selectedIds
        .map((id) =>
          ALL_SERVICES.find((s) => s.id === id),
        )
        .filter(Boolean),
    [selectedIds],
  );

  const totalMinutes = selectedServices.reduce(
    (n, s) => n + s!.minutes,
    0,
  );

  const totalPrice = selectedServices.reduce(
    (n, s) => n + s!.price,
    0,
  );

  const deposit = DEPOSIT_AMOUNT;

  const remainingBalance = Math.max(
    totalPrice - deposit,
    0,
  );

  function toggleService(id: string) {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) {
          return prev;
        }

        return prev.filter((x) => x !== id);
      }

      return [...prev, id];
    });
  }

  const summary = useMemo(() => {
    const lines: string[] = [];

    lines.push(
      "Hello Glow Spot BW! I'd like to book an appointment.",
      "",
    );

    lines.push("SERVICES:");

    for (const s of selectedServices) {
      if (!s) continue;

      lines.push(
        `• ${s.name} — ${
          s.priceLabel ?? `BWP ${s.price}`
        } (${s.duration ?? formatMinutes(s.minutes)})`,
      );
    }

    lines.push("");

    lines.push(`Total: BWP ${totalPrice}`);

    lines.push(
      `Duration: ${formatMinutes(totalMinutes)}`,
    );

    lines.push(`Deposit: BWP ${deposit}`);

    lines.push(
      `Remaining balance: BWP ${remainingBalance}`,
    );

    lines.push("");

    lines.push(`Name: ${name || "—"}`);
    lines.push(`Phone: ${phone || "—"}`);
    lines.push(`Notes: ${notes || "—"}`);

    lines.push("");

    lines.push(
      `Hours: ${HOURS_TEXT}. Appointments outside these hours add BWP ${AFTER_HOURS_FEE}.`,
    );

    lines.push("");

    lines.push(
      "I selected my preferred appointment date and time using the Glow Spot BW booking calendar.",
    );

    lines.push(
      "I will send my proof of payment manually as a screenshot or receipt in this WhatsApp chat.",
    );

    return lines.join("\n");
  }, [
    selectedServices,
    totalMinutes,
    totalPrice,
    deposit,
    remainingBalance,
    name,
    phone,
    notes,
  ]);

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    summary,
  )}`;

  function createWhatsAppLink(message: string) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message,
    )}`;
  }

  const rescheduleMessage = `Hello Glow Spot BW! I'd like to reschedule my appointment.

Please help me move my existing booking to another available date/time.

My details:

Name: ${name || "—"}
Phone: ${phone || "—"}

Current appointment date: 
Current appointment time: 

Preferred new date:
Preferred new time:

I understand that rescheduling is subject to availability and at least 24 hours notice.

Thank you!`;

  const cancellationMessage = `Hello Glow Spot BW! I'd like to cancel my appointment.

My booking details:

Name: ${name || "—"}
Phone: ${phone || "—"}

Appointment date:
Appointment time:

I understand that my deposit is non-refundable and may be forfeited depending on the cancellation notice.

Thank you!`;

  const rescheduleLink =
    createWhatsAppLink(rescheduleMessage);

  const cancellationLink =
    createWhatsAppLink(cancellationMessage);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }

  function goNext() {
    setCurrentStep((step) =>
      Math.min(step + 1, 5),
    );

    requestAnimationFrame(() => {
      scrollToTop();
    });
  }

  function goBack() {
    setCurrentStep((step) =>
      Math.max(step - 1, 1),
    );

    requestAnimationFrame(() => {
      scrollToTop();
    });
  }

  function goToStep(step: number) {
    if (step <= currentStep) {
      setCurrentStep(step);

      requestAnimationFrame(() => {
        scrollToTop();
      });
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Reserve
        </p>

        <h1 className="mt-2 font-display text-4xl text-primary sm:text-5xl">
          Book your glow
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
          Choose your services, select your appointment slot,
          pay your deposit and confirm through WhatsApp.
        </p>

        <p className="mx-auto mt-4 inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-secondary/60 px-4 py-2 text-xs text-primary/80">
          <Clock className="h-3.5 w-3.5" />
          {HOURS_TEXT}
        </p>
      </header>

      {/* ======================================================
          PROGRESS
      ====================================================== */}

      <div className="mt-8 grid grid-cols-5 gap-1 sm:gap-2">
        {[
          { number: 1, label: "Services" },
          { number: 2, label: "Slot" },
          { number: 3, label: "Deposit" },
          { number: 4, label: "Details" },
          { number: 5, label: "WhatsApp" },
        ].map((step) => (
          <button
            key={step.number}
            type="button"
            onClick={() =>
              goToStep(step.number)
            }
            disabled={step.number > currentStep}
            className={`rounded-xl px-1 py-2.5 text-center transition ${
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

      {/* ======================================================
          STEP 1
      ====================================================== */}

      {currentStep === 1 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl text-primary">
            Step 1 — Choose your service(s)
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Select every service you want for the same
            appointment.
          </p>

          <div className="mt-5 space-y-3">
            {ALL_SERVICES.map((s) => {
              const chosen =
                selectedIds.includes(s.id);

              return (
                <button
                  type="button"
                  key={s.id}
                  onClick={() =>
                    toggleService(s.id)
                  }
                  aria-pressed={chosen}
                  className={`flex w-full items-start justify-between gap-4 rounded-2xl border p-4 text-left transition ${
                    chosen
                      ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <div className="flex min-w-0 flex-1 gap-3">
                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                        chosen
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-primary"
                      }`}
                    >
                      {chosen ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>

                    <div className="min-w-0">
                      <p className="font-medium text-foreground">
                        {s.name}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {formatMinutes(s.minutes)} ·{" "}
                        {s.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="font-display text-lg text-primary">
                      {s.priceLabel ??
                        `P${s.price}`}
                    </p>

                    <span className="text-[10px] text-muted-foreground">
                      {formatMinutes(s.minutes)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-5 rounded-2xl bg-secondary/60 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Selected
                </p>

                <p className="mt-1 font-medium text-primary">
                  {selectedServices.length} service
                  {selectedServices.length === 1
                    ? ""
                    : "s"}
                </p>
              </div>

              <div className="text-right">
                <p className="font-display text-xl text-primary">
                  BWP {totalPrice}
                </p>

                <p className="text-xs text-muted-foreground">
                  {formatMinutes(totalMinutes)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-base font-medium text-primary-foreground shadow-soft"
            >
              Continue to booking slot
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      )}

      {/* ======================================================
          STEP 2 — CALENDAR
      ====================================================== */}

      {currentStep === 2 && (
        <section className="mt-10">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />

            <h2 className="font-display text-2xl text-primary">
              Step 2 — Pick your booking slot
            </h2>
          </div>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Choose your preferred date and time using the
            Glow Spot BW booking calendar.
          </p>

          <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/5 p-4">
            <p className="text-xs uppercase tracking-wider text-primary/70">
              Your services
            </p>

            <p className="mt-1 text-sm font-medium text-primary">
              {selectedServices
                .map((s) => s!.name)
                .join(" · ")}
            </p>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-background shadow-soft">
            <div className="relative min-h-[520px] sm:min-h-[700px]">
              <iframe
                title="Glow Spot BW booking calendar"
                src={CALENDAR_URL}
                style={{
                  border: 0,
                  display: "block",
                }}
                width="100%"
                height="700"
                loading="eager"
                className={`block h-[520px] w-full sm:h-[700px] ${
                  calendarLive
                    ? ""
                    : "pointer-events-none select-none"
                }`}
              />

              {!calendarLive && (
                <button
                  type="button"
                  onClick={() =>
                    setCalendarLive(true)
                  }
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/75 px-5 text-center backdrop-blur-sm"
                >
                  <span className="rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-soft">
                    Tap to activate calendar
                  </span>

                  <span className="max-w-xs text-xs leading-5 text-muted-foreground">
                    Activate the calendar to choose your date
                    and appointment time.
                  </span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-3 text-xs">
              <span className="text-muted-foreground">
                Choose your date and time in the calendar.
              </span>

              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary underline-offset-2 hover:underline"
              >
                Open calendar
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm text-primary">
            <p className="font-medium">
              Your services are already selected.
            </p>

            <p className="mt-1 text-primary/80">
              After selecting your preferred appointment
              slot, continue to the deposit instructions.
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
              Continue to deposit
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      )}

      {/* ======================================================
          STEP 3 — DEPOSIT
      ====================================================== */}

      {currentStep === 3 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl text-primary">
            Step 3 — Pay your BWP {DEPOSIT_AMOUNT} deposit
          </h2>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            A BWP {DEPOSIT_AMOUNT} deposit is required before
            your booking can be confirmed.
          </p>

          <div className="mt-5 rounded-2xl p-5 glass shadow-soft">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Deposit required
              </p>

              <p className="font-display text-3xl text-primary">
                BWP {deposit}
              </p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
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
                copyText={
                  PAYMENT_DETAILS.bank.account
                }
              />
            </div>

            <p className="mt-4 text-xs leading-5 text-muted-foreground">
              Use your full name as the payment reference.
              The remaining balance is paid at the studio.
            </p>
          </div>

          <div className="mt-5 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm">
            <p className="font-medium text-primary">
              Payment proof
            </p>

            <p className="mt-1 leading-6 text-primary/80">
              Send your payment screenshot or receipt manually
              through WhatsApp during the final step.
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

      {/* ======================================================
          STEP 4 — DETAILS
      ====================================================== */}

      {currentStep === 4 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl text-primary">
            Step 4 — Your details
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Enter your contact information so Glow Spot BW
            can contact you about your appointment.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field
              label="Full name"
              id="booking-name"
              value={name}
              onChange={setName}
              placeholder="Your full name"
            />

            <Field
              label="WhatsApp number"
              id="booking-phone"
              value={phone}
              onChange={setPhone}
              placeholder="+267 71 234 567"
              type="tel"
            />
          </div>

          <div className="mt-5 rounded-xl border border-border bg-secondary/50 p-4 text-xs leading-5 text-muted-foreground">
            Your preferred appointment date and time were
            selected using the booking calendar in Step 2.
            <br />
            <br />
            Appointments outside {HOURS_TEXT} add BWP{" "}
            {AFTER_HOURS_FEE}.
          </div>

          <div className="mt-5">
            <label
              htmlFor="notes"
              className="text-sm font-medium text-foreground"
            >
              Inspiration / notes
              <span className="ml-1 text-xs text-muted-foreground">
                (optional)
              </span>
            </label>

            <textarea
              id="notes"
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              rows={4}
              placeholder="Tell us the vibe — colours, length, references…"
              className="mt-2 w-full resize-none rounded-xl border border-border bg-card p-3 text-base outline-none focus:border-primary"
            />
          </div>

          <div className="mt-5 rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 p-4 text-sm">
            <p className="font-display text-base text-primary">
              Payment proof is sent manually
            </p>

            <p className="mt-1 leading-6 text-muted-foreground">
              After opening WhatsApp, send your payment
              screenshot or receipt directly in the chat.
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
              disabled={
                !name.trim() ||
                !phone.trim()
              }
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-base font-medium text-primary-foreground shadow-soft disabled:cursor-not-allowed disabled:opacity-50"
            >
              Review WhatsApp
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      )}

      {/* ======================================================
          STEP 5 — WHATSAPP
      ====================================================== */}

      {currentStep === 5 && (
        <section className="mt-10">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <MessageCircle className="h-7 w-7" />
            </div>

            <h2 className="mt-5 font-display text-2xl text-primary">
              Step 5 — Confirm on WhatsApp
            </h2>

            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
              Your booking summary is ready. Open WhatsApp,
              send the message and attach your payment
              screenshot or receipt.
            </p>
          </div>

          <div className="mt-5 rounded-2xl border border-border bg-secondary/50 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
              Booking summary
            </p>

            <pre className="whitespace-pre-wrap text-xs leading-5 text-foreground/80">
              {summary}
            </pre>
          </div>

          <div className="mt-5 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm text-primary">
            <p className="font-medium">
              Before sending your booking:
            </p>

            <ol className="mt-2 list-inside list-decimal space-y-2 text-primary/80">
              <li>
                Tap <strong>Send on WhatsApp</strong>.
              </li>

              <li>
                Attach your payment screenshot or receipt.
              </li>

              <li>
                Send the WhatsApp message.
              </li>

              <li>
                Wait for Glow Spot BW to confirm your
                appointment.
              </li>
            </ol>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-base font-medium text-primary-foreground shadow-soft"
            >
              <MessageCircle className="h-5 w-5" />
              Send on WhatsApp
            </a>

            <button
              type="button"
              onClick={() => doCopy(summary)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 px-5 py-3 text-sm text-primary"
            >
              <Copy className="h-4 w-4" />
              Copy summary
            </button>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/40 px-6 py-3 text-sm text-primary sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          </div>
        </section>
      )}

      {/* ======================================================
          MANAGE EXISTING BOOKING
      ====================================================== */}

      <section className="mt-10">
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
          <div className="flex items-start gap-3">
            <CalendarClock className="mt-0.5 h-6 w-6 shrink-0 text-primary" />

            <div>
              <h2 className="font-display text-xl text-primary">
                Already have a booking?
              </h2>

              <p className="mt-1 text-sm leading-6 text-primary/80">
                Made a mistake or need to change your
                appointment? You can request a reschedule or
                cancellation directly through WhatsApp.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">

            {/* RESCHEDULE */}

            <a
              href={rescheduleLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-primary/20 bg-background p-4 transition hover:border-primary hover:bg-primary/5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CalendarClock className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-medium text-primary">
                    Reschedule booking
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Request another date or time
                  </p>
                </div>
              </div>
            </a>

            {/* CANCEL */}

            <a
              href={cancellationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-border bg-background p-4 transition hover:border-primary hover:bg-primary/5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary">
                  <XCircle className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-medium text-primary">
                    Cancel booking
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Request cancellation through WhatsApp
                  </p>
                </div>
              </div>
            </a>

          </div>

          <div className="mt-4 rounded-xl bg-background/60 p-3 text-xs leading-5 text-muted-foreground">
            <strong className="text-primary">
              Please note:
            </strong>{" "}
            Rescheduling is subject to availability and should
            be requested at least 24 hours before your
            appointment. Deposits are non-refundable.
          </div>
        </div>
      </section>

      {/* ======================================================
          BOOKING SUMMARY
      ====================================================== */}

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

            <span className="font-medium text-foreground">
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
              BWP {remainingBalance}
            </span>
          </div>

        </div>
      </section>

      {/* ======================================================
          POLICIES
      ====================================================== */}

      <section className="mt-10 rounded-2xl border border-border bg-secondary/30 p-5 text-sm text-muted-foreground">
        <h3 className="font-display text-lg text-primary">
          Cancellation & rescheduling
        </h3>

        <ul className="mt-2 list-inside list-disc space-y-2">
          <li>
            Deposits are non-refundable.
          </li>

          <li>
            Rescheduling requests should be made at least
            24 hours before the appointment.
          </li>

          <li>
            Rescheduling is subject to availability.
          </li>

          <li>
            Late cancellations may result in loss of the
            deposit.
          </li>

          <li>
            Booking changes are handled through WhatsApp.
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

/* ============================================================
   FIELD
============================================================ */

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
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-border bg-card p-3 text-base outline-none focus:border-primary"
      />
    </div>
  );
}

/* ============================================================
   PAYMENT CARD
============================================================ */

function PayCard({
  title,
  lines,
  copyText,
}: {
  title: string;
  lines: string[];
  copyText: string;
}) {
  const [copied, setCopied] =
    useState(false);

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

          {copied
            ? "Copied"
            : "Copy"}
        </button>
      </div>

      <ul className="mt-3 space-y-1 text-sm leading-5 text-foreground/80">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>

    </div>
  );
}
