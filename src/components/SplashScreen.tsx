import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function SplashScreen({ onEnter }: { onEnter: () => void }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Automatically trigger exit transition after the reveal animation finishes
    const timer = setTimeout(() => {
      setIsExiting(true);
      const exitTimer = setTimeout(() => {
        onEnter();
      }, 900); // Allow exit transition to complete

      return () => clearTimeout(exitTimer);
    }, 2800); // 2.8s total duration for the text reveal

    return () => clearTimeout(timer);
  }, [onEnter]);

  // Framer Motion variants for letter-by-letter reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const lineVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: "120px",
      opacity: 1,
      transition: { duration: 1.2, delay: 1.0, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const text = "MustardOne";

  return (
    <motion.div
      animate={{
        opacity: isExiting ? 0 : 1,
        filter: isExiting ? "blur(10px)" : "blur(0px)"
      }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden w-screen h-screen select-none"
    >
      {/* Background radial glow */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, #F5B400 0%, transparent 70%)"
        }}
      />

      <div className="relative flex flex-col items-center">
        {/* Animated word container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center overflow-hidden font-display text-5xl md:text-7xl font-extrabold tracking-tight"
        >
          {text.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className={
                // Style "Mustard" in Light Gray/White, and "One" in warm yellow/orange gradient text
                index >= 7 
                  ? "bg-gradient-to-r from-[#F5B400] to-[#FF8A00] bg-clip-text text-transparent"
                  : "text-[#F5F7FA]"
              }
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* Dynamic expanding gradient line underneath */}
        <motion.div
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          className="h-[3px] rounded-full bg-gradient-to-r from-[#F5B400] to-[#FF8A00] mt-4 shadow-lg shadow-[#F5B400]/20"
        />
      </div>
    </motion.div>
  );
}
