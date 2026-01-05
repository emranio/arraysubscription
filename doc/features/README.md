# Array Subscription - Feature Documentation

## Overview
Array Subscription is a WooCommerce subscription management plugin that handles subscriptions and donations. **WooCommerce is a required dependency** - all invoices (including recurring) are generated through WooCommerce's ordering and invoice system using the standard add-to-cart and checkout flow.

---

## Core Features

| Feature | Description |
|---------|-------------|
| [Subscription Products](subscription-products.md) | Create and manage subscription-based WooCommerce products |
| [Recurring Billing](recurring-billing.md) | Automated recurring payment processing through WooCommerce orders |
| [Free Trials & Signup Fees](free-trials-signup-fees.md) | Offer trial periods and charge one-time signup fees |
| [Payment Gateways](payment-gateways.md) | Stripe, PayPal, Paddle, FastSpring integration for automatic payments |

---

## Management Features

| Feature | Description |
|---------|-------------|
| [Admin Subscription Management](subscription-management-admin.md) | Dedicated admin page for managing all subscriptions |
| [Manual Subscription Administration](manual-subscription-admin.md) | Create subscriptions manually, change products/variations |
| [Subscription Import & Migration](subscription-import-migration.md) | Migrate from WooCommerce Subscriptions, CSV import |
| [Refunds](refunds.md) | Full, partial, and prorated refunds from admin panel |
| [Cancellation Reasons & Retention Offers](cancellation-reasons-retention-offers.md) | Collect cancel reasons and offer pause/downgrade/coupons |
| [Customer My Account](customer-my-account.md) | Self-service portal for customers to manage subscriptions |
| [Reports & Analytics](reports-analytics.md) | Subscription-specific reports in WooCommerce Analytics |

---

## Advanced Features

| Feature | Description |
|---------|-------------|
| [Split Payment / Cost Sharing](split-payment.md) | Split subscription costs between multiple people |
| [Subscription Bundle](subscription-bundle.md) | Customizable bundles, cart bundling, one-click checkout |
| [Upgrade, Downgrade & Crossgrade](upgrade-downgrade-crossgrade.md) | Plan switching with proration |
| [Payment Synchronization](subscription-synchronization.md) | Sync all renewals to specific days |
| [Skip Next Renewal / Vacation Mode](skip-next-renewal-vacation-mode.md) | Skip one billing cycle without cancelling |
| [Gifting & Transfer Subscription](gifting-transfer-subscription.md) | Gift subscriptions and transfer ownership |

---

## Payment & Communication

| Feature | Description |
|---------|-------------|
| [Payment Retry & Recovery](payment-retry-recovery.md) | Automatic failed payment handling and dunning |
| [Email Notifications](email-notifications.md) | Automated customer and admin notifications |

---

## Supporting Features

| Feature | Description |
|---------|-------------|
| [Restrict Access](restrict-access.md) | Gate URLs, content, CPT/taxonomies, and assign roles based on subscription status |
| [General Features](general-features.md) | Pause/resume, shipping, API, logging, and more |

---

## Key Design Principles

### WooCommerce-First Approach
- All orders (initial and renewal) are standard WooCommerce orders
- Uses WooCommerce cart and checkout system
- WooCommerce discounts, taxes, and shipping apply to subscriptions
- Third-party WooCommerce plugins work with subscription orders

### Reporting Integration
- Custom filters in WooCommerce Analytics to filter by order type:
  - Initial subscription orders
  - Renewal orders  
  - Failed renewal orders
- Dedicated subscription reports in WooCommerce reporting section

### Subscription Admin Page
- Dedicated subscription list page showing all active subscriptions as table
- Click-through to detailed subscription view
- All related invoices/orders visible per subscription
- Fancy subscription-specific reports in WooCommerce Analytics

### Payment Gateway Support
- **Automatic Payment**: Stripe, PayPal, Paddle, FastSpring
- **Manual Payment**: Any WooCommerce payment gateway
