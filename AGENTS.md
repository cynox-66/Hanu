# AGENTS.md — The Hanu Engineering Constitution

> This document is the permanent engineering philosophy of Hanu. Every human and AI agent reads it before working on the codebase. It exists so that every future architecture, design, and code decision stays consistent without re-litigating first principles every time.

This document changes rarely. Sprint notes, feature decisions, and one-off context belong in `docs/memory/` (see §14), not here. Step-by-step engineering process — how a feature actually moves from idea to merge — lives in `ENGINEERING_PLAYBOOK.md`.

**How to use this document:** read it fully before any non-trivial change. When principles conflict, resolve using the priority order in §14. When genuinely stuck, return to the Canonical Statement below.

AGENTS.md is intentionally stable.

Operational workflow belongs in `ENGINEERING_PLAYBOOK.md`.

Sprint knowledge belongs in `docs/memory/`.

Do not mix these responsibilities.

> **Hanu exists to reduce operational burden for small business owners through simple, reliable, mobile-first, offline-first software. Every engineering decision must move the product closer to that goal.**

---

## Table of Contents

1. [Project Identity & Mission](#1-project-identity--mission)
2. [Product Vision](#2-product-vision)
3. [Core Principles](#3-core-principles)
4. [Engineering Philosophy](#4-engineering-philosophy)
5. [Architecture](#5-architecture)
6. [Development Workflow](#6-development-workflow) — *procedural detail moved to `ENGINEERING_PLAYBOOK.md`*
7. [Coding Standards](#7-coding-standards)
8. [UX & Design Principles](#8-ux--design-principles)
9. [Mobile-First Principles](#9-mobile-first-principles)
10. [Offline-First Engineering](#10-offline-first-engineering)
11. [State Management](#11-state-management)
12. [Database Principles](#12-database-principles)
13. [AI Collaboration](#13-ai-collaboration)
14. [Documentation, Memory & Decision Records](#14-documentation-memory--decision-records)
15. [Decision Framework & Engineering Priorities](#15-decision-framework--engineering-priorities)
16. [Definition of Done](#16-definition-of-done)
17. [Non-Negotiables](#non-negotiables)

---

# 1. Project Identity & Mission

> **Hanu is not an e-commerce platform.**
>
> Hanu is an offline-first business operating system that reduces the operational burden of running a small home business.

## What Hanu Is

Hanu is being built for **Hanu Enterprises**, a boutique home business in women's ethnic fashion and curated lifestyle products, run almost entirely from a single owner's mobile phone.

Every engineering decision answers one question:

> **Does this reduce work for the business owner?**

If the answer is no, it probably doesn't belong in Hanu.

Hanu is intentionally narrow. It does **not** aim to become:

- Shopify
- Amazon Seller Central
- ERPNext
- Zoho Inventory
- Tally
- A generic CRM or ERP

Those products optimize for flexibility across thousands of businesses. Hanu optimizes for **clarity, speed, and simplicity** for one. Every screen should feel handmade for a single owner, not configured for a corporation.

## The Primary User

Design every decision assuming the user:

- Uses an Android phone as their primary computing device.
- Has unreliable or unavailable internet connectivity.
- Is not technical, and should never need to become technical.
- Has limited time and multitasks constantly.
- Needs confidence more than customization.
- Should never have to understand technical concepts.

If a feature requires technical knowledge to operate, the feature has failed.

## Product Characteristics

Hanu must always strive to be: mobile-first, offline-first, fast, predictable, calm, minimal, reliable, forgiving, easy to learn, and difficult to misuse. Complexity should live inside the implementation — never inside the user experience.

## The Problem We're Solving

Small home businesses rarely fail because of bad products. They struggle because operations get harder as the business grows — owners end up managing dozens of small, repetitive activities every day: remembering inventory, tracking customers, replying to repeated questions, searching old WhatsApp chats, finding product photos, preparing courier details, maintaining notebooks, checking payments, updating statuses, remembering follow-ups.

None of this creates value. It consumes time, creates stress, and increases the probability of mistakes. Hanu exists to eliminate this operational friction — **the software should replace searching with knowing.**

Success is measured by manual effort removed, not feature count:

| Before Hanu | After Hanu |
|---|---|
| "Where did I save that product photo?" | Open product. |
| "Which customer ordered this?" | Open order. |
| "Did this payment arrive?" | Payment status is immediately visible. |
| "I forgot to send this parcel." | Shipment appears automatically in today's pending tasks. |

## Design Goal

Every interaction must satisfy three conditions:

1. The user immediately understands what to do.
2. The task completes with minimal effort.
3. The user leaves more organized than before.

If any of these fail, the feature requires redesign.

## Business and Engineering Goals

Hanu is not designed to replace human judgment — it exists to amplify it, helping the owner make faster decisions, make fewer mistakes, recover quickly from the mistakes they do make, stay consistent, and spend more time selling instead of managing. Automation is valuable only when it increases confidence.

Engineering effort should compound: every sprint should make future development easier than the last, which means prioritizing maintainability, readability, modularity, predictable architecture, strong documentation, and reliable testing over raw velocity. Shortcuts that increase future complexity are technical debt, even when they save time today.

## Promises

**To every business owner, Hanu promises:**

- Your data belongs to you.
- Your work should never be lost.
- Your software should continue working without internet.
- Your workflow should become simpler over time.
- Your business should never depend on remembering everything yourself.

These promises take precedence over shipping additional features.

**Every contributor — human or AI — commits to:**

- Optimizing for reliability over speed.
- Optimizing for simplicity over cleverness.
- Optimizing for long-term maintainability over short-term convenience.
- Building only what solves real problems.
- Refusing unnecessary complexity.
- Leaving the codebase better than they found it.

## Mission Statement

> **Our mission is to build software that disappears into the business owner's daily workflow, quietly eliminating operational burden through thoughtful engineering, dependable architecture, and uncompromising simplicity.**

---

# 2. Product Vision

> **Hanu is building the operating system for small home businesses — not another management application.**

Most business software is designed for companies. Hanu is designed for people — specifically, people who built a business through trust, relationships, hard work, and consistency, not through teams, departments, or enterprise software. The vision is to become the invisible operating system that powers these businesses every day.

Imagine the owner waking up and, instead of wondering what's pending today, which products are low, who hasn't paid, or where a photo was saved — they simply open Hanu, and the application already knows. **The software should replace uncertainty with clarity.**

## Design Around Reality

Hanu is built around how real home businesses actually operate — not how software companies assume they operate. Real businesses run on:

- WhatsApp
- Phone calls
- Product photos
- Family assistance
- Handwritten notes
- Physical inventory
- Courier services
- Repeat customers
- Personal relationships

Hanu embraces these realities instead of forcing entirely new workflows on the owner.

## Build Around Actions, Not Entities

Business owners think in terms of work, not databases. They wake up thinking *"I need to pack three parcels,"* not *"I need to update three Order entities."* They think *"I need to post today's arrivals,"* not *"I need Product Management."* The software should always present work — never implementation.

## Invisible Software

The greatest compliment Hanu can receive is: *"I forgot I was using the app."* The interface should become instinctive, navigation should become automatic, and actions should become muscle memory. The owner should spend time running the business, not learning software.

## Calm Technology

Hanu should feel calm — never noisy, overwhelming, or stressful. It should reduce anxiety, not increase it: no unnecessary notifications, no unnecessary settings, no unnecessary dashboards, no unnecessary customization. **Silence is a feature.**

## Trust Before Intelligence

The user must trust Hanu before relying on it. Trust is earned through predictable behavior, reliable data, fast performance, honest communication, graceful failure, and data safety. AI, automation, and advanced capabilities are worthless if the user can't trust the fundamentals first.

## Human-Centered Automation

Automation is not the goal — reducing effort is. Add automation only when it satisfies **all** of the following: it saves measurable time, reduces repetitive work, is predictable, is reversible, can be understood by the user, and never removes human control. The owner always remains the decision-maker; the software always remains the assistant.

## Simplicity Over Features

Feature count is not a measure of quality. A product with ten well-designed features beats one with a hundred confusing ones. Every new feature must answer:

- What problem does this solve?
- How often does this occur?
- How much time does it save?
- Does it simplify the workflow?
- Can the product succeed without it?

If these questions can't be answered convincingly, the feature does not belong in Hanu.

## Long-Term Vision

Version 1 helps the owner organize. Version 2 helps the owner operate. Version 3 helps the owner optimize. Version 4 helps the owner grow. Growth should emerge naturally from operational excellence — the product should never sacrifice simplicity to expand.

## The Hanu Principle

> **Hanu should become the most trusted, dependable, and effortless business companion a small business owner has ever used.**

---

# 3. Core Principles

> Principles are permanent. Features are temporary. When uncertainty exists, these principles take precedence over opinions, preferences, or implementation convenience.

**1. Solve Problems, Not Requirements**
Users don't ask for features — they describe frustrations. Engineering exists to solve the underlying problem, not blindly implement requested functionality. Before writing code, always ask: *what problem is this actually solving?* If unclear, implementation should not begin.

**2. Simplicity Wins**
Simple software scales; complex software accumulates debt. When two solutions satisfy the same requirement, choose the simpler one — fewer concepts, fewer screens, fewer clicks, fewer settings, fewer dependencies, fewer abstractions, fewer surprises. Every unnecessary line of code is future maintenance.

**3. Mobile First, Always**
Hanu is designed for the device that's actually used, not the ideal device. Every feature must assume portrait orientation, one-handed usage, touch input, intermittent connectivity, outdoor visibility, and limited attention span. Desktop is an enhancement; mobile is the product.

**4. Offline First**
The internet is an optimization, not a dependency. Users should never hesitate to open Hanu because they're unsure whether they have internet. The application should function normally when completely offline — synchronization happens later, work happens now.

**5. Reliability Over Intelligence**
An intelligent application that occasionally fails is less valuable than a predictable one that always works. Never sacrifice reliability for novelty. The user must always know what the application is doing — when uncertain, choose the more deterministic solution. Trust compounds.

**6. Optimize for Human Memory**
The human brain should make decisions; the application should remember everything else. Hanu exists to eliminate remembering, searching, checking, repeating, verifying, and tracking. Every feature should reduce cognitive load.

**7. Every Interaction Must Save Time**
The application competes against paper, notebooks, WhatsApp, and memory. Every interaction must be faster than the alternative — if a workflow takes longer inside Hanu than outside it, the workflow is poorly designed.

**8. Make Mistakes Recoverable**
Users will make mistakes; the application should expect them. Never design systems that punish mistakes. Prefer confirmation over prevention, undo over deletion, recovery over restriction, and guidance over error messages. Good software forgives.

**9. Progressive Disclosure**
Don't overwhelm the user — advanced functionality should appear only when needed. Beginners should never feel intimidated; experts should never feel limited. Complexity should reveal itself gradually.

**10. Build for Years, Not Weeks**
Temporary shortcuts become permanent architecture. Every implementation should assume new features will arrive, data will grow, users will grow, and workflows will evolve. Design for change — avoid both premature optimization and premature abstraction.

**11. Readability Is a Feature**
Code is read far more often than it's written. Every engineer — including future AI agents — must immediately understand intent. Prefer descriptive naming, small functions, predictable structure, and self-documenting code. Never optimize for cleverness.

**12. Consistency Creates Confidence**
Every screen should behave similarly; every button should feel familiar; every interaction should be predictable. Consistency reduces learning, builds trust, and scales.

**13. Automation Must Earn Its Place**
Automation is never added because it's technically possible. It must satisfy all of: saves measurable effort, reduces repetitive work, improves reliability, is understandable, is reversible, and never removes user control. Automation without clarity becomes confusion.

**14. Technology Serves the Product**
Frameworks, libraries, AI, MCPs, patterns, architectures, and tooling exist to serve the product — the product never exists to justify technology. Engineering decisions should begin with user value, not technical excitement.

**15. Build Vertical Slices**
Avoid building isolated infrastructure for weeks. Instead build complete workflows end to end so that every sprint produces something the business owner can actually use. Working software is the primary measure of progress.

**16. Ship, Observe, Improve**
Don't pursue perfection before validation — release, observe, learn, improve. Real usage is the highest-quality feedback; opinions, even from engineers, are hypotheses until tested.

**17. Preserve Human Control**
Hanu is an assistant, never the decision-maker. It may recommend, remind, automate repetitive work, and organize information — it must never silently make business decisions on the owner's behalf. The final decision always belongs to the human.

## The Hanu Engineering Oath

> Build software that reduces work instead of creating it.
> Choose clarity over cleverness.
> Choose reliability over novelty.
> Choose simplicity over complexity.
> Leave the codebase better than you found it.
> Respect the user's time as if it were your own.

---

# 4. Engineering Philosophy

> Engineering is not the act of writing code. It is the disciplined process of transforming real-world problems into simple, reliable, and maintainable software.

The objective of engineering at Hanu is not to produce code — it's to build confidence: in the product, the architecture, the user experience, future development, and long-term maintainability. Code is merely the medium.

## Think Like an Engineer, Not a Programmer

Programmers ask *"how do I build this?"* Engineers ask:

- Should this exist?
- Is this the right solution?
- Is there a simpler solution?
- What happens in one year?
- What happens when requirements change?
- What happens when another engineer maintains this?

The first responsibility is choosing the right problem. The second is choosing the simplest correct solution. Only then comes implementation.

## Solve Root Causes

Never optimize symptoms. If the same issue keeps appearing, stop patching it and find the underlying cause:

- Duplicate validation logic → find why validation is duplicated.
- Five screens performing the same calculation → extract a shared abstraction.
- Repeated bug reports → investigate the architectural weakness.

Every recurring problem is architecture asking for attention.

## Every Abstraction Must Earn Its Existence

Abstractions reduce complexity; bad abstractions hide it. Never introduce one because it feels cleaner, another framework does it, or it might be useful someday. Apply the **Rule of Three**:

1. First implementation.
2. Second implementation.
3. Third implementation → *now* consider abstracting.

Premature abstraction is technical debt.

## Prefer Deleting Code

The safest code is code that doesn't exist. Every line introduces maintenance, bugs, cognitive load, and testing/documentation requirements. Deleting 100 unnecessary lines is often a greater engineering achievement than writing 100 new ones. Ask frequently: *can this feature exist with less code?*

## Design Before Implementation

Large features should never begin with code. Every meaningful feature should follow:

```
Understand the problem
        ↓
Research existing architecture
        ↓
Produce an implementation plan
        ↓
Validate the approach
        ↓
Implement → Test → Review → Ship
```

Thinking is engineering. Typing is implementation. Don't confuse the two.

## Leave the Campsite Cleaner

Every contribution should improve the project — simplifying logic, improving naming, removing dead code, strengthening types, increasing test coverage, improving documentation, reducing duplication. Never leave known problems worse than you found them.

## Measure Engineering Quality Correctly

Engineering success is **not** measured by lines of code, number of commits, number of files, complexity, or cleverness. It's measured by maintainability, reliability, clarity, simplicity, extensibility, developer experience, and user experience. The best architecture often appears obvious in retrospect.

## Embrace Boring Technology

Choose technologies that are stable, well-documented, actively maintained, widely understood, and easy to debug. Novelty is not a competitive advantage — reliability is. The newest solution is rarely the best one.

## Make Correctness Obvious

A future engineer should be able to determine whether code is correct simply by reading it. Avoid hidden side effects, implicit behavior, magic values, unpredictable control flow, and unnecessary indirection. Correct software should be easy to trust.

## Build Systems, Not Features

Features eventually become systems. Every implementation should consider how it integrates, how it evolves, how it fails, how it's tested, how it's documented, and how it's maintained. A feature is temporary; a system is permanent.

## Technical Debt Is Borrowed Time

Acceptable only when intentional, documented, understood, and temporary. Undocumented shortcuts are defects. If a compromise is necessary: document it, explain why, and define the exit strategy. Future engineers deserve context.

## AI Is a Collaborator, Not an Authority

AI accelerates engineering; it does not replace engineering judgment. Evaluate every AI-generated solution as though it came from a junior engineer — question assumptions, review architecture, verify correctness. Trust evidence, never confidence. (Full treatment in §13.)

## Engineering Decision Hierarchy

Whenever multiple solutions exist, evaluate them in this order:

```
1. Correctness
2. Simplicity
3. Reliability
4. Maintainability
5. User Experience
6. Performance
7. Developer Convenience
```

Never sacrifice correctness for convenience. Never sacrifice simplicity for elegance. Never sacrifice reliability for speed.

## The Engineering Standard

> **If this code remains in production for the next five years, will we still be proud of this decision?** If the answer is uncertain, keep improving until it becomes an obvious yes.

---

# 5. Architecture

> Architecture exists to reduce complexity over time. Good architecture is not measured by how sophisticated it looks today, but by how easily the product can evolve tomorrow.

**Philosophy: keep complexity below the surface.** The user experience should get simpler as the internal architecture gets more capable. Users should never feel the complexity required to support offline synchronization, conflict resolution, local persistence, background sync, caching, or state management. Engineering absorbs complexity so the user never has to.

The architecture must be: predictable, modular, offline-first, easy to reason about, easy to test, easy to refactor, easy to extend, and difficult to misuse. It is successful when future features require minimal architectural change.

## Layered Architecture

Every feature follows the same flow, and each layer has exactly one responsibility:

```
Presentation Layer
        ↓
Application Layer
        ↓
Domain Layer
        ↓
Persistence Layer
        ↓
Synchronization Layer
        ↓
External Services
```

**Presentation Layer** — responsible for UI, layout, user interaction, and displaying state. Never responsible for business logic, networking, database operations, validation, or synchronization. UI should describe; it should never decide.

**Application Layer** — responsible for feature orchestration, workflows, commands, and use cases. This layer coordinates work; it does not own business rules. Think of it as the conductor of an orchestra.

**Domain Layer** — the heart of Hanu. Responsible for business rules, calculations, validation, business invariants, entities, and value objects. This layer should know nothing about React, Supabase, IndexedDB, browsers, APIs, or UI. Business logic must remain portable.

**Persistence Layer** — responsible for the local database, repositories, storage, and serialization. It answers only one question: *how is data stored?* It never decides why, when, or who requested a change.

**Synchronization Layer** — responsible for uploading, downloading, conflict handling, retries, and queue management. Synchronization is an infrastructure concern; business logic must keep functioning without it.

**External Services** — adapters for Supabase, cloud storage, authentication, push notifications, courier APIs, and future integrations. External services are adapters, never the foundation.

## Dependency Rule

Dependencies always point inward:

```
UI → Application → Domain
```

Never the opposite. The Domain layer should never import React, UI components, database SDKs, browser APIs, or external SDKs. Business logic must remain framework-independent.

## The Offline Rule

Offline capability is not a feature — it's a property of the entire architecture. Every operation follows this lifecycle:

```
User Action → Local Validation → Local Write → Immediate UI Update → Background Sync → Server Confirmation
```

Never:

```
User Action → Network Request → Wait → Update UI
```

The interface should never feel dependent on connectivity. (Full treatment in §10.)

## Structural Principles

- **Single source of truth.** Every piece of information has exactly one authoritative source (Products → Product Repository, Orders → Order Repository, Customers → Customer Repository). Duplicate state eventually becomes inconsistent state.
- **Composition over inheritance.** Compose behavior through reusable hooks, services, utilities, and components. Inheritance creates hidden coupling; composition creates flexibility.
- **Explicit data flow.** Avoid hidden mutations, implicit state changes, magic synchronization, and invisible dependencies. A future engineer should be able to answer where data originated, why it changed, and where it goes next — without debugging.
- **Stable boundaries.** Every module should expose a small public surface; internal implementation stays private. Changing internals should never require changes across the application. Loose coupling, strong cohesion.
- **Feature isolation.** Each feature owns its UI, business logic, tests, hooks, types, and services. Avoid giant shared folders — shared code should emerge naturally through repetition, not prediction.
- **Error handling is architectural.** Every operation should answer: can this fail, what happens if it fails, can the user recover, is data preserved, can the action be retried? Failure should never result in silent data loss.
- **Performance philosophy: optimize perceived speed.** Users care about responsiveness, not benchmarks. Prefer instant feedback, optimistic updates, lazy loading, background processing, and smooth interactions over micro-optimizations until measurement proves they're necessary.
- **Extensibility.** New features — Inventory, Courier Tracking, Payments, Analytics, AI Assistance — should plug into the existing architecture. Adding them should feel like extending the system, not rebuilding it.
- **Architectural consistency.** Every feature should look as though it was designed by the same engineer: consistent folder structure, naming, data flow, testing, error handling, and state management. Consistency is more valuable than individual brilliance.

## The Architectural North Star

Whenever multiple implementations are possible, choose the one that makes the architecture simpler one year from today — not the one that's easiest to write this afternoon. The architecture exists to make future engineering predictable. Protect it relentlessly.

---

# 6. Development Workflow

> Every feature should follow the same disciplined engineering process. Hanu is not built through "vibe coding" — it is built through deliberate engineering. Every feature begins with understanding; every implementation ends with validation. Engineering velocity comes from disciplined repetition, not rushing.

This is the philosophy; it does not change often. The step-by-step mechanics — the engineering pipeline, the four levels of work, implementation planning, review/testing/validation procedure, commit conventions, and the sprint retrospective — are operational and evolve as our process matures, so they live in `ENGINEERING_PLAYBOOK.md`. Read that document before starting any non-trivial change. The Definition of Done gate that closes every feature is a permanent standard and stays in this document (§16).

## Workflow North Star

The purpose of the workflow is not bureaucracy — it's confidence. Every step should reduce uncertainty, improve software quality, and make future development easier than today.

> **Ship thoughtfully. Learn continuously. Improve relentlessly.**

---

# 7. Coding Standards

> Code is a long-term asset. Every line written today becomes part of tomorrow's engineering environment. Write code that future engineers — and future AI agents — will enjoy working with.

The primary objective of coding is not to make the computer understand; the compiler already does that. The objective is to make humans understand. Every implementation should communicate its intent before its mechanics, answering what's happening, why, where to modify it, and what assumptions exist — without requiring external explanation.

## General Principles

Always prefer code that is: simple, explicit, predictable, consistent, readable, testable, composable, and easy to remove.

Avoid code that is: clever, magical, implicit, over-engineered, prematurely optimized, or difficult to explain.

## TypeScript Standards

TypeScript is a design tool, not merely a compiler.

**Required:**

- Strict mode enabled.
- Explicit interfaces where appropriate.
- Explicit return types for exported functions.
- Narrow types whenever possible.
- Exhaustive switch statements.
- Discriminated unions over boolean flags.
- Type inference where readability improves.

**Forbidden** without a documented, justified reason:

```ts
any
```

Also avoid `@ts-ignore`, unsafe casting, unnecessary non-null assertions (`!`), and weakly typed APIs. Types should eliminate uncertainty.

## Naming

Names should describe intent.

Prefer:

```ts
calculateOrderTotal()
createProduct()
syncPendingOrders()
```

Avoid:

```ts
calculate()
helper()
process()
temp()
data()
value()
obj()
```

A good name reduces the need for comments.

## Functions

Functions should have one responsibility, be easy to read and test, and be deterministic whenever possible.

Prefer:

```ts
validateCustomer()
  → createOrder()
    → queueSynchronization()
```

instead of:

```ts
handleEverything()
```

Small functions are preferred; long functions require justification. If scrolling is required to understand a function, consider decomposing it.

## Components

React components should focus on presentation, remain small, receive data via props, and delegate logic to hooks or services. Components should answer *"what should be displayed?"* — never *"how does the business work?"*

## Custom Hooks

Business logic shared across components belongs inside custom hooks:

```
useProducts()
useOrders()
useInventory()
useOfflineSync()
```

Hooks should encapsulate behavior, not presentation.

## State Management

Keep state as close as possible to where it's used:

```
Local Component State → Shared Feature State → Global State
```

Avoid placing everything in global stores — global state is expensive. (Full treatment in §11.)

## Imports

Order imports as follows: React → external libraries → internal aliases → relative imports → types → styles. Group imports logically; avoid scattering them throughout a file.

## File Organization

One file should have one clear responsibility.

Avoid a single `Product.tsx` mixing UI, business logic, API calls, validation, utilities, and types.

Prefer separate, focused files:

```
ProductCard.tsx
ProductForm.tsx
useProducts.ts
productService.ts
productRepository.ts
product.types.ts
```

Small focused files are easier to maintain.

## Comments

Code should explain *how*. Comments should explain *why*.

Avoid:

```ts
// Increment i
i++
```

Prefer:

```ts
// Inventory is reduced immediately so offline mode
// reflects accurate stock before synchronization.
inventory.quantity--
```

If code requires extensive comments, consider simplifying the implementation.

## Error Handling

Never ignore errors. Every failure should be intentional, visible, recoverable, and meaningful.

Avoid:

```ts
catch (e) {}
```

Prefer logging, graceful recovery, user feedback, and retry mechanisms.

## Async Code

Prefer `async`/`await` over nested promise chains. Avoid deeply nested asynchronous logic, and handle loading, success, and failure explicitly.

## Magic Numbers and Constants

Avoid:

```ts
if (status === 7)
```

Prefer:

```ts
OrderStatus.Delivered
```

Meaning is more valuable than brevity. Configuration — colors, routes, limits, storage keys, animation durations, business rules — belongs in constants, not duplicated literals. One source of truth.

## Conditional Logic

Prefer early returns:

```ts
if (!customer) return;
```

over deeply nested conditions. Reduce indentation; increase clarity.

## Dependencies

Every dependency increases bundle size, maintenance, security surface, update workload, and cognitive load. Before installing a package, ask: Does the platform already provide this? Can we implement this simply? Is the dependency actively maintained? Will we still want this in two years?

**Default answer: do not install it.** Dependencies earn their place.

## Reusability

Do not build reusable code — build useful code. Reuse emerges naturally; premature reuse creates poor abstractions.

## Performance, Accessibility, Formatting, Review

- **Performance** — do not optimize without evidence. Measure first, optimize second, and protect readability. Micro-optimizations that reduce maintainability are discouraged.
- **Accessibility** — not optional. Every interactive element should support touch, keyboard, screen readers, clear focus states, and sufficient contrast. Accessibility improves usability for everyone.
- **Formatting** — consistency matters more than preference. The formatter owns formatting; the engineer owns architecture. Never waste review time discussing whitespace.
- **Code reviews** — review for correctness, simplicity, maintainability, naming, architecture, edge cases, and user impact. Do not review based on personal style.

## The Leave-It-Better Rule

Every file touched should become slightly better — better naming, reduced duplication, stronger typing, improved readability, clearer intent, cleaner structure. Small improvements compound over time.

## The Final Question

> **If a senior engineer with no project context opened this file six months from now, would they immediately understand what this code is trying to accomplish?** If the answer is no, the code is not finished.

---

# 8. UX & Design Principles

> **Users should never notice good design.** They should only notice that the application feels effortless.

Hanu is designed for business owners, not software engineers. Every screen should reduce thinking; every interaction should reduce effort; every workflow should reduce time. The user should think about running their business — not operating the application.

## Design North Star

Whenever two designs are possible, choose the one that requires fewer decisions, fewer taps, less reading, less memory, and less training. The best interface is the one that quietly disappears.

## One Screen, One Job

Every screen should have a single responsibility:

- Product List → Browse Products
- Add Product → Create Product
- Order Details → Manage Order

Avoid screens that try to solve multiple unrelated problems — focused screens reduce cognitive load.

## Progressive Disclosure

Never overwhelm the user. Show what's needed now; hide what's needed later. Advanced functionality should reveal itself naturally through use. Beginners should never feel intimidated; experienced users should never feel constrained.

## Reduce Decision Fatigue

Every unnecessary decision costs mental energy. Reduce unnecessary buttons, settings, confirmation dialogs, navigation, and options. Whenever sensible, choose intelligent defaults.

## Familiarity Over Originality

Do not invent new interaction patterns. Use conventions users already understand — back buttons, search, forms, and navigation should all behave normally. Innovation belongs in workflows, not basic interaction patterns.

## Visual Hierarchy

Every screen should immediately answer:

1. Where am I?
2. What can I do?
3. What should I do first?

Primary actions must be visually obvious; secondary actions should never compete for attention.

## Calm Interfaces

The interface should never feel busy. Avoid excessive colors, unnecessary animations, flashing indicators, crowded layouts, and decorative elements without purpose. Whitespace is a design tool. Silence is a feature.

## Typography

Typography should prioritize readability: clear hierarchy, generous spacing, readable font sizes, short line lengths, strong contrast. Users should never need to zoom to read information.

## Color Philosophy

Color communicates meaning — never decoration:

- Green → Success
- Red → Error
- Orange → Warning
- Blue → Primary action

Maintain this mapping consistently throughout the application.

## Icons

Icons should support labels, not replace them, unless the meaning is universally understood. Prefer "🛒 Orders" over a bare "🛒" — clarity always wins.

## Forms

Forms should ask only for information that's genuinely required, and reduce typing wherever possible: dropdowns, date pickers, suggestions, auto-complete, defaults, and remembered values. Typing is expensive on mobile.

## Feedback

Every user action should produce immediate feedback:

- Button press → visual response
- Save → confirmation
- Delete → undo opportunity
- Sync → visible status

The application should never leave the user wondering whether something happened.

## Loading and Empty States

Never leave blank screens — while loading, show progress, preserve layout, and communicate clearly. Users tolerate waiting; they do not tolerate uncertainty.

Every empty state should answer: Why is this empty? What should I do next? How do I begin? Empty screens are opportunities to teach, not dead ends.

## Error Messages

Good error messages are human, actionable, specific, and reassuring.

Avoid:

> Something went wrong.

Prefer:

> Couldn't save the product because you're currently offline. Your changes have been saved locally and will sync automatically when you're connected.

The application should explain, not merely report.

## Confirmation Dialogs

Confirm only irreversible actions. Avoid confirmation fatigue — if everything requires confirmation, users stop reading. Prefer undo whenever possible.

## Accessibility

Every feature must remain usable for people with reduced vision, reduced dexterity, limited technical confidence, or temporary distractions. Accessibility is not an edge case — it is part of good design.

## Delight Through Reliability

Delight should come from speed, predictability, simplicity, and confidence — not unnecessary animations or visual effects. Professional software earns trust before admiration.

## The Mother's Test

Hand the phone to someone who has never seen Hanu before. Without explanation, they should be able to answer: What am I looking at? What can I do here? What happens if I press this? How do I go back? If those questions aren't obvious, the interface needs redesign.

## The UX Standard

> Every interaction should leave the user feeling: **"That was easier than I expected."** That is the experience Hanu strives to deliver on every screen, every day.

---

# 9. Mobile-First Principles

> **Hanu is not a web application adapted for phones. Hanu is a mobile application delivered through the web.**
>
> Every design, engineering, and product decision must begin with the mobile experience. Desktop is a convenience. Mobile is the primary platform.

The owner of Hanu Enterprises runs the business from a phone — not occasionally, not while traveling, but every day. The mobile experience is not a responsive version of the product. It **is** the product. Every feature should be designed on a phone first; desktop layouts should emerge naturally from the mobile architecture, never the other way around.

## Mobile Design Hierarchy

Always optimize in this order, and never reverse it:

```
Phone → Tablet → Desktop
```

## One-Handed Operation

Hanu should comfortably operate with one hand. Assume the user is simultaneously holding products, talking to a customer, walking, standing at an exhibition, packing orders, or answering WhatsApp. The application should cooperate with this reality.

## Thumb Zone

Primary actions should live inside the natural thumb zone:

- ✅ Bottom Navigation
- ✅ Floating Action Button
- ✅ Bottom Sheets
- ✅ Bottom Action Bars

Avoid placing frequently-used actions in the top-right corner — the user should never need to repeatedly adjust their grip.

## Minimize Typing

Typing on mobile is expensive. Replace it wherever possible with: camera, QR scan, barcode scan, dropdowns, suggestions, search, chips, toggles, date pickers, auto-complete, and previous selections. The fastest keyboard is the one the user never has to open.

## Reduce Navigation Depth

Users should never feel lost. Prefer `Home → Products → Product Details` over deep chains like `Home → Inventory → Categories → Products → Details → Edit`. Every additional screen increases friction.

## Touch Targets

Every interactive element should be comfortably tappable: large touch areas, adequate spacing, no accidental taps, easy scrolling, comfortable reach. Design for fingers, not cursors.

## Interruptions Are Normal

Mobile users are interrupted constantly — phone calls, WhatsApp, notifications, conversations. The application must survive interruptions gracefully. When the user returns, state should remain intact, progress should remain intact, forms should not reset, and data should not disappear.

## Session Continuity

The user should never fear closing the application. Everything should resume naturally — unfinished forms, pending orders, search state, navigation position, offline work. The application should remember where the user left off.

## Performance Expectations

Mobile users expect immediacy. Prioritize fast startup, smooth scrolling, immediate button feedback, optimistic updates, lazy loading, and minimal blocking. Perceived speed matters more than benchmark scores.

## Battery and Data Awareness

Battery and data are user resources — respect them. Avoid unnecessary polling, excessive animations, unnecessary background work, wasteful re-renders, and heavy main-thread computation. Prefer caching, compressed assets, incremental sync, lazy image loading, and background synchronization. Never download data that isn't immediately useful.

## Connectivity Awareness

The application should always know whether it's online, offline, syncing, waiting, or has failed — the user should never guess. Connectivity is information, not an error.

## Camera as an Input Device

Treat the camera as a first-class input method: product photos, invoice capture, QR scanning, barcode scanning, document capture. Opening the camera should always require fewer steps than importing a file.

## Mobile Notifications

Notifications should exist only when they create value: pending courier, failed synchronization, payment reminder, inventory alert. Avoid marketing, engagement farming, daily streaks, and unnecessary reminders. Respect the user's attention.

## Gestures

Gestures should enhance workflows, never replace essential functionality. Every gesture needs an obvious alternative — swipe to delete should still have a delete button. Accessibility always wins.

## Offline Confidence

Users should confidently continue working even when they lose connectivity. The application should communicate *"your work is safe,"* not *"connection lost."* Confidence is more valuable than technical detail.

## Orientation

Primary support is portrait; secondary support is landscape. Do not optimize layouts around landscape usage.

## Progressive Web App Principles

The application should behave like a native application — users should forget it's running inside a browser. Priorities: installable, offline capable, fast launch, native feeling, full-screen support, reliable caching.

## Mobile UX Checklist

Every feature should satisfy:

- Can it be comfortably used with one hand?
- Can it be completed quickly?
- Does it minimize typing?
- Does it survive interruptions?
- Does it work offline?
- Does it feel responsive?
- Is it understandable without explanation?
- Does it respect battery and data usage?

If any answer is "No," the feature requires further iteration.

## The Mobile-First Commandment

> Would this still feel effortless if the owner were standing at an exhibition, holding a customer conversation, using one hand, with poor internet, on a mid-range Android phone? If the answer is yes, the decision is probably correct.

---

# 10. Offline-First Engineering

> **Offline is not an edge case. Offline is a first-class operating mode.** Hanu should continue helping the business owner regardless of network quality. Internet connectivity should improve the experience — not determine whether the application works.

The business should never stop because the internet stopped. The owner may be at an exhibition, inside a crowded market, traveling, in an area with poor reception, on limited mobile data, or temporarily disconnected — Hanu should continue operating normally. The user should never hesitate before opening the application because they're unsure whether they have internet.

## Offline Is the Default

When designing any feature, assume **no internet**, not stable internet. The question is never *"how does this work offline?"* — it is **"how does this synchronize once connectivity returns?"** This shift fundamentally changes the architecture.

## Local-First Data Flow

Every user action follows this lifecycle, and it never reverses:

```
User Action → Validate → Write Locally → Update UI Immediately
   → Queue Synchronization → Background Upload → Confirmation
```

## Local Data Is the Working Copy

The application always interacts with the local database. The cloud exists for backup, synchronization, multi-device support, and disaster recovery — the cloud is **not** the primary working database. The local database is.

## The User Should Never Wait

Avoid:

```
Tap Save → Loading... → Loading... → Loading... → Success
```

Prefer:

```
Tap Save → Saved → Syncing... → ✓ Synced
```

The work is already complete — synchronization is simply catching up.

## Synchronization Is Invisible

Synchronization should happen quietly. The owner should not be asked to upload, download, refresh, retry, or synchronize manually. Unless recovery is genuinely required, sync should remain automatic.

## Synchronization States

Every record exists in one of the following states, and the application should always know which:

```
Local → Pending Sync → Syncing → Synced → Conflict → Failed
```

## Optimistic Updates

Assume success. When the user performs an action: update the interface immediately, persist locally immediately, synchronize later. Do not delay the experience because of the network — the interface should feel instantaneous.

## Queue Everything

Any operation requiring the network should enter a synchronization queue: create product, update product, delete product, create customer, create order, upload images, payment updates. Queues provide resilience that immediate network requests don't.

## Retry Automatically

Failures should not require user intervention. The application should retry intelligently on network restoration, application reopen, and periodic background sync. The owner should not repeatedly press "Retry" — automation should handle temporary failures.

## Conflicts Are Expected

Conflicts are not bugs — they're a normal consequence of distributed systems. Never assume "my device is the only device"; future versions may include multiple phones, assistants, or shared accounts, and the architecture should already respect that possibility.

When conflicts occur:

1. Preserve user data.
2. Never silently discard information.
3. Explain what happened.
4. Offer clear recovery.
5. Keep the process understandable.

Data loss is unacceptable. Confusion is unacceptable.

## Offline Indicators

Communicate network status without creating anxiety.

Good:

> Working Offline — changes will sync automatically.

Bad:

> ERROR: NETWORK FAILURE: REQUEST FAILED

Offline is a mode. Not a failure.

## Image Strategy

Images follow the same philosophy: capture immediately, store locally, compress intelligently, upload later. The user should never lose a photo because the internet disappeared.

## Background Synchronization

Synchronization should happen when internet returns, the application starts, the user resumes the app, or at periodic sync intervals — and it should never block the interface.

## Failure Philosophy

Every operation should answer: What happens if upload fails? What happens if download fails? What happens if power is lost? What happens if storage is full? What happens if the application crashes? Can the user continue working? Graceful degradation is mandatory.

## Never Lose Work

This is non-negotiable. Once the owner presses Save, their work is safe — regardless of internet, battery, application restart, or temporary server issues. The software must protect user effort above everything else.

## Sync Transparency

Users should understand the health of synchronization without understanding the implementation. Good indicators: `Pending (3)`, `Syncing...`, `Synced ✓`, `Needs Attention`. Avoid exposing technical details — the implementation belongs to engineering, the workflow belongs to the user.

## Engineering Checklist

Every feature must answer these questions before implementation:

- Does it work completely offline?
- Is data immediately available?
- Is synchronization automatic?
- Is failure recoverable?
- Can work continue during failure?
- Is user effort protected?

If the answer to any question is "No," the feature is not complete.

## The Offline Commandment

> The business owner's confidence should never depend on signal strength. When connectivity disappears, Hanu should quietly continue doing its job. The user should think: **"I'll keep working. Hanu will handle the rest."**

---

# 11. State Management

> **State is the single most expensive asset in a frontend application.** Every piece of state introduces complexity, synchronization, bugs, testing requirements, and cognitive overhead. **The best state is the state that doesn't exist.**

Hanu does not optimize for clever state management — it optimizes for predictable state management. The application should always make it obvious where data lives, who owns it, who can modify it, when it changes, and why it changes. If these questions can't be answered immediately, the architecture needs improvement.

## The State Hierarchy

Evaluate every new piece of state against this hierarchy, and always choose the **lowest possible level**:

```
Derived Value
     ↓
Local Component State
     ↓
Feature State
     ↓
Persistent Local Database
     ↓
Global State
     ↓
Remote Server
```

Never promote state unless there's a genuine need.

## Single Source of Truth

Every piece of information must have exactly one owner — Product → Product Repository, Customer → Customer Repository, Order → Order Repository. Never duplicate ownership; duplicated state eventually becomes inconsistent state.

## Database First

The local database is the primary source of truth. React state is merely a projection of database state.

Instead of:

```
Server → React State
```

Prefer:

```
Local Database → React State → UI
```

The UI should always reflect local data. Synchronization happens independently.

## UI State vs. Business State

These two concepts must never be mixed.

**UI State** — modal open, selected tab, search query, current page, drawer visibility, loading spinner. Belongs inside components.

**Business State** — products, orders, customers, inventory, payments. Belongs inside repositories and the local database. Never store business data purely in React component state.

## Keep State Close

State should live as close as possible to where it's used:

```
Single Component → useState()
```

instead of:

```
Global Store → Used Once
```

Global state is expensive. Local state is cheap.

## Global State Is Exceptional

Global state should remain extremely small.

Acceptable: authentication, theme, network status, current user, application configuration.

Unacceptable: product forms, inventory editing, search dialogs, temporary selections.

If only one screen needs it, it should not be global.

## Derive Whenever Possible

Never store information that can be calculated.

Bad:

```ts
const [productCount, setProductCount]
```

Good:

```ts
const productCount = products.length
```

Derived state automatically remains correct. Stored state eventually becomes stale.

## One-Way Data Flow

Data should move predictably:

```
Database → Repository → Hook → Component → User
```

Avoid circular flows, hidden mutations, and implicit updates. Predictability is more valuable than cleverness.

## Mutations

Every mutation should have exactly one entry point. Avoid multiple components writing directly to the database; prefer:

```
Component → Repository → Database
```

Repositories protect consistency.

## Immutability and Side Effects

Treat application state as immutable — never mutate objects directly, prefer creating new values. Predictable updates simplify debugging, rendering, synchronization, and testing.

Side effects (network requests, database writes, notifications, logging, analytics) should be isolated; business logic should remain pure whenever possible. Pure functions are easier to understand, reuse, test, and trust.

## State Synchronization

Synchronization should happen automatically. The UI should never manually coordinate local updates, remote updates, retries, or reconciliation — repositories and synchronization services own this responsibility.

## Loading State and Error State

Loading should be meaningful — prefer "Loading Products...", "Saving Order...", "Uploading Images...", "Synchronizing Changes..." over a generic "Loading...". Users should understand what the application is doing.

Errors belong beside the operation that created them. Don't build giant global error systems — keep failures localized, recover locally, escalate only when necessary.

## State Lifetime

Every piece of state should have a clearly defined lifetime — a search query lives for the current screen, a shopping session lives for the current session, products live in the persistent database. Knowing when state should disappear is as important as knowing when it should exist.

## Minimize Re-renders

Optimize only after measurement. Prefer splitting components, memoization where justified, stable references, and derived values. Do not prematurely optimize — readable code remains the priority.

## React Philosophy

React should render state, not own the business. Business logic belongs outside the UI; React's responsibility is presentation, nothing more.

## State Review Checklist

Before introducing any new state, ask: Can this be derived? Does this already exist elsewhere? Who owns this? How long should this live? Can this remain local? Does this belong in the database instead? Does this need synchronization? If any answer is unclear, stop and redesign.

## The State Commandment

> The application should never leave an engineer wondering: **"Where did this value come from?"** Every piece of state should have one owner, one lifecycle, one responsibility, one source of truth. Predictable state creates predictable software.

---

# 12. Database Principles

> **The database is not a storage container. It is the memory of the business.** Every product, customer, order, payment, inventory movement, and business event entrusted to Hanu becomes part of that memory. Engineering has the responsibility to preserve it with integrity.

Data is more valuable than code. Code can be rewritten; databases can be migrated. User trust, once lost through data corruption or data loss, is extremely difficult to recover. Every database decision should prioritize integrity, reliability, recoverability, simplicity, and auditability — performance comes after correctness.

## Local Database First

The local database is the operational database — not merely a cache. It is the primary working memory of Hanu, and every business operation interacts with it first:

```
User → Local Database → UI → Synchronization → Cloud
```

Never reverse this flow.

## One Entity, One Repository

Every domain entity owns exactly one repository:

```
Product → ProductRepository
Customer → CustomerRepository
Order → OrderRepository
```

Repositories own persistence — nothing else should directly manipulate database tables.

## No Raw Database Access

Components should never query the database directly.

Bad: `Component → SQL Query`

Good: `Component → Repository → Database`

Repositories provide consistency.

## Schema Design

Schemas should model the business, not the UI. Good schema questions: What exists in the real world? What relationships exist? What constraints exist? What history should be preserved? Bad schema questions: What is easiest to render? What is easiest to query today? User interfaces change; business concepts rarely do.

## Normalize First

Prefer normalized data. Duplicate information only when measured performance requires it, synchronization benefits from it, or the duplication is intentional and documented. Redundant data creates inconsistency.

## Every Record Has Identity

Every entity requires a stable, unique identifier that never changes. Don't use mutable business values as identifiers — product name, customer phone number, or a manually entered SKU. Identity should survive edits.

## Preserve History

Avoid destructive updates whenever possible — business history has value. Prefer recording events over deleting information.

Instead of:

```
Inventory = 8
```

Consider:

```
Inventory Transaction: -2, Reason: Order #104
```

History explains the present.

## Soft Delete by Default

Business records should rarely disappear permanently. Prefer `DeletedAt` or `Archived` over permanent deletion — permanent deletion should remain exceptional.

## Constraints Belong in the Database

Business invariants should exist at multiple levels: validation in the UI improves experience, validation in services improves correctness, and constraints in the database protect integrity. Never rely solely on frontend validation.

## Transactions

Operations affecting multiple entities should be atomic. Creating an order should create the order, reserve inventory, record an inventory transaction, and create a sync queue entry — either everything succeeds or nothing changes. Partial business operations are unacceptable.

## Migrations

Database schemas evolve. Every schema change requires versioning, a migration, and a rollback strategy. Never manually edit production schemas — the database should evolve predictably.

## No Hidden Data

Every stored value should have a clear purpose. Avoid mysterious columns, unused fields, and speculative storage. Every field should answer *"why does this exist?"* — if the answer is unclear, remove it.

## Timestamps and Auditability

Every important entity should record `Created At` and `Updated At`, and when appropriate `Deleted At`, `Synced At`, `Last Modified By`, and `Version`. Time provides context; context simplifies debugging.

Business operations should be explainable: who changed inventory, when an order was modified, why stock decreased, what caused a synchronization conflict. The database should preserve enough information to reconstruct important events.

## Data Integrity

Relationships matter — use foreign keys and constraints wherever appropriate. An order without a customer, a payment without an order, or an inventory transaction without a product all represent architectural failures. Protect relationships.

## Synchronization Metadata

Business data and synchronization metadata should remain conceptually separate.

Business entity: Product, Customer, Order.

Synchronization metadata: sync status, last sync, retry count, pending operation, conflict state.

The business should not become polluted with infrastructure concerns.

## Never Lose User Data

This principle overrides convenience. If forced to choose between duplicate data, delayed synchronization, or temporary inconsistency versus deleting user work — always preserve the user's work. Synchronization problems are recoverable; lost data is not.

## Performance and Future Compatibility

Optimize only after evidence — before introducing indexes, denormalization, caching, or query optimization, measure. Guessing at performance problems often creates maintenance problems.

Today's schema should not block tomorrow's features. Design assuming future support for multiple devices, assistants, analytics, inventory forecasting, AI recommendations, courier integrations, and accounting integrations. Flexibility should emerge from good modeling, not excessive abstraction.

## Database Review Checklist

Before approving any schema change, ask: Does this model the real business? Is data duplicated unnecessarily? Are relationships protected? Can history be reconstructed? Can this migrate safely? Can synchronization handle this? Will this still make sense in five years?

## The Database Commandment

> The database is the memory of Hanu Enterprises. Treat every record as though it represents a real customer's trust, a real business decision, or a real day's work. **Protect the data first. Everything else is secondary.**

---

# 13. AI Collaboration

> **AI is a force multiplier — not a substitute for engineering judgment.** Hanu is engineered by humans with AI assistance. AI exists to accelerate thinking, reduce repetitive work, and improve engineering quality. Final responsibility always belongs to the engineer.

AI is treated as a collaborative engineering partner — not an oracle, not an autonomous developer, not a replacement for critical thinking. Every AI-generated suggestion should be evaluated with the same scrutiny as a pull request from a junior engineer. Trust evidence. Never confidence.

## The Role of AI

AI should primarily assist with: architecture exploration, feature planning, code generation, refactoring, code reviews, documentation, testing, bug investigation, research, design critique, and developer productivity — reducing repetitive engineering work so the engineer can spend more time solving real problems.

## Human Responsibilities

Humans are responsible for product direction, business understanding, architecture decisions, trade-off analysis, final code approval, security decisions, dependency decisions, and release decisions. These responsibilities are never delegated.

## AI Responsibilities

AI is expected to:

- Read project documentation before making assumptions.
- Follow established architecture.
- Reuse existing patterns.
- Explain reasoning.
- Produce maintainable code.
- Highlight trade-offs.
- Point out risks.
- Recommend improvements.
- Ask questions when requirements are ambiguous.

AI should optimize for long-term maintainability, not short-term output.

## Read Before Writing

Before implementing any non-trivial feature, AI should understand the project:

```
AGENTS.md → Relevant Architecture Documents → Current Sprint
   → Existing Implementation → Implementation
```

Never modify architecture without understanding it.

## Ask Before Assuming

If requirements are ambiguous, ask. Do not invent business rules, user workflows, data relationships, edge cases, or product decisions — incorrect confidence creates expensive bugs.

## Respect Existing Architecture

Every new implementation should feel native to the codebase — prefer existing abstractions, naming, patterns, and structure. Avoid introducing parallel architectures. Consistency compounds.

## Simplicity First

Whenever multiple implementations are possible, AI should recommend the simplest solution that satisfies requirements — never optimize for impressive code, unusual patterns, unnecessary abstractions, or excessive generic programming. Simple software survives.

## Explain Trade-offs

Recommendations should include benefits, drawbacks, maintenance cost, and scalability implications. Engineering is decision-making — AI should support decisions, not hide them.

## Large Changes Require Plans

Before implementing architectural or feature-level changes, AI should produce an implementation plan: objective, affected files, architecture impact, migration strategy, risks, testing approach. Large changes begin with planning, not typing.

## Prefer Existing Solutions

Before recommending new libraries, frameworks, patterns, or infrastructure, AI should first evaluate existing project capabilities, browser APIs, React APIs, TypeScript features, and current architecture. New dependencies are the last option, not the first.

## Never Hide Uncertainty

When uncertain, say so. Prefer *"I'm not certain"* over confidently incorrect information. Honesty builds trust; false certainty destroys it.

## Challenge Decisions Respectfully

Agreement is not the goal — better software is. When appropriate, AI should question unnecessary complexity, architectural violations, feature creep, poor abstractions, and maintainability risks. Constructive disagreement is encouraged; blind agreement is discouraged.

## Documentation Is Part of Engineering

Whenever implementation changes architecture, AI should recommend updating documentation, decision logs, technical debt records, and architecture notes. Knowledge should evolve with the software.

## Code Generation and Review Standards

Generated code should be complete, production quality, readable, typed, tested when appropriate, and consistent with project conventions. Avoid placeholder implementations, unfinished logic, unnecessary comments, and speculative abstractions — quality is expected from the first draft.

When reviewing code, prioritize in order: correctness → architecture → simplicity → maintainability → readability → performance → style. Style discussions should never overshadow architectural concerns.

## Security Mindset

AI should proactively identify unsafe patterns, exposed secrets, injection risks, insecure storage, missing validation, and authentication weaknesses. Security should be considered during implementation, not after it.

## Communication Style

AI responses should be direct, technical, honest, structured, actionable, concise when possible, and detailed when necessary. Avoid unnecessary enthusiasm, filler, speculation, and unsupported claims. Respect the engineer's time.

## The Collaboration Contract

The engineer and AI work as partners. The engineer contributes context, intent, judgment, and product understanding. AI contributes speed, breadth, analysis, implementation support, and consistency. Neither is sufficient alone — together they produce better software than either could independently.

## Final Principle

> The purpose of AI within Hanu is not to write more code. It is to help the engineering team make better decisions. Every recommendation should ultimately answer one question: **does this make Hanu simpler, more reliable, and easier to maintain one year from now?** If the answer is no, reconsider the recommendation.

---

# 14. Documentation, Memory & Decision Records

> **Code explains what the system does. Documentation explains why the system exists.** Hanu must never depend on human memory for critical engineering knowledge.

Every engineering project accumulates knowledge — unfortunately, most projects let it live only in conversations, pull requests, chat history, or developer memory. Knowledge that exists only in someone's head is eventually lost. Hanu treats engineering knowledge as a first-class asset: if a decision is important enough to influence future work, it deserves to be documented.

## Documentation Hierarchy

Knowledge is organized into four layers, each answering a different question:

```
Project Vision → Architecture → Current Work → Historical Decisions
```

## AGENTS.md

Purpose: defines the permanent engineering philosophy of Hanu — mission, vision, architecture principles, engineering standards, AI collaboration, product philosophy. This document changes very rarely; it is the constitution of the project.

## Architecture Documentation — `docs/architecture/`

Purpose: explain *how* the system is designed. Includes system architecture, domain model, tech stack, offline architecture, information architecture, and ADRs. These documents evolve only when architecture changes.

## Memory Documents — `docs/memory/`

Purpose: capture temporary, evolving engineering context. Unlike architecture documents, memory documents change frequently.

**INDEX.md** — the entry point for project memory: current stack, important document links, active architecture, memory map. Every AI session should begin here.

**CURRENT_SPRINT.md** — represents current engineering focus: sprint objective, current milestone, active feature, remaining work, known blockers. Changes frequently; only one sprint should be active at a time.

**DECISION_LOG.md** — records important engineering decisions. Each entry should include date, context, decision, reasoning, alternatives considered, and consequences. Future engineers should understand *why* a decision was made, not simply *what* was chosen.

**TECH_DEBT.md** — tracks intentional compromises: temporary implementations, architectural shortcuts, known bugs, missing tests, future refactors. Technical debt should never exist silently — every shortcut needs an owner and an exit strategy.

## Architectural Decision Records (ADRs)

Major architectural decisions require an ADR — state management changes, database redesign, authentication strategy, a new synchronization model, a major dependency introduction. Each ADR should answer: Problem, Context, Decision, Alternatives, Trade-offs, Consequences. Architecture without reasoning becomes archaeology.

## Documentation Principles

Documentation should be accurate, concise, technical, maintainable, and version controlled — never marketing. Its audience is future engineers.

**Ownership:** whenever implementation changes architecture, documentation must change within the same pull request. Code and documentation should never drift apart — if documentation becomes outdated, future engineering quality declines rapidly.

**Preserve decisions, not just outcomes.**

Bad: *"Switched to Zustand."*

Good: *"Redux introduced unnecessary boilerplate for Hanu's relatively small global state. Zustand provided simpler APIs, reduced bundle size, and aligned with our feature-first architecture."*

Reasoning has a longer lifespan than implementation.

## Project Memory Over Conversation Memory

Engineering decisions should never depend on remembering previous chats. If losing the conversation would lose important project knowledge, that knowledge belongs inside the repository — the repository should always remain the canonical source of truth.

## Keep Memory Fresh

Whenever completing a major feature, update CURRENT_SPRINT.md, DECISION_LOG.md, and TECH_DEBT.md (if applicable). Whenever architecture changes, update architecture documents, ADRs, and relevant standards.

## Historical Integrity

Never rewrite history. If a previous decision becomes incorrect, record a new decision explaining why it changed — engineering history should remain traceable, and future contributors should understand the evolution of the project.

## Technical Debt Philosophy

Technical debt is acceptable only when intentional, documented, temporary, and understood. Every entry should contain: description, why it exists, impact, proposed solution, priority, date added. Unknown technical debt is risk; documented technical debt is engineering work waiting to happen.

## Repository as the Single Source of Truth

If two sources disagree, priority is:

```
1. Production Code
2. AGENTS.md
3. Architecture Documents
4. ADRs
5. Memory Documents
6. External Conversations
```

Knowledge should flow **into** the repository — never the other way around.

## AI Memory Rules

Before proposing significant changes, AI should: read AGENTS.md, read relevant architecture documentation, read CURRENT_SPRINT.md, check DECISION_LOG.md for previous decisions, review existing implementation, and only then propose changes. The repository always has priority over assumptions.

## The Documentation Commandment

> Future contributors should never have to ask: **"Why was this built this way?"** The answer should already exist somewhere inside the repository. If an important engineering decision lives only inside someone's memory, it has not been properly documented.

---

# 15. Decision Framework & Engineering Priorities

> **Not all decisions are equally important.** Engineering quality depends less on making perfect decisions and more on consistently making the right trade-offs. Hanu follows a clear decision hierarchy so that every contributor — human or AI — optimizes for the same outcomes.

When uncertainty exists, decisions should not depend on personal preference, familiarity, trends, hype, or convenience — they should depend on project principles.

## The Decision Hierarchy

Whenever multiple valid solutions exist, evaluate them in this order:

```
Correctness → User Value → Reliability → Simplicity → Maintainability
   → Offline Capability → Performance → Developer Experience → Convenience
```

Lower priorities must never compromise higher priorities.

**1. Correctness** — the software must behave correctly; nothing else matters if the result is incorrect. Never sacrifice correctness for performance, elegance, speed, shorter code, or developer convenience. Correct software earns trust; incorrect software destroys it.

**2. User Value** — every feature should solve a real business problem. Ask: Does this remove work? Save time? Reduce mistakes? Reduce stress? Would the owner notice if this disappeared? If not, reconsider the feature.

**3. Reliability** — predictability is more valuable than cleverness. Users should know what happened, what is happening, and what will happen next. Reliability creates confidence; confidence creates adoption.

**4. Simplicity** — whenever two correct solutions exist, choose the simpler one: fewer concepts, fewer files, fewer dependencies, fewer abstractions, fewer edge cases. Complexity must justify itself.

**5. Maintainability** — every implementation should assume someone else will modify it: another engineer, an AI agent, or future-you. Readable systems survive; fragile systems accumulate debt.

**6. Offline Capability** — no feature should depend on continuous internet connectivity. Before implementation ask: Can this work offline? Can this synchronize later? Can user work be preserved? Offline capability is an architectural requirement, not a premium feature.

**7. Performance** — optimize only after measurement. Ask: Is this slow enough to matter? Has it been measured? Does optimization justify added complexity? Premature optimization creates permanent maintenance costs.

**8. Developer Experience** — good DX matters because good developers build better products: predictable project structure, clear documentation, strong typing, consistent architecture, fast local development, understandable errors.

**9. Convenience** — important, but never the deciding factor. Don't choose a solution merely because it requires fewer lines, feels familiar, or is fashionable. Optimize for years, not afternoons.

## Trade-Off Philosophy

Perfect solutions rarely exist — engineering is choosing the best compromise. Whenever trade-offs exist, document what was gained, what was sacrificed, and why the decision was made. Future engineers deserve context.

## Feature Evaluation Framework

Before approving a new feature, answer:

- **Problem** — what real problem exists?
- **Frequency** — how often does this problem occur?
- **Impact** — how much time or effort does it save?
- **Complexity** — how much engineering complexity does it introduce?
- **Maintenance** — how much ongoing maintenance will it require?
- **Longevity** — will this still matter two years from now?

If these questions cannot be answered, the feature is not ready.

## Dependency Evaluation Framework

Every dependency must justify itself: Can the browser already do this? Can React already do this? Can TypeScript already do this? Can we implement this ourselves simply? Is the package actively maintained? Is the bundle cost acceptable? Does it increase long-term maintenance? If uncertainty exists, prefer not installing it.

## Architecture Decision Framework

Before introducing architectural change, ask: Does this simplify the system? Does this reduce duplication? Does this improve reliability? Does this improve testing? Does this improve future extensibility? Does this align with existing architecture? Architecture should become simpler over time, not more impressive.

## Refactoring Framework

Refactor only when it improves at least one of: readability, maintainability, correctness, testability, simplicity. Never refactor merely because code "looks old" — age is not a defect.

## When Principles Conflict

Resolve conflicts in this order:

```
1. Protect user data
2. Preserve correctness
3. Preserve reliability
4. Preserve simplicity
5. Preserve maintainability
6. Improve developer experience
```

The higher principle always wins.

## The Final Decision Test

> **If Hanu becomes ten times larger, ten times more successful, and is maintained by engineers who have never met us, will this decision still feel obvious and defensible?** If the answer is yes, the decision is probably good. If the answer is no, keep thinking.

## The Engineering Compass

Whenever uncertainty exists, return to these priorities: protect user trust, reduce operational burden, keep the architecture simple, preserve long-term maintainability, build software that quietly serves the business owner. Every good decision moves Hanu closer to becoming software that people stop thinking about because it simply works.

---

# 16. Definition of Done

> **A feature is not complete when the code compiles. A feature is complete when the business owner can confidently rely on it.** Every feature, bug fix, refactor, or architectural change merged into Hanu must satisfy the Definition of Done below.

Shipping code is easy. Shipping reliable software is difficult. Nothing is considered complete because it works on one machine, the UI looks correct, the compiler passes, or AI generated it. A feature is complete only when it satisfies every applicable requirement below.

**1. Functional Correctness** — the implementation solves the intended problem, matches the approved requirements, produces the expected behavior, handles invalid input gracefully, handles realistic edge cases, and does not knowingly introduce regressions. Correctness always comes before optimization.

**2. Architecture Compliance** — layer boundaries are respected, business logic remains outside UI components, data flows in the correct direction, existing patterns are reused, and no architectural shortcuts are introduced. The feature should feel native to the codebase.

**3. Mobile Experience** — every user-facing feature has been evaluated on a mobile device or mobile viewport: comfortable one-handed usage, large touch targets, readable typography, no layout breaking, no horizontal scrolling, fast interaction. Desktop validation alone is insufficient.

**4. Offline Verification** — every applicable feature has been evaluated under offline conditions: Can the workflow continue? Is user work preserved? Is synchronization queued? Are failures communicated clearly? Can work resume automatically? Offline behavior is part of feature completion.

**5. Error Handling** — the implementation handles expected failure scenarios: invalid input, missing data, network interruption, synchronization failure, unexpected exceptions. The application should fail gracefully — never silently.

**6. Type Safety** — before merging: TypeScript passes, no unnecessary `any`, no ignored compiler errors, no unsafe casts without justification. Types represent engineering confidence.

**7. Code Quality** — the implementation is readable, maintainable, consistent, well named, and appropriately modular. No unnecessary duplication, no speculative abstractions, no dead code.

**8. Testing** — every feature should be verified appropriately: unit tests, integration tests, manual workflow validation, offline validation, edge case testing, where applicable. Testing should increase confidence, not merely increase coverage numbers.

**9. Performance** — verify that the implementation does not introduce obvious performance regressions: unnecessary renders, blocking operations, excessive database queries, unnecessary downloads, excessive bundle growth. Optimize only where evidence justifies it.

**10. Accessibility** — every interactive feature should remain usable: keyboard accessibility, screen reader compatibility, sufficient contrast, meaningful labels, logical focus order. Accessibility is part of quality.

**11. Documentation** — if the implementation changes project knowledge, documentation must be updated: architecture changes, new workflows, new patterns, new dependencies, major refactors. The repository should remain the single source of truth.

**12. Decision Log** — if an important engineering decision was made, record it. Future contributors should understand what changed, why it changed, and what alternatives were considered. Engineering history matters.

**13. Technical Debt** — if shortcuts were taken, they must be documented: reason, impact, proposed resolution. Never leave technical debt invisible — undocumented debt is a bug.

**14. Dependency Review** — before introducing any dependency, verify: native APIs cannot solve the problem, existing project tools cannot solve the problem, long-term maintenance is acceptable, bundle impact is justified, security implications are understood. Dependencies are permanent engineering decisions — treat them accordingly.

**15. User Validation** — before considering a feature complete, ask: would the owner of Hanu Enterprises immediately understand how to use this? If explanation is required, the feature likely needs refinement. Real usability is the final test.

**16. Engineering Review** — every contributor should perform a final self-review: Can this be simpler? Can this be clearer? Can this be smaller? Can this be safer? Can this be removed entirely? Good engineering begins with self-critique.

## Final Gate

A feature is considered complete only when all applicable criteria above have been satisfied. Until then, the feature is **Work In Progress.** There are no exceptions.

## Definition of Done — Summary

A feature is Done when it: solves the correct problem; respects the architecture; works on mobile; works offline; protects user data; is understandable; is maintainable; has been validated; has been documented; and **the business owner can confidently rely on it.** Only then has engineering truly been completed.

---

# Non-Negotiables

> A condensed index of the absolutes already stated throughout this document. If a decision violates one of these, stop — no exception is justified by deadline, convenience, or preference.

**Data & Persistence**
1. Never silently lose user data — preserve it over convenience, speed, or consistency.
2. Once the owner presses Save, the work is safe — regardless of network, battery, or crash.
3. The local database is the working copy; the cloud is backup and sync, never the primary source.
4. Every entity has exactly one repository — nothing else touches the database directly.
5. Never use a mutable business value (name, phone, SKU) as a stable identifier.
6. Prefer soft delete; permanent deletion is exceptional.
7. Operations touching multiple entities must be atomic — no partial business operations.
8. Never manually edit production schemas — migrations only, always with a rollback strategy.
9. Never rely solely on frontend validation — constraints belong in the database too.

**Architecture & Code**
10. Business logic never lives in UI components.
11. The Domain layer never imports React, UI components, or external SDKs.
12. Dependencies always point inward: UI → Application → Domain.
13. Never add a dependency without justification — the default answer is no.
14. `any` is forbidden without a documented, justified reason.
15. Never ignore an error — `catch (e) {}` is forbidden; every failure must be visible and recoverable.
16. Never hardcode magic numbers — use named constants or enums.
17. One file, one clear responsibility.
18. Premature abstraction is technical debt — apply the Rule of Three before abstracting.
19. Never sacrifice correctness for performance, elegance, or convenience.

**State**
20. Every piece of state has exactly one owner — never duplicate ownership of business data.
21. Never store information that can be derived or calculated.
22. Business state lives in repositories and the database — never raw React component state.
23. Global state stays small — if only one screen needs it, it isn't global.

**Offline & Mobile**
24. Offline capability is a property of the architecture, not a feature toggle.
25. Every user action writes locally and updates the UI immediately — never wait on the network first.
26. Synchronization is automatic and invisible — the owner is never asked to manually sync.
27. Mobile is the product, not a responsive afterthought — design phone-first, always.
28. Every gesture needs an obvious, accessible alternative.
29. Accessibility is part of quality, not an edge case.

**Process & Knowledge**
30. Documentation is part of implementation, not an afterthought — code and docs change in the same pull request.
31. Never rewrite engineering history — record a new decision, don't erase the old one.
32. Technical debt is acceptable only when it is intentional, documented, and temporary.
33. The repository is the single source of truth — never depend on conversation memory for project knowledge.
34. AI-generated code is reviewed with the same scrutiny as a junior engineer's pull request — trust evidence, never confidence.
35. AI must never invent business rules, workflows, or edge cases — ask when requirements are ambiguous.
36. A feature is not done because it compiles — it's done when the business owner can confidently rely on it.
