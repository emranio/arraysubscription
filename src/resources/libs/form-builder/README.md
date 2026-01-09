# Dynamic Form Content System

A comprehensive, JSON-driven form system built with React 18 and rc-field-form. This lightweight system provides dynamic form generation with advanced features like conditional rendering, nested layouts, comprehensive field types, and high-performance optimizations - all without external UI dependencies.

## 🌟 Key Features

- ✅ **JSON-Driven Forms** - Generate complex forms from JSON configuration
- ✅ **25+ Field Types** - Comprehensive field library covering all use cases
- ✅ **Conditional Rendering** - Show/hide fields based on form values with complex logic
- ✅ **Nested Layouts** - Tabs, Accordions, Repeaters with unlimited nesting depth
- ✅ **Responsive Grid System** - Flexible layouts using native CSS Grid
- ✅ **Performance Optimized** - Smart watching of only conditional fields
- ✅ **Drag & Drop** - Sortable repeater items with @dnd-kit
- ✅ **Lightweight** - Pure SCSS styling, no UI framework dependencies
- ✅ **Native HTML & WordPress Elements** - Built with standard HTML and @wordpress/element components
- ✅ **Centralized State** - Form-level initial values for clean, maintainable code

## 🚀 Quick Start

### Basic Usage

```javascript
import React from 'react';
import Form from 'rc-field-form';
import FormBuilder from '../components/dynamic-form-content';

const MyForm = () => {
  const [form] = Form.useForm();

  const formItems = [
    {
      field: 'Text',
      name: 'username',
      label: 'Username',
      rules: [{ required: true }],
      placeholder: 'Enter username'
    },
    {
      field: 'Password',
      name: 'password',
      label: 'Password',
      rules: [{ required: true, min: 8 }]
    }
  ];

  const initialValues = {
    username: 'john_doe',
    password: ''
  };

  const handleSubmit = (values) => {
    console.log('Form submitted:', values);
  };

  return (
    <Form form={form} onFinish={handleSubmit} initialValues={initialValues}>
      <FormBuilder formItems={formItems} form={form} />
    </Form>
  );
};
```

## 📋 Available Field Types

### Input Fields
- **Text** - Basic text input with validation
- **TextArea** - Multi-line text input with auto-resize
- **Number** - Numeric input with min/max constraints
- **Password** - Password input with visibility toggle
- **Date** - Date picker with optional time selection

### Selection Fields
- **Select** - Dropdown with search and multi-select options
- **Radio** - Radio button groups
- **Checkbox** - Checkbox groups and single checkboxes
- **Switch** - Toggle switches for boolean values

### Advanced Fields
- **File** - File upload with type restrictions
- **Color** - Color picker with swatches and input
- **Slider** - Range sliders for numeric values
- **Rating** - Star rating component
- **Json** - JSON editor with validation

### Layout Components
- **Tabs** - Organize fields in tabs
- **Accordion** - Collapsible sections
- **Repeater** - Dynamic arrays with drag & drop
- **Grid** - Responsive grid container
- **Col** - Grid column with breakpoint support
- **Row** - Horizontal field grouping
- **Divider** - Visual section separators

## 🎯 Form Configuration

### Common Properties

```javascript
{
  field: 'FieldType',              // Required: Component type
  name: 'field_name',              // Field name for form data
  label: 'Field Label',            // Display label
  inline: false,                   // Label layout: true=inline, false=block
  rules: [                         // Validation rules
    { required: true, message: 'Required field' },
    { min: 3, message: 'Minimum 3 characters' }
  ],
  
  // Conditional rendering
  showWhen: {                      // Show field when condition is met
    field: 'other_field',
    operator: '=',
    value: 'some_value'
  },
  hideWhen: {                      // Hide field when condition is met
    field: 'another_field',
    operator: '!=',
    value: 'hide_value'
  }
}
```

### Field-Specific Examples

#### Text Field
```javascript
{
  field: 'Text',
  name: 'firstName',
  label: 'First Name',
  placeholder: 'Enter your first name',
  rules: [{ required: true }],
  maxLength: 50
}

// Set initial value in Form's initialValues prop:
// initialValues={{ firstName: 'John' }}
```

#### Select Field
```javascript
{
  field: 'Select',
  name: 'country',
  label: 'Country',
  data: [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' }
  ],
  placeholder: 'Select a country'
}

// Set initial value in Form's initialValues prop:
// initialValues={{ country: 'us' }}
```

