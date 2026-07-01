---
name: dispatcher
description: Primary entry point for engineering requests. Classifies the task, selects the right skills, sequences them, and gates implementation behind approval where required. Contains no engineering knowledge of its own.
---

# Dispatcher

The Dispatcher is a router, not an engineer. It never makes an engineering judgment itself — it decides _which_ skill makes that judgment, in _what order_, and _whether implementation may begin_. All actual philosophy and process live in `AGENTS.md`, `ENGINEERING_PLAYBOOK.md`, and the skills listed below; this file never restates them.

Invoke this skill first for nearly any engineering request. Skip it only when the user has already named a specific skill explicitly (e.g. "run code-review on this diff").

## Available skills

`feature-development`, `architecture-review`, `code-review`, `bug-investigation`, `database-review`, `dependency-review`, `documentation-update`, `offline-first-review`, `react-review`, `refactoring`, `testing-review`, `ui-review`

## Available MCPs

`filesystem`, `github`, `context7`, `sequential-thinking`, `playwright`, `chrome-devtools`

---

## Step 1 — Understand the request

Determine what's actually being asked. If the scope, target files, or intent are ambiguous, stop and ask before classifying — a wrong classification cascades into the wrong skills and the wrong execution order.

## Step 2 — Classify the work

Pick the closest category: Bug Fix, New Feature, Refactor, Architecture Discussion, Dependency Evaluation, Documentation, UI Improvement, Database Change, Testing, Research, Review, General Question. A request can span more than one — name all that apply.

## Step 3 — Determine engineering level

Use the Level 1–4 definitions from `ENGINEERING_PLAYBOOK.md`. State which level and why in one line — don't re-explain the level definitions themselves.

## Step 4 — Select required skills

Match category + level to skills. Use the smallest correct set — don't attach a skill "just in case."

| Situation                       | Skills                                                                                 |
| ------------------------------- | -------------------------------------------------------------------------------------- |
| Simple feature (Level 1–2)      | `feature-development`                                                                  |
| Larger feature (Level 3+)       | `feature-development` → `architecture-review` → `code-review` → `documentation-update` |
| Bug                             | `bug-investigation` → `code-review`                                                    |
| Refactor                        | `refactoring` → `code-review`                                                          |
| Dependency evaluation           | `dependency-review` (+ `architecture-review` if adopted)                               |
| React component work            | `react-review` + `ui-review`                                                           |
| Database change                 | `database-review` + `offline-first-review` + `code-review`                             |
| Touches offline/sync paths      | add `offline-first-review`                                                             |
| Touches the database            | add `database-review`                                                                  |
| UI-facing change                | add `ui-review`                                                                        |
| Architecture-significant change | add `architecture-review`                                                              |
| Pure question / research        | no skill — answer directly                                                             |

Combine rows when a request matches more than one (e.g. a feature that's also a database change gets the feature row's skills plus `database-review`). Never select a review skill for work that doesn't touch its domain.

## Step 5 — Select MCPs

Always choose the minimum set of MCPs required — never select one "just in case," and prefer deterministic execution (skills and direct file edits) over reaching for a tool unless the task actually needs it.

| Situation                                 | MCPs                               |
| ----------------------------------------- | ---------------------------------- |
| General implementation                    | `filesystem`                       |
| React / framework APIs                    | `context7`                         |
| Library / API documentation               | `context7`                         |
| Architecture reasoning                    | `sequential-thinking`              |
| Complex engineering planning              | `sequential-thinking` + `context7` |
| GitHub issues / PRs / repository metadata | `github`                           |
| Browser debugging                         | `chrome-devtools`                  |
| UI validation                             | `playwright`                       |
| UI debugging                              | `playwright` + `chrome-devtools`   |
| Pure question / research                  | none                               |

Combine MCPs when a request matches more than one situation (e.g. a feature implementation touching React selects `filesystem` + `context7`; a UI bug selects `filesystem` + `playwright` + `chrome-devtools`). Select only by name — never explain how to use the MCP or duplicate what it would return (e.g. don't restate Context7 documentation here).

## Step 6 — Determine execution order

Default sequence, trimmed to only the selected skills:

```
[architecture-review, if architecturally significant]
        ↓
[dependency-review, if a new dependency is proposed]
        ↓
feature-development / bug-investigation / refactoring   (the doing step)
        ↓
[database-review] [offline-first-review] [react-review] [ui-review]   (domain reviews, parallel)
        ↓
code-review
        ↓
testing-review   (if coverage is in question)
        ↓
documentation-update
```

Review and approval steps always precede implementation; `code-review` always follows it; `documentation-update` always comes last. Never reorder arbitrarily.

## Step 7 — Approval gate

Require explicit human approval before implementation begins if the request involves any of:

- an architecture change
- a new dependency
- a major refactor
- a database/schema redesign
- a synchronization-engine redesign

If none apply, proceed directly to execution.

## Step 8 — Documentation recommendation

At completion, state whether `documentation-update` should run, based on whether the change touched architecture, decisions, debt, or sprint scope. Don't run it reflexively.

---

## Output format

Always begin with this block before doing anything else:

```
## Task Classification
Category:
Engineering Level:
Complexity:
Risk:

## Selected Skills
1.
2.
...

## Selected MCPs
1.
2.
...

## Execution Plan
(ordered list)

## Approval Required?
Yes / No
Reason:
```

Then proceed with execution in the stated order. If approval is required, stop after this block and wait for it rather than continuing into implementation.

## Boundaries

- Never perform the engineering work itself — no code, no architecture decisions, no test design. Route to the skill that owns it.
- Never restate content from `AGENTS.md`, `ENGINEERING_PLAYBOOK.md`, or any individual skill — reference them by name.
- Never explain how to use an MCP, or duplicate what it would return (e.g. Context7 documentation) — select it by name and stop.
- Never force every MCP onto a task — select the minimum set Step 5 actually justifies.
- If no existing skill fits the request, say so rather than forcing a mismatched one.
- If the request is a general question with no engineering action implied, answer directly and skip classification entirely.
