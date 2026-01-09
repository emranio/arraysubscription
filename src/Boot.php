<?php

namespace ArraySubscription;

use \ArraySubscription\Features;
use ArraySubscription\Supports\Assets;
use \ArraySubscription\Supports\Config;
use ArraySubscription\Supports\CustomEndpoints;
use ArraySubscription\Supports\FileSystem;

class Boot
{
    public function __construct()
    {
        Config::add('plugin.src_path', __DIR__);

        $settings_file = Config::get('plugin.path') . 'settings.json';

        $fs = FileSystem::getInstance();
        if (!$fs->exists($settings_file)) {
            return;
        }

        $content = $fs->getContents($settings_file);
        if ($content === false) {
            return;
        }

        $settings = json_decode($content, true);
        $settings = is_array($settings) ? $settings : [];

        // Load settings from database and merge with defaults from settings.json
        // DB values take priority over settings.json defaults
        $db_settings = \get_option('arraysubscription_settings', []);
        if (is_array($db_settings) && !empty($db_settings)) {
            // merge recursively
            $settings = array_replace_recursive($settings, $db_settings);
        }

        Config::add('settings', $settings);


        add_action('admin_enqueue_scripts', [$this, 'enqueueAssets'], 9);
        add_action('init', [$this, 'registerCronSchedules']);

        add_action('init', function () {
            new Features\TestCPT\Init();
        }, 10);

        new Supports\CustomEndpoints();
        new Features\MainAdmin\Provider();
    }

    public function enqueueAssets()
    {
        // Only load on app page
        if (
            !is_admin()
        ) {
            return;
        }

        // Load dependencies from webpack asset file
        $asset_file = Config::get('plugin.public_path') . 'build/boot.asset.php';
        $asset = file_exists($asset_file) ? require $asset_file : ['dependencies' => ['react', 'react-dom', 'react-jsx-runtime'], 'version' => ARRAYSUBSCRIPTION_VERSION];

        Assets::enqueueScript(
            'arraysubscription-boot',
            Config::get('plugin.public_url') . 'build/boot.js',
            $asset['dependencies'],
            $asset['version'],
            true
        );

        // Set the public path for webpack chunk loading BEFORE the script executes
        wp_add_inline_script(
            'arraysubscription-boot',
            'window.arraySubscription.publicPath = ' . json_encode(Config::get('plugin.public_url') . 'build/') . '; ' .
                'window.arraySubscription.env = ' . json_encode($this->reactEnvVars()) . ';' .
                'window.arraySubscription.settings = ' . json_encode($this->reactSettingsVars()) . ';',
            'after'
        );
    }



    /**
     * Adds JavaScript variables to the admin head.
     *
     * @return array
     */
    public function reactEnvVars(): array
    {
        return [
            'version' => ARRAYSUBSCRIPTION_VERSION,
            'appTitle' => esc_html__('ArraySubscription', 'arraysubscription'),
            'defaultLocale' => get_locale() ?: 'en_US',
            // get wp timezone and format
            'timezone' => get_option('timezone_string') ?: 'UTC',
            'dateFormat' => get_option('date_format') ?: 'Y-m-d',
            'timeFormat' => get_option('time_format') ?: 'H:i:s',
            'mainadminRootDomId' => 'arraysubscription-mainadmin-root',
            'publicUrl' => esc_url_raw(Config::get('plugin.public_url')),
            'nonce' => wp_create_nonce('wp_rest'),
            'apiBaseUrl' => esc_url_raw(rest_url()),
            'wpAdminUrl' => esc_url_raw(Config::get('wp.wp_admin_url')),
        ];
    }


    /**
     * Set plugin settings from settings.json file into Config.
     *
     * @return array
     */
    private function reactSettingsVars(): array
    {
        return [];
    }

    /**
     * Register cron schedules for attachment cleanup.
     *
     * @return void
     */
    public function registerCronSchedules(): void {}
}
