# Multi-Currency Support

## Overview
Support multiple currencies for subscription pricing and renewals, integrating with popular WooCommerce multi-currency plugins.

**WooCommerce Integration:** Works with WooCommerce multi-currency plugins such as WPML WooCommerce Multilingual, WooCommerce Currency Switcher, and similar solutions. Currency handling follows WooCommerce's native currency system.

---

## User Stories

### As a Store Admin
- I want to offer subscriptions in multiple currencies
- I want subscription renewals to process in the customer's selected currency
- I want currency conversion to work correctly for subscription products
- I want to set fixed prices per currency (rather than auto-conversion)

### As a Customer
- I want to subscribe in my local currency
- I want to see prices in my currency on product pages
- I want my renewals to be charged in the same currency as my initial purchase
- I want to understand the total cost in my currency before subscribing

---

## Features

### Currency at Subscription Creation
- Currency captured at time of subscription purchase
- Subscription stores the original currency
- Renewals process in the same currency as initial order

### Multi-Currency Plugin Compatibility
Compatible with popular multi-currency plugins:

#### WPML WooCommerce Multilingual
- Full integration with WPML's currency switching
- Fixed prices per currency for subscription products
- Automatic currency detection based on language/location

#### WooCommerce Currency Switcher
- Support for customer-selected currency
- Currency preserved across checkout flow
- Renewal currency matching

#### Other Plugins
- Compatible with plugins using WooCommerce's currency filter hooks
- Fallback to WooCommerce default currency if plugin not detected

### Pricing Options

#### Auto-Conversion
- Convert subscription price based on exchange rate
- Rate updated at time of renewal (dynamic) or fixed at subscription start

#### Fixed Prices Per Currency
- Set specific price per currency for subscription products
- Override auto-conversion with manual pricing
- Control pricing strategy per market

### Currency Display

#### Product Page
- Show subscription price in selected currency
- Display billing terms in local currency

#### Cart & Checkout
- Show totals in customer's currency
- Subscription terms displayed in selected currency

#### My Account
- Subscription details shown in original currency
- Next payment amount in subscription currency

### Renewal Currency Handling

| Scenario | Behavior |
|----------|----------|
| Currency unchanged | Process in original currency |
| Currency no longer supported | Option to convert or notify customer |
| Exchange rate changed | Use rate from subscription start or current rate (configurable) |

---

## Admin Settings

### Currency Options
- Enable/disable multi-currency for subscriptions
- Default currency for new subscriptions
- Exchange rate source (if using auto-conversion)
- Fixed vs dynamic exchange rates for renewals

### Per-Product Currency Pricing
- Set fixed prices in each enabled currency
- Override global conversion rates

---

## Acceptance Criteria

- [ ] Subscription stores original currency at purchase
- [ ] Renewals process in subscription's original currency
- [ ] Compatible with WPML WooCommerce Multilingual
- [ ] Compatible with WooCommerce Currency Switcher
- [ ] Fixed prices per currency configurable on products
- [ ] Subscription details display in correct currency
- [ ] Cart and checkout show correct currency
- [ ] My Account shows subscription amounts in original currency
- [ ] Currency fallback works if multi-currency plugin deactivated
