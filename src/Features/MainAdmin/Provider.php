<?php

namespace ArraySubscription\Features\MainAdmin;

use ArraySubscription\Supports\Abstracts\AbstractLoader;

class Provider extends AbstractLoader
{
    public function __construct()
    {
        $this->classLoader([
            plugin_dir_path(__FILE__) . 'Services',
            plugin_dir_path(__FILE__) . 'REST',
        ]);
    }
}
