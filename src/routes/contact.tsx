import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Facebook, 
  Clock, 
  ArrowRight,
  ChevronDown
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import Magnet from "@/components/Magnet";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — MustardOne" },
      { name: "description", content: "Get in touch with MustardOne. Reach us for project discussions, consultations, and support." },
      { property: "og:title", content: "Contact Us — MustardOne" },
      { property: "og:description", content: "Connect with our engineering, creative, support, and learning divisions." },
    ],
  }),
  component: Contact,
});

// Canvas Confetti Effect Component
function ConfettiEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const colors = ["#E2D5BC", "#D1BF9D", "#F1E8D7", "#E9DFC9", "#78716C", "#1C1917"];
    const particles = Array.from({ length: 110 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 3.5 + 2,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 3 - 1.5,
      oscillation: Math.random() * 2,
      oscillationSpeed: Math.random() * 0.03 + 0.01,
    }));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speed;
        p.rotation += p.rotationSpeed;
        p.x += Math.sin(p.oscillation) * 0.6;
        p.oscillation += p.oscillationSpeed;

        if (p.y > height) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        
        if (p.size > 8) {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-40 w-full h-full" />;
}

// Custom Success Checkmark Path Animation
function SuccessCheckmark() {
  return (
    <div className="w-24 h-24 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center shadow-lg">
      <svg
        className="w-12 h-12 text-green-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        viewBox="0 0 24 24"
      >
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
  );
}

// Blur Text Reveal Component for Titles
function BlurTextReveal({ children, className = "", delay = 0 }: { children: string; className?: string; delay?: number }) {
  const words = children.split(" ");
  return (
    <h1 className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, filter: "blur(12px)", y: 25 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            duration: 0.9,
            delay: delay + i * 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}

// Interactive 3D Card wrapper for Quick Cards
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const maxTilt = 8; 
    setRotateX(((yc - y) / yc) * maxTilt);
    setRotateY(((x - xc) / xc) * maxTilt);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${className} transition-all duration-200 ease-out`}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`,
      }}
    >
      <div style={{ transform: "translateZ(10px)" }} className="h-full">
        {children}
      </div>
    </div>
  );
}