#### Date Field
```javascript
{
  field: 'Date',
  name: 'birthDate',
  label: 'Date of Birth',
  withTime: false,
  min: '1900-01-01',
  max: new Date().toISOString().split('T')[0]
}

// Set initial value in Form's initialValues prop:
// initialValues={{ birthDate: '1990-01-15' }}
```

## 🔄 Conditional Logic

### Supported Operators

- `=` or `==` - Equals
- `!=` - Not equals
- `<`, `>`, `<=`, `>=` - Numeric comparisons
- `contains` - String contains
- `not_contains` - String does not contain
- `starts_with` - String starts with
- `ends_with` - String ends with
- `in` - Value in array
- `not_in` - Value not in array
- `empty` - Field is empty
- `not_empty` - Field is not empty
- `is_true` - Boolean is true
- `is_false` - Boolean is false

### Simple Conditional
```javascript
{
  field: 'Text',
  name: 'companyName',
  label: 'Company Name',
  showWhen: {
    field: 'userType',
    operator: '=',
    value: 'business'
  }
}
```

### Multiple Conditions
```javascript
{
  field: 'Number',
  name: 'experience',
  label: 'Years of Experience',
  showWhen: [
    {
      field: 'userType',
      operator: '=',
      value: 'employee'
    },
    {
      field: 'hasExperience',
      operator: 'is_true'
    }
  ]
}
```

## 🏗️ Advanced Layouts

### Tabs
```javascript
{
  field: 'Tabs',
  items: [
    {
      label: 'Personal Info',
      value: 'personal',
      children: [
        { field: 'Text', name: 'firstName', label: 'First Name' },
        { field: 'Text', name: 'lastName', label: 'Last Name' }
      ]
    },
    {
      label: 'Contact',
      value: 'contact',
      children: [
        { field: 'Text', name: 'email', label: 'Email' },
        { field: 'Text', name: 'phone', label: 'Phone' }
      ]
    }
  ]
}
```

### Accordion
```javascript
{
  field: 'Accordion',
  multiple: true,
  items: [
    {
      label: 'Basic Information',
      value: 'basic',
      children: [
        { field: 'Text', name: 'name', label: 'Full Name' }
      ]
    },
    {
      label: 'Advanced Settings',
      value: 'advanced',
      children: [
        { field: 'Json', name: 'config', label: 'Configuration' }
      ]
    }
  ]
}
```

### Repeater with Drag & Drop
```javascript
{
  field: 'Repeater',
  name: 'experiences',
  label: 'Work Experience',
  addButtonText: 'Add Experience',
  itemTitleTemplate: 'Experience {index}',
  collapsible: true,
  showDeleteButton: true,
  items: [
    { field: 'Text', name: 'company', label: 'Company' },
    { field: 'Text', name: 'position', label: 'Position' },
    { field: 'Date', name: 'startDate', label: 'Start Date' },
    { field: 'Date', name: 'endDate', label: 'End Date' }
  ]
}

// Set initial items in Form's initialValues prop:
// initialValues={{ experiences: [{ company: 'Acme Inc', position: 'Developer' }] }}
```

### Responsive Grid
```javascript
{
  field: 'Grid',
  gutter: 'lg',
  children: [
    {
      field: 'Col',
      span: 12,
      md: 6,
      children: [
        { field: 'Text', name: 'firstName', label: 'First Name' }
      ]
    },
    {
      field: 'Col',
      span: 12,
      md: 6,
      children: [
        { field: 'Text', name: 'lastName', label: 'Last Name' }
      ]
    }
  ]
}
```

## 🎨 Styling and Theming

The form system uses **pure SCSS** for styling with **native HTML elements** and **CSS custom properties** for easy theming. No CSS-in-JS, no UI framework classes.

You can customize:

- Colors and brand palette
- Spacing and sizing
- Border radius and shadows
- Typography and fonts
- All component styles via SCSS variables

### SCSS Customization

All styles are contained in `scss/form-builder.scss`. Customize via CSS variables:

```scss
:root {
  --arraysubscription-fb-primary-color: #0073aa;
  --arraysubscription-fb-border-color: #ddd;
  --arraysubscription-fb-border-radius: 4px;
  --arraysubscription-fb-input-height: 36px;
  --arraysubscription-fb-font-size: 14px;
  // ... and many more
}
```

Override specific component styles:

```scss
.arraysubscription-fb-input {
  // Your custom input styles
}

.arraysubscription-fb-button-primary {
  // Your custom button styles
}
```

