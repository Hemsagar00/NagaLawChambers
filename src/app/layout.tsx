import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import { JsonLd } from "@/components/seo/json-ld";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll";
import { baseUrl, metadataBase, site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Advocate S. Nagendra Naik | NAGA Law Chambers",
    template: "%s | NAGA Law Chambers",
  },
  description:
    "Advocate S. Nagendra Naik — revenue, land, civil, criminal, family, and consumer law in Anantapur, Andhra Pradesh. Bar Council of Andhra Pradesh (2019). Practising since 2011.",
  keywords: [
    "Advocate S Nagendra Naik",
    "NAGA Law Chambers",
    "land revenue lawyer Anantapur",
    "property advocate Andhra Pradesh",
    "bail lawyer Anantapur",
    "civil litigation advocate",
    "family court lawyer Anantapur",
    "Tahsildar RDO land disputes",
    "consumer forum lawyer Anantapur",
    "criminal defence Anantapur",
  ],
  authors: [{ name: site.advocate.name, url: baseUrl }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `Advocate ${site.advocate.name} | ${site.name}`,
    description:
      "Defending land, legacy, and rights. Revenue, civil, criminal, family, and consumer matters across Andhra Pradesh courts.",
    type: "website",
    url: baseUrl,
    siteName: site.name,
    locale: "en_IN",
    images: [
      {
        url: "/advocate.jpg",
        width: 1200,
        height: 900,
        alt: "Advocate S. Nagendra Naik — NAGA Law Chambers, Anantapur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Advocate S. Nagendra Naik | NAGA Law Chambers",
    description:
      "Revenue, land, civil, criminal, family, and consumer law — Anantapur, Andhra Pradesh.",
    images: ["/advocate.jpg"],
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
  themeColor: "#050508",
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
      className={`${inter.variable} ${playfair.variable} ${mono.variable} antialiased`}
    >
      <body className="bg-kiwi-dark text-text-primary">
        <SmoothScrollProvider>
          <ScrollProgress />
          <JsonLd />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
