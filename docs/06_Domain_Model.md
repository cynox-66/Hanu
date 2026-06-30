# Hanu
# Domain Model

Version: 1.0

Status: Draft

Owner: Dev Jaiswal

---

# Purpose

This document defines the business domain of Hanu.

It identifies:

- Core entities
- Relationships
- Business rules
- Domain boundaries
- Future extensions

This document is independent of any database,
framework,
or programming language.

It describes the business itself.

---

# Domain Philosophy

Hanu models a business.

Not a database.

Entities exist because they represent real-world objects.

Never because SQL requires them.

---

# Domain Overview

```

Business

│

├── Products

├── Orders

├── Customers

├── Inventory

├── Shipping

└── Tasks

```

Everything else is built around these six domains.

---

# Domain 1

## Product

Represents something the business sells.

---

### Attributes

Product ID

Name

Description

Category

Images

Selling Price

Cost Price

Stock Quantity

Status

Notes

Created At

Updated At

---

### Behaviors

Create

Update

Archive

Delete

Share

Adjust Stock

Duplicate

---

### Rules

A Product must have:

- Name
- Price
- At least one image

Stock cannot be negative.

Archived products cannot be sold.

---

# Domain 2

## Inventory

Represents available stock.

Inventory is **not** a separate thing the user edits.

It is the current state of Products.

---

### Behaviors

Increase

Decrease

Restore

Check Availability

Detect Low Stock

---

### Rules

Inventory changes only through:

- New Stock
- Orders
- Manual Adjustment
- Cancellation

Never directly edit stock from multiple places.

---

# Domain 3

## Customer

Represents a buyer.

---

### Attributes

Customer ID

Name

Phone Number

Address

Notes

Preferred Payment

Purchase History

Last Order

---

### Behaviors

Create

Update

Search

View Orders

Contact

---

### Rules

Phone number should uniquely identify a customer whenever possible.

Deleting customers is discouraged.

Instead,

archive.

---

# Domain 4

## Order

Represents a customer purchase.

---

### Attributes

Order ID

Customer

Products

Quantity

Total Amount

Payment Status

Shipping Status

Notes

Created At

Updated At

---

### Behaviors

Create

Confirm

Cancel

Pack

Ship

Deliver

Refund

---

### Rules

An Order always belongs to one Customer.

An Order contains one or more Products.

Cancelling restores stock.

Shipping requires an address.

Delivered orders become immutable except for notes.

---

# Domain 5

## Shipping

Represents fulfillment.

---

### Attributes

Shipping ID

Courier

Tracking Number

Status

Notes

Pickup Date

Delivery Date

---

### Behaviors

Create Shipment

Assign Courier

Update Tracking

Mark Delivered

Mark Returned

---

### Rules

Shipping belongs to one Order.

Tracking number is optional until shipment exists.

---

# Domain 6

## Daily Tasks

Represents work the user needs to complete.

This is the heart of Hanu.

Everything eventually becomes a task.

---

### Examples

Pack Orders

Pending Payment

Low Stock

Share Products

Courier Pickup

---

### Behaviors

Generate

Complete

Dismiss

Prioritize

---

### Rules

Tasks are derived.

Users should rarely create tasks manually.

---

# Aggregate Relationships

```

Customer

│

└── Orders

│

└── Shipping

Product

│

└── Inventory

Dashboard

│

└── Daily Tasks

```

---

# Domain Events

These events happen inside the business.

---

Product Created

↓

Inventory Initialized

---

Order Created

↓

Inventory Reduced

↓

Task Generated

---

Payment Received

↓

Payment Status Updated

↓

Shipping Eligible

---

Shipment Created

↓

Tracking Available

---

Order Delivered

↓

Customer History Updated

---

Order Cancelled

↓

Inventory Restored

↓

Shipping Cancelled

---

# Business Rules

## Rule 1

A Product cannot be sold if stock is zero.

---

## Rule 2

Inventory updates automatically.

Never ask the user to update inventory twice.

---

## Rule 3

Deleting business history should be extremely rare.

Archive instead.

---

## Rule 4

Every Order must belong to exactly one Customer.

---

## Rule 5

Shipping cannot exist without an Order.

---

## Rule 6

Tasks are generated automatically.

The user should focus on completing work,

not creating reminders.

---

# Domain Boundaries

Version 1

Included

✓ Products

✓ Inventory

✓ Customers

✓ Orders

✓ Shipping

✓ Daily Tasks

---

Excluded

Vendor Management

Accounting

GST

Invoices

Website

Marketing

Analytics

Staff

Marketplace

AI

These are future bounded contexts.

---

# Future Domain Expansion

Version 2

Vendor

Courier Integration

Image Processing

Notifications

---

Version 3

Website

Catalog

CRM

Marketing

Automation

---

Version 4

Analytics

Insights

Forecasting

Multi-user

Warehouse

---

# Engineering Principles

Every feature belongs to exactly one domain.

Cross-domain interactions occur only through business events.

Avoid tightly coupling domains.

Keep business rules inside the domain,

not inside the UI.

---

# Final Principle

The UI may change.

The database may change.

The framework may change.

The domain should remain stable.

The business is the source of truth.