import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Nav,
  Form,
  Modal,
  Button,
  Spinner,
  Accordion,
  InputGroup,
} from 'react-bootstrap';
import Orders from './Orders';
import Addresses from './Addresses';
import {
  useDeleteProfileImageMutation,
  useGetUserDetailsQuery,
  useOtpSumbitEmailMutation,
  useUpdateUserPasswordMutation,
  useUpdateUserProfileMutation,
  useVerifyEmailOTPMutation,
  useVerifyOTPPasswordMutation,
} from '../../redux/api/ProfileOrdersApi';
import BasicButton from '../../components/BasicButton';
import Quotes from './Quotes';
import { ErrorMessage, Field, Formik } from 'formik';
import { ProfileSchema } from '../Profile/ProfileValidation';
import SuccessModal from '../../components/SuccessModal';
import FetchLoader from '../../components/FetchLoader';
import {
  MdCameraAlt,
  MdDelete,
  MdOutlineAddPhotoAlternate,
  MdPerson,
  MdShoppingBag,
} from 'react-icons/md';
import Cart from '../Cart/Cart';
import { BsChatRightQuoteFill } from 'react-icons/bs';
import { FaAddressCard, FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoMdCart } from 'react-icons/io';
import DeleteModel from '../../components/DeleteModel';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import LoginModal from '../Authentication/LoginModel';
import { useTheme } from '../../Contexts/ThemeContext';
import { useLoginMutation } from '../../redux/api/AuthApi';
import { removePrefix, truncateText } from '../../Constants/constant';

