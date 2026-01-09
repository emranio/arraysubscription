import React from "react";

// Card container component for responsive layouts
const CardComponent = ({ children, className = "", style = {}, ...rest }) => {
  return (
    <div
      className={`arraysubscription-fb-card ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
};

export default CardComponent;