## 🚀 Performance Optimizations

### Smart Field Watching
The system only watches fields that are used in conditional logic, reducing unnecessary re-renders:

```javascript
// Automatically extracts conditional fields
const conditionalFields = extractConditionalFields(formItems);
const watchedValues = useWatch(conditionalFields, form);
```

### Component Memoization
Layout components are optimized for minimal re-renders:

```javascript
const processedItems = useMemo(() => {
  return items.map(item => processItem(item));
}, [items]);
```

## 📊 Value Management System

### Form-Level Initial Values

This form system uses **Form-level `initialValues`** for managing default values. Individual field components **do not** accept a `value` prop.

```javascript
// ✅ Correct - Set initial values at Form level
const MyForm = () => {
  const [form] = Form.useForm();
  
  const initialValues = {
    username: 'john_doe',
    isActive: true,
    tags: ['tag1', 'tag2'],
    country: 'us',
    volume: 50
  };
  
  return (
    <Form form={form} initialValues={initialValues}>
      <FormBuilder formItems={formItems} form={form} />
    </Form>
  );
};

// ❌ Wrong - Don't set value on individual fields
const formItems = [
  {
    field: 'Text',
    name: 'username',
    value: 'john_doe'      // This won't work!
  }
];
```

### Field-Specific Value Types

When setting `initialValues`, use the appropriate data type for each field:

- **Text/TextArea/Password/Number**: String or number
- **Switch/Checkbox (single)**: Boolean
- **Checkbox (group)**: Array of selected values
- **Radio/Select**: Single value (string/number) matching an option
- **MultiSelect**: Array of selected values
- **Date**: Date string (YYYY-MM-DD or ISO format)
- **Slider/Rating**: Number
- **Tag**: Array of strings
- **Color**: Hex color string (#RRGGBB)
- **Repeater**: Array of objects
- **File**: File object or file data

### Complete Example

```javascript
const formItems = [
  { field: 'Text', name: 'name', label: 'Name' },
  { field: 'Switch', name: 'active', label: 'Active' },
  { 
    field: 'Radio', 
    name: 'type', 
    label: 'Type',
    data: [
      { value: 'personal', label: 'Personal' },
      { value: 'business', label: 'Business' }
    ]
  },
  {
    field: 'Checkbox',
    name: 'features',
    label: 'Features',
    data: [
      { value: 'feature1', label: 'Feature 1' },
      { value: 'feature2', label: 'Feature 2' }
    ]
  }
];

const initialValues = {
  name: 'John Doe',
  active: true,
  type: 'business',              // Radio accepts single value
  features: ['feature1']         // Checkbox group accepts array
};

<Form form={form} initialValues={initialValues}>
  <FormBuilder formItems={formItems} form={form} />
</Form>
```

### Render Props Pattern

Complex fields (Switch, Checkbox, Radio, Slider, Color, Rating, Tag, MultiSelect, GridSelect) use a render prop pattern internally to connect to form state. This is handled automatically - you just define the field and set initial values through the Form component.

## 🧩 Extensibility

### Adding Custom Fields

1. Create a new field component extending `FieldBase`:

```javascript
import React from 'react';
import FieldBase from '../utils/FieldBase';

const FieldCustom = ({ label, name, rules, ...props }) => {
  return (
    <FieldBase label={label} name={name} rules={rules}>
      <input
        type="text"
        className="arraysubscription-fb-input"
        {...props}
      />
    </FieldBase>
  );
};

export default FieldCustom;
```

2. Register in the field registry (`fields/index.js`):

```javascript
import FieldCustom from './Custom';

export default {
  // ... existing fields
  Custom: FieldCustom,
};
```

## 📖 Demo Pages

Check out the demo pages for comprehensive examples:

- **Advanced Form** (`/dynamic/form`) - Nested tabs, accordions, repeaters
- **Conditional Form** (`/dynamic/conditional-form`) - Complex conditional logic

## 🔧 Dependencies

- React 18.2.0
- rc-field-form 2.7.0
- @wordpress/element (WordPress React wrapper)
- @dnd-kit packages for drag & drop (sortable repeater items)

**No UI framework dependencies** - Built with native HTML elements, WordPress components, and pure SCSS styling. No Mantine, Tailwind, Bootstrap, or other UI frameworks!

## 📄 License

This project is part of the ArraySubscription MCP AI plugin and follows the same license terms.
