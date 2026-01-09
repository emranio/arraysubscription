# TextArea Field

A multi-line text input field for capturing longer text content.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `field` | string | **required** | Must be `"TextArea"` or `"Textarea"` |
| `name` | string | **required** | Field name for form data |
| `label` | string | optional | Label displayed above the field |
| `placeholder` | string | auto-generated | Placeholder text |
| `rows` | number | `4` | Number of visible text rows |
| `rules` | array | `[]` | Validation rules |
| `inline` | boolean | `false` | Display inline |
| `help` | string | optional | Help text |
| `value` | string | optional | Initial value |
| `disabled` | boolean | `false` | Disable the field |
| `readOnly` | boolean | `false` | Make read-only |

## Basic Usage

```javascript
{
  field: "TextArea",
  name: "description",
  label: "Description",
  rows: 6,
  placeholder: "Enter description..."
}
```

## Examples

### Short Description
```javascript
{
  field: "TextArea",
  name: "summary",
  label: "Summary",
  rows: 3,
  placeholder: "Brief summary..."
}
```

### Long Content
```javascript
{
  field: "TextArea",
  name: "content",
  label: "Content",
  rows: 10,
  rules: [
    { required: true, message: "Content is required" },
    { min: 50, message: "Content must be at least 50 characters" }
  ]
}
```

### With Character Count Validation
```javascript
{
  field: "TextArea",
  name: "bio",
  label: "Biography",
  rows: 5,
  help: "Maximum 500 characters",
  rules: [
    { max: 500, message: "Biography cannot exceed 500 characters" }
  ]
}
```

### Read-Only Display
```javascript
{
  field: "TextArea",
  name: "terms",
  label: "Terms and Conditions",
  rows: 8,
  value: "Your terms text here...",
  readOnly: true
}
```

## Validation Rules

```javascript
// Required field
{ required: true, message: "Please provide description" }

// Minimum length
{ min: 100, message: "Please provide at least 100 characters" }

// Maximum length
{ max: 1000, message: "Description cannot exceed 1000 characters" }

// Custom validation
{
  validator: (rule, value) => {
    const wordCount = value ? value.trim().split(/\s+/).length : 0;
    if (wordCount < 10) {
      return Promise.reject("Please provide at least 10 words");
    }
    return Promise.resolve();
  }
}
```

## CSS Classes

- `.arraysubscription-fb-textarea` - Main textarea element
- `.field-warper` - Field wrapper container
- `.field-item-label` - Label element
- `.field-item-help` - Help text

## Notes

- Alias: Can use `"Textarea"` or `"TextArea"` as field type
- Automatically resizes based on rows prop
- Supports auto-resize plugins if needed
- Properly escapes special characters
