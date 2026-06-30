---
trigger: glob
globs: ["**/*.tsx", "**/*.jsx"]
description: Rules for React components — presentation, state, hooks, accessibility
---

# React Component Rules

Applies whenever a component is created or modified. Architecture context lives in `AGENTS.md` §5, §7, §11 — this file is the quick-check version for component-level work.

## Components are presentational

A component answers *"what should be displayed?"* — never *"how does the business work?"*

- No fetch calls, repository calls, or validation logic inside a component body.
- No business calculations (totals, statuses, eligibility) — compute these in a hook, service, or the domain layer and pass the result in.
- If a component needs more than light formatting logic, that logic belongs in a hook.

## Hooks own behavior

- Shared business logic goes in a custom hook (`useProducts`, `useOrders`, `useOfflineSync`), not duplicated across components.
- A hook should encapsulate *behavior*; it should not return JSX or know about layout.
- Don't create a hook for logic used exactly once — extract on the third repetition (Rule of Three), not the first.

## State ownership

Before adding `useState`, ask: can this be derived from props or existing state? If yes, derive it — don't store it.

- **UI state** (open/closed, selected tab, search input, loading flag) → local component state.
- **Business state** (products, orders, customers, payments) → repository/database via a hook, never raw component state.
- Keep state as local as possible. Promote to a shared/global store only when multiple unrelated components genuinely need it — and document why.

## Props and boundaries

- Components receive data via props; avoid components reaching into global stores or services directly when a prop would do.
- Keep the public prop surface small and typed — no `any`, no untyped object blobs (`props: Record<string, any>`).
- Prefer composition (children, render props, small focused components) over deeply configurable "god components."

## Accessibility (non-optional)

Every interactive element must support:
- Keyboard navigation and a sane focus order
- Screen reader labels (`aria-label`, semantic HTML over `<div onClick>`)
- Sufficient color contrast
- A non-gesture alternative for any swipe/drag interaction

If a component fails any of these, it is not done — regardless of how it looks.

## Performance

- Don't memoize (`useMemo`, `useCallback`, `React.memo`) without a measured reason — premature memoization adds complexity without proven benefit.
- Watch for re-render triggers from new object/array/function literals passed as props in render.
- Prefer splitting a large component over micro-optimizing a monolithic one.

## Mobile responsiveness

- Build for the phone viewport first; verify before checking desktop.
- Touch targets must be comfortably tappable — no controls sized for a mouse cursor.
- Primary actions belong in the thumb zone (bottom nav, FAB, bottom sheet) — not the top corners.
- No layout that requires horizontal scrolling or pinch-zoom to read.

## Quick self-check before committing a component

- Would this component still make sense if the business logic it depends on changed entirely?
- Does it work with one hand, on a small screen, with no network?
- Could someone unfamiliar with the codebase read it and know what it renders and why?

If any answer is no, it isn't finished.
