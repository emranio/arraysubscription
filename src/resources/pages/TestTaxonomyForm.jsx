import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { __ } from "@wordpress/i18n";
import Form, { useForm } from "rc-field-form";
import FormBuilder from "@libs/form-builder";
import { buildUrl } from "../supports/url";
import DefaultPageLayout from "@/components/DefaultPageLayout";

const TestTaxonomyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const isEdit = !!id;

  // Fetch taxonomy data if editing
  useEffect(() => {
    if (isEdit) {
      fetchTaxonomy();
    }
  }, [id]);

  const fetchTaxonomy = async () => {
    setLoading(true);
    try {
      const url = buildUrl(
        `${window?.arraySubscription?.env?.apiBaseUrl}wp/v2/test_taxonomy/${id}`,
        { context: "edit" }
      );
      const response = await fetch(url, {
        headers: {
          "X-WP-Nonce": window?.arraySubscription?.env?.nonce,
        },
      });

      if (!response.ok) {
        throw new Error(__("Failed to fetch taxonomy", "arraysubscription"));
      }

      const data = await response.json();

      form.setFieldsValue({
        name: data.name || "",
        description: data.description || "",
        slug: data.slug || "",
        category: data.meta?.category || "",
        priority: data.meta?.priority || 0,
        is_featured: data.meta?.is_featured || false,
        color: data.meta?.color || "#000000",
      });
    } catch (error) {
      console.error("Error fetching taxonomy:", error);
      alert(__("Failed to load taxonomy", "arraysubscription"));
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const onFinish = async (values) => {
    setSubmitting(true);
    try {
      const baseUrl = isEdit
        ? buildUrl(
            `${window?.arraySubscription?.env?.apiBaseUrl}wp/v2/test_taxonomy/${id}`
          )
        : buildUrl(
            `${window?.arraySubscription?.env?.apiBaseUrl}wp/v2/test_taxonomy`
          );

      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "X-WP-Nonce": window?.arraySubscription?.env?.nonce,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          description: values.description || "",
          slug: values.slug || "",
          meta: {
            category: values.category || "",
            priority: parseInt(values.priority) || 0,
            is_featured: values.is_featured || false,
            color: values.color || "#000000",
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            __("Failed to save taxonomy", "arraysubscription")
        );
      }

      alert(
        isEdit
          ? __("Taxonomy updated successfully!", "arraysubscription")
          : __("Taxonomy created successfully!", "arraysubscription")
      );
      navigate("/test-taxonomy");
    } catch (error) {
      console.error("Error saving taxonomy:", error);
      alert(
        error.message || __("Failed to save taxonomy", "arraysubscription")
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Form configuration
  const formItems = [
    {
      field: "Text",
      name: "name",
      label: __("Name", "arraysubscription"),
      placeholder: __("Enter taxonomy name", "arraysubscription"),
      rules: [
        {
          required: true,
          message: __("Name is required", "arraysubscription"),
        },
      ],
    },
    {
      field: "Text",
      name: "slug",
      label: __("Slug", "arraysubscription"),
      placeholder: __("Enter taxonomy slug", "arraysubscription"),
      disabled: isEdit, // Slug cannot be changed after creation
      helperText: isEdit
        ? __("Slug cannot be changed after creation", "arraysubscription")
        : __("Leave empty to auto-generate from name", "arraysubscription"),
    },
    {
      field: "TextArea",
      name: "description",
      label: __("Description", "arraysubscription"),
      placeholder: __("Enter taxonomy description", "arraysubscription"),
      rows: 4,
    },
    {
      field: "Text",
      name: "category",
      label: __("Category", "arraysubscription"),
      placeholder: __("Enter category classification", "arraysubscription"),
    },
    {
      field: "Number",
      name: "priority",
      label: __("Priority", "arraysubscription"),
      placeholder: __("Enter priority (0-10)", "arraysubscription"),
      min: 0,
      max: 10,
      helperText: __("Priority level from 0 to 10", "arraysubscription"),
    },
    {
      field: "Text",
      name: "color",
      label: __("Color", "arraysubscription"),
      placeholder: __("Enter color code", "arraysubscription"),
      helperText: __("Hex color code (e.g., #FF5733)", "arraysubscription"),
    },
    {
      field: "Switch",
      name: "is_featured",
      label: __("Featured", "arraysubscription"),
      helperText: __("Mark this taxonomy as featured", "arraysubscription"),
    },
  ];

  if (loading) {
    const breadcrumb = [
      { label: __("Taxonomies", "arraysubscription"), path: "/test-taxonomy" },
      {
        label: isEdit
          ? __("Edit", "arraysubscription")
          : __("Add New", "arraysubscription"),
      },
    ];

    return (
      <DefaultPageLayout
        title={
          isEdit
            ? __("Edit Test Taxonomy", "arraysubscription")
            : __("Add New Test Taxonomy", "arraysubscription")
        }
        breadcrumb={breadcrumb}
      >
        <p>{__("Loading...", "arraysubscription")}</p>
      </DefaultPageLayout>
    );
  }

  const breadcrumb = [
    { label: __("Taxonomies", "arraysubscription"), path: "/test-taxonomy" },
    {
      label: isEdit
        ? __("Edit", "arraysubscription")
        : __("Add New", "arraysubscription"),
    },
  ];

  return (
    <DefaultPageLayout
      title={
        isEdit
          ? __("Edit Test Taxonomy", "arraysubscription")
          : __("Add New Test Taxonomy", "arraysubscription")
      }
      breadcrumb={breadcrumb}
    >
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{
          name: "",
          slug: "",
          description: "",
          category: "",
          priority: 0,
          is_featured: false,
          color: "#000000",
        }}
      >
        <FormBuilder formItems={formItems} form={form} />

        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button
            type="submit"
            className="button button-primary"
            disabled={submitting}
            onClick={() => form.submit()}
          >
            {submitting
              ? __("Saving...", "arraysubscription")
              : isEdit
              ? __("Update", "arraysubscription")
              : __("Create", "arraysubscription")}
          </button>
          <Link to="/test-taxonomy" className="button">
            {__("Cancel", "arraysubscription")}
          </Link>
        </div>
      </Form>
    </DefaultPageLayout>
  );
};

export default TestTaxonomyForm;
