import { principles } from "@/lib/data";
import Reveal from "./Reveal";

/** How I work — four numbered convictions, offset editorial grid. */
export default function Thinking() {
  return (
    <section id="thinking" className="bg-[var(--color-paper-2)]">
      <div className="mx-auto max-w-[1200px] px-6 py-28 md:px-10 md:py-36">
        <div className="grid gap-14 md:grid-cols-[1fr_2fr] md:gap-20">
          <Reveal>
            <h2 className="font-display sticky top-28 text-[clamp(2rem,4.5vw,3.4rem)] font-medium leading-tight tracking-[-0.01em]">
              How I<br />work
            </h2>
          </Reveal>

          <div>
            {principles.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.05}>
                <div
                  className={`grid grid-cols-[3rem_1fr] gap-x-6 border-t border-[var(--color-line-strong)] py-9 ${
                    i % 2 === 1 ? "md:ml-16" : ""
                  }`}
                >
                  <span className="meta pt-1.5">{p.n}</span>
                  <div>
                    <h3 className="font-display text-xl font-medium text-[var(--color-ink)] md:text-2xl">{p.title}</h3>
                    <p className="mt-3 max-w-[52ch] leading-relaxed text-[var(--color-ink-2)]">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
