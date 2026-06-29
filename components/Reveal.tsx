"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title: ReactNode;
}) {
  return (
    <Reveal className="mb-14 max-w-2xl">
      <div className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-cyan)]">
        <span>{index}</span>
        <span className="h-px w-8 bg-[var(--color-cyan)]/50" />
        <span className="text-[var(--color-muted)]">{label}</span>
      </div>
      <h2 className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
        {title}
      </h2>
    </Reveal>
  );
}
