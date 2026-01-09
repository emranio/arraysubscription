<?php

/**
 * Base REST Controller
 *
 * Provides common functionality for all REST controllers throughout the plugin.
 *
 * @package ArraySubscription
 * @subpackage Supports
 * @since 1.0.0
 */

namespace ArraySubscription\Supports;

/**
 * Base REST Controller
 *
 * Abstract class providing common functionality for REST controllers.
 */
abstract class BaseRestController
{
    /**
     * Enable auto-loading of this service.
     *
     * @var bool
     */
    public static $loadable = true;

    /**
     * REST API namespace.
     *
     * @var string
     */
    protected $namespace = 'arraysubscription/v1';

    /**
     * Constructor.
     */
    public function __construct()
    {
        \add_action('rest_api_init', [$this, 'registerRoutes']);
    }

    /**
     * Check user permission.
     *
     * @return bool
     */
    public function checkPermission(): bool
    {
        return \current_user_can('manage_options');
    }

    /**
     * Get current user ID.
     *
     * @return int
     */
    protected function getCurrentUserId(): int
    {
        return \get_current_user_id();
    }

    /**
     * Get current site ID (for multisite support).
     *
     * @return int
     */
    protected function getCurrentSiteId(): int
    {
        return \get_current_blog_id();
    }

    /**
     * Register routes for this controller.
     *
     * @return void
     */
    abstract public function registerRoutes(): void;
}
