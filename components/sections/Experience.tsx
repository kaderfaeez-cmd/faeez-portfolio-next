"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { experience } from "@/lib/data";
import { SectionHeading, Reveal } from "@/components/Reveal";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 70%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="work" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
      <SectionHeading
        index="03"
        label="Experience"
        title={
          <>
            The <span className="text-gradient">journey</span> so far.
          </>
        }
      />

      <div ref={ref} className="relative pl-8 sm:pl-10">
        {/* track */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10 sm:left-[9px]" />
        <motion.div
          className="absolute left-[7px] top-2 w-px origin-top bg-gradient-to-b from-[var(--color-cyan)] to-[var(--color-violet)] sm:left-[9px]"
          style={{ scaleY, bottom: 8, top: 8 }}
        />

        <div className="space-y-12">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.05}>
              <div className="relative">
                <span className="absolute -left-[33px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[var(--color-cyan)] bg-[var(--color-bg)] sm:-left-[37px]" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold sm:text-2xl">
                    {job.role}
                    {job.badge && (
                      <span className="ml-2 rounded-full border border-[var(--color-violet)]/50 px-2 py-0.5 align-middle font-mono text-[10px] uppercase tracking-wider text-[var(--color-violet)]">
                        {job.badge}
                      </span>
                    )}
                  </h3>
                  <span className="font-mono text-xs text-[var(--color-faint)]">{job.period}</span>
                </div>
                <div className="mt-1 font-[family-name:var(--font-display)] text-[var(--color-cyan)]">
                  {job.company}
                </div>
                <p className="mt-3 max-w-2xl text-[var(--color-muted)]">{job.summary}</p>
                <ul className="mt-4 space-y-2">
                  {job.points.map((pt, j) => (
                    <li key={j} className="flex gap-3 text-sm text-[var(--color-muted)]">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-[var(--color-faint)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
