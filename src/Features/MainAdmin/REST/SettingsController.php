<?php

namespace ArraySubscription\Features\MainAdmin\REST;

use ArraySubscription\Supports\BaseRestController;
use WP_REST_Request;
use WP_REST_Response;
use WP_Error;

/**
 * Settings REST Controller
 *
 * Handles REST API endpoints for settings management.
 */
class SettingsController extends BaseRestController
{

    /**
     * Constructor.
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Register REST API routes.
     *
     * @return void
     */
    public function registerRoutes(): void
    {
        // Get form data
        \register_rest_route(
            $this->namespace,
            '/settings/data',
            [
                'methods' => 'GET',
                'callback' => [$this, 'getData'],
                'permission_callback' => [$this, 'checkPermission'],
            ]
        );

        // Save settings
        \register_rest_route(
            $this->namespace,
            '/settings/save',
            [
                'methods' => 'POST',
                'callback' => [$this, 'saveSettings'],
                'permission_callback' => [$this, 'checkPermission'],
                'args' => [
                    'settings' => [
                        'required' => true,
                        'type' => 'object',
                        'description' => \esc_html__('Settings data to save', 'arraysubscription'),
                    ],
                ],
            ]
        );
    }

    /**
     * Get form data.
     *
     * @return WP_REST_Response|WP_Error
     */
    public function getData()
    {
        $data = [];

        return arraysubscription_rest_response(
            ['values' => $data],
            200,
            \esc_html__('Form data retrieved', 'arraysubscription')
        );
    }

    /**
     * Save settings.
     *
     * @param WP_REST_Request $request Request object.
     * @return WP_REST_Response|WP_Error
     */
    public function saveSettings(WP_REST_Request $request)
    {
        return arraysubscription_rest_response(
            [],
            200,
            \esc_html__('Settings saved successfully', 'arraysubscription')
        );
    }
}
