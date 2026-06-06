import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import SplashCursor from "./SplashCursor";

import { motion } from "framer-motion";

export function PageShell({ children, themeStyles }: { children: ReactNode; themeStyles?: React.CSSProperties }) {
  return (
    <div style={themeStyles} className="relative min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)] transition-colors duration-500">
      <SplashCursor />
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
  logo,
  noEyebrowBox = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  logo?: string;
  noEyebrowBox?: boolean;
}) {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-12 pb-20 text-center overflow-hidden">
      {/* Premium floating blobs in background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none">
        <div
          className="absolute -top-10 left-1/3 h-[380px] w-[380px] rounded-full blur-[100px] opacity-45 animate-float-blob"
          style={{ background: "radial-gradient(circle, rgba(226,213,188,0.45), transparent 70%)" }}
        />
        <div
          className="absolute top-20 right-1/4 h-[300px] w-[300px] rounded-full blur-[80px] opacity-35 animate-float-blob"
          style={{ 
            background: "radial-gradient(circle, rgba(233,223,201,0.35), transparent 70%)",
            animationDelay: "-4s"
          }}
        />
      </div>

      {logo && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex justify-center"
        >
          <img
            src={logo}
            alt={`${eyebrow || 'Division'} Logo`}
            className="h-28 sm:h-36 md:h-40 max-w-[85vw] w-auto object-contain select-none"
          />
        </motion.div>
      )}

      {eyebrow && (
        <div className="mb-6 flex justify-center">
          {noEyebrowBox ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs uppercase tracking-[0.3em] font-bold text-primary"
            >
              {eyebrow}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-card/45 backdrop-blur-md px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary shadow-[0_4px_20px_-10px_rgba(209,191,157,0.25)] hover:border-primary/80 transition-all duration-300 group cursor-pointer"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[#1C1917]/85 group-hover:text-primary transition-colors duration-300">
                {eyebrow}
              </span>
            </motion.div>
          )}
        </div>
      )}

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-5xl sm:text-7xl font-bold tracking-tight font-display text-foreground leading-[1.15]"
      >
        {title}
      </motion.h1>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </section>
  );
}
