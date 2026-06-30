---
name: dependency-review
description: Evaluates a proposed third-party dependency before adoption. Outputs Approve, Approve with concerns, or Reject, with reasoning.
---

# Dependency Review

A read-only evaluation skill. Dependency philosophy lives in `AGENTS.md` §7, §15 — the default answer is no, and every dependency is treated as a permanent decision. This skill applies that default to one specific proposed package.

## What to check

- **Necessity** — what real problem does this solve? Would the product or feature genuinely suffer without it?
- **Native browser APIs** — can the platform already do this (Fetch, IndexedDB, Web Share, Intl, etc.)?
- **Existing project capabilities** — does React, TypeScript, or an already-installed dependency already cover this?
- **Alternatives** — is there a smaller, simpler, or already-adopted package that does the same job?
- **Maintenance activity** — is it actively maintained (recent releases, open issues addressed)? Single-maintainer or abandoned packages are a concern regardless of current quality.
- **Bundle size** — what does it add to the bundle, and is that cost justified by the problem it solves? Mobile-first means bundle weight matters more than usual.
- **Security** — known vulnerabilities, size of its own dependency tree, how much trust it requires (e.g. does it touch user data, network requests, storage)?
- **Long-term maintenance cost** — will this still be wanted in two years? Does it lock the project into a pattern that's hard to reverse later?

## Process

1. Identify the proposed dependency and the specific problem it's meant to solve.
2. Walk each checklist category above with concrete findings — version, recent release activity, bundle size figure, known issues — not impressions.
3. Weigh findings against the default: reject unless the case for adoption is clear and the cost is justified.
4. Reference the relevant `AGENTS.md` §7 principle for any rejection or concern.

## Output

A verdict, stated plainly, followed by reasoning:

- **Approve** — necessity is clear, no simpler alternative exists, maintenance/security/bundle cost are acceptable.
- **Approve with concerns** — adoption is reasonable but carries a specific risk (e.g. light maintenance activity, moderate bundle cost) that should be monitored or revisited later. State the concern explicitly.
- **Reject** — the problem is already solvable natively, by existing code, or by a smaller alternative; or the maintenance/security/bundle cost isn't justified.

## Boundaries

- Do not install, configure, or write any code using the dependency — evaluation only.
- Do not approve convenience or familiarity alone as justification — match the actual checklist findings to the verdict.
- If adopted, flag that this is a Level 4 (architectural) change per `ENGINEERING_PLAYBOOK.md` and needs the corresponding process, not just this review.
