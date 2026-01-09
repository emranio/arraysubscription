#!/usr/bin/env node

/**
 * Copy plugin directory to temp directory, excluding specific files and directories
 * Cross-platform script for Windows, macOS, and Linux
 */

const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

// Get plugin slug from package.json
const pluginDir = process.cwd();
const packageJson = JSON.parse(
  fs.readFileSync(path.join(pluginDir, "package.json"), "utf8")
);
const pluginData =
  packageJson.arraysubscription && packageJson.arraysubscription.plugin;
if (!pluginData || !pluginData.slug) {
  console.error(
    "Error: Plugin slug not found in package.json under arraysubscription.plugin.slug"
  );
  process.exit(1);
}
const pluginSlug = pluginData.slug;

// Files and directories to exclude from the copy
const EXCLUDE_PATTERNS = [
  // Directories
  "node_modules",
  "vendor",
  "temp",
  "zip",
  "todos",

  "documentations",
  "workflow-scripts",

  // Development files
  ".git",
  ".github",
  ".vscode",
  ".idea",
  "tests",
  ".env",
  "*.env",
  ".gitignore",
  ".editorconfig",
  ".eslintrc.js",
  ".prettierrc",
  ".prettierignore",
  "phpcs.xml",
  "composer.lock",
  "package.json",
  "package-lock.json",
  "webpack.config.js",
  "webpack.analyze.js",
  "scoper.inc.php",
  "README.md",
  ".DS_Store",
  "Thumbs.db",
];

const buildDir = path.join(pluginDir, "zip");
const buildPluginDir = path.join(buildDir, "plugin");

console.log(`Creating plugin distribution for: ${pluginSlug}`);

/**
 * Check if a path should be excluded
 */
function shouldExclude(itemPath, basePath) {
  const relativePath = path.relative(basePath, itemPath);
  const pathParts = relativePath.split(path.sep);

  for (const pattern of EXCLUDE_PATTERNS) {
    // Check if any part of the path matches the pattern
    if (pathParts.includes(pattern)) {
      return true;
    }

    // Check if the base name matches the pattern
    if (path.basename(itemPath) === pattern) {
      return true;
    }
  }

  return false;
}

/**
 * Copy directory recursively with exclusions
 */
function copyDir(src, dest, basePath) {
  // Create destination directory
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    // Skip if excluded
    if (shouldExclude(srcPath, basePath)) {
      console.log(`  Skipping: ${path.relative(basePath, srcPath)}`);
      continue;
    }

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, basePath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`  Copied: ${path.relative(basePath, srcPath)}`);
    }
  }
}

try {
  // Remove build directory if it exists
  if (fs.existsSync(buildDir)) {
    console.log("Removing existing build directory...");
    fs.rmSync(buildDir, { recursive: true, force: true });
    console.log("✓ Removed existing build directory");
  }

  // Create build directory
  console.log("Creating build directory...");
  fs.mkdirSync(buildPluginDir, { recursive: true });
  console.log("✓ Created build directory");

  // Copy plugin files
  console.log("Copying plugin files...");
  copyDir(pluginDir, buildPluginDir, pluginDir);
  console.log("✓ Plugin files copied");

  // Rename vendor-prefixed to vendor in the build directory
  const vendorPrefixedPath = path.join(buildPluginDir, "vendor-prefixed");
  const vendorPath = path.join(buildPluginDir, "vendor");

  if (fs.existsSync(vendorPrefixedPath)) {
    console.log("Renaming vendor-prefixed to vendor...");
    fs.renameSync(vendorPrefixedPath, vendorPath);
    console.log("✓ Renamed vendor-prefixed to vendor");
  }

  // Create zip file
  const zipPath = path.join(buildDir, `${pluginSlug}.zip`);

  console.log("Creating zip file...");

  const output = fs.createWriteStream(zipPath);
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Maximum compression
  });

  output.on("close", () => {
    console.log(`✓ Created zip file: ${archive.pointer()} bytes`);
    console.log(`Location: ${zipPath}`);

    // Delete the build plugin directory (keep only the zip)
    console.log("Cleaning up build plugin directory...");
    fs.rmSync(buildPluginDir, { recursive: true, force: true });
    console.log("✓ Cleaned up build plugin directory");

    console.log("✓ Plugin distribution created successfully!");
    process.exit(0);
  });

  archive.on("error", (err) => {
    throw err;
  });

  archive.pipe(output);
  archive.directory(buildPluginDir, pluginSlug);
  archive.finalize();
} catch (error) {
  console.error("Error:", error.message);
  process.exit(1);
}
