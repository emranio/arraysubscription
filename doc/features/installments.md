# Installment Payments

## Overview
Allow customers to purchase non-subscription WooCommerce products in easy installments, making high-value products more accessible and boosting sales. Split the total cost into scheduled payments over time.

**WooCommerce Integration:** Each installment payment creates a standard WooCommerce order, ensuring full compatibility with WooCommerce's order management, reporting, and third-party integrations. Installment schedules are managed alongside the customer's regular WooCommerce orders.

> **Note:** Installments and Subscriptions are mutually exclusive. A product (or variation) can be configured as either an installment product OR a subscription product, but not both.

---

## User Stories

### As a Store Admin
- I want to enable installment payments for specific products or variations
- I want to configure how many installments customers can pay in
- I want to set the payment interval (weekly, bi-weekly, monthly)
- I want to add an optional fee for installment purchases (flat or percentage)
- I want to control when the customer receives the product
- I want to handle missed installment payments appropriately

### As a Customer
- I want to pay for expensive products in smaller, manageable installments
- I want to see the installment breakdown before purchasing
- I want to know if there are any extra fees for paying in installments
- I want to track my remaining installments in My Account
- I want to pay off my remaining balance early if I choose

---

## Features

### Admin Configuration

#### Enable Installments (Product Level)
Located on: **WooCommerce Product Edit > General tab**

- **Enable Installments**: Checkbox to enable installment payments
- **Mutually Exclusive**: Cannot enable both installments AND subscription on same product/variation

> When "Enable Installments" is checked, "Enable Subscription" is automatically disabled and vice versa.

#### Installment Settings (Per Product)
| Setting | Description |
|---------|-------------|
| Number of Installments | How many payments (2, 3, 4, 6, 12, etc.) |
| Payment Interval | Frequency: Weekly, Bi-weekly, Monthly |
| Installment Fee | Optional extra fee for installment purchases |
| Fee Type | Flat amount ($10) or Percentage (5%) |
| Product Delivery | When customer receives product |

#### Installment Fee Options
- **No Fee**: Same total price whether paid upfront or in installments
- **Flat Fee**: Add fixed amount (e.g., +$15 for installment option)
- **Percentage Fee**: Add percentage of total (e.g., +5%)
- **Fee Display**: Show fee transparently at checkout

#### Product Delivery Options
- **After First Payment**: Ship/deliver after first installment paid
- **After Full Payment**: Ship/deliver only when all installments complete
- **After X Payments**: Ship after specific number of payments (e.g., after 2 of 6)

### Variable Product Support
- Enable installments per variation independently
- Different installment terms per variation
- Example: 
  - Variation A (Basic): 3 installments, no fee
  - Variation B (Premium): 6 installments, 3% fee

### Customer Checkout Experience

#### Product Page Display
- Show installment option: "Or pay in 4 installments of $50/month"
- Display any additional fees clearly
- Toggle between full payment and installment options

#### Cart & Checkout
- Select payment option: Full price OR Installments
- Show installment breakdown:
  - Number of payments
  - Amount per payment
  - Payment schedule (dates)
  - Any fees included
- Clear total cost comparison

#### Checkout Display Example
```
Payment Options:
○ Pay in Full: $200.00
● Pay in 4 Installments: $52.50/month × 4 = $210.00 (includes $10 fee)

Payment Schedule:
  - Today: $52.50
  - Feb 5, 2026: $52.50
  - Mar 5, 2026: $52.50
  - Apr 5, 2026: $52.50
```

### Installment Management

#### WooCommerce Orders
- **Initial Order**: First installment payment creates WooCommerce order
- **Subsequent Payments**: Each installment creates new WooCommerce order
- **Order Linking**: All installment orders linked to original purchase
- **Order Notes**: Clear indication of installment number (e.g., "Payment 2 of 4")

#### Customer My Account
New section: **My Installments** or within existing Orders

- View all active installment plans
- See remaining payments and amounts
- View payment schedule with dates
- Track completed vs pending payments
- Option to pay off early (full remaining balance)

#### Early Payoff
- Customer can pay remaining balance at any time
- Single payment for all outstanding installments
- Fee may be prorated or waived (admin setting)

### Failed Payment Handling

#### Retry Logic
- Automatic retry on failed payments (configurable)
- Grace period before action taken
- Customer notified of failed payment

#### Actions on Persistent Failure
- **Pause Deliveries**: Stop any pending shipments
- **Suspend Access**: For digital products
- **Send to Collections**: Mark as delinquent (manual process)
- **Admin Notification**: Alert store owner

---

## Admin Settings

### Global Installment Settings
Located in: **Array Subscription > Settings > Installments**

| Setting | Options | Description |
|---------|---------|-------------|
| Enable Installments | Yes / No | Enable installment feature globally |
| Default Installments | 2, 3, 4, 6, 12 | Default number of installments |
| Default Interval | Weekly / Bi-weekly / Monthly | Default payment frequency |
| Minimum Order Value | Amount | Minimum cart total for installments |
| Allow Early Payoff | Yes / No | Let customers pay off early |
| Retry Failed Payments | Yes / No | Auto-retry failed installments |
| Retry Attempts | 1-5 | Number of retry attempts |
| Grace Period | 1-14 days | Days before taking action on failure |

---

## Example Scenarios

### Scenario 1: Electronics Store - Laptop
- **Product Price**: $1,200
- **Installment Option**: 6 monthly payments
- **Fee**: 5% ($60)
- **Total with Installments**: $1,260
- **Per Payment**: $210/month
- **Delivery**: After first payment

### Scenario 2: Furniture Store - Sofa
- **Product Price**: $800
- **Installment Option**: 4 monthly payments
- **Fee**: None
- **Total with Installments**: $800
- **Per Payment**: $200/month
- **Delivery**: After full payment

### Scenario 3: Jewelry Store - Ring (Variable Product)
- **14K Gold Variation**: $500, 3 installments, no fee
- **18K Gold Variation**: $1,500, 6 installments, $50 fee
- Each variation has independent installment settings

### Scenario 4: Early Payoff
- **Original Plan**: 6 payments of $100 ($600 total)
- **After 2 Payments**: Customer paid $200
- **Early Payoff**: Customer pays $400 to complete
- **Result**: Installment plan closed, product fully paid

---

## Difference: Installments vs Subscriptions

| Aspect | Installments | Subscriptions |
|--------|--------------|---------------|
| Purpose | Pay for ONE product over time | Recurring access/delivery |
| End Date | Fixed (after X payments) | Ongoing (until cancelled) |
| Total Amount | Known upfront | Varies based on duration |
| Product | One-time purchase | Recurring product/service |
| After Final Payment | Complete, nothing more owed | Continues until cancelled |
| Example | $600 laptop in 6 payments | $10/month membership |

---

## Acceptance Criteria

- [ ] Admin can enable installments for any non-subscription WooCommerce product
- [ ] Admin can enable installments per variation for variable products
- [ ] Installments and subscriptions are mutually exclusive per product/variation
- [ ] Configurable number of installments (2, 3, 4, 6, 12, etc.)
- [ ] Configurable payment interval (weekly, bi-weekly, monthly)
- [ ] Optional installment fee (flat or percentage)
- [ ] Fee displayed transparently at checkout
- [ ] Each installment creates a WooCommerce order
- [ ] Customer can view installment plan in My Account
- [ ] Customer can pay off remaining balance early
- [ ] Failed payment retry with configurable attempts
- [ ] Product delivery timing configurable (after first, after all, after X payments)
- [ ] Minimum order value setting for installment eligibility
