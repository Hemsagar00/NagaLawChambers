"use client";

import { useState, useRef, useCallback } from "react";

export type InquiryStatus = "idle" | "submitting" | "sent" | "error";

export type InquiryPayload = {
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
};

const SUCCESS_RESET_MS = 5500;
const FORMSPREE_DEFAULT_ID = "mnqevwqr";

function buildPayload(form: HTMLFormElement): InquiryPayload {
  const data = new FormData(form);
  return {
    name: String(data.get("name") || ""),
    email: String(data.get("email") || ""),
    phone: String(data.get("phone") || "") || null,
    service: String(data.get("service") || "") || null,
    message: String(data.get("message") || ""),
  };
}

async function postBackend(payload: InquiryPayload): Promise<boolean> {
  try {
    const res = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function postFormspree(form: HTMLFormElement): Promise<boolean> {
  const id = process.env.NEXT_PUBLIC_FORMSPREE_ID || FORMSPREE_DEFAULT_ID;
  try {
    const res = await fetch(`https://formspree.io/f/${id}`, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Encapsulates the contact-form submission pipeline:
 *   1. Try the FastAPI backend (Mongo-persisted, primary).
 *   2. Fall back to Formspree (covers static export deploys).
 *   3. Surface an error otherwise — UI handles retry.
 *
 * Returns `{ status, submit }` so the form component stays purely presentational.
 */
export function useInquirySubmit() {
  const [status, setStatus] = useState<InquiryStatus>("idle");
  const resetTimer = useRef<number | null>(null);

  const scheduleReset = useCallback(() => {
    if (resetTimer.current) window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => {
      setStatus("idle");
      resetTimer.current = null;
    }, SUCCESS_RESET_MS);
  }, []);

  const submit = useCallback(
    async (form: HTMLFormElement) => {
      setStatus("submitting");
      const payload = buildPayload(form);

      const ok =
        (await postBackend(payload)) || (await postFormspree(form));

      if (ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
      scheduleReset();
    },
    [scheduleReset]
  );

  return { status, submit } as const;
}
