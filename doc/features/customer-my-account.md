# Customer My Account Portal

## Overview
A dedicated subscription management area within the WooCommerce My Account page where customers can view, manage, and control all aspects of their subscriptions.

---

## User Stories

### As a Customer
- I want to see all my active subscriptions in one place
- I want to view detailed information about each subscription
- I want to see my complete payment history for each subscription
- I want to see when my next payment is due and how much
- I want to cancel my subscription if I no longer need it
- I want to pause my subscription temporarily
- I want to reactivate a paused or cancelled subscription
- I want to update my payment method
- I want to change my billing/shipping address for subscriptions
- I want to upgrade or downgrade my subscription plan
- I want to renew my subscription early if I choose
- I want to download invoices for my subscription payments

---

## Features

### Subscriptions Tab in My Account
New "Subscriptions" tab in WooCommerce My Account showing:
- List of all subscriptions (active, on-hold, cancelled, expired)
- Quick status overview
- Key details for each subscription at a glance

### Subscription List View
Display for each subscription:
- Subscription ID
- Product/Plan name
- Status badge (Active, On-Hold, Cancelled, Trial, Expired)
- Next payment date and amount
- Quick action buttons (View, Cancel, Pause)

### Subscription Detail View
Clicking a subscription shows:

#### Overview Section
- Subscription status
- Product details
- Start date
- Next renewal date
- Subscription end date (if applicable)
- Current billing cycle
- Subscription amount

#### Related Orders
- List of all orders related to this subscription
- Order date, total, and status
- Link to order details
- Download invoice links

#### Payment Information
- Current payment method (last 4 digits)
- Payment history timeline
- Update payment method button

#### Address Information
- Billing address
- Shipping address (for physical products)
- Edit address options

### Customer Self-Service Actions

#### Subscription Control
- **Cancel Subscription**: Request cancellation (immediate or at period end)
- **Pause Subscription**: Temporarily pause (if enabled by admin)
- **Resume Subscription**: Reactivate paused subscription
- **Resubscribe**: Restart cancelled/expired subscription

#### Plan Management
- **View Plan Options**: See available upgrade/downgrade options
- **Switch Plan**: Change to different subscription tier
- **View Change Preview**: See price difference before confirming

#### Payment Management
- **Update Payment Method**: Change saved card/payment method
- **Renew Now**: Process early renewal
- **Pay Failed Invoice**: Retry failed payment manually

#### Address Management
- **Edit Billing Address**: Update billing details
- **Edit Shipping Address**: Update delivery address
- **Apply to All**: Update address for all subscriptions

### Subscription Table Display Options
- Table view with sortable columns
- Status filter (All, Active, On-Hold, Cancelled)
- Pagination for many subscriptions
- Mobile-responsive design

---

## My Account Integration

### Tab Placement
- New "Subscriptions" tab in WooCommerce My Account menu
- Positioned prominently (after Orders or Dashboard)

### Shortcode Support
- `[subscription_table]` - Display subscription list anywhere
- `[subscription_details id="X"]` - Show specific subscription

### Block Support
- Subscription List block for Gutenberg
- Subscription Details block

---

## Acceptance Criteria

- [ ] "Subscriptions" tab appears in WooCommerce My Account
- [ ] All customer subscriptions listed with status
- [ ] Click-through to detailed subscription view
- [ ] All related orders displayed in subscription detail
- [ ] Customer can cancel subscription
- [ ] Customer can pause/resume subscription (if enabled)
- [ ] Customer can update payment method
- [ ] Customer can edit billing/shipping address
- [ ] Customer can upgrade/downgrade plan
- [ ] Early renewal option available
- [ ] Invoice download available for all related orders
- [ ] Mobile-responsive design
- [ ] Shortcode available for subscription table
