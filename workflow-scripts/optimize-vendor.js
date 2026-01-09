#!/usr/bin/env node

/**
 * Optimize vendor-prefixed directory after scoping
 * Removes unnecessary files to reduce plugin size
 */

const fs = require("fs");
const path = require("path");

const vendorPrefixedDir = path.join(process.cwd(), "vendor-prefixed");

// Directories to remove completely
const REMOVE_DIRS = [
  // Documentation and examples
  "freemius/wordpress-sdk/assets",
  "freemius/wordpress-sdk/templates/forms",
];

// File patterns to remove
const REMOVE_FILE_PATTERNS = [
  "*.md",
  "*.MD",
  "*.markdown",
  "*.txt",
  "*.dist",
  "*.xml",
  "*.yml",
  "*.yaml",
  "LICENSE*",
  "CHANGELOG*",
  "CONTRIBUTING*",
  "README*",
  "UPGRADE*",
  ".gitignore",
  ".editorconfig",
  ".php_cs*",
  ".phpstorm.meta.php",
];

/**
 * Remove directory recursively
 */
function removeDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return false;
  }

  try {
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`  ✓ Removed: ${path.relative(process.cwd(), dirPath)}`);
    return true;
  } catch (error) {
    console.error(`  ✗ Failed to remove: ${dirPath}`, error.message);
    return false;
  }
}

/**
 * Check if filename matches any pattern
 */
function matchesPattern(filename, patterns) {
  return patterns.some((pattern) => {
    const regex = new RegExp(
      "^" + pattern.replace(/\*/g, ".*").replace(/\?/g, ".") + "$",
      "i"
    );
    return regex.test(filename);
  });
}

/**
 * Remove files matching patterns recursively
 */
function removeFilesByPattern(dir, patterns, stats = { removed: 0, size: 0 }) {
  if (!fs.existsSync(dir)) {
    return stats;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      removeFilesByPattern(fullPath, patterns, stats);
    } else if (matchesPattern(entry.name, patterns)) {
      try {
        const fileStats = fs.statSync(fullPath);
        fs.unlinkSync(fullPath);
        stats.removed++;
        stats.size += fileStats.size;
      } catch (error) {
        console.error(`  ✗ Failed to remove file: ${fullPath}`);
      }
    }
  }

  return stats;
}

/**
 * Keep only English locale files in Carbon
 */
function optimizeCarbonLocales() {
  const langDir = path.join(vendorPrefixedDir, "nesbot/carbon/src/Carbon/Lang");

  if (!fs.existsSync(langDir)) {
    console.log("  ⊘ Carbon Lang directory not found");
    return;
  }

  const locales = fs.readdirSync(langDir);
  let removed = 0;
  let savedSize = 0;

  for (const locale of locales) {
    const localePath = path.join(langDir, locale);

    if (!fs.existsSync(localePath)) continue;

    const stat = fs.statSync(localePath);

    // Keep only English locales
    if (!locale.startsWith("en") && locale !== "en.php") {
      try {
        if (stat.isDirectory()) {
          // Get size before removing
          const sizeOutput = require("child_process")
            .execSync(`du -sk "${localePath}"`)
            .toString();
          savedSize += parseInt(sizeOutput.split("\t")[0]);
          fs.rmSync(localePath, { recursive: true, force: true });
        } else {
          savedSize += Math.round(stat.size / 1024);
          fs.unlinkSync(localePath);
        }
        removed++;
      } catch (error) {
        console.error(`  ✗ Failed to remove: ${locale}`);
      }
    }
  }

  console.log(
    `  ✓ Removed ${removed} Carbon locale files (${formatBytes(
      savedSize * 1024
    )})`
  );
}

/**
 * Remove translation locale files but keep functions.php
 */
function optimizeSymfonyTranslation() {
  const translationDir = path.join(
    vendorPrefixedDir,
    "symfony/translation/Resources/translations"
  );

  if (!fs.existsSync(translationDir)) {
    console.log("  ⊘ Symfony translation directory not found");
    return;
  }

  try {
    fs.rmSync(translationDir, { recursive: true, force: true });
    console.log("  ✓ Removed Symfony translation locale files");
  } catch (error) {
    console.error("  ✗ Failed to remove Symfony translations");
  }
}

/**
 * Format bytes to human readable
 */
function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

// Main execution
console.log("=".repeat(60));
console.log("Optimizing vendor-prefixed directory...");
console.log("=".repeat(60));

if (!fs.existsSync(vendorPrefixedDir)) {
  console.error("Error: vendor-prefixed directory not found!");
  process.exit(1);
}

// Get initial size
const initialSize = require("child_process")
  .execSync(`du -sk "${vendorPrefixedDir}"`)
  .toString()
  .split("\t")[0];

console.log("\n1. Removing unnecessary directories...");
let dirsRemoved = 0;
for (const dir of REMOVE_DIRS) {
  const fullPath = path.join(vendorPrefixedDir, dir);
  if (removeDirectory(fullPath)) {
    dirsRemoved++;
  }
}
console.log(`  → Removed ${dirsRemoved} directories`);

console.log("\n2. Optimizing Carbon locale files...");
optimizeCarbonLocales();

console.log("\n3. Optimizing Symfony translation files...");
optimizeSymfonyTranslation();

console.log("\n4. Removing documentation and metadata files...");
const fileStats = removeFilesByPattern(vendorPrefixedDir, REMOVE_FILE_PATTERNS);
console.log(
  `  ✓ Removed ${fileStats.removed} files (${formatBytes(fileStats.size)})`
);

// Get final size
const finalSize = require("child_process")
  .execSync(`du -sk "${vendorPrefixedDir}"`)
  .toString()
  .split("\t")[0];

const savedKB = parseInt(initialSize) - parseInt(finalSize);
const savedMB = (savedKB / 1024).toFixed(2);
const percentage = ((savedKB / parseInt(initialSize)) * 100).toFixed(1);

console.log("\n" + "=".repeat(60));
console.log(`Initial size: ${(parseInt(initialSize) / 1024).toFixed(2)} MB`);
console.log(`Final size:   ${(parseInt(finalSize) / 1024).toFixed(2)} MB`);
console.log(`Saved:        ${savedMB} MB (${percentage}%)`);
console.log("=".repeat(60));
console.log("✓ Optimization complete!\n");
