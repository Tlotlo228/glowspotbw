import { createFileRoute, Link } from "@tanstack/react-router";
import { SERVICE_GROUPS } from "@/lib/site-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Pricing — Glow Spot BW" },
      { name: "description", content: "Manicure, pedicure, nail art, makeup and wig services pricing at Glow Spot BW Gaborone." },
      { property: "og:title", content: "Services & Pricing — Glow Spot BW" },
      { property: "og:description", content: "Full service menu with prices in BWP." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Services,
});

function Services() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Menu</p>
        <h1 className="mt-2 font-display text-4xl text-primary sm:text-5xl">Services & Pricing</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">All prices in Botswana Pula (BWP). A BWP 100 deposit secures your booking. Re-fills are charged as a new set.</p>
      </header>
      <div className="mt-12 space-y-12">
        {SERVICE_GROUPS.map((group) => (
          <section key={group.group}>
            <h2 className="font-display text-2xl text-primary">{group.group}</h2>
            <div className="mt-4 divide-y divide-border overflow-hidden rounded-2xl glass">
              {group.services.map((s) => (
                <Link key={s.id} to="/book" search={{ service: s.id }} className="flex items-start justify-between gap-4 p-5 transition hover:bg-accent/20">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg text-primary">{s.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
                    {s.duration && <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{s.duration}</p>}
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-display text-xl text-primary">{s.priceLabel ?? `P${s.price}`}</p>
                    <span className="mt-1 inline-block text-xs text-primary underline-offset-2 hover:underline">Book →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}