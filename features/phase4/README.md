# Phase 4: Premium & Specialized Features

## 🎯 Goal
Add **premium features** for specialized use cases: subscription bundles, installment payments, donations, gifting, split payments, migration tools, and developer APIs.

---

## 📦 Features Included

| # | Feature File | Priority | Description |
|---|--------------|----------|-------------|
| 1 | [subscription-bundle.md](subscription-bundle.md) | **High** | Curated bundles, build-your-own boxes |
| 2 | [installments.md](installments.md) | **Medium** | Pay for products in scheduled payments |
| 3 | [donations.md](donations.md) | **Medium** | One-time & recurring donations |
| 4 | [gifting-transfer-subscription.md](gifting-transfer-subscription.md) | **Medium** | Gift subscriptions, transfer ownership |
| 5 | [split-payment.md](split-payment.md) | **Low** | Split subscription cost between people |
| 6 | [subscription-import-migration.md](subscription-import-migration.md) | **High** | WooCommerce Subscriptions migration, CSV import |
| 7 | [rest-api.md](rest-api.md) | **High** | Full REST API for integrations |
| 8 | [feature-manager.md](feature-manager.md) | **Medium** | Define & display product entitlements |

---

## 🔗 Dependencies
- **Requires Phase 1, 2 & 3** complete
- Full subscription system with all lifecycle features in place

---

## 🔧 Implementation Order

### Step 1: Subscription Bundles
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

### Step 2: Installment Payments
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

### Step 3: Donations
1. Product setting: "Enable Donation" (mutually exclusive)
2. Predefined amount buttons ($10, $25, $50, $100)
3. Custom amount with min/max validation
4. One-time vs recurring donation toggle
5. Recurring donation uses subscription billing
6. Donor sees donation in My Account
7. Standard WooCommerce order/receipt

### Step 4: Gifting & Transfer
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

### Step 5: Split Payment (Cost Sharing)
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

### Step 6: Import & Migration
1. **WooCommerce Subscriptions Migration**:
   - Auto-detect existing WCS data
   - Migration wizard with summary
   - Payment token preservation (Stripe, PayPal)
   - Status mapping
   - Related orders linking
   - Rollback capability
   - Batch processing for large stores
2. **CSV Import**:
   - Field mapping interface
   - Customer matching (email, ID)
   - Product matching (SKU, ID)
   - Validation before commit
   - Error reporting
   - Skip invalid rows option

### Step 7: REST API
1. **Subscription Endpoints**:
   - `GET /subscriptions` - List with filters
   - `GET /subscriptions/{id}` - Single subscription
   - `POST /subscriptions` - Create new
   - `PUT /subscriptions/{id}` - Update
   - `DELETE /subscriptions/{id}` - Cancel
2. **Related Endpoints**:
   - `GET /subscriptions/{id}/orders` - Related orders
   - `GET /customers/{id}/subscriptions` - Customer's subscriptions
3. **Action Endpoints**:
   - `POST /subscriptions/{id}/pause`
   - `POST /subscriptions/{id}/resume`
   - `POST /subscriptions/{id}/renew`
4. **Webhooks**:
   - subscription.created
   - subscription.updated
   - subscription.cancelled
   - subscription.renewed
   - subscription.payment_failed
5. Authentication via WooCommerce API keys

### Step 8: Feature Manager
1. Product meta box: "Feature Manager" tab
2. Feature table UI:
   - Feature name
   - Value type (toggle, number, text)
   - Value
   - Enabled toggle
3. Save features as product meta
4. Feature templates for quick setup
5. Customer My Account > Features section:
   - Show entitled features based on active subscriptions
   - Feature aggregation across multiple subscriptions
6. Optional: Product page feature list display

---

## ✅ Phase 4 Testing Checklist

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

### Donation Tests
- [ ] Can create donation product
- [ ] Predefined amounts display
- [ ] Custom amount with validation
- [ ] One-time donation creates order
- [ ] Recurring donation creates subscription
- [ ] Donor can cancel recurring from My Account

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

### Import/Migration Tests
- [ ] WCS migration detects existing data
- [ ] Migration wizard shows summary
- [ ] Stripe tokens preserved
- [ ] PayPal profiles preserved
- [ ] Statuses mapped correctly
- [ ] Rollback works
- [ ] CSV import maps fields
- [ ] Validation catches errors
- [ ] Batch processing works for large imports

### REST API Tests
- [ ] List subscriptions endpoint works
- [ ] Single subscription endpoint works
- [ ] Create subscription via API
- [ ] Update subscription via API
- [ ] Cancel subscription via API
- [ ] Customer subscriptions endpoint works
- [ ] Action endpoints (pause, resume, renew) work
- [ ] Webhooks fire on events
- [ ] Authentication required

### Feature Manager Tests
- [ ] Can add features to product
- [ ] All value types work (toggle, number, text)
- [ ] Features saved correctly
- [ ] Templates can be created and applied
- [ ] Customer sees entitled features in My Account
- [ ] Feature aggregation works

---

## 🏗️ Technical Components

### New Product Types/Settings
- Subscription Bundle product type
- Enable Installment checkbox
- Enable Donation checkbox
- Enable Gift toggle

### New Post Types
- `installment_plan` - Track installment schedules
- `gift_subscription` - Track gift/claim status

### New Meta Fields
- Bundle: `_bundle_contents`, `_eligible_products`, `_bundle_price_type`
- Installment: `_installment_count`, `_installment_interval`, `_installment_fee`
- Gift: `_gift_recipient_email`, `_gift_message`, `_gift_claimed`
- Split: `_split_participants`, `_split_type`, `_split_amounts`
- Features: `_product_features` (serialized array)

### REST API
- Extend WooCommerce REST API v3
- Custom controllers for subscription endpoints
- Webhook handlers

### Migration System
- Background processor for large migrations
- Token migration utilities per gateway
- Rollback data storage

---

## 🚀 Deliverable

The complete Array Subscription plugin with all premium features:

1. **Subscription Boxes**: Build-your-own snack box with monthly customization
2. **Buy Now Pay Later**: $1200 laptop in 6 monthly payments of $200
3. **Nonprofit**: Accept one-time and monthly donations
4. **Gift Memberships**: Buy a year of Premium for a friend
5. **Family Plans**: Split the $29/mo cost between 3 roommates
6. **Easy Migration**: Switch from WooCommerce Subscriptions in one click
7. **Integrations**: Full REST API for mobile apps, CRMs, and external systems
8. **Entitlements**: Show customers exactly what features they get

---

## 📈 Success Metrics

- [ ] Migration preserves 100% of payment tokens
- [ ] API endpoints respond < 500ms
- [ ] Bundles handle 50+ eligible products
- [ ] Installment tracking accurate across payments
- [ ] Gift claim rate trackable
- [ ] Split payment scenarios all resolve correctly
- [ ] Feature Manager displays correctly for complex setups

---

## 🎉 Phase 4 Completion = Full Product Launch

After Phase 4, Array Subscription is feature-complete and ready for:
- Public release
- AppSumo launch
- Enterprise customers
- Third-party integrations
