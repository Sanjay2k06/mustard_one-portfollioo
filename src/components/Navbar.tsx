import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, Cpu, Palette, Wrench, GraduationCap, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  { to: "/services/mustardworks", label: "MustardWork", desc: "Engineering & Innovation", icon: Cpu, logo: "/video_images/mustard_work.png" },
  { to: "/services/mustardstudio", label: "MustardStudio", desc: "Creative & Media", icon: Palette, logo: "/video_images/mustardstudio.png" },
  { to: "/services/mustardcare", label: "MustardCare", desc: "Technical Support", icon: Wrench, logo: "/video_images/mustard_care.png" },
  { to: "/services/mustardlearn", label: "MustardLearn", desc: "Education & Skills", icon: GraduationCap, logo: "/video_images/mustard_learn.png" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Hide navbar when the showcase section is active in the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHidden(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.05, // triggers when 5% of the section is visible
        rootMargin: "-80px 0px 0px 0px" // account for header size
      }
    );

    const section = document.getElementById("beauty-done-by-us");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: hidden ? -145 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500 px-4 pt-4 sm:px-6 md:px-8"
    >
      <div className="mx-auto max-w-5xl w-full relative">
        <motion.nav
          animate={{
            y: scrolled ? 0 : 2,
            paddingTop: scrolled ? "10px" : "14px",
            paddingBottom: scrolled ? "10px" : "14px",
            backgroundColor: scrolled ? "var(--glass-bg)" : "rgba(247, 244, 238, 0.15)",
            boxShadow: scrolled
              ? "0 20px 40px -15px rgba(28, 25, 23, 0.15), 0 0 0 1px var(--glass-border)"
              : "0 4px 20px -10px rgba(28, 25, 23, 0.05), 0 0 0 1px var(--glass-border)",
          }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          className="flex items-center justify-between rounded-full px-6 backdrop-blur-xl transition-all duration-500 border border-transparent"
        >
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2.5">
            <motion.div 
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="relative flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden bg-card border border-border shadow-md"
            >
              <img 
                src="/video_images/msutard_one.png" 
                alt="MustardOne Logo" 
                className="h-full w-full object-cover select-none" 
              />
              <span className="absolute -inset-0.5 -z-10 rounded-xl bg-primary/40 blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
            <span className="font-display text-lg font-bold tracking-tight text-foreground">
              MUSTARD<span className="text-primary font-extrabold">ONE</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <ul 
            onMouseLeave={() => setHoveredPath(null)}
            className="hidden md:flex items-center gap-1 text-sm relative"
          >
            {/* Home */}
            <NavItem 
              to="/" 
              hoveredPath={hoveredPath} 
              onHover={setHoveredPath}
            >
              Home
            </NavItem>

            {/* About */}
            <NavItem 
              to="/about" 
              hoveredPath={hoveredPath} 
              onHover={setHoveredPath}
            >
              About
            </NavItem>

            {/* Services Dropdown Item */}
            <li
              className="relative"
              onMouseEnter={() => {
                setServicesOpen(true);
                setHoveredPath("/services");
              }}
              onMouseLeave={() => {
                setServicesOpen(false);
              }}
            >
              <button 
                className={`flex items-center gap-1 rounded-full px-4 py-2 transition-colors duration-200 cursor-pointer relative z-10 font-medium ${
                  servicesOpen ? "text-foreground bg-[#E9DFC9]/40" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Services <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${servicesOpen ? "rotate-180 text-primary" : ""}`} />
              </button>
              
              {/* Dropdown Hover Underline Background */}
              {hoveredPath === "/services" && (
                <motion.div
                  layoutId="nav-hover-bg"
                  className="absolute inset-0 bg-[#E9DFC9]/50 rounded-full z-0 pointer-events-none"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Services Dropdown */}
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.96 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-1/2 top-full mt-3 w-[340px] -translate-x-1/2 rounded-2xl p-3 shadow-elevated z-50 border border-primary/20 backdrop-blur-xl"
                    style={{ backgroundColor: "var(--card)" }}
                  >
                    <div className="grid gap-1">
                      {services.map((s) => {
                        return (
                          <Link
                            key={s.to}
                            to={s.to}
                            className="group/item flex items-start gap-3.5 rounded-xl p-3 transition-colors hover:bg-secondary/60 text-left cursor-pointer"
                          >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-card border border-border/80 transition-colors overflow-hidden group-hover/item:border-primary/40">
                              <img src={s.logo} alt={s.label} className="h-7 w-7 object-contain transition-transform duration-300 group-hover/item:scale-110 select-none" />
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span className="font-semibold text-foreground text-sm flex items-center gap-1 group-hover/item:text-primary transition-colors">
                                {s.label}
                                <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                              </span>
                              <span className="text-xs text-muted-foreground leading-normal">{s.desc}</span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Projects */}
            <NavItem 
              to="/projects" 
              hoveredPath={hoveredPath} 
              onHover={setHoveredPath}
            >
              Projects
            </NavItem>

            {/* Contact */}
            <NavItem 
              to="/contact" 
              hoveredPath={hoveredPath} 
              onHover={setHoveredPath}
            >
              Contact
            </NavItem>
          </ul>

          {/* Let's Talk CTA */}
          <Link
            to="/contact"
            className="group relative hidden md:inline-flex items-center justify-center overflow-hidden rounded-full bg-[#1C1917] px-6 py-2.5 text-sm font-semibold text-[#F7F4EE] transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              Let's Talk
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
            <motion.div
              initial={{ left: "-100%" }}
              whileHover={{ left: "100%" }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              className="absolute top-0 h-full w-[50%] bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[25deg]"
            />
            <span className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            className="md:hidden rounded-full p-2 text-foreground cursor-pointer hover:bg-secondary/40 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </motion.nav>

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute left-4 right-4 top-full mt-3 rounded-2xl p-4 overflow-hidden border border-primary/20 flex flex-col gap-2.5 shadow-elevated z-40 md:hidden backdrop-blur-xl"
              style={{ backgroundColor: "var(--card)" }}
            >
              <div className="flex flex-col gap-1">
                <MobileLink to="/" onClick={() => setMobileOpen(false)}>Home</MobileLink>
                <MobileLink to="/about" onClick={() => setMobileOpen(false)}>About</MobileLink>
              </div>
              
              <div className="px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary border-b border-primary/15 pb-1">
                Services
              </div>
              
              <div className="grid gap-1 pl-1">
                {services.map((s) => {
                  return (
                    <Link
                      key={s.to}
                      to={s.to}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors hover:bg-[#E9DFC9]/40"
                      activeProps={{ className: "bg-[#E9DFC9]/60 text-foreground font-semibold" }}
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-card border border-border/80 overflow-hidden">
                        <img src={s.logo} alt={s.label} className="h-5.5 w-5.5 object-contain select-none" />
                      </div>
                      <span>{s.label}</span>
                    </Link>
                  );
                })}
              </div>
              
              <div className="border-t border-primary/15 my-1" />
              
              <div className="flex flex-col gap-1">
                <MobileLink to="/projects" onClick={() => setMobileOpen(false)}>Projects</MobileLink>
                <MobileLink to="/contact" onClick={() => setMobileOpen(false)}>Contact</MobileLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

function NavItem({ 
  to, 
  hoveredPath, 
  onHover, 
  children 
}: { 
  to: string; 
  hoveredPath: string | null; 
  onHover: (path: string | null) => void;
  children: React.ReactNode 
}) {
  const location = useLocation();
  const isActive = to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <li className="relative">
      <Link
        to={to}
        onMouseEnter={() => onHover(to)}
        className={`relative z-10 block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer ${
          isActive ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <span className="relative">
          {children}
          {isActive && (
            <motion.span
              layoutId="active-dot"
              className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_8px_rgba(209,191,157,0.8)]"
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          )}
        </span>
      </Link>
      
      {/* Sliding Underline Background */}
      {hoveredPath === to && (
        <motion.div
          layoutId="nav-hover-bg"
          className="absolute inset-0 bg-[#E9DFC9]/50 rounded-full z-0 pointer-events-none"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </li>
  );
}

function MobileLink({ to, onClick, children }: { to: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground font-medium transition-colors hover:bg-[#E9DFC9]/40"
      activeProps={{ className: "bg-[#E9DFC9]/60 text-foreground font-semibold" }}
    >
      {children}
    </Link>
  );
}