const Profile = () => {
  const { color } = useTheme();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('personal-info');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [isEditName, setIsEditName] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [isEditPhoneNumber, setIsEditPhoneNumber] = useState(false);
  const [updateUserProfile, { isLoading: updateLoader }] =
    useUpdateUserProfileMutation();
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageLink, setImageLink] = useState('');
  const [deleteShow, setDeleteShow] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailOtpModal, setShowEmailOtpModal] = useState(false);
  const [otp, setOtp] = useState(new Array(4).fill(''));
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpEmail, setOtpEmail] = useState(new Array(4).fill(''));
  const [otpError, setOtpError] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const inputRefs = useRef([]);
  const inputEmailRefs = useRef([]);
  const [loading, setLoading] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [verificationId, setVerificationId] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [showConfirmOtpModal, setShowConfirmOtpModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [errors, setErrors] = useState({});
  const [loginApi] = useLoginMutation();
  const [otpApi, { isLoading: otpLoader }] = useVerifyOTPPasswordMutation();
  const [otpEmailApi] = useVerifyEmailOTPMutation();
  const [otpEmailSubmitApi, { isLoading: otpEmailLoader }] =
    useOtpSumbitEmailMutation();

  const [updateUserPassword] = useUpdateUserPasswordMutation();

  const {
    data: userData,
    isLoading,
    isFetching,
  } = useGetUserDetailsQuery({
    phoneNumber: userPhoneNumber,
  });

  const [deleteProfileImage] = useDeleteProfileImageMutation();
  useEffect(() => {
    if (location.state && location.state.path) {
      setActiveSection(location.state.path);
    }
  }, [location.state]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const parsedToken = JSON.parse(storedToken);
      const phoneNumber = parsedToken.phoneNumber;
      setUserPhoneNumber(phoneNumber);
    }
  }, []);

  useEffect(() => {
    if (userData && userData.data) {
      setName(userData.data.userName ?? '');
      setEmail(userData.data.email ?? '');
      setImageLink(userData.data.profileImage ?? '');
    }
  }, [userData, name, email]);

  useEffect(() => {
    if (showOtpModal) {
      inputRefs.current[0]?.focus();
    }
  }, [showOtpModal]);

  useEffect(() => {
    if (showEmailOtpModal) {
      inputEmailRefs.current[0]?.focus();
    }
  }, [showEmailOtpModal]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setSelectedImage(file);
    }
  };

  const handleSubmit = async (values, { setSubmitting, setFieldValue }) => {
    const phoneNumberWithoutPrefix = userPhoneNumber.replace(/^(\+91)/, '');
    const newPhoneNumberWithoutPrefix = values.phoneNumber.replace(
      /^(\+91)/,
      ''
    );

    // Construct the request data based on which fields are being edited
    let requestData = { phoneNumber: phoneNumberWithoutPrefix };

    // Add name if editing the name
    if (isEditName) {
      requestData.userName = values.userName;
    }

    // Add email if editing the email
    if (isEditEmail) {
      requestData.email = values.email;
    }

    // Add new phone number if editing the phone number
    if (isEditPhoneNumber) {
      requestData.newPhoneNumber = newPhoneNumberWithoutPrefix;
    }

    try {
      const response = await updateUserProfile(requestData);

      if (response?.data) {
        // Update phone number in local state if phone number is edited
        if (isEditPhoneNumber) {
          setUserPhoneNumber(values.phoneNumber);
          setFieldValue('phoneNumber', values.phoneNumber);
        }

        // Show success message and reset editing states based on which field was edited
        if (isEditName) {
          toast.success(
            response?.data?.message || 'Name updated successfully',
            { autoClose: 1000 }
          );
          setIsEditName(false);
        }

        if (isEditEmail) {
          toast.success(
            response?.data?.message || 'Email updated successfully',
            { autoClose: 1000 }
          );
          setIsEditEmail(false);
        }

        if (isEditPhoneNumber) {
          toast.success(
            response?.data?.message || 'Phone number updated successfully',
            { autoClose: 1000 }
          );
          setIsEditPhoneNumber(false);
        }

        // Update token in local storage if needed
        localStorage.setItem(
          'token',
          JSON.stringify(response.data.userDetails)
        );
      } else {
        toast.error(response?.error?.data?.error || 'Error updating profile', {
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      toast.error('Failed to update profile', { autoClose: 1000 });
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = {
    userName: '',
    email: '',
  };

  const handleImageEdit = () => {
    setShowImageModal(true);
  };

  const handleUpdateImage = async () => {
    if (!selectedImage) return;

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('phoneNumber', userPhoneNumber);

      const response = await updateUserProfile(formData);

      if (response?.data) {
        setShowImageModal(false);
        setImageLink(response.data.profileImage);
        setPreviewImage('');
        toast.success(response?.data?.message, { autoClose: 1000 });
      } else {
        setShowImageModal(false);
        toast.error(response?.error?.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandleShow = () => {
    setShowImageModal(false);
    setDeleteShow(true);
  };

  const handleDeleteProfile = async () => {
    try {
      const response = await deleteProfileImage({
        phoneNumber: userPhoneNumber,
      });
      if (response?.data) {
        setImageLink('');
        setDeleteShow(false);
        setPreviewImage('');
        toast.success(response?.data?.message, { autoClose: 1000 });
      } else {
        setDeleteShow(false);
        toast.error(response?.error?.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandleClose = () => {
    setDeleteShow(false);
  };
  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);

  const handleOtpSend = async () => {
    const phoneNumberWithoutPrefix = userPhoneNumber.replace(/^(\+91)/, '');
    setLoading(true);
    try {
      const response = await loginApi({
        phoneNumber: phoneNumberWithoutPrefix,
      });

      if (response?.data) {
        setVerificationId(response.data?.data?.data.verificationId);
        setShowOtpModal(true);
        setShowConfirmOtpModal(false);
      } else {
        toast.error(response?.error.data.error, {
          position: 'bottom-center',
          autoClose: 1000,
        });
        setShowConfirmOtpModal(false);
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred', { autoClose: 1000 });
    } finally {
      setLoading(false);
      setShowConfirmOtpModal(false);
    }
  };

  const handleOtpSubmit = async () => {
    const phoneNumberWithoutPrefix = userPhoneNumber.replace(/^(\+91)/, '');

    true;
    try {
      const response = await otpApi({
        phoneNumber: phoneNumberWithoutPrefix,
        verificationId: verificationId,
        code: otp.join(''), // Joining the OTP array to form a single string
      }).unwrap();

      if (response?.data?.responseCode === 200) {
        setShowOtpModal(false);
        setShowPasswordModal(true);
        setOtp(new Array(4).fill(''));
      } else {
        setOtp(new Array(4).fill(''));
        toast.error(response?.data?.message || 'Failed to verify OTP', {
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred', { autoClose: 1000 });
    } finally {
      false;
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!newPassword) {
      newErrors.newPassword = 'Enter your new Password';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Enter your Confirm Password';
    }
    if (newPassword !== confirmPassword) {
      newErrors.newPassword = 'PassWord do not match';
      newErrors.confirmPassword = 'Confirm Password do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordSubmit = async () => {
    const phoneNumberWithoutPrefix = userPhoneNumber.replace(/^(\+91)/, '');

    if (!validateForm()) {
      return;
    }

    setLoadingPassword(true);
    try {
      const response = await updateUserPassword({
        phoneNumber: phoneNumberWithoutPrefix,
        password: newPassword,
        confirmPassword: confirmPassword,
      }).unwrap();

      if (response?.message) {
        toast.success(response.message, { autoClose: 1000 });
        setShowPasswordModal(false);
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast.error('Failed to change password', { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred', { autoClose: 1000 });
    } finally {
      setLoadingPassword(false);
    }
  };

  const isImageUploaded =
    imageLink?.length > 0 &&
    imageLink !==
      'https://p7.hiclipart.com/preview/636/702/321/computer-icons-user-profile-avatar-black-man.jpg';
  const showUploadButton = !isImageUploaded && selectedImage;
  const showChangeDeleteButtons =
    isImageUploaded || (selectedImage && !updateLoader);

  const handleEmailOtpSend = async (values) => {
    const phoneNumberWithoutPrefix = userPhoneNumber.replace(/^(\+91)/, '');
    setLoading(true);
    try {
      const response = await otpEmailApi({
        phoneNumber: phoneNumberWithoutPrefix,
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
      setShowConfirmOtpModal(false);
    }
  };

  const handleEmailOtpSubmit = async (values) => {
    if (otpEmail.length < 4) {
      setOtpError(true);
    }

    const phoneNumberWithoutPrefix = userPhoneNumber.replace(/^(\+91)/, '');
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
    <Container fluid>
      {isLoading ? (
        <FetchLoader />
      ) : (
        <Row className="mt-4">
          <Col lg={3} className={`${!userPhoneNumber ? 'd-none' : ''}`}>
            <Card className="mb-3 p-2">
              {userPhoneNumber ? (
                <Col className="d-flex flex-row gap-3 align-items-center">
                  <div className="position-relative">
                    <img
                      src={
                        imageLink?.length > 0
                          ? imageLink
                          : 'https://p7.hiclipart.com/preview/636/702/321/computer-icons-user-profile-avatar-black-man.jpg'
                      }
                      className="rounded-circle"
                      style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        border: `1px solid ${color}`,
                      }}
                      alt="profileImage"
                    />

                    <div
                      className="position-absolute d-flex p-1 justify-content-center pointer align-items-center"
                      style={{
                        bottom: '10px',
                        right: '10px',
                        transform: 'translate(50%, 50%)',
                        overflow: 'hidden',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      }}
                      onClick={handleImageEdit}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {imageLink?.length > 0 ? (
                          <MdCameraAlt size={16} color={'white'} />
                        ) : (
                          <MdOutlineAddPhotoAlternate
                            size={16}
                            color={'white'}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <Col
                    className="d-flex flex-column align-items-start"
                    style={{ maxWidth: '200px' }}
                  >
                    <span style={{ fontSize: '12px', fontWeight: 300 }}>
                      Hello
                    </span>
                    <p
                      style={{
                        margin: '0',
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        textWrap: 'wrap',
                        width: '70%',
                      }}
                    >
                      {truncateText(name, 25)}
                    </p>
                  </Col>
                </Col>
              ) : (
                <Button
                  size="sm"
                  variant="light"
                  onClick={openLoginModal}
                  style={{ backgroundColor: color }}
                >
                  <span className="main d-block text-light">Login</span>
                </Button>
              )}
            </Card>
            <Accordion className="d-lg-none mb-2">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  {activeSection === 'personal-info'
                    ? 'Profile Information'
                    : ''}
                  {activeSection === 'addresses' ? 'Addresses' : ''}
                  {activeSection === 'quotes' ? 'Quotes' : ''}
                  {activeSection === 'orders' ? 'Orders' : ''}
                  {activeSection === 'cart' ? 'Cart' : ''}
                </Accordion.Header>
                <Accordion.Body>
                  <Nav className="flex-column">
                    {userPhoneNumber ? (
                      <Nav.Item>
                        <Nav.Link
                          onClick={() => setActiveSection('personal-info')}
                          className={`nav-link ${activeSection === 'personal-info' ? 'active' : ''} text-nowrap d-flex flex-row flex-nowrap  w-100`}
                        >
                          <MdPerson
                            size={20}
                            className={`icon ${activeSection === 'personal-info' ? 'active' : ''}`}
                          />
                          <span
                            className={`nav-text ${activeSection === 'personal-info' ? 'active' : '' } text-nowrap`}
                          >
                            Personal Information
                          </span>
                        </Nav.Link>
                      </Nav.Item>
                    ) : (
                      <></>
                    )}

                    {userPhoneNumber ? (
                      <Nav.Item>
                        <Nav.Link
                          onClick={() => setActiveSection('addresses')}
                          className={`nav-link ${activeSection === 'addresses' ? 'active' : ''}`}
                        >
                          <FaAddressCard
                            size={20}
                            className={`icon ${activeSection === 'addresses' ? 'active' : ''}`}
                          />
                          <span
                            className={`nav-text ${activeSection === 'addresses' ? 'active' : ''}`}
                          >
                            Addresses
                          </span>
                        </Nav.Link>
                      </Nav.Item>
                    ) : (
                      <></>
                    )}
                    <Nav.Item>
                      <Nav.Link
                        onClick={() => setActiveSection('cart')}
                        className={`nav-link ${activeSection === 'cart' ? 'active' : ''}`}
                      >
                        <IoMdCart
                          size={20}
                          className={`icon ${activeSection === 'cart' ? 'active' : ''}`}
                        />
                        <span
                          className={`nav-text ${activeSection === 'cart' ? 'active' : ''}`}
                        >
                          Cart
                        </span>
                      </Nav.Link>
                    </Nav.Item>
                    {userPhoneNumber ? (
                      <Nav.Item>
                        <Nav.Link
                          onClick={() => setActiveSection('quotes')}
                          className={`nav-link ${activeSection === 'quotes' ? 'active' : ''}`}
                        >
                          <BsChatRightQuoteFill
                            size={20}
                            className={`icon ${activeSection === 'quotes' ? 'active' : ''}`}
                          />
                          <span
                            className={`nav-text ${activeSection === 'quotes' ? 'active' : ''}`}
                          >
                            Quotes
                          </span>
                        </Nav.Link>
                      </Nav.Item>
                    ) : (
                      <></>
                    )}
                    {userPhoneNumber ? (
                      <Nav.Item>
                        <Nav.Link
                          onClick={() => setActiveSection('orders')}
                          className={`nav-link ${activeSection === 'orders' ? 'active' : ''}`}
                        >
                          <MdShoppingBag
                            size={20}
                            className={`icon ${activeSection === 'orders' ? 'active' : ''}`}
                          />
                          <span
                            className={`nav-text ${activeSection === 'orders' ? 'active' : ''}`}
                          >
                            Orders
                          </span>
                        </Nav.Link>
                      </Nav.Item>
                    ) : (
                      <></>
                    )}
                  </Nav>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Card className="d-none d-lg-block p-0 m-0">
              <Card.Body>
                <Nav className="flex-column">
                  {userPhoneNumber ? (
                    <Nav.Item>
                      <Nav.Link
                        onClick={() => setActiveSection('personal-info')}
                        className={`nav-link ${activeSection === 'personal-info' ? 'active' : ''} text-nowrap d-flex flex-row flex-nowrap  w-100`}
                      >
                        <MdPerson
                          size={20}
                          className={`icon ${activeSection === 'personal-info' ? 'active' : ''}`}
                        />
                        <span
                          className={`nav-text ${activeSection === 'personal-info' ? 'active' : ''}`}
                        >
                          Personal Information
                        </span>
                      </Nav.Link>
                    </Nav.Item>
                  ) : (
                    <></>
                  )}

                  {userPhoneNumber ? (
                    <Nav.Item>
                      <Nav.Link
                        onClick={() => setActiveSection('addresses')}
                        className={`nav-link ${activeSection === 'addresses' ? 'active' : ''}`}
                      >
                        <FaAddressCard
                          size={20}
                          className={`icon ${activeSection === 'addresses' ? 'active' : ''}`}
                        />
                        <span
                          className={`nav-text ${activeSection === 'addresses' ? 'active' : ''}`}
                        >
                          Addresses
                        </span>
                      </Nav.Link>
                    </Nav.Item>
                  ) : (
                    <></>
                  )}
                  <Nav.Item>
                    <Nav.Link
                      onClick={() => setActiveSection('cart')}
                      className={`nav-link ${activeSection === 'cart' ? 'active' : ''}`}
                    >
                      <IoMdCart
                        size={20}
                        className={`icon ${activeSection === 'cart' ? 'active' : ''}`}
                      />
                      <span
                        className={`nav-text ${activeSection === 'cart' ? 'active' : ''}`}
                      >
                        Cart
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                  {userPhoneNumber ? (
                    <Nav.Item>
                      <Nav.Link
                        onClick={() => setActiveSection('quotes')}
                        className={`nav-link ${activeSection === 'quotes' ? 'active' : ''}`}
                      >
                        <BsChatRightQuoteFill
                          size={20}
                          className={`icon ${activeSection === 'quotes' ? 'active' : ''}`}
                        />
                        <span
                          className={`nav-text ${activeSection === 'quotes' ? 'active' : ''}`}
                        >
                          Quotes
                        </span>
                      </Nav.Link>
                    </Nav.Item>
                  ) : (
                    <></>
                  )}
                  {userPhoneNumber ? (
                    <Nav.Item>
                      <Nav.Link
                        onClick={() => setActiveSection('orders')}
                        className={`nav-link ${activeSection === 'orders' ? 'active' : ''}`}
                      >
                        <MdShoppingBag
                          size={20}
                          className={`icon ${activeSection === 'orders' ? 'active' : ''}`}
                        />
                        <span
                          className={`nav-text ${activeSection === 'orders' ? 'active' : ''}`}
                        >
                          Orders
                        </span>
                      </Nav.Link>
                    </Nav.Item>
                  ) : (
                    <></>
                  )}
                </Nav>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={userPhoneNumber ? 9 : 12}>
            <Card className="mt-1 p-3 ">
              {activeSection === 'personal-info' && (
                <Card.Body className="mb-4">
                  <Card.Title className="text-center text-nowrap">
                    Personal Information
                  </Card.Title>

                  <Col xs={12} lg={6} className='mt-3'>
                    <Formik
                      enableReinitialize
                      initialValues={{
                        userName: name || '',
                        email: email || '',

                        phoneNumber: removePrefix(userPhoneNumber) || '',
                      }}
                      validationSchema={ProfileSchema(
                        isEditName,
                        isEditEmail,
                        isEditPhoneNumber
                      )}
                      onSubmit={handleSubmit}
                    >
                      {({ handleSubmit, setFieldValue, values }) => (
                        <Form onSubmit={handleSubmit}>
                          {/* Username Section */}
                          <Form.Group controlId="userName">
                            <div className="d-flex justify-content-between align-items-center">
                              <Form.Label>
                                Name <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Label
                                onClick={() => {
                                  setIsEditName(!isEditName);
                                  setIsEditEmail(false);
                                  setIsEditPhoneNumber(false);
                                }}
                                style={{ cursor: 'pointer' }}
                              >
                                {isEditName ? 'Cancel' : 'Edit'}
                              </Form.Label>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                              <Field
                                type="text"
                                name="userName"
                                placeholder={
                                  isEditName ? 'Enter Your name' : ''
                                }
                                className="form-control"
                                readOnly={!isEditName}
                              />
                              {isEditName && (
                                <BasicButton
                                  size="md"
                                  label={'Save'}
                                  type="submit"
                                  isLoading={updateLoader}
                                />
                              )}
                            </div>
                            <ErrorMessage
                              name="userName"
                              component="div"
                              className="text-danger"
                            />
                          </Form.Group>
                          {/* Email Section */}
                          <Form.Group controlId="email" className="mt-3">
                            <div className="d-flex justify-content-between align-items-center">
                              <Form.Label>
                                Email <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Label
                                onClick={() => {
                                  setIsEditEmail(!isEditEmail);
                                  setIsEditName(false);
                                  setIsEditPhoneNumber(false);
                                }}
                                style={{ cursor: 'pointer' }}
                              >
                                {isEditEmail ? 'Cancel' : 'Edit'}
                              </Form.Label>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                              <Field
                                type="text"
                                name="email"
                                placeholder={
                                  isEditEmail ? 'Enter Your email' : ''
                                }
                                className="form-control"
                                readOnly={!isEditEmail}
                                onChange={(e) => {
                                  const value = e.target.value.toLowerCase();
                                  e.target.value = value;
                                  setFieldValue('email', value);
                                }}
                              />
                              {isEditEmail && !isEmailVerified ? (
                                <BasicButton
                                  size="md"
                                  label="Verify"
                                  type="button"
                                  onClick={() => {
                                    handleEmailOtpSend(values);
                                  }}
                                  isLoading={loading}
                                />
                              ) : isEditEmail && isEmailVerified ? (
                                <BasicButton
                                  size="md"
                                  label="Save"
                                  type="submit"
                                  isLoading={updateLoader}
                                />
                              ) : null}
                            </div>
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="text-danger mt-2"
                            />
                          </Form.Group>

                          {/* Phone Number Section */}
                          <Form.Group controlId="phoneNumber" className="mt-3">
                            <div className="d-flex justify-content-between align-items-center">
                              <Form.Label>
                                Phone number{' '}
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Label
                                onClick={() => {
                                  setIsEditPhoneNumber(!isEditPhoneNumber);
                                  setIsEditName(false);
                                  setIsEditEmail(false);
                                }}
                                style={{ cursor: 'pointer' }}
                              >
                                {isEditPhoneNumber ? 'Cancel' : 'Edit'}
                              </Form.Label>
                            </div>

                            <div className="d-flex align-items-center gap-2">
                              {isEditPhoneNumber ? (
                                <InputGroup>
                                  <InputGroup.Text
                                    className="input-group-prepend"
                                    style={{ fontSize: '14px', height: '40px' }}
                                  >
                                    +91
                                  </InputGroup.Text>
                                  <Field
                                    type="text"
                                    name="phoneNumber"
                                    placeholder="Enter your Mobile Number..."
                                    className="form-control"
                                    onInput={(e) => {
                                      const value = e.target.value.replace(
                                        /\D/g,
                                        ''
                                      );
                                      if (value.length <= 10) {
                                        e.target.value = value;
                                      } else {
                                        e.target.value = value.slice(0, 10);
                                      }
                                    }}
                                  />
                                </InputGroup>
                              ) : (
                                <InputGroup className="">
                                  <InputGroup.Text
                                    className="input-group-prepend"
                                    style={{ fontSize: '14px', height: '40px' }}
                                  >
                                    +91
                                  </InputGroup.Text>
                                  <Field
                                    type="text"
                                    name="phoneNumber"
                                    placeholder=""
                                    className="form-control"
                                    readOnly
                                  />
                                </InputGroup>
                              )}
                              {isEditPhoneNumber && (
                                <BasicButton
                                  size="md"
                                  label={'Save'}
                                  type="submit"
                                  isLoading={updateLoader}
                                />
                              )}
                            </div>

                            <ErrorMessage
                              name="phoneNumber"
                              component="div"
                              className="text-danger mt-2"
                            />
                          </Form.Group>

                          {/* Change Password Button */}
                          <div className="d-flex justify-content-end mt-2">
                            <Button
                              style={{
                                backgroundColor: color,
                                borderColor: color,
                              }}
                              onClick={() => setShowConfirmOtpModal(true)}
                              className="mt-3 justify-content-center"
                            >
                              Change Password
                            </Button>
                          </div>

                          <Modal
                            show={showEmailOtpModal}
                            onHide={() => setShowEmailOtpModal(false)}
                            centered
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Enter OTP</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <Form.Group>
                                <Form.Label>
                                  We have sent an OTP to your email:{' '}
                                  <strong>{values.email}</strong>
                                </Form.Label>
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
                                      onKeyDown={(e) =>
                                        handleKeyDownEmail(e, index)
                                      }
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
                  </Col>
                </Card.Body>
              )}

              {activeSection === 'quotes' && <Quotes />}
              {activeSection === 'orders' && <Orders />}
              {activeSection === 'addresses' && <Addresses />}
              {activeSection === 'cart' && <Cart />}
            </Card>
          </Col>
        </Row>
      )}

      {/* Image Upload Modal */}
      <Modal
        show={showImageModal}
        onHide={() => setShowImageModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Profile Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img
            src={
              previewImage ||
              imageLink ||
              'https://p7.hiclipart.com/preview/636/702/321/computer-icons-user-profile-avatar-black-man.jpg'
            }
            className="rounded-circle"
            style={{
              width: '60px',
              height: '60px',
              objectFit: 'cover',
              border: `1px solid ${color}`,
            }}
            alt="profileImage"
          />
          <Col className="mx-1">
            <Form>
              <Form.Group controlId="formFile" className="mt-3">
                <Form.Label>
                  Select Profile Image <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="file"
                  accept=".jpg,.jpeg,.png,.svg,.webp"
                  onChange={handleImageUpload}
                />
              </Form.Group>
            </Form>
          </Col>
          <Col>
            {(!imageLink || previewImage) && (
              <div>
                <Button
                  style={{ backgroundColor: color }}
                  disabled={!previewImage || updateLoader}
                  onClick={handleUpdateImage}
                  className="mt-4"
                >
                  {updateLoader ? (
                    <>
                      <Spinner size="sm" variant="light" className="mx-1" />
                      Upload Profile Image...
                    </>
                  ) : (
                    'Upload Profile Image'
                  )}
                </Button>
              </div>
            )}
            {imageLink && (
              <Col>
                <div>
                  <Button
                    style={{ backgroundColor: color }}
                    onClick={deleteHandleShow}
                    className="mt-3"
                  >
                    Delete Profile Image
                  </Button>
                </div>
              </Col>
            )}
          </Col>
        </Modal.Body>
      </Modal>
      <LoginModal show={isLoginOpen} handleClose={closeLoginModal} />
      <DeleteModel
        YES={handleDeleteProfile}
        DELETESTATE={deleteShow}
        ONCLICK={deleteHandleClose}
        DESCRIPTION="Are you sure want to delete Your Profile Image"
        DELETETITLE="Delete Profile"
      />

      {/* otp modal */}
      <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Enter OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>
              Enter the OTP sent to {userPhoneNumber} Number
            </Form.Label>
            <div className="d-flex justify-content-between">
              {otp.map((data, index) => (
                <Form.Control
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
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
          <Button variant="secondary" onClick={() => setShowOtpModal(false)}>
            Close
          </Button>

          <BasicButton
            className="c-button c-hover"
            type="submit"
            style={{ backgroundColor: color }}
            isLoading={otpLoader}
            label={'Submit'}
            onClick={handleOtpSubmit}
            disabled={otpLoader}
          >
            {otpLoader ? (
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

      {/* password modal */}
      <Modal
        show={showPasswordModal}
        onHide={() => setShowPasswordModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newPassword" className="mt-3">
              <Form.Label>
                New Password <span className="text-danger">*</span>
              </Form.Label>
              <div className="input-group">
                <Form.Control
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Enter new Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  isInvalid={!!errors.newPassword}
                />
                <Button
                  variant="outline-secondary"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                </Button>
                <Form.Control.Feedback type="invalid">
                  {errors.newPassword}
                </Form.Control.Feedback>
              </div>
            </Form.Group>
            <Form.Group controlId="confirmPassword" className="mt-3 mb-3">
              <Form.Label>
                Confirm Password <span className="text-danger">*</span>
              </Form.Label>
              <div className="input-group">
                <Form.Control
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  placeholder="Enter new Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  isInvalid={!!errors.confirmPassword}
                />
                <Button
                  variant="outline-secondary"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {confirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                </Button>
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowPasswordModal(false)}
          >
            Close
          </Button>
          <Button
            style={{ backgroundColor: color }}
            onClick={handlePasswordSubmit}
            disabled={loadingPassword}
          >
            {loadingPassword ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Change Password...
              </>
            ) : (
              'Change Password'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Send OTP Modal */}
      <Modal
        show={showConfirmOtpModal}
        onHide={() => setShowConfirmOtpModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Send OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to send an OTP to this number {userPhoneNumber}?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmOtpModal(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleOtpSend}
            style={{ backgroundColor: color, border: 'none' }}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Confirm...
              </>
            ) : (
              ' Confirm'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Profile;
