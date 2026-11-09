import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { brandColors } from "@/lib/brand-colors";

export const alt =
  "NAGA Law Chambers, Advocate S. Nagendra Naik, Anantapur, Andhra Pradesh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card, shared by Open Graph and Twitter. Paper, ink and one tangerine
 * band, matching the site. Colours are literals because the image renderer
 * cannot read CSS tokens.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: brandColors.paper,
          color: brandColors.ink,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", width: 24, background: brandColors.accent }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            padding: "64px 72px",
          }}
        >
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>
            Naga Law Chambers
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 96,
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: -3,
              }}
            >
              Defending land,
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 96,
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: -3,
              }}
            >
              legacy &amp; rights.
            </div>
            <div style={{ display: "flex", marginTop: 28, fontSize: 34, color: brandColors.muted }}>
              Advocate {site.advocate.name}, Anantapur Bar
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: `2px solid ${brandColors.ink}`,
              paddingTop: 24,
              fontSize: 28,
              color: brandColors.ink2,
            }}
          >
            <div style={{ display: "flex" }}>Revenue, land, civil, criminal, family and consumer law</div>
            <div style={{ display: "flex", fontWeight: 700 }}>{site.contact.phoneDisplay}</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
