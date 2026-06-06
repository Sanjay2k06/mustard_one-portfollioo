import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function SplashScreen({ onEnter }: { onEnter: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [playFailed, setPlayFailed] = useState(false);

  // Dynamic video preloading
  useEffect(() => {
    const preload = document.createElement("link");
    preload.rel = "preload";
    preload.as = "video";
    preload.href = "/video_images/splash.mp4";
    preload.type = "video/mp4";
    document.head.appendChild(preload);

    return () => {
      document.head.removeChild(preload);
    };
  }, []);

  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 900);
  };

  const handleExitRef = useRef(handleExit);
  handleExitRef.current = handleExit;

  // Handle autoplay policies or failures with a strict safety fallback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Explicitly set muted property on the element for iOS Safari compatibility
    video.muted = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setPlayFailed(false);
        })
        .catch((err) => {
          console.log("Autoplay blocked or failed on mobile/Safari, showing play trigger:", err);
          setPlayFailed(true);
        });
    }

    const timer = setTimeout(() => {
      // If play failed, we let the user tap. If they do not, we transition after 10s as a final safety fallback.
      handleExitRef.current();
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleOverlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      video.play()
        .then(() => {
          setPlayFailed(false);
        })
        .catch((err) => {
          console.log("Tap to play failed:", err);
          handleExit();
        });
    } else {
      handleExit();
    }
  };

  return (
    <motion.div
      animate={{
        opacity: isExiting ? 0 : 1,
        filter: isExiting ? "blur(10px)" : "blur(0px)"
      }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden w-screen h-screen"
    >
      <video
        ref={videoRef}
        src="/video_images/splash.mp4"
        preload="auto"
        autoPlay
        muted
        playsInline
        onEnded={handleExit}
        className="w-full h-full object-cover bg-black"
      />

      {/* Tap to Play overlay when browser restricts autoplay (e.g. low power mode) */}
      {playFailed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 cursor-pointer"
          onClick={handleOverlayClick}
        >
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E2D5BC] text-[#1C1917] shadow-lg shadow-[#E2D5BC]/20 hover:scale-105 transition-transform duration-200"
          >
            <svg className="w-6 h-6 fill-current ml-0.5" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
          <p className="mt-3 text-xs font-bold tracking-[0.25em] text-[#F7F4EE]/90 uppercase">
            Tap to Play
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
