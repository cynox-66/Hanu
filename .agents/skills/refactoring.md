---
name: refactoring
description: Guides safe, behavior-preserving refactoring. Improves readability, duplication, architecture fit, and maintainability without changing what the code does.
---

# Refactoring

Refactoring framework lives in `AGENTS.md` §15 ("refactor only when it improves at least one of: readability, maintainability, correctness, testability, simplicity... never refactor merely because code looks old"). This skill applies that judgment and executes the change — unlike the review skills, this one does touch code, but only to preserve behavior, never to add it.

## Priorities, in order

1. **Preserve behavior.** The refactor must not change observable output, side effects, or business rules. If achieving the goal requires a behavior change, stop — that's feature work, not refactoring.
2. **Improve readability.** Clearer naming, smaller functions, less indirection, intent obvious on read.
3. **Reduce duplication.** Only where repetition is real (Rule of Three) — don't manufacture abstraction to look thorough.
4. **Simplify architecture.** Fewer concepts, cleaner boundaries, better alignment with the layered architecture in `AGENTS.md` §5.
5. **Improve maintainability.** Easier to test, easier to extend, easier for the next engineer (or agent) to trust.

## Process

1. **Confirm the motivation.** What specifically is hard to read, duplicated, or fragile here? If the justification is "this looks old" rather than a concrete problem, don't proceed.
2. **Establish a behavior baseline.** Identify existing tests covering this code. If coverage is thin, recommend adding characterization tests _before_ refactoring — flag this rather than refactoring un-protected code blind.
3. **Scope the change.** Refactor only what serves the stated motivation. Don't let a naming cleanup grow into a restructure, and don't bundle refactoring with feature work in the same change.
4. **Refactor incrementally.** Prefer a sequence of small, independently verifiable steps over one large rewrite. Each step should leave the code working and tests passing before the next.
5. **Verify behavior after each step.** Tests pass, and where applicable, manual confirmation that output is unchanged.
6. **Stop at the boundary.** Once the stated motivation is resolved, stop — don't keep refactoring adjacent code "while you're in there."

## Non-negotiables specific to refactoring

- Never perform feature work inside a refactor — no new behavior, no new fields, no new UI, even if it seems convenient while touching the file.
- Never change behavior intentionally, and treat any accidental behavior change as a bug in the refactor, not an acceptable side effect.
- Never refactor code with no test coverage and no added characterization tests, if the code has any non-trivial logic.
- If a refactor reveals a larger architectural problem, recommend it as a separate, scoped follow-up rather than expanding the current change.

## Output expectations

- State the concrete motivation for the refactor before starting.
- Present the plan as incremental steps, not a single diff.
- After completion, confirm explicitly that behavior is unchanged and note what was verified.
