import React, { useContext } from "react";
import { Field } from "rc-field-form";
import { NamePrefixContext } from "./NamePrefixContext";

const FieldBase = ({
  inline = false,
  label,
  name,
  rules = [],
  children,
  className = "",
  style = {},
  required = false,
  valuePropName,
  help,
  ...rest
}) => {
  const namePrefix = useContext(NamePrefixContext);
  const finalName = name ? [...namePrefix, name].flat(Infinity) : [];
  const isRequired = required || rules.some((rule) => rule.required);
  const containerClass = `field-warper ${
    inline ? "field-item-inline" : "field-item-block"
  } ${className}`;

  // Normalize function to handle null values at the field level
  const normalize = (val) => {
    // Convert null to undefined to prevent React warnings
    // Let undefined values pass through as they represent "no value"
    if (val === null) {
      return undefined;
    }
    return val;
  };

  // Support both render prop pattern and regular children
  const isRenderProp = typeof children === "function";

  return (
    <div className={containerClass} style={style}>
      {label && (
        <label className={`field-item-label`}>
          {label}
          {isRequired && <span className={`field-item-required`}>*</span>}
        </label>
      )}
      <div className={`field-item-field`}>
        <Field
          name={finalName}
          label={label}
          rules={rules}
          valuePropName={valuePropName}
          normalize={normalize}
          {...rest}
        >
          {isRenderProp
            ? (control, meta, form) => children(control, meta, form)
            : children}
        </Field>
        {help && <div className="field-item-help">{help}</div>}
      </div>
    </div>
  );
};

export default FieldBase;
