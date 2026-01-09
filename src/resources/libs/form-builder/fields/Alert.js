import React from "react";
import FieldBase from "../utils/FieldBase";
import filterInternalProps from "../utils/filterInternalProps";

const Alert = ({
  message,
  description,
  type = "info",
  showIcon = false,
  closable = false,
  style,
  className,
  ...rest
}) => {
  const filteredProps = filterInternalProps(rest);

  return (
    <FieldBase {...filteredProps}>
      <div
        className={`arraysubscription-alert arraysubscription-alert-${type} ${
          showIcon ? "arraysubscription-alert-with-icon" : ""
        } ${className || ""}`}
        style={style}
      >
        {showIcon && (
          <span className="arraysubscription-alert-icon">
            {type === "success" && "✓"}
            {type === "info" && "ℹ"}
            {type === "warning" && "⚠"}
            {type === "error" && "✕"}
          </span>
        )}
        <div className="arraysubscription-alert-content">
          {message && (
            <div className="arraysubscription-alert-message">{message}</div>
          )}
          {description && (
            <div className="arraysubscription-alert-description">
              {description}
            </div>
          )}
        </div>
        {closable && (
          <button
            type="button"
            className="arraysubscription-alert-close"
            onClick={() => {}}
          >
            ✕
          </button>
        )}
      </div>
    </FieldBase>
  );
};

export default Alert;
