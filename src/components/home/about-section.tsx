import { AboutContent } from "@/components/home/about-content";
import { AboutImage } from "@/components/home/about-image";
import { AnimatedSection } from "@/components/home/animated-section";
import { SectionHeading } from "@/components/home/section-heading";
import { about } from "@/lib/content";

export function AboutSection() {
  return (
    <AnimatedSection
      className="portavia-section border-t border-gold-faint bg-kiwi-dark"
      id="about"
    >
      <div className="portavia-container">
        <SectionHeading
          eyebrow={about.eyebrow}
          title={about.title}
          subtitle={about.subtitle}
        />

        <div className="grid lg:grid-cols-[minmax(0,360px)_1fr] gap-12 lg:gap-20 items-start max-w-5xl mx-auto">
          <AboutImage />
          <AboutContent />
        </div>
      </div>
    </AnimatedSection>
  );
}