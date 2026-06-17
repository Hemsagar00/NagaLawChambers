import { AnimatedSection } from "@/components/home/animated-section";
import { Stat } from "@/components/home/stat";
import { stats } from "@/lib/content";

export function StatsSection() {
  return (
    <AnimatedSection
      className="py-18 md:py-24 border-y border-gold-faint bg-kiwi-dark scanline-overlay-subtle aurora-legal"
      id="stats"
    >
      <div className="portavia-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 md:gap-y-12 max-w-4xl mx-auto">
          {stats.map((item) => (
            <Stat key={item.label} {...item} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
