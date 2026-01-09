# Form Builder Components Documentation

Complete documentation for all form builder components.

## Component Categories

### Input Fields
- [Text](./Text.md) - Single-line text input
- [TextArea](./TextArea.md) - Multi-line text input
- [Number](./Number.md) - Numeric input with min/max
- [Password](./Password.md) - Password with show/hide toggle
- [Date](./Date.md) - Date and datetime picker
- [Color](./Color.md) - Color picker
- [File](./File.md) - File upload

### Selection Fields
- [Select](./Select.md) - Dropdown select
- [Radio](./Radio.md) - Radio button group
- [Checkbox](./Checkbox.md) - Single or group checkboxes
- [Switch](./Switch.md) - Toggle switch
- [MultiSelect](./MultiSelect.md) - Multiple selection dropdown
- [GridSelect](./GridSelect.md) - Card-style selection grid

### Advanced Inputs
- [Slider](./Slider.md) - Range slider
- [Rating](./Rating.md) - Star rating
- [Tag](./Tag.md) - Tag input (comma/enter separated)
- [Json](./Json.md) - JSON editor with validation

### Layout Components
- [Container](./Container.md) - Flex container (alias: Flex)
- [Space](./Space.md) - Spacing wrapper
- [Grid](./Grid.md) - CSS Grid layout
- [AutoGrid](./AutoGrid.md) - Automatic grid columns
- [Card](./Card.md) - Card wrapper

### Organizational Components
- [Tabs](./Tabs.md) - Tab navigation
- [Accordion](./Accordion.md) - Collapsible sections (alias: Collapse)
- [Repeater](./Repeater.md) - Dynamic repeating fields

### Display Components
- [Title](./Title.md) - Heading with subtitle
- [Alert](./Alert.md) - Alert/notice messages
- [Divider](./Divider.md) - Visual separator
- [Html](./Html.md) - Raw HTML content

## Quick Start

```javascript
import Form from "rc-field-form";
import FormBuilder from "./form-builder";

const formItems = [
  {
    field: "Text",
    name: "username",
    label: "Username",
    rules: [{ required: true }]
  },
  {
    field: "Password",
    name: "password",
    label: "Password",
    rules: [{ required: true, min: 8 }]
  }
];

const MyForm = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Form values:", values);
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <FormBuilder formItems={formItems} form={form} />
    </Form>
  );
};
```

## Common Props

All form fields support these common props:

| Prop | Type | Description |
|------|------|-------------|
| `field` | string | Component type (required) |
| `name` | string | Field name in form data |
| `label` | string | Field label |
| `rules` | array | Validation rules |
| `value` | any | Initial/default value |
| `help` | string | Help text below field |
| `inline` | boolean | Inline layout |
| `disabled` | boolean | Disable field |
| `className` | string | Additional CSS class |
| `style` | object | Inline styles |

## Validation Rules

```javascript
// Required
{ required: true, message: "This field is required" }

// Min/Max length
{ min: 3, message: "Minimum 3 characters" }
{ max: 50, message: "Maximum 50 characters" }

// Pattern
{ pattern: /^[a-z]+$/, message: "Lowercase letters only" }

// Type validation
{ type: "email", message: "Invalid email" }
{ type: "url", message: "Invalid URL" }
{ type: "number", message: "Must be a number" }

// Custom validator
{
  validator: (rule, value) => {
    if (value === "invalid") {
      return Promise.reject("Invalid value");
    }
    return Promise.resolve();
  }
}
```

## Nesting Components

Layout components can contain other components:

```javascript
{
  field: "Tabs",
  items: [
    {
      key: "1",
      label: "Tab 1",
      children: [
        { field: "Text", name: "field1", label: "Field 1" },
        { field: "Text", name: "field2", label: "Field 2" }
      ]
    }
  ]
}
```

## Component Aliases

- `Textarea` → `TextArea`
- `Flex` → `Container`
- `Collapse` → `Accordion`

## Best Practices

1. **Use semantic names**: Name fields clearly (`email`, `user_name`, not `field1`)
2. **Provide labels**: Always include labels for accessibility
3. **Add validation**: Use appropriate validation rules
4. **Group related fields**: Use layout components to organize forms
5. **Show help text**: Guide users with help text when needed
6. **Handle errors**: Display validation errors clearly
7. **Test thoroughly**: Check all validation scenarios

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance Tips

- Use conditional rendering for large forms
- Implement field-level validation vs form-level
- Lazy load heavy components (JSON editor, etc.)
- Debounce API validation calls

## Accessibility

All components follow accessibility best practices:
- Proper ARIA labels
- Keyboard navigation
- Focus management
- Screen reader support
- Color contrast compliance
