import type { Metadata, Viewport } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import {
  GoogleTagManager,
  GoogleTagManagerNoscript,
} from "@/components/analytics/google-tag-manager";
import { WhatsappFab } from "@/components/conversion/whatsapp-fab";
import { StickyCta } from "@/components/conversion/sticky-cta";
import { baseUrl, metadataBase, site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase,
  title: {
    default:
      "NAGA Law Chambers | Advocate S. Nagendra Naik — Revenue, Land & Civil Lawyer in Anantapur",
    template: "%s | NAGA Law Chambers",
  },
  description:
    "NAGA Law Chambers — Advocate S. Nagendra Naik practises revenue, land, civil, criminal, family, and consumer law across Anantapur district, Andhra Pradesh. Specialising in Tahsildar appeals, RDO proceedings, Adangal corrections, mutations, AP High Court writs, and property partition suits. Bar Council of Andhra Pradesh (2019). Over " + (new Date().getFullYear() - site.advocate.practisingSince) + " years of direct advocacy.",
  keywords: [
    "NAGA Law Chambers",
    "Advocate S Nagendra Naik",
    "Advocate S. Nagendra Naik Anantapur",
    "land revenue lawyer Anantapur",
    "property advocate Andhra Pradesh",
    "bail lawyer Anantapur",
    "civil litigation advocate Anantapur",
    "family court lawyer Anantapur",
    "Tahsildar RDO land disputes",
    "consumer forum lawyer Anantapur",
    "criminal defence Anantapur",
    "partition lawyer Anantapur",
    "Section 138 cheque bounce Anantapur",
    "Anantapur Bar Association",
    "Dharmavaram Revenue Divisional Office RDO",
    "Tahsildar appeals Anantapur",
    "Adangal corrections",
    "mutations land records",
    "AP High Court writs",
    "property partition suits Anantapur",
  ],
  authors: [{ name: site.advocate.name, url: baseUrl }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "NAGA Law Chambers | Advocate S. Nagendra Naik — Revenue, Land & Civil Lawyer in Anantapur",
    description:
      "Defending land, legacy, and rights. Revenue & land matters at Tahsildar, RDO, and Collector levels across Anantapur district. Civil, criminal, family, and consumer representation before Andhra Pradesh courts.",
    type: "website",
    url: baseUrl,
    siteName: site.name,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "NAGA Law Chambers | Advocate S. Nagendra Naik — Revenue & Land Lawyer, Anantapur",
    description:
      "Revenue, land, civil, criminal, family, and consumer law — Tahsildar appeals, RDO proceedings, AP High Court writs — Anantapur, Andhra Pradesh.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="antialiased"
    >
      <head>
        <link
          href="https://db.onlinewebfonts.com/c/1cd1e7d71e048159076fd90b39846902?family=Open+Sauce+One"
          rel="stylesheet"
        />
        <link
          href="https://db.onlinewebfonts.com/c/42acf9aa4a6dc2f2886a3f682e337ead?family=Open+Sauce+One+Bold"
          rel="stylesheet"
        />
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <GoogleTagManagerNoscript />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScrollProvider>
          <ScrollProgress />
          <JsonLd />
          {children}
          <WhatsappFab />
          <StickyCta />
        </SmoothScrollProvider>
        <GoogleTagManager />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
