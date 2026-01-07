# Donations

## Overview
Accept one-time and recurring donations through WooCommerce. Supporters can choose from predefined amounts or enter a custom amount within admin-defined limits.

**WooCommerce Integration:** Donations are processed as WooCommerce orders. Recurring donations create subscription-like billing using the same recurring payment system as subscriptions.

### Product Type Selection
On each WooCommerce product or variation, admin can select one of three mutually exclusive options:
- **Enable Subscription** - Creates a recurring billing product (see [Subscription Products](subscription-products.md))
- **Enable Installment** - Allows one-time purchase paid over multiple payments (see [Installments](installments.md))
- **Enable Donation** - Accepts donation payments

After selecting an option, the related settings for that type appear in the product editor.

> **Note:** This is a simplified donation feature. More robust donation features (campaigns, goals, donor management, etc.) planned for future releases.

---

## User Stories

### As a Store Admin
- I want to accept donations on my WooCommerce store
- I want to offer predefined donation amounts for quick selection
- I want to allow custom donation amounts with min/max limits
- I want to offer both one-time and recurring donation options
- I want donations processed through WooCommerce's order system

### As a Donor
- I want to quickly select a predefined donation amount
- I want to enter a custom amount if the presets don't suit me
- I want to choose between one-time or recurring donations
- I want to receive a receipt/confirmation for my donation

---

## Features

### Donation Amount Options

#### Predefined Amounts
- Admin configures preset amounts (e.g., $5, $10, $25, $50, $100)
- Displayed as clickable buttons for quick selection
- Customizable labels (e.g., "$25 - Supporter", "$100 - Champion")

#### Custom Amount
- "Other Amount" field for custom donations
- **Minimum Amount**: Admin sets minimum (e.g., $1)
- **Maximum Amount**: Admin sets maximum (e.g., $10,000)
- Validation ensures amount is within range

### Donation Frequency

#### One-Time Donation
- Single payment processed immediately
- Creates one WooCommerce order
- Standard receipt/confirmation

#### Recurring Donation
- Donor selects frequency: Weekly, Monthly, Yearly
- Uses same recurring billing system as subscriptions
- Each recurring payment creates WooCommerce order
- Donor can cancel anytime from My Account

### Donation Product Setup

#### Create Donation Product
- Special "Donation" product type or setting on simple product
- Configure predefined amounts
- Set min/max for custom amounts
- Enable/disable recurring option

### Donor Experience

#### Donation Form Display
```
Choose Your Donation Amount:
[$10] [$25] [$50] [$100] [Other: $___]

Donation Type:
○ One-Time
○ Monthly
○ Yearly

[Donate Now]
```

#### After Donation
- Thank you message/page
- WooCommerce order confirmation email
- Receipt for tax purposes (standard WooCommerce order)
- Recurring donors see donation in My Account > Subscriptions

---

## Admin Settings

### Donation Product Configuration
Located on: **WooCommerce Product Edit** (when donation enabled)

| Setting | Description |
|---------|-------------|
| Enable Donation | Mark product as donation |
| Predefined Amounts | List of preset amounts (comma-separated) |
| Allow Custom Amount | Yes/No |
| Minimum Amount | Minimum custom donation |
| Maximum Amount | Maximum custom donation |
| Allow Recurring | Enable recurring donation option |
| Recurring Intervals | Which intervals to offer (weekly, monthly, yearly) |

---

## Example Configuration

**Charity Donation Product:**
- Predefined Amounts: $10, $25, $50, $100, $250
- Custom Amount: Enabled
- Minimum: $5
- Maximum: $5,000
- Recurring: Enabled (Monthly, Yearly)

**Tip Jar Product:**
- Predefined Amounts: $2, $5, $10
- Custom Amount: Enabled
- Minimum: $1
- Maximum: $100
- Recurring: Disabled (one-time only)

---

## Acceptance Criteria

- [ ] Admin can create donation product with predefined amounts
- [ ] Admin can set min/max for custom amounts
- [ ] Donor can select predefined amount or enter custom
- [ ] Custom amount validated against min/max
- [ ] One-time donations create WooCommerce order
- [ ] Recurring donations use subscription billing system
- [ ] Recurring donations appear in customer My Account
- [ ] Donor can cancel recurring donation from My Account
- [ ] Standard WooCommerce order emails sent as receipts

---

## Future Enhancements (Planned)
- Donation campaigns with goals and progress bars
- Donor wall / recognition
- Donation tiers with perks
- Fundraising thermometer widget
- Donor management and communication tools
- Tax receipt generation
- Peer-to-peer fundraising 