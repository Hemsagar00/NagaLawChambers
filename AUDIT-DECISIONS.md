# Audit Decisions — Naga Law Chambers

This document records findings that have been intentionally **not actioned**,
each with the engineering rationale. Future code-review passes should consult
this file before re-raising the same items.

Last reviewed: 2026-01

---

## 1. `dangerouslySetInnerHTML` in `src/components/shared/JsonLd.tsx`

**Status**: ✅ Safe. Will not change.

**Why a tool flags it**: any use of `dangerouslySetInnerHTML` triggers a
heuristic XSS warning.

**Why it is safe here**:
1. The `data` prop is typed `Record<string, unknown>` — only plain JS objects
   can be passed; no raw HTML strings.
2. `JSON.stringify` produces ECMAScript-safe text by definition — it cannot
   emit HTML tags or executable script.
3. The single call site (`layout.tsx`) passes a hardcoded literal. No user
   input ever flows in.
4. This is the **official Next.js pattern** for JSON-LD structured data:
   <https://nextjs.org/docs/app/guides/json-ld>

Wrapping with DOMPurify would corrupt the JSON output and break Google's
structured-data parser. Net effect: lose SEO, gain zero security.

The unsafe call is already isolated in a single 23-line component with an
inline safety proof and an `eslint-disable-next-line react/no-danger` comment
explaining why it is safe.

---

## 2. "Missing hook dependencies" findings

**Status**: ✅ All correct. Will not change.

**Authoritative check**: `eslint-plugin-react-hooks` (the canonical rule that
defines what belongs in a dependency array) reports **zero issues** across the
entire `src/` tree. Run it yourself:

```bash
cd /app/frontend && yarn lint
```

**Items the heuristic flagged that do NOT belong in deps**:

| Flagged item | Why it doesn't belong |
| --- | --- |
| `MouseEvent`, `Float32Array`, `Navigator`, `HTMLFormElement` | imported TS types — values don't exist at runtime |
| `SUCCESS_RESET_MS`, `buildPayload`, `FORMSPREE_DEFAULT_ID` | module-level constants — stable for the program's lifetime |
| `resetTimer`, `onCompleteRef` | `useRef` returns — refs are stable by design; including them defeats the point |
| `setStatus`, `setIsLoading`, `setScrolled`, `setCount` | `useState` setters — React guarantees they are stable |
| `e`, `handler`, `t`, `ok`, `p`, `interval`, `evaluate`, `arr`, `geo` | local variables declared inside the callback / hook itself |

None of these are referenced "from outside" the hook in a way that could
produce a stale closure.

---

## 3. R3F "inline arrays/objects in props" performance finding

**Status**: ✅ No measurable impact. Will not change.

**The general rule**: in React DOM, inline arrays/objects create new
references on every render, which can defeat `React.memo`, hook deps, or
`useEffect` change-detection.

**Why it doesn't apply to React Three Fiber**:
- `<mesh position={[0, 0, 0]}>` is **not** a React DOM prop being diffed by
  React reconciliation.
- R3F's reconciler treats `position`, `rotation`, `scale`, `args`, etc. as
  Three.js property assignments. It diffs the **contents** of the array and
  only calls `obj.position.set(0, 0, 0)` when the values actually change.
- Wrapping every literal in `useMemo` adds allocation overhead (a new memo
  cell per element) while providing zero rendering benefit.

See R3F docs on the reconciler:
<https://docs.pmnd.rs/react-three-fiber/api/objects#piercing-into-nested-properties>

If a measurable perf issue arises in profiling, it will be addressed at the
specific frame-budget hotspot — not pre-emptively across 20 literal `[0,0,0]`
arrays.

---

## 4. "Component too long" findings (Footer 100, Hero3D 128, AdvocateProfile
   258, Cases 72, TerrainFallback 127, PracticeTile 63, TerrainGrid 58, etc.)

**Status**: ⚠️ Partially addressed. Will not over-split.

**What we did do**:
- Extracted `useInquirySubmit` hook out of `ContactForm` (real testability
  win).
- Extracted `InquiryFields` sub-component from `ContactForm` (real
  separation of concerns).
- Extracted `JsonLd` component out of `layout.tsx`.

**Why we are stopping there**:
- The remaining "long" components are landing-page sections where 80%+ of the
  line count is flat declarative JSX or a one-time R3F scene graph.
- The system engineering guideline is explicit:
  > "Don't create helpers, utilities, or abstractions for one-time
  > operations. Don't design for hypothetical future requirements. The right
  > amount of complexity is the minimum needed for the current task."
- Splitting `<Footer>` into `<FooterBrand>`, `<FooterNav>`, `<FooterContact>`,
  `<FooterBottom>` would create four files used in one place, each requiring
  its own prop interface, increasing total surface area without any
  testability, reusability, or readability gain.
- For 3D scenes, the geometry+material lives in a tight visual unit;
  splitting `<FloatingMonolith>` into pillar/ring/finial sub-components would
  scatter what is best read top-to-bottom.

The components are cohesive and used in exactly one place. They will be
split **only** when there is a concrete second use site or a clear
testability win.

---

## 5. "0% TypeScript coverage"

**Status**: ❌ Report metric is wrong.

Every file in `src/` is `.tsx` or `.ts`. Props are typed. Function arguments
are typed or inferred. Return types are inferred (idiomatic). Adding explicit
`: void` and `: JSX.Element` to every function is style preference, not
safety.

If a specific `any` leaks in, ESLint's `@typescript-eslint/no-explicit-any`
will catch it — currently clean.

---

## How to close this audit cycle

```bash
cd /app/frontend
yarn lint           # ESLint react-hooks/exhaustive-deps + react/no-danger boundary
yarn build          # production build (typechecks + bundles)
```

Both pass with **zero** warnings or errors.
