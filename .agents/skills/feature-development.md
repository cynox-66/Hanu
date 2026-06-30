---
name: feature-development
description: Primary skill for implementing a feature or change in Hanu, from understanding through self-review.
---

# Feature Development

The default skill for any non-trivial implementation work. Pairs with `.agents/rules/00-core.md` (always active) and the level-of-work classification in `ENGINEERING_PLAYBOOK.md`.

## Procedure

1. **Read context, in order:**
   - `AGENTS.md` — philosophy and standards relevant to this change
   - `ENGINEERING_PLAYBOOK.md` — which level of work this is, and the process it implies
   - `docs/memory/CURRENT_SPRINT.md` — what's already in flight, so you don't collide with it
   - The existing implementation of the area you're touching

2. **Understand the problem before the solution.** What problem exists, why, who experiences it, how often. If this isn't answerable from context, ask — don't assume.

3. **Check architecture fit.** Does an existing repository, hook, service, or pattern already cover part of this? Reuse before building new. Confirm the change respects layer boundaries (UI → Application → Domain → Persistence) and the offline-first data flow.

4. **Produce a short implementation plan** for anything Level 3 or above: objective, affected files, architecture impact, risks/edge cases, testing approach. Skip this for Level 1–2 micro/small changes.

5. **Implement incrementally.** Prefer a working vertical slice over isolated layers. Keep diffs reviewable — don't bundle unrelated changes.

6. **Self-review before declaring done.** Run the Definition of Done categories from `AGENTS.md` §16 against the change: correctness, architecture compliance, mobile experience, offline behavior, error handling, types, code quality, testing, performance, accessibility.

7. **Recommend documentation updates if the change touched architecture, introduced a dependency, or made a non-obvious decision** — point to the specific doc (`docs/architecture/`, an ADR, `DECISION_LOG.md`, `TECH_DEBT.md`) rather than writing it unprompted.

## Output expectations

- State which level of work this was and why.
- Surface any assumption you had to make, even small ones.
- If you skipped a step (e.g. no implementation plan), say so and why.
