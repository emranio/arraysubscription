import React from "react";
import FieldBase from "../utils/FieldBase";

// Number input field
const NumberField = ({
  label,
  name,
  rules = [],
  placeholder,
  inline = false,
  help,
  min,
  max,
  step,
  className = "",
  ...rest
}) => {
  const defaultPlaceholder =
    placeholder || `Enter ${label?.toLowerCase() || "number"}`;

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
        type="number"
        className={`arraysubscription-fb-input ${className}`}
        placeholder={defaultPlaceholder}
        min={min}
        max={max}
        step={step}
        {...rest}
      />
    </FieldBase>
  );
};

export default NumberField;
