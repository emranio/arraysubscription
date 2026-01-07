# General Features & Capabilities

## Overview
This document covers smaller features, general capabilities, and supplementary functionality that support the core subscription system.

---

## WooCommerce Integration

### Core Requirements
- **WooCommerce Required**: Plugin requires WooCommerce to be installed and active
- **Version Compatibility**: Support for latest WooCommerce versions
- **HPOS Compatible**: High-Performance Order Storage support

### Supported Product Types

WooCommerce has 4 product types: **Simple**, **Variable**, **Grouped**, and **External/Affiliate**.

| Product Type | Plugin UI Integration | Admin Bundle Support | Notes |
|--------------|----------------------|---------------------|-------|
| **Simple** | ✓ Full support | ✓ Can be bundled | Subscription/Installment/Donation/Feature Manager UI available |
| **Variable** | ✓ Full support | ✓ Can be bundled | Per-variation settings supported |
| **Grouped** | ✗ No UI | ✓ As container | Admin can create grouped products containing subscription items |
| **External** | ✗ Not supported | ✗ | External products are sold on other sites |

> **Summary:** Our plugin's UI (Subscription, Installment, Donation, Feature Manager) integrates with **Simple** and **Variable** products. **Grouped products** are supported for admin-created bundles (containing subscription items as children). For customer-created bundles, see [Subscription Bundle](../phase3/subscription-bundle.md).

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

## Cross-References to Detailed Feature Documents

Several features have been expanded into dedicated documents for comprehensive coverage:

| Feature | Document |
|---------|----------|
| Pause & Resume Subscriptions | [Skip Next Renewal / Vacation Mode](skip-next-renewal-vacation-mode.md) |
| Subscription Quantity Changes | [Upgrades, Downgrades & Crossgrades](upgrade-downgrade-crossgrade.md) |
| Shipping for Subscriptions | [Subscription Shipping](shipping-subscriptions.md) |
| Downloadable Products | [Restrict Access](restrict-access.md) |
| REST API | [REST API](rest-api.md) |
| Multi-Currency | [Multi-Currency Support](multi-currency.md) |

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
- [ ] Shortcodes and blocks available
- [ ] Error logging system
- [ ] Staging mode detection
- [ ] Translation ready
- [ ] Secure token storage
- [ ] Multiple subscriptions in cart supported
- [ ] Per-customer subscription limits configurable
- [ ] User account required for subscriptions

> **Note:** Additional acceptance criteria for moved features are located in their respective documents:
> - Pause/Resume: [skip-next-renewal-vacation-mode.md](skip-next-renewal-vacation-mode.md)
> - Quantity Changes: [upgrade-downgrade-crossgrade.md](upgrade-downgrade-crossgrade.md)
> - Shipping: [shipping-subscriptions.md](shipping-subscriptions.md)
> - Download Access: [restrict-access.md](restrict-access.md)
> - REST API: [rest-api.md](rest-api.md)
> - Multi-Currency: [multi-currency.md](multi-currency.md)
