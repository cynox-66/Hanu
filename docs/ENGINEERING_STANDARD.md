# Hanu Engineering Standard

This document is the single source of truth for the Hanu architecture, serving as a canonical reference for all future module development (e.g., Orders). It extracts and solidifies the proven patterns from the completed Product and Customer modules. **Do not invent new architecture without amending this document.**

## 1. Purpose

The purpose of this standard is to guarantee structural consistency, enforce strict separation of concerns, and maintain a predictable developer experience across Hanu. By codifying these rules, we ensure that every feature is offline-first, testable, and highly maintainable without relying on generic abstractions, complex event buses, or global state managers.

## 2. Canonical Feature Folder Structure

Every feature module MUST follow this exact directory structure:

```
src/features/<feature>/
├── application/       # Use Cases (stateless, pure TS)
├── domain/            # Entities, Interfaces, Factories
├── hooks/             # Custom React Hooks for DI and state
├── infrastructure/    # Persistence (e.g., Dexie repositories)
├── presentation/      # React UI (Pages, Components, States)
├── types/             # DTOs, Enums, Shared types
└── index.ts           # Public API export barrel
```

## 3. Layer Responsibilities

### Presentation

- **Responsibilities:** Renders UI, handles local form state, displays data, and captures user input.
- **Allowed imports:** React, `react-router-dom`, Feature `hooks/`, Feature `types/`.
- **Forbidden imports:** `application/`, `domain/`, `infrastructure/`, external DB SDKs (Dexie).

### Hooks

- **Responsibilities:** Bridges React to the Application layer. Manages query/mutation state (loading, error, refetching) and provides Dependency Injection by wiring Use Cases to the injected Repository Context.
- **Allowed imports:** React (`useState`, `useContext`, `useCallback`), `application/`, `types/`, Context Definitions.
- **Forbidden imports:** `infrastructure/`, `presentation/`.

### Application

- **Responsibilities:** Orchestrates business flows via isolated Use Case classes. Maps DTOs to Domain Entities (via Factories) and delegates persistence to Repositories.
- **Allowed imports:** `domain/`, `types/`.
- **Forbidden imports:** React, `infrastructure/`, `presentation/`, Browser APIs.

### Domain

- **Responsibilities:** Defines the core business language. Contains Repository interfaces, Business Factories (which enforce invariants and generate IDs/Timestamps), and core logic.
- **Allowed imports:** `types/`.
- **Forbidden imports:** React, `application/`, `infrastructure/`, `presentation/`.

### Infrastructure

- **Responsibilities:** Implements Domain Repository interfaces. Handles concrete database operations (e.g., Dexie IndexedDB calls), object serialization, and mapping from DB schemas to Domain Entities.
- **Allowed imports:** `domain/`, external DB SDKs (Dexie), `types/`.
- **Forbidden imports:** React, `presentation/`, `application/`, `hooks/`.

### Composition Root

- **Responsibilities:** (`src/app/providers.tsx`) Owns the instantiation of Infrastructure implementations and injects them into React via Context Providers.
- **Allowed imports:** All modules' `infrastructure/` and `hooks/`.

## 4. Dependency Direction

Dependencies MUST strictly flow inward toward the Domain.

```
Presentation ──> Hooks ──> Application ──> Domain <── Infrastructure
                    │                        ^
                    └────────────────────────┘
```

_Note: Infrastructure implements Domain interfaces (Dependency Inversion), and Hooks compose Application Use Cases with those interfaces._

## 5. DTO Rules

Data Transfer Objects define the shape of data crossing boundaries (Presentation -> Application).

- **CreateDTO**: Contains fields required for creation (e.g., `name`, `phone`). Never includes `id`, `createdAt`, or `updatedAt` as these are domain concepts.
- **UpdateDTO**: Contains fields allowed for modification. Often `Partial`, but distinct from CreateDTO.
- **Why they are separate:** Creation and Modification have fundamentally different business rules and required fields. Reusing a single type creates optional-field ambiguity.

## 6. Factory Rules

- **Entity creation belongs in Domain Factories** (e.g., `CustomerFactory.create()`).
- **UI never creates entities.** The UI only passes DTOs.
- **Business invariants belong here.** The factory is responsible for generating UUIDs, assigning `createdAt`/`updatedAt` timestamps, and setting default statuses (e.g., enforcing that new records default to 'draft' or 'active').

## 7. Repository Rules

