import React, { useState } from "react";
import FieldBase from "../utils/FieldBase";

// Slider field for numeric range selection
const SliderField = ({
  label,
  name,
  rules = [],
  inline = false,
  min = 0,
  max = 100,
  step = 1,
  help,
  showValue = true,
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
        <div className="arraysubscription-fb-slider-wrapper">
          <input
            type="range"
            className="arraysubscription-fb-slider"
            min={min}
            max={max}
            step={step}
            value={control.value || min}
            onChange={(e) => control.onChange(e.target.value)}
            {...rest}
          />
          {showValue && (
            <span className="arraysubscription-fb-slider-value">
              {control.value || min}
            </span>
          )}
        </div>
      )}
    </FieldBase>
  );
};

export default SliderField;
