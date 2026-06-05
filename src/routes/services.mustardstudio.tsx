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
      title={<>Where creativity <span className="text-gradient-mustard">comes alive.</span></>}
      subtitle="Hand-crafted art, identity design, and moving images — built with patience and personality."
      galleryAccent="from-pink-500/20"
      services={[
        { title: "Pencil Portraits", desc: "Detailed graphite portraits from your reference photo." },
        { title: "Color Portraits", desc: "Color pencil and pastel portraits, vibrant and warm." },
        { title: "Watercolor Paintings", desc: "Original watercolor work, landscapes and portraits." },
        { title: "Thread Portraits", desc: "Embroidered thread art with depth and texture." },
        { title: "Custom Artworks", desc: "Commissioned pieces tailored to your story." },
        { title: "Logo Design", desc: "Distinctive marks crafted around your brand idea." },
        { title: "Brand Identity", desc: "Full systems — color, type, voice, and guidelines." },
        { title: "Posters & Banners", desc: "Print-ready layouts for campaigns and events." },
        { title: "Video Editing", desc: "Polished cuts for social, brand, and personal videos." },
        { title: "Motion Graphics", desc: "Animated explainers, intros, and brand motion." },
        { title: "Short Film Production", desc: "End-to-end short film and creative film work." },
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
