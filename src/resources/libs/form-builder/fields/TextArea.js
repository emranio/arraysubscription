import React from "react";
import FieldBase from "../utils/FieldBase";

// Multi-line text area field
const TextAreaField = ({
  label,
  name,
  rules = [],
  placeholder,
  inline = false,
  help,
  rows = 4,
  className = "",
  ...rest
}) => {
  const defaultPlaceholder =
    placeholder || `Enter ${label?.toLowerCase() || "text"}`;

  return (
    <FieldBase
      label={label}
      name={name}
      rules={rules}
      inline={inline}
      help={help}
      className={className}
    >
      <textarea
        className={`arraysubscription-fb-textarea ${className}`}
        placeholder={defaultPlaceholder}
        rows={rows}
        {...rest}
      />
    </FieldBase>
  );
};

export default TextAreaField;
