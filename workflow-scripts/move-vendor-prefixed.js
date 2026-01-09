#!/usr/bin/env node

/**
 * Move temp/vendor to vendor-prefixed and remove temp directory
 * Cross-platform script for Windows, macOS, and Linux
 */

const fs = require("fs");
const path = require("path");

const tempDir = path.join(process.cwd(), "temp");
const tempVendorDir = path.join(tempDir, "vendor");
const vendorPrefixedDir = path.join(process.cwd(), "vendor-prefixed");

console.log("Moving temp/vendor to vendor-prefixed...");

try {
  // Check if temp/vendor exists
  if (!fs.existsSync(tempVendorDir)) {
    console.error("Error: temp/vendor directory does not exist");
    process.exit(1);
  }

  // Remove vendor-prefixed if it exists (MUST do this before move)
  if (fs.existsSync(vendorPrefixedDir)) {
    console.log("Removing existing vendor-prefixed directory...");
    fs.rmSync(vendorPrefixedDir, { recursive: true, force: true });
    console.log("✓ Removed existing vendor-prefixed directory");
  }

  // Move temp/vendor to vendor-prefixed
  fs.renameSync(tempVendorDir, vendorPrefixedDir);
  console.log("✓ Moved temp/vendor to vendor-prefixed");

  // Remove temp directory
  if (fs.existsSync(tempDir)) {
    console.log("Removing temp directory...");
    fs.rmSync(tempDir, { recursive: true, force: true });
    console.log("✓ Removed temp directory");
  }

  console.log("✓ Done!");
  process.exit(0);
} catch (error) {
  console.error("Error:", error.message);
  process.exit(1);
}
