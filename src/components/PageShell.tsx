import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { BlobCursor } from "./BlobCursor";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BlobCursor />
      <Navbar />
      <main className="relative z-10 pt-24">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
}) {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-12 pb-20 text-center">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60" style={{ background: "var(--gradient-hero)" }} />
      {eyebrow && (
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary animate-reveal-up">{eyebrow}</p>
      )}
      <h1 className="text-5xl sm:text-7xl font-bold tracking-tight animate-reveal-up">{title}</h1>
      {subtitle && (
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground animate-reveal-up">{subtitle}</p>
      )}
    </section>
  );
}
