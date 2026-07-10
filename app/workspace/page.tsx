"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const Scene = dynamic(() => import("@/components/workspace/Scene"), { ssr: false });

type Phase = "transition" | "reveal";

export default function WorkspacePage() {
  const [phase, setPhase] = useState<Phase>("transition");
  const started = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reveal the 3D room when the fly-in clip ends (or fails / reduced motion).
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPhase("reveal");
      started.current = true;
      return;
    }
    const v = videoRef.current;
    const done = () => {
      setPhase("reveal");
      started.current = true;
    };
    v?.addEventListener("ended", done, { once: true });
    v?.play().catch(done);
    const safety = setTimeout(done, 7000);
    return () => {
      clearTimeout(safety);
      v?.removeEventListener("ended", done);
    };
  }, []);

  return (
    <main className="fixed inset-0 bg-[#05060a]">
      {/* 3D room (mounts immediately so it's warm behind the clip) */}
      <div className="absolute inset-0">
        <Scene started={started} />
      </div>

      {/* fly-in transition clip */}
      <AnimatePresence>
        {phase === "transition" && (
          <motion.div
            className="absolute inset-0 z-20 bg-[#05060a]"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <video
              ref={videoRef}
              src="/workspace/transition.mp4"
              muted
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#05060a]/70" />
            <button
              onClick={() => {
                setPhase("reveal");
                started.current = true;
              }}
              className="absolute bottom-8 right-8 rounded-full border border-white/20 px-5 py-2 font-mono text-xs uppercase tracking-[0.2em] text-white/70 backdrop-blur transition-colors hover:border-white/50 hover:text-white"
            >
              Skip
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HUD */}
      <AnimatePresence>
        {phase === "reveal" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.5, duration: 1 }}
            className="pointer-events-none absolute inset-0 z-10"
          >
            <div className="absolute left-6 top-6 pointer-events-auto">
              <Link
                href="/"
                className="rounded-full border border-white/15 bg-black/30 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-white/70 backdrop-blur transition-colors hover:border-white/40 hover:text-white"
              >
                ← Exit workspace
              </Link>
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.3em] text-white/35">
              Faeez&apos;s workspace · 2 AM · interactions coming online soon
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* film grain reuse */}
      <div className="film-grain" aria-hidden="true" />
    </main>
  );
}
