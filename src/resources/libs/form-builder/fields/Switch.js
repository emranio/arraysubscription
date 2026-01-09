import React from "react";
import FieldBase from "../utils/FieldBase";
import filterInternalProps from "../utils/filterInternalProps";

// Switch/Toggle field
const SwitchField = ({
  label,
  name,
  rules = [],
  inline = false,
  help,
  checkedText,
  unCheckedText,
  ...rest
}) => {
  // Filter out custom props that shouldn't go to input element
  const { className, style, ...props } = rest;

  const cleanProps = filterInternalProps(props);

  return (
    <FieldBase
      name={name}
      rules={rules}
      inline={inline}
      valuePropName="checked"
      help={help}
    >
      {(control) => (
        <div
          className={`arraysubscription-fb-switch-wrapper ${className || ""}`}
          style={style}
        >
          <label className="arraysubscription-fb-switch">
            <input
              type="checkbox"
              id={name}
              checked={control.checked || false}
              onChange={(e) => control.onChange(e.target.checked)}
              {...cleanProps}
            />
            <span className="arraysubscription-fb-switch-slider"></span>
          </label>
          {label && (
            <label htmlFor={name} className="arraysubscription-fb-switch-label">
              {label}
            </label>
          )}
          {checkedText && (
            <span className="arraysubscription-fb-switch-text-checked">
              {checkedText}
            </span>
          )}
          {unCheckedText && (
            <span className="arraysubscription-fb-switch-text-unchecked">
              {unCheckedText}
            </span>
          )}
        </div>
      )}
    </FieldBase>
  );
};

export default SwitchField;
