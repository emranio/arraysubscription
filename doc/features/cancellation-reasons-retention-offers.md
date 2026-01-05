# Cancellation Reasons & Retention Offers

## Overview
When a customer cancels a subscription, collect a cancellation reason and optionally present retention offers (pause, downgrade, coupon, skip next renewal) to reduce churn and improve subscription insights.

**WooCommerce Integration:** Cancellation happens through the WooCommerce My Account interface. Retention offers like coupons use WooCommerce's native coupon system, and plan downgrades create WooCommerce orders for any proration adjustments.

---

## User Stories

### As a Store Admin
- I want to require or optionally request a cancellation reason
- I want to configure my own cancellation reason list (predefined options)
- I want customers to be able to type a custom reason (optional)
- I want to see cancellation reasons in reports and exports
- I want to offer retention options during cancellation to reduce churn
- I want to control which retention offers are shown and when
- I want to track how often retention offers prevent cancellation

### As a Customer
- I want to cancel my subscription easily
- I want to understand what happens when I cancel (immediate vs end of period)
- I want to be offered alternatives (pause, downgrade, discount) before I confirm cancellation
- I want to accept a retention offer without contacting support

---

## Features

### Cancellation Reason Collection
- **Reason Prompt**: Display a reason selector during cancellation
- **Reason List Management**: Admin can add/edit/remove reasons
- **Custom Reason Text**: Optional free-text explanation
- **Optional vs Required**: Admin chooses whether reason is required
- **Reason Privacy**: Reason visible to admins in subscription details

### Retention Offers (Optional)

#### Offer Types
- **Pause Instead**: Offer pause/resume option
- **Downgrade Instead**: Offer downgrade or crossgrade to a cheaper plan
- **Coupon Instead**: Offer a coupon (e.g., X% off next N renewals)
- **Skip Next Renewal**: Offer to skip one renewal cycle
- **Contact Support**: Optional link to support instead of canceling

#### Offer Targeting Rules
- Show offers only for certain products/plans
- Show offers only for certain subscription age (e.g., after 30 days)
- Show offers only for certain customer roles (B2B vs B2C)
- Show offers only for certain cancellation reasons

### Confirmation & Outcomes
- **Two-Step Confirmation**: Offer screen → confirm cancellation
- **Offer Acceptance Tracking**:
  - Offer shown
  - Offer accepted
  - Cancellation completed
- **Audit Trail**: Log cancellation reason and offer interactions

### Reporting
- **Cancellation Reason Report**: Breakdown by reason over time
- **Offer Effectiveness**: Acceptance rate per offer type
- **Churn Metrics Integration**: Improve churn analysis with reason data

---

## Acceptance Criteria

- [ ] Cancellation flow prompts customer to select a reason
- [ ] Admin can configure cancellation reason options
- [ ] Optional custom reason text supported
- [ ] Admin can choose required vs optional reason
- [ ] Retention offers can be enabled/disabled individually
- [ ] Customer can accept an offer without leaving My Account
- [ ] Accepted offers update the subscription accordingly (pause/downgrade/coupon/skip)
- [ ] Cancellation reason stored and visible on subscription details
- [ ] Cancellation reasons available in exports and reporting
- [ ] Offer interactions logged for analytics
