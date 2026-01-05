# Manual Subscription Administration

## Overview
Enable administrators to manually create subscriptions, modify existing subscription products/variations, and perform administrative actions that bypass the normal customer checkout flow—essential for phone orders, migrations, customer service, and special arrangements.

---

## User Stories

### As a Store Admin
- I want to create a new subscription for a customer without going through checkout
- I want to assign a subscription to an existing customer or create a new customer
- I want to set custom pricing, billing cycle, and start date for manual subscriptions
- I want to change the product or variation of an existing subscription
- I want to swap a customer's subscription to a completely different product
- I want to skip the initial payment for special arrangements
- I want to import subscriptions from another system or plugin
- I want to adjust subscription details after creation (dates, amounts, cycles)

### As a Customer Service Rep
- I want to create subscriptions for phone orders
- I want to fix subscription issues by changing the associated product
- I want to honor special pricing agreements by creating custom subscriptions
- I want to migrate a customer from one plan to another manually

---

## Features

### Manual Subscription Creation

#### Create New Subscription
- **Select Customer**: Choose existing customer or create new
- **Select Product**: Pick any subscription product/variation
- **Custom Pricing**: Override default price if needed
- **Billing Cycle**: Set custom interval (daily, weekly, monthly, yearly)
- **Start Date**: Set when subscription begins (today, future date, or past date)
- **Next Payment Date**: Set first renewal date manually
- **Subscription Length**: Set duration or make unlimited

#### Payment Options for Manual Subscriptions
- **Charge Now**: Process initial payment immediately
- **Skip Initial Payment**: Start subscription without first charge
- **Invoice Customer**: Send invoice for customer to pay
- **Mark as Paid**: Record offline payment (cash, check, wire)
- **Free Subscription**: Create complimentary subscription

#### Additional Options
- **Apply Coupon**: Add discount code to manual subscription
- **Add Signup Fee**: Include or waive signup fee
- **Set Trial Period**: Add free trial to manual subscription
- **Add Notes**: Internal notes about why subscription was created manually

### Change Subscription Product/Variation

#### Product Swap
- Change subscription from Product A to Product B
- Swap between completely different subscription products
- Maintain subscription history and continuity
- Choose effective date (immediate or next renewal)

#### Variation Change
- Switch between variations of same product (e.g., Small → Large)
- Change subscription tier (Basic → Pro → Enterprise)
- Update attributes (color, size, duration, etc.)

#### Pricing on Product Change
- **Keep Original Price**: Honor existing pricing
- **Use New Product Price**: Apply new product's price
- **Custom Price**: Set specific price for this customer
- **Prorate Difference**: Calculate and charge/credit difference

### Subscription Modifications

#### Edit Subscription Details
- Change renewal date
- Modify subscription amount
- Adjust billing cycle/interval
- Update subscription end date
- Change subscription status

#### Bulk Operations
- Create multiple subscriptions at once
- Import subscriptions from CSV
- Bulk product/variation changes
- Mass date adjustments

### Migration Support

#### Import from Other Systems
- Import subscriptions from other plugins
- Migrate from external subscription platforms
- Map fields from import file
- Validate imported data before creation

#### Data Mapping
- Customer matching (by email, ID)
- Product matching
- Status mapping
- Date format handling

---

## Admin Interface

### Manual Subscription Creation Page
Located in: **WooCommerce > Subscriptions > Add New**

1. **Customer Section**
   - Search existing customers
   - Create new customer inline
   - Display customer's existing subscriptions

2. **Product Section**
   - Product search/selection
   - Variation selector (if variable product)
   - Quantity selector
   - Price override field

3. **Schedule Section**
   - Start date picker
   - Billing cycle selector
   - Next payment date
   - End date (optional)

4. **Payment Section**
   - Payment action (charge, skip, invoice, mark paid)
   - Payment method selection
   - Amount confirmation

5. **Notes Section**
   - Internal admin notes
   - Reason for manual creation

### Change Product Interface
Located in: **Subscription Detail > Actions > Change Product**

1. **Current Product Display**
   - Show current product/variation
   - Current pricing

2. **New Product Selection**
   - Search/select new product
   - Select variation if applicable

3. **Pricing Options**
   - Keep original price
   - Use new product price
   - Enter custom price
   - Show price difference

4. **Effective Date**
   - Immediate change
   - Next renewal
   - Custom date

---

## Use Cases

### Use Case 1: Phone Order
- Customer calls to subscribe
- Admin creates subscription manually
- Enters customer payment info
- Processes payment and activates subscription

### Use Case 2: Migration from Competitor
- Customer switching from another service
- Admin creates subscription with past start date
- Honors remaining time from previous service
- Skips initial payment (credit for migration)

### Use Case 3: Product Discontinuation
- Product A being discontinued
- Admin changes all Product A subscriptions to Product B
- Customers maintain same pricing (grandfathered)
- Email notification sent about change

### Use Case 4: Special Corporate Deal
- Company wants 100 subscriptions at custom price
- Admin creates subscriptions in bulk
- Applies corporate discount
- Sets annual billing with NET 30 invoicing

---

## Acceptance Criteria

- [ ] Admin can create new subscription from admin panel
- [ ] Customer can be selected or created during manual creation
- [ ] Any subscription product/variation can be selected
- [ ] Custom pricing can be set for manual subscriptions
- [ ] Start date and billing cycle are configurable
- [ ] Initial payment can be skipped for special cases
- [ ] Admin can change product/variation of existing subscription
- [ ] Product swap maintains subscription continuity and history
- [ ] Pricing options available when changing products
- [ ] Effective date can be set for product changes
- [ ] Bulk subscription creation supported
- [ ] CSV import for subscription migration available
- [ ] All manual actions logged in subscription activity
- [ ] Admin notes can be added to manual subscriptions
