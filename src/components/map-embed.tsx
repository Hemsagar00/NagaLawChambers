import { mapEmbedSrc, mapHref, site } from "@/lib/site";

/** Keyless Google Maps embed of the chamber location (no API key required). */
export function MapEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={`naga-map-frame ${className}`}>
      <iframe
        src={mapEmbedSrc}
        title={`Map to ${site.name}, ${site.contact.office}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <a
        href={mapHref}
        target="_blank"
        rel="noopener noreferrer"
        className="naga-map-link"
      >
        Open in Google Maps →
      </a>
    </div>
  );
}
