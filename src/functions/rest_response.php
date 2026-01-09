<?php

/**
 * REST API response helper functions  ArraySubscription
 *
 * This file contains utility functions for formatting and sending
 * consistent REST API responses throughout the plugin.
 *
 * @package ArraySubscription
 * @subpackage Functions
 * @since 1.0.0
 */

if (! defined('ABSPATH')) exit; // Exit if accessed directly

// if function not exists
if (!function_exists('arraysubscription_rest_response')) {

    function arraysubscription_rest_response($content = null, $status = 200, $message = null, $headers = array(), $options = array(), $code = null)
    {
        return new WP_REST_Response(
            [
                'code' => $code ?? $status,
                'message' => $message,
                'content' => $content
            ],
            $status,
            $headers,
        );
    }
}
