import { createFileRoute } from "@tanstack/react-router";
import { DivisionPage } from "@/components/DivisionPage";

export const Route = createFileRoute("/services/mustardstudio")({
  head: () => ({
    meta: [
      { title: "MustardStudio — Where Creativity Comes Alive" },
      { name: "description", content: "Portraits, paintings, brand identity, video editing, motion graphics, and short film production." },
      { property: "og:title", content: "MustardStudio — Where Creativity Comes Alive" },
      { property: "og:description", content: "Where imagination meets craftsmanship." },
    ],
  }),
  component: () => (
    <DivisionPage
      eyebrow="MustardStudio"
      logo="/video_images/mustard_arts.png"
      theme="studio"
      title={<>Where creativity <span className="text-gradient-mustard">comes alive.</span></>}
      subtitle="Hand-crafted art, identity design, and moving images — built with patience and personality."
      galleryAccent="from-pink-500/20"
      services={[
        { title: "Pencil Sketch", desc: "Realistic hand drawn portraits crafted with precision, detail, and artistic excellence." },
        { title: "Water Painting", desc: "Vibrant watercolor artworks that transform memories and ideas into timeless creations." },
        { title: "Thread Portrait", desc: "Unique handcrafted portraits created using threads for a distinctive artistic appearance." },
        { title: "Brand Design Suite", desc: "Logo design, poster design, social media creatives, business branding, and complete visual identity solutions." },
        { title: "Short Film Production", desc: "End-to-end production services including concept development, filming, direction, and storytelling." },
        { title: "Video Editing", desc: "Professional editing for reels, advertisements, promotional videos, YouTube content, and cinematic projects." },
      ]}
      benefits={[
        "Real craftsmanship, not template work",
        "Clear creative direction with revisions baked in",
        "Print and digital deliverables ready to ship",
      ]}
      faqs={[
        { q: "How long does a custom portrait take?", a: "Most portraits take 1–3 weeks depending on size and detail." },
        { q: "Do you ship physical artwork?", a: "Yes — pan-India shipping with safe packaging." },
        { q: "Can you handle full brand launches?", a: "Yes, from logo to launch motion to social templates." },
      ]}
    />
  ),
});
