# Gifting & Transfer Subscription

## Overview
Allow subscriptions to be purchased as gifts and transferred between users. This supports gifting memberships, subscriptions for family/friends, and admin-assisted ownership changes.

**WooCommerce Integration:** Gift purchases use WooCommerce's standard checkout and order system. The initial purchase creates a WooCommerce order for the purchaser, and when claimed, the subscription (along with future renewal orders) is associated with the recipient's WooCommerce customer account.

---

## User Stories

### As a Store Admin
- I want to enable gifting for specific subscription products
- I want a gift purchase to still use WooCommerce checkout and orders
- I want to support gift recipient assignment after purchase
- I want to allow transferring an active subscription to another user
- I want to audit transfers for fraud prevention

### As a Customer
- I want to buy a subscription as a gift for someone else
- I want to enter recipient name/email and an optional message
- I want the recipient to be able to claim the subscription
- I want to transfer my subscription to another person if needed
- I want confirmation when a transfer happens

---

## Features

### Gift Purchase
- **Gift Toggle**: “Buy as a gift” option on product page (configurable)
- **Recipient Details**: Recipient email/name + optional gift message
- **Claim Flow**: Recipient claims via email link and creates/logs in to account
- **Gift Status Tracking**: Pending claim vs claimed

### Transfer Active Subscription
- **Transfer Request**: Initiate transfer from My Account (optional) or admin panel
- **Recipient Verification**: Email verification for recipient
- **Effective Date**: Immediate transfer or at next renewal
- **What Transfers**:
  - Subscription ownership
  - Access entitlements
  - Order history remains linked to subscription

### Payment Method Handling
- Admin-configurable behavior:
  - Keep payer’s payment method (common for gifts paid by purchaser)
  - Require recipient to add payment method before next renewal

### Controls & Safety
- Limit transfer frequency (e.g., once per 90 days)
- Prevent transfer for overdue or on-hold subscriptions (optional)
- Log transfer events in activity log
- Admin override and reversal

### Notifications
- Purchaser confirmation
- Recipient claim invitation
- Transfer completed notification
- Reminder if gift not claimed within X days

---

## Acceptance Criteria

- [ ] Subscription products can be marked as gift-eligible
- [ ] Gift purchases go through WooCommerce checkout
- [ ] Recipient can claim a gifted subscription
- [ ] Subscription ownership can be transferred to another user
- [ ] Transfer can be immediate or scheduled
- [ ] Transfer rules and limits configurable
- [ ] Transfer actions are logged and visible to admins
- [ ] Notifications sent for gift/claim/transfer events
