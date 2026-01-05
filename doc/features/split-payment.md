# Split Payment / Installments

## Overview
Allow customers to pay for products in flexible installments, making high-value products more accessible. Split payments divide the total cost into scheduled payments over time.

---

## User Stories

### As a Store Admin
- I want to offer installment payment options for high-value products
- I want to configure how many installments customers can pay in
- I want to set the payment interval (weekly, bi-weekly, monthly)
- I want to define which products are eligible for split payments
- I want to charge interest or fees on installment plans (optional)
- I want to track installment progress and remaining payments
- I want to handle missed installment payments

### As a Customer
- I want to pay for expensive products in smaller, manageable installments
- I want to choose my preferred payment schedule at checkout
- I want to see exactly how much each installment will be
- I want to see my remaining installments and upcoming payment dates
- I want to pay off my remaining balance early if I choose

---

## Features

### Installment Configuration
- **Number of Installments**: Set how many payments (2, 3, 4, 6, 12, etc.)
- **Payment Interval**: Define frequency (weekly, bi-weekly, monthly)
- **Product Eligibility**: Enable split payment per product or globally
- **Minimum Order Value**: Set minimum cart value for installment eligibility
- **Down Payment**: Optional larger first payment

### Installment Calculation
- **Equal Installments**: Divide total evenly across payments
- **Interest/Fees**: Optional interest rate or flat fee for installment plans
- **Fee Display**: Show total cost with fees transparently

### Payment Schedule
- **Automatic Payments**: Charge saved payment method on schedule
- **Payment Reminders**: Notify customer before each installment due
- **Payment Tracking**: Show progress (e.g., "Payment 2 of 6 complete")

### Customer Experience
- **Checkout Display**: Show installment options and breakdown
- **Plan Selection**: Customer chooses installment plan at checkout
- **My Account View**: See installment schedule and payment history
- **Early Payoff**: Option to pay remaining balance at once

### Order & Invoice Handling
- **WooCommerce Orders**: Each installment creates a WooCommerce order
- **Installment Status**: Track which payments are complete/pending
- **Product Access**: Configure when customer gets product access:
  - Immediately after first payment
  - After all payments complete
  - After specific number of payments

---

## Example Scenarios

### Scenario 1: Monthly Installments
- Product Price: $600
- Installment Plan: 6 monthly payments
- Each Payment: $100/month
- Customer receives product after first payment

### Scenario 2: Split with Down Payment
- Product Price: $1,000
- Down Payment: $400 (40%)
- Remaining: 3 monthly payments of $200
- Customer receives product after down payment

---

## Acceptance Criteria

- [ ] Admin can enable split payment for specific products
- [ ] Configurable number of installments and interval
- [ ] Installment breakdown shown clearly at checkout
- [ ] Customer can select installment plan during checkout
- [ ] Each installment generates a WooCommerce order
- [ ] Automatic payment processing on scheduled dates
- [ ] Customer can view installment schedule in My Account
- [ ] Early payoff option available
- [ ] Missed payment handling (notifications, grace period)
- [ ] Optional interest/fees on installment plans
