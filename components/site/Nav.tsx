"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/lib/data";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Over the dark hero the nav is light; once past it, it flips to paper.
  const light = !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled ? "border-b border-[var(--color-line)] bg-[var(--color-paper)]/95" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 md:px-10">
        <a
          href="#top"
          className={`font-display text-lg font-semibold tracking-tight transition-colors duration-300 ${
            light ? "text-[var(--color-paper)]" : "text-[var(--color-ink)]"
          }`}
        >
          Faeez Kader
        </a>
        <div className="flex items-center gap-6 md:gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`link-draw hidden text-sm transition-colors duration-300 sm:inline ${
                light ? "text-[var(--color-paper)]/80" : "text-[var(--color-ink-2)]"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href={`mailto:${profile.email}`}
            className={`press rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-300 ${
              light
                ? "border-[var(--color-paper)]/60 text-[var(--color-paper)] hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)]"
                : "border-[var(--color-ink)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
            }`}
          >
            Say hello
          </a>
        </div>
      </nav>
    </header>
  );
}
