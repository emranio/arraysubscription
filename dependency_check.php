<?php

// if function not exists
if (!function_exists('arraysubscription_check_dependency')) {
    function arraysubscription_check_dependency()
    {
        $failed_messages = [];
        $dependencies = [
            // check for php version
            'PHP' => [
                'version' => '8.1',
                'condition' => (version_compare(PHP_VERSION, '8.1', '>='))
            ],
            'WordPress' => [
                'version' => '6.0',
                'condition' => (version_compare(get_bloginfo('version'), '6.0', '>='))
            ],
            // 'Elementor' => [
            //     'version' => '3.0',
            //     'condition' => (defined('ELEMENTOR_VERSION') && version_compare(ELEMENTOR_VERSION, '3.0', '>='))
            // ],
        ];

        foreach ($dependencies as $dependency => $config) {
            if (!$config['condition']) {
                $failed_messages[] = sprintf(
                    /* translators: 1: platform name, 2: platform name, 3: required version */
                    esc_html__('The %1$s version is not supported or installed. Please upgrade/ install your %2$s to at least %3$s.', 'arraysubscription'),
                    $dependency,
                    $dependency,
                    $config['version']
                );
            }
        }
        return $failed_messages;
    }
}
