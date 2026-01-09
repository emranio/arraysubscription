import React, { useState } from "react";
import FieldBase from "../utils/FieldBase";

// JSON input field for structured data
const JsonField = ({
  label,
  name,
  rules = [],
  placeholder,
  inline = false,
  validationError = "Invalid JSON",
  help,
  rows = 6,
  ...rest
}) => {
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");
  const defaultPlaceholder =
    placeholder || `Enter ${label?.toLowerCase() || "JSON"}`;

  const handleBlur = (e) => {
    const value = e.target.value;
    if (value.trim()) {
      try {
        JSON.parse(value);
        setIsValid(true);
        setError("");
        // Format on blur
        e.target.value = JSON.stringify(JSON.parse(value), null, 2);
      } catch (err) {
        setIsValid(false);
        setError(validationError);
      }
    } else {
      setIsValid(true);
      setError("");
    }
  };

  return (
    <FieldBase
      label={label}
      name={name}
      rules={rules}
      inline={inline}
      help={help}
    >
      <div
        className={`arraysubscription-fb-json-editor ${
          !isValid ? "arraysubscription-fb-json-error" : ""
        }`}
      >
        <textarea
          className="arraysubscription-fb-textarea"
          placeholder={defaultPlaceholder}
          rows={rows}
          onBlur={handleBlur}
          {...rest}
        />
        {error && <div className="field-error">{error}</div>}
      </div>
    </FieldBase>
  );
};

export default JsonField;
