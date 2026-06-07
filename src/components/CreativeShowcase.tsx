import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import Magnet from "./Magnet";

interface Project {
  id: string;
  title: string;
  category: string;
  desc: string;
  image: string;
  bgTheme: string;
  accentColor: string;
  secondaryAccent: string;
}

const projects: Project[] = [
  {
    id: "pencil",
    title: "Pencil Sketch",
    category: "Portrait Art",
    desc: "Realistic hand drawn portraits crafted with precision, detail, and artistic excellence.",
    image: "/video_images/pencil.jpeg",
    bgTheme: "#0F0F1A",
    accentColor: "#6D3DF5",
    secondaryAccent: "#A78BFA"
  },
  {
    id: "water",
    title: "Water Painting",
    category: "Watercolor Art",
    desc: "Vibrant watercolor artworks that transform memories and ideas into timeless creations.",
    image: "/video_images/water.jpeg",
    bgTheme: "#121124",
    accentColor: "#F472B6",
    secondaryAccent: "#A78BFA"
  },
  {
    id: "thread",
    title: "Thread Portrait",
    category: "Embroidery Art",
    desc: "Unique handcrafted portraits created using threads for a distinctive artistic appearance.",
    image: "/video_images/threat.jpeg",
    bgTheme: "#15132a",
    accentColor: "#A78BFA",
    secondaryAccent: "#F472B6"
  },
  {
    id: "brand",
    title: "Brand Design Suite",
    category: "Brand & Identity",
    desc: "Logo design, poster design, social media creatives, business branding, and complete visual identity solutions.",
    image: "/video_images/brand.jpeg",
    bgTheme: "#0F0F1A",
    accentColor: "#6D3DF5",
    secondaryAccent: "#F472B6"
  },
  {
    id: "film",
    title: "Short Film Production",
    category: "Film & Media",
    desc: "End-to-end production services including concept development, filming, direction, and storytelling.",
    image: "/video_images/video.jpeg",
    bgTheme: "#131126",
    accentColor: "#F472B6",
    secondaryAccent: "#6D3DF5"
  },
  {
    id: "edit",
    title: "Video Editing",
    category: "Video Production",
    desc: "Professional editing for reels, advertisements, promotional videos, YouTube content, and cinematic projects.",
    image: "/video_images/edit.jpeg",
    bgTheme: "#111022",
    accentColor: "#A78BFA",
    secondaryAccent: "#FFFFFF"
  }
];

interface CreativeShowcaseProps {
  activeProjectId?: string;
  onChangeActiveProject?: (id: string) => void;
}

