import React from "react";
import FieldBase from "../utils/FieldBase";
import filterInternalProps from "../utils/filterInternalProps";

const Title = ({ text, subText, heading = 3, style, className, ...rest }) => {
  const filteredProps = filterInternalProps(rest);
  const HeadingTag = `h${heading}`;

  return (
    <FieldBase {...filteredProps}>
      <div
        className={`arraysubscription-title ${className || ""}`}
        style={style}
      >
        <HeadingTag className="arraysubscription-title-text">{text}</HeadingTag>
        {subText && (
          <p className="arraysubscription-title-subtext">{subText}</p>
        )}
      </div>
    </FieldBase>
  );
};

export default Title;
