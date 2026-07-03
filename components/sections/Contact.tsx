"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { profile } from "@/lib/data";
import { Icon } from "@/lib/icons";
import { SectionHeading, Reveal } from "@/components/Reveal";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || "someone"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
      <div className="grad-border relative overflow-hidden rounded-[2rem] bg-[var(--color-surface)] p-8 sm:p-14">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[var(--color-cyan)] opacity-20 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[var(--color-violet)] opacity-20 blur-[100px]" />

        <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              index="06"
              label="Contact"
              title={
                <>
                  Let&apos;s build <span className="text-gradient">something.</span>
                </>
              }
            />
            <p className="-mt-6 max-w-md text-[var(--color-muted)]">
              Open to internships, junior dev roles, and collaborations. Fastest way to reach me is
              email.
            </p>

            <button
              onClick={copyEmail}
              className="mt-7 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-[var(--color-bg)] px-4 py-3 transition-colors hover:border-[var(--color-cyan)]/50"
            >
              <Icon.mail className="h-5 w-5 text-[var(--color-cyan)]" />
              <span className="font-mono text-sm">{profile.email}</span>
              <span className="ml-1 text-[var(--color-faint)]">
                {copied ? <Icon.check className="h-4 w-4 text-[var(--color-emerald)]" /> : <Icon.copy className="h-4 w-4" />}
              </span>
            </button>

            <div className="mt-8 flex gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 transition-colors hover:border-white/30 hover:text-[var(--color-cyan)]"
                aria-label="GitHub"
              >
                <Icon.github className="h-5 w-5" />
              </a>
              <a
                href={`tel:${profile.phoneHref}`}
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 transition-colors hover:border-white/30 hover:text-[var(--color-cyan)]"
                aria-label="Phone"
              >
                <Icon.phone className="h-5 w-5" />
              </a>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 px-4 text-sm text-[var(--color-muted)]">
                <Icon.pin className="h-4 w-4 text-[var(--color-cyan)]" />
                {profile.location}
              </div>
            </div>
          </div>

          <Reveal delay={0.1}>
            <form onSubmit={submit} className="space-y-4">
              {(["name", "email"] as const).map((f) => (
                <div key={f}>
                  <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-[var(--color-faint)]">
                    {f}
                  </label>
                  <input
                    required
                    type={f === "email" ? "email" : "text"}
                    value={form[f]}
                    onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[var(--color-bg)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-cyan)]/60"
                    placeholder={f === "email" ? "you@email.com" : "Your name"}
                  />
                </div>
              ))}
              <div>
                <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-[var(--color-faint)]">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full resize-none rounded-xl border border-white/10 bg-[var(--color-bg)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-cyan)]/60"
                  placeholder="What are you building?"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-cyan)] to-[var(--color-blue)] px-6 py-3.5 font-medium text-black"
              >
                Send message
                <Icon.arrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