export function CreativeShowcase({
  activeProjectId: propActiveProjectId,
  onChangeActiveProject,
}: CreativeShowcaseProps = {}) {
  const [internalActiveProjectId, setInternalActiveProjectId] = useState("pencil");
  const activeProjectId = propActiveProjectId !== undefined ? propActiveProjectId : internalActiveProjectId;

  const setActiveProjectId = (id: string) => {
    if (onChangeActiveProject) {
      onChangeActiveProject(id);
    } else {
      setInternalActiveProjectId(id);
    }
  };

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      id="beauty-done-by-us"
      className="relative w-full py-16 lg:py-24 overflow-hidden transition-colors duration-1000"
      style={{ backgroundColor: activeProject.bgTheme }}
    >
      {/* Background Mesh Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(${activeProject.accentColor}0a 1px, transparent 1px), linear-gradient(90deg, ${activeProject.accentColor}0a 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(circle at center, black, transparent 90%)",
          WebkitMaskImage: "radial-gradient(circle at center, black, transparent 90%)"
        }}
      />

      {/* Mouse Follow Ambient Light */}
      <div
        className="absolute w-[450px] h-[450px] rounded-full blur-[120px] pointer-events-none opacity-30 transition-colors duration-1000 hidden lg:block"
        style={{
          background: `radial-gradient(circle, ${activeProject.accentColor}33 0%, transparent 70%)`,
          left: mousePos.x - 225,
          top: mousePos.y - 225
        }}
      />

      {/* Container with locked maximum width and optimized horizontal padding */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* DESKTOP 3-COLUMN EDITORIAL GRID LAYOUT */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-center min-h-[500px]">
          
          {/* Column 1: Featured Content (Span 4) */}
          <div className="col-span-4 flex flex-col justify-center space-y-6">
            <div>
              <span 
                className="text-[10px] font-extrabold uppercase tracking-[0.3em]"
                style={{ color: activeProject.accentColor }}
              >
                Creative Portfolio
              </span>
              <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight text-[#FFFFFF] leading-[1.08] mt-1">
                Explore Our <br />
                <span className="text-gradient-mustard">Creative Works.</span>
              </h2>
              <p className="text-muted-foreground/80 text-[11px] leading-relaxed mt-2 max-w-[320px]">
                A curated collection of artworks, visual branding, cinematic productions, and creative experiences crafted by MustardStudio.
              </p>
            </div>

            {/* Dynamic Text Details */}
            <div className="min-h-[140px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProjectId}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="space-y-2.5"
                >
                  <span
                    className="text-[8px] font-extrabold uppercase tracking-[0.2em] px-2.5 py-1 rounded"
                    style={{ 
                      backgroundColor: `${activeProject.accentColor}25`,
                      color: activeProject.secondaryAccent 
                    }}
                  >
                    {activeProject.category}
                  </span>
                  <h3 className="font-display text-2xl font-extrabold text-[#FFFFFF] tracking-tight">
                    {activeProject.title}
                  </h3>
                  <p className="text-muted-foreground/80 text-xs leading-relaxed max-w-[340px]">
                    {activeProject.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* CTA Trigger */}
            <div className="pt-1">
              <Magnet padding={20} magnetStrength={3}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-xs font-bold text-[#FFFFFF] transition-all shadow-lg hover:scale-105 cursor-pointer w-fit"
                  style={{
                    backgroundColor: activeProject.accentColor,
                    boxShadow: `0 10px 20px -5px ${activeProject.accentColor}40`
                  }}
                >
                  Book Now <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Magnet>
            </div>
          </div>

          {/* Column 2: Featured Animated Artwork Card (Span 5) */}
          <div className="col-span-5 flex justify-center">
            <ArtworkCard
              project={activeProject}
              isActive={true}
            />
          </div>

          {/* Column 3: Interactive Sidebar Selector (Span 3) */}
          <div className="col-span-3 h-full flex flex-col justify-center pl-4">
            <div className="space-y-3.5">
              {projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  onMouseEnter={() => setActiveProjectId(proj.id)}
                  className="group flex items-center gap-3.5 cursor-pointer py-1.5"
                >
                  <span
                    className={`text-[9px] font-mono transition-colors duration-300 ${
                      activeProjectId === proj.id
                        ? "text-[#FFFFFF] font-bold"
                        : "text-[#5B5B5B]"
                    }`}
                  >
                    {(idx + 1).toString().padStart(2, "0")}
                  </span>
                  
                  <div className="flex-1">
                    <h4
                      className={`text-[11px] uppercase tracking-wider font-extrabold transition-colors duration-300 ${
                        activeProjectId === proj.id
                          ? "text-[#FFFFFF]"
                          : "text-[#7C7C7C] group-hover:text-stone-300"
                      }`}
                    >
                      {proj.title}
                    </h4>
                    <span 
                      className="text-[8px] block font-semibold transition-colors duration-300"
                      style={{ color: activeProjectId === proj.id ? proj.secondaryAccent : '#7C7C7C' }}
                    >
                      {proj.category}
                    </span>
                  </div>

                  <div className="w-1.5 h-1.5 rounded-full bg-stone-800/40 overflow-hidden relative shrink-0">
                    <motion.div
                      className="absolute inset-0"
                      style={{ backgroundColor: proj.accentColor }}
                      initial={{ scale: 0 }}
                      animate={{ scale: activeProjectId === proj.id ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* MOBILE & TABLET FALLBACK LAYOUT */}
        <div className="lg:hidden flex flex-col space-y-8">
          
          {/* Header */}
          <div className="space-y-1">
            <span 
              className="text-[9px] font-extrabold uppercase tracking-[0.25em]"
              style={{ color: activeProject.accentColor }}
            >
              Creative Portfolio
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#FFFFFF]">
              Explore Our <span className="text-gradient-mustard">Creative Works.</span>
            </h2>
          </div>

          {/* Featured Visual Card */}
          <div className="w-full flex justify-center">
            <ArtworkCard
              project={activeProject}
              isActive={true}
            />
          </div>

          {/* Horizontal Pill Selector */}
          <div className="w-full overflow-x-auto scrollbar-none py-1.5 flex gap-2">
            {projects.map((proj) => (
              <button
                key={proj.id}
                onClick={() => setActiveProjectId(proj.id)}
                className="px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider border shrink-0 transition-all cursor-pointer"
                style={
                  activeProjectId === proj.id
                    ? {
                        backgroundColor: proj.accentColor,
                        borderColor: proj.accentColor,
                        color: "#1A1A1A",
                      }
                    : {
                        backgroundColor: "rgba(26, 26, 26, 0.6)",
                        borderColor: "rgba(255, 255, 255, 0.08)",
                        color: "#A3A3A3",
                      }
                }
              >
                {proj.title}
              </button>
            ))}
          </div>

          {/* Details & Action */}
          <div className="bg-[#242424]/60 border border-[#2E2E2E] rounded-3xl p-5 space-y-3">
            <div>
              <span 
                className="text-[8px] font-extrabold uppercase tracking-widest"
                style={{ color: activeProject.accentColor }}
              >
                {activeProject.category}
              </span>
              <h3 className="font-display text-xl font-bold text-[#FFFFFF] mt-0.5">
                {activeProject.title}
              </h3>
            </div>
            <p className="text-muted-foreground/80 text-xs leading-relaxed">
              {activeProject.desc}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[10px] font-bold text-[#FFFFFF] transition-all cursor-pointer w-full justify-center shadow-md"
              style={{
                backgroundColor: activeProject.accentColor,
                boxShadow: `0 4px 12px ${activeProject.accentColor}25`
              }}
            >
              Book Now <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   ARTWORK ANIMATION WRAPPER
   ------------------------------------------------------------------------- */
interface ArtworkCardProps {
  project: Project;
  isActive: boolean;
}

function ArtworkCard({ project, isActive }: ArtworkCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <Link
      to="/contact"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full max-w-[420px] aspect-[4/5] rounded-[24px] overflow-hidden p-[1px] cursor-pointer transition-all duration-500 shadow-md block ${
        isActive ? "scale-100 opacity-100 shadow-stone-900/60 shadow-lg" : "scale-[0.97] opacity-80"
      }`}
      style={{
        background: isHovered
          ? `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, ${project.accentColor}60, ${project.accentColor}10 60%, transparent 100%)`
          : `${project.accentColor}25`
      }}
    >
      <div className="w-full h-full bg-[#242424]/90 backdrop-blur-sm rounded-[23px] overflow-hidden relative flex flex-col justify-between p-4">
        
        {/* Core Media Display Container */}
        <div className="w-full h-[88%] rounded-[18px] overflow-hidden border border-[#2E2E2E] relative bg-[#1A1A1A]">
          <motion.img
            key={project.id}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover select-none"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* CUSTOM CATEGORY ANIMATIONS */}
          {project.id === "pencil" && <GraphiteParticles project={project} />}
          {project.id === "water" && <WatercolorSplash isActive={isActive} project={project} />}
          {project.id === "thread" && <ThreadLines isActive={isActive} project={project} />}
          {project.id === "film" && <FilmReelAnimation isActive={isActive} />}
          {project.id === "edit" && <TimelineScrubAnimation isActive={isActive} project={project} />}

          {/* Elegant Dark Glass Overlay on Hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-stone-950/85 backdrop-blur-[4px] p-6 flex flex-col justify-end z-25"
          >
            <div className="space-y-2.5">
              <span 
                className="text-[9px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded w-fit"
                style={{ 
                  backgroundColor: `${project.accentColor}20`,
                  color: project.secondaryAccent 
                }}
              >
                {project.category}
              </span>
              <h4 className="font-display text-xl font-bold text-[#FFFFFF] leading-snug">
                {project.title}
              </h4>
              <p className="text-muted-foreground/80 text-[11px] leading-relaxed">
                {project.desc}
              </p>
              <div 
                className="pt-2 flex items-center gap-1.5 text-xs font-bold"
                style={{ color: project.accentColor }}
              >
                Book Now <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Static Title Header Line at the bottom of the card */}
        <div className="px-1 pt-2 pb-1 flex justify-between items-center z-10">
          <div>
            <span 
              className="text-[8px] font-bold tracking-widest uppercase"
              style={{ color: project.secondaryAccent }}
            >
              {project.category}
            </span>
            <h3 className="font-display text-xs font-bold text-[#FFFFFF] tracking-tight transition-colors duration-300">
              {project.title}
            </h3>
          </div>
          <span className="text-[10px] font-mono text-[#6D628B]">Exhibition</span>
        </div>

      </div>
    </Link>
  );
}

/* -------------------------------------------------------------------------
   CUSTOM ARTWORK SUB-ANIMATION MODULES
   ------------------------------------------------------------------------- */

// Pencil Sketch - Floating graphite dust particles
function GraphiteParticles({ project }: { project: Project }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: { x: number; y: number; size: number; speedY: number; speedX: number; opacity: number }[] = [];
    
    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      size: Math.random() * 1.5 + 0.5,
      speedY: -(Math.random() * 0.6 + 0.2),
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.4 + 0.1
    });

    // Seed initial particles
    for (let i = 0; i < 25; i++) {
      particles.push({
        ...createParticle(),
        y: Math.random() * canvas.height
      });
    }

    const resize = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, idx) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.opacity -= 0.0005;
        if (p.y < -10 || p.opacity <= 0) {
          particles[idx] = createParticle();
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.globalAlpha = p.opacity * 0.5;
        ctx.fillStyle = project.secondaryAccent;
        ctx.fill();
      });
      animationId = requestAnimationFrame(render);
    };
    render();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [project.secondaryAccent]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10 w-full h-full" />;
}

// Water Painting - Expanding color watercolor splotches
function WatercolorSplash({ isActive, project }: { isActive: boolean; project: Project }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden flex items-center justify-center">
      {isActive && (
        <>
          <motion.svg
            viewBox="0 0 200 200"
            initial={{ scale: 0, opacity: 0, rotate: -25 }}
            animate={{ scale: 1.4, opacity: 0.15, rotate: 5 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute w-full h-full fill-current"
            style={{ color: project.accentColor }}
          >
            <path d="M100,20 C120,40 140,20 160,40 C180,60 160,80 180,100 C200,120 180,140 160,160 C140,180 120,160 100,180 C80,200 60,180 40,160 C20,140 40,120 20,100 C0,80 20,60 40,40 C60,20 80,0 100,20 Z" />
          </motion.svg>
          <motion.svg
            viewBox="0 0 200 200"
            initial={{ scale: 0, opacity: 0, rotate: 30 }}
            animate={{ scale: 1.25, opacity: 0.15, rotate: -15 }}
            transition={{ duration: 2.2, delay: 0.2, ease: "easeOut" }}
            className="absolute w-4/5 h-4/5 fill-current"
            style={{ color: project.secondaryAccent }}
          >
            <path d="M100,30 C130,15 150,45 170,60 C190,75 165,105 180,130 C195,155 150,170 130,160 C110,150 90,190 70,170 C50,150 30,165 20,140 C10,115 45,95 30,70 C15,45 60,30 70,45 Z" />
          </motion.svg>
        </>
      )}
    </div>
  );
}

// Thread Portrait - Sewing geometry lines drawing across coordinate points
function ThreadLines({ isActive, project }: { isActive: boolean; project: Project }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {isActive && (
        <svg 
          className="w-full h-full stroke-[0.75] fill-none"
          style={{ stroke: `${project.secondaryAccent}4d` }}
        >
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.line
              key={`line-1-${i}`}
              x1={15 + i * 24}
              y1={0}
              x2={380 - i * 20}
              y2={450}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, delay: i * 0.04, ease: "easeInOut" }}
            />
          ))}
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.line
              key={`line-2-${i}`}
              x1={0}
              y1={20 + i * 25}
              x2={400}
              y2={430 - i * 22}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, delay: i * 0.04 + 0.25, ease: "easeInOut" }}
            />
          ))}
        </svg>
      )}
    </div>
  );
}


// Short Film Production - Viewfinder HUD and Film loop
function FilmReelAnimation({ isActive }: { isActive: boolean }) {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {isActive && (
        <>
          {/* Film strip left side */}
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-stone-950/95 flex flex-col justify-around py-1 items-center opacity-85 z-20">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-2.5 h-3 bg-[#1A1A1A] rounded-sm" />
            ))}
          </div>

          {/* Film strip right side */}
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-stone-950/95 flex flex-col justify-around py-1 items-center opacity-85 z-20">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-2.5 h-3 bg-[#1A1A1A] rounded-sm" />
            ))}
          </div>

          {/* Viewfinder Overlay */}
          <div className="absolute inset-x-6 inset-y-3 border border-stone-100/35 flex flex-col justify-between p-2 font-mono text-[7px] text-stone-200 z-20">
            <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-[#FF8A00]" />
            <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-[#FF8A00]" />
            <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-[#FF8A00]" />
            <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-[#FF8A00]" />

            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[#EF4444] rounded-full animate-pulse" />
                <span className="font-bold text-[#EF4444]">REC</span>
              </div>
              <div>RAW 4K</div>
            </div>
            <div className="flex justify-between items-center w-full mt-auto">
              <div>A: 24dB</div>
              <div>60%🔋</div>
            </div>
          </div>

          {/* Subtle noise loop overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzIiBoZWlnaHQ9IjMiPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDc3Ii8+Cjwvc3ZnPg==')] opacity-40 mix-blend-overlay z-15 pointer-events-none" />
        </>
      )}
    </div>
  );
}

// Video Editing - Audio timeline track scrubbing
function TimelineScrubAnimation({ isActive, project }: { isActive: boolean; project: Project }) {
  return (
    <div className="absolute inset-x-0 bottom-0 h-20 bg-stone-950/95 border-t border-stone-800 p-2 z-20 pointer-events-none font-mono text-[7px] text-stone-400 flex flex-col justify-between">
      <div className="space-y-1">
        {/* Video Track V1 */}
        <div className="relative h-3 bg-stone-900 rounded overflow-hidden flex items-center px-1">
          <span className="text-[5px] text-stone-600 mr-1.5 font-bold">V1</span>
          <div 
            className="h-2 w-20 rounded border flex items-center justify-center text-[4px] text-stone-300"
            style={{ backgroundColor: `${project.accentColor}33`, borderColor: project.accentColor }}
          >
            C01_grad.mov
          </div>
          <div 
            className="h-2 w-24 rounded border flex items-center justify-center text-[4px] text-stone-300 ml-1"
            style={{ backgroundColor: `${project.secondaryAccent}33`, borderColor: project.secondaryAccent }}
          >
            E02_end.mov
          </div>
        </div>
        {/* Audio Track A1 */}
        <div className="relative h-3 bg-stone-900 rounded overflow-hidden flex items-center px-1">
          <span className="text-[5px] text-stone-600 mr-1.5 font-bold">A1</span>
          <div className="h-2 w-44 bg-blue-500/10 rounded border border-blue-500/30 flex items-center pl-1">
            <svg className="w-full h-full stroke-blue-500/40 stroke-[0.5] fill-none">
              <path d="M 0 4 Q 4 1 8 7 T 16 4 T 24 1 T 32 7 T 40 4 T 48 1 T 56 7 T 64 4" />
            </svg>
          </div>
        </div>
      </div>

      {/* Red scrub line playhead */}
      {isActive && (
        <motion.div
          initial={{ left: "10%" }}
          animate={{ left: "90%" }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
          className="absolute top-0 bottom-0 w-0.5 bg-red-600 z-30"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-600 rotate-45" />
        </motion.div>
      )}

      <div className="flex justify-between text-[5px] text-stone-600 leading-none">
        <span>00:01:42:09</span>
        <span>24p</span>
      </div>
    </div>
  );
}
