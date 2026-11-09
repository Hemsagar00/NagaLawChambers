import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Landing } from "@/components/home/landing";
import { te } from "@/lib/home-copy";
import { ogImage } from "@/lib/local-seo";
import { teluguEnabled } from "@/lib/features";

export const metadata: Metadata = {
  title: { absolute: te.meta.title },
  description: te.meta.description,
  alternates: {
    canonical: "/te",
    languages: { en: "/", te: "/te", "x-default": "/" },
  },
  openGraph: {
    title: te.meta.title,
    description: te.meta.description,
    url: "/te",
    locale: "te_IN",
    type: "website",
    images: [ogImage],
  },
};

export default function TeluguHomePage() {
  if (!teluguEnabled) notFound();
  return <Landing locale="te" />;
}
