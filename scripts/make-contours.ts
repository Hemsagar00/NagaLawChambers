/**
 * Writes the two contour-line textures used on the home page.
 * Run: npx tsx scripts/make-contours.ts
 * Pale (hero) and navy (closing call to action). No text or place names.
 */
import { writeFileSync } from "node:fs";
import { contourPaths } from "../src/lib/contours";

const W = 2400;
const H = 1200;

function svg(opts: { bg: string | null; minor: string; major: string; seed: number; hill: [number, number]; minorOpacity: number; majorOpacity: number }) {
  const { minor, major } = contourPaths({ width: W, height: H, cols: 120, rows: 60, levels: 22, seed: opts.seed, hill: opts.hill });
  const bg = opts.bg ? `<rect width="${W}" height="${H}" fill="${opts.bg}"/>\n` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">
${bg}<path d="${minor}" fill="none" stroke="${opts.minor}" stroke-width="1.5" stroke-opacity="${opts.minorOpacity}"/>
<path d="${major}" fill="none" stroke="${opts.major}" stroke-width="2.6" stroke-opacity="${opts.majorOpacity}"/>
</svg>
`;
}

writeFileSync("public/contours-light.svg", svg({ bg: null, minor: "#121B60", major: "#121B60", seed: 2, hill: [0.74, 0.4], minorOpacity: 0.09, majorOpacity: 0.18 }));
writeFileSync("public/contours-navy.svg", svg({ bg: "#121B60", minor: "#FFFFFF", major: "#FFFFFF", seed: 7, hill: [0.3, 0.55], minorOpacity: 0.1, majorOpacity: 0.22 }));
console.log("wrote public/contours-light.svg and public/contours-navy.svg");
