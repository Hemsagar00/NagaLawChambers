import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { JsonLd } from "@/components/seo/json-ld";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll";
import { ConsentAndAnalytics } from "@/components/analytics/consent";
import { WhatsappFab } from "@/components/conversion/whatsapp-fab";
import { StickyCta } from "@/components/conversion/sticky-cta";
import { baseUrl, metadataBase, site } from "@/lib/site";
import { teluguEnabled } from "@/lib/features";
import "./globals.css";

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "NAGA Law Chambers: Land & Revenue Lawyer in Andhra Pradesh",
    template: "%s | NAGA Law Chambers",
  },
  description:
    "Advocate S. Nagendra Naik handles land, revenue, civil, criminal and family cases across Andhra Pradesh. Chambers in Anantapur. Call +91 94400 00417.",
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
    ...(teluguEnabled ? { languages: { en: "/", te: "/te", "x-default": "/" } } : {}),
  },
  openGraph: {
    title: "NAGA Law Chambers: Land & Revenue Lawyer in Andhra Pradesh",
    description:
      "Advocate S. Nagendra Naik: land, revenue, civil, criminal and family cases across Andhra Pradesh. Chambers in Anantapur. Call +91 94400 00417.",
    type: "website",
    url: baseUrl,
    siteName: site.name,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "NAGA Law Chambers: Land & Revenue Lawyer in Andhra Pradesh",
    description:
      "Advocate S. Nagendra Naik: land, revenue, civil, criminal and family cases across Andhra Pradesh. Chambers in Anantapur.",
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
  themeColor: "#eaeff5",
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
      className={`${serif.variable} ${sans.variable} antialiased`}
    >
      <head>
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body style={{ backgroundColor: "#EAEFF5", color: "#121B60" }}>
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
        <ConsentAndAnalytics />
      </body>
    </html>
  );
}
