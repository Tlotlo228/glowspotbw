import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Copy,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  X,
} from "lucide-react";

import {
  ALL_SERVICES,
  SERVICE_GROUPS,
  PAYMENT_DETAILS,
  WHATSAPP_NUMBER,
  DEPOSIT_AMOUNT,
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
          "Book your appointment at Glow Spot BW Gaborone. Select your services, choose your appointment slot, complete your details and confirm through WhatsApp.",
      },
      { property: "og:title", content: "Book Now — Glow Spot BW" },
      { property: "og:url", content: "/book" },
    ],
    links: [{ rel: "canonical", href: "/book" }],
  }),
  component: Book,
});

const HOURS_TEXT =
  "Tue–Sat 09:00–18:00 · Sun 11:00–17:00 · Mon closed";

function doCopy(text: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    navigator.clipboard.writeText(text).catch(() => {});
  }
}

function scrollToTop() {
  if (typeof window !== "undefined") {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }
}

function Book() {
  const { service } = Route.useSearch();

  const initialService = useMemo(
    () =>
      ALL_SERVICES.find((item) => item.id === service) ??
      ALL_SERVICES[0],
    [service],
  );

  const initialGroup = useMemo(() => {
    return (
      SERVICE_GROUPS.find((group) =>
        group.services.some((item) => item.id === initialService?.id),
      )?.group ?? SERVICE_GROUPS[0]?.group
    );
  }, [initialService]);

  const [selectedIds, setSelectedIds] = useState<string[]>(
    initialService ? [initialService.id] : [],
  );

  const [activeGroup, setActiveGroup] = useState(
    initialGroup ?? SERVICE_GROUPS[0]?.group ?? "",
  );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [calendarLive, setCalendarLive] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [paymentProofSent, setPaymentProofSent] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    if (initialGroup) {
      setActiveGroup(initialGroup);
    }
  }, [initialGroup]);

  const selectedServices = useMemo(
    () =>
      selectedIds
        .map((id) => ALL_SERVICES.find((item) => item.id === id))
        .filter(Boolean),
    [selectedIds],
  );

  const totalMinutes = selectedServices.reduce(
    (total, item) => total + (item?.minutes ?? 0),
    0,
  );

  const totalPrice = selectedServices.reduce(
    (total, item) => total + (item?.price ?? 0),
    0,
  );

  const deposit = DEPOSIT_AMOUNT;
  const remainingBalance = Math.max(totalPrice - deposit, 0);

  const activeServices =
    SERVICE_GROUPS.find((group) => group.group === activeGroup)?.services ??
    [];

  const summary = useMemo(() => {
    const serviceLines = selectedServices
      .map(
        (item) =>
          `• ${item?.name} — P${item?.price}${
            item?.duration ? ` (${item.duration})` : ""
          }`,
      )
      .join("\n");

    return [
      "Hello Glow Spot BW 🤍",
      "",
      "I would like to book an appointment.",
      "",
      "SERVICES",
      serviceLines,
      "",
      `Total: P${totalPrice}`,
      `Estimated duration: ${formatMinutes(totalMinutes)}`,
      `Deposit: P${deposit}`,
      `Remaining balance: P${remainingBalance}`,
      "",
      "CLIENT DETAILS",
      `Name: ${name || "Not provided"}`,
      `Phone: ${phone || "Not provided"}`,
      `Notes: ${notes || "None"}`,
      "",
      "APPOINTMENT",
      "Date/time selected through the Glow Spot BW booking calendar.",
      "",
      "I have read and agreed to the Glow Spot BW booking policy.",
      "",
      "Please confirm my appointment. 🤍",
    ].join("\n");
  }, [
    selectedServices,
    totalPrice,
    totalMinutes,
    deposit,
    remainingBalance,
    name,
    phone,
    notes,
  ]);

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    summary,
  )}`;

  function toggleService(id: string) {
    setSelectedIds((current) => {
      if (current.includes(id)) {
        if (current.length === 1) return current;
        return current.filter((item) => item !== id);
      }

      return [...current, id];
    });
  }

  function goNext() {
    setCurrentStep((step) => Math.min(step + 1, 5));

    requestAnimationFrame(() => {
      scrollToTop();
    });
  }

  function goBack() {
    setCurrentStep((step) => Math.max(step - 1, 1));

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

  function confirmBooking() {
    if (!paymentProofSent) return;

    setBookingConfirmed(true);

    requestAnimationFrame(() => {
      scrollToTop();
    });
  }

  const detailsValid =
    name.trim().length > 1 &&
    phone.trim().length >= 7 &&
    policyAccepted;

  if (bookingConfirmed) {
    return (
      <main className="min-h-screen bg-background px-4 py-10">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-9 w-9 text-primary" />
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Glow Spot BW
              </p>

              <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                Booking confirmation submitted 🤍
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
                Your booking details and payment confirmation have been
                submitted. Glow Spot BW will confirm the appointment with you
                through WhatsApp.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-background p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Booking summary</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {name}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-semibold">P{totalPrice}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatMinutes(totalMinutes)}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3 border-t border-border pt-5">
                {selectedServices.map((item) => (
                  <div
                    key={item?.id}
                    className="flex items-center justify-between gap-4 text-sm"
                  >
                    <span>{item?.name}</span>
                    <span className="font-medium">P{item?.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-card p-5">
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                <div>
                  <p className="font-medium">What happens next?</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Keep your payment proof and WhatsApp conversation for your
                    records. Your appointment is considered confirmed once
                    Glow Spot BW confirms it with you.
                  </p>
                </div>
              </div>
            </div>

            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              <MessageCircle className="h-5 w-5" />
              Open WhatsApp
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-7 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Glow Spot BW
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Book your appointment
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            Choose your services, select your appointment slot, provide your
            details and complete your deposit.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-6 overflow-x-auto">
          <div className="mx-auto flex min-w-[650px] items-center justify-center">
            {[
              ["Services", 1],
              ["Slot", 2],
              ["Details", 3],
              ["Review", 4],
              ["Deposit", 5],
            ].map(([label, step], index) => {
              const stepNumber = Number(step);
              const active = currentStep === stepNumber;
              const complete = currentStep > stepNumber;

              return (
                <div key={label} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => goToStep(stepNumber)}
                    disabled={stepNumber > currentStep}
                    className="flex items-center gap-2 disabled:cursor-default"
                  >
                    <span
                      className={[
                        "flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition",
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : complete
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-card text-muted-foreground",
                      ].join(" ")}
                    >
                      {complete ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        stepNumber
                      )}
                    </span>

                    <span
                      className={[
                        "hidden text-xs font-medium sm:block",
                        active
                          ? "text-foreground"
                          : "text-muted-foreground",
                      ].join(" ")}
                    >
                      {label}
                    </span>
                  </button>

                  {index < 4 && (
                    <div
                      className={[
                        "mx-2 h-px w-8 sm:w-12",
                        currentStep > stepNumber
                          ? "bg-primary"
                          : "bg-border",
                      ].join(" ")}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 1 — SERVICES */}
        {currentStep === 1 && (
          <section className="space-y-5">
            <div className="rounded-3xl border border-border bg-card p-5 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Step 1
                  </p>

                  <h2 className="mt-1 text-xl font-semibold">
                    Select your services
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Choose one or more services.
                  </p>
                </div>

                <div className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                  {selectedIds.length} selected
                </div>
              </div>

              {/* Compact categories */}
              <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {SERVICE_GROUPS.map((group) => {
                  const isActive = activeGroup === group.group;

                  const selectedCount = group.services.filter((item) =>
                    selectedIds.includes(item.id),
                  ).length;

                  return (
                    <button
                      type="button"
                      key={group.group}
                      onClick={() => setActiveGroup(group.group)}
                      className={[
                        "flex min-h-[54px] items-center justify-between gap-2 rounded-2xl border px-3 py-3 text-left text-sm transition",
                        isActive
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-background hover:border-primary/40",
                      ].join(" ")}
                    >
                      <span className="font-medium">{group.group}</span>

                      {selectedCount > 0 ? (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
                          {selectedCount}
                        </span>
                      ) : isActive ? (
                        <ChevronUp className="h-4 w-4 shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Services */}
              <div className="mt-5 rounded-2xl border border-border bg-background p-3">
                <div className="mb-3 flex items-center justify-between px-2">
                  <div>
                    <p className="font-semibold">{activeGroup}</p>
                    <p className="text-xs text-muted-foreground">
                      Select what you need
                    </p>
                  </div>

                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                </div>

                <div className="space-y-2">
                  {activeServices.map((item) => {
                    const selected = selectedIds.includes(item.id);

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleService(item.id)}
                        className={[
                          "flex w-full items-center justify-between gap-4 rounded-xl border p-3 text-left transition",
                          selected
                            ? "border-primary bg-primary/10"
                            : "border-border bg-card hover:border-primary/40",
                        ].join(" ")}
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium">
                              {item.name}
                            </p>

                            {selected && (
                              <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                                Selected
                              </span>
                            )}
                          </div>

                          <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            {item.description}
                          </p>

                          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {item.duration ??
                                formatMinutes(item.minutes)}
                            </span>
                          </div>
                        </div>

                        <div className="shrink-0 text-right">
                          <p className="font-semibold">
                            P{item.price}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Selection summary */}
            <div className="rounded-3xl border border-border bg-card p-5 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">Your selection</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {selectedServices.length} service
                    {selectedServices.length === 1 ? "" : "s"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-semibold">
                    P{totalPrice}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatMinutes(totalMinutes)}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {selectedServices.map((item) => (
                  <div
                    key={item?.id}
                    className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-xs"
                  >
                    <span>{item?.name}</span>

                    <button
                      type="button"
                      onClick={() =>
                        item?.id && toggleService(item.id)
                      }
                      className="rounded-full p-0.5 hover:bg-muted"
                      aria-label={`Remove ${item?.name}`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={goNext}
                disabled={selectedServices.length === 0}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue to booking
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </section>
        )}

        {/* STEP 2 — CALENDAR */}
        {currentStep === 2 && (
          <section className="space-y-5">
            <div className="rounded-3xl border border-border bg-card p-5 sm:p-7">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Step 2
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  Choose your appointment slot
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Select your preferred date and time using the Glow Spot BW
                  appointment calendar below.
                </p>
              </div>

              <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-background">
                <div className="flex items-center gap-3 border-b border-border p-4">
                  <CalendarDays className="h-5 w-5 text-primary" />

                  <div>
                    <p className="text-sm font-semibold">
                      Appointment calendar
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {HOURS_TEXT}
                    </p>
                  </div>
                </div>

                <div className="relative min-h-[650px]">
                  {!calendarLive && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/95 p-6">
                      <div className="max-w-sm text-center">
                        <CalendarDays className="mx-auto h-10 w-10 text-primary" />

                        <h3 className="mt-4 text-lg font-semibold">
                          Select your appointment time
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          Open the live booking calendar to choose your
                          preferred date and time.
                        </p>

                        <button
                          type="button"
                          onClick={() => setCalendarLive(true)}
                          className="mt-5 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
                        >
                          Open calendar
                        </button>
                      </div>
                    </div>
                  )}

                  <iframe
                    title="Glow Spot BW appointment calendar"
                    src={CALENDAR_URL}
                    className="h-[650px] w-full border-0"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-border bg-background p-4">
                <div className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                  <div>
                    <p className="text-sm font-semibold">
                      Important
                    </p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      The calendar handles the appointment date and time.
                      Your booking details and deposit will be completed in
                      the next steps.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={goBack}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-border px-5 py-3.5 text-sm font-semibold"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground"
                >
                  I've selected my slot
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* STEP 3 — DETAILS + POLICY */}
        {currentStep === 3 && (
          <section className="space-y-5">
            <div className="rounded-3xl border border-border bg-card p-5 sm:p-7">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Step 3
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  Your details
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Enter the details we need to prepare your booking.
                </p>
              </div>

              <div className="mt-6 space-y-4">
                <Field
                  label="Full name"
                  value={name}
                  onChange={setName}
                  placeholder="Enter your full name"
                />

                <Field
                  label="Phone number"
                  value={phone}
                  onChange={setPhone}
                  placeholder="e.g. 72 123 456"
                  type="tel"
                />

                <div>
                  <label className="text-sm font-medium">
                    Notes{" "}
                    <span className="font-normal text-muted-foreground">
                      (optional)
                    </span>
                  </label>

                  <textarea
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="Anything we should know about your appointment?"
                    rows={4}
                    className="mt-2 w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* BOOKING POLICY */}
            <div className="rounded-3xl border border-border bg-card p-5 sm:p-7">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Please read before booking
                  </p>

                  <h2 className="mt-1 text-xl font-semibold">
                    BOOKING POLICY 🤍
                  </h2>
                </div>
              </div>

              <div className="mt-6 space-y-5 text-sm leading-6 text-muted-foreground">
                <PolicyItem>
                  <strong className="font-semibold italic text-foreground">
                    Deposits are required
                  </strong>{" "}
                  to secure all appointments and are non-refundable.
                </PolicyItem>

                <PolicyItem>
                  <strong className="font-semibold text-foreground">
                    Please double-check
                  </strong>{" "}
                  your booking before confirming. Once an appointment is
                  confirmed, that time slot is reserved exclusively for you.
                </PolicyItem>

                <PolicyItem>
                  <strong className="font-semibold text-foreground">
                    Double bookings:
                  </strong>{" "}
                  If multiple appointments are booked under the same client,
                  the client must cancel the duplicate booking. The deposit
                  for the cancelled booking will not be{" "}
                  <strong className="font-semibold italic text-foreground">
                    refunded.
                  </strong>
                </PolicyItem>

                <PolicyItem>
                  <strong className="font-semibold text-foreground">
                    Cancellations & rescheduling:
                  </strong>{" "}
                  At least{" "}
                  <strong className="font-semibold italic text-foreground">
                    24 hours’
                  </strong>{" "}
                  notice is required. Late cancellations and rescheduling may
                  result in the deposit being forfeited.
                </PolicyItem>

                <PolicyItem>
                  <strong className="font-semibold text-foreground">
                    No-shows:
                  </strong>{" "}
                  Failure to attend your appointment without notice will result
                  in the deposit being forfeited.
                </PolicyItem>

                <PolicyItem>
                  <strong className="font-semibold text-foreground">
                    Late arrivals:
                  </strong>{" "}
                  A grace period of{" "}
                  <strong className="font-semibold text-foreground">
                    10 minutes
                  </strong>{" "}
                  applies to both parties. Arriving later may result in your
                  appointment being shortened or cancelled.
                </PolicyItem>

                <div>
                  <p className="font-semibold text-foreground">
                    • BOOKING FOR SOMEONE ELSE
                  </p>

                  <p className="mt-4">
                    If you are booking an appointment on behalf of another
                    person, you are responsible for ensuring that the correct
                    client information, date and time are selected.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-foreground">
                    . CLIENT RESPONSIBILITY
                  </p>

                  <p className="mt-4 font-semibold text-foreground">
                    Please double-check your:
                  </p>

                  <ul className="mt-3 space-y-1 pl-2">
                    <li>* Service</li>
                    <li>* Date</li>
                    <li>* Time</li>
                    <li>* Contact details</li>
                  </ul>

                  <p className="mt-5 font-semibold text-foreground">
                    *also always share your appointment summary to our WhatsApp
                    line.
                  </p>

                  <p className="mt-5">
                    • before completing your booking.
                  </p>

                  <p className="mt-5 font-semibold text-foreground">
                    • Once an appointment has been confirmed, the client is
                    responsible for the booking.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-foreground">
                    9. POLICY ACCEPTANCE
                  </p>

                  <p className="mt-4">
                    By making a booking, you acknowledge that you have read,
                    understood and agreed to these booking policies. ❤️
                  </p>
                </div>
              </div>

              {/* Acceptance checkbox */}
              <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-background p-4">
                <input
                  type="checkbox"
                  checked={policyAccepted}
                  onChange={(event) =>
                    setPolicyAccepted(event.target.checked)
                  }
                  className="mt-1 h-4 w-4 accent-primary"
                />

                <span className="text-sm leading-6 text-foreground">
                  I have read, understood and agree to the Glow Spot BW
                  booking policies.
                </span>
              </label>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={goBack}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-border px-5 py-3.5 text-sm font-semibold"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  disabled={!detailsValid}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continue to review
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* STEP 4 — REVIEW */}
        {currentStep === 4 && (
          <section className="space-y-5">
            <div className="rounded-3xl border border-border bg-card p-5 sm:p-7">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Step 4
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  Review your booking
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Check everything carefully before proceeding to the deposit.
                </p>
              </div>

              <div className="mt-6 space-y-5">
                <SummaryBlock title="Services">
                  {selectedServices.map((item) => (
                    <div
                      key={item?.id}
                      className="flex items-center justify-between gap-4 py-2 text-sm"
                    >
                      <div>
                        <p className="font-medium">{item?.name}</p>

                        <p className="text-xs text-muted-foreground">
                          {item?.duration ??
                            formatMinutes(item?.minutes ?? 0)}
                        </p>
                      </div>

                      <p className="font-semibold">
                        P{item?.price}
                      </p>
                    </div>
                  ))}
                </SummaryBlock>

                <SummaryBlock title="Client">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">
                        Name
                      </span>

                      <span className="font-medium">{name}</span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">
                        Phone
                      </span>

                      <span className="font-medium">{phone}</span>
                    </div>

                    {notes && (
                      <div className="border-t border-border pt-3">
                        <p className="text-muted-foreground">Notes</p>

                        <p className="mt-1">{notes}</p>
                      </div>
                    )}
                  </div>
                </SummaryBlock>

                <SummaryBlock title="Payment summary">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Total
                      </span>

                      <span className="font-semibold">
                        P{totalPrice}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Deposit
                      </span>

                      <span className="font-semibold">
                        P{deposit}
                      </span>
                    </div>

                    <div className="flex justify-between border-t border-border pt-3">
                      <span className="font-medium">
                        Remaining balance
                      </span>

                      <span className="font-semibold">
                        P{remainingBalance}
                      </span>
                    </div>
                  </div>
                </SummaryBlock>

                <div className="rounded-2xl border border-border bg-background p-4">
                  <div className="flex gap-3">
                    <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                    <div>
                      <p className="text-sm font-semibold">
                        WhatsApp booking message ready
                      </p>

                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        Your booking information will be sent to Glow Spot BW
                        through WhatsApp after you complete the deposit.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => doCopy(summary)}
                    className="mt-4 flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-xs font-semibold"
                  >
                    <Copy className="h-4 w-4" />
                    Copy booking message
                  </button>
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={goBack}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-border px-5 py-3.5 text-sm font-semibold"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground"
                >
                  Continue to deposit
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* STEP 5 — DEPOSIT */}
        {currentStep === 5 && (
          <section className="space-y-5">
            <div className="rounded-3xl border border-border bg-card p-5 sm:p-7">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Step 5
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  Pay your deposit & confirm
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  A P{deposit} deposit is required to secure your appointment.
                </p>
              </div>

              <div className="mt-6 space-y-4">
                <PayCard
                  title="Orange Money / Pay2Cell"
                  lines={[
                    `Name: ${PAYMENT_DETAILS.orangeMoney.name}`,
                    `Number: ${PAYMENT_DETAILS.orangeMoney.number}`,
                  ]}
                  copyText={PAYMENT_DETAILS.orangeMoney.number}
                />

                <PayCard
                  title="Bank Transfer — FNB Botswana"
                  lines={[
                    `Account name: ${PAYMENT_DETAILS.bank.name}`,
                    `Account no.: ${PAYMENT_DETAILS.bank.account}`,
                    `Branch: ${PAYMENT_DETAILS.bank.branch}`,
                    `Branch no.: ${PAYMENT_DETAILS.bank.branchNumber}`,
                  ]}
                  copyText={PAYMENT_DETAILS.bank.account}
                />
              </div>

              <div className="mt-5 rounded-2xl border border-border bg-background p-4">
                <p className="text-sm font-semibold">
                  After payment
                </p>

                <ol className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                  <li>
                    1. Pay the P{deposit} deposit using one of the payment
                    methods above.
                  </li>

                  <li>
                    2. Take a screenshot or photo of your payment proof.
                  </li>

                  <li>
                    3. Send your booking details and payment proof through
                    WhatsApp.
                  </li>

                  <li>
                    4. Return here and confirm that you have completed the
                    process.
                  </li>
                </ol>
              </div>

              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
              >
                <MessageCircle className="h-5 w-5" />
                Send booking through WhatsApp
                <ExternalLink className="h-4 w-4" />
              </a>

              <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-background p-4">
                <input
                  type="checkbox"
                  checked={paymentProofSent}
                  onChange={(event) =>
                    setPaymentProofSent(event.target.checked)
                  }
                  className="mt-1 h-4 w-4 accent-primary"
                />

                <span className="text-sm leading-6 text-foreground">
                  I have paid the P{deposit} deposit and sent my booking
                  details and payment proof through WhatsApp.
                </span>
              </label>

              <div className="mt-6 rounded-2xl border border-border bg-card p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">
                      Appointment total
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatMinutes(totalMinutes)}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-semibold">
                      P{totalPrice}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      P{remainingBalance} remaining
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={goBack}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-border px-5 py-3.5 text-sm font-semibold"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>

                <button
                  type="button"
                  onClick={confirmBooking}
                  disabled={!paymentProofSent}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Confirm booking
                  <CheckCircle2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Footer reminder */}
        <div className="mt-6 rounded-2xl border border-border bg-card p-4 text-center">
          <p className="text-xs leading-5 text-muted-foreground">
            <span className="font-semibold text-foreground">
              Booking hours:
            </span>{" "}
            {HOURS_TEXT}
          </p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Deposits are non-refundable. Please review your booking details
            carefully before confirming.
          </p>
        </div>
      </div>
    </main>
  );
}

function PolicyItem({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />

      <p>{children}</p>
    </div>
  );
}

function SummaryBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <p className="mb-3 text-sm font-semibold">{title}</p>

      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary"
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
  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold">{title}</p>

          <div className="mt-2 space-y-1">
            {lines.map((line) => (
              <p
                key={line}
                className="text-sm text-muted-foreground"
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => doCopy(copyText)}
          className="flex shrink-0 items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs font-semibold transition hover:bg-muted"
        >
          <Copy className="h-3.5 w-3.5" />
          Copy
        </button>
      </div>
    </div>
  );
}
