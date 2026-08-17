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
};

export const GALLERY = [
  {
    src: IMG.nailsZebra,
    alt: "Zebra French tip nail art",
    category: "Nails",
  },
  {
    src: IMG.nailsFrench,
    alt: "Rose-gold nails with floral 3D art",
    category: "Nails",
  },
  {
    src: IMG.nailsGold,
    alt: "Gold glitter ombre stiletto nails",
    category: "Lashes",
  },
  {
    src: IMG.lashes1,
    alt: "Volume lash extensions close-up",
    category: "Lashes",
  },
  {
    src: IMG.lashes2,
    alt: "Wispy lash extension fan",
    category: "Nails",
  },
  {
    src: IMG.pedicure,
    alt: "Leopard French tip pedicure",
    category: "All",
  },
  {
    src: IMG.flirty,
    alt: "Flirty Friday lash promo",
    category: "Promos",
  },
] as const;

export const GALLERY_CATEGORIES = [
  "All",
  "Nails",
  "Lashes",
  "Pedicure",
  "Promos",
] as const;

export type Service = {
  id: string;
  name: string;
  description: string;
  duration?: string;
  minutes: number;
  price: number;
  priceLabel?: string;
};

export const SERVICE_GROUPS: {
  group: string;
  services: Service[];
}[] = [
  // ============================================================
  // MANICURE
  // ============================================================

  {
    group: "Manicure",
    services: [
      {
        id: "rubber-base-overlay",
        name: "Rubber Base — Overlay",
        description: "Strengthening rubber base on natural nails.",
        price: 160,
        minutes: 60,
        duration: "≈ 1 hr",
      },
      {
        id: "rubber-base-extensions",
        name: "Rubber Base — Extensions / Tips",
        description: "Rubber base with tip extensions.",
        price: 220,
        minutes: 90,
        duration: "≈ 1 hr 30",
      },
      {
        id: "polygel-overlay",
        name: "Polygel — Overlay",
        description: "Lightweight polygel on natural nails.",
        price: 250,
        minutes: 75,
        duration: "≈ 1 hr 15",
      },
      {
        id: "polygel-extensions",
        name: "Polygel — Extensions / Tips",
        description: "Polygel with tip extensions.",
        price: 300,
        minutes: 105,
        duration: "≈ 1 hr 45",
      },
      {
        id: "acrylic-overlay",
        name: "Acrylic — Overlay",
        description: "Acrylic overlay on natural nails.",
        price: 300,
        minutes: 90,
        duration: "≈ 1 hr 30",
      },
      {
        id: "acrylic-extensions",
        name: "Acrylic — Extensions / Tips",
        description: "Full acrylic extensions in shape of choice.",
        price: 350,
        minutes: 120,
        duration: "≈ 2 hrs",
      },
      {
        id: "buff-shine",
        name: "Buff 'n Shine",
        description: "Natural nail buff & shine.",
        price: 70,
        minutes: 30,
        duration: "≈ 30 min",
      },
      {
        id: "buff-shine-design",
        name: "Buff 'n Shine with Design (Full Set)",
        description: "Buff & shine with hand-painted design.",
        price: 120,
        minutes: 45,
        duration: "≈ 45 min",
      },
    ],
  },

  // ============================================================
  // PEDICURE
  // ============================================================

  {
    group: "Pedicure",
    services: [
      {
        id: "foot-scrub",
        name: "Foot Scrub",
        description: "Deep cleansing foot scrub & soak.",
        price: 300,
        minutes: 45,
        duration: "≈ 45 min",
      },
      {
        id: "pedi-rubber-base",
        name: "Rubber Base Pedi",
        description: "Rubber base on toes.",
        price: 100,
        minutes: 45,
        duration: "≈ 45 min",
      },
      {
        id: "pedi-gel-tips",
        name: "Gel Tips Pedi",
        description: "Gel polish with tips on toes.",
        price: 130,
        minutes: 60,
        duration: "≈ 1 hr",
      },
      {
        id: "pedi-polygel",
        name: "Polygel Pedi",
        description: "Polygel finish on toes.",
        price: 150,
        minutes: 75,
        duration: "≈ 1 hr 15",
      },
      {
        id: "pedi-acrylic",
        name: "Acrylic Pedi",
        description: "Acrylic finish on toes.",
        price: 180,
        minutes: 90,
        duration: "≈ 1 hr 30",
      },
    ],
  },

  // ============================================================
  // LASHES
  // ============================================================

  {
    group: "Lashes",
    services: [
      {
        id: "lash-classic-set",
        name: "Classic Set",
        description: "Classic individual lash extensions.",
        price: 250,
        minutes: 90,
        duration: "≈ 1 hr 30",
      },
      {
        id: "lash-wet-set",
        name: "Wet Set",
        description: "Sleek wet-look lash extensions.",
        price: 280,
        minutes: 90,
        duration: "≈ 1 hr 30",
      },
      {
        id: "lash-hybrid-set",
        name: "Hybrid Set",
        description: "Combination of classic and volume lashes.",
        price: 320,
        minutes: 105,
        duration: "≈ 1 hr 45",
      },
      {
        id: "lash-volume-set",
        name: "Volume Set",
        description: "Fuller volume lash extensions.",
        price: 360,
        minutes: 120,
        duration: "≈ 2 hrs",
      },
      {
        id: "lash-wispy-volume",
        name: "Wispy Volume",
        description: "Soft, textured and wispy volume lashes.",
        price: 420,
        minutes: 120,
        duration: "≈ 2 hrs",
      },
      {
        id: "lash-cluster",
        name: "Cluster Lashes",
        description: "Cluster lashes for a quick, fuller look.",
        price: 150,
        minutes: 45,
        duration: "≈ 45 min",
      },

      // ----------------------------------------------------------
      // 2 WEEK REFILLS
      // ----------------------------------------------------------

      {
        id: "lash-refill-2wk-classic",
        name: "2 Week Refill — Classic Set",
        description: "Classic lash refill within 2 weeks.",
        price: 120,
        minutes: 60,
        duration: "≈ 1 hr",
      },
      {
        id: "lash-refill-2wk-wet",
        name: "2 Week Refill — Wet Set",
        description: "Wet set lash refill within 2 weeks.",
        price: 140,
        minutes: 60,
        duration: "≈ 1 hr",
      },
      {
        id: "lash-refill-2wk-hybrid",
        name: "2 Week Refill — Hybrid Set",
        description: "Hybrid lash refill within 2 weeks.",
        price: 160,
        minutes: 75,
        duration: "≈ 1 hr 15",
      },
      {
        id: "lash-refill-2wk-volume",
        name: "2 Week Refill — Volume Set",
        description: "Volume lash refill within 2 weeks.",
        price: 180,
        minutes: 75,
        duration: "≈ 1 hr 15",
      },
      {
        id: "lash-refill-2wk-wispy",
        name: "2 Week Refill — Wispy Volume",
        description: "Wispy volume refill within 2 weeks.",
        price: 180,
        minutes: 75,
        duration: "≈ 1 hr 15",
      },

      // ----------------------------------------------------------
      // 3 WEEK REFILLS
      // ----------------------------------------------------------

      {
        id: "lash-refill-3wk-classic",
        name: "3 Week Refill — Classic Set",
        description: "Classic lash refill within 3 weeks.",
        price: 140,
        minutes: 60,
        duration: "≈ 1 hr",
      },
      {
        id: "lash-refill-3wk-wet",
        name: "3 Week Refill — Wet Set",
        description: "Wet set lash refill within 3 weeks.",
        price: 160,
        minutes: 60,
        duration: "≈ 1 hr",
      },
      {
        id: "lash-refill-3wk-hybrid",
        name: "3 Week Refill — Hybrid Set",
        description: "Hybrid lash refill within 3 weeks.",
        price: 180,
        minutes: 75,
        duration: "≈ 1 hr 15",
      },
      {
        id: "lash-refill-3wk-volume",
        name: "3 Week Refill — Volume Set",
        description: "Volume lash refill within 3 weeks.",
        price: 200,
        minutes: 75,
        duration: "≈ 1 hr 15",
      },
      {
        id: "lash-refill-3wk-wispy",
        name: "3 Week Refill — Wispy Volume",
        description: "Wispy volume refill within 3 weeks.",
        price: 220,
        minutes: 75,
        duration: "≈ 1 hr 15",
      },

      // ----------------------------------------------------------
      // LASH REMOVALS
      // ----------------------------------------------------------

      {
        id: "lash-removal-individual",
        name: "Lash Removal — All Individuals",
        description: "Removal of individual lash extensions.",
        price: 100,
        minutes: 30,
        duration: "≈ 30 min",
      },
      {
        id: "lash-removal-clusters",
        name: "Lash Removal — Clusters",
        description: "Removal of cluster lashes.",
        price: 50,
        minutes: 20,
        duration: "≈ 20 min",
      },
    ],
  },

  // ============================================================
  // NAIL ART
  // ============================================================

  {
    group: "Nail Art",
    services: [
      {
        id: "art-chrome",
        name: "Chrome",
        description: "Mirror chrome finish per nail.",
        price: 30,
        minutes: 15,
        duration: "≈ 15 min add-on",
      },
      {
        id: "art-aura",
        name: "Aura / Ombré",
        description: "Soft aura or ombré effect.",
        price: 40,
        minutes: 20,
        duration: "≈ 20 min add-on",
      },
      {
        id: "art-3d",
        name: "3D Art (per nail)",
        description: "Sculpted 3D detail.",
        price: 10,
        minutes: 10,
        duration: "≈ 10 min add-on",
      },
      {
        id: "art-charms",
        name: "Charms (per nail)",
        description: "Decorative charms applied per nail.",
        price: 5,
        minutes: 5,
        duration: "≈ 5 min add-on",
      },
      {
        id: "art-freehand",
        name: "Free Hand (animals / cartoons)",
        description: "Hand-painted custom art — from P30.",
        price: 30,
        priceLabel: "from P30",
        minutes: 20,
        duration: "≈ 20 min add-on",
      },
      {
        id: "art-french-mani",
        name: "Classic French (Manicure)",
        description: "Add-on classic french tip on hands.",
        price: 40,
        minutes: 15,
        duration: "≈ 15 min add-on",
      },
      {
        id: "art-cateye-mani",
        name: "Cateye (Manicure)",
        description: "Add-on cateye effect on hands.",
        price: 30,
        minutes: 15,
        duration: "≈ 15 min add-on",
      },
      {
        id: "art-french-pedi",
        name: "Classic French (Pedicure)",
        description: "Add-on classic french tip on toes.",
        price: 20,
        minutes: 15,
        duration: "≈ 15 min add-on",
      },
      {
        id: "art-cateye-pedi",
        name: "Cateye (Pedicure)",
        description: "Add-on cateye effect on toes.",
        price: 20,
        minutes: 15,
        duration: "≈ 15 min add-on",
      },
    ],
  },

  // ============================================================
  // SOAK OFF
  // ============================================================

  {
    group: "Soak Off",
    services: [
      {
        id: "soak-gel",
        name: "Soak Off — Gel",
        description: "Safe removal of gel.",
        price: 30,
        minutes: 20,
        duration: "≈ 20 min",
      },
      {
        id: "soak-polygel",
        name: "Soak Off — Polygel",
        description: "Safe removal of polygel.",
        price: 30,
        minutes: 25,
        duration: "≈ 25 min",
      },
      {
        id: "soak-acrylic",
        name: "Soak Off — Acrylic",
        description: "Safe removal of acrylic.",
        price: 40,
        minutes: 30,
        duration: "≈ 30 min",
      },
    ],
  },

  // ============================================================
  // MAKEUP & HAIR
  // ============================================================

  {
    group: "Makeup & Hair",
    services: [
      {
        id: "soft-glam",
        name: "Soft Glam",
        description: "Natural, soft glam makeup look.",
        price: 150,
        minutes: 45,
        duration: "≈ 45 min",
      },
      {
        id: "full-glam",
        name: "Full Glam",
        description: "Full glam makeup for events.",
        price: 250,
        minutes: 75,
        duration: "≈ 1 hr 15",
      },
      {
        id: "wig-install",
        name: "Wig Install",
        description: "Professional wig install.",
        price: 200,
        minutes: 60,
        duration: "≈ 1 hr",
      },
      {
        id: "wig-wash",
        name: "Wig Wash",
        description: "Deep wash & refresh.",
        price: 120,
        minutes: 30,
        duration: "≈ 30 min",
      },
      {
        id: "wig-iron",
        name: "Wig Iron",
        description: "Iron & style your wig.",
        price: 80,
        minutes: 30,
        duration: "≈ 30 min",
      },
      {
        id: "wig-customize",
        name: "Wig Customize",
        description: "Plucking, bleaching & styling — from P100.",
        price: 100,
        priceLabel: "from P100",
        minutes: 60,
        duration: "≈ 1 hr",
      },
    ],
  },

  // ============================================================
  // GRADUATION PACKAGES
  // ============================================================

  {
    group: "🎓 Graduation Packages",
    services: [
      {
        id: "grad-glow-up-350",
        name: "Glow-Up Nails — Plain / Frenchies",
        description:
          "Nail Combo · Hands & Toes · Plain or Frenchies. Vibe: Classy + Neat.",
        price: 350,
        minutes: 90,
        duration: "≈ 1 hr 30",
      },
      {
        id: "grad-glow-up-420",
        name: "Glow-Up Nails — Complex Designs",
        description:
          "Complex Nail Combo · Hands & Toes · Complex designs. Vibe: Classy + Neat.",
        price: 420,
        minutes: 120,
        duration: "≈ 2 hrs",
      },

      {
        id: "grad-she-did-it-400",
        name: "She Did It — Makeup & Install",
        description:
          "Makeup & Install · Basic styling. Vibe: Main character + Dramatic.",
        price: 400,
        minutes: 75,
        duration: "≈ 1 hr 15",
      },
      {
        id: "grad-she-did-it-520",
        name: "She Did It — Makeup & Lashes",
        description:
          "Makeup & Lashes · Basic styling & Individual. Vibe: Main character + Dramatic.",
        price: 520,
        minutes: 90,
        duration: "≈ 1 hr 30",
      },
      {
        id: "grad-she-did-it-450",
        name: "She Did It — Makeup & Nails",
        description:
          "Makeup & Nails · Hands · Plain or Frenchies. Vibe: Main character + Dramatic.",
        price: 450,
        minutes: 105,
        duration: "≈ 1 hr 45",
      },

      {
        id: "grad-tassel-300",
        name: "Tassel Glam — Clusters",
        description:
          "Wig Install & Lashes · Basic styling & Clusters. Vibe: Flirty + Soft glam.",
        price: 300,
        minutes: 75,
        duration: "≈ 1 hr 15",
      },
      {
        id: "grad-tassel-460",
        name: "Tassel Glam — Individual",
        description:
          "Wig Install & Lashes · Basic styling & Individual. Vibe: Flirty + Soft glam.",
        price: 460,
        minutes: 90,
        duration: "≈ 1 hr 30",
      },

      {
        id: "grad-drip-duo-360",
        name: "Drip Duo — Plain / Frenchies",
        description:
          "Nails & Lashes · Hands & Clusters · Plain or Frenchies. Vibe: Baddie + Photo-Ready.",
        price: 360,
        minutes: 90,
        duration: "≈ 1 hr 30",
      },
      {
        id: "grad-drip-duo-500",
        name: "Drip Duo — Complex Designs",
        description:
          "Nails & Lashes · Hands & Individuals · Complex designs. Vibe: Baddie + Photo-Ready.",
        price: 500,
        minutes: 120,
        duration: "≈ 2 hrs",
      },
    ],
  },
];

