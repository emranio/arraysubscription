# General Features & Capabilities

## Overview
This document covers smaller features, general capabilities, and supplementary functionality that support the core subscription system.

---

## WooCommerce Integration

### Core Requirements
- **WooCommerce Required**: Plugin requires WooCommerce to be installed and active
- **Version Compatibility**: Support for latest WooCommerce versions
- **HPOS Compatible**: High-Performance Order Storage support

### Order System Integration
- All subscription orders (initial and renewals) are WooCommerce orders
- Standard WooCommerce checkout flow for subscription purchases
- Native WooCommerce cart functionality
- Tax calculations use WooCommerce tax settings
- Shipping calculations use WooCommerce shipping methods

### Third-Party Compatibility
- Works with WooCommerce PDF invoices plugins
- Compatible with WooCommerce accounting integrations
- Supports WooCommerce shipping plugins
- Works with page builders (Elementor, Gutenberg, etc.)

### Subscription Coupon Fields
Additional fields injected into WooCommerce's native coupon settings:

| Field | Options | Description |
|-------|---------|-------------|
| Apply to Subscriptions | Yes / No | Whether this coupon can be used on subscription products |
| Discount Duration | One-time / Recurring | One-time: initial payment only. Recurring: applies to future renewals too |

> Uses WooCommerce's default coupon system—no separate coupon management needed.

---

## Pause & Resume Subscriptions

### Customer Pause Functionality
- Customers can pause subscriptions temporarily
- Admin configurable: enable/disable pause feature
- Limit number of pauses allowed
- Set maximum pause duration
- Automatic resume after pause period

### Pause Behavior
- No charges during pause period
- Subscription end date extended by pause duration
- Access can continue or be suspended during pause
- Resume manually or automatically

---

## Subscription Quantity Changes

### Quantity Adjustments
- Allow customers to change subscription quantity
- Increase or decrease number of items
- Proration options for quantity changes
- Quantity limits (min/max)

---

## Shipping Features

### Subscription Shipping
- Calculate shipping for physical subscription products
- Different shipping for initial vs renewal orders
- One-time shipping fee option (charge only on first order)
- Recurring shipping calculations
- Update shipping address per subscription

---

## Multiple Subscriptions

### Cart & Checkout
- Allow multiple subscription products in single cart
- Separate renewal schedules per subscription

### Per-Customer Limits
- Limit subscriptions per product per customer
- Limit total subscriptions per customer
- Allow one active subscription per product

---

## Downloadable Products

### Digital Subscriptions
- Support for downloadable/digital subscription products
- Access control based on subscription status
- Revoke download access on cancellation/expiry
- Download limits per billing period

---

## REST API Support

### API Endpoints
- Get subscription details via REST API
- Retrieve subscriptions by customer
- Access subscription status and payment history
- Integration with external systems

---

## Shortcodes & Blocks

### Display Shortcodes
- `[subscriptions]` - Display customer's subscriptions
- `[subscription_info]` - Show subscription details
- Gutenberg blocks for subscription content

### Button Customization
- Custom "Add to Cart" button text for subscriptions
- Custom "Place Order" button text at checkout
- Configurable subscription labels

---

## User Account Requirements

### Login Requirement
- Subscriptions require customer account
- Guest checkout not available for subscriptions
- Account created during subscription purchase

### Customer Data
- Store billing information
- Save shipping preferences
- Track subscription history per customer

---

## Logging & Debugging

### Error Logging
- Subscription error logs for troubleshooting
- Payment failure logging
- Renewal processing logs
- Debug mode for development

### Activity Logs
- Track subscription status changes
- Log payment attempts
- Record admin actions on subscriptions

---

## Multi-Currency Support

### Currency Handling
- Support for WooCommerce multi-currency plugins
- Subscription pricing in multiple currencies
- Currency conversion for renewals

---

## Date & Time Handling

### Timezone Support
- Respect WordPress timezone settings
- Accurate renewal scheduling
- Clear date display for customers

### Date Formats
- Localized date formatting
- Configurable date display format

---

## Staging & Development

### Staging Mode
- Automatic detection of staging environments
- Prevent duplicate charges on staging
- Safe testing environment support

---

## Performance

### Scalability
- Efficient subscription processing
- Batch renewal processing
- Optimized database queries
- Background processing for large operations

---

## Security

### Data Protection
- Secure payment token storage
- PCI compliance through payment gateways
- WordPress security best practices
- Secure API endpoints

---

## Localization

### Translation Ready
- Full translation support (.pot file included)
- RTL language support
- WPML and Polylang compatibility
- TranslatePress compatible
- Localized date/currency formats
- Customizable front-end text strings (e.g., "Subscribe", "Next payment", "Billing details")

---

## EU & International Compliance

### German Market ("Germanized Pro" plugin Compatible)
- Uses standard WooCommerce checkout template and hooks
- Germanized Pro can inject required contract summary
- Legal compliance plugins work seamlessly
- Standard WooCommerce product and order structure maintained

### EU Compliance
- EU-compliant invoicing through WooCommerce order system
- Compatible with WooCommerce PDF invoice plugins for e-invoicing
- GDPR-compliant data handling
- Customer data export/deletion support
- Clear subscription terms display before purchase

---

## Admin Capabilities

### User Roles
- Subscription management permissions
- View-only vs full management roles
- WooCommerce role integration

---

## Acceptance Criteria Summary

- [ ] WooCommerce is required dependency
- [ ] HPOS compatibility
- [ ] Pause/resume functionality
- [ ] Download access control for digital subscriptions
- [ ] REST API endpoints functional
- [ ] Shortcodes and blocks available
- [ ] Error logging system
- [ ] Staging mode detection
- [ ] Multi-currency plugin compatibility
- [ ] Translation ready
- [ ] Secure token storage
