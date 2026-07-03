"use client";

import { motion } from "motion/react";
import { profile, metrics } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/Reveal";
import Counter from "@/components/Counter";

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
      <SectionHeading
        index="01"
        label="About"
        title={
          <>
            Operator turned <span className="text-gradient">engineer.</span>
          </>
        }
      />

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <div className="space-y-6">
          {profile.bio.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="text-lg leading-relaxed text-[var(--color-muted)] sm:text-xl">{p}</p>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <div className="hairline mt-8 flex flex-wrap gap-x-8 gap-y-2 pt-6 font-mono text-xs uppercase tracking-wider text-[var(--color-faint)]">
              <span>AI &amp; GenAI</span>
              <span>Cybersecurity</span>
              <span>Web Dev</span>
              <span>UI / UX</span>
              <span>Data Science</span>
              <span>Systems Thinking</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="grid grid-cols-2 gap-3">
            {metrics.map((m) => (
              <motion.div
                key={m.label}
                whileHover={{ y: -4 }}
                className="glass grad-border rounded-2xl p-5"
              >
                <div className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-gradient">
                  <Counter value={m.value} suffix={m.suffix} />
                </div>
                <div className="mt-2 text-xs leading-snug text-[var(--color-muted)]">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
