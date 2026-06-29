"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export default function RoleCycler({ roles }: { roles: readonly string[] }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, [roles.length]);

  if (reduce) {
    return <span className="text-gradient">{roles[0]}</span>;
  }

  return (
    <span className="relative inline-grid">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: "0.5em", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-0.5em", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-gradient [grid-area:1/1]"
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
