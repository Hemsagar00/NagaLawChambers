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
    <section id={id} className="naga-section border-t border-ink">
      <div className="naga-container">
        <h2 className="naga-section-title mb-10">{heading}</h2>

        <div className="naga-ruled">
          {items.map((item) => (
            <details key={item.q} className="naga-faq group">
              <summary className="naga-faq-summary">
                <span>{item.q}</span>
                <ChevronDown
                  className="h-4 w-4 shrink-0 text-ink transition-transform duration-300 group-open:rotate-180"
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
