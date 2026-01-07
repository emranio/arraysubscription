# Customer My Account Portal

## Overview
This plugin extends WooCommerce's native My Account customer panel by adding dedicated subscription management pages. Customers access their subscriptions through additional tabs/pages within the existing WooCommerce My Account area—no separate login or interface required.



**Implementation:** New pages and tabs are injected into WooCommerce's standard customer account dashboard, maintaining consistent branding and user experience with the rest of WooCommerce.

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
- I want to upgrade or downgrade or cross-grade my subscription plan
- I want to renew my subscription early if I choose
- I want to download invoices for my subscription payments

---

## Features

### Additional Pages Added to WooCommerce My Account

The plugin injects the following new pages into the existing WooCommerce My Account customer panel:

#### 1. Subscriptions List Page (`/my-account/subscriptions`)
New tab appears in the WooCommerce My Account navigation menu:
- Located alongside existing tabs (Dashboard, Orders, Downloads, Addresses, etc.)
- Lists all customer subscriptions with status and quick details
- Seamlessly integrated with WooCommerce's native styling and layout

#### 2. Subscription Detail Page (`/my-account/view-subscription/{id}`)
Individual subscription management page:
- Accessed by clicking a subscription from the list
- Shows complete subscription details and history
- Provides subscription-specific actions (cancel, pause, edit, etc.)

#### 3. Edit Subscription Payment Method Page (`/my-account/subscription/{id}/payment-method`)
Dedicated page for updating payment information:
- Accessed from subscription detail page
- Uses WooCommerce's payment method update flow
- Updates saved payment method for future renewals

### Subscriptions Tab in My Account Navigation
New "Subscriptions" tab added to WooCommerce My Account menu:
- Appears in the left sidebar or top navigation (theme-dependent)
- Position configurable: after Orders, after Dashboard, or custom placement
- Badge showing active subscription count (optional)
- Uses WooCommerce's native menu system

### Subscription List Page
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

## WooCommerce My Account Integration

### How Pages Are Added
- **Uses WooCommerce Endpoints**: Pages created using WooCommerce's native endpoint system
- **Automatic URL Generation**: URLs follow WooCommerce patterns (`/my-account/subscriptions`, `/my-account/view-subscription/123`)
- **Theme Compatible**: Works with any WooCommerce-compatible theme
- **Native Styling**: Inherits theme's WooCommerce My Account styles automatically
- **No Separate Login**: Customers access subscriptions through their existing WooCommerce account

### Menu Integration
- "Subscriptions" tab added to existing WooCommerce My Account navigation
- Menu order configurable in settings
- Appears alongside: Dashboard, Orders, Downloads, Addresses, Account details, etc.
- Uses WooCommerce's `woocommerce_account_menu_items` filter

### Endpoint Registration
The plugin registers these WooCommerce endpoints:
- `subscriptions` → Subscription list page
- `view-subscription` → Individual subscription detail
- `subscription-payment-method` → Update payment method

> **Technical Note:** These are standard WooCommerce endpoints, not custom post types or separate pages. They automatically inherit theme styling and work with WooCommerce's permalink structure.

### Shortcode Support
- `[subscription_table]` - Display subscription list anywhere
- `[subscription_details id="X"]` - Show specific subscription

### Block Support
- Subscription List block for Gutenberg
- Subscription Details block

---

## Acceptance Criteria

- [ ] "Subscriptions" tab appears in WooCommerce My Account navigation menu
- [ ] Subscription list page accessible at `/my-account/subscriptions`
- [ ] Individual subscription detail page accessible at `/my-account/view-subscription/{id}`
- [ ] Payment method update page accessible at `/my-account/subscription/{id}/payment-method`
- [ ] All pages use WooCommerce's native endpoint system
- [ ] Pages inherit theme's WooCommerce My Account styling
- [ ] All customer subscriptions listed with status
- [ ] Click-through to detailed subscription view
- [ ] All related orders displayed in subscription detail
- [ ] Customer can cancel subscription
- [ ] Customer can pause/resume subscription (if enabled)
- [ ] Customer can update payment method
- [ ] Customer can edit billing/shipping address
- [ ] Customer can upgrade/downgrade/crossgrade plan
- [ ] Early renewal option available
- [ ] Invoice download available for all related orders
- [ ] Mobile-responsive design
- [ ] Shortcode available for subscription table
- [ ] Works with popular WooCommerce themes (Storefront, Astra, etc.)
