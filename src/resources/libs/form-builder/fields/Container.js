import React from "react";
import { filterInternalProps } from "../utils/filterInternalProps";

// Container component with flex properties (also used as Flex)
const ContainerComponent = ({
  children,
  className = "",
  gap,
  justify,
  align,
  direction = "row",
  wrap = "nowrap",
  vertical = false,
  style = {},
  ...props
}) => {
  // Filter out internal props that shouldn't be passed to DOM elements
  const cleanProps = filterInternalProps(props);

  // Build flex styles
  const flexStyles = {
    display: "flex",
    flexDirection: vertical ? "column" : direction,
    flexWrap: wrap,
    ...(gap && { gap: typeof gap === "number" ? `${gap}px` : gap }),
    ...(justify && { justifyContent: justify }),
    ...(align && { alignItems: align }),
    ...style,
  };

  return (
    <div
      className={`arraysubscription-fb-container ${className}`}
      style={flexStyles}
      {...cleanProps}
    >
      {children}
    </div>
  );
};

export default ContainerComponent;
