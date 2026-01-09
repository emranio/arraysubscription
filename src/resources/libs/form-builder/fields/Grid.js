import React, { createContext } from "react";

// Context to detect if Col is inside a Grid
export const GridContext = createContext(false);

// Grid container component for responsive layouts
const GridComponent = ({ children, className = "", style = {}, ...rest }) => {
  return (
    <GridContext.Provider value={true}>
      <div
        className={`arraysubscription-fb-grid ${className}`}
        style={style}
        {...rest}
      >
        {children}
      </div>
    </GridContext.Provider>
  );
};

export default GridComponent;
