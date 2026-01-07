# Feature Manager

## Overview
Define and display product features/entitlements on any WooCommerce product. Admins configure features in a table-like UI on the product edit page, and customers see their entitled features in their My Account panel based on their active subscriptions or purchases.

**WooCommerce Integration:** Feature Manager adds a new meta box to WooCommerce's product edit screen. Features are stored as product meta and displayed in the customer's WooCommerce My Account area.

### Supported WooCommerce Product Types

WooCommerce has 4 product types: **Simple**, **Variable**, **Grouped**, and **External/Affiliate**.

| Product Type | Feature Manager UI | Notes |
|--------------|-------------------|-------|
| **Simple** | ✓ Full support | Feature table appears in product edit screen |
| **Variable** | ✓ Full support | Features can be set per product or per variation |
| **Grouped** | ✗ No UI | Features defined on child products instead |
| **External** | ✗ Not supported | External products are sold on other sites |

> **Note:** The Feature Manager UI is integrated into **Simple** and **Variable** products only. For grouped products, define features on the individual child products.

---

## User Stories

### As a Store Admin
- I want to define features for any WooCommerce product (subscription or one-time)
- I want to add multiple features per product in a table format
- I want each feature to have a name and a value (toggle, number, or text)
- I want to easily enable/disable features
- I want customers to see what features they're entitled to
- I want to compare feature sets across different subscription tiers

### As a Customer
- I want to see what features are included with my subscription/purchase
- I want to see feature comparisons when considering an upgrade
- I want to view my entitled features in My Account
- I want to understand what I get with each product/plan

---

## Features

### Admin Feature Configuration

#### Feature Table UI
Located on: **WooCommerce Product Edit > Feature Manager tab/section**

Table-style interface to add/edit product features:

| Feature Name | Value Type | Value | Enabled |
|--------------|-----------|-------|---------|
| Storage | Number | 50 GB | ✓ |
| Users | Number | 5 | ✓ |
| Priority Support | Toggle | Yes | ✓ |
| API Access | Toggle | No | ✗ |
| Custom Domain | Toggle | Yes | ✓ |
| Backups | Text | Daily | ✓ |

#### Value Types
- **Toggle (Boolean)**: Yes/No, Enabled/Disabled, ✓/✗
- **Number**: Numeric values (5, 100, unlimited)
- **Text**: Free text (e.g., "Daily", "Premium", "Standard")

#### Feature Actions
- **Add Feature**: Add new row to feature table
- **Edit Feature**: Modify existing feature name/value
- **Delete Feature**: Remove feature from product
- **Reorder Features**: Drag-and-drop to change display order
- **Enable/Disable**: Toggle feature visibility without deleting

### Feature Templates (Optional)
- **Save as Template**: Save feature set as reusable template
- **Apply Template**: Apply saved template to new products
- **Common Templates**: 
  - Basic Plan features
  - Pro Plan features
  - Enterprise Plan features

### Customer Display

#### My Account > Features Section
New section in WooCommerce My Account showing entitled features:

**Your Active Features**

| Feature | Your Entitlement |
|---------|------------------|
| Storage | 50 GB |
| Users | 5 |
| Priority Support | ✓ |
| API Access | ✗ |
| Custom Domain | ✓ |
| Backups | Daily |

#### Feature Display Options
- Show features grouped by subscription/product
- Show combined features across all active subscriptions
- Highlight limited/unlimited values
- Show feature comparison with upgrade options

### Product Page Display (Optional)
- Display feature list on product page
- Feature comparison table for variable products
- "What's included" section

### Feature Aggregation
When customer has multiple subscriptions/purchases:
- **Combine Features**: Sum numeric values, OR boolean values
- **Highest Wins**: Take highest value across subscriptions
- **Per-Product**: Show features separately per subscription

---

## Admin Interface

### Product Edit Screen
New meta box or tab: **"Feature Manager"**

