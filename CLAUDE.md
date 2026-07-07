# portfolio2024

Personal portfolio website. Vite + React 18 (JSX, **no TypeScript**), react-router-dom v6,
`motion` v11 (import from `"motion/react"` — NOT `"framer-motion"`), locomotive-scroll v4,
three.js + @google/model-viewer, Tailwind CSS v3 coexisting with react-bootstrap.
Package manager: **yarn** (v1, yarn.lock committed). No test framework, no CI.

## Commands

| Purpose | Command | Notes |
|---|---|---|
| Lint | `yarn lint` | `--max-warnings 0`: ONE warning = failure |
| Build | `yarn build` | The strongest automated check this repo has |
| Dev server | `yarn dev` | **NEVER run unless the user explicitly asks** (Rule N2) |

## Non-negotiable rules

- **N1** Code comments, identifiers, and commit messages: English. Conversation: follow the user's language (usually Traditional Chinese).
- **N2** Never start a dev server / preview server on your own. Browser testing only when the user explicitly requests it.
- **N3** There are no tests. "Verified" means: `yarn lint` passes AND `yarn build` passes AND the acceptance criteria in the task were checked one by one with file:line evidence. Nothing else counts as verified.
- **N4** Visual/animation results CANNOT be verified by you. After any visual change, your final message must contain the line: `UNVERIFIED VISUALLY — please check <route> in the browser.`
- **N5** Before rewriting an existing harness file (this file, `.claude/rules/*`, `.claude/settings.json`), copy it to `<name>.bak` first. Exception: appending entries to `60-lessons.md` needs no backup. A `.bak` does not by itself authorize the edit — the tier rules in [50-knowledge-iteration.md](.claude/rules/50-knowledge-iteration.md) decide whether you may edit at all.
- **N6** Commit only when the user asks. Working branch is `Develop`; `main` is for PRs/releases. Commit style: short lowercase imperative (e.g. `add guitar love page and motion grid component`).
- **N7** Session-branch isolation: never edit files or commit while on `Develop` or `main`. At the start of any task that will modify files, if on `Develop`/`main`, run `git switch -c claude/<short-topic>` off `Develop` first (skip if already on a `claude/*` branch). `Develop`/`main` stay untouched until the user merges (Rule N6).

## Routing table — read the file BEFORE doing the task type

| Situation | Read first |
|---|---|
| Any code/style question, touching scroll or animation code | [.claude/rules/10-project-conventions.md](.claude/rules/10-project-conventions.md) |
| You are about to delegate work to a subagent, or a subagent failed | [.claude/rules/20-model-dispatch.md](.claude/rules/20-model-dispatch.md) |
| Task feels stuck, you are unsure if you're done, or considering asking the user | [.claude/rules/30-judgment-matrix.md](.claude/rules/30-judgment-matrix.md) |
| Writing the actual prompt for a subagent | [.claude/rules/40-delegation-templates.md](.claude/rules/40-delegation-templates.md) |
| You made a mistake worth recording, or want to change harness rules | [.claude/rules/50-knowledge-iteration.md](.claude/rules/50-knowledge-iteration.md) |
| Start of a session doing multi-step autonomous work | [.claude/rules/90-handover-letter.md](.claude/rules/90-handover-letter.md) (once, skim) |

Past mistakes live in [.claude/rules/60-lessons.md](.claude/rules/60-lessons.md) — skim it before repeating a task type that appears there.

## Architecture in 6 lines

- Entry: [src/main.jsx](src/main.jsx) → BrowserRouter → [src/App.jsx](src/App.jsx) (routes + LoadingScreen gate).
- Every page renders inside `SmoothScroll` → `ScrollProvider` ([src/contexts/ScrollContext.jsx](src/contexts/ScrollContext.jsx)). These two are **load-bearing**: most components read scroll position from this context, not from `window`. Do not modify them casually — see conventions file.
- Pages: `src/pages/<name>/` (home, project1-3, wander, skyfall, guitar-love). Routes are declared in App.jsx.
- Reusable pieces: `src/components/<Name>/`. Static assets: `public/`.
- `.agents/` directory is a **deprecated** leftover from a previous tool. Do not read or follow it; its rules were migrated into `.claude/rules/`.
