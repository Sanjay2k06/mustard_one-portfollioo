import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { Cpu, Palette, Wrench, GraduationCap, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — MustardOne" },
      { name: "description", content: "Explore the four divisions of MustardOne: Works, Studio, Care, and Learn." },
      { property: "og:title", content: "Services — MustardOne" },
      { property: "og:description", content: "Four divisions covering engineering, creativity, technical support, and education." },
    ],
  }),
  component: ServicesIndex,
});

const divs = [
  { slug: "mustardworks", name: "MustardWorks", tag: "Engineering & Innovation", icon: Cpu, desc: "Prototypes, embedded, IoT, VLSI, AI/ML, EV technologies, and final-year projects." },
  { slug: "mustardstudio", name: "MustardStudio", tag: "Creative & Media", icon: Palette, desc: "Portraits, paintings, brand identity, video, motion, and short film production." },
  { slug: "mustardcare", name: "MustardCare", tag: "Technical Support", icon: Wrench, desc: "Custom PC builds, upgrades, laptop service, performance tuning, and maintenance." },
  { slug: "mustardlearn", name: "MustardLearn", tag: "Education & Skills", icon: GraduationCap, desc: "Workshops, certification programs, career guidance, and creative classes." },
];

function ServicesIndex() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Services"
        title={<>One platform. <span className="text-gradient-mustard">Four divisions.</span></>}
        subtitle="Pick the division that matches your need — or combine them. We work across all four every day."
      />
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          {divs.map((d, i) => (
            <Reveal key={d.slug} delay={i * 0.06}>
              <Link
                to={`/services/${d.slug}`}
                className="group block rounded-3xl border border-border/60 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40"
                style={{ background: "var(--gradient-card)" }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <d.icon className="h-6 w-6" />
                </div>
                <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">{d.tag}</p>
                <h3 className="mt-1 text-3xl font-bold">{d.name}</h3>
                <p className="mt-3 text-muted-foreground">{d.desc}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
