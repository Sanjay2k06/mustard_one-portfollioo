import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { TeamStorySection } from "@/components/TeamStorySection";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Meet the Team — MustardOne" },
      { name: "description", content: "Meet the engineers, creators, and innovators behind MustardOne." },
      { property: "og:title", content: "Meet the Team — MustardOne" },
      { property: "og:description", content: "The visionaries building the future through technology." },
    ],
  }),
  component: About,
});

const teamMembers = [
  {
    name: "KAVIARASU S",
    role: "Founder & Proprietor",
    badge: "Founder",
    desc: "Visionary founder leading engineering innovation across embedded systems, VLSI, IoT, and electric vehicle technologies. Passionate about transforming concepts into impactful real-world solutions.",
    skills: ["Embedded Systems", "IoT", "VLSI", "Electric Vehicles", "Engineering Innovation", "Product Development"],
    photo: "/video_images/kavi.jpeg",
    linkedin: "https://www.linkedin.com/in/kaviaficionado/",
  },
  {
    name: "STEPHI PRISCILLA S",
    role: "Machine Learning Engineer",
    desc: "Specialized in designing, training, and optimizing machine learning models for intelligent embedded systems and next-generation IoT applications.",
    skills: ["Python", "TensorFlow", "Machine Learning", "Data Science", "Deep Learning"],
    photo: "/video_images/stephi.jpeg",
    linkedin: "https://www.linkedin.com/in/stephi-priscilla-b0ab13259/",
  },
  {
    name: "RENISHA V",
    role: "VLSI Engineer",
    desc: "Focused on RTL design, digital verification, SystemVerilog implementation, and advanced semiconductor system development.",
    skills: ["VLSI", "SystemVerilog", "RTL Design", "Verification", "Digital Electronics"],
    photo: "/video_images/renisha.jpeg",
    linkedin: "https://www.linkedin.com/in/renisha",
  },
  {
    name: "VISWANATHAN S",
    role: "Operations & Marketing Manager",
    desc: "Leads operational excellence, client communication, strategic planning, and marketing initiatives to ensure sustainable business growth.",
    skills: ["Team Management", "Client Relations", "Business Development", "Marketing Strategy", "Operations"],
    photo: "/video_images/vishwa.jpeg",
  },
  {
    name: "AARON CALEB",
    role: "IoT & Automation Engineer",
    desc: "Designs and develops intelligent IoT ecosystems integrating sensors, cloud platforms, automation systems, and real-time monitoring solutions.",
    skills: ["IoT", "Automation", "ESP32", "Embedded Systems", "Cloud Integration", "Smart Systems"],
    photo: "/video_images/aaron.jpeg",
    linkedin: "https://www.linkedin.com/in/aaroncaleb",
  },

  {
    name: "MUHAMMAD YAHYAA A",
    role: "App Developer & ML Engineer",
    desc: "Develops smart mobile applications integrated with machine learning capabilities to create intelligent and scalable digital products.",
    skills: ["Flutter", "Python", "Machine Learning", "Mobile Development", "AI Applications"],
    photo: "/video_images/yadyaa.jpeg",
    linkedin: "https://www.linkedin.com/in/muhammad-yahyaa-67a4b8250/",
  },
  {
    name: "SRINATH K",
    role: "Biotech Engineer",
    desc: "Provides biotechnology expertise, interdisciplinary research support, and innovation insights for emerging technology collaborations.",
    skills: ["Biotechnology", "Research", "Analysis", "Innovation"],
    photo: "/video_images/srinath.jpeg",
    linkedin: "https://www.linkedin.com/in/srinath-k-476203383/",
  },
  {
    name: "RAJESH R",
    role: "Laptop Technical Solutions Specialist",
    desc: "Expert in system upgrades, laptop servicing, hardware integration, performance enhancement, and technical troubleshooting.",
    skills: ["Laptop Repair", "RAM Upgrade", "SSD Upgrade", "Hardware Integration", "Technical Support"],
    photo: "/video_images/rajesh.jpeg",
  },
  {
    name: "BALAGANESH M",
    role: "Portrait Sketching Artist",
    desc: "Creative artist specializing in realistic portraits, custom illustrations, concept sketches, and personalized artistic creations.",
    skills: ["Pencil Sketching", "Portrait Art", "Creative Design", "Illustration", "Custom Artwork"],
    photo: "/video_images/bala.jpeg",
    instagram: "https://www.instagram.com/bg_artzzz?igsh=c3dxNDh6MG5xa2R1",
  },
] as const;

function About() {
  return (
    <PageShell>
      {/* Wrapper matching the homepage theme (Ivory White bg, Charcoal text) */}
      <div className="bg-background text-foreground min-h-screen relative -mt-24 pt-24 font-sans select-none">
        
        {/* Floating warm gradient lights & blobs background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-20 left-1/4 h-[600px] w-[600px] rounded-full blur-[140px] opacity-35"
            style={{ background: "radial-gradient(circle, rgba(226,213,188,0.45), transparent 70%)" }}
          />
          <div
            className="absolute top-[40vh] right-1/4 h-[500px] w-[500px] rounded-full blur-[140px] opacity-25"
            style={{ background: "radial-gradient(circle, rgba(241,232,215,0.35), transparent 70%)" }}
          />
        </div>

        {/* SECTION 1: HERO */}
        <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
          {/* Floating particle overlays */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-primary/40"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.4, 1],
                }}
                transition={{
                  duration: 6 + Math.random() * 6,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="relative z-10 space-y-6 max-w-4xl mx-auto flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs uppercase tracking-[0.3em] text-[#1C1917]/70 font-bold mb-2"
            >
              Who We Are
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-5xl md:text-7xl font-bold tracking-tight leading-tight font-display text-[#1C1917]"
            >
              Meet The Minds Behind <br />
              <span className="text-gradient-mustard">
                MustardWorks™
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            >
              Engineers, innovators, creators, and visionaries building the future through technology.
            </motion.p>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/55 text-xs tracking-widest uppercase cursor-pointer"
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight - 80,
                behavior: "smooth"
              });
            }}
          >
            Scroll Down
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ArrowDown className="h-4 w-4 text-primary" />
            </motion.div>
          </motion.div>
        </section>

        {/* SECTION 2: TEAM STORY EXPERIENCE */}
        <section className="relative z-10 border-t border-border/60 bg-background/50 backdrop-blur-sm">
          {teamMembers.map((member, index) => (
            <TeamStorySection
              key={member.name}
              member={member}
              index={index}
            />
          ))}
        </section>

      </div>
    </PageShell>
  );
}
