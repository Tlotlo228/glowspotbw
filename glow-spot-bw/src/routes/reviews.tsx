import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Glow Spot BW" },
      { name: "description", content: "What our clients say about Glow Spot BW in Gaborone." },
      { property: "og:title", content: "Reviews — Glow Spot BW" },
      { property: "og:url", content: "/reviews" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: Reviews,
});

const REVIEWS = [
  { name: "Tumi K.", stars: 5, text: "Glow Spot BW is the only place I trust with my nails. Always neat, always on time, always beautiful." },
  { name: "Lesego M.", stars: 5, text: "My gel set lasted four weeks with zero lifting. The studio is so clean and calm — exactly what I need." },
  { name: "Naledi R.", stars: 5, text: "The acrylic extensions are flawless. She studied my hands and shaped them perfectly to my fingers." },
  { name: "Boipelo S.", stars: 5, text: "Pedicure was heavenly. Walked in tired, walked out floating." },
  { name: "Kele D.", stars: 4, text: "Lovely vibe, great nails. Could use more parking nearby but the service is worth it." },
  { name: "Refilwe T.", stars: 5, text: "Got my wig installed and customized — the finish looked so natural, I left feeling like a baddie." },
];

function Reviews() {
  const avg = (REVIEWS.reduce((a, r) => a + r.stars, 0) / REVIEWS.length).toFixed(1);
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Loved by clients</p>
        <h1 className="mt-2 font-display text-4xl text-primary sm:text-5xl">Reviews</h1>
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="flex text-[color:var(--gold)]">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
          </div>
          <span className="text-sm text-muted-foreground">{avg} average · {REVIEWS.length} reviews</span>
        </div>
      </header>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {REVIEWS.map((r) => (
          <article key={r.name} className="glass shadow-soft rounded-2xl p-5">
            <div className="flex text-[color:var(--gold)]" aria-label={`${r.stars} out of 5 stars`}>
              {[...Array(r.stars)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
            <p className="mt-3 text-sm text-foreground/90">“{r.text}”</p>
            <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">— {r.name}</p>
          </article>
        ))}
      </div>
    </div>
  );
}