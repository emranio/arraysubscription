import Form from "rc-field-form";
import FormBuilder from "@libs/form-builder";
const formItems = [
  {
    field: "Title",
    text: "This is title",
    subText: "This is subtitle",
    heading: 2,
  },
  {
    field: "Alert",
    message: "Welcome to the dynamic form!",
    description: "Please fill out all required fields below.",
    type: "info",
    showIcon: true,
    style: { marginBottom: 16 },
  },
  {
    field: "Divider",
    children: "Form Fields",
    orientation: "left",
  },
  {
    field: "Container",
    gap: 16,
    children: [
      {
        field: "Text",
        name: "title",
        label: "Title",
        rules: [{ required: true, message: "Please enter a title" }],
        placeholder: "Enter title",
      },
      {
        field: "Repeater",
        name: "my-items",
        children: [
          {
            field: "Text",
            name: "item_name",
            label: "Item Name",
          },
          {
            field: "Repeater",
            name: "my-nested-items",
            children: [
              {
                field: "Text",
                name: "sub_item_name",
                label: "Sub Item Name",
              },
              {
                field: "Switch",
                name: "sub_item_active",
                label: "Active",
                checkedText: "Yes",
                unCheckedText: "No",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    field: "TextArea",
    name: "description",
    label: "Description",
    rows: 4,
    placeholder: "Enter description",
  },
  {
    field: "Divider",
    dashed: true,
  },
  {
    field: "Flex",
    gap: "middle",
    justify: "space-between",
    align: "center",
    style: { padding: "16px", backgroundColor: "#fafafa", borderRadius: "8px" },
    children: [
      {
        field: "Html",
        html: "<strong>Layout Example:</strong> This content is inside a Flex container",
      },
      {
        field: "Space",
        size: "small",
        children: [
          {
            field: "Html",
            html: '<span style="color: #1890ff;">Item 1</span>',
          },
          {
            field: "Html",
            html: '<span style="color: #52c41a;">Item 2</span>',
          },
        ],
      },
    ],
  },
  {
    field: "Html",
    html: '<div style="padding: 10px; background-color: #f5f5f5; border-radius: 4px; margin: 16px 0;"><strong>Note:</strong> This is custom HTML content that can include any HTML markup.</div>',
  },
  {
    field: "Divider",
    children: "Tabs Example",
    orientation: "left",
  },
  {
    field: "Tabs",
    defaultActiveKey: "1",
    items: [
      {
        key: "1",
        label: "Tab 1",
        children: [
          {
            field: "Alert",
            message: "This is content inside Tab 1",
            type: "success",
            showIcon: true,
          },
          {
            field: "Text",
            name: "tab1_field",
            label: "Field in Tab 1",
            placeholder: "Enter something...",
          },
        ],
      },
      {
        key: "2",
        label: "Tab 2",
        children: [
          {
            field: "TextArea",
            name: "tab2_notes",
            label: "Notes in Tab 2",
            rows: 3,
            placeholder: "Enter notes...",
          },
        ],
      },
      {
        key: "3",
        label: "Tab 3",
        children: [
          {
            field: "Switch",
            name: "tab3_enabled",
            label: "Enable Feature",
            checkedText: "Enabled",
            unCheckedText: "Disabled",
          },
        ],
      },
    ],
  },
  {
    field: "Divider",
    children: "Collapse Example",
    orientation: "left",
  },
  {
    field: "Collapse",
    items: [
      {
        key: "1",
        label: "Basic Information",
        children: [
          {
            field: "Container",
            gap: 16,
            children: [
              {
                field: "Text",
                name: "first_name",
                label: "First Name",
                placeholder: "Enter first name",
              },
              {
                field: "Text",
                name: "last_name",
                label: "Last Name",
                placeholder: "Enter last name",
              },
            ],
          },
        ],
      },
      {
        key: "2",
        label: "Advanced Settings",
        children: [
          {
            field: "Alert",
            message: "Advanced Configuration",
            description:
              "These settings should only be modified by advanced users.",
            type: "warning",
            showIcon: true,
          },
          {
            field: "Flex",
            gap: "middle",
            children: [
              {
                field: "Switch",
                name: "debug_mode",
                label: "Debug Mode",
              },
              {
                field: "Switch",
                name: "verbose_logging",
                label: "Verbose Logging",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    field: "Divider",
    children: "Nested Example: Tabs inside Collapse",
    orientation: "left",
    style: { marginTop: 32 },
  },
  {
    field: "Collapse",
    items: [
      {
        key: "1",
        label: "User Management Section",
        children: [
          {
            field: "Tabs",
            defaultActiveKey: "1",
            items: [
              {
                key: "1",
                label: "User Profile",
                children: [
                  {
                    field: "Container",
                    gap: 16,
                    children: [
                      {
                        field: "Text",
                        name: "user_name",
                        label: "Username",
                        placeholder: "Enter username",
                        rules: [
                          {
                            required: true,
                            message: "Username is required",
                          },
                        ],
                      },
                      {
                        field: "Text",
                        name: "user_email",
                        label: "Email",
                        placeholder: "Enter email",
                      },
                      {
                        field: "Switch",
                        name: "user_active",
                        label: "Active User",
                        checkedText: "Active",
                        unCheckedText: "Inactive",
                        defaultChecked: true,
                      },
                    ],
                  },
                ],
              },
              {
                key: "2",
                label: "Permissions",
                children: [
                  {
                    field: "Alert",
                    message: "Permission Settings",
                    description:
                      "Configure user permissions and access levels.",
                    type: "info",
                    showIcon: true,
                    style: { marginBottom: 16 },
                  },
                  {
                    field: "Flex",
                    gap: "large",
                    wrap: true,
                    children: [
                      {
                        field: "Switch",
                        name: "can_read",
                        label: "Read Access",
                        defaultChecked: true,
                      },
                      {
                        field: "Switch",
                        name: "can_write",
                        label: "Write Access",
                      },
                      {
                        field: "Switch",
                        name: "can_delete",
                        label: "Delete Access",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    field: "Divider",
    children: "Nested Example: Collapse inside Tabs",
    orientation: "left",
    style: { marginTop: 32 },
  },
  {
    field: "Tabs",
    defaultActiveKey: "1",
    items: [
      {
        key: "1",
        label: "System Configuration",
        children: [
          {
            field: "Collapse",
            accordion: true,
            items: [
              {
                key: "1",
                label: "Database Settings",
                children: [
                  {
                    field: "Alert",
                    message: "Database Configuration",
                    description: "Configure your database connection settings.",
                    type: "warning",
                    showIcon: true,
                  },
                  {
                    field: "Container",
                    gap: 16,
                    children: [
                      {
                        field: "Text",
                        name: "db_host",
                        label: "Database Host",
                        placeholder: "localhost",
                      },
                      {
                        field: "Text",
                        name: "db_port",
                        label: "Port",
                        placeholder: "5432",
                      },
                    ],
                  },
                  {
                    field: "Switch",
                    name: "db_ssl",
                    label: "Enable SSL",
                    checkedText: "Enabled",
                    unCheckedText: "Disabled",
                  },
                ],
              },
              {
                key: "2",
                label: "API Settings",
                children: [
                  {
                    field: "TextArea",
                    name: "api_endpoints",
                    label: "API Endpoints",
                    rows: 4,
                    placeholder: "Enter API endpoints configuration...",
                  },
                  {
                    field: "Flex",
                    gap: "middle",
                    children: [
                      {
                        field: "Switch",
                        name: "api_cors",
                        label: "Enable CORS",
                      },
                      {
                        field: "Switch",
                        name: "api_rate_limit",
                        label: "Rate Limiting",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        key: "2",
        label: "Advanced Features",
        children: [
          {
            field: "Html",
            html: '<div style="padding: 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px; margin-bottom: 16px;"><h3 style="margin: 0; color: white;">Deep Nesting Example</h3><p style="margin: 8px 0 0 0;">This demonstrates multiple levels of nesting with Tabs → Collapse → More Components</p></div>',
          },
          {
            field: "Collapse",
            ghost: true,
            items: [
              {
                key: "1",
                label: "Performance Monitoring",
                children: [
                  {
                    field: "Space",
                    direction: "vertical",
                    size: "large",
                    style: { width: "100%" },
                    children: [
                      {
                        field: "Alert",
                        message: "Monitoring Dashboard",
                        description:
                          "Configure real-time performance monitoring.",
                        type: "success",
                        showIcon: true,
                      },
                      {
                        field: "Container",
                        gap: 24,
                        children: [
                          {
                            field: "Switch",
                            name: "monitor_cpu",
                            label: "CPU Monitoring",
                            defaultChecked: true,
                          },
                          {
                            field: "Switch",
                            name: "monitor_memory",
                            label: "Memory Monitoring",
                            defaultChecked: true,
                          },
                          {
                            field: "Switch",
                            name: "monitor_disk",
                            label: "Disk Monitoring",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    field: "Divider",
    children: "Nested Example: Tabs inside Tabs",
    orientation: "left",
    style: { marginTop: 32 },
  },
  {
    field: "Tabs",
    defaultActiveKey: "1",
    type: "card",
    items: [
      {
        key: "1",
        label: "Main Section A",
        children: [
          {
            field: "Alert",
            message: "Nested Tabs Demo",
            description:
              "This section contains nested tabs to demonstrate multi-level tab organization.",
            type: "info",
            showIcon: true,
            style: { marginBottom: 16 },
          },
          {
            field: "Tabs",
            defaultActiveKey: "1",
            size: "small",
            items: [
              {
                key: "1",
                label: "Sub Tab 1",
                children: [
                  {
                    field: "Container",
                    gap: 16,
                    children: [
                      {
                        field: "Text",
                        name: "nested_field_1",
                        label: "Field 1",
                        placeholder: "Enter value for field 1",
                      },
                      {
                        field: "Switch",
                        name: "nested_switch_1",
                        label: "Option 1",
                        checkedText: "On",
                        unCheckedText: "Off",
                      },
                    ],
                  },
                ],
              },
              {
                key: "2",
                label: "Sub Tab 2",
                children: [
                  {
                    field: "TextArea",
                    name: "nested_textarea",
                    label: "Description",
                    rows: 4,
                    placeholder: "Enter detailed description...",
                  },
                  {
                    field: "Flex",
                    gap: "middle",
                    style: { marginTop: 16 },
                    children: [
                      {
                        field: "Switch",
                        name: "auto_save",
                        label: "Auto Save",
                        defaultChecked: true,
                      },
                      {
                        field: "Switch",
                        name: "notifications",
                        label: "Notifications",
                      },
                    ],
                  },
                ],
              },
              {
                key: "3",
                label: "Sub Tab 3",
                children: [
                  {
                    field: "Html",
                    html: '<div style="padding: 20px; background: linear-gradient(45deg, #ff9a56, #ff6b6b); color: white; border-radius: 8px; text-align: center;"><h4 style="margin: 0; color: white;">Triple Nested Content</h4><p style="margin: 8px 0 0 0;">This content is 3 levels deep: Main Tab → Sub Tab → Content</p></div>',
                  },
                  {
                    field: "Space",
                    direction: "vertical",
                    size: "large",
                    style: { width: "100%", marginTop: 16 },
                    children: [
                      {
                        field: "Alert",
                        message: "Deep Nesting Achievement!",
                        description:
                          "You have successfully navigated to a deeply nested tab structure.",
                        type: "success",
                        showIcon: true,
                      },
                      {
                        field: "Text",
                        name: "deep_nested_field",
                        label: "Deep Nested Field",
                        placeholder: "This field is deeply nested",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        key: "2",
        label: "Main Section B",
        children: [
          {
            field: "Tabs",
            defaultActiveKey: "1",
            type: "line",
            size: "small",
            items: [
              {
                key: "1",
                label: "Configuration",
                children: [
                  {
                    field: "Collapse",
                    items: [
                      {
                        key: "1",
                        label: "Basic Config",
                        children: [
                          {
                            field: "Container",
                            gap: 16,
                            children: [
                              {
                                field: "Text",
                                name: "config_name",
                                label: "Config Name",
                                placeholder: "Enter config name",
                              },
                              {
                                field: "Text",
                                name: "config_value",
                                label: "Config Value",
                                placeholder: "Enter config value",
                              },
                              {
                                field: "Switch",
                                name: "config_enabled",
                                label: "Enabled",
                                defaultChecked: true,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                key: "2",
                label: "Advanced",
                children: [
                  {
                    field: "Alert",
                    message: "Extreme Nesting Example",
                    description:
                      "This demonstrates: Main Tab → Sub Tab → Collapse → Form Elements",
                    type: "warning",
                    showIcon: true,
                  },
                  {
                    field: "TextArea",
                    name: "advanced_config",
                    label: "Advanced Configuration",
                    rows: 6,
                    placeholder:
                      "Enter JSON configuration or advanced settings...",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        key: "3",
        label: "Main Section C",
        children: [
          {
            field: "Html",
            html: '<div style="padding: 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; margin-bottom: 20px;"><h2 style="margin: 0 0 12px 0; color: white;">Ultimate Nesting Demo</h2><p style="margin: 0; font-size: 16px;">This section shows the most complex nesting possible with your dynamic form system.</p></div>',
          },
          {
            field: "Tabs",
            defaultActiveKey: "1",
            type: "editable-card",
            size: "small",
            items: [
              {
                key: "1",
                label: "Level 3 Tab A",
                children: [
                  {
                    field: "Space",
                    direction: "vertical",
                    size: "large",
                    style: { width: "100%" },
                    children: [
                      {
                        field: "Alert",
                        message: "You are now 3 tabs deep!",
                        description: "Main Tab C → Level 3 Tab A",
                        type: "success",
                        showIcon: true,
                      },
                      {
                        field: "Flex",
                        gap: "large",
                        wrap: true,
                        children: [
                          {
                            field: "Switch",
                            name: "level3_feature1",
                            label: "Feature 1",
                            checkedText: "Enabled",
                            unCheckedText: "Disabled",
                          },
                          {
                            field: "Switch",
                            name: "level3_feature2",
                            label: "Feature 2",
                            checkedText: "Enabled",
                            unCheckedText: "Disabled",
                          },
                          {
                            field: "Switch",
                            name: "level3_feature3",
                            label: "Feature 3",
                            checkedText: "Enabled",
                            unCheckedText: "Disabled",
                            defaultChecked: true,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                key: "2",
                label: "Level 3 Tab B",
                children: [
                  {
                    field: "Container",
                    gap: 24,
                    children: [
                      {
                        field: "Text",
                        name: "deep_field_1",
                        label: "Deep Field 1",
                        placeholder: "Deeply nested input 1",
                      },
                      {
                        field: "Text",
                        name: "deep_field_2",
                        label: "Deep Field 2",
                        placeholder: "Deeply nested input 2",
                      },
                    ],
                  },
                  {
                    field: "Divider",
                    dashed: true,
                    children: "Even More Nesting Below",
                  },
                  {
                    field: "TextArea",
                    name: "ultra_deep_notes",
                    label: "Ultra Deep Notes",
                    rows: 4,
                    placeholder:
                      "This textarea is extremely deeply nested in the component hierarchy...",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    field: "Divider",
    children: "Complex Nested Repeater Example",
    orientation: "left",
    style: { marginTop: 32 },
  },
  {
    field: "Alert",
    message: "Nested Repeater Structure Example",
    description:
      "This demonstrates a repeater with row/columns that contains another repeater",
    type: "info",
    showIcon: true,
    style: { marginBottom: 16 },
  },
  {
    field: "Repeater",
    name: "product_categories",
    label: "Product Categories",
    addButtonText: "Add Category",
    removeButtonText: "Remove Category",
    initialCount: 1,
    children: [
      {
        field: "Text",
        name: "category_name",
        label: "Category Name",
        placeholder: "Enter category name",
        rules: [{ required: true, message: "Category name is required" }],
      },
      {
        field: "Container",
        gap: 16,
        children: [
          {
            field: "Text",
            name: "category_code",
            label: "Category Code",
            placeholder: "Enter category code",
          },
          {
            field: "Repeater",
            name: "category_products",
            label: "Products",
            addButtonText: "Add Product",
            removeButtonText: "Remove Product",
            initialCount: 1,
            children: [
              {
                field: "Text",
                name: "product_name",
                label: "Product Name",
                placeholder: "Enter product name",
                rules: [
                  { required: true, message: "Product name is required" },
                ],
              },
              {
                field: "Text",
                name: "product_sku",
                label: "SKU",
                placeholder: "Enter product SKU",
              },
              {
                field: "TextArea",
                name: "product_description",
                label: "Description",
                placeholder: "Enter product description",
                rows: 2,
              },
            ],
          },
        ],
      },
      {
        field: "Switch",
        name: "category_active",
        label: "Active Category",
        defaultChecked: true,
        checkedText: "Yes",
        unCheckedText: "No",
      },
    ],
  },
];

const MyComplexForm = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      hello form
      <FormBuilder formItems={formItems} form={form} />
    </Form>
  );
};

export default MyComplexForm;
