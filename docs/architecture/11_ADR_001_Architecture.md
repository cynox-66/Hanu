# ADR-001
# Core Architecture Decisions

Status: Accepted

Date: July 2026

Owner: Dev Jaiswal

---

# Context

Hanu is being built as a business assistant for home-based entrepreneurs.

Unlike traditional business software, Hanu prioritizes:

- Mobile-first UX
- Offline-first operation
- Local-first storage
- Simplicity
- Reliability

This ADR records the foundational engineering decisions that define Version 1.

These decisions should not change without a compelling technical reason.

---

# Decision 1

## Hanu is a Progressive Web App (PWA)

### Decision

Version 1 will be built as an installable Progressive Web App.

### Why

- Installable on Android
- No Play Store required
- Fast iteration
- Shared web technologies
- Lower development cost
- Faster user feedback
- Easy deployment

### Alternatives Considered

Native Android

Rejected because:

- Longer development time
- New ecosystem
- Higher maintenance cost
- Product still unvalidated

### Consequences

Positive

- Faster shipping
- Easier maintenance
- Easier updates

Negative

- Some native capabilities unavailable
- Less platform integration

---

# Decision 2

## Offline First

### Decision

Every primary business workflow must function without internet.

### Why

Users should never lose work because of network issues.

### Consequences

Every feature must:

- Read locally
- Write locally
- Sync later

Cloud becomes optional.

---

# Decision 3

## Local First

### Decision

The device owns the user's business data.

Cloud services provide:

- Backup
- Synchronization
- Storage

The cloud never owns the business.

---

# Decision 4

## Single User Design

### Decision

Version 1 optimizes for one user.

No staff.

No permissions.

No teams.

### Why

The target user runs the business alone.

Supporting multi-user workflows would significantly increase complexity without providing value.

---

# Decision 5

## Business Logic Separation

### Decision

Business logic never belongs inside React components.

It belongs inside the domain layer.

### Why

Frameworks change.

Business rules should not.

---

# Decision 6

## Feature-Sliced Design

### Decision

The project follows Feature-Sliced Design (FSD).

Architecture layers:

Shared

↓

Entities

↓

Features

↓

Widgets

↓

Pages

↓

App

### Why

- Scalable
- Predictable
- Easy onboarding
- Clear ownership

---

# Decision 7

## Domain-Driven Design

### Decision

The application models business concepts instead of database tables.

Primary domains:

- Product
- Order
- Customer
- Inventory
- Shipping
- Tasks

### Why

Business outlives implementation.

---

# Decision 8

## Event-Based Business Rules

Business changes are represented as events.

Examples

ProductCreated

OrderCreated

PaymentReceived

ShipmentCreated

OrderDelivered

Events coordinate modules.

Modules should not tightly depend on each other.

---

# Decision 9

## Repository Pattern

The UI never communicates directly with storage.

All persistence flows through repositories.

Benefits

- Easier testing
- Easier migration
- Better separation of concerns

---

# Decision 10

## Technology Philosophy

Choose boring technology.

Build interesting software.

Technology should never become the competitive advantage.

The workflow should.

---

# Decision 11

## Camera First

The camera is treated as a first-class input device.

Most business workflows begin with product photography.

The application should optimize around that reality.

---

# Decision 12

## Action First

Users think in actions.

Not entities.

The interface should expose:

Add Product

Ship Order

Pack Parcel

Share Product

instead of

Manage Products

Manage Inventory

Manage Customers

---

# Decision 13

## Dashboard Philosophy

Dashboard != Analytics

Dashboard = Today's Work

The dashboard answers one question:

"What should I do next?"

---

# Decision 14

## Engineering Quality

Every feature must satisfy:

- Type Safe
- Tested
- Accessible
- Offline Compatible
- Mobile Friendly
- Maintainable

Otherwise,

the feature is incomplete.

---

# Decision 15

## Versioning Philosophy

Version 1 solves operational problems.

Version 2 improves operations.

Version 3 expands customer experience.

Version 4 scales the business.

No future feature may compromise the simplicity of Version 1.

---

# Non-Negotiables

The following principles are frozen.

✓ Mobile First

✓ Offline First

✓ Local First

✓ Camera First

✓ Action First

✓ Simplicity Over Features

✓ Reliability Over Complexity

✓ Domain Driven Design

✓ Feature-Sliced Design

✓ Business Logic Separation

Any proposal violating these principles requires a new ADR.

---

# Review Process

Architecture decisions may only be changed when:

1. There is measurable evidence the current decision is inadequate.

2. The benefits outweigh migration costs.

3. A new ADR documents the reasoning.

Architecture should evolve deliberately, never accidentally.

---

# Final Statement

Hanu is not built to showcase frameworks.

Hanu is built to quietly remove friction from a person's daily work.

Every engineering decision should move the product closer to that goal.