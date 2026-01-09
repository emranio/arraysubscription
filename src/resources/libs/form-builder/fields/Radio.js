import React from "react";
import FieldBase from "../utils/FieldBase";

// Radio group field
const RadioField = ({
  label,
  name,
  rules = [],
  inline = false,
  data = [],
  orientation = "vertical",
  help,
  ...rest
}) => {
  const groupClass = `arraysubscription-fb-radio-group ${
    orientation === "horizontal"
      ? "arraysubscription-fb-orientation-horizontal"
      : ""
  }`;

  return (
    <FieldBase
      label={label}
      name={name}
      rules={rules}
      inline={inline}
      help={help}
    >
      {(control) => {
        console.log(
          "Radio control:",
          name,
          "value:",
          control.value,
          "data:",
          data
        );
        return (
          <div className={groupClass}>
            {data.map((item) => (
              <div key={item.value} className="arraysubscription-fb-radio-item">
                <input
                  type="radio"
                  id={`${name}-${item.value}`}
                  name={name}
                  value={item.value}
                  checked={control.value === item.value}
                  onChange={(e) => control.onChange(e.target.value)}
                  disabled={item.disabled}
                  {...rest}
                />
                <label htmlFor={`${name}-${item.value}`}>{item.label}</label>
              </div>
            ))}
          </div>
        );
      }}
    </FieldBase>
  );
};

export default RadioField;
