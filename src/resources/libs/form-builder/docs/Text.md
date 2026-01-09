# Text Field

A basic single-line text input field for capturing short text values.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `field` | string | **required** | Must be `"Text"` |
| `name` | string | **required** | Field name for form data |
| `label` | string | optional | Label displayed above the field |
| `placeholder` | string | auto-generated | Placeholder text shown in empty field |
| `rules` | array | `[]` | Validation rules (see Validation section) |
| `inline` | boolean | `false` | Display field inline with others |
| `help` | string | optional | Help text displayed below field |
| `value` | string | optional | Initial/default value |
| `disabled` | boolean | `false` | Disable the field |
| `readOnly` | boolean | `false` | Make field read-only |
| `className` | string | optional | Additional CSS class |
| `style` | object | optional | Inline styles |

## Basic Usage

```javascript
{
  field: "Text",
  name: "username",
  label: "Username",
  placeholder: "Enter your username",
  rules: [{ required: true, message: "Username is required" }]
}
```

## Examples

### Simple Text Input
```javascript
{
  field: "Text",
  name: "title",
  label: "Title"
}
```

### With Validation
```javascript
{
  field: "Text",
  name: "email",
  label: "Email Address",
  placeholder: "you@example.com",
  rules: [
    { required: true, message: "Email is required" },
    { type: "email", message: "Please enter a valid email" }
  ]
}
```

### With Help Text
```javascript
{
  field: "Text",
  name: "api_key",
  label: "API Key",
  help: "You can find your API key in your account settings",
  placeholder: "Enter your API key"
}
```

### Disabled Field
```javascript
{
  field: "Text",
  name: "user_id",
  label: "User ID",
  value: "12345",
  disabled: true
}
```

### Read-Only Field
```javascript
{
  field: "Text",
  name: "generated_code",
  label: "Generated Code",
  value: "ABC-123-XYZ",
  readOnly: true
}
```

## Validation Rules

Common validation rules for text fields:

```javascript
// Required field
{ required: true, message: "This field is required" }

// Minimum length
{ min: 3, message: "Must be at least 3 characters" }

// Maximum length
{ max: 50, message: "Must be less than 50 characters" }

// Pattern matching (regex)
{ pattern: /^[a-zA-Z0-9]+$/, message: "Only letters and numbers allowed" }

// Email validation
{ type: "email", message: "Please enter a valid email" }

// URL validation
{ type: "url", message: "Please enter a valid URL" }

// Custom validator
{ 
  validator: (rule, value) => {
    if (value && value.includes("test")) {
      return Promise.reject("Cannot contain the word 'test'");
    }
    return Promise.resolve();
  }
}
```

## CSS Classes

- `.arraysubscription-fb-input` - Main input element
- `.field-warper` - Field wrapper container
- `.field-item-label` - Label element
- `.field-item-required` - Required asterisk
- `.field-item-help` - Help text element

## Notes

- Placeholder is auto-generated from label if not provided
- Auto-focuses on validation errors
- Supports all standard HTML input attributes
- Properly handles null values to prevent React warnings
