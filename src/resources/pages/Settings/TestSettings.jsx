import React, { useState, useEffect } from "react";
import { __ } from "@wordpress/i18n";
import Form from "rc-field-form";
import FormBuilder from "@libs/form-builder";
import { Skeleton } from "@libs/skeleton";
import { ToastContainer } from "@libs/toast";
import { useToast } from "@libs/toast/useToast";
import DefaultPageLayout from "@/components/DefaultPageLayout";

// form structure
const modelList = [
  { value: "gemini-2.5-pro", label: "gemini-2.5-pro" },
  { value: "gemini-2.5-flash", label: "gemini-2.5-flash" },
  {
    value: "gemini-2.5-flash-lite",
    label: "gemini-2.5-flash-lite",
  },
  { value: "gemini-3-pro-preview", label: "gemini-3-pro-preview" },
  { value: "gpt-3.5-turbo", label: "gpt-3.5-turbo" },
  { value: "gpt-4o", label: "gpt-4o" },
  { value: "gpt-5", label: "gpt-5" },
  { value: "gpt-5-mini", label: "gpt-5-mini" },
  { value: "gpt-5-nano", label: "gpt-5-nano" },
  { value: "gpt-5.1", label: "gpt-5.1" },
  { value: "gpt-5.1-mini", label: "gpt-5.1-mini" },
];

const toolList = [
  { value: "data_extraction", label: "Data Extraction" },
  { value: "image_generation", label: "Image Generation" },
  { value: "web_search", label: "Web Search" },
  { value: "read_live_url", label: "Read Live URL" },
];

