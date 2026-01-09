/**
 * Utility to filter out internal props that shouldn't be passed to DOM elements or Mantine components
 */

// List of internal props that should not be passed to DOM elements or Mantine components
const INTERNAL_PROPS = [
  "showWhen",
  "hideWhen",
  "renderFormItems",
  "field",
  "children",
  // Props that might cause controlled/uncontrolled input warnings
  "defaultValue", // Should be handled by FieldBase
  "value", // Should be handled by FieldBase
  // Props that might cause style warnings
  "sx", // Mantine sx prop that might contain CSS-in-JS
  "styles", // Mantine styles prop that might contain selectors
  // Custom component props that shouldn't go to DOM
  "defaultActiveKey",
  "activeTab",
  "items",
  "checkedText",
  "unCheckedText",
  "dashed",
  "orientation",
  "label",
  "text",
  "subText",
  "heading",
  "message",
  "description",
  "type",
  "showIcon",
  "closable",
  "gap",
  "justify",
  "align",
  "direction",
  "wrap",
  "accordion",
  "ghost",
  "size",
  "addButtonText",
  "removeButtonText",
  "initialCount",
  "html",
  "vertical",
  "multiple",
  "disabled",
  "inline",
  "help",
  "required",
  "rules",
  "name",
  "valuePropName",
  // Add more internal props as needed
];

/**
 * Filters out internal props from a props object
 * @param {Object} props - The props object to filter
 * @returns {Object} - Cleaned props object without internal props
 */
export const filterInternalProps = (props) => {
  const filtered = { ...props };
  INTERNAL_PROPS.forEach((prop) => {
    delete filtered[prop];
  });

  // Special handling for styles that might contain CSS-in-JS selectors
  if (filtered.style && typeof filtered.style === "object") {
    const cleanStyle = { ...filtered.style };

    // Remove CSS-in-JS selectors and pseudo-selectors that aren't valid CSS properties
    Object.keys(cleanStyle).forEach((key) => {
      if (key.includes("&") || key.includes(":") || key.includes("[")) {
        delete cleanStyle[key];
      }
    });

    filtered.style = cleanStyle;
  }

  return filtered;
};

/**
 * Destructures internal props from a props object
 * @param {Object} props - The props object to destructure
 * @returns {Object} - Object with { internalProps, cleanProps }
 */
export const separateInternalProps = (props) => {
  const internalProps = {};
  const cleanProps = { ...props };

  INTERNAL_PROPS.forEach((prop) => {
    if (prop in cleanProps) {
      internalProps[prop] = cleanProps[prop];
      delete cleanProps[prop];
    }
  });

  return { internalProps, cleanProps };
};

export default filterInternalProps;
