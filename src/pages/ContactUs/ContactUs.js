import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  InputGroup,
  Modal,
  Spinner,
} from 'react-bootstrap';
import { ErrorMessage, Field, Formik } from 'formik';
import { ContactUsSchema } from '../ContactUs/ContactUsValidation';
import { useContactUsMutation } from '../../redux/api/HomeApi';
import { useGetViewUserProfileQuery } from '../../redux/api/AuthApi';
import { useTheme } from '../../Contexts/ThemeContext';
import { removePrefix } from '../../Constants/constant';
import BasicButton from '../../components/BasicButton';
import SuccessModal from '../../components/SuccessModal';
import { ContactLaptop } from '../../components/ContactLaptop';
import { HeadingWithQuotes } from '../../components/Heading';
import {
  useOtpSumbitEmailMutation,
  useVerifyEmailOTPMutation,
} from '../../redux/api/ProfileOrdersApi';
import { toast } from 'react-toastify';

const Contact = () => {
  const { color } = useTheme();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [SendContact] = useContactUsMutation();
  const [errorLottie, setErrorLottie] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [otpEmail, setOtpEmail] = useState(new Array(4).fill(''));
  const inputEmailRefs = useRef([]);
  const [showEmailOtpModal, setShowEmailOtpModal] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [initialValues, setInitialValues] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const {
    data: ContactData,
    error,
    isLoading,
    refetch,
  } = useGetViewUserProfileQuery(phoneNumber, {
    skip: !phoneNumber,
  });

  const [otpEmailApi] = useVerifyEmailOTPMutation();
  const [otpEmailSubmitApi, { isLoading: otpEmailLoader }] =
    useOtpSumbitEmailMutation();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const parsedToken = JSON.parse(storedToken);
      setPhoneNumber(parsedToken.phoneNumber);
    }
  }, []);

  useEffect(() => {
    if (ContactData && ContactData.data) {
      setInitialValues({
        fullName: ContactData.data.userName || '',
        email: ContactData.data.email || '',
        phoneNumber: removePrefix(phoneNumber) || '',
        message: '',
      });
    }
  }, [ContactData, phoneNumber]);

  useEffect(() => {
    if (showEmailOtpModal) {
      inputEmailRefs.current[0]?.focus();
    }
  }, [showEmailOtpModal]);

  const handleSendRequest = async (values, { resetForm }) => {
    if (!isEmailVerified) {
      toast.error('Please verify your email before submitting', {
        position: 'bottom-center',
        autoClose: 1000,
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await SendContact({
        userName: values.fullName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        message: values.message,
      });

      if (response?.data) {
        setErrorLottie(false);
        setSuccessMessage(response?.data?.message);
        setShowModal(true);
        setTimeout(() => setShowModal(false), 4000);
        resetForm();
      } else {
        setErrorLottie(true);
        setSuccessMessage(response?.error?.data.error);
        setShowModal(true);
        setTimeout(() => setShowModal(false), 4000);
        resetForm();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDownEmail = (e, index) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otpEmail];
      newOtp[index] = '';
      setOtpEmail(newOtp);
      if (index > 0) {
        inputEmailRefs.current[index - 1].focus();
      }
    }
  };

  const handleChangeEmail = (element, index) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otpEmail];
    newOtp[index] = element.value;
    setOtpEmail(newOtp);

    // Move to next input if value is entered
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleEmailOtpSend = async (values) => {
    if (values.phoneNumber.length < 10) {
      toast.error('Please enter valid phone Number', {
        position: 'bottom-center',
        autoClose: 1000,
      });
    }
    const phoneNumberWithoutPrefix = values.phoneNumber.replace(/^(\+91)/, '');
    setLoadingVerify(true);
    try {
      const response = await otpEmailApi({
        phoneNumber: phoneNumberWithoutPrefix,
        email: values.email,
      });

      if (response?.data) {
        setShowEmailOtpModal(true);
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred', { autoClose: 1000 });
    } finally {
      setLoadingVerify(false);
    }
  };

  const handleEmailOtpSubmit = async (values) => {
    if (otpEmail.length < 4) {
      setOtpError(true);
    }
    const phoneNumberWithoutPrefix = values.phoneNumber.replace(/^(\+91)/, '');
    setLoading(true);
    try {
      const response = await otpEmailSubmitApi({
        phoneNumber: phoneNumberWithoutPrefix,
        email: values.email,
        code: otpEmail.join(''),
      });

      if (response?.data) {
        setShowEmailOtpModal(false);
        toast.success(response?.data.message, {
          position: 'bottom-center',
          autoClose: 1000,
        });
        setIsEmailVerified(true);
        setOtpEmail(new Array(4).fill(''));
      } else {
        toast.error(response?.error.data.error, {
          position: 'bottom-center',
          autoClose: 1000,
        });
        setOtpEmail(new Array(4).fill(''));
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred', { autoClose: 1000 });
    } finally {
      setLoading(false);
      setOtpEmail(new Array(4).fill(''));
    }
  };

  return (
    <>
      <Container className="mt-5">
        <HeadingWithQuotes>Contact Us</HeadingWithQuotes>
        <Row className="align-items-stretch">
          <Col
            xs={12}
            md={6}
            className="mt-4 mb-lg-0 d-flex align-items-stretch"
          >
            <ContactLaptop />
          </Col>
          <Col
            xs={12}
            md={6}
            className="d-flex mt-4 align-items-stretch card p-4"
            style={{
              borderTop: `8px solid ${color}`,
              borderTopRightRadius: '40px',
              borderTopLeftRadius: '40px',
            }}
          >
            <div className="w-100 d-flex flex-column justify-content-between">
              <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                validationSchema={ContactUsSchema}
                onSubmit={handleSendRequest}
              >
                {({ handleSubmit, setFieldValue, values, errors }) => (
                  <Form
                    onSubmit={handleSubmit}
                    className="h-100 d-flex flex-column justify-content-between"
                  >
                    <Form.Group controlId="fullName">
                      <Form.Label>
                        Name <span className="text-danger">*</span>
                      </Form.Label>
                      <Field
                        name="fullName"
                        type="text"
                        placeholder="Enter Your Name"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="fullName"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>

                    <Form.Group controlId="email">
                      <Form.Label>
                        Email <span className="text-danger">*</span>
                      </Form.Label>
                      <div className="d-flex">
                        <Field
                          name="email"
                          type="email"
                          placeholder="Enter Your Email"
                          className="form-control"
                          onChange={(e) => {
                            const value = e.target.value.toLowerCase();
                            e.target.value = value;
                            setFieldValue('email', value);
                            if (value !== initialValues.email) {
                              setIsEmailVerified(false);
                            }
                          }}
                        />

                        {!isEmailVerified ? (
                          values.email === initialValues.email ? (
                            <Button
                              style={{ backgroundColor: 'white' }}
                              className="ml-2"
                              disabled
                            >
                              <i
                                className="fas fa-check-circle"
                                style={{ color: 'green' }}
                              ></i>
                            </Button>
                          ) : (
                            <Button
                              style={{ backgroundColor: color }}
                              className="ml-2 mx-2"
                              onClick={() => {
                                handleEmailOtpSend(values);
                              }}
                              disabled={
                                loading || !values.email || errors.email
                              }
                            >
                              {loading ? (
                                <>
                                  <Spinner animation="border" size="sm" />{' '}
                                  Verify...
                                </>
                              ) : (
                                'Verify'
                              )}
                            </Button>
                          )
                        ) : (
                          <Button
                            style={{ backgroundColor: 'white' }}
                            className="ml-2"
                            disabled={loading || !values.email || errors.email}
                          >
                            <i
                              className="fas fa-check-circle"
                              style={{ color: 'green' }}
                            ></i>
                          </Button>
                        )}
                        {/* {!isEmailVerified ? (
                          <Button
                            style={{ backgroundColor: color }}
                            className="ml-2 mx-2"
                            onClick={() => {
                              handleEmailOtpSend(values);
                            }}
                            disabled={loadingVerify}
                          >
                            {loadingVerify ? (
                              <>
                                <Spinner animation="border" size="sm" />{' '}
                                Verify...
                              </>
                            ) : (
                              'Verify'
                            )}
                          </Button>
                        ) : (
                          <Button
                            style={{ backgroundColor: 'white' }}
                            className="ml-2"
                            disabled
                          >
                            <i
                              className="fas fa-check-circle"
                              style={{ color: 'green' }}
                            ></i>
                          </Button>
                        )} */}
                      </div>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                    <Form.Group controlId="phone">
                      <Form.Label>
                        Phone Number <span className="text-danger">*</span>
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text>+91</InputGroup.Text>
                        <Field
                          name="phoneNumber"
                          type="text"
                          placeholder="Enter Your Phone Number"
                          className="form-control"
                          maxLength="10"
                        />
                      </InputGroup>
                      <ErrorMessage
                        name="phoneNumber"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>

                    <Form.Group controlId="message">
                      <Form.Label>
                        Message <span className="text-danger">*</span>
                      </Form.Label>
                      <Field
                        name="message"
                        as="textarea"
                        placeholder="Enter Your Message"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="message"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>

                    <Row className="justify-content-center mt-3">
                      <Col xs="auto">
                        <BasicButton
                          onClick={handleSubmit}
                          className="c-button c-hover"
                          type="submit"
                          style={{ backgroundColor: color, borderColor: color }}
                          isLoading={isLoading || isSubmitting}
                          disabled={isSubmitting}
                          label={'Submit'}
                        />
                      </Col>
                    </Row>
                    <Modal
                      show={showEmailOtpModal}
                      onHide={() => setShowEmailOtpModal(false)}
                      centered
                      size='md'
                    >
                      <Modal.Header closeButton>
                        <Modal.Title className="border-0 fs-5">Enter OTP</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form.Group>
                           <p>
                            We have sent an OTP to your email
                          
                        </p>
                        <p style={{fontSize:'13px'}}><strong className='text-wrap'>{values.email}</strong></p>
                         
                          <div className="d-flex justify-content-between mt-2">
                            {otpEmail.map((data, index) => (
                              <Form.Control
                                key={index}
                                type="text"
                                maxLength="1"
                                value={data}
                                onChange={(e) =>
                                  handleChangeEmail(e.target, index)
                                }
                                onKeyDown={(e) => handleKeyDownEmail(e, index)}
                                ref={(el) =>
                                  (inputEmailRefs.current[index] = el)
                                }
                                className="otp-input mx-1"
                                style={{
                                  width: '3rem',
                                  height: '3rem',
                                  margin: '0 0.5rem',
                                  fontSize: '1rem',
                                  borderRadius: 4,
                                  border: '1px solid rgba(0,0,0,0.3)',
                                  textAlign: 'center',
                                }}
                                centered
                              />
                            ))}
                          </div>
                          {otpError && (
                            <Form.Text className="text-danger">
                              Please enter the OTP.
                            </Form.Text>
                          )}
                        </Form.Group>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="secondary"
                          onClick={() => setShowEmailOtpModal(false)}
                        >
                          Close
                        </Button>

                        <BasicButton
                          className="c-button c-hover"
                          type="submit"
                          style={{ backgroundColor: color }}
                          isLoading={otpEmailLoader}
                          label={'Submit'}
                          onClick={() => handleEmailOtpSubmit(values)}
                          disabled={otpEmailLoader}
                        >
                          {otpEmailLoader ? (
                            <>
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                              />
                              Submiting OTP...
                            </>
                          ) : (
                            'Submit OTP'
                          )}
                        </BasicButton>
                      </Modal.Footer>
                    </Modal>
                  </Form>
                )}
              </Formik>
            </div>
          </Col>
        </Row>

        <SuccessModal
          showModal={showModal}
          setShowModal={setShowModal}
          successMessage={successMessage}
          error={errorLottie}
        />
      </Container>
    </>
  );
};

export default Contact;
