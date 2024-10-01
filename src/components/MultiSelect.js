import React from "react";
import { Form } from "react-bootstrap";
const MultiSelect = (props) => {
  const {
    label,
    name,
    id,
    type,
    placeholder,
    htmlFor,
    selectedValue,
    onChange,
    options,
    onBlur,
    className,
    lg,
    md,
    xxl,
    xl,
    sm,
    validation,
  } = props;
  return (
    <Form.Group>
      <Form.Label htmlFor={htmlFor}>{label}</Form.Label>
      <Form.Select
        name={name}
        id={id}
        type={type}
        placeholder={placeholder}
        value={selectedValue}
        onChange={onChange}
        onBlur={onBlur}
        className={className}
        lg={lg}
        md={md}
        xxl={xxl}
        xl={xl}
        sm={sm}
      >
        <option value="" disabled selected>
          {" "}
          select the option
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
      {validation}
    </Form.Group>
  );
};
export default MultiSelect;
