import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/site";
import { practicePages, locationPages } from "@/lib/local-seo";
import { teluguEnabled } from "@/lib/features";
import { getBlogPostSlugs } from "@/lib/blog-posts";

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

  const blogEntries: MetadataRoute.Sitemap = getBlogPostSlugs().map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/book-consultation`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...(teluguEnabled
      ? [
          {
            url: `${baseUrl}/te`,
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: 0.9,
          },
        ]
      : []),
    ...practiceEntries,
    ...locationEntries,
    ...blogEntries,
  ];
}
