"use client";

/**
 * Static, GPU-free fallback for the 3D scene.
 * Used on small viewports, low-power devices, or when the user has
 * `prefers-reduced-motion: reduce` enabled.
 *
 * Visually mirrors the emerald-and-gold language of TerrainScene
 * (deep emerald base + radial gold glow + SVG perspective grid +
 * a faint static "scales" glyph) so the hero composition still reads
 * as a futuristic legal-tech surface — without WebGL.
 */
export default function TerrainFallback() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      data-testid="terrain-fallback"
      aria-hidden="true"
    >
      {/* Base */}
      <div className="absolute inset-0 bg-[#02100c]" />

      {/* Radial gold glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(212,175,55,0.18) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(11,61,46,0.55) 0%, transparent 60%)",
        }}
      />

      {/* SVG perspective grid */}
      <svg
        className="absolute inset-x-0 bottom-0 w-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="grid-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
            <stop offset="40%" stopColor="#D4AF37" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="grid-mask" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Horizontal lines (recede toward horizon) */}
        {Array.from({ length: 14 }).map((_, i) => {
          const t = i / 13;
          const y = 240 + Math.pow(t, 1.6) * 360;
          return (
            <line
              key={`h${i}`}
              x1={0}
              y1={y}
              x2={1200}
              y2={y}
              stroke="url(#grid-fade)"
              strokeWidth={0.75}
            />
          );
        })}

        {/* Vanishing vertical lines */}
        {Array.from({ length: 25 }).map((_, i) => {
          const x = (i / 24) * 1200;
          return (
            <line
              key={`v${i}`}
              x1={x}
              y1={240}
              x2={600 + (x - 600) * 3.2}
              y2={600}
              stroke="url(#grid-fade)"
              strokeWidth={0.6}
            />
          );
        })}
      </svg>

      {/* Faint static "scales" glyph */}
      <svg
        className="absolute left-1/2 top-[18%] -translate-x-1/2 opacity-30"
        width="120"
        height="160"
        viewBox="0 0 120 160"
        fill="none"
      >
        <line
          x1="60"
          y1="10"
          x2="60"
          y2="150"
          stroke="#D4AF37"
          strokeWidth="1.2"
        />
        <line
          x1="20"
          y1="40"
          x2="100"
          y2="40"
          stroke="#D4AF37"
          strokeWidth="1.2"
        />
        <ellipse
          cx="22"
          cy="68"
          rx="18"
          ry="3"
          stroke="#E6C965"
          strokeWidth="1"
          fill="none"
        />
        <ellipse
          cx="98"
          cy="68"
          rx="18"
          ry="3"
          stroke="#E6C965"
          strokeWidth="1"
          fill="none"
        />
        <circle cx="60" cy="6" r="3" fill="#FFE9A8" />
      </svg>

      {/* Soft scanline overlay for "tech" feel */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 1px, transparent 3px)",
        }}
      />
    </div>
  );
}