```
┌─────────────────────────────────────────────────────────────┐
│ Feature Manager                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Feature Name     │ Type    │ Value      │ Enabled │ Action │
│  ─────────────────┼─────────┼────────────┼─────────┼─────── │
│  Storage          │ Number  │ 50 GB      │   ✓     │  ✕ ↕   │
│  Users            │ Number  │ 5          │   ✓     │  ✕ ↕   │
│  Priority Support │ Toggle  │ Yes        │   ✓     │  ✕ ↕   │
│  API Access       │ Toggle  │ No         │   ✓     │  ✕ ↕   │
│  ─────────────────┴─────────┴────────────┴─────────┴─────── │
│                                                              │
│  [+ Add Feature]                    [Load Template ▼]        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Settings
Located in: **Array Subscription > Settings > Feature Manager**

| Setting | Options | Description |
|---------|---------|-------------|
| Enable Feature Manager | Yes / No | Enable feature management |
| Show on Product Page | Yes / No | Display features on frontend product page |
| Show in My Account | Yes / No | Display features in customer My Account |
| Aggregation Mode | Combine / Highest / Per-Product | How to handle multiple subscriptions |
| Feature Comparison | Yes / No | Show comparison on upgrade pages |

---

## Example Scenarios

### Scenario 1: SaaS Subscription Tiers

**Basic Plan ($10/mo)**
| Feature | Value |
|---------|-------|
| Projects | 3 |
| Storage | 5 GB |
| Team Members | 1 |
| API Access | ✗ |
| Priority Support | ✗ |

**Pro Plan ($25/mo)**
| Feature | Value |
|---------|-------|
| Projects | Unlimited |
| Storage | 50 GB |
| Team Members | 10 |
| API Access | ✓ |
| Priority Support | ✗ |

**Enterprise Plan ($99/mo)**
| Feature | Value |
|---------|-------|
| Projects | Unlimited |
| Storage | 500 GB |
| Team Members | Unlimited |
| API Access | ✓ |
| Priority Support | ✓ |

### Scenario 2: Membership Site

**Silver Membership**
| Feature | Value |
|---------|-------|
| Course Access | Basic courses |
| Downloads/month | 10 |
| Community Access | ✓ |
| Live Webinars | ✗ |
| 1-on-1 Coaching | ✗ |

**Gold Membership**
| Feature | Value |
|---------|-------|
| Course Access | All courses |
| Downloads/month | Unlimited |
| Community Access | ✓ |
| Live Webinars | ✓ |
| 1-on-1 Coaching | ✗ |

### Scenario 3: Physical Subscription Box

**Snack Box**
| Feature | Value |
|---------|-------|
| Items per box | 8-10 |
| Customizable | ✓ |
| Free Shipping | ✗ |
| Exclusive Items | ✗ |

**Premium Snack Box**
| Feature | Value |
|---------|-------|
| Items per box | 15-20 |
| Customizable | ✓ |
| Free Shipping | ✓ |
| Exclusive Items | ✓ |

---

## Customer My Account Integration

### Features Tab/Section
New section added to WooCommerce My Account:

**Path:** `/my-account/features` or section within existing subscriptions page

**Display:**
- List of all entitled features from active subscriptions
- Grouped by product/subscription (optional)
- Clear indication of limits vs current usage (if tracked)
- Upgrade prompts for features not included in current plan

---

## Acceptance Criteria

- [ ] Feature Manager meta box/tab appears on WooCommerce product edit screen
- [ ] Admin can add/edit/delete features in table format
- [ ] Toggle, Number, and Text value types supported
- [ ] Features can be enabled/disabled individually
- [ ] Features can be reordered via drag-and-drop
- [ ] Customer sees entitled features in My Account
- [ ] Features from multiple subscriptions aggregated correctly
- [ ] Optional: Features displayed on product page
- [ ] Optional: Feature comparison table for tier upgrades
- [ ] Optional: Feature templates can be saved and applied
- [ ] Works for both subscription products and one-time products
