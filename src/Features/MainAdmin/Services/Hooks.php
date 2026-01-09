<?php

/**
 * Class AppPage
 * 
 * @package ArraySubscription
 * @since 1.0.0
 *
 * Handles the admin menu pages and assets for the ArraySubscription plugin.
 * Creates and manages the main plugin menu, dashboard, and widget builder pages.
 */

namespace ArraySubscription\Features\MainAdmin\Services;

use ArraySubscription\Supports\Assets;
use \ArraySubscription\Supports\Config;

if (! defined('ABSPATH')) exit; // Exit if accessed directly


class Hooks
{
    public static $loadable = true;

    private string $capability = 'manage_options';
    private string $menu_slug = 'arraysubscription-mainadmin';

    /**
     * Constructor.
     * 
     * Initializes the class by registering WordPress admin menu and asset hooks.
     */
    public function __construct()
    {
        add_action('admin_menu', [$this, 'registerMenu']);

        add_action('admin_enqueue_scripts', [$this, 'enqueueAssets'], 100);
    }


    /**
     * Enqueues the required CSS and JavaScript files.
     *
     * @param string $hook The current admin page hook.
     * @return void
     */
    public function enqueueAssets($hook): void
    {
        // Only load on app page
        if (
            !is_admin() ||
            !current_user_can($this->capability) ||
            $hook !== 'toplevel_page_' . $this->menu_slug
        ) {
            return;
        }

        wp_enqueue_media();

        // Enqueue main CSS
        Assets::enqueueStyle(
            'arraysubscription-mainadmin',
            Config::get('plugin.public_url') . 'build/admin/mainadmin.css',
            [],
            ARRAYSUBSCRIPTION_VERSION
        );

        // Enqueue main JS - webpack will lazy load chunks automatically
        // Load dependencies from webpack asset file
        $asset_file = Config::get('plugin.public_path') . 'build/admin/mainadmin.asset.php';
        $asset = file_exists($asset_file) ? require $asset_file : ['dependencies' => ['arraysubscription-boot'], 'version' => ARRAYSUBSCRIPTION_VERSION];

        Assets::enqueueScript(
            'arraysubscription-mainadmin',
            Config::get('plugin.public_url') . 'build/admin/mainadmin.js',
            array_merge($asset['dependencies'], ['arraysubscription-boot', 'wp-element']),
            $asset['version'],
            true
        );
    }

    /**
     * Registers the plugin's admin menu and submenu pages.
     *
     * Creates the main menu item and adds Dashboard and Widget Builder as submenus.
     *
     * @return void
     */
    public function registerMenu(): void
    {
        add_menu_page(
            esc_html__('Dashboard', 'arraysubscription'),
            esc_html__('Array Subscription', 'arraysubscription'),
            $this->capability,
            $this->menu_slug,
            [$this, 'render'],
            'dashicons-admin-generic',
            30
        );

        add_submenu_page(
            $this->menu_slug,
            esc_html__('Settings', 'arraysubscription'),
            esc_html__('Settings', 'arraysubscription'),
            $this->capability,
            $this->menu_slug
        );
    }

    /**
     * Renders the app page content with react router.
     *
     * @return void
     */
    public function render(): void
    {
        $view_file = dirname(__DIR__) . '/views/mainadmin.php';
        $fs = \ArraySubscription\Supports\FileSystem::getInstance();
        if ($fs->exists($view_file)) {
            include $view_file;
        }
    }
}
