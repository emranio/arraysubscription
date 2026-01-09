import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import FieldBase from "../utils/FieldBase";

// Password input field with visibility toggle
const PasswordField = ({
  label,
  name,
  rules = [],
  placeholder,
  inline = false,
  help,
  className = "",
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const defaultPlaceholder =
    placeholder || `Enter ${label?.toLowerCase() || "password"}`;

  return (
    <FieldBase
      label={label}
      name={name}
      rules={rules}
      inline={inline}
      help={help}
      className={className}
    >
      {(control, meta, form) => (
        <div className={`arraysubscription-fb-password-wrapper ${className}`}>
          <input
            {...control}
            type={showPassword ? "text" : "password"}
            className={`arraysubscription-fb-input ${className}`}
            placeholder={defaultPlaceholder}
            {...rest}
          />
          <button
            type="button"
            className="arraysubscription-fb-password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      )}
    </FieldBase>
  );
};

export default PasswordField;
