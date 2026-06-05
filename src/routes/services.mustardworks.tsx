import { createFileRoute } from "@tanstack/react-router";
import { DivisionPage } from "@/components/DivisionPage";

export const Route = createFileRoute("/services/mustardworks")({
  head: () => ({
    meta: [
      { title: "MustardWorks — Engineering Meets Innovation" },
      { name: "description", content: "Embedded systems, IoT, VLSI, generative AI, ML, EV technology, prototypes, and final-year projects." },
      { property: "og:title", content: "MustardWorks — Engineering Meets Innovation" },
      { property: "og:description", content: "Transforming ideas into practical engineering solutions." },
    ],
  }),
  component: () => (
    <DivisionPage
      eyebrow="MustardWorks"
      title={<>Engineering meets <span className="text-gradient-mustard">innovation.</span></>}
      subtitle="Embedded systems, IoT, VLSI, AI/ML, EV tech, and engineering prototypes — built with rigor and curiosity."
      galleryAccent="from-teal-500/20"
      services={[
        { title: "Embedded Systems", desc: "Firmware, microcontrollers, and real-time systems." },
        { title: "IoT Projects", desc: "Connected devices, sensors, dashboards, and cloud sync." },
        { title: "VLSI Concepts", desc: "Digital design, RTL, verification, and tooling support." },
        { title: "Generative AI", desc: "Prototype LLM workflows and creative AI tooling." },
        { title: "Machine Learning", desc: "Model design, training pipelines, and deployment." },
        { title: "EV Technology", desc: "Battery monitoring, BMS, motor control, and telemetry." },
        { title: "Mini & Final Year Projects", desc: "End-to-end student projects with documentation." },
        { title: "Prototype Development", desc: "From schematic to working hardware in weeks." },
        { title: "Innovation Models", desc: "Concept validation, technical roadmaps, demos." },
      ]}
      process={[
        { step: "01", title: "Discover", desc: "Understand the problem, constraints, and outcome." },
        { step: "02", title: "Design", desc: "Architect the system and choose the right stack." },
        { step: "03", title: "Build", desc: "Engineer, iterate, test." },
        { step: "04", title: "Deliver", desc: "Document, hand off, and support." },
      ]}
      benefits={[
        "Hands-on engineering expertise across hardware and software",
        "Clean documentation you can actually defend",
        "Realistic timelines and transparent communication",
        "Practical solutions, not academic theory",
      ]}
      faqs={[
        { q: "Do you take on final-year engineering projects?", a: "Yes — that's a core part of MustardWorks. We help you scope, build, and document." },
        { q: "What's your typical turnaround?", a: "Prototypes usually take 2–6 weeks depending on scope and hardware availability." },
        { q: "Can you work with my existing team?", a: "Absolutely. We collaborate with internal teams, advisors, and other vendors." },
      ]}
    />
  ),
});
