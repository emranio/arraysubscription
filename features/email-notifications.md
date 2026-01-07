# Email Notifications

## Overview
Automated email notifications to keep customers and admins informed about subscription events, payment status, and important actions throughout the subscription lifecycle.
**marked as in-house**

**WooCommerce Integration:** Uses WooCommerce's native email system and templates. All subscription emails follow WooCommerce email styling and can be customized using WooCommerce's email settings.

---

## User Stories

### As a Store Admin
- I want to receive notifications when new subscriptions are created
- I want to be alerted when subscriptions are cancelled
- I want to know when renewal payments fail
- I want to customize email templates for all subscription notifications
- I want to control which notifications are enabled/disabled
- I want to add custom content to subscription emails
- I want to send manual emails to subscribers

### As a Customer
- I want to receive confirmation when I subscribe
- I want to be notified before my subscription renews
- I want to receive receipts for each renewal payment
- I want to be alerted if my payment fails
- I want to know when my subscription is about to expire
- I want to receive notice when my subscription is cancelled
- I want to be reminded when my free trial is ending

---

## Features

### Customer Email Notifications

#### Subscription Lifecycle
- **New Subscription**: Confirmation when subscription is created
- **Subscription Activated**: When subscription becomes active
- **Subscription On-Hold**: When subscription is paused
- **Subscription Cancelled**: Confirmation of cancellation
- **Subscription Expired**: When subscription term ends

#### Payment Notifications
- **Payment Received**: Receipt for successful renewal payment
- **Payment Upcoming**: Reminder before next billing date (configurable days)
- **Payment Failed**: Alert when payment attempt fails
- **Payment Method Expiring**: Notice when saved card is expiring
- **Payment Method Updated**: Confirmation of payment method change

#### Trial & Expiration
- **Trial Starting**: Welcome email when trial begins
- **Trial Ending Soon**: Reminder before trial expires (configurable days)
- **Trial Ended**: Notice when trial converts to paid
- **Subscription Expiring Soon**: Reminder before subscription ends

#### Plan Changes
- **Plan Upgraded**: Confirmation of upgrade
- **Plan Downgraded**: Confirmation of downgrade
- **Early Renewal**: Confirmation of early renewal

### Admin Email Notifications
- **New Subscription**: Alert for new subscriber
- **Subscription Cancelled**: Notice when customer cancels
- **Payment Failed**: Alert for failed payments
- **Subscription Expired**: Notice of expired subscriptions

### Email Configuration
- **Enable/Disable**: Toggle each notification type
- **Recipient Settings**: Configure admin email recipients
- **Timing Settings**: Set reminder timing (X days before event)
- **Template Customization**: Edit email subject and content
- **Dynamic Variables**: Use placeholders for customer/subscription data:
  - `{customer_name}`
  - `{subscription_id}`
  - `{product_name}`
  - `{next_payment_date}`
  - `{amount}`
  - `{renewal_link}`
  - etc.

### Email Templates
- Built-in templates for all notification types
- HTML email support
- Match WooCommerce email styling
- Preview emails before sending
- Test email functionality

---

## Notification Timing Examples

| Notification | Default Timing |
|-------------|----------------|
| Payment Upcoming | 3 days before |
| Trial Ending | 3 days before |
| Subscription Expiring | 7 days before |
| Card Expiring | 30 days before |

---

## Acceptance Criteria

- [ ] All customer lifecycle emails sent automatically
- [ ] All payment notification emails functional
- [ ] Admin receives configured notifications
- [ ] Email templates customizable
- [ ] Dynamic variables replaced correctly in emails
- [ ] Notification timing configurable
- [ ] Individual notifications can be enabled/disabled
- [ ] Emails match WooCommerce email styling
- [ ] Test email functionality available
- [ ] Email logs/history viewable
