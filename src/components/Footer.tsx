import { Link } from "@tanstack/react-router";
import { Youtube, Linkedin, Facebook, Instagram, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border/60 bg-background relative overflow-hidden select-none">
      {/* Subtle radial lights behind the footer */}
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-primary/10 blur-[80px] select-none" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-accent/10 blur-[80px] select-none" />

      <div className="mx-auto max-w-7xl px-6 py-16 relative z-10">
        <div className="grid gap-12 md:grid-cols-4">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-6">
            <Link to="/" className="group inline-flex items-center gap-2.5">
              <motion.div 
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="relative flex h-8 w-8 items-center justify-center rounded-xl overflow-hidden bg-card border border-border shadow-md"
              >
                <img 
                  src="/video_images/msutard_one.png" 
                  alt="MustardOne Logo" 
                  className="h-full w-full object-cover select-none" 
                />
                <span className="absolute -inset-0.5 -z-10 rounded-xl bg-primary/40 blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
              <span className="font-display text-lg font-bold tracking-tight">
                MUSTARD<span className="text-primary font-extrabold">ONE</span>
              </span>
            </Link>
            
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              One Way for Many Solutions. Connecting engineering, creative design, technical support, and education under one cohesive identity.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <SocialIcon href="https://youtube.com/@onemustard?si=3S078QQWazvqKl3y" icon={Youtube} />
              <SocialIcon href="https://www.linkedin.com/company/mustardworks/" icon={Linkedin} />
              <SocialIcon href="https://www.facebook.com/share/1HidNozubs/" icon={Facebook} />
              <SocialIcon href="https://www.instagram.com/onemustard?igsh=b3VlajJnczAyZmps" icon={Instagram} />
            </div>
          </div>

          {/* Divisions Column */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-foreground/80 mb-5">
              Divisions
            </h4>
            <ul className="space-y-3 text-sm">
              <FooterLink to="/services/mustardworks">MustardWork</FooterLink>
              <FooterLink to="/services/mustardstudio">MustardStudio</FooterLink>
              <FooterLink to="/services/mustardcare">MustardCare</FooterLink>
              <FooterLink to="/services/mustardlearn">MustardLearn</FooterLink>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-5">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-foreground/80">
              Get in Touch
            </h4>
            <div className="rounded-2xl border border-border/80 bg-card/30 p-4 space-y-3.5 shadow-inner">
              <a 
                href="mailto:mustardworks25@gmail.com" 
                className="flex items-center gap-2.5 text-xs text-muted-foreground hover:text-primary transition-colors group/mail"
              >
                <Mail className="h-4 w-4 text-primary group-hover/mail:scale-110 transition-transform" />
                <span>mustardworks25@gmail.com</span>
              </a>
              <div className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>No. 1/1278C, 1st Floor, 3rd Street, South Bethal Nagar, Injambakkam, Chennai – 600115, Tamil Nadu, India.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright and tagline */}
        <div className="mt-16 pt-8 border-t border-border/60 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground">
          <p>
            © 2025 MustardOne. All rights reserved.{" "}
            <span className="inline-block ml-1">
              Made by{" "}
              <a 
                href="https://taekni.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-primary transition-colors font-medium underline decoration-primary/30 decoration-1 underline-offset-2"
              >
                TÆKNI
              </a>
            </span>
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary select-none">
              As Your Expectations
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, icon: Icon }: { href: string; icon: any }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-xl bg-card border border-border/80 text-muted-foreground hover:text-primary hover:border-primary/45 hover:shadow-md transition-all duration-300"
    >
      <Icon className="h-4.5 w-4.5" />
    </a>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link 
        to={to} 
        className="group inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors py-0.5 duration-200"
      >
        <span className="h-1 w-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="group-hover:translate-x-0.5 transition-transform duration-300">{children}</span>
      </Link>
    </li>
  );
}
