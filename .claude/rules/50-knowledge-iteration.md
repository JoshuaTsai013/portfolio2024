# Knowledge Iteration Protocol

How future models may update this harness without corrupting it.

## 1. File tiers — what you may edit

| Tier | Files | Who may change them |
|---|---|---|
| **T-A append freely** | [60-lessons.md](60-lessons.md); session memory dir (`~/.claude/projects/<this project>/memory/`) | Any model, any time, using the schemas below. Append only — never rewrite or delete another session's entry (except via §3 compaction). |
| **T-B propose, then user approves** | `CLAUDE.md`, `10-project-conventions.md`, `20-model-dispatch.md`, `30-judgment-matrix.md`, `40-delegation-templates.md`, this file, `.claude/settings.json` | Draft the exact diff, show it to the user, apply only after explicit approval. Always create `<name>.bak` first (Rule N5). |
| **T-C immutable** | `90-handover-letter.md` | Historical record from the Fable 5 setup session. Never edit; contradictions with reality go into 60-lessons.md instead. |

The ONLY exception for T-B: fixing an objectively broken reference (dead file path, wrong
line command). Fix it, keep the `.bak`, and tell the user in your next message what you fixed
and why.

Effective date: these tiers bind from the harness's **initial git commit** onward. The
2026-07-05 setup session authored and revised all files freely before that commit — pre-commit
revisions are authorship, not edits, and set no precedent for later sessions.

## 2. Lesson entry schema (T-A)

Append to [60-lessons.md](60-lessons.md) when: a task failed and the cause was discovered; a
harness rule proved wrong/ambiguous in practice; a non-obvious repo trap cost more than
~10 minutes. Do NOT log: one-off typos, things CLAUDE.md already states, generic advice.

Fixed format — copy exactly:

```markdown
## L-{next number} | {YYYY-MM-DD} | {3-6 word title}
- **Trigger:** {what task/situation exposed it}
- **Wrong path:** {what was tried that failed — one sentence}
- **Correct path:** {what actually worked — one sentence, concrete}
- **Rule impact:** {none | "suggests changing {file} §{n} because …"}
```

Entries with `Rule impact` ≠ none are the pipeline into T-B: at the next natural pause,
surface them to the user as a proposed diff. The lesson stays in the log even after the rule
changes (it is the why).

## 3. Compaction — mandatory, threshold-triggered

When 60-lessons.md exceeds **30 entries or 200 lines** (check when appending), the NEXT
append must be preceded by compaction:
1. Group entries that share a root cause.
2. Each group of ≥3 becomes ONE abstracted entry (same schema, title prefixed `[MERGED]`,
   Trigger lists the merged L-numbers) — and is a strong candidate for a T-B rule proposal,
   since 3+ occurrences means the rules failed to prevent it.
3. Keep singletons as-is. Never compact below the point where the Correct path stays concrete
   — "be careful with scroll code" is a compaction failure; "components using useScroll must
   be inside ScrollProvider (see App.jsx:38-49)" survives.
4. Compaction is the one permitted rewrite of 60-lessons.md. Create `60-lessons.md.bak` first.

## 4. Session memory vs lessons — which goes where

- **60-lessons.md** (in git, shared): repo facts and harness corrections useful to ANY future
  session. Durable.
- **Memory dir / MEMORY.md** (per-machine): user preferences, in-flight multi-session state,
  pointers. Follow the memory system's own format. When a memory turns out to be a durable
  repo fact, promote it to 60-lessons.md and delete the memory file.
- The installed `si:*` skills (`/si:review`, `/si:promote`, `/si:extract`) automate parts of
  this pipeline. Using them is fine, but their output must still respect the tiers above —
  in particular `/si:promote` targets CLAUDE.md/rules, which are T-B: user approval required.

## 5. Anti-corruption rules

- Never add a rule that contradicts an existing one — if you believe an existing rule is
  wrong, that disagreement is itself a T-B proposal, not an override.
- Never grow CLAUDE.md beyond ~80 lines of substance; new content goes in a rules file with a
  routing-table entry (that routing edit is T-B).
- Every rule you propose must include at least one concrete example, and must be checkable
  without taste ("no adjectives as criteria" — same bar as dispatch §2).
- One session may propose at most 3 rule changes. More than that means you are redesigning
  the harness — stop and discuss with the user first.
