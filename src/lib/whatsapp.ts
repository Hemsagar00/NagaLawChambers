import { site } from "@/lib/site";

/**
 * WhatsApp click-to-chat helpers — single source of truth for the
 * floating button, sticky bar, and intake form. No backend required:
 * leads are routed straight into the advocate's WhatsApp.
 */

export const defaultWhatsappMessage = `Hello, I'd like to consult Advocate ${site.advocate.name} regarding a legal matter.`;

export function buildWhatsappHref(message: string = defaultWhatsappMessage): string {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export type IntakeDetails = {
  name: string;
  phone: string;
  caseType: string;
  message: string;
};

export function buildIntakeMessage({
  name,
  phone,
  caseType,
  message,
}: IntakeDetails): string {
  return [
    "New consultation request — NAGA Law Chambers",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Matter: ${caseType}`,
    message.trim() ? `Details: ${message.trim()}` : null,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}
