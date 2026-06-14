import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import { metadataBase } from "@/lib/site";
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
  title: "Advocate S. Nagendra Naik | NAGA Law Chambers",
  description: "Premier legal representation in Land, Revenue & Property disputes across Andhra Pradesh courts. 7+ years experience, 50+ cases handled.",
  keywords: "land revenue lawyer, property advocate, civil litigation, Anantapur, Andhra Pradesh",
  openGraph: {
    title: "NAGA Law Chambers",
    description: "Defending Land. Legacy. Rights.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${mono.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
