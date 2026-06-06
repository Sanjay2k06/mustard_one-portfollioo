import { useRef, useEffect, useState } from "react";
import Magnet from "./Magnet";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Linkedin, Instagram } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Member {
  name: string;
  role: string;
  badge?: string;
  desc: string;
  skills: readonly string[];
  photo: string;
  linkedin?: string;
  instagram?: string;
}

export function TeamStorySection({ member, index }: { member: Member; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Calculate 3D tilt angle on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angle = 12; // Max tilt angle in degrees
    setRotateX(((yc - y) / yc) * angle);
    setRotateY(((x - xc) / xc) * angle);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const poster = posterRef.current;
    const content = contentRef.current;

    // Desktop GSAP entry animation on scroll
    if (poster && content && window.innerWidth >= 768) {
      gsap.fromTo(
        poster,
        { 
          y: 100, 
          opacity: 0, 
          scale: 0.9, 
          rotateY: index % 2 === 0 ? 15 : -15 
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateY: 0,
          scrollTrigger: {
            trigger: el,
            start: "top bottom-=10%",
            end: "center center",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        content,
        { y: 150, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: el,
            start: "top bottom-=20%",
            end: "center center",
            scrub: 0.8,
          },
        }
      );
    }
  }, [index]);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={containerRef}
      className="min-h-[50vh] flex flex-col md:flex-row items-center justify-between py-10 md:py-14 px-6 max-w-7xl mx-auto border-b border-border/60 gap-12 relative"
    >
      {/* 3D Tilt Card Container */}
      <div
        className={`w-full md:w-[40%] flex justify-center ${
          isEven ? "md:order-1" : "md:order-2"
        }`}
      >
        <div
          ref={posterRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-[320px] h-[400px] md:w-[380px] md:h-[480px] lg:w-[410px] lg:h-[520px] rounded-3xl overflow-hidden border border-border bg-card shadow-[0_20px_50px_-20px_rgba(28,25,23,0.15)] transition-all duration-300 ease-out cursor-pointer hover:border-primary/50 hover:shadow-[0_25px_60px_-15px_rgba(28,25,23,0.22)]"
          style={{ 
            transformStyle: "preserve-3d",
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
          }}
        >
          {/* Subtle gradient vignette to blend edges */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/25 via-transparent to-transparent z-10 pointer-events-none" />
          
          {/* High fidelity image element fitting the face perfectly */}
          <img
            src={member.photo}
            alt={member.name}
            className="w-full h-full object-cover select-none pointer-events-none"
            loading="lazy"
          />
        </div>
      </div>

      {/* Information Content Container */}
      <div
        ref={contentRef}
        className={`w-full md:w-[55%] text-left flex flex-col justify-center ${
          isEven ? "md:order-2" : "md:order-1"
        }`}
      >
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-[#1C1917] text-xs font-semibold tracking-[0.2em] uppercase bg-[#E2D5BC] px-3.5 py-1.5 rounded-full border border-primary/20">
              {member.role}
            </span>
            {member.badge && (
              <span className="text-muted-foreground text-xs font-semibold tracking-wider bg-secondary px-3.5 py-1.5 rounded-full border border-border">
                {member.badge}
              </span>
            )}
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground font-display flex flex-wrap items-center gap-3">
            <span>{member.name}</span>
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors cursor-pointer inline-flex items-center"
                title="LinkedIn Profile"
              >
                <Linkedin className="h-6 w-6 stroke-[1.8]" />
              </a>
            )}
            {member.instagram && (
              <a
                href={member.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors cursor-pointer inline-flex items-center"
                title="Instagram Profile"
              >
                <Instagram className="h-6 w-6 stroke-[1.8]" />
              </a>
            )}
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
            {member.desc}
          </p>

          <div className="space-y-3 pt-4">
            <h4 className="text-xs uppercase tracking-wider text-primary font-semibold">
              Key Expertise
            </h4>
            <div className="flex flex-wrap gap-2">
              {member.skills.map((skill) => (
                <Magnet key={skill} padding={12} magnetStrength={3}>
                  <span className="inline-block text-xs font-medium bg-card text-[#1C1917]/80 border border-border px-3.5 py-1.5 rounded-full hover:border-primary/50 hover:text-foreground transition-all cursor-pointer shadow-sm">
                    {skill}
                  </span>
                </Magnet>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