const formStructure = [
  // API Credentials
  {
    field: "Card",
    children: [
      {
        field: "Title",
        heading: 3,
        text: "API Credentials",
        subText: "Configure your AI provider API keys",
      },
      {
        field: "Password",
        name: "providers.gemini.apiKey",
        label: "Gemini API Key",
        placeholder: "Enter your Gemini API key",
      },
      {
        field: "Password",
        name: "providers.openai.apiKey",
        label: "OpenAI API Key",
        placeholder: "Enter your OpenAI API key",
      },
    ],
  },

  // Default AI Model
  {
    field: "Card",
    children: [
      {
        field: "Title",
        heading: 3,
        text: "Model Selection",
        subText: "Select the default model for various AI tasks",
      },
      {
        field: "Select",
        className: "arraysubscription-fb-max-w-400",
        name: "default_model.name",
        label: "Default model for chat and completions",
        data: modelList,
      },

      {
        field: "Title",
        heading: 6,
        style: { margin: "30px 0 0" },

        text: "Available Models",
        subText:
          "Enable/disable which AI models are available to switch between in chats",
      },
      {
        field: "AutoGrid",
        style: { gap: "0" },
        cols: 2,
        children: [
          {
            field: "Switch",
            name: "models.0.active",
            label: "gemini-2.5-pro (Gemini)",
          },
          {
            field: "Switch",
            name: "models.1.active",
            label: "gemini-2.5-flash (Gemini)",
          },
          {
            field: "Switch",
            name: "models.2.active",
            label: "gemini-2.5-flash-lite (Gemini)",
          },
          {
            field: "Switch",
            name: "models.3.active",
            label: "gemini-3-pro-preview (Gemini)",
          },
          {
            field: "Switch",
            name: "models.4.active",
            label: "gpt-3.5-turbo (OpenAI)",
          },
          {
            field: "Switch",
            name: "models.5.active",
            label: "gpt-4o (OpenAI)",
          },
          {
            field: "Switch",
            name: "models.6.active",
            label: "gpt-5 (OpenAI)",
          },
          {
            field: "Switch",
            name: "models.7.active",
            label: "gpt-5-mini (OpenAI)",
          },
          {
            field: "Switch",
            name: "models.8.active",
            label: "gpt-5-nano (OpenAI)",
          },
          {
            field: "Switch",
            name: "models.9.active",
            label: "gpt-5.1 (OpenAI)",
          },
          {
            field: "Switch",
            name: "models.10.active",
            label: "gpt-5.1-mini (OpenAI)",
          },
        ],
      },
      {
        field: "Title",
        heading: 6,
        style: { margin: "20px 0 0" },

        text: "Tools configuration",
        subText: "Configure the tools used by The AI",
      },
      {
        field: "MultiSelect",
        name: "available_tools",
        searchable: true,
        label: "Available Tools",
        placeholder: "Select tools to enable",
        data: toolList,
      },

      // Data Extraction Tool Model
      {
        field: "Select",
        name: "tool_settings.data_extraction.model.name",
        label: "Multimodal Model for Data Extraction",
        className: "arraysubscription-fb-max-w-400",
        data: modelList,
      },
    ],
  },
  // File Upload
  {
    field: "Card",
    children: [
      {
        field: "Title",
        heading: 3,
        text: "File Upload Settings",
        subText:
          "Configure allowed file types and upload restrictions for data extraction and image generation references",
      },
      {
        field: "Switch",
        name: "allowed_files.enabled",
        label: "Enable File Uploads",
      },
      {
        field: "Container",
        vertical: true,
        showWhen: {
          field: "allowed_files.enabled",
          operator: "==",
          value: true,
        },
        children: [
          {
            field: "AutoGrid",
            cols: 2,
            children: [
              {
                field: "Number",
                name: "allowed_files.max_files_per_message",
                label: "Max Files per Message",
                placeholder: "5",
                min: 1,
                max: 20,
              },
              {
                field: "Number",
                name: "allowed_files.max_file_size_mb",
                label: "Max File Size (MB)",
                placeholder: "10",
                min: 1,
                max: 100,
              },
            ],
          },
          {
            field: "Title",
            heading: 6,
            className: "arraysubscription-fb-mt-0",
            text: "Allowed File Types",
            subText: "Select which file types users can upload",
          },
          {
            field: "AutoGrid",
            style: { gap: "0" },
            cols: 3,
            children: [
              {
                field: "Switch",
                name: "allowed_files.file_types.jpeg",
                label: "jpeg",
              },
              {
                field: "Switch",
                name: "allowed_files.file_types.jpg",
                label: "jpg",
              },
              {
                field: "Switch",
                name: "allowed_files.file_types.gif",
                label: "gif",
              },
              {
                field: "Switch",
                name: "allowed_files.file_types.png",
                label: "png",
              },
              {
                field: "Switch",
                name: "allowed_files.file_types.bmp",
                label: "bmp",
              },
              {
                field: "Switch",
                name: "allowed_files.file_types.tiff",
                label: "tiff",
              },
              {
                field: "Switch",
                name: "allowed_files.file_types.tif",
                label: "tif",
              },
              {
                field: "Switch",
                name: "allowed_files.file_types.webp",
                label: "webp",
              },
              {
                field: "Switch",
                name: "allowed_files.file_types.ico",
                label: "ico",
              },
              {
                field: "Switch",
                name: "allowed_files.file_types.pdf",
                label: "pdf",
              },
              {
                field: "Switch",
                name: "allowed_files.file_types.txt",
                label: "txt",
              },
              {
                field: "Switch",
                name: "allowed_files.file_types.csv",
                label: "csv",
              },
              {
                field: "Switch",
                name: "allowed_files.file_types.markdown",
                label: "markdown",
              },
              {
                field: "Switch",
                name: "allowed_files.file_types.md",
                label: "md",
              },
            ],
          },
        ],
      },
    ],
  },
  // Window Size
  {
    field: "Card",
    children: [
      {
        field: "Title",
        heading: 3,
        text: "Default Window Size",
        subText: "Configure default chat window dimensions",
      },
      {
        field: "AutoGrid",
        cols: 2,
        children: [
          {
            field: "Number",
            name: "default_window_size.width",
            label: "Width (px)",
            placeholder: "400",
            min: 300,
            max: 1000,
          },
          {
            field: "Number",
            name: "default_window_size.height",
            label: "Height (px)",
            placeholder: "600",
            min: 400,
            max: 1200,
          },
        ],
      },
    ],
  },

  // Rate Limiting
  {
    field: "Card",
    children: [
      {
        field: "Title",
        heading: 3,
        text: "Rate Limiting",
        subText: "Control API usage and prevent abuse",
      },
      {
        field: "AutoGrid",
        cols: 2,
        children: [
          {
            field: "Number",
            name: "rate_limit.requests_per_minute",
            label: "Requests per Minute",
            placeholder: "20",
            min: 1,
            max: 100,
          },
          {
            field: "Number",
            name: "rate_limit.requests_per_hour",
            label: "Requests per Hour",
            placeholder: "200",
            min: 1,
            max: 1000,
          },
        ],
      },
    ],
  },

  // History Settings
  {
    field: "Card",
    children: [
      {
        field: "Title",
        heading: 3,
        text: "History Settings",
        subText: "Configure saving and retrieving past chat conversations",
      },
      {
        field: "Switch",
        name: "history.enabled",
        label: "Enable History",
      },
      {
        field: "Number",
        name: "history.conversations_per_page",
        label: "Conversations per Page",
        style: { maxWidth: "400px" },
        placeholder: "5",
        min: 1,
        max: 50,
        showWhen: {
          field: "history.enabled",
          operator: "==",
          value: true,
        },
      },
    ],
  },
];

