const IMG = {
  logo: "https://i.postimg.cc/y8sRt3qK/IMG-0742.jpg",
  nailsNude: "https://i.postimg.cc/59sVcZQR/IMG-0741.jpg",
  nailsZebra: "https://i.postimg.cc/qB55x03q/IMG-0740.jpg",
  nailsFrench: "https://i.postimg.cc/v84ss07w/IMG-0739.jpg",
  nailsGold: "https://i.postimg.cc/CKh367MX/IMG-0738.jpg",
  lashes1: "https://i.postimg.cc/BZLdyXsD/IMG-0737.jpg",
  lashes2: "https://i.postimg.cc/K8FwRfTQ/IMG-0735.jpg",
  pedicure: "https://i.postimg.cc/gJfBdHdF/IMG-0446.png",
  flirty: "https://i.postimg.cc/L6vB337Z/IMG-0445.png",
  directions: "https://i.postimg.cc/L6k0KPWM/IMG-0732.jpg",

  // New Gallery Images
  gallery1: "https://i.postimg.cc/mDV04vZ2/IMG-5834.jpg",
  gallery2: "https://i.postimg.cc/sXctyv9G/IMG-4834.jpg",
  gallery3: "https://i.postimg.cc/brVWDWBC/IMG-8029.jpg",
  gallery4: "https://i.postimg.cc/WzYCFCys/IMG-0625.jpg",
  gallery5: "https://i.postimg.cc/QCYw9wyy/IMG-9448.jpg",
  gallery6: "https://i.postimg.cc/2y9MbMKP/IMG-9496.jpg",
  gallery7: "https://i.postimg.cc/5yKTYTr9/IMG-9519.jpg",
  gallery8: "https://i.postimg.cc/NGdWz2jr/IMG-9640.jpg",
  gallery9: "https://i.postimg.cc/RCgjDJZw/IMG-9655.jpg",
  gallery10: "https://i.postimg.cc/xTkFps71/IMG-9850.jpg",
  gallery11: "https://i.postimg.cc/6571bHSt/IMG-9847.jpg",
  gallery12: "https://i.postimg.cc/Yq4yDXVr/IMG-0217.jpg",
  gallery13: "https://i.postimg.cc/ZK9DsfgT/IMG-0402.jpg",
  gallery14: "https://i.postimg.cc/RV3bpP8H/IMG-0545.jpg",
  gallery15: "https://i.postimg.cc/XYd14r41/IMG-9576.jpg",
  gallery16: "https://i.postimg.cc/2Sh9r1rT/IMG-9535.jpg",
};

export const GALLERY = [
  { src: IMG.nailsZebra, alt: "Zebra French tip nail art", category: "Nails" },
  { src: IMG.nailsFrench, alt: "Rose-gold nails with floral 3D art", category: "Nails" },
  { src: IMG.nailsGold, alt: "Gold glitter ombre stiletto nails", category: "Nails" },
  { src: IMG.lashes1, alt: "Volume lash extensions close-up", category: "Lashes" },
  { src: IMG.lashes2, alt: "Wispy lash extension fan", category: "Lashes" },
  { src: IMG.pedicure, alt: "Leopard French tip pedicure", category: "Nails" },
  { src: IMG.flirty, alt: "Flirty Friday lash promo", category: "Promos" },

  // New Images
  { src: IMG.gallery1, alt: "Luxury nail art design", category: "Nails" },
  { src: IMG.gallery2, alt: "Luxury nail art design", category: "Nails" },
  { src: IMG.gallery3, alt: "Luxury nail art design", category: "Nails" },
  { src: IMG.gallery4, alt: "Luxury nail art design", category: "Nails" },
  { src: IMG.gallery5, alt: "Luxury nail art design", category: "Nails" },
  { src: IMG.gallery6, alt: "Luxury nail art design", category: "Nails" },
  { src: IMG.gallery7, alt: "Luxury nail art design", category: "Nails" },
  { src: IMG.gallery8, alt: "Luxury nail art design", category: "Nails" },
  { src: IMG.gallery9, alt: "Luxury nail art design", category: "Nails" },
  { src: IMG.gallery10, alt: "Luxury nail art design", category: "Nails" },
  { src: IMG.gallery11, alt: "Luxury nail art design", category: "Nails" },
  { src: IMG.gallery12, alt: "Luxury nail art design", category: "Nails" },
  { src: IMG.gallery13, alt: "Luxury nail art design", category: "Nails" },
  { src: IMG.gallery14, alt: "Luxury nail art design", category: "Nails" },
  { src: IMG.gallery15, alt: "Luxury nail art design", category: "Nails" },
  { src: IMG.gallery16, alt: "Luxury nail art design", category: "Nails" },
] as const;

