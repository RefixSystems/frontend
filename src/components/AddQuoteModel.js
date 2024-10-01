import React, { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import BasicButton from './BasicButton';

const AddQuoteModal = ({ show, handleClose, handleAddQuote, isLoading }) => {
  const initialValues = {
    userName: '',
    phoneNumber: '', // Remove phoneNumber state here
    email: '',
    rentalDays: '',
  };

  const [phoneNumberFromToken, setPhoneNumberFromToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const parsedToken = JSON.parse(storedToken);
      setPhoneNumberFromToken(parsedToken.phoneNumber);
    }
  }, []);

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(2, 'Full Name must be at least 2 characters')
      .max(50, 'Full Name must be at most 50 characters')
      .required('Full Name is required'),
    phoneNumber: Yup.string()
      .matches(/^[6-9][0-9]{9}$/, 'Invalid phone number format')
      .required('Phone Number is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    rentalDays: Yup.number()
      .typeError('Rental Months must be a number')
      .positive('Rental Months must be a positive number')
      .integer('Rental Months must be an integer')
      .required('Rental Months is required'),
  });

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Quotation Request</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          ...initialValues,
          phoneNumber: phoneNumberFromToken || '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          handleAddQuote(values);
          resetForm();
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <FormikForm noValidate onSubmit={handleSubmit}>
            <Modal.Body style={{ maxHeight: '400px', overflowY: 'scroll' }}>
              <Form.Group controlId="formUserName">
                <Form.Label>Full Name</Form.Label>
                <Field
                  as={Form.Control}
                  type="text"
                  name="userName"
                  value={values.userName}
                  onChange={handleChange}
                  isInvalid={touched.userName && !!errors.userName}
                />
                <ErrorMessage
                  name="userName"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>

              <Form.Group controlId="formPhoneNumber" className="mt-3">
                <Form.Label>Phone Number</Form.Label>
                <Field
                  as={Form.Control}
                  type="text"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={(e) => {
                    const input = e.target.value;
                    const numericInput = input
                      .replace(/[^0-9]/g, '')
                      .slice(0, 10);
                    setFieldValue(numericInput);
                    handleChange(e);
                  }}
                  isInvalid={touched.phoneNumber && !!errors.phoneNumber}
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Field
                  as={Form.Control}
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={touched.email && !!errors.email}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>

              <Form.Group controlId="formRentalDays" className="mt-3">
                <Form.Label>Rental (In Months)</Form.Label>
                <Field
                  as={Form.Control}
                  type="number"
                  name="rentalDays"
                  value={values.rentalDays}
                  onChange={handleChange}
                  isInvalid={touched.rentalDays && !!errors.rentalDays}
                />
                <ErrorMessage
                  name="rentalDays"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <BasicButton
                isLoading={isLoading}
                className={'bg-main'}
                style={{ border: 'none' }}
                type="submit"
                label={'Submit'}
              />
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};

export default AddQuoteModal;
