/**
 * Event wrapper that fires to both Google Analytics (gtag) AND Google Tag
 * Manager (dataLayer.push). SSR-safe; silently no-ops on the server or before
 * the loaders attach. One call → both destinations, so GTM triggers like
 * "Custom Event = lead_submit" work without changing call sites.
 */

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: name, ...params });
  }
}
