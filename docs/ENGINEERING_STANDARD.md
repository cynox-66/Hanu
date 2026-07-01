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

- **Archive instead of Delete.** True data deletion is strictly forbidden to prevent accidental data loss. The `delete()` method has been structurally removed from all Repositories.
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

## 16. Historical Snapshots

Orders record point-in-time snapshots of related entities at the moment of creation. These snapshots are **immutable** after the Order is saved.

### Snapshotted Fields

| Field          | Source Entity | Purpose                                        |
| -------------- | ------------- | ---------------------------------------------- |
| `customerName` | Customer      | Preserves the customer's name at time of order |
| `productName`  | Product       | Preserves the product's name at time of order  |
| `unitPrice`    | Product       | Preserves the selling price at time of order   |

### Rules

- **Snapshots are captured once during creation** via the `CreateOrderDTO` and `OrderItem` value objects.
- **Snapshots are never updated**, even if the source entity (Customer or Product) changes after the order is created.
- **The `updateOrder` Domain function explicitly preserves** `customerId`, `customerName`, `items`, and `totalAmount` from the existing Order, ignoring any values in the `UpdateOrderDTO` for those fields.
- **The Edit Order UI enforces read-only rendering** of customer, items, prices, and totals. Only `status` and `notes` are editable.
- **Historical correctness is a business invariant**, not a UI preference. Future modules (e.g., Invoices, Reports) depend on this guarantee.

### Why This Matters

If an Order referenced live Product prices or Customer names, then viewing a historical order would show **current** data instead of **what was actually sold**. This makes accounting unreliable and auditing impossible.

## 17. Transaction Builder Pattern

Orders are **not** standard CRUD entities. They are assembled as transactions through a multi-step workflow:

```
Select Customer → Add Products → Adjust Quantities → Review Total → Create Order
```

### Rules

- The **Order Builder** (`OrderBuilder.tsx`) owns local React state for the in-progress transaction.
- Products are added from the active catalog. When the same product is added again, the existing row's quantity is incremented — never duplicated.
- The **live total** is computed via `useMemo()` inside the Builder. It is never stored in state, never calculated in JSX, and never passed to the Domain.
- The final `CreateOrderDTO` is assembled from local state and passed to `useCreateOrder()`. The Domain Factory is solely responsible for generating `id`, `createdAt`, `updatedAt`, and `totalAmount`.
- **Presentation never generates Domain values.** The Builder constructs a DTO; the Factory constructs the Entity.

### Future Considerations

Later sprints may introduce inventory deduction, discounts, taxes, or payment tracking. These belong in the Application or Domain layers — never in the Builder UI. The Transaction Builder pattern intentionally separates assembly (UI) from processing (Domain).

## 18. Domain Ownership

The Domain layer is the single owner of entity lifecycle invariants.

### What the Domain Owns

| Invariant        | Owner                          |
| ---------------- | ------------------------------ |
| `id`             | `createXFromDTO()` Factory     |
| `createdAt`      | `createXFromDTO()` Factory     |
| `updatedAt`      | `updateX()` Factory            |
| `totalAmount`    | `createOrderFromDTO()` Factory |
| Immutable fields | `updateX()` Factory            |

### What React & Application Layer Must Never Do

- Generate UUIDs
- Generate timestamps
- Calculate `totalAmount`
- Mutate entities directly
- Bypass the Domain Factory

### Enforcement

This is enforced structurally: the `CreateXDTO` type explicitly omits `id`, `createdAt`, and `updatedAt`. TypeScript prevents the Presentation layer from even passing these values. The Domain Factory enforces them before passing the assembled entity to the repository.

## 19. Search Standard

All search functionality in Hanu follows a strict in-memory, offline-first pattern.

### Properties

- **Pure:** The `SearchOrders` use case is a stateless class with a synchronous `execute()` method.
- **Stateless:** It does not store queries or results. It receives an array and a query string, and returns a filtered array.
- **Memoized:** The React hook (`useOrderSearch`) wraps the use case in `useMemo()`, recomputing only when the source array or query string changes.
- **In-memory:** Filtering operates on the already-fetched entity array. No IndexedDB queries are issued per keystroke.
- **No repository dependency:** `SearchOrders` is instantiated directly inside the hook — it is not part of the DI/Context system because it has no infrastructure dependency.

### Why Not Query IndexedDB?

- IndexedDB queries are asynchronous and introduce latency on every keystroke.
- Offline-first means the data is already loaded into memory.
- In-memory filtering is instant and deterministic.
- This pattern guarantees consistent search performance regardless of connectivity.

## 20. Error Boundaries

The application uses a single, root-level `<AppErrorBoundary>` to catch unhandled render errors and prevent the entire application from unmounting into a white screen.

### Rules

- **No external libraries:** Error boundaries are implemented using raw React classes.
- **No business logic:** The error boundary only provides a recovery UI (retry/return to dashboard). It does not log to external services or attempt to fix state.
- **Global scope:** Placed outside the context providers in `main.tsx` to catch errors inside the providers as well as the routing tree.

## 21. Inventory Architecture

The Inventory module follows an immutable ledger pattern, rejecting the standard CRUD approach for stock management.

### Immutable Ledger (Source of Truth)

- Every stock change (in, out, adjustment) is recorded as an immutable `StockMovement`.
- `StockMovement` records never change and are never deleted.
- They snapshot the `productName` for historical accuracy.
- The repository exposes exactly ONE write operation: `recordMovement()`.

### Disposable Projections (Materialized Views)

- `InventorySummary` represents the current stock state.
- It is a **disposable projection**. It can always be rebuilt from the `StockMovement` ledger.
- The Application layer never saves `InventorySummary` directly. The Infrastructure layer (Dexie transaction) automatically computes and saves the delta to the summary within the same atomic transaction as `recordMovement()`.

### Valuation Strategy

- **Weighted Average Cost (WAC)** is the architectural standard for inventory valuation.
- When new stock arrives with a cost, the `totalCostValue` is increased.
- While full WAC deduction on outbound stock is documented as the target, the current simplified implementation tracks total inbound cost value.

### Available Stock vs Current Stock

- `currentStock`: The absolute physical count of items in the warehouse.
- `availableStock`: The count of items available for sale (`currentStock` minus reserved/pending orders).
- In Sprint 1, `availableStock` equals `currentStock`. Future order integrations will deduct from `availableStock` at checkout and `currentStock` upon fulfillment.

## 22. UI PRINCIPLE — Invisible Complexity

Hanu may implement sophisticated architecture internally, but the user interface must expose only the minimum concepts necessary to complete a task.

Engineering complexity belongs behind the interface.

Users interact with business concepts, never technical concepts.

Examples:

✓ Add Stock
✓ New Sale
✓ Customer
✓ Product
✓ Reports

Never expose:

✗ Stock Movement
✗ Ledger
✗ Aggregate
✗ Projection
✗ Synchronization
✗ Transaction
✗ Inventory Summary
✗ Domain
