import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt =
  "NAGA Law Chambers — Advocate S. Nagendra Naik, Anantapur & Dharmavaram";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded 1200×630 social card (dark + gold), shared by OG and Twitter. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(ellipse at 15% 0%, rgba(30,58,138,0.22), transparent 55%), radial-gradient(ellipse at 95% 100%, rgba(0,229,255,0.14), transparent 55%), linear-gradient(135deg, #050508 0%, #0a0f1c 55%, #050508 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 16,
              border: "1px solid rgba(212,175,55,0.35)",
              background: "rgba(212,175,55,0.08)",
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
              <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
              <path d="M7 21h10" />
              <path d="M12 3v18" />
              <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
            </svg>
          </div>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#d4af37",
            }}
          >
            Bar Council of Andhra Pradesh
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 78, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2 }}>
            NAGA Law Chambers
          </div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 34, color: "#cbd5e1" }}>
            Advocate {site.advocate.name}
          </div>
          <div style={{ display: "flex", marginTop: 14, fontSize: 24, color: "#94a3b8" }}>
            Revenue · Land · Civil · Criminal · Family · Consumer
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(212,175,55,0.18)",
            paddingTop: 28,
            fontSize: 24,
            color: "#cbd5e1",
          }}
        >
          <div style={{ display: "flex" }}>Anantapur &amp; Dharmavaram, Andhra Pradesh</div>
          <div style={{ display: "flex", color: "#d4af37" }}>{site.contact.phoneDisplay}</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
