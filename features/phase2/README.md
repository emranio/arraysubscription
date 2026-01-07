# Phase 2: Subscription Lifecycle & Retention

## 🎯 Goal
Enhance the subscription system with **lifecycle management features** that improve customer experience, reduce churn, and give administrators more control over subscription handling.

---

## 📦 Features Included (7 features)

| # | Feature File | Priority | Description |
|---|--------------|----------|-------------|
| 1 | [payment-retry-recovery.md](payment-retry-recovery.md) | **Critical** | Failed payment retry logic, dunning, grace periods |
| 2 | [cancellation-reasons-retention-offers.md](cancellation-reasons-retention-offers.md) | **High** | Cancellation flow, reasons collection, retention offers |
| 3 | [skip-next-renewal-vacation-mode.md](skip-next-renewal-vacation-mode.md) | **Medium** | Skip renewal, pause/resume subscriptions |
| 4 | [upgrade-downgrade-crossgrade.md](upgrade-downgrade-crossgrade.md) | **High** | Plan switching with proration |
| 5 | [refunds.md](refunds.md) | **High** | Full, partial, and prorated refunds |
| 6 | [subscription-synchronization.md](subscription-synchronization.md) | **Medium** | Sync renewals to specific days |
| 7 | [multi-currency.md](multi-currency.md) | **Medium** | Multi-currency support for global stores |

---

## 🔗 Dependencies
- **Requires Phase 1** complete
- Builds on core subscription CPT, billing engine, and My Account portal

---

## 🔧 Implementation Order

### Step 1: Payment Retry & Recovery (Dunning)
1. Failed payment status handling
2. Retry configuration settings:
   - Number of retries (e.g., 3)
   - Retry intervals (e.g., Day 1, 3, 7)
3. Scheduled retry actions
4. Grace period before suspension
5. Email: "Payment failed" notification
6. Email: "Retry scheduled" notification
7. Email: "Final warning" before suspension
8. Customer link to update payment method
9. Recovery rate tracking
10. Admin: Manual retry button

### Step 2: Cancellation Flow & Retention
1. Cancellation reason selector in My Account
2. Admin-configurable reason list
3. Optional custom reason text field
4. Store reason in subscription meta
5. Cancellation at period end vs immediate
6. Retention offers configuration (admin)
7. Offer types: pause, coupon, skip, downgrade
8. Display offers during cancellation flow
9. Offer acceptance tracking

### Step 3: Skip Next Renewal
1. Skip button in My Account (if enabled)
2. Admin enable/disable per product
3. Skip limits (e.g., max 2 per year)
4. Cutoff date before renewal
5. Shift next renewal date by one interval
6. Activity log: "Renewal skipped"
7. Undo skip before cutoff

### Step 4: Pause & Resume
1. Pause subscription action
2. Resume subscription action
3. Configurable max pause duration
4. Access behavior during pause (continue/suspend)
5. Subscription end date extension by pause duration
6. Auto-resume after max pause period
7. Pause limit per subscription
8. Activity log entries

### Step 5: Upgrades, Downgrades & Crossgrades
1. Define switch paths configuration (admin)
2. Available switches display in My Account
3. Proration calculation engine:
   - Days remaining calculation
   - Credit for unused time
   - Charge for upgrade difference
4. Proration timing options
5. Create WooCommerce order for proration charge
6. Update subscription to new product/variation
7. Quantity changes with proration

### Step 6: Refunds System
1. Refund from WooCommerce order (integrate with WC refunds)
2. Refund types: full, partial, line item
3. Prorated refund calculator (days unused)
4. Refund destination: gateway or store credit
5. Subscription status after refund options
6. Refund history per subscription

### Step 7: Renewal Date Synchronization
1. Sync configuration (global and per-product)
2. Monthly: Sync day (1-28)
3. Weekly: Sync day (Mon-Sun)
4. Proration for sync
5. Display sync date at checkout
6. Maintain sync through plan changes

