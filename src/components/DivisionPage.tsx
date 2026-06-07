import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell, PageHero } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { CreativeShowcase } from "@/components/CreativeShowcase";

export interface DivisionPageProps {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  services: { title: string; desc: string }[];
  process?: { step: string; title: string; desc: string }[];
  benefits?: string[];
  galleryAccent?: string;
  faqs?: { q: string; a: string }[];
  logo?: string;
  hideGallery?: boolean;
  theme?: "studio" | "care" | "learn" | "work";
}

export function DivisionPage({
  eyebrow, title, subtitle, services, process, benefits, galleryAccent = "from-amber-500/20", faqs, logo, hideGallery = false, theme,
}: DivisionPageProps) {
  const [activeShowcaseId, setActiveShowcaseId] = useState("pencil");

  const mapServiceTitleToId = (title: string): string => {
    switch (title.toLowerCase()) {
      case "pencil sketch": return "pencil";
      case "water painting": return "water";
      case "thread portrait": return "thread";
      case "brand design suite": return "brand";
      case "short film production": return "film";
      case "video editing": return "edit";
      default: return "pencil";
    }
  };

  const handleGoToPortfolio = (title: string) => {
    const id = mapServiceTitleToId(title);
    setActiveShowcaseId(id);
    const el = document.getElementById("beauty-done-by-us");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getThemeStyles = () => {
    switch (theme) {
      case "studio":
        return {
          "--background": "#0F0F1A",
          "--foreground": "#FFFFFF",
          "--card": "#151526",
          "--card-foreground": "#FFFFFF",
          "--primary": "#6D3DF5",
          "--primary-foreground": "#FFFFFF",
          "--secondary": "#A78BFA",
          "--secondary-foreground": "#FFFFFF",
          "--muted": "#1E1E38",
          "--muted-foreground": "#F472B6",
          "--border": "#4A1FD1",
          "--ring": "#A78BFA",
          "--gradient-mustard": "linear-gradient(135deg, #6D3DF5, #F472B6)",
          "--gradient-card": "linear-gradient(180deg, #151526, #0F0F1A)",
          "--glass-bg": "rgba(21, 21, 38, 0.85)",
          "--glass-border": "rgba(167, 139, 250, 0.25)",
          color: "#FFFFFF",
          backgroundColor: "#0F0F1A",
        } as React.CSSProperties;
      case "care":
        return {
          "--background": "#1A1A1A",
          "--foreground": "#F5F7FA",
          "--card": "#242424",
          "--card-foreground": "#F5F7FA",
          "--primary": "#2563EB",
          "--primary-foreground": "#FFFFFF",
          "--secondary": "#F5B400",
          "--secondary-foreground": "#1A1A1A",
          "--muted": "#2A2A2A",
          "--muted-foreground": "#9CA3AF",
          "--border": "#2E2E2E",
          "--ring": "#2563EB",
          "--gradient-mustard": "linear-gradient(135deg, #2563EB, #FF8A00)",
          "--gradient-card": "linear-gradient(180deg, #242424, #1A1A1A)",
          "--glass-bg": "rgba(36, 36, 36, 0.85)",
          "--glass-border": "rgba(37, 99, 235, 0.25)",
          color: "#F5F7FA",
          backgroundColor: "#1A1A1A",
        } as React.CSSProperties;
      case "learn":
        return {
          "--background": "#FFFFFF",
          "--foreground": "#1B5E20",
          "--card": "#F1F8F1",
          "--card-foreground": "#1B5E20",
          "--primary": "#4A9C3A",
          "--primary-foreground": "#FFFFFF",
          "--secondary": "#5BAE48",
          "--secondary-foreground": "#FFFFFF",
          "--muted": "#E2EFE2",
          "--muted-foreground": "#2E7D32",
          "--border": "#C8E6C9",
          "--ring": "#4A9C3A",
          "--gradient-mustard": "linear-gradient(135deg, #4A9C3A, #2E7D32)",
          "--gradient-card": "linear-gradient(180deg, #F1F8F1, #E8F5E9)",
          "--glass-bg": "rgba(241, 248, 241, 0.8)",
          "--glass-border": "rgba(74, 156, 58, 0.35)",
          color: "#1B5E20",
          backgroundColor: "#FFFFFF",
        } as React.CSSProperties;
      case "work":
        return {
          "--background": "#FFFFFF",
          "--foreground": "#1C1917",
          "--card": "#F9F6F0",
          "--card-foreground": "#1C1917",
          "--primary": "#D4AF37",
          "--primary-foreground": "#1C1917",
          "--secondary": "#C4A12D",
          "--secondary-foreground": "#FFFFFF",
          "--muted": "#F0EAD6",
          "--muted-foreground": "#8A6B08",
          "--border": "#E5DCC6",
          "--ring": "#D4AF37",
          "--gradient-mustard": "linear-gradient(135deg, #D4AF37, #B8860B)",
          "--gradient-card": "linear-gradient(180deg, #F9F6F0, #F3ECE0)",
          "--glass-bg": "rgba(249, 246, 240, 0.8)",
          "--glass-border": "rgba(212, 175, 55, 0.35)",
          color: "#1C1917",
          backgroundColor: "#FFFFFF",
        } as React.CSSProperties;
      default:
        return {} as React.CSSProperties;
    }
  };

  const themeStyles = getThemeStyles();

  return (
    <PageShell themeStyles={themeStyles}>
      <div className="font-sans select-none">
        <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} logo={logo} noEyebrowBox={true} />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-bold">What we offer</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.04}>
              <div
                className="h-full rounded-2xl border border-border/60 p-6 flex flex-col justify-between transition-all hover:-translate-y-1 hover:border-primary/40"
                style={{ background: "var(--gradient-card)" }}
              >
                <div>
                  <h3 className="text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
                {theme === "studio" && (
                  <Link
                    to="/contact"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-secondary transition-all cursor-pointer w-fit"
                  >
                    Book Now <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {process && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold">Our process</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.06}>
                <div className="rounded-2xl glass p-6">
                  <div className="font-display text-3xl font-bold text-gradient-mustard">{p.step}</div>
                  <h3 className="mt-3 text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {benefits && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold">Why choose us</h2>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <Reveal key={b} delay={i * 0.04}>
                <div className="flex items-start gap-3 rounded-xl border border-border/60 p-4">
                  <div className="mt-1 h-2 w-2 flex-none rounded-full bg-primary" />
                  <p className="text-sm">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {theme === "studio" ? (
        <CreativeShowcase
          activeProjectId={activeShowcaseId}
          onChangeActiveProject={setActiveShowcaseId}
        />
      ) : (
        !hideGallery && (
          <section className="mx-auto max-w-7xl px-6 py-16">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl font-bold">Gallery</h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Reveal key={i} delay={i * 0.03}>
                  <div
                    className={`aspect-square overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br ${galleryAccent} via-card to-background transition-transform hover:scale-[1.02]`}
                  />
                </Reveal>
              ))}
            </div>
          </section>
        )
      )}

      {faqs && (
        <section className="mx-auto max-w-4xl px-6 py-16">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold">FAQs</h2>
          </Reveal>
          <div className="mt-8 space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.04}>
                <details className="group rounded-2xl border border-border/60 p-5 transition-colors open:border-primary/40">
                  <summary className="flex cursor-pointer items-center justify-between text-base font-semibold">
                    {f.q}
                    <span className="text-primary transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl border border-primary/30 p-12 text-center"
            style={{ background: "linear-gradient(135deg, oklch(0.18 0.02 95), oklch(0.13 0.005 95))" }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold">Ready to start?</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Tell us what you're working on. We'll respond within 24 hours.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 glow-mustard"
            >
              Get in touch <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
      </div>
    </PageShell>
  );
}
