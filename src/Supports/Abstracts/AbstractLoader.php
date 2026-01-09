<?php

/**
 * Abstract Loader Class  ArraySubscription
 *
 * This class provides base functionality for loading and initializing
 * classes dynamically based on directory scanning.
 *
 * @package ArraySubscription
 * @subpackage Supports\Abstracts
 * @since 1.0.0
 */

namespace ArraySubscription\Supports\Abstracts;

use \ArraySubscription\Supports\Config;

if (! defined('ABSPATH')) exit; // Exit if accessed directly

class AbstractLoader
{
    function classLoader($dirs)
    {
        $src_path = Config::get('plugin.src_path');

        foreach ($dirs as $dir) {
            foreach (glob($dir . '/*.php') as $filename) {
                $parts = explode($src_path, $filename);
                $relative_path = array_pop($parts);

                $classname = str_replace(
                    '.php',
                    '',
                    str_replace(
                        '/',
                        '\\',
                        $relative_path
                    )
                );

                $classname = '\\ArraySubscription\\' . ltrim($classname, '\\');

                /** @var class-string $classname */
                if (class_exists($classname) && isset($classname::$loadable) && $classname::$loadable === true) {
                    new $classname;
                }
            }
        }
    }
}