export const GALLERY_CATEGORIES = ["All", "Nails", "Lashes", "Pedicure", "Promos"] as const;

export type Service = {
  id: string;
  name: string;
  description: string;
  duration?: string;
  minutes: number;
  price: number;
  priceLabel?: string;
  quantitySelectable?: boolean;
};

export const SERVICE_GROUPS: { group: string; services: Service[] }[] = [
  {
    group: "Manicure",
    services: [
      { id: "rubber-base-overlay", name: "Rubber Base — Overlay", description: "Strengthening rubber base on natural nails.", price: 160, minutes: 60, duration: "≈ 1 hr" },
      { id: "rubber-base-extensions", name: "Rubber Base — Extensions / Tips", description: "Rubber base with tip extensions.", price: 220, minutes: 90, duration: "≈ 1 hr 30" },
      { id: "polygel-overlay", name: "Polygel — Overlay", description: "Lightweight polygel on natural nails.", price: 250, minutes: 75, duration: "≈ 1 hr 15" },
      { id: "polygel-extensions", name: "Polygel — Extensions / Tips", description: "Polygel with tip extensions.", price: 300, minutes: 105, duration: "≈ 1 hr 45" },
      { id: "acrylic-overlay", name: "Acrylic — Overlay", description: "Acrylic overlay on natural nails.", price: 300, minutes: 90, duration: "≈ 1 hr 30" },
      { id: "acrylic-extensions", name: "Acrylic — Extensions / Tips", description: "Full acrylic extensions in shape of choice.", price: 350, minutes: 120, duration: "≈ 2 hrs" },
      { id: "buff-shine", name: "Buff 'n Shine", description: "Natural nail buff & shine.", price: 70, minutes: 30, duration: "≈ 30 min" },
      { id: "buff-shine-design", name: "Buff 'n Shine with Design (Full Set)", description: "Buff & shine with hand-painted design.", price: 120, minutes: 45, duration: "≈ 45 min" },
    ],
  },
  {
    group: "Pedicure",
    services: [
      { id: "foot-scrub", name: "Foot Scrub", description: "Deep cleansing foot scrub & soak.", price: 300, minutes: 45, duration: "≈ 45 min" },
      { id: "pedi-rubber-base", name: "Rubber Base Pedi", description: "Rubber base on toes.", price: 100, minutes: 45, duration: "≈ 45 min" },
      { id: "pedi-gel-tips", name: "Gel Tips Pedi", description: "Gel polish with tips on toes.", price: 130, minutes: 60, duration: "≈ 1 hr" },
      { id: "pedi-polygel", name: "Polygel Pedi", description: "Polygel finish on toes.", price: 150, minutes: 75, duration: "≈ 1 hr 15" },
      { id: "pedi-acrylic", name: "Acrylic Pedi", description: "Acrylic finish on toes.", price: 180, minutes: 90, duration: "≈ 1 hr 30" },
    ],
  },{
  group: "Nail Art",
  services: [
    {
      id: "art-chrome",
      name: "Chrome",
      description: "Mirror chrome finish per nail.",
      price: 30,
      minutes: 15,
      duration: "≈ 15 min add-on",
      quantitySelectable: true,
    },
    {
      id: "art-aura",
      name: "Aura / Ombré",
      description: "Soft aura or ombré effect.",
      price: 40,
      minutes: 20,
      duration: "≈ 20 min add-on",
      quantitySelectable: true,
    },
    {
      id: "art-3d",
      name: "3D Art (per nail)",
      description: "Sculpted 3D detail.",
      price: 10,
      minutes: 10,
      duration: "≈ 10 min add-on",
      quantitySelectable: true,
    },
    {
      id: "art-charms",
      name: "Charms (per nail)",
      description: "Decorative charms applied per nail.",
      price: 5,
      minutes: 5,
      duration: "≈ 5 min add-on",
      quantitySelectable: true,
    },
    {
      id: "art-freehand",
      name: "Free Hand (animals / cartoons)",
      description: "Hand-painted custom art — from P30.",
      price: 30,
      priceLabel: "from P30",
      minutes: 20,
      duration: "≈ 20 min add-on",
      quantitySelectable: true,
    },
    {
      id: "art-french-mani",
      name: "Classic French (Manicure)",
      description: "Add-on classic french tip on hands.",
      price: 40,
      minutes: 15,
      duration: "≈ 15 min add-on",
      quantitySelectable: true,
    },
    {
      id: "art-cateye-mani",
      name: "Cateye (Manicure)",
      description: "Add-on cateye effect on hands.",
      price: 30,
      minutes: 15,
      duration: "≈ 15 min add-on",
      quantitySelectable: true,
    },
    {
      id: "art-french-pedi",
      name: "Classic French (Pedicure)",
      description: "Add-on classic french tip on toes.",
      price: 20,
      minutes: 15,
      duration: "≈ 15 min add-on",
      quantitySelectable: true,
    },
    {
      id: "art-cateye-pedi",
      name: "Cateye (Pedicure)",
      description: "Add-on cateye effect on toes.",
      price: 20,
      minutes: 15,
      duration: "≈ 15 min add-on",
      quantitySelectable: true,
    },
  ],
},
  {
    group: "Soak Off",
    services: [
      { id: "soak-gel", name: "Soak Off — Gel", description: "Safe removal of gel.", price: 30, minutes: 20, duration: "≈ 20 min" },
      { id: "soak-polygel", name: "Soak Off — Polygel", description: "Safe removal of polygel.", price: 30, minutes: 25, duration: "≈ 25 min" },
      { id: "soak-acrylic", name: "Soak Off — Acrylic", description: "Safe removal of acrylic.", price: 40, minutes: 30, duration: "≈ 30 min" },
    ],
  },
    {
    group: "Lashes",
    services: [
      { id: "lash-classic", name: "Classic Set", description: "Full set of classic lash extensions.", price: 250, minutes: 90, duration: "≈ 1 hr 30" },
      { id: "lash-wet", name: "Wet Set", description: "Full set of wet-look lash extensions.", price: 280, minutes: 90, duration: "≈ 1 hr 30" },
      { id: "lash-hybrid", name: "Hybrid Set", description: "Full set of hybrid lash extensions.", price: 320, minutes: 105, duration: "≈ 1 hr 45" },
      { id: "lash-volume", name: "Volume Set", description: "Full set of volume lash extensions.", price: 360, minutes: 120, duration: "≈ 2 hrs" },
      { id: "lash-wispy-volume", name: "Wispy Volume", description: "Full set of wispy volume lash extensions.", price: 420, minutes: 120, duration: "≈ 2 hrs" },
      { id: "lash-cluster", name: "Cluster Lashes", description: "Full set of cluster lashes.", price: 150, minutes: 60, duration: "≈ 1 hr" },
    ],
  },
  {
    group: "Lash Re-fills — 2 Weeks",
    services: [
      { id: "refill2-classic", name: "Classic Set Re-fill", description: "2-week re-fill for classic lashes.", price: 120, minutes: 45, duration: "≈ 45 min" },
      { id: "refill2-wet", name: "Wet Set Re-fill", description: "2-week re-fill for wet-look lashes.", price: 140, minutes: 45, duration: "≈ 45 min" },
      { id: "refill2-hybrid", name: "Hybrid Set Re-fill", description: "2-week re-fill for hybrid lashes.", price: 160, minutes: 60, duration: "≈ 1 hr" },
      { id: "refill2-volume", name: "Volume Set Re-fill", description: "2-week re-fill for volume lashes.", price: 180, minutes: 60, duration: "≈ 1 hr" },
      { id: "refill2-wispy-volume", name: "Wispy Volume Re-fill", description: "2-week re-fill for wispy volume lashes.", price: 180, minutes: 60, duration: "≈ 1 hr" },
    ],
  },
  {
    group: "Lash Re-fills — 3 Weeks",
    services: [
      { id: "refill3-classic", name: "Classic Set Re-fill", description: "3-week re-fill for classic lashes.", price: 140, minutes: 45, duration: "≈ 45 min" },
      { id: "refill3-wet", name: "Wet Set Re-fill", description: "3-week re-fill for wet-look lashes.", price: 160, minutes: 45, duration: "≈ 45 min" },
      { id: "refill3-hybrid", name: "Hybrid Set Re-fill", description: "3-week re-fill for hybrid lashes.", price: 180, minutes: 60, duration: "≈ 1 hr" },
      { id: "refill3-volume", name: "Volume Set Re-fill", description: "3-week re-fill for volume lashes.", price: 200, minutes: 60, duration: "≈ 1 hr" },
      { id: "refill3-wispy-volume", name: "Wispy Volume Re-fill", description: "3-week re-fill for wispy volume lashes.", price: 220, minutes: 60, duration: "≈ 1 hr" },
    ],
  },
  {
    group: "Lash Removals",
    services: [
      { id: "removal-individuals", name: "All Individuals Removal", description: "Removal of individual lash extensions. Free if paired with a fresh set.", price: 100, minutes: 20, duration: "≈ 20 min" },
      { id: "removal-clusters", name: "Clusters Removal", description: "Removal of cluster lashes. Free if paired with a fresh set.", price: 50, minutes: 15, duration: "≈ 15 min" },
    ],
  },

  {
    group: "Makeup & Hair",
    services: [
      { id: "soft-glam", name: "Soft Glam", description: "Natural, soft glam makeup look.", price: 150, minutes: 45, duration: "≈ 45 min" },
      { id: "full-glam", name: "Full Glam", description: "Full glam makeup for events.", price: 250, minutes: 75, duration: "≈ 1 hr 15" },
      { id: "wig-install", name: "Wig Install", description: "Professional wig install.", price: 200, minutes: 60, duration: "≈ 1 hr" },
      { id: "wig-wash", name: "Wig Wash", description: "Deep wash & refresh.", price: 120, minutes: 30, duration: "≈ 30 min" },
      { id: "wig-iron", name: "Wig Iron", description: "Iron & style your wig.", price: 80, minutes: 30, duration: "≈ 30 min" },
      { id: "wig-customize", name: "Wig Customize", description: "Plucking, bleaching & styling — from P100.", price: 100, priceLabel: "from P100", minutes: 60, duration: "≈ 1 hr" },
    ],
  },
];