// ============================================================
// BOOKING SETTINGS
// ============================================================

export const MAX_BOOKING_MINUTES = 120;

export const OPERATING_HOURS: Record<
  number,
  { open: number; close: number } | null
> = {
  0: { open: 11, close: 17 },
  1: null,
  2: { open: 9, close: 18 },
  3: { open: 9, close: 18 },
  4: { open: 9, close: 18 },
  5: { open: 9, close: 18 },
  6: { open: 9, close: 18 },
};

// ============================================================
// HELPERS
// ============================================================

export function formatMinutes(total: number): string {
  const h = Math.floor(total / 60);
  const m = total % 60;

  if (h && m) return `${h} hr ${m} min`;
  if (h) return `${h} hr`;

  return `${m} min`;
}

// ============================================================
// ALL SERVICES
// ============================================================

export const ALL_SERVICES: Service[] =
  SERVICE_GROUPS.flatMap((g) => g.services);

// ============================================================
// ADD-ONS
// ============================================================

export const ADD_ONS = [
  {
    id: "chrome",
    name: "Chrome",
    price: 30,
  },
  {
    id: "aura",
    name: "Aura / Ombré",
    price: 40,
  },
  {
    id: "charms",
    name: "Charms (per nail)",
    price: 5,
  },
  {
    id: "3d",
    name: "3D Art (per nail)",
    price: 10,
  },
] as const;

