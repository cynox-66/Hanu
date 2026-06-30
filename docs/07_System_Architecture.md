# Hanu
# System Architecture

Version: 1.0

Status: Draft

Owner: Dev Jaiswal

---

# Purpose

This document defines the high-level architecture of Hanu.

It describes how the application is structured,
how components communicate,
where business logic lives,
and how data flows throughout the system.

This document intentionally avoids implementation details.

---

# Architecture Goals

The architecture must be:

- Offline First
- Mobile First
- Local First
- Modular
- Testable
- Maintainable
- Scalable
- Framework Independent

---

# Architectural Philosophy

Hanu is built around one principle:

Business Logic must not depend on the UI.

The UI may change.

The framework may change.

The backend may change.

The business should not.

---

# High-Level Architecture

```

                  User

                    │

                    ▼

             Presentation Layer

                    │

                    ▼

              Application Layer

                    │

                    ▼

                Domain Layer

                    │

                    ▼

            Infrastructure Layer

                    │

     ┌──────────────┴──────────────┐

     ▼                             ▼

Local Database               Cloud Services

```

---

# Layer Responsibilities

---

## Presentation Layer

Purpose

Everything the user sees.

Contains

- Pages
- Components
- Navigation
- Forms
- Animations
- User Feedback

Must NOT contain:

Business Rules

Database Queries

Synchronization Logic

---

## Application Layer

Purpose

Coordinates workflows.

Examples

Create Product

Create Order

Ship Order

Share Product

Generate Daily Tasks

Responsibilities

- Validate requests
- Coordinate domains
- Trigger events
- Handle use cases

Should contain no UI code.

---

## Domain Layer

Purpose

Represents the business.

Contains

- Entities
- Business Rules
- Domain Events
- Value Objects

This is the heart of Hanu.

Nothing outside this layer should define business rules.

---

## Infrastructure Layer

Purpose

Communicates with the outside world.

Examples

Database

Storage

Camera

Notifications

Cloud Sync

Courier APIs

WhatsApp Integration

Responsibilities

Read

Write

Upload

Download

Sync

Never contain business logic.

---

# Data Flow

Every operation follows the same path.

```

User Action

↓

UI

↓

Application

↓

Domain

↓

Infrastructure

↓

Database

↓

UI Updates

```

Never bypass layers.

---

# Feature Flow Example

Create Product

```

User taps

↓

Add Product

↓

Application validates

↓

Domain creates Product

↓

Infrastructure stores Images

↓

Infrastructure saves Product

↓

Dashboard updates

```

---

# Dependency Rules

Presentation

↓

Application

↓

Domain

↓

Infrastructure

Dependencies only flow downward.

Never upward.

---

# Communication Rules

UI never talks directly to:

Database

Storage

Cloud

Courier

Authentication

Everything passes through the Application Layer.

---

# Module Structure

Core Modules

Products

Orders

Customers

Inventory

Shipping

Tasks

Each module owns:

UI

Business Logic

Use Cases

Repositories

Types

Tests

---

# Repository Pattern

Every domain accesses data through repositories.

Example

ProductRepository

OrderRepository

CustomerRepository

Repositories hide implementation details.

The Domain never knows where data is stored.

---

# Event-Driven Architecture

Business Events

Product Created

Order Created

Payment Received

Shipment Created

Order Cancelled

Stock Updated

Events notify interested modules.

Avoid direct coupling.

---

# Local First

Primary Source

Local Database

Secondary Source

Cloud

The application should continue functioning if the cloud disappears.

---

# Cloud Responsibilities

Backup

Sync

Storage

Authentication

Future Integrations

Cloud is an enhancement.

Not a dependency.

---

# State Ownership

Presentation State

Current Screen

Dialogs

Loading

Selections

Application State

Current User

Products

Orders

Customers

Tasks

Domain State

Business Rules

Entities

Infrastructure State

Sync

Network

Storage

Permissions

---

# Error Handling

Errors propagate upward.

Infrastructure

↓

Application

↓

Presentation

The UI never receives raw database errors.

Errors must be translated into user-friendly language.

---

# Logging

Log

Unexpected Failures

Sync Problems

Critical Errors

Do NOT log

Passwords

Payment Information

Personal Data

---

# Security Boundaries

Business Rules

↓

Application

↓

Infrastructure

↓

External Services

Never expose internal implementation details to external systems.

---

# Scalability Strategy

Version 1

Single User

Single Device

Offline First

---

Version 2

Multiple Devices

Cloud Sync

Courier Integration

---

Version 3

Customer Website

Catalog

Automation

---

Version 4

Team Accounts

Warehouse

Analytics

---

# Architecture Principles

Every feature should:

Have one responsibility.

Own one domain.

Expose one interface.

Hide implementation.

Be independently testable.

---

# Anti-Patterns

Never

Put business logic inside React components.

Call the database directly from UI.

Mix synchronization with business rules.

Duplicate validation logic.

Create "utility" files for unrelated code.

Share mutable global state.

---

# Engineering Checklist

Every new feature must answer:

Which layer owns this?

Which domain owns this?

What business rule does it enforce?

Which events does it produce?

Which repository does it use?

If these questions cannot be answered,

the feature is not ready.

---

# Final Principle

Architecture exists to make future change easier.

Every decision should optimize for simplicity,
maintainability,
and correctness over cleverness.