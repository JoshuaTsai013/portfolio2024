# Project Conventions

Code and workflow conventions for this repo. Rules N1–N6 in [CLAUDE.md](../../CLAUDE.md)
always apply; this file adds the how.

## 1. Component style (also the refactor standard for template T3)

- Reusable components live under `src/components/`, some as `<Name>/` folders, some as bare
  `<Name>.jsx` files (e.g. `SmoothScroll.jsx`). Follow the existing location of whatever you
  are editing; NEVER relocate an existing file to "normalize" the layout — moving files
  breaks imports and is not part of any tidy refactor. New reusables: prefer a folder.
  Page-local pieces stay inside `src/pages/<page>/`.
- File layout inside a component, top to bottom, separated by banner comments:
  `// ─── Static data ───`, `// ─── Helpers ───`, `// ─── Sub-components ───`,
  `// ─── Main component ───`.
- Static arrays/objects that don't depend on props/state: hoist to module level,
  `SCREAMING_SNAKE_CASE`.
- Any literal used more than once (numbers, easing arrays, durations) becomes a named
  constant. Durations shared between a motion transition and a `setTimeout` MUST be one
  constant — they drift apart otherwise.
- Two or more motion elements sharing identical `initial/animate/transition`: extract a
  variants factory function and spread it.
- JSX blocks > ~5 lines that don't depend on parent state: extract to a named sub-component
  in the same file.
- Single quotes, self-close empty elements, no commented-out dead code, comments in English
  (Rule N1). JSX only — do not introduce TypeScript files.

## 2. Animation & scroll — the sharp edges

- Import animation APIs from `"motion/react"`. Never add or import `framer-motion`.
- Read scroll position ONLY via `useScrollValue()` from
  [src/contexts/ScrollContext.jsx](../../src/contexts/ScrollContext.jsx). Never
  `window.scrollY`, never motion's `useScroll()` — the page scroll is hijacked by
  locomotive-scroll (details: [90-handover-letter.md](90-handover-letter.md) §1.1).
- `useScrollValue()` throws outside `ScrollProvider` — anything using it must render inside
  the provider tree in [src/App.jsx](../../src/App.jsx).
- `SmoothScroll.jsx`, `ScrollContext.jsx`, and the route block of `App.jsx` are
  **load-bearing**: changes there require ASKING the user before acting (matrix C-3) and the
  isolated-verification path ([20-model-dispatch.md](20-model-dispatch.md) §4).
- New page checklist: folder under `src/pages/<name>/` → route added in `App.jsx` → uses
  `useScrollValue` for scroll-driven effects → link from home page if it's a project page.

## 3. Workflow rules migrated from the deprecated `.agents/` dir (2026-07-05)

- Never run `yarn dev` / `yarn preview` / any server on your own initiative (= Rule N2).
  The user keeps their own browser and dev server; starting another causes port conflicts.
- Browser-based checking only when the user explicitly asks you to verify something there.
- Comments in English (= Rule N1). The old "respond in english" rule is superseded: respond
  in the user's language (they write Traditional Chinese).
- The old tidy-component workflow is condensed into §1 above; `.agents/` itself is a decoy —
  do not read it for guidance (lesson L-1).

## 4. Git & delivery

- Work on `Develop`. `main` receives merges/PRs. Never commit or push unprompted (Rule N6).
- Commit message: single lowercase imperative line, optionally `tweak:`/`fix:` prefixed,
  matching existing history (`git log --oneline -10` before writing one).
- Deliver every task with the DONE checklist from
  [30-judgment-matrix.md](30-judgment-matrix.md) §2, including the UNVERIFIED VISUALLY line
  when applicable.
