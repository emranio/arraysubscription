import React from "react";

// Auto Grid container component for responsive layouts
const AutoGridComponent = ({
  children,
  cols = 3,
  className = "",
  style = {},
  ...rest
}) => {
  return (
    <div
      className={`arraysubscription-fb-auto-grid ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default AutoGridComponent;
