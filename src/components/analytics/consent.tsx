"use client";

import { useEffect, useState } from "react";
import { GoogleTagManager } from "@/components/analytics/google-tag-manager";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";

const KEY = "naga-analytics-consent";
type Choice = "granted" | "denied" | null;

function read(): Choice {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/**
 * Loads analytics scripts only after the visitor accepts, and shows a short
 * notice until they choose. Without a choice, no third-party script loads.
 */
export function ConsentAndAnalytics() {
  const [choice, setChoice] = useState<Choice>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setChoice(read());
    setReady(true);
  }, []);

  function save(v: "granted" | "denied") {
    try {
      window.localStorage.setItem(KEY, v);
    } catch {
      /* private mode: choice lasts for this visit only */
    }
    setChoice(v);
  }

  return (
    <>
      {choice === "granted" ? (
        <>
          <GoogleTagManager />
          <GoogleAnalytics />
        </>
      ) : null}
      {ready && choice === null ? (
        <div
          role="dialog"
          aria-label="Cookie notice"
          className="fixed inset-x-3 bottom-[88px] z-[60] mx-auto max-w-[560px] rounded-2xl border border-rule bg-paper-2 p-4 shadow-[0_12px_40px_-12px_oklch(26.9%_0.121_270/0.35)] md:bottom-4 md:left-4 md:right-auto md:mx-0"
        >
          <p className="text-sm leading-relaxed text-ink-2">
            We use Google Analytics cookies to see which pages help visitors. They load only if you accept.{" "}
            <a href="/privacy" className="inline-flex min-h-11 items-center font-medium text-ink underline underline-offset-4">
              Privacy policy
            </a>
          </p>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={() => save("granted")} className="naga-button naga-button-primary !min-h-11 !px-5">
              Accept
            </button>
            <button type="button" onClick={() => save("denied")} className="naga-button naga-button-secondary !min-h-11 !px-5">
              Decline
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
