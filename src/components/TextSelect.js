// TextSelect.js

import React from "react";
import Select from "react-select";
import { useField, useFormikContext } from "formik";
import { Form, Col } from "react-bootstrap";

const TextSelect = ({
  label,
  meta,
  onChange,
  isMulti,
  handleBlur,
  borderColor,
  star,
  ...props
}) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [field] = useField(props);

  const handleChange = (selectedOption) => {
    setFieldValue(field.name, selectedOption);
    setFieldTouched(field.name, true, false); // Mark the field as touched
    onChange(selectedOption);
  };

  return (
    <Form.Group as={Col} controlId={field.name}>
      <Form.Label>
        {label}
        <span className={`text-danger ${star === "none" ? `d-${star}` : ""}`}>
          *
        </span>
      </Form.Label>{" "}
      <Select
        {...field}
        {...props}
        onChange={handleChange}
        onBlur={(e) => {
          handleBlur(e);
          setFieldTouched(field.name, true, false);
        }}
        className={`custom-select-class ${
          meta && meta.touched && meta.error ? "is-invalid" : ""
        }`}
        isMulti={isMulti}
        styles={{
          control: (provided, state) => ({
            ...provided,
            minHeight: "38px",
            height: "auto",
            boxShadow: state.isFocused
              ? meta && meta.touched && meta.error
                ? "0 0 0 0.2rem rgba(255, 0, 0, 0.2)"
                : "0 0 0 0.2rem rgba(0, 123, 255, 0.25)"
              : null,
            borderColor:
              borderColor ||
              (meta && meta.touched && meta.error
                ? "red"
                : provided.borderColor),

            "&:hover": {
              borderColor: state.isFocused
                ? meta && meta.touched && meta.error
                  ? "red"
                  : "#80bdff"
                : "",
            },
          }),
          menu: (provided) => ({
            ...provided,
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
              ? "#80bdff"
              : state.isFocused
              ? "#cce5ff"
              : "white",
            color: state.isSelected ? "white" : "inherit",
            "&:hover": {
              backgroundColor: state.isSelected ? "#80bdff" : "#cce5ff",
            },
          }),
        }}
      />
      {meta && meta.touched && meta.error && (
        <p className="text-danger">{meta.error}</p>
      )}
    </Form.Group>
  );
};

export default TextSelect;
