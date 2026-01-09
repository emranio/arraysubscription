import React, { useState } from "react";
import FieldBase from "../utils/FieldBase";

// Color picker field
const ColorField = ({
  label,
  name,
  rules = [],
  placeholder,
  inline = false,
  help,
  ...rest
}) => {
  return (
    <FieldBase
      label={label}
      name={name}
      rules={rules}
      inline={inline}
      help={help}
    >
      {(control) => (
        <div className="arraysubscription-fb-color-input-wrapper">
          <input
            type="color"
            value={control.value || "#000000"}
            onChange={(e) => control.onChange(e.target.value)}
            {...rest}
          />
          <input
            type="text"
            className="arraysubscription-fb-input"
            value={control.value || "#000000"}
            onChange={(e) => control.onChange(e.target.value)}
            placeholder={placeholder || "Enter color"}
          />
        </div>
      )}
    </FieldBase>
  );
};

export default ColorField;
