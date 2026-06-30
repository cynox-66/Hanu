# Hanu
# Technology Stack

Version: 1.0

Status: Accepted

Owner: Dev Jaiswal

---

# Purpose

This document defines the official technology stack for Hanu Version 1.

Every technology must justify its existence.

We prefer fewer technologies used well over many technologies used poorly.

The stack prioritizes:

- Reliability
- Maintainability
- Type Safety
- Performance
- Offline-first architecture
- Excellent developer experience

---

# Engineering Principles

Technology should solve problems.

Technology should never exist because it is trendy.

Every dependency introduces:

- Complexity
- Maintenance
- Security Risk
- Upgrade Cost

Use the smallest number of tools possible.

---

# Architecture Overview

```

                Hanu

                  │

      React + TypeScript

                  │

        Business Layer

                  │

         Local Database

                  │

          Sync Engine

                  │

            Supabase

```

---

# Frontend

## React

Purpose

Application UI

Reason

- Mature ecosystem
- Component architecture
- Large community
- Excellent TypeScript support

Status

Approved

---

## TypeScript

Purpose

Entire codebase

Reason

Type safety is non-negotiable.

Status

Mandatory

---

## Vite

Purpose

Development server

Bundler

Reason

- Fast startup
- Fast HMR
- Excellent DX
- Lightweight

Status

Approved

---

# Styling

## Tailwind CSS

Purpose

Styling

Reason

- Fast iteration
- Consistent spacing
- Small bundle
- Easy maintenance

Status

Approved

---

# UI Components

Version 1

shadcn/ui

Reason

Accessible

Composable

Minimal

Excellent mobile support

Status

Approved

---

# Icons

Lucide

Reason

Consistent

Open Source

Tree Shakeable

Readable

Status

Approved

---

# Routing

React Router

Purpose

Navigation

Status

Approved

---

# State Management

Local UI State

React

---

Server State

TanStack Query

---

Global Application State

Zustand

---

Reason

Simple

Minimal

No unnecessary boilerplate

---

# Forms

React Hook Form

Validation

Zod

Reason

Excellent TypeScript integration

Minimal rerenders

Status

Approved

---

# Local Database

IndexedDB

Wrapper

Dexie.js

Reason

Offline-first

Fast

Reliable

Works inside PWA

Status

Mandatory

---

# Backend

Supabase

Services Used

Authentication

PostgreSQL

Storage

Realtime (Future)

Reason

Simple

Reliable

Generous free tier

Easy migration path

Status

Approved

---

# Authentication

Version 1

Single User

Magic Link

or

Phone OTP

Authentication should never become a barrier.

---

# Storage

Supabase Storage

Purpose

Product Images

Future Documents

Status

Approved

---

# API Layer

Supabase Client

Future

tRPC

Only when required.

Avoid unnecessary abstraction.

---

# Offline Sync

Custom Sync Engine

Reason

Business requirements are unique.

Do not depend entirely on external libraries.

---

# Notifications

Browser Notifications

Future

Push Notifications

---

# PWA

Required

Service Worker

Install Prompt

Offline Cache

App Manifest

Background Sync

Status

Mandatory

---

# Image Processing

Browser

Compression

Resize

Thumbnail Generation

Future

Background Removal

AI Enhancement

---

# Testing

Unit

Vitest

---

Component

React Testing Library

---

End-to-End

Playwright

---

Testing Philosophy

Business logic first.

UI second.

---

# Linting

ESLint

Mandatory

---

Formatting

Prettier

Mandatory

---

Git Hooks

Husky

lint-staged

Mandatory

---

# Package Manager

pnpm

Reason

Fast

Efficient

Workspace support

Deterministic

Status

Mandatory

---

# Monorepo

Yes

Reason

Future expansion

Shared packages

Android client

Backend services

---

# Deployment

Frontend

Vercel

---

Backend

Supabase

---

Future

Cloudflare

Docker

Self-hosting

---

# Logging

Development

Console

Production

Structured Logging

Never log sensitive data.

---

# Environment Variables

Only secrets belong in .env

Never place:

Business logic

URLs

Constants

Inside environment variables.

---

# Performance Targets

Lighthouse

95+

---

Bundle Size

<300 KB initial

---

Cold Start

<2 seconds

---

Search

<100ms

---

Offline Startup

Instant

---

# Accessibility

WCAG AA

Keyboard Support

Large Touch Targets

High Contrast

Screen Reader Friendly

---

# Browser Support

Chrome Android

Edge Android

Samsung Internet

Desktop Chrome

Desktop Edge

Safari support is desirable but not a blocker for Version 1.

---

# Dependencies We Intentionally Reject

Redux

MobX

Bootstrap

Material UI

Firebase

Next.js

Electron

Capacitor

Cordova

Expo

Reason

Unnecessary complexity for Version 1.

Every dependency should earn its place.

---

# Future Technologies

Native Android

Kotlin

Jetpack Compose

Only after product validation.

---

AI Features

OpenAI

Anthropic

Gemini

Only when they reduce measurable user workload.

---

# Stack Freeze

Version 1 is built using:

React

TypeScript

Vite

Tailwind CSS

shadcn/ui

Lucide

React Router

TanStack Query

Zustand

Dexie

Supabase

pnpm

Vitest

Playwright

No additional major framework may be introduced without an Architecture Decision Record (ADR).

---

# Final Principle

Choose boring technology.

Build interesting software.

The competitive advantage of Hanu is not its stack.

The competitive advantage is how well it solves real problems.