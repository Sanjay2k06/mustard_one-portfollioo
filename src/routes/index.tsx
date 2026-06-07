import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Palette, Wrench, GraduationCap, Sparkles } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import SplitText from "@/components/SplitText";
import ScrollVelocity from "@/components/ScrollVelocity";
import Magnet from "@/components/Magnet";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MustardOne — One Way for Many Solutions" },
      { name: "description", content: "Engineering, creative design, technical support, and education under one identity. Learn. Create. Innovate. Grow." },
      { property: "og:title", content: "MustardOne — One Way for Many Solutions" },
      { property: "og:description", content: "An ecosystem for engineering, creativity, technical support, and learning." },
    ],
  }),
  component: Index,
});

const divisions = [
  {
    slug: "mustardworks",
    name: "MustardWork",
    tag: "Engineering & Innovation",
    desc: "Transforming ideas into practical engineering solutions.",
    icon: Cpu,
    logo: "/video_images/mustard_work.png",
    items: ["Embedded Systems", "IoT Projects", "VLSI Concepts", "Generative AI", "Machine Learning", "EV Technology", "Engineering Prototypes", "Final Year Projects"],
  },
  {
    slug: "mustardstudio",
    name: "MustardStudio",
    tag: "Creative & Media",
    desc: "Where imagination meets craftsmanship.",
    icon: Palette,
    logo: "/video_images/mustardstudio.png",
    items: ["Portrait Sketches", "Watercolor Paintings", "Logo Design", "Brand Identity", "Video Editing", "Motion Graphics", "Short Film Production"],
  },
  {
    slug: "mustardcare",
    name: "MustardCare",
    tag: "Technical Support",
    desc: "Helping users maximize device performance and reliability.",
    icon: Wrench,
    logo: "/video_images/mustard_care.png",
    items: ["PC Building", "RAM Upgrade", "SSD Upgrade", "Laptop Service", "Performance Optimization", "Storage Expansion", "System Maintenance"],
  },
  {
    slug: "mustardlearn",
    name: "MustardLearn",
    tag: "Education & Skills",
    desc: "Practical learning beyond classrooms.",
    icon: GraduationCap,
    logo: "/video_images/mustard_learn.png",
    items: ["Embedded & IoT Workshops", "VLSI Workshops", "EV Workshops", "Sketching & Painting", "Origami Workshops", "Career Guidance"],
  },
] as const;

const journey = [
  { word: "Learn", desc: "Hands-on workshops & curated curriculum that build real skills." },
  { word: "Create", desc: "Bring ideas to life with design, media, and craftsmanship." },
  { word: "Innovate", desc: "Engineer prototypes, products, and intelligent systems." },
];

