import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  MessageCircle,
  XCircle,
} from "lucide-react";

export const Route = createFileRoute("/manage")({
  validateSearch: (search: Record<string, unknown>) => ({
    ref: String(search.ref ?? ""),
    name: String(search.name ?? ""),
    date: String(search.date ?? ""),
    time: String(search.time ?? ""),
    services: String(search.services ?? ""),
  }),

  component: ManageBookingPage,
});

const WHATSAPP_NUMBER = "26772541683";

function ManageBookingPage() {
  const search = Route.useSearch();

  const booking = useMemo(
    () => ({
      reference: search.ref,
      name: search.name,
      date: search.date,
      time: search.time,
      services: search.services
        ? search.services.split("|").filter(Boolean)
        : [],
    }),
    [search]
  );

  const [showCancel, setShowCancel] = useState(false);
  const [requestSent, setRequestSent] = useState<
    "reschedule" | "cancel" | null
  >(null);

  const servicesText =
    booking.services.length > 0
      ? booking.services.join(", ")
      : "Appointment";

  function openWhatsApp(message: string) {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  function handleReschedule() {
    const message = `Hi Glow Spot BW 👋

I would like to RESCHEDULE my appointment.

Booking Reference: ${booking.reference || "Not provided"}
Name: ${booking.name || "Not provided"}

Current Appointment:
Date: ${booking.date || "Not provided"}
Time: ${booking.time || "Not provided"}

Services:
${servicesText}

Please help me choose a new available date and time.

Thank you.`;

    openWhatsApp(message);
    setRequestSent("reschedule");
  }

  function handleCancel() {
    const message = `Hi Glow Spot BW 👋

I would like to CANCEL my appointment.

Booking Reference: ${booking.reference || "Not provided"}
Name: ${booking.name || "Not provided"}

Appointment:
Date: ${booking.date || "Not provided"}
Time: ${booking.time || "Not provided"}

Services:
${servicesText}

Please confirm my cancellation.

Thank you.`;

    openWhatsApp(message);
    setShowCancel(false);
    setRequestSent("cancel");
  }

  if (requestSent) {
    const isReschedule = requestSent === "reschedule";

    return (
      <main className="min-h-screen bg-[#faf7f5] px-5 py-10">
        <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
          <div className="w-full rounded-3xl bg-white p-7 text-center shadow-sm">
            <CheckCircle2 className="mx-auto mb-5 h-14 w-14 text-green-600" />

            <h1 className="font-serif text-3xl text-neutral-900">
              {isReschedule
                ? "Reschedule Request Sent"
                : "Cancellation Request Sent"}
            </h1>

            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Your request has been sent to Glow Spot BW on WhatsApp.
            </p>

            <p className="mt-3 text-sm font-medium leading-6 text-neutral-800">
              {isReschedule
                ? "Glow Spot BW will confirm your new available date and time."
                : "Glow Spot BW will confirm your cancellation."}
            </p>

            <Link
              to="/"
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-semibold text-white"
            >
              Back to Glow Spot
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf7f5] px-5 py-8">
      <div className="mx-auto max-w-md">
        <Link
          to="/book"
          className="mb-7 inline-flex items-center gap-2 text-sm text-neutral-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to booking
        </Link>

        <div className="mb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Glow Spot BW
          </p>

          <h1 className="mt-2 font-serif text-4xl text-neutral-900">
            Manage Booking
          </h1>

          <p className="mt-2 text-sm leading-6 text-neutral-600">
            Made a mistake with your appointment? You can request a
            reschedule or cancellation below.
          </p>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-neutral-500">
                Booking Reference
              </p>

              <p className="mt-1 text-sm font-semibold text-neutral-900">
                {booking.reference || "Not provided"}
              </p>
            </div>

            <CalendarDays className="h-6 w-6 text-neutral-500" />
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-neutral-500">Name</p>

              <p className="mt-1 font-medium text-neutral-900">
                {booking.name || "Not provided"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-neutral-500">Date</p>

                <div className="mt-1 flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-neutral-500" />

                  <p className="text-sm font-medium text-neutral-900">
                    {booking.date || "Not provided"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-neutral-500">Time</p>

                <div className="mt-1 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-neutral-500" />

                  <p className="text-sm font-medium text-neutral-900">
                    {booking.time || "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs text-neutral-500">Services</p>

              <div className="mt-2 flex flex-wrap gap-2">
                {booking.services.length > 0 ? (
                  booking.services.map((service) => (
                    <span
                      key={service}
                      className="rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-700"
                    >
                      {service}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-neutral-500">
                    Appointment details unavailable
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={handleReschedule}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-black px-5 py-4 text-sm font-semibold text-white transition active:scale-[0.98]"
          >
            <CalendarDays className="h-5 w-5" />
            Reschedule Appointment
          </button>

          <button
            type="button"
            onClick={() => setShowCancel(true)}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-red-200 bg-white px-5 py-4 text-sm font-semibold text-red-600 transition active:scale-[0.98]"
          >
            <XCircle className="h-5 w-5" />
            Cancel Appointment
          </button>
        </div>

        <div className="mt-6 rounded-2xl bg-white p-5">
          <div className="flex gap-3">
            <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

            <div>
              <p className="text-sm font-semibold text-neutral-900">
                WhatsApp confirmation
              </p>

              <p className="mt-1 text-xs leading-5 text-neutral-600">
                Your request will be sent to Glow Spot BW on WhatsApp.
                Your appointment remains unchanged until Glow Spot BW
                confirms the request.
              </p>
            </div>
          </div>
        </div>

        {showCancel && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>

              <h2 className="text-xl font-semibold text-neutral-900">
                Cancel appointment?
              </h2>

              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Are you sure you want to request cancellation of this
                appointment?
              </p>

              <div className="mt-5 rounded-2xl bg-neutral-50 p-4 text-sm">
                <p className="font-medium text-neutral-900">
                  {booking.date || "Date not provided"}
                  {booking.time ? ` at ${booking.time}` : ""}
                </p>

                <p className="mt-1 text-neutral-600">
                  {servicesText}
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setShowCancel(false)}
                  className="rounded-2xl border border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-700"
                >
                  Keep Booking
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white"
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
