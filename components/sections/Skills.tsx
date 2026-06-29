"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { skillCategories } from "@/lib/data";
import { Icon, type IconName } from "@/lib/icons";
import { SectionHeading, Reveal } from "@/components/Reveal";

const SkillSphere = dynamic(() => import("@/components/three/SkillSphere"), { ssr: false });

export default function Skills() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(skillCategories[0].id);
  const [lite, setLite] = useState(false);
  const current = skillCategories.find((c) => c.id === active)!;

  useEffect(() => {
    setLite(new URLSearchParams(window.location.search).has("lite"));
  }, []);

  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
      <SectionHeading
        index="02"
        label="Capabilities"
        title={
          <>
            A full-stack <span className="text-gradient">skill graph.</span>
          </>
        }
      />

      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* 3D sphere */}
        <Reveal>
          <div className="relative mx-auto aspect-square w-full max-w-md">
            {!reduce && !lite && <SkillSphere />}
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="text-center">
                <div className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-cyan)]">
                  {current.title}
                </div>
                <div className="mt-1 text-sm text-[var(--color-muted)]">{current.blurb}</div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Category selector */}
        <div>
          <div className="flex flex-wrap gap-2">
            {skillCategories.map((c) => {
              const Ico = Icon[c.icon as IconName];
              const on = c.id === active;
              return (
                <button
                  key={c.id}
                  onMouseEnter={() => setActive(c.id)}
                  onClick={() => setActive(c.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all ${
                    on
                      ? "border-[var(--color-cyan)]/50 bg-[var(--color-cyan)]/10 text-[var(--color-ink)]"
                      : "border-white/10 text-[var(--color-muted)] hover:border-white/25 hover:text-[var(--color-ink)]"
                  }`}
                >
                  <Ico className="h-4 w-4" />
                  {c.title}
                </button>
              );
            })}
          </div>

          <div className="mt-8 min-h-[120px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap gap-2.5"
              >
                {current.skills.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="rounded-lg border border-white/10 bg-[var(--color-surface)] px-3.5 py-2 font-mono text-sm text-[var(--color-ink)]"
                  >
                    {s}
                  </motion.span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
