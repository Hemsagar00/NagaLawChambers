import { site } from "@/lib/site";

export type Crumb = { name: string; path: string };

/**
 * Per-page WebPage + BreadcrumbList schema for landing pages, tied back to
 * the firm/person graph defined in the root JsonLd.
 */
export function PageJsonLd({
  title,
  description,
  path,
  crumbs,
}: {
  title: string;
  description: string;
  path: string;
  crumbs: Crumb[];
}) {
  const url = `${site.url}${path}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": `${site.url}/#organization` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: crumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: `${site.url}${crumb.path}`,
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
