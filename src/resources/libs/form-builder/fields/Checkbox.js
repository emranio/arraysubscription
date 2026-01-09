import React from "react";
import FieldBase from "../utils/FieldBase";

// Checkbox group field
const CheckboxField = ({
  label,
  name,
  rules = [],
  inline = false,
  data = [],
  orientation = "vertical",
  single = false, // If true, renders a single checkbox
  checkboxLabel, // Label for single checkbox
  help,
  ...rest
}) => {
  // Auto-detect single checkbox mode when no data is provided
  const isSingleMode = single || data.length === 0;

  if (isSingleMode) {
    // Single checkbox
    console.log(
      "Checkbox single mode:",
      name,
      "label:",
      label,
      "checkboxLabel:",
      checkboxLabel
    );
    return (
      <FieldBase
        name={name}
        rules={rules}
        inline={inline}
        valuePropName="checked"
        help={help}
      >
        {(control) => {
          console.log("Checkbox control:", name, "checked:", control.checked);
          return (
            <div className="arraysubscription-fb-checkbox-item">
              <input
                type="checkbox"
                id={name}
                checked={control.checked || false}
                onChange={(e) => control.onChange(e.target.checked)}
                {...rest}
              />
              <label htmlFor={name}>{checkboxLabel || label}</label>
            </div>
          );
        }}
      </FieldBase>
    );
  }

  // Checkbox group
  const groupClass = `arraysubscription-fb-checkbox-group ${
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
        const currentValue = control.value || [];

        const handleToggle = (itemValue) => {
          const newValue = currentValue.includes(itemValue)
            ? currentValue.filter((v) => v !== itemValue)
            : [...currentValue, itemValue];
          control.onChange(newValue);
        };

        return (
          <div className={groupClass}>
            {data.map((item) => (
              <div
                key={item.value}
                className="arraysubscription-fb-checkbox-item"
              >
                <input
                  type="checkbox"
                  id={`${name}-${item.value}`}
                  value={item.value}
                  checked={currentValue.includes(item.value)}
                  onChange={() => handleToggle(item.value)}
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

export default CheckboxField;
