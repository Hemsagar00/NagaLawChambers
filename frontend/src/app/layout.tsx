import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Advocate S. Nagendra Naik | NAGA Law Chambers",
  description: "Premier legal representation in Land, Revenue & Property disputes across Andhra Pradesh courts. 7+ years experience, 50+ cases handled.",
  keywords: ["land revenue lawyer", "property advocate", "civil litigation", "Anantapur", "Andhra Pradesh"],
  openGraph: {
    title: "NAGA Law Chambers",
    description: "Defending Land. Legacy. Rights.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body className="min-h-screen bg-[#0a0a12] text-[#f0f0f5] font-sans">
        {children}
      </body>
    </html>
  );
}
