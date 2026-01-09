// WordPress webpack config.
const defaultConfig = require("@wordpress/scripts/config/webpack.config");

// Plugins.
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const webpack = require("webpack");
require("dotenv").config();

// Utilities.
const path = require("path");
const fs = require("fs");

const isHot = process.env.WEBPACK_HOT === "1";

module.exports = {
  ...defaultConfig,
  performance: {
    hints: false,
  },

  stats: {
    assets: true,
    modules: true,
    entrypoints: true,
    chunks: true,
    children: true,
    warnings: true,
    hash: true,
    version: true,
    timings: true,
    builtAt: true,
  },

  ignoreWarnings: [
    {
      module: /\.scss$/,
      message: /Sass @import rules are deprecated/,
    },
    /Deprecation Warning/,
  ],

  module: {
    ...defaultConfig.module,
    rules: [
      ...defaultConfig.module.rules.map((rule) => {
        // Find and update sass-loader configuration
        if (
          rule.use &&
          Array.isArray(rule.use) &&
          rule.use.some((loader) =>
            typeof loader === "object" && loader.loader
              ? loader.loader.includes("sass-loader")
              : false
          )
        ) {
          return {
            ...rule,
            use: rule.use.map((loader) => {
              if (
                typeof loader === "object" &&
                loader.loader &&
                loader.loader.includes("sass-loader")
              ) {
                return {
                  ...loader,
                  options: {
                    ...loader.options,
                    sassOptions: {
                      ...loader.options?.sassOptions,
                      quietDeps: true, // Suppress deprecation warnings
                      silenceDeprecations: ["import"], // Silence @import warnings
                    },
                  },
                };
              }
              return loader;
            }),
          };
        }
        return rule;
      }),
    ],
  },

  resolve: {
    ...defaultConfig.resolve,
    alias: {
      "@": path.resolve(process.cwd(), "src/resources"),
      "@libs": path.resolve(process.cwd(), "src/resources/libs"),
      "@scss": path.resolve(process.cwd(), "src/resources/scss"),
    },
    extensions: [".js", ".jsx", ".scss", ".json"],
  },

  output: {
    ...defaultConfig.output,
    path: path.resolve(process.cwd(), "public/build"),
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
    publicPath: "auto", // this stays auto — runtime will override it
  },

  entry: {
    "admin/mainadmin": path.resolve(process.cwd(), "src/resources/Main.jsx"),
    boot: path.resolve(process.cwd(), "src/resources/Boot.jsx"),
  },

  optimization: {
    ...defaultConfig.optimization,
    // Don't create a separate runtime chunk - embed it in the entry
    runtimeChunk: false,
    splitChunks: {
      chunks: "async", // Only split async (dynamic import) chunks
      minSize: 20000,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      cacheGroups: {
        // Split large node_modules into separate chunk when imported dynamically
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
          name(module) {
            // Get the name. E.g. node_modules/packageName/not/this/part.js
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )?.[1];
            return `vendors/${packageName?.replace("@", "")}`;
          },
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },

  plugins: [
    ...defaultConfig.plugins,
    new RemoveEmptyScriptsPlugin({
      stage: RemoveEmptyScriptsPlugin.STAGE_AFTER_PROCESS_PLUGINS,
    }),

    ...(isHot
      ? [
          new BrowserSyncPlugin({
            host: process.env.HOT_HOST || "localhost",
            port: process.env.HOT_PORT || 3005,
            open: "external",
            proxy: process.env.WP_PROXY || "http://localhost:8000",
            files: [
              "**/*.php",
              "**/*.scss",
              "**/*.css",
              "**/*.js",
              "build/**/*",
            ],
            watchEvents: ["change", "add", "unlink", "addDir", "unlinkDir"],
            notify: false,
            reloadDebounce: 0,
          }),
        ]
      : []),
  ],
};
