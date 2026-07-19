// All site content. One file, no fluff.

export const profile = {
  name: "Faeez Kader",
  firstName: "Faeez",
  location: "Gauteng, South Africa",
  email: "kaderfaeez@gmail.com",
  phone: "071 670 1079",
  phoneHref: "+27716701079",
  github: "https://github.com/kaderfaeez-cmd",
  githubHandle: "kaderfaeez-cmd",
  availability: "Available for work",
  tagline: "Software developer in Gauteng, South Africa. I build web software end-to-end and ship something every day.",
  // hero
  heroKicker: "Software developer — building daily",
  heroLine: "I build web software end-to-end, and I ship something every day.",
  heroSub: "Computer Science student. Former shop-floor manager. Eight live products in the last two months.",
} as const;

export type CaseStudy = {
  id: string;
  index: string;
  title: string;
  year: string;
  kind: string;
  oneLiner: string;
  context: string;
  build: string;
  result: string;
  stack: string[];
  live: string;
  code: string;
  featured: boolean;
};

export const work: CaseStudy[] = [
  {
    id: "akhals",
    index: "01",
    title: "Akhal's Recipes",
    year: "2026",
    kind: "Client work — real product",
    oneLiner: "A recipe platform for a real spice brand, reached by scanning the packet.",
    context:
      "Akhal's Spice and More is a real shop — the one I used to help run. Customers kept asking the same question at the counter: what do I actually cook with this? The packets had no room for recipes, and a link nobody types is a link nobody visits.",
    build:
      "Every packet gets a QR code that lands on that spice's own recipe page. Behind it: a Next.js app with a Postgres database, an admin dashboard where the shop manages recipes without touching code, and a design that works one-handed in a kitchen. Deployed on a custom domain the brand owns.",
    result:
      "Live in production at akhalsrecipes.com and printed on real packaging in a real store. My first piece of software with users who don't know me.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Neon", "Vercel"],
    live: "https://akhalsrecipes.com",
    code: "https://github.com/kaderfaeez-cmd/akhals-recipes",
    featured: true,
  },
  {
    id: "autoapply",
    index: "02",
    title: "AutoApply",
    year: "2026",
    kind: "Product — end to end",
    oneLiner: "A career operating system that runs a job hunt like a pipeline.",
    context:
      "Job applications get lost, follow-ups get forgotten, and every listing wants a slightly different version of the same CV. I wanted the whole process in one place.",
    build:
      "Live job scanning, AI-generated application kits per listing, and a drag-and-drop kanban that treats every application as a deal to close. Designed so the AI layer degrades gracefully: no API key, and it still works with template-based kits.",
    result:
      "Live and in daily use — starting with my own job hunt. The fallback architecture means the free deployment never breaks.",
    stack: ["Next.js", "TypeScript", "GenAI", "Tailwind"],
    live: "https://autoapply-lyart.vercel.app",
    code: "https://github.com/kaderfaeez-cmd/autoapply",
    featured: true,
  },
  {
    id: "vanta",
    index: "03",
    title: "Vanta",
    year: "2026",
    kind: "Craft — real-time 3D",
    oneLiner: "A cinematic WebGL showcase where a procedural handgun assembles as you scroll.",
    context:
      "I wanted to prove I could do the hard, visual end of the web: real-time 3D that feels intentional rather than decorative, tied to scroll in a way that tells a story.",
    build:
      "React Three Fiber scene with a fully procedural model — every part positioned in code, assembled piece by piece on scroll with live telemetry readouts. Custom lighting rig, post-processing, and a configurator for materials.",
    result:
      "The most technically demanding front-end I've shipped. It taught me more about performance budgets than any tutorial could.",
    stack: ["Next.js", "React Three Fiber", "WebGL", "TypeScript"],
    live: "https://vanta-murex.vercel.app",
    code: "https://github.com/kaderfaeez-cmd/vanta",
    featured: true,
  },
  {
    id: "aegis",
    index: "04",
    title: "Aegis",
    year: "2026",
    kind: "Tool — AI + security",
    oneLiner: "Paste code, get severity-ranked findings: bugs, vulnerabilities, fixes.",
    context:
      "Code review is where I learn fastest, so I built the reviewer I wanted: one that flags security smells and performance traps before a human ever looks.",
    build:
      "An analysis pipeline over a free-tier AI model with structured output — every finding gets a severity, an explanation, and a concrete fix. Built to cost nothing to run.",
    result:
      "Live and free to use. I run my own projects through it before shipping.",
    stack: ["Next.js", "TypeScript", "Gemini", "Security"],
    live: "https://aegis-green-eight.vercel.app",
    code: "https://github.com/kaderfaeez-cmd/aegis",
    featured: true,
  },
  {
    id: "caliber",
    index: "05",
    title: "Caliber",
    year: "2026",
    kind: "Tool — AI",
    oneLiner: "Resume optimizer: ATS score, bullet rewrites, missing keywords.",
    context: "",
    build: "",
    result: "",
    stack: ["Next.js", "TypeScript", "Claude API"],
    live: "https://caliber-kappa.vercel.app",
    code: "https://github.com/kaderfaeez-cmd/caliber",
    featured: false,
  },
  {
    id: "stocksense",
    index: "06",
    title: "StockSense",
    year: "2026",
    kind: "Dashboard — data",
    oneLiner: "Inventory forecasting born from managing real stock in a real shop.",
    context: "",
    build: "",
    result: "",
    stack: ["Next.js", "TypeScript", "Charts"],
    live: "https://stocksense-mauve.vercel.app",
    code: "https://github.com/kaderfaeez-cmd/stocksense",
    featured: false,
  },
  {
    id: "sentinel",
    index: "07",
    title: "Sentinel",
    year: "2026",
    kind: "Dashboard — security",
    oneLiner: "Security operations console: live threat feed, risk scoring, auth events.",
    context: "",
    build: "",
    result: "",
    stack: ["Next.js", "TypeScript", "Data viz"],
    live: "https://sentinel-opal-pi.vercel.app",
    code: "https://github.com/kaderfaeez-cmd/sentinel",
    featured: false,
  },
  {
    id: "lumen",
    index: "08",
    title: "Lumen",
    year: "2026",
    kind: "Product — AI writing",
    oneLiner: "A writing studio that turns rough notes into finished prose.",
    context: "",
    build: "",
    result: "",
    stack: ["Next.js", "TypeScript", "Claude API"],
    live: "https://lumen-lilac-seven.vercel.app",
    code: "https://github.com/kaderfaeez-cmd/Lumen",
    featured: false,
  },
];

