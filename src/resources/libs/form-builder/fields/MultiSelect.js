import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import FieldBase from "../utils/FieldBase";

// Multi-select dropdown field
const MultiSelectField = ({
  label,
  name,
  rules = [],
  placeholder,
  inline = false,
  data = [],
  help,
  className = "",
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const defaultPlaceholder =
    placeholder || `Select ${label?.toLowerCase() || "options"}`;

  const getLabel = (val) => {
    const item = data.find((d) => d.value === val);
    return item ? item.label : val;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <FieldBase
      label={label}
      name={name}
      rules={rules}
      inline={inline}
      help={help}
      className={className}
    >
      {(control) => {
        const currentValue = control.value || [];

        const toggleOption = (optionValue) => {
          const newValue = currentValue.includes(optionValue)
            ? currentValue.filter((v) => v !== optionValue)
            : [...currentValue, optionValue];
          control.onChange(newValue);
        };

        const removeOption = (optionValue, e) => {
          e.stopPropagation();
          const newValue = currentValue.filter((v) => v !== optionValue);
          control.onChange(newValue);
        };

        return (
          <div
            className={`arraysubscription-fb-multiselect ${className}`}
            ref={containerRef}
          >
            <div
              className={`arraysubscription-fb-multiselect-control ${
                isOpen ? "arraysubscription-fb-multiselect-control-open" : ""
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="arraysubscription-fb-multiselect-value-container">
                {currentValue.length === 0 ? (
                  <span className="arraysubscription-fb-multiselect-placeholder">
                    {defaultPlaceholder}
                  </span>
                ) : (
                  <div className="arraysubscription-fb-multiselect-tags">
                    {currentValue.map((val) => (
                      <span
                        key={val}
                        className="arraysubscription-fb-multiselect-tag"
                      >
                        <span className="arraysubscription-fb-multiselect-tag-label">
                          {getLabel(val)}
                        </span>
                        <span
                          className="arraysubscription-fb-multiselect-tag-remove"
                          onClick={(e) => removeOption(val, e)}
                        >
                          <X size={12} />
                        </span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="arraysubscription-fb-multiselect-indicators">
                <ChevronDown
                  size={16}
                  className={`arraysubscription-fb-multiselect-chevron ${
                    isOpen
                      ? "arraysubscription-fb-multiselect-chevron-open"
                      : ""
                  }`}
                />
              </div>
            </div>
            {isOpen && (
              <div className="arraysubscription-fb-multiselect-menu">
                {data.map((item) => {
                  const isSelected = currentValue.includes(item.value);
                  return (
                    <div
                      key={item.value}
                      className={`arraysubscription-fb-multiselect-option ${
                        isSelected
                          ? "arraysubscription-fb-multiselect-option-selected"
                          : ""
                      }`}
                      onClick={() => toggleOption(item.value)}
                    >
                      <div className="arraysubscription-fb-multiselect-option-checkbox">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          readOnly
                          tabIndex={-1}
                        />
                      </div>
                      <span className="arraysubscription-fb-multiselect-option-label">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      }}
    </FieldBase>
  );
};

export default MultiSelectField;
