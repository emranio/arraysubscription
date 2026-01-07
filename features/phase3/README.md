# Phase 3: Advanced Features & Content Access

## 🎯 Goal
Add **advanced business features** for physical subscription products, content gating, and specialized subscription models.

---

## 📦 Features Included (6 features)

| # | Feature File | Priority | Description |
|---|--------------|----------|-------------|
| 1 | [restrict-access.md](restrict-access.md) | **High** | Membership/content gating by subscription |
| 2 | [shipping-subscriptions.md](shipping-subscriptions.md) | **Medium** | One-time vs recurring shipping fees |
| 3 | [subscription-bundle.md](subscription-bundle.md) | **High** | Curated bundles, build-your-own boxes |
| 4 | [installments.md](installments.md) | **Medium** | Pay for products in scheduled payments |
| 5 | [gifting-transfer-subscription.md](gifting-transfer-subscription.md) | **Medium** | Gift subscriptions, transfer ownership |
| 6 | [split-payment.md](split-payment.md) | **Low** | Split subscription cost between people |

---

## 🔗 Dependencies
- **Requires Phase 1 & 2** complete
- Builds on subscription statuses, My Account portal, and admin interfaces

---

## 🔧 Implementation Order

### Step 1: Restrict Access (Content Gating)
1. **Role Assignment**:
   - Map subscription products to WordPress roles
   - Add role on subscription active
   - Remove role on cancel/expire
2. **URL Pattern Restrictions**:
   - Protect `/members/*` paths
   - Redirect or show message for non-subscribers
3. **CPT & Taxonomy Restrictions**:
   - Restrict entire post types
   - Restrict by category/tag
   - Restrict specific posts
4. **Content Gating**:
   - Shortcode: `[as_restrict status="active"]...[/as_restrict]`
   - Gutenberg block for restricted content
5. **Downloadable Products**:
   - Grant/revoke access based on status
   - Per-period download limits
   - Reset limits on renewal
6. **Payment Method Restrictions**:
   - Hide manual payment methods for subscriptions
   - Require auto-billing gateways

### Step 2: Subscription Shipping
1. Product meta: `_subscription_shipping_type` (one-time/recurring)
2. Different shipping for initial vs renewal
3. One-time shipping: $X first order, $0 renewals
4. Recurring shipping: Calculate each renewal
5. Display shipping terms on product page
6. Shipping address per subscription
7. Address change cutoff before renewal

### Step 3: Subscription Bundles
1. **Cart/Checkout Settings**:
   - Single subscription mode (one-click checkout)
   - Multiple subscriptions mode (bundle at checkout)
   - Skip cart option for subscriptions
2. **Bundle Product Type**:
   - Create subscription bundle product
   - Define eligible products for bundle
   - Min/max items configuration
3. **Bundle Pricing**:
   - Fixed price bundles
   - Dynamic price (sum of components)
   - Tiered pricing by size
4. **Customer Bundle Customization**:
   - Product selection interface
   - Save preferences
   - Modification window before cutoff
5. **Renewal Behavior**:
   - Same contents or allow changes
   - Synchronized renewal for all items
   - Single invoice for bundle

### Step 4: Installment Payments
1. Product setting: "Enable Installments" (mutually exclusive with subscription)
2. Configuration per product:
   - Number of installments (2, 3, 4, 6, 12)
   - Payment interval (weekly, bi-weekly, monthly)
   - Optional fee (flat or percentage)
   - Delivery timing (after 1st payment, all payments, or X payments)
3. Checkout display:
   - Full price vs installment comparison
   - Payment schedule preview
4. Installment tracking:
   - Separate WooCommerce order per payment
   - Link all orders to original purchase
   - My Account installment view
5. Early payoff option
6. Failed payment handling

### Step 5: Gifting & Transfer
1. **Gift Purchase**:
   - "Buy as gift" toggle on product page
   - Recipient email/name input
   - Optional gift message
   - Claim flow via email link
   - Gift status tracking (pending/claimed)
2. **Transfer Subscription**:
   - Transfer from My Account or admin
   - Recipient email verification
   - Immediate or next renewal transfer
   - Activity log entry
   - Transfer limits (e.g., once per 90 days)
