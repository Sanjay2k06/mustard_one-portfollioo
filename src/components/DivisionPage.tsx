import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell, PageHero } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export interface DivisionPageProps {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  services: { title: string; desc: string }[];
  process?: { step: string; title: string; desc: string }[];
  benefits?: string[];
  galleryAccent?: string;
  faqs?: { q: string; a: string }[];
}

export function DivisionPage({
  eyebrow, title, subtitle, services, process, benefits, galleryAccent = "from-amber-500/20", faqs,
}: DivisionPageProps) {
  return (
    <PageShell>
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-bold">What we offer</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.04}>
              <div
                className="h-full rounded-2xl border border-border/60 p-6 transition-all hover:-translate-y-1 hover:border-primary/40"
                style={{ background: "var(--gradient-card)" }}
              >
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {process && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold">Our process</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.06}>
                <div className="rounded-2xl glass p-6">
                  <div className="font-display text-3xl font-bold text-gradient-mustard">{p.step}</div>
                  <h3 className="mt-3 text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {benefits && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold">Why choose us</h2>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <Reveal key={b} delay={i * 0.04}>
                <div className="flex items-start gap-3 rounded-xl border border-border/60 p-4">
                  <div className="mt-1 h-2 w-2 flex-none rounded-full bg-primary" />
                  <p className="text-sm">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-bold">Gallery</h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Reveal key={i} delay={i * 0.03}>
              <div
                className={`aspect-square overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br ${galleryAccent} via-card to-background transition-transform hover:scale-[1.02]`}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {faqs && (
        <section className="mx-auto max-w-4xl px-6 py-16">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold">FAQs</h2>
          </Reveal>
          <div className="mt-8 space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.04}>
                <details className="group rounded-2xl border border-border/60 p-5 transition-colors open:border-primary/40">
                  <summary className="flex cursor-pointer items-center justify-between text-base font-semibold">
                    {f.q}
                    <span className="text-primary transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl border border-primary/30 p-12 text-center"
            style={{ background: "linear-gradient(135deg, oklch(0.18 0.02 95), oklch(0.13 0.005 95))" }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold">Ready to start?</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Tell us what you're working on. We'll respond within 24 hours.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 glow-mustard"
            >
              Get in touch <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}