// ============================================================
// CONTACT
// ============================================================

export const WHATSAPP_NUMBER = "26772541683";

export const PHONE_DISPLAY = "+267 72 541 683";

export const INSTAGRAM_URL =
  "https://www.instagram.com/glowspot2861";

export const INSTAGRAM_HANDLE = "@glowspot2861";

// ============================================================
// PAYMENTS
// ============================================================

export const DEPOSIT_AMOUNT = 100;

export const AFTER_HOURS_FEE = 70;

export const CALENDAR_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1J7YZ_FMnOybCH-VCIOzWN6TSKioo39N2GQUW_k1VDqj40QK5cvBBi3actmEdZ-3-4B64BXTJO?gv=true";

export const PAYMENT_DETAILS = {
  orangeMoney: {
    name: "Glow Spot BW",
    number: "+267 72 541 683",
  },

  bank: {
    bank: "First National Bank Botswana",
    account: "62812345678",
    branch: "Main Mall",
    name: "Glow Spot BW",
  },
};

// ============================================================
// BLOCKED SLOTS
// ============================================================

export const BLOCKED_SLOTS: Record<string, string[]> = {
  "2026-07-01": [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
  ],

  "2026-07-02": [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
  ],

  "2026-07-03": [
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ],

  "2026-07-05": [
    "13:30",
    "14:00",
    "14:30",
  ],

  "2026-07-17": [
    "09:00",
    "09:30",
    "10:00",
  ],

  "2026-07-25": [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
  ],
};

