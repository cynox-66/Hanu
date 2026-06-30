---
name: react-review
description: Specialized review of React-specific implementation quality — components, hooks, state ownership, rendering, forms. Does not replace code-review, ui-review, or architecture-review.
---

# React Review

A read-only review skill scoped exclusively to React engineering quality. Baseline standards live in `.agents/rules/react-components.md` (always applied while writing React) — this skill is the deeper audit pass on top of that baseline, for when a component or hook needs a dedicated review. It does not write or edit code.

This is one of several review skills with overlapping surface area — the boundary matters:
- **`code-review`** covers general correctness, TypeScript, naming, duplication across any code, React or not.
- **`ui-review`** covers usability for the business owner — touch targets, thumb zone, readability, navigation.
- **`architecture-review`** covers layer boundaries and whether business logic leaked into the wrong place.
- **`react-review`** (this skill) covers whether the *React itself* — component shape, hooks, state, rendering — is well engineered.

A single PR may warrant several of these; `dispatcher` decides which. This skill stays in its lane even when it notices something outside it — note it briefly and point to the right skill rather than reviewing it here.

## What to evaluate

**Components** — single responsibility, reusability, composition over duplication, readability without external explanation. Is this component still presentational, or has business logic crept in?

**State ownership** — for each piece of state, does it belong in local component state, a custom hook, or a shared store? Flag duplicated state (the same fact tracked in two places) and derived state that's stored rather than computed (e.g. a count kept in `useState` when `items.length` would do).

**Hooks** — review every `useState`, `useEffect`, `useMemo`, `useCallback`, and `useRef` for:
- effects that don't need to exist (the logic could run in an event handler instead)
- missing cleanup (subscriptions, timers, listeners)
- stale closures (captured values that go out of date)
- incorrect or incomplete dependency arrays
- memoization with no measured benefit, adding complexity for nothing

Apply current React best practices — derive state during render where possible, prefer event handlers over effects for user-triggered logic, and treat `useEffect` as the exception, not the default tool.

**Rendering** — unnecessary re-renders, expensive computation on every render, correct `key` usage in lists (stable identity, not index, unless the list is truly static), conditional rendering clarity, whether a component has grown large enough that splitting it would improve clarity. Recommend an optimization only when there's a concrete reason — never preemptively.

**Forms** — controlled vs. uncontrolled input choice and consistency, where validation state lives, whether validation logic has leaked into the component instead of a hook, and basic accessibility (labels, error association, focus management).

**Context usage** — is context the right tool here, or would prop-passing or a smaller-scoped hook be simpler? Flag context used for state that only one or two components actually need.

**Code organization** — component and file size, naming, whether concerns are separated into the right files. Recommend extracting a custom hook only when the complexity actually justifies it — don't manufacture a hook for logic used once.

## Process

1. Identify the component(s) or hook(s) under review and what they're responsible for.
2. Walk each evaluation area above against the actual code — cite the specific component, hook, or line for every finding.
3. Classify each issue:
   - **Critical** — incorrect behavior risk: stale closures, missing cleanup, broken dependency arrays, business logic inside a component, state duplication that can desync.
   - **Important** — real quality problem, not behavior-breaking: unnecessary effects, poor state placement, components doing too much, weak naming.
   - **Suggested** — would improve the code but is optional: a possible extraction, a memoization that *might* help if proven necessary, a readability tweak.
4. For anything outside this skill's scope (offline behavior, database calls, dependency choices, visual design, test coverage), note it in one line and name the skill that owns it — don't review it here.

## Output format

```
## Summary
(one or two sentences — overall state of the React code)

## Strengths
- ...

## Issues
Critical:
- ...
Important:
- ...
Suggested:
- ...

## Recommendations
(ordered by priority; note trade-offs where a fix has a real cost, e.g.
"extracting this hook adds an indirection layer for a pattern used twice — wait for a third use")
```

## Boundaries

Do not review: database design, offline/synchronization behavior, broader architecture, dependency choices, visual/aesthetic design, or test coverage — those belong to `database-review`, `offline-first-review`, `architecture-review`, `dependency-review`, `ui-review`, and `testing-review` respectively. Do not write or modify code; describe the fix, don't apply it.
