# Refunds

## Overview
Provide administrators with comprehensive refund capabilities to handle full refunds, partial refunds, and prorated refunds for subscription payments through the admin panel.

**WooCommerce Integration:** Fully integrated with WooCommerce's native refund system. All refunds are processed through WooCommerce orders, appear in WooCommerce reports, and work seamlessly with payment gateways and third-party plugins.

---

## User Stories

### As a Store Admin
- I want to issue a full refund for a subscription payment
- I want to issue a partial refund for a subscription payment
- I want to refund specific line items from a subscription order
- I want to choose whether to refund to the original payment method or store credit
- I want to decide if the subscription should remain active, be cancelled, or be paused after a refund
- I want to see refund history for each subscription
- I want to refund signup fees separately from subscription payments
- I want to issue prorated refunds when customers cancel mid-cycle
- I want refunds to be processed through the original payment gateway

### As a Customer
- I want to receive confirmation when a refund is processed
- I want to see refund details in my account
- I want to understand how a refund affects my subscription status

---

## Features

### Refund Types

#### Full Refund
- Refund entire payment amount
- Option to cancel subscription after refund
- Option to keep subscription active (goodwill gesture)
- Refund processed through original payment gateway

#### Partial Refund
- Refund specific amount (less than full payment)
- Specify refund reason
- Subscription remains active by default
- Track partial refund against original order

#### Prorated Refund
- Calculate refund based on unused subscription time
- Automatic calculation of days/value remaining
- Used when customer cancels mid-billing cycle
- Option to round up/down or exact calculation

#### Line Item Refund
- Refund specific items in subscription order
- Refund signup fee only
- Refund shipping only
- Refund product only (keep signup fee)

### Refund Processing

#### Payment Gateway Refunds
- Process refund through Stripe
- Process refund through PayPal
- Process refund through Paddle
- Process refund through FastSpring
- Manual refund notation for offline payments

#### Store Credit Refunds
- Issue refund as store credit instead of payment reversal
- Store credit applied to future orders
- Works with WooCommerce wallet/credit plugins

### Refund Configuration

#### Refund Policies
- Set maximum refund window (e.g., 30 days)
- Define refund eligibility rules
- Configure automatic vs manual refund approval
- Set partial refund limits

#### Subscription Status After Refund
- **Cancel Subscription**: End subscription immediately
- **Keep Active**: Subscription continues (goodwill)
- **Pause Subscription**: Put on hold pending resolution
- **Downgrade**: Move to lower tier as alternative to refund

### Admin Refund Interface

#### Refund from Order Page
- Access refund option from WooCommerce order
- See original payment details
- Enter refund amount (full or partial)
- Select refund method (gateway or store credit)
- Add refund reason/notes

#### Refund from Subscription Page
- Quick refund access from subscription detail
- See all related orders eligible for refund
- Bulk refund multiple payments if needed

### Refund Tracking

#### Refund History
- View all refunds per subscription
- See refund date, amount, method, and reason
- Track who processed the refund (admin user)
- Link refunds to original orders

#### Reporting
- Total refunds in period
- Refund rate metrics
- Refund reasons breakdown
- Impact on MRR/ARR

---

## Refund Calculation Examples

### Example 1: Full Refund
- Original payment: $50
- Refund amount: $50
- Action: Cancel subscription

### Example 2: Partial Refund
- Original payment: $50
- Refund amount: $20
- Reason: Service issue compensation
- Action: Keep subscription active

### Example 3: Prorated Refund (Cancel Mid-Cycle)
- Monthly subscription: $30/month
- Cancelled on day 10 of 30-day cycle
- Days unused: 20
- Prorated refund: $30 × (20/30) = $20

### Example 4: Signup Fee Refund Only
- Order total: $70 ($50 subscription + $20 signup fee)
- Refund: $20 (signup fee only)
- Subscription continues at $50/renewal

---

## WooCommerce Integration

- Refunds appear in WooCommerce order refunds
- Refund amounts tracked in WooCommerce reports
- Compatible with WooCommerce refund notifications
- Works with accounting/bookkeeping integrations

---

## Acceptance Criteria

- [ ] Admin can issue full refund from order page
- [ ] Admin can issue partial refund with custom amount
- [ ] Prorated refund calculation available
- [ ] Refund can be processed through payment gateway
- [ ] Refund can be issued as store credit
- [ ] Admin can choose subscription status after refund
- [ ] Refund history visible on subscription detail
- [ ] Customer receives refund confirmation email
- [ ] Refunds appear in WooCommerce order refunds
- [ ] Refund reporting available
- [ ] Refund reason/notes can be recorded
