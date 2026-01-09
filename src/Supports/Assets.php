<?php

/**
 * Configuration Manager  ArraySubscription
 *
 * This class manages configuration settings for theArraySubscription plugin
 * using a singleton pattern to ensure only one instance exists.
 *
 * @package ArraySubscription
 * @subpackage Supports
 * @since 1.0.0
 */

namespace ArraySubscription\Supports;

use ArraySubscription\Supports\Traits\Singleton;

if (! defined('ABSPATH')) exit; // Exit if accessed directly

// warper for JG\Config\Config
class Assets
{
    protected static $instance = null;

    public static function enqueueStyle(
        $handle,
        $src = '',
        $deps = array(),
        $ver = false,
        $media = 'all',
    ): void {
        wp_enqueue_style($handle, $src, $deps, $ver, $media);
    }

    public static function enqueueScript(
        $handle,
        $src = '',
        $deps = array(),
        $ver = false,
        $args = array(),
        $hmrSrc = null,
    ): void {
        wp_enqueue_script($handle, $src, $deps, $ver, $args);
    }
}
