---
name: ui-review
description: Reviews a user interface for real-world usability by a non-technical business owner on a single mobile phone. Does not critique branding or aesthetics.
---

# UI Review

A read-only review skill. UX and mobile-first principles live in `AGENTS.md` §8, §9 — this skill applies them to one specific screen or flow. The test throughout: would the owner of Hanu Enterprises understand and use this without explanation, one-handed, on a mid-range Android phone?

## What to check

- **One-handed usability** — can the whole flow be completed with one thumb? Any action that assumes a second hand or a stable surface?
- **Touch targets** — are interactive elements comfortably tappable, with enough spacing to avoid accidental taps?
- **Thumb zone** — are primary actions placed within easy thumb reach (bottom nav, FAB, bottom sheet)? Any frequent action stranded in a top corner?
- **Readability** — clear type hierarchy, readable font sizes, sufficient contrast, short line lengths? Anything that would require zooming to read?
- **Information density** — is each screen doing one job, or is it overloaded with unrelated information and decisions? Is anything shown that the owner doesn't need right now?
- **Typing effort** — does the flow minimize typing in favor of dropdowns, pickers, suggestions, defaults, camera/scan input, and remembered values?
- **Navigation simplicity** — is the path to complete the task short and obvious, or does it require deep, hard-to-retrace navigation chains?
- **Accessibility** — keyboard/touch alternatives to gestures, screen reader labels, sufficient contrast, logical focus order.
- **Visual hierarchy** — does the screen immediately answer: where am I, what can I do, what should I do first? Is the primary action visually obvious over secondary ones?

## Process

1. Identify the screen or flow under review and the task it's meant to support.
2. Walk each checklist category above against the actual UI — cite the specific screen, component, or interaction for every finding.
3. Classify each finding:
   - **Blocking** — the flow can't realistically be completed one-handed, on mobile, by a non-technical user (e.g. unreachable primary action, required typing that should be a picker, no readable hierarchy).
   - **Should-fix** — usable but adds friction, confusion, or unnecessary effort.
   - **Note** — minor polish, not required.
4. Reference the relevant `AGENTS.md` §8/§9 principle for any blocking finding.
5. End with a clear verdict — approve, approve with changes, or do not proceed.

## Boundaries

- Do not critique branding, color choices, iconography style, or visual aesthetics — usability only. A screen can be visually plain and still pass; it cannot be beautiful and still fail if it's unusable one-handed.
- Do not write or edit code. Describe the fix; don't apply it.
- Do not review business logic, data correctness, or offline behavior — leave those to `code-review`, `architecture-review`, or `offline-first-review`.
