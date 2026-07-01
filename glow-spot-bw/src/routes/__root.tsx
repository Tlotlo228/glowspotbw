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
import logo from "../assets/gallery/logo.jpeg.asset.json";

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
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BeautySalon",
          name: "Glow Spot BW",
          image: logo.url,
          description: "Beauty studio offering nails, pedicures, nail art, makeup & wig services in Gaborone.",
          telephone: "+26772541683",
          address: { "@type": "PostalAddress", addressLocality: "Gaborone", streetAddress: "Main Mall", addressCountry: "BW" },
          openingHours: ["Tu-Sa 09:00-18:00", "Su 11:00-17:00"],
          priceRange: "BWP",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/reviews", label: "Reviews" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

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
            <Link key={n.to} to={n.to} className="text-sm text-foreground/80 transition hover:text-primary" activeProps={{ className: "text-primary font-medium" }}>
              {n.label}
            </Link>
          ))}
          <Link to="/book" className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft transition hover:opacity-90">
            Book Now
          </Link>
        </nav>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-primary md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-3 text-base text-foreground" activeProps={{ className: "text-primary font-medium" }}>
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
    <footer className="mt-16 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <img src={logo.url} alt="" className="h-9 w-9 rounded-full object-cover" />
            <span className="font-display text-xl text-primary">Glow Spot BW</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Beauty studio in Gaborone Main Mall. Nails, pedicures, makeup & wigs — crafted with care since 2019.
          </p>
        </div>
        <div>
          <h4 className="font-display text-lg text-primary">Visit</h4>
          <p className="mt-2 text-sm text-muted-foreground">Main Mall, Gaborone, Botswana</p>
          <p className="mt-1 text-sm text-muted-foreground">Tue–Sat 09:00–18:00 · Sun 11:00–17:00 · Mon closed</p>
        </div>
        <div>
          <h4 className="font-display text-lg text-primary">Connect</h4>
          <p className="mt-2 text-sm text-muted-foreground">WhatsApp: +267 72 541 683</p>
          <a href="https://wa.me/26772541683" className="mt-3 inline-flex rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground">Message us</a>
          <p className="mt-2 text-sm text-muted-foreground">Instagram: <a href="https://www.instagram.com/glowspot2861" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@glowspot2861</a></p>
        </div>
      </div>
      <p className="pb-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Glow Spot BW. All rights reserved.</p>
    </footer>
  );
}