"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { projects, projectFilters } from "@/lib/data";
import { Icon } from "@/lib/icons";
import { SectionHeading, Reveal } from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";

export default function Projects() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>("All");
  const list = projects.filter((p) => filter === "All" || p.category === filter);

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
      <SectionHeading
        index="04"
        label="Selected work"
        title={
          <>
            Things I&apos;m <span className="text-gradient">building.</span>
          </>
        }
      />

      <Reveal className="mb-10">
        <div className="flex flex-wrap gap-2">
          {projectFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
                filter === f
                  ? "border-white/30 bg-white/10 text-[var(--color-ink)]"
                  : "border-white/10 text-[var(--color-muted)] hover:border-white/25"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </Reveal>

      <motion.div layout className="grid gap-6 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard className="group h-full">
                <div className="grad-border shine relative h-full overflow-hidden rounded-3xl bg-[var(--color-surface)] p-6">
                  {/* glow */}
                  <div
                    className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-25 blur-3xl transition-opacity group-hover:opacity-50"
                    style={{ background: p.accent }}
                  />

                  {/* device mockup */}
                  <div className="relative mb-6 overflow-hidden rounded-xl border border-white/10 bg-[var(--color-bg)]">
                    <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
                      <span className="h-2 w-2 rounded-full bg-white/20" />
                      <span className="h-2 w-2 rounded-full bg-white/20" />
                      <span className="h-2 w-2 rounded-full bg-white/20" />
                    </div>
                    <div className="ring-grid relative grid h-32 place-items-center">
                      <span
                        className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight"
                        style={{ color: p.accent }}
                      >
                        {p.title}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                      {p.title}
                    </h3>
                    <span
                      className="shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider"
                      style={{
                        color: p.accent,
                        background: `color-mix(in srgb, ${p.accent} 14%, transparent)`,
                      }}
                    >
                      {p.status}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-sm text-[var(--color-faint)]">{p.tagline}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{p.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-white/10 px-2.5 py-1 font-mono text-xs text-[var(--color-muted)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {p.repo && (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-1.5 text-sm text-[var(--color-cyan)] hover:underline"
                    >
                      View source <Icon.arrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
