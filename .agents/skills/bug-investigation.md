---
name: bug-investigation
description: Systematic bug investigation. Never jumps straight to a fix — reproduces, finds root cause, then resolves.
---

# Bug Investigation

Never patch a symptom on sight. A recurring or unclear bug is the architecture asking for attention (`AGENTS.md` §4) — treat the investigation as seriously as the fix.

## Procedure

1. **Reproduce.** Establish exact steps, inputs, and conditions that trigger the bug. If it can't be reproduced, say so explicitly and gather more information (logs, repro conditions, online/offline state, device) before proceeding — don't guess at a fix for something unconfirmed.

2. **Identify root cause.** Trace the failure to its actual origin, not its first visible symptom. Ask: is this a one-off mistake, or does the same shape of bug appear elsewhere (duplicate validation, repeated calculation, similar past reports)? If so, the cause is architectural, not local.

3. **Explain the root cause** in plain terms before proposing anything: what broke, why it broke, and why it produced the observed symptom. If the explanation requires guessing, flag the uncertainty rather than presenting it as fact.

4. **Suggest a solution.** Prefer the fix that addresses the root cause over the one that hides the symptom. Note any trade-offs, and flag if the right fix is bigger than the bug (e.g. requires an architectural change) — surface that rather than quietly scoping it down.

5. **Implement the fix**, following `feature-development` for anything beyond a trivial one-line change. Keep the fix scoped to the bug — don't bundle unrelated improvements into the same change.

6. **Suggest regression tests** that would have caught this bug, and would catch it again if the root cause resurfaces elsewhere in the codebase.

## Non-negotiables specific to debugging

- Never silently catch and discard an error while investigating — instrument it, don't suppress it.
- Never ship a fix for a bug you couldn't reproduce or fully explain.
- If user data was affected, prioritize establishing whether it's recoverable before anything else.
