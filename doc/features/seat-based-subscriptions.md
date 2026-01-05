# Seat-Based Subscriptions (B2B)

## Overview
Support B2B subscriptions where a subscription includes a number of “seats” (licenses/users/entitlements). Admins and customers can manage seat counts and allocations, and reporting shows active seats.

---

## User Stories

### As a Store Admin
- I want to sell subscriptions with a seat quantity (e.g., 10 seats)
- I want pricing to scale based on number of seats
- I want customers to increase or decrease seat count
- I want to restrict seat changes (min/max, limits per period)
- I want to see seat usage in subscription reports

### As a Customer (Company Owner)
- I want to purchase a subscription for my team with multiple seats
- I want to assign seats to team members (emails/users)
- I want to unassign seats when someone leaves
- I want to add seats when my team grows
- I want to see who is using each seat

---

## Features

### Seat Quantity & Pricing
- **Seat Quantity**: Each subscription has a seat count
- **Tiered Pricing**: Optional tiers (1–5, 6–20, 21–100)
- **Per-Seat Pricing**: Optional price per seat
- **Minimum/Maximum Seats**: Admin-defined

### Seat Assignment
- **Invite by Email**: Assign seats by inviting user emails
- **Claim Seat**: Recipient accepts invite and gets access
- **Reassign Seat**: Move a seat from one user to another
- **Seat Status**: Pending invite vs active seat

### Seat Management
- Increase seats (upgrade)
- Decrease seats (downgrade) with rules (e.g., only at renewal)
- Seat change proration rules (charge/credit)
- Seat overage rules (block or auto-add seats)

### Reporting
- Active seats vs purchased seats
- Seat changes over time
- Revenue by seat tier
- Seat utilization percentage

### Controls
- Role-based management: only account owner/managers can assign seats
- Audit log for seat assignments
- Limits on invites per day to prevent spam

---

## Acceptance Criteria

- [ ] Subscription can be configured with seat count
- [ ] Seat-based pricing supported (tiered or per-seat)
- [ ] Customer can assign/unassign seats in My Account
- [ ] Seat invites/claims are tracked
- [ ] Seat count changes supported with configurable proration behavior
- [ ] Reports show purchased seats, active seats, and utilization
- [ ] Admin can view and manage seats for any subscription
- [ ] All seat events logged in subscription activity log
