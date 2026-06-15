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
    "Advocate S. Nagendra Naik — revenue, land, civil, criminal, and family law in Anantapur, Andhra Pradesh. Bar Council of Andhra Pradesh (2019). Practising since 2011.",
  keywords: [
    "Advocate S Nagendra Naik",
    "NAGA Law Chambers",
    "land revenue lawyer Anantapur",
    "property advocate Andhra Pradesh",
    "bail lawyer Anantapur",
    "civil litigation advocate",
    "family court lawyer Anantapur",
    "Tahsildar RDO land disputes",
  ],
  authors: [{ name: site.advocate.name, url: baseUrl }],
  creator: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `Advocate ${site.advocate.name} | ${site.name}`,
    description:
      "Defending land, legacy, and rights. Revenue, civil, criminal, and family matters across Andhra Pradesh courts.",
    type: "website",
    url: baseUrl,
    siteName: site.name,
    locale: "en_IN",
    images: [
      {
        url: "/advocate.jpg",
        width: 1200,
        height: 900,
        alt: "Advocate S. Nagendra Naik — NAGA Law Chambers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Advocate S. Nagendra Naik | NAGA Law Chambers",
    description:
      "Revenue, land, civil, criminal, and family law — Anantapur, Andhra Pradesh.",
    images: ["/advocate.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050508",
  width: "device-width",
  initialScale: 1,
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
      <body>
        <SmoothScrollProvider>
          <ScrollProgress />
          <JsonLd />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
