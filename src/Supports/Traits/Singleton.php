<?php

namespace ArraySubscription\Supports\Traits;

trait Singleton
{
    protected static $instance = null;
    public static function instance()
    {
        if (is_null(self::$instance)) {
            self::$instance = new static();
        }
        return self::$instance;
    }
}
