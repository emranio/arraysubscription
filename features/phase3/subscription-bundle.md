# Subscription Bundle

## Overview
Allow customers to subscribe to curated product bundles where they can customize the contents, or create their own bundles by adding multiple subscription products to cart. Perfect for snack boxes, beauty boxes, wine clubs, multi-product subscriptions, and other curated subscription services.

**WooCommerce Integration:** Bundles use WooCommerce's standard cart and checkout flow. When multiple subscriptions are bundled, they're synchronized to renew together, with each renewal creating a single WooCommerce order containing all bundled items.

### Bundle Types & Product Type Support

There are two ways to create subscription bundles:

| Bundle Type | Created By | WooCommerce Product Type | Description |
|-------------|------------|-------------------------|-------------|
| **Admin-Created Bundle** | Store Admin | Grouped Product | Admin creates a grouped product containing subscription items |
| **Customer-Created Bundle** | Customer | Cart Bundling | Customer adds multiple subscriptions to cart, bundled at checkout |

#### WooCommerce Product Types
WooCommerce has 4 product types: **Simple**, **Variable**, **Grouped**, and **External/Affiliate**.

| Product Type | As Bundle Container | As Bundle Item | Notes |
|--------------|--------------------|--------------------|-------|
| **Simple** | ✗ | ✓ | Can be included in bundles |
| **Variable** | ✗ | ✓ | Variations can be included in bundles |
| **Grouped** | ✓ Admin bundles | ✗ | Admin uses grouped products to create curated bundles |
| **External** | ✗ | ✗ | Not supported |

> **Note:** Admin-created bundles use WooCommerce's native **Grouped Product** type. Customer-created bundles are formed dynamically at checkout by adding multiple subscription items to cart.

---

## User Stories

### As a Store Admin
- I want to create subscription bundles with multiple products
- I want to let customers choose which products go in their bundle
- I want to set a maximum number of items allowed in each bundle
- I want to define which products are eligible for subscription bundles
- I want to set bundle pricing (fixed price or based on contents)
- I want to manage bundle deliveries and fulfillment schedules
- I want to let customers modify their bundle contents before each delivery
- I want to enable/disable customers adding multiple subscriptions to cart as a bundle
- I want to control checkout behavior (one-click vs standard cart flow)
- I want to choose whether customers can buy single or multiple subscription items

### As a Customer
- I want to subscribe to a product bundle with my favorite items
- I want to customize which products are included in my bundle
- I want to change my bundle contents before each renewal
- I want to see what's in my upcoming bundle
- I want to set preferences for automatic bundle curation
- I want to skip a bundle delivery if I don't need it
- I want to add multiple subscription products to my cart and have them renew together

---

## Features

### Admin Checkout & Cart Settings

#### Subscription Cart Behavior
- **Single Subscription Mode**: Only one subscription product allowed in cart at a time (direct to checkout)
- **Multiple Subscriptions Mode**: Allow multiple subscription products in cart
- **Bundle on Checkout**: When multiple subscriptions are in cart, combine them into a single bundle with synchronized renewals

#### One-Click Checkout
- **Enable/Disable**: Toggle one-click checkout for subscription products
- **Skip Cart**: Subscription products go directly to checkout, bypassing cart
- **Buy Now Button**: Replace "Add to Cart" with "Subscribe Now" for direct checkout
- **Reduce Friction**: Minimize steps for subscription purchases

#### Cart Restrictions
- **Subscription-Only Cart**: Option to prevent mixing subscriptions with one-time products
- **Single Item Limit**: Limit cart to one subscription product (forces one-click flow)
- **Multiple Items Allowed**: Allow multiple subscription products, bundled at checkout

### Bundle Configuration (Admin)
- **Create Subscription Bundle**: Define a bundle product with customizable contents
- **Eligible Products**: Select which products can be included in bundles
- **Bundle Limits**: Set minimum and maximum number of items per bundle
- **Pricing Models**:
  - Fixed price regardless of contents
  - Price based on selected products
  - Tiered pricing by bundle size
- **Bundle Categories**: Organize bundles by type (starter, premium, custom)

### Customer-Created Bundles (Cart Bundling)
When admin enables "Bundle on Checkout":
- **Add Multiple Subscriptions**: Customer adds several subscription products to cart
- **Automatic Bundling**: All cart subscriptions become one bundle at checkout
- **Synchronized Renewals**: All items in bundle renew on the same date
- **Single Payment**: One charge for entire bundle on each renewal
- **Bundle Management**: Customer manages entire bundle from My Account

