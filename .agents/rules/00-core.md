---
trigger: always_on
description: Hanu core engineering constitution — always active
---

# Hanu Core Rules

Full reasoning lives in `AGENTS.md` (philosophy) and `ENGINEERING_PLAYBOOK.md` (process). This file is a reinforcement layer, not a replacement — when in doubt, go read the source.

## Non-negotiable defaults

1. **Offline-first is mandatory.** Every user action writes locally and updates the UI immediately. Never gate the UI on a network request. (AGENTS.md §10)
2. **Mobile-first is mandatory.** Design and verify on a phone viewport before desktop. One-handed use, thumb-zone actions, minimal typing. (AGENTS.md §9)
3. **Business logic never belongs in the UI.** Components present; hooks/services/domain layer decide. If a component is making a business decision, stop. (AGENTS.md §5, §7)
4. **Never silently lose user data.** No destructive action without recovery. No swallowed errors. No save that can fail invisibly. (AGENTS.md §10, §12)
5. **Prefer existing architecture.** Reuse existing patterns, repositories, hooks, and conventions before introducing new ones. New abstractions need the Rule of Three. (AGENTS.md §4)
6. **Ask when requirements are ambiguous.** Never invent business rules, edge cases, or workflows. Guessing creates expensive bugs. (AGENTS.md §13)
7. **Documentation is part of implementation.** If a change affects architecture, update docs, ADRs, or `TECH_DEBT.md` in the same change — not later. (AGENTS.md §14)
8. **Never add a dependency without justification.** Default answer is no. Check: can the platform, React, or existing code already do this? (AGENTS.md §7)
9. **Simplicity over cleverness.** When two correct solutions exist, ship the one with fewer moving parts. (AGENTS.md §3, §15)

## Working agreement

- **Read before writing.** Before any non-trivial change: `AGENTS.md` → relevant architecture docs → `docs/memory/CURRENT_SPRINT.md` → existing implementation. Don't propose changes from assumptions.
- **Match the level of work to the task.** Micro-fix, small feature, feature, or architectural change — each has its own process in `ENGINEERING_PLAYBOOK.md`. Don't write an implementation plan for a typo fix, and don't skip one for a schema change.
- **Plan before large changes.** Anything Level 3+ gets a short plan (objective, affected files, risks, testing approach) before code.
- **Self-review before requesting review.** Would you approve this? Is there dead code? Would you understand it in six months?
- **State has one owner.** Don't duplicate business state into component state. Derive what can be derived.
- **Every dependency you add becomes someone else's maintenance burden.** Treat it as a permanent decision.
- **Never rewrite history.** If a past decision was wrong, record a new decision — don't erase the old one.

## When uncertain

Fall back to the priority order in `AGENTS.md` §15:
```
Correctness → User Value → Reliability → Simplicity → Maintainability
   → Offline Capability → Performance → Developer Experience → Convenience
```
A higher priority always wins over a lower one. If a trade-off isn't obvious from this list, say so explicitly rather than guessing.

## Escalate, don't silently decide

Flag — instead of resolving unilaterally — any change that:
- touches authentication, payments, or the synchronization engine
- introduces a new dependency
- changes the database schema
- conflicts with an existing architectural decision (check `docs/memory/DECISION_LOG.md`)

These are Level 4 by definition and need human sign-off before implementation.
