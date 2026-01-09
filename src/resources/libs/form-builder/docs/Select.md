# Select Field

A dropdown select field for choosing from a list of options.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `field` | string | **required** | Must be `"Select"` |
| `name` | string | **required** | Field name for form data |
| `label` | string | optional | Label displayed above field |
| `placeholder` | string | auto-generated | Placeholder option text |
| `data` | array | `[]` | Array of options |
| `rules` | array | `[]` | Validation rules |
| `value` | string/number | optional | Initial selected value |
| `disabled` | boolean | `false` | Disable field |

## Data Format

Each option in the `data` array should have:

```javascript
{
  value: "option_value",  // Required: The actual value
  label: "Option Label",  // Required: Display text
  disabled: false         // Optional: Disable this option
}
```

## Basic Usage

```javascript
{
  field: "Select",
  name: "country",
  label: "Country",
  placeholder: "Select a country",
  data: [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" }
  ]
}
```

## Examples

### Simple Select
```javascript
{
  field: "Select",
  name: "status",
  label: "Status",
  data: [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" }
  ],
  rules: [{ required: true, message: "Please select a status" }]
}
```

### With Default Value
```javascript
{
  field: "Select",
  name: "priority",
  label: "Priority",
  value: "medium",
  data: [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" }
  ]
}
```

### With Disabled Options
```javascript
{
  field: "Select",
  name: "plan",
  label: "Subscription Plan",
  data: [
    { value: "free", label: "Free Plan" },
    { value: "pro", label: "Pro Plan" },
    { value: "enterprise", label: "Enterprise Plan", disabled: true }
  ]
}
```

### Large Option List
```javascript
{
  field: "Select",
  name: "timezone",
  label: "Timezone",
  placeholder: "Select your timezone",
  data: [
    { value: "UTC-12", label: "(UTC-12:00) International Date Line West" },
    { value: "UTC-11", label: "(UTC-11:00) Coordinated Universal Time-11" },
    { value: "UTC-10", label: "(UTC-10:00) Hawaii" },
    // ... more timezones
  ],
  rules: [{ required: true, message: "Timezone is required" }]
}
```

### Dynamic Options
```javascript
{
  field: "Select",
  name: "category",
  label: "Category",
  data: categories.map(cat => ({
    value: cat.id,
    label: cat.name
  })),
  rules: [{ required: true, message: "Please select a category" }]
}
```

## Validation Rules

```javascript
// Required field
{ required: true, message: "Please make a selection" }

// Custom validation
{
  validator: (rule, value) => {
    if (value === "invalid_option") {
      return Promise.reject("This option is not allowed");
    }
    return Promise.resolve();
  }
}
```

## CSS Classes

- `.arraysubscription-fb-select` - Main select element
- `.field-warper` - Field wrapper
- `.field-item-label` - Label element

## Notes

- First option is placeholder if `placeholder` prop provided
- Native browser select element (no custom dropdown)
- Keyboard navigation supported
- Mobile-friendly with native picker
- Use MultiSelect for multiple selections
- Use GridSelect for card-style options
