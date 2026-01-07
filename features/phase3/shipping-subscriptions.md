# Subscription Shipping

## Overview
Configure shipping options specifically for subscription products, including one-time vs recurring shipping fees, and separate handling for initial and renewal orders.

**WooCommerce Integration:** Shipping calculations use WooCommerce's native shipping system. All shipping methods compatible with WooCommerce work with subscription products. The plugin extends shipping settings with subscription-specific options.

---

## User Stories

### As a Store Admin
- I want to charge shipping on subscription products using WooCommerce shipping methods
- I want to offer one-time shipping fees (charge only on first order)
- I want to charge recurring shipping on every renewal order
- I want to set different shipping rates for initial vs renewal orders
- I want to allow customers to update their shipping address per subscription
- I want to apply shipping calculations based on subscription frequency

### As a Customer
- I want to see shipping costs clearly before subscribing
- I want to understand if shipping is one-time or recurring
- I want to update my shipping address for future subscription deliveries
- I want to see shipping costs on each renewal order

---

## Features

### Shipping Fee Options

#### One-Time Shipping
- Charge shipping only on the initial subscription order
- Renewal orders ship free (shipping cost = $0)
- Useful for products where fulfillment cost is primarily in the first shipment

#### Recurring Shipping
- Charge shipping on every renewal order
- Each renewal includes standard shipping calculation
- Default behavior for physical subscription products

#### Different Initial vs Renewal Shipping
- Configure separate shipping rates for first order vs renewals
- Example: $10 shipping on first order, $5 on renewals
- Useful for introductory shipping promotions

### Shipping Configuration

#### Product-Level Settings
| Setting | Options | Description |
|---------|---------|-------------|
| Shipping Type | One-time / Recurring | Whether shipping charges once or repeats |
| Initial Shipping | Amount / Use WooCommerce | Shipping charge for first order |
| Renewal Shipping | Amount / Use WooCommerce | Shipping charge for renewal orders |

#### Global Defaults
- Default shipping type for new subscription products
- Fallback to WooCommerce shipping calculations

### Shipping Address Management

#### Customer Address Updates
- Customer can update shipping address per subscription
- Changes apply to future renewal orders
- Option to update address for all subscriptions at once

#### Address Change Cutoff
- Configure cutoff period before renewal (e.g., changes must be made 3+ days before renewal)
- Prevent address changes too close to fulfillment

### Shipping Zones & Methods
- Full support for WooCommerce Shipping Zones
- Works with all WooCommerce shipping methods:
  - Flat rate shipping
  - Free shipping
  - Local pickup
  - Table rate shipping (with compatible plugins)
- Shipping rates can vary by subscription product/plan

### Shipping with Subscription Bundles
- Calculate shipping for bundled subscription products
- Options: ship together (combined rate) or separately
- Coordinate shipping with renewal schedules

---

## Display & Transparency

### Product Page
- Show shipping terms (one-time or recurring)
- Display estimated shipping cost

### Cart & Checkout
- Show shipping breakdown
- Indicate if shipping is one-time or recurring
- Display total first payment including shipping

### Renewal Orders
- Shipping line item on renewal orders
- Clear indication of shipping charge type

---

## Acceptance Criteria

- [ ] Subscription products support one-time shipping option
- [ ] Subscription products support recurring shipping option
- [ ] Different shipping rates configurable for initial vs renewal orders
- [ ] Shipping uses WooCommerce's native shipping zones and methods
- [ ] Customer can update shipping address per subscription
- [ ] Shipping terms displayed clearly on product page
- [ ] Cart/checkout shows shipping breakdown with subscription info
- [ ] Renewal orders calculate shipping correctly based on settings
- [ ] Address change cutoff configurable before renewal
