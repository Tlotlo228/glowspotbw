import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Clock, Instagram } from "lucide-react";
import { PHONE_DISPLAY, WHATSAPP_NUMBER, INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/site-data";
import directions from "@/assets/gallery/directions.png.asset.json";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Directions — Glow Spot BW" },
      { name: "description", content: "Find Glow Spot BW in Gaborone Main Mall. WhatsApp, Instagram and full directions." },
      { property: "og:title", content: "Contact — Glow Spot BW" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Visit us</p>
        <h1 className="mt-2 font-display text-4xl text-primary sm:text-5xl">Contact</h1>
      </header>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="glass shadow-soft rounded-2xl p-6">
          <h2 className="font-display text-2xl text-primary">Get in touch</h2>
          <ul className="mt-4 space-y-4 text-sm">
            <li className="flex items-start gap-3"><Phone className="mt-0.5 h-5 w-5 text-primary" /><div><p className="font-medium">{PHONE_DISPLAY}</p><p className="text-muted-foreground">WhatsApp & calls</p></div></li>
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-5 w-5 text-primary" /><div>Main Mall, Gaborone, Botswana</div></li>
            <li className="flex items-start gap-3"><Clock className="mt-0.5 h-5 w-5 text-primary" /><div>Tue–Sat 09:00–18:00<br />Sun 11:00–17:00<br />Mon closed</div></li>
            <li className="flex items-start gap-3"><Instagram className="mt-0.5 h-5 w-5 text-primary" /><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-2 hover:underline">{INSTAGRAM_HANDLE}</a></li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground">WhatsApp us</a>
            <a href={`tel:+${WHATSAPP_NUMBER}`} className="rounded-full border border-border bg-background px-5 py-2 text-sm">Call</a>
          </div>
        </div>

        <div className="glass shadow-soft overflow-hidden rounded-2xl">
          <iframe
            title="Glow Spot BW location"
            src="https://www.google.com/maps?q=Main+Mall+Gaborone+Botswana&output=embed"
            className="block h-72 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <section className="mt-10 glass shadow-soft rounded-2xl p-6">
        <h2 className="font-display text-2xl text-primary">Directions</h2>
        <p className="mt-3 text-sm text-foreground/90">From the Ombudsman robots heading into Main Mall, take the first turn left opposite Shell KFC. Yellow building on your right with a Meizu board. Take the glass door on the far left next to Modern Pharmacy. Go up the stairs and take the glass door on your right towards the couches. Enter the door on your left, just before the passage.</p>
        <img src={directions.url} alt="Visual directions to Glow Spot BW" loading="lazy" className="mt-4 w-full max-w-md rounded-xl" />
      </section>
    </div>
  );
}