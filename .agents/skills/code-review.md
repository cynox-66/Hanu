---
name: code-review
description: Performs a rigorous engineering review of a code change and provides actionable feedback.
---

# Code Review

Reviews actual code (a diff, PR, or file), as opposed to `architecture-review`, which reviews plans and designs. Priority order for findings follows `AGENTS.md` §13: correctness → architecture → simplicity → maintainability → readability → performance → style.

## Checklist

- **Correctness** — does it do what it claims? Are edge cases and invalid input handled? Any obvious regressions?
- **Architecture** — layer boundaries respected, no business logic in components, dependencies point inward, existing patterns reused.
- **Readability** — would an unfamiliar engineer understand intent without explanation? Names describe purpose, not implementation detail.
- **Duplication** — is logic copy-pasted that should be shared, or prematurely abstracted that should stay local?
- **Naming** — descriptive function/variable names; no `data`, `temp`, `helper`, `handleEverything`.
- **TypeScript** — no unjustified `any`, no `@ts-ignore`, no unsafe casts or unnecessary `!`, exhaustive switches where relevant.
- **Mobile UX** — touch targets, thumb-zone placement, no layout breakage, minimal typing required.
- **Offline-first** — local write before UI update, queued sync for network operations, graceful offline failure.
- **Maintainability** — file/function size, single responsibility, no dead code, no speculative abstraction.

## Process

1. Read the change in full before commenting — don't review line-by-line on first pass.
2. Walk the checklist above against the actual diff, not assumptions about what it probably does.
3. For every issue: state what's wrong, why it matters (which principle or non-negotiable it touches), and a concrete suggested fix — not just "this could be better."
4. Separate feedback into **must-fix** (correctness, architecture, data-safety, non-negotiable violations) and **suggested** (style, minor readability, optional refactors). Never let suggested items block on the same footing as must-fix ones.
5. Acknowledge what's done well — review is calibration, not just fault-finding.
6. Skip formatting/whitespace nitpicks the formatter already owns (`AGENTS.md` §7).

## Output format

A short summary verdict first (approve / approve with comments / changes requested), followed by the categorized findings list.
