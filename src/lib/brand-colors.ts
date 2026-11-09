/**
 * The site's colours as hex, for the generated images (favicon and social card)
 * whose renderer cannot read CSS custom properties. They are the sRGB values of
 * the oklch tokens in src/app/tokens.css; change both together.
 */
export const brandColors = {
  paper: "#f5f1ea",
  ink: "#14110f",
  ink2: "#2c2825",
  muted: "#58514c",
  accent: "#fc6b33",
} as const;
