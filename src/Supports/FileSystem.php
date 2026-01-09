<?php

namespace ArraySubscription\Supports;

/**
 * WordPress Filesystem API Wrapper
 * 
 * Provides a centralized singleton interface for WordPress filesystem operations.
 */
class FileSystem
{
    /**
     * Singleton instance.
     *
     * @var FileSystem|null
     */
    private static ?FileSystem $instance = null;

    /**
     * WordPress Filesystem object.
     *
     * @var \WP_Filesystem_Base|null
     */
    private $filesystem = null;

    /**
     * Private constructor to prevent direct instantiation.
     */
    private function __construct()
    {
        $this->initFilesystem();
    }

    /**
     * Get singleton instance.
     *
     * @return FileSystem
     */
    public static function getInstance(): FileSystem
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    /**
     * Initialize WordPress Filesystem.
     *
     * @return void
     */
    private function initFilesystem(): void
    {
        global $wp_filesystem;

        if (empty($wp_filesystem)) {
            require_once \ABSPATH . 'wp-admin/includes/file.php';
            \WP_Filesystem();
        }

        $this->filesystem = $wp_filesystem;
    }

    /**
     * Get the WordPress Filesystem instance.
     *
     * @return \WP_Filesystem_Base
     */
    public function getFilesystem()
    {
        return $this->filesystem;
    }

    /**
     * Check if a file or directory exists.
     *
     * @param string $path Path to file or directory.
     * @return bool
     */
    public function exists(string $path): bool
    {
        return $this->filesystem->exists($path);
    }

    /**
     * Delete a file or directory.
     *
     * @param string $path Path to file or directory.
     * @param bool $recursive Whether to recursively delete (for directories).
     * @param string|false $type Type of resource: 'f' for file, 'd' for directory, false for either.
     * @return bool
     */
    public function delete(string $path, bool $recursive = false, $type = false): bool
    {
        return $this->filesystem->delete($path, $recursive, $type);
    }

    /**
     * Read entire file into a string.
     *
     * @param string $file Path to file.
     * @return string|false File contents on success, false on failure.
     */
    public function getContents(string $file)
    {
        return $this->filesystem->get_contents($file);
    }

    /**
     * Write a string to a file.
     *
     * @param string $file Path to file.
     * @param string $contents File contents.
     * @param int|false $mode Optional. File permissions. Default false.
     * @return bool
     */
    public function putContents(string $file, string $contents, $mode = false): bool
    {
        return $this->filesystem->put_contents($file, $contents, $mode);
    }

    /**
     * Get file size.
     *
     * @param string $file Path to file.
     * @return int|false File size on success, false on failure.
     */
    public function size(string $file)
    {
        return $this->filesystem->size($file);
    }

    /**
     * Check if path is a file.
     *
     * @param string $file Path to file.
     * @return bool
     */
    public function isFile(string $file): bool
    {
        return $this->filesystem->is_file($file);
    }

    /**
     * Check if path is a directory.
     *
     * @param string $path Path to directory.
     * @return bool
     */
    public function isDir(string $path): bool
    {
        return $this->filesystem->is_dir($path);
    }

    /**
     * Check if file is readable.
     *
     * @param string $file Path to file.
     * @return bool
     */
    public function isReadable(string $file): bool
    {
        return $this->filesystem->is_readable($file);
    }

    /**
     * Check if file is writable.
     *
     * @param string $file Path to file.
     * @return bool
     */
    public function isWritable(string $file): bool
    {
        return $this->filesystem->is_writable($file);
    }

    /**
     * Create a directory.
     *
     * @param string $path Path to directory.
     * @param int|false $chmod Optional. Directory permissions. Default false.
     * @param string|int|false $chown Optional. Directory owner. Default false.
     * @param string|int|false $chgrp Optional. Directory group. Default false.
     * @return bool
     */
    public function mkdir(string $path, $chmod = false, $chown = false, $chgrp = false): bool
    {
        return $this->filesystem->mkdir($path, $chmod, $chown, $chgrp);
    }

    /**
     * Delete a directory recursively.
     *
     * @param string $path Path to directory.
     * @return bool
     */
    public function rmdir(string $path): bool
    {
        return $this->filesystem->rmdir($path, true);
    }

    /**
     * Get list of files/directories in a directory.
     *
     * @param string $path Path to directory.
     * @param bool $includeHidden Whether to include hidden files. Default true.
     * @param bool $recursive Whether to recursively list subdirectories. Default false.
     * @return array|false Array of files/directories on success, false on failure.
     */
    public function dirlist(string $path, bool $includeHidden = true, bool $recursive = false)
    {
        return $this->filesystem->dirlist($path, $includeHidden, $recursive);
    }

    /**
     * Move/rename a file or directory.
     *
     * @param string $source Source path.
     * @param string $destination Destination path.
     * @param bool $overwrite Whether to overwrite if destination exists. Default false.
     * @return bool
     */
    public function move(string $source, string $destination, bool $overwrite = false): bool
    {
        return $this->filesystem->move($source, $destination, $overwrite);
    }

    /**
     * Copy a file.
     *
     * @param string $source Source path.
     * @param string $destination Destination path.
     * @param bool $overwrite Whether to overwrite if destination exists. Default false.
     * @param int|false $mode Optional. File permissions. Default false.
     * @return bool
     */
    public function copy(string $source, string $destination, bool $overwrite = false, $mode = false): bool
    {
        return $this->filesystem->copy($source, $destination, $overwrite, $mode);
    }

    /**
     * Prevent cloning of singleton.
     */
    private function __clone() {}

    /**
     * Prevent unserialization of singleton.
     */
    public function __wakeup()
    {
        throw new \Exception("Cannot unserialize singleton");
    }
}
