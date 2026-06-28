/**
 * Lightweight GA4 event wrapper. SSR-safe no-op until gtag is present
 * (i.e. until NEXT_PUBLIC_GA_ID is set and the GA script has loaded).
 */

type GtagEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: string, params: GtagEventParams = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
