import { profile } from "@/lib/data";
import Reveal from "./Reveal";

/** Big, quiet close. Email is the design element. */
export default function Contact() {
  return (
    <section id="contact" className="bg-[var(--color-ink)] text-[var(--color-paper)]">
      <div className="mx-auto max-w-[1200px] px-6 py-28 md:px-10 md:py-36">
        <Reveal>
          <p className="meta !text-[var(--color-paper)]/50">Contact</p>
          <h2 className="font-display mt-6 text-[clamp(2.2rem,6vw,4.6rem)] font-medium leading-[1.05] tracking-[-0.015em]">
            Building something?
            <br />
            <span className="text-[var(--color-paper)]/60">I answer fast.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <a
            href={`mailto:${profile.email}`}
            className="link-draw mt-12 inline-block font-display text-[clamp(1.3rem,3.4vw,2.4rem)] font-light italic text-[#02c39a]"
          >
            {profile.email}
          </a>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-[var(--color-paper)]/15 pt-8">
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link-draw text-sm text-[var(--color-paper)]/80">
                GitHub ↗
              </a>
              <a href={`tel:${profile.phoneHref}`} className="link-draw text-sm text-[var(--color-paper)]/80">
                {profile.phone}
              </a>
              <a href="/Faeez-Kader-CV.pdf" download className="link-draw text-sm text-[var(--color-paper)]/80">
                CV (PDF)
              </a>
            </div>
            <p className="meta !text-[var(--color-paper)]/40">
              © {new Date().getFullYear()} {profile.name} · {profile.location}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
