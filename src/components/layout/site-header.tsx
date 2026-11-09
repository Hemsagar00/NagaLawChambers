import Link from "next/link";
import { Scale } from "lucide-react";
import { site, phoneHref } from "@/lib/site";

/** Lightweight header for subpages — links resolve back to the homepage sections. */
export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="naga-container">
        <nav className="site-header__bar" aria-label="Primary">
          <Link href="/" className="wordmark" aria-label="NAGA Law Chambers home">
            <Scale className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span className="truncate">Naga Law Chambers</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link href="/#practice" className="naga-nav-link">
              Practice
            </Link>
            <Link href="/#advocate" className="naga-nav-link">
              Advocate
            </Link>
            <Link href="/#contact" className="naga-nav-link">
              Contact
            </Link>
          </div>

          <a
            href={phoneHref}
            className="naga-button naga-button-secondary !min-h-11"
          >
            {site.contact.phoneDisplay}
          </a>
        </nav>
      </div>
    </header>
  );
}
