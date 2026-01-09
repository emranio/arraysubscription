# Checkbox Field

Checkbox input for single checkboxes or checkbox groups.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `field` | string | **required** | Must be `"Checkbox"` |
| `name` | string | **required** | Field name for form data |
| `label` | string | optional | Group label (for checkbox group) |
| `checkboxLabel` | string | optional | Label for single checkbox |
| `data` | array | `[]` | Options for checkbox group |
| `single` | boolean | `false` | If true, renders single checkbox |
| `orientation` | string | `"vertical"` | Layout: `"vertical"` or `"horizontal"` |
| `rules` | array | `[]` | Validation rules |
| `value` | array/boolean | `[]` / `false` | Initial value |

## Data Format (for groups)

```javascript
{
  value: "option_value",
  label: "Option Label",
  disabled: false  // Optional
}
```

## Basic Usage

### Single Checkbox
```javascript
{
  field: "Checkbox",
  name: "agree",
  checkboxLabel: "I agree to the terms",
  single: true,
  rules: [
    {
      validator: (rule, value) => {
        if (!value) return Promise.reject("You must agree");
        return Promise.resolve();
      }
    }
  ]
}
```

### Checkbox Group
```javascript
{
  field: "Checkbox",
  name: "interests",
  label: "Select your interests",
  data: [
    { value: "sports", label: "Sports" },
    { value: "music", label: "Music" },
    { value: "tech", label: "Technology" },
    { value: "art", label: "Art" }
  ]
}
```

## Examples

### Single Checkbox Examples

#### Simple Agreement
```javascript
{
  field: "Checkbox",
  name: "newsletter",
  checkboxLabel: "Subscribe to newsletter",
  single: true,
  value: false
}
```

#### Required Agreement
```javascript
{
  field: "Checkbox",
  name: "terms_accepted",
  checkboxLabel: "I have read and agree to the Terms of Service",
  single: true,
  rules: [
    {
      validator: (rule, value) => {
        if (!value) {
          return Promise.reject("You must accept the terms to continue");
        }
        return Promise.resolve();
      }
    }
  ]
}
```

### Checkbox Group Examples

#### Vertical Layout (Default)
```javascript
{
  field: "Checkbox",
  name: "features",
  label: "Select features to enable",
  data: [
    { value: "feature1", label: "Advanced Search" },
    { value: "feature2", label: "Export Data" },
    { value: "feature3", label: "API Access" },
    { value: "feature4", label: "Premium Support" }
  ],
  orientation: "vertical"
}
```

#### Horizontal Layout
```javascript
{
  field: "Checkbox",
  name: "days",
  label: "Available days",
  orientation: "horizontal",
  data: [
    { value: "mon", label: "Mon" },
    { value: "tue", label: "Tue" },
    { value: "wed", label: "Wed" },
    { value: "thu", label: "Thu" },
    { value: "fri", label: "Fri" },
    { value: "sat", label: "Sat" },
    { value: "sun", label: "Sun" }
  ]
}
```

#### With Disabled Options
```javascript
{
  field: "Checkbox",
  name: "permissions",
  label: "User Permissions",
  data: [
    { value: "read", label: "Read", disabled: false },
    { value: "write", label: "Write", disabled: false },
    { value: "delete", label: "Delete", disabled: false },
    { value: "admin", label: "Admin Access", disabled: true }
  ]
}
```

#### With Default Values
```javascript
{
  field: "Checkbox",
  name: "notifications",
  label: "Notification Preferences",
  value: ["email", "push"],  // Pre-selected values
  data: [
    { value: "email", label: "Email Notifications" },
    { value: "sms", label: "SMS Notifications" },
    { value: "push", label: "Push Notifications" },
    { value: "inapp", label: "In-App Notifications" }
  ]
}
```

## Validation Rules

```javascript
// Required - at least one selection
{
  validator: (rule, value) => {
    if (!value || value.length === 0) {
      return Promise.reject("Please select at least one option");
    }
    return Promise.resolve();
  }
}

// Minimum selections
{
  validator: (rule, value) => {
    if (!value || value.length < 2) {
      return Promise.reject("Please select at least 2 options");
    }
    return Promise.resolve();
  }
}

// Maximum selections
{
  validator: (rule, value) => {
    if (value && value.length > 3) {
      return Promise.reject("You can select up to 3 options only");
    }
    return Promise.resolve();
  }
}

// Exact number of selections
{
  validator: (rule, value) => {
    if (!value || value.length !== 3) {
      return Promise.reject("Please select exactly 3 options");
    }
    return Promise.resolve();
  }
}
```

## CSS Classes

- `.arraysubscription-fb-checkbox-group` - Group container
- `.arraysubscription-fb-checkbox-item` - Individual checkbox wrapper
- `.arraysubscription-fb-orientation-horizontal` - Horizontal layout modifier

## Form Data

### Single Checkbox
Returns boolean `true` or `false`:
```javascript
{ agree: true }
```

### Checkbox Group
Returns array of selected values:
```javascript
{ interests: ["sports", "music", "tech"] }
```

## Notes

- Group checkboxes are independent (not radio buttons)
- Single checkbox uses `valuePropName="checked"`
- Group checkboxes use array value
- Labels are clickable
- Keyboard accessible
- Use Radio for exclusive selections
- Use MultiSelect for searchable/scrollable lists
