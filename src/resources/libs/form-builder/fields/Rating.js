import React, { useState } from "react";
import FieldBase from "../utils/FieldBase";

// Rating field for star ratings
const RatingField = ({
  label,
  name,
  rules = [],
  inline = false,
  count = 5,
  readOnly = false,
  help,
  ...rest
}) => {
  const [hover, setHover] = useState(0);

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
          className={`arraysubscription-fb-rating ${
            readOnly ? "arraysubscription-fb-rating-readonly" : ""
          }`}
        >
          {[...Array(count)].map((_, index) => {
            const starValue = index + 1;
            return (
              <span
                key={index}
                className={`arraysubscription-fb-rating-star ${
                  starValue <= (hover || control.value || 0)
                    ? "arraysubscription-fb-rating-star-filled"
                    : ""
                }`}
                onClick={() => !readOnly && control.onChange(starValue)}
                onMouseEnter={() => !readOnly && setHover(starValue)}
                onMouseLeave={() => !readOnly && setHover(0)}
              >
                ★
              </span>
            );
          })}
        </div>
      )}
    </FieldBase>
  );
};

export default RatingField;
