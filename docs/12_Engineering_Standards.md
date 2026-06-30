# Hanu
# Engineering Standards

Version: 1.0

Status: Accepted

Owner: Dev Jaiswal

---

# Purpose

This document defines the engineering standards for Hanu.

These standards exist to ensure:

- Consistency
- Maintainability
- Readability
- Reliability
- Long-term scalability

These rules apply to every commit.

No exceptions without an ADR.

---

# Engineering Philosophy

Write code that is easy to delete.

Write code that is easy to understand.

Write code that is difficult to misuse.

Optimize for future maintainers.

Assume the future maintainer is yourself six months from now.

---

# General Principles

## Simplicity Wins

Never choose a more complex solution when a simpler one solves the same problem.

---

## Readability Wins

Readable code is preferred over clever code.

Future understanding is more valuable than saving a few lines.

---

## Business Logic First

Business rules never belong inside UI components.

Business rules belong inside the domain layer.

---

## Composition Over Inheritance

Prefer small composable modules.

Avoid deep inheritance hierarchies.

---

## Explicit Over Magic

Code should be understandable without hidden behavior.

Avoid unnecessary abstractions.

---

# File Standards

Maximum file length

300 lines

Preferred

150–200 lines

Files exceeding 300 lines should be reviewed for extraction.

---

# Function Standards

Functions should perform one task.

Maximum preferred length

40 lines

Longer functions require justification.

---

# Component Standards

React components should primarily render UI.

Avoid embedding business logic.

Split components when they become difficult to scan.

---

# Naming

Variables

Descriptive

Good

customerOrder

Bad

data

obj

item2

---

Functions

Verb based

createOrder()

shareProduct()

syncInventory()

---

Booleans

isLoading

hasOrders

canShip

shouldSync

---

Types

PascalCase

Order

Customer

InventoryItem

---

Constants

UPPER_SNAKE_CASE

MAX_IMAGE_SIZE

LOW_STOCK_LIMIT

---

Folders

kebab-case

---

# Comments

Prefer self-explanatory code.

Comments should explain

WHY

not

WHAT

Bad

// increment index

Good

// Prevent duplicate uploads caused by repeated taps

---

# Imports

Order

1.

External Libraries

2.

Internal Packages

3.

Shared

4.

Entities

5.

Features

6.

Widgets

7.

Relative Imports

Keep imports deterministic.

---

# State Management

Keep state as local as possible.

Lift state only when necessary.

Global state should be rare.

---

# Error Handling

Never silently swallow errors.

Every recoverable error should:

- be logged
- be surfaced appropriately
- have a recovery path

---

# Async Operations

Always assume:

- network failure
- timeout
- cancellation
- duplicate requests

Design accordingly.

---

# Accessibility

Every interactive element must:

- be keyboard accessible where applicable
- have an accessible name
- have sufficient touch area
- provide visible focus

Accessibility is not optional.

---

# Performance

Avoid premature optimization.

Measure before optimizing.

Optimize:

- slow renders
- large lists
- image loading
- bundle size

Do not optimize imaginary bottlenecks.

---

# Security

Never trust user input.

Validate everything.

Escape rendered content.

Protect secrets.

Never expose internal implementation.

---

# Offline Rules

Every write operation must:

Save locally first.

Sync later.

Never block user interaction because of the network.

---

# Git Standards

Small commits.

One logical change per commit.

Write meaningful commit messages.

Example

feat(products): add camera-first product creation

Avoid

update

fix

changes

---

# Pull Requests

Each PR should answer

What changed?

Why?

How was it tested?

What risks exist?

Screenshots if UI changed.

---

# Testing Philosophy

Test behavior.

Not implementation.

Priority

1.

Business Logic

2.

Use Cases

3.

Critical UI

4.

Edge Cases

---

# Code Review Checklist

Before merging ask:

Is this simpler?

Can this be understood quickly?

Does it violate architecture?

Does it duplicate logic?

Can it be tested?

Does it improve the product?

---

# Feature Checklist

Every feature must answer:

What user problem does this solve?

How much time does it save?

Which domain owns it?

Can it work offline?

Is it accessible?

Is it maintainable?

If these questions cannot be answered,

the feature is not ready.

---

# Definition of Done

A feature is complete only if:

✓ Business logic implemented

✓ Tests written

✓ Offline compatible

✓ Responsive

✓ Accessible

✓ Reviewed

✓ Documentation updated if needed

✓ No known critical bugs

---

# Final Principle

Every line of code should make Hanu easier to evolve.

Not just easier to ship.