# Hanu Engineering Playbook

> This document is operational. It describes *how* we work — the pipeline, the process tiers, the review steps. It changes as our process matures. The *why* behind this process — the permanent engineering philosophy — lives in `AGENTS.md` §6 (Development Workflow), and that document takes priority if the two ever disagree.

---

## The Engineering Pipeline

Every meaningful feature follows this lifecycle:

```
Problem → Research → Decision → Implementation Plan → Architecture Review
   → Implementation → Self Review → Testing → User Validation
   → Documentation → Merge
```

Skipping steps is acceptable only when the change is genuinely trivial.

## Levels of Work

Not every task deserves the same process. Hanu classifies work into four levels.

**Level 1 — Micro Changes**
Examples: typo fixes, UI text, icons, colors, padding, spacing, variable renames, comments, documentation corrections.
Workflow: `Implement → Review → Commit`. No implementation plan required.

**Level 2 — Small Features**
Examples: new component, new form, new dialog, new reusable hook, simple utility.
Workflow: `Understand → Mini Plan → Implement → Review → Test → Commit`. The plan may remain informal.

**Level 3 — Features**
Examples: Product Management, Customer Management, Order Management, Inventory, Dashboard, Search.
Workflow: `Problem → Research → Implementation Plan → Architecture Check → Implementation → Testing → Owner Validation → Documentation → Merge`. Every feature should produce working software.

**Level 4 — Architectural Changes**
Examples: database redesign, offline engine, authentication, routing, state management, a new dependency, new infrastructure.
Workflow: `Research → Architecture Proposal → Review → Decision → ADR → Implementation → Testing → Documentation → Merge`. Nothing enters production without an approved architectural direction.

## Before Writing Code

The engineer should understand: What problem exists? Why does it exist? Who experiences it? How often does it happen? What's the simplest solution? Never implement assumptions — when requirements are ambiguous, ask.

## Implementation Planning

Large features begin with an implementation plan covering: objective, affected files, architecture impact, risks, edge cases, and testing strategy. The goal is reducing uncertainty before code exists — thinking is cheaper than debugging.

## Research Before Reinvention

Before introducing a pattern, library, abstraction, or infrastructure piece, first investigate: Does something already exist? Can existing code be reused? Does React, the browser, or TypeScript already solve this? Prefer built-in solutions.

## Build Vertical Slices

Avoid building disconnected layers over weeks:

```
Database → API → UI → Testing      (avoid)
```

Prefer completing a feature end to end:

```
Feature → Database → Logic → UI → Tests → Working Software
```

Working software creates feedback. Feedback improves architecture.

## Review, Testing, and Validation

**Review your own work first.** Before requesting any review, ask: Would I approve this? Is the naming clear? Can this be simpler? Is there dead code? Are edge cases handled? Would I understand this six months later? Self-review prevents avoidable mistakes.

**Testing exists to create confidence**, not coverage numbers. Every feature should verify expected behavior, invalid input, edge cases, failure recovery, offline behavior, and state consistency. Tests double as documentation for future engineers.

**The final reviewer is not the engineer — it's the user.** For Hanu, that's the owner of Hanu Enterprises.

```
Feature → Developer Testing → AI Review → Real Usage → Feedback → Refinement
```

Real workflows reveal problems that specifications cannot.

## Documentation and Commits

Engineering is incomplete until knowledge is preserved. Whenever architecture changes, update documentation, decision logs, technical debt records, and implementation notes (see `AGENTS.md` §14) — future contributors should understand *why* something exists, not only *how* it works.

Commits should represent complete thoughts, answering "what changed" and "why":

```
feat(products): add product image gallery
fix(orders): prevent duplicate order creation
refactor(ui): simplify bottom navigation
```

Avoid meaningless commit messages — history is documentation.

## Definition of Done Gate

Every feature must pass the full Definition of Done checklist in `AGENTS.md` §16 before merge. That checklist is the canonical standard; it is not repeated here so it can't drift out of sync.

## Continuous Improvement

Every sprint ends with reflection: What slowed us down? What surprised us? What should become a rule, a reusable component, or a skill? What technical debt was introduced? Engineering quality compounds through reflection.
