import Link from "next/link";
import { site, phoneHref } from "@/lib/site";
import { practicePages, locationPages } from "@/lib/local-seo";

/** Sitewide footer with internal links to every practice and location page. */
export function SiteFooter() {
  return (
    <footer className="px-4 pb-10 pt-6">
      <div className="naga-container">
        <div className="naga-divider mb-10" />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--naga-ivory)]">
              NAGA Law Chambers
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--naga-muted)] font-light">
              Advocate {site.advocate.name} — direct representation before
              Andhra Pradesh courts, revenue authorities, and statutory forums.
            </p>
            <a
              href={phoneHref}
              className="mt-4 inline-block text-sm text-[var(--naga-ivory)] transition-colors duration-300 hover:text-[var(--naga-gold)]"
            >
              {site.contact.phoneDisplay}
            </a>
          </div>

          <div>
            <p className="naga-sub-header mb-4 text-[var(--naga-gold)]">
              Practice areas
            </p>
            <ul className="grid gap-2.5">
              {practicePages.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/practice/${page.slug}`}
                    className="text-sm text-[var(--naga-linen)] transition-colors duration-300 hover:text-[var(--naga-gold)]"
                  >
                    {page.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="naga-sub-header mb-4 text-[var(--naga-gold)]">
              Areas served
            </p>
            <ul className="grid gap-2.5">
              {locationPages.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/locations/${page.slug}`}
                    className="text-sm text-[var(--naga-linen)] transition-colors duration-300 hover:text-[var(--naga-gold)]"
                  >
                    {page.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="naga-sub-header mb-4 text-[var(--naga-gold)]">
              Chamber
            </p>
            <p className="text-sm leading-relaxed text-[var(--naga-linen)]">
              {site.contact.office}
            </p>
            {site.gbp.profileUrl ? (
              <a
                href={site.gbp.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm text-[var(--naga-linen)] transition-colors hover:text-[var(--naga-gold)]"
              >
                View on Google →
              </a>
            ) : null}
            {site.gbp.reviewUrl ? (
              <a
                href={site.gbp.reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm font-medium text-[var(--naga-gold)] transition-opacity hover:opacity-80"
              >
                Leave a Google review →
              </a>
            ) : null}
          </div>
        </div>

        <div className="naga-divider my-8" />
        <p className="text-xs text-[var(--naga-muted)] font-light">
          © {site.copyrightYear} NAGA Law Chambers. Advocate {site.advocate.name}.
        </p>
      </div>
    </footer>
  );
}
