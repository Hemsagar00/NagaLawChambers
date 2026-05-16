"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "@/components/shared/LoadingScreen";
import Navbar from "@/components/shared/Navbar";
import BentoHero from "@/components/sections/BentoHero";
import Practice from "@/components/sections/Practice";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Cases from "@/components/sections/Cases";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/shared/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0 }}
        animate={isLoading ? {} : { opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Navbar />
        <BentoHero />
        <Practice />
        <About />
        <Testimonials />
        <Cases />
        <Contact />
        <Footer />
      </motion.main>
    </>
  );
}