function Index() {
  return (
    <PageShell>
      <Hero />
      <div className="py-12 my-8 bg-card border-y border-border/60 overflow-hidden">
        <ScrollVelocity
          texts={[
            "MustardLearn • MustardStudio • MustardCare • MustardWork",
            "Engineering • Creativity • Technology • Learning"
          ]}
          velocity={15}
          className="text-4xl sm:text-6xl font-extrabold tracking-widest text-primary/70"
        />
      </div>
      <AboutPreview />
      <DivisionsSection />
      <WhyChoose />
      <ProjectsShowcase />
      <CollaborationPartner />
      <CTA />
    </PageShell>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-12 pb-32">
      {/* floating blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-20 left-1/4 h-[500px] w-[500px] rounded-full blur-3xl opacity-40 animate-float-blob"
          style={{ background: "radial-gradient(circle, rgba(226,213,188,0.45), transparent 70%)" }}
        />
        <div
          className="absolute top-40 right-0 h-[400px] w-[400px] rounded-full blur-3xl opacity-30 animate-float-blob"
          style={{ background: "radial-gradient(circle, rgba(233,223,201,0.35), transparent 70%)", animationDelay: "-6s" }}
        />
      </div>

      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs uppercase tracking-[0.3em] text-[#1C1917]/70 font-bold mb-5"
        >
          As Your Expectations
        </motion.div>

        <h1 className="mt-8 text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight">
          {"MUSTARDONE".split("").map((ch, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.04, ease: [0.2, 0.8, 0.2, 1] }}
              className="inline-block"
            >
              {i >= 7 ? <span className="text-gradient-mustard">{ch}</span> : ch}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-3 text-sm font-bold uppercase tracking-[0.25em] text-[#1C1917]/50"
        >
          Since 2025
        </motion.div>

        <div className="mt-8 flex justify-center">
          <SplitText
            text="Engineering. Creativity. Technology. Learning."
            className="font-display text-2xl sm:text-3xl text-muted-foreground"
            delay={60}
            duration={0.8}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mx-auto mt-8 max-w-2xl text-base sm:text-lg text-muted-foreground"
        >
          One platform connecting innovation, creativity, technical support, and education —
          built for students, professionals, startups, and dreamers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6"
        >
          <Magnet padding={40} magnetStrength={3}>
            <Link
              to="/services/mustardworks"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 glow-mustard"
            >
              Explore Services <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Magnet>
          <Magnet padding={40} magnetStrength={3}>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              View Projects
            </Link>
          </Magnet>
        </motion.div>
      </div>
    </section>
  );
}

function AboutPreview() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 text-center">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-primary">About MustardOne</p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-4 text-3xl sm:text-5xl font-bold leading-tight">
          MustardOne brings together engineering, creativity, technical support, and learning —
          <span className="text-gradient-mustard"> under one identity.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          We help students, professionals, startups, and individuals transform ideas into reality
          through practical solutions and quality services.
        </p>
      </Reveal>
      <Reveal delay={0.3}>
        <Magnet padding={35} magnetStrength={3}>
          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4"
          >
            Read more about us <ArrowRight className="h-4 w-4" />
          </Link>
        </Magnet>
      </Reveal>
    </section>
  );
}

function DivisionsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <div className="mb-14 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Our Divisions</p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold">Four divisions. One ecosystem.</h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Each division solves a different problem — together they cover the full arc from idea to outcome.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        {divisions.map((d, i) => (
          <Reveal key={d.slug} delay={i * 0.05}>
            <DivisionCard {...d} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function DivisionCard({
  slug, name, tag, desc, logo, items,
}: (typeof divisions)[number]) {
  return (
    <Link
      to={`/services/${slug}`}
      className="group relative block overflow-hidden rounded-3xl border border-border/60 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40"
      style={{ background: "var(--gradient-card)" }}
    >
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(circle, oklch(0.82 0.17 88 / 0.5), transparent 70%)" }}
      />
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-card border border-border/80 overflow-hidden transition-transform group-hover:scale-110">
            <img src={logo} alt={name} className="h-9 w-9 object-contain select-none" />
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{tag}</p>
        </div>
        <h3 className="mt-6 text-3xl font-bold">{name}</h3>
        <p className="mt-2 text-muted-foreground">{desc}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {items.slice(0, 6).map((it) => (
            <li key={it} className="rounded-full border border-border/80 px-3 py-1 text-xs text-muted-foreground">
              {it}
            </li>
          ))}
        </ul>
        <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          Explore {name} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

function WhyChoose() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Why MustardOne</p>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold">A journey, not a transaction.</h2>
        </div>
      </Reveal>
      <div className="relative mt-16">
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/40 to-transparent md:block" />
        <div className="grid gap-8 md:grid-cols-3">
          {journey.map((j, i) => (
            <Reveal key={j.word} delay={i * 0.1}>
              <div className="relative rounded-2xl glass p-6">
                <div className="font-display text-5xl font-bold text-gradient-mustard">{i + 1}</div>
                <h3 className="mt-3 text-xl font-bold">{j.word}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{j.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const featuredProjects = [
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
];

function ProjectsShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Featured Work</p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold">Selected projects.</h2>
          </div>
          <Link to="/projects" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-primary">
            All projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05}>
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
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end h-full z-20">
                <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">{p.cat}</p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight font-display">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3 leading-relaxed">{p.desc}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <div
          className="relative overflow-hidden rounded-3xl border border-primary/30 p-12 sm:p-16 text-center"
          style={{ background: "linear-gradient(135deg, #F1E8D7, #E9DFC9)" }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{ background: "radial-gradient(ellipse at top, rgba(226, 213, 188, 0.4), transparent 60%)" }}
          />
          <div className="relative">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Have an idea? <span className="text-gradient-mustard">Let's build it.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Whether it's a prototype, a brand, a service, or a workshop — we'll meet you where you are.
            </p>
            <div className="mt-8 flex justify-center">
              <Magnet padding={40} magnetStrength={4}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 glow-mustard"
                >
                  Start a conversation <ArrowRight className="h-4 w-4" />
                </Link>
              </Magnet>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function CollaborationPartner() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 border-t border-border/40">
      <Reveal>
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Collaborations & Partnerships</p>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">Our Collaboration Partner</h2>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div 
          className="relative max-w-4xl mx-auto rounded-3xl border border-border bg-card p-8 sm:p-12 overflow-hidden shadow-sm flex flex-col md:flex-row items-center justify-between gap-10 hover:border-primary/50 transition-all duration-500"
          style={{ background: "var(--gradient-card)" }}
        >
          {/* Subtle light effects */}
          <div 
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-35 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(226,213,188,0.5), transparent 70%)" }}
          />

          {/* Partner Logo */}
          <div className="flex-1 flex justify-center">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="relative p-6 bg-background rounded-2xl border border-border/80 shadow-md flex items-center justify-center max-w-[280px]"
            >
              <img 
                src="/video_images/nimzliot_logo.png" 
                alt="NIMZLiot Logo" 
                className="w-full h-auto object-contain max-h-[80px]"
              />
            </motion.div>
          </div>

          {/* Partner Details */}
          <div className="flex-[1.5] text-left space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#E2D5BC] px-3.5 py-1.5 rounded-full border border-primary/20 text-[#1C1917]/85">
              Technology & Research Partner
            </span>
            <h3 className="text-2xl font-bold font-display text-[#1C1917]">NIMZLiot</h3>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              We collaborate with NIMZLiot to design advanced Internet of Things (IoT) hardware, conduct embedded research, build smart automation controllers, and foster hands-on workshops in industrial technology domains.
            </p>
            <div className="pt-2">
              <a 
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-[#1C1917] transition-colors"
              >
                Discuss Collaboration Options <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
