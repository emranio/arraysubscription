# Subscription Upgrades, Downgrades & Crossgrades

## Overview
Allow customers to switch between subscription plans—upgrading to higher tiers, downgrading to lower tiers, or crossgrading to different plans at similar price points—while maintaining subscription continuity.

**WooCommerce Integration:** Plan changes create new WooCommerce orders for proration charges or credits. All billing adjustments flow through WooCommerce's standard order system, ensuring proper accounting and reporting.

### Switching Types
- **Upgrade**: Switch to a higher-priced plan with more features/products
- **Downgrade**: Switch to a lower-priced plan with fewer features/products
- **Crossgrade**: Switch to a different plan at the same or similar price point (e.g., switching from "Basic Monthly" to "Basic Annual", or from "Plan A" to "Plan B" at the same tier)

---

## User Stories

### As a Store Admin
- I want to define upgrade, downgrade, and crossgrade paths between subscription plans
- I want to control whether customers can self-service plan changes
- I want to choose how pricing adjustments are handled (prorated, immediate, next renewal)
- I want to see when customers upgrade, downgrade, or crossgrade their plans
- I want to configure which plans allow switching
- I want to allow crossgrades between different product types at similar price points
- I want to define crossgrade relationships (e.g., monthly ↔ annual, Plan A ↔ Plan B)

### As a Customer
- I want to upgrade my subscription to get more features/products
- I want to downgrade my subscription if I need fewer features
- I want to crossgrade to a different plan that better suits my needs (same price tier)
- I want to switch from monthly to annual billing (or vice versa)
- I want to see the price difference before confirming a change
- I want to understand when my new plan takes effect
- I want my subscription continuity maintained during plan changes
- I want to keep my subscription history when switching plans

---

## Features

### Plan Switching Configuration
- **Upgrade Paths**: Define which plans can upgrade to which (higher tier)
- **Downgrade Paths**: Define allowed downgrade options (lower tier)
- **Crossgrade Paths**: Define lateral switches between plans at similar price points
- **Same Product Variations**: Switch between variations of same product
- **Cross-Product Switching**: Allow switching to entirely different subscription products
- **Billing Cycle Switch**: Allow monthly ↔ annual crossgrades
- **Restrict Switching**: Option to disable self-service switching by type

### Pricing Adjustments
- **Proration Options**:
  - **Prorate Immediately**: Calculate difference and charge/credit now
  - **Apply at Renewal**: New price starts at next billing cycle
  - **No Proration**: Full new price charged immediately
- **Upgrade Credit**: Credit remaining time from current plan
- **Downgrade Handling**: Options for handling paid-ahead time

### Plan Change Timing
- **Immediate Change**: New plan access starts immediately
- **End of Period**: Change takes effect at next renewal
- **Customer Choice**: Let customer choose timing

### Switching Fees
- **Upgrade Fee**: Optional one-time fee for upgrading
- **Downgrade Fee**: Optional fee for downgrading
- **Crossgrade Fee**: Optional fee for crossgrading
- **Waive Fees**: Ability to waive fees for specific changes

### Proration Calculation Examples

#### Upgrade Mid-Cycle
- Current: $10/month plan (15 days remaining)
- New: $20/month plan
- Credit: $5 (half month unused)
- Charge: $10 (half month of new plan)
- Net Charge: $5

#### Downgrade Mid-Cycle
- Current: $20/month plan (15 days remaining)
- New: $10/month plan
- Credit: $10 (half month unused)
- Applied: Credit to next renewal or refunded

#### Crossgrade: Monthly to Annual
- Current: $20/month plan (15 days remaining)
- New: $200/year plan (equivalent to $16.67/month)
- Credit: $10 (half month unused)
- Charge: $200 - $10 credit = $190
- New renewal: 1 year from crossgrade date

#### Crossgrade: Same Price Different Product
- Current: Plan A at $15/month (15 days remaining)
- New: Plan B at $15/month
- Credit: $7.50 (half month unused)
- Charge: $7.50 (half month of new plan)
- Net Charge: $0 (equivalent plans)

