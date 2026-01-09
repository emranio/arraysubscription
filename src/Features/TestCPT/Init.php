<?php

namespace ArraySubscription\Features\TestCPT;

defined('ABSPATH') || exit;

class Init
{
    public function __construct()
    {
        // Already inside 'init' hook (called from main plugin file), so call directly
        $this->register_post_type_builder_cpt();
        $this->register_meta_fields();
        $this->register_test_taxonomy();
        $this->register_taxonomy_meta_fields();
        $this->allow_meta_query_in_rest();
    }

    protected function register_post_type_builder_cpt()
    {
        $labels = [
            'name' => __('Test CPT', 'arraysubscription'),
            'singular_name' => __('Post Type', 'arraysubscription'),
            'menu_name' => __('Test CPT', 'arraysubscription'),
            'name_admin_bar' => __('Post Type', 'arraysubscription'),
            'add_new' => __('Add New', 'arraysubscription'),
            'add_new_item' => __('Add New Post Type', 'arraysubscription'),
            'new_item' => __('New Post Type', 'arraysubscription'),
            'edit_item' => __('Edit Post Type', 'arraysubscription'),
            'view_item' => __('View Post Type', 'arraysubscription'),
            'all_items' => __('All Test CPT', 'arraysubscription'),
            'search_items' => __('Search Test CPT', 'arraysubscription'),
            'not_found' => __('No test cpt found.', 'arraysubscription'),
            'not_found_in_trash' => __('No test cpt found in Trash.', 'arraysubscription'),
        ];

        $args = [
            'labels' => $labels,
            'public' => false,
            'publicly_queryable' => false,
            'show_ui' => true,
            'show_in_menu' => true,
            'query_var' => true,
            'rewrite' => ['slug' => 'test_cpt'],
            'capability_type' => 'post',
            'has_archive' => false,
            'hierarchical' => false,
            'show_in_rest' => true,
            'menu_position' => 20,
            'supports' => ['title', 'custom-fields', 'thumbnail'],
        ];

        register_post_type('test_cpt', $args);
    }

    protected function register_meta_fields()
    {
        // Register foo meta field
        register_post_meta('test_cpt', 'foo', [
            'type' => 'string',
            'single' => true,
            'show_in_rest' => true,
            'default' => '',
            'auth_callback' => function () {
                return current_user_can('edit_posts');
            }
        ]);

        // Register bar meta field
        register_post_meta('test_cpt', 'bar', [
            'type' => 'string',
            'single' => true,
            'show_in_rest' => true,
            'default' => '',
            'auth_callback' => function () {
                return current_user_can('edit_posts');
            }
        ]);

        // Register is_awesome meta field
        register_post_meta('test_cpt', 'is_awesome', [
            'type' => 'boolean',
            'single' => true,
            'show_in_rest' => true,
            'default' => false,
            'auth_callback' => function () {
                return current_user_can('edit_posts');
            }
        ]);

        // Register media_upload meta field
        register_post_meta('test_cpt', 'media_upload', [
            'type' => 'string',
            'single' => true,
            'show_in_rest' => true,
            'default' => '',
            'auth_callback' => function () {
                return current_user_can('edit_posts');
            },
            'description' => 'JSON array of media IDs for uploaded images'
        ]);
    }

    protected function allow_meta_query_in_rest()
    {
        add_filter('rest_test_cpt_collection_params', function ($params) {
            $params['orderby']['enum'][] = 'meta_value';
            $params['orderby']['enum'][] = 'meta_value_num';
            $params['meta_key'] = [
                'description' => 'Meta key to order by',
                'type' => 'string',
            ];
            return $params;
        });
    }

    protected function register_test_taxonomy()
    {
        $labels = [
            'name' => \__('Test Taxonomies', 'arraysubscription'),
            'singular_name' => \__('Test Taxonomy', 'arraysubscription'),
            'menu_name' => \__('Test Taxonomies', 'arraysubscription'),
            'all_items' => \__('All Test Taxonomies', 'arraysubscription'),
            'edit_item' => \__('Edit Test Taxonomy', 'arraysubscription'),
            'view_item' => \__('View Test Taxonomy', 'arraysubscription'),
            'update_item' => \__('Update Test Taxonomy', 'arraysubscription'),
            'add_new_item' => \__('Add New Test Taxonomy', 'arraysubscription'),
            'new_item_name' => \__('New Test Taxonomy Name', 'arraysubscription'),
            'search_items' => \__('Search Test Taxonomies', 'arraysubscription'),
            'not_found' => \__('No test taxonomies found', 'arraysubscription'),
        ];

        $args = [
            'labels' => $labels,
            'public' => true,
            'publicly_queryable' => true,
            'hierarchical' => false,
            'show_ui' => true,
            'show_in_menu' => true,
            'show_in_nav_menus' => true,
            'show_in_rest' => true,
            'show_admin_column' => true,
            'rest_base' => 'test_taxonomy',
            'rest_controller_class' => 'WP_REST_Terms_Controller',
            'query_var' => true,
            'rewrite' => ['slug' => 'test-taxonomy'],
            'capabilities' => [
                'manage_terms' => 'manage_categories',
                'edit_terms' => 'manage_categories',
                'delete_terms' => 'manage_categories',
                'assign_terms' => 'edit_posts',
            ],
        ];

        \register_taxonomy('test_taxonomy', ['test_cpt'], $args);
    }

    protected function register_taxonomy_meta_fields()
    {
        // Register category meta field
        \register_term_meta('test_taxonomy', 'category', [
            'type' => 'string',
            'single' => true,
            'show_in_rest' => true,
            'default' => '',
            'description' => \__('Category classification', 'arraysubscription'),
            'sanitize_callback' => 'sanitize_text_field',
            'auth_callback' => function () {
                return \current_user_can('manage_categories');
            }
        ]);

        // Register priority meta field
        \register_term_meta('test_taxonomy', 'priority', [
            'type' => 'integer',
            'single' => true,
            'show_in_rest' => true,
            'default' => 0,
            'description' => \__('Priority level (0-10)', 'arraysubscription'),
            'sanitize_callback' => 'absint',
            'auth_callback' => function () {
                return \current_user_can('manage_categories');
            }
        ]);

        // Register is_featured meta field
        \register_term_meta('test_taxonomy', 'is_featured', [
            'type' => 'boolean',
            'single' => true,
            'show_in_rest' => true,
            'default' => false,
            'description' => \__('Whether this taxonomy is featured', 'arraysubscription'),
            'sanitize_callback' => function ($value) {
                return (bool) $value;
            },
            'auth_callback' => function () {
                return \current_user_can('manage_categories');
            }
        ]);

        // Register color meta field
        \register_term_meta('test_taxonomy', 'color', [
            'type' => 'string',
            'single' => true,
            'show_in_rest' => true,
            'default' => '#000000',
            'description' => \__('Color code for taxonomy', 'arraysubscription'),
            'sanitize_callback' => 'sanitize_hex_color',
            'auth_callback' => function () {
                return \current_user_can('manage_categories');
            }
        ]);
    }
}
