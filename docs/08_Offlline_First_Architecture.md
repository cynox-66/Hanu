# Hanu
# Offline-First Architecture

Version: 1.0

Status: Draft

Owner: Dev Jaiswal

---

# Purpose

This document defines Hanu's offline-first architecture.

Offline support is not a feature.

Offline support is a core architectural principle.

Every feature must function correctly without an internet connection.

Cloud synchronization is an enhancement,
never a requirement.

---

# Why Offline First?

Hanu is designed for home business owners who may experience:

- Slow mobile internet
- Unstable 4G
- Temporary network outages
- Exhibition environments
- Travel
- Rural or semi-urban connectivity

The user should never lose work because the internet disappears.

---

# Core Principles

## Local Is Truth

The local device is always the primary source of truth.

The cloud is a synchronization layer.

---

## Write Locally First

Every action is immediately written locally.

Never wait for the network.

---

## Sync Later

Synchronization occurs automatically.

The user should never manually trigger syncing.

---

## No Blocking

The application should never display:

"Waiting for Internet..."

for normal business operations.

---

# Data Ownership

```
        User

          │

          ▼

   Local Database

          │

          ▼

     Sync Engine

          │

          ▼

        Cloud
```

---

# Data Flow

Every action follows this sequence.

```
User Action

↓

Validate

↓

Save Locally

↓

Update UI

↓

Queue Sync

↓

Background Upload

↓

Success
```

Never reverse this order.

---

# Example

Create Product

```
Take Photo

↓

Compress Image

↓

Store Image Locally

↓

Save Product

↓

Dashboard Updates

↓

Background Upload

↓

Sync Complete
```

The product should appear instantly.

---

# Sync Engine

Responsibilities

- Upload changes

- Download updates

- Resolve conflicts

- Retry failed requests

- Track sync status

The Sync Engine owns all communication with the backend.

---

# Sync Queue

Every write operation creates a queue item.

Example

```
Create Product

↓

Queue

↓

Waiting

↓

Uploading

↓

Synced
```

The queue survives app restarts.

---

# Synchronization Rules

Always sync:

Products

Orders

Customers

Settings

Tasks

Images

Never sync:

Temporary UI state

Current Screen

Search Queries

Loading State

---

# Conflict Resolution

Version 1 assumes:

Single User

Single Device

Conflicts should never occur.

Future versions may introduce:

Last Write Wins

Manual Conflict Resolution

Operational Transform

CRDTs

Not required in Version 1.

---

# Network States

Online

↓

Everything works.

↓

Background Sync

---

Offline

↓

Everything works.

↓

Sync Paused

---

Restored

↓

Automatic Sync

↓

User continues working

---

# Image Strategy

Product images exist in two locations.

Local

↓

Full Resolution

Cloud

↓

Compressed

↓

Optimized

Never depend on remote images.

---

# Sync Indicators

Never expose technical terminology.

Bad

"Synchronization failed."

Good

"Changes will upload when you're back online."

---

# Failure Recovery

If upload fails

↓

Retry automatically

↓

Exponential Backoff

↓

Notify only if persistent

Never interrupt normal work.

---

# Background Sync

Allowed

Products

Orders

Images

Customer Updates

Settings

Future

Courier Tracking

Notifications

---

# Data Integrity

Rules

Never delete local data before cloud confirmation.

Never overwrite unsynced changes.

Never discard user work.

---

# Backup Strategy

Automatic

Encrypted

Incremental

Background

The user should rarely think about backups.

---

# Security

Local database encrypted.

Communication encrypted.

Authentication tokens stored securely.

No plaintext sensitive data.

---

# Performance Goals

Local Read

Instant

Local Write

<100ms

Sync

Background

Image Compression

Automatic

Startup

<2 seconds

---

# Error Philosophy

The user should never fear losing work.

Instead of:

"Upload Failed"

Say:

"Saved on this device.
We'll upload automatically."

---

# Offline UX

Every screen should continue functioning.

Allowed Offline

✓ Add Product

✓ Edit Product

✓ Create Order

✓ Search

✓ Customers

✓ Dashboard

✓ Inventory

Not Allowed

Blocking screens

Retry dialogs

Mandatory internet checks

---

# Engineering Rules

Every new feature must answer:

Can this work without the internet?

If not,

why?

If the answer is

"Because we didn't build it"

the architecture is wrong.

---

# Version 1 Assumptions

One User

One Device

No concurrent edits

No conflict resolution

Background synchronization only

---

# Future Evolution

Version 2

Multiple Devices

Automatic Merge

Courier APIs

---

Version 3

Customer Website

Shared Inventory

Live Updates

---

Version 4

Team Collaboration

Real-Time Sync

Conflict Resolution

Audit Logs

---

# Final Principle

Internet should make Hanu better.

Internet should never make Hanu usable.

The user owns their business.

The device owns the data.

The cloud simply keeps everything safe.