---
name: architecture-review
description: Reviews a proposed implementation or plan for architecture fit. Does not write or modify code.
---

# Architecture Review

A read-only review skill. Use it to evaluate a plan, diff, or design before — or instead of — implementing it. Never edits code; produces findings.

## What to check

- **Architecture violations** — does this respect the layered flow (Presentation → Application → Domain → Persistence → Synchronization)? Does the Domain layer stay framework-free? Does data flow in the documented direction (`AGENTS.md` §5)?
- **Offline-first violations** — does any path block the UI on a network call, or skip the local-write-first lifecycle (`AGENTS.md` §10)? Is failure handled gracefully?
- **Unnecessary complexity** — is there a simpler solution satisfying the same requirement? Is an abstraction justified by the Rule of Three, or premature?
- **Dependency violations** — does this introduce a new dependency without clear justification? Could platform/React/existing code already do this?
- **Maintainability risks** — naming, file organization, state ownership, coupling, anything that would confuse an engineer with no context six months from now.

## Process

1. Identify what's being reviewed: a plan, a diff, or a description of intended work.
2. Walk each checklist category above. Cite the specific file, line, or design choice for every finding — no vague concerns.
3. Classify each finding: **blocking** (violates a non-negotiable or core architecture rule), **should-fix** (real risk, not fatal), or **note** (worth mentioning, not required).
4. Reference the relevant `AGENTS.md` section for any blocking finding, so the rationale is traceable.
5. End with a clear verdict: approve, approve with changes, or do not proceed — plus the minimum changes needed to move from the current state to approved.

## Boundaries

- Do not write or edit implementation code in this skill. If a fix is obvious, describe it; don't apply it.
- Do not relitigate settled architectural decisions already recorded in `docs/memory/DECISION_LOG.md` — flag if the proposal conflicts with one, but don't re-debate it here.
