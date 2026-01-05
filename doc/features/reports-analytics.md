# Reports & Analytics Dashboard

## Overview
Comprehensive subscription analytics and reporting integrated into WooCommerce's native reporting system, with custom filters to distinguish subscription orders and dedicated subscription metrics.

---

## User Stories

### As a Store Admin
- I want to see subscription revenue separate from one-time sales
- I want to track Monthly Recurring Revenue (MRR) and Annual Recurring Revenue (ARR)
- I want to see subscription growth trends over time
- I want to identify churn rate and cancellation patterns
- I want to filter WooCommerce reports to show only renewal orders
- I want to view subscription-specific reports in WooCommerce Analytics
- I want to export subscription reports for analysis
- I want to track trial-to-paid conversion rates

### As a Business Owner
- I want to forecast recurring revenue
- I want to understand subscriber lifetime value
- I want to identify my most popular subscription products
- I want to see payment failure rates and recovery success
- I want to compare subscription performance month-over-month

---

## Features

### WooCommerce Analytics Integration

#### Custom Filters for WooCommerce Reports
Add filters to all WooCommerce reporting pages to segment by order type:
- **Initial Subscription Orders**: First subscription purchase
- **Renewal Orders**: Recurring payment orders
- **Failed Renewal Orders**: Unsuccessful payment attempts
- **All Subscription Orders**: Combined subscription revenue
- **Non-Subscription Orders**: Regular WooCommerce orders

These filters apply to:
- WooCommerce > Analytics > Revenue
- WooCommerce > Analytics > Orders
- WooCommerce > Analytics > Products
- WooCommerce > Analytics > Categories
- All other WooCommerce Analytics pages

### Dedicated Subscription Reports
New reports section in WooCommerce Analytics menu:

#### Revenue Metrics
- **MRR (Monthly Recurring Revenue)**: Current monthly subscription revenue
- **ARR (Annual Recurring Revenue)**: Projected annual subscription revenue
- **Net Revenue**: Total after refunds and chargebacks
- **Refund Impact on MRR/ARR**: Track how refunds reduce net recurring revenue (see [Refunds](refunds.md))
- **Revenue by Product**: Breakdown by subscription product
- **Revenue Growth**: Month-over-month and year-over-year trends

#### Subscriber Metrics
- **Total Active Subscribers**: Current active subscription count
- **New Subscribers**: New subscriptions in period
- **Churned Subscribers**: Cancellations in period
- **Churn Rate**: Percentage of subscribers lost
- **Subscriber Growth**: Net subscriber change over time

#### Subscription Lifecycle
- **Trials Active**: Current trial subscriptions
- **Trial Conversions**: Trials converted to paid
- **Conversion Rate**: Trial-to-paid percentage
- **Upgrades/Downgrades**: Plan changes in period
- **Reactivations**: Cancelled subscriptions restarted

#### Payment Metrics
- **Successful Renewals**: Successful payment count and value
- **Failed Renewals**: Failed payment count and value
- **Recovery Rate**: Failed payments subsequently collected
- **Payment Method Distribution**: Breakdown by gateway

### Report Visualizations
- **Charts & Graphs**: Visual representation of trends
- **Comparison Views**: Compare periods side-by-side
- **Data Tables**: Detailed tabular data
- **KPI Cards**: Key metrics at a glance

### Data Export
- Export reports to CSV
- Filter exports by date range
- Include custom date ranges
- Scheduled report exports (optional)

---

## Key Metrics Definitions

| Metric | Definition |
|--------|------------|
| MRR | Sum of all active subscription amounts normalized to monthly |
| ARR | MRR × 12 |
| Churn Rate | (Cancelled subscriptions ÷ Total subscriptions) × 100 |
| Conversion Rate | (Converted trials ÷ Total trials) × 100 |
| LTV | Average revenue per subscriber over lifetime |
| Recovery Rate | (Recovered failed payments ÷ Total failed) × 100 |

---

## Acceptance Criteria

- [ ] Custom filters added to all WooCommerce Analytics pages
- [ ] Filter by: Initial, Renewal, Failed, All Subscription orders
- [ ] Dedicated subscription reports section in WooCommerce Analytics
- [ ] MRR and ARR calculations displayed
- [ ] Active subscriber count visible
- [ ] Churn rate calculated and displayed
- [ ] Trial conversion rate tracked
- [ ] Revenue trends visualized with charts
- [ ] All reports exportable to CSV
- [ ] Reports use WooCommerce Analytics UI patterns
