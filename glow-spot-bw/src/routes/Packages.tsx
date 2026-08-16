import { createFileRoute, Link } from "@tanstack/react-router";
import { GRADUATION_PACKAGES, WHATSAPP_NUMBER, CALENDAR_URL } from "@/lib/site-data";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Class of 2026 Grad Packages — Glow Spot BW" },
      { name: "description", content: "Four graduation beauty packages — from clean nails to full glam. Pick your vibe and graduate cute." },
      { property: "og:title", content: "Class of 2026 Grad Packages — Glow Spot BW" },
      { property: "og:url", content: "/packages" },
    ],
    links: [{ rel: "canonical", href: "/packages" }],
  }),
  component: Packages,
});

const VIBE_COLORS: Record<string, string> = {
  "Classy + Neat": "bg-rose-50 text-rose-700 border-rose-200",
  "Main character + Dramatic": "bg-purple-50 text-purple-700 border-purple-200",
  "Flirty + Soft glam": "bg-pink-50 text-pink-700 border-pink-200",
  "Baddie + Photo-Ready": "bg-amber-50 text-amber-700 border-amber-200",
};

function Packages() {
  const waBase = `https://wa.me/${WHATSAPP_NUMBER}?text=`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Limited Promo</p>
        <h1 className="mt-2 font-display text-4xl text-primary sm:text-5xl">Class of 2026 🎓</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Four packages made for your big day. From clean nails to full glam — pick your vibe and graduate cute.
        </p>
        <div className="mx-auto mt-5 flex flex-wrap justify-center gap-2 text-xs">
          {GRADUATION_PACKAGES.map((p) => (
            <span
              key={p.id}
              className={`rounded-full border px-3 py-1 font-medium ${VIBE_COLORS[p.vibe] ?? "bg-muted text-foreground border-border"}`}
            >
              {p.name.split(". ")[1]} → {p.vibe}
            </span>
          ))}
        </div>
      </header>

      <div className="mt-12 space-y-8">
        {GRADUATION_PACKAGES.map((pkg) => (
          <section key={pkg.id} className="overflow-hidden rounded-2xl glass">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div>
                <h2 className="font-display text-2xl text-primary">{pkg.name}</h2>
                <span className={`mt-1 inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${VIBE_COLORS[pkg.vibe] ?? "bg-muted text-foreground border-border"}`}>
                  {pkg.vibe}
                </span>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">from</p>
                <p className="font-display text-2xl text-primary">P{Math.min(...pkg.tiers.map((t) => t.price))}</p>
              </div>
            </div>

            <div className={`grid divide-border ${pkg.tiers.length === 3 ? "sm:grid-cols-3 sm:divide-x" : "sm:grid-cols-2 sm:divide-x"} divide-y sm:divide-y-0`}>
              {pkg.tiers.map((tier, i) => (
                <div key={i} className="flex flex-col gap-3 p-5">
                  <p className="font-display text-xl text-primary">P{tier.price}</p>
                  <ul className="space-y-1">
                    {tier.includes.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className="mt-0.5 text-primary">✦</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`${waBase}${encodeURIComponent(`Hi! I'd like to book the *${pkg.name}* grad package (P${tier.price}) — ${tier.includes.join(", ")}. 🎓`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft transition hover:opacity-90"
                  >
                    Book via WhatsApp →
                  </a>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Calendar booking */}
      <div className="mt-12">
        <div className="mb-4 text-center">
          <h3 className="font-display text-2xl text-primary">Book Your Grad Slot</h3>
          <p className="mt-1 text-sm text-muted-foreground">Pick a date and time directly from the calendar below.</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-border shadow-soft">
          <iframe
            src={CALENDAR_URL}
            style={{ border: 0 }}
            width="100%"
            height="600"
            frameBorder="0"
            title="Book a graduation appointment"
            className="block w-full rounded-2xl"
          />
        </div>
      </div>

      <div className="mt-12 rounded-2xl glass p-6 text-center">
        <h3 className="font-display text-xl text-primary">How to Book</h3>
        <ul className="mx-auto mt-4 max-w-sm space-y-2 text-sm text-muted-foreground">
          <li>💳 <strong className="text-foreground">50% deposit</strong> required to secure your appointment</li>
          <li>📍 <strong className="text-foreground">Main Mall, Opposite CCA</strong></li>
          <li>💄 Makeup session location to be announced</li>
        </ul>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like to enquire about the Class of 2026 grad packages 🎓")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-soft transition hover:opacity-90"
          >
            WhatsApp Us
          </a>
          <Link to="/book" className="rounded-full border border-primary/30 bg-background/60 px-6 py-2.5 text-sm text-primary backdrop-blur">
            Book Online
          </Link>
        </div>
      </div>
    </div>
  );
}
