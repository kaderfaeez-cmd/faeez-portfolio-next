import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative mx-auto max-w-6xl px-5 pb-12 pt-8 sm:px-8">
      <div className="hairline flex flex-wrap items-center justify-between gap-4 pt-8">
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-[var(--color-cyan)] to-[var(--color-violet)] font-[family-name:var(--font-display)] text-xs font-bold text-black">
            {profile.initials}
          </span>
          <span className="font-mono text-xs text-[var(--color-faint)]">
            © {new Date().getFullYear()} {profile.name}
          </span>
        </div>
        <div className="font-mono text-xs text-[var(--color-faint)]">
          Built with Next.js · Three.js · Framer Motion
        </div>
        <a href="#top" className="font-mono text-xs text-[var(--color-muted)] hover:text-[var(--color-cyan)]">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
