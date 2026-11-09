/**
 * A survey map generated in code: contour lines traced from noise by marching
 * squares, hedges, a wall, water, a lane, and a holding edged in the accent.
 * It is schematic: it carries no place names, heights or distances.
 * The five pins mark the forums a revenue matter moves through, in order.
 */

const W = 1200;
const H = 800;
const COLS = 72;
const ROWS = 48;
const LEVELS = 16;

function hash(ix: number, iy: number): number {
  let h = Math.imul(ix, 374761393) + Math.imul(iy, 668265263) + 1013904223;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}
const smooth = (t: number) => t * t * (3 - 2 * t);
function vnoise(x: number, y: number): number {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = smooth(x - x0);
  const fy = smooth(y - y0);
  const a = hash(x0, y0);
  const b = hash(x0 + 1, y0);
  const c = hash(x0, y0 + 1);
  const d = hash(x0 + 1, y0 + 1);
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}
function height(u: number, v: number): number {
  let n = 0;
  let amp = 0.6;
  let f = 2.4;
  for (let o = 0; o < 3; o++) {
    n += amp * vnoise(u * f * 1.5 + 3.1, v * f + 7.7);
    amp *= 0.5;
    f *= 2;
  }
  return n + 0.45 * Math.exp(-(((u - 0.64) ** 2) * 7 + ((v - 0.42) ** 2) * 10));
}

type Pt = [number, number];

