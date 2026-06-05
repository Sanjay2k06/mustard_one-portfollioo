import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const services = [
  { to: "/services/mustardworks", label: "MustardWorks", desc: "Engineering & Innovation" },
  { to: "/services/mustardstudio", label: "MustardStudio", desc: "Creative & Media" },
  { to: "/services/mustardcare", label: "MustardCare", desc: "Technical Support" },
  { to: "/services/mustardlearn", label: "MustardLearn", desc: "Education & Skills" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all duration-500 ${
            scrolled ? "glass shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)]" : ""
          }`}
        >
          <Link to="/" className="group flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-gradient-to-br from-primary to-accent transition-transform group-hover:rotate-12" />
            <span className="font-display text-lg font-bold tracking-tight">
              MUSTARD<span className="text-gradient-mustard">ONE</span>
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-1 text-sm">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/about">About</NavItem>
            <li
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-1 rounded-full px-4 py-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                Services <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {servicesOpen && (
                <div className="absolute left-1/2 top-full mt-2 w-80 -translate-x-1/2 animate-reveal-up rounded-2xl glass p-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
                  {services.map((s) => (
                    <Link
                      key={s.to}
                      to={s.to}
                      className="flex flex-col gap-0.5 rounded-xl p-3 transition-colors hover:bg-secondary"
                    >
                      <span className="font-medium">{s.label}</span>
                      <span className="text-xs text-muted-foreground">{s.desc}</span>
                    </Link>
                  ))}
                </div>
              )}
            </li>
            <NavItem to="/projects">Projects</NavItem>
            <NavItem to="/contact">Contact</NavItem>
          </ul>

          <Link
            to="/contact"
            className="hidden md:inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            Let's Talk
          </Link>

          <button
            className="md:hidden rounded-full p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {mobileOpen && (
          <div className="md:hidden mt-2 animate-reveal-up rounded-2xl glass p-4">
            <MobileLink to="/" onClick={() => setMobileOpen(false)}>Home</MobileLink>
            <MobileLink to="/about" onClick={() => setMobileOpen(false)}>About</MobileLink>
            <div className="px-3 py-2 text-xs uppercase tracking-wider text-muted-foreground">Services</div>
            {services.map((s) => (
              <MobileLink key={s.to} to={s.to} onClick={() => setMobileOpen(false)}>
                {s.label}
              </MobileLink>
            ))}
            <MobileLink to="/projects" onClick={() => setMobileOpen(false)}>Projects</MobileLink>
            <MobileLink to="/contact" onClick={() => setMobileOpen(false)}>Contact</MobileLink>
          </div>
        )}
      </div>
    </header>
  );
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        to={to}
        activeOptions={{ exact: to === "/" }}
        className="rounded-full px-4 py-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        activeProps={{ className: "rounded-full px-4 py-2 text-foreground bg-secondary" }}
      >
        {children}
      </Link>
    </li>
  );
}

function MobileLink({ to, onClick, children }: { to: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-secondary"
    >
      {children}
    </Link>
  );
}
