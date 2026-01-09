# Accordion / Collapse

Collapsible content sections for organizing form fields. `Collapse` is an alias for `Accordion`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `field` | string | **required** | `"Accordion"` or `"Collapse"` |
| `items` | array | **required** | Accordion items |
| `accordion` | boolean | `false` | Only one item open at a time |
| `multiple` | boolean | `false` | Allow multiple open items |
| `ghost` | boolean | `false` | Borderless style |
| `className` | string | optional | Additional CSS class |
| `style` | object | optional | Inline styles |

## Item Structure

```javascript
{
  key: "unique_key",     // Required: Unique identifier
  label: "Section Title", // Required: Header text
  disabled: false,        // Optional: Disable this item
  children: []            // Required: Form fields array
}
```

## Basic Usage

```javascript
{
  field: "Accordion",
  items: [
    {
      key: "1",
      label: "Basic Information",
      children: [
        { field: "Text", name: "first_name", label: "First Name" },
        { field: "Text", name: "last_name", label: "Last Name" }
      ]
    },
    {
      key: "2",
      label: "Contact Details",
      children: [
        { field: "Text", name: "email", label: "Email" },
        { field: "Text", name: "phone", label: "Phone" }
      ]
    }
  ]
}
```

## Examples

### Single Open (Accordion Mode)
```javascript
{
  field: "Accordion",
  accordion: true,  // Only one section open at a time
  items: [
    {
      key: "personal",
      label: "Personal Information",
      children: [
        { field: "Text", name: "name", label: "Full Name" },
        { field: "Date", name: "dob", label: "Date of Birth" }
      ]
    },
    {
      key: "address",
      label: "Address Information",
      children: [
        { field: "Text", name: "street", label: "Street" },
        { field: "Text", name: "city", label: "City" }
      ]
    }
  ]
}
```

### Multiple Open
```javascript
{
  field: "Collapse",
  multiple: true,  // Allow multiple sections open
  items: [
    {
      key: "1",
      label: "Section 1",
      children: [/* fields */]
    },
    {
      key: "2",
      label: "Section 2",
      children: [/* fields */]
    }
  ]
}
```

### Ghost Style
```javascript
{
  field: "Accordion",
  ghost: true,  // Borderless style
  items: [
    {
      key: "settings",
      label: "Settings",
      children: [
        { field: "Switch", name: "notifications", label: "Enable Notifications" }
      ]
    }
  ]
}
```

### With Disabled Section
```javascript
{
  field: "Accordion",
  items: [
    {
      key: "1",
      label: "Active Section",
      children: [/* fields */]
    },
    {
      key: "2",
      label: "Disabled Section",
      disabled: true,
      children: [/* fields */]
    }
  ]
}
```

### Nested Accordion
```javascript
{
  field: "Accordion",
  items: [
    {
      key: "main",
      label: "Main Settings",
      children: [
        {
          field: "Accordion",
          items: [
            {
              key: "sub1",
              label: "Sub Settings 1",
              children: [
                { field: "Switch", name: "option1", label: "Option 1" }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

### Inside Tabs
```javascript
{
  field: "Tabs",
  items: [
    {
      key: "1",
      label: "Tab 1",
      children: [
        {
          field: "Accordion",
          items: [
            {
              key: "section1",
              label: "Section 1",
              children: [
                { field: "Text", name: "field1", label: "Field 1" }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

## CSS Classes

- `.arraysubscription-fb-accordion` - Main container
- `.arraysubscription-fb-accordion-single` - Single open mode
- `.arraysubscription-fb-accordion-ghost` - Ghost style
- `.arraysubscription-fb-accordion-item` - Individual item
- `.arraysubscription-fb-accordion-header` - Clickable header
- `.arraysubscription-fb-accordion-header-active` - Active header
- `.arraysubscription-fb-accordion-panel` - Content panel
- `.arraysubscription-fb-accordion-panel-open` - Open panel
- `.arraysubscription-fb-accordion-icon` - Expand/collapse icon
- `.arraysubscription-fb-accordion-icon-open` - Icon when open

## Features

- **Click to Toggle**: Click header to expand/collapse
- **Keyboard Accessible**: Tab navigation and Enter to toggle
- **Smooth Animation**: Animated expand/collapse
- **Icon Indicator**: Arrow icon shows open/closed state
- **Disabled Sections**: Prevent certain sections from opening
- **Flexible Styling**: Ghost mode for borderless design

## Behavior

- **Default**: All sections start closed
- **Accordion mode** (`accordion: true`): Opening one closes others
- **Multiple mode** (`multiple: true`): Multiple sections can be open
- **Default mode**: Manual toggle, independent sections

## Notes

- `Collapse` and `Accordion` are the same component
- Use `accordion: true` for wizard-like flows
- Use `ghost: true` for subtle dividers
- All field types supported in children
- Can be nested infinitely
- Works inside Tabs, Repeaters, etc.
