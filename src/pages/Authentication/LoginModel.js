import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Form, InputGroup, Col, Spinner } from 'react-bootstrap';
import OtpInput from './OtpInput';
import Paragraph from '../../components/paragraph';
import {
  useCreateAccountMutation,
  useLoginMutation,
  useVerifyOTPMutation,
} from '../../redux/api/AuthApi';
import {
  useOtpSumbitEmailMutation,
  useVerifyEmailOTPMutation,
} from '../../redux/api/ProfileOrdersApi';
import { toast } from 'react-toastify';
import { useAddCartLocalDataMutation } from '../../redux/api/UserCartApi';
import { clearCart, getAllItemsInCart } from '../../utils/CartStorage';
import ComingSoonModal from '../../components/ComingSoonModal';
import { AccountCreationSchema, LoginSchema } from './validationSchema';
import { ErrorMessage, Field, Formik, Form as FormikForm } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import BasicButton from '../../components/BasicButton';
import { useTheme } from '../../Contexts/ThemeContext';

const LoginModal = ({ show, handleClose }) => {
  const { color } = useTheme();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [error, setError] = useState('');
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [accountModel, setAccountModel] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const [shown, setShown] = useState(false);
  const [modalText, setModalText] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpEmail, setOtpEmail] = useState(new Array(4).fill(''));
  const inputEmailRefs = useRef([]);
  const [showEmailOtpModal, setShowEmailOtpModal] = useState(false);
  const [otpError, setOtpError] = useState(false);

  const [loginApi, { isLoading }] = useLoginMutation();
  const [otpApi, { isLoading: otpLoader }] = useVerifyOTPMutation();
  const [AddToCart] = useAddCartLocalDataMutation();
  const [CreateAccount, { isLoading: accountLoader }] =
    useCreateAccountMutation();

  const [otpEmailApi] = useVerifyEmailOTPMutation();
  const [otpEmailSubmitApi, { isLoading: otpEmailLoader }] =
    useOtpSumbitEmailMutation();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (showEmailOtpModal) {
      inputEmailRefs.current[0]?.focus();
    }
  }, [showEmailOtpModal]);

  const handleValidation = async () => {
    if (validatePhoneNumber(phoneNumber)) {
      await handleLogin();
    } else {
      setError('Please enter a valid 10-digit phone number.');
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleLogin = async () => {
    try {
      const response = await loginApi({ phoneNumber: phoneNumber });

      if (response?.data) {
        setVerificationId(response.data?.data?.data.verificationId);
        setIsPhoneVerified(true);
        setTimer(59);
      } else {
        toast.error(response?.error.data.error, {
          position: 'bottom-center',
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred', { autoClose: 1000 });
    }
  };
  const handleAddToCart = async (phoneNumber) => {
    const { cart } = getAllItemsInCart();
    const data = {
      phoneNumber: phoneNumber,
      products: cart || [],
    };
    try {
      const response = await AddToCart({ data: data });
      if (response?.data) {
        clearCart();
        setPhoneNumber('');
      } else {
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred', { autoClose: 1000 });
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length === 4) {
      await handleOtp();
    } else {
      setError('Please enter a valid 4-digit OTP.');
    }
  };

  const handleOtp = async () => {
    try {
      const response = await otpApi({
        phoneNumber: phoneNumber,
        verificationId: verificationId,
        code: otp,
        loginMethod: 'otp',
      });
      if (response?.data?.data.responseCode === 200) {
        localStorage.setItem(
          'token',
          JSON.stringify(response.data.userDetails)
        );
        setLoginForm(false);
        handleClose();
        setIsPhoneVerified(false);
        toast.success('Login Successfully', {
          position: 'bottom-center',
          autoClose: 1000,
        });
        await handleAddToCart(phoneNumber);
        setOtp('');
        setVerificationId('');
        setPhoneNumber('');
        window.location.reload();
      } else {
        toast.error(response?.data.data.message || 'Failed to verify OTP', {
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred', { autoClose: 1000 });
    }
  };
  const handlePassword = async (values, { resetForm }) => {
    try {
      const response = await otpApi({
        phoneNumber: values.phoneNumber.toString(),
        password: values.password,
        loginMethod: 'password',
      });
      if (response?.data?.data.responseCode === 200) {
        localStorage.setItem(
          'token',
          JSON.stringify(response.data.userDetails)
        );

        setLoginForm(false);
        handleClose();
        setIsPhoneVerified(false);
        toast.success('Login Successfully', {
          position: 'bottom-center',
          autoClose: 1000,
        });
        await handleAddToCart(values.phoneNumber.toString());
        window.location.reload();
        resetForm();
      } else {
        toast.error(response?.error.data.error, {
          position: 'bottom-center',
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred', { autoClose: 1000 });
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setOtp('');
    await handleLogin();
  };
  const handleCreateAccount = async (values, { resetForm }) => {
    if (!isEmailVerified) {
      toast.error('Please verify your email before submitting', {
        position: 'bottom-center',
        autoClose: 1000,
      });
      return; 
    }
   
    try {
      const response = await CreateAccount({
        phoneNumber: values.phoneNumber.toString(),
        email: values.email,
        dob: values.dob,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
      if (response?.data) {
        toast.success(response?.data?.message, {
          position: 'bottom-center',
          autoClose: 1000,
        });
        setAccountModel(false);
        resetForm();
      } else {
        resetForm();
        toast.error(response?.error?.data.error, {
          position: 'bottom-center',
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred', {
        position: 'bottom-center',
        autoClose: 1000,
      });
    }
  };
  const validatePhoneNumber = (number) => /^[6-9]\d{9}$/.test(number);

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    const numericInput = input.replace(/[^0-9]/g, '').slice(0, 10);
    setPhoneNumber(numericInput);
    if (error) setError('');
  };

  const handleOtpChange = (otp) => {
    setOtp(otp);
    if (error) setError('');
  };
  const handleShow = (text) => {
    setModalText(text);
    setShown(true);
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
    setLoading(true);
    if (values.phoneNumber.length < 10 ){
      toast.error('Please enter valid PhoneNumber', {
        position: 'bottom-center',
        autoClose: 1000,
      });
    }
    try {
      const response = await otpEmailApi({
        phoneNumber: values.phoneNumber.toString(),
        email: values.email,
      });

      if (response?.data) {
        setShowEmailOtpModal(true);
      } else {
        toast.error(response?.error.data.error, {
          position: 'bottom-center',
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred', { autoClose: 1000 });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailOtpSubmit = async (values) => {
    if (otpEmail.length < 4) {
      setOtpError(true);
    }
    const phoneNumberWithoutPrefix = phoneNumber.replace(/^(\+91)/, '');
    setLoading(true);
    try {
      const response = await otpEmailSubmitApi({
        phoneNumber: values.phoneNumber.toString(),
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
      {' '}
      <Modal
        show={show}
        onHide={() => {
          handleClose();
          setPhoneNumber('');
          setError('');
          setOtp('');
          setAccountModel(false);
          setLoginForm(false);
          setIsPhoneVerified(false);
        }}
        centered
      >
        <Modal.Header className="border-0 " closeButton>
          {accountModel ? (
            <Modal.Title className="border-0 fs-5">Create Account</Modal.Title>
          ) : (
            <>
              {' '}
              {!isPhoneVerified ? (
                <Modal.Title className="border-0 fs-5">
                  Login/SignIn
                </Modal.Title>
              ) : null}
            </>
          )}
        </Modal.Header>
        <Modal.Body
          className="py-0"
          style={{ maxHeight: '400px', overflowY: 'scroll' }}
        >
          <>
            {accountModel ? (
              <Formik
                initialValues={{
                  phoneNumber: '',
                  email: '',
                  dob: '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={AccountCreationSchema}
                onSubmit={(values, { resetForm }) => {
                  handleCreateAccount(values, { resetForm });
                }}
              >
                {({ errors, touched, handleSubmit, values ,setFieldValue }) => (
                  <Form>
                    <Form.Group controlId="formPhoneNumber" className="mb-2 ">
                      <Form.Label>
                        Phone Number <span className="text-danger">*</span>
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text>+91</InputGroup.Text>
                        <Field
                          type="number"
                          name="phoneNumber"
                          placeholder="Enter your phone number"
                          className={`form-control ${errors.phoneNumber && touched.phoneNumber ? 'is-invalid' : ''}`}
                          maxLength="10"
                          onInput={(e) => {
                            if (e.target.value.length > 10) {
                              e.target.value = e.target.value.slice(0, 10);
                            }
                          }}
                        />
                      </InputGroup>
                      <ErrorMessage
                        name="phoneNumber"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                   <Form.Group controlId="formEmail" className="mb-2">
  <Form.Label>
    Email <span className="text-danger">*</span>
  </Form.Label>
  <div className="d-flex">
    <Field
      type="email"
      name="email"
      placeholder="Enter your email address"
      className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
      onChange={(e) => {
        const value = e.target.value.toLowerCase();
        e.target.value = value; 
        setFieldValue('email', value);
      }}
    />
    {!isEmailVerified ? (
      <Button
        style={{ backgroundColor: color }}
        className="ml-2 mx-2"
        onClick={() => handleEmailOtpSend(values)}
        disabled={loading || !values.email || errors.email} 
      >
        {loading ? (
          <>
            <Spinner animation="border" size="sm" /> Verify...
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
    )}
  </div>
  <ErrorMessage
    name="email"
    component="div"
    className="text-danger"
  />
</Form.Group>


                    <Form.Group controlId="formDob" className="mb-2 ">
                      <Form.Label>
                        Date of Birth <span className="text-danger">*</span>
                      </Form.Label>
                      <Field
                        type="date"
                        name="dob"
                        className={`form-control ${errors.dob && touched.dob ? 'is-invalid' : ''}`}
                      />
                      <ErrorMessage
                        name="dob"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mb-2 ">
                      <Form.Label>
                        Password <span className="text-danger">*</span>
                      </Form.Label>
                      <InputGroup>
                        <Field
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          placeholder="Enter your password"
                          className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                        />
                        <InputGroup.Text
                          onClick={togglePasswordVisibility}
                          style={{ cursor: 'pointer' }}
                        >
                          {!showPassword ? <FaEyeSlash /> : <FaEye />}
                        </InputGroup.Text>
                      </InputGroup>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>

                    <Form.Group
                      controlId="formConfirmPassword"
                      className="mb-2 "
                    >
                      <Form.Label>
                        Confirm Password <span className="text-danger">*</span>
                      </Form.Label>
                      <InputGroup>
                        <Field
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          placeholder="Enter your confirm password "
                          className={`form-control ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''}`}
                        />
                        <InputGroup.Text
                          onClick={toggleConfirmPasswordVisibility}
                          style={{ cursor: 'pointer' }}
                        >
                          {!showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </InputGroup.Text>
                      </InputGroup>
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                    <p className="text-center p-0 mt-3">
                      Already have an account?{' '}
                      <span
                        className="text-underline text-primary pointer"
                        onClick={() => {
                          setAccountModel(false);
                        }}
                      >
                        Login
                      </span>
                    </p>

                    <Modal.Footer>
                      <BasicButton
                        onClick={handleSubmit}
                        className="bg-main w-100 px-3 py-1 my-3"
                        label="Create"
                        isLoading={accountLoader}
                      />
                    </Modal.Footer>

                    <Modal
                      show={showEmailOtpModal}
                      onHide={() => setShowEmailOtpModal(false)}
                      centered
                      size='sm'
                    >
                      <Modal.Header closeButton>
                        <Modal.Title className="border-0 fs-5">Enter OTP</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                         <p>
                            We have sent an OTP to your email
                          
                        </p>
                        <p style={{fontSize:'13px'}}><strong className='text-wrap'>{values.email}</strong></p>
                        <Form.Group>
                         
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
            ) : (
              <>
                {!loginForm ? (
                  <Formik
                    initialValues={{
                      phoneNumber: '',
                      password: '',
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={(values, { resetForm }) => {
                      handlePassword(values, { resetForm });
                    }}
                  >
                    {({ errors, touched, handleSubmit }) => (
                      <FormikForm>
                        <Form.Group controlId="formPhoneNumber">
                          <Form.Label>
                            Phone Number <span className="text-danger">*</span>
                          </Form.Label>
                          <InputGroup>
                            <InputGroup.Text>+91</InputGroup.Text>
                            <Field
                              type="number"
                              name="phoneNumber"
                              placeholder="Enter your phone number"
                              className={`form-control ${errors.phoneNumber && touched.phoneNumber ? 'is-invalid' : ''}`}
                              maxLength="10"
                              onInput={(e) => {
                                if (e.target.value.length > 10) {
                                  e.target.value = e.target.value.slice(0, 10);
                                }
                              }}
                            />
                          </InputGroup>
                          <ErrorMessage
                            name="phoneNumber"
                            component="div"
                            className="text-danger"
                          />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mt-2">
                          <Form.Label>
                            Password <span className="text-danger">*</span>
                          </Form.Label>
                          <InputGroup>
                            <Field
                              type={showPassword ? 'text' : 'password'}
                              name="password"
                              placeholder="Enter your password"
                              className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                            />
                            <InputGroup.Text
                              onClick={togglePasswordVisibility}
                              style={{ cursor: 'pointer' }}
                            >
                              {!showPassword ? <FaEyeSlash /> : <FaEye />}
                            </InputGroup.Text>
                          </InputGroup>
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-danger"
                          />
                        </Form.Group>
                        <p className="text-center p-0 mt-3">
                          Don't have an account?{' '}
                          <span
                            className="text-underline text-primary pointer"
                            onClick={() => {
                              setAccountModel(true);
                            }}
                          >
                            Create
                          </span>
                        </p>

                        <Modal.Footer className="p-0 m-0">
                          <p className="text-center p-0 mt-3">
                            <span
                              className="text-underline text-primary pointer"
                              onClick={() => {
                                setAccountModel(false);
                                setLoginForm(true);
                              }}
                            >
                              Login with OTP
                            </span>
                          </p>

                          <BasicButton
                            onClick={handleSubmit}
                            className="bg-main w-100 px-3 py-1 my-4"
                            label="Sign In"
                            isLoading={otpLoader}
                          />
                        </Modal.Footer>
                      </FormikForm>
                    )}
                  </Formik>
                ) : (
                  <Form>
                    {!isPhoneVerified ? (
                      <>
                        <Form.Group controlId="formPhoneNumber">
                          <Form.Label>
                            Enter Phone Number{' '}
                            <span className="text-danger">*</span>
                          </Form.Label>
                          <InputGroup>
                            <InputGroup.Text className="input-group-prepend">
                              +91
                            </InputGroup.Text>
                            <Form.Control
                              className="mb-2 input-group-text-control"
                              type="number"
                              placeholder="Enter your phone number"
                              value={phoneNumber}
                              onChange={handlePhoneChange}
                              maxLength="10"
                            />
                          </InputGroup>
                          {error && (
                            <Form.Text className="text-danger">
                              {error}
                            </Form.Text>
                          )}
                        </Form.Group>
                        <p className="text-center p-0 mt-3">
                          Don't have an account?{' '}
                          <span
                            className="text-underline text-primary pointer"
                            onClick={() => {
                              setAccountModel(true);
                            }}
                          >
                            Create
                          </span>
                        </p>
                      </>
                    ) : (
                      <Col>
                        <Paragraph
                          className="text-underline pointer"
                          fontSize="15px"
                          fontWeight={400}
                          onClick={() => {
                            setIsPhoneVerified(false);
                            setOtp('');
                          }}
                        >
                          Edit number
                        </Paragraph>
                        <Paragraph fontSize="14px">
                          We have sent you a 4-digit code on +91 {phoneNumber}
                        </Paragraph>
                        <Form.Group controlId="formOtp">
                          <Form.Label>
                            Enter OTP here{' '}
                            <span className="text-danger">*</span>
                          </Form.Label>
                          <OtpInput
                            numInputs={4}
                            value={otp}
                            onChange={handleOtpChange}
                          />
                          {error && (
                            <Form.Text className="text-danger">
                              {error}
                            </Form.Text>
                          )}
                        </Form.Group>
                        {timer > 0 ? (
                          <Paragraph
                            className="text-center mt-3"
                            fontSize="15px"
                            fontWeight={400}
                          >
                            Resend code in {timer}s
                          </Paragraph>
                        ) : (
                          <Paragraph
                            className="main pointer text-center mt-3"
                            fontSize="15px"
                            fontWeight={400}
                            onClick={handleResendOtp}
                          >
                            Resend code
                          </Paragraph>
                        )}
                      </Col>
                    )}
                  </Form>
                )}

                {!loginForm ? null : (
                  <Modal.Footer>
                    {!phoneNumber ? (
                      <p className="text-center p-0 mt-3">
                        <span
                          className="text-underline text-primary pointer"
                          onClick={() => {
                            setLoginForm(false);
                          }}
                        >
                          Login with Password
                        </span>
                      </p>
                    ) : null}
                    {!isPhoneVerified ? (
                      <Button
                        className="w-100"
                        style={{ background: color, borderColor: color }}
                        onClick={handleValidation}
                      >
                        {isLoading ? (
                          <Spinner size="sm" color="light" />
                        ) : (
                          'Proceed'
                        )}
                      </Button>
                    ) : (
                      <Button
                        className="w-100"
                        style={{ background: color, borderColor: color }}
                        onClick={handleVerifyOtp}
                      >
                        {otpLoader ? (
                          <Spinner size="sm" color="light" />
                        ) : (
                          'Sign up'
                        )}
                      </Button>
                    )}
                  </Modal.Footer>
                )}
              </>
            )}
          </>
        </Modal.Body>
      </Modal>
      <ComingSoonModal
        show={shown}
        handleClose={() => setShown(false)}
        text={modalText}
      />
    </>
  );
};

export default LoginModal;
