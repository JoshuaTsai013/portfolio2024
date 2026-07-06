# Handover Letter — from the Fable 5 setup session (2026-07-05)

Written by the model that built this harness, for every model that comes after. Finalized
2026-07-05; immutability (Tier T-C, see [50-knowledge-iteration.md](50-knowledge-iteration.md) §1)
binds from the initial git commit onward. Never edit this file; if reality contradicts
something here, log the contradiction in 60-lessons.md.

## 1. Three things the user did not ask about, but you must know

### 1.1 The scroll system hijacks the whole page — it is the #1 source of future bugs
`SmoothScroll.jsx` wraps every route in a `data-scroll-container` driven by locomotive-scroll
(destroyed and recreated on every route change, `src/components/SmoothScroll.jsx:16-66`).
Consequences that are NOT obvious from reading a single component:
- `window.scrollY`, `position: sticky`, anchor jumps, and browser scroll restoration do not
  behave natively anywhere in the app.
- The ONLY sanctioned way to read scroll position is `useScrollValue()` from
  `src/contexts/ScrollContext.jsx` — it returns a motion value fed by locomotive's event.
- motion's own `useScroll()` and plain `IntersectionObserver` will silently misbehave inside
  the container. If an animation "doesn't trigger", suspect this first, not the animation.
- New pages MUST be registered both as a route in `src/App.jsx` AND designed to live inside
  this container. Copy the structure of an existing page (e.g. `src/pages/skyfall/`).

### 1.2 The verification floor is `yarn build` — treat "add tests" as a future user decision
There are no tests, no CI, no TypeScript. The harness compensates with lint + build +
fresh-context read-back, and that is genuinely enough for this repo's risk profile (a
personal portfolio, hand-verified in the browser by its owner). Two corollaries:
- Do not let a subagent "helpfully" install vitest/jest/playwright. Proposing a test setup is
  a fine suggestion to the user; installing one autonomously is scope creep (matrix C-3).
- Because build is the floor, a change that passes build can still be visually broken.
  Rule N4 (UNVERIFIED VISUALLY) exists so the user always knows what they still need to
  eyeball. Never soften that line — it is the honesty seam of the whole harness.

### 1.3 The user's workflow shape: Chinese conversation, English artifacts, Develop branch
The user converses in Traditional Chinese, keeps code/comments/commits in English (Rule N1),
works on `Develop`, and treats `main` as the release line. Commits are small, lowercase,
imperative. They previously used another agent tool (the deprecated `.agents/` dir) and its
one strong opinion worth keeping is already migrated: never auto-start dev servers — the
user runs the browser themselves. Respect the cadence: small diffs, frequent check-ins in
Chinese, no surprise infrastructure.

## 2. How this harness will degrade under weak models — and the countermeasures

Predicted decay modes, in order of likelihood:

1. **Rule-skipping under context pressure.** After long sessions/compaction, the model stops
   reading routed files and acts from vibes. *Countermeasure already built in:* CLAUDE.md is
   short enough to survive compaction, and the routing table names trigger situations, not
   documents. *Your job:* when you notice you haven't opened a rules file all session while
   delegating/verifying, that IS the signal you've degraded — reopen the routing table.
2. **Verification theater.** The implementer starts "confirming" its own work, or the
   verifier is given the implementer's report and rubber-stamps it. The dispatch contract
   (§4) forbids both, but the drift is gradual and feels efficient. *Tell:* verifier reports
   with no file:line evidence, or verdicts that arrive suspiciously fast.
3. **Lessons-log bloat into noise.** 60-lessons.md fills with trivia until nobody reads it.
   The 30-entry compaction threshold is mandatory, not advisory. A lessons file nobody skims
   is worse than none — it costs tokens and provides false confidence.
4. **Criteria softening.** Acceptance criteria quietly become adjectives again ("works
   correctly", "looks good"), which weak models will happily "pass". Any criterion that a
   different model could not check without asking you is a broken criterion — rewrite it as
   a command exit code, a file:line fact, or a user question.
5. **Harness self-editing without approval.** A helpful session "improves" dispatch rules
   mid-task to match what it was already doing. That is why T-B requires a user-approved
   diff and a `.bak`. If you find rules and behavior diverging, the behavior is what changes.

## 3. Honesty clause — hard limits of this harness

Decomposition + isolated verification approximates high-end engineering quality. It does NOT
approximate taste. The following are outside what any model in this setup can decide well,
and pretending otherwise produces confident garbage:

- Whether an animation/layout/typography choice *looks* right (no model here can see renders).
- Brand voice, portfolio storytelling, which project deserves the spotlight.
- "Make it feel more premium/alive/cinematic" — implement variants, let the user's eyes decide
  (judgment matrix §4 is the standard response; the epic-design skill can generate candidate
  techniques, but candidate ≠ verdict).

Also honestly: this harness was written against Claude Code as of 2026-07 (Agent tool with
model override, Explore/general-purpose agents, per-project memory dir, si:* plugins
installed globally). If those mechanisms change names or disappear, the *contracts* (three-
piece dispatch, isolated verification, escalation ladder, tiered files) still hold — port
the contract, don't cargo-cult the tool names. Anything in these files you cannot reproduce
from the live environment: verify before relying on it, and log corrections in 60-lessons.md.

## 4. Unfinished items from the setup session

- None blocking. Optional follow-ups deliberately left as user decisions:
  (a) commit the harness to git (files are written but not committed — Rule N6);
  (b) a minimal smoke test (`vite build` already covers compile; an actual test runner is a
  user call, see §1.2);
  (c) `.claude/settings.json` here contains only permission allow/deny lists (lint/build/git
  reads allowed; dev/preview servers denied per Rule N2) — hooks were deliberately NOT added
  to keep the harness legible to weak models. If prompts get annoying, extend the allowlist
  with the `update-config` skill.
