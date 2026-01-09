# Radio Field

Radio button group for single selection from multiple options.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `field` | string | **required** | Must be `"Radio"` |
| `name` | string | **required** | Field name |
| `label` | string | optional | Group label |
| `data` | array | `[]` | Radio options |
| `orientation` | string | `"vertical"` | `"vertical"` or `"horizontal"` |
| `rules` | array | `[]` | Validation rules |
| `value` | string/number | optional | Selected value |

## Examples

```javascript
// Basic radio group
{
  field: "Radio",
  name: "gender",
  label: "Gender",
  data: [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" }
  ]
}

// Horizontal layout
{
  field: "Radio",
  name: "size",
  label: "Size",
  orientation: "horizontal",
  data: [
    { value: "s", label: "Small" },
    { value: "m", label: "Medium" },
    { value: "l", label: "Large" },
    { value: "xl", label: "X-Large" }
  ]
}
```

Returns single selected value: `{ gender: "male" }`
