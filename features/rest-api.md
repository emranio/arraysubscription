# REST API

## Overview
Provide REST API endpoints for accessing and managing subscription data, enabling integration with external systems, mobile apps, and third-party services.

**WooCommerce Integration:** Extends WooCommerce's REST API with subscription-specific endpoints. Uses WooCommerce's authentication and permission system for API access.

---

## User Stories

### As a Developer
- I want to retrieve subscription details via REST API for integration with external systems
- I want to get a list of subscriptions by customer
- I want to access subscription status and payment history programmatically
- I want to update subscription data through API calls
- I want to create subscriptions via API for external checkout flows

### As a Store Admin
- I want to allow third-party apps to access subscription data securely
- I want to integrate subscriptions with my CRM or ERP system
- I want to sync subscription data with external reporting tools

---

## API Endpoints

### Subscription Endpoints

#### List Subscriptions
```
GET /wp-json/wc/v3/subscriptions
```
Query parameters:
- `customer` - Filter by customer ID
- `status` - Filter by status (active, on-hold, cancelled, expired)
- `product` - Filter by product ID
- `per_page` - Results per page
- `page` - Page number

#### Get Single Subscription
```
GET /wp-json/wc/v3/subscriptions/{id}
```
Returns complete subscription details including:
- Subscription ID and status
- Customer information
- Product/plan details
- Billing schedule
- Payment method
- Next renewal date
- Related order IDs

#### Create Subscription
```
POST /wp-json/wc/v3/subscriptions
```
Create a new subscription programmatically.

#### Update Subscription
```
PUT /wp-json/wc/v3/subscriptions/{id}
```
Update subscription details:
- Status changes
- Next payment date
- Billing address
- Shipping address

#### Delete/Cancel Subscription
```
DELETE /wp-json/wc/v3/subscriptions/{id}
```
Cancel a subscription via API.

### Customer Subscription Endpoints

#### Get Customer Subscriptions
```
GET /wp-json/wc/v3/customers/{id}/subscriptions
```
Retrieve all subscriptions for a specific customer.

### Subscription Orders

#### Get Subscription Orders
```
GET /wp-json/wc/v3/subscriptions/{id}/orders
```
List all orders related to a subscription (initial + renewals).

### Subscription Actions

#### Pause Subscription
```
POST /wp-json/wc/v3/subscriptions/{id}/pause
```

#### Resume Subscription
```
POST /wp-json/wc/v3/subscriptions/{id}/resume
```

#### Process Renewal
```
POST /wp-json/wc/v3/subscriptions/{id}/renew
```

---

## Authentication

### API Keys
- Uses WooCommerce REST API keys
- Requires read/write permissions for subscription access
- Supports OAuth 1.0a authentication

### Permissions
- Subscription read: requires `read` permission
- Subscription write: requires `write` permission
- Respects WooCommerce user capabilities

---

## Response Format

### Subscription Object
```json
{
  "id": 123,
  "status": "active",
  "customer_id": 456,
  "billing_period": "month",
  "billing_interval": 1,
  "start_date": "2025-01-01T00:00:00",
  "next_payment_date": "2025-02-01T00:00:00",
  "end_date": null,
  "total": "29.99",
  "currency": "USD",
  "payment_method": "stripe",
  "line_items": [...],
  "billing_address": {...},
  "shipping_address": {...},
  "related_orders": [100, 101, 102]
}
```

---

## Webhooks

### Subscription Events
- `subscription.created` - New subscription created
- `subscription.updated` - Subscription details changed
- `subscription.cancelled` - Subscription cancelled
- `subscription.expired` - Subscription expired
- `subscription.renewed` - Renewal payment processed
- `subscription.payment_failed` - Renewal payment failed
- `subscription.status_changed` - Status changed

### Webhook Payload
Includes full subscription object and event metadata.

---

## Rate Limiting

- Respects WooCommerce API rate limits
- Batch endpoints available for bulk operations

---

## Acceptance Criteria

- [ ] GET endpoint returns subscription list with filtering
- [ ] GET endpoint returns single subscription details
- [ ] POST endpoint creates new subscriptions
- [ ] PUT endpoint updates subscription data
- [ ] DELETE endpoint cancels subscriptions
- [ ] Customer subscriptions endpoint works correctly
- [ ] Related orders accessible via API
- [ ] Subscription action endpoints (pause, resume, renew) functional
- [ ] Authentication uses WooCommerce API keys
- [ ] Webhooks fire on subscription events
- [ ] API follows WooCommerce REST API conventions