export const MAX_BOOKING_MINUTES = 120;

// Tue–Sat: 09:00–18:00, Sun: 11:00–17:00, Mon: closed.
// Times are Africa/Gaborone local (site is Botswana-local only).
export const OPERATING_HOURS: Record<number, { open: number; close: number } | null> = {
  0: { open: 11, close: 17 }, // Sun
  1: null,                     // Mon closed
  2: { open: 9, close: 18 },
  3: { open: 9, close: 18 },
  4: { open: 9, close: 18 },
  5: { open: 9, close: 18 },
  6: { open: 9, close: 18 },
};

export function formatMinutes(total: number): string {
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (h && m) return `${h} hr ${m} min`;
  if (h) return `${h} hr`;
  return `${m} min`;
}

export const ALL_SERVICES: Service[] = SERVICE_GROUPS.flatMap((g) => g.services);

export const ADD_ONS = [
  { id: "chrome", name: "Chrome", price: 30 },
  { id: "aura", name: "Aura / Ombré", price: 40 },
  { id: "charms", name: "Charms (per nail)", price: 5 },
  { id: "3d", name: "3D Art (per nail)", price: 10 },
] as const;

export const WHATSAPP_NUMBER = "26772541683";
export const PHONE_DISPLAY = "+267 72 541 683";
export const INSTAGRAM_URL = "https://www.instagram.com/glowspot2861";
export const INSTAGRAM_HANDLE = "@glowspot2861";

export const DEPOSIT_AMOUNT = 100;
export const AFTER_HOURS_FEE = 70;
export const CALENDAR_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1J7YZ_FMnOybCH-VCIOzWN6TSKioo39N2GQUW_k1VDqj40QK5cvBBi3actmEdZ-3-4B64BXTJO?gv=true&ctz=Africa%2FGaborone";

export const PAYMENT_DETAILS = {
  orangeMoney: { name: "Glow Spot BW (Pay2Cell/Orange Money)", number: "72541683" },
  bank: {
    bank: "First National Bank Botswana",
    name: "Glow Spot Bw",
    account: "63138523435",
    branch: "Broadhurst Industrial",
    branchCode: "281267",
  },
};


export const BLOCKED_SLOTS: Record<string, string[]> = {
  "2026-07-01": ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00"],
  "2026-07-02": ["09:00", "09:30", "10:00", "10:30", "11:00"],
  "2026-07-03": ["15:00", "15:30", "16:00", "16:30"],
  "2026-07-05": ["13:30", "14:00", "14:30"],
  "2026-07-17": ["09:00", "09:30", "10:00"],
  "2026-07-25": ["09:00", "09:30", "10:00", "10:30"],
};
