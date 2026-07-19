"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { profile } from "@/lib/data";

/**
 * Full-bleed warm desk film under an editorial headline.
 * The video is the room; the type does the talking.
 */
export default function Hero() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [lite, setLite] = useState(false);

  useEffect(() => {
    setLite(new URLSearchParams(window.location.search).has("lite"));
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  }, [lite, reduce]);

  const showVideo = !reduce && !lite;

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* film */}
      <div className="absolute inset-0">
        {showVideo ? (
          <motion.video
            ref={videoRef}
            className="h-full w-full object-cover"
            src="/hero/hero-bg.mp4"
            poster="/hero/hero-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => setReady(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/hero/hero-poster.jpg" alt="" className="h-full w-full object-cover" />
        )}
        {/* paper wash so the type owns the frame */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-paper)]/92 via-[var(--color-paper)]/55 to-[var(--color-paper)]" />
      </div>

      {/* content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center px-6 pt-24 md:px-10">
        <motion.p
          className="meta"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
        >
          {profile.name} · {profile.location}
        </motion.p>

        <motion.h1
          className="font-display mt-6 max-w-[16ch] text-[clamp(2.6rem,7.2vw,5.6rem)] font-medium leading-[1.04] tracking-[-0.015em] text-[var(--color-ink)]"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
        >
          I build web software end-to-end — and ship something{" "}
          <em className="font-light italic text-[var(--color-amber)]">every day</em>.
        </motion.h1>

        <motion.p
          className="mt-7 max-w-[52ch] text-lg leading-relaxed text-[var(--color-ink-2)]"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 1, 0.5, 1] }}
        >
          {profile.heroSub}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.25, 1, 0.5, 1] }}
        >
          <a
            href="#work"
            className="press rounded-full bg-[var(--color-ink)] px-6 py-3 text-sm font-medium text-[var(--color-paper)] transition-colors hover:bg-[var(--color-ink-2)]"
          >
            Selected work ↓
          </a>
          <a href="/Faeez-Kader-CV.pdf" download className="link-draw text-sm font-medium text-[var(--color-ink)]">
            Download CV
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-draw text-sm font-medium text-[var(--color-ink)]"
          >
            GitHub ↗
          </a>
        </motion.div>
      </div>

      {/* bottom meta strip */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-8 md:px-10">
        <div className="hairline-t flex items-center justify-between pt-5">
          <span className="meta flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-green)]" />
            {profile.availability}
          </span>
          <span className="meta">8 live products · 2026</span>
        </div>
      </div>
    </section>
  );
}
