"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { profile } from "@/lib/data";
import { Icon } from "@/lib/icons";
import RoleCycler from "@/components/RoleCycler";
import Magnetic from "@/components/Magnetic";

const fade = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const socials = [
  { label: "GitHub", href: profile.github, icon: Icon.github, external: true },
  { label: "Email", href: `mailto:${profile.email}`, icon: Icon.mail },
  { label: "Phone", href: `tel:${profile.phoneHref}`, icon: Icon.phone },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [lite, setLite] = useState(false);

  useEffect(() => {
    setLite(new URLSearchParams(window.location.search).has("lite"));
  }, []);

  // Subtle depth: the video drifts slower than the content while scrolling away.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const showVideo = !reduce && !lite;

  return (
    <section ref={sectionRef} id="top" className="relative flex min-h-dvh items-center overflow-hidden">
      {/* Cinematic video background */}
      <motion.div className="absolute inset-0 z-0" style={reduce ? undefined : { y: bgY, scale: bgScale }}>
        {showVideo ? (
          <motion.video
            className="absolute inset-0 h-full w-full object-cover"
            src="/hero/hero-bg.mp4"
            poster="/hero/hero-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onCanPlay={() => setVideoReady(true)}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={videoReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.06 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />
        ) : (
          // Reduced-motion / lite fallback: static poster frame.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/hero/hero-poster.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {/* Readability + blend overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)]/95 via-[var(--color-bg)]/55 to-transparent sm:via-[var(--color-bg)]/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)]/60 via-transparent to-[var(--color-bg)]" />
      </motion.div>

      {/* Social rail (left edge) */}
      <motion.div
        custom={5}
        variants={fade}
        initial="hidden"
        animate="show"
        className="absolute left-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="mb-2 h-16 w-px bg-gradient-to-b from-transparent to-white/25" />
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            aria-label={s.label}
            className="grid h-10 w-10 place-items-center rounded-full glass text-[var(--color-muted)] transition-all hover:scale-110 hover:text-[var(--color-cyan)]"
          >
            <s.icon className="h-4.5 w-4.5" />
          </a>
        ))}
        <span className="mt-2 h-16 w-px bg-gradient-to-t from-transparent to-white/25" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-28 sm:px-8 lg:pl-16">
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
          className="font-[family-name:var(--font-display)] text-[clamp(3rem,10vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.03em] [text-shadow:0_2px_30px_rgba(0,0,0,0.55)]"
        >
          {profile.firstName} <span className="text-grad-soft">{profile.lastName}</span>
        </motion.h1>

        <motion.div
          custom={2}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-4 flex items-center gap-3 font-[family-name:var(--font-display)] text-[clamp(1.3rem,3.5vw,2.2rem)] font-medium [text-shadow:0_1px_20px_rgba(0,0,0,0.6)]"
        >
          <span className="font-mono text-base text-[var(--color-faint)]">{"//"}</span>
          <RoleCycler roles={profile.roles} />
        </motion.div>

        <motion.p
          custom={3}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-7 max-w-xl text-base leading-relaxed text-[var(--color-muted)] [text-shadow:0_1px_14px_rgba(0,0,0,0.7)] sm:text-lg"
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
              href="/Faeez-Kader-CV.pdf"
              download="Faeez-Kader-CV.pdf"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 font-medium transition-colors hover:bg-white/5"
            >
              Download CV
              <Icon.arrowDown className="h-4 w-4" />
            </a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="grid h-11 w-11 place-items-center rounded-full glass transition-colors hover:bg-white/5 lg:hidden"
            >
              <Icon.github className="h-4.5 w-4.5" />
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
        Scroll to explore
        <span className="grid h-9 w-5 place-items-start justify-center rounded-full border border-white/15 pt-1.5">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-[var(--color-cyan)]"
            animate={reduce ? undefined : { y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
