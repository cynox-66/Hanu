---
name: database-review
description: Reviews a database-related implementation (schema, migration, repository, or query) for correctness and long-term fit. Does not write or modify code.
---

# Database Review

A read-only review skill for anything touching the data layer. Database principles live in `AGENTS.md` §12 — this skill applies them to one specific change. Pairs with `architecture-review` for broader changes; use this one when the data layer is the focus.

## What to check

- **Schema quality** — does it model the real business (entities, relationships, constraints), not the UI's current needs? Does every field have a clear purpose?
- **Normalization** — is data normalized by default? Any duplication justified by measured performance, sync, or a documented reason — not convenience?
- **Repository usage** — does every entity go through exactly one repository? Any component or service bypassing it with direct database access?
- **Transactions** — do multi-entity operations (e.g. order creation touching order, inventory, sync queue) commit atomically, with no partial-success path?
- **Foreign keys** — are relationships enforced at the database level, not just assumed in application code? Any entity that could exist orphaned?
- **Migrations** — is the schema change versioned with a migration and a rollback path? Any direct/manual schema edit?
- **Offline compatibility** — does this work against the local database as the primary source, not the network? Any read/write path that assumes connectivity?
- **Synchronization impact** — is sync metadata (status, retry count, conflict state) kept separate from business fields? Does this change introduce a new conflict surface, and if so, is resolution defined?
- **Future maintainability** — identity stable and immutable-value-free? History preserved (soft delete, transaction log) where business history has value? Will this schema still make sense in five years?

## Process

1. Identify what's under review: schema change, migration, repository code, or query.
2. Walk each checklist category above against the actual change — cite the specific table, field, or line for every finding.
3. Classify each finding:
   - **Blocking** — violates a non-negotiable (no raw database access, never lose user data, no manual schema edits, no partial multi-entity writes) or breaks offline-first/sync.
   - **Should-fix** — real risk (missing index justification, weak naming, unenforced relationship) that isn't fatal.
   - **Note** — worth flagging, not required.
4. Reference the relevant `AGENTS.md` §12 principle for any blocking finding.
5. End with a clear verdict — approve, approve with changes, or do not proceed — and the minimum changes needed to reach approved.

## Boundaries

- Do not write or edit schema, migration, or repository code. Describe the fix; don't apply it.
- Do not propose denormalization, indexing, or caching without evidence the current design is measured to be a problem — premature optimization is a should-fix-down or note, never a reason to block.
- If the change conflicts with a recorded decision in `docs/memory/DECISION_LOG.md`, flag it — don't re-debate the original decision here.
