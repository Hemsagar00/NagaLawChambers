import { AboutContent } from "@/components/home/about-content";
import { AboutImage } from "@/components/home/about-image";
import { AnimatedSection } from "@/components/home/animated-section";
import { SectionHeading } from "@/components/home/section-heading";
import { about } from "@/lib/content";

export function AboutSection() {
  return (
    <AnimatedSection
      className="py-16 md:py-20 border-t border-gold-faint bg-kiwi-dark"
      id="about"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow={about.eyebrow}
          title={about.title}
          subtitle={about.subtitle}
        />

        <div className="grid lg:grid-cols-[minmax(0,340px)_1fr] gap-10 lg:gap-14 items-start">
          <AboutImage />
          <AboutContent />
        </div>
      </div>
    </AnimatedSection>
  );
}