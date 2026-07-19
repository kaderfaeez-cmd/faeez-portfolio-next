import { about } from "@/lib/data";
import Reveal from "./Reveal";

/** Personal, specific, no fluff. Letter on the left, facts on the right. */
export default function About() {
  return (
    <section id="about" className="mx-auto max-w-[1200px] px-6 py-28 md:px-10 md:py-36">
      <Reveal>
        <p className="meta">About</p>
        <h2 className="font-display mt-5 max-w-[18ch] text-[clamp(2rem,4.8vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.01em]">
          {about.heading}
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-24">
        <div className="max-w-[64ch] space-y-6">
          {about.paras.map((p, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <p className={`leading-relaxed ${i === 0 ? "text-lg text-[var(--color-ink)]" : "text-[var(--color-ink-2)]"}`}>
                {p}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <dl className="lg:mt-2">
            {about.facts.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[6rem_1fr] gap-4 border-t border-[var(--color-line)] py-4 last:border-b">
                <dt className="meta pt-0.5">{k}</dt>
                <dd className="text-sm leading-relaxed text-[var(--color-ink-2)]">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
