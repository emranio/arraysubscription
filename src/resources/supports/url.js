/**
 * URL utility functions
 *
 * Handles URL construction and query parameter management,
 * especially for WordPress REST API with plain permalinks.
 */

/**
 * Build a URL with query parameters, properly handling existing query strings.
 * This is essential for WordPress REST API when plain permalinks are used
 * (e.g., index.php?rest_route=/endpoint).
 *
 * @param {string} baseUrl - Base URL (may contain existing query params)
 * @param {object} params - Additional query parameters to append
 * @returns {string} - Properly formatted URL
 *
 * @example
 * // With pretty permalinks:
 * buildUrl('/wp-json/api/v1/endpoint', { foo: 'bar' })
 * // Returns: '/wp-json/api/v1/endpoint?foo=bar'
 *
 * @example
 * // With plain permalinks:
 * buildUrl('/index.php?rest_route=/api/v1/endpoint', { foo: 'bar', baz: 'qux' })
 * // Returns: '/index.php?rest_route=/api/v1/endpoint&foo=bar&baz=qux'
 *
 * @example
 * // With array parameters:
 * buildUrl('/wp-json/api/v1/posts', { status: ['publish', 'draft'] })
 * // Returns: '/wp-json/api/v1/posts?status=publish,draft'
 */
export function buildUrl(baseUrl, params = {}) {
  // Use URL API for proper parameter handling
  const urlObj = new URL(baseUrl, window.location.origin);

  // Add all parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      // Handle array values (e.g., status=publish,draft)
      if (Array.isArray(value)) {
        urlObj.searchParams.append(key, value.join(","));
      } else {
        urlObj.searchParams.append(key, value);
      }
    }
  });

  return urlObj.toString();
}

/**
 * Builds a REST API URL with proper parameter encoding
 *
 * @param {string} baseUrl - The base URL (e.g., "http://example.com/index.php?rest_route=/")
 * @param {string} route - The API route (e.g., "wp/v2/posts")
 * @param {Object} params - Query parameters as key-value pairs
 * @returns {string} The complete, properly encoded URL
 *
 * @example
 * const url = buildRestUrl(
 *   "http://example.com/index.php?rest_route=/",
 *   "wp/v2/posts",
 *   { per_page: 10, page: 1, status: "publish" }
 * );
 * // Returns: "http://example.com/index.php?rest_route=/wp/v2/posts&per_page=10&page=1&status=publish"
 */
export function buildRestUrl(baseUrl, route, params = {}) {
  // Ensure baseUrl doesn't have trailing slash
  const cleanBase = baseUrl.replace(/\/$/, "");

  // Create a proper URL object for better handling
  // First, we need to handle the case where the base is just a path
  // and doesn't have a protocol
  let urlString;

  if (cleanBase.startsWith("http://") || cleanBase.startsWith("https://")) {
    urlString = cleanBase + "/" + route;
  } else {
    // For relative URLs or paths
    urlString = cleanBase + "/" + route;
  }

  // Create URL object to properly handle parameters
  const url = new URL(urlString, window.location.origin);

  // Add all parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      // Handle array values (e.g., status=publish,draft)
      if (Array.isArray(value)) {
        url.searchParams.append(key, value.join(","));
      } else {
        url.searchParams.append(key, value);
      }
    }
  });

  // Return the complete URL string
  return url.toString();
}

/**
 * Alternative function for building URLs when you have a full base URL with protocol
 *
 * @param {string} baseUrl - The full base URL (e.g., "http://192.168.1.104:3005/index.php?rest_route=/")
 * @param {string} route - The API route (e.g., "wp/v2/posts")
 * @param {Object} params - Query parameters as key-value pairs
 * @returns {string} The complete, properly encoded URL
 */
export function buildRestUrlAbsolute(baseUrl, route, params = {}) {
  // Parse the base URL
  const urlObj = new URL(baseUrl);

  // Get the pathname and search parts
  const pathname = urlObj.pathname;
  const search = urlObj.search;

  // Build the complete path with the route
  const fullPath = pathname.replace(/\/$/, "") + "/" + route;

  // Create a new URL with the complete path
  const fullUrl = new URL(fullPath, baseUrl);

  // Add all parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      // Handle array values (e.g., status=publish,draft)
      if (Array.isArray(value)) {
        fullUrl.searchParams.append(key, value.join(","));
      } else {
        fullUrl.searchParams.append(key, value);
      }
    }
  });

  return fullUrl.toString();
}

/**
 * Parse query parameters from a URL string
 *
 * @param {string} url - URL to parse
 * @returns {object} - Object containing query parameters
 */
export function parseQueryParams(url) {
  const urlObj = new URL(url, window.location.origin);
  const params = {};

  for (const [key, value] of urlObj.searchParams.entries()) {
    params[key] = value;
  }

  return params;
}

/**
 * Remove query parameters from a URL
 *
 * @param {string} url - URL to clean
 * @param {string[]} paramsToRemove - Array of parameter names to remove
 * @returns {string} - URL without specified parameters
 */
export function removeQueryParams(url, paramsToRemove = []) {
  const urlObj = new URL(url, window.location.origin);

  paramsToRemove.forEach((param) => {
    urlObj.searchParams.delete(param);
  });

  return urlObj.toString();
}

/**
 * Update query parameters in a URL
 *
 * @param {string} url - Base URL
 * @param {object} paramsToUpdate - Parameters to add or update
 * @returns {string} - Updated URL
 */
export function updateQueryParams(url, paramsToUpdate = {}) {
  const urlObj = new URL(url, window.location.origin);

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      urlObj.searchParams.set(key, value);
    } else {
      urlObj.searchParams.delete(key);
    }
  });

  return urlObj.toString();
}

export default {
  buildUrl,
  buildRestUrl,
  buildRestUrlAbsolute,
  parseQueryParams,
  removeQueryParams,
  updateQueryParams,
};
