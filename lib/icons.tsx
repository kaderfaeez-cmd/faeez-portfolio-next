import type { SVGProps } from "react";

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

type P = SVGProps<SVGSVGElement>;

export const Icon = {
  code: (p: P) => (<svg {...base} {...p}><path d="m16 18 6-6-6-6M8 6l-6 6 6 6" /></svg>),
  server: (p: P) => (<svg {...base} {...p}><rect x="3" y="4" width="18" height="7" rx="2" /><rect x="3" y="13" width="18" height="7" rx="2" /><path d="M7 7.5h.01M7 16.5h.01" /></svg>),
  sparkles: (p: P) => (<svg {...base} {...p}><path d="M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4L12 3zM19 14l.9 2.3L22 17l-2.1.7L19 20l-.9-2.3L16 17l2.1-.7L19 14z" /></svg>),
  shield: (p: P) => (<svg {...base} {...p}><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" /><path d="m9 12 2 2 4-4" /></svg>),
  database: (p: P) => (<svg {...base} {...p}><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></svg>),
  cloud: (p: P) => (<svg {...base} {...p}><path d="M7 18a4 4 0 0 1-.5-7.97 6 6 0 0 1 11.6 1.5A3.5 3.5 0 0 1 17.5 18H7z" /></svg>),
  target: (p: P) => (<svg {...base} {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></svg>),
  palette: (p: P) => (<svg {...base} {...p}><path d="M12 3a9 9 0 1 0 0 18c1 0 1.7-.8 1.7-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-1 .8-1.8 1.8-1.8H16a5 5 0 0 0 5-5c0-3.9-4-7-9-7z" /><circle cx="7.5" cy="10.5" r="1" /><circle cx="12" cy="7.5" r="1" /><circle cx="16.5" cy="10.5" r="1" /></svg>),
  arrowRight: (p: P) => (<svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>),
  arrowDown: (p: P) => (<svg {...base} {...p}><path d="M12 5v14M6 13l6 6 6-6" /></svg>),
  arrowUpRight: (p: P) => (<svg {...base} {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>),
  mail: (p: P) => (<svg {...base} {...p}><rect x="2.5" y="4.5" width="19" height="15" rx="2.5" /><path d="m3 7 9 6 9-6" /></svg>),
  phone: (p: P) => (<svg {...base} {...p}><path d="M22 16.9v2.1a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 3.2 2 2 0 0 1 4 1h2.1a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L7.1 8.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>),
  pin: (p: P) => (<svg {...base} {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="2.5" /></svg>),
  github: (p: P) => (<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 5 18 5.3 18 5.3c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" /></svg>),
  copy: (p: P) => (<svg {...base} {...p}><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>),
  check: (p: P) => (<svg {...base} {...p} strokeWidth={2}><path d="m5 12 5 5L20 7" /></svg>),
  menu: (p: P) => (<svg {...base} {...p}><path d="M3 6h18M3 12h18M3 18h18" /></svg>),
  close: (p: P) => (<svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>),
};

export type IconName = keyof typeof Icon;
