import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { Target, Eye, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — MustardOne" },
      { name: "description", content: "MustardOne is an ecosystem combining engineering, creative design, technical support, and education." },
      { property: "og:title", content: "About — MustardOne" },
      { property: "og:description", content: "Our story, vision, mission, and values." },
    ],
  }),
  component: About,
});

const values = [
  { icon: Eye, title: "Vision", text: "To help people learn, create, innovate, and grow through practical solutions and quality services." },
  { icon: Target, title: "Mission", text: "To deliver services and opportunities that match client expectations while encouraging creativity, innovation, and continuous learning." },
  { icon: Heart, title: "Values", text: "Curiosity, craftsmanship, integrity, and the belief that learning never stops." },
];

function About() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About"
        title={<>About <span className="text-gradient-mustard">MustardOne</span></>}
        subtitle="An ecosystem combining engineering, creative design, technical support, and education — built on a simple idea: one way for many solutions."
      />

      <section className="mx-auto max-w-4xl px-6 py-12">
        <Reveal>
          <div className="rounded-3xl glass p-8 sm:p-12">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Our Story</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold">
              MustardOne is not just a company. It is a way of working.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              We started with a simple frustration: students, professionals, and startups had to talk
              to a dozen different vendors to bring a single idea to life. Engineering here, design
              there, hardware fixes somewhere else, and learning… well, that was somebody else's problem.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              MustardOne brings those four worlds — engineering, creativity, technical support, and
              education — under one identity. Four divisions, one team, one promise: we'll meet your
              expectations and ship work you're proud of.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-border/60 p-8" style={{ background: "var(--gradient-card)" }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-2xl font-bold">{v.title}</h3>
                <p className="mt-3 text-muted-foreground">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <Reveal>
          <h2 className="text-3xl sm:text-5xl font-bold">
            <span className="text-gradient-mustard">Learn. Create. Innovate. Grow.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            Four words. One promise. Everything we do is built around them.
          </p>
        </Reveal>
      </section>
    </PageShell>
  );
}
