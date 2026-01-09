# DataList Module

A reusable, feature-rich data listing component for WordPress Custom Post Types (CPT) built with React. This module provides both table and card view layouts with full CRUD operations, sorting, filtering, pagination, and bulk actions.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Props Reference](#props-reference)
- [Components](#components)
- [Column Formatting](#column-formatting)
- [Custom Actions](#custom-actions)
- [View Modes](#view-modes)
- [Styling](#styling)
- [API Integration](#api-integration)
- [Examples](#examples)

---

## Overview

The DataList module is designed to work seamlessly with WordPress REST API to display, manage, and interact with Custom Post Type and Taxonomy data. It follows WordPress admin UI patterns and integrates with the existing admin styles.

### Architecture

```
data-list/
├── DataList.jsx          # Main container component
├── index.js              # Module export
├── components/
│   ├── Header.jsx        # Page header with "Add New" button
│   ├── StatusTabs.jsx    # Status filter tabs (all/publish/draft/trash)
│   ├── Toolbar.jsx       # Bulk actions & search
│   ├── TableView.jsx     # Table layout container
│   ├── TableHead.jsx     # Table header with sortable columns
│   ├── TableBody.jsx     # Table rows with row actions
│   ├── CardView.jsx      # Card/grid layout
│   ├── Pagination.jsx    # Page navigation
│   ├── RowActions.jsx    # Edit/Trash/Restore/Delete actions
│   ├── FeaturedImageCell.jsx    # Featured image display
│   └── MediaGalleryCell.jsx     # Media gallery thumbnail display
└── styles/
    ├── index.scss        # Main SCSS entry point
    ├── header.scss       # Header & status tabs styles
    ├── table.scss        # Table view styles
    ├── card.scss         # Card view styles
    └── pagination.scss   # Pagination styles
```

---

## Features

- ✅ **Table View** - Traditional WordPress-style list table
- ✅ **Card View** - Grid layout for visual content
- ✅ **Custom View Component** - Pass your own view component
- ✅ **Post Type Support** - Full CRUD for custom post types
- ✅ **Taxonomy Support** - Manage taxonomies and terms with meta fields
- ✅ **Status Filtering** - Filter by all/publish/draft/trash (post types only)
- ✅ **Search** - Debounced search with 500ms delay
- ✅ **Sorting** - Sortable columns (title/name, date, meta fields)
- ✅ **Pagination** - Full pagination with item counts
- ✅ **Bulk Actions** - Trash/Delete multiple items
- ✅ **Row Actions** - Edit, Trash, Restore, Delete per item
- ✅ **Custom Actions** - Add custom row actions with callbacks
- ✅ **Featured Images** - Display featured images in listings
- ✅ **Media Galleries** - Display media gallery thumbnails
- ✅ **Meta Column Support** - Display and format custom meta fields
- ✅ **Column Formatting** - Support for string, number, bool, tag, media_gallery types

---

## Installation

Import the DataList component in your React application:

```jsx
import DataList from "@libs/data-list";
```

The styles are automatically imported with the component.

---

## Basic Usage

```jsx
import React from "react";
import DataList from "@libs/data-list";

const MyPostsList = () => {
  const { env } = window.arraySubscription;

  return (
    <DataList
      cptSlug="my-cpt"
      addUrl="/admin/my-cpt/new"
      editUrl="/admin/my-cpt/edit"
      labels={{
        singular: "Item",
        plural: "Items",
      }}
      restUrl={env.apiBaseUrl}
      nonce={env.nonce}
      columns={["date"]}
      metaColumns={["custom_field"]}
      perPage={10}
    />
  );
};

export default MyPostsList;
```

---

## Props Reference

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `restUrl` | `string` | WordPress REST API base URL (e.g., `window.arraySubscription.env.apiBaseUrl`) |
| `nonce` | `string` | WordPress REST API nonce for authentication |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cptSlug` | `string` | - | Custom Post Type or Taxonomy slug for REST API endpoints |
| `dataSource` | `string` | `"post_type"` | Data source type: `"post_type"` or `"taxonomy"` |
| `addUrl` | `string` | - | URL/route for "Add New" button (uses Link component) |
| `onAddNew` | `function` | - | Callback for "Add New" button (alternative to addUrl, uses button) |
| `editUrl` | `string` | - | Base URL for edit links (item ID appended, uses Link) |
| `onEdit` | `function` | - | Callback for edit action (CardView only, alternative to editUrl) |
| `onDeleteWarnMsg` | `string\|function` | - | Custom delete warning message (string or function that receives item) |
| `labels` | `object` | `{}` | Labels configuration object |
| `labels.singular` | `string` | `"Item"` | Singular label for the post type |
| `labels.plural` | `string` | `"Items"` | Plural label for the post type |
| `allowedActions` | `array` | `["edit", "trash", "restore", "delete"]` | Allowed row actions |
| `perPage` | `number` | `10` | Items per page |
| `columns` | `array` | `["date"]` | Standard WordPress columns to display |
| `metaColumns` | `array` | `[]` | Meta field keys to display as columns |
| `columnFormats` | `object` | `{}` | Column formatting configuration |
| `customActions` | `array` | `[]` | Custom action buttons configuration |
| `isFeaturedImage` | `boolean` | `false` | Show featured image in title column |
| `viewComponent` | `React.Component` | `TableView` | Custom view component |

---

## Components

### DataList (Main Component)

The main container that orchestrates all sub-components and manages state.

**State Management:**
- `items` - Current page items from API
- `loading` - Loading state
- `search` - Search query (debounced)
- `statusFilter` - Current status filter (all/publish/draft/trash)
- `currentPage` - Current pagination page
- `totalPages` / `totalItems` - Pagination info
- `statusCounts` - Count per status for tabs
- `selectedItems` - Selected items for bulk actions
- `bulkAction` - Selected bulk action
- `sortBy` / `sortOrder` - Current sort configuration

### Header

Displays page title and "Add New" button.

```jsx
<DataListHeader
  singular="Item"
  addUrl="/admin/items/new"
/>
```

### StatusTabs

Status filter tabs with item counts.

```jsx
<StatusTabs
  statusFilter="all"
  statusCounts={{ all: 100, publish: 80, draft: 15, trash: 5 }}
  onStatusChange={(status) => setStatusFilter(status)}
/>
```

### Toolbar

Bulk actions dropdown and search input.

```jsx
<Toolbar
  plural="Items"
  bulkAction=""
  selectedItems={[1, 2, 3]}
  allowedActions={["trash", "delete"]}
  search=""
  onBulkActionChange={(action) => setBulkAction(action)}
  onBulkActionApply={() => handleBulkAction()}
  onSearchChange={(term) => setSearch(term)}
/>
```

### TableView

Table layout container that combines TableHead and TableBody.

### CardView

Grid layout displaying items as cards with featured images and dropdown menus.

### Pagination

Page navigation with first/prev/next/last buttons and item count.

```jsx
<Pagination
  currentPage={1}
  totalPages={10}
  totalItems={100}
  onPageChange={(page) => setCurrentPage(page)}
/>
```

### RowActions

Row-level action buttons (Edit, Trash, Restore, Delete, Custom).

```jsx
<RowActions
  item={item}
  editUrl="/admin/items/edit"
  allowedActions={["edit", "trash", "restore", "delete"]}
  customActions={[{ name: "duplicate", label: "Duplicate", callback: handleDuplicate }]}
  onTrash={handleTrash}
  onRestore={handleRestore}
  onDelete={handleDelete}
  onRefresh={handleRefresh}
/>
```

### FeaturedImageCell

Displays a featured image from a media ID stored in meta.

```jsx
<FeaturedImageCell
  value={item.meta?.featured_image}  // Media ID or JSON string
  restUrl={restUrl}
  nonce={nonce}
  size="thumbnail"
/>
```

### MediaGalleryCell

Displays up to 3 thumbnails from a media gallery with "+N" overflow indicator.

```jsx
<MediaGalleryCell
  value={item.meta?.gallery}  // Array of media IDs or JSON string
  restUrl={restUrl}
  nonce={nonce}
/>
```

---

## Callback Props

DataList provides several callback props for custom behavior without navigation.

### onAddNew

Use `onAddNew` instead of `addUrl` when you want to handle the "Add New" action programmatically (e.g., open a modal).

```jsx
const handleAddNew = () => {
  // Open modal, navigate programmatically, etc.
  setModalOpen(true);
};

<DataList
  // ... other props
  onAddNew={handleAddNew}
  // Don't use addUrl when using onAddNew
/>
```

**When to use:**
- Opening modals for create forms
- Programmatic navigation with state
- Custom pre-create actions
- Triggering analytics events

### onEdit

**CardView only.** Use `onEdit` instead of `editUrl` when you want to handle edit actions programmatically.

```jsx
const handleEdit = (item) => {
  // item contains full item data
  setEditingItem(item);
  setModalOpen(true);
};

<DataList
  // ... other props
  viewComponent={CardView}
  onEdit={handleEdit}
  // Don't use editUrl when using onEdit
/>
```

**When to use:**
- Opening modals for edit forms
- Programmatic navigation with item data
- Custom pre-edit actions
- Triggering analytics events

**Note:** `onEdit` is only used in `CardView`. For `TableView`, edit links always use the `editUrl` prop.

### onDeleteWarnMsg

Customize the delete confirmation message. Can be a string or a function that receives the item.

```jsx
// Simple string message
<DataList
  // ... other props
  onDeleteWarnMsg="Are you absolutely sure? This cannot be undone!"
/>

// Function for dynamic messages
const getDeleteWarning = (item) => {
  const title = item.title?.rendered || item.name;
  return `Delete "${title}"? This will permanently remove it and all associated data.`;
};

<DataList
  // ... other props
  onDeleteWarnMsg={getDeleteWarning}
/>
```

**When to use:**
- Custom warning messages for specific post types
- Include item details in warning
- Warn about cascading deletes
- Add legal disclaimers
- Multilingual warning messages

---

## Taxonomy Support

DataList fully supports WordPress taxonomies with automatic handling of taxonomy-specific features.

### Key Differences

When `dataSource="taxonomy"`:

- **No Status Filtering** - Taxonomies don't have publish/draft/trash statuses
- **No Date Column** - Taxonomies don't have date fields
- **Name vs Title** - Uses `item.name` instead of `item.title.rendered`
- **Count Column** - Displays `item.count` (number of posts using the term)
- **Direct Delete** - Trash action directly deletes (no trash state)
- **Meta Fields** - Supports custom term meta fields via `register_term_meta()`

### Taxonomy Configuration

```jsx
<DataList
  cptSlug="your_taxonomy_slug"
  dataSource="taxonomy"
  addUrl="/admin/taxonomy/new"
  editUrl="/admin/taxonomy/edit"
  labels={{
    singular: "Term",
    plural: "Terms"
  }}
  restUrl={window.arraySubscription.env.apiBaseUrl}
  nonce={window.arraySubscription.env.nonce}
  columns={["count"]}
  metaColumns={["custom_meta_field"]}
  columnFormats={{
    count: "number",
    custom_meta_field: "string"
  }}
  allowedActions={["edit", "delete"]}
  statusList={[{ status: "all", label: "All" }]}
/>
```

### Registering Taxonomy with Meta

```php
// Register taxonomy
register_taxonomy('your_taxonomy', ['post'], [
    'labels' => $labels,
    'public' => true,
    'show_in_rest' => true, // Required for REST API
    'rest_base' => 'your_taxonomy',
]);

// Register term meta
register_term_meta('your_taxonomy', 'custom_field', [
    'type' => 'string',
    'single' => true,
    'show_in_rest' => true, // Required for REST API
    'sanitize_callback' => 'sanitize_text_field',
    'auth_callback' => function () {
        return current_user_can('manage_categories');
    }
]);
```

---

## Column Formatting

The `columnFormats` prop allows you to configure how column values are displayed.

### Format Types

#### String (default)
```jsx
columnFormats={{
  my_field: "string"  // or { type: "string" }
}}
// Output: value or "-"
```

#### Number
```jsx
columnFormats={{
  count: "number"  // or { type: "number" }
}}
// Output: formatted number with locale (e.g., "1,234")
```

#### Boolean
```jsx
columnFormats={{
  is_active: {
    type: "bool",
    texts: { true: "Active", false: "Inactive" }  // Optional custom labels
  }
}}
// Output: "Active" or "Inactive" (default: "Yes" / "No")
```

#### Tag
```jsx
columnFormats={{
  status: "tag"  // or { type: "tag" }
}}
// Output: Colored badge/pill
// Built-in colors: publish (blue), draft (yellow), trash (red), pending (orange)
```

#### Media Gallery
```jsx
columnFormats={{
  gallery_field: {
    type: "media_gallery"
  }
}}
// Output: Up to 3 thumbnails with overflow count
```

### Advanced Configuration

```jsx
columnFormats={{
  my_column: {
    type: "number",
    label: "Custom Label",    // Override column header
    sortable: true            // Enable sorting on this column
  }
}}
```

---

## Custom Actions

Add custom action buttons to each row:

```jsx
const customActions = [
  {
    name: "duplicate",
    label: "Duplicate",
    callback: async (itemId, item) => {
      await duplicateItem(itemId);
      // Refresh is called automatically after callback
    }
  },
  {
    name: "preview",
    label: "Preview",
    callback: (itemId, item) => {
      window.open(item.link, "_blank");
    }
  }
];

<DataList
  // ...other props
  customActions={customActions}
/>
```

**Custom Action Object:**
| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | Unique identifier for the action |
| `label` | `string` | Display text for the button |
| `callback` | `function` | Async function called with `(itemId, item)` |

---

## View Modes

### Default TableView

The default view displays items in a WordPress-style table.

### CardView

Use the `CardView` component for a grid layout:

```jsx
import DataList from "@libs/data-list";
import CardView from "@libs/data-list/components/CardView";

<DataList
  // ...other props
  viewComponent={CardView}
/>
```

### Custom View Component

Create your own view component:

```jsx
const MyCustomView = ({
  items,
  plural,
  editUrl,
  allowedActions,
  customActions,
  selectedItems,
  onSelectItem,
  onTrash,
  onRestore,
  onDelete,
  onRefresh,
  isFeaturedImage,
  restUrl,
  nonce,
}) => {
  // Your custom rendering logic
  return (
    <div className="my-custom-view">
      {items.map(item => (
        <div key={item.id}>{item.title.rendered}</div>
      ))}
    </div>
  );
};

<DataList
  // ...other props
  viewComponent={MyCustomView}
/>
```

**Note:** When using `TableView`, additional props are passed: `columns`, `columnFormats`, `onSelectAll`, `sortBy`, `sortOrder`, `onSort`, `renderColumnValue`.

---

## Styling

### SCSS Structure

The module uses modular SCSS with the following class prefixes:

- `.data-list-` - General container classes
- `.data-list-header` - Header section
- `.data-list-status-tabs` - Status filter tabs
- `.data-list-toolbar` - Toolbar with bulk actions and search
- `.data-list-table` - Table view
- `.data-list-row` - Table rows
- `.data-list-actions` - Row actions
- `.data-list-card-*` - Card view classes
- `.data-list-pagination` - Pagination

### Customizing Styles

Override styles in your feature's SCSS:

```scss
// In your feature SCSS file
.data-list-table-container {
  // Your custom styles
}

.data-list-card {
  background: #f0f0f0;
  border-radius: 8px;
}
```

### WordPress Admin Compatibility

The module uses WordPress admin classes for consistency:
- `.wp-list-table` - Standard WordPress table styling
- `.widefat` - Wide table format
- `.fixed` - Fixed column widths
- `.striped` - Alternating row colors
- `.wp-heading-inline` - Page heading style
- `.page-title-action` - "Add New" button style

---

## API Integration

### REST API Endpoints Used

#### Post Type Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `{restUrl}wp/v2/{cptSlug}` | GET | Fetch items with pagination, search, and status filters |
| `{restUrl}wp/v2/{cptSlug}/{id}` | DELETE | Trash an item |
| `{restUrl}wp/v2/{cptSlug}/{id}?force=true` | DELETE | Permanently delete an item |
| `{restUrl}wp/v2/{cptSlug}/{id}` | POST | Restore item (set status to draft) |
| `{restUrl}arraysubscription/v1/status-counts/{cptSlug}` | GET | Get item counts per status |

#### Taxonomy Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `{restUrl}wp/v2/{taxonomySlug}` | GET | Fetch terms with pagination and search |
| `{restUrl}wp/v2/{taxonomySlug}/{id}` | GET | Get single term with meta |
| `{restUrl}wp/v2/{taxonomySlug}` | POST | Create new term |
| `{restUrl}wp/v2/{taxonomySlug}/{id}` | POST | Update term |
| `{restUrl}wp/v2/{taxonomySlug}/{id}?force=true` | DELETE | Delete term permanently |

**Note:** WordPress automatically includes `X-WP-Total` and `X-WP-TotalPages` headers in responses for pagination.

### Query Parameters

The component automatically handles these parameters:

- `per_page` - Items per page
- `page` - Current page number
- `search` - Search term
- `status` - Filter by status (or array `["publish", "draft"]`)
- `orderby` - Sort field (`title`, `date`, `meta_value`, `meta_value_num`)
- `order` - Sort direction (`asc`, `desc`)
- `meta_key` - Meta field for sorting (when sorting by meta)

### URL Building

Uses the `buildUrl` utility which properly handles:
- Plain permalinks (`index.php?rest_route=...`)
- Pretty permalinks (`/wp-json/...`)
- Existing query parameters

---

## Examples

### Basic Post Type List

```jsx
<DataList
  cptSlug="posts"
  addUrl="/admin/posts/new"
  editUrl="/admin/posts/edit"
  labels={{
    singular: "Post",
    plural: "Posts",
  }}
  restUrl={window.arraySubscription.env.apiBaseUrl}
  nonce={window.arraySubscription.env.nonce}
/>
```

### With Meta Columns and Formatting

```jsx
<DataList
  cptSlug="products"
  addUrl="/admin/products/new"
  editUrl="/admin/products/edit"
  labels={{
    singular: "Product",
    plural: "Products"
  }}
  restUrl={env.apiBaseUrl}
  nonce={env.nonce}
  columns={["date"]}
  metaColumns={["price", "stock", "status", "gallery"]}
  columnFormats={{
    price: {
      type: "number",
      label: "Price ($)",
      sortable: true
    },
    stock: {
      type: "number",
      label: "In Stock"
    },
    status: {
      type: "tag"
    },
    gallery: {
      type: "media_gallery"
    }
  }}
  isFeaturedImage={true}
  perPage={20}
/>
```

### With Custom Actions

```jsx
<DataList
  cptSlug="orders"
  editUrl="/admin/orders"
  labels={{
    singular: "Order",
    plural: "Orders"
  }}
  restUrl={env.apiBaseUrl}
  nonce={env.nonce}
  allowedActions={["edit", "delete"]}
  customActions={[
    {
      name: "mark-complete",
      label: "Mark Complete",
      callback: async (id) => {
        await fetch(`${env.apiBaseUrl}orders/${id}/complete`, {
          method: "POST",
          headers: { "X-WP-Nonce": env.nonce }
        });
      }
    },
    {
      name: "print",
      label: "Print Invoice",
      callback: (id, item) => {
        window.open(`/invoice/${id}`, "_blank");
      }
    }
  ]}
/>
```

### Card View for Media Library

```jsx
import CardView from "@libs/data-list/components/CardView";

<DataList
  cptSlug="portfolio"
  addUrl="/admin/portfolio/new"
  editUrl="/admin/portfolio/edit"
  labels={{
    singular: "Portfolio Item",
    plural: "Portfolio"
  }}
  restUrl={env.apiBaseUrl}
  nonce={env.nonce}
  viewComponent={CardView}
  isFeaturedImage={true}
  perPage={12}
/>
```

### Taxonomy with Meta Fields

```jsx
<DataList
  cptSlug="product_categories"
  dataSource="taxonomy"
  addUrl="/admin/categories/new"
  editUrl="/admin/categories/edit"
  labels={{
    singular: "Category",
    plural: "Categories"
  }}
  restUrl={env.apiBaseUrl}
  nonce={env.nonce}
  columns={["count"]}
  metaColumns={["category_icon", "priority", "is_featured"]}
  columnFormats={{
    count: "number",
    category_icon: "string",
    priority: "number",
    is_featured: {
      type: "bool",
      texts: { true: "Featured", false: "Regular" }
    }
  }}
  allowedActions={["edit", "delete"]}
  statusList={[{ status: "all", label: "All" }]}
  perPage={20}
/>
```

### With Modal Forms (Callback Props)

```jsx
import { useState } from "react";
import DataList from "@libs/data-list";
import CardView from "@libs/data-list/CardView";

const ProductsWithModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleAddNew = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const getDeleteWarning = (item) => {
    const hasOrders = item.meta?.order_count > 0;
    if (hasOrders) {
      return `Delete "${item.title.rendered}"? This product has ${item.meta.order_count} orders. Deleting it will affect order history.`;
    }
    return `Delete "${item.title.rendered}"? This action cannot be undone.`;
  };

  return (
    <>
      <DataList
        cptSlug="products"
        viewComponent={CardView}
        onAddNew={handleAddNew}
        onEdit={handleEdit}
        onDeleteWarnMsg={getDeleteWarning}
        labels={{ singular: "Product", plural: "Products" }}
        restUrl={window.arraySubscription.env.apiBaseUrl}
        nonce={window.arraySubscription.env.nonce}
        isFeaturedImage={true}
      />
      
      {modalOpen && (
        <ProductFormModal
          item={editingItem}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};
```

---

## Dependencies

- **React 18** - UI library
- **react-router-dom** - Navigation (Link component)

---

## Notes

### Security
- All API requests include the `X-WP-Nonce` header for authentication
- Delete operations require user confirmation via `confirm()` dialog

### Performance
- Search is debounced (500ms) to prevent excessive API calls
- Status counts are fetched once on mount
- Media details are fetched lazily for FeaturedImageCell and MediaGalleryCell

### Accessibility
- Checkbox inputs for row selection
- Sortable columns with visual indicators
- Proper button elements for actions

---

## Changelog

### Version 1.0.0
- Initial release with TableView and CardView
- Full CRUD operations via WordPress REST API
- Meta column support with formatting
- Custom actions support
- Featured image and media gallery display