### Step 8: Multi-Currency Support
1. Store currency at subscription creation
2. Renewals process in original currency
3. WPML WooCommerce Multilingual compatibility
4. WooCommerce Currency Switcher compatibility
5. Fixed prices per currency (product level)

---

## ✅ Phase 2 Testing Checklist

### Payment Retry Tests
- [ ] Failed payment triggers retry schedule
- [ ] Retries occur at configured intervals
- [ ] Grace period respected before status change
- [ ] Customer receives failure notification
- [ ] Customer can update payment method easily
- [ ] Subscription suspends after all retries fail
- [ ] Admin can manually trigger retry
- [ ] Recovery statistics tracked

### Cancellation Tests
- [ ] Cancellation reason prompt displays
- [ ] Reason list configurable by admin
- [ ] Custom reason text accepted
- [ ] Reason stored in subscription meta
- [ ] "End of period" cancellation works
- [ ] Immediate cancellation works
- [ ] Retention offers display (if configured)
- [ ] Accepting offer updates subscription correctly

### Skip Renewal Tests
- [ ] Skip button appears (when enabled)
- [ ] Skip shifts next renewal date correctly
- [ ] Skip limits enforced
- [ ] Cutoff date prevents last-minute skips
- [ ] Can undo skip before cutoff
- [ ] Activity log shows skip event

### Pause/Resume Tests
- [ ] Customer can pause subscription
- [ ] Admin can pause subscription
- [ ] Pause duration configurable
- [ ] No charges during pause
- [ ] End date extended by pause duration
- [ ] Customer can resume manually
- [ ] Auto-resume after max duration
- [ ] Pause limits enforced

### Upgrade/Downgrade Tests
- [ ] Customer can view available plan switches
- [ ] Upgrade shows correct proration charge
- [ ] Downgrade shows credit amount
- [ ] Crossgrade (same price tier) works
- [ ] Monthly ↔ Annual crossgrade works
- [ ] Proration order created correctly
- [ ] Subscription switches to new product
- [ ] Quantity changes prorate correctly

### Refund Tests
- [ ] Full refund processes through gateway
- [ ] Partial refund processes correctly
- [ ] Prorated refund calculates accurately
- [ ] Store credit option works
- [ ] Subscription status can be set after refund
- [ ] Refund history visible per subscription

### Synchronization Tests
- [ ] Can configure sync day per product
- [ ] Proration calculated to sync date
- [ ] Next renewal lands on sync day
- [ ] Sync maintained through plan changes

### Multi-Currency Tests
- [ ] Currency stored at purchase
- [ ] Renewals charge in original currency
- [ ] WPML integration works
- [ ] Fixed per-currency prices work

---

## 🏗️ Technical Components

### New Meta Fields
- `_cancellation_reason`, `_cancellation_reason_custom`
- `_pause_start_date`, `_pause_end_date`
- `_retry_count`, `_last_retry_date`
- `_skipped_renewals`, `_skip_next`
- `_original_currency`
- `_sync_date`, `_sync_day`

### New Statuses
- `wc-pending-cancel` - Active until period end, then cancels

### Scheduled Actions
- `arraysubscription_retry_payment` - Retry failed payment
- `arraysubscription_end_pause` - Auto-resume paused subscription
- `arraysubscription_process_pending_cancel` - Cancel at period end

---

## 🚀 Deliverable

Building on Phase 1, the plugin now supports:
1. **Smart dunning**: Automatic retries on failed payments with customer notifications
2. **Retention tools**: Collect cancellation reasons, offer discounts to prevent churn
3. **Flexibility**: Customers can skip a month, pause, or switch plans
4. **Refunds**: Full, partial, and prorated refunds from admin
5. **Global business**: Customers in EUR, GBP, USD all supported
6. **Predictable billing**: All renewals on the 1st of month for easy forecasting

---

## 📈 Success Metrics

- [ ] Payment recovery rate > 40% for failed payments
- [ ] Cancellation reasons collected and reportable
- [ ] Pause/skip features reduce hard cancellations
- [ ] Plan switches process without errors
- [ ] Proration calculations accurate to the day
- [ ] Multi-currency renewals process correctly
