# Model Dispatch & Escalation Contract

Who does what, when to delegate, when to escalate, and how work gets verified.
Written for a commander model of Opus-4.8 class (also works if the commander is Sonnet — the
rules do not change, only the escalation ceiling does).

## 1. Commander contract — "the commander does not go down to the field"

The main-conversation model is the **commander**. Its job: decompose tasks, write dispatch
prompts, judge reports, talk to the user. It does NOT do bulk mechanical work itself.

Delegate to a subagent (Agent tool) when the work matches ANY of:
- **D1** Reading/searching more than ~5 files or an unknown number of files ("find where X is used", "scan the repo for Y") → `Explore` agent, breadth stated.
- **D2** A self-contained implementation task whose goal + acceptance criteria fit in ≤ 15 lines when filling template T2's slots (the template boilerplate doesn't count) → `general-purpose` agent.
- **D3** Verification of a change that crosses the §4 threshold (> ~20 lines of diff, or load-bearing files) → fresh `general-purpose` agent. Below that threshold the commander self-checks (§4 last paragraph); D3 does not apply.
- **D4** Repetitive batch edits after the pattern is proven once (see §3 downgrade).

Do it yourself in the main thread ONLY when the work matches ANY of:
- **S1** Fewer than ~5 file reads and you already know the exact paths.
- **S2** The task needs conversation context that is too long/lossy to restate in a dispatch prompt.
- **S3** Single quick edit + lint, total < ~3 tool calls.
- **S4** The user is mid-conversation iterating with you on wording/decisions (delegation adds latency for nothing).

Model choice when dispatching (`model` parameter of the Agent tool):
- `haiku` — mechanical, zero-ambiguity: apply a proven regex/pattern, format, enumerate files.
- `sonnet` — default worker: search, implement, refactor, review. Use this when unsure.
- `opus` — only via the escalation ladder (§3) or for cross-file architecture design.

## 2. Dispatch three-piece rule

Every subagent prompt MUST contain all three pieces. If you cannot write all three, the task
is not clear enough to delegate — clarify it first. Full fill-in templates:
[40-delegation-templates.md](40-delegation-templates.md).

1. **Goal + context**: what to achieve, why, exact starting file paths, relevant constraints
   from CLAUDE.md (subagents do NOT inherit your conversation — restate everything they need;
   they do get CLAUDE.md, so reference rules by ID like "Rule N2" instead of re-pasting them).
2. **Acceptance criteria**: a numbered list of objectively checkable conditions
   ("`yarn lint` exits 0", "route /project/skyfall still declared in App.jsx"), never
   adjectives ("clean", "high quality").
3. **Report format**: exactly what to send back. Default:
   `files changed (path:line ranges) / criteria checklist with pass|fail each / risks or open questions / ≤10 lines of code excerpt total`.
   Forbid pasting whole files back — reports over ~40 lines are a dispatch-prompt failure.

## 3. Escalation & downgrade ladder

Definition of one **failure**: the agent's report fails an acceptance criterion, OR its work
fails your spot-check, OR it errored out / returned "cannot do it".

Each subtask gets at most one pass up this ladder — **attempt budget per rung:
Haiku ≤ 1, Sonnet ≤ 2, Opus ≤ 1** (skip rungs you started above; a Sonnet-first task has
budget Sonnet 2 → Opus 1):

- **Haiku fails once** (any tool error, syntax error, or failed criterion) → do not retry
  Haiku. Re-dispatch to `sonnet` with the same prompt.
- **Sonnet fails twice on the same subtask** → stop. Escalate to `opus` and include the
  **full failure trail**: all prompts, all reports, the exact error output. Never make Opus
  rediscover what already failed.
- **Opus solves a repeating pattern** → extract the pattern into an exact instruction
  ("in each listed file, replace A with B, then run lint") and downgrade the remaining batch
  to `haiku`/`sonnet`.
- **Ladder exhausted** (Opus failed its one attempt, or the commander IS the ceiling with no
  stronger model to call) → unconditional circuit breaker
  ([30-judgment-matrix.md](30-judgment-matrix.md) C-4): report the full failure trail to the
  user, propose 2 options, ask. Do not loop back into more retries.

Before EACH escalation, check the STOP signals in matrix §1 — repeated failure usually means
the task spec is wrong, not the worker. If you rewrite the spec (different approach, corrected
criteria), the ladder resets once, and only once, per subtask.

## 4. Isolated verification — implementer never grades their own work

For any change > ~20 lines of diff, or anything touching `SmoothScroll.jsx` /
`ScrollContext.jsx` / `App.jsx` routes:

1. Implementer agent finishes and reports.
2. Commander dispatches a **fresh-context verifier** (new `general-purpose` agent, `sonnet`)
   that was NOT the implementer and receives only: the acceptance criteria + file paths —
   not the implementer's report, and not the implementer's claims.
3. Verifier must: re-read the changed files from disk, run `yarn lint` and `yarn build`,
   and return the criteria checklist with pass/fail + evidence (file:line).
4. Disagreement between implementer and verifier is decided by the commander by reading the
   disputed lines directly — never by asking the implementer again.

For subjective choices with several plausible outputs (naming, copy, API shape): generate
2–3 candidates cheaply, then have ONE separate judge agent pick with a one-line reason each
(judge-panel). Do not debate more than one round.

Small changes (≤ ~20 lines, not load-bearing files): commander self-checks by reading the
diff + running `yarn lint`. Rule N3/N4 in CLAUDE.md still apply.
