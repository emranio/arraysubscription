# Phase 1: Core Subscription Foundation

## 🎯 Goal
Build the **Minimum Viable Subscription Plugin** — a fully functional prototype that allows customers to purchase subscription products, process recurring payments, and manage their subscriptions.

---

## 📦 Features Included (10 features)

| # | Feature File | Priority | Description |
|---|--------------|----------|-------------|
| 1 | [general-features.md](general-features.md) | **Critical** | WooCommerce integration, HPOS, coupons, logging, security |
| 2 | [subscription-products.md](subscription-products.md) | **Critical** | Create subscription products with billing periods/intervals |
| 3 | [recurring-billing.md](recurring-billing.md) | **Critical** | Automatic renewal system, WooCommerce orders for renewals |
| 4 | [payment-gateways.md](payment-gateways.md) | **Critical** | Stripe integration (primary), manual payments fallback |
| 5 | [customer-my-account.md](customer-my-account.md) | **High** | My Account portal, subscription list, basic self-service |
| 6 | [subscription-management-admin.md](subscription-management-admin.md) | **High** | Admin subscription list, status management, basic actions |
| 7 | [email-notifications.md](email-notifications.md) | **High** | Core emails: new subscription, renewal, cancellation |
| 8 | [free-trials-signup-fees.md](free-trials-signup-fees.md) | **High** | Free trial periods, one-time signup fees |
| 9 | [manual-subscription-admin.md](manual-subscription-admin.md) | **High** | Admin creates subscriptions manually, product swaps |

---

## 🔧 Implementation Order

### Step 1: Data Model & Infrastructure
1. **Custom Post Type** for subscriptions (`shop_subscription`)
2. **Database schema** for subscription meta
3. **Subscription statuses**: pending, active, on-hold, cancelled, expired, trial
4. **WooCommerce hooks** integration
5. **HPOS compatibility** layer

### Step 2: Subscription Products
1. Product settings meta box (Enable Subscription checkbox)
2. Billing period selector (daily, weekly, monthly, yearly)
3. Billing interval (every X periods)
4. Subscription length (finite or unlimited)
5. Product page display (subscription terms)
6. Cart/checkout subscription info display

### Step 3: Checkout & Initial Order
1. Subscription creation on checkout
2. Link subscription to initial WooCommerce order
3. Store payment method token (Stripe)
4. Set next payment date based on billing cycle
5. Subscription activation on payment success

### Step 4: Recurring Billing Engine
1. Scheduled action for renewal processing (Action Scheduler)
2. Renewal order creation (WooCommerce order)
3. Automatic payment charging via stored token
4. Update subscription dates on successful renewal
5. Handle payment success/failure status updates

### Step 5: Payment Gateway (Stripe First)
1. Stripe Elements integration for checkout
2. Payment token storage (card fingerprint)
3. Charge saved card for renewals
4. Update payment method flow
5. SCA/3D Secure handling

### Step 6: Admin Interface
1. Subscriptions admin menu page
2. Subscription list table (WP_List_Table)
3. Single subscription edit/view page
4. Status change actions (activate, hold, cancel)
5. View related WooCommerce orders

### Step 7: Customer My Account
1. Register WooCommerce endpoint: `subscriptions`
2. Subscription list page template
3. Single subscription view template
4. Basic actions: view details, cancel
5. Update payment method page

### Step 8: Email System
1. Email class extending WooCommerce email
2. New subscription email (customer + admin)
3. Renewal payment received email
4. Subscription cancelled email
5. WooCommerce email settings integration

### Step 9: Free Trials & Signup Fees
1. Product meta: `_trial_length`, `_trial_period`, `_signup_fee`
2. Trial status for subscriptions (`wc-trial`)
3. No payment required option for trial start
4. Trial end date calculation & auto-conversion
5. Signup fee on initial order only

### Step 10: Manual Subscription Admin
1. "Add New Subscription" admin page
2. Customer/product selector with custom pricing
3. Payment options: charge now, skip, invoice, mark paid
4. Change product/variation of existing subscription

---

## ✅ Phase 1 Testing Checklist

### Product Setup Tests
- [ ] Can create simple subscription product
- [ ] Can create variable subscription product
- [ ] Billing period/interval saves correctly
- [ ] Subscription terms display on product page
- [ ] Subscription info shows in cart
- [ ] Subscription terms clear at checkout

### Purchase Flow Tests
- [ ] Customer can purchase subscription with Stripe
- [ ] Subscription record created with correct status
- [ ] Initial WooCommerce order created
- [ ] Payment token stored securely
- [ ] Next renewal date calculated correctly
- [ ] Confirmation email sent

### Renewal Tests
- [ ] Renewal triggers on scheduled date
- [ ] New WooCommerce order created for renewal
- [ ] Stored payment method charged automatically
- [ ] Next renewal date updated after success
- [ ] Subscription status changes on payment failure

### Admin Tests
- [ ] Subscription list shows all subscriptions
- [ ] Can filter by status
- [ ] Can view subscription details
- [ ] Can change subscription status manually
- [ ] Related orders visible on subscription page
- [ ] Can create subscription manually
- [ ] Can change subscription product

### Customer My Account Tests
- [ ] Subscriptions tab appears in My Account
- [ ] Customer sees their subscription list
- [ ] Can view individual subscription details
- [ ] Can cancel subscription
- [ ] Can update payment method

### Free Trial & Signup Fee Tests
- [ ] Can configure trial period per product
- [ ] Trial subscription has correct status
- [ ] Auto-conversion to paid on trial end
- [ ] Signup fee configurable per product
- [ ] Fee appears on initial order only

### Email Tests
- [ ] New subscription email sent to customer
- [ ] New subscription email sent to admin
- [ ] Renewal payment email sent
- [ ] Cancellation email sent
- [ ] Emails use WooCommerce styling

---

## 🏗️ Technical Foundation

### Custom Post Type
```php
// shop_subscription post type
// Statuses: wc-pending, wc-active, wc-on-hold, wc-cancelled, wc-expired, wc-trial
```

### Key Meta Fields
- `_billing_period` (day, week, month, year)
- `_billing_interval` (integer)
- `_start_date` (datetime)
- `_next_payment_date` (datetime)
- `_end_date` (datetime, nullable)
- `_payment_method` (gateway ID)
- `_payment_method_token` (encrypted)
- `_customer_id` (user ID)
- `_trial_length`, `_trial_period`
- `_signup_fee`

### Action Scheduler Jobs
- `arraysubscription_scheduled_renewal` - Process renewal payment
- `arraysubscription_subscription_status_check` - Status verification
- `arraysubscription_trial_ended` - Convert trial to paid

---

## 🚀 Deliverable

A working subscription plugin where:
1. Store owner creates a "Monthly Premium Plan" at $29/month with 14-day trial
2. Customer purchases and pays with Stripe (or starts free trial)
3. Subscription shows in customer's My Account
4. Trial converts to paid automatically
5. 30 days later, customer is charged automatically
6. New WooCommerce order appears for the renewal
7. Customer and admin receive emails
8. Admin can view/manage all subscriptions and create manual ones

---

## 📈 Success Metrics

- [ ] End-to-end subscription purchase works
- [ ] Automatic renewal processes without error
- [ ] Free trials convert correctly
- [ ] Manual subscription creation works
- [ ] Zero critical bugs in core flow
- [ ] All acceptance criteria from feature docs met
- [ ] Performance: <2s subscription list load with 100 subscriptions
