---
name: testing-review
description: Reviews an implementation for testing completeness and recommends missing tests. Does not write test code.
---

# Testing Review

A read-only review skill. Testing philosophy lives in `AGENTS.md` §7, §16 (testing creates confidence, not coverage numbers) — this skill applies it to one specific change. Recommends what's missing; never writes the tests.

## What to check

- **Missing unit tests** — does each new function, hook, or domain rule have a test verifying its expected behavior? Any pure logic shipped untested?
- **Missing integration tests** — do multi-step workflows (e.g. create order → reserve inventory → queue sync) have a test covering the flow end to end, not just each piece in isolation?
- **Edge cases** — empty states, boundary values, duplicate submissions, concurrent actions — are the realistic edge cases for this feature actually covered, or only the happy path?
- **Offline scenarios** — is there a test for the feature behaving correctly with no connectivity, and for sync resuming once connectivity returns?
- **Validation** — is invalid input (missing fields, wrong types, out-of-range values) tested at the layer that's supposed to catch it?
- **Error paths** — are failure cases tested, not just success cases — network failure, sync failure, write failure — and do tests confirm the failure is handled visibly and recoverably, not silently swallowed?
- **Regression coverage** — if this change fixes a bug, is there a test that would have caught the original bug and will catch its reappearance?

## Process

1. Identify the implementation under review and what it's supposed to do.
2. Walk each checklist category above against the actual test suite for this change — cite the specific scenario that's missing, not a generic "needs more tests."
3. Classify each finding:
   - **Blocking** — no tests exist for a non-trivial business rule, an offline path, or a known prior bug; correctness is unverified.
   - **Should-fix** — happy path covered but real edge cases or error paths are missing.
   - **Note** — minor gap or nice-to-have coverage, not required.
4. Recommend each missing test as a one-line description of intent (what scenario, what it should assert) — not the test code itself.
5. End with a clear verdict — sufficient, sufficient with additions needed, or insufficient.

## Boundaries

- Do not write or generate test code. Describe what's missing; let the engineer implement it.
- Do not chase coverage percentage — a test that doesn't increase real confidence isn't a finding, it's noise.
- Do not review general code quality, architecture, or offline implementation correctness — only whether behavior is adequately verified. Leave those to `code-review`, `architecture-review`, or `offline-first-review`.
