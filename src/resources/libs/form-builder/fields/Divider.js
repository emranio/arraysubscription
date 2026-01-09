import React from "react";
import { filterInternalProps } from "../utils/filterInternalProps";

// Divider component for visual separation
const DividerField = ({
  label,
  children,
  className = "",
  style = {},
  dashed,
  orientation,
  ...rest
}) => {
  // Filter out internal and invalid HTML props
  const cleanProps = filterInternalProps(rest);
  const dividerClass = `arraysubscription-fb-divider ${
    dashed ? "arraysubscription-fb-divider-dashed" : ""
  } ${className}`;

  // Use children or label for the divider text
  const dividerText = children || label;

  if (dividerText) {
    return (
      <div
        className={`arraysubscription-fb-divider-with-label ${
          orientation === "left" ? "arraysubscription-fb-divider-left" : ""
        } ${
          orientation === "right" ? "arraysubscription-fb-divider-right" : ""
        }`}
        style={style}
      >
        <hr className={dividerClass} />
        <span>{dividerText}</span>
        <hr className={dividerClass} />
      </div>
    );
  }

  return <hr className={dividerClass} style={style} />;
};

export default DividerField;