### Proration with Synchronization

When subscriptions are synced to a specific day (e.g., 1st of month) and a plan change occurs:

#### How It Works
- Calculate unused credit from current plan based on days until sync date
- Apply credit toward new plan price
- New plan maintains the same sync day as before
- Proration considers both price difference AND remaining days to sync date

#### Example: Upgrade with Sync Enabled
- Current: $10/month plan, synced to 1st, changed on 15th
- New: $20/month plan
- Credit: $5 (half month unused on old plan)
- Charge: $10 (half month of new plan) - $5 credit = $5 net
- Next renewal: 1st of next month at $20

#### Example: Crossgrade with Sync (Monthly → Annual)
- Current: $10/month plan, synced to 1st, changed on 15th
- New: $100/year plan
- Credit: $5 (half month unused)
- Charge: $100 - $5 credit = $95
- New sync: Maintains same day (1st) for annual renewal

---

## Features for Customers

### Switch Plan Interface
- **View Options**: See available upgrade/downgrade/crossgrade options
- **Switch Type Indicator**: Clear labeling of upgrade, downgrade, or crossgrade
- **Price Comparison**: Compare current vs new plan pricing
- **Billing Cycle Comparison**: See monthly vs annual cost breakdown
- **Proration Preview**: See exact charges before confirming
- **Confirmation**: Review and confirm plan change

### After Switching
- **Access Update**: Immediate or scheduled access change
- **Email Confirmation**: Notification of plan change
- **Invoice/Credit**: Receive invoice or credit memo
- **Updated My Account**: Reflect new plan details

---

## Acceptance Criteria

- [ ] Admin can configure upgrade/downgrade/crossgrade paths
- [ ] Customer can view available plan change options (all three types)
- [ ] Crossgrade between different products at same tier supported
- [ ] Crossgrade between billing cycles (monthly ↔ annual) supported
- [ ] Price difference/proration calculated correctly for all switch types
- [ ] Customer sees preview of charges before confirming
- [ ] Plan change can be immediate or at next renewal
- [ ] Subscription history maintained through plan change

---

## Subscription Quantity Changes

Allow customers and admins to adjust the quantity of items in a subscription without cancelling and resubscribing.

### Quantity Adjustment Features
- **Increase Quantity**: Add more items to an existing subscription
- **Decrease Quantity**: Remove items from subscription (with minimums)
- **Admin Override**: Admin can change quantity regardless of customer limits
- **Quantity Limits**: Configure minimum and maximum quantities per subscription product

### Proration for Quantity Changes
- **Prorate Immediately**: Calculate difference for remaining period
- **Apply at Renewal**: New quantity/price starts at next billing cycle
- **No Proration**: Full new price charged immediately

### Quantity Change Rules
- Set minimum quantity (e.g., at least 1)
- Set maximum quantity (e.g., no more than 10)
- Allow only specific quantity increments (e.g., multiples of 5)
- Restrict quantity changes within X days of renewal

### Quantity Change Proration Example
- Current: 2 items × $10/month = $20/month (15 days remaining)
- New: 5 items × $10/month = $50/month
- Credit: $10 (half month of 2 items)
- Charge: $25 (half month of 5 items)
- Net Charge: $15

### Quantity Change Acceptance Criteria

- [ ] Customer can increase subscription quantity from My Account
- [ ] Customer can decrease subscription quantity (respecting minimums)
- [ ] Admin can set min/max quantity limits per product
- [ ] Proration calculated correctly for quantity changes
- [ ] Quantity changes reflected in next renewal order
- [ ] Activity log records quantity changes

- [ ] Email notification sent on plan change
- [ ] WooCommerce order created for upgrade/crossgrade charges
- [ ] Credits applied for downgrades (or refunded)
- [ ] Admin can see plan change history with switch type indicated
