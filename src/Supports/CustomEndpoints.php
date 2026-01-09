<?php

namespace ArraySubscription\Supports;

defined('ABSPATH') || exit;

class CustomEndpoints
{
    public function __construct()
    {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes()
    {
        register_rest_route('arraysubscription/v1', '/status-counts/(?P<post_type>[a-zA-Z0-9_-]+)', [
            'methods' => 'GET',
            'callback' => [$this, 'get_status_counts'],
            'permission_callback' => function () {
                return current_user_can('edit_posts');
            },
            'args' => [
                'post_type' => [
                    'required' => true,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                ],
            ],
        ]);

        // Register duplicate endpoint for any post type
        register_rest_route('arraysubscription/v1', '/(?P<post_type>[a-zA-Z0-9_-]+)/(?P<id>\d+)/duplicate', [
            'methods' => 'POST',
            'callback' => [$this, 'duplicate_post'],
            'permission_callback' => function () {
                return current_user_can('edit_posts');
            },
            'args' => [
                'post_type' => [
                    'required' => true,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                ],
                'id' => [
                    'required' => true,
                    'type' => 'integer',
                    'sanitize_callback' => 'absint',
                ],
            ],
        ]);

        // Register select options endpoint for dynamic dropdowns
        register_rest_route('arraysubscription/v1', '/select-options', [
            'methods' => 'GET',
            'callback' => [$this, 'get_select_options'],
            'permission_callback' => function () {
                return current_user_can('edit_posts');
            },
            'args' => [
                'dataType' => [
                    'required' => true,
                    'type' => 'string',
                    'enum' => ['posttype', 'taxonomy'],
                    'sanitize_callback' => 'sanitize_text_field',
                    'description' => \esc_html__('Data source type: posttype or taxonomy', 'arraysubscription'),
                ],
                'source' => [
                    'required' => true,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                    'description' => \esc_html__('Post type slug or taxonomy name', 'arraysubscription'),
                ],
                'search' => [
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                    'description' => \esc_html__('Search query for title/name', 'arraysubscription'),
                ],
                'orderBy' => [
                    'type' => 'string',
                    'enum' => ['title', 'date'],
                    'default' => 'title',
                    'sanitize_callback' => 'sanitize_text_field',
                    'description' => \esc_html__('Order by field', 'arraysubscription'),
                ],
                'order' => [
                    'type' => 'string',
                    'enum' => ['asc', 'desc'],
                    'default' => 'asc',
                    'sanitize_callback' => 'sanitize_text_field',
                    'description' => \esc_html__('Sort order', 'arraysubscription'),
                ],
                'groupBy' => [
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                    'description' => \esc_html__('Group by: date or taxonomy slug (for posttype)', 'arraysubscription'),
                ],
                'taxonomy' => [
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_key',
                    'description' => \esc_html__('Filter by taxonomy (for posttype only)', 'arraysubscription'),
                ],
                'taxonomyTerm' => [
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                    'description' => \esc_html__('Taxonomy term ID or slug', 'arraysubscription'),
                ],
                'meta' => [
                    'type' => 'string',
                    'description' => \esc_html__('JSON encoded meta query filters', 'arraysubscription'),
                ],
                'nonce' => [
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                    'description' => \esc_html__('Optional nonce for additional verification', 'arraysubscription'),
                ],
            ],
        ]);
    }
    public function get_status_counts(\WP_REST_Request $request)
    {
        $post_type = $request->get_param('post_type');

        // Verify post type exists
        if (!post_type_exists($post_type)) {
            return new \WP_Error(
                'invalid_post_type',
                'Invalid post type',
                ['status' => 404]
            );
        }

        $counts = [
            'all' => 0,
            'publish' => 0,
            'draft' => 0,
            'trash' => 0,
        ];

        // Get counts for each status
        $statuses = ['publish', 'draft', 'trash'];

        foreach ($statuses as $status) {
            $count_query = new \WP_Query([
                'post_type' => $post_type,
                'post_status' => $status,
                'posts_per_page' => 1,
                'fields' => 'ids',
                'no_found_rows' => false,
            ]);

            $counts[$status] = $count_query->found_posts;
            $counts['all'] += $count_query->found_posts;
        }

        return rest_ensure_response($counts);
    }
    public function duplicate_post(\WP_REST_Request $request)
    {
        $post_type = $request->get_param('post_type');
        $post_id = $request->get_param('id');

        // Verify post type exists
        if (!post_type_exists($post_type)) {
            return new \WP_Error(
                'invalid_post_type',
                'Invalid post type',
                ['status' => 404]
            );
        }

        // Get the original post
        $original_post = get_post($post_id);

        if (!$original_post || $original_post->post_type !== $post_type) {
            return new \WP_Error(
                'post_not_found',
                'Post not found',
                ['status' => 404]
            );
        }

        // Check if user can edit this post
        if (!current_user_can('edit_post', $post_id)) {
            return new \WP_Error(
                'unauthorized',
                'You are not allowed to duplicate this post',
                ['status' => 403]
            );
        }

        // Create duplicate post data
        $new_post = [
            'post_title'   => $original_post->post_title . ' (Copy)',
            'post_content' => $original_post->post_content,
            'post_excerpt' => $original_post->post_excerpt,
            'post_status'  => 'draft',
            'post_type'    => $original_post->post_type,
            'post_author'  => get_current_user_id(),
        ];

        // Insert the new post
        $new_post_id = wp_insert_post($new_post);

        if (is_wp_error($new_post_id)) {
            return new \WP_Error(
                'duplicate_failed',
                'Failed to duplicate post',
                ['status' => 500]
            );
        }

        // Duplicate all post meta
        $post_meta = get_post_meta($post_id);
        $duplicated_meta = [];

        foreach ($post_meta as $meta_key => $meta_values) {
            // Skip protected meta fields (starting with underscore)
            if (strpos($meta_key, '_') === 0) {
                continue;
            }

            foreach ($meta_values as $meta_value) {
                $unserialized_value = maybe_unserialize($meta_value);
                add_post_meta($new_post_id, $meta_key, $unserialized_value);

                // Store for response
                if (!isset($duplicated_meta[$meta_key])) {
                    $duplicated_meta[$meta_key] = $unserialized_value;
                }
            }
        }

        // Get the duplicated post with REST format including meta
        $new_post_obj = get_post($new_post_id);
        $response = [
            'id' => $new_post_id,
            'title' => [
                'rendered' => $new_post_obj->post_title,
            ],
            'status' => $new_post_obj->post_status,
            'date' => $new_post_obj->post_date,
            'meta' => $duplicated_meta,
            'message' => 'Post duplicated successfully',
        ];

        return rest_ensure_response($response);
    }

    /**
     * Get select options from post types or taxonomies
     *
     * @param \WP_REST_Request $request
     * @return \WP_REST_Response|\WP_Error
     */
    public function get_select_options(\WP_REST_Request $request)
    {
        $data_type = $request->get_param('dataType');
        $source = $request->get_param('source');
        $search = $request->get_param('search');
        $order_by = $request->get_param('orderBy') ?: 'title';
        $order = $request->get_param('order') ?: 'asc';
        $group_by = $request->get_param('groupBy');
        $taxonomy_filter = $request->get_param('taxonomy');
        $taxonomy_term = $request->get_param('taxonomyTerm');
        $meta_filter = $request->get_param('meta');
        $nonce = $request->get_param('nonce');

        // Max 20 items hardcoded
        $max_items = 20;

        // Validate nonce if provided
        $nonce_valid = false;
        if (!empty($nonce)) {
            $nonce_valid = \wp_verify_nonce($nonce, 'arraysubscription_select_options');
        }

        // Collect all query parameters for the filter
        $query_params = [
            'dataType' => $data_type,
            'source' => $source,
            'search' => $search,
            'orderBy' => $order_by,
            'order' => $order,
            'groupBy' => $group_by,
            'taxonomy' => $taxonomy_filter,
            'taxonomyTerm' => $taxonomy_term,
            'meta' => $meta_filter,
            'maxItems' => $max_items,
        ];

        $options = [];

        if ($data_type === 'posttype') {
            $result = $this->get_posttype_options(
                $source,
                $search,
                $order_by,
                $order,
                $group_by,
                $taxonomy_filter,
                $taxonomy_term,
                $meta_filter,
                $max_items
            );

            // If it's an error, return early
            if (\is_wp_error($result)) {
                return $result;
            }

            // Extract options from response
            $options = $result->get_data();
        } elseif ($data_type === 'taxonomy') {
            $result = $this->get_taxonomy_options(
                $source,
                $search,
                $order_by,
                $order,
                $group_by,
                $max_items
            );

            // If it's an error, return early
            if (\is_wp_error($result)) {
                return $result;
            }

            // Extract options from response
            $options = $result->get_data();
        } else {
            return new \WP_Error(
                'invalid_data_type',
                \esc_html__('Invalid data type. Must be "posttype" or "taxonomy".', 'arraysubscription'),
                ['status' => 400]
            );
        }

        /**
         * Filter the select options before returning.
         *
         * Allows developers to modify the options data, implement additional
         * access control, or add custom filtering logic.
         *
         * @since 1.0.0
         *
         * @param array  $options      The options array to be returned.
         * @param array  $query_params All query parameters from the request.
         * @param string $nonce        The nonce value if provided, empty string otherwise.
         * @param bool   $nonce_valid  Whether the nonce validation passed (false if no nonce provided).
         */
        $options = \apply_filters(
            'arraysubscription_select_options',
            $options,
            $query_params,
            $nonce ?: '',
            $nonce_valid
        );

        return \rest_ensure_response($options);
    }

    /**
     * Get options from a post type
     */
    private function get_posttype_options(
        $post_type,
        $search,
        $order_by,
        $order,
        $group_by,
        $taxonomy_filter,
        $taxonomy_term,
        $meta_filter,
        $max_items
    ) {
        // Verify post type exists
        if (!post_type_exists($post_type)) {
            return new \WP_Error(
                'invalid_post_type',
                \esc_html__('Invalid post type', 'arraysubscription'),
                ['status' => 404]
            );
        }

        $args = [
            'post_type' => $post_type,
            'post_status' => 'publish',
            'posts_per_page' => $max_items,
            'orderby' => $order_by === 'date' ? 'date' : 'title',
            'order' => strtoupper($order) === 'DESC' ? 'DESC' : 'ASC',
        ];

        // Search by title
        if (!empty($search)) {
            $args['s'] = \sanitize_text_field($search);
        }

        // Filter by taxonomy
        if (!empty($taxonomy_filter) && !empty($taxonomy_term)) {
            $args['tax_query'] = [
                [
                    'taxonomy' => \sanitize_key($taxonomy_filter),
                    'field' => is_numeric($taxonomy_term) ? 'term_id' : 'slug',
                    'terms' => is_numeric($taxonomy_term) ? absint($taxonomy_term) : \sanitize_text_field($taxonomy_term),
                ],
            ];
        }

        // Filter by meta
        if (!empty($meta_filter)) {
            $meta_array = is_string($meta_filter) ? json_decode($meta_filter, true) : $meta_filter;
            if (is_array($meta_array)) {
                $args['meta_query'] = ['relation' => 'AND'];
                foreach ($meta_array as $meta_key => $meta_value) {
                    $args['meta_query'][] = [
                        'key' => \sanitize_key($meta_key),
                        'value' => \sanitize_text_field($meta_value),
                    ];
                }
            }
        }

        $query = new \WP_Query($args);
        $options = [];

        // Group by taxonomy or date
        if (!empty($group_by)) {
            $grouped = [];

            foreach ($query->posts as $post) {
                $group_label = '';

                if ($group_by === 'date') {
                    $group_label = \wp_date('F Y', strtotime($post->post_date));
                } elseif (taxonomy_exists($group_by)) {
                    $terms = \wp_get_post_terms($post->ID, $group_by, ['fields' => 'names']);
                    $group_label = !empty($terms) && !\is_wp_error($terms) ? $terms[0] : \esc_html__('Uncategorized', 'arraysubscription');
                }

                if (!isset($grouped[$group_label])) {
                    $grouped[$group_label] = [];
                }

                $grouped[$group_label][] = [
                    'value' => (string) $post->ID,
                    'label' => \esc_html($post->post_title),
                ];
            }

            foreach ($grouped as $label => $items) {
                $options[] = [
                    'label' => \esc_html($label),
                    'options' => $items,
                ];
            }
        } else {
            foreach ($query->posts as $post) {
                $options[] = [
                    'value' => (string) $post->ID,
                    'label' => \esc_html($post->post_title),
                ];
            }
        }

        return \rest_ensure_response($options);
    }

    /**
     * Get options from a taxonomy
     */
    private function get_taxonomy_options(
        $taxonomy,
        $search,
        $order_by,
        $order,
        $group_by,
        $max_items
    ) {
        // Verify taxonomy exists
        if (!taxonomy_exists($taxonomy)) {
            return new \WP_Error(
                'invalid_taxonomy',
                \esc_html__('Invalid taxonomy', 'arraysubscription'),
                ['status' => 404]
            );
        }

        $args = [
            'taxonomy' => $taxonomy,
            'hide_empty' => false,
            'number' => $max_items,
            'orderby' => $order_by === 'date' ? 'term_id' : 'name',
            'order' => strtoupper($order) === 'DESC' ? 'DESC' : 'ASC',
        ];

        // Search
        if (!empty($search)) {
            $args['search'] = \sanitize_text_field($search);
        }

        $terms = \get_terms($args);

        if (\is_wp_error($terms)) {
            return new \WP_Error(
                'taxonomy_error',
                $terms->get_error_message(),
                ['status' => 500]
            );
        }

        $options = [];

        // Group by date (creation order approximated by term_id)
        if ($group_by === 'date') {
            // For taxonomy terms, we don't have a creation date, so we'll group by first letter
            $grouped = [];

            foreach ($terms as $term) {
                $first_letter = strtoupper(substr($term->name, 0, 1));
                if (!isset($grouped[$first_letter])) {
                    $grouped[$first_letter] = [];
                }

                $grouped[$first_letter][] = [
                    'value' => (string) $term->term_id,
                    'label' => \esc_html($term->name),
                ];
            }

            foreach ($grouped as $label => $items) {
                $options[] = [
                    'label' => \esc_html($label),
                    'options' => $items,
                ];
            }
        } else {
            foreach ($terms as $term) {
                $options[] = [
                    'value' => (string) $term->term_id,
                    'label' => \esc_html($term->name),
                ];
            }
        }

        return \rest_ensure_response($options);
    }
}
