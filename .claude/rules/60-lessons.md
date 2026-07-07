# Lessons Log

Append-only. Entry schema and compaction rules: [50-knowledge-iteration.md](50-knowledge-iteration.md) §2-3.
Newest entry at the bottom. Do not edit existing entries.

## L-1 | 2026-07-05 | .agents dir is a decoy
- **Trigger:** Environment diagnosis during harness setup found `.agents/` with rule files in another tool's format.
- **Wrong path:** Reading `.agents/rules/*` as active instructions, or "fixing" `.agents/analyze.cjs` (its `srcDir` points at the nonexistent `.agents/src` — the script is broken and unused).
- **Correct path:** Treat `.agents/` as dead weight; the live rules are CLAUDE.md + `.claude/rules/`. Its useful content was migrated into 10-project-conventions.md on 2026-07-05.
- **Rule impact:** none.

## L-2 | 2026-07-06 | lint baseline is broken
- **Trigger:** First `yarn lint` of the performance-floor session failed with 77 pre-existing errors (prop-types, unused vars) across ~20 files on a clean tree at a7bb3dc.
- **Wrong path:** Treating matrix D-2 ("yarn lint exits 0") as satisfiable per-task, or fixing all 77 errors as scope creep inside an unrelated task.
- **Correct path:** Until the baseline is fixed, gate on `yarn build` + per-changed-file eslint proving zero NEW errors (compare against `git show <base>:<path>`); propose the 77-error cleanup to the user as its own task.
- **Rule impact:** none (the fix is repo work, not a rule change; D-2 becomes literal again once the baseline task lands).

## L-3 | 2026-07-06 | three is model-viewer peer dep
- **Trigger:** Removing "dead" deps `three`/`react-bootstrap` broke `yarn build`: `@google/model-viewer` imports `three` as an external peer, and one unused `import Model` in src/pages/home/index.jsx kept that whole chain in the bundle graph.
- **Wrong path:** Trusting an Explore report that called `three` "pure dead dependency" without tracing the import graph; nearly re-adding `three` to fix the build.
- **Correct path:** Delete the unused import chain first (home/index.jsx dead imports), then remove the dep — bundle dropped 1,391KB → 383KB; an unused top-level import still pulls its full dependency tree into a Vite build.
- **Rule impact:** none.

## L-4 | 2026-07-07 | sessions committed straight onto Develop
- **Trigger:** A prior session made 9 commits directly on `Develop`; user wanted Claude's work isolated on a branch. Rescue also revealed the harness itself (CLAUDE.md + `.claude/`) was inside that bundle (commit a7bb3dc), so resetting Develop removed the harness from Develop's tree.
- **Wrong path:** Committing task work onto shared `Develop`, forcing a later branch-and-reset rescue; not noticing the harness commit was entangled with feature commits.
- **Correct path:** Cut a `claude/<topic>` branch off `Develop` before editing; merges happen on the user's call (now Rule N7). The harness must be merged onto `Develop`/`main` to govern sessions that start there.
- **Rule impact:** added Rule N7 + rewrote 10-project-conventions.md §4 first bullet (approved 2026-07-07).
