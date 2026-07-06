# Lessons Log

Append-only. Entry schema and compaction rules: [50-knowledge-iteration.md](50-knowledge-iteration.md) §2-3.
Newest entry at the bottom. Do not edit existing entries.

## L-1 | 2026-07-05 | .agents dir is a decoy
- **Trigger:** Environment diagnosis during harness setup found `.agents/` with rule files in another tool's format.
- **Wrong path:** Reading `.agents/rules/*` as active instructions, or "fixing" `.agents/analyze.cjs` (its `srcDir` points at the nonexistent `.agents/src` — the script is broken and unused).
- **Correct path:** Treat `.agents/` as dead weight; the live rules are CLAUDE.md + `.claude/rules/`. Its useful content was migrated into 10-project-conventions.md on 2026-07-05.
- **Rule impact:** none.
