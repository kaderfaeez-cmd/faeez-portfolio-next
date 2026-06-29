"use client";

import { education, certifications } from "@/lib/data";
import { SectionHeading, Reveal } from "@/components/Reveal";

export default function Education() {
  return (
    <section id="education" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
      <SectionHeading
        index="05"
        label="Education & Growth"
        title={
          <>
            Always <span className="text-gradient">learning.</span>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
        <div className="space-y-4">
          {education.map((e, i) => (
            <Reveal key={e.school} delay={i * 0.08}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-surface)] p-6 transition-colors hover:border-[var(--color-cyan)]/40">
                <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[var(--color-cyan)] to-[var(--color-violet)]" />
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-cyan)]">
                    {e.period}
                  </span>
                </div>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-semibold">
                  {e.degree}
                </h3>
                <p className="mt-1 text-[var(--color-muted)]">{e.field}</p>
                <p className="mt-3 font-[family-name:var(--font-display)] text-sm text-[var(--color-ink)]">
                  {e.school}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="rounded-2xl border border-white/10 bg-[var(--color-surface)] p-6">
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
              Certifications &amp; learning paths
            </h3>
            <ul className="space-y-3">
              {certifications.map((c) => (
                <li key={c.title} className="flex items-center justify-between gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <div>
                    <div className="text-sm font-medium">{c.title}</div>
                    <div className="text-xs text-[var(--color-faint)]">{c.issuer}</div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${
                      c.status === "In Progress"
                        ? "bg-[var(--color-emerald)]/15 text-[var(--color-emerald)]"
                        : "bg-white/5 text-[var(--color-faint)]"
                    }`}
                  >
                    {c.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
