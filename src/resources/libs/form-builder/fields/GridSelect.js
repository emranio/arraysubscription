import React, { useState } from "react";
import FieldBase from "../utils/FieldBase";

const GridSelect = ({
  label,
  name,
  rules = [],
  inline = false,
  data = [],
  cols = null,
  help,
  ...rest
}) => {
  const columns = cols || (data.length < 4 ? data.length : 3);

  return (
    <FieldBase
      label={label}
      name={name}
      rules={rules}
      inline={inline}
      help={help}
    >
      {(control) => (
        <div
          className="arraysubscription-fb-auto-grid"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {data.map((item) => (
            <div
              key={item.value}
              className={`arraysubscription-fb-grid-select-item ${
                control.value === item.value
                  ? "arraysubscription-fb-grid-select-item-selected"
                  : ""
              }`}
              onClick={() => control.onChange(item.value)}
            >
              <input
                type="radio"
                name={name}
                value={item.value}
                checked={control.value === item.value}
                onChange={(e) => control.onChange(e.target.value)}
              />
              <div>
                <div style={{ fontWeight: 500 }}>{item.label}</div>
                {item.description && (
                  <div
                    style={{
                      fontSize: "13px",
                      color: "var(--arraysubscription-fb-text-muted)",
                      marginTop: "4px",
                    }}
                  >
                    {item.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </FieldBase>
  );
};

export default GridSelect;