// Helper function to convert dot notation to nested object
const dotToNested = (obj) => {
  const result = {};

  for (const key in obj) {
    const keys = key.split(".");
    keys.reduce((acc, part, index) => {
      // Check if this part is an array index
      const isArrayIndex = !isNaN(part);

      if (index === keys.length - 1) {
        // Last key - set the value
        acc[part] = obj[key];
      } else {
        // Check if next part is an array index to determine if we need array or object
        const nextPart = keys[index + 1];
        const nextIsArrayIndex = !isNaN(nextPart);

        if (!acc[part]) {
          // Create array if next is index, otherwise object
          acc[part] = nextIsArrayIndex ? [] : {};
        }
      }
      return acc[part];
    }, result);
  }

  return result;
};

// Helper function to flatten nested object to dot notation
const nestedToDot = (obj, prefix = "") => {
  const result = {};

  for (const key in obj) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    // Handle arrays
    if (Array.isArray(obj[key])) {
      obj[key].forEach((item, index) => {
        if (item !== null && typeof item === "object") {
          Object.assign(result, nestedToDot(item, `${newKey}.${index}`));
        } else {
          result[`${newKey}.${index}`] = item;
        }
      });
    }
    // Handle objects (but not null)
    else if (obj[key] !== null && typeof obj[key] === "object") {
      Object.assign(result, nestedToDot(obj[key], newKey));
    }
    // Handle primitives
    else {
      result[newKey] = obj[key];
    }
  }

  return result;
};

