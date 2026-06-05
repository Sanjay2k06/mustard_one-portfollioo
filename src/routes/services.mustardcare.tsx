import { createFileRoute } from "@tanstack/react-router";
import { DivisionPage } from "@/components/DivisionPage";

export const Route = createFileRoute("/services/mustardcare")({
  head: () => ({
    meta: [
      { title: "MustardCare — Optimizing Technology for Performance" },
      { name: "description", content: "Custom PC builds, RAM/SSD upgrades, laptop service, system optimization, and ongoing technical support." },
      { property: "og:title", content: "MustardCare — Optimizing Technology for Performance" },
      { property: "og:description", content: "Helping users maximize device performance and reliability." },
    ],
  }),
  component: () => (
    <DivisionPage
      eyebrow="MustardCare"
      title={<>Optimizing technology for <span className="text-gradient-mustard">better performance.</span></>}
      subtitle="From a faster laptop to a fully custom workstation — we tune the hardware around how you actually work."
      galleryAccent="from-blue-500/20"
      services={[
        { title: "Custom PC Building", desc: "Hand-picked parts, neat builds, fully tested." },
        { title: "RAM Upgrades", desc: "Compatibility-checked memory upgrades and installation." },
        { title: "SSD Upgrades", desc: "Cloning, fresh installs, and dramatic speed boosts." },
        { title: "Storage Expansion", desc: "Add storage without losing your existing setup." },
        { title: "Laptop Service", desc: "Cleaning, paste replacement, fan & hinge service." },
        { title: "System Optimization", desc: "Boot times, background apps, and driver hygiene." },
        { title: "Performance Tuning", desc: "Thermals, power profiles, and workload tuning." },
        { title: "Technical Support", desc: "Ongoing care for individuals, studios, and offices." },
      ]}
      process={[
        { step: "01", title: "Diagnose", desc: "Honest assessment, no upsell." },
        { step: "02", title: "Quote", desc: "Clear parts list, clear pricing." },
        { step: "03", title: "Service", desc: "Careful work, properly tested." },
        { step: "04", title: "Support", desc: "Warranty and follow-up included." },
      ]}
      benefits={[
        "No-upsell diagnostics",
        "Genuine, warrantied components",
        "Builds tuned for your real workload, not benchmarks",
      ]}
    />
  ),
});
