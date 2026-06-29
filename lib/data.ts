// Single source of truth for all portfolio content.
// Parsed from Faeez Kader's CV and structured as a developer / AI / PM portfolio.

export const profile = {
  name: "Faeez Kader",
  firstName: "Faeez",
  lastName: "Kader",
  initials: "FK",
  roles: [
    "Software Developer",
    "AI Engineer",
    "Project Manager",
    "Full-Stack Developer",
    "Tech Creator",
  ],
  location: "Gauteng, South Africa",
  email: "kaderfaeez@gmail.com",
  phone: "071 670 1079",
  phoneHref: "+27716701079",
  github: "https://github.com/ST10369371",
  githubHandle: "ST10369371",
  availability: "Available for opportunities",
  tagline:
    "Computer Science student and team leader engineering software at the intersection of AI, systems thinking, and design.",
  heroLine:
    "I build intelligent, well-engineered software — bringing the operational discipline of leading real teams to the craft of code.",
  bio: [
    "I'm a Computer Science student at Varsity College and a hands-on team leader who came into tech through systems and operations. Before writing software full-time, I ran a retail team — owning recruitment, budgets, inventory, and the kind of standards that don't survive sloppy execution.",
    "I now channel that same discipline into building things: full-stack web applications, generative-AI experiments, and clean, considered interfaces. I care about software engineering, AI, cybersecurity, UI/UX, and the business thinking that ties them all together.",
  ],
} as const;

export const metrics = [
  { value: 6, suffix: "", label: "Team led & trained" },
  { value: 2, suffix: "+", label: "Years leading operations" },
  { value: 4, suffix: "+", label: "Years community service" },
  { value: 8, suffix: "", label: "Core focus areas" },
] as const;

export type SkillCategory = {
  id: string;
  title: string;
  icon: string;
  blurb: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: "code",
    blurb: "Interfaces that feel fast, intentional, and alive.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML / CSS"],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "server",
    blurb: "Typed, structured services and clean APIs.",
    skills: ["Java", "C#", "Kotlin", "Node.js", "REST APIs", "OOP"],
  },
  {
    id: "ai",
    title: "AI / ML",
    icon: "sparkles",
    blurb: "Building with LLMs and generative AI.",
    skills: ["Generative AI", "LLM Apps", "Prompt Engineering", "Python", "Claude / OpenAI APIs"],
  },
  {
    id: "security",
    title: "Cybersecurity",
    icon: "shield",
    blurb: "Secure-by-default thinking.",
    skills: ["Secure Coding", "OWASP Top 10", "Auth & Sessions", "Threat Modelling"],
  },
  {
    id: "data",
    title: "Data & Databases",
    icon: "database",
    blurb: "Turning records into decisions.",
    skills: ["SQL", "PostgreSQL", "Data Modelling", "Analytics", "Data Viz"],
  },
  {
    id: "cloud",
    title: "Cloud / DevOps",
    icon: "cloud",
    blurb: "Ship it, version it, keep it green.",
    skills: ["Vercel", "Git & GitHub", "CI Basics", "Edge Deploys"],
  },
  {
    id: "pm",
    title: "Project Management",
    icon: "target",
    blurb: "Leading people and shipping outcomes.",
    skills: ["Team Leadership", "Agile / Ops", "Budgeting", "Stakeholder Comms"],
  },
  {
    id: "design",
    title: "UI / UX",
    icon: "palette",
    blurb: "Systems, motion, and the details.",
    skills: ["Design Systems", "Interaction Design", "Prototyping", "Accessibility"],
  },
];

