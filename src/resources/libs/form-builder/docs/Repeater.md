# Repeater Field

Dynamic repeating field groups with drag-and-drop reordering, collapsible items, and nested support.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `field` | string | **required** | Must be `"Repeater"` |
| `name` | string | **required** | Field name for array data |
| `label` | string | optional | Repeater label |
| `children` | array | `[]` | Field definitions for each item |
| `addButtonText` | string | `"Add Item"` | Add button text |
| `itemTitleTemplate` | string | `"Item {index}"` | Title template |
| `showDeleteButton` | boolean | `true` | Show delete buttons |
| `showFirstInputInTitle` | boolean | `true` | Show first field value in title |
| `collapsible` | boolean | `true` | Allow collapse/expand |
| `initialCount` | number | `0` | Initial number of items |

## Basic Usage

```javascript
{
  field: "Repeater",
  name: "team_members",
  label: "Team Members",
  addButtonText: "Add Member",
  children: [
    {
      field: "Text",
      name: "name",
      label: "Name",
      rules: [{ required: true }]
    },
    {
      field: "Text",
      name: "email",
      label: "Email",
      rules: [{ type: "email" }]
    },
    {
      field: "Select",
      name: "role",
      label: "Role",
      data: [
        { value: "admin", label: "Admin" },
        { value: "member", label: "Member" }
      ]
    }
  ]
}
```

## Examples

### Simple List
```javascript
{
  field: "Repeater",
  name: "tasks",
  label: "Task List",
  addButtonText: "Add Task",
  itemTitleTemplate: "Task {index}",
  children: [
    {
      field: "Text",
      name: "task_name",
      label: "Task Name"
    },
    {
      field: "Switch",
      name: "completed",
      label: "Completed"
    }
  ]
}
```

### Nested Repeater
```javascript
{
  field: "Repeater",
  name: "categories",
  label: "Categories",
  children: [
    {
      field: "Text",
      name: "category_name",
      label: "Category Name"
    },
    {
      field: "Repeater",
      name: "products",
      label: "Products",
      children: [
        {
          field: "Text",
          name: "product_name",
          label: "Product Name"
        },
        {
          field: "Number",
          name: "price",
          label: "Price"
        }
      ]
    }
  ]
}
```

### With Container Layout
```javascript
{
  field: "Repeater",
  name: "links",
  label: "Links",
  children: [
    {
      field: "Container",
      gap: 16,
      children: [
        {
          field: "Text",
          name: "title",
          label: "Link Title"
        },
        {
          field: "Text",
          name: "url",
          label: "URL"
        }
      ]
    }
  ]
}
```

### Non-Collapsible
```javascript
{
  field: "Repeater",
  name: "simple_list",
  label: "Items",
  collapsible: false,
  children: [
    {
      field: "Text",
      name: "value",
      label: "Value"
    }
  ]
}
```

### With Initial Items
```javascript
{
  field: "Repeater",
  name: "contacts",
  label: "Contacts",
  initialCount: 2,
  value: [
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Smith", email: "jane@example.com" }
  ],
  children: [
    { field: "Text", name: "name", label: "Name" },
    { field: "Text", name: "email", label: "Email" }
  ]
}
```

## Features

- **Drag & Drop**: Reorder items by dragging
- **Collapsible**: Expand/collapse items to save space
- **Dynamic Title**: Shows first field value in item title
- **Nested Support**: Can contain other repeaters
- **Validation**: Each item can have field validations
- **Delete**: Remove individual items
- **Auto-expand**: New items auto-expand when added

## Form Data Structure

Returns array of objects:

```javascript
{
  team_members: [
    { name: "John Doe", email: "john@example.com", role: "admin" },
    { name: "Jane Smith", email: "jane@example.com", role: "member" }
  ]
}
```

## Nested Data Structure

```javascript
{
  categories: [
    {
      category_name: "Electronics",
      products: [
        { product_name: "Laptop", price: 999 },
        { product_name: "Mouse", price: 29 }
      ]
    },
    {
      category_name: "Books",
      products: [
        { product_name: "JavaScript Guide", price: 39 }
      ]
    }
  ]
}
```

## CSS Classes

- `.arraysubscription-fb-repeater` - Main container
- `.arraysubscription-fb-repeater-items` - Items container
- `.arraysubscription-fb-repeater-item` - Individual item
- `.arraysubscription-fb-repeater-item-header` - Item header with title
- `.arraysubscription-fb-repeater-item-content` - Item content area
- `.arraysubscription-fb-repeater-add-button` - Add button
- `.arraysubscription-fb-repeater-drag-handle` - Drag handle icon

## Notes

- Uses `@dnd-kit` for drag-and-drop functionality
- Each item has unique ID for proper React rendering
- Supports unlimited nesting depth
- Works with all field types including other Repeaters
- Maintains field state during reordering
- Open/closed state preserved during reorder
