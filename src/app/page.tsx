import { AboutSection } from "@/components/home/about-section";
import { ContactSection } from "@/components/home/contact-section";
import { Hero } from "@/components/home/hero";
import { PracticeAreasSection } from "@/components/home/practice-areas-section";
import { StatsSection } from "@/components/home/stats-section";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

/**
 * Portavia-Kiwi hybrid landing page.
 * Server composition layer — animations live in client islands under components/home/.
 */
export default function HomePage() {
  return (
    <main className="min-h-screen bg-kiwi-dark text-text-primary selection:bg-gold selection:text-kiwi-dark overflow-x-hidden">
      <Navbar />

      <Hero />

      <div className="portavia-flow">
        <StatsSection />
        <PracticeAreasSection />
        <AboutSection />
        <ContactSection />
      </div>

      <Footer />
    </main>
  );
}