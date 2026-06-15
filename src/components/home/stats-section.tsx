import { AnimatedSection } from "@/components/home/animated-section";
import { Stat } from "@/components/home/stat";
import { stats } from "@/lib/content";

export function StatsSection() {
  return (
    <AnimatedSection
      className="py-14 md:py-16 border-y border-gold-faint bg-kiwi-dark scanline-overlay-subtle"
      id="stats"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-8 md:gap-y-10">
          {stats.map((item) => (
            <Stat key={item.label} {...item} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}