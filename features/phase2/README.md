# Phase 2: Subscription Lifecycle & Retention

## 🎯 Goal
Enhance the subscription system with **lifecycle management features** that improve customer experience, reduce churn, and give administrators more control over subscription handling.

---

## 📦 Features Included

| # | Feature File | Priority | Description |
|---|--------------|----------|-------------|
| 1 | [free-trials-signup-fees.md](free-trials-signup-fees.md) | **High** | Free trial periods, one-time signup fees |
| 2 | [payment-retry-recovery.md](payment-retry-recovery.md) | **Critical** | Failed payment retry logic, dunning, grace periods |
| 3 | [cancellation-reasons-retention-offers.md](cancellation-reasons-retention-offers.md) | **High** | Cancellation flow, reasons collection, retention offers |
| 4 | [skip-next-renewal-vacation-mode.md](skip-next-renewal-vacation-mode.md) | **Medium** | Skip renewal, pause/resume subscriptions |
| 5 | [manual-subscription-admin.md](manual-subscription-admin.md) | **High** | Admin creates subscriptions manually, product swaps |

---

## 🔗 Dependencies
- **Requires Phase 1** complete
- Builds on core subscription CPT, billing engine, and My Account portal

---

## 🔧 Implementation Order

### Step 1: Free Trials
1. Product meta: `_trial_length`, `_trial_period`
2. Trial status for subscriptions (`wc-trial`)
3. No payment required option for trial start
4. Trial end date calculation
5. Automatic conversion: trial → active on trial end
6. Trial-to-paid conversion logic
7. Email: "Trial ending soon" notification
8. My Account: Show trial end date

### Step 2: Signup Fees
1. Product meta: `_signup_fee`
2. Display signup fee on product page
3. Add signup fee to cart/checkout
4. Signup fee appears only on initial order
5. Renewal orders exclude signup fee
6. Clear breakdown at checkout

### Step 3: Payment Retry & Recovery (Dunning)
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

### Step 4: Cancellation Flow
1. Cancellation reason selector in My Account
2. Admin-configurable reason list
3. Optional custom reason text field
4. Store reason in subscription meta
5. Cancellation at period end vs immediate

### Step 5: Retention Offers
1. Retention offers configuration (admin)
2. Offer types:
   - Pause subscription instead
   - Apply coupon (e.g., 20% off next 3 months)
   - Skip next renewal
   - Downgrade option (requires Phase 3)
3. Display offers during cancellation flow
4. Offer acceptance tracking
5. Auto-apply accepted offer

### Step 6: Skip Next Renewal
1. Skip button in My Account (if enabled)
2. Admin enable/disable per product
3. Skip limits (e.g., max 2 per year)
4. Cutoff date before renewal
5. Shift next renewal date by one interval
6. Activity log: "Renewal skipped"
7. Undo skip before cutoff

### Step 7: Pause & Resume
1. Pause subscription action
2. Resume subscription action
3. Configurable max pause duration
4. Access behavior during pause (continue/suspend)
5. Subscription end date extension by pause duration
6. Auto-resume after max pause period
7. Pause limit per subscription
8. Activity log entries

### Step 8: Manual Subscription Admin
1. "Add New Subscription" admin page
2. Customer selector (existing or create new)
3. Product/variation selector
4. Custom pricing override
5. Custom billing cycle/dates
6. Payment options:
   - Charge now
   - Skip initial payment
   - Send invoice
   - Mark as paid
7. Admin notes field
8. Change product/variation of existing subscription
9. Product swap with pricing options

---

## ✅ Phase 2 Testing Checklist

### Free Trial Tests
- [ ] Can configure trial period per product
- [ ] Customer can start trial without payment (if configured)
- [ ] Trial subscription has correct status
- [ ] Trial end date calculated correctly
- [ ] Auto-conversion to paid on trial end
- [ ] "Trial ending soon" email sent
- [ ] Trial end date visible in My Account
- [ ] One trial per customer enforcement (optional)

### Signup Fee Tests
- [ ] Signup fee configurable per product
- [ ] Fee displays on product page
- [ ] Fee added to cart/checkout correctly
- [ ] Fee appears on initial order only
- [ ] Renewal orders don't include signup fee

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
- [ ] Activity log tracks pause/resume

### Manual Admin Tests
- [ ] Admin can create subscription from scratch
- [ ] Customer can be selected or created
- [ ] Product/variation selection works
- [ ] Custom pricing can be set
- [ ] Payment options work (skip, charge, invoice)
- [ ] Admin can change subscription product
- [ ] Product swap maintains history

---

## 🏗️ Technical Components

### New Meta Fields
- `_trial_length`, `_trial_period`
- `_signup_fee`
- `_cancellation_reason`, `_cancellation_reason_custom`
- `_pause_start_date`, `_pause_end_date`
- `_retry_count`, `_last_retry_date`
- `_skipped_renewals`, `_skip_next`

### New Statuses
- `wc-trial` - Currently in free trial
- `wc-pending-cancel` - Active until period end, then cancels

### Scheduled Actions
- `arraysubscription_trial_ending_reminder` - Send trial ending email
- `arraysubscription_trial_ended` - Convert trial to paid
- `arraysubscription_retry_payment` - Retry failed payment
- `arraysubscription_end_pause` - Auto-resume paused subscription
- `arraysubscription_process_pending_cancel` - Cancel at period end

### Admin Pages
- Manual subscription creation form
- Change product interface
- Retry configuration settings
- Cancellation reasons manager
- Retention offers configuration

---

## 🚀 Deliverable

Building on Phase 1, the plugin now supports:
1. **Free trials**: "Try 14 days free, then $29/month"
2. **Signup fees**: "$50 setup fee + $29/month"
3. **Smart dunning**: Automatic retries on failed payments with customer notifications
4. **Retention tools**: Collect cancellation reasons, offer discounts to prevent churn
5. **Flexibility**: Customers can skip a month or pause temporarily
6. **Admin control**: Create subscriptions manually for phone orders or migrations

---

## 📈 Success Metrics

- [ ] Trial-to-paid conversion tracking functional
- [ ] Payment recovery rate > 40% for failed payments
- [ ] Cancellation reasons collected and reportable
- [ ] Pause/skip features reduce hard cancellations
- [ ] Manual subscription creation smooth workflow
