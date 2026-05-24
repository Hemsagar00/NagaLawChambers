import type { Metadata } from "next";
import { Cinzel, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Naga Law Chambers · Land · Legacy · Rights",
  description:
    "Premier legal representation in Land Revenue, Civil Litigation & Property Law across Andhra Pradesh. Advocate S. Nagendra Naik — Anantapur Bar Council, 2019.",
  keywords: [
    "land revenue lawyer",
    "property advocate",
    "civil litigation",
    "Anantapur",
    "Andhra Pradesh",
    "Naga Law Chambers",
  ],
  openGraph: {
    title: "Naga Law Chambers",
    description: "Defending Land. Legacy. Rights.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Naga Law Chambers",
    legalName: "S. Nagendra Naik · Advocate",
    description:
      "Premier legal counsel in Land Revenue, Civil Litigation, and Property Law across Andhra Pradesh.",
    url: "https://nagalawchambers.com",
    telephone: "+91-94400-00417",
    email: "contact@nagalawchambers.com",
    priceRange: "₹₹",
    image: "/advocate.jpg",
    founder: {
      "@type": "Person",
      name: "S. Nagendra Naik",
      jobTitle: "Advocate",
      alumniOf: "Bar Council of Andhra Pradesh",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "District Court Premises",
      addressLocality: "Anantapur",
      addressRegion: "Andhra Pradesh",
      postalCode: "515001",
      addressCountry: "IN",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Andhra Pradesh" },
      { "@type": "City", name: "Anantapur" },
      { "@type": "City", name: "Kadiri" },
    ],
    knowsAbout: [
      "Land Revenue Law",
      "Record of Rights (ROR) Appeals",
      "Mutation Proceedings",
      "Civil Litigation",
      "Partition Suits",
      "Property Documentation",
      "Title Verification",
      "Court Representation",
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:30",
      closes: "19:00",
    },
  };

  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${outfit.variable} ${mono.variable} antialiased`}
    >
      <head>
        {/*
          JSON-LD structured data for SEO.
          Per the official Next.js docs (https://nextjs.org/docs/app/guides/json-ld),
          this is the canonical pattern. The payload is a hardcoded literal — no
          user input flows through it — so `dangerouslySetInnerHTML` is safe here.
          `JSON.stringify` emits ECMAScript-safe text; it never produces HTML tags.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#02100C] text-[#F8FAFC] font-sans selection:bg-[#D4AF37]/30 selection:text-[#F8FAFC]">
        {children}
      </body>
    </html>
  );
}
