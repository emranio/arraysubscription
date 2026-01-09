# Number Field

A numeric input field with support for min, max, and step values.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `field` | string | **required** | Must be `"Number"` |
| `name` | string | **required** | Field name for form data |
| `label` | string | optional | Label displayed above field |
| `placeholder` | string | auto-generated | Placeholder text |
| `min` | number | optional | Minimum allowed value |
| `max` | number | optional | Maximum allowed value |
| `step` | number | optional | Step increment value |
| `rules` | array | `[]` | Validation rules |
| `value` | number | optional | Initial value |
| `disabled` | boolean | `false` | Disable field |

## Basic Usage

```javascript
{
  field: "Number",
  name: "age",
  label: "Age",
  min: 0,
  max: 120,
  rules: [{ required: true, message: "Please enter your age" }]
}
```

## Examples

### Simple Number Input
```javascript
{
  field: "Number",
  name: "quantity",
  label: "Quantity",
  min: 1,
  value: 1
}
```

### With Step Increment
```javascript
{
  field: "Number",
  name: "price",
  label: "Price",
  min: 0,
  step: 0.01,
  placeholder: "0.00"
}
```

### Range Validation
```javascript
{
  field: "Number",
  name: "rating",
  label: "Rating (1-10)",
  min: 1,
  max: 10,
  rules: [
    { required: true, message: "Rating is required" },
    { type: "number", min: 1, max: 10, message: "Rating must be between 1 and 10" }
  ]
}
```

### Percentage Input
```javascript
{
  field: "Number",
  name: "discount",
  label: "Discount (%)",
  min: 0,
  max: 100,
  step: 5,
  value: 0
}
```

### Large Number
```javascript
{
  field: "Number",
  name: "salary",
  label: "Annual Salary",
  min: 0,
  step: 1000,
  placeholder: "Enter annual salary"
}
```

## Validation Rules

```javascript
// Required field
{ required: true, message: "This field is required" }

// Number type validation
{ type: "number", message: "Please enter a valid number" }

// Range validation
{ type: "number", min: 0, max: 100, message: "Must be between 0 and 100" }

// Integer only
{ type: "integer", message: "Please enter a whole number" }

// Custom validation
{
  validator: (rule, value) => {
    if (value && value % 5 !== 0) {
      return Promise.reject("Must be a multiple of 5");
    }
    return Promise.resolve();
  }
}
```

## CSS Classes

- `.arraysubscription-fb-input` - Main input element
- `.field-warper` - Field wrapper
- `.field-item-label` - Label element

## Notes

- Browser controls for increment/decrement
- Prevents non-numeric input
- Respects min/max constraints
- Step controls decimal places
- Can be combined with Slider for better UX