export const principles = [
  {
    n: "01",
    title: "Ship daily",
    body: "I put something live every day. Small, frequent releases keep projects moving — every build on this page went from empty repo to live URL in weeks, not months.",
  },
  {
    n: "02",
    title: "Quality is non-negotiable",
    body: "Managing a store taught me a simple rule: if it's not right, it doesn't go out. I apply the same rule to interfaces — error states, empty states and edge cases included.",
  },
  {
    n: "03",
    title: "Real projects only",
    body: "Everything here has real users or real stakes — a paying client, my own job hunt, a live store. That's where the actual learning is.",
  },
  {
    n: "04",
    title: "Plan for failure",
    body: "Free tiers expire, API keys go missing, mobile browsers block autoplay. I build the fallback first, so nothing breaks when a dependency does.",
  },
];

export const about = {
  heading: "I managed a shop before I wrote software.",
  paras: [
    "Before university I was assistant manager at Akhal's Spice and More, a family spice shop — a team of six, stock control, budgets, and the daily problems a small business throws at you.",
    "That experience shaped how I build. Retail runs on systems — inventory, cash-up, staffing — and when one breaks, you feel it immediately. Software is the same, just faster to fix.",
    "Now I'm studying Computer Science at Varsity College and shipping web products daily. My first client was the shop itself: a recipe platform that's now printed on their packaging in stores.",
    "Java, C# and Kotlin from my degree. TypeScript, React and Next.js from shipping. Open to junior roles and freelance work.",
  ],
  facts: [
    ["Now", "BCompSci, Varsity College"],
    ["Before", "Assistant manager, retail"],
    ["Stack", "TypeScript · React · Next.js · Java · C#"],
    ["Base", "Gauteng, South Africa"],
  ],
} as const;

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "How I work", href: "#thinking" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;
