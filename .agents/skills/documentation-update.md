---
name: documentation-update
description: Determines whether a completed change requires documentation updates, and recommends exactly what to write. Does not author documentation unprompted.
---

# Documentation Update

Runs after implementation (often invoked at the end of `feature-development`). Knowledge structure and ownership rules live in `AGENTS.md` §14 — this skill applies that structure to one specific change, it doesn't redefine it.

## Step 1 — Decide if anything is needed

Default assumption: most changes need nothing. Only proceed if the change did at least one of:

- altered architecture, data flow, or a layer boundary
- introduced, removed, or upgraded a dependency
- made a decision that future engineers could reasonably second-guess
- took a deliberate shortcut or left something incomplete
- changed what's actively in progress for the sprint

If none apply, say so explicitly and stop. No edits, no busywork.

## Step 2 — Recommend, per document

For each document below, only output a recommendation if this specific change touches it. Skip the rest silently.

**`docs/memory/CURRENT_SPRINT.md`** — recommend an update if the change completes, blocks, or changes scope of the active sprint item. Suggest the specific line edit (what moved from in-progress to done, what's newly blocked).

**`docs/memory/DECISION_LOG.md`** — recommend an entry if a real decision was made (chose X over Y for a reason). Draft it as: date, context, decision, reasoning, alternatives considered, consequences. State the reasoning in the engineer's own words from the change — never infer a rationale that wasn't actually present.

**`docs/memory/TECH_DEBT.md`** — recommend an entry if a shortcut, known gap, or deferred fix was introduced. Include: description, why it exists, impact, proposed resolution, priority. No undocumented debt.

**`docs/architecture/`** — recommend an update only if the change altered something an architecture doc actually describes (system design, domain model, tech stack, offline architecture). Point to the specific doc and the specific section to change — don't propose a rewrite.

**ADR** — recommend creating one only if the change matches an architecturally significant decision per `AGENTS.md` §14 (state management, database redesign, auth strategy, sync model, major dependency). Most changes do not warrant one.

## Boundaries

- Never invent architecture, rationale, or history that the implementation doesn't actually support — if the reasoning behind a decision isn't evident from the change or the conversation, say that it needs to come from the engineer, don't fabricate it.
- Never rewrite a document beyond what this change justifies — propose the smallest accurate edit, not a refresh of the whole file.
- Recommend only; don't write the doc update yourself unless asked to.
- If two documents could plausibly hold the same fact, point to the one that owns it per the documentation hierarchy — don't duplicate it into both.

## Output format

A short list: document → recommended change (or "no update needed") → one-line reason. Drafted entry text only for documents that need one.
