# Password Field

A password input field with show/hide toggle functionality.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `field` | string | **required** | Must be `"Password"` |
| `name` | string | **required** | Field name for form data |
| `label` | string | optional | Label displayed above field |
| `placeholder` | string | auto-generated | Placeholder text |
| `rules` | array | `[]` | Validation rules |
| `value` | string | optional | Initial value |
| `disabled` | boolean | `false` | Disable field |

## Basic Usage

```javascript
{
  field: "Password",
  name: "password",
  label: "Password",
  rules: [
    { required: true, message: "Password is required" },
    { min: 8, message: "Password must be at least 8 characters" }
  ]
}
```

## Examples

### Simple Password
```javascript
{
  field: "Password",
  name: "password",
  label: "Password"
}
```

### With Strength Requirements
```javascript
{
  field: "Password",
  name: "new_password",
  label: "New Password",
  help: "Must contain at least 8 characters, one uppercase, one lowercase, and one number",
  rules: [
    { required: true, message: "Password is required" },
    { min: 8, message: "Must be at least 8 characters" },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message: "Must contain uppercase, lowercase, and number"
    }
  ]
}
```

### Confirm Password
```javascript
{
  field: "Password",
  name: "confirm_password",
  label: "Confirm Password",
  rules: [
    { required: true, message: "Please confirm password" },
    {
      validator: (rule, value, callback, form) => {
        const password = form.getFieldValue("password");
        if (value && value !== password) {
          return Promise.reject("Passwords do not match");
        }
        return Promise.resolve();
      }
    }
  ]
}
```

### Current Password
```javascript
{
  field: "Password",
  name: "current_password",
  label: "Current Password",
  placeholder: "Enter your current password",
  rules: [{ required: true, message: "Current password is required" }]
}
```

## Validation Rules

```javascript
// Required field
{ required: true, message: "Password is required" }

// Minimum length
{ min: 8, message: "Password must be at least 8 characters" }

// Maximum length
{ max: 128, message: "Password cannot exceed 128 characters" }

// Pattern matching
{ 
  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
  message: "Password must contain uppercase, lowercase, number, and special character"
}

// Match another field
{
  validator: (rule, value, callback, form) => {
    if (value !== form.getFieldValue("password")) {
      return Promise.reject("Passwords must match");
    }
    return Promise.resolve();
  }
}

// Strength check
{
  validator: (rule, value) => {
    if (value) {
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecial = /[@$!%*?&]/.test(value);
      
      if (!(hasUpper && hasLower && hasNumber && hasSpecial)) {
        return Promise.reject("Password is too weak");
      }
    }
    return Promise.resolve();
  }
}
```

## Features

- **Toggle Visibility**: Eye icon to show/hide password
- **Auto-complete**: Supports browser password managers
- **Security**: Masked by default
- **Accessibility**: Proper ARIA labels

## CSS Classes

- `.arraysubscription-fb-password-wrapper` - Wrapper container
- `.arraysubscription-fb-input` - Input element
- `.arraysubscription-fb-password-toggle` - Toggle button
- `.field-item-label` - Label element

## Notes

- Toggle button shows 👁 when hidden, 👁‍🗨 when visible
- Does not log password values in console
- Autocomplete attribute can be controlled
- Supports paste prevention if needed
