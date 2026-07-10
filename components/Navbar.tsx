"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { profile, navLinks } from "@/lib/data";
import { Icon } from "@/lib/icons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const hidden = pathname?.startsWith("/workspace") ?? false;
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (hidden) return null;

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-[120] h-[2px] origin-left bg-gradient-to-r from-[var(--color-cyan)] via-[var(--color-blue)] to-[var(--color-violet)]"
        style={{ scaleX: progress }}
      />
      <header
        className={`fixed inset-x-0 top-0 z-[110] transition-all duration-500 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8">
          <a
            href="#top"
            className={`flex items-center gap-2.5 rounded-full px-2 py-1.5 transition-colors ${
              scrolled ? "glass" : ""
            }`}
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[var(--color-cyan)] to-[var(--color-violet)] font-[family-name:var(--font-display)] text-sm font-bold text-black">
              {profile.initials}
            </span>
            <span className="pr-2 font-[family-name:var(--font-display)] text-sm font-semibold tracking-tight">
              {profile.name}
            </span>
          </a>

          <nav className="hidden items-center gap-1 rounded-full glass px-2 py-1.5 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-1.5 text-sm text-[var(--color-muted)] transition-colors hover:bg-white/5 hover:text-[var(--color-ink)]"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-transform hover:scale-[1.03] sm:block"
            >
              Let&apos;s talk
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              className="grid h-10 w-10 place-items-center rounded-full glass md:hidden"
            >
              {open ? <Icon.close className="h-5 w-5" /> : <Icon.menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[105] flex flex-col bg-[var(--color-bg)]/95 px-6 pt-28 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {navLinks.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="border-b border-white/5 py-5 font-[family-name:var(--font-display)] text-2xl"
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
