import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { __ } from "@wordpress/i18n";
import Form, { useForm } from "rc-field-form";
import FormBuilder from "@libs/form-builder";
import { buildUrl } from "@/supports/url";
import DefaultPageLayout from "@/components/DefaultPageLayout";

const TestCPTForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const isEdit = !!id;

  // Fetch post type data if editing
  useEffect(() => {
    if (isEdit) {
      fetchPostType();
    }
  }, [id]);

  const fetchPostType = async () => {
    setLoading(true);
    try {
      const url = buildUrl(
        `${window?.arraySubscription?.env?.apiBaseUrl}wp/v2/test_cpt/${id}`,
        { context: "edit" }
      );
      const response = await fetch(url, {
        headers: {
          "X-WP-Nonce": window?.arraySubscription?.env?.nonce,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch post type");
      }

      const data = await response.json();

      form.setFieldsValue({
        title: data.title.rendered,
        status: data.status,
        foo: data.meta?.foo || "",
        bar: data.meta?.bar || "",
        media_upload: data.meta?.media_upload || "",
        featured_image: data.featured_media || "",
        is_awesome: data.meta?.is_awesome || false,
      });
    } catch (error) {
      console.error("Error fetching post type:", error);
      alert("Failed to load post type");
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
            `${window?.arraySubscription?.env?.apiBaseUrl}wp/v2/test_cpt/${id}`
          )
        : buildUrl(
            `${window?.arraySubscription?.env?.apiBaseUrl}wp/v2/test_cpt`
          );
      console.log("Submitting values:", values);
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "X-WP-Nonce": window?.arraySubscription?.env?.nonce,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: values.title,
          status: values.status,
          featured_media: values.featured_image || 0,
          meta: {
            foo: values.foo || "",
            bar: values.bar || "",
            media_upload: values.media_upload || "",
            is_awesome: values.is_awesome || false,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save post type");
      }

      alert(
        isEdit
          ? "Post type updated successfully!"
          : "Post type created successfully!"
      );
      navigate("/test-cpt/table");
    } catch (error) {
      console.error("Error saving post type:", error);
      alert("Failed to save post type");
    } finally {
      setSubmitting(false);
    }
  };

  // Form configuration
  const formItems = [
    {
      field: "Text",
      name: "title",
      label: __("Title", "arraysubscription"),
      placeholder: __("Enter post type title", "arraysubscription"),
      rules: [
        {
          required: true,
          message: __("Title is required", "arraysubscription"),
        },
      ],
    },
    {
      field: "Select",
      name: "status",
      label: __("Status", "arraysubscription"),
      placeholder: __("Select status", "arraysubscription"),
      searchable: false,
      data: [
        { label: __("Published", "arraysubscription"), value: "publish" },
        { label: __("Draft", "arraysubscription"), value: "draft" },
        { label: __("Trash", "arraysubscription"), value: "trash" },
      ],
      rules: [
        {
          required: true,
          message: __("Status is required", "arraysubscription"),
        },
      ],
    },
    // Multi-select with static grouped data
    {
      field: "Select",
      name: "categories_static",
      label: __("Categories (Static Grouped)", "arraysubscription"),
      placeholder: __("Select categories", "arraysubscription"),
      multiple: true,
      help: __("Multi-select with grouped static options", "arraysubscription"),
      data: [
        {
          label: __("Content Types", "arraysubscription"),
          options: [
            { label: __("Blog Post", "arraysubscription"), value: "blog" },
            { label: __("News Article", "arraysubscription"), value: "news" },
            { label: __("Tutorial", "arraysubscription"), value: "tutorial" },
          ],
        },
        {
          label: __("Media Types", "arraysubscription"),
          options: [
            { label: __("Video", "arraysubscription"), value: "video" },
            { label: __("Podcast", "arraysubscription"), value: "podcast" },
            { label: __("Gallery", "arraysubscription"), value: "gallery" },
          ],
        },
      ],
    },
    // Single select with API data (posts)
    {
      field: "Select",
      name: "related_post",
      label: __("Related Post (API)", "arraysubscription"),
      placeholder: __("Search and select a post", "arraysubscription"),
      help: __("Single-select from posts via API", "arraysubscription"),
      api: {
        endpoint: buildUrl(
          `${window?.arraySubscription?.env?.apiBaseUrl}arraysubscription/v1/select-options`
        ),
        dataType: "posttype",
        source: "post",
        orderBy: "date",
        order: "desc",
      },
    },
    // Multi-select with API data (posts grouped by date)
    {
      field: "Select",
      name: "related_posts_grouped",
      label: __("Related Posts (Grouped by Date)", "arraysubscription"),
      placeholder: __("Select related posts", "arraysubscription"),
      multiple: true,
      help: __(
        "Multi-select from posts grouped by date via API",
        "arraysubscription"
      ),
      api: {
        endpoint: buildUrl(
          `${window?.arraySubscription?.env?.apiBaseUrl}arraysubscription/v1/select-options`
        ),
        dataType: "posttype",
        source: "post",
        orderBy: "date",
        order: "desc",
        groupBy: "date",
      },
    },
    // Single select with taxonomy data
    {
      field: "Select",
      name: "primary_category",
      label: __("Primary Category (Taxonomy API)", "arraysubscription"),
      placeholder: __("Select a category", "arraysubscription"),
      help: __(
        "Single-select from categories taxonomy via API",
        "arraysubscription"
      ),
      api: {
        endpoint: buildUrl(
          `${window?.arraySubscription?.env?.apiBaseUrl}arraysubscription/v1/select-options`
        ),
        dataType: "taxonomy",
        source: "category",
        orderBy: "title",
        order: "asc",
      },
    },
    // Multi-select tags (like old Tag field)
    {
      field: "Select",
      name: "tags_multi",
      label: __("Tags (Multi-Select)", "arraysubscription"),
      placeholder: __("Select tags", "arraysubscription"),
      multiple: true,
      help: __(
        "Tag-style multi-select from tags taxonomy",
        "arraysubscription"
      ),
      api: {
        endpoint: buildUrl(
          `${window?.arraySubscription?.env?.apiBaseUrl}arraysubscription/v1/select-options`
        ),
        dataType: "taxonomy",
        source: "post_tag",
        orderBy: "title",
        order: "asc",
      },
    },
    {
      field: "Text",
      name: "foo",
      label: __("Foo", "arraysubscription"),
      placeholder: __("Enter foo value", "arraysubscription"),
    },
    {
      field: "Text",
      name: "bar",
      label: __("Bar", "arraysubscription"),
      placeholder: __("Enter bar value", "arraysubscription"),
    },
    {
      field: "MediaUpload",
      name: "featured_image",
      label: __("Featured Image", "arraysubscription"),
      multiple: false,
    },
    {
      field: "MediaUpload",
      name: "media_upload",
      label: __("Media Upload", "arraysubscription"),
      multiple: true,
    },
    {
      field: "Switch",
      name: "is_awesome",
      label: __("Is Awesome", "arraysubscription"),
    },
  ];

  if (loading) {
    const breadcrumb = [
      { label: __("Post Types", "arraysubscription"), path: "/test-cpt/card" },
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
            ? __("Edit Post Type", "arraysubscription")
            : __("Add New Post Type", "arraysubscription")
        }
        breadcrumb={breadcrumb}
      >
        <p>{__("Loading...", "arraysubscription")}</p>
      </DefaultPageLayout>
    );
  }

  const breadcrumb = [
    { label: __("Post Types", "arraysubscription"), path: "/test-cpt/card" },
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
          ? __("Edit Post Type", "arraysubscription")
          : __("Add New Post Type", "arraysubscription")
      }
      breadcrumb={breadcrumb}
    >
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{
          status: "draft",
          media_upload: "",
          featured_image: "",
          is_awesome: false,
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
          <Link to="/test-cpt/table" className="button">
            {__("Cancel", "arraysubscription")}
          </Link>
        </div>
      </Form>
    </DefaultPageLayout>
  );
};

export default TestCPTForm;
