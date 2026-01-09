# Switch Field

A toggle switch component for boolean values (on/off, yes/no, enabled/disabled).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `field` | string | **required** | Must be `"Switch"` |
| `name` | string | **required** | Field name for form data |
| `label` | string | optional | Label displayed next to switch |
| `checkedText` | string | optional | Text shown when checked |
| `unCheckedText` | string | optional | Text shown when unchecked |
| `defaultChecked` | boolean | `false` | Initial checked state |
| `value` | boolean | optional | Controlled value |
| `rules` | array | `[]` | Validation rules |
| `disabled` | boolean | `false` | Disable the switch |

## Basic Usage

```javascript
{
  field: "Switch",
  name: "notifications",
  label: "Enable Notifications"
}
```

## Examples

### Simple Toggle
```javascript
{
  field: "Switch",
  name: "is_active",
  label: "Active",
  defaultChecked: true
}
```

### With Text Labels
```javascript
{
  field: "Switch",
  name: "auto_save",
  label: "Auto Save",
  checkedText: "Enabled",
  unCheckedText: "Disabled",
  defaultChecked: true
}
```

### Yes/No Toggle
```javascript
{
  field: "Switch",
  name: "agree_terms",
  label: "I agree to the terms and conditions",
  checkedText: "Yes",
  unCheckedText: "No",
  rules: [
    {
      validator: (rule, value) => {
        if (!value) {
          return Promise.reject("You must agree to continue");
        }
        return Promise.resolve();
      }
    }
  ]
}
```

### Feature Toggle
```javascript
{
  field: "Switch",
  name: "premium_features",
  label: "Enable Premium Features",
  checkedText: "ON",
  unCheckedText: "OFF",
  help: "Premium features require an active subscription"
}
```

### Disabled Switch
```javascript
{
  field: "Switch",
  name: "verified",
  label: "Account Verified",
  defaultChecked: true,
  disabled: true,
  help: "Contact support to modify verification status"
}
```

### Multiple Switches
```javascript
{
  field: "Container",
  gap: 16,
  children: [
    {
      field: "Switch",
      name: "email_notifications",
      label: "Email Notifications",
      defaultChecked: true
    },
    {
      field: "Switch",
      name: "sms_notifications",
      label: "SMS Notifications"
    },
    {
      field: "Switch",
      name: "push_notifications",
      label: "Push Notifications",
      defaultChecked: true
    }
  ]
}
```

## Validation Rules

```javascript
// Must be checked
{
  validator: (rule, value) => {
    if (!value) {
      return Promise.reject("This option must be enabled");
    }
    return Promise.resolve();
  }
}

// Must be unchecked
{
  validator: (rule, value) => {
    if (value) {
      return Promise.reject("This option must be disabled");
    }
    return Promise.resolve();
  }
}

// Conditional requirement
{
  validator: (rule, value, callback, form) => {
    const otherField = form.getFieldValue("other_field");
    if (otherField === "something" && !value) {
      return Promise.reject("Required when other field is 'something'");
    }
    return Promise.resolve();
  }
}
```

## Features

- **Visual Feedback**: Smooth animation on toggle
- **Keyboard Accessible**: Space bar to toggle
- **Touch Friendly**: Large clickable area
- **State Display**: Optional text labels for on/off states

## CSS Classes

- `.arraysubscription-fb-switch-wrapper` - Wrapper container
- `.arraysubscription-fb-switch` - Switch label/container
- `.arraysubscription-fb-switch-slider` - Visual slider element
- `.arraysubscription-fb-switch-text-checked` - Checked state text
- `.arraysubscription-fb-switch-text-unchecked` - Unchecked state text

## Form Data

Returns `true` when checked, `false` when unchecked.

```javascript
// Form values
{
  notifications: true,
  auto_save: false,
  premium_features: true
}
```

## Notes

- Uses `valuePropName="checked"` internally
- Default value is `false` if not specified
- Checkbox input type with custom styling
- Label can be clicked to toggle
- Works well in Container/Flex layouts for alignment
