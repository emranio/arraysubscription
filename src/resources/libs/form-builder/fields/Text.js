import React from "react";
import FieldBase from "../utils/FieldBase";
import { filterInternalProps } from "../utils/filterInternalProps";

// Basic text input field
const TextField = ({
  label,
  name,
  rules = [],
  placeholder,
  inline = false,
  help,
  className = "",
  ...props
}) => {
  // Auto-generate placeholder if not provided
  const defaultPlaceholder =
    placeholder || `Enter ${label?.toLowerCase() || "text"}`;

  // Clean props to avoid passing internal props to input
  const cleanProps = filterInternalProps(props);
  return (
    <FieldBase
      label={label}
      name={name}
      rules={rules}
      inline={inline}
      help={help}
      className={className}
    >
      <input
        type="text"
        className={`arraysubscription-fb-input ${className}`}
        placeholder={defaultPlaceholder}
        {...cleanProps}
      />
    </FieldBase>
  );
};

export default TextField;