#### How Cart Bundling Works
1. Customer adds Subscription Product A to cart
2. Customer adds Subscription Product B to cart
3. Customer adds Subscription Product C to cart
4. At checkout, all three become a single "Subscription Bundle"
5. All items renew together on the same billing cycle
6. Customer receives one invoice for all bundled items

### Customer Bundle Customization
- **Product Selection**: Choose items from eligible product catalog
- **Quantity Selection**: Set quantity of each item within limits
- **Bundle Preview**: See bundle contents and total before checkout
- **Preference Saving**: Save preferences for future bundles
- **Modification Window**: Edit bundle contents before cutoff date

### Bundle Management
- **Upcoming Bundle View**: Customer sees what's in next delivery
- **Edit Contents**: Modify selections before delivery cutoff
- **Skip Delivery**: Option to skip a bundle and delay next charge
- **Pause Bundle**: Temporarily pause bundle subscription
- **Add/Remove Items**: Add new products or remove existing from bundle (if admin allows)

### Fulfillment & Delivery
- **Delivery Schedule**: Set bundle shipping dates (1st of month, etc.)
- **Cutoff Dates**: Define deadline for bundle modifications
- **Synchronized Deliveries**: Ship all bundles on same day for efficiency
- **Shipping Label Generation**: Support for batch shipping

### Bundle Lifecycle
- **Initial Setup**: Customer creates first bundle during checkout
- **Recurring Bundles**: Automatic renewal with same or updated contents
- **Modification Period**: Window to change contents each cycle
- **Fulfillment**: Bundle prepared and shipped after cutoff
- **Next Cycle**: Process repeats

---

## Admin Settings

### Checkout Behavior Settings
Located in: **Array Subscription > Settings > Checkout**

| Setting | Options | Description |
|---------|---------|-------------|
| Subscription Cart Mode | Single / Multiple | Allow one or multiple subscriptions in cart |
| One-Click Checkout | Enable / Disable | Skip cart for subscription products |
| Bundle at Checkout | Enable / Disable | Combine multiple cart subscriptions into bundle |

### Bundle Product Settings
Located in: **Product Edit > Subscription Bundle tab**

- Enable as subscription bundle
- Select eligible products
- Set min/max items
- Choose pricing model
- Set modification cutoff days

---

## Example Scenarios

### Scenario 1: Snack Bundle Subscription
- Bundle includes up to 10 snack items
- Customer chooses from 50 available snacks
- $29.99/month fixed price
- Modify selections by the 25th for next month's bundle
- Ships on the 1st of each month

### Scenario 2: Build Your Own Beauty Bundle
- Choose 5 beauty products
- Price varies based on selected products ($35-$75)
- Monthly or quarterly delivery options
- Skip any month without canceling

### Scenario 3: Customer-Created Bundle (Cart Bundling)
- Admin enables "Bundle at Checkout"
- Customer adds "Vitamin D" subscription ($15/mo) to cart
- Customer adds "Omega-3" subscription ($20/mo) to cart
- Customer adds "Multivitamin" subscription ($25/mo) to cart
- At checkout: Single bundle at $60/mo
- All three products renew together monthly

### Scenario 4: One-Click Subscription
- Admin enables one-click checkout
- Customer clicks "Subscribe Now" on product page
- Taken directly to checkout (no cart page)
- Faster conversion, reduced abandonment

---

## Acceptance Criteria

### Bundle Products
- [ ] Admin can create subscription bundle products
- [ ] Admin can define eligible products for bundles
- [ ] Admin can set item limits (min/max)
- [ ] Customer can select products for their bundle
- [ ] Customer can modify bundle before each delivery
- [ ] Customer can view upcoming bundle contents
- [ ] Customer can skip a delivery
- [ ] Bundle cutoff date prevents late modifications
- [ ] Bundle generates WooCommerce order for fulfillment
- [ ] Multiple pricing models supported

### Cart & Checkout Settings
- [ ] Admin can enable/disable single subscription mode
- [ ] Admin can enable/disable one-click checkout
- [ ] Admin can enable/disable cart bundling
- [ ] One-click checkout bypasses cart page
- [ ] Multiple cart subscriptions combine into bundle when enabled
- [ ] Bundled subscriptions have synchronized renewal dates
- [ ] Customer receives single invoice for bundled subscriptions
- [ ] Customer can manage entire bundle from My Account
