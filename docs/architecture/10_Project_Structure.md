# Hanu

# Project Structure

Version: 1.0

Status: Accepted

Owner: Dev Jaiswal

---

# Purpose

This document defines the repository structure for Hanu.

A predictable structure reduces:

- Cognitive load
- Merge conflicts
- Navigation time
- Architectural drift

Every file must have one obvious location.

---

# Architecture Philosophy

Hanu is organized around business capabilities.

Not file types.

Not frameworks.

Not React.

The repository should mirror the business.

---

# Repository Structure

```

hanu/

├── apps/
│
│   └── web/
│       │
│       ├── public/
│       ├── src/
│       │
│       ├── app/
│       ├── pages/
│       ├── widgets/
│       ├── features/
│       ├── entities/
│       ├── shared/
│       └── processes/
│
│
├── packages/
│
│   ├── ui/
│   ├── core/
│   ├── types/
│   ├── config/
│   └── utils/
│
│
├── docs/
│
├── scripts/
│
├── .github/
│
└── README.md

```

---

# Why a Monorepo?

Future versions of Hanu may include:

- Native Android App
- Backend Services
- Shared UI
- Shared Business Logic
- Shared Types

A monorepo avoids duplication.

---

# apps/

Contains executable applications.

Version 1

```

apps/

└── web/

```

Future

```

apps/

web/

android/

admin/

website/

```

---

# packages/

Contains reusable code.

Packages must never depend on apps.

Apps depend on packages.

Never the opposite.

---

## packages/ui

Purpose

Reusable UI components.

Examples

Button

Card

Dialog

Modal

Typography

Icons

Layout

No business logic allowed.

---

## packages/core

Purpose

Business logic.

Contains

Entities

Use Cases

Business Rules

Validators

Domain Events

This is the most important package.

Framework independent.

---

## packages/types

Purpose

Shared TypeScript types.

Examples

Product

Order

Customer

Inventory

Shipping

API Types

Database Types

---

## packages/config

Purpose

Shared configuration.

Examples

ESLint

Prettier

Tailwind

TypeScript

Vitest

---

## packages/utils

Purpose

Pure utility functions.

Examples

Date Formatting

Currency Formatting

Image Helpers

Phone Formatting

Must remain framework independent.

---

# apps/web/src

---

## app/

Application bootstrap.

Contains

Providers

Router

Theme

Application initialization

Global CSS

Nothing else.

---

## pages/

Top-level routes.

Each page composes widgets.

Pages should contain almost no logic.

Examples

Dashboard

Products

Orders

Customers

Settings

---

## widgets/

Large reusable UI blocks.

Examples

Dashboard Header

Order List

Product Grid

Customer Card List

Task Summary

Widgets compose features.

---

## features/

Business actions.

Examples

Create Product

Edit Product

Delete Product

Create Order

Ship Order

Search Product

Update Inventory

Features own interaction logic.

---

## entities/

Business entities.

Examples

Product

Customer

Order

Shipping

Inventory

Task

Each entity contains:

Model

Hooks

UI

Types

Repository

---

## shared/

Everything truly shared.

Contains

API

Constants

Hooks

Lib

Assets

UI

Config

Types

Never place business logic here.

---

## processes/

Long-running workflows.

Examples

Synchronization

Authentication

Backup

Restore

Background Tasks

Future Notifications

Processes coordinate multiple features.

---

# Naming Rules

Folders

kebab-case

Files

PascalCase

React Components

PascalCase

Hooks

useSomething.ts

Types

Something.ts

Constants

UPPER_CASE.ts

---

# Import Rules

Allowed

shared

↓

entities

↓

features

↓

widgets

↓

pages

Forbidden

pages importing pages

widgets importing pages

shared importing features

entities importing pages

Dependencies flow downward only.

---

# Component Rules

Small Components

<150 lines

Medium

<300

Large

Split immediately

Avoid massive files.

---

# Business Logic

Business logic belongs only in:

packages/core

Never inside

React Components

Pages

Widgets

---

# API Access

Only repositories may communicate with:

Database

Storage

Network

Synchronization

Never call APIs directly from UI.

---

# Tests

Tests live beside code.

Example

```

ProductCard.tsx

ProductCard.test.tsx

```

Avoid central test folders.

---

# Assets

Images

Icons

Fonts

Illustrations

Belong inside

shared/assets

---

# Documentation

Architecture

Product

Research

ADRs

Stay inside

/docs

Never mix documentation with code.

---

# Scripts

Development scripts.

Database scripts.

Migration helpers.

Build scripts.

Automation.

No business logic.

---

# GitHub

.github/

Contains

Actions

Issue Templates

PR Templates

CODEOWNERS

---

# Future Expansion

Version 2

```

apps/

android/

```

Version 3

```

apps/

website/

```

Version 4

```

apps/

admin/

backend/

```

No restructuring required.

---

# Anti-Patterns

Never create

helpers/

misc/

common/

temp/

final/

new/

old/

utils2/

These names indicate poor architecture.

---

# Repository Principles

Every folder has one responsibility.

Every module owns its business capability.

Dependencies always flow downward.

Business rules stay independent from frameworks.

---

# Final Principle

A developer opening Hanu for the first time should understand where every new file belongs without asking another engineer.
