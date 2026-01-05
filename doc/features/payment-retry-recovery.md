# Failed Payment Retry & Recovery

## Overview
Automatically handle failed subscription payments through intelligent retry logic, customer notifications, and recovery tools to minimize involuntary churn and maximize revenue recovery.

**WooCommerce Integration:** Failed payment retry creates new WooCommerce order attempts. Each retry is logged in WooCommerce's order system, and successful recoveries appear as standard WooCommerce orders in reporting.

---

## User Stories

### As a Store Admin
- I want failed payments to be automatically retried
- I want to configure how many retry attempts are made
- I want to set the interval between retry attempts
- I want to control what happens after all retries fail (suspend, cancel)
- I want customers to be notified when their payment fails
- I want to see recovery rates and failed payment reports
- I want to manually trigger retry attempts

### As a Customer
- I want to be notified if my payment fails
- I want to easily update my payment method if my card was declined
- I want to manually pay my renewal invoice if automatic payment fails
- I want my subscription to not immediately cancel on first failure
- I want a grace period to fix payment issues
- I want clear instructions on how to resolve payment failures

---

## Features

### Automatic Retry System

#### Retry Configuration
- **Number of Retries**: Set how many times to retry (e.g., 3 attempts)
- **Retry Interval**: Set time between retries (e.g., 1, 3, 5 days)
- **Retry Schedule**: Define specific schedule (Day 1, Day 3, Day 7)
- **Smart Retry Timing**: Retry at optimal times (e.g., start of month for paycheck timing)

#### Retry Logic
- First retry: X hours/days after initial failure
- Second retry: X days after first retry
- Third retry: X days after second retry
- Final action: After all retries exhausted

### Grace Period
- **Grace Period Duration**: Time allowed to fix payment after failure
- **Access During Grace**: Continue subscription access during grace period
- **Grace Period Expiry**: What happens when grace period ends

### Failed Payment Actions
After all retry attempts fail:
- **Suspend Subscription**: Put on hold, awaiting payment
- **Cancel Subscription**: Terminate subscription
- **Expire Subscription**: Mark as expired
- **Admin Notification**: Alert admin of final failure

### Customer Notifications
- **Payment Failed**: Immediate notification on failure
- **Retry Scheduled**: Notice of upcoming retry attempt
- **Update Payment Prompt**: Link to update payment method
- **Grace Period Warning**: Days remaining to fix payment
- **Final Warning**: Last chance before suspension/cancellation
- **Subscription Suspended**: Notice when subscription is paused

### Customer Recovery Options
- **Update Payment Method**: Easy link to change card
- **Pay Now Button**: Manual payment for failed renewal
- **Retry Request**: Customer-initiated retry with updated payment
- **Contact Support**: Easy path to customer service

### Manual Admin Actions
- **Force Retry**: Manually trigger payment retry
- **Skip Retry**: Skip to next action
- **Extend Grace Period**: Give more time
- **Mark as Paid**: Manually mark as paid (e.g., phone payment)

---

## Retry Schedule Example

| Attempt | Day | Action |
|---------|-----|--------|
| Initial | Day 0 | Payment fails, retry scheduled |
| Retry 1 | Day 1 | First retry attempt |
| Retry 2 | Day 3 | Second retry attempt |
| Retry 3 | Day 5 | Third retry attempt |
| Final | Day 7 | Grace period ends, subscription suspended |

---

## Dunning Management
- Track failed payment communications
- Sequence of escalating notifications
- Customizable dunning email templates
- Track which dunning emails have been sent

---

## Acceptance Criteria

- [ ] Automatic retry attempts on failed payments
- [ ] Configurable number of retries and intervals
- [ ] Grace period before subscription status change
- [ ] Customer notified on each failure
- [ ] Customer can update payment method easily
- [ ] Customer can manually pay failed renewal
- [ ] Admin notified of persistent failures
- [ ] Admin can manually retry payments
- [ ] Subscription suspended (not cancelled) by default on failure
- [ ] Recovery rate tracked in reports
- [ ] Multiple dunning emails sent based on configuration
