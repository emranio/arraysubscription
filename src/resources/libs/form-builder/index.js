import React, { useMemo } from "react";
import { useWatch } from "rc-field-form";
import FieldRegistry from "./fields";
import {
  shouldShowComponent,
  extractConditionalFields,
} from "./utils/conditionalLogic";
import { NamePrefixContext } from "./utils/NamePrefixContext";
import "./scss/form-builder.scss";

// Main FormBuilder component
const FormBuilder = ({ formItems, form }) => {
  // Extract all fields used in conditional logic
  const conditionalFields = useMemo(() => {
    return Array.from(extractConditionalFields(formItems));
  }, [formItems]);

  // For rc-field-form, watch all form values by passing an empty array
  // This is the most reliable way to watch for changes in rc-field-form
  const allFormValues = useWatch([], form);

  // Get all form values for conditional evaluation
  const formValues = useMemo(() => {
    // Use the watched values directly since useWatch([]) watches all form values
    const currentValues = form.getFieldsValue();

    // Merge with watched values to ensure we have the latest
    const mergedValues = { ...currentValues, ...(allFormValues || {}) };

    // Debug logging - remove this after testing
    console.log("FormBuilder Debug:", {
      conditionalFields,
      allFormValues,
      currentValues,
      mergedValues,
    });

    return mergedValues;
  }, [conditionalFields, form, allFormValues]);

  const renderFormItems = useMemo(() => {
    const render = (items = formItems) => {
      return items.map((item, index) => {
        // Extract internal props that shouldn't be passed to components
        const {
          field,
          children,
          showWhen,
          hideWhen,
          // Add other internal props that shouldn't be passed down
          ...props
        } = item;
        const Component = FieldRegistry[field];
        const key = `${field}-${index}`;

        if (!Component) {
          return (
            <div
              key={key}
              className="arraysubscription-fb-alert arraysubscription-fb-alert-error"
            >
              <strong>Component Error:</strong> Component field '{field}' not
              found
            </div>
          );
        }

        // Check conditional rendering
        const shouldShow = shouldShowComponent(item, formValues);

        // If component should be hidden, don't render it
        if (!shouldShow) {
          return null;
        }

        // Create component props, filtering out internal props
        const componentProps = { ...props };

        // Pass renderFormItems function only to components that support nesting
        if (
          [
            "Card",
            "Container",
            "Tabs",
            "Accordion",
            "Collapse",
            "Repeater",
            "Grid",
            "Space",
            "Flex",
          ].includes(field)
        ) {
          componentProps.renderFormItems = render;
        }

        // For non-nesting components, make sure renderFormItems is not passed
        if (
          ![
            "Card",
            "Container",
            "Tabs",
            "Accordion",
            "Collapse",
            "Repeater",
            "Grid",
            "Space",
            "Flex",
          ].includes(field)
        ) {
          delete componentProps.renderFormItems;
        }

        // Handle nested children
        let renderedChildren = null;
        if (children) {
          if (Array.isArray(children)) {
            renderedChildren = render(children);
          } else if (typeof children === "string") {
            renderedChildren = children;
          } else if (typeof children === "object" && children.field) {
            renderedChildren = render([children]);
          }
        }

        if (field === "Repeater") {
          if (props.items) {
            componentProps.items = props.items;
          } else if (children) {
            componentProps.items = children;
          }
          delete componentProps.children;
        }

        return (
          <Component key={key} {...componentProps}>
            {renderedChildren}
          </Component>
        );
      });
    };
    return render();
  }, [formItems, formValues]);

  return (
    <NamePrefixContext.Provider value={[]}>
      {renderFormItems}
    </NamePrefixContext.Provider>
  );
};

export default FormBuilder;
