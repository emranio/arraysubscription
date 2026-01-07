# Phase 3: Advanced Features & Flexibility

## 🎯 Goal
Add **advanced business features** that enable complex subscription models, better analytics, international support, and content/membership access control.

---

## 📦 Features Included

| # | Feature File | Priority | Description |
|---|--------------|----------|-------------|
| 1 | [upgrade-downgrade-crossgrade.md](upgrade-downgrade-crossgrade.md) | **High** | Plan switching with proration |
| 2 | [refunds.md](refunds.md) | **High** | Full, partial, and prorated refunds |
| 3 | [reports-analytics.md](reports-analytics.md) | **High** | MRR/ARR, churn, analytics in WooCommerce |
| 4 | [shipping-subscriptions.md](shipping-subscriptions.md) | **Medium** | One-time vs recurring shipping fees |
| 5 | [subscription-synchronization.md](subscription-synchronization.md) | **Medium** | Sync renewals to specific days |
| 6 | [multi-currency.md](multi-currency.md) | **Medium** | Multi-currency support for global stores |
| 7 | [restrict-access.md](restrict-access.md) | **High** | Membership/content gating by subscription |

---

## 🔗 Dependencies
- **Requires Phase 1 & 2** complete
- Builds on subscription statuses, My Account portal, and admin interfaces

---

## 🔧 Implementation Order

### Step 1: Upgrades, Downgrades & Crossgrades
1. Define switch paths configuration (admin)
2. Available switches display in My Account
3. Proration calculation engine:
   - Days remaining calculation
   - Credit for unused time
   - Charge for upgrade difference
4. Proration timing options:
   - Prorate immediately
   - Apply at next renewal
   - No proration
5. Create WooCommerce order for proration charge
6. Apply credit for downgrades
7. Update subscription to new product/variation
8. Maintain subscription continuity (same ID)
9. Email: Plan change confirmation
10. Quantity changes with proration

### Step 2: Refunds System
1. Refund from WooCommerce order (integrate with WC refunds)
2. Refund types:
   - Full refund
   - Partial refund (custom amount)
   - Line item refund
3. Prorated refund calculator (days unused)
4. Refund destination:
   - Original payment gateway
   - Store credit
5. Subscription status after refund options
6. Refund history per subscription
7. Refund reason/notes storage
8. Email: Refund confirmation

### Step 3: Reports & Analytics
1. Custom filters for WooCommerce Analytics:
   - Initial orders
   - Renewal orders
   - Failed renewals
2. Dedicated subscription reports section:
   - MRR (Monthly Recurring Revenue)
   - ARR (Annual Recurring Revenue)
   - Active subscribers count
   - Churn rate
   - New vs churned
3. Trend charts (MRR over time)
4. Trial conversion rate report
5. Payment recovery rate report
6. Revenue by product breakdown
7. Export reports to CSV
8. Non-payers / outstanding dues report

### Step 4: Subscription Shipping
1. Product meta: `_subscription_shipping_type` (one-time/recurring)
2. Different shipping for initial vs renewal
3. One-time shipping: $X first order, $0 renewals
4. Recurring shipping: Calculate each renewal
5. Display shipping terms on product page
6. Shipping address per subscription
7. Address change cutoff before renewal

### Step 5: Renewal Date Synchronization
1. Sync configuration (global and per-product):
   - Monthly: Sync day (1-28)
   - Weekly: Sync day (Mon-Sun)
   - Yearly: Sync date
2. Proration for sync:
   - Prorate first period to sync date
   - Or extend first period
3. Display sync date at checkout
4. Maintain sync through plan changes
5. Batch processing for synced renewals

### Step 6: Multi-Currency Support
1. Store currency at subscription creation
2. Renewals process in original currency
3. WPML WooCommerce Multilingual compatibility
4. WooCommerce Currency Switcher compatibility
5. Fixed prices per currency (product level)
6. Currency fallback if plugin deactivated
7. My Account shows amounts in original currency

### Step 7: Restrict Access (Content Gating)
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

---

## ✅ Phase 3 Testing Checklist

### Upgrade/Downgrade Tests
- [ ] Customer can view available plan switches
- [ ] Upgrade shows correct proration charge
- [ ] Downgrade shows credit amount
- [ ] Crossgrade (same price tier) works
- [ ] Monthly ↔ Annual crossgrade works
- [ ] Proration order created correctly
- [ ] Subscription switches to new product
- [ ] Subscription history maintained
- [ ] Quantity changes prorate correctly

### Refund Tests
- [ ] Full refund processes through gateway
- [ ] Partial refund processes correctly
- [ ] Prorated refund calculates accurately
- [ ] Store credit option works
- [ ] Subscription status can be set after refund
- [ ] Refund history visible per subscription
- [ ] Refund appears in WooCommerce orders

### Reports Tests
- [ ] WooCommerce Analytics filters by order type
- [ ] MRR calculated correctly
- [ ] ARR calculated correctly
- [ ] Active subscriber count accurate
- [ ] Churn rate calculates correctly
- [ ] Trial conversion rate tracked
- [ ] Reports export to CSV
- [ ] Date range filtering works

### Shipping Tests
- [ ] One-time shipping charges once
- [ ] Recurring shipping charges each renewal
- [ ] Different rates for initial vs renewal
- [ ] Shipping terms display on product page
- [ ] Address update per subscription works
- [ ] Address change cutoff enforced

### Synchronization Tests
- [ ] Can configure sync day per product
- [ ] Proration calculated to sync date
- [ ] Next renewal lands on sync day
- [ ] Sync maintained through plan changes
- [ ] Customer sees sync info at checkout

### Multi-Currency Tests
- [ ] Currency stored at purchase
- [ ] Renewals charge in original currency
- [ ] WPML integration works
- [ ] Currency Switcher integration works
- [ ] Fixed per-currency prices work
- [ ] My Account shows correct currency

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

---

## 🏗️ Technical Components

### New Meta Fields
- `_original_currency`
- `_sync_date`, `_sync_day`
- `_shipping_type`
- `_download_limit`, `_downloads_remaining`

### Database Tables (optional)
- `{prefix}_subscription_access_rules` - Content restriction rules
- `{prefix}_subscription_analytics` - Cached analytics data

### New Admin Pages
- Plan switching configuration
- Sync settings
- Content restriction rules manager
- Reports dashboard within WooCommerce Analytics

### WooCommerce Analytics Integration
- Custom data store for subscription metrics
- REST API extension for analytics data
- Chart.js or similar for visualizations

---

## 🚀 Deliverable

The plugin now supports sophisticated subscription businesses:
1. **SaaS model**: Customers upgrade from Basic ($29/mo) to Pro ($79/mo) with prorated billing
2. **Membership site**: Content gated by subscription tier, automatic role assignment
3. **Physical subscriptions**: Subscription boxes with shipping on each delivery
4. **Global business**: Customers in EUR, GBP, USD all supported
5. **Predictable billing**: All renewals on the 1st of month for easy forecasting
6. **Business insights**: MRR, churn, and conversion tracking in WooCommerce

---

## 📈 Success Metrics

- [ ] Plan switches process without errors
- [ ] Proration calculations accurate to the day
- [ ] MRR/ARR reports match manual calculations
- [ ] Content gating blocks unauthorized access
- [ ] Multi-currency renewals process correctly
- [ ] Synced renewals all fire on correct day
