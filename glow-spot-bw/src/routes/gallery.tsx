import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
import { GALLERY, GALLERY_CATEGORIES } from "@/lib/site-data";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Glow Spot BW" },
      { name: "description", content: "Browse our latest nails, pedicure, makeup and wig work." },
      { property: "og:title", content: "Gallery — Glow Spot BW" },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Gallery,
});

function Gallery() {
  const [cat, setCat] = useState<(typeof GALLERY_CATEGORIES)[number]>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const items = cat === "All" ? GALLERY : GALLERY.filter((g) => g.category === cat);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Portfolio</p>
        <h1 className="mt-2 font-display text-4xl text-primary sm:text-5xl">Gallery</h1>
      </header>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {GALLERY_CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`rounded-full px-4 py-2 text-sm transition ${cat === c ? "bg-primary text-primary-foreground" : "border border-border bg-background text-foreground/80 hover:border-primary"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 columns-2 gap-3 sm:columns-3 md:columns-4">
        {items.map((g, i) => (
          <button
            key={g.src}
            type="button"
            onClick={() => setLightbox(i)}
            className="mb-3 block w-full overflow-hidden rounded-2xl break-inside-avoid"
            aria-label={`Open ${g.alt}`}
          >
            <img src={g.src} alt={g.alt} loading="lazy" className="w-full transition duration-500 hover:scale-105" />
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightbox(null)}
        >
          <button aria-label="Close" onClick={() => setLightbox(null)} className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white">
            <X className="h-5 w-5" />
          </button>
          <img src={items[lightbox].src} alt={items[lightbox].alt} className="max-h-[85vh] max-w-full rounded-2xl object-contain" />
        </div>
      )}
    </div>
  );
}