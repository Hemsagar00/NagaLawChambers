/**
 * Writes the two shared background images of the home page mosaic.
 * Run: npx tsx scripts/make-mosaic.ts
 * Light (hero) and dark (practice areas) contour maps, 3:2, no text or place names.
 */
import { writeFileSync } from "node:fs";
import { contourPaths } from "../src/lib/contours";

const W = 3000;
const H = 1200;

function svg(opts: { bg: string; minor: string; major: string; seed: number; hill: [number, number]; minorOpacity: number }) {
  const { minor, major } = contourPaths({ width: W, height: H, cols: 150, rows: 60, levels: 24, seed: opts.seed, hill: opts.hill });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="${opts.bg}"/>
<path d="${minor}" fill="none" stroke="${opts.minor}" stroke-width="1.6" stroke-opacity="${opts.minorOpacity}"/>
<path d="${major}" fill="none" stroke="${opts.major}" stroke-width="3"/>
</svg>
`;
}

writeFileSync("public/mosaic-light.svg", svg({ bg: "#ecebe6", minor: "#aaa79d", major: "#8d8a80", seed: 0, hill: [0.72, 0.42], minorOpacity: 0.85 }));
writeFileSync("public/mosaic-dark.svg", svg({ bg: "#161616", minor: "#5a5a5a", major: "#8a8a8a", seed: 5, hill: [0.3, 0.55], minorOpacity: 0.7 }));
console.log("wrote public/mosaic-light.svg and public/mosaic-dark.svg");
