import React from "react";
import FieldBase from "../utils/FieldBase";

// Date and DateTime field
const DateField = ({
  label,
  name,
  rules = [],
  placeholder,
  inline = false,
  withTime = false,
  help,
  min,
  max,
  ...rest
}) => {
  const inputType = withTime ? "datetime-local" : "date";

  return (
    <FieldBase
      label={label}
      name={name}
      rules={rules}
      inline={inline}
      help={help}
    >
      <input
        type={inputType}
        className="arraysubscription-fb-input"
        min={min}
        max={max}
        {...rest}
      />
    </FieldBase>
  );
};

export default DateField;
