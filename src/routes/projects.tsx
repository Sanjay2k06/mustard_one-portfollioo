import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHero } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — MustardOne" },
      { name: "description", content: "A selection of engineering, creative, technical, and education projects from the MustardOne team." },
      { property: "og:title", content: "Projects — MustardOne" },
      { property: "og:description", content: "Selected work from across our four divisions." },
    ],
  }),
  component: Projects,
});

const categories = ["All", "Engineering", "Creative", "Technical", "Education"] as const;

const projects = [
  { title: "IoT Smart Greenhouse", cat: "Engineering", color: "from-emerald-500/30", desc: "Sensor mesh, cloud dashboard, automated irrigation." },
  { title: "EV Battery Monitor", cat: "Engineering", color: "from-teal-500/30", desc: "Cell-level telemetry with safety thresholds." },
  { title: "VLSI Verification Kit", cat: "Engineering", color: "from-cyan-500/30", desc: "Plug-and-play SystemVerilog testbench templates." },
  { title: "Brand Identity — Lumen", cat: "Creative", color: "from-pink-500/30", desc: "Logo, type system, motion package." },
  { title: "Short Film: Threads", cat: "Creative", color: "from-purple-500/30", desc: "10-minute short, end-to-end production." },
  { title: "Watercolor Series", cat: "Creative", color: "from-rose-500/30", desc: "Commissioned set of 12 original paintings." },
  { title: "Custom Workstation Build", cat: "Technical", color: "from-blue-500/30", desc: "Silent, high-throughput build for a video studio." },
  { title: "Studio Laptop Fleet Service", cat: "Technical", color: "from-indigo-500/30", desc: "Service contract for 30 creator devices." },
  { title: "Embedded Bootcamp Cohort #4", cat: "Education", color: "from-amber-500/30", desc: "8-week practical track with shipped projects." },
  { title: "Sketching for Beginners", cat: "Education", color: "from-yellow-500/30", desc: "Recurring weekend workshop series." },
];

function Projects() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const visible = filter === "All" ? projects : projects.filter((p) => p.cat === filter);

  return (
    <PageShell>
      <PageHero
        eyebrow="Projects"
        title={<>Selected <span className="text-gradient-mustard">work.</span></>}
        subtitle="A small window into what we've shipped across engineering, creative, technical, and education."
      />

      <section className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                filter === c
                  ? "bg-primary text-primary-foreground glow-mustard"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.04}>
              <article className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-border/60">
                <div className={`absolute inset-0 bg-gradient-to-br ${p.color} via-card to-background transition-transform duration-700 group-hover:scale-110`} />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary">{p.cat}</p>
                  <h3 className="mt-2 text-xl font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
