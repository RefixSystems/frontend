import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Image,
  Spinner,
  Form,
  Modal,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import {
  useCartCheckoutMutation,
  useGetCartQuery,
  useRemoveCartMutation,
  useUpdateCartMutation,
  useVerifyCouponMutation,
} from '../../redux/api/UserCartApi';
import FetchLoader from '../../components/FetchLoader';
import CustomPagination from '../../components/CustomPagination';
import { Heading } from '../../components/Heading';
import SuccessModal from '../../components/SuccessModal';
import BasicButton from '../../components/BasicButton';
import { ErrorMessage, Field, Formik } from 'formik';
import LoginModal from '../Authentication/LoginModel';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { VscVerifiedFilled } from 'react-icons/vsc';
import Lottie from 'react-lottie';
import cartNotFound from '../../assests/json/cartNoData.json';
import Laptop from '../../assests/images/laptop.webp';
import {
  deleteItemFromCart,
  getAllItemsInCart,
  updateItemInCart,
} from '../../utils/CartStorage';
import { useNavigate } from 'react-router-dom';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { useTheme } from '../../Contexts/ThemeContext';
import { removePrefix } from '../../Constants/constant';
import { CiDiscount1 } from 'react-icons/ci';
import {
  FaShoppingCart,
  FaRupeeSign,
  FaTools,
  FaCheckSquare,
  FaCheck,
} from 'react-icons/fa';
import {
  useOtpSumbitEmailMutation,
  useVerifyEmailOTPMutation,
} from '../../redux/api/ProfileOrdersApi';
import { useSendPinCodeMutation } from '../../redux/api/OrdersApi';
const Cart = () => {
  const { color } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cartId, setCartId] = useState('');
  const [totalItems, setTotalItems] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState([]);
  const [pinCode, setPinCode] = useState('');
  const [couponAmount, setCouponAmount] = useState(0);
  const [initialAmount, setInitialAmount] = useState(0);
  const [gSTAmount, setGSTAmount] = useState(0);
  const [data, setData] = useState([]);
  const [rentalCarousel, setRentalCarousel] = useState(null);
  const [refurbishedCarousel, setRefurbishedCarousel] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorLottie, setErrorLottie] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [coupon, setCoupon] = useState('');
  const [showFormModal, setShowFormModal] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [razorPaySecretKey, setRazorPaySecretKey] = useState('');
  const [razorPayKey, setRazorPayKey] = useState('');
  const [removingProductId, setRemovingProductId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('onlinePayment');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPinCodeVerified, setIsPinCodeVerified] = useState(false);
  const [loadingPin, setLoadingPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpEmail, setOtpEmail] = useState(new Array(4).fill(''));
  const inputEmailRefs = useRef([]);
  const [showEmailOtpModal, setShowEmailOtpModal] = useState(false);
  const [otpError, setOtpError] = useState(false);

  const navigate = useNavigate();
  const {
    data: CartData,
    isLoading,
    refetch,
  } = useGetCartQuery({
    currentPage: currentPage,
    phoneNumber: phoneNumber,
  });
  const [removeProduct, { isLoading: removeLoader }] = useRemoveCartMutation();
  const [updateProduct, { isLoading: quantityLoader }] =
    useUpdateCartMutation();
  const [Checkout, { isLoading: checkoutLoader }] = useCartCheckoutMutation();
  const [VerifyCoupon, { isLoading: couponLoader }] = useVerifyCouponMutation();
  const [otpEmailApi] = useVerifyEmailOTPMutation();
  const [otpEmailSubmitApi, { isLoading: otpEmailLoader }] =
    useOtpSumbitEmailMutation();
  const [pinCodeApi] = useSendPinCodeMutation();

  useEffect(() => {
    if (showEmailOtpModal) {
      inputEmailRefs.current[0]?.focus();
    }
  }, [showEmailOtpModal]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const secretKey = localStorage.getItem('razorPaySecretKey');
    const payKey = localStorage.getItem('razorPayKey');
    if (storedToken) {
      const { phoneNumber } = JSON.parse(storedToken);
      setPhoneNumber(phoneNumber);
    }
    if (secretKey) {
      setRazorPaySecretKey(secretKey);
    }
    if (payKey) {
      setRazorPayKey(payKey);
    }
  }, []);

  useEffect(() => {
    setData([]);
    setCartId();
    setTotalPage(1);
    setItemsPerPage(10);
    setTotalItems(0);
    setCouponAmount(0);
    setTotalAmount(0);
    setInitialAmount(0);
    setGSTAmount(0);
    setUserName();
    setEmail();
    setAddress([]);
    if (phoneNumber) {
      if (CartData && CartData.data) {
        setData(CartData.data || []);
        setCartId(CartData.cartId || '');
        setTotalPage(CartData.pagination?.totalPages || 1);
        setItemsPerPage(CartData.pagination?.itemsPerPage || 10);
        setTotalItems(CartData.pagination?.totalItems || 0);
        setUserName(CartData.userName || '');
        setEmail(CartData.email || '');
        setAddress(CartData.address || []);
        localStorage.setItem('rental', JSON.stringify(CartData.rentalCarousel));
        localStorage.setItem(
          'refurbished',
          JSON.stringify(CartData.refurbishedCarousel)
        );

        if (CartData.totalAmount) {
          setTotalAmount(CartData.totalAmount || 0);
          setCouponAmount(CartData.totalAmount || 0);
          setInitialAmount(CartData.totalAmountBeforeGST || 0);
          setGSTAmount(CartData.GST || 0);
        }
      } else {
        setData([]);
      }
    } else {
      const { cart } = getAllItemsInCart();
      if (Array.isArray(cart)) {
        const totalItemsCount = cart.length;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedData = cart.slice(startIndex, startIndex + itemsPerPage);
        const repairTotalAmount = cart
          .filter((item) => item.type === 'Repair')
          .reduce((acc, item) => acc + (item.amount || 0), 0);
        setData(paginatedData);
        setCartId('');
        setTotalPage(Math.ceil(totalItemsCount / itemsPerPage));
        setItemsPerPage(itemsPerPage);
        setTotalItems(totalItemsCount);
        setTotalAmount(repairTotalAmount);
        setCouponAmount(0);
        setInitialAmount(0);
        setGSTAmount(0);
      } else {
        console.error('Local data is not an array:', cart);
        setData([]);
        setTotalPage(1);
        setTotalItems(0);
      }
    }
  }, [CartData, currentPage, phoneNumber, removingProductId]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [refetch]);
  useEffect(() => {
    const storedRentalCarousel = localStorage.getItem('rental');
    const storedRefurbishedCarousel = localStorage.getItem('refurbished');

    if (storedRentalCarousel) {
      setRentalCarousel(JSON.parse(storedRentalCarousel));
    }
    if (storedRefurbishedCarousel) {
      setRefurbishedCarousel(JSON.parse(storedRefurbishedCarousel));
    }
  }, []);

  const primaryAddress =
    address.find((addr) => addr.primaryAddress)?.address || '';

  const initialValues = {
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
    pinCode: '',
    aphoneNumber: '',
    paymentMethod: '',
    termsAndConditions: false,
  };
  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, 'Full Name must be at least 2 characters')
      .max(50, 'Full Name must be at most 50 characters')
      .required('Full Name is required'),
    phoneNumber: Yup.string()
      .matches(/^[6-9][0-9]{9}$/, 'Invalid phone number format')
      .required('Phone Number is required'),
    email: Yup.string()
      .email('Invalid email format')
      .matches(
        /^[a-zA-Z0-9._%+-]+[0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
        'Invalid email format'
      )
      .required('Email is required'),
    address: Yup.string()
      .min(10, 'Address must be at least 10 characters')
      .max(200, 'Address must be at most 200 characters')
      .required('Address is required'),
    pinCode: Yup.string()
      .min(6, 'Pin Code must be at least 6 characters')
      .max(6, 'Pin Code must be at most 6 characters')
      .required('Pin Code is required'),
    termsAndConditions: Yup.boolean()
      .oneOf([true], 'Must Accept Terms and Conditions')
      .required('Must Accept Terms and Conditions'),
  });
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  const options = {
    loop: true,
    autoplay: true,
    animationData: cartNotFound,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const renderIssues = (issue) => {
    if (!issue) return null;
    const issues = issue.split(',').map((i) => i.trim());
    return (
      <>
        {issues.map((i, index) => (
          <div key={index} style={{ marginLeft: '5px' }}>
            {i}
            {index < issues.length - 1 && ','}
          </div>
        ))}
      </>
    );
  };
  const handleRazorPay = async (values, { resetForm }) => {
    if (!isEmailVerified) {
      toast.error('Please verify your email before submitting', {
        position: 'bottom-center',
        autoClose: 1000,
      });
      return;
    }
    if (!isPinCodeVerified) {
      toast.error('Please verify Pin Code before submitting', {
        position: 'bottom-center',
        autoClose: 1000,
      });
      return;
    }
    const fullAddress = `${values.address} - ${values.pinCode}`;

    var options = {
      key: razorPayKey,
      key_secret: razorPaySecretKey,
      amount: couponAmount * 100,
      currency: 'INR',
      name: 'Refix System',
      description: 'Refix System Laptop Services',
      handler: function (response) {
        handleSubmit(
          values,
          { resetForm },
          response.razorpay_payment_id,
          couponAmount,
          'onlinePayment'
        );
      },

      prefill: {
        name: values.fullName,
        email: values.email,
        phone: values.phoneNumber,
        address: fullAddress,
        city: values.city,
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };
    try {
      var pay = new window.Razorpay(options);
      pay.open();
    } catch (error) {
      console.error('Error initializing Razorpay:', error);
    }
  };
  const handleVerifyCoupon = async () => {
    const data = {
      phoneNumber: phoneNumber,
      coupon: coupon.toUpperCase(),
    };
    try {
      const response = await VerifyCoupon({ data: data });
      if (response?.data) {
        setCouponAmount(response?.data?.payableAmount);
        setInitialAmount(response?.data?.totalAmountBeforeGST);
        setGSTAmount(response?.data?.GST);
        setShowVerify(true);
        toast.success(response?.data?.message, {
          autoClose: 2000,
          position: 'bottom-center',
        });
      } else {
        setShowVerify(false);
        toast.error(response?.error?.data.error, {
          autoClose: 2000,
          position: 'bottom-center',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (
    values,
    { resetForm },
    transactionId,
    amount,
    paymentType
  ) => {
    if (!isEmailVerified) {
      toast.error('Please verify your email before submitting', {
        position: 'bottom-center',
        autoClose: 1000,
      });
      return;
    }
    if (!isPinCodeVerified) {
      toast.error('Please verify Pin Code before submitting', {
        position: 'bottom-center',
        autoClose: 1000,
      });
      return;
    }
    const fullAddress = `${values.address} - ${values.pinCode}`;

    const data = {
      userName: values.fullName,
      phoneNumber: phoneNumber,
      address: fullAddress,
      email: values.email,
      transactionId: transactionId,
      amount: amount,
      coupon: coupon,
      alternatePhoneNumber: values.aphoneNumber,
      initialAmountPaidThrough: paymentType,
      GST: gSTAmount,
    };
    try {
      const response = await Checkout({ id: cartId, data: data });
      if (response?.data) {
        setShowFormModal(false);
        setErrorLottie(false);
        setSuccessMessage(response?.data?.message);
        setData([]);
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          window.location.reload();
        }, 2000);
        setCartId('');
        setTotalAmount(0);
        setCoupon('');
        setPinCode('');
        setCouponAmount(0);
        setInitialAmount(0);
        setGSTAmount(0);
        resetForm();
      } else {
        setShowFormModal(false);
        setErrorLottie(true);
        setSuccessMessage(response?.error?.data.error);
        setShowModal(true);
        setTimeout(() => setShowModal(false), 4000);
        resetForm();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleRemoveProduct = async (productId) => {
    setRemovingProductId(productId);
    try {
      const response = await removeProduct({ cartId, productId });
      if (response?.data) {
        setErrorLottie(false);
        setSuccessMessage(response.data.message);
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
        }, 2000);
        if (data.length === 1) {
          setTimeout(() => {
            setShowModal(false);
            window.location.reload();
          }, 2000);
        }
        setRemovingProductId('');
      } else {
        setErrorLottie(true);
        setSuccessMessage(
          response.error?.data?.error || 'Failed to remove item'
        );
        setRemovingProductId('');
      }
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 4000);
    } catch (error) {
      console.error('Error removing product:', error);

      setRemovingProductId('');
    }
  };
  const handleRemoveLocalProduct = (id) => {
    const { status, message } = deleteItemFromCart(id);
    if (status === 200) {
      const { cart } = getAllItemsInCart();
      if (Array.isArray(cart)) {
        const totalItemsCount = cart.length;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedData = cart.slice(startIndex, startIndex + itemsPerPage);
        const repairTotalAmount = cart
          .filter((item) => item.type === 'Repair')
          .reduce((acc, item) => acc + (item.amount || 0), 0);
        setData(paginatedData);
        setCartId('');
        setTotalPage(Math.ceil(totalItemsCount / itemsPerPage));
        setItemsPerPage(itemsPerPage);
        setTotalItems(totalItemsCount);
        setTotalAmount(repairTotalAmount);
        setCouponAmount(0);
        setInitialAmount(0);
        setGSTAmount(0);
      } else {
        console.error('Local data is not an array:', cart);
        setData([]);
        setTotalPage(1);
        setTotalItems(0);
      }

      setErrorLottie(false);
      setSuccessMessage(message);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 4000);
    } else {
      setErrorLottie(true);
      setSuccessMessage(message);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 4000);
    }
  };
  const handleProductQuantity = async (productId, quantity) => {
    setRemovingProductId(productId);
    const data = {
      quantity: quantity,
    };
    try {
      const response = await updateProduct({ cartId, productId, data });
      if (response?.data) {
        setRemovingProductId('');
      } else {
        setRemovingProductId('');
      }
    } catch (error) {
      console.error('Error removing product:', error);

      setRemovingProductId('');
    }
  };
  const handleLocalProductQuantity = async (productId, quantity) => {
    const { status, message } = updateItemInCart(productId, quantity);
    if (status === 200) {
      const { cart } = getAllItemsInCart();
      if (Array.isArray(cart)) {
        const totalItemsCount = cart.length;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedData = cart.slice(startIndex, startIndex + itemsPerPage);
        const repairTotalAmount = cart
          .filter((item) => item.type === 'Repair')
          .reduce((acc, item) => acc + (item.amount || 0), 0);
        setData(paginatedData);
        setCartId('');
        setTotalPage(Math.ceil(totalItemsCount / itemsPerPage));
        setItemsPerPage(itemsPerPage);
        setTotalItems(totalItemsCount);
        setTotalAmount(repairTotalAmount);
        setCouponAmount(0);
        setInitialAmount(0);
        setGSTAmount(0);
      } else {
        console.error('Local data is not an array:', cart);
        setData([]);
        setTotalPage(1);
        setTotalItems(0);
      }
    } else {
    }
  };

  if (isLoading) {
    return <FetchLoader />;
  }
  const navigateToDetails = (laptop, similarProduct, type) => {
    window.scrollTo(0, 0);
    navigate(
      type === 'Refurbished'
        ? '/refurbished/refurbished-details'
        : type === 'Rental'
          ? '/rent/rent-details'
          : '',
      { state: { laptop, similarProduct } }
    );
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
    const phoneNumberWithoutPrefix = phoneNumber.replace(/^(\+91)/, '');
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

  const handlepinCodeOtpSend = async (values) => {
    setLoadingPin(true);
    try {
      const response = await pinCodeApi({
        pincode: values.pinCode,
      });

      if (response?.data) {
        toast.success(response?.data.message, {
          position: 'bottom-center',
          autoClose: 1000,
        });
        setIsPinCodeVerified(true);
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
      setLoadingPin(false);
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center mt-2">
        <Heading>Your Cart</Heading>
      </Row>
      {data.length > 0 ? (
        <>
          <Row className="g-3">
            {data.map((item) => (
              <Col key={item._id} xs={12} md={6} lg={4}>
                <Card className="d-flex flex-column p-2 shadow-sm border-0 h-100">
                  <Card.Body className="d-flex flex-column">
                    <Row className="align-items-center mb-3">
                      <Col xs={4} className="p-0">
                        <Image
                          alt="images"
                          src={item.image ?? Laptop}
                          rounded
                          className={`h-auto ${item.type === 'Repair' ? '' : 'pointer'}`}
                          style={{ maxWidth: '100%', objectFit: 'cotain' }}
                          onClick={() => {
                            item.type === 'Repair&Service'
                              ? null
                              : navigateToDetails(
                                  phoneNumber ? item : item.item,
                                  item.type === 'Refurbished'
                                    ? refurbishedCarousel
                                    : item.type === 'Rental'
                                      ? rentalCarousel
                                      : [],
                                  item.type
                                );
                          }}
                        />
                      </Col>
                      <Col xs={8}>
                        <Card.Title
                          className="text-truncate"
                          style={{ fontSize: '16px', fontWeight: '600' }}
                        >
                          {item.brand}
                        </Card.Title>
                        <Card.Text
                          className="text-muted text-center text-truncate mb-2"
                          style={{ fontSize: '14px' }}
                        >
                          {item.type === 'Rental' ? 'Rental' : item.type}
                        </Card.Text>
                      </Col>
                    </Row>
                    <Card.Text
                      className="text-dark d-flex flex-row flex-wrap align-items-start justify-content-start w-100 text-wrap mb-2"
                      style={{ fontSize: '14px' }}
                    >
                      <span style={{ marginRight: '5px' }}>{item.model}</span>
                    </Card.Text>
                    {item.issue && (
                      <Card.Text
                        className="text-dark d-flex flex-row flex-wrap align-items-start justify-content-start w-100 text-wrap mb-2"
                        style={{ fontSize: '14px' }}
                      >
                        <span style={{ marginRight: '5px' }}>Issue:</span>
                        {renderIssues(item.issue)}
                      </Card.Text>
                    )}
                    <Col></Col>
                    {!item.issue && (
                      <Col className="my-2 d-flex flex-center flex-column justity-content-center align-items-center">
                        <div
                          key={item._id}
                          className="d-flex align-items-center my-auto"
                        >
                          <Button
                            className="d-flex align-items-center justify-content-center p-1 m-0"
                            variant="outline-danger"
                            style={{ width: '30px', height: '25px' }}
                            onClick={() =>
                              phoneNumber
                                ? handleProductQuantity(
                                    item._id,
                                    item.quantity - 1
                                  )
                                : handleLocalProductQuantity(
                                    item._id,
                                    item.quantity - 1
                                  )
                            }
                            disabled={item.quantity === 1 || quantityLoader}
                          >
                            <FaMinus />
                          </Button>
                          <InputGroup
                            className="mx-2"
                            style={{
                              width: '40px',
                            }}
                          >
                            <FormControl
                              style={{
                                width: '40px',
                                height: '25px',
                                fontSize: '12px',
                              }}
                              type="text"
                              value={item.quantity}
                              readOnly
                              className="text-center"
                            />
                          </InputGroup>
                          <Button
                            className="d-flex align-items-center justify-content-center p-1 m-0"
                            variant="outline-success"
                            style={{ width: '30px', height: '25px' }}
                            onClick={() =>
                              phoneNumber
                                ? handleProductQuantity(
                                    item._id,
                                    item.quantity + 1
                                  )
                                : handleLocalProductQuantity(
                                    item._id,
                                    item.quantity + 1
                                  )
                            }
                            disabled={item.quantity === 50 || quantityLoader}
                          >
                            <FaPlus />
                          </Button>
                        </div>
                      </Col>
                    )}

                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="w-100 mt-auto"
                      disabled={removeLoader && removingProductId === item._id}
                      onClick={() =>
                        phoneNumber
                          ? handleRemoveProduct(item._id)
                          : handleRemoveLocalProduct(item._id)
                      }
                    >
                      {removeLoader && removingProductId === item._id ? (
                        <Spinner size="sm" />
                      ) : (
                        'Remove'
                      )}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Row>
            <Col xs={12} md={8} lg={7} className="mx-auto mt-5">
              <div className="border p-3">
                {/* Coupon Section */}
                {!couponAmount <= 0 && (
                  <div className="cupon" style={{ width: '100%' }}>
                    {/* Headline and Verified Icon Row */}
                    <Row className="align-items-center mb-2">
                      <Col className="d-flex">
                        <CiDiscount1 color="green" size={30} className="me-1" />
                        <h6 className="mt-1" style={{ fontSize: '20px' }}>
                          Coupon
                        </h6>
                      </Col>
                      <Col className="text-end">
                        {showVerify && (
                          <VscVerifiedFilled color="green" size={25} />
                        )}
                      </Col>
                      <Col lg={9}>
                        <input
                          type="text"
                          name="coupon"
                          className="form-control w-100 mt-1"
                          placeholder="Enter Coupon code"
                          value={coupon.toUpperCase()}
                          onChange={(e) => setCoupon(e.target.value)}
                          disabled={couponAmount <= 0 || showVerify}
                        />
                      </Col>
                      <Col
                        lg={3}
                        className="text-lg-start text-md-center text-xs-center text-sm-center"
                      >
                        <span style={{ color: color }}>
                          {couponLoader ? (
                            <Spinner size="sm" color={color} />
                          ) : showVerify ? (
                            <></>
                          ) : (
                            <span
                              style={{ cursor: 'pointer' }}
                              onClick={() =>
                                coupon.length > 0
                                  ? handleVerifyCoupon()
                                  : toast.error(
                                      'Please Enter Coupon before Clicking Apply',
                                      {
                                        autoClose: 1000,
                                        position: 'fixed',
                                      }
                                    )
                              }
                            >
                              Apply
                            </span>
                          )}
                        </span>
                      </Col>
                    </Row>
                  </div>
                )}

                <div className="mt-3">
                  <h6 className="" style={{ color: 'red' }}>
                    Disclaimer
                  </h6>
                  <FaCheck
                    color="green"
                    size={15}
                    style={{ fontSize: '16px' }}
                  />{' '}
                  <span style={{ fontSize: '14px' }}>
                    The initial amount (without GST) you've paid will be
                    deducted from the total amount.
                  </span>
                  <br />
                  <FaCheck
                    color="green"
                    size={15}
                    style={{ fontSize: '16px' }}
                  />{' '}
                  <span style={{ fontSize: '14px' }}>
                    Spare parts and repair costs will be charged separately.
                  </span>
                </div>

                {/* Price Plan Section */}
                <Row className="mt-3">
                  <Col xs={6}>
                    <h6>Initial Amount:</h6>
                  </Col>
                  <Col xs={6} className="text-end">
                    <h6>₹{initialAmount.toString()}</h6>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                    <h6>GST Amount:</h6>
                  </Col>
                  <Col xs={6} className="text-end">
                    <h6>₹{gSTAmount.toString()}</h6>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col xs={6}>
                    <h6>Subtotal:</h6>
                  </Col>
                  <Col xs={6} className="text-end">
                    <h6>₹{couponAmount.toString()}</h6>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col xs={12}>
                    <Button
                      style={{
                        backgroundColor: color,
                        borderColor: color,
                      }}
                      size="sm"
                      className="w-100"
                      onClick={() =>
                        phoneNumber
                          ? setShowFormModal(true)
                          : setIsLoginOpen(true)
                      }
                    >
                      Checkout
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col className="d-flex justify-content-end">
              <CustomPagination
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                totalPages={totalPage}
              />
            </Col>
          </Row>
        </>
      ) : (
        <div className="text-center mt-4">
          <Lottie options={options} height="250px" width="250px" />
          <h4 style={{ color: color }}>No Products Found</h4>
        </div>
      )}
      <SuccessModal
        showModal={showModal}
        setShowModal={setShowModal}
        successMessage={successMessage}
        error={errorLottie}
      />
      <Modal
        show={showFormModal}
        onHide={() => setShowFormModal(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="fs-5">Checkout Application Form</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            ...initialValues,
            phoneNumber: removePrefix(phoneNumber) || '',
            fullName: userName,
            email: email,
            address: primaryAddress,
            pinCode: '',
            paymentMethod: 'onlinePayment',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            const paymentType =
              totalAmount > 0
                ? values.paymentMethod === 'cashOnDelivery'
                  ? 'COD'
                  : 'Online Payment'
                : 'COD';

            if (totalAmount > 0 && values.paymentMethod === 'onlinePayment') {
              handleRazorPay(values, { resetForm });
            } else {
              handleSubmit(values, { resetForm }, '', 0, paymentType);
            }
          }}
        >
          {({ handleSubmit, setFieldValue, values, errors }) => (
            <Form onSubmit={handleSubmit}>
              <Modal.Body style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                <Row className="my-1">
                  <Form.Group>
                    <Form.Label>Full Name</Form.Label>
                    <Field
                      type="text"
                      name="fullName"
                      className="form-control"
                      placeholder="Enter your Full name"
                    />
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      className="text-danger"
                    />
                  </Form.Group>
                </Row>
                <Row className="my-1">
                  <Form.Group controlId="phoneNumber">
                    <Form.Label>Phone Number</Form.Label>
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
                        className="form-control"
                        placeholder="Enter your Phone number"
                        onInput={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 10) {
                            e.target.value = value;
                          } else {
                            e.target.value = value.slice(0, 10);
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
                </Row>
                <Row className="my-1">
                  <Form.Group controlId="aphoneNumber">
                    <Form.Label>Alternative Phone Number(Optional)</Form.Label>
                    <InputGroup className="">
                      <InputGroup.Text
                        className="input-group-prepend"
                        style={{ fontSize: '14px', height: '40px' }}
                      >
                        +91
                      </InputGroup.Text>
                      <Field
                        placeholder="Enter your Alternative Phone Number"
                        type="text"
                        name="aphoneNumber"
                        className="form-control"
                        onInput={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 10) {
                            e.target.value = value;
                          } else {
                            e.target.value = value.slice(0, 10);
                          }
                        }}
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="aphoneNumber"
                      component="div"
                      className="text-danger"
                    />
                  </Form.Group>
                </Row>
                <Row className="my-1">
                  <Form.Group controlId="email">
                    <Form.Label>
                      Email <span className="text-danger">*</span>
                    </Form.Label>
                    <div className="d-flex">
                      <Field
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter your Email"
                        onChange={(e) => {
                          const value = e.target.value.toLowerCase();
                          e.target.value = value;
                          setFieldValue('email', value);

                          if (value !== email) {
                            setIsEmailVerified(false);
                          }
                        }}
                      />

                      {!isEmailVerified ? (
                        values.email === email ? (
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
                            disabled={loading || !values.email || errors.email}
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
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </Form.Group>
                </Row>
                {/* <Row className="my-1">
                  <Form.Group controlId="email">
                    <Form.Label>
                      Email <span className="text-danger">*</span>
                    </Form.Label>
                    <div className="d-flex">
                      <Field
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter your Email"
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
                          onClick={() => {
                            handleEmailOtpSend(values);
                          }}
                          disabled={loading}
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
                </Row> */}
                {/* Payment Method Selection */}
                {totalAmount > 0 && (
                  <Row className="my-1">
                    <Form.Group as={Row}>
                      <Col sm={12}>
                        <Form.Label>Payment Method</Form.Label>
                      </Col>
                      <Col sm={6}>
                        <Field
                          type="radio"
                          name="paymentMethod"
                          value="cashOnDelivery"
                          className="form-check-input"
                          id="cashOnDelivery"
                          onClick={() => {
                            setPaymentMethod('cashOnDelivery');
                            setFieldValue('paymentMethod', 'cashOnDelivery');
                          }}
                        />
                        <Form.Label
                          htmlFor="cashOnDelivery"
                          className="form-check-label mx-1"
                        >
                          Cash on Delivery
                        </Form.Label>
                      </Col>
                      <Col sm={6}>
                        <Field
                          type="radio"
                          name="paymentMethod"
                          value="onlinePayment"
                          className="form-check-input"
                          id="onlinePayment"
                          onClick={() => {
                            setPaymentMethod('onlinePayment');
                            setFieldValue('paymentMethod', 'onlinePayment');
                          }}
                        />
                        <Form.Label
                          htmlFor="onlinePayment"
                          className="form-check-label mx-1"
                        >
                          Digital Payment
                        </Form.Label>
                      </Col>
                      <ErrorMessage
                        name="paymentMethod"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                  </Row>
                )}

                <Row className="my-1">
                  <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Field
                      as="textarea"
                      name="address"
                      className="form-control"
                      placeholder="Enter your  Address"
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-danger"
                    />
                  </Form.Group>
                </Row>
                <Row className="my-1">
                  <Form.Group controlId="pinCode">
                    <Form.Label>
                      PinCode <span className="text-danger">*</span>
                    </Form.Label>
                    <div className="d-flex">
                      <Field
                        type="pinCode"
                        name="pinCode"
                        className="form-control"
                        placeholder="Enter your PinCode"
                      />
                      {!isPinCodeVerified ? (
                        <Button
                          style={{ backgroundColor: color }}
                          className="ml-2 mx-2"
                          onClick={() => {
                            handlepinCodeOtpSend(values);
                          }}
                          disabled={
                            loadingPin || errors.pinCode || !values.pinCode
                          }
                        >
                          {loadingPin ? (
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
                      name="pinCode"
                      component="div"
                      className="text-danger"
                    />
                  </Form.Group>
                </Row>

                <Form.Group
                  controlId="termsAndConditions"
                  className="my-2 pointer"
                >
                  <Field
                    type="checkbox"
                    name="termsAndConditions"
                    className="form-check-input"
                  />
                  <Form.Label
                    id="termsAndConditions"
                    className="form-check-label  mx-1"
                    style={{ fontSize: '14px' }}
                  >
                    I accept the terms and conditions
                  </Form.Label>
                  <ErrorMessage
                    name="termsAndConditions"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>
                <Button
                  type="submit"
                  className="w-100 px-3 py-1 my-4"
                  disabled={
                    checkoutLoader || (coupon.length > 0 && !showVerify)
                  }
                  style={{ backgroundColor: color, borderColor: color }}
                >
                  {checkoutLoader ? (
                    <Spinner size="sm" />
                  ) : (
                    <>
                      {paymentMethod === 'onlinePayment' && totalAmount > 0
                        ? 'Pay now ₹' + couponAmount.toString()
                        : 'Checkout'}
                    </>
                  )}
                </Button>
                {/* <BasicButton
                  type="submit"
                  className="bg-main w-100 px-3 py-1 my-4"
                  label={
                    couponAmount > 0
                      ? 'Pay now ₹' + couponAmount.toString()
                      : 'Checkout'
                  }
                  isLoading={coupon.length > 0 || checkoutLoader}
                /> */}
              </Modal.Body>

              <Modal
                show={showEmailOtpModal}
                onHide={() => setShowEmailOtpModal(false)}
                centered
                size='sm'
              >
                <Modal.Header closeButton>
                  <Modal.Title className='border-0 fs-5'>Enter OTP</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>We have sent an OTP to your email</p>
                  <p style={{ fontSize: '13px' }}>
                    <strong className="text-wrap">{values.email}</strong>
                  </p>
                  <Form.Group>
                    <div className="d-flex justify-content-between mt-2">
                      {otpEmail.map((data, index) => (
                        <Form.Control
                          key={index}
                          type="text"
                          maxLength="1"
                          value={data}
                          onChange={(e) => handleChangeEmail(e.target, index)}
                          onKeyDown={(e) => handleKeyDownEmail(e, index)}
                          ref={(el) => (inputEmailRefs.current[index] = el)}
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
      </Modal>
      <LoginModal
        show={isLoginOpen}
        handleClose={() => setIsLoginOpen(false)}
      />
    </Container>
  );
};

export default Cart;
