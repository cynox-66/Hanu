# Hanu

# Product Requirements Document (PRD)

Version: 1.0

Status: Draft

Owner: Dev Jaiswal

---

# Purpose

This document defines the complete scope of Hanu Version 1.

It serves as the single source of truth for:

- Product decisions
- Engineering
- UI/UX
- Architecture
- Development

If a feature is not described here,
it does not belong in Version 1.

---

# Product Summary

Hanu is a mobile-first business assistant designed specifically for home-based businesses.

Version 1 focuses on reducing operational workload rather than growing the business.

The product is designed around daily workflows instead of traditional business software concepts.

---

# Primary User

A single home-based entrepreneur who:

- Uses Android
- Has limited technical knowledge
- Runs the business alone
- Uses WhatsApp as the primary sales channel
- Needs software that "just works"

---

# Version 1 Objectives

Hanu should help the user:

✓ Add products quickly

✓ Organize inventory

✓ Track customer orders

✓ Track payments

✓ Prepare shipments

✓ Know what work needs to be completed today

---

# Success Criteria

Version 1 is considered successful when:

The user can perform all daily business tasks using Hanu without requiring notebooks or remembering information mentally.

---

# Product Scope

Version 1 includes six major modules.

1. Dashboard

2. Products

3. Orders

4. Inventory

5. Customers

6. Shipping

Everything else is intentionally postponed.

---

# Dashboard

Purpose:

Provide a calm overview of today's work.

The dashboard is not an analytics page.

It is a task page.

---

Dashboard contains:

Today's Tasks

Today's Orders

Pending Shipments

Pending Payments

Low Stock Alerts

Quick Actions

---

Quick Actions

- Add Product

- New Order

- Ship Order

- Share Product

---

Out of Scope

Revenue graphs

Monthly analytics

Sales charts

Business reports

---

# Products

Purpose

Create and organize products.

---

Required Features

Create Product

Edit Product

Archive Product

Delete Product

Duplicate Product

Product Search

Product Categories

Multiple Images

Product Status

---

Each Product Contains

ID

Name

Category

Images

Description

Selling Price

Cost Price (optional)

Quantity

Status

Notes

Created At

Updated At

---

Product Status

Available

Low Stock

Out of Stock

Archived

---

Version 1 Will NOT Support

Product Variants

Barcode

SKU Generation

GST

Bulk Import

Bulk Export

---

# Orders

Purpose

Track every customer order.

---

Required Features

Create Order

Update Status

Cancel Order

View Order

Search Orders

---

Each Order Contains

Order ID

Customer

Products

Quantity

Payment Method

Payment Status

Shipping Status

Address

Notes

Created At

---

Order Status

New

Confirmed

Packed

Ready To Ship

Shipped

Delivered

Cancelled

---

Payment Status

Pending

Paid

COD

Refunded

---

Shipping Status

Not Started

Pickup Scheduled

Shipped

Delivered

Returned

---

# Inventory

Purpose

Prevent overselling.

---

Required Features

Automatic Stock Reduction

Manual Adjustment

Low Stock Detection

Out of Stock Detection

Stock History

---

Inventory Rules

Selling products automatically reduces stock.

Cancelling an order restores stock.

Archived products do not appear in normal searches.

---

# Customers

Purpose

Keep customer information organized.

---

Each Customer Contains

Name

Phone Number

Address

Purchase History

Notes

Preferred Payment

Last Purchase Date

---

Required Features

Search

Order History

Quick WhatsApp Shortcut

Address Book

---

Version 1 Will NOT Include

Customer Login

Loyalty

Coupons

Membership

Points

---

# Shipping

Purpose

Prepare orders for dispatch.

---

Version 1

Shipping Preparation

Tracking Number

Courier Name

Pickup Status

Delivery Status

Shipping Notes

---

Future Versions

Courier API

Label Printing

Automatic Tracking

Pickup Scheduling

---

# Notifications

Version 1 supports only:

Low Stock

Pending Payments

Orders To Ship

No marketing notifications.

No spam.

---

# Search

Global Search

Search by

Customer

Phone

Product

Order ID

Category

---

# Settings

Only essential settings.

Business Name

Phone Number

Default Currency

Backup

Restore

Theme

Nothing more.

---

# Offline Behaviour

The application must remain functional without internet.

Supported offline:

Products

Orders

Customers

Inventory

Search

Dashboard

Synchronization occurs automatically.

---

# Performance Requirements

Cold Start

< 2 seconds

Navigation

Instant

Search

< 200 ms

Image Loading

Progressive

---

# Accessibility

Large touch targets

Readable fonts

High contrast

One-handed use

Minimal typing

Clear language

---

# Security

Local data encryption

Automatic backups

No unnecessary permissions

Minimal personal data collection

---

# Version 1 Exclusions

Not included:

Website

Marketplace

Accounting

GST

Invoices

Reports

Analytics

Multi-user

Staff Accounts

Vendor Management

CRM

AI Chatbot

Marketing Automation

Discount Engine

Coupons

Customer Portal

Payments Integration

Desktop Dashboard

---

# Version 1 Deliverables

Dashboard

Products

Orders

Inventory

Customers

Shipping Preparation

Offline Support

PWA Installation

---

# Future Versions

V2

Courier Integration

Image Enhancement

AI Assistance

Vendor Module

---

V3

Website

Customer Catalog

WhatsApp Automation

Payment Verification

---

V4

Business Insights

Multi-device Sync

Role Management

Inventory Intelligence

Advanced Reports

---

# Acceptance Criteria

Hanu Version 1 is complete when the user can:

✓ Create products

✓ Manage inventory

✓ Record orders

✓ Track customers

✓ Prepare shipments

✓ Use the application offline

✓ Complete an entire business day without needing notebooks

If these conditions are met,

Version 1 ships.
