import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useField, useFormikContext } from "formik";
import { Form, Col } from "react-bootstrap";

const CustomDatePicker = ({
  label,
  star,
  meta,
  onChange,
  handleBlur,
  selectedDate,
  dateFormat,
  borderColor,
  ...props
}) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [field] = useField(props);

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 0;
  };
  const handleChange = (date) => {
    setFieldValue(field.name, date);
    setFieldTouched(field.name, true, false);
    onChange(date);
  };

  return (
    <Form.Group as={Col} controlId={field.name} className="d-flex flex-column">
      <Form.Label>
        {label}
        <span className={`text-danger ${star === "none" ? `d-${star}` : ""}`}>
          *
        </span>
      </Form.Label>{" "}
      <DatePicker
        {...field}
        {...props}
        showIcon={true}
        minDate={new Date()}
        dateFormat="dd/MM/yyyy"
        todayButton={props.todayButton || "Today"}
        placeholderText={props.placeholderText || "Select a date"}
        filterDate={isWeekday}
        selected={selectedDate || field.value || null}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`custom-datepicker-class ${
          meta && meta.touched && meta.error ? "is-invalid" : ""
        }`}
        customInput={<Form.Control />}
        peekNextMonth
        dropdownMode="select"
        popperPlacement="bottom-end"
        popperModifiers={{
          offset: {
            enabled: true,
            offset: "-10px, 0px",
          },
          preventOverflow: {
            enabled: true,
            escapeWithReference: false,
            boundariesElement: "viewport",
          },
        }}
        style={{
          border:
            meta && meta.touched && meta.error
              ? "1px solid red"
              : "1px solid #ced4da",
          borderRadius: "2px",
          width: "100%",
        }}
      />
      {meta && meta.touched && meta.error && (
        <p className="text-danger">{meta.error}</p>
      )}
    </Form.Group>
  );
};

export default CustomDatePicker;