// ============================================================
// GRADUATION PACKAGE TYPES
// ============================================================

export type GradPackageTier = {
  serviceId: string;
  price: number;
  includes: string[];
};

export type GradPackage = {
  id: string;
  name: string;
  vibe: string;
  tiers: GradPackageTier[];
};

// ============================================================
// GRADUATION PACKAGES
// ============================================================

export const GRADUATION_PACKAGES: GradPackage[] = [
  {
    id: "glow-up-nails",
    name: "1. Glow-Up Nails",
    vibe: "Classy + Neat",

    tiers: [
      {
        serviceId: "grad-glow-up-350",
        price: 350,
        includes: [
          "Nail Combo",
          "Hands & Toes",
          "Plain / Frenchies",
        ],
      },

      {
        serviceId: "grad-glow-up-420",
        price: 420,
        includes: [
          "Complex Nail Combo",
          "Hands & Toes",
          "Complex designs",
        ],
      },
    ],
  },

  {
    id: "she-did-it",
    name: "2. She Did It",
    vibe: "Main character + Dramatic",

    tiers: [
      {
        serviceId: "grad-she-did-it-400",
        price: 400,
        includes: [
          "Makeup & Install",
          "Makeup with basic styling",
        ],
      },

      {
        serviceId: "grad-she-did-it-520",
        price: 520,
        includes: [
          "Makeup & Lashes",
          "Basic styling & Individual",
        ],
      },

      {
        serviceId: "grad-she-did-it-450",
        price: 450,
        includes: [
          "Makeup & Nails",
          "Makeup & Hands",
          "Plain / Frenchies",
        ],
      },
    ],
  },

  {
    id: "tassel-glam",
    name: "3. Tassel Glam",
    vibe: "Flirty + Soft glam",

    tiers: [
      {
        serviceId: "grad-tassel-300",
        price: 300,
        includes: [
          "Wig Install & Lashes",
          "Basic styling & Clusters",
        ],
      },

      {
        serviceId: "grad-tassel-460",
        price: 460,
        includes: [
          "Wig Install & Lashes",
          "Basic styling & Individual",
        ],
      },
    ],
  },

  {
    id: "drip-duo",
    name: "4. Drip Duo",
    vibe: "Baddie + Photo-Ready",

    tiers: [
      {
        serviceId: "grad-drip-duo-360",
        price: 360,
        includes: [
          "Nails & Lashes",
          "Hands & Clusters",
          "Plain / Frenchies",
        ],
      },

      {
        serviceId: "grad-drip-duo-500",
        price: 500,
        includes: [
          "Nails & Lashes",
          "Hands & Individuals",
          "Complex designs",
        ],
      },
    ],
  },
];
