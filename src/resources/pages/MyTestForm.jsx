const data = {
  code: 200,
  message: "form items fetched successfully",
  content: {
    form_items: [
      {
        field: "Checkbox",
        name: "features",
        label: "Features",
        help: "Select the features you want to enable",
        orientation: "vertical",
        data: [
          {
            value: "feature1",
            label: "Feature 1",
          },
          {
            value: "feature2",
            label: "Feature 2",
          },
          {
            value: "feature3",
            label: "Feature 3",
          },
        ],
      },
      {
        field: "AutoGrid",
        cols: 2,
        children: [
          {
            field: "Text",
            name: "singular_label",
            label: "Singular Label",
            placeholder: "Post",
            required: true,
            rules: [
              {
                required: true,
                message: "Singular Label is required",
              },
            ],
          },
          {
            field: "Text",
            name: "plural_label",
            label: "Plural Label",
            placeholder: "Posts",
            required: true,
            rules: [
              {
                required: true,
                message: "Plural Label is required",
              },
            ],
          },
          {
            field: "Text",
            name: "post_type_key",
            label: "Post Type Key",
            placeholder: "post",
            required: true,
            help: "Lower case letters, and underscores only, Max 20 characters.",
            rules: [
              {
                required: true,
                message: "Post Type Key is required",
              },
              {
                max: 20,
                message: "Post Type Key must be 20 characters or less",
              },
              {
                pattern: "^[a-z0-9_]+$",
                message:
                  "Only lowercase letters, numbers, and underscores allowed",
              },
            ],
          },
          {
            field: "Radio",
            name: "taxonomies",
            label: "Taxonomies",
            placeholder: "Add taxonomies",
            help: "Select existing taxonomies to classify items of the post type.",
            data: [
              {
                value: "category",
                label: "Category",
              },
              {
                value: "post_tag",
                label: "Post Tag",
              },
            ],
          },
          {
            field: "Checkbox",
            name: "is_public",
            label: "Public",
            help: "Visible on the frontend and in the admin dashboard.",
          },
          {
            field: "Switch",
            name: "hierarchical",
            label: "Hierarchical",
            help: "Hierarchical post types can have descendants (like pages).",
          },
        ],
      },
      {
        field: "Tag",
        name: "supports",
        label: "Supports",
        help: "Enable various features in the content editor.",
        data: [
          {
            value: "title",
            label: "Title",
          },
          {
            value: "author",
            label: "Author",
          },
          {
            value: "comments",
            label: "Comments",
          },
          {
            value: "trackbacks",
            label: "Trackbacks",
          },
          {
            value: "editor",
            label: "Editor",
          },
          {
            value: "excerpt",
            label: "Excerpt",
          },
          {
            value: "revisions",
            label: "Revisions",
          },
          {
            value: "page-attributes",
            label: "Page Attributes",
          },
          {
            value: "thumbnail",
            label: "Featured Image",
          },
          {
            value: "custom-fields",
            label: "Custom Fields",
          },
          {
            value: "post-formats",
            label: "Post Formats",
          },
        ],
      },
      {
        field: "Textarea",
        name: "description",
        label: "Description",
        help: "A descriptive summary of the post type.",
        placeholder: "A brief description of the post type",
      },
      {
        field: "Divider",
      },
      {
        field: "Switch",
        name: "advanced_configuration",
        label: "Advanced Configuration",
        help: "I know what I'm doing, show me all the options.",
      },
      {
        field: "Container",
        showWhen: {
          field: "advanced_configuration",
          operator: "==",
          value: true,
        },
        children: [
          {
            field: "Tabs",
            name: "advanced_tabs",
            listStyle: {
              margin: "0 -2rem",
              padding: "0 1rem",
            },
            items: [
              {
                key: "labels",
                label: "Labels",
                children: [
                  {
                    field: "AutoGrid",
                    cols: 2,
                    children: [
                      {
                        field: "Text",
                        name: "menu_name",
                        label: "Menu Name",
                        placeholder: "Posts",
                        help: "Admin menu name for the post type.",
                      },
                      {
                        field: "Text",
                        name: "all_items",
                        label: "All Items",
                        placeholder: "All Posts",
                        help: "In the post type submenu in the admin dashboard.",
                      },
                      {
                        field: "Text",
                        name: "edit_item",
                        label: "Edit Item",
                        placeholder: "Edit Post",
                        help: "At the top of the editor screen when editing an item.",
                      },
                      {
                        field: "Text",
                        name: "view_item",
                        label: "View Item",
                        placeholder: "View Post",
                        help: "In the admin bar to view item when editing it.",
                      },
                      {
                        field: "Text",
                        name: "view_items",
                        label: "View Items",
                        placeholder: "View Posts",
                        help: 'Appears in the admin bar in the "All Posts" view when archives are enabled.',
                      },
                      {
                        field: "Text",
                        name: "add_new_item",
                        label: "Add New Item",
                        placeholder: "Add New Post",
                        help: "At the top of the editor screen when adding a new item.",
                      },
                      {
                        field: "Text",
                        name: "add_new",
                        label: "Add New",
                        placeholder: "Add New Post",
                        help: "In the post type submenu in the admin dashboard.",
                      },
                      {
                        field: "Text",
                        name: "new_item",
                        label: "New Item",
                        placeholder: "New Post",
                        help: "In the post type submenu in the admin dashboard.",
                      },
                      {
                        field: "Text",
                        name: "parent_item_colon",
                        label: "Parent Item Prefix",
                        placeholder: "Parent Post:",
                        help: "For hierarchical types in the post type list screen.",
                      },
                      {
                        field: "Text",
                        name: "search_items",
                        label: "Search Items",
                        placeholder: "Search Posts",
                        help: "At the top of the items screen when searching.",
                      },
                      {
                        field: "Text",
                        name: "not_found",
                        label: "No Items Found",
                        placeholder: "No posts found",
                        help: "Shown when no posts are available.",
                      },
                      {
                        field: "Text",
                        name: "not_found_in_trash",
                        label: "No Items Found in Trash",
                        placeholder: "No posts found in Trash",
                        help: "Shown when trash is empty.",
                      },
                      {
                        field: "Text",
                        name: "archives_nav_menu",
                        label: "Archives Nav Menu",
                        placeholder: "Post Archives",
                        help: 'Label for "Post Type Archive" items in menus.',
                      },
                      {
                        field: "Text",
                        name: "attributes_meta_box",
                        label: "Attributes Meta Box",
                        placeholder: "Post Attributes",
                        help: "Title for the post attributes meta box.",
                      },
                      {
                        field: "Text",
                        name: "featured_image",
                        label: "Featured Image Meta Box",
                        placeholder: "Featured image",
                        help: "Title for the featured-image meta box.",
                      },
                      {
                        field: "Text",
                        name: "set_featured_image",
                        label: "Set Featured Image",
                        placeholder: "Set featured image",
                        help: "Button label when setting the featured image.",
                      },
                      {
                        field: "Text",
                        name: "remove_featured_image",
                        label: "Remove Featured Image",
                        placeholder: "Remove featured image",
                        help: "Button label when removing the featured image.",
                      },
                      {
                        field: "Text",
                        name: "use_featured_image",
                        label: "Use Featured Image",
                        placeholder: "Use as featured image",
                        help: "Button label when choosing an image as featured.",
                      },
                      {
                        field: "Text",
                        name: "insert_into_item",
                        label: "Insert Into Media Button",
                        placeholder: "Insert into post",
                        help: "Button label when adding media to content.",
                      },
                      {
                        field: "Text",
                        name: "uploaded_to_this_item",
                        label: "Uploaded To This Item",
                        placeholder: "Uploaded to this post",
                        help: "Shown in the media modal for uploads to this item.",
                      },
                      {
                        field: "Text",
                        name: "filter_items_list",
                        label: "Filter Items List",
                        placeholder: "Filter posts list",
                        help: "Screen-reader label for filter links.",
                      },
                      {
                        field: "Text",
                        name: "filter_items_by_date",
                        label: "Filter Items By Date",
                        placeholder: "Filter posts by date",
                        help: "Screen-reader label for date filter.",
                      },
                      {
                        field: "Text",
                        name: "items_list_navigation",
                        label: "Items List Navigation",
                        placeholder: "Posts list navigation",
                        help: "Screen-reader label for list pagination.",
                      },
                      {
                        field: "Text",
                        name: "items_list",
                        label: "Items List",
                        placeholder: "Posts list",
                        help: "Screen-reader label for the items list.",
                      },
                      {
                        field: "Text",
                        name: "item_published",
                        label: "Item Published",
                        placeholder: "Post published.",
                        help: "Notice after publishing.",
                      },
                      {
                        field: "Text",
                        name: "item_published_privately",
                        label: "Item Published Privately",
                        placeholder: "Post published privately.",
                        help: "Notice after private publish.",
                      },
                      {
                        field: "Text",
                        name: "item_reverted_to_draft",
                        label: "Item Reverted To Draft",
                        placeholder: "Post reverted to draft.",
                        help: "Notice after reverting to draft.",
                      },
                      {
                        field: "Text",
                        name: "item_scheduled",
                        label: "Item Scheduled",
                        placeholder: "Post scheduled.",
                        help: "Notice after scheduling.",
                      },
                      {
                        field: "Text",
                        name: "item_updated",
                        label: "Item Updated",
                        placeholder: "Post updated.",
                        help: "Notice after updating.",
                      },
                      {
                        field: "Text",
                        name: "item_link",
                        label: "Item Link",
                        placeholder: "Post Link",
                        help: "Title for a navigation link block variation.",
                      },
                      {
                        field: "Text",
                        name: "item_link_description",
                        label: "Item Link Description",
                        placeholder: "A link to a post.",
                        help: "Description for a navigation link block variation.",
                      },
                      {
                        field: "Text",
                        name: "title_placeholder",
                        label: "Title Placeholder",
                        placeholder: "Add title",
                        help: "Placeholder for the title field.",
                      },
                    ],
                  },
                ],
              },
              {
                key: "visibility",
                label: "Visibility",
                children: [
                  {
                    field: "Switch",
                    name: "appearance_menus_support",
                    label: "Appearance Menus Support",
                    help: "Allow items to be added to menus in the 'Appearance' > 'Menus' screen. Must be turned on in 'Screen options'.",
                  },
                  {
                    field: "Switch",
                    name: "exclude_from_search",
                    label: "Exclude From Search",
                    help: "Sets whether posts should be excluded from search results and taxonomy archive pages.",
                  },
                  {
                    field: "Switch",
                    name: "show_ui",
                    label: "Show In UI",
                    help: "Items can be edited and managed in the admin dashboard.",
                  },
                  {
                    field: "Container",
                    showWhen: {
                      field: "show_ui",
                      operator: "==",
                      value: true,
                    },
                    children: [
                      {
                        field: "Switch",
                        name: "show_in_admin_bar",
                        label: "Show In Admin Bar",
                        help: "Appears as an item in the 'New' menu in the admin bar.",
                      },
                      {
                        field: "Switch",
                        name: "show_in_menu",
                        label: "Show In Admin Menu",
                        help: "Admin editor navigation in the sidebar menu.",
                      },
                      {
                        field: "Container",
                        showWhen: {
                          field: "show_in_menu",
                          operator: "==",
                          value: true,
                        },
                        children: [
                          {
                            field: "Text",
                            name: "parent_menu_item",
                            label: "Admin Menu Parent",
                            placeholder: "edit.php?post_type={parent_page}",
                            help: "By default, the post type gets a new top-level item in the admin menu. If an existing top-level item is supplied, it will be added as a submenu item under it.",
                          },
                          {
                            field: "Number",
                            name: "menu_position",
                            label: "Menu Position",
                            help: "The position in the sidebar menu in the admin dashboard.",
                          },
                          {
                            field: "Text",
                            name: "menu_icon",
                            label: "Menu Icon",
                            placeholder: "dashicons-admin-post",
                            help: "Any Dashicons class name or a data-URL image.",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                key: "urls",
                label: "URLs",
                children: [
                  {
                    field: "AutoGrid",
                    cols: 2,
                    align: "center",
                    children: [
                      {
                        field: "Switch",
                        name: "has_archive",
                        label: "Archive",
                        help: "Has an item archive that can be customized with an archive template file in your theme.",
                      },
                      {
                        field: "Text",
                        name: "archive_slug",
                        placeholder: "Archive Slug, example: posts",
                        showWhen: {
                          field: "has_archive",
                          operator: "==",
                          value: true,
                        },
                      },
                    ],
                  },
                  {
                    field: "Switch",
                    name: "publicly_queryable",
                    label: "Publicly Queryable",
                    help: "URLs for an item and items can be accessed with a query string.",
                  },
                  {
                    field: "Divider",
                  },
                  {
                    field: "GridSelect",
                    name: "permalink_rewrite",
                    label: "Permalink Rewrite",
                    data: [
                      {
                        value: "default",
                        label: "Default, use Post Type Key",
                        description:
                          "Rewrite the URL using the post type key as the slug. Your permalink structure will be {slug}.",
                      },
                      {
                        value: "custom",
                        label: "Custom Permalink",
                        description:
                          "Rewrite the URL using a custom slug defined in the input below. Your permalink structure will be {custom_slug}.",
                      },
                      {
                        value: "no_permalink",
                        label: "No Permalink, Prevent URL rewriting",
                        description:
                          "Permalinks for this post type are disabled. The post type will not have a permalink structure.",
                      },
                    ],
                  },
                  {
                    field: "Container",
                    showWhen: {
                      field: "permalink_rewrite",
                      operator: "in",
                      value: ["default", "custom"],
                    },
                    children: [
                      {
                        field: "Switch",
                        name: "with_front",
                        label: "Front URL Prefix",
                        help: "Alters the permalink structure to add the WP_Rewrite::$front prefix to URLs.",
                      },
                      {
                        field: "Switch",
                        name: "feeds",
                        label: "Feed URL",
                        help: "RSS feed URL for the post type items.",
                      },
                      {
                        field: "Switch",
                        name: "pages",
                        label: "Pagination",
                        help: "Pagination support for the items URLs such as the archives.",
                      },
                    ],
                  },
                  {
                    field: "Text",
                    name: "url_slug",
                    label: "URL Slug",
                    placeholder: "custom-slug",
                    help: "Customize the slug used in the URL.",
                    showWhen: {
                      field: "permalink_rewrite",
                      operator: "==",
                      value: "custom",
                    },
                  },
                  {
                    field: "Text",
                    name: "rewrite_slug",
                    label: "Rewrite Slug",
                    placeholder: "post",
                    help: "Slug used for single post URLs.",
                    showWhen: {
                      field: "permalink_rewrite",
                      operator: "in",
                      value: ["default", "custom"],
                    },
                  },
                ],
              },
              {
                key: "permissions",
                label: "Permissions",
                children: [
                  {
                    field: "Switch",
                    name: "map_meta_cap",
                    label: "Rename Capabilities",
                    help: "By default, the post type capabilities inherit from 'Post' (e.g., edit_post, delete_posts). Enable to use post-type-specific capabilities (e.g., edit_{singular}, delete_{plural}).",
                  },
                  {
                    field: "Container",
                    showWhen: {
                      field: "map_meta_cap",
                      operator: "==",
                      value: true,
                    },
                    children: [
                      {
                        field: "Text",
                        name: "capability_type",
                        label: "Singular Capability Name",
                        placeholder: "post",
                        help: "Choose another post type to base the capabilities for this post type.",
                      },
                      {
                        field: "Text",
                        name: "custom_capability_type",
                        label: "Plural Capability Name",
                        placeholder: "posts",
                        help: "Optionally provide a plural name to be used in capabilities.",
                      },
                    ],
                  },
                  {
                    field: "Divider",
                  },
                  {
                    field: "Switch",
                    name: "can_export",
                    label: "Can Export",
                    help: "Allow the post type to be exported from 'Tools' > 'Export'.",
                  },
                  {
                    field: "Switch",
                    name: "delete_with_user",
                    label: "Delete With User",
                    help: "Delete items by a user when that user is deleted.",
                  },
                ],
              },
              {
                key: "rest_api",
                label: "REST API",
                children: [
                  {
                    field: "Switch",
                    name: "show_in_rest",
                    label: "Show In REST API",
                    help: "Exposes this post type in the REST API. Required to use the block editor.",
                  },
                  {
                    field: "Container",
                    showWhen: {
                      field: "show_in_rest",
                      operator: "==",
                      value: true,
                    },
                    children: [
                      {
                        field: "Text",
                        name: "rest_base",
                        label: "Base URL",
                        placeholder: "posts",
                        help: "The base URL for the post type REST API URLs.",
                      },
                      {
                        field: "Text",
                        name: "rest_namespace",
                        label: "Namespace Route",
                        placeholder: "wp/v2",
                        help: "The namespace part of the REST API URL.",
                      },
                      {
                        field: "Text",
                        name: "rest_controller_class",
                        label: "Controller Class",
                        placeholder: "WP_REST_Posts_Controller",
                        help: "Optional custom controller to use instead of WP_REST_Posts_Controller.",
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
    form_data: null,
    available_taxonomies: [
      {
        value: "category",
        label: "Categories",
      },
      {
        value: "post_tag",
        label: "Tags",
      },
      {
        value: "elementor_library_type",
        label: "Type",
      },
      {
        value: "elementor_library_category",
        label: "Categories",
      },
    ],
    values: {
      features: ["feature1", "feature3"],
      taxonomies: "category",
      is_public: true,
      hierarchical: true,
      publicly_queryable: true,
      show_ui: true,
      show_in_menu: true,
      show_in_admin_bar: true,
      show_in_nav_menus: true,
      exclude_from_search: false,
      appearance_menus_support: true,
      permalink_rewrite: "custom",
      with_front: true,
      feeds: false,
      pages: true,
      delete_with_user: false,
      capability_type: "post",
      map_meta_cap: false,
      show_in_rest: true,
      rest_namespace: "wp/v2",
      menu_icon: "dashicons-admin-post",
      menu_position: 25,
      supports: ["title", "editor", "thumbnail"],
      has_archive: true,
      can_export: true,
      query_var: true,
      is_active: true,
    },
  },
};

import React from "react";
import Form from "rc-field-form";
import FormBuilder from "@libs/form-builder";

const MyTestForm = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      initialValues={data.content.values || {}}
    >
      hello form
      <FormBuilder formItems={data.content.form_items} form={form} />
    </Form>
  );
};

export default MyTestForm;
