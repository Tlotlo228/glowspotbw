import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { GRADUATION_PACKAGES } from "@/lib/site-data";

const logo = { url: "/IMG_0434.jpeg" };

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-primary">404</h1>
        <h2 className="mt-4 font-display text-2xl text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl text-primary">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong. Try refreshing or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground">Try again</button>
          <a href="/" className="rounded-full border border-border bg-background px-5 py-2.5 text-sm">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Glow Spot BW — Beauty Studio in Gaborone" },
      { name: "description", content: "Premium nails, pedicures, makeup & wig services in Gaborone Main Mall. Book your glow with Glow Spot BW — est. 2019." },
      { name: "author", content: "Glow Spot BW" },
      { property: "og:site_name", content: "Glow Spot BW" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#f4ecdf" },
      { property: "og:title", content: "Glow Spot BW — Beauty Studio in Gaborone" },
      { name: "twitter:title", content: "Glow Spot BW — Beauty Studio in Gaborone" },
      { property: "og:description", content: "Premium nails, pedicures, makeup & wig services in Gaborone Main Mall. Book your glow with Glow Spot BW — est. 2019." },
      { name: "twitter:description", content: "Premium nails, pedicures, makeup & wig services in Gaborone Main Mall. Book your glow with Glow Spot BW — est. 2019." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a0d83569-4fcf-4ce5-93c2-7d06459befa6/id-preview-98653b38--de4ff378-66e9-401b-bc15-46c2f291aae7.lovable.app-1782810987800.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a0d83569-4fcf-4ce5-93c2-7d06459befa6/id-preview-98653b38--de4ff378-66e9-401b-bc15-46c2f291aae7.lovable.app-1782810987800.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" },
      { rel: "icon", href: logo.url },
    ],
  }),
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
  component: RootComponent,
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/packages", label: "Packages 🎓" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/reviews", label: "Reviews" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

function GradPromoPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("grad-popup-dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => setOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function dismiss() {
    sessionStorage.setItem("grad-popup-dismissed", "1");
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
      onClick={dismiss}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-3xl bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-rose-300 via-primary to-amber-300" />

        <button
          onClick={dismiss}
          className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition hover:bg-accent"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="px-6 pb-6 pt-5">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Limited Promo</p>
          <h2 className="mt-1 font-display text-3xl text-primary">Class of 2026 🎓</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Four packages made for your big day. Pick your vibe and graduate cute.
          </p>

          <ul className="mt-4 space-y-2">
            {GRADUATION_PACKAGES.map((pkg) => (
              <li key={pkg.id} className="flex items-center justify-between rounded-xl bg-accent/30 px-4 py-2.5">
                <div>
                  <p className="text-sm font-medium text-foreground">{pkg.name}</p>
                  <p className="text-xs text-muted-foreground">{pkg.vibe}</p>
                </div>
                <p className="font-display text-base text-primary">
                  from P{Math.min(...pkg.tiers.map((t) => t.price))}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Link
              to="/packages"
              onClick={dismiss}
              className="flex-1 rounded-full bg-primary px-5 py-2.5 text-center text-sm font-medium text-primary-foreground shadow-soft transition hover:opacity-90"
            >
              See All Packages →
            </Link>
            <button
              onClick={dismiss}
              className="flex-1 rounded-full border border-border px-5 py-2.5 text-sm text-muted-foreground transition hover:bg-accent"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 glass">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src={logo.url} alt="Glow Spot BW logo" className="h-10 w-10 rounded-full object-cover" />
          <span className="font-display text-lg tracking-wide text-primary">Glow Spot BW</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="text-sm text-foreground/70 transition hover:text-primary [&.active]:font-medium [&.active]:text-primary">
              {n.label}
            </Link>
          ))}
          <Link to="/book" className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft transition hover:opacity-90">
            Book Now
          </Link>
        </nav>
        <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X className="h-5 w-5 text-primary" /> : <Menu className="h-5 w-5 text-primary" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-2.5 text-base text-foreground/80 [&.active]:font-medium [&.active]:text-primary">
                {n.label}
              </Link>
            ))}
            <Link to="/book" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-primary px-4 py-3 text-center text-base font-medium text-primary-foreground">
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 text-center text-sm text-muted-foreground">
        <img src={logo.url} alt="Glow Spot BW" className="mx-auto mb-3 h-10 w-10 rounded-full object-cover" />
        <p className="font-display text-base text-primary">Glow Spot BW</p>
        <p className="mt-1">Main Mall, Opposite CCA · Gaborone, Botswana</p>
        <p className="mt-1">Est. 2019</p>
        <p className="mt-4 text-xs">© {new Date().getFullYear()} Glow Spot BW. All rights reserved.</p>
      </div>
    </footer>
  );
}

function RootComponent() {
  const queryClient = new QueryClient();
  return (
    <RootDocument>
      <QueryClientProvider client={queryClient}>
        <GradPromoPopup />
        <SiteHeader />
        <main className="min-h-dvh">
          <Outlet />
        </main>
        <SiteFooter />
      </QueryClientProvider>
    </RootDocument>
  );
}
