# Skip Next Renewal / Vacation Mode

## Overview
Allow customers (and admins) to skip the next renewal cycle without cancelling the subscription. This is separate from pause: the subscription stays active, but billing and fulfillment are skipped for one cycle.

**WooCommerce Integration:** Skipping a renewal prevents the scheduled WooCommerce renewal order from being created for that specific cycle. The subscription remains active and the next order will be generated in the following cycle.

---

## User Stories

### As a Store Admin
- I want to allow customers to skip one upcoming renewal without cancelling
- I want to enable/disable skip-next-renewal per product or globally
- I want to limit how often a customer can skip (e.g., once every 6 months)
- I want to decide how skipping affects billing dates and synchronization
- I want to see when a subscription has skipped a cycle

### As a Customer
- I want to skip my next renewal when I’m away or don’t need delivery
- I want to see how skipping changes my next charge date
- I want my subscription to remain active and resume automatically
- I want to undo a skip before the cutoff date

---

## Features

### Skip Next Renewal
- **Skip One Cycle**: Skip exactly one upcoming renewal payment
- **Auto Resume**: Subscription resumes normal billing after the skipped cycle
- **Undo Skip**: Customer/admin can undo before cutoff

### Scheduling Behavior
- **Shift Renewal Date**: Next payment date moves forward by one billing interval
- **Sync-Aware**: If subscription synchronization is enabled, skipping preserves sync rules
- **Fulfillment-Aware**: For subscription boxes, skip also skips the associated shipment

### Limits & Rules
- Global enable/disable
- Per-product enable/disable
- Limit number of skips per subscription
- Minimum time between skips
- Cutoff date for skipping (e.g., cannot skip within X days of renewal)

### Visibility
- Status indicator (e.g., “Next renewal skipped”)
- Show updated next payment date
- Activity log entry for skip and undo

---

## Acceptance Criteria

- [ ] Customer can skip next renewal from My Account (if enabled)
- [ ] Admin can skip next renewal from subscription details
- [ ] Skipping moves next payment date by one billing interval
- [ ] Subscription remains active (not paused, not cancelled)
- [ ] Customer can undo skip before cutoff
- [ ] Skip limits and cutoff rules configurable
- [ ] Skipped renewal is visible in subscription timeline/activity log
- [ ] Reports can identify skipped cycles

---

## Pause & Resume Subscriptions

Pause functionality is distinct from skipping: the subscription is temporarily suspended entirely rather than skipping just one billing cycle.

### Customer Pause Functionality
- Customers can pause subscriptions temporarily from My Account
- Admin configurable: enable/disable pause feature globally or per-product
- Limit number of pauses allowed per subscription
- Set maximum pause duration (e.g., max 30 days)
- Automatic resume after pause period expires

### Admin Pause Controls
- Admin can pause subscriptions on behalf of customers
- Override pause limits when necessary
- Set custom pause duration
- View pause history in subscription activity log

### Pause Behavior
- **No Charges**: No billing during pause period
- **End Date Extension**: Subscription end date extended by pause duration
- **Access Control**: Choose whether access continues or suspends during pause
- **Resume Options**: Resume manually by customer/admin or automatically after pause period

### Pause vs Skip Comparison

| Aspect | Skip Next Renewal | Pause Subscription |
|--------|-------------------|-------------------|
| Duration | One billing cycle | Configurable period |
| Subscription Status | Active | Paused |
| Access | Continues normally | Configurable (continue/suspend) |
| Billing | Skips one payment | No payments until resumed |
| End Date | Shifts by one interval | Extended by pause duration |

### Pause Limits & Rules
- Global enable/disable pause feature
- Per-product pause enable/disable
- Maximum number of pauses per subscription
- Minimum time between pauses
- Maximum pause duration limit
- Require reason for pausing (optional)

### Pause Acceptance Criteria

- [ ] Customer can pause subscription from My Account (if enabled)
- [ ] Admin can pause subscription from subscription details
- [ ] Pause duration is configurable with maximum limit
- [ ] Subscription status changes to "Paused"
- [ ] No charges processed during pause period
- [ ] Subscription end date extended by pause duration
- [ ] Customer can resume subscription manually
- [ ] Subscription auto-resumes after max pause duration
- [ ] Pause history visible in subscription activity log
- [ ] Pause limits and rules are configurable per-product
