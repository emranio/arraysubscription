# Subscription Products

## Overview
Enable store owners to create and manage subscription-based products using WooCommerce's native product system, with additional subscription-specific options.

**WooCommerce Integration:** Subscriptions are configured as standard WooCommerce products with additional subscription settings. They work with WooCommerce's existing product types, inventory system, and all product features.

### Supported WooCommerce Product Types

WooCommerce has 4 product types: **Simple**, **Variable**, **Grouped**, and **External/Affiliate**.

| Product Type | Subscription UI | Admin Bundle | Notes |
|--------------|-----------------|--------------|-------|
| **Simple** | ✓ Full support | ✓ | Enable Subscription/Installment/Donation checkboxes appear |
| **Variable** | ✓ Full support | ✓ | Per-variation subscription settings available |
| **Grouped** | ✗ No UI | ✓ | Admin can create grouped products containing subscription items |
| **External** | ✗ Not supported | ✗ | External products are sold on other sites |

> **Note:** The subscription/installment/donation UI is integrated into **Simple** and **Variable** products only. However, admins can create **Grouped products** that contain subscription products as children. For customer-created bundles, see [Subscription Bundle](../phase3/subscription-bundle.md).

### UI Placement in Product Data Meta Box

All subscription options are located in WooCommerce's **Product Data** meta box:

| Product Type | UI Location |
|--------------|-------------|
| **Simple Products** | New tab appears **before the "Advanced" tab** in Product Data meta box |
| **Variable Products** | Settings appear **inside each variation accordion** |

> **Important:** Subscription, Installment, and Donation are **mutually exclusive** options. Only one can be enabled per product/variation.

### Product Type Selection
On each WooCommerce product or variation, admin can select one of three mutually exclusive options:
- **Enable Subscription** - Creates a recurring billing product
- **Enable Installment** - Allows one-time purchase paid over multiple payments (see [Installments](installments.md))
- **Enable Donation** - Accepts donation payments (see [Donations](donations.md))

After selecting an option, the related settings for that type appear in the product editor.

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
- **Product Types**: Support for physical, virtual, and downloadable subscription products

### Billing Configuration
- **Billing Period**: Daily, Weekly, Monthly, Yearly, or Custom intervals
- **Billing Interval**: Every X days/weeks/months/years (e.g., every 2 months)
- **Subscription Length**: Set total duration or make it unlimited/ongoing
- **Renewal Date Display**: Show next billing date to customers

### Different Renewal Pricing
Charge different prices for initial subscription vs renewals—ideal for introductory offers and software license renewals:

- **Initial Price**: Price charged for the first billing period
- **Renewal Price**: Price charged for subsequent renewals
- **Product-Level Setting**: Configure directly on subscription product
- **Clear Display**: Show both prices on product page (e.g., "$99 first year, then $149/year")
- **Cart/Checkout Transparency**: Display renewal price clearly before purchase

**Example Use Cases:**
- Software licenses: $99 first year, $149 renewal
- Introductory offers: $19 first month, $39/month thereafter
- Promotional pricing: 50% off first period, full price on renewal

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
