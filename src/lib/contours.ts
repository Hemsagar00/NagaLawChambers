/**
 * Contour lines traced from value noise by marching squares. Used to draw the
 * shared background images of the home page mosaic (see scripts/make-mosaic.ts).
 */
type Pt = [number, number];

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

export function contourPaths(opts: {
  width: number;
  height: number;
  cols: number;
  rows: number;
  levels: number;
  seed: number;
  hill: [number, number];
}): { minor: string; major: string } {
  const { width: W, height: H, cols: COLS, rows: ROWS, levels: LEVELS, seed, hill } = opts;
  const height = (u: number, v: number): number => {
    let n = 0;
    let amp = 0.6;
    let f = 2.4;
    for (let o = 0; o < 3; o++) {
      n += amp * vnoise(u * f * 1.5 + 3.1 + seed, v * f + 7.7 + seed * 1.7);
      amp *= 0.5;
      f *= 2;
    }
    return n + 0.45 * Math.exp(-(((u - hill[0]) ** 2) * 7 + ((v - hill[1]) ** 2) * 10));
  };

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
              return `${p[0].toFixed(0)} ${p[1].toFixed(0)}`;
            })
            .join("L"),
      );
    }
    (k % 5 === 0 ? major : minor).push(parts.join(""));
  }
  return { minor: minor.join(""), major: major.join("") };
}
