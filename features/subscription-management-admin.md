# Subscription Management (Admin)

## Overview
Comprehensive admin tools for managing all subscriptions, viewing subscription details, handling manual actions, and maintaining full control over subscriber lifecycle.

---

## User Stories

### As a Store Admin
- I want to view all subscriptions in a dedicated admin page with filtering options
- I want to see subscription status at a glance (active, on-hold, cancelled, expired, pending)
- I want to click on any subscription to see complete details and related orders
- I want to change subscription status manually when needed
- I want to cancel subscriptions on behalf of customers
- I want to pause/suspend subscriptions temporarily
- I want to reactivate on-hold or cancelled subscriptions
- I want to see all invoices/orders related to a specific subscription
- I want to add notes to subscriptions for internal tracking
- I want to export subscription data to CSV for analysis

> **See Also:**
> - [Manual Subscription Administration](manual-subscription-admin.md) - Creating subscriptions manually, changing products/variations
> - [Refunds](refunds.md) - Full, partial, and prorated refunds

### As a Store Manager
- I want to search subscriptions by customer name, email, or subscription ID
- I want to filter subscriptions by status, product, or date range
- I want to bulk update subscription statuses
- I want to view subscription activity logs

---

## Features

### Dedicated Subscription Admin Page
- **Subscription List Table**: View all subscriptions with key information
  - Subscription ID
  - Customer name/email
  - Product/Plan name
  - Status (Active, On-Hold, Cancelled, Expired, Pending, Trial)
  - Next payment date
  - Subscription total
  - Start date
- **Search & Filter**: Find subscriptions by various criteria
- **Bulk Actions**: Perform actions on multiple subscriptions at once
- **Quick Actions**: One-click status changes from list view

### Subscription Detail View
- **Overview Section**: All subscription details at a glance
- **Related Orders**: List of all WooCommerce orders (initial + renewals)
- **Payment History**: Track all successful and failed payments
- **Customer Information**: Billing and shipping details
- **Activity Log**: Timeline of all subscription events
- **Admin Notes**: Internal notes for customer service

### Manual Subscription Management

> For detailed manual subscription features, see [Manual Subscription Administration](manual-subscription-admin.md).

- **Quick Edit**: Modify basic subscription details (renewal date, amount)
- **Status Management**:
  - Activate pending subscriptions
  - Put subscriptions on hold
  - Cancel subscriptions
  - Reactivate cancelled/on-hold subscriptions
  - Mark as expired

### Refunds

> For detailed refund features, see [Refunds](refunds.md).

- Quick access to refund from subscription detail page
- View refund history per subscription

### Subscription Statuses
- **Pending**: Awaiting initial payment
- **Active**: Currently active and billing
- **On-Hold**: Temporarily paused (manual or payment failure)
- **Cancelled**: Terminated by admin or customer
- **Expired**: Reached end of subscription term
- **Trial**: Currently in free trial period
- **Pending Cancellation**: Marked for cancellation at period end

### Data Export
- Export subscriptions to CSV with all details
- Filter exports by date range, status, product
- Include related order data in exports

---

## Acceptance Criteria

- [ ] Dedicated subscription management page in WP Admin
- [ ] All subscriptions listed with status, customer, and key dates
- [ ] Click-through to detailed subscription view
- [ ] All related WooCommerce orders visible in subscription detail
- [ ] Admin can change subscription status (activate, hold, cancel)
- [ ] Reactivate on-hold subscriptions
- [ ] Search and filter functionality working
- [ ] CSV export of subscription data available
- [ ] Activity log tracks all subscription changes

> **Additional Acceptance Criteria:**
> - Manual subscription creation: See [Manual Subscription Administration](manual-subscription-admin.md)
> - Refund processing: See [Refunds](refunds.md)