const Settings = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const { toasts, showToast, removeToast } = useToast();

  const apiBaseUrl =
    window?.arraySubscription?.env?.apiBaseUrl + "arraysubscription/v1";
  const nonce = window?.arraySubscription?.env?.nonce;

  // Fetch form data on mount
  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiBaseUrl}/settings/data`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-WP-Nonce": nonce,
        },
      });

      if (!response.ok) {
        throw new Error(__("Failed to load settings", "arraysubscription"));
      }

      const result = await response.json();

      if (result.code === 200) {
        // Convert nested object to dot notation for form
        const flatData = nestedToDot(result.content.values);
        setFormData(flatData);
        form.setFieldsValue(flatData);
      } else {
        throw new Error(
          result.message || __("Failed to load settings", "arraysubscription")
        );
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching settings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    setSaving(true);
    setError(null);

    try {
      // Convert dot notation to nested object for backend
      const nestedData = dotToNested(values);

      const response = await fetch(`${apiBaseUrl}/settings/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-WP-Nonce": nonce,
        },
        body: JSON.stringify({ settings: nestedData }),
      });

      if (!response.ok) {
        throw new Error(__("Failed to save settings", "arraysubscription"));
      }

      const result = await response.json();

      if (result.code === 200) {
        // Update local form data
        setFormData(values);
        showToast(
          __("Settings saved successfully!", "arraysubscription"),
          "success"
        );
      } else {
        throw new Error(
          result.message || __("Failed to save settings", "arraysubscription")
        );
      }
    } catch (err) {
      setError(err.message);
      console.error("Error saving settings:", err);
      showToast(
        err.message ||
          __("Failed to save settings. Please try again.", "arraysubscription"),
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (
      confirm(
        __(
          "Are you sure you want to reset all settings to defaults? This action cannot be undone.",
          "arraysubscription"
        )
      )
    ) {
      const defaultSettings = window?.arraySubscription?.settings || {};
      form.setFieldsValue(defaultSettings);
    }
  };

  const handleDiscard = () => {
    if (
      confirm(
        __("Are you sure you want to discard all changes?", "arraysubscription")
      )
    ) {
      form.setFieldsValue(formData);
    }
  };

  if (loading) {
    const breadcrumb = [
      { label: __("Settings", "arraysubscription") },
      { label: __("AI Things", "arraysubscription") },
    ];

    return (
      <DefaultPageLayout
        title={__("Settings", "arraysubscription")}
        subtitle={__(
          "Configure AI models, API keys, and plugin behavior",
          "arraysubscription"
        )}
        breadcrumb={breadcrumb}
      >
        <div className="arraysubscription-page-content">
          <Skeleton variant="rectangle" width="100%" height={400} />
        </div>
      </DefaultPageLayout>
    );
  }

  if (error) {
    const breadcrumb = [
      { label: __("Settings", "arraysubscription") },
      { label: __("AI Things", "arraysubscription") },
    ];

    return (
      <DefaultPageLayout
        title={__("Settings", "arraysubscription")}
        breadcrumb={breadcrumb}
      >
        <div className="arraysubscription-page-content">
          <div className="arraysubscription-error-message">
            <p>{error}</p>
            <button
              type="button"
              onClick={fetchFormData}
              className="button button-primary"
            >
              {__("Retry", "arraysubscription")}
            </button>
          </div>
        </div>
      </DefaultPageLayout>
    );
  }

  const breadcrumb = [
    { label: __("Settings", "arraysubscription") },
    { label: __("AI Things", "arraysubscription") },
  ];

  return (
    <DefaultPageLayout
      title={__("Settings", "arraysubscription")}
      subtitle={__(
        "Configure AI models, API keys, and plugin behavior",
        "arraysubscription"
      )}
      breadcrumb={breadcrumb}
    >
      <div className="arraysubscription-page-content">
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <FormBuilder formItems={formStructure} form={form} />

          <div
            className="arraysubscription-form-actions"
            style={{ marginTop: "24px", display: "flex", gap: "12px" }}
          >
            <button
              type="submit"
              className="button button-primary"
              disabled={saving}
            >
              {saving
                ? __("Saving...", "arraysubscription")
                : __("Save Settings", "arraysubscription")}
            </button>
            <button
              type="button"
              className="button button-secondary"
              onClick={handleReset}
              disabled={saving}
            >
              {__("Reset to Defaults", "arraysubscription")}
            </button>
            <button
              type="button"
              className="button"
              onClick={handleDiscard}
              disabled={saving}
            >
              {__("Discard Changes", "arraysubscription")}
            </button>
          </div>
        </Form>
      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </DefaultPageLayout>
  );
};

export default Settings;
