import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Heart, Sparkles, Award } from "lucide-react";
import logo from "@/assets/gallery/logo.jpeg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Glow Spot BW" },
      { name: "description", content: "Founded in 2019, Glow Spot BW is a Gaborone beauty studio specialising in nails, pedicures, nail art, makeup and wig services." },
      { property: "og:title", content: "About — Glow Spot BW" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <header className="text-center">
        <img src={logo.url} alt="" className="mx-auto h-24 w-24 rounded-full object-cover shadow-soft" />
        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">Our Story</p>
        <h1 className="mt-2 font-display text-4xl text-primary sm:text-5xl">A studio built on glow</h1>
      </header>

      <section className="mx-auto mt-10 max-w-2xl text-center">
        <p className="text-base text-foreground/80">
          Glow Spot BW opened its doors in 2019 in Gaborone's Main Mall with a simple mission — to make every woman feel a little more confident, a little more radiant, every time she leaves our chair. From soft nude sets to bold custom nail art, from soft glam makeup to flawless wig installs, we shape beauty around <em>you</em>.
        </p>
      </section>

      <section className="mt-12 grid gap-4 sm:grid-cols-2">
        {[
          { icon: ShieldCheck, title: "Hospital-grade hygiene", body: "Tools are sterilised between every client. Single-use items are disposed of safely." },
          { icon: Heart, title: "Personal care", body: "We listen first. Every set, finish and style is tailored to your features." },
          { icon: Sparkles, title: "Premium products", body: "We only use trusted, salon-grade brands proven on Botswana skin and nails." },
          { icon: Award, title: "5+ years experience", body: "Hundreds of happy clients across Gaborone since 2019." },
        ].map((v) => (
          <div key={v.title} className="glass shadow-soft rounded-2xl p-5">
            <v.icon className="h-6 w-6 text-primary" />
            <h2 className="mt-3 font-display text-xl text-primary">{v.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{v.body}</p>
          </div>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="text-center font-display text-3xl text-primary">Our process</h2>
        <ol className="mt-6 space-y-4">
          {[
            ["Consultation", "We chat about the look you want, your lifestyle and any allergies."],
            ["Prep", "Nails are gently shaped and prepped for a long-lasting finish."],
            ["Application", "Premium products applied with a steady, careful hand."],
            ["Aftercare", "You leave with simple, clear aftercare so your glow lasts longer."],
          ].map(([t, b], i) => (
            <li key={t} className="glass shadow-soft flex gap-4 rounded-2xl p-5">
              <span className="font-display text-3xl text-primary">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display text-lg text-primary">{t}</h3>
                <p className="text-sm text-muted-foreground">{b}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-12 text-center">
        <Link to="/book" className="rounded-full bg-primary px-7 py-3 text-base font-medium text-primary-foreground shadow-soft">Book your visit</Link>
      </div>
    </div>
  );
}