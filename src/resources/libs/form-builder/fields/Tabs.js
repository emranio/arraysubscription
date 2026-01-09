import React, { useState } from "react";
import { filterInternalProps } from "../utils/filterInternalProps";

// Tabs layout component for organizing form fields in tabs
const TabsLayout = ({
  items = [],
  renderFormItems, // Function to render nested form items
  activeTab,
  defaultActiveKey,
  type,
  size,
  className = "",
  style = {},
  ...props
}) => {
  // Filter out internal props
  const cleanProps = filterInternalProps(props);

  // Process tab items to handle nested children
  const processedItems = items.map((item, index) => {
    const { children, ...itemProps } = item;

    let processedChildren = null;
    if (children && renderFormItems) {
      processedChildren = renderFormItems(children);
    } else if (children && typeof children === "string") {
      processedChildren = children;
    }

    return {
      ...itemProps,
      value: itemProps.value || index.toString(),
      children: processedChildren,
    };
  });

  const [currentTab, setCurrentTab] = useState(
    defaultActiveKey ||
      activeTab ||
      (processedItems[0] && processedItems[0].key)
  );

  return (
    <div
      className={`arraysubscription-fb-tabs ${
        type ? `arraysubscription-fb-tabs-${type}` : ""
      } ${size ? `arraysubscription-fb-tabs-${size}` : ""} ${className}`}
      style={style}
    >
      <div className="arraysubscription-fb-tabs-list">
        {processedItems.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`arraysubscription-fb-tabs-tab ${
              currentTab === item.key
                ? "arraysubscription-fb-tabs-tab-active"
                : ""
            }`}
            onClick={() => setCurrentTab(item.key)}
            disabled={item.disabled}
          >
            {item.label}
          </button>
        ))}
      </div>

      {processedItems.map((item) => (
        <div
          key={item.key}
          className={`arraysubscription-fb-tabs-panel ${
            currentTab === item.key
              ? "arraysubscription-fb-tabs-panel-active"
              : ""
          }`}
        >
          {item.children}
        </div>
      ))}
    </div>
  );
};

export default TabsLayout;
