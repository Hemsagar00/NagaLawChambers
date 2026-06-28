import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, BadgeCheck, CircleDot } from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Faq } from "@/components/seo/faq";
import { PageJsonLd } from "@/components/seo/page-jsonld";
import { InlineCta } from "@/components/conversion/inline-cta";
import { getPracticeAreaIcon } from "@/lib/icons";
import { practiceAreas } from "@/lib/content";
import { practicePages, getPracticePage, ogImage } from "@/lib/local-seo";
import type { PracticeAreaIcon } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return practicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPracticePage(slug);
  if (!page) return {};

  const path = `/practice/${page.slug}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: `${page.metaTitle} | NAGA Law Chambers`,
      description: page.metaDescription,
      url: path,
      type: "article",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImage.url],
    },
  };
}

export default async function PracticeAreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getPracticePage(slug);
  if (!page) notFound();

  const area = practiceAreas.find((a) => a.id === page.practiceId);
  const Icon = area ? getPracticeAreaIcon(area.icon as PracticeAreaIcon) : null;

  return (
    <main className="naga-page-bg relative min-h-[100dvh] overflow-x-hidden">
      <div className="naga-grid-texture" aria-hidden="true" />
      <SiteHeader />

      {/* Hero */}
      <section className="relative px-4 pb-10 pt-36 sm:pt-40">
        <div className="naga-container">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-[var(--naga-muted)]">
              <li>
                <Link href="/" className="hover:text-[var(--naga-gold)]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/#practice" className="hover:text-[var(--naga-gold)]">
                  Practice
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[var(--naga-linen)]">{page.navLabel}</li>
            </ol>
          </nav>

          {Icon ? (
            <span className="naga-icon-shell mb-6">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
          ) : null}

          <h1 className="naga-hero-title max-w-4xl text-balance">{page.h1}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-[1.8] text-[var(--naga-linen)]">
            {page.lead}
          </p>
        </div>
      </section>

      {/* Body + what we handle */}
      <section className="naga-section relative pt-4">
        <div className="naga-container grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="grid gap-5">
            {page.body.map((para) => (
              <p
                key={para.slice(0, 36)}
                className="text-base leading-[1.85] text-[var(--naga-linen)]"
              >
                {para}
              </p>
            ))}

            <div className="mt-2">
              <h2 className="mb-5 text-xl font-semibold tracking-[-0.01em] text-[var(--naga-ivory)]">
                What we handle
              </h2>
              <div className="grid gap-3">
                {page.handles.map((item) => (
                  <div key={item} className="naga-proof-row">
                    <BadgeCheck
                      className="h-3.5 w-3.5 shrink-0 mt-0.5 text-[var(--naga-gold)]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="naga-card p-6 sm:p-8">
              <h2 className="mb-5 text-lg font-semibold tracking-[-0.01em] text-[var(--naga-ivory)]">
                Forums & courts
              </h2>
              <div className="grid gap-3">
                {page.forums.map((forum) => (
                  <div key={forum} className="naga-proof-row">
                    <CircleDot
                      className="h-3.5 w-3.5 shrink-0 mt-0.5 text-[var(--naga-gold)]"
                      aria-hidden="true"
                    />
                    <span>{forum}</span>
                  </div>
                ))}
              </div>
            </div>

            {page.related.length ? (
              <div className="mt-5 naga-card p-6 sm:p-8">
                <h2 className="mb-4 text-sm font-semibold tracking-[0.1em] uppercase text-[var(--naga-sapphire-light)]">
                  Related practice areas
                </h2>
                <ul className="grid gap-3">
                  {page.related.map((relSlug) => {
                    const rel = getPracticePage(relSlug);
                    if (!rel) return null;
                    return (
                      <li key={relSlug}>
                        <Link
                          href={`/practice/${rel.slug}`}
                          className="group flex items-center justify-between gap-3 text-sm text-[var(--naga-linen)] transition-colors hover:text-[var(--naga-gold)]"
                        >
                          <span>{rel.navLabel}</span>
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--naga-gold)] opacity-60 transition-opacity group-hover:opacity-100" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      <Faq items={page.faqs} />

      <InlineCta
        heading="Talk through your matter with Adv. S. Nagendra Naik"
        body="Share the facts and documents directly for a clear assessment of the right forum, gaps, and next steps."
        location={`practice_${page.slug}`}
      />

      <div className="naga-container pb-8">
        <Link
          href="/#practice"
          className="inline-flex items-center gap-2 text-sm text-[var(--naga-gold)] hover:underline"
        >
          <ArrowRight className="h-4 w-4 rotate-180" aria-hidden="true" />
          All practice areas
        </Link>
      </div>

      <SiteFooter />

      <PageJsonLd
        title={page.metaTitle}
        description={page.metaDescription}
        path={`/practice/${page.slug}`}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Practice", path: "/#practice" },
          { name: page.navLabel, path: `/practice/${page.slug}` },
        ]}
      />
    </main>
  );
}
