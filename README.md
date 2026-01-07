# Array Subscription - Feature Documentation

## Overview
Array Subscription is a WooCommerce subscription management plugin that handles subscriptions and donations. **WooCommerce is a required dependency** - all invoices (including recurring) are generated through WooCommerce's ordering and invoice system using the standard add-to-cart and checkout flow.

---

## 📋 Development Phases

Features are organized into **4 progressive phases**, each delivering a fully functional and testable prototype.

📁 **[View Complete Phases Overview](features/PHASES-OVERVIEW.md)**

| Phase | Focus | Features | Description |
|-------|-------|----------|-------------|
| [**Phase 1**](features/phase1/README.md) | Core Foundation | 10 | MVP with subscriptions, billing, trials, admin |
| [**Phase 2**](features/phase2/README.md) | Lifecycle & Retention | 7 | Dunning, cancellation, upgrades, refunds |
| [**Phase 3**](features/phase3/README.md) | Advanced & Content | 6 | Bundles, installments, gifting, content gating |
| [**Phase 4**](features/phase4/README.md) | Analytics & Premium | 4 | Reports, migration, donations, entitlements |

---

## Phase 1: Core Foundation (10 features)

| Feature | Description |
|---------|-------------|
| [General Features](features/phase1/general-features.md) | WooCommerce integration, HPOS, coupons, logging |
| [Subscription Products](features/phase1/subscription-products.md) | Create subscription-based WooCommerce products |
| [Recurring Billing](features/phase1/recurring-billing.md) | Automated recurring payment processing |
| [Payment Gateways](features/phase1/payment-gateways.md) | Stripe, PayPal, Paddle, FastSpring integration |
| [Customer My Account](features/phase1/customer-my-account.md) | Self-service portal for customers |
| [Subscription Management (Admin)](features/phase1/subscription-management-admin.md) | Dedicated admin page for managing subscriptions |
| [Email Notifications](features/phase1/email-notifications.md) | Automated customer and admin notifications |
| [Free Trials & Signup Fees](features/phase1/free-trials-signup-fees.md) | Trial periods and one-time signup fees |
| [Manual Subscription Admin](features/phase1/manual-subscription-admin.md) | Create subscriptions manually, product swaps |

---

## Phase 2: Lifecycle & Retention (7 features)

| Feature | Description |
|---------|-------------|
| [Payment Retry & Recovery](features/phase2/payment-retry-recovery.md) | Failed payment handling and dunning |
| [Cancellation & Retention](features/phase2/cancellation-reasons-retention-offers.md) | Collect reasons, offer retention deals |
| [Skip / Vacation Mode](features/phase2/skip-next-renewal-vacation-mode.md) | Skip billing cycle, pause/resume |
| [Upgrades & Downgrades](features/phase2/upgrade-downgrade-crossgrade.md) | Plan switching with proration |
| [Refunds](features/phase2/refunds.md) | Full, partial, and prorated refunds |
| [Synchronization](features/phase2/subscription-synchronization.md) | Sync renewals to specific days |
| [Multi-Currency](features/phase2/multi-currency.md) | Multi-currency support for global stores |

---

## Phase 3: Advanced & Content (6 features)

| Feature | Description |
|---------|-------------|
| [Restrict Access](features/phase3/restrict-access.md) | Content gating, role assignment, downloads |
| [Subscription Shipping](features/phase3/shipping-subscriptions.md) | One-time vs recurring shipping fees |
| [Subscription Bundle](features/phase3/subscription-bundle.md) | Customizable bundles, build-your-own boxes |
| [Installment Payments](features/phase3/installments.md) | Buy now, pay later in installments |
| [Gifting & Transfer](features/phase3/gifting-transfer-subscription.md) | Gift subscriptions, transfer ownership |
| [Split Payment](features/phase3/split-payment.md) | Split costs between multiple people |

---

## Phase 4: Analytics & Premium (4 features)

| Feature | Description |
|---------|-------------|
| [Reports & Analytics](features/phase4/reports-analytics.md) | MRR/ARR, churn in WooCommerce Analytics |
| [Import & Migration](features/phase4/subscription-import-migration.md) | WooCommerce Subscriptions migration, CSV import |
| [Donations](features/phase4/donations.md) | One-time and recurring donations |
| [Feature Manager](features/phase4/feature-manager.md) | Product entitlements display |

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
