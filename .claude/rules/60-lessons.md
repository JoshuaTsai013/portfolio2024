# Lessons Log

Append-only. Entry schema and compaction rules: [50-knowledge-iteration.md](50-knowledge-iteration.md) §2-3.
Newest entry at the bottom. Do not edit existing entries.

## L-1 | 2026-07-05 | .agents dir is a decoy
- **Trigger:** Environment diagnosis during harness setup found `.agents/` with rule files in another tool's format.
- **Wrong path:** Reading `.agents/rules/*` as active instructions, or "fixing" `.agents/analyze.cjs` (its `srcDir` points at the nonexistent `.agents/src` — the script is broken and unused).
- **Correct path:** Treat `.agents/` as dead weight; the live rules are CLAUDE.md + `.claude/rules/`. Its useful content was migrated into 10-project-conventions.md on 2026-07-05.
- **Rule impact:** none.

## L-4 | 2026-07-07 | sessions committed straight onto Develop
- **Trigger:** A prior session made 9 commits directly on `Develop`; user wanted Claude's work isolated on a branch. Rescue also revealed the harness itself (CLAUDE.md + `.claude/`) was inside that bundle (commit a7bb3dc), so resetting Develop removed the harness from Develop's tree.
- **Wrong path:** Committing task work onto shared `Develop`, forcing a later branch-and-reset rescue; not noticing the harness commit was entangled with feature commits.
- **Correct path:** Cut a `claude/<topic>` branch off `Develop` before editing; merges happen on the user's call (now Rule N7). The harness must be merged onto `Develop`/`main` to govern sessions that start there.
- **Rule impact:** added Rule N7 + rewrote 10-project-conventions.md §4 first bullet (approved 2026-07-07).
