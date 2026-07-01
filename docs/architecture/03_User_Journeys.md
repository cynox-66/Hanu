# Hanu

# User Journeys

Version: 1.0

Status: Draft

Owner: Dev Jaiswal

---

# Purpose

This document defines every major workflow a user performs inside Hanu.

Hanu is designed around user journeys rather than database entities.

The user should never think in terms of:

- Products
- Customers
- Inventory

Instead, they think in terms of work they need to complete.

Every screen, feature, and interaction must belong to one of these journeys.

---

# Design Philosophy

People do not wake up thinking:

"I need to manage my database."

They wake up thinking:

"I need to post today's arrivals."

"I need to pack two parcels."

"I need to check if someone paid."

Hanu should mirror these mental models.

---

# Journey 1

## Add New Product

Goal

A new product has arrived.

The owner wants to make it ready for selling as quickly as possible.

---

Trigger

New inventory purchased.

---

Flow

Open Hanu

↓

Tap "Add Product"

↓

Camera opens immediately

↓

Capture one or more photos

↓

Enter:

- Product Name
- Price
- Quantity
- Category

↓

Save Product

↓

Product becomes available immediately.

---

Expected Time

Under 30 seconds.

---

Pain Points Solved

No notebook.

No gallery confusion.

No repeated uploads.

---

Success

Product is ready to sell.

---

# Journey 2

## Share Product

Goal

Share today's arrivals on WhatsApp or Instagram.

---

Trigger

New product is available.

---

Flow

Open Product

↓

Tap Share

↓

Choose Platform

- WhatsApp
- Instagram
- Facebook

↓

Generated share card appears

↓

Share

Done.

---

Expected Time

Under 15 seconds.

---

Success

Product reaches customers.

---

# Journey 3

## Record Order

Goal

A customer wants to purchase a product.

---

Trigger

Customer confirms purchase.

---

Flow

Open Hanu

↓

New Order

↓

Select Customer

or

Create Customer

↓

Select Product

↓

Quantity

↓

Payment Method

↓

Address

↓

Save

↓

Inventory updates automatically.

---

Expected Time

Under 45 seconds.

---

Pain Points Solved

No notebook.

No forgotten orders.

No stock confusion.

---

Success

Order recorded.

---

# Journey 4

## Receive Payment

Goal

Mark customer payment.

---

Trigger

Customer sends payment.

---

Flow

Open Order

↓

Tap Payment

↓

Select

Paid

Pending

COD

↓

Save

---

Expected Time

Under 10 seconds.

---

Success

Payment status updated.

---

# Journey 5

## Prepare Shipment

Goal

Prepare an order for shipping.

---

Trigger

Customer has paid.

---

Flow

Open Today's Orders

↓

Select Order

↓

Pack Product

↓

Enter Tracking Number

↓

Select Courier

↓

Mark Ready

↓

Done.

---

Future

Courier APIs automate this process.

---

Expected Time

Under 30 seconds.

---

# Journey 6

## Deliver Order

Goal

Track completed orders.

---

Flow

Open Order

↓

Mark Delivered

↓

Inventory already updated

↓

Customer history updated

Done.

---

# Journey 7

## Find Product

Goal

Customer asks:

"Is the blue kurti available?"

---

Flow

Search

↓

Product appears

↓

Stock shown immediately

↓

Open

↓

Reply to customer

---

Expected Time

Under 5 seconds.

---

# Journey 8

## Find Customer

Goal

Customer messages again after months.

---

Flow

Search

↓

Phone Number

or

Name

↓

Customer Profile

↓

Purchase History

↓

Previous Orders

↓

Continue Conversation

---

Expected Time

Under 5 seconds.

---

# Journey 9

## Review Today's Work

Goal

Understand what remains today.

---

Trigger

Opening Hanu.

---

Dashboard Shows

Today's Orders

Pending Payments

Orders to Ship

Low Stock

Quick Actions

Nothing else.

---

Success

User instantly knows what needs attention.

---

# Journey 10

## End of Day

Goal

Ensure no work is forgotten.

---

Dashboard

↓

Pending Orders

↓

Pending Payments

↓

Shipments

↓

Low Stock

↓

Everything complete?

↓

Close App

---

# Error Journey

## Product Out Of Stock

Customer wants product.

↓

Search

↓

Out Of Stock

↓

Inform customer.

↓

Done.

---

# Error Journey

## Customer Cancels

Open Order

↓

Cancel

↓

Inventory Restored

↓

Done.

---

# Error Journey

## Wrong Payment Status

Open Order

↓

Edit

↓

Correct Status

↓

Save

---

# Error Journey

## Wrong Product Added

Open Product

↓

Edit

↓

Save

---

# Future Journey

## Exhibition Selling

Dashboard

↓

Start Exhibition

↓

Cash Sales

↓

UPI Sales

↓

Inventory Updates

↓

End Exhibition

---

Version 1

Not Included.

---

# Future Journey

## Courier Pickup

Order

↓

Generate Shipment

↓

Courier Pickup

↓

Tracking

↓

Customer Notification

---

Version 2

---

# Future Journey

## Customer Catalog

Customer opens shared link

↓

Views Product

↓

Clicks

Buy on WhatsApp

↓

Conversation starts

---

Version 3

---

# Journey Principles

Every journey should satisfy:

- Less than one minute
- Minimal typing
- Camera before keyboard
- Large buttons
- Clear progress
- No unnecessary forms

---

# UX Rules

Every common workflow should require:

Three taps or fewer whenever reasonably possible.

Every journey should eliminate one real-world task.

Every journey should reduce cognitive load.

---

# Final Principle

The user should never wonder:

"What should I do now?"

Hanu should always answer that question.
