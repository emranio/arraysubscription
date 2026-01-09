<?php

/**
 * Menu Configuration
 *
 * @package ArraySubscription
 * @since 1.0.0
 */

namespace ArraySubscription\Features\MainAdmin\Services;

if (!defined('ABSPATH')) exit;

class MenuConfig
{
    /**
     * Get menu items configuration
     *
     * @return array
     */
    public static function getMenuItems(): array
    {
        return [
            [
                'id' => 'dashboard',
                'title' => __('Dashboard', 'arraysubscription'),
                'path' => '/',
            ],
            [
                'id' => 'settings',
                'title' => __('Settings', 'arraysubscription'),
                'children' => [
                    [
                        'id' => 'test-settings',
                        'title' => __('Test Settings', 'arraysubscription'),
                        'path' => '/settings/test',
                    ],
                ],
            ],
            [
                'id' => 'test-cpt',
                'title' => __('Test CPT', 'arraysubscription'),
                'children' => [
                    [
                        'id' => 'test-cpt-card',
                        'title' => __('Test CPT Card', 'arraysubscription'),
                        'path' => '/test-cpt/card',
                    ],
                    [
                        'id' => 'test-cpt-table',
                        'title' => __('Test CPT Table', 'arraysubscription'),
                        'path' => '/test-cpt/table',
                    ],
                    [
                        'id' => 'test-taxonomy',
                        'title' => __('Test Taxonomy', 'arraysubscription'),
                        'path' => '/test-taxonomy',
                    ],
                ],
            ],
            [
                'id' => 'help',
                'title' => __('Help', 'arraysubscription'),
                'path' => '/help',
            ],
        ];
    }

    /**
     * Get menu items as JSON for JavaScript
     *
     * @return string
     */
    public static function getMenuItemsJson(): string
    {
        return wp_json_encode(self::getMenuItems());
    }
}
