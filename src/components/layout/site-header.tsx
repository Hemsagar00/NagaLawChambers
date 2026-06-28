import Link from "next/link";
import { Scale } from "lucide-react";
import { site, phoneHref } from "@/lib/site";

/** Lightweight header for subpages — links resolve back to the homepage sections. */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4">
      <nav
        className="naga-glass-nav mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-6"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3"
          aria-label="NAGA Law Chambers home"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[rgb(212_175_55_/_0.15)] bg-[rgb(212_175_55_/_0.06)]">
            <Scale className="h-4.5 w-4.5 text-[var(--naga-gold)]" aria-hidden="true" />
          </span>
          <span className="truncate text-xs font-medium tracking-[0.2em] uppercase text-[var(--naga-ivory)]">
            NAGA LAW
          </span>
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
          className="rounded-full border border-[rgb(212_175_55_/_0.3)] bg-[rgb(212_175_55_/_0.08)] px-5 py-2 text-xs font-medium tracking-[0.1em] uppercase text-[var(--naga-gold)] transition-all duration-300 hover:bg-[rgb(212_175_55_/_0.14)] hover:-translate-y-0.5"
        >
          {site.contact.phoneDisplay}
        </a>
      </nav>
    </header>
  );
}
