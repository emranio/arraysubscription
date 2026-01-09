# Container / Flex

Flexbox layout container for arranging form fields. `Flex` is an alias for `Container`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `field` | string | **required** | `"Container"` or `"Flex"` |
| `children` | array | **required** | Child fields/components |
| `gap` | number | `0` | Gap between items (px) |
| `justify` | string | `"flex-start"` | Justify content alignment |
| `align` | string | `"stretch"` | Align items alignment |
| `direction` | string | `"row"` | Flex direction |
| `wrap` | boolean | `false` | Allow wrapping |
| `vertical` | boolean | `false` | Shorthand for direction="column" |
| `className` | string | optional | Additional CSS class |
| `style` | object | optional | Inline styles |

## Justify Values

- `flex-start` - Align to start
- `center` - Center items
- `flex-end` - Align to end
- `space-between` - Space between items
- `space-around` - Space around items
- `space-evenly` - Even spacing

## Align Values

- `stretch` - Stretch to fill
- `flex-start` - Align to start
- `center` - Center items
- `flex-end` - Align to end
- `baseline` - Align baselines

## Direction Values

- `row` - Horizontal (default)
- `column` - Vertical
- `row-reverse` - Horizontal reversed
- `column-reverse` - Vertical reversed

## Basic Usage

```javascript
{
  field: "Container",
  gap: 16,
  children: [
    { field: "Text", name: "first_name", label: "First Name" },
    { field: "Text", name: "last_name", label: "Last Name" }
  ]
}
```

## Examples

### Horizontal Row
```javascript
{
  field: "Container",
  direction: "row",
  gap: 16,
  children: [
    { field: "Text", name: "city", label: "City" },
    { field: "Text", name: "state", label: "State" },
    { field: "Text", name: "zip", label: "ZIP" }
  ]
}
```

### Vertical Column (Using vertical prop)
```javascript
{
  field: "Container",
  vertical: true,  // Shorthand for direction="column"
  gap: 12,
  children: [
    { field: "Text", name: "address1", label: "Address Line 1" },
    { field: "Text", name: "address2", label: "Address Line 2" },
    { field: "Text", name: "city", label: "City" }
  ]
}
```

### Vertical Column (Using direction)
```javascript
{
  field: "Container",
  direction: "column",
  gap: 12,
  children: [
    { field: "Switch", name: "option1", label: "Option 1" },
    { field: "Switch", name: "option2", label: "Option 2" },
    { field: "Switch", name: "option3", label: "Option 3" }
  ]
}
```

### Centered
```javascript
{
  field: "Container",
  justify: "center",
  align: "center",
  gap: 16,
  children: [
    { field: "Text", name: "username", label: "Username" },
    { field: "Password", name: "password", label: "Password" }
  ]
}
```

### Space Between
```javascript
{
  field: "Container",
  justify: "space-between",
  align: "center",
  children: [
    { field: "Text", name: "label", label: "Label" },
    { field: "Switch", name: "enabled", label: "Enabled" }
  ]
}
```

### Wrapped Grid
```javascript
{
  field: "Container",
  wrap: true,
  gap: 16,
  children: [
    { field: "Text", name: "field1", label: "Field 1" },
    { field: "Text", name: "field2", label: "Field 2" },
    { field: "Text", name: "field3", label: "Field 3" },
    { field: "Text", name: "field4", label: "Field 4" }
  ]
}
```

### Nested Containers
```javascript
{
  field: "Container",
  direction: "column",
  gap: 24,
  children: [
    {
      field: "Container",
      direction: "row",
      gap: 16,
      children: [
        { field: "Text", name: "first_name", label: "First Name" },
        { field: "Text", name: "last_name", label: "Last Name" }
      ]
    },
    {
      field: "Container",
      direction: "row",
      gap: 16,
      children: [
        { field: "Text", name: "email", label: "Email" },
        { field: "Text", name: "phone", label: "Phone" }
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
      label: "Contact",
      children: [
        {
          field: "Container",
          gap: 16,
          children: [
            { field: "Text", name: "email", label: "Email" },
            { field: "Text", name: "phone", label: "Phone" }
          ]
        }
      ]
    }
  ]
}
```

### Inside Repeater
```javascript
{
  field: "Repeater",
  name: "contacts",
  label: "Contacts",
  children: [
    {
      field: "Container",
      direction: "row",
      gap: 16,
      children: [
        { field: "Text", name: "name", label: "Name" },
        { field: "Text", name: "email", label: "Email" }
      ]
    }
  ]
}
```

## CSS Classes

- `.arraysubscription-fb-container` - Main container element

## Features

- **Flexbox Layout**: Full flexbox control
- **Gap Support**: Consistent spacing
- **Direction Control**: Row or column
- **Alignment**: Justify and align items
- **Wrapping**: Optional wrap behavior
- **Nesting**: Unlimited nesting depth
- **Responsive**: Works with all screen sizes

## Layout Patterns

### Two-Column Form
```javascript
{
  field: "Container",
  direction: "row",
  gap: 16,
  children: [
    { field: "Text", name: "field1", label: "Field 1" },
    { field: "Text", name: "field2", label: "Field 2" }
  ]
}
```

### Three-Column Form
```javascript
{
  field: "Container",
  direction: "row",
  gap: 12,
  children: [
    { field: "Text", name: "field1", label: "Field 1" },
    { field: "Text", name: "field2", label: "Field 2" },
    { field: "Text", name: "field3", label: "Field 3" }
  ]
}
```

### Inline Label-Field
```javascript
{
  field: "Container",
  direction: "row",
  align: "center",
  gap: 12,
  children: [
    { field: "Html", html: "<strong>Setting:</strong>" },
    { field: "Switch", name: "enabled", label: "" }
  ]
}
```

## Notes

- `Flex` and `Container` are the same component
- Replaced deprecated `Row` and `Col` components
- Use `vertical: true` as shorthand for `direction: "column"`
- Works with all field types
- Supports unlimited nesting
- Gap is in pixels (no unit needed)
- For CSS Grid, use the `Grid` component instead
