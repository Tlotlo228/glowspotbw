import { createFileRoute, Link } from "@tanstack/react-router";
import {
  GRADUATION_PACKAGES,
  CALENDAR_URL,
} from "@/lib/site-data";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      {
        title: "Class of 2026 Grad Packages — Glow Spot BW",
      },
      {
        name: "description",
        content:
          "Four graduation beauty packages — from clean nails to full glam. Pick your vibe and graduate cute.",
      },
      {
        property: "og:title",
        content: "Class of 2026 Grad Packages — Glow Spot BW",
      },
      {
        property: "og:url",
        content: "/packages",
      },
    ],

    links: [
      {
        rel: "canonical",
        href: "/packages",
      },
    ],
  }),

  component: Packages,
});

const VIBE_COLORS: Record<string, string> = {
  "Classy + Neat":
    "bg-rose-50 text-rose-700 border-rose-200",

  "Main character + Dramatic":
    "bg-purple-50 text-purple-700 border-purple-200",

  "Flirty + Soft glam":
    "bg-pink-50 text-pink-700 border-pink-200",

  "Baddie + Photo-Ready":
    "bg-amber-50 text-amber-700 border-amber-200",
};

function Packages() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">

      {/* =========================================================
          HEADER
      ========================================================= */}

      <header className="text-center">

        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Limited Promo
        </p>

        <h1 className="mt-2 font-display text-4xl text-primary sm:text-5xl">
          Class of 2026 🎓
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Four packages made for your big day. From clean nails to
          full glam — pick your vibe and graduate cute.
        </p>

        <div className="mx-auto mt-5 flex flex-wrap justify-center gap-2 text-xs">

          {GRADUATION_PACKAGES.map((pkg) => (
            <span
              key={pkg.id}
              className={`rounded-full border px-3 py-1 font-medium ${
                VIBE_COLORS[pkg.vibe] ??
                "bg-muted text-foreground border-border"
              }`}
            >
              {pkg.name.split(". ")[1]} → {pkg.vibe}
            </span>
          ))}

        </div>
      </header>

      {/* =========================================================
          PACKAGES
      ========================================================= */}

      <div className="mt-12 space-y-8">

        {GRADUATION_PACKAGES.map((pkg) => (

          <section
            key={pkg.id}
            className="overflow-hidden rounded-2xl glass"
          >

            {/* PACKAGE HEADER */}

            <div className="flex items-center justify-between border-b border-border px-6 py-4">

              <div>

                <h2 className="font-display text-2xl text-primary">
                  {pkg.name}
                </h2>

                <span
                  className={`mt-1 inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                    VIBE_COLORS[pkg.vibe] ??
                    "bg-muted text-foreground border-border"
                  }`}
                >
                  {pkg.vibe}
                </span>

              </div>

              <div className="text-right">

                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  from
                </p>

                <p className="font-display text-2xl text-primary">
                  P
                  {Math.min(
                    ...pkg.tiers.map(
                      (tier) => tier.price,
                    ),
                  )}
                </p>

              </div>

            </div>

            {/* PACKAGE TIERS */}

            <div
              className={`grid divide-border ${
                pkg.tiers.length === 3
                  ? "sm:grid-cols-3 sm:divide-x"
                  : "sm:grid-cols-2 sm:divide-x"
              } divide-y sm:divide-y-0`}
            >

              {pkg.tiers.map((tier) => (

                <div
                  key={tier.serviceId}
                  className="flex flex-col gap-3 p-5"
                >

                  {/* PRICE */}

                  <p className="font-display text-2xl text-primary">
                    P{tier.price}
                  </p>

                  {/* INCLUDED SERVICES */}

                  <ul className="flex-1 space-y-1">

                    {tier.includes.map(
                      (item, index) => (

                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-foreground/80"
                        >

                          <span className="mt-0.5 text-primary">
                            ✦
                          </span>

                          {item}

                        </li>

                      ),
                    )}

                  </ul>

                  {/* SELECT PACKAGE BUTTON */}

                  <Link
                    to="/book"
                    search={{
                      service: tier.serviceId,
                    }}
                    className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90 active:scale-[0.98]"
                  >
                    Select This Package →
                  </Link>

                </div>

              ))}

            </div>

          </section>

        ))}

      </div>

      {/* =========================================================
          BOOKING INFORMATION
      ========================================================= */}

      <div className="mt-8 rounded-2xl bg-accent/30 px-5 py-4 text-center text-sm text-muted-foreground">

        💳 A{" "}
        <strong className="text-foreground">
          50% deposit
        </strong>{" "}
        is required to secure your appointment

        <span className="mx-2">·</span>

        📍{" "}
        <strong className="text-foreground">
          Main Mall, Opposite CCA
        </strong>

        <span className="mx-2">·</span>

        💄 Makeup location to be announced

      </div>

      {/* =========================================================
          CALENDAR
      ========================================================= */}

      <div className="mt-10">

        <div className="mb-4 text-center">

          <h3 className="font-display text-2xl text-primary">
            Book Your Grad Slot
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Select a package above to start your booking, or pick
            your date and time below.
          </p>

        </div>

        <div className="overflow-hidden rounded-2xl border border-border shadow-soft">

          <iframe
            src={CALENDAR_URL}
            style={{
              border: 0,
            }}
            width="100%"
            height="650"
            frameBorder="0"
            title="Book a graduation appointment"
            className="block w-full"
          />

        </div>

      </div>

    </div>
  );
}
