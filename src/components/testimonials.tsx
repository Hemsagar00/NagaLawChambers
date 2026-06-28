import { Quote, Star } from "lucide-react";
import { site } from "@/lib/site";
import { testimonials } from "@/lib/content";

/**
 * Client testimonials + Review schema. Renders nothing when there are no
 * real testimonials, so the page never shows empty/placeholder reviews.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${site.url}/#organization`,
    name: site.name,
    review: testimonials.map((t) => ({
      "@type": "Review",
      reviewBody: t.quote,
      author: { "@type": "Person", name: t.author },
      ...(t.rating
        ? {
            reviewRating: {
              "@type": "Rating",
              ratingValue: String(t.rating),
              bestRating: "5",
            },
          }
        : {}),
    })),
  };

  return (
    <section id="testimonials" className="naga-section relative">
      <div className="naga-container">
        <p className="naga-eyebrow mb-6 inline-flex">Client voices</p>
        <h2 className="naga-section-title mb-10 max-w-3xl text-balance">
          What clients say about working with the chamber.
        </h2>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.author + t.quote.slice(0, 16)} className="naga-card p-6 sm:p-7">
              <Quote className="h-6 w-6 text-[var(--naga-gold)] opacity-60" aria-hidden="true" />
              {t.rating ? (
                <div className="mt-3 flex gap-1" aria-label={`${t.rating} out of 5`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < t.rating! ? "fill-[var(--naga-gold)] text-[var(--naga-gold)]" : "text-[var(--naga-muted)]"
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              ) : null}
              <blockquote className="mt-4 text-sm leading-[1.8] text-[var(--naga-linen)]">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 border-t border-[var(--naga-line)] pt-4">
                <span className="block text-sm font-semibold text-[var(--naga-ivory)]">
                  {t.author}
                </span>
                {t.matter ? (
                  <span className="mt-0.5 block text-xs text-[var(--naga-muted)]">
                    {t.matter}
                  </span>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
    </section>
  );
}
