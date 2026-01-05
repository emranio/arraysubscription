# Subscription Box

## Overview
Allow customers to subscribe to curated product boxes where they can customize the contents. Perfect for snack boxes, beauty boxes, wine clubs, and other curated subscription services.

---

## User Stories

### As a Store Admin
- I want to create subscription boxes with multiple products
- I want to let customers choose which products go in their box
- I want to set a maximum number of items allowed in each box
- I want to define which products are eligible for subscription boxes
- I want to set box pricing (fixed price or based on contents)
- I want to manage box deliveries and fulfillment schedules
- I want to let customers modify their box contents before each delivery

### As a Customer
- I want to subscribe to a product box with my favorite items
- I want to customize which products are included in my box
- I want to change my box contents before each renewal
- I want to see what's in my upcoming box
- I want to set preferences for automatic box curation
- I want to skip a box delivery if I don't need it

---

## Features

### Box Configuration (Admin)
- **Create Subscription Box**: Define a box product with customizable contents
- **Eligible Products**: Select which products can be included in boxes
- **Box Limits**: Set minimum and maximum number of items per box
- **Pricing Models**:
  - Fixed price regardless of contents
  - Price based on selected products
  - Tiered pricing by box size
- **Box Categories**: Organize boxes by type (starter, premium, custom)

### Customer Box Customization
- **Product Selection**: Choose items from eligible product catalog
- **Quantity Selection**: Set quantity of each item within limits
- **Box Preview**: See box contents and total before checkout
- **Preference Saving**: Save preferences for future boxes
- **Modification Window**: Edit box contents before cutoff date

### Box Management
- **Upcoming Box View**: Customer sees what's in next delivery
- **Edit Contents**: Modify selections before delivery cutoff
- **Skip Delivery**: Option to skip a box and delay next charge
- **Pause Box**: Temporarily pause box subscription

### Fulfillment & Delivery
- **Delivery Schedule**: Set box shipping dates (1st of month, etc.)
- **Cutoff Dates**: Define deadline for box modifications
- **Synchronized Deliveries**: Ship all boxes on same day for efficiency
- **Shipping Label Generation**: Support for batch shipping

### Box Lifecycle
- **Initial Setup**: Customer creates first box during checkout
- **Recurring Boxes**: Automatic renewal with same or updated contents
- **Modification Period**: Window to change contents each cycle
- **Fulfillment**: Box prepared and shipped after cutoff
- **Next Cycle**: Process repeats

---

## Example Scenarios

### Scenario 1: Snack Box Subscription
- Box includes up to 10 snack items
- Customer chooses from 50 available snacks
- $29.99/month fixed price
- Modify selections by the 25th for next month's box
- Ships on the 1st of each month

### Scenario 2: Build Your Own Beauty Box
- Choose 5 beauty products
- Price varies based on selected products ($35-$75)
- Monthly or quarterly delivery options
- Skip any month without canceling

---

## Acceptance Criteria

- [ ] Admin can create subscription box products
- [ ] Admin can define eligible products for boxes
- [ ] Admin can set item limits (min/max)
- [ ] Customer can select products for their box
- [ ] Customer can modify box before each delivery
- [ ] Customer can view upcoming box contents
- [ ] Customer can skip a delivery
- [ ] Box cutoff date prevents late modifications
- [ ] Box generates WooCommerce order for fulfillment
- [ ] Multiple pricing models supported
