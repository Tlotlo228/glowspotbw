import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SERVICE_GROUPS } from "@/lib/site-data";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Pricing — Glow Spot BW" },
      {
        name: "description",
        content:
          "Manicure, pedicure, nail art, makeup, lashes and wig services pricing at Glow Spot BW Gaborone.",
      },
      {
        property: "og:title",
        content: "Services & Pricing — Glow Spot BW",
      },
      {
        property: "og:description",
        content: "Full service menu with prices in BWP.",
      },
      {
        property: "og:url",
        content: "/services",
      },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),

  component: Services,
});

function Services() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  function toggleGroup(groupName: string) {
    setOpenGroup((current) =>
      current === groupName ? null : groupName,
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-16">
      {/* =========================================================
          HEADER
      ========================================================= */}

      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Menu
        </p>

        <h1 className="mt-2 font-display text-4xl text-primary sm:text-5xl">
          All services
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
          Browse our services by category. Tap a category below to
          view the available treatments and prices.
        </p>

        <div className="mx-auto mt-4 inline-flex rounded-full bg-secondary/60 px-4 py-2 text-xs text-primary/80">
          All prices in Botswana Pula (BWP)
        </div>
      </header>

      {/* =========================================================
          SERVICE ACCORDION
      ========================================================= */}

      <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        {SERVICE_GROUPS.map((group, index) => {
          const isOpen = openGroup === group.group;

          return (
            <section
              key={group.group}
              className={
                index !== SERVICE_GROUPS.length - 1
                  ? "border-b border-border"
                  : ""
              }
            >
              {/* ===================================================
                  CATEGORY BUTTON
              =================================================== */}

              <button
                type="button"
                onClick={() => toggleGroup(group.group)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-secondary/40 active:bg-secondary/60 sm:px-7 sm:py-6"
              >
                <div className="min-w-0">
                  <h2 className="font-display text-2xl text-foreground sm:text-3xl">
                    {group.group}
                  </h2>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {group.services.length} service
                    {group.services.length === 1 ? "" : "s"}
                  </p>
                </div>

                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDown className="h-5 w-5" />
                </span>
              </button>

              {/* ===================================================
                  CATEGORY CONTENT
              =================================================== */}

              {isOpen && (
                <div className="border-t border-border bg-secondary/20">
                  <div className="divide-y divide-border">
                    {group.services.map((service) => (
                      <div
                        key={service.id}
                        className="flex items-start justify-between gap-4 px-5 py-5 sm:px-7"
                      >
                        {/* SERVICE INFORMATION */}

                        <div className="min-w-0 flex-1">
                          <h3 className="font-display text-lg leading-6 text-primary sm:text-xl">
                            {service.name}
                          </h3>

                          <p className="mt-1.5 text-sm leading-5 text-muted-foreground">
                            {service.description}
                          </p>

                          {service.duration && (
                            <p className="mt-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                              {service.duration}
                            </p>
                          )}
                        </div>

                        {/* PRICE + BOOK */}

                        <div className="flex shrink-0 flex-col items-end gap-2">
                          <p className="font-display text-lg text-primary sm:text-xl">
                            {service.priceLabel ??
                              `P${service.price}`}
                          </p>

                          <Link
                            to="/book"
                            search={{ service: service.id }}
                            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition hover:opacity-90"
                          >
                            Book
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* =========================================================
          BOOKING NOTE
      ========================================================= */}

      <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-center">
        <p className="text-sm font-medium text-primary">
          Ready to book?
        </p>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          Select a service above or book directly to choose your
          appointment slot.
        </p>

        <Link
          to="/book"
          className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft transition hover:opacity-90"
        >
          Book an appointment
        </Link>
      </div>
    </div>
  );
}
