import React from "react";
import { filterInternalProps } from "../utils/filterInternalProps";

// Space component for spacing between elements
const Space = ({
  children,
  direction = "horizontal",
  size = "medium",
  wrap = false,
  align,
  className = "",
  style = {},
  ...rest
}) => {
  const cleanProps = filterInternalProps(rest);

  const sizeMap = {
    small: "8px",
    medium: "16px",
    large: "24px",
  };

  const gap =
    typeof size === "number" ? `${size}px` : sizeMap[size] || sizeMap.medium;

  const spaceStyle = {
    display: "flex",
    flexDirection: direction === "vertical" ? "column" : "row",
    gap: gap,
    flexWrap: wrap ? "wrap" : "nowrap",
    ...(align && { alignItems: align }),
    ...style,
  };

  return (
    <div
      className={`arraysubscription-fb-space ${className}`}
      style={spaceStyle}
      {...cleanProps}
    >
      {children}
    </div>
  );
};

export default Space;