export type Experience = {
  role: string;
  company: string;
  badge?: string;
  period: string;
  summary: string;
  points: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    role: "Computer Science Student",
    company: "Varsity College",
    period: "2023 — Present",
    summary:
      "Pursuing a Bachelor of Computer Science in Application & Web Development while building real projects on the side.",
    points: [
      "Studying object-oriented programming, application & web development, databases, and software design.",
      "Building fluency across Java, C#, Kotlin and the modern web stack (React, Next.js, TypeScript).",
      "Self-directed work in generative AI, security fundamentals, and UI/UX engineering.",
    ],
    tags: ["Software Engineering", "Web Development", "AI", "Databases"],
  },
  {
    role: "Assistant Manager",
    company: "Akhal's Spice and More",
    period: "2022 — 2024",
    summary:
      "Led a team and ran day-to-day operations — the project-management and systems foundation behind how I build software.",
    points: [
      "Built and led a team of 6 — recruitment, training, and daily supervision; faster stock turnaround and fewer complaints within months.",
      "Ran social media and marketing end-to-end, growing foot traffic and repeat customers with no agency or budget.",
      "Re-engineered the stock process supplier-orders → returns, cutting audit inventory errors each quarter.",
      "Owned monthly budgets and financial records, flagging inefficiencies early to keep the store profitable.",
    ],
    tags: ["Leadership", "Operations", "Budgeting", "Systems Thinking"],
  },
  {
    role: "Volunteer",
    company: "Amani Ink'd",
    badge: "NPO",
    period: "2022 — Present",
    summary:
      "Multi-year humanitarian volunteering — community outreach and on-the-ground assistance.",
    points: [
      "Supported humanitarian aid initiatives with the NPO team, helping vulnerable communities through organised outreach.",
      "Showed up consistently across multiple years — leadership and genuine care beyond a formal work setting.",
    ],
    tags: ["Community", "Leadership", "Consistency"],
  },
];

export const education = [
  {
    degree: "Bachelor of Computer Science",
    field: "Application & Web Development",
    school: "Varsity College",
    period: "2023 — Present",
  },
  {
    degree: "Certificate of Higher Education",
    field: "Foundational Studies",
    school: "Amity International",
    period: "2018 — 2022",
  },
] as const;

export type Certification = {
  title: string;
  issuer: string;
  status: "In Progress" | "Pursuing";
};

// Honestly framed: focus areas Faeez is actively working toward (no fabricated credentials).
export const certifications: Certification[] = [
  { title: "Responsive Web Design", issuer: "freeCodeCamp", status: "In Progress" },
  { title: "JavaScript Algorithms & Data Structures", issuer: "freeCodeCamp", status: "Pursuing" },
  { title: "Generative AI Fundamentals", issuer: "Self-directed", status: "In Progress" },
  { title: "Cybersecurity Essentials", issuer: "Self-directed", status: "Pursuing" },
];

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  category: "AI" | "Web" | "Security" | "Data";
  status: "Live" | "In Development" | "Concept";
  accent: string;
  repo?: string;
};

// Mix of real (this site) and clearly-labeled concept builds aligned to Faeez's interests.
export const projects: Project[] = [
  {
    id: "nexus",
    title: "Portfolio Nexus",
    tagline: "This site.",
    description:
      "A cinematic developer portfolio built with Next.js, React Three Fiber and Framer Motion — real-time 3D, scroll storytelling, and post-processing.",
    tech: ["Next.js", "TypeScript", "React Three Fiber", "Framer Motion"],
    category: "Web",
    status: "Live",
    accent: "#22d3ee",
    repo: "https://github.com/ST10369371",
  },
  {
    id: "stocksense",
    title: "StockSense",
    tagline: "Inventory intelligence.",
    description:
      "A data dashboard turning retail stock and sales records into forecasts and alerts — born from real operations experience.",
    tech: ["Next.js", "PostgreSQL", "Charts", "Data Modelling"],
    category: "Data",
    status: "In Development",
    accent: "#a855f7",
  },
  {
    id: "aegis",
    title: "Aegis",
    tagline: "AI code reviewer.",
    description:
      "An LLM-assisted code-review tool that flags bugs, security smells, and style issues in pull requests.",
    tech: ["TypeScript", "Claude API", "Node.js", "GenAI"],
    category: "AI",
    status: "Concept",
    accent: "#34d399",
  },
  {
    id: "sentinel",
    title: "Sentinel",
    tagline: "Security at a glance.",
    description:
      "A cybersecurity monitoring dashboard visualising threat signals, auth events, and OWASP-style risk scoring.",
    tech: ["Next.js", "TypeScript", "Security", "Data Viz"],
    category: "Security",
    status: "Concept",
    accent: "#f43f5e",
  },
];

export const projectFilters = ["All", "Web", "AI", "Data", "Security"] as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

export const socials = [
  { label: "GitHub", href: profile.github, icon: "github" },
  { label: "Email", href: `mailto:${profile.email}`, icon: "mail" },
] as const;
