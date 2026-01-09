import React, { useState } from "react";
import { filterInternalProps } from "../utils/filterInternalProps";

// Accordion layout component for collapsible form sections
const AccordionField = ({
  items = [],
  renderFormItems, // Function to render nested form items
  multiple = false,
  accordion,
  ghost,
  className = "",
  style = {},
  ...rest
}) => {
  const [openItems, setOpenItems] = useState([]);

  // Process accordion items to handle nested children
  const processedItems = items.map((item, index) => {
    const { children, ...itemProps } = item;

    let processedChildren = null;
    if (children && renderFormItems) {
      processedChildren = renderFormItems(children);
    } else if (children && typeof children === "string") {
      processedChildren = children;
    } else if (children) {
      processedChildren = children;
    }

    return {
      ...itemProps,
      key: itemProps.key || index.toString(),
      children: processedChildren,
    };
  });

  const toggleItem = (key) => {
    if (multiple || !accordion) {
      setOpenItems((prev) =>
        prev.includes(key) ? prev.filter((v) => v !== key) : [...prev, key]
      );
    } else {
      setOpenItems((prev) => (prev.includes(key) ? [] : [key]));
    }
  };

  return (
    <div
      className={`arraysubscription-fb-accordion ${
        accordion ? "arraysubscription-fb-accordion-single" : ""
      } ${ghost ? "arraysubscription-fb-accordion-ghost" : ""} ${className}`}
      style={style}
    >
      {processedItems.map((item) => {
        const isOpen = openItems.includes(item.key);
        return (
          <div key={item.key} className="arraysubscription-fb-accordion-item">
            <button
              type="button"
              className={`arraysubscription-fb-accordion-header ${
                isOpen ? "arraysubscription-fb-accordion-header-active" : ""
              }`}
              onClick={() => !item.disabled && toggleItem(item.key)}
              disabled={item.disabled}
            >
              <span>{item.label}</span>
              <span
                className={`arraysubscription-fb-accordion-icon ${
                  isOpen ? "arraysubscription-fb-accordion-icon-open" : ""
                }`}
              >
                ▼
              </span>
            </button>
            <div
              className={`arraysubscription-fb-accordion-panel ${
                isOpen ? "arraysubscription-fb-accordion-panel-open" : ""
              }`}
            >
              {item.children}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccordionField;
