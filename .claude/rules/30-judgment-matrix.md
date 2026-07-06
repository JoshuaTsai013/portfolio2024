# Judgment Matrix

Externalized judgment calls, written as checklists a Sonnet-class model can apply by eye.
Three questions: when to STOP and change path, when a task is DONE, when to break the
circuit and ask the user. Each criterion has a ✅ perfect example and a ❌ typical
counterexample (the counterexample is the behavior to avoid).

## 1. STOP signals — the direction is wrong; change path, do not retry harder

If ANY of these is true, stop editing. Discard the failed attempt's edits — ONLY files you
yourself changed this session (`git restore <file>`); if the working tree may contain the
user's own uncommitted edits or you are unsure who changed a file, do not discard anything —
that is C-1, ask first. Then write one sentence stating the new hypothesis and take a
different path (different file, different approach, or escalate per
[20-model-dispatch.md](20-model-dispatch.md) §3; if the ladder there is already exhausted,
go straight to C-4).

- **S-1 Same error, third sighting.** The identical error message (or same failing lint rule
  / same broken behavior) has survived two different fix attempts.
  - ✅ Perfect: "`useScroll` returns undefined survived attempt 1 (add optional chaining) and
    attempt 2 (reorder imports). Stopping. New hypothesis: the component is rendered outside
    `ScrollProvider` — checking App.jsx route structure instead of editing the component."
  - ❌ Typical failure: third attempt adds `?.` in more places, fourth wraps it in try/catch,
    the error is now hidden instead of fixed.
- **S-2 The diff keeps growing but the goal is stationary.** The task was "small" (one
  component, one behavior) yet you are now touching a 4th file that the task never mentioned.
  - ✅ Perfect: "Fixing the hover animation now requires edits in SmoothScroll.jsx — that is
    load-bearing and outside the task. Stopping and reporting the coupling instead."
  - ❌ Typical failure: "just one more file" five times; the PR is now a refactor nobody asked for.
- **S-3 You are adding special cases to make one input pass.** An `if` that names one
  specific route, one specific screen width, one specific array index — to make the symptom
  disappear.
  - ✅ Perfect: "The overlap only happens on /project/skyfall. Instead of
    `if (path === '/project/skyfall')`, find what skyfall does differently — its page sets a
    different container height."
  - ❌ Typical failure: `if (window.innerWidth === 1366) top -= 12;`
- **S-4 You are weakening the checks to get green.** Disabling an eslint rule, adding
  `// eslint-disable`, loosening a criterion, or deleting failing code instead of fixing it.
  - ✅ Perfect: "Lint flags an unused variable I need for the next step — I remove the
    variable until that step actually lands."
  - ❌ Typical failure: adding `/* eslint-disable react-hooks/exhaustive-deps */` to silence a
    warning that is pointing at a real stale-closure bug.
- **S-5 You cannot explain the current failure in one sentence.** If you cannot state WHAT
  is broken and WHY your next edit should fix it, you are guessing.
  - ✅ Perfect: writing the sentence first: "Build fails because motion v11 has no
    `AnimateSharedLayout` export; the fix is to use `layoutId`."
  - ❌ Typical failure: shotgun-editing imports, versions, and props in one attempt "to see if
    it helps" — when it passes you don't know why, and neither will the next session.

## 2. Definition of DONE — all boxes ticked, or it is not done

A task is deliverable ONLY when every line below is literally true. Copy this checklist into
your final report and mark each item.

- [ ] **D-1** Every acceptance criterion from the task/dispatch prompt is individually
      checked with evidence (file:line or command output). "It should work now" is not evidence.
- [ ] **D-2** `yarn lint` exits 0 (repo policy is `--max-warnings 0`).
- [ ] **D-3** `yarn build` exits 0.
- [ ] **D-4** No debug leftovers in the diff: `console.log`, commented-out code, TODO you
      added, test data. Verify with `git diff`, not memory.
- [ ] **D-5** The diff contains ONLY the task. Unrelated "while I was here" edits are removed
      (if genuinely valuable, list them as suggestions in the report instead).
- [ ] **D-6** If anything visual/animated changed: the report contains the exact line
      `UNVERIFIED VISUALLY — please check <route> in the browser.` (Rule N4). Never claim a
      visual result looks correct — you cannot see it.
- [ ] **D-7** For diffs > ~20 lines or load-bearing files: a fresh-context verifier passed it
      ([20-model-dispatch.md](20-model-dispatch.md) §4).

✅ Perfect example of a completion report:
> Criteria: (1) card flips on hover — implemented at src/components/ProjectShowcase/Card.jsx:41-58,
> pass; (2) no layout shift — grid template untouched, pass. lint 0 / build 0. Diff reviewed,
> no debug code. UNVERIFIED VISUALLY — please check /project/2 in the browser.

❌ Typical failure:
> "I've implemented the hover animation and it should now work smoothly. Let me know if you'd
> like any adjustments!" (no evidence, no lint/build, no visual disclaimer)

## 3. Circuit breaker — stop autonomous work and ask the user

Ask BEFORE acting (one concise question with a recommended option) when ANY applies:

- **C-1 Irreversible or destructive**: deleting user-authored files/pages/assets, `git push`,
  force operations, rewriting git history, overwriting uncommitted work.
- **C-2 Ambiguity forks the work**: two readings of the request diverge by more than ~30 min
  of redo. ✅ "『把首頁動畫改快一點』— faster easing on existing animations, or shorter
  LoadingScreen? These touch different files — which one?" ❌ Guessing, building the wrong
  one, and presenting it as done.
- **C-3 Scope change discovered mid-task**: the fix requires touching load-bearing files
  (SmoothScroll/ScrollContext/App routes) or adding a dependency, and the task didn't say so.
- **C-4 Retry budget exhausted**: escalation ladder hit its cap (dispatch §3). Report the
  full failure trail, propose 2 options, ask.
- **C-5 Taste decision with no stated preference**: see §4.
- **C-6 Anything involving credentials, deploy targets, or third-party accounts.**

Do NOT break the circuit for: reversible in-repo edits the request clearly implies, choosing
internal names, or which of two equivalent implementations to use — decide, note the
decision in the report, move on. Asking about those is noise, and users stop reading
questions that don't matter.

## 4. Taste-limit protocol — aesthetic decisions are outside your competence

Hard limit of this harness: visual taste, "does this animation feel premium", brand feel,
copywriting voice. Decomposition and verification do not fix this — do not pretend.

When the task hinges on taste (trigger words: 好看, 質感, feel, vibe, premium, 美感 — or you
notice two options differ only aesthetically):
1. Implement the objective parts fully.
2. For the taste fork: produce 2–3 concrete variants (real code, switchable via an obvious
   constant/prop), state the trade-off of each in one line, and ask the user to pick by eye.
3. Never present your own pick as "the better looking one". You cannot see the render;
   your aesthetic confidence is fake.

✅ Perfect: "Variant A: 0.3s ease-out (snappy), Variant B: 0.6s spring (floaty). Toggle at
Card.jsx:12 `VARIANT`. Both lint/build clean. Pick in browser."
❌ Typical failure: "I chose the spring animation as it feels more elegant and premium."
