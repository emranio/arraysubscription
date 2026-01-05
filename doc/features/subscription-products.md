# Subscription Products

## Overview
Enable store owners to create and manage subscription-based products using WooCommerce's native product system, with additional subscription-specific options.

---

## User Stories

### As a Store Admin
- I want to convert any simple WooCommerce product into a subscription product by enabling a subscription option
- I want to create variable subscription products with different pricing tiers and billing cycles
- I want to set subscription products as physical, virtual, or downloadable
- I want to define the subscription price independently from the regular product price
- I want to configure billing intervals (daily, weekly, monthly, quarterly, yearly) for each product
- I want to set subscription length/duration (e.g., 3 months, 1 year, or unlimited)
- I want to offer both one-time purchase AND subscription options for the same product
- I want to limit the number of subscriptions a customer can have per product

### As a Customer
- I want to see clear subscription terms on the product page (price, billing cycle, duration)
- I want to understand when I will be charged and how much before purchasing
- I want to add subscription products to my cart using the standard WooCommerce flow
- I want to see subscription details on the cart and checkout pages before completing purchase

---

## Features

### Product Configuration
- **Simple Subscription Products**: Convert any simple product to subscription
- **Variable Subscription Products**: Create variations with different subscription plans (monthly vs yearly)
- **Mixed Cart Support**: Allow subscription and non-subscription products in the same cart
- **Product Types**: Support for physical, virtual, and downloadable subscription products

### Billing Configuration
- **Billing Period**: Daily, Weekly, Monthly, Yearly, or Custom intervals
- **Billing Interval**: Every X days/weeks/months/years (e.g., every 2 months)
- **Subscription Length**: Set total duration or make it unlimited/ongoing
- **Renewal Date Display**: Show next billing date to customers

### Display Options
- **Subscription Info on Product Page**: Display billing cycle, price, and terms
- **Cart Page Details**: Show recurring payment information
- **Checkout Transparency**: Display full subscription terms at checkout
- **Custom Button Labels**: Customize "Add to Cart" and "Place Order" button text for subscriptions

### Quantity Options
- Allow multiple quantities of subscription products
- Limit to one subscription per product per customer (optional)

---

## Acceptance Criteria

- [ ] Admin can enable subscription for any simple or variable product
- [ ] Billing period and interval are configurable per product
- [ ] Subscription terms are clearly displayed on product, cart, and checkout pages
- [ ] Products use WooCommerce's standard add-to-cart and checkout flow
- [ ] Recurring orders are generated through WooCommerce's order system
- [ ] Subscription products work with WooCommerce's native inventory management