function Contact() {
  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "MustardWorks",
    message: ""
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Background Blob Cursor Coordinates
  const [mousePos, setMousePos] = useState({ x: -250, y: -250 });
  const [isHoveringPage, setIsHoveringPage] = useState(false);

  // References for GSAP triggers
  const pageRef = useRef<HTMLDivElement>(null);
  const hoursRef = useRef<HTMLDivElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);
  const quickCardsRef = useRef<HTMLDivElement>(null);

  const dropdownOptions = [
    "MustardWorks",
    "MustardStudio",
    "MustardCare",
    "MustardLearn",
    "Other"
  ] as const;

  // Handle pointer tracking
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsHoveringPage(true);
    };

    const handlePointerLeave = () => {
      setIsHoveringPage(false);
    };

    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  // Close custom dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // GSAP ScrollTrigger entry animations
  useEffect(() => {
    // 1. Business hours cards entry
    const hoursCards = hoursRef.current?.querySelectorAll(".schedule-card-item");
    if (hoursCards && hoursCards.length > 0) {
      gsap.fromTo(
        hoursCards,
        { opacity: 0, y: 50, scale: 0.94, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: hoursRef.current,
            start: "top bottom-=10%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    // 2. Form section reveal
    if (formSectionRef.current) {
      gsap.fromTo(
        formSectionRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formSectionRef.current,
            start: "top bottom-=8%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    // 3. Quick cards stagger entrance
    const quickCards = quickCardsRef.current?.querySelectorAll(".quick-card-item");
    if (quickCards && quickCards.length > 0) {
      gsap.fromTo(
        quickCards,
        { opacity: 0, y: 60, scale: 0.88, filter: "blur(3px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.12,
          ease: "back.out(1.3)",
          scrollTrigger: {
            trigger: quickCardsRef.current,
            start: "top bottom-=10%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) return;
    
    // Construct WhatsApp message and redirect
    const text = `Hello MustardOne team!
My Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone || "Not provided"}
Service: ${formData.service}
Message: ${formData.message}`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/919499922744?text=${encodedText}`;
    
    setSent(true);
    window.open(whatsappUrl, "_blank");
  };

  // Select service and scroll down
  const handleSelectService = (service: typeof dropdownOptions[number]) => {
    setFormData(prev => ({ ...prev, service }));
    
    // Find form input container and scroll smoothly
    const element = document.getElementById("contact-form-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <PageShell>
      {/* Main Container with generous vertical padding */}
      <div 
        ref={pageRef} 
        className="bg-background text-foreground min-h-screen relative -mt-24 pt-28 pb-24 font-sans select-none overflow-hidden"
      >
        {/* Blob Cursor Background Tracking Layer (Larger & Spring-Smoother) */}
        {isHoveringPage && (
          <motion.div
            className="pointer-events-none fixed w-[600px] h-[600px] rounded-full blur-[150px] bg-primary/20 z-0 hidden md:block"
            animate={{
              x: mousePos.x - 300,
              y: mousePos.y - 300,
            }}
            transition={{ type: "spring", damping: 45, stiffness: 50, mass: 1 }}
          />
        )}

        {/* Ambient static blobs (vibrant layout backdrops) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-40 right-[15%] h-[700px] w-[700px] rounded-full blur-[170px] opacity-30"
            style={{ background: "radial-gradient(circle, rgba(226,213,188,0.55), transparent 75%)" }}
          />
          <div
            className="absolute bottom-[20%] left-[5%] h-[650px] w-[650px] rounded-full blur-[180px] opacity-25"
            style={{ background: "radial-gradient(circle, rgba(241,232,215,0.45), transparent 75%)" }}
          />
        </div>

        {/* HERO SECTION with larger bottom padding */}
        <section className="relative z-10 mx-auto max-w-6xl px-6 pt-16 pb-24 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] text-[#1C1917]/70 font-semibold mb-5"
          >
            Connect With Us
          </motion.p>
          
          <BlurTextReveal 
            className="text-6xl sm:text-8xl font-bold tracking-tight text-[#1C1917] leading-[1.15] font-display max-w-5xl mx-auto"
          >
            Let's build something extraordinary together
          </BlurTextReveal>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mx-auto mt-8 max-w-3xl text-lg sm:text-xl text-muted-foreground leading-relaxed"
          >
            Whether you are looking to start a new hardware engineering project, design custom branding, upgrade systems, or host technical workshops — we are ready to assist you.
          </motion.p>
        </section>

        {/* CONTACT DETAILS & BUSINESS HOURS (Generous grid gap) */}
        <section className="relative z-10 mx-auto max-w-6xl px-6 pb-28 grid gap-14 lg:gap-20 md:grid-cols-12">
          {/* Left Column: Contact info with float effect */}
          <div className="md:col-span-7 space-y-8">
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#1C1917]/50 pb-3 border-b border-border/45 mb-4">
              CONTACT INFORMATION
            </h2>

            {/* Phone Card (Glow Border Hover + Float Transition) */}
            <motion.a
              href="tel:+919499922744"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              animate={{ y: [0, -6, 0] }}
              transition={{
                default: { duration: 0.5 },
                y: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="group block relative rounded-2xl border border-border bg-card p-7 shadow-sm overflow-hidden transition-all duration-300 hover:border-primary/80 hover:shadow-[0_0_25px_rgba(226,213,188,0.4)]"
            >
              <div className="flex gap-6 items-start">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-background border border-border/80 text-primary group-hover:scale-110 transition-transform shadow-inner">
                  <Phone className="h-6 w-6" />
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Phone</p>
                  <p className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">+91 94999 22744</p>
                  <p className="text-sm sm:text-base text-muted-foreground pt-1 leading-relaxed">
                    Reach us directly for project discussions, consultations, and support.
                  </p>
                </div>
              </div>
            </motion.a>

            {/* Email Card (Glass Glow Hover + Delayed Float) */}
            <motion.a
              href="mailto:mustardworks25@gmail.com"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              animate={{ y: [0, -6, 0] }}
              transition={{
                default: { duration: 0.5, delay: 0.1 },
                y: {
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.35
                }
              }}
              className="group block relative rounded-2xl border border-border bg-card p-7 shadow-sm overflow-hidden transition-all duration-300 hover:bg-card/90 hover:border-primary/70 hover:shadow-[0_10px_30px_rgba(226,213,188,0.15)]"
            >
              {/* Glass shine hover element */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <div className="flex gap-6 items-start">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-background border border-border/80 text-primary group-hover:rotate-12 transition-transform shadow-inner">
                  <Mail className="h-6 w-6" />
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Email</p>
                  <p className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">mustardworks25@gmail.com</p>
                  <p className="text-sm sm:text-base text-muted-foreground pt-1 leading-relaxed">
                    Send us your inquiries and project requirements.
                  </p>
                </div>
              </div>
            </motion.a>

            {/* Address Card (Location Highlight Animation Hover + Delayed Float) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              animate={{ y: [0, -6, 0] }}
              transition={{
                default: { duration: 0.5, delay: 0.2 },
                y: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.7
                }
              }}
              className="group relative rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:border-primary/85 hover:shadow-[0_10px_30px_rgba(28,25,23,0.05)]"
            >
              <div className="flex gap-6 items-start">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-background border border-border/80 text-primary overflow-hidden shadow-inner">
                  <MapPin className="h-6 w-6 z-10" />
                  {/* Pulse wave overlay */}
                  <span className="absolute inset-0 bg-primary/25 scale-0 rounded-full group-hover:scale-150 group-hover:opacity-0 transition-all duration-1000 ease-out" />
                </div>
                <div className="space-y-3.5">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Address</p>
                  <div className="text-base sm:text-lg font-bold text-foreground tracking-tight leading-relaxed space-y-1">
                    <p className="text-xl sm:text-2xl text-primary font-display font-bold">MustardWorks™</p>
                    <p>No. 1/1278C, 1st Floor, 3rd Street</p>
                    <p>South Bethal Nagar, Injambakkam</p>
                    <p>Chennai – 600115, Tamil Nadu, India</p>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground pt-2 leading-relaxed">
                    Visit our office to discuss projects, collaborations, and opportunities.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Business Hours Card */}
          <div ref={hoursRef} className="md:col-span-5 flex flex-col justify-start">
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#1C1917]/50 pb-3 border-b border-border/45 mb-8">
              BUSINESS HOURS
            </h2>
            
            <div className="business-schedule-card relative rounded-3xl border border-border/80 bg-gradient-to-b from-[#F1E8D7] to-[#E9DFC9]/90 p-8 sm:p-10 shadow-sm flex flex-col gap-8 overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Clock className="h-32 w-32 text-foreground" />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] bg-[#E2D5BC] px-4 py-1.5 rounded-full border border-primary/20 text-[#1C1917]/85">
                  Premium Schedule
                </span>
                <h3 className="text-3xl font-bold mt-5 tracking-tight font-display text-foreground">Hours of Operation</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">We are responsive and ready to connect within these segments.</p>
              </div>

              <div className="space-y-5 pt-3">
                {/* Mon - Fri */}
                <div className="schedule-card-item flex items-center justify-between pb-4 border-b border-border/55">
                  <div className="space-y-1">
                    <p className="text-base font-semibold">Monday – Friday</p>
                    <span className="inline-flex items-center gap-2 text-[10px] font-bold text-emerald-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" /> Active support
                    </span>
                  </div>
                  <p className="text-sm sm:text-base font-bold text-[#1C1917]/95 bg-[#F7F4EE] px-4 py-2 rounded-xl border border-border/70 shadow-sm">
                    8:00 AM – 10:00 PM
                  </p>
                </div>

                {/* Sat */}
                <div className="schedule-card-item flex items-center justify-between pb-4 border-b border-border/55">
                  <div className="space-y-1">
                    <p className="text-base font-semibold">Saturday</p>
                    <span className="text-[10px] font-semibold text-amber-600">Consultation hours</span>
                  </div>
                  <p className="text-sm sm:text-base font-bold text-[#1C1917]/95 bg-[#F7F4EE] px-4 py-2 rounded-xl border border-border/70 shadow-sm">
                    10:00 AM – 10:00 PM
                  </p>
                </div>

                {/* Sun */}
                <div className="schedule-card-item flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-base font-semibold text-muted-foreground">Sunday</p>
                    <span className="text-[10px] text-muted-foreground font-medium">Office closed</span>
                  </div>
                  <p className="text-sm sm:text-base font-bold text-muted-foreground bg-border/40 px-4 py-2 rounded-xl border border-border/20">
                    Closed
                  </p>
                </div>
              </div>
              
              <div className="pt-3 text-xs text-muted-foreground/85 italic text-center border-t border-border/40">
                *Local Time: IST (GMT+5:30)
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE MAP & CONTACT FORM GRID */}
        <section 
          id="contact-form-section" 
          ref={formSectionRef} 
          className="relative z-10 mx-auto max-w-6xl px-6 pb-28 grid gap-14 lg:gap-20 md:grid-cols-12"
        >
          {/* Left Block: Form Container */}
          <div className="md:col-span-7 relative">
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#1C1917]/50 pb-3 border-b border-border/40 mb-8">
              CONTACT FORM
            </h2>

            <div className="relative rounded-3xl border border-border bg-card shadow-sm overflow-hidden p-8 sm:p-12">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center text-center py-16 px-4 min-h-[460px] relative overflow-hidden"
                  >
                    <ConfettiEffect />
                    <SuccessCheckmark />
                    <h3 className="text-3xl sm:text-4xl font-bold mt-7 tracking-tight font-display text-foreground">Thank You!</h3>
                    <p className="text-muted-foreground mt-4 max-w-md text-base sm:text-lg leading-relaxed">
                      Our team will get back to you as soon as possible.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSent(false);
                        setFormData({
                          fullName: "",
                          email: "",
                          phone: "",
                          service: "MustardWorks",
                          message: ""
                        });
                      }}
                      className="mt-10 px-8 py-3 rounded-full border border-border bg-background hover:bg-secondary text-xs font-semibold tracking-wider transition-colors z-50 cursor-pointer shadow-sm"
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-7"
                  >
                    {/* Floating Form Inputs */}
                    <div className="grid gap-6 sm:grid-cols-2">
                      {/* Name */}
                      <div className="space-y-2.5">
                        <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Full Name</label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                          placeholder="Kaviarasu S"
                          className="w-full rounded-xl border border-border bg-background/50 px-4 py-3.5 text-sm text-foreground outline-none transition-all focus:border-primary/80 focus:bg-background focus:ring-4 focus:ring-primary/15 focus:shadow-[0_0_15px_rgba(226,213,188,0.35)]"
                        />
                      </div>
                      
                      {/* Email */}
                      <div className="space-y-2.5">
                        <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="kavi@mustardone.com"
                          className="w-full rounded-xl border border-border bg-background/50 px-4 py-3.5 text-sm text-foreground outline-none transition-all focus:border-primary/80 focus:bg-background focus:ring-4 focus:ring-primary/15 focus:shadow-[0_0_15px_rgba(226,213,188,0.35)]"
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      {/* Phone */}
                      <div className="space-y-2.5">
                        <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Phone Number</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+91 94999 22744"
                          className="w-full rounded-xl border border-border bg-background/50 px-4 py-3.5 text-sm text-foreground outline-none transition-all focus:border-primary/80 focus:bg-background focus:ring-4 focus:ring-primary/15 focus:shadow-[0_0_15px_rgba(226,213,188,0.35)]"
                        />
                      </div>

                      {/* Dropdown service selector */}
                      <div className="space-y-2.5 relative" ref={dropdownRef}>
                        <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Service Required</label>
                        <button
                          type="button"
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                          className="w-full rounded-xl border border-border bg-background/50 px-4 py-3.5 text-sm text-foreground outline-none flex items-center justify-between cursor-pointer focus:border-primary/80 focus:bg-background transition-all"
                        >
                          <span>{formData.service}</span>
                          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
                        </button>
                        
                        <AnimatePresence>
                          {dropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -10, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.98 }}
                              transition={{ duration: 0.2 }}
                              className="absolute left-0 right-0 mt-1.5 bg-card border border-border rounded-xl shadow-lg z-30 overflow-hidden"
                            >
                              {dropdownOptions.map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => {
                                    setFormData(prev => ({ ...prev, service: opt }));
                                    setDropdownOpen(false);
                                  }}
                                  className="w-full text-left px-4 py-3 text-sm hover:bg-primary/20 transition-colors cursor-pointer text-foreground font-medium"
                                >
                                  {opt}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2.5">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Message</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Tell us details about your project, timeline, or inquiries..."
                        className="w-full rounded-xl border border-border bg-background/50 px-4 py-3.5 text-sm text-foreground outline-none transition-all focus:border-primary/80 focus:bg-background focus:ring-4 focus:ring-primary/15 focus:shadow-[0_0_15px_rgba(226,213,188,0.35)] resize-none"
                      />
                    </div>

                    {/* Submit Magnet Button */}
                    <div className="pt-3 flex justify-start">
                      <Magnet padding={12} magnetStrength={3}>
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 rounded-full bg-[#1C1917] px-9 py-4.5 text-sm font-semibold text-background transition-all duration-300 hover:bg-[#1C1917]/85 hover:scale-105 shadow-md active:scale-95 cursor-pointer"
                        >
                          Send Message
                          <Send className="h-4 w-4" />
                        </button>
                      </Magnet>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Block: Minimalist Theme Google Map */}
          <div className="md:col-span-5 flex flex-col justify-start">
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#1C1917]/50 pb-3 border-b border-border/40 mb-8">
              LOCATION SECTION
            </h2>

            <motion.div 
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative aspect-[4/5] rounded-3xl border border-border bg-card overflow-hidden shadow-sm flex flex-col"
            >
              {/* Minimal Warm Map iframe */}
              <iframe
                title="MustardWorks Office Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.3787720935515!2d80.24784267507503!3d12.923880487386867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525cf15f795db7%3A0x1efd368e59ec6ab5!2sSouth%20Bethel%20Nagar%2C%20Injambakkam%2C%20Chennai%2C%20Tamil%20Nadu%20600115!5e0!3m2!1sen!2sin!4v1717623600000!5m2!1sen!2sin"
                className="w-full h-full border-0 grayscale contrast-[1.1] sepia-[0.22] brightness-[0.96] saturate-[0.8] opacity-90 transition-all duration-700 pointer-events-auto"
                loading="lazy"
                allowFullScreen
              />

              {/* Overlay location pin pointer */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center -translate-y-8">
                <div className="relative">
                  <span className="absolute -inset-4 rounded-full bg-primary/35 animate-ping opacity-75" />
                  <span className="absolute -inset-8 rounded-full bg-primary/18 animate-ping opacity-50" />
                  <div className="relative flex items-center justify-center bg-[#1C1917] border border-primary/50 text-[#F7F4EE] rounded-full p-3.5 shadow-xl z-20">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>

              {/* Visit Our Office Floating Card Overlay */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#F7F4EE]/90 backdrop-blur-md border border-[#E9DFC9] rounded-2xl p-6 shadow-lg flex flex-col gap-4">
                <div>
                  <h4 className="text-base font-bold text-[#1C1917] font-display">Visit Our Office</h4>
                  <p className="text-xs text-muted-foreground mt-0.5 font-sans">MustardWorks™ · Chennai, Tamil Nadu</p>
                </div>

                <div className="flex gap-2.5">
                  {/* Call Now */}
                  <a
                    href="tel:+919499922744"
                    className="flex-1 text-center py-2.5 bg-[#F1E8D7] hover:bg-[#E9DFC9] border border-border/80 text-[11px] font-bold text-[#1C1917] rounded-lg transition-colors cursor-pointer"
                  >
                    Call Now
                  </a>
                  {/* Send Email */}
                  <a
                    href="mailto:mustardworks25@gmail.com"
                    className="flex-1 text-center py-2.5 bg-[#F1E8D7] hover:bg-[#E9DFC9] border border-border/80 text-[11px] font-bold text-[#1C1917] rounded-lg transition-colors cursor-pointer"
                  >
                    Send Email
                  </a>
                  {/* Get Directions */}
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=MustardWorks+No.+1/1278C+1st+Floor+3rd+Street+South+Bethal+Nagar+Injambakkam+Chennai+600115+Tamil+Nadu+India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2.5 bg-[#1C1917] hover:bg-[#1C1917]/85 text-[11px] font-bold text-background rounded-lg transition-colors cursor-pointer"
                  >
                    Directions
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* QUICK CONTACT CARDS SECTION with expanded spacing */}
        <section ref={quickCardsRef} className="relative z-10 mx-auto max-w-6xl px-6 pb-28">
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#1C1917]/50 pb-3 border-b border-border/40 mb-12 text-center">
            QUICK CONTACT CARDS
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* MustardWorks */}
            <TiltCard className="h-full">
              <div className="quick-card-item rounded-2xl border border-border bg-card p-7 shadow-sm hover:shadow-md flex flex-col justify-between min-h-[220px] hover:border-primary/60 transition-all duration-300 group h-full">
                <div className="space-y-4">
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] bg-secondary px-3.5 py-1.5 rounded-full border border-border/85 text-foreground">
                    Works
                  </span>
                  <h3 className="text-xl font-bold font-display group-hover:text-primary transition-colors text-foreground">MustardWorks</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Engineering & Innovation. IoT integration, custom VLSI RTL checks, and embedded device prototypes.
                  </p>
                </div>
                <button
                  onClick={() => handleSelectService("MustardWorks")}
                  className="mt-8 flex items-center gap-1.5 text-xs font-bold text-primary hover:text-[#1C1917] transition-colors cursor-pointer w-fit"
                >
                  Talk Engineering <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </TiltCard>

            {/* MustardStudio */}
            <TiltCard className="h-full">
              <div className="quick-card-item rounded-2xl border border-border bg-card p-7 shadow-sm hover:shadow-md flex flex-col justify-between min-h-[220px] hover:border-primary/60 transition-all duration-300 group h-full">
                <div className="space-y-4">
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] bg-secondary px-3.5 py-1.5 rounded-full border border-border/85 text-foreground">
                    Studio
                  </span>
                  <h3 className="text-xl font-bold font-display group-hover:text-primary transition-colors text-foreground">MustardStudio</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Creative Design & Media. Brand identity setups, illustration layout graphics, and engaging product showcase reels.
                  </p>
                </div>
                <button
                  onClick={() => handleSelectService("MustardStudio")}
                  className="mt-8 flex items-center gap-1.5 text-xs font-bold text-primary hover:text-[#1C1917] transition-colors cursor-pointer w-fit"
                >
                  Start Creative Project <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </TiltCard>

            {/* MustardCare */}
            <TiltCard className="h-full">
              <div className="quick-card-item rounded-2xl border border-border bg-card p-7 shadow-sm hover:shadow-md flex flex-col justify-between min-h-[220px] hover:border-primary/60 transition-all duration-300 group h-full">
                <div className="space-y-4">
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] bg-secondary px-3.5 py-1.5 rounded-full border border-border/85 text-foreground">
                    Care
                  </span>
                  <h3 className="text-xl font-bold font-display group-hover:text-primary transition-colors text-foreground">MustardCare</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Technical Support. Laptop diagnostics, quick servicing requests, SSD expansions, and computer system fixes.
                  </p>
                </div>
                <button
                  onClick={() => handleSelectService("MustardCare")}
                  className="mt-8 flex items-center gap-1.5 text-xs font-bold text-primary hover:text-[#1C1917] transition-colors cursor-pointer w-fit"
                >
                  Get Technical Help <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </TiltCard>

            {/* MustardLearn */}
            <TiltCard className="h-full">
              <div className="quick-card-item rounded-2xl border border-border bg-card p-7 shadow-sm hover:shadow-md flex flex-col justify-between min-h-[220px] hover:border-primary/60 transition-all duration-300 group h-full">
                <div className="space-y-4">
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] bg-secondary px-3.5 py-1.5 rounded-full border border-border/85 text-foreground">
                    Learn
                  </span>
                  <h3 className="text-xl font-bold font-display group-hover:text-primary transition-colors text-foreground">MustardLearn</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Workshops & Learning. Collaborative student bootcamps, hardware seminars, and skill enhancement certificates.
                  </p>
                </div>
                <button
                  onClick={() => handleSelectService("MustardLearn")}
                  className="mt-8 flex items-center gap-1.5 text-xs font-bold text-primary hover:text-[#1C1917] transition-colors cursor-pointer w-fit"
                >
                  Explore Workshops <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </TiltCard>
          </div>
        </section>

        {/* SOCIAL CONNECT SECTION (Generous padding) */}
        <section className="relative z-10 border-t border-border/60 bg-[#F1E8D7]/40 py-24 px-6">
          <div className="mx-auto max-w-4xl text-center space-y-7">
            <h3 className="text-sm font-bold uppercase tracking-[0.35em] text-muted-foreground font-display">
              Connect With MustardOne
            </h3>
            
            <p className="text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Stay updated with our latest updates, tech guides, designs, and workspace milestones.
            </p>

            <div className="pt-6 flex flex-wrap justify-center gap-5">
              {/* LinkedIn */}
              <Magnet padding={12} magnetStrength={3}>
                <a
                  href="https://www.linkedin.com/company/mustardworks/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card text-[#1C1917] hover:bg-[#1C1917] hover:text-[#F7F4EE] hover:shadow-[0_0_20px_rgba(28,25,23,0.2)] transition-all duration-300 hover:scale-110 cursor-pointer"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              </Magnet>

              {/* Instagram */}
              <Magnet padding={12} magnetStrength={3}>
                <a
                  href="https://www.instagram.com/onemustard?igsh=b3VlajJnczAyZmps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card text-[#1C1917] hover:bg-[#1C1917] hover:text-[#F7F4EE] hover:shadow-[0_0_20px_rgba(28,25,23,0.2)] transition-all duration-300 hover:scale-110 cursor-pointer"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              </Magnet>

              {/* YouTube */}
              <Magnet padding={12} magnetStrength={3}>
                <a
                  href="https://youtube.com/@onemustard?si=3S078QQWazvqKl3y"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card text-[#1C1917] hover:bg-[#1C1917] hover:text-[#F7F4EE] hover:shadow-[0_0_20px_rgba(28,25,23,0.2)] transition-all duration-300 hover:scale-110 cursor-pointer"
                >
                  <Youtube className="h-6 w-6" />
                </a>
              </Magnet>

              {/* Facebook */}
              <Magnet padding={12} magnetStrength={3}>
                <a
                  href="https://www.facebook.com/share/1HidNozubs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card text-[#1C1917] hover:bg-[#1C1917] hover:text-[#F7F4EE] hover:shadow-[0_0_20px_rgba(28,25,23,0.2)] transition-all duration-300 hover:scale-110 cursor-pointer"
                >
                  <Facebook className="h-6 w-6" />
                </a>
              </Magnet>
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION (Premium Mustard Gradient, Parallax Background) */}
        <section className="relative z-10 py-32 md:py-44 px-6 overflow-hidden bg-gradient-to-br from-[#E2D5BC] via-[#F1E8D7] to-[#E9DFC9] border-t border-border/40">
          {/* Floating shape elements (Parallax simulated) */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-12 left-[12%] w-14 h-14 rounded-xl bg-primary/25 border border-primary/35"
              animate={{
                y: [0, -35, 0],
                rotate: [0, 45, 0]
              }}
              transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-16 right-[18%] w-20 h-20 rounded-full bg-secondary/40 border border-primary/25"
              animate={{
                y: [0, 40, 0],
                x: [0, 20, 0]
              }}
              transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-1/4 right-[12%] w-9 h-9 rounded-lg bg-primary/15 border border-primary/30"
              animate={{
                y: [0, -20, 0],
                rotate: [0, -60, 0]
              }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl text-center space-y-9">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-[#1C1917] leading-[1.15] font-display"
            >
              One Way for Many Solutions
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-xl md:text-2xl text-[#1C1917]/80 max-w-3xl mx-auto font-sans leading-relaxed"
            >
              Let's create, innovate, learn, and grow together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pt-6 flex flex-wrap justify-center gap-5"
            >
              {/* Start a Project Magnet Button */}
              <Magnet padding={12} magnetStrength={3}>
                <a
                  href="/services"
                  className="inline-flex items-center justify-center px-9 py-4.5 bg-[#1C1917] hover:bg-[#1C1917]/85 text-background font-semibold rounded-full shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer text-base"
                >
                  Start a Project
                </a>
              </Magnet>

              {/* Contact Our Team Magnet Button */}
              <Magnet padding={12} magnetStrength={3}>
                <button
                  onClick={() => {
                    const el = document.getElementById("contact-form-section");
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  className="inline-flex items-center justify-center px-9 py-4.5 bg-[#F7F4EE] border border-[#E9DFC9] hover:bg-[#F1E8D7] text-[#1C1917] font-semibold rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer text-base"
                >
                  Contact Our Team
                </button>
              </Magnet>
            </motion.div>
          </div>
        </section>

      </div>
    </PageShell>
  );
}
