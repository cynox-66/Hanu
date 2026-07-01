# Hanu

# Information Architecture

Version: 1.0

Status: Draft

Owner: Dev Jaiswal

---

# Purpose

This document defines how information is organized throughout Hanu.

It answers one simple question:

> Where should users expect to find things?

A good Information Architecture minimizes thinking.

Users should instinctively know where every action belongs.

---

# Design Philosophy

Hanu is not organized around databases.

Hanu is organized around work.

Every screen should help the user complete a task.

---

# Navigation Principles

Version 1 follows five principles.

## 1. Flat Navigation

No deep nesting.

Maximum hierarchy depth:

2 levels

Bad

Dashboard

↓

Products

↓

Inventory

↓

Categories

↓

Edit

Good

Dashboard

↓

Products

↓

Product

---

## 2. Action Before Management

Users perform actions more frequently than they manage information.

Primary actions always remain one tap away.

Examples

✓ Add Product

✓ New Order

✓ Ship Order

✓ Share Product

---

## 3. Minimal Navigation

The user should never wonder

"Where is this feature?"

If uncertainty exists,

the IA has failed.

---

## 4. Progressive Disclosure

Show only what is necessary.

Advanced information appears only when required.

Never overwhelm the user.

---

## 5. Consistency

Every screen follows identical interaction patterns.

Search always appears in the same location.

Save buttons remain identical.

Navigation behaves consistently.

---

# Root Navigation

Version 1 consists of five primary destinations.

```

Dashboard

Products

Orders

Customers

Settings

```

Inventory exists inside Products.

Shipping exists inside Orders.

This reduces navigation complexity.

---

# Dashboard

Purpose

Today's work.

Contains

Today's Tasks

Pending Orders

Pending Shipments

Pending Payments

Low Stock

Quick Actions

Nothing else.

---

# Products

Purpose

Everything related to products.

Contains

Product List

Search

Categories

Archived Products

Individual Product

---

Individual Product

Images

Price

Stock

Description

Notes

Share

Edit

Archive

Delete

---

# Orders

Purpose

Everything related to customer purchases.

Contains

Order List

Filters

Search

Individual Order

---

Individual Order

Customer

Products

Payment

Shipping

Notes

Timeline

---

# Customers

Purpose

Relationship history.

Contains

Customer List

Search

Customer Profile

Order History

Notes

Contact Shortcut

---

# Settings

Purpose

Rarely used configuration.

Contains

Business Name

Theme

Backup

Restore

App Information

About

---

# Global Components

These components remain available throughout the application.

Search

Floating Action Button

Notifications

Bottom Navigation

Dialogs

---

# Bottom Navigation

Dashboard

Products

Orders

Customers

Settings

Maximum:

Five tabs.

Never more.

---

# Floating Action Button

The Floating Action Button changes based on context.

Dashboard

↓

New Product

Products

↓

New Product

Orders

↓

New Order

Customers

↓

New Customer

Settings

↓

No FAB

---

# Search

Global search exists throughout the application.

Searches

Products

Customers

Orders

Phone Numbers

Categories

Results appear instantly.

---

# Notifications

Notifications never interrupt work.

Allowed

Low Stock

Pending Orders

Pending Payments

Backup Failed

Not Allowed

Marketing

Tips

Promotions

Advertisements

Achievement Badges

---

# Empty States

Every screen should explain itself.

Example

No Products Yet

↓

Add your first product.

↓

Large Add Product button.

Never display empty tables.

---

# Error States

Errors should explain

What happened

Why

How to fix it

Example

Internet unavailable.

↓

Your work has been saved locally.

↓

We'll sync automatically.

---

# Loading States

Never show blank screens.

Use skeleton loading.

Maintain layout stability.

---

# Screen Hierarchy

```

Dashboard

├── Today's Tasks

├── Pending Orders

├── Pending Payments

└── Quick Actions

Products

├── Product List

├── Product Details

└── Product Editor

Orders

├── Order List

├── Order Details

└── Shipping

Customers

├── Customer List

└── Customer Details

Settings

├── Business

├── Backup

└── About

```

---

# User Mental Model

Users think

"I need to pack today's parcels."

Not

"I need to edit Order #241."

Users think

"I need to post today's arrivals."

Not

"I need Product Management."

Every navigation decision should reinforce this mental model.

---

# IA Validation Checklist

A proposed feature should answer:

Can users find it in under 3 seconds?

Does it belong naturally to an existing section?

Does it increase navigation complexity?

Does it require a new root page?

If yes,

it probably belongs in a future version.

---

# Version 1 Navigation Freeze

The following navigation is frozen.

Dashboard

Products

Orders

Customers

Settings

No additional root navigation items may be introduced during Version 1 development without revisiting this document.

---

# Final Principle

Users should spend their time running their business,

not learning the application.
