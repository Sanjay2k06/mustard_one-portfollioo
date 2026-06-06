import { createFileRoute } from "@tanstack/react-router";
import { DivisionPage } from "@/components/DivisionPage";

export const Route = createFileRoute("/services/mustardlearn")({
  head: () => ({
    meta: [
      { title: "MustardLearn — Learn Beyond The Classroom" },
      { name: "description", content: "Workshops in embedded systems, IoT, VLSI, EV technology, plus creative classes and career guidance." },
      { property: "og:title", content: "MustardLearn — Learn Beyond The Classroom" },
      { property: "og:description", content: "Practical learning beyond classrooms." },
    ],
  }),
  component: () => (
    <DivisionPage
      eyebrow="MustardLearn"
      logo="/video_images/mustard_learn.png"
      hideGallery={true}
      theme="learn"
      title={<>Learn beyond the <span className="text-gradient-mustard">classroom.</span></>}
      subtitle="Hands-on workshops, practical curriculum, and career guidance built by people who actually ship work."
      galleryAccent="from-amber-500/20"
      services={[
        { title: "Embedded Systems & IoT", desc: "Microcontrollers, sensors, and connected projects." },
        { title: "VLSI Fundamentals", desc: "Digital design, RTL, and verification basics." },
        { title: "Electric Vehicle Technology", desc: "BMS, motors, and EV system architecture." },
        { title: "Sketching Classes", desc: "Pencil, perspective, and observational drawing." },
        { title: "Painting Workshops", desc: "Watercolor and acrylic fundamentals." },
        { title: "Origami Workshops", desc: "Paper craft for kids, students, and adults." },
        { title: "Career Guidance", desc: "1:1 sessions on careers, projects, and portfolios." },
        { title: "Certification Programs", desc: "Structured tracks with assessments and certificates." },
      ]}
      process={[
        { step: "01", title: "Choose", desc: "Pick a track that fits your goal." },
        { step: "02", title: "Learn", desc: "Hands-on classes, real projects." },
        { step: "03", title: "Build", desc: "Ship a project you can show off." },
        { step: "04", title: "Grow", desc: "Career guidance and next steps." },
      ]}
      benefits={[
        "Project-first, not slides-first",
        "Small batches with real mentor time",
        "Certificates that mean something",
      ]}
      faqs={[
        { q: "Are workshops online or offline?", a: "Both — most workshops are available in hybrid format." },
        { q: "Do students get certificates?", a: "Yes, on successful project completion." },
      ]}
    />
  ),
});
