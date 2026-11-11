import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | NAGA Law Chambers",
  description: "How NAGA Law Chambers handles enquiries, contact details and analytics cookies on this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main id="main" className="relative min-h-[100dvh]">
      <SiteHeader />
      <article className="mx-auto max-w-[760px] px-5 pb-20 pt-32 md:px-8 md:pt-40">
        <h1 className="font-display text-5xl leading-[1.05] text-ink md:text-6xl">Privacy policy</h1>
        <p className="mt-4 text-ink-2">Last updated: November 2026</p>

        <h2 className="mt-10 font-display text-3xl text-ink">What this site collects</h2>
        <p className="mt-3 leading-relaxed text-ink-2">
          The enquiry form on this site does not send your details to a server. It opens WhatsApp with a message
          you can review and send yourself, so the details you type reach the advocate only if you press send in
          WhatsApp. If you call or email, the chambers sees your number or address and keeps it only to respond
          to your enquiry.
        </p>

        <h2 className="mt-10 font-display text-3xl text-ink">Cookies and analytics</h2>
        <p className="mt-3 leading-relaxed text-ink-2">
          We use Google Analytics to count visits and see which pages are useful. Analytics scripts and cookies
          load only after you choose Accept on the cookie notice. If you choose Decline, or do not choose, no
          analytics script loads. You can change your mind by clearing this site&apos;s data in your browser.
        </p>

        <h2 className="mt-10 font-display text-3xl text-ink">Third-party services</h2>
        <p className="mt-3 leading-relaxed text-ink-2">
          The contact section shows a Google Map, and the WhatsApp, call and social links open those services,
          which have their own privacy policies.
        </p>

        <h2 className="mt-10 font-display text-3xl text-ink">Confidentiality</h2>
        <p className="mt-3 leading-relaxed text-ink-2">
          Please do not send sensitive documents through the website. Share them with the advocate directly
          after your first conversation.
        </p>

        <h2 className="mt-10 font-display text-3xl text-ink">Contact</h2>
        <p className="mt-3 leading-relaxed text-ink-2">
          Questions about this policy: <a className="text-ink underline underline-offset-4" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          {" "}or {site.contact.phoneDisplay}.
        </p>
      </article>
      <SiteFooter />
    </main>
  );
}
