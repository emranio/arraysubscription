# Restrict Access (Membership / Content Gating)

## Overview
Enable membership-style content gating by restricting access to content and site areas based on a customer's **subscription status** and/or **subscription product/plan**.

This feature is designed for membership-style use cases raised by AppSumo customers, such as tier-based download/content access ("buy membership → unlock downloads").

> **Note:** Array Subscription is WooCommerce-based. Restriction decisions are made from the logged-in WooCommerce customer identity and subscription records.

> **See Also:**
> - [Customer My Account](customer-my-account.md) - Customer subscription portal and access flows
> - [Subscription Products](subscription-products.md) - Defining plans/tiers via WooCommerce products
> - [General Features](general-features.md) - Blocks/shortcodes and downloadable access basics

---

## User Stories

### As a Store Admin
- I want to restrict certain pages/URLs to active subscribers only
- I want to restrict access by post type, category, tag, or custom taxonomy
- I want to hide/show specific blocks/sections/widgets based on subscription eligibility
- I want subscription tiers to automatically assign specific WordPress roles
- I want restrictions to work reliably in multisite setups

### As a Customer
- If I have an active subscription, I want to access gated content without friction
- If I am not eligible, I want a clear message and a link to upgrade or subscribe

---

## Features

### Role Assignment (Automation)
Automatically assign WordPress roles based on subscription events.

#### Triggers
- **Upon registration / first purchase**: assign roles when the account is created during checkout or when the first subscription becomes active.
- **On subscription status changes**: update roles when the subscription transitions between statuses.

#### Role mapping rules
- When subscription becomes **Active** → add configured role(s) (e.g. `member`, `tier_2`)
- When subscription is **Cancelled/Expired/On-Hold** → remove configured role(s) and optionally add a fallback role
- When multiple subscriptions exist → support a deterministic rule such as:
  - "Any active subscription grants access" OR
  - "Highest tier wins"

---

### URL Pattern Restrictions
Restrict access using URL patterns.

Examples:
- Protect a members area: `/members/*`
- Protect downloads: `/download/*`

Rule configuration (per rule):
- Pattern type: Prefix / Contains / Regex (optional)
- Required condition: status (Active/Trial/etc) and optional plan(s)
- Behavior: redirect (to Pricing/My Account), login prompt, or access denied message

---

### CPT & Taxonomy Restrictions
Restrict access by:
- **Custom Post Types (CPTs)** (e.g. `course`, `lesson`)
- **Taxonomy terms** (categories/tags/custom taxonomies)

Supported targeting levels:
- **Entire post type**: restrict all content of a CPT (e.g. all `course` posts)
- **Specific posts**: restrict selected posts/pages/CPT entries only
- **Entire taxonomy**: restrict all content within a taxonomy (e.g. everything with any `premium_access` term)
- **Specific terms**: restrict by selected categories/tags/custom taxonomy terms

Examples:
- Gate all posts in category `premium`
- Gate all `course` posts to Active subscribers
- Gate `lesson` posts tagged `tier-2` to Tier 2 subscribers only
- Gate only specific posts (e.g. 3 premium lessons) without restricting the whole CPT
- Gate a custom taxonomy (e.g. `membership_level`) either globally or by specific terms

---

### Content Gating (Blocks / Builders / Shortcode)
Hide or replace content fragments based on subscription eligibility.

#### Shortcode (universal)
- `[as_restrict]...[/as_restrict]`

Suggested attributes:
- `status="active"` (or `active,trial`)
- `plans="123,456"` (subscription product IDs)
- `roles="member,tier_2"` (optional)

Example:
- `[as_restrict status="active" plans="123"]<a href="/download/file">Download</a>[/as_restrict]`

#### Gutenberg block
- **Restrict Content** block with settings for status, plan(s), and fallback behavior (hide vs replace with message)

#### Page builder support
- Elementor / Divi / Bricks: show/hide a section/widget via a simple “Restrict Access” visibility condition.

---

### Media File Restrictions (WP Media Library)
Restrict access to WordPress media files (uploads) based on subscription eligibility.

Supported targets:
- **Attachment post type**: restrict specific Media Library items (attachments) and/or all attachments.
- **Direct file URLs**: protect access when a user hits an uploads URL directly (e.g. `/wp-content/uploads/...`).

Common use cases:
- Paid members can download ZIP/PDF assets; non-members see an upgrade prompt.
- Tier-based asset libraries (e.g. Tier 1 vs Tier 2 downloads).

Behavior options:
- Redirect to My Account/Pricing page
- Show access denied / login prompt

> Implementation note (for dev): WordPress media can be accessed via attachment pages and also direct file URLs. Minimum viable restriction is enforcing eligibility on **attachment pages and generated download links**, with optional “protected downloads” mode for direct URLs.

---

## Multisite Support

### Rules scope
- Default: restrictions stored per-site
- Optional: super admin can enable a shared network ruleset

### Role behavior
- Respect per-site roles in multisite (user roles can differ by site)

---

## Admin Settings

### Menu location
- **Array Subscription → Restrict Access**

### Settings sections
- Role Mapping
- URL Rules
- CPT/Taxonomy Rules
- Content Gating (shortcode + blocks + builder toggles)
- Multisite (if applicable)

---

## Acceptance Criteria

### Role Assignment
- [ ] Admin can map subscription product(s) to add/remove roles
- [ ] Role updates apply automatically when subscription status changes
- [ ] Multiple subscriptions resolve deterministically (documented rule)

### URL Restrictions
- [ ] URL rules evaluate early (before page render)
- [ ] Logged-out users can be redirected to login
- [ ] Logged-in but ineligible users get redirect or message

### CPT & Taxonomy Restrictions
- [ ] CPT and taxonomy rules apply to singles and archives
- [ ] Admin can restrict an entire CPT or only selected posts
- [ ] Admin can restrict an entire taxonomy or only selected terms (categories/custom taxonomies)
- [ ] Multiple matching rules produce predictable outcomes

### Content Gating
- [ ] Shortcode works in classic editor, Gutenberg, and page builders
- [ ] Gutenberg block supports hide/replace fallback
- [ ] Builder integrations expose a basic visibility toggle

### Media Restrictions
- [ ] Admin can restrict specific Media Library items (attachments)
- [ ] Restricted media is blocked for ineligible users (redirect/message/login)
- [ ] Optional protected-download mode prevents direct URL access to restricted uploads

### Multisite
- [ ] Rules are scoped per-site (with optional network override)
- [ ] Role assignment respects per-site roles

---

## AppSumo Alignment Notes
- Supports tier-based membership gating (content/download access tied to subscription).
- Keeps the WooCommerce dependency explicit for users asking about “free memberships” without checkout.
