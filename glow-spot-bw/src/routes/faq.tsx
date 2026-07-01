import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  { q: "How do I book?", a: "Pick a service, pay your BWP 100 deposit, send your details and proof of payment on WhatsApp, then choose your slot on our embedded calendar." },
  { q: "What's your deposit policy?", a: "A flat BWP 100 deposit is required to secure any booking. Deposits are non-refundable but can be moved with sufficient notice." },
  { q: "What are your hours?", a: "Tuesday to Saturday 09:00–18:00. Sunday 11:00–17:00. We are closed on Mondays." },
  { q: "Do you accept walk-ins?", a: "We prioritise booked appointments. Walk-ins are welcome only if a slot is open." },
  { q: "What if I'm late?", a: "Please WhatsApp us. After 15 minutes we may need to shorten or reschedule your service." },
  { q: "Are re-fills cheaper than a new set?", a: "Re-fills are charged the same as a brand-new set so we can give you a fresh, long-lasting finish every time." },
  { q: "Do you charge extra for early or late appointments?", a: "Yes — appointments before our opening or after closing add BWP 70 to the total." },
  { q: "Where are you located?", a: "Main Mall, Gaborone. Full directions are on our Contact page." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Glow Spot BW" },
      { name: "description", content: "Answers to common questions about booking, deposits, hours and aftercare." },
      { property: "og:title", content: "FAQ — Glow Spot BW" },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }),
    }],
  }),
  component: FAQPage,
});

function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Help</p>
        <h1 className="mt-2 font-display text-4xl text-primary sm:text-5xl">FAQ</h1>
      </header>
      <Accordion type="single" collapsible className="mt-10">
        {FAQS.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left font-display text-lg text-primary">{f.q}</AccordionTrigger>
            <AccordionContent className="text-sm text-foreground/80">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}