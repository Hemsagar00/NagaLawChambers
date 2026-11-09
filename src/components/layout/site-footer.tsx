import Link from "next/link";
import { site, phoneHref } from "@/lib/site";
import { practicePages, locationPages } from "@/lib/local-seo";

/** Sitewide footer with internal links to every practice and location page. */
export function SiteFooter() {
  return (
    <footer className="border-t border-ink pb-10 pt-10">
      <div className="naga-container">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-base font-medium text-ink">
              NAGA Law Chambers
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              Advocate {site.advocate.name}: direct representation before
              Andhra Pradesh courts, revenue authorities, and statutory forums.
            </p>
            <a
              href={phoneHref}
              className="mt-4 inline-block text-sm text-ink transition-colors duration-300 hover:text-ink"
            >
              {site.contact.phoneDisplay}
            </a>
          </div>

          <div>
            <p className="naga-sub-header mb-4 text-ink">
              Practice areas
            </p>
            <ul className="grid gap-2.5">
              {practicePages.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/practice/${page.slug}`}
                    className="text-sm text-ink-2 transition-colors duration-300 hover:text-ink"
                  >
                    {page.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="naga-sub-header mb-4 text-ink">
              Areas served
            </p>
            <p className="mb-3 text-sm text-ink-2">All districts of Andhra Pradesh</p>
            <ul className="grid gap-2.5">
              {locationPages.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/locations/${page.slug}`}
                    className="text-sm text-ink-2 transition-colors duration-300 hover:text-ink"
                  >
                    {page.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="naga-sub-header mb-4 text-ink">
              Chamber
            </p>
            <p className="text-sm leading-relaxed text-ink-2">
              {site.contact.office}
            </p>
            {site.gbp.profileUrl ? (
              <a
                href={site.gbp.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm text-ink-2 transition-colors hover:text-ink"
              >
                View on Google
              </a>
            ) : null}
            {site.gbp.reviewUrl ? (
              <a
                href={site.gbp.reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm font-medium text-ink transition-opacity hover:opacity-80"
              >
                Leave a Google review
              </a>
            ) : null}
          </div>
        </div>

        <div className="naga-divider my-8" />
        <p className="text-sm text-muted">
          © {site.copyrightYear} NAGA Law Chambers. Advocate {site.advocate.name}.
        </p>
      </div>
    </footer>
  );
}
