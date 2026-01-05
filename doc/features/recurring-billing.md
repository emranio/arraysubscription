# Recurring Billing & Payments

## Overview
Automate the collection of recurring payments through WooCommerce's order system. All renewal payments are generated as standard WooCommerce orders, ensuring full compatibility with WooCommerce's native features: discounts, taxes, shipping, reporting, and third-party plugins.

---

## User Stories

### As a Store Admin
- I want automatic recurring payments to be processed without manual intervention
- I want renewal orders to be created as standard WooCommerce orders
- I want to choose between automatic and manual renewal modes for my store
- I want customers to have the option to renew early before their due date
- I want to set custom pricing for renewals (different from initial subscription price)
- I want to view all renewal invoices in WooCommerce's standard Orders section
- I want to filter WooCommerce reports by renewal orders vs initial orders
- I want renewal orders to respect WooCommerce's tax and shipping calculations

### As a Customer
- I want to be automatically charged on my renewal date without taking action
- I want the option to manually renew my subscription if I prefer
- I want to renew my subscription early if I choose to
- I want to see my upcoming renewal date and amount clearly
- I want to receive confirmation when my renewal payment is processed

---

## Features

### Automatic Renewal System
- **Scheduled Billing**: Automatically charge customers on their billing date
- **WooCommerce Order Creation**: Each renewal generates a new WooCommerce order
- **Invoice Generation**: Use WooCommerce's native invoicing for all renewals
- **Tax Calculation**: Apply WooCommerce tax rules to renewal orders
- **Shipping Handling**: Calculate shipping for physical subscription renewals

### Renewal Modes
- **Automatic Renewals**: Charge saved payment method automatically
- **Manual Renewals**: Send invoice and wait for customer to pay
- **Hybrid Mode**: Let customers choose their preference

### Early Renewal
- Allow customers to renew before due date
- Extend subscription from current end date (not from early renewal date)
- Process early renewal payment immediately

### Custom Renewal Pricing
- Set different renewal price than initial subscription price
- Support promotional first-period pricing with regular renewal rates
- Apply renewal-specific discounts

### WooCommerce Integration
- **Standard Order Flow**: All renewals go through WooCommerce checkout system
- **Order Status Tracking**: Use WooCommerce order statuses for renewals
- **Report Filtering**: Custom filters in WooCommerce Analytics to identify:
  - Initial subscription orders
  - Renewal orders
  - Failed renewal orders
- **Third-Party Compatibility**: Work with WooCommerce PDF invoices, accounting plugins, etc.

---

## Acceptance Criteria

- [ ] Renewal orders are created as standard WooCommerce orders
- [ ] Automatic payments are attempted on the scheduled date
- [ ] Manual renewal sends invoice notification to customer
- [ ] Early renewal option available in customer account
- [ ] Custom renewal pricing can be set per product
- [ ] WooCommerce reports can filter by order type (initial vs renewal)
- [ ] All WooCommerce discounts, taxes, and shipping apply to renewals
- [ ] Third-party WooCommerce plugins work with renewal orders
