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
class Config
{
    use Singleton;
    protected ?string $configPath = null;

    protected array $configData = [];

    public function __construct(?string $configPath = null)
    {
        $this->configPath = $configPath;
    }

    public static function get($key, $default = null): mixed
    {
        $instance = self::instance();

        // Handle dot notation for nested keys
        if (str_contains($key, '.')) {
            $keys = explode('.', $key);
            $data = $instance->configData;

            foreach ($keys as $segment) {
                if (is_array($data) && array_key_exists($segment, $data)) {
                    $data = $data[$segment];
                } else {
                    return $default;
                }
            }

            return $data;
        }

        // Direct key access
        return $instance->configData[$key] ?? $default;
    }

    public static function add($key, $value): void
    {
        $instance = self::instance();

        // Handle dot notation for nested keys
        if (str_contains($key, '.')) {
            $keys = explode('.', $key);
            $data = &$instance->configData;

            // Navigate/create nested structure
            foreach ($keys as $segment) {
                if (!isset($data[$segment]) || !is_array($data[$segment])) {
                    $data[$segment] = [];
                }
                $data = &$data[$segment];
            }

            // Set the value at the deepest level
            $data = $value;
        } else {
            // Direct key assignment
            $instance->configData[$key] = $value;
        }
    }
}
