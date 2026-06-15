import { site } from "@/lib/site";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LegalService",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        telephone: site.contact.phoneTel,
        email: site.contact.email,
        image: `${site.url}/advocate.jpg`,
        description: `Advocate ${site.advocate.name} — legal representation in revenue, land, civil, criminal, and family matters across Andhra Pradesh courts.`,
        address: {
          "@type": "PostalAddress",
          streetAddress: "District Court Premises",
          addressLocality: "Anantapur",
          addressRegion: "Andhra Pradesh",
          postalCode: "515001",
          addressCountry: "IN",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Anantapur, Andhra Pradesh",
        },
        founder: { "@id": `${site.url}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.advocate.name,
        jobTitle: site.advocate.title,
        image: `${site.url}/advocate.jpg`,
        telephone: site.contact.phoneTel,
        email: site.contact.email,
        worksFor: { "@id": `${site.url}/#organization` },
        alumniOf: site.advocate.barCouncil,
        knowsAbout: [
          "Revenue Law",
          "Land Disputes",
          "Civil Litigation",
          "Criminal Bail",
          "Family Law",
          "Consumer Law",
        ],
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