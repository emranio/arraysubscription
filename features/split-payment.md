# Split Payment (Cost Sharing)

## Overview
Allow subscription costs to be split between multiple people (friends, family members, team members). Each participant pays their share of the subscription, and separate WooCommerce orders are created for each person for every payment event (initial purchase, renewals, signup fees, etc.).

**WooCommerce Integration:** Each participant receives their own WooCommerce order with their portion of the cost. Orders are sent to different email addresses, and each person manages their own payment method. All participants must pay their share for the subscription to remain active.

---

## User Stories

### As a Store Admin
- I want to enable cost-sharing for specific subscription products
- I want to allow 2 or more people to split a subscription cost
- I want each participant to receive their own invoice/order
- I want to define split rules (equal splits, custom amounts, percentage-based)
- I want to handle scenarios where one participant fails to pay
- I want to track which participant has paid and which hasn't

### As a Customer (Subscription Initiator)
- I want to share subscription costs with friends or family
- I want to invite others to split the subscription cost
- I want to set how the cost is divided (equal or custom)
- I want to see who has paid their share
- I want the subscription to work only when everyone pays

### As a Participant (Cost-Sharing Partner)
- I want to receive an invitation to share a subscription cost
- I want to pay only my portion of the subscription
- I want my own invoice and payment confirmation
- I want to manage my own payment method
- I want to see my payment history separately

---

## Features

### Split Payment Configuration

#### Split Options
- **Number of Participants**: 2-10 people can split costs
- **Split Type**:
  - **Equal Split**: Divide total evenly (e.g., $100 ÷ 2 = $50 each)
  - **Custom Amounts**: Set specific amounts per person
  - **Percentage Split**: Each person pays a percentage
- **Per-Product Setting**: Enable split payment for specific products

### Participant Management

#### Invitation Flow
1. **Primary Subscriber** purchases subscription and invites participants
2. **Invitation Email** sent to each participant with their payment link
3. **Participants Accept** invitation and complete their payment
4. **Subscription Activates** when all participants have paid

#### Participant Actions
- Accept or decline invitation
- Update payment method for their share
- View their payment history
- Leave cost-sharing arrangement (with notice)

### WooCommerce Order Creation

#### Separate Orders for Each Participant
- **Initial Purchase**: Separate order for each participant
- **Renewals**: Each renewal creates separate orders for all participants
- **Signup Fees**: If applicable, split and create separate orders
- **Upgrades/Downgrades**: Proration split creates separate orders

#### Order Details
- Each order sent to participant's email
- Each order shows only their portion
- Each order has unique order number
- Each participant manages their own order

### Payment Collection

#### Initial Payment
- Primary subscriber pays their share first
- Other participants receive invitation to pay
- Subscription pending until all shares paid
- Grace period configurable (e.g., 7 days to complete payment)

#### Renewal Payments
- All participants charged on same renewal date
- Separate WooCommerce orders created for each
- Each participant receives their own renewal invoice
- Subscription status depends on all payments succeeding

#### Failed Payment Handling
- If one participant's payment fails, others are notified
- Grace period before subscription suspended
- Non-paying participant can be removed (admin setting)
- Remaining participants can choose to cover the cost or cancel

### Subscription Status Management

#### Active When All Paid
- Subscription active only when all participants have paid current period
- If any participant fails, subscription goes on-hold
- Access/benefits granted only when fully paid

#### Participant Departure
- Participant can leave with notice (e.g., 30 days)
- Remaining participants must cover departed person's share or find replacement
- Or subscription cancelled if cost can't be covered

### Participant Replacement
- Allow replacing a departed participant
- New participant pays from next renewal
- Invitation sent to new participant
- Subscription continuity maintained

---

## Example Scenarios

### Scenario 1: Two Friends Split $100/month Subscription
- **Total Cost**: $100/month
- **Split**: 2 people, equal split
- **Friend A**: Pays $50/month, receives WooCommerce order to friend_a@email.com
- **Friend B**: Pays $50/month, receives WooCommerce order to friend_b@email.com
- **Renewals**: Both charged $50 each month, two separate orders created

### Scenario 2: Family Sharing with Custom Split
- **Total Cost**: $150/month
- **Split**: 3 people, custom amounts
- **Parent**: Pays $100/month (primary subscriber)
- **Child 1**: Pays $25/month
- **Child 2**: Pays $25/month
- Each receives separate invoice to their email

### Scenario 3: Team Subscription with Percentage Split
- **Total Cost**: $200/month
- **Split**: Company 80%, Employee 20%
- **Company**: Pays $160/month, order to company@email.com
- **Employee**: Pays $40/month, order to employee@email.com

### Scenario 4: Failed Payment Handling
- **Total**: $100/month, split between 2 people ($50 each)
- **Month 3**: Friend B's payment fails
- **Action**: Friend B has 7-day grace period to pay
- **If not paid**: Subscription suspended, Friend A notified
- **Options**: Friend A can cover full $100, find replacement, or cancel

---

## Admin Settings

### Split Payment Configuration
Located in: **Array Subscription > Settings > Split Payment**

| Setting | Options | Description |
|---------|---------|-------------|
| Enable Split Payment | Yes / No | Enable cost-sharing feature |
| Max Participants | 2-10 | Maximum people who can split costs |
| Grace Period | 1-30 days | Days to wait for participant payments |
| Failed Payment Action | Suspend / Cancel / Notify Only | What happens when one participant doesn't pay |
| Allow Replacement | Yes / No | Allow replacing departed participants |

---

## Acceptance Criteria

- [ ] Admin can enable split payment for specific subscription products
- [ ] Primary subscriber can invite multiple participants
- [ ] Each participant receives separate invitation email
- [ ] Separate WooCommerce order created for each participant
- [ ] Each participant receives invoices at their own email
- [ ] Equal split, custom amounts, and percentage splits supported
- [ ] All participants must pay for subscription to be active
- [ ] Renewal creates separate orders for all participants
- [ ] Failed payment by one participant triggers grace period
- [ ] Participants can be replaced with admin/primary subscriber approval
- [ ] Each participant manages their own payment method
- [ ] Subscription status reflects combined payment status of all participants
