# Delegation Prompt Templates

Fill-in-the-blank prompts for dispatching subagents. Rules governing WHEN to dispatch and
which model: [20-model-dispatch.md](20-model-dispatch.md). Replace every `{…}` slot; delete
optional lines you don't need. Keep the three-piece structure (Goal/Criteria/Report) intact —
if you can't fill a slot, the task isn't ready to delegate.

Mechanics reminder:
- Agent tool → `subagent_type`: `Explore` for read-only search, `general-purpose` for work;
  `model`: `haiku` | `sonnet` | `opus` per dispatch §1.
- Subagents do not see your conversation. They do read CLAUDE.md, so cite rules by ID
  (e.g. "Rule N2"), and give absolute-from-repo paths like `src/components/SmoothScroll.jsx`.
- Run verification dispatches with `run_in_background: false` — you need the result to proceed.

---

## T1 — Search / Research  (subagent_type: Explore, model: sonnet)

```text
GOAL: Answer this question about the repo: {one-sentence question}.
Background: {1-2 lines: why the commander needs this}.
Search breadth: {medium | very thorough}.
Start from: {paths or naming patterns, e.g. src/components/, "anything importing ScrollContext"}.

ACCEPTANCE CRITERIA:
1. Every claim in the answer cites path:line.
2. If nothing is found, say NOT FOUND and list where you looked — do not guess.
3. {optional: specific sub-question that must be answered}

REPORT FORMAT (max 30 lines):
- ANSWER: {1-3 sentences}
- EVIDENCE: bullet list of path:line + one-line description each
- SURPRISES: anything adjacent the commander should know (max 3 bullets, or "none")
Do NOT paste file contents beyond single relevant lines.
```

## T2 — Feature Implementation  (subagent_type: general-purpose, model: sonnet)

```text
GOAL: {what to build, 1-3 sentences}.
Background: {why; what the user asked in their words}.
Files: create/modify {explicit paths}. Do not touch any other file, especially
src/components/SmoothScroll.jsx, src/contexts/ScrollContext.jsx, src/App.jsx
{— unless listed above}.
Constraints: follow .claude/rules/10-project-conventions.md; Rules N1-N4 apply;
import animation APIs from "motion/react"; JSX only, no TypeScript.

ACCEPTANCE CRITERIA:
1. {observable behavior 1}
2. {observable behavior 2}
3. yarn lint exits 0 and yarn build exits 0 (run both yourself).
4. Diff contains only this task (judgment matrix D-4/D-5).

REPORT FORMAT (max 40 lines):
- CHANGED: path:line-range per file, one line each
- CRITERIA: numbered pass/fail with evidence per criterion
- DECISIONS: choices you made that the prompt didn't specify (max 3 bullets)
- RISKS / OPEN QUESTIONS: max 3 bullets, or "none"
Code excerpts: max 10 lines total, only where a decision needs showing.
```

## T3 — Refactor  (subagent_type: general-purpose, model: sonnet)

```text
GOAL: Refactor {path(s)} to {specific structural goal, e.g. "hoist static data, extract
repeated motion props into a variants factory"} with ZERO behavior change.
Follow the tidy steps in .claude/rules/10-project-conventions.md §1.
Background: {why now}.

ACCEPTANCE CRITERIA:
1. Public surface unchanged: component props API, rendered element structure, CSS class
   names, and route paths all identical. List each in the report with "unchanged" evidence.
2. yarn lint exits 0 and yarn build exits 0.
3. No new dependencies, no new files {unless: {allowed new files}}.
4. Net line count did not grow {optional; drop for extraction-heavy refactors}.

REPORT FORMAT (max 40 lines):
- CHANGED: path:line-range per file
- SURFACE CHECK: props / DOM structure / class names / routes — one line each, unchanged? y/n
- CRITERIA: pass/fail each
- LEFT ALONE: things you deliberately did not touch and why (max 3 bullets)
```

## T4 — Code Review / Verification  (subagent_type: general-purpose, model: sonnet — MUST be a fresh agent, never the implementer)

```text
GOAL: Independently verify recent changes in {paths}. You did not write this code; trust
nothing you were not shown evidence for.
The change was supposed to: {restate the original acceptance criteria — copy them verbatim;
do NOT include the implementer's claims or report}.

ACCEPTANCE CRITERIA (for your review):
1. Re-read every changed file from disk (git diff {base} -- {paths} first, then the files).
2. Run yarn lint and yarn build yourself; report exit status.
3. Check each original criterion independently; require file:line evidence.
4. Actively look for: debug leftovers, unrelated edits, special-case hacks
   (judgment matrix S-3/S-4), stale imports, broken routes in src/App.jsx.

REPORT FORMAT (max 30 lines):
- VERDICT: PASS | FAIL | PASS-WITH-NOTES
- CRITERIA: numbered pass/fail + evidence
- FINDINGS: numbered, each = path:line + one-sentence defect + concrete failure scenario
- Do not suggest style preferences; only defects and criterion violations.
```

---

Judge-panel variant (subjective picks, dispatch §4): give one fresh agent all candidates
labeled A/B/C with the SAME criteria list, ask for "ranking + one-line reason each, then a
single winner". One round only; commander decides on ties.
