<?php

use \ArraySubscription\Supports\Config;

defined('ABSPATH') || exit;

/**
 * Plugin Name: ArraySubscription
 * Description: Intelligent AI assistant in your WordPress dashboard that automates admin tasks through conversational commands powered by MCP.
 * Plugin URI: https://wordpress.org/plugins/arraysubscription/
 * Author: Rahel Khondokar
 * Version: 1.0.0
 * Author URI: https://profiles.wordpress.org/rahelkhondokar/
 * License: GPLv3 or later
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 *
 * Text Domain: arraysubscription
 * Domain Path: /languages
 * 
 * WordPress admin AI chatbot with MCP server integration for automating administrative tasks through natural conversation.
 */


// define version constant 
if (!defined('ARRAYSUBSCRIPTION_VERSION')) {
	define('ARRAYSUBSCRIPTION_VERSION', '1.0.0');
}

// plugin prefix constant
if (!defined('ARRAYSUBSCRIPTION_PREFIX')) {
	define('ARRAYSUBSCRIPTION_PREFIX', 'arraysubscription');
}

// database table prefix constant: wpdb prefix + plugin prefix
if (!defined('ARRAYSUBSCRIPTION_DB_PREFIX')) {
	global $wpdb;
	define('ARRAYSUBSCRIPTION_DB_PREFIX', $wpdb->prefix . ARRAYSUBSCRIPTION_PREFIX . '_');
}


final class ArraySubscription
{
	protected static $pluginDir;
	protected static $initiated;

	public function __construct()
	{
		// initiate only once
		if (self::$initiated === true) {
			return;
		}
		self::$initiated = true;
		self::$pluginDir = plugin_dir_path(__FILE__);

		add_action('plugins_loaded', [$this, 'initiate'], 10);
		register_activation_hook(__FILE__, [$this, 'activatePlugin']);
		register_deactivation_hook(__FILE__, [$this, 'deactivatePlugin']);
	}

	public static function manageConfig()
	{
		// $config->setConfigPath(self::$pluginDir . 'config');

		// Add plugin configurations individually
		// src path is added from Boot.php
		Config::add('plugin.name', 'ArraySubscription');
		Config::add('plugin.version', ARRAYSUBSCRIPTION_VERSION);
		Config::add('plugin.path', trailingslashit(plugin_dir_path(__FILE__)));
		Config::add('plugin.url', trailingslashit(plugin_dir_url(__FILE__)));
		Config::add('plugin.public_url', trailingslashit(plugin_dir_url(__FILE__)) . 'public/');
		Config::add('plugin.public_path', trailingslashit(plugin_dir_path(__FILE__)) . 'public/');
		Config::add('plugin.resources_url', trailingslashit(plugin_dir_url(__FILE__)) . 'src/resources/');
		Config::add('plugin.resources_path', trailingslashit(plugin_dir_path(__FILE__)) . 'src/resources/');
		Config::add('plugin.text_domain', 'arraysubscription');
		Config::add('plugin.prefix', ARRAYSUBSCRIPTION_PREFIX);
		Config::add('plugin.file', __FILE__);
		// WordPress related configurations
		Config::add('wp.wp_version', get_bloginfo('version'));
		Config::add('wp.wp_upload_dir', wp_upload_dir());
		// wp-admin dashboard url
		Config::add('wp.wp_admin_url', admin_url());
	}

	public static function loadFunctions()
	{
		// include all files from functions directory: src/functions/*.php
		// could not use autoloader's classmap due to prefixing vendors.
		foreach (glob(self::$pluginDir . 'src/functions/*.php') as $file) {
			include_once $file;
		}
	}

	public function initiate()
	{
		// dependency check
		include_once self::$pluginDir . 'dependency_check.php';
		$dependency_errors = arraysubscription_check_dependency();
		if (!empty($dependency_errors)) {
			add_action('admin_notices', function () use ($dependency_errors) {
?>
				<div class="notice notice-error">
					<h4><?php esc_html_e('ArraySubscription plugin is not activated due to the following dependency errors:', 'arraysubscription'); ?></h4>
					<ul>
						<?php foreach ($dependency_errors as $error) { ?>
							<li><?php echo esc_html($error); ?></li>
						<?php } ?>
					</ul>
				</div>
<?php
			});
			return;
		}


		// autoload composer dependencies
		// check if self::$pluginDir . 'vendor-prefixed/' dir exists
		if (is_dir(self::$pluginDir . 'vendor-prefixed/')) {
			require_once self::$pluginDir . 'vendor-prefixed/scoper-autoload.php';
		} else {
			require_once self::$pluginDir . 'vendor/scoper-autoload.php';
		}

		self::manageConfig();
		self::loadFunctions();

		new \ArraySubscription\Boot();
	}


	public function activatePlugin()
	{
		// include all files from activation directory by name asc: self::$pluginDir . 'src/plugin-lifecycle/activate-plugin/*-worker.php'
		foreach (glob(self::$pluginDir . 'src/plugin-lifecycle/activate-plugin/*-worker.php') as $file) {
			include_once $file;
		}
	}

	public function deactivatePlugin() {}
}

new  ArraySubscription();
