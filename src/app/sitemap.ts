import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/site";
import { practicePages, locationPages } from "@/lib/local-seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const practiceEntries: MetadataRoute.Sitemap = practicePages.map((page) => ({
    url: `${baseUrl}/practice/${page.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const locationEntries: MetadataRoute.Sitemap = locationPages.map((page) => ({
    url: `${baseUrl}/locations/${page.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...practiceEntries,
    ...locationEntries,
  ];
}
