import React from "react";
import SelectField from "./Select";

/**
 * Tag Field - Wrapper for Select with multiple=true
 *
 * This is a convenience wrapper that provides the old Tag field behavior
 * using the unified Select component with multi-select enabled.
 *
 * @param {Object} props - All props are passed to SelectField
 * @param {boolean} props.multiple - Defaults to true for tag behavior
 */
const TagField = ({ multiple = true, ...props }) => {
  return <SelectField multiple={multiple} {...props} />;
};

export default TagField;