3. **Payment Method Handling**:
   - Keep original payer's method
   - Or require recipient to add method

### Step 6: Split Payment (Cost Sharing)
1. Enable split for specific products
2. Number of participants (2-10)
3. Split types:
   - Equal split
   - Custom amounts
   - Percentage split
4. Invitation flow:
   - Primary subscriber invites others
   - Participants receive email with payment link
   - Each completes their payment
5. Separate WooCommerce orders per participant
6. Renewal creates orders for all participants
7. Status depends on all payments succeeding
8. Handle partial payment scenarios

---

## ✅ Phase 3 Testing Checklist

### Restrict Access Tests
- [ ] Role assigned on subscription active
- [ ] Role removed on cancel/expire
- [ ] URL restrictions block non-subscribers
- [ ] CPT restrictions work
- [ ] Taxonomy restrictions work
- [ ] Shortcode shows/hides content correctly
- [ ] Download access tied to subscription status
- [ ] Download limits reset on renewal
- [ ] Manual payment methods hidden for subscriptions

### Shipping Tests
- [ ] One-time shipping charges once
- [ ] Recurring shipping charges each renewal
- [ ] Different rates for initial vs renewal
- [ ] Shipping terms display on product page
- [ ] Address update per subscription works
- [ ] Address change cutoff enforced

### Bundle Tests
- [ ] Can create subscription bundle product
- [ ] Eligible products configurable
- [ ] Min/max items enforced
- [ ] Customer can customize bundle contents
- [ ] Bundle price calculates correctly
- [ ] Modification cutoff works
- [ ] All items renew together
- [ ] Single renewal invoice generated
- [ ] Cart bundling combines multiple subscriptions

### Installment Tests
- [ ] Can enable installments on product
- [ ] Number of installments configurable
- [ ] Fee calculates correctly
- [ ] Checkout shows installment breakdown
- [ ] Separate orders per payment
- [ ] Orders linked together
- [ ] My Account shows installment progress
- [ ] Early payoff works
- [ ] Failed payment handled appropriately

### Gifting Tests
- [ ] Gift toggle on product page
- [ ] Recipient details captured
- [ ] Invitation email sent
- [ ] Recipient can claim gift
- [ ] Gift status tracked
- [ ] Transfer subscription works
- [ ] Transfer limits enforced
- [ ] Activity logged

### Split Payment Tests
- [ ] Can enable split for product
- [ ] Invitation flow works
- [ ] Each participant gets separate order
- [ ] Renewal creates multiple orders
- [ ] Subscription active when all paid
- [ ] Handles partial payment scenarios

---

## 🏗️ Technical Components

### New Product Types/Settings
- Subscription Bundle product type
- Enable Installment checkbox
- Enable Gift toggle

### New Post Types
- `installment_plan` - Track installment schedules
- `gift_subscription` - Track gift/claim status

### New Meta Fields
- Bundle: `_bundle_contents`, `_eligible_products`, `_bundle_price_type`
- Installment: `_installment_count`, `_installment_interval`, `_installment_fee`
- Gift: `_gift_recipient_email`, `_gift_message`, `_gift_claimed`
- Split: `_split_participants`, `_split_type`, `_split_amounts`
- Shipping: `_subscription_shipping_type`

### Database Tables
- `{prefix}_subscription_access_rules` - Content restriction rules

---

## 🚀 Deliverable

The plugin now supports sophisticated subscription businesses:
1. **Membership site**: Content gated by subscription tier, automatic role assignment
2. **Physical subscriptions**: Subscription boxes with shipping on each delivery
3. **Subscription Boxes**: Build-your-own snack box with monthly customization
4. **Buy Now Pay Later**: $1200 laptop in 6 monthly payments of $200
5. **Gift Memberships**: Buy a year of Premium for a friend
6. **Family Plans**: Split the $29/mo cost between 3 roommates

---

## 📈 Success Metrics

- [ ] Content gating blocks unauthorized access
- [ ] Bundles handle 50+ eligible products
- [ ] Installment tracking accurate across payments
- [ ] Gift claim rate trackable
- [ ] Split payment scenarios all resolve correctly
