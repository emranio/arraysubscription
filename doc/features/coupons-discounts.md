# Coupons & Discounts for Subscriptions

## Overview
Extend WooCommerce's native coupon system to support subscription-specific discounts, including initial payment discounts, recurring discounts, signup fee waivers, and limited-time promotional pricing.

---

## User Stories

### As a Store Admin
- I want to create coupons that apply only to subscription products
- I want to offer discounts on the initial subscription payment only
- I want to offer discounts that apply to recurring payments
- I want to limit how many renewals a coupon applies to
- I want to waive signup fees with a coupon
- I want to extend free trial periods with a coupon
- I want to use WooCommerce's existing coupon system (no separate system)
- I want coupons to work with WooCommerce's reporting

### As a Customer
- I want to apply coupon codes during subscription checkout
- I want to see my discount clearly on cart and checkout pages
- I want to know how long my discount will last
- I want to understand if the discount applies to renewals

---

## Features

### Subscription Coupon Types

#### Initial Payment Discount
- Discount applies only to first subscription payment
- Renewals charged at full price
- Use for acquisition promotions

#### Recurring Payment Discount
- Discount applies to ongoing renewal payments
- Options:
  - All renewals (lifetime)
  - Limited number of renewals (e.g., first 3 renewals)
  - Limited time period (e.g., first 6 months)

#### Combined Discount
- Apply to both initial and recurring payments
- Same or different discount amounts

#### Signup Fee Discount
- Waive signup fee entirely
- Percentage discount on signup fee
- Fixed amount off signup fee

#### Trial Extension
- Extend free trial period
- Add X days/weeks to standard trial

### Discount Types
- **Percentage Off**: X% discount
- **Fixed Amount**: $X off
- **Fixed Price**: Set specific price (override)

### Coupon Restrictions

#### Subscription-Specific
- Apply only to subscription products
- Apply only to specific subscription products
- Apply only to initial orders
- Apply only to renewals

#### Standard WooCommerce Restrictions
- Minimum/maximum cart total
- Usage limits (per coupon, per user)
- Email restrictions
- Date validity (start/end dates)
- Exclude sale items
- Product/category restrictions

### Coupon Duration for Renewals
- **Forever**: Discount applies to all future renewals
- **Number of Renewals**: Limit to X renewals (e.g., 3 renewals)
- **Time Period**: Discount expires after X months
- **First X Only**: Apply to first X billing cycles only

### WooCommerce Integration
- Uses WooCommerce's native coupon system
- Coupon usage tracked in WooCommerce
- Appears in WooCommerce coupon reports
- Works with WooCommerce coupon URLs
- Compatible with WooCommerce Smart Coupons and similar plugins

---

## Coupon Configuration Examples

### Example 1: New Customer Promo
- 50% off first payment only
- Renewals at full price
- One use per customer

### Example 2: Loyalty Discount
- 20% off all recurring payments
- No discount on initial payment
- Forever (while subscription active)

### Example 3: Limited Time Offer
- 30% off first 6 months
- After 6 renewals, full price applies

### Example 4: Signup Fee Waiver
- 100% off signup fee
- Regular subscription price applies
- Limited quantity available

---

## Display & Transparency
- Show original price and discounted price on cart
- Indicate if discount is limited (e.g., "First 3 months only")
- Show discount expiration on My Account
- Email notification when recurring discount is ending

---

## Acceptance Criteria

- [ ] Coupons can be created using WooCommerce coupon system
- [ ] Option to apply coupon to initial payment only
- [ ] Option to apply coupon to recurring payments
- [ ] Limit coupon to X number of renewals
- [ ] Signup fee can be discounted or waived
- [ ] Trial period can be extended via coupon
- [ ] Discounts display correctly on cart and checkout
- [ ] Coupon usage tracked in WooCommerce reports
- [ ] Customer sees discount duration/limitations
- [ ] Standard WooCommerce coupon restrictions work
- [ ] Coupon codes work with WooCommerce's apply coupon flow
