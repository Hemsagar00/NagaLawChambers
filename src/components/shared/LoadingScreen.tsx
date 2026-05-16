"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Justice", "Defend", "Protect", "Win"];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return 100;
        }
        return prev + 1;
      });
    }, 27);

    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 900);

    return () => {
      clearInterval(interval);
      clearInterval(wordInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#0a0a12] flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Themed Background - Dark Navy + Gold Glow */}
      <div className="absolute inset-0 bg-[#0a0a12]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a12] via-[#0f1020] to-[#1a1528]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(201,169,98,0.08)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(201,169,98,0.05)_0%,transparent_70%)] blur-2xl" />
      </div>

      {/* Top label */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-8 left-8 text-xs uppercase tracking-[0.3em] text-white/40 z-10"
      >
        NAGA Law Chambers
      </motion.div>

      {/* Rotating words */}
      <div className="relative z-10 mb-8 h-16 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={wordIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-4xl md:text-6xl font-[family-name:var(--font-playfair)] italic text-white/90"
          >
            {words[wordIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Counter */}
      <p className="relative z-10 text-6xl md:text-8xl font-[family-name:var(--font-playfair)] text-white tabular-nums">
        {String(count).padStart(3, "0")}
      </p>

      {/* Progress bar */}
      <div className="relative z-10 w-48 h-[3px] bg-white/10 rounded-full mt-6 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#c9a962] to-[#e8d5a3]"
          style={{ width: `${count}%` }}
        />
      </div>

      {/* Bottom label */}
      <p className="relative z-10 text-xs text-white/30 mt-4 uppercase tracking-[0.2em]">
        Anantapur Bar · Andhra Pradesh
      </p>
    </motion.div>
  );
}
