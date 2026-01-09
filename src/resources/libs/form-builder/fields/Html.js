import React from "react";
import { filterInternalProps } from "../utils/filterInternalProps";

// Html component for rendering raw HTML
const Html = ({ html, className = "", style = {}, ...rest }) => {
  const cleanProps = filterInternalProps(rest);

  return (
    <div
      className={`arraysubscription-fb-html ${className}`}
      style={style}
      dangerouslySetInnerHTML={{ __html: html }}
      {...cleanProps}
    />
  );
};

export default Html;
