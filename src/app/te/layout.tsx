import { Noto_Sans_Telugu } from "next/font/google";

const teFont = Noto_Sans_Telugu({
  variable: "--font-te",
  subsets: ["telugu", "latin"],
  display: "swap",
});

/** Loads the Telugu typeface only for /te, so the English pages stay light. */
export default function TeLayout({ children }: { children: React.ReactNode }) {
  return <div className={teFont.variable}>{children}</div>;
}
