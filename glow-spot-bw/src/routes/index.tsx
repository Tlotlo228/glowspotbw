import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Sparkles, ShieldCheck, Clock } from "lucide-react";
import { GALLERY, SERVICE_GROUPS } from "@/lib/site-data";
import logo from "@/assets/gallery/logo.jpeg.asset.json";
import hero from "@/assets/gallery/nails-gold.jpeg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Glow Spot BW — Nails, Pedicure, Makeup & Wigs in Gaborone" },
      { name: "description", content: "Premium beauty studio in Gaborone Main Mall. Bespoke nails, pedicures, nail art, makeup & wig services since 2019." },
      { property: "og:title", content: "Glow Spot BW — Beauty Studio" },
      { property: "og:description", content: "Premium nails, pedicures, makeup & wigs in Gaborone." },
      { property: "og:image", content: hero.url },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const featured = SERVICE_GROUPS.flatMap((g) => g.services).slice(0, 4);
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-30"
          style={{ backgroundImage: `url(${hero.url})`, backgroundSize: "cover", backgroundPosition: "center" }}
          aria-hidden
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/85 via-background/90 to-background" aria-hidden />
        <div className="mx-auto max-w-6xl px-4 pt-12 pb-20 text-center sm:pt-20 sm:pb-28">
          <img src={logo.url} alt="Glow Spot BW logo" className="mx-auto h-24 w-24 rounded-full object-cover shadow-soft sm:h-32 sm:w-32" />
          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">Est. 2019 · Gaborone</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-primary sm:text-6xl">
            Where your glow<br />begins.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-foreground/80 sm:text-lg">
            Nails, pedicures, makeup & wigs in the heart of Gaborone Main Mall. Soft, luxurious finishes — every visit.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/book" className="rounded-full bg-primary px-7 py-3 text-base font-medium text-primary-foreground shadow-soft transition hover:opacity-90">
              Book Now
            </Link>
            <Link to="/services" className="rounded-full border border-primary/30 bg-background/60 px-7 py-3 text-base text-primary backdrop-blur">
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: Sparkles, label: "5+ Years" },
            { icon: ShieldCheck, label: "Sterile Tools" },
            { icon: Clock, label: "On-Time" },
            { icon: Star, label: "5★ Service" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="glass shadow-soft flex flex-col items-center gap-2 rounded-2xl p-4 text-center">
              <Icon className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground/80">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Services */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Signature</p>
            <h2 className="mt-1 font-display text-3xl text-primary sm:text-4xl">Featured Services</h2>
          </div>
          <Link to="/services" className="text-sm text-primary underline-offset-4 hover:underline">All services →</Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {featured.map((s) => (
            <Link key={s.id} to="/book" search={{ service: s.id }} className="glass shadow-soft group rounded-2xl p-5 transition hover:-translate-y-0.5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl text-primary">{s.name}</h3>
                <span className="rounded-full bg-accent/40 px-3 py-1 text-sm font-medium text-primary">BWP {s.price}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
              <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{s.duration}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Gallery preview */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Our Work</p>
            <h2 className="mt-1 font-display text-3xl text-primary sm:text-4xl">Recent Glow-Ups</h2>
          </div>
          <Link to="/gallery" className="text-sm text-primary hover:underline">See gallery →</Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {GALLERY.slice(0, 4).map((g) => (
            <div key={g.src} className="aspect-square overflow-hidden rounded-2xl">
              <img src={g.src} alt={g.alt} loading="lazy" className="h-full w-full object-cover transition duration-500 hover:scale-105" />
            </div>
          ))}
        </div>
      </section>

      {/* Reviews preview */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="glass shadow-soft rounded-3xl p-8 text-center">
          <div className="flex justify-center gap-1 text-[color:var(--gold)]">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
          </div>
          <blockquote className="mx-auto mt-4 max-w-2xl font-display text-xl text-primary sm:text-2xl">
            “Glow Spot BW is the only place I trust with my nails. Always neat, always on time, always beautiful.”
          </blockquote>
          <p className="mt-3 text-sm text-muted-foreground">— Tumi K., regular client</p>
          <Link to="/reviews" className="mt-6 inline-flex rounded-full border border-primary/30 px-5 py-2 text-sm text-primary">Read all reviews</Link>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-3xl bg-primary p-8 text-center text-primary-foreground sm:p-12">
          <h2 className="font-display text-3xl sm:text-4xl">Ready for your glow?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm opacity-90 sm:text-base">
            Secure your slot with a BWP 100 deposit. We'll confirm on WhatsApp the same day.
          </p>
          <Link to="/book" className="mt-6 inline-flex rounded-full bg-background px-7 py-3 text-base font-medium text-primary">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
}