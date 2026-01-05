# Subscription Import & Migration

## Overview
Tools for importing subscriptions from other systems and migrating from WooCommerce Subscriptions plugin, preserving payment profiles and billing continuity so customers don't need to re-subscribe.
**marked as later**

---

## User Stories

### As a Store Admin
- I want to migrate from WooCommerce Subscriptions without asking customers to re-subscribe
- I want to preserve Stripe/PayPal payment tokens during migration
- I want to maintain billing dates and schedules during migration
- I want to import subscriptions from CSV files
- I want to validate data before committing to import
- I want to rollback if something goes wrong

### As a Customer
- I want my subscription to continue seamlessly after the store migrates
- I don't want to re-enter my payment information
- I want my billing date to stay the same

---

## Features

### WooCommerce Subscriptions Migration

Built-in migration wizard for switching from WooCommerce Subscriptions plugin:

#### Detection & Analysis
- **One-Click Detection**: Automatically detect existing WooCommerce Subscriptions data
- **Migration Report**: Summary of subscriptions, statuses, and payment methods to migrate
- **Compatibility Check**: Identify potential issues before migration

#### Payment Profile Preservation
- **Stripe Token Migration**: Maintain Stripe payment tokens so customers don't need to re-enter cards
- **PayPal Profile Migration**: Preserve PayPal billing agreements
- **Gateway Mapping**: Map payment gateways between plugins

#### Data Preservation
- **Billing Continuity**: Preserve next payment dates and billing schedules
- **Status Mapping**: Map subscription statuses correctly (active, on-hold, cancelled, pending-cancel)
- **History Preservation**: Maintain related orders and payment history
- **Metadata Migration**: Preserve subscription metadata and custom fields
- **Trial & Fee Data**: Migrate trial periods and signup fees

#### Migration Process
1. Install Array Subscription alongside existing WooCommerce Subscriptions
2. Run migration wizard from **WooCommerce > Subscriptions > Import**
3. Review detected subscriptions and field mapping
4. Validate data and resolve any conflicts
5. Execute migration (can be done in batches for large stores)
6. Verify migrated subscriptions
7. Deactivate WooCommerce Subscriptions plugin

#### Safety Features
- **Rollback Support**: Ability to undo migration if issues arise
- **Data Integrity Validation**: Validate all subscription data before import
- **Batch Processing**: Process large stores in manageable batches
- **Dry Run Mode**: Preview migration without committing changes

---

### CSV Import

Import subscriptions from spreadsheets or other systems:

#### Import Capabilities
- Import subscriptions from CSV files
- Migrate from external subscription platforms
- Bulk create subscriptions from spreadsheet data

#### Field Mapping
- **Customer Matching**: Match by email, customer ID, or create new
- **Product Matching**: Match by SKU, product ID, or product name
- **Status Mapping**: Map external statuses to Array Subscription statuses
- **Date Format Handling**: Support multiple date formats
- **Payment Gateway Token Mapping**: Import saved payment methods where supported

#### Import Options
- **Validation Mode**: Check data validity before import
- **Skip Invalid Rows**: Continue import, skipping rows with errors
- **Error Report**: Download report of failed rows with reasons

---

### Import from Other Systems

Support for migrating from:
- WooCommerce Subscriptions (automated wizard)
- SUMO Subscriptions (CSV export/import)
- YITH Subscriptions (CSV export/import)
- Stripe Billing (API import)
- External platforms (CSV import)

---

## Admin Interface

### Import Page
Located in: **WooCommerce > Subscriptions > Import**

#### WooCommerce Subscriptions Tab
- Detection status
- Subscription count summary
- Start migration button
- Migration progress indicator

#### CSV Import Tab
- File upload
- Field mapping interface
- Validation results
- Import progress

#### Import History
- List of past imports
- Import date and count
- Status (completed, partial, rolled back)
- Download error reports

---

## Acceptance Criteria

- [ ] WooCommerce Subscriptions detected automatically when installed
- [ ] Migration wizard shows summary of data to migrate
- [ ] Stripe payment tokens preserved during migration
- [ ] PayPal billing agreements preserved during migration
- [ ] Next payment dates maintained accurately
- [ ] Subscription statuses mapped correctly
- [ ] Related orders linked to migrated subscriptions
- [ ] CSV import supports custom field mapping
- [ ] Validation runs before import commits
- [ ] Rollback available for failed migrations
- [ ] Batch processing available for large stores
- [ ] Import history and error reports accessible
