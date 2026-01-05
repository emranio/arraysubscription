# Subscription Synchronization

## Overview
Synchronize all subscription renewal dates to specific days (e.g., 1st of month, every Monday) for easier billing management, cash flow prediction, and operational efficiency.

**WooCommerce Integration:** Synchronized renewals ensure all WooCommerce renewal orders are created on the same day, making batch processing, reporting, and fulfillment more efficient. Proration charges are handled through standard WooCommerce orders.

---

## User Stories

### As a Store Admin
- I want all subscription renewals to happen on the same day of the month
- I want to choose which day subscriptions synchronize to (1st, 15th, etc.)
- I want weekly subscriptions to sync to a specific day of the week
- I want to prorate the first payment when syncing to a future date
- I want to manage fulfillment by shipping all orders on the same day
- I want predictable cash flow from synchronized billing dates

### As a Customer
- I want to understand how synchronization affects my first payment
- I want to know my regular billing date going forward
- I want to see prorated amounts clearly at checkout

---

## Features

### Synchronization Options

#### Monthly Synchronization
- **Sync Day**: Choose day of month (1-28)
- **Common Options**: 1st, 15th, or custom day
- **End of Month**: Handle months with fewer days (28, 29, 30)

#### Weekly Synchronization
- **Sync Day**: Choose day of week (Monday-Sunday)
- **Consistent Billing**: Same day every week

#### Yearly Synchronization
- **Sync Date**: Choose month and day
- **Anniversary Option**: Use signup anniversary or fixed date

#### No Synchronization
- **Signup Anniversary**: Bill on anniversary of signup date

### Proration for Sync

When subscription is purchased mid-cycle:

#### Prorate First Period
- Calculate pro-rata amount from signup to first sync date
- Charge prorated amount immediately
- Full price charged on sync date thereafter

#### Full Price with Extended Period
- Charge full price immediately
- First renewal on sync date (extended first period)

#### Proration Examples

**Monthly sync to 1st, purchased on the 15th:**
- Option A: Charge 50% now, full price on 1st
- Option B: Charge full price, next payment on 1st (extended period)

> **Note:** For proration during upgrade, downgrade, or crossgrade, see [Upgrade, Downgrade & Crossgrade](upgrade-downgrade-crossgrade.md#proration-with-synchronization).

### Configuration Options
- **Per-Product Sync**: Set synchronization per subscription product
- **Global Sync**: Apply same sync day to all subscriptions
- **Proration Setting**: Choose proration method
- **Sync Display**: Show sync date to customer at checkout

### Synchronized Fulfillment
- **Delivery Day**: Ship all subscription orders on specific day
- **Cutoff Date**: Orders placed before cutoff ship in current cycle
- **Shipping Label Batching**: Generate all shipping labels at once

---

## Use Cases

### Use Case 1: SaaS Business
- All subscriptions renew on the 1st of each month
- Predictable MRR reporting
- Simplified accounting

### Use Case 2: Subscription Box
- All boxes ship on the 1st Monday of each month
- Orders cutoff on 25th of previous month
- Batch fulfillment and shipping

### Use Case 3: Membership Site
- Annual memberships sync to January 1st
- All renewals happen at same time
- Easy annual planning

---

## Sync Date Handling

### New Subscriptions
1. Customer purchases on any date
2. First payment calculated (prorated or full)
3. Next renewal date set to sync day
4. All future renewals on sync day

### Existing Subscriptions
- Option to migrate existing subscriptions to sync schedule
- Prorate next payment for the migration
- Or wait for natural alignment

---

## Acceptance Criteria

- [ ] Admin can set sync day for monthly subscriptions (1-28)
- [ ] Admin can set sync day for weekly subscriptions (day of week)
- [ ] Proration calculated correctly for partial first period
- [ ] Customer sees prorated amount at checkout
- [ ] Next renewal date correctly set to sync day
- [ ] All future renewals occur on sync day
- [ ] Per-product sync configuration available
- [ ] Global sync setting available
- [ ] Sync date displayed in subscription details
- [ ] Existing subscriptions can be migrated to sync schedule
