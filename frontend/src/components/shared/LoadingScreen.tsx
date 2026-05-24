"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const words = ["Land.", "Legacy.", "Rights."];

export default function LoadingScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let value = 0;
    const interval = setInterval(() => {
      value += 2;
      setCount(value);
      if (value >= 100) {
        clearInterval(interval);
        setTimeout(onCompleteRef.current, 500);
      }
    }, 22);

    const wordInterval = setInterval(() => {
      setWordIndex((p) => (p + 1) % words.length);
    }, 700);

    return () => {
      clearInterval(interval);
      clearInterval(wordInterval);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, #04150f 0%, #02100c 50%, #0a0a12 100%)",
      }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
      data-testid="loading-screen"
    >
      <div className="absolute inset-0 grain pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,transparent_70%)] blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-8 left-8 text-[10px] tracking-[0.42em] uppercase text-[#D4AF37]/80 font-mono z-10"
      >
        Naga Law Chambers
      </motion.div>

      <div className="relative z-10 mb-10 h-20 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={wordIndex}
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
            transition={{ duration: 0.4 }}
            className="font-heading text-5xl md:text-7xl italic text-gold-gradient"
          >
            {words[wordIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <p className="relative z-10 font-heading text-7xl md:text-9xl text-white tabular-nums">
        {String(count).padStart(3, "0")}
      </p>

      <div className="relative z-10 w-56 h-px bg-white/10 rounded-full mt-6 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#D4AF37] to-[#E6C965]"
          style={{ width: `${count}%` }}
        />
      </div>

      <p className="relative z-10 text-[10px] text-white/40 mt-5 tracking-[0.32em] uppercase font-mono">
        Anantapur · Andhra Pradesh
      </p>
    </motion.div>
  );
}
