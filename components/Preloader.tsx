"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { profile } from "@/lib/data";

export default function Preloader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);
  const pathname = usePathname();
  const skip = pathname?.startsWith("/workspace") ?? false;

  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }
    let v = 0;
    const id = setInterval(() => {
      v += Math.random() * 14 + 4;
      if (v >= 100) {
        v = 100;
        clearInterval(id);
        setTimeout(() => setDone(true), 450);
      }
      setPct(Math.floor(v));
    }, 130);
    return () => clearInterval(id);
  }, [reduce]);

  if (skip) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[var(--color-bg)]"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="ring-grid absolute inset-0 opacity-30" />
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative flex flex-col items-center gap-6"
          >
            <div className="grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-[var(--color-surface)] font-[family-name:var(--font-display)] text-xl font-bold glow-cyan">
              {profile.initials}
            </div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
              Initializing
            </div>
            <div className="h-px w-56 overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--color-cyan)] to-[var(--color-violet)]"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="font-mono text-xs tabular-nums text-[var(--color-faint)]">{pct}%</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