- **Interface in Domain:** E.g., `CustomerRepository.ts` must be a pure TS interface containing only business-relevant methods (`save`, `getById`, `findAll`).
- **Implementation in Infrastructure:** E.g., `DexieCustomerRepository.ts` implements the domain interface.
- **Soft Delete:** Destructive deletes are prohibited. Use `archive()` to update a `status` field to `'archived'`.
- **findAll behaviour:** Must filter out archived records by default to preserve the active working set.
- **save as upsert:** The `save(entity)` method should handle both INSERT and UPDATE operations transparently (e.g., using Dexie's `.put()`).
- **archive semantics:** Must be a distinct method on the interface, not just a standard update.

## 8. Use Case Rules

Every use case must follow these constraints:

- **One class per use case:** E.g., `CreateCustomer.ts`, `ArchiveProduct.ts`.
- **execute() method:** The single public entrypoint for the class.
- **Constructor injection:** Dependencies (like the Repository) must be injected via the constructor.
- **No React:** Absolutely no hooks, state, or DOM references.
- **No Dexie:** Absolutely no database-specific logic or imports.

## 9. Hook Rules

Hooks serve as the connective tissue between React and the Application layer.

- **Canonical API:** Use a distinct hook per use case (e.g., `useCreateCustomer`, `useArchiveCustomer`).
- **Mutation hooks:** Must return an execution function (e.g., `create`), a boolean `isSaving`/`isArchiving` flag, and optionally an `error` state.
- **Query hooks:** Must return the data array/object, an `isLoading` boolean, an `error` state, and a `refetch` function.
- **Encapsulation:** Hooks extract the Repository from Context and manually instantiate the required Use Case class.

## 10. Search Rules

Search functionality must be handled strictly in-memory over pre-fetched data to guarantee offline speed.

- **Search use cases:** E.g., `SearchCustomers` must be synchronous and pure.
- **Stateless:** Does not store the query or the result.
- **Not part of DI:** It does not need the repository. It is instantiated directly inside the search hook (`const search = new SearchCustomers()`).
- **In-memory:** Operates on the already-fetched entity array (`Product[]` or `Customer[]`).
- **No IndexedDB query per keystroke:** Never hit the database on input change.

## 11. Presentation Rules

- **Smart pages:** E.g., `CustomerListPage.tsx` or `CustomerList.tsx` manage routing parameters, invoke hooks, and handle macro state (loading/error overlays).
- **Dumb components:** E.g., `CustomerCard.tsx`, `CustomerForm.tsx` receive primitives and callbacks. They do not know about hooks or routing.
- **No business logic:** Presentation components must not format domain rules or generate IDs.
- **No persistence:** Never import Dexie or call DB methods directly.
- **No entity creation:** Forms emit DTOs, not completed Entities.

## 12. Composition Root Rules

- **providers.tsx owns infrastructure.** It is the only place where `DexieProductRepository` or `DexieCustomerRepository` is instantiated.
- **Features never instantiate repositories.** Hooks rely strictly on React Context to provide the interface implementation.

## 13. Archive Rules

- **Archive instead of Delete.** True data deletion is strictly forbidden to prevent accidental data loss.
- **Archived records invisible by default.** Lists and searches must exclude archived entities automatically.
- **Editing archived entities prohibited.** The Edit page must treat an archived entity as "Not Found" or explicitly block modification.

## 14. Review Checklist

Before any PR or feature is considered code-complete, it must satisfy:

- [ ] Feature uses the canonical 6-folder structure.
- [ ] No infrastructure imports leak into Application or Presentation.
- [ ] IDs and Timestamps are generated in a Domain Factory, not React.
- [ ] Use Cases are isolated classes with a single `execute()` method.
- [ ] Search uses in-memory filtering, not DB querying.
- [ ] Form components emit DTOs, not Domain Entities.
- [ ] Repositories implement Soft Deletes (`status = 'archived'`).
- [ ] Smart components (Pages/Lists) isolate Hook usage from Dumb components (Cards/Forms).

## 15. Sprint Freeze Checklist

Before a module is marked completely finished (Sprint Freeze):

- [ ] All mandatory Use Cases (List, GetById, Create, Edit, Archive) are implemented.
- [ ] Empty, Loading, and Error UI states are implemented mirroring existing modules.
- [ ] Production build (`npm run build`) completes with zero errors.
- [ ] TypeScript (`tsc -b`) reports zero structural violations.
- [ ] React runtime functions cleanly without hook dependency warnings or unhandled rejections.
