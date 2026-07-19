"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { work } from "@/lib/data";
import Reveal from "./Reveal";

/**
 * Featured work as expandable case studies — editorial rows, not cards.
 * Remaining builds as a compact index.
 */
export default function Work() {
  const featured = work.filter((w) => w.featured);
  const rest = work.filter((w) => !w.featured);
  const [open, setOpen] = useState<string | null>(featured[0]?.id ?? null);
  const reduce = useReducedMotion();

  return (
    <section id="work" className="mx-auto max-w-[1200px] px-6 py-28 md:px-10 md:py-36">
      <Reveal>
        <div className="flex items-end justify-between">
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-medium leading-tight tracking-[-0.01em]">
            Selected work
          </h2>
          <span className="meta mb-2 hidden sm:block">Case studies, not cards</span>
        </div>
      </Reveal>

      <div className="mt-12 border-t border-[var(--color-line-strong)]">
        {featured.map((p) => {
          const isOpen = open === p.id;
          return (
            <article key={p.id} className="border-b border-[var(--color-line-strong)]">
              <button
                onClick={() => setOpen(isOpen ? null : p.id)}
                aria-expanded={isOpen}
                className="group grid w-full cursor-pointer grid-cols-[auto_1fr_auto] items-baseline gap-x-5 py-7 text-left md:grid-cols-[3.5rem_1fr_14rem_5rem] md:gap-x-8"
              >
                <span className="meta">{p.index}</span>
                <span
                  className={`font-display text-[clamp(1.6rem,3.6vw,2.6rem)] font-medium leading-tight tracking-[-0.01em] transition-colors duration-300 ${
                    isOpen ? "text-[var(--color-amber)]" : "text-[var(--color-ink)] group-hover:text-[var(--color-amber)]"
                  }`}
                >
                  {p.title}
                </span>
                <span className="meta hidden md:block">{p.kind}</span>
                <span className="meta justify-self-end">{isOpen ? "Close" : "Open"}</span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="body"
                    initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-10 pb-12 pt-2 md:grid-cols-[3.5rem_1fr] md:gap-x-8">
                      <span className="hidden md:block" />
                      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
                        {/* story */}
                        <div className="max-w-[62ch] space-y-7">
                          <p className="text-lg font-medium leading-relaxed text-[var(--color-ink)]">{p.oneLiner}</p>
                          {[
                            ["The problem", p.context],
                            ["The build", p.build],
                            ["Where it landed", p.result],
                          ].map(([label, text]) => (
                            <div key={label}>
                              <h3 className="meta mb-2">{label}</h3>
                              <p className="leading-relaxed text-[var(--color-ink-2)]">{text}</p>
                            </div>
                          ))}
                        </div>
                        {/* meta rail */}
                        <aside className="space-y-6 lg:border-l lg:border-[var(--color-line)] lg:pl-10">
                          <div>
                            <h3 className="meta mb-2">Year</h3>
                            <p className="text-[var(--color-ink-2)]">{p.year}</p>
                          </div>
                          <div>
                            <h3 className="meta mb-2">Stack</h3>
                            <p className="font-mono text-sm leading-7 text-[var(--color-ink-2)]">{p.stack.join(" · ")}</p>
                          </div>
                          <div className="flex flex-col gap-3 pt-2">
                            <a
                              href={p.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="press inline-flex w-fit items-center rounded-full bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-[var(--color-paper)] transition-colors hover:bg-[var(--color-amber-deep)]"
                            >
                              Visit live site ↗
                            </a>
                            <a
                              href={p.code}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link-draw w-fit text-sm font-medium text-[var(--color-ink)]"
                            >
                              Read the code ↗
                            </a>
                          </div>
                        </aside>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          );
        })}
      </div>

      {/* the rest — compact index */}
      <Reveal className="mt-20">
        <h3 className="meta mb-6">Also live</h3>
        <div className="grid gap-x-12 gap-y-1 sm:grid-cols-2">
          {rest.map((p) => (
            <a
              key={p.id}
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-baseline justify-between gap-4 border-b border-[var(--color-line)] py-4"
            >
              <span className="min-w-0">
                <span className="font-display text-lg font-medium text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-amber)]">
                  {p.title}
                </span>
                <span className="ml-3 hidden text-sm text-[var(--color-muted)] md:inline">{p.oneLiner}</span>
              </span>
              <span className="meta shrink-0 transition-transform duration-300 group-hover:translate-x-1">↗</span>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
