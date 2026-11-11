import Link from "next/link";
import { site, phoneHref, socialProfiles } from "@/lib/site";
import { practicePages, locationPages } from "@/lib/local-seo";
import { te, teAreas, type Locale } from "@/lib/home-copy";

/** Sitewide footer with internal links to every practice and location page. */
export function SiteFooter({ locale = "en" }: { locale?: Locale }) {
  const T = locale === "te" ? te : null;
  return (
    <footer className="border-t border-ink pb-10 pt-10" lang={locale}>
      <div className="naga-container">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-base font-medium text-ink">NAGA Law Chambers</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {T
                ? T.footer.blurb
                : `Advocate ${site.advocate.name}: direct representation before Andhra Pradesh courts, revenue authorities, and statutory forums.`}
            </p>
            <a href={phoneHref} className="mt-2 inline-flex min-h-11 items-center text-sm text-ink">
              {site.contact.phoneDisplay}
            </a>
          </div>

          <div>
            <p className="naga-sub-header mb-4 text-ink">{T ? T.footer.practice : "Practice areas"}</p>
            <ul className="grid gap-0">
              {practicePages.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/practice/${page.slug}`}
                    className="inline-flex min-h-11 items-center text-sm text-ink-2 transition-colors duration-300 hover:text-ink"
                  >
                    {T ? teAreas[page.practiceId]?.title ?? page.navLabel : page.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="naga-sub-header mb-4 text-ink">{T ? T.footer.areas : "Areas served"}</p>
            <p className="mb-3 text-sm text-ink-2">{T ? T.footer.all : "All districts of Andhra Pradesh"}</p>
            <ul className="grid gap-0">
              {locationPages.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/locations/${page.slug}`}
                    className="inline-flex min-h-11 items-center text-sm text-ink-2 transition-colors duration-300 hover:text-ink"
                  >
                    {page.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="naga-sub-header mb-4 text-ink">{T ? T.footer.chamber : "Chamber"}</p>
            <p className="text-sm leading-relaxed text-ink-2">{site.contact.office}</p>
            {site.gbp.profileUrl ? (
              <a
                href={site.gbp.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex min-h-11 items-center text-sm text-ink-2 transition-colors hover:text-ink"
              >
                {T ? T.footer.google : "View on Google"}
              </a>
            ) : null}
            {site.gbp.reviewUrl ? (
              <a
                href={site.gbp.reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-sm font-medium text-ink transition-opacity hover:opacity-80"
              >
                Leave a Google review
              </a>
            ) : null}
            <p className="naga-sub-header mb-2 mt-5 text-ink">{T ? T.footer.follow : "Follow the chambers"}</p>
            <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-2 p-0">
              {socialProfiles.map((p) => (
                <li key={p.url}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="inline-flex min-h-11 items-center text-sm text-ink-2 underline underline-offset-4 transition-colors hover:text-ink"
                  >
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="naga-divider my-8" />
        <div className="flex flex-wrap items-center justify-between gap-x-6">
          <p className="text-sm text-muted">
            © {site.copyrightYear} NAGA Law Chambers. Advocate {site.advocate.name}.
          </p>
          <Link href="/privacy" className="inline-flex min-h-11 items-center text-sm text-ink-2 underline underline-offset-4 hover:text-ink">
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
