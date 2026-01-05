# Payment Gateway Integration

## Overview
Support multiple payment gateways for processing subscription payments, with automatic recurring payment support for major gateways and manual payment support for any WooCommerce gateway.

---

## User Stories

### As a Store Admin
- I want to accept subscription payments through Stripe with automatic recurring billing
- I want to accept subscription payments through PayPal with automatic recurring billing
- I want to accept subscription payments through Paddle with automatic recurring billing
- I want to accept subscription payments through FastSpring for international markets
- I want to use any standard WooCommerce payment gateway for manual subscription renewals
- I want customers' payment methods to be saved securely for automatic renewals
- I want to see which payment method is attached to each subscription
- I want to offer multiple payment options at checkout

### As a Customer
- I want to choose my preferred payment method when subscribing
- I want my payment method saved securely for automatic renewals
- I want to update my payment method for an active subscription
- I want to pay renewal invoices manually if I prefer
- I want secure payment processing with my credit card

---

## Features

### Automatic Payment Gateways
Full automatic recurring payment support with tokenization:

#### Stripe Integration
- Credit/Debit card payments
- Stripe SEPA Direct Debit
- Automatic payment tokenization
- Automatic renewal processing
- Payment method update support
- SCA/3D Secure compliance

#### PayPal Integration
- PayPal standard payments
- PayPal reference transactions
- Automatic recurring billing
- Customer can pay via PayPal balance or linked cards

#### Paddle Integration
- Global payment processing
- Automatic VAT/tax handling
- Subscription management through Paddle
- Automatic recurring payments

#### FastSpring Integration
- International payment support
- Multi-currency support
- Automatic recurring billing
- Tax compliance for global sales

### Manual Payment Gateways
Any WooCommerce payment gateway can be used for manual renewals:
- Bank transfers
- Check payments
- Cash on delivery
- Other regional gateways
- Customer receives renewal invoice and pays manually

### Payment Method Management
- **Save Payment Methods**: Securely store cards/accounts for renewals
- **Update Payment Method**: Customer can change saved payment method
- **Payment Method Display**: Show last 4 digits of saved card
- **Multiple Methods**: Support multiple saved payment methods per customer

### Gateway Features
- **Gateway Selection**: Admin can enable/disable gateways for subscriptions
- **Fallback Options**: If automatic payment fails, offer manual payment
- **Gateway Fees**: Support for gateway-specific fees on renewals

> **See Also:** [Restrict Access](restrict-access.md#payment-method-restrictions) for restricting which payment methods are available for subscription products.

---

## Supported Gateways Summary

| Gateway | Auto Recurring | Manual Renewal | Tokenization |
|---------|----------------|----------------|--------------|
| Stripe | ✓ | ✓ | ✓ |
| PayPal | ✓ | ✓ | ✓ |
| Paddle | ✓ | ✓ | ✓ |
| FastSpring | ✓ | ✓ | ✓ |
| Bank Transfer | ✗ | ✓ | ✗ |
| Any WooCommerce Gateway | ✗ | ✓ | Varies |

---

## Acceptance Criteria

- [ ] Stripe integration with automatic recurring payments
- [ ] PayPal integration with automatic recurring payments
- [ ] Paddle integration with automatic recurring payments
- [ ] FastSpring integration with automatic recurring payments
- [ ] Any WooCommerce gateway works for manual renewals
- [ ] Payment methods saved securely for automatic billing
- [ ] Customers can update payment method from My Account
- [ ] Payment method displayed on subscription details
- [ ] Renewal orders created through WooCommerce for all gateways
- [ ] Failed automatic payments can fallback to manual payment
