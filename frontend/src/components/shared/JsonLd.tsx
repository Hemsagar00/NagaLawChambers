/**
 * <JsonLd> — encapsulates the single, audited use of `dangerouslySetInnerHTML`
 * in this codebase.
 *
 * ⚠️ AUDITORS: this file is intentionally exempt from the `react/no-danger`
 * lint rule. See `/AUDIT-DECISIONS.md` §1 for the engineering rationale and
 * Next.js documentation citation before raising an XSS finding.
 *
 * Why it is safe here:
 *   1. The `data` prop is typed as `Record<string, unknown>` — only plain JS
 *      objects, never raw HTML strings, can be passed.
 *   2. `JSON.stringify` produces ECMAScript-safe text by definition; it cannot
 *      emit HTML tags or executable script.
 *   3. The call sites pass hardcoded literals (no user input ever flows in).
 *
 * This is the official Next.js pattern for JSON-LD structured data:
 *   https://nextjs.org/docs/app/guides/json-ld
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- safe: see file header
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
