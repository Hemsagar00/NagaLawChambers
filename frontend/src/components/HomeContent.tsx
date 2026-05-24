"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import LoadingScreen from "@/components/shared/LoadingScreen";
import NavDock from "@/components/shared/NavDock";
import Hero3D from "@/components/sections/Hero3D";
import AdvocateProfile from "@/components/sections/AdvocateProfile";
import PracticeAreas from "@/components/sections/PracticeAreas";
import Cases from "@/components/sections/Cases";
import ContactForm from "@/components/sections/ContactForm";
import Footer from "@/components/shared/Footer";

export default function HomeContent() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

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
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
        data-testid="page-main"
      >
        <NavDock />
        <Hero3D />
        <AdvocateProfile />
        <PracticeAreas />
        <Cases />
        <ContactForm />
        <Footer />
      </motion.main>
    </>
  );
}
