"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { profile } from "@/lib/data";
import { Icon } from "@/lib/icons";
import RoleCycler from "@/components/RoleCycler";
import Magnetic from "@/components/Magnetic";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

const fade = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Hero() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [low, setLow] = useState(false);
  const [lite, setLite] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLow(window.innerWidth < 768);
    setLite(new URLSearchParams(window.location.search).has("lite"));
  }, []);

  const show3D = mounted && !reduce && !lite;

  return (
    <section id="top" className="relative flex min-h-dvh items-center overflow-hidden">
      {/* 3D background */}
      <div className="absolute inset-0 z-0">
        {show3D ? (
          <HeroScene quality={low ? "low" : "high"} />
        ) : (
          <div className="absolute inset-0 ring-grid opacity-40" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-bg)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--color-bg)]/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-28 sm:px-8">
        <motion.div
          custom={0}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mb-7 inline-flex items-center gap-2.5 rounded-full glass px-4 py-2 text-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-emerald)] opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-emerald)]" />
          </span>
          <span className="text-[var(--color-muted)]">{profile.availability}</span>
        </motion.div>

        <motion.h1
          custom={1}
          variants={fade}
          initial="hidden"
          animate="show"
          className="font-[family-name:var(--font-display)] text-[clamp(3rem,11vw,7.5rem)] font-bold leading-[0.92] tracking-[-0.03em]"
        >
          {profile.firstName} <span className="text-grad-soft">{profile.lastName}</span>
        </motion.h1>

        <motion.div
          custom={2}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-4 flex items-center gap-3 font-[family-name:var(--font-display)] text-[clamp(1.3rem,4vw,2.4rem)] font-medium"
        >
          <span className="font-mono text-base text-[var(--color-faint)]">{"//"}</span>
          <RoleCycler roles={profile.roles} />
        </motion.div>

        <motion.p
          custom={3}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-7 max-w-xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg"
        >
          {profile.heroLine}
        </motion.p>

        <motion.div
          custom={4}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Magnetic>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black shadow-[0_0_30px_-8px_rgba(255,255,255,0.5)]"
            >
              View my work
              <Icon.arrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 font-medium transition-colors hover:bg-white/5"
            >
              <Icon.github className="h-4 w-4" /> GitHub
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-faint)]"
      >
        Scroll
        <span className="grid h-9 w-5 place-items-start justify-center rounded-full border border-white/15 pt-1.5">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-[var(--color-cyan)]"
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
