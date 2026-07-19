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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled ? "border-b border-[var(--color-line)] bg-[var(--color-paper)]/95" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 md:px-10">
        <a href="#top" className="font-display text-lg font-semibold tracking-tight text-[var(--color-ink)]">
          Faeez Kader
        </a>
        <div className="flex items-center gap-6 md:gap-8">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="link-draw hidden text-sm text-[var(--color-ink-2)] sm:inline">
              {l.label}
            </a>
          ))}
          <a
            href={`mailto:${profile.email}`}
            className="press rounded-full border border-[var(--color-ink)] px-4 py-1.5 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
          >
            Say hello
          </a>
        </div>
      </nav>
    </header>
  );
}
