import { createFileRoute } from "@tanstack/react-router";
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

const projects = [
  { 
    title: "Smart Walking Stick for the Visually Impaired", 
    cat: "Engineering", 
    color: "from-amber-600/20", 
    image: "/video_images/blindstick.jpeg",
    desc: "An AI-powered assistive device with obstacle detection, GPS tracking, and emergency alerts. Designed to enhance safety and independence for visually impaired individuals." 
  },
  { 
    title: "Predictive Load Management System", 
    cat: "Engineering", 
    color: "from-blue-600/20", 
    image: "/video_images/loadmanagement.jpeg",
    desc: "A smart energy management solution that monitors, predicts, and optimizes electrical load consumption in real time. Designed to improve energy efficiency and support next-generation smart grid applications." 
  },
  { 
    title: "Smart Water Monitoring & Control System", 
    cat: "Engineering", 
    color: "from-emerald-600/20", 
    image: "/video_images/automatedpump.jpeg",
    desc: "An IoT-based solution that enables remote water flow control and real-time monitoring of flow and pressure parameters through the Blynk app. Designed for efficient water management and smart automation." 
  },
  { 
    title: "Smart pH Monitoring System", 
    cat: "Engineering", 
    color: "from-teal-600/20", 
    image: "/video_images/ph.jpeg",
    desc: "An automated water quality monitoring system that tracks pH levels and sends SMS alerts for filter replacement and maintenance. Designed to ensure safe water quality through real-time monitoring." 
  },
  { 
    title: "AI-Based Rainwater Chemistry Analysis System", 
    cat: "Engineering", 
    color: "from-purple-600/20", 
    image: "/video_images/chemical.jpeg",
    desc: "A smart environmental monitoring solution that analyzes rainwater quality using sensors and AI techniques. Developed to provide real-time insights for pollution monitoring and sustainable water management." 
  },
  { 
    title: "Smart Anxiety Management System", 
    cat: "Technical", 
    color: "from-pink-600/20", 
    image: "/video_images/stress.jpeg",
    desc: "A wearable system that monitors heart rate, SpO₂, and body temperature to detect anxiety levels in real time. Based on the detected condition, vibration motors at three nerve points provide calming haptic feedback to help regulate and reduce anxiety." 
  },
];

function Projects() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Projects"
        title={<>Selected <span className="text-gradient-mustard">work.</span></>}
        subtitle="A small window into what we've shipped across engineering, creative, technical, and education."
        noEyebrowBox={true}
      />

      <section className="mx-auto max-w-7xl px-6 py-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.04}>
              <article className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-border/60">
                {p.image ? (
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 select-none"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${p.color} via-card to-background transition-transform duration-700 group-hover:scale-110`} />
                )}
                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent z-10" />
                <div className="absolute inset-x-0 bottom-0 p-6 z-20">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">{p.cat}</p>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight font-display">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
