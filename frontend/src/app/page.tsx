"use client";

import dynamic from "next/dynamic";

const HomeContent = dynamic(() => import("@/components/HomeContent"), {
  ssr: false,
  loading: () => (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at center, #04150f 0%, #02100c 50%, #0a0a12 100%)",
      }}
    >
      <p
        className="text-[10px] tracking-[0.42em] uppercase font-mono"
        style={{ color: "#d4af37" }}
      >
        Naga Law Chambers
      </p>
      <p
        className="mt-6 font-heading text-6xl"
        style={{ color: "#f8fafc" }}
      >
        Initialising
      </p>
    </div>
  ),
});

export default function Page() {
  return <HomeContent />;
}
