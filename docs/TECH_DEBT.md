# Hanu Technical Debt Log

> This document records known technical debt. Items are documented, not fixed, to maintain sprint discipline. Each item includes context, priority, and the expected resolution sprint.

---

## TD-002: Inventory Deduction on Order Creation

**Severity:** Medium
**Module:** Order / Product (cross-cutting)
**Sprint Introduced:** 3

Creating an Order does not deduct stock from Product inventory. This is intentional for Sprint 3 (the Order Builder was scoped explicitly without inventory effects), but must be resolved before the product is used for real order fulfillment.

**Resolution:** Introduce an Application-layer orchestrator or Domain Service that coordinates Order creation with Product stock adjustments in Sprint 4+.

---

## TD-003: Receipts & Invoices

**Severity:** Low
**Module:** Order (future)
**Sprint Introduced:** 3

No receipt or invoice generation exists. Orders are created and tracked, but no printable or shareable document is produced.

**Resolution:** Introduce a Reports or Invoices module in a future sprint. This should consume Order snapshots (§16 of ENGINEERING_STANDARD.md) to generate historically correct documents.

---

## TD-004: Payments Tracking

**Severity:** Medium
**Module:** Order (future)
**Sprint Introduced:** 3

Orders have no payment status, payment method, or partial payment tracking. The current `OrderStatus` (`pending`, `completed`, `cancelled`, `archived`) is a lifecycle status, not a payment status.

**Resolution:** Introduce a Payment entity or extend the Order domain with payment-specific fields in a future sprint. Payment tracking should remain a Domain concern — never a UI concern.

---

## TD-005: Reporting & Analytics

**Severity:** Low
**Module:** App Shell (future)
**Sprint Introduced:** 3

The Reports page is a placeholder. No analytics, sales summaries, or trend data is available.

**Resolution:** Introduce a Reports module that queries persisted Order data to produce sales summaries, customer insights, and product performance metrics.

---

## TD-006: Optimistic UI Updates

**Severity:** Low
**Module:** All
**Sprint Introduced:** 2

All mutation hooks (create, edit, archive) wait for the persistence operation to complete before updating the UI. This means the user sees a brief loading state on every action. Optimistic updates would provide instant feedback.

**Resolution:** Update mutation hooks to optimistically update local state, then reconcile on persistence success/failure. This requires careful error rollback logic.

---

## TD-007: Offline Sync Engine

**Severity:** High
**Module:** Infrastructure (cross-cutting)
**Sprint Introduced:** 2

Hanu is offline-first for reads (IndexedDB via Dexie), but has no synchronization engine for uploading local changes to a remote server (Supabase). All data currently lives exclusively in the browser's IndexedDB.

**Resolution:** Implement a sync queue in Infrastructure that tracks local mutations and replays them to Supabase when connectivity is available. This is the highest-priority infrastructure debt.
