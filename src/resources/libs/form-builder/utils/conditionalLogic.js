// Utility functions for handling conditional rendering logic in dynamic forms
// Supports showWhen and hideWhen conditions with various operators

// Get nested value from object using dot notation
// Supports both flat keys (e.g., "allowed_files.enabled") and nested paths
const getNestedValue = (obj, path) => {
  if (!path || typeof path !== "string") return undefined;

  // First, try to get the value as a flat key (for rc-field-form)
  // This handles cases where the field name itself contains dots
  if (obj && obj[path] !== undefined) {
    return obj[path];
  }

  // Fall back to nested path navigation
  return path.split(".").reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
};

// Evaluates a single condition against form values
export const evaluateCondition = (condition, formValues) => {
  if (!condition || !condition.field || !condition.operator) {
    return true; // Invalid condition, show by default
  }

  const { field, operator, value } = condition;
  const fieldValue = getNestedValue(formValues, field);

  // Handle undefined/null values
  const normalizedFieldValue =
    fieldValue === null || fieldValue === undefined ? "" : fieldValue;
  const normalizedConditionValue =
    value === null || value === undefined ? "" : value;

  switch (operator) {
    case "=":
    case "==":
      return normalizedFieldValue === normalizedConditionValue;

    case "!=":
      return normalizedFieldValue !== normalizedConditionValue;

    case "<":
      return Number(normalizedFieldValue) < Number(normalizedConditionValue);

    case ">":
      return Number(normalizedFieldValue) > Number(normalizedConditionValue);

    case "<=":
      return Number(normalizedFieldValue) <= Number(normalizedConditionValue);

    case ">=":
      return Number(normalizedFieldValue) >= Number(normalizedConditionValue);

    case "contains":
      return String(normalizedFieldValue)
        .toLowerCase()
        .includes(String(normalizedConditionValue).toLowerCase());

    case "not_contains":
      return !String(normalizedFieldValue)
        .toLowerCase()
        .includes(String(normalizedConditionValue).toLowerCase());

    case "starts_with":
      return String(normalizedFieldValue)
        .toLowerCase()
        .startsWith(String(normalizedConditionValue).toLowerCase());

    case "ends_with":
      return String(normalizedFieldValue)
        .toLowerCase()
        .endsWith(String(normalizedConditionValue).toLowerCase());

    case "in":
      if (Array.isArray(normalizedConditionValue)) {
        return normalizedConditionValue.includes(normalizedFieldValue);
      }
      return false;

    case "not_in":
      if (Array.isArray(normalizedConditionValue)) {
        return !normalizedConditionValue.includes(normalizedFieldValue);
      }
      return true;

    case "empty":
      return !normalizedFieldValue || normalizedFieldValue === "";

    case "not_empty":
      return normalizedFieldValue && normalizedFieldValue !== "";

    case "is_true":
      return (
        normalizedFieldValue === true ||
        normalizedFieldValue === "true" ||
        normalizedFieldValue === 1
      );

    case "is_false":
      return (
        normalizedFieldValue === false ||
        normalizedFieldValue === "false" ||
        normalizedFieldValue === 0
      );

    default:
      console.warn(`Unknown operator: ${operator}`);
      return true;
  }
};

// Evaluates multiple conditions with AND/OR logic
export const evaluateConditions = (conditions, formValues, logic = "AND") => {
  if (!conditions || conditions.length === 0) {
    return true;
  }

  if (logic === "OR") {
    return conditions.some((condition) =>
      evaluateCondition(condition, formValues)
    );
  }

  // Default to AND logic
  return conditions.every((condition) =>
    evaluateCondition(condition, formValues)
  );
};

// Determines if a component should be shown based on showWhen and hideWhen conditions
export const shouldShowComponent = (component, formValues) => {
  const { showWhen, hideWhen } = component;

  // If no conditions, show by default
  if (!showWhen && !hideWhen) {
    return true;
  }

  let shouldShow = true;

  // Evaluate showWhen conditions
  if (showWhen) {
    if (Array.isArray(showWhen)) {
      // Multiple conditions
      shouldShow = evaluateConditions(
        showWhen,
        formValues,
        showWhen.logic || "AND"
      );
    } else {
      // Single condition
      shouldShow = evaluateCondition(showWhen, formValues);
    }
  }

  // Evaluate hideWhen conditions
  if (hideWhen && shouldShow) {
    if (Array.isArray(hideWhen)) {
      // Multiple conditions
      const shouldHide = evaluateConditions(
        hideWhen,
        formValues,
        hideWhen.logic || "AND"
      );
      shouldShow = !shouldHide;
    } else {
      // Single condition
      const shouldHide = evaluateCondition(hideWhen, formValues);
      shouldShow = !shouldHide;
    }
  }

  return shouldShow;
};

// Extract all field names used in conditional logic for performance optimization
export const extractConditionalFields = (formItems) => {
  const fields = new Set();

  const processItem = (item) => {
    if (item.showWhen) {
      if (Array.isArray(item.showWhen)) {
        item.showWhen.forEach((condition) => {
          if (condition.field) fields.add(condition.field);
        });
      } else if (item.showWhen.field) {
        fields.add(item.showWhen.field);
      }
    }

    if (item.hideWhen) {
      if (Array.isArray(item.hideWhen)) {
        item.hideWhen.forEach((condition) => {
          if (condition.field) fields.add(condition.field);
        });
      } else if (item.hideWhen.field) {
        fields.add(item.hideWhen.field);
      }
    }

    // Process nested children
    if (item.children && Array.isArray(item.children)) {
      item.children.forEach(processItem);
    }

    // Process tab/accordion items
    if (item.items && Array.isArray(item.items)) {
      item.items.forEach((tabItem) => {
        if (tabItem.children && Array.isArray(tabItem.children)) {
          tabItem.children.forEach(processItem);
        }
        // Also process fields property for backward compatibility
        if (tabItem.fields && Array.isArray(tabItem.fields)) {
          tabItem.fields.forEach(processItem);
        }
      });
    }

    // Process fields property for components that use it
    if (item.fields && Array.isArray(item.fields)) {
      item.fields.forEach(processItem);
    }
  };

  if (Array.isArray(formItems)) {
    formItems.forEach(processItem);
  }

  return fields;
};