function buildContours(): { minor: string; major: string } {
  const grid: number[][] = [];
  let lo = Infinity;
  let hi = -Infinity;
  for (let j = 0; j <= ROWS; j++) {
    const row: number[] = [];
    for (let i = 0; i <= COLS; i++) {
      const v = height(i / COLS, j / ROWS);
      row.push(v);
      lo = Math.min(lo, v);
      hi = Math.max(hi, v);
    }
    grid.push(row);
  }
  const cw = W / COLS;
  const ch = H / ROWS;
  const minor: string[] = [];
  const major: string[] = [];

  for (let k = 1; k < LEVELS; k++) {
    const L = lo + ((hi - lo) * k) / LEVELS;
    const points = new Map<string, Pt>();
    const adj = new Map<string, string[]>();
    const link = (a: string, b: string) => {
      (adj.get(a) ?? adj.set(a, []).get(a)!).push(b);
      (adj.get(b) ?? adj.set(b, []).get(b)!).push(a);
    };
    for (let j = 0; j < ROWS; j++) {
      for (let i = 0; i < COLS; i++) {
        const a = grid[j][i];
        const b = grid[j][i + 1];
        const c = grid[j + 1][i + 1];
        const d = grid[j + 1][i];
        const idx = (a > L ? 8 : 0) + (b > L ? 4 : 0) + (c > L ? 2 : 0) + (d > L ? 1 : 0);
        if (idx === 0 || idx === 15) continue;
        const edge = (name: "t" | "r" | "b" | "l"): string => {
          let key = "";
          let p: Pt = [0, 0];
          if (name === "t") {
            const t = (L - a) / (b - a);
            key = `h${i},${j}`;
            p = [(i + t) * cw, j * ch];
          } else if (name === "b") {
            const t = (L - d) / (c - d);
            key = `h${i},${j + 1}`;
            p = [(i + t) * cw, (j + 1) * ch];
          } else if (name === "l") {
            const t = (L - a) / (d - a);
            key = `v${i},${j}`;
            p = [i * cw, (j + t) * ch];
          } else {
            const t = (L - b) / (c - b);
            key = `v${i + 1},${j}`;
            p = [(i + 1) * cw, (j + t) * ch];
          }
          points.set(key, p);
          return key;
        };
        const seg = (e1: "t" | "r" | "b" | "l", e2: "t" | "r" | "b" | "l") => link(edge(e1), edge(e2));
        switch (idx) {
          case 1: case 14: seg("l", "b"); break;
          case 2: case 13: seg("b", "r"); break;
          case 3: case 12: seg("l", "r"); break;
          case 4: case 11: seg("t", "r"); break;
          case 5: seg("t", "l"); seg("b", "r"); break;
          case 6: case 9: seg("t", "b"); break;
          case 7: case 8: seg("t", "l"); break;
          case 10: seg("t", "r"); seg("l", "b"); break;
        }
      }
    }
    const seen = new Set<string>();
    const parts: string[] = [];
    const walk = (start: string) => {
      const chain: string[] = [start];
      seen.add(start);
      let cur = start;
      for (;;) {
        const next = (adj.get(cur) ?? []).find((n) => !seen.has(n));
        if (!next) break;
        seen.add(next);
        chain.push(next);
        cur = next;
      }
      return chain;
    };
    // start chains from open ends first, then from anywhere left (closed loops)
    const keys = [...adj.keys()];
    const order = [...keys.filter((key) => (adj.get(key) ?? []).length === 1), ...keys];
    for (const key of order) {
      if (seen.has(key)) continue;
      const chain = walk(key);
      if (chain.length < 3) continue;
      parts.push(
        "M" +
          chain
            .map((c) => {
              const p = points.get(c)!;
              return `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
            })
            .join("L"),
      );
    }
    (k % 5 === 0 ? major : minor).push(parts.join(""));
  }
  return { minor: minor.join(""), major: major.join("") };
}

const { minor, major } = buildContours();

export type MapStop = {
  label: string;
  shape: "disc" | "diamond" | "triangle";
  x: number;
  y: number;
  side?: "left";
};

export const MAP_STOPS: MapStop[] = [
  { label: "Tahsildar", shape: "disc", x: 175, y: 590 },
  { label: "RDO", shape: "disc", x: 315, y: 450 },
  { label: "Collector", shape: "disc", x: 475, y: 525 },
  { label: "District Court", shape: "diamond", x: 625, y: 365, side: "left" },
  { label: "High Court", shape: "triangle", x: 770, y: 215, side: "left" },
];

const ROUTE =
  "M175 590 C 225 500 265 465 315 450 S 420 545 475 525 S 570 410 625 365 S 720 255 770 215";
const HOLDING = "M105 215 L540 140 L790 235 L930 120 L1060 330 L930 640 L420 690 L150 520 Z";

export function SurveyMap() {
  return (
    <div className="map">
      <svg
        className="map__svg"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <pattern id="hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="7" stroke="var(--color-ink)" strokeWidth="1.6" />
          </pattern>
          <mask id="route-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="800">
            <path className="route" pathLength={1} d={ROUTE} fill="none" stroke="var(--color-sheet)" strokeWidth="10" strokeDasharray="1" strokeLinecap="round" />
          </mask>
          <linearGradient id="crease" x1="0" x2="1">
            <stop offset="0" stopColor="var(--color-ink)" stopOpacity="0.035" />
            <stop offset="0.45" stopColor="var(--color-sheet)" stopOpacity="0.28" />
            <stop offset="1" stopColor="var(--color-sheet)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width={W} height={H} fill="var(--color-paper-3)" />
        <path d={minor} fill="none" stroke="var(--color-contour)" strokeWidth="1" strokeOpacity="0.75" />
        <path d={major} fill="none" stroke="var(--color-contour)" strokeWidth="1.8" />
        <path d="M-20 705 C 250 640 520 765 800 690 S 1110 635 1230 700" fill="none" stroke="var(--color-water)" strokeWidth="5" strokeOpacity="0.8" strokeLinecap="round" />
        <path d="M-20 725 C 250 662 520 786 800 712 S 1110 657 1230 722" fill="none" stroke="var(--color-water)" strokeWidth="2" strokeOpacity="0.5" strokeLinecap="round" />
        <path d={HOLDING} fill="var(--color-accent)" fillOpacity="0.07" stroke="var(--color-accent)" strokeWidth="4" strokeLinejoin="round" />
        <path d="M150 520 L420 330 L540 140 M420 330 L790 235 M420 330 L520 690 M790 235 L760 640" fill="none" stroke="var(--color-hedge)" strokeWidth="2.4" strokeDasharray="2 6" strokeLinecap="round" />
        <path d="M930 120 L930 640" fill="none" stroke="var(--color-ink)" strokeWidth="1.6" />
        <rect x="560" y="560" width="64" height="38" fill="url(#hatch)" stroke="var(--color-ink)" strokeWidth="1.4" />
        <rect x="640" y="548" width="38" height="50" fill="url(#hatch)" stroke="var(--color-ink)" strokeWidth="1.4" />
        <path d="M505 700 L548 600 M531 700 L572 600" fill="none" stroke="var(--color-ink)" strokeWidth="1.4" />
        <rect x="390" y="0" width="46" height={H} fill="url(#crease)" />
        <rect x="800" y="0" width="46" height={H} fill="url(#crease)" />
        <path d={ROUTE} fill="none" stroke="var(--color-ink)" strokeWidth="3" strokeDasharray="10 9" strokeLinecap="round" mask="url(#route-mask)" />
      </svg>

      <ol className="map__pins" aria-label="Forums a revenue matter moves through, in order">
        {MAP_STOPS.map((stop, i) => (
          <li
            key={stop.label}
            className={`pin${i === 0 ? " pin--open" : ""}`}
            style={{
              left: `${(stop.x / W) * 100}%`,
              top: `${(stop.y / H) * 100}%`,
              ["--i" as string]: i,
            }}
          >
            <span className={`pin__mark pin__mark--${stop.shape}`} aria-hidden="true" />
            <span className={`pin__tag${stop.side === "left" ? " pin__tag--left" : ""}`}>
              <span className="pin__num">{i + 1}</span>
              <span className="pin__name">{stop.label}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
