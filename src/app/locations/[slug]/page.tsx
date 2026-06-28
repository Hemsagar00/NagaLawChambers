import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, BadgeCheck, MapPin } from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Faq } from "@/components/seo/faq";
import { PageJsonLd } from "@/components/seo/page-jsonld";
import { InlineCta } from "@/components/conversion/inline-cta";
import { MapEmbed } from "@/components/map-embed";
import {
  locationPages,
  getLocationPage,
  practicePages,
  ogImage,
} from "@/lib/local-seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return locationPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getLocationPage(slug);
  if (!page) return {};

  const path = `/locations/${page.slug}`;
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

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getLocationPage(slug);
  if (!page) notFound();

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
              <li className="text-[var(--naga-linen)]">{page.city}</li>
            </ol>
          </nav>

          <span className="naga-icon-shell mb-6">
            <MapPin className="h-5 w-5" aria-hidden="true" />
          </span>

          <h1 className="naga-hero-title max-w-4xl text-balance">{page.h1}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-[1.8] text-[var(--naga-linen)]">
            {page.lead}
          </p>
        </div>
      </section>

      {/* Body + forums */}
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
                Explore practice areas
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {practicePages.map((pp) => (
                  <li key={pp.slug}>
                    <Link
                      href={`/practice/${pp.slug}`}
                      className="group flex items-center justify-between gap-3 naga-proof-row transition-colors hover:border-[var(--naga-line-hover)]"
                    >
                      <span>{pp.navLabel}</span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--naga-gold)] opacity-60 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="naga-card p-6 sm:p-8">
              <h2 className="mb-5 text-lg font-semibold tracking-[-0.01em] text-[var(--naga-ivory)]">
                Forums covered
              </h2>
              <div className="grid gap-3">
                {page.forums.map((forum) => (
                  <div key={forum} className="naga-proof-row">
                    <BadgeCheck
                      className="h-3.5 w-3.5 shrink-0 mt-0.5 text-[var(--naga-gold)]"
                      aria-hidden="true"
                    />
                    <span>{forum}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="relative px-4 pb-4">
        <div className="naga-container h-[20rem] sm:h-[22rem]">
          <MapEmbed className="h-full" />
        </div>
      </section>

      <Faq items={page.faqs} heading={`${page.city} — common questions`} />

      <InlineCta
        heading={`Need a lawyer in ${page.city}?`}
        body="Call or message directly for a clear, honest assessment of your matter and the right next step."
        location={`location_${page.slug}`}
      />

      <SiteFooter />

      <PageJsonLd
        title={page.metaTitle}
        description={page.metaDescription}
        path={`/locations/${page.slug}`}
        crumbs={[
          { name: "Home", path: "/" },
          { name: page.city, path: `/locations/${page.slug}` },
        ]}
      />
    </main>
  );
}
