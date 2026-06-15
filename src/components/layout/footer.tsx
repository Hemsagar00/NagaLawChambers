import { MapPin, Scale } from "lucide-react";
import { footerBlurb, practiceAreaTitles } from "@/lib/content";
import { emailHref, phoneHref, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-gold-faint py-14 md:py-16 bg-kiwi-dark">
      <div className="portavia-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10 mb-10 md:mb-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Scale className="w-5 h-5 text-gold" aria-hidden="true" />
              <span className="font-display-legal font-semibold text-text-primary text-lg md:text-xl tracking-[-0.3px]">
                {site.name}
              </span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              {footerBlurb}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[1.8px] text-text-secondary/70 mb-4 font-medium">
              Practice Areas
            </p>
            <ul className="space-y-2 text-sm text-text-secondary">
              {practiceAreaTitles.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[1.8px] text-text-secondary/70 mb-4 font-medium">
              Contact
            </p>
            <address className="not-italic space-y-1.5 text-sm text-text-secondary">
              <a
                href={phoneHref}
                className="block hover:text-kiwi-cyan transition-colors"
              >
                {site.contact.phoneDisplay}
              </a>
              <a
                href={emailHref}
                className="block hover:text-kiwi-cyan transition-colors"
              >
                {site.contact.email}
              </a>
              <a
                href="https://maps.google.com/?q=District+Court+Premises,+Anantapur,+Andhra+Pradesh+515001"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-kiwi-cyan transition-colors"
              >
                <span className="inline-flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  {site.contact.office}
                </span>
              </a>
            </address>
          </div>
        </div>

        <div className="pt-6 md:pt-8 border-t border-gold-faint flex flex-col md:flex-row justify-between items-center gap-y-3 text-xs text-text-secondary/60 text-center md:text-left">
          <p>
            © {site.copyrightYear} {site.name}. All rights reserved. Advocate{" "}
            {site.advocate.name}.
          </p>
          <p>
            {site.advocate.barCouncil} • Enrolled {site.advocate.barCouncilYear}
          </p>
        </div>
      </div>
    </footer>
  );
}
