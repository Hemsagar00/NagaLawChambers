import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/local-seo";

/**
 * Accessible FAQ (native <details>, works without JS) plus FAQPage JSON-LD
 * for rich results and AI/voice answers.
 */
export function Faq({
  items,
  heading = "Frequently asked questions",
  id = "faq",
}: {
  items: FaqItem[];
  heading?: string;
  id?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section id={id} className="naga-section relative">
      <div className="naga-container">
        <p className="naga-eyebrow mb-6 inline-flex">FAQ</p>
        <h2 className="naga-section-title mb-10 max-w-3xl text-balance">{heading}</h2>

        <div className="grid gap-4">
          {items.map((item) => (
            <details key={item.q} className="naga-faq group">
              <summary className="naga-faq-summary">
                <span>{item.q}</span>
                <ChevronDown
                  className="h-4 w-4 shrink-0 text-[var(--naga-gold)] transition-transform duration-300 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="naga-faq-answer">{item.a}</p>
            </details>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}
