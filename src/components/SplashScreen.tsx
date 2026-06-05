import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const words = ["Learn.", "Create.", "Innovate.", "Grow."];

export function SplashScreen({ onEnter }: { onEnter: () => void }) {
  const [step, setStep] = useState(0);
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    if (step < words.length) {
      const t = setTimeout(() => setStep(step + 1), 650);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShowFinal(true), 400);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
      transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background"
    >
      {/* particle field */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => {
          const tx = (Math.random() - 0.5) * 1200;
          const ty = (Math.random() - 0.5) * 800;
          return (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-primary"
              style={{
                ["--tx" as string]: `${tx}px`,
                ["--ty" as string]: `${ty}px`,
                animation: `splash-particles 1.6s ${i * 0.03}s cubic-bezier(0.2,0.8,0.2,1) both`,
                boxShadow: "0 0 12px oklch(0.82 0.17 88 / 0.8)",
              }}
            />
          );
        })}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="relative h-28 sm:h-32">
          <AnimatePresence mode="wait">
            {!showFinal && step < words.length && (
              <motion.h2
                key={step}
                initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, filter: "blur(12px)" }}
                transition={{ duration: 0.5 }}
                className="text-5xl sm:text-7xl font-bold text-gradient-mustard"
              >
                {words[step]}
              </motion.h2>
            )}
            {showFinal && (
              <motion.div
                key="final"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center gap-4"
              >
                <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
                  MUSTARD<span className="text-gradient-mustard">ONE</span>
                </h1>
                <p className="text-sm sm:text-base uppercase tracking-[0.3em] text-muted-foreground">
                  One Way for Many Solutions
                </p>
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  onClick={onEnter}
                  className="mt-6 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 glow-mustard"
                >
                  Enter Website →
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
