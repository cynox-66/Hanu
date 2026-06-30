---
name: offline-first-review
description: Reviews an implementation exclusively for Offline-First compliance. Does not review general code quality and does not write code.
---

# Offline-First Review

A narrow, read-only review skill. Offline-first architecture lives in `AGENTS.md` §10 — this skill checks one implementation against it. Use `code-review` or `architecture-review` for everything else; this skill stays in its lane even if other issues are visible.

## What to check

- **Local-first writes** — does every user action validate and write to the local database before anything else? Any path that calls the network before writing locally?
- **Optimistic updates** — does the UI update immediately on local write, or does it wait on a network round-trip (`Tap Save → Loading...`)? The interface must never feel network-dependent.
- **Sync queue usage** — does every network-dependent operation (create, update, delete, image upload) enter the synchronization queue rather than firing an immediate, un-queued request?
- **Conflict handling** — are conflicts treated as expected, not exceptional? Is there a defined resolution path that preserves user data, explains what happened, and offers recovery — never a silent overwrite?
- **Retry strategy** — do failures retry automatically (on reconnect, app reopen, periodic background sync) rather than requiring the user to manually retry?
- **Network assumptions** — does any part of this implementation assume connectivity is present, stable, or fast? Any blocking spinner gated purely on a network call?
- **User data safety** — once the user has acted (e.g. pressed save), is the work safe regardless of connectivity, app restart, or sync failure? Any path where data could be lost rather than queued?
- **Graceful offline behavior** — does the UI clearly communicate offline/syncing/synced/failed state without alarming language ("Working Offline — will sync automatically," not raw error text)? Does the feature remain usable, not just non-crashing, with no connection?

## Process

1. Identify the implementation under review and the user actions it covers.
2. Walk each checklist category above against the actual code — cite the specific function, component, or call site for every finding.
3. Classify each finding:
   - **Blocking** — breaks local-first writes, loses or risks user data, or makes a feature non-functional offline.
   - **Should-fix** — works but degrades gracefully poorly, weak retry/conflict handling, unclear sync status to the user.
   - **Note** — worth flagging, not required.
4. Reference the relevant `AGENTS.md` §10 principle for any blocking finding.
5. End with a clear verdict — approve, approve with changes, or do not proceed.

## Boundaries

- Do not comment on naming, structure, duplication, types, or other general code quality — even if noticed, leave it for `code-review`.
- Do not write or edit code. Describe the fix; don't apply it.
- If the implementation isn't network-dependent at all (no sync, no remote calls), say so and confirm there's nothing to review rather than forcing findings.
